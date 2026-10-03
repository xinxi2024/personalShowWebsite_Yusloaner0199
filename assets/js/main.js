/* ============ Sloaner Nexus · 交互与数据 v2 ============ */

/* ---------- 项目数据（与 md 文档同步） ---------- */
const CATS = {
  tool: "效率工具",
  game: "经典游戏",
  app: "数据应用",
  hub: "星际集成",
};

const PROJECTS = [
  // 🛰️ 星际集成（系列总入口，优先展示）
  { cat: "hub", name: "Sloaner 智启星际系列", desc: "技术集成系列 · 总入口", url: "https://ysloaner-technological.netlify.app/" },
  { cat: "hub", name: "Sloaner 百宝箱 · 总集成", desc: "31 款效率工具的母舰", url: "https://ysloaner-treasure-chest.onrender.com/" },
  { cat: "hub", name: "YuSloane 游戏帝国 · 总集成", desc: "32 款经典游戏的母舰", url: "https://ysloaner-game-empire.netlify.app/" },

  // 🧰 Sloaner 百宝箱 · 31 工具
  { cat: "tool", name: "Markdown 编辑器", url: "https://ysloaner-markdown-editor.onrender.com/" },
  { cat: "tool", name: "数据格式转换", url: "https://ysloaner-dft.netlify.app/" },
  { cat: "tool", name: "文件格式转换", url: "https://ysloaner-fileformat.netlify.app/" },
  { cat: "tool", name: "QR 二维码生成", url: "https://ysloaner-qr.netlify.app/" },
  { cat: "tool", name: "单位转换器", url: "https://ysloaner-conversion.netlify.app/" },
  { cat: "tool", name: "语言翻译器", url: "https://ysloaner-language-translator.netlify.app/" },
  { cat: "tool", name: "批量重命名", url: "https://sloaner-rename.netlify.app/" },
  { cat: "tool", name: "抽签器", url: "https://ysloner-ld.netlify.app/" },
  { cat: "tool", name: "批量处理图片", url: "https://ysloaner-manipulate-image.onrender.com" },
  { cat: "tool", name: "计时器", url: "https://sloaner-timer.onrender.com/" },
  { cat: "tool", name: "四级单词能量站", url: "https://yslaoner-lfe.netlify.app/" },
  { cat: "tool", name: "Base64 编码器", url: "https://yslaoner-base64-encoder.onrender.com/" },
  { cat: "tool", name: "多功能计算器", url: "https://ysloaner-mfc.netlify.app/" },
  { cat: "tool", name: "思维导图", url: "https://ysloaner-mind.netlify.app/" },
  { cat: "tool", name: "文本对比", url: "https://sloaner-text-comparison.onrender.com/" },
  { cat: "tool", name: "待办事项", url: "https://ysloaner-todos.netlify.app/" },
  { cat: "tool", name: "MBTI 测试", url: "https://ysloaner-mbti-test.onrender.com/" },
  { cat: "tool", name: "IP 查询", url: "https://ysloaner-ip-query.onrender.com" },
  { cat: "tool", name: "密码强度检测", url: "https://ysloaner-psc.onrender.com" },
  { cat: "tool", name: "目录树生成器", url: "https://ysloaner-ctg.onrender.com" },
  { cat: "tool", name: "ASCII 码转换", url: "https://ysloaner-ascllcoder.netlify.app/" },
  { cat: "tool", name: "日期间隔计算", url: "https://sloaner-date-calculation.onrender.com" },
  { cat: "tool", name: "密码生成器", url: "https://sloaner-spg.onrender.com/" },
  { cat: "tool", name: "Sloaner 白板", url: "https://ysloaner-whiteboard.onrender.com" },
  { cat: "tool", name: "签名生成器", url: "https://ysloaner-sg.netlify.app/" },
  { cat: "tool", name: "BMI 计算", url: "https://ysloaner-bmi-calculator.onrender.com" },
  { cat: "tool", name: "正则表达式匹配", url: "https://sloaner-re-html.onrender.com" },
  { cat: "tool", name: "音视频播放器", url: "https://ysloaner-aavp.onrender.com" },
  { cat: "tool", name: "时间戳转换器", url: "https://sloaner-stc.onrender.com/" },
  { cat: "tool", name: "语音转文本", url: "https://sloaner-sttt.onrender.com/" },
  { cat: "tool", name: "文本转语音", url: "https://sloaner-ttst.netlify.app/" },

  // 🎮 YuSloane 游戏帝国 · 32 游戏
  { cat: "game", name: "扫雷", url: "https://sloane-minesweeper-netlify.netlify.app/" },
  { cat: "game", name: "2048", url: "https://ysloaner-2048.netlify.app/" },
  { cat: "game", name: "迷宫", url: "https://yusloaner-maze.netlify.app/" },
  { cat: "game", name: "俄罗斯方块", url: "https://yusloaner-tetris.netlify.app/" },
  { cat: "game", name: "贪吃蛇", url: "https://sloaner-greedysnake.netlify.app/" },
  { cat: "game", name: "数字华容道", url: "https://ysloaner-dhr.netlify.app/" },
  { cat: "game", name: "数独", url: "https://ysloaner-sudoku.netlify.app/" },
  { cat: "game", name: "蜘蛛牌", url: "https://ysloaner-spidercard.netlify.app/" },
  { cat: "game", name: "五子棋", url: "https://yusloaner-gobang.netlify.app/" },
  { cat: "game", name: "中国象棋", url: "https://yusloaner-chiniese-chess.netlify.app/" },
  { cat: "game", name: "打砖块", url: "https://ysloaner-block-breaker.onrender.com/" },
  { cat: "game", name: "打地鼠", url: "https://ysloaner-whackamole.netlify.app/" },
  { cat: "game", name: "记忆卡片", url: "https://ysloaner-memorycard.netlify.app/" },
  { cat: "game", name: "点点连线", url: "https://yusloaner-connection.netlify.app/" },
  { cat: "game", name: "推箱子", url: "https://sloaner-pushbox.netlify.app/" },
  { cat: "game", name: "Colorful 消消乐", url: "https://ysloaner-colorful.netlify.app/" },
  { cat: "game", name: "太空战机", url: "https://ysloaner-space-shooter.netlify.app/" },
  { cat: "game", name: "3D 跑酷", url: "https://ysloaner-3dcityparkour.netlify.app/" },
  { cat: "game", name: "3D 跳一跳", url: "https://yusloaner-3djump.netlify.app/" },
  { cat: "game", name: "像素鸟", url: "https://ysloaner-pixel-bird.netlify.app/" },
  { cat: "game", name: "圣诞老人过悬崖", url: "https://ysloaner-scotc.netlify.app/" },
  { cat: "game", name: "Sloaner 钢琴", url: "https://sloaner-piano.netlify.app/" },
  { cat: "game", name: "粒子交互", url: "https://sloaner-interactive.netlify.app/" },
  { cat: "game", name: "井字棋", url: "https://sloaner-ttt.netlify.app/" },
  { cat: "game", name: "24 点", url: "https://ysloaner-24clock.onrender.com" },
  { cat: "game", name: "投掷飞镖", url: "https://dart-throwing-frenzy.lovable.app/" },
  { cat: "game", name: "恐龙快跑", url: "https://ysloaner-dinosaur-run.netlify.app/" },
  { cat: "game", name: "围棋", url: "https://ysloaner-go.netlify.app/" },
  { cat: "game", name: "国际象棋", url: "https://ysloaner-website.netlify.app/" },
  { cat: "game", name: "涂鸦板", url: "https://ysloaner-draw.vercel.app/" },
  { cat: "game", name: "人生重开模拟器", url: "https://ysloaner-lre.netlify.app/" },
  { cat: "game", name: "围住小偷", url: "https://ysloaner-sutt.netlify.app/" },

  // 📊 数据应用
  { cat: "app", name: "个人博客", desc: "记录与复盘", url: "http://ysloaner.wuaze.com/" },
  { cat: "app", name: "智绘大数据", desc: "数据可视化平台", url: "https://ysloaner-spbd.onrender.com/" },
  { cat: "app", name: "Sloaner 天气网", desc: "气象数据应用", url: "https://sloaner-weather-network.onrender.com/" },
  { cat: "app", name: "答案之书", desc: "灵感问答小应用", url: "https://sloaner-the-book-of-answers.onrender.com" },
  { cat: "app", name: "亲戚称呼换算", desc: "亲属关系计算", url: "https://sloaner-conversion-of-relative-names.onrender.com" },
  { cat: "app", name: "共青团问答系统", desc: "知识问答平台", url: "https://ysloaner-gqt-question.netlify.app/" },
  { cat: "app", name: "共青团问卷系统", desc: "问卷收集平台", url: "https://sloaner-gpq-test2.netlify.app/" },
  { cat: "app", name: "艾宾浩斯复习页码生成", desc: "记忆曲线学习工具", url: "https://ysloaner-ert.netlify.app/" },
  { cat: "app", name: "学习复习计划管理", desc: "复习规划应用", url: "https://ysloaner-reviewplan.netlify.app/" },
];

/* ---------- 渲染项目卡片 + 分类筛选 + 搜索 ---------- */
const grid = document.getElementById("projectsGrid");
const emptyTip = document.getElementById("projectsEmpty");
const searchInput = document.getElementById("searchInput");
const searchCount = document.getElementById("searchCount");
const CAT_ORDER = { hub: 0, tool: 1, game: 2, app: 3 };
const CAT_ICON = { hub: "🛰️", tool: "🧰", game: "🎮", app: "📊" };
let currentCat = "all";

function renderProjects() {
  const kw = searchInput.value.trim().toLowerCase();
  const list = PROJECTS
    .filter(p => (currentCat === "all" || p.cat === currentCat))
    .filter(p => !kw || p.name.toLowerCase().includes(kw) || (p.desc || "").toLowerCase().includes(kw))
    .sort((a, b) => CAT_ORDER[a.cat] - CAT_ORDER[b.cat]);

  grid.innerHTML = list.map((p, i) => `
    <a class="project spot tilt ${p.cat === "hub" ? "project--hub" : ""}"
       href="${p.url}" target="_blank" rel="noopener"
       style="animation-delay:${Math.min(i * 25, 400)}ms">
      <span class="project__arrow">↗</span>
      <span class="project__cat">${CAT_ICON[p.cat]} ${CATS[p.cat]}</span>
      <div class="project__name">${p.name}</div>
      ${p.desc ? `<div class="project__desc">${p.desc}</div>` : ""}
    </a>`).join("");

  emptyTip.hidden = list.length > 0;
  searchCount.textContent = kw || currentCat !== "all" ? `${list.length} 个` : "";
}
renderProjects();

document.getElementById("filter").addEventListener("click", e => {
  const btn = e.target && e.target.closest && e.target.closest(".filter__btn");
  if (!btn) return;
  document.querySelectorAll(".filter__btn").forEach(b => b.classList.remove("is-active"));
  btn.classList.add("is-active");
  currentCat = btn.dataset.cat;
  renderProjects();
});
/* 输入事件每帧最多重建一次卡片（连续打字时不再每个按键都全量重建 73 个节点） */
let projectsQueued = false;
searchInput.addEventListener("input", () => {
  if (projectsQueued) return;
  projectsQueued = true;
  requestAnimationFrame(() => { projectsQueued = false; renderProjects(); });
});

/* ---------- 聚光灯卡片：鼠标位置追踪 ---------- */
document.addEventListener("mousemove", e => {
  const card = e.target && e.target.closest && e.target.closest(".spot");
  if (!card) return;
  const r = card.getBoundingClientRect();
  card.style.setProperty("--mx", `${e.clientX - r.left}px`);
  card.style.setProperty("--my", `${e.clientY - r.top}px`);
});

/* ---------- 打字机 ---------- */
const ROLES = [
  "物联网工程在读 · 独立开发者",
  "两获中等职业教育国家奖学金",
  "事迹荣登《人民日报》2026.5.4 第 07 版",
  "世界职业院校技能大赛 · 团体金奖",
  "上海三校生高考总分第一",
  "GitHub 103 仓库 · 73+ 个线上项目的创造者",
];
const typedEl = document.getElementById("typed");
if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
  typedEl.textContent = ROLES[0]; // 减弱动效偏好：静态展示，不启动打字机
} else (function typeLoop(roleIdx = 0, charIdx = 0, deleting = false) {
  const text = ROLES[roleIdx];
  typedEl.textContent = text.slice(0, charIdx);
  let delay = deleting ? 34 : 82;
  if (!deleting && charIdx === text.length) {
    delay = 1800; deleting = true;
  } else if (deleting && charIdx === 0) {
    deleting = false; roleIdx = (roleIdx + 1) % ROLES.length; delay = 420;
  } else {
    charIdx += deleting ? -1 : 1;
  }
  setTimeout(() => typeLoop(roleIdx, charIdx, deleting), delay);
})();

/* ---------- 星空 Canvas：星星 + 流星 + 鼠标视差（离屏暂停） ---------- */
const canvas = document.getElementById("stars");
const ctx = canvas.getContext("2d");
let stars = [], meteors = [];
let mouseX = 0.5, mouseY = 0.5;
let heroVisible = true, rafId = null;

function resize() {
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
  const n = Math.min(240, Math.floor(canvas.width * canvas.height / 6500));
  stars = Array.from({ length: n }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 1.4 + 0.3,
    s: Math.random() * 0.35 + 0.08,
    o: Math.random() * 0.6 + 0.25,
    p: Math.random() * Math.PI * 2,
    depth: Math.random() * 0.8 + 0.2, // 视差层深
  }));
}

function spawnMeteor() {
  const fromLeft = Math.random() < 0.5;
  meteors.push({
    x: Math.random() * canvas.width * 0.7 + canvas.width * 0.15,
    y: -20,
    vx: (fromLeft ? 1 : -1) * (Math.random() * 3 + 4),
    vy: Math.random() * 2 + 3,
    life: 1,
  });
}

function tick(t) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // 星星（含鼠标视差偏移）
  const px = (mouseX - 0.5) * 18, py = (mouseY - 0.5) * 12;
  for (const st of stars) {
    st.y += st.s;
    if (st.y > canvas.height) { st.y = -2; st.x = Math.random() * canvas.width; }
    const tw = st.o * (0.6 + 0.4 * Math.sin(t / 900 + st.p));
    ctx.beginPath();
    ctx.arc(st.x + px * st.depth, st.y + py * st.depth, st.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(190, 225, 255, ${tw})`;
    ctx.fill();
  }

  // 流星（彩蛋触发时进入「星陨如雨」风暴模式）
  const storming = Date.now() < stormUntil;
  if (Math.random() < (storming ? 0.85 : 0.006) && meteors.length < (storming ? 18 : 2)) {
    spawnMeteor();
    if (storming) { const m = meteors[meteors.length - 1]; m.vx *= 1.6; m.vy *= 1.6; }
  }
  meteors = meteors.filter(m => m.life > 0);
  for (const m of meteors) {
    m.x += m.vx; m.y += m.vy; m.life -= 0.014;
    const tail = 22;
    const g = ctx.createLinearGradient(m.x, m.y, m.x - m.vx * tail, m.y - m.vy * tail);
    g.addColorStop(0, `rgba(200, 235, 255, ${0.9 * m.life})`);
    g.addColorStop(1, "rgba(200, 235, 255, 0)");
    ctx.strokeStyle = g;
    ctx.lineWidth = 1.6;
    ctx.beginPath();
    ctx.moveTo(m.x, m.y);
    ctx.lineTo(m.x - m.vx * tail, m.y - m.vy * tail);
    ctx.stroke();
  }

  rafId = heroVisible ? requestAnimationFrame(tick) : null;
}
resize();
rafId = requestAnimationFrame(tick);
/* resize 防抖：拖拽窗口时避免每帧重算整屏星点 */
let resizeT = null;
addEventListener("resize", () => {
  clearTimeout(resizeT);
  resizeT = setTimeout(resize, 150);
});
// Hero 滚出视口时暂停星空渲染，省电省性能
new IntersectionObserver(([e]) => {
  heroVisible = e.isIntersecting;
  if (heroVisible && rafId === null) rafId = requestAnimationFrame(tick);
}).observe(document.getElementById("top"));
addEventListener("mousemove", e => {
  mouseX = e.clientX / innerWidth;
  mouseY = e.clientY / innerHeight;
});

/* ---------- 光标辉光（顺带驱动极光鼠标视差，共用一个 rAF） ---------- */
const glow = document.getElementById("cursorGlow");
if (matchMedia("(hover: hover)").matches) {
  let gx = 0, gy = 0, tx = 0, ty = 0;
  let ntx = 0, nty = 0, ax1 = 0, ay1 = 0, ax2 = 0, ay2 = 0;
  const aurora1 = document.querySelector(".aurora--1");
  const aurora2 = document.querySelector(".aurora--2");
  addEventListener("mousemove", e => {
    tx = e.clientX; ty = e.clientY;
    ntx = e.clientX / innerWidth - 0.5; nty = e.clientY / innerHeight - 0.5;
    document.body.classList.add("has-cursor");
  }, { passive: true });
  (function follow() {
    // 标签页隐藏时跳过样式写入，避免不可见的后台持续占用主线程
    if (!document.hidden) {
      gx += (tx - gx) * 0.08; gy += (ty - gy) * 0.08;
      glow.style.left = gx + "px"; glow.style.top = gy + "px";
      // 极光随光标缓慢漂移（独立 CSS translate 属性，与 drift 关键帧的 transform 叠加）
      ax1 += (ntx * 34 - ax1) * 0.04; ay1 += (nty * 22 - ay1) * 0.04;
      ax2 += (ntx * -26 - ax2) * 0.05; ay2 += (nty * -18 - ay2) * 0.05;
      if (aurora1) aurora1.style.translate = `${ax1.toFixed(2)}px ${ay1.toFixed(2)}px`;
      if (aurora2) aurora2.style.translate = `${ax2.toFixed(2)}px ${ay2.toFixed(2)}px`;
    }
    requestAnimationFrame(follow);
  })();
}

/* ---------- 滚动：进度条 / 导航态 / 回顶按钮 ---------- */
const nav = document.getElementById("nav");
const progress = document.getElementById("progress");
const toTop = document.getElementById("toTop");
addEventListener("scroll", () => {
  const h = document.documentElement;
  progress.style.width = (h.scrollTop / (h.scrollHeight - h.clientHeight) * 100) + "%";
  nav.classList.toggle("is-scrolled", scrollY > 30);
  toTop.classList.toggle("is-show", scrollY > 600);
}, { passive: true });
toTop.addEventListener("click", () => scrollTo({ top: 0, behavior: "smooth" }));

/* ---------- 滚动显现动画 ---------- */
const io = new IntersectionObserver(entries => {
  entries.forEach(e => e.isIntersecting && e.target.classList.add("is-visible"));
}, { threshold: 0.12 });
document.querySelectorAll(".reveal").forEach(el => io.observe(el));

/* ---------- 导航高亮当前 section ---------- */
const navIO = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    document.querySelectorAll("[data-nav]").forEach(a =>
      a.classList.toggle("is-active", a.dataset.nav === e.target.id));
  });
}, { rootMargin: "-40% 0px -55% 0px" });
document.querySelectorAll(".section").forEach(s => navIO.observe(s));

/* ---------- 数字滚动 ---------- */
const counterIO = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    counterIO.unobserve(e.target);
    const target = +e.target.dataset.count;
    const t0 = performance.now();
    (function step(now) {
      const k = Math.min((now - t0) / 1200, 1);
      e.target.textContent = Math.round(target * (1 - Math.pow(1 - k, 3)));
      if (k < 1) requestAnimationFrame(step);
    })(t0);
  });
}, { threshold: 0.6 });
document.querySelectorAll("[data-count]").forEach(el => counterIO.observe(el));

/* ---------- 移动端菜单（含 Esc 关闭 + aria 状态） ---------- */
const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");
function setMenu(open) {
  navLinks.classList.toggle("is-open", open);
  navToggle.setAttribute("aria-expanded", open);
  navToggle.textContent = open ? "✕" : "☰";
}
navToggle.addEventListener("click", () => setMenu(!navLinks.classList.contains("is-open")));
navLinks.querySelectorAll("a").forEach(a => a.addEventListener("click", () => setMenu(false)));
addEventListener("keydown", e => { if (e.key === "Escape") setMenu(false); });

/* ---------- 彩蛋：切走标签页时替换标题 ---------- */
const originalTitle = document.title;
document.addEventListener("visibilitychange", () => {
  document.title = document.hidden ? "🌌 星空等你回来 · Sloaner Nexus" : originalTitle;
});

/* ---------- 页脚年份自动更新 ---------- */
(() => {
  const footerP = document.querySelector(".footer p");
  if (footerP) footerP.innerHTML = footerP.innerHTML.replace("© 2026", `© ${new Date().getFullYear()}`);
})();

/* ============================================================
   v3 增强模块：开屏 / Toast / 证书墙+灯箱 / 3D倾斜 / 磁吸
                涟漪 / 视差 / 彩蛋 / 星际留言板
   ============================================================ */
const REDUCED = matchMedia("(prefers-reduced-motion: reduce)").matches;
const FINE_POINTER = matchMedia("(hover: hover) and (pointer: fine)").matches;

/* 星空彩蛋时间窗（被上方 tick 引用） */
let stormUntil = 0;

/* ---------- 开屏加载动画 ---------- */
(() => {
  const pre = document.getElementById("preloader");
  if (!pre) return;
  if (REDUCED) { pre.remove(); return; }
  const bar = document.getElementById("preBar");
  const tip = document.getElementById("preTip");
  const TIPS = ["正在校准星际坐标…", "点亮 73+ 颗项目卫星…", "给证书镀一层金光…", "预热星际留言通道…"];
  document.body.style.overflow = "hidden";
  const t0 = performance.now();
  let p = 0, tipI = 0, done = false;
  const tipTimer = setInterval(() => { tip.textContent = TIPS[++tipI % TIPS.length]; }, 520);
  const fakeTimer = setInterval(() => {
    p = Math.min(p + Math.random() * 15 + 7, 93);
    bar.style.width = p + "%";
  }, 120);
  const finish = () => {
    if (done) return; done = true;
    clearInterval(fakeTimer); clearInterval(tipTimer);
    bar.style.width = "100%";
    setTimeout(() => {
      pre.classList.add("is-hide");
      document.body.style.overflow = "";
      setTimeout(() => pre.remove(), 800);
    }, Math.max(0, 620 - (performance.now() - t0)));
  };
  // load 可能在本脚本执行前就已触发（脚本被缓存时），必须先判 readyState
  if (document.readyState === "complete") setTimeout(finish, 180);
  else addEventListener("load", () => setTimeout(finish, 180));
  setTimeout(finish, 2600); // 兜底：资源异常也必须放行
})();

/* ---------- Toast ---------- */
const toastsEl = document.getElementById("toasts");
function toast(msg, type = "") {
  const el = document.createElement("div");
  el.className = "toast" + (type ? " toast--" + type : "");
  el.textContent = msg;
  toastsEl.appendChild(el);
  setTimeout(() => el.remove(), 3300);
}

/* ---------- 证书陈列馆数据（均为本人真实证书扫描件，严格按获奖等级分级） ----------
   cat 四级：world 国际/世界级 · national 国家级 · city 省市级 · school 校级 */
const HONORS = [
  /* 🥇 世界 / 国际级 */
  { img: "assets/honors/world-gold-2024.jpg", title: "世界职业院校技能大赛 · 金奖", sub: "2024 总决赛争夺赛 · 电子与信息赛道二", issuer: "世界职业院校技能大赛组委会 · 2024.10", cat: "world", medal: "🥇 世界金奖", cls: "", cardCls: "honor-card--world" },

  /* 🏆 国家级（5 项） */
  { img: "assets/honors/national-scholarship-2023.jpg", title: "中等职业教育国家奖学金（首次）", sub: "2023–2024 学年度", issuer: "教育部 · 人社部 · 2024.12", cat: "national", medal: "国家级", cls: "" },
  { img: "assets/honors/national-scholarship-2024.jpg", title: "中等职业教育国家奖学金（再度）", sub: "2024–2025 学年度 · 全国百名优秀代表", issuer: "教育部 · 人社部 · 2025.12", cat: "national", medal: "国家级", cls: "" },
  { img: "assets/honors/ccf-bigdata-2024.jpg", title: "CCF 全国中职信息技术应用能力大赛 · 一等奖", sub: "2024 决赛 · 大数据应用与服务项目", issuer: "中国计算机学会 CCF-SVC · 2024.11", cat: "national", medal: "全国一等奖", cls: "honor-card__medal--first" },
  { img: "assets/honors/ccf-ai-2025.jpg", title: "CCF 全国中职信息技术应用能力大赛 · 再度一等奖", sub: "2025 决赛 · 大数据应用与 AI 服务赛道", issuer: "中国计算机学会 CCF-SVC · 2025.11", cat: "national", medal: "全国一等奖", cls: "honor-card__medal--first" },
  { img: "assets/honors/zhixing-cup-2026.jpg", title: "「知行杯」全国大学生社会实践大赛 · 全国一等奖", sub: "2026 · 科普知识赛道（大一上学期）", issuer: "知行杯全国组委会 · 2026.10", cat: "national", medal: "全国一等奖", cls: "honor-card__medal--first" },

  /* 🌆 省 / 市级（2 项） */
  { img: "assets/honors/starlight-bigdata-ops.jpg", title: "上海市「星光计划」技能大赛 · 一等奖", sub: "第十一届 · 大数据集群与运维搭建项目", issuer: "上海市教委等四委办局 · 2025.06", cat: "city", medal: "市级一等奖", cls: "honor-card__medal--city" },
  { img: "assets/honors/shanghai-select-2024.jpg", title: "全国职院技能大赛上海选拔赛 · 二等奖", sub: "2024（中职组）· 大数据应用与服务赛项", issuer: "上海市教委职教处 · 2024.06", cat: "city", medal: "市级二等奖", cls: "honor-card__medal--second" },

  /* 🏫 校级（2 项） */
  { img: "assets/honors/school-top-scholarship.jpg", title: "校特等奖学金", sub: "2023–2024 学年第一学期", issuer: "上海信息技术学校 · 2024.05", cat: "school", medal: "校级", cls: "honor-card__medal--second" },
  { img: "assets/honors/school-cadre.jpg", title: "校优秀学生干部", sub: "2023–2024 学年第一学期", issuer: "上海信息技术学校 · 2024.05", cat: "school", medal: "校级", cls: "honor-card__medal--second" },
];
let hCat = "all";
const honorGrid = document.getElementById("honorGrid");

function visibleHonors() {
  // 注意：右侧必须与当前选中分类 hCat 比较（旧代码误写成 h.cat === h.cat 导致筛选恒真）
  return HONORS.map((h, i) => ({ ...h, i })).filter(h => hCat === "all" || h.cat === hCat);
}
function renderHonors() {
  honorGrid.innerHTML = visibleHonors().map((h, k) => `
    <figure class="honor-card spot tilt ${h.cardCls || ""}" tabindex="0" role="button" data-hi="${h.i}"
      style="animation-delay:${Math.min(k * 45, 460)}ms" aria-label="放大查看证书：${h.title}">
      <div class="honor-card__img">
        <img src="${h.img}" alt="${h.title}证书" loading="lazy" decoding="async" />
        <span class="honor-card__medal ${h.cls}">${h.medal}</span>
        <span class="honor-card__zoom" aria-hidden="true">⤢</span>
      </div>
      <figcaption><b>${h.title}</b><small>${h.issuer}</small></figcaption>
    </figure>`).join("");
}
/* 分类按钮上挂数量徽标，让分级一目了然 */
document.querySelectorAll("#honorFilter [data-hcat]").forEach(btn => {
  const c = btn.dataset.hcat;
  btn.dataset.count = c === "all" ? HONORS.length : HONORS.filter(h => h.cat === c).length;
});
renderHonors();
document.getElementById("honorFilter").addEventListener("click", e => {
  const btn = e.target && e.target.closest && e.target.closest("[data-hcat]");
  if (!btn) return;
  document.querySelectorAll("#honorFilter .filter__btn").forEach(b => b.classList.remove("is-active"));
  btn.classList.add("is-active");
  hCat = btn.dataset.hcat;
  renderHonors();
});

/* ---------- 证书灯箱 ---------- */
const lb = document.getElementById("lightbox");
const lbImg = document.getElementById("lbImg");
const lbCap = document.getElementById("lbCap");
const lbCount = document.getElementById("lbCount");
let lbList = [], lbPos = 0, lbReturnFocus = null;

function openLightbox(idx) {
  lbList = visibleHonors();
  lbPos = Math.max(0, lbList.findIndex(h => h.i === idx));
  lbReturnFocus = honorGrid.querySelector(`[data-hi="${idx}"]`);
  lb.hidden = false;
  document.body.style.overflow = "hidden";
  showLightbox();
  lbClose.focus({ preventScroll: true }); // 焦点移入灯箱
}
function showLightbox() {
  const h = lbList[lbPos];
  if (!h) return;
  lbImg.style.animation = "none"; void lbImg.offsetWidth; lbImg.style.animation = "";
  lbImg.src = h.img;
  lbImg.alt = h.title;
  lbCap.replaceChildren();
  const b = document.createElement("b"); b.textContent = h.title;
  const s = document.createElement("span"); s.textContent = ` · ${h.sub}`;
  lbCap.append(b, s);
  lbCount.textContent = `${lbPos + 1} / ${lbList.length}`;
}
function closeLightbox() {
  lb.hidden = true;
  document.body.style.overflow = "";
  lbImg.src = "";
  lbReturnFocus && lbReturnFocus.focus();
}
function stepLightbox(dir) {
  if (!lbList.length) return;
  lbPos = (lbPos + dir + lbList.length) % lbList.length;
  showLightbox();
}
honorGrid.addEventListener("click", e => {
  const card = e.target && e.target.closest && e.target.closest(".honor-card");
  if (card) openLightbox(+card.dataset.hi);
});
honorGrid.addEventListener("keydown", e => {
  if (e.key !== "Enter" && e.key !== " ") return;
  const card = e.target && e.target.closest && e.target.closest(".honor-card");
  if (card) { e.preventDefault(); openLightbox(+card.dataset.hi); }
});
document.getElementById("lbClose").addEventListener("click", closeLightbox);
document.getElementById("lbPrev").addEventListener("click", () => stepLightbox(-1));
document.getElementById("lbNext").addEventListener("click", () => stepLightbox(1));
lb.addEventListener("click", e => { if (e.target === lb) closeLightbox(); });
addEventListener("keydown", e => {
  if (lb.hidden) return;
  if (e.key === "Escape") closeLightbox();
  if (e.key === "ArrowLeft") stepLightbox(-1);
  if (e.key === "ArrowRight") stepLightbox(1);
  // Tab 焦点陷阱：焦点只在关闭/上一张/下一张之间循环
  if (e.key === "Tab") {
    const f = [lbClose, lbPrev, lbNext];
    const i = f.indexOf(document.activeElement);
    e.preventDefault();
    f[(i + (e.shiftKey ? -1 : 1) + f.length) % f.length].focus();
  }
});
/* 焦点陷阱兜底：任何方式（原生 Tab/点击/合成事件）把焦点带出灯箱时拉回。
   延迟到下一个任务执行，规避部分浏览器对 focusin 内嵌套 focus() 的限制 */
document.addEventListener("focusin", e => {
  if (!lb.hidden && !lb.contains(e.target)) {
    setTimeout(() => { if (!lb.hidden) lbClose.focus(); }, 0);
  }
});
/* 触摸滑动切换 */
let touchX = 0;
lb.addEventListener("touchstart", e => { touchX = e.changedTouches[0].clientX; }, { passive: true });
lb.addEventListener("touchend", e => {
  const dx = e.changedTouches[0].clientX - touchX;
  if (Math.abs(dx) > 48) stepLightbox(dx < 0 ? 1 : -1);
}, { passive: true });

/* ---------- 3D 倾斜（事件委托 + rAF 批处理，一帧最多算一次） ---------- */
if (!REDUCED && FINE_POINTER) {
  let tiltEl = null, tiltTarget = null, tiltQueued = false;
  const resetTilt = el => {
    el.style.transform = "";
    el.style.transition = "";
    el.style.removeProperty("--gx");
    el.style.removeProperty("--gy");
  };
  const applyTilt = (e, el) => {
    const r = el.getBoundingClientRect();
    const gx = (e.clientX - r.left) / r.width;
    const gy = (e.clientY - r.top) / r.height;
    el.style.setProperty("--gx", (gx * 100).toFixed(1) + "%");
    el.style.setProperty("--gy", (gy * 100).toFixed(1) + "%");
    el.style.transform = `perspective(900px) rotateX(${((.5 - gy) * 7).toFixed(2)}deg) rotateY(${((gx - .5) * 9).toFixed(2)}deg) translateY(-3px)`;
  };
  document.addEventListener("mousemove", e => {
    tiltTarget = e.target;
    if (tiltQueued) return;
    tiltQueued = true;
    requestAnimationFrame(() => {
      tiltQueued = false;
      const el = tiltTarget && tiltTarget.closest && tiltTarget.closest(".tilt");
      if (el !== tiltEl) {
        if (tiltEl) resetTilt(tiltEl);
        tiltEl = el;
        if (el) el.style.transition = "transform .12s ease-out";
      }
      if (el) applyTilt(e, el);
    });
  }, { passive: true });
  document.addEventListener("mouseout", e => {
    if (!e.relatedTarget && tiltEl) { resetTilt(tiltEl); tiltEl = null; }
  });
}

/* ---------- 磁吸按钮 ---------- */
if (!REDUCED && FINE_POINTER) {
  document.querySelectorAll(".magnetic").forEach(btn => {
    btn.addEventListener("mousemove", e => {
      const r = btn.getBoundingClientRect();
      btn.style.translate = `${((e.clientX - r.left - r.width / 2) * .22).toFixed(1)}px ${((e.clientY - r.top - r.height / 2) * .28).toFixed(1)}px`;
    });
    btn.addEventListener("mouseleave", () => { btn.style.translate = ""; });
  });
}

/* ---------- v4 星际光标：即时光点 + 弹性彗星环 + 星尘轨迹（仅桌面精细指针） ---------- */
if (!REDUCED && FINE_POINTER) {
  const dot = document.createElement("div");
  const ring = document.createElement("div");
  const trail = document.createElement("div");
  dot.className = "cursor-dot";
  ring.className = "cursor-ring";
  trail.className = "cursor-trail";
  document.body.append(trail, ring, dot);
  document.body.classList.add("cursor-custom");

  const INTERACTIVE = "a,button,input,textarea,select,label,.tilt,[role='button'],[tabindex]";
  let mx = innerWidth / 2, my = innerHeight / 2, rx = mx, ry = my;
  let isHover = false, isDown = false, seen = false, lastPX = mx, lastPY = my;
  const particles = [];
  const MAX_P = 18;

  function spawnTrail(x, y) {
    const p = document.createElement("i");
    const ang = Math.random() * Math.PI * 2;
    const dist = 10 + Math.random() * 16;
    p.style.left = x + "px";
    p.style.top = y + "px";
    p.style.setProperty("--hue", String((175 + Math.random() * 105) | 0)); // 青→蓝→紫
    p.style.setProperty("--tx", (Math.cos(ang) * dist).toFixed(1) + "px");
    p.style.setProperty("--ty", (Math.sin(ang) * dist).toFixed(1) + "px");
    trail.appendChild(p);
    particles.push(p);
    if (particles.length > MAX_P) particles.shift().remove(); // 粒子池硬上限，保性能
    setTimeout(() => {
      p.remove();
      const i = particles.indexOf(p);
      if (i >= 0) particles.splice(i, 1);
    }, 720);
  }

  addEventListener("mousemove", e => {
    mx = e.clientX; my = e.clientY;
    if (!seen) { seen = true; document.body.classList.add("cursor-ready"); }
    dot.classList.remove("is-hidden"); ring.classList.remove("is-hidden");
    const over = !!(e.target && e.target.closest && e.target.closest(INTERACTIVE));
    if (over !== isHover) {
      isHover = over;
      ring.classList.toggle("is-hover", over);
      dot.classList.toggle("is-hover", over);
    }
    // 每移动 15px 洒落一粒星尘
    if (Math.hypot(mx - lastPX, my - lastPY) > 15) {
      spawnTrail(mx, my);
      lastPX = mx; lastPY = my;
    }
  }, { passive: true });
  addEventListener("mousedown", () => { isDown = true; });
  addEventListener("mouseup", () => { isDown = false; });
  document.addEventListener("mouseleave", () => {
    dot.classList.add("is-hidden"); ring.classList.add("is-hidden");
  });

  (function cursorLoop() {
    rx += (mx - rx) * 0.18; ry += (my - ry) * 0.18; // 弹性滞后，形成拖尾
    const ds = isDown ? 1.6 : (isHover ? 0.6 : 1);
    const rs = isDown ? 0.8 : (isHover ? 1.5 : 1);
    dot.style.transform = `translate(${mx.toFixed(1)}px,${my.toFixed(1)}px) scale(${ds})`;
    ring.style.transform = `translate(${rx.toFixed(1)}px,${ry.toFixed(1)}px) scale(${rs})`;
    requestAnimationFrame(cursorLoop);
  })();
}

/* ---------- 涟漪点击反馈 ---------- */
if (!REDUCED) {
  document.addEventListener("pointerdown", e => {
    const t = e.target && e.target.closest && e.target.closest(".ripple");
    if (!t) return;
    const r = t.getBoundingClientRect();
    const ink = document.createElement("span");
    ink.className = "ripple__ink";
    ink.style.left = (e.clientX - r.left) + "px";
    ink.style.top = (e.clientY - r.top) + "px";
    t.appendChild(ink);
    setTimeout(() => ink.remove(), 700);
  });
}

/* ---------- Hero 滚动视差 ---------- */
if (!REDUCED) {
  const heroInner = document.getElementById("heroInner");
  addEventListener("scroll", () => {
    const y = scrollY;
    if (y < innerHeight) {
      heroInner.style.transform = `translateY(${y * .18}px)`;
      heroInner.style.opacity = Math.max(0, 1 - y / 620);
    }
  }, { passive: true });
}

/* ---------- 时间线：进入视口逐条点亮（共用一个观察器） ---------- */
if (REDUCED) {
  document.querySelectorAll(".timeline__item").forEach(el => el.classList.add("is-visible"));
} else {
  const tlIO = new IntersectionObserver(entries => {
    entries.forEach(en => {
      if (!en.isIntersecting) return;
      const el = en.target;
      el.style.transitionDelay = (([].indexOf.call(el.parentNode.children, el)) % 4) * 0.08 + "s";
      el.classList.add("is-visible");
      tlIO.unobserve(el);
    });
  }, { threshold: 0.2, rootMargin: "0px 0px -8% 0px" });
  document.querySelectorAll(".timeline__item").forEach(el => tlIO.observe(el));
}

/* ---------- 隐藏彩蛋：Konami Code → 星陨如雨 ---------- */
(() => {
  const CODE = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"];
  let idx = 0;
  addEventListener("keydown", e => {
    const k = e.key.length === 1 ? e.key.toLowerCase() : e.key;
    if (k === CODE[idx]) {
      idx++;
      if (idx === CODE.length) {
        idx = 0;
        stormUntil = Date.now() + 7000;
        document.body.classList.add("storm");
        setTimeout(() => document.body.classList.remove("storm"), 7000);
        toast("🎮 隐藏成就解锁：星陨如雨！", "success");
      }
    } else {
      idx = k === CODE[0] ? 1 : 0;
    }
  });
})();

/* ---------- 星际留言板（Netlify Functions + Blobs，云端持久化） ---------- */
(() => {
  const section = document.getElementById("guestbook");
  if (!section) return;

  const API = "/api";
  const NAME_KEY = "nexus_name", VID_KEY = "nexus_vid", CACHE_KEY = "nexus_gb_cache";
  let vid = null;
  try { vid = localStorage.getItem(VID_KEY); } catch { /* 隐私模式禁止读取 */ }
  if (!vid) {
    vid = (crypto.randomUUID ? crypto.randomUUID() : "v-" + Date.now() + "-" + Math.random().toString(16).slice(2));
    try { localStorage.setItem(VID_KEY, vid); } catch { /* 禁止写入则本次会话内使用内存 vid */ }
  }

  /* 客户端镜像审核（与服务端规则保持一致）：提交前即时拦截，省一次往返。
     只做结构性反垃圾：联系方式引流 / 刷屏重复 / 无有效文字，不维护敏感词库 */
  const meaningfulLen = s => ((String(s).match(/[\u4e00-\u9fffA-Za-z0-9]/g)) || []).length;
  const normalize4spam = s => String(s).toLowerCase().replace(/[\s\-_.·*~～•・、，,]/g, "");
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
  function moderateContent(name, text) {
    if (meaningfulLen(text) < 2) return "留言至少要包含 2 个文字字符哦";
    if (meaningfulLen(name) < 1) return "昵称至少要包含 1 个文字字符";
    const all = normalize4spam(name + " " + text);
    if (/1[3-9]\d{9}/.test(all)) return "为保护隐私，留言中不能出现手机号，请删除后再发";
    if (/(?:q群|qq群|群号|加群|加q|扣扣|带带我|私聊我|滴滴我)[^0-9a-z]{0,8}[0-9]{5,12}/.test(all)) {
      return "检测到疑似引流或联系方式，为保护你的隐私请删除后再发";
    }
    if (/(?:微信|vx|v信|薇信|威信|加微|徽信)[^0-9a-z]{0,8}[a-z0-9][a-z0-9_-]{5,19}/.test(all)) {
      return "检测到疑似微信号等联系方式，请删除后再发";
    }
    if (/(.)\1{11,}/.test(normalize4spam(text))) return "重复字符太多啦，写点真实想法吧";
    if (hasRepeatedPhrase(text)) return "相同内容重复太多次啦，请精简后再发";
    return null;
  }

  const likeBtn = document.getElementById("likeBtn");
  const likeCount = document.getElementById("likeCount");
  const likeHint = document.getElementById("likeHint");
  const statLikes = document.getElementById("statLikes");
  const form = document.getElementById("commentForm");
  const nameInput = document.getElementById("gbName");
  const textInput = document.getElementById("gbText");
  const counter = document.getElementById("gbCounter");
  const submitBtn = document.getElementById("gbSubmit");
  const listEl = document.getElementById("commentList");
  const totalEl = document.getElementById("gbTotal");

  /* 离线提示条 */
  const offline = document.createElement("div");
  offline.className = "gb__offline";
  offline.hidden = true;
  offline.textContent = "⚠️ 星链暂时中断，当前展示的是本地缓存数据";
  listEl.parentNode.insertBefore(offline, listEl);

  let likes = 0, liked = false, comments = [], loaded = false;
  /* 进行中的写操作数：轮询/切回标签页时若有写操作未完成则跳过，
     避免服务端旧状态覆盖乐观更新（旧代码存在此竞态） */
  let inflight = 0;
  const saveCache = () => {
    try { localStorage.setItem(CACHE_KEY, JSON.stringify({ ts: Date.now(), likes, liked, comments })); } catch { /* 存储满或被禁 */ }
  };

  /* 软超时（关键）：绝不能调用 AbortController.abort() —— 一旦 abort，
     Chrome 网络层会无条件在控制台打印 net::ERR_ABORTED 红字，try/catch 消不掉。
     改为「放弃等待」：定时器只拒绝等待方，请求在后台自行结束，控制台保持干净。 */
  const REQUEST_TIMEOUT = 12000;
  function softTimeout(ms) {
    let t;
    const p = new Promise((_, reject) => { t = setTimeout(() => reject(new Error("TIMEOUT")), ms); });
    p.cancel = () => clearTimeout(t);
    return p;
  }
  async function request(path, options = {}) {
    const timer = softTimeout(REQUEST_TIMEOUT);
    let res;
    try {
      res = await Promise.race([
        fetch(API + path, {
          method: "GET",
          ...options,
          headers: { "Content-Type": "application/json", ...(options.headers || {}) },
        }),
        timer,
      ]);
    } finally {
      timer.cancel();
    }
    const data = await res.json().catch(() => ({ ok: false, error: "星链响应解析失败" }));
    if (!res.ok || !data.ok) throw new Error(data.error || `HTTP ${res.status}`);
    return data;
  }
  const friendlyErr = err => err.message === "TIMEOUT" ? "星链响应超时，请稍后再试" : (err.message || "网络异常，请稍后再试");

  const hueOf = s => {
    let h = 0;
    for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
    return h % 360;
  };
  const relTime = ts => {
    const d = (Date.now() - ts) / 1000;
    if (d < 45) return "刚刚";
    if (d < 3600) return `${Math.floor(d / 60)} 分钟前`;
    if (d < 86400) return `${Math.floor(d / 3600)} 小时前`;
    if (d < 86400 * 7) return `${Math.floor(d / 86400)} 天前`;
    return new Date(ts).toLocaleDateString("zh-CN");
  };

  function commentNode(c, pending = false) {
    const el = document.createElement("article");
    el.className = "gb__comment" + (pending ? " is-pending" : "");
    el.dataset.id = c.id;

    const hue = hueOf(c.name || "?");
    const avatar = document.createElement("div");
    avatar.className = "gb__avatar";
    avatar.style.setProperty("--av1", `hsl(${hue} 80% 60%)`);
    avatar.style.setProperty("--av2", `hsl(${(hue + 48) % 360} 76% 64%)`);
    avatar.textContent = Array.from(c.name || "?")[0].toUpperCase();

    const main = document.createElement("div");
    main.className = "gb__c-main";
    const head = document.createElement("div");
    head.className = "gb__c-head";
    const nameB = document.createElement("b");
    nameB.textContent = c.name;
    const time = document.createElement("time");
    time.dateTime = new Date(c.ts).toISOString();
    time.textContent = c.ts ? relTime(c.ts) : "发送中…";
    head.append(nameB, time);

    const text = document.createElement("div");
    text.className = "gb__c-text";
    text.textContent = c.text;

    const foot = document.createElement("div");
    foot.className = "gb__c-foot";
    const like = document.createElement("button");
    like.type = "button";
    like.className = "gb__c-like" + (c.liked ? " is-liked" : "");
    like.textContent = `♥ ${c.likes || 0}`;
    like.dataset.action = "clike";
    foot.appendChild(like);
    if (c.mine) {
      const del = document.createElement("button");
      del.type = "button";
      del.className = "gb__c-del";
      del.textContent = "删除";
      del.dataset.action = "delete";
      foot.appendChild(del);
    }

    main.append(head, text, foot);
    el.append(avatar, main);
    return el;
  }

  const EMPTY_TEXT = "🌌 这片星区还很安静 —— 写下第一条留言，成为第一颗星。";
  function showEmpty(text) {
    listEl.replaceChildren();
    const empty = document.createElement("div");
    empty.className = "gb__empty";
    empty.textContent = text;
    listEl.appendChild(empty);
  }

  /* 就地更新一条已有评论节点（避免整列表重建，导致入场动画在每次轮询时重播闪烁） */
  function updateCommentNode(node, c) {
    node.classList.remove("is-pending");
    const time = node.querySelector("time");
    if (time) { time.dateTime = c.ts ? new Date(c.ts).toISOString() : ""; time.textContent = c.ts ? relTime(c.ts) : "发送中…"; }
    const text = node.querySelector(".gb__c-text");
    if (text) text.textContent = c.text;
    const like = node.querySelector('[data-action="clike"]');
    if (like) {
      like.classList.toggle("is-liked", !!c.liked);
      like.textContent = `♥ ${c.likes || 0}`;
      like.disabled = false;
    }
    let del = node.querySelector('[data-action="delete"]');
    if (c.mine && !del) {
      del = document.createElement("button");
      del.type = "button"; del.className = "gb__c-del";
      del.textContent = "删除"; del.dataset.action = "delete";
      node.querySelector(".gb__c-foot").appendChild(del);
    } else if (!c.mine && del) {
      del.remove();
    }
  }

  /* keyed 增量渲染：新评论带动画插入，已存在的只更新数字/文案，被删的移除 */
  function renderList() {
    totalEl.textContent = comments.length
      ? `已接收 ${comments.length} 段星际信号`
      : "还没有留言，来发出第一段信号吧";
    if (!comments.length) { showEmpty(EMPTY_TEXT); return; }
    if (listEl.querySelector(".gb__empty")) listEl.replaceChildren();

    const old = new Map(
      [...listEl.children].filter(n => n.dataset.id).map(n => [n.dataset.id, n])
    );
    const seen = new Set();
    comments.forEach((c, idx) => {
      seen.add(c.id);
      const node = old.get(c.id);
      if (!node) {
        // 新节点：按服务端顺序插到正确位置
        listEl.insertBefore(commentNode(c), listEl.children[idx] || null);
      } else {
        updateCommentNode(node, c);
      }
    });
    old.forEach((node, id) => { if (!seen.has(id)) node.remove(); });
  }

  function paintSiteLike() {
    likeCount.textContent = likes;
    likeBtn.classList.toggle("is-liked", liked);
    likeBtn.setAttribute("aria-pressed", String(liked));
    likeHint.textContent = liked ? "你已点亮，与所有人一起闪耀 ✦" : "点一下，为这些作品充能";
    if (statLikes) statLikes.textContent = likes;
  }

  const BURST_COLORS = ["#fb7185", "#22d3ee", "#a78bfa", "#fbbf24", "#34d399"];
  function heartBurst() {
    for (let i = 0; i < 14; i++) {
      const s = document.createElement("span");
      s.className = "gb__burst";
      const ang = Math.random() * Math.PI * 2;
      const dist = 38 + Math.random() * 44;
      s.style.setProperty("--bx", (Math.cos(ang) * dist).toFixed(0) + "px");
      s.style.setProperty("--by", (Math.sin(ang) * dist).toFixed(0) + "px");
      s.style.setProperty("--burst", BURST_COLORS[i % BURST_COLORS.length]);
      likeBtn.appendChild(s);
      setTimeout(() => s.remove(), 900);
    }
  }

  function showSkeletons() {
    listEl.innerHTML = Array.from({ length: 3 },
      () => `<div class="gb__skeleton"><i></i><div><span></span><span></span></div></div>`).join("");
  }

  /* 拉取云端状态：冷启动/抖动导致首次失败（含软超时）时自动重试 1 次；
     离线时不发无意义的请求，直接走缓存降级 */
  async function fetchState() {
    if (navigator.onLine === false) throw new Error("OFFLINE");
    const url = `/state?vid=${encodeURIComponent(vid)}`;
    try {
      return await request(url);
    } catch (err1) {
      if (navigator.onLine === false) throw err1;
      await new Promise(r => setTimeout(r, 800));
      return request(url); // 第二次仍失败则抛给 refresh 走离线降级
    }
  }

  /* 单飞：多个触发源（进入视口/轮询/切回标签页/网络恢复）同时调用时共用一个请求，
     既省请求也避免并发竞态 */
  let refreshing = null;
  function refresh(silent = false) {
    if (refreshing) return refreshing;
    refreshing = (async () => {
      if (!silent && !loaded) showSkeletons();
      try {
        const d = await fetchState();
        likes = d.likes | 0;
        liked = Boolean(d.liked);
        comments = Array.isArray(d.comments) ? d.comments : [];
        loaded = true;
        offline.hidden = true;
        paintSiteLike();
        renderList();
        saveCache();
      } catch (err) {
        const raw = localStorage.getItem(CACHE_KEY);
        if (raw) {
          try {
            const c = JSON.parse(raw);
            likes = c.likes | 0; liked = Boolean(c.liked); comments = c.comments || [];
            paintSiteLike(); renderList();
          } catch { /* 缓存损坏则忽略 */ }
        } else if (!silent && !loaded) {
          totalEl.textContent = "星链连接失败";
          showEmpty("星链暂时中断，稍后刷新再试");
        }
        offline.hidden = false;
      } finally {
        refreshing = null;
      }
    })();
    return refreshing;
  }

  /* 站点点赞（乐观更新 + 失败回滚） */
  likeBtn.addEventListener("click", async () => {
    if (likeBtn.classList.contains("is-busy")) return;
    likeBtn.classList.add("is-busy");
    inflight++;
    const prevLiked = liked, prevLikes = likes;
    liked = !prevLiked;
    likes = prevLikes + (liked ? 1 : -1);
    paintSiteLike();
    if (liked) heartBurst();
    try {
      const d = await request("/like", { method: "POST", body: JSON.stringify({ target: "site", vid }) });
      liked = Boolean(d.liked); likes = d.likes | 0;
      paintSiteLike();
      saveCache();
    } catch (err) {
      liked = prevLiked; likes = prevLikes;
      paintSiteLike();
      toast(err.message === "TIMEOUT" ? "点赞超时，状态稍后自动同步" : (err.message || "点赞失败，稍后再试"), "error");
    } finally {
      inflight--;
      likeBtn.classList.remove("is-busy");
    }
  });

  /* 表单 */
  try { nameInput.value = localStorage.getItem(NAME_KEY) || ""; } catch { /* 忽略 */ }
  textInput.addEventListener("input", () => {
    counter.textContent = `${textInput.value.length} / 500`;
  });
  form.addEventListener("submit", async e => {
    e.preventDefault();
    const name = nameInput.value.trim();
    const text = textInput.value.trim();
    if (!name || !text) { toast("昵称和留言内容都要填写哦", "error"); return; }
    const bad = moderateContent(name, text);
    if (bad) { toast(bad, "error"); return; }
    try { localStorage.setItem(NAME_KEY, name); } catch { /* 忽略存储异常 */ }
    submitBtn.disabled = true;
    inflight++;
    const oldLabel = submitBtn.textContent;
    submitBtn.textContent = "跃迁中…";
    try {
      const d = await request("/comment", { method: "POST", body: JSON.stringify({ name, text, vid }) });
      comments.unshift(d.comment);
      renderList();
      saveCache();
      textInput.value = "";
      counter.textContent = "0 / 500";
      toast("信号已抵达星际，感谢留言 ✦", "success");
    } catch (err) {
      toast(friendlyErr(err), "error");
    } finally {
      inflight--;
      submitBtn.disabled = false;
      submitBtn.textContent = oldLabel;
    }
  });

  /* 评论点赞 / 删除（事件委托） */
  listEl.addEventListener("click", async e => {
    const cLike = e.target && e.target.closest && e.target.closest('[data-action="clike"]');
    const cDel = e.target && e.target.closest && e.target.closest('[data-action="delete"]');

    if (cLike) {
      if (cLike.disabled) return; // 防连点：请求未结束前忽略
      const node = cLike.closest(".gb__comment");
      const c = comments.find(x => x.id === node.dataset.id);
      if (!c) return;
      inflight++;
      cLike.disabled = true;
      const prev = { liked: c.liked, likes: c.likes };
      c.liked = !c.liked;
      c.likes = prev.likes + (c.liked ? 1 : -1);
      cLike.classList.toggle("is-liked", c.liked);
      cLike.textContent = `♥ ${c.likes}`;
      try {
        const d = await request("/like", { method: "POST", body: JSON.stringify({ target: "comment", id: c.id, vid }) });
        c.liked = Boolean(d.liked); c.likes = d.likes | 0;
        cLike.classList.toggle("is-liked", c.liked);
        cLike.textContent = `♥ ${c.likes}`;
        saveCache();
      } catch (err) {
        c.liked = prev.liked; c.likes = prev.likes;
        cLike.classList.toggle("is-liked", c.liked);
        cLike.textContent = `♥ ${c.likes}`;
        toast(friendlyErr(err), "error");
      } finally {
        inflight--;
        cLike.disabled = false;
      }
      return;
    }

    if (cDel) {
      if (cDel.disabled) return;
      const node = cDel.closest(".gb__comment");
      const id = node.dataset.id;
      if (!confirm("确定要删除这条留言吗？")) return;
      inflight++;
      cDel.disabled = true;
      try {
        await request(`/comment?id=${encodeURIComponent(id)}&vid=${encodeURIComponent(vid)}`, { method: "DELETE" });
        comments = comments.filter(x => x.id !== id);
        renderList();
        saveCache();
        toast("留言已回收", "success");
      } catch (err) {
        cDel.disabled = false;
        toast(friendlyErr(err), "error");
      } finally {
        inflight--;
      }
    }
  });

  /* 首次进入视口才加载，之后静默轮询 */
  let started = false;
  new IntersectionObserver((ents, ob) => {
    ents.forEach(en => {
      if (en.isIntersecting && !started) {
        started = true;
        ob.disconnect();
        refresh();
      }
    });
  }, { threshold: .15 }).observe(section);

  setInterval(() => {
    if (!loaded || document.hidden || inflight || navigator.onLine === false) return;
    const r = section.getBoundingClientRect();
    if (r.top < innerHeight && r.bottom > 0) refresh(true);
  }, 45000);
  document.addEventListener("visibilitychange", () => {
    if (!document.hidden && loaded && !inflight) refresh(true);
  });
  /* 断网期间展示缓存；网络恢复后自动追回最新状态 */
  window.addEventListener("online", () => refresh(true));
})();
