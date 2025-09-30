#!/bin/bash

# AnchorChain Intelligence 部署脚本
# 用于快速部署到生产环境

set -e

echo "🚀 Starting AnchorChain Intelligence deployment..."

# 检查环境变量
if [ -z "$DATABASE_URL" ]; then
    echo "❌ Error: DATABASE_URL environment variable is required"
    exit 1
fi

# 安装依赖
echo "📦 Installing dependencies..."
npm ci

# 生成 Prisma 客户端
echo "🔧 Generating Prisma client..."
npm run db:generate

# 运行数据库迁移
echo "🗄️ Running database migrations..."
npm run db:push

# 运行种子数据（仅在开发环境）
if [ "$NODE_ENV" = "development" ]; then
    echo "🌱 Seeding database..."
    npm run db:seed
fi

# 构建应用
echo "🏗️ Building application..."
npm run build

# 启动应用
echo "🎉 Starting application..."
npm start
