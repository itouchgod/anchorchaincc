# AnchorChain Intelligence

全球锚链行业一站式情报库 - 权威的锚链制造商目录和实时动态聚合平台。

## 🎯 项目概述

AnchorChain Intelligence 是一个专业的锚链行业情报平台，提供：

- **厂商黄页**：按国家、证书、产品等级、直径区间等维度筛选检索
- **厂商详情**：完整的档案信息、证书清单、产品规格、产能交付等
- **动态流**：行业新闻、厂商公告、证书更新、并购动向的时间线
- **对比功能**：多家厂商规格与资质对比
- **标准参考**：行业标准和认证要求速查

## 🚀 技术栈

- **前端**: Next.js 15 + TypeScript + Tailwind CSS
- **UI组件**: shadcn/ui + Radix UI
- **数据库**: PostgreSQL + Prisma ORM
- **搜索**: Meilisearch (计划中)
- **数据采集**: n8n + Playwright (计划中)
- **部署**: Docker + Cloudflare

## 📁 项目结构

```
src/
├── app/                    # Next.js App Router 页面
│   ├── manufacturers/      # 厂商相关页面
│   ├── news/              # 新闻页面
│   ├── compare/           # 对比页面
│   └── standards/         # 标准页面
├── components/            # React 组件
│   ├── ui/               # shadcn/ui 基础组件
│   └── layout/           # 布局组件
├── lib/                  # 工具函数和配置
│   ├── prisma.ts         # Prisma 客户端
│   └── utils.ts          # 工具函数
└── generated/            # Prisma 生成的类型
```

## 🗄️ 数据库模型

核心数据模型包括：

- **Manufacturer**: 厂商主档
- **Certification**: 证书信息
- **Product**: 产品规格
- **Facility**: 生产设施
- **NewsItem**: 新闻动态
- **Document**: 文档资料
- **BidProject**: 招投标项目

## 🛠️ 开发指南

### 环境要求

- Node.js 18+
- PostgreSQL 14+ (或使用免费云数据库)
- npm 或 yarn

### 安装依赖

```bash
npm install
```

### 环境配置

复制 `.env.template` 到 `.env` 并配置：

```bash
cp .env.template .env
```

### 数据库设置

#### 本地开发
```bash
# 生成 Prisma 客户端
npm run db:generate

# 推送数据库模式
npm run db:push

# 运行种子数据
npm run db:seed
```

#### 使用免费云数据库
推荐使用以下免费方案：

1. **Neon** (推荐)
   - 注册: https://neon.tech
   - 免费额度: 0.5GB存储，无时间限制
   - 支持PostgreSQL完整功能

2. **Supabase**
   - 注册: https://supabase.com
   - 免费额度: 500MB存储，无时间限制
   - 提供PostgreSQL + 实时功能

3. **Railway**
   - 注册: https://railway.app
   - 免费额度: $5/月信用额度

### 启动开发服务器

```bash
npm run dev
```

访问 [http://localhost:3000](http://localhost:3000)

## 🚀 Vercel 部署指南

### 1. 准备数据库

选择以下任一免费数据库服务：

#### 方案A: Neon (推荐)
1. 访问 [Neon Console](https://console.neon.tech)
2. 创建新项目
3. 复制连接字符串

#### 方案B: Supabase
1. 访问 [Supabase Dashboard](https://app.supabase.com)
2. 创建新项目
3. 在Settings > Database中复制连接字符串

### 2. 部署到Vercel

1. 将代码推送到GitHub
2. 在 [Vercel Dashboard](https://vercel.com) 导入项目
3. 在项目设置中添加环境变量：
   ```
   DATABASE_URL=你的数据库连接字符串
   ```
4. 部署完成后，Vercel会自动运行数据库迁移

### 3. 验证部署

访问你的Vercel域名，确认：
- ✅ 主页正常加载
- ✅ 厂商列表显示
- ✅ 新闻页面工作
- ✅ 数据库连接正常

## 📊 功能特性

### MVP 功能 (已完成)

- ✅ 响应式主页设计
- ✅ 厂商列表和详情页面
- ✅ 新闻时间线
- ✅ 产品对比功能
- ✅ 标准参考页面
- ✅ 数据库模型设计
- ✅ 示例数据种子

### 计划功能

- 🔄 集成 Meilisearch 搜索
- 🔄 n8n 数据采集流程
- 🔄 多语言支持
- 🔄 API 接口开发
- 🔄 用户认证系统
- 🔄 监控和告警

## 🌍 数据来源

- **官方来源**: 厂商官网、PDF手册、RSS订阅
- **权威机构**: 船级社公示、港口公告、标准组织
- **行业媒体**: 海事资讯、政府公开数据
- **用户提交**: 厂商自助维护（需审核）

## 📈 里程碑

- **第1周**: ✅ 基础骨架和UI组件
- **第2-3周**: 🔄 数据采集和解析
- **第4周**: 🔄 搜索功能和前端完善
- **第5-6周**: 🔄 监控和合规流程

## 🤝 贡献指南

1. Fork 项目
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开 Pull Request

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 📞 联系我们

- 项目主页: [anchorchaincc.com](https://anchorchaincc.com)
- 问题反馈: [GitHub Issues](https://github.com/itouchgod/anchorchaincc/issues)
- 邮箱: info@anchorchaincc.com

---

**AnchorChain Intelligence** - 让锚链采购更智能、更高效