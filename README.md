# Elysia.pink — 爱莉希雅，我爱你 ♡

> 献给《崩坏3》角色「爱莉希雅 / Elysia」的个人情感告白页面  
> 粉色妖精、逐火英桀之首，最动人心弦的少女 ✦

---

## 技术栈

| 层级 | 技术 |
|------|------|
| **Runtime** | [Bun](https://bun.sh/) v1.3+ |
| **框架** | [Elysia.js](https://elysiajs.com/) v1.4 |
| **语言** | TypeScript (严格模式) |
| **HTML 渲染** | [@elysiajs/html](https://github.com/elysiajs/elysia-html) — JSX 服务端渲染 |
| **静态资源** | [@elysiajs/static](https://github.com/elysiajs/elysia-static) |
| **CSS** | Tailwind CSS CDN + 自定义 CSS |
| **交互** | Alpine.js v3 |
| **字体** | HFPoet（自定义）+ Noto Serif SC |
| **部署** | Docker / Docker Compose |

---

## 特性

- 🌸 **Canvas 粒子系统** — 飘落的粉色心形与花瓣
- 💖 **心跳动画** — 装饰元素的脉冲光晕效果
- 🪟 **玻璃态弹窗** — 毛玻璃质感的角色故事模态
- 🖼️ **画廊区域展开** — 点击图片在画廊内就地展开，其余图片变暗，缩略图条切换
- 🖱️ **鼠标光晕** — 桌面端的粉色跟随光效
- 📜 **滚动淡入** — IntersectionObserver 驱动的视差入场
- 📱 **完美响应式** — 移动端专属背景图与 touch 优化
- 🎵 **音乐播放器** — 网易云嵌入，精心美化样式
- ✨ **文字闪光** — Shimmer 渐变标题动画
- 🔠 **自定义字体** — HFPoet 本地加载，正确 fallback

---

## 项目结构

```
Elysia/
│
├── src/                        # ★ 新版 — 服务端源码
│   ├── index.ts                #   Elysia.js 服务器入口
│   └── views/
│       └── home.tsx            #   主页 JSX 组件（整站模板）
│
├── public/                     # ★ 新版 — 静态资源（由 @elysiajs/static 托管）
│   ├── css/
│   │   └── style.css           #   自定义样式 + 动画关键帧
│   ├── js/
│   │   ├── particles.js        #   Canvas 粒子引擎
│   │   └── app.js              #   页面交互逻辑
│   ├── img/                    #   站点图片资源
│   └── ttf/                    #   自定义字体（HFPoet.ttf）
│
├── legacy/                     # ☆ 旧版 — 原始静态站点存档（不参与构建）
│   ├── index.html              #   原始单页 HTML
│   ├── css/
│   │   └── index.css           #   原始样式表
│   ├── js/
│   │   ├── jquery-3.4.1.min.js #   jQuery 库
│   │   └── pageSwitch.js       #   页面切换库
│   ├── img/                    #   原始图片资源
│   └── ttf/                    #   原始字体文件
│
├── Dockerfile                  # ★ 新版 — 容器构建配置
├── docker-compose.yml          # ★ 新版 — 本地 / 生产部署编排
├── package.json                # ★ 新版
├── tsconfig.json               # ★ 新版
└── bun.lock                    # ★ 新版
```

---

## 快速启动（Docker，推荐）

```bash
# 构建并启动
docker compose up -d --build

# 查看日志
docker compose logs -f

# 停止
docker compose down
```

访问 [http://localhost:3000](http://localhost:3000)

---

## 本地开发

```bash
# 安装依赖（需要 Bun v1.3+）
bun install

# 开发模式（热重载）
bun run dev

# 生产启动
bun run start
```

---

## 版本历史

| 版本 | 说明 |
|------|------|
| **v2.0** *(当前)* | 使用 Elysia.js + Bun + TypeScript 完全重构；Alpine.js 交互；Docker 部署；画廊区域展开动效；「她的故事」模态 |
| **v1.0** *(legacy/)* | 原始纯静态 HTML + jQuery，无构建工具 |

---

*"要微笑着看到最后一页哦。接下来的故事，就交给你来续写啦。" — 爱莉希雅*

BY [XLBNAS](https://xlbnas.cafe) · Elysia.pink
