# Sloaner Nexus · 俞顺利的数字枢纽

俞顺利（YuSloane）的个人作品集，以精致星际科技风呈现个人经历、代表作品与真实荣誉。纯静态前端，配合 Netlify Functions 与 Netlify Blobs 留言板。

- 网站：[sloanershow.netlify.app](https://sloanershow.netlify.app/)
- GitHub：[@xinxi2024](https://github.com/xinxi2024)
- 当前版本：v5.0.1 · 更新日期：2026-10-04
- 收录口径：**72 个单品（31 个工具、32 个游戏、9 个数据应用），另有 3 个系列入口**。系列入口不重复计入单品总数。
- 荣誉：13 个成长节点、10 张证书，按世界 / 国际、国家、省 / 市、校级四类展示。

## 页面与视觉

页面顺序：首屏 → 精选作品 → 关于我 → 完整项目库 → 荣誉 → 技能与实践 → 联系与留言。

- 深蓝黑底色，青色作为主强调、紫色辅助，金色强调重要荣誉；统一细边框、圆角、留白与 SVG 分类图标。
- 桌面首屏左侧呈现姓名与定位，右侧头像、轨道和星空；手机上下排列。内容宽度上限 1200px，桌面区块间距 96px，手机 64px。
- 默认原生光标，取消阻挡阅读的开屏加载与持续打字动画。聚光和轻微倾斜仅用于精选作品，正文使用短距离入场。
- 星空与轨道在首屏离开视口或标签页隐藏时暂停；`prefers-reduced-motion` 禁用持续动画及平滑滚动。
- 导航包含移动菜单、当前区高亮；支持跳过导航、键盘焦点、原生详情展开、证书灯箱焦点循环及触摸切换。

## 精选作品与目录

精选作品：**Sloaner 百宝箱、YuSloane 游戏帝国、智绘大数据、艾宾浩斯复习工具**。提供真实界面截图、功能简介、访问入口和页内展开案例。

截图于 2026-10-04 从四个实际网站获取。游戏帝国使用加载完成后的界面；智绘大数据展示实际电商数据大屏；复习工具展示 `P29-P30` 的计算结果。截图是预览快照，数据值不作为网站成果指标。图片使用 WebP 压缩并延迟加载；加载失败保留文字封面。

案例依据现有底稿与实际页面说明，不推断未核实的技术栈。技能展示以实践程度与方向说明替代含义不明确的百分比，不继续展示未经实时核实的 GitHub 仓库总数。

- 三个系列入口单独展示，单品目录保留原有全部访问链接。
- 目录支持分类、名称与功能关键词搜索，每批 12 项；分类或搜索变化后重置展示数量。
- 显示匹配总数与已展示数量；无结果时提供清空筛选。
- 项目分类与证书分类独立维护选中状态。
- 项目数量从 `PROJECTS` 自动计算，证书数量从 `HONORS` 自动计算。
- 稳定项目 ID 基于部署域名；新增项目时保证域名 ID 唯一，精选案例配置位于 `CASES`。

## 荣誉与个人介绍

关于我包括教育与成长、开发方向、做事方式、目前关注。当前关注内容来自个人底稿：TinyClimate 物联网探索、数据应用与持续完善项目库。

重要荣誉突出世界职业院校技能大赛团体金奖、两次中等职业教育国家奖学金、CCF 两届全国一等奖。成长时间线按日期倒序，默认展示最新 4 项，可展开全部 13 个节点。证书保持原有四级分类（世界 / 国际 1、国家 5、省 / 市 2、校级 2），支持点击放大、← / → / Esc、Tab 循环与手机滑动。

联系方式仅使用现有 GitHub 和站内留言，没有新增公开个人联系方式。

## 留言板与 API

现有后端与存储保持兼容，不新增 API。支持站点点赞、评论、评论点赞和删除自己的评论。

| 路由 | 方法 | 作用 |
| --- | --- | --- |
| `/api/state?vid=` | GET | 点赞数、评论列表、当前访客点赞及可删除标记 |
| `/api/like` | POST | 站点或评论点赞 / 取消，body 为 `{target, id?, vid}` |
| `/api/comment` | POST | 发表评论，body 为 `{name, text, vid}` |
| `/api/comment?id=&vid=` | DELETE | 删除本人评论 |

- Netlify Functions v2，使用 `@netlify/blobs` 的 `nexus-guestbook` 强一致存储；保留最新 400 条评论。
- 浏览器 localStorage 保存稳定随机 `vid`，后端使用其哈希识别访客。保留昵称 / 内容长度、链接数、结构性反垃圾和身份 / IP 限流规则。
- 点赞乐观更新与失败回滚、按钮防连点；进入留言区域后才拉取数据，45 秒静默轮询，返回标签页或恢复网络时刷新。
- 使用单飞读取、冷启动重试和软超时；评论按 ID 增量更新，避免重复入场与闪烁。
- v5 新增清晰的发送状态、输入标签、失败重试入口；localStorage 禁用时可正常回退。
- 读取请求记录写操作版本，丢弃与写操作交错的旧响应；写操作结束后重新同步。评论列表保持服务端顺序。
- Konami 彩蛋保留；减少动态效果或正在输入时不触发。

## 项目结构

```text
index.html                     主页面与分享元信息
assets/css/style.css           设计变量、组件与响应式样式
assets/js/main.js              项目数据、案例、目录与交互
assets/projects/*.webp         四个精选作品的真实界面截图
assets/brand/favicon.svg       品牌图标
assets/brand/social-cover.svg  可编辑的社交分享封面
assets/brand/social-cover.png  1200 × 630 分享图片
assets/honors/                 10 张证书优化图
netlify/functions/api.mjs      原有留言板 API
netlify.toml                   Functions 与缓存配置
package.json                   后端依赖和检查命令
tests/project-data.test.mjs   项目数据与资源完整性检查
tests/browser-smoke.cjs       浏览器交互与响应式回归
```

原始证书、申报表位于 `奖状/`，受 `.gitignore` 保护；网页只使用已有优化证书图。后台存储内容不进入 Git。

## 本地预览与验证

静态预览：

```sh
python3 -m http.server 4173 --bind 127.0.0.1
```

访问 `http://127.0.0.1:4173`。纯静态服务器不运行 `/api`，留言区会显示连接失败与重试；实际 API 联调使用 Netlify CLI 的 `netlify dev`。

基础检查（仅需要 Node.js）：

```sh
npm run check
npm test
```

浏览器回归需要 Playwright 及 Chromium。可使用环境中已有的 Playwright，或安装到临时目录，不必增加生产依赖：

```sh
npm install --prefix /tmp/nexus-browser-check playwright
/tmp/nexus-browser-check/node_modules/.bin/playwright install chromium
NODE_PATH=/tmp/nexus-browser-check/node_modules npm run test:browser
```

默认测试地址为 `http://127.0.0.1:4173`；可通过 `NEXUS_TEST_URL` 设置其他预览地址。测试拦截全部 `/api/*` 请求，**不会向线上留言板写入测试内容**。

覆盖项目数量、ID 与资源，搜索与加载更多，分类状态隔离，案例与时间线展开，灯箱键盘操作，360 / 390 / 768 / 1440px 布局，移动菜单，留言与点赞成功 / 失败回滚 / 删除 / 离线缓存 / 重试 / 存储禁用，以及旧读取成功 / 失败与写入交错时的状态保护、图片失败回退、减少动态效果与首屏离屏暂停。

## Netlify 部署

本项目使用 Git 自动部署，生产分支为 `main`，仓库为 `xinxi2024/personalShowWebsite_Yusloaner0199`。

1. 修改后完成基础检查与浏览器回归。
2. 提交并推送 `main`，触发 Netlify 自动部署。
3. 在 Netlify 查看构建结果，并确认生产站 HTML、CSS、JS 和新增图片与本次发布一致。
4. 使用只读 `/api/state` 检查留言接口；不要发布测试留言或点赞。

没有前端构建步骤，发布目录为仓库根目录。Netlify 按 `package.json` 安装 Functions 依赖；Blobs 由运行时提供，无需重新建库。

CSS / JS 使用版本参数，静态资源缓存 5 分钟并允许后台重新验证；证书图片保持一年缓存。更新已有证书图片时应更换文件名，避免不可变缓存保留旧图。分享封面使用绝对生产 URL。

如需回退，使用 Git 撤销本次发布提交后推送，触发重新部署；后端接口和 Blobs 数据没有迁移。

> 做出东西，比谈论想法更有价值。
