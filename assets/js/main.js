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
    <a class="project spot ${p.cat === "hub" ? "project--hub" : ""}"
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
  const btn = e.target.closest(".filter__btn");
  if (!btn) return;
  document.querySelectorAll(".filter__btn").forEach(b => b.classList.remove("is-active"));
  btn.classList.add("is-active");
  currentCat = btn.dataset.cat;
  renderProjects();
});
searchInput.addEventListener("input", renderProjects);

/* ---------- 聚光灯卡片：鼠标位置追踪 ---------- */
document.addEventListener("mousemove", e => {
  const card = e.target.closest(".spot");
  if (!card) return;
  const r = card.getBoundingClientRect();
  card.style.setProperty("--mx", `${e.clientX - r.left}px`);
  card.style.setProperty("--my", `${e.clientY - r.top}px`);
});

/* ---------- 打字机 ---------- */
const ROLES = [
  "物联网工程在读 · 独立开发者",
  "中等职业教育国家奖学金得主",
  "世界职业院校技能大赛 · 团体金奖",
  "上海三校生高考总分第一",
  "73+ 个线上项目的创造者",
];
const typedEl = document.getElementById("typed");
(function typeLoop(roleIdx = 0, charIdx = 0, deleting = false) {
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

/* ---------- 星空 Canvas：星星 + 流星 + 鼠标视差 ---------- */
const canvas = document.getElementById("stars");
const ctx = canvas.getContext("2d");
let stars = [], meteors = [];
let mouseX = 0.5, mouseY = 0.5;

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

  // 流星
  if (Math.random() < 0.006 && meteors.length < 2) spawnMeteor();
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

  requestAnimationFrame(tick);
}
resize();
requestAnimationFrame(tick);
addEventListener("resize", resize);
addEventListener("mousemove", e => {
  mouseX = e.clientX / innerWidth;
  mouseY = e.clientY / innerHeight;
});

/* ---------- 光标辉光 ---------- */
const glow = document.getElementById("cursorGlow");
if (matchMedia("(hover: hover)").matches) {
  let gx = 0, gy = 0, tx = 0, ty = 0;
  addEventListener("mousemove", e => { tx = e.clientX; ty = e.clientY; document.body.classList.add("has-cursor"); });
  (function follow() {
    gx += (tx - gx) * 0.08; gy += (ty - gy) * 0.08;
    glow.style.left = gx + "px"; glow.style.top = gy + "px";
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

/* ---------- 移动端菜单 ---------- */
document.getElementById("navToggle").addEventListener("click", () =>
  document.getElementById("navLinks").classList.toggle("is-open"));
document.querySelectorAll("#navLinks a").forEach(a =>
  a.addEventListener("click", () => document.getElementById("navLinks").classList.remove("is-open")));
