#!/usr/bin/env node

/**
 * 数据库设置脚本
 * 用于在Vercel部署时自动设置数据库
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

async function setupDatabase() {
  console.log('🚀 开始设置数据库...');
  
  try {
    // 检查环境变量
    if (!process.env.DATABASE_URL) {
      throw new Error('DATABASE_URL 环境变量未设置');
    }
    
    console.log('✅ 数据库连接字符串已配置');
    
    // 生成 Prisma 客户端
    console.log('📦 生成 Prisma 客户端...');
    execSync('npx prisma generate', { stdio: 'inherit' });
    
    // 推送数据库模式
    console.log('🗄️ 推送数据库模式...');
    execSync('npx prisma db push', { stdio: 'inherit' });
    
    // 运行种子数据 (仅在开发环境)
    if (process.env.NODE_ENV !== 'production') {
      console.log('🌱 运行种子数据...');
      try {
        execSync('npm run db:seed', { stdio: 'inherit' });
      } catch (error) {
        console.warn('⚠️ 种子数据运行失败，跳过...');
      }
    }
    
    console.log('✅ 数据库设置完成！');
    
  } catch (error) {
    console.error('❌ 数据库设置失败:', error.message);
    process.exit(1);
  }
}

// 如果直接运行此脚本
if (require.main === module) {
  setupDatabase();
}

module.exports = { setupDatabase };
