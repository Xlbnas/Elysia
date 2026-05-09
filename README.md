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
| **部署** | Docker Compose / systemd 二进制 |

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

---

## 项目结构

```
Elysia/
│
├── .github/
│   └── workflows/
│       └── release.yml         # ★ GitHub Actions：推 tag 自动编译 + 发布 Release
│
├── src/                        # ★ 新版 — 服务端源码
│   ├── index.ts                #   Elysia.js 服务器入口
│   └── views/
│       └── home.tsx            #   主页 JSX 组件（整站模板）
│
├── public/                     # ★ 新版 — 静态资源（由 @elysiajs/static 托管）
│   ├── css/style.css
│   ├── js/particles.js
│   ├── js/app.js
│   ├── img/                    #   站点图片
│   └── ttf/                    #   HFPoet.ttf
│
├── deploy/                     # ★ 新版 — Linux systemd 部署文件
│   ├── elysia-pink.service     #   systemd 单元文件
│   ├── install.sh              #   一键安装脚本
│   └── README.md               #   详细部署说明
│
├── legacy/                     # ☆ 旧版 — 原始静态站点存档（不参与构建）
│   ├── index.html
│   ├── css/index.css
│   ├── js/
│   ├── img/
│   └── ttf/
│
├── Dockerfile                  # ★ Docker 部署
├── docker-compose.yml
├── package.json
├── tsconfig.json
└── bun.lock
```

---

## 部署方式

### 方式一：systemd 二进制（推荐，服务器首选）

无需安装 Bun / Node / Docker，下载预编译二进制直接跑。

**一键安装（自动检测架构）：**
```bash
sudo bash -c "$(curl -fsSL https://raw.githubusercontent.com/Xlbnas/Elysia/main/deploy/install.sh)"
```

**手动安装：**
```bash
# 1. 克隆仓库（含静态资源）
git clone https://github.com/Xlbnas/Elysia.git /opt/elysia-pink
cd /opt/elysia-pink

# 2. 从 Releases 下载二进制（https://github.com/Xlbnas/Elysia/releases/latest）
wget https://github.com/Xlbnas/Elysia/releases/latest/download/elysia-pink-linux-x64
chmod +x elysia-pink-linux-x64

# 3. 配置 systemd
sudo cp deploy/elysia-pink.service /etc/systemd/system/
sudo systemctl daemon-reload
sudo systemctl enable --now elysia-pink

# 验证
curl http://localhost:3000
```

常用运维命令：
```bash
journalctl -u elysia-pink -f    # 实时日志
systemctl restart elysia-pink   # 重启
systemctl status elysia-pink    # 状态
```

> 详见 [deploy/README.md](deploy/README.md)

---

### 方式二：Docker Compose

```bash
# 构建并启动
docker compose up -d --build

# 日志
docker compose logs -f

# 停止
docker compose down
```

访问 [http://localhost:3000](http://localhost:3000)

---

### 方式三：本地开发（Bun）

```bash
bun install
bun run dev      # 热重载
bun run start    # 生产启动
```

---

## 发布新版本

推送版本 tag，GitHub Actions 自动编译 Linux x64 / arm64 二进制并创建 Release：

```bash
git tag v2.1.0
git push origin v2.1.0
```

也可在本地手动编译：
```bash
bun run build:linux-x64    # 编译 Linux x64 到 bin/
bun run build:linux-arm64  # 编译 Linux arm64 到 bin/
bun run build:all           # 同时编译两个平台
```

---

## 版本历史

| 版本 | 说明 |
|------|------|
| **v2.0** *(当前)* | Elysia.js + Bun + TypeScript 完全重构；Docker + systemd 双部署；画廊区域展开；「她的故事」模态 |
| **v1.0** *(legacy/)* | 原始纯静态 HTML + jQuery，无构建工具 |

---

*"要微笑着看到最后一页哦。接下来的故事，就交给你来续写啦。" — 爱莉希雅*

BY [XLBNAS](https://xlbnas.cafe) · Elysia.pink
