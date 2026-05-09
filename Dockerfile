FROM oven/bun:1-alpine AS base
WORKDIR /app

# 安装依赖（利用层缓存）
COPY package.json ./
# 兼容两种锁文件格式（bun.lock 文本格式 / bun.lockb 二进制格式）
COPY bun.lock* bun.lockb* ./
RUN bun install --frozen-lockfile --production

# 复制源码与静态资源（img/ttf 已在 public/ 内，无需单独复制）
COPY src/ ./src/
COPY public/ ./public/
COPY tsconfig.json ./

EXPOSE 3000

ENV PORT=3000
ENV NODE_ENV=production

CMD ["bun", "run", "src/index.ts"]
