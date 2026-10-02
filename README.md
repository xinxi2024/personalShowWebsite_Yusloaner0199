# Sloaner Nexus · 俞顺利的数字枢纽

> 俞顺利（YuSloane）的个人展示门户 —— 深色星际科技风网站，聚合 **73+** 个独立开发并部署的线上项目，附真实荣誉证书陈列馆与**云端持久化的星际留言板（评论 + 点赞）**。

🌐 **在线访问：https://sloanershow.netlify.app/**

## ✨ 网站亮点

### 视觉与交互
- 🚀 **开屏加载动画**：星际轨道 + 进度条 + 随机加载文案，资源就绪后优雅放行（含 2.6s 兜底）
- 🌌 **星空 Canvas**：鼠标视差繁星 + 随机流星，Hero 离屏自动暂停渲染，省电省性能
- 🎞️ **胶片噪点层 + 极光背景**：全站细腻 grain 质感
- 🃏 **3D 倾斜卡片**：卡片随鼠标实时 perspective 倾斜，移动到卡片上还有扫光
- 🧲 **磁吸按钮 + 涟漪点击反馈**：主按钮被光标轻微吸引，点击泛起水波纹
- ⌨️ **打字机轮播**：身份标签循环展示
- 🔦 **聚光灯卡片**：辉光跟随鼠标位置
- 🎬 **Hero 滚动视差 / 标题辉光 / 滚动显现 / 数字滚动**
- 📊 **滚动进度条 / 回顶按钮 / 导航当前区高亮 / 移动端菜单**

### 内容模块
- 🏅 **荣誉时刻**：8 个里程碑时间线（按真实证书日期核对）
- 🖼️ **证书陈列馆**：10 张真实证书扫描件，分类筛选（重磅 / 市级 / 校级），点击打开**灯箱**大图，支持键盘 ←/→/Esc 与手机触摸滑动
- 🔍 **项目宇宙**：73+ 项目卡片，分类筛选 + 关键词搜索
- 📈 **技能进度条**：按 GitHub 103 个仓库真实语言占比生成

### 星际留言板（评论 + 点赞，云端持久化）
- 💗 **站点点赞**：一键为网站充能，爱心粒子迸发，点赞数同步到 Hero 数据区
- 💬 **访客评论**：昵称 + 留言，所有人可见；可点赞任意评论；可删除自己的留言
- ☁️ **数据持久化**：后端 Netlify Functions + **Netlify Blobs** 强一致存储，刷新 / 换设备数据不丢
- 🛡️ **服务端防护**：基于 IP+UA+浏览器指纹的访客标识、20 秒/条 & 5 条/小时限流、长度与链接数校验、仅本人可删
- ⚡ **前端体验**：乐观更新 + 失败回滚、骨架屏加载、localStorage 离线缓存降级、进入视口才请求、45 秒静默轮询 + 切回标签页自动刷新
- 📱 完整响应式；♿ 支持 `prefers-reduced-motion`，全键盘可达

### 🎮 隐藏彩蛋
在页面任意位置输入 Konami 秘技 `↑ ↑ ↓ ↓ ← → ← → B A`，触发 7 秒「**星陨如雨**」流星风暴。

## 🗂️ 项目结构

```
├── index.html                    # 主页面
├── tx.jpg                        # 头像
├── netlify.toml                  # Netlify 配置（Functions 目录）
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
| `/api/comment` | POST | 发表评论（限流 + 昵称 ≤24 字 / 内容 ≤500 字 / 链接 ≤3 个） |
| `/api/comment?id=&vid=` | DELETE | 删除本人评论（指纹或浏览器 vid 校验） |

- 运行时：Netlify Functions v2（Web Request / Response，ESM `.mjs`，`config.path` 声明路由）
- 存储：`@netlify/blobs` 的 `getStore({ name: "nexus-guestbook", consistency: "strong" })`，单 JSON blob（`siteLikes` + `comments`，最多保留最新 400 条）
- 访客身份：`sha256(IP + UA + 本地随机 vid)`，服务端不保存任何原始个人信息

## 🚀 部署（Netlify）

无构建步骤，仓库根目录即发布目录。

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
- 「知行杯」全国大学生社会实践大赛 · **全国一等奖**（2026 · 科普知识赛道，大一上学期）
- 上海三校生高考总分第一 & 数学单科第一（257/300）

## 👤 关于我

- 上海商学院 · 物联网工程（2026 级），班长兼副团支书
- GitHub：[@xinxi2024](https://github.com/xinxi2024) · 103 个公开仓库（JS 34 / HTML 27 / Python 24 / TS 7 等）
- 独立开发并部署 73+ 个线上作品

> 做出东西，比谈论想法更有价值。
