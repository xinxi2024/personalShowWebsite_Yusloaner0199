/* ===================================================================
 * Sloaner Nexus · 星际留言板 API（Netlify Functions v2 + Blobs）
 *
 * 路由（同源 /api/...）：
 *   GET    /api/state                 获取点赞数 + 评论列表（含当前访客状态）
 *   POST   /api/like                  点赞 / 取消点赞（站点 or 某条评论）
 *   POST   /api/comment               发表评论（限流 + 长度校验）
 *   DELETE /api/comment?id=xxx        删除自己（同浏览器 vid）发表的评论
 *
 * 数据持久化在 Netlify Blobs（单 JSON blob，强一致读写）。
 * 访客身份 = 浏览器 localStorage 持久化随机 vid 的哈希（跨网络/IP 漂移稳定）；
 * IP 仅用于点赞接口的限流。
 * =================================================================== */
import { createHash, randomUUID } from "node:crypto";
import { getStore } from "@netlify/blobs";

export const config = {
  path: "/api/*",
};

// v2：访客身份以浏览器 localStorage 中持久化的随机 vid 为准
// （IP 会因 IPv4/IPv6 切换、移动网络漫游而漂移，不能作主身份）；
// IP 仅用于服务端限流。换 blob key 让旧的不稳定指纹数据自然作废。
const BLOB_KEY = "guestbook-v2";
const MAX_COMMENTS = 400;
const NAME_MAX = 24;
const TEXT_MAX = 500;

/* ---------- 工具 ---------- */

function clientIp(request, context) {
  return (
    request.headers.get("x-nf-client-connection-ip") ||
    request.headers.get("x-real-ip") ||
    request.headers.get("cf-connecting-ip") ||
    context?.ip ||
    "0.0.0.0"
  );
}

/* 访客稳定身份：vid 哈希；未带 vid 的异常请求退化为 IP+UA 哈希 */
function visitorHash(request, context, vid = "") {
  const v = String(vid || "").replace(/[^a-zA-Z0-9_-]/g, "").slice(0, 64);
  if (v) return "v2:" + createHash("sha256").update(`nexus-vid::${v}`).digest("hex");
  const ip = clientIp(request, context);
  const ua = request.headers.get("user-agent") || "";
  return "v2:" + createHash("sha256").update(`nexus-anon::${ip}::${ua}`).digest("hex");
}

function json(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Allow-Methods": "GET,POST,DELETE,OPTIONS",
    },
  });
}

async function loadData(store) {
  const data = await store.get(BLOB_KEY, { type: "json", consistency: "strong" });
  if (data && Array.isArray(data.comments)) {
    if (!Array.isArray(data.siteLikes)) data.siteLikes = [];
    return data;
  }
  return { siteLikes: [], comments: [] };
}

function cleanText(value, max) {
  return String(value || "")
    .replace(/[\x00-\x09\x0B\x0C\x0E-\x1F\x7F]/g, "") // 去控制字符（保留换行）
    .replace(/\r\n?/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim()
    .slice(0, max);
}

function countUrls(text) {
  return (text.match(/https?:\/\//gi) || []).length;
}

/* 公开返回：去掉内部 hash 数组，只给数量与当前访客标记 */
function publicComment(c, hash) {
  const likes = Array.isArray(c.likes) ? c.likes : [];
  return {
    id: c.id,
    name: c.name,
    text: c.text,
    ts: c.ts,
    likes: likes.length,
    liked: likes.includes(hash),
    mine: c.h === hash,
  };
}

/* ---------- 简易内存限流（同一温实例内生效） ---------- */
const buckets = new Map();
/* 通用滑动窗口：key 在 windowMs 内最多 max 次；可选最小间隔 minGapMs */
function hitLimit(key, max, windowMs, minGapMs = 0) {
  const now = Date.now();
  const b = buckets.get(key) || { last: 0, times: [] };
  b.times = b.times.filter((t) => now - t < windowMs);
  if ((minGapMs && now - b.last < minGapMs) || b.times.length >= max) return true;
  b.last = now;
  b.times.push(now);
  buckets.set(key, b);
  return false;
}
/* 发评论：稳定指纹维度，20 秒间隔 + 每小时 5 条 */
function commentLimited(hash) {
  return hitLimit("c:" + hash, 5, 3600_000, 20_000);
}
/* 点赞：IP 维度防刷（vid 可被脚本批量生成），每分钟 30 次 */
function likeLimited(ip) {
  return hitLimit("l:" + ip, 30, 60_000);
}

/* ---------- 主处理 ---------- */

export default async (request, context) => {
  if (request.method === "OPTIONS") return json({ ok: true });

  const url = new URL(request.url);
  const route = url.pathname.replace(/^\/api\/?/, "").split("/")[0] || "state";
  const vid = url.searchParams.get("vid") || "";

  let store;
  try {
    store = getStore({ name: "nexus-guestbook", consistency: "strong" });
  } catch (err) {
    return json({ ok: false, error: "存储服务初始化失败，请稍后再试" }, 503);
  }

  const hash = visitorHash(request, context, vid);

  try {
    /* ============ GET /api/state ============ */
    if (route === "state" && request.method === "GET") {
      const data = await loadData(store);
      return json({
        ok: true,
        likes: data.siteLikes.length,
        liked: data.siteLikes.includes(hash),
        comments: data.comments
          .slice(-MAX_COMMENTS)
          .reverse()
          .map((c) => ({ ...publicComment(c, hash), mine: c.h === hash || c.v === vid })),
      });
    }

    /* ============ POST /api/like ============ */
    if (route === "like" && request.method === "POST") {
      if (likeLimited(clientIp(request, context))) {
        return json({ ok: false, error: "操作太快啦，歇口气再点" }, 429);
      }
      const body = await request.json().catch(() => ({}));
      const target = body.target === "comment" ? "comment" : "site";
      const data = await loadData(store);

      if (target === "site") {
        const i = data.siteLikes.indexOf(hash);
        if (i >= 0) data.siteLikes.splice(i, 1);
        else data.siteLikes.push(hash);
        await store.setJSON(BLOB_KEY, data, { consistency: "strong" });
        return json({ ok: true, target, likes: data.siteLikes.length, liked: i < 0 });
      }

      const comment = data.comments.find((c) => c.id === body.id);
      if (!comment) return json({ ok: false, error: "评论不存在" }, 404);
      if (!Array.isArray(comment.likes)) comment.likes = [];
      const i = comment.likes.indexOf(hash);
      if (i >= 0) comment.likes.splice(i, 1);
      else comment.likes.push(hash);
      await store.setJSON(BLOB_KEY, data, { consistency: "strong" });
      return json({ ok: true, target, id: comment.id, likes: comment.likes.length, liked: i < 0 });
    }

    /* ============ POST /api/comment ============ */
    if (route === "comment" && request.method === "POST") {
      if (commentLimited(hash)) {
        return json({ ok: false, error: "操作太频繁啦，喝口水稍后再试（20 秒 / 条）" }, 429);
      }
      const body = await request.json().catch(() => ({}));
      const name = cleanText(body.name, NAME_MAX);
      const text = cleanText(body.text, TEXT_MAX);
      const visitorId = cleanText(body.vid, 64);

      if (name.length < 1) return json({ ok: false, error: "请留下你的昵称" }, 400);
      if (text.length < 1) return json({ ok: false, error: "留言内容不能为空" }, 400);
      if (countUrls(text) > 3) return json({ ok: false, error: "一条留言最多包含 3 个链接" }, 400);

      const data = await loadData(store);
      const comment = {
        id: randomUUID(),
        name,
        text,
        ts: Date.now(),
        likes: [],
        h: hash,
        v: visitorId || "",
      };
      data.comments.push(comment);
      // 超量只保留最新的 MAX_COMMENTS 条
      if (data.comments.length > MAX_COMMENTS) {
        data.comments = data.comments.slice(-MAX_COMMENTS);
      }
      await store.setJSON(BLOB_KEY, data, { consistency: "strong" });
      const pub = publicComment(comment, hash);
      pub.mine = true;
      return json({ ok: true, comment: pub });
    }

    /* ============ DELETE /api/comment ============ */
    if (route === "comment" && request.method === "DELETE") {
      const id = url.searchParams.get("id") || "";
      const data = await loadData(store);
      const i = data.comments.findIndex((c) => c.id === id);
      if (i < 0) return json({ ok: false, error: "评论不存在" }, 404);
      if (data.comments[i].h !== hash && data.comments[i].v !== vid) {
        return json({ ok: false, error: "只能删除自己的留言" }, 403);
      }
      data.comments.splice(i, 1);
      await store.setJSON(BLOB_KEY, data, { consistency: "strong" });
      return json({ ok: true, id });
    }

    return json({ ok: false, error: "未知的星轨路径" }, 404);
  } catch (err) {
    console.error("[nexus-api]", err);
    return json({ ok: false, error: "星云风暴，请稍后再试" }, 500);
  }
};
