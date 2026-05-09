# 部署指南 — systemd 二进制方式

本目录包含将 Elysia.pink 部署为 Linux systemd 服务所需的全部文件。

## 文件说明

| 文件 | 说明 |
|------|------|
| `elysia-pink.service` | systemd 单元文件 |
| `install.sh` | 一键安装脚本（下载二进制 + 配置服务） |

---

## 一键安装（推荐）

在目标 Linux 服务器上执行：

```bash
# 自动取最新 Release
sudo bash -c "$(curl -fsSL https://raw.githubusercontent.com/Xlbnas/Elysia/main/deploy/install.sh)"

# 指定版本
sudo bash -c "$(curl -fsSL https://raw.githubusercontent.com/Xlbnas/Elysia/main/deploy/install.sh)" _ v2.1.0
```

脚本会自动：
1. 检测服务器架构（x64 / arm64）
2. 克隆仓库（获取 `public/` 静态资源）
3. 从 GitHub Releases 下载对应的预编译二进制
4. 安装并启动 systemd 服务

---

## 手动安装

```bash
# 1. 克隆仓库
git clone https://github.com/Xlbnas/Elysia.git /opt/elysia-pink
cd /opt/elysia-pink

# 2. 从 Releases 页面下载二进制
#    https://github.com/Xlbnas/Elysia/releases/latest
wget https://github.com/Xlbnas/Elysia/releases/latest/download/elysia-pink-linux-x64
chmod +x elysia-pink-linux-x64

# 3. 安装 systemd 服务
sudo cp deploy/elysia-pink.service /etc/systemd/system/
sudo systemctl daemon-reload
sudo systemctl enable --now elysia-pink

# 4. 验证
systemctl status elysia-pink
curl http://localhost:3000
```

---

## 常用命令

```bash
# 查看状态
systemctl status elysia-pink

# 实时日志
journalctl -u elysia-pink -f

# 重启
systemctl restart elysia-pink

# 停止
systemctl stop elysia-pink

# 更新（重新运行安装脚本即可）
sudo bash /opt/elysia-pink/deploy/install.sh v2.x.x
```

---

## 环境变量

在 `elysia-pink.service` 的 `[Service]` 段修改：

```ini
Environment=PORT=3000       # 监听端口
Environment=NODE_ENV=production
```

修改后执行 `sudo systemctl daemon-reload && sudo systemctl restart elysia-pink`。

---

## 发布新版本

在本地推送版本 tag，GitHub Actions 自动构建并发布 Release：

```bash
git tag v2.1.0
git push origin v2.1.0
```
