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
const BLOB_KEY = "guestbook-v3";
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

/* ---------- 内容健康度检查（结构性反垃圾） ----------
 * 只拦截明确的垃圾模式：联系方式引流、刷屏重复、无有效文字。
 * 不维护敏感词词库、不做语义判断，原则是「宁可漏过，不可误杀正常表达」。 */
function meaningfulLen(s) {
  const m = String(s).match(/[\u4e00-\u9fffA-Za-z0-9]/g); // 中文 / 字母 / 数字
  return m ? m.length : 0;
}
/* 归一化：小写 + 去掉空白与常见装饰分隔符，使「1 3 8-xxxx」这类拆写也能被识别 */
function normalize4spam(s) {
  return String(s).toLowerCase().replace(/[\s\-_.·*~～•・、，,]/g, "");
}
/* 同一 2~4 字片段出现 ≥6 次视为刷屏（哈希计数，O(3n)） */
function hasRepeatedPhrase(text) {
  for (const len of [2, 3, 4]) {
    const seen = new Map();
    for (let i = 0; i + len <= text.length; i++) {
      const seg = text.slice(i, i + len);
      if (!/[\u4e00-\u9fffA-Za-z0-9]{2,}/.test(seg)) continue;
      const n = (seen.get(seg) || 0) + 1;
      if (n >= 6) return true;
      seen.set(seg, n);
    }
  }
  return false;
}
/* 返回错误提示字符串；内容健康返回 null。昵称与正文都查（引流常写在昵称里） */
function moderateContent(name, text) {
  if (meaningfulLen(text) < 2) return "留言至少要包含 2 个文字字符哦";
  if (meaningfulLen(name) < 1) return "昵称至少要包含 1 个文字字符";
  const all = normalize4spam(name + " " + text);
  if (/1[3-9]\d{9}/.test(all)) return "为保护隐私，留言中不能出现手机号，请删除后再发";
  // 引流意图词 + 5~12 位数字（群号 / QQ 号）
  if (/(?:q群|qq群|群号|加群|加q|扣扣|带带我|私聊我|滴滴我)[^0-9a-z]{0,8}[0-9]{5,12}/.test(all)) {
    return "检测到疑似引流或联系方式，为保护你的隐私请删除后再发";
  }
  // 微信号类：意图词 + 6~20 位字母数字账号
  if (/(?:微信|vx|v信|薇信|威信|加微|徽信)[^0-9a-z]{0,8}[a-z0-9][a-z0-9_-]{5,19}/.test(all)) {
    return "检测到疑似微信号等联系方式，请删除后再发";
  }
  // 同一字符连续刷屏（12 个以上，正常说话不会这么写）
  if (/(.)\1{11,}/.test(normalize4spam(text))) return "重复字符太多啦，写点真实想法吧";
  if (hasRepeatedPhrase(text)) return "相同内容重复太多次啦，请精简后再发";
  return null;
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
/* 唯一键（每访客 vid 哈希 / 每 IP）会持续累积，超过高水位后偶发清扫，防止内存无限增长 */
const BUCKETS_MAX = 5000;
const BUCKET_TTL = 3600_000;
/* 通用滑动窗口：key 在 windowMs 内最多 max 次；可选最小间隔 minGapMs */
function hitLimit(key, max, windowMs, minGapMs = 0) {
  const now = Date.now();
  const b = buckets.get(key) || { last: 0, times: [] };
  b.times = b.times.filter((t) => now - t < windowMs);
  if ((minGapMs && now - b.last < minGapMs) || b.times.length >= max) return true;
  b.last = now;
  b.times.push(now);
  buckets.set(key, b);
  if (buckets.size > BUCKETS_MAX) {
    for (const [k, v] of buckets) {
      if (now - v.last > BUCKET_TTL && !v.times.some((t) => now - t < BUCKET_TTL)) {
        buckets.delete(k);
      }
    }
  }
  return false;
}
/* 发评论：稳定指纹维度，20 秒间隔 + 每小时 5 条 */
function commentLimited(hash) {
  return hitLimit("c:" + hash, 5, 3600_000, 20_000);
}
/* 发评论：IP 维度兜底（防止脚本批量生成 vid 绕过），每小时 10 条 */
function commentIpLimited(ip) {
  return hitLimit("ci:" + ip, 10, 3600_000);
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
  // GET/DELETE 的 vid 在 query；POST 的 vid 在 JSON body —— 两处都要接住，
  // 否则 POST 会退化为不稳定的匿名（IP+UA）指纹，与 GET 对不上。
  const queryVid = url.searchParams.get("vid") || "";
  const body = request.method === "POST" ? await request.json().catch(() => ({})) : {};
  const vid = cleanText(body.vid || queryVid, 64);

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
      if (commentLimited(hash) || commentIpLimited(clientIp(request, context))) {
        return json({ ok: false, error: "操作太频繁啦，喝口水稍后再试（20 秒 / 条）" }, 429);
      }
      const name = cleanText(body.name, NAME_MAX);
      const text = cleanText(body.text, TEXT_MAX);
      const visitorId = vid;

      if (name.length < 1) return json({ ok: false, error: "请留下你的昵称" }, 400);
      if (text.length < 1) return json({ ok: false, error: "留言内容不能为空" }, 400);
      if (countUrls(text) > 3) return json({ ok: false, error: "一条留言最多包含 3 个链接" }, 400);
      const bad = moderateContent(name, text);
      if (bad) return json({ ok: false, error: bad }, 400);

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
