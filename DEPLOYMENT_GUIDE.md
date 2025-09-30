# 🚀 Vercel 部署指南

本指南将帮助你将 AnchorChain Intelligence 项目部署到 Vercel，并使用免费的数据库服务。

## 📋 部署前准备

### 1. 确保代码已推送到 GitHub
```bash
git add .
git commit -m "准备Vercel部署"
git push origin main
```

### 2. 选择免费数据库服务

#### 🥇 推荐方案：Neon
- **优势**: 专为Vercel优化，一键连接
- **免费额度**: 0.5GB存储，3个分支，无时间限制
- **注册地址**: https://neon.tech

#### 🥈 备选方案：Supabase
- **优势**: PostgreSQL + 实时功能 + 认证
- **免费额度**: 500MB存储，无时间限制
- **注册地址**: https://supabase.com

#### 🥉 其他方案：Railway
- **优势**: 简单易用
- **免费额度**: $5/月信用额度
- **注册地址**: https://railway.app

## 🗄️ 数据库设置步骤

### 使用 Neon (推荐)

1. **注册并创建项目**
   - 访问 https://console.neon.tech
   - 使用GitHub账号登录
   - 创建新项目，配置如下：
     - 项目名称: `accc`
     - Postgres 版本: `15` (推荐)
     - 云服务商: `AWS`
     - 区域: `Asia Pacific (Singapore)`
     - **Enable Neon Auth: ❌ 关闭** (本项目不需要用户认证)

2. **获取连接字符串**
   - 在项目仪表板中，点击 "Connection Details"
   - 复制 "Connection string" 中的完整URL
   - 格式类似：`postgresql://username:password@host:port/database?sslmode=require`

3. **测试连接**
   ```bash
   # 在本地测试连接
   DATABASE_URL="你的连接字符串" npm run db:push
   ```

### 使用 Supabase

1. **创建项目**
   - 访问 https://app.supabase.com
   - 创建新组织（如果还没有）
   - 创建新项目，选择地区为 `Asia Pacific (Singapore)`

2. **获取连接字符串**
   - 进入项目仪表板
   - 点击 Settings > Database
   - 在 "Connection string" 部分复制 URI
   - 格式类似：`postgresql://postgres:[password]@[host]:5432/postgres`

## 🚀 Vercel 部署步骤

### 1. 导入项目到 Vercel

1. 访问 https://vercel.com
2. 使用GitHub账号登录
3. 点击 "New Project"
4. 选择你的 `anchorchaincc` 仓库
5. 点击 "Import"

### 2. 配置环境变量

在 Vercel 项目设置中添加以下环境变量：

```
DATABASE_URL=你的数据库连接字符串
NEXTAUTH_URL=https://your-project.vercel.app
NEXTAUTH_SECRET=随机生成的密钥
```

**获取 NEXTAUTH_SECRET**:
```bash
openssl rand -base64 32
```

### 3. 配置构建设置

Vercel 会自动检测到 Next.js 项目，但确保以下设置：

- **Framework Preset**: Next.js
- **Build Command**: `npm run build`
- **Output Directory**: `.next`
- **Install Command**: `npm install`

### 4. 部署

1. 点击 "Deploy" 按钮
2. 等待构建完成（通常需要2-3分钟）
3. 部署成功后，你会获得一个 `.vercel.app` 域名

## 🔧 部署后配置

### 1. 验证数据库连接

访问你的Vercel域名，检查：
- ✅ 主页正常加载
- ✅ 厂商列表页面显示数据
- ✅ 新闻页面工作正常

### 2. 设置自定义域名（可选）

1. 在 Vercel 项目设置中点击 "Domains"
2. 添加你的自定义域名
3. 按照提示配置DNS记录

### 3. 配置自动部署

Vercel 默认会：
- 监听 `main` 分支的推送
- 自动触发重新部署
- 运行数据库迁移

## 🐛 常见问题解决

### 问题1: 数据库连接失败
**症状**: 页面显示数据库连接错误
**解决方案**:
1. 检查 `DATABASE_URL` 环境变量是否正确
2. 确认数据库服务是否正常运行
3. 检查网络连接和防火墙设置

### 问题2: 构建失败
**症状**: Vercel 构建过程中出错
**解决方案**:
1. 检查 `package.json` 中的依赖版本
2. 确认所有必要的环境变量都已设置
3. 查看 Vercel 构建日志中的具体错误信息

### 问题3: 页面加载缓慢
**症状**: 首次访问页面加载很慢
**解决方案**:
1. 检查数据库查询是否优化
2. 考虑添加缓存策略
3. 使用 Vercel 的 Edge Functions 优化性能

## 📊 监控和维护

### 1. 数据库监控
- **Neon**: 在控制台查看连接数和存储使用情况
- **Supabase**: 在仪表板监控API调用和存储使用

### 2. 应用监控
- 使用 Vercel Analytics 监控页面性能
- 设置错误告警和性能监控

### 3. 定期维护
- 定期备份数据库
- 监控存储使用情况
- 更新依赖包版本

## 💰 成本估算

### 免费额度使用情况
- **Vercel**: 100GB带宽/月，无服务器时间限制
- **Neon**: 0.5GB存储，无时间限制
- **Supabase**: 500MB存储，50MB文件上传/月

### 升级建议
当项目增长时，考虑升级到付费计划：
- **Vercel Pro**: $20/月，更多带宽和功能
- **Neon Pro**: $19/月，10GB存储，更多连接
- **Supabase Pro**: $25/月，8GB存储，更多功能

## 🎉 部署完成

恭喜！你的 AnchorChain Intelligence 项目已经成功部署到 Vercel。

**下一步建议**:
1. 设置自定义域名
2. 配置监控和告警
3. 优化性能和SEO
4. 添加更多功能特性

如有问题，请查看项目文档或提交 Issue。
