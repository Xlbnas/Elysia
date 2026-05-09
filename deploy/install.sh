#!/usr/bin/env bash
# =============================================================
#  Elysia.pink — systemd 一键安装脚本
#  用法：sudo bash deploy/install.sh [版本号]
#  示例：sudo bash deploy/install.sh v2.1.0
#        sudo bash deploy/install.sh          # 自动取最新 Release
# =============================================================
set -euo pipefail

REPO="Xlbnas/Elysia"
INSTALL_DIR="/opt/elysia-pink"
SERVICE_NAME="elysia-pink"
BINARY_NAME="elysia-pink-linux-x64"

# 检测架构
ARCH=$(uname -m)
case "$ARCH" in
  x86_64)  BINARY_NAME="elysia-pink-linux-x64"   ;;
  aarch64) BINARY_NAME="elysia-pink-linux-arm64"  ;;
  *)
    echo "❌ 不支持的架构: $ARCH"
    exit 1
    ;;
esac

# 获取版本
VERSION="${1:-}"
if [[ -z "$VERSION" ]]; then
  echo "⬇️  获取最新 Release 版本..."
  VERSION=$(curl -fsSL "https://api.github.com/repos/${REPO}/releases/latest" \
    | grep '"tag_name"' | cut -d'"' -f4)
fi
echo "📦 版本: $VERSION  二进制: $BINARY_NAME"

# 停止旧服务（如存在）
if systemctl is-active --quiet "$SERVICE_NAME" 2>/dev/null; then
  echo "⏹️  停止旧服务..."
  systemctl stop "$SERVICE_NAME"
fi

# 创建安装目录
mkdir -p "$INSTALL_DIR"

# 克隆或更新 public/ 静态资源
if [[ -d "$INSTALL_DIR/.git" ]]; then
  echo "🔄 更新静态资源..."
  git -C "$INSTALL_DIR" pull --ff-only
else
  echo "📂 克隆仓库（仅获取静态资源）..."
  git clone --depth 1 "https://github.com/${REPO}.git" "$INSTALL_DIR"
fi

# 下载二进制
DOWNLOAD_URL="https://github.com/${REPO}/releases/download/${VERSION}/${BINARY_NAME}"
echo "⬇️  下载二进制: $DOWNLOAD_URL"
curl -fsSL "$DOWNLOAD_URL" -o "$INSTALL_DIR/$BINARY_NAME"
chmod +x "$INSTALL_DIR/$BINARY_NAME"

# 安装 systemd 服务
cp "$INSTALL_DIR/deploy/elysia-pink.service" "/etc/systemd/system/${SERVICE_NAME}.service"
# 把服务文件里的二进制路径替换成实际架构的文件名
sed -i "s|elysia-pink-linux-x64|${BINARY_NAME}|g" "/etc/systemd/system/${SERVICE_NAME}.service"

# 权限（www-data 用户）
chown -R www-data:www-data "$INSTALL_DIR" 2>/dev/null || \
  chown -R nobody:nogroup "$INSTALL_DIR" 2>/dev/null || true

# 启动服务
systemctl daemon-reload
systemctl enable "$SERVICE_NAME"
systemctl start  "$SERVICE_NAME"

echo ""
echo "✅ 安装完成！"
echo "   服务状态:  systemctl status $SERVICE_NAME"
echo "   查看日志:  journalctl -u $SERVICE_NAME -f"
echo "   访问地址:  http://localhost:3000"
