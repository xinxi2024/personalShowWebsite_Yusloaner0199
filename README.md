# Sloaner Nexus · 俞顺利的数字枢纽

> 俞顺利（YuSloane）的个人展示门户 —— 深色星际科技风网站，聚合 **73+** 个独立开发并部署的线上项目，附真实荣誉证书陈列馆与**云端持久化的星际留言板（评论 + 点赞）**。

🌐 **在线访问：https://sloanershow.netlify.app/**

## ✨ 网站亮点

### 视觉与交互
- 🚀 **开屏加载动画**：星际轨道 + 进度条 + 随机加载文案，资源就绪后优雅放行（含 2.6s 兜底）
- 🌌 **星空 Canvas**：鼠标视差繁星 + 随机流星，Hero 离屏自动暂停渲染，省电省性能
- 🎞️ **胶片噪点层 + 极光背景**：全站细腻 grain 质感
- 🃏 **3D 倾斜卡片**：卡片随鼠标实时 perspective 倾斜（rAF 合批，不阻塞主线程），移动到卡片上还有扫光
- 🧲 **磁吸按钮 + 涟漪点击反馈**：主按钮被光标轻微吸引，点击泛起水波纹
- ⌨️ **打字机轮播**：身份标签循环展示
- 🔦 **聚光灯卡片**：辉光跟随鼠标位置
- 🎬 **Hero 滚动视差 / 标题辉光 / 滚动显现 / 数字滚动**
- 📊 **滚动进度条 / 回顶按钮 / 导航当前区高亮 / 移动端菜单**

### 内容模块
- 🏅 **荣誉时刻**：13 个里程碑时间线，从 2022.09 入学到 2026.10 知行杯全国一等奖，严格按真实日期排序，最新节点金色脉冲
- 🖼️ **证书陈列馆**：10 张真实证书扫描件，**严格按获奖等级四级分类**（🥇 世界/国际 1 · 🏆 国家级 5 · 🌆 省/市级 2 · 🏫 校级 2），按钮带数量徽标；点击打开**灯箱**大图，支持键盘 ←/→/Esc 与手机触摸滑动
- 🔍 **项目宇宙**：73+ 项目卡片，分类筛选 + 关键词搜索
- 📈 **技能进度条**：按 GitHub 103 个仓库真实语言占比生成

### 星际留言板（评论 + 点赞，云端持久化）
- 💗 **站点点赞**：一键为网站充能，爱心粒子迸发，点赞数同步到 Hero 数据区
- 💬 **访客评论**：昵称 + 留言，所有人可见；可点赞任意评论；可删除自己的留言
- ☁️ **数据持久化**：后端 Netlify Functions + **Netlify Blobs** 强一致存储，刷新 / 换设备数据不丢
- 🛡️ **服务端防护**：浏览器 vid 稳定身份（不依赖易漂移的 IP）、发评论 20 秒/条 & 同身份 5 条/小时 + 同 IP 10 条/小时双重限流、点赞 30 次/分钟/IP、长度与链接数校验、仅本人可删
- ⚡ **前端体验**：乐观更新 + 失败回滚、骨架屏加载、localStorage 离线缓存降级、进入视口才请求、45 秒静默轮询 + 切回标签页自动刷新（写操作进行中自动跳过轮询，杜绝竞态覆盖）、按钮防连点
- 🔁 **请求可靠性**：状态拉取**单飞锁**（多触发源并发只发一个请求）+ 冷启动失败 800ms 自动重试一次 + 12s 超时，根治 `net::ERR_ABORTED`；评论列表 **keyed 增量渲染**，轮询刷新不再重播入场动画、评论不闪不跳
- 📱 完整响应式；♿ 支持 `prefers-reduced-motion`，全键盘可达；灯箱内置 Tab 焦点陷阱（keydown 循环 + focusin 兜底）与全局青色 `:focus-visible` 焦点环

### 🎮 隐藏彩蛋
在页面任意位置输入 Konami 秘技 `↑ ↑ ↓ ↓ ← → ← → B A`，触发 7 秒「**星陨如雨**」流星风暴。

## 🗂️ 项目结构

```
├── index.html                    # 主页面
├── tx.jpg                        # 头像
├── netlify.toml                  # Netlify 配置（Functions 目录 + 静态资源缓存头）
├── package.json                  # 仅声明函数依赖 @netlify/blobs
├── netlify/
│   └── functions/
│       └── api.mjs               # 留言板 API（Functions v2，路由 /api/*）
├── assets/
│   ├── css/style.css             # 全部样式
│   ├── js/main.js                # 项目数据 + 全部交互逻辑
│   └── honors/                   # 10 张优化后的证书图（PDF 渲染→裁白边→压缩）
└── *.md                          # 内容底稿（与网站数据同步）
```

## 🔧 后端架构（Netlify Functions + Blobs）

零运维、零数据库费用，与静态站同一仓库部署：

| 路由 | 方法 | 作用 |
| --- | --- | --- |
| `/api/state?vid=` | GET | 站点点赞数 + 评论列表（含当前访客的点赞 / 可删标记） |
| `/api/like` | POST | 站点点赞 / 取消，或对某条评论点赞（body: `{target, id?, vid}`） |
| `/api/comment` | POST | 发表评论（vid+IP 双重限流 + 昵称 ≤24 字 / 内容 ≤500 字 / 链接 ≤3 个） |
| `/api/comment?id=&vid=` | DELETE | 删除本人评论（指纹或浏览器 vid 校验） |

- 运行时：Netlify Functions v2（Web Request / Response，ESM `.mjs`，`config.path` 声明路由）
- 存储：`@netlify/blobs` 的 `getStore({ name: "nexus-guestbook", consistency: "strong" })`，单 JSON blob（`siteLikes` + `comments`，最多保留最新 400 条）
- 访客身份：浏览器 localStorage 持久化随机 `vid` 的哈希（IP 会因网络切换漂移，不做主身份），服务端不保存任何原始个人信息；IP 仅用于点赞限流（30 次/分钟）

## 🚀 部署（Netlify）

无构建步骤，仓库根目录即发布目录。

**缓存策略**（`netlify.toml`）：证书图等不可变资源 `max-age=31536000, immutable`；JS/CSS 5 分钟短缓存 + 1 天 `stale-while-revalidate`，发版后快速生效。

**方式一：Git 自动同步（当前使用）**
1. [app.netlify.com](https://app.netlify.com) → Add new site → Import an existing project
2. 选择 GitHub 仓库 `personalShowWebsite_Yusloaner0199`
3. Branch: `main`；Build command 留空；Publish directory 留空（根目录）
4. Deploy —— 每次 `git push` 自动部署，函数依赖由 Netlify 按 `package.json` 自动安装
5. Blobs 由 Functions 运行时自动注入，**无需手动建库**

**方式二：Netlify CLI 本地联调**

```bash
npm i -g netlify-cli
netlify dev          # 本地同时跑静态站与 /api 函数（含 Blobs 模拟器）
netlify deploy       # 预览部署；netlify deploy --prod 生产部署
```

## 🧰 收录项目系列

| 系列 | 数量 | 总入口 |
| --- | --- | --- |
| 🧰 Sloaner 百宝箱 | 31 款效率工具 | https://ysloaner-treasure-chest.onrender.com/ |
| 🎮 YuSloane 游戏帝国 | 32 款经典游戏 | https://ysloaner-game-empire.netlify.app/ |
| 📊 数据应用 | 10 款数据/学习应用 | 见 `个人项目集合.md` |
| 🛰️ Sloaner 智启星际 | 技术集成系列 | https://ysloaner-technological.netlify.app/ |

## 🏆 主要荣誉

- 世界职业院校技能大赛 2024 总决赛争夺赛 · **金奖**（电子与信息赛道二）
- CCF 全国中职信息技术应用能力大赛 **两届一等奖**：2024 大数据应用与服务项目、2025 大数据应用与 AI 服务赛道
- **两获**中等职业教育国家奖学金（2023–2024、2024–2025 学年），第二次入选全国 100 名优秀代表（上海市仅 2 名中职学生），事迹荣登《人民日报》2026 年 5 月 4 日第 07 版
- 上海市「星光计划」第十一届职业院校技能大赛 · 一等奖（大数据集群与运维搭建）
- 全国职业院校技能大赛上海选拔赛 · 二等奖（2024.06，大数据应用与服务赛项）
- 「知行杯」全国大学生社会实践大赛 · **全国一等奖**（2026.10 · 科普知识赛道，大一上学期）
- 上海三校生高考总分第一 & 数学单科第一（257/300，2026.06）
- 校级：校特等奖学金、校优秀学生干部（2024.05）

## 👤 关于我

- 上海商学院 · 物联网工程（2026 级），班长兼副团支书
- GitHub：[@xinxi2024](https://github.com/xinxi2024) · 103 个公开仓库（JS 34 / HTML 27 / Python 24 / TS 7 等）
- 独立开发并部署 73+ 个线上作品

> 做出东西，比谈论想法更有价值。
