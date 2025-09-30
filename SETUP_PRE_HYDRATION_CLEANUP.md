# 预水合清理工具设置指南

## 📋 概述

本项目使用了企业级的预水合清理工具来解决React水合错误问题。由于该工具是本地开发依赖，不会包含在git仓库中。

## 🚀 设置步骤

### 1. 获取工具包

你需要从项目维护者那里获取 `pre-hydration-cleanup.zip` 文件。

### 2. 解压和安装

```bash
# 解压工具包
unzip pre-hydration-cleanup.zip

# 进入工具目录
cd pre-hydration-cleanup

# 安装依赖
npm install

# 构建工具包
npm run build
```

### 3. 安装到项目

```bash
# 回到项目根目录
cd ..

# 安装本地包
npm install ./pre-hydration-cleanup
```

### 4. 验证安装

```bash
# 检查构建文件是否存在
ls -la pre-hydration-cleanup/dist/

# 应该看到以下文件：
# - index.js
# - index.cjs
# - index.d.ts
# - cli.cjs
```

## 🔧 配置说明

### 当前配置

项目中的 `src/app/layout.tsx` 文件已经配置了预水合清理脚本：

```tsx
import { quickSetup } from "../../pre-hydration-cleanup/dist/index.js";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <Script {...quickSetup()} />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {/* ... */}
      </body>
    </html>
  );
}
```

### 环境变量配置（可选）

如果需要自定义清理属性，可以在 `.env.local` 文件中添加：

```bash
# .env.local
NEXT_PUBLIC_CLEANUP_ATTRS="custom-extension-attr,another-attr"
```

## 🚫 Git忽略规则

以下文件和目录已被添加到 `.gitignore` 中：

```
# pre-hydration-cleanup tool (local development only)
/pre-hydration-cleanup/
pre-hydration-cleanup.zip
```

## 🧪 开发功能

### 扩展检测

在开发模式下，工具会自动检测和报告浏览器扩展的使用情况。你可以在浏览器控制台中看到类似以下的日志：

```
[DevExtensionWarning] 检测到可能影响 hydration 的浏览器扩展: Grammarly, ColorZilla
```

### 属性统计

开发模式还会收集属性清理统计信息：

```
[PreHydrationCleanup] 属性清理统计（开发模式）
┌─────────┬──────────────────────────────────┬──────────┐
│ (index) │               属性名              │ 清理次数  │
├─────────┼──────────────────────────────────┼──────────┤
│    0    │        'cz-shortcut-listen'      │    15    │
│    1    │      'data-gr-ext-installed'     │    12    │
└─────────┴──────────────────────────────────┴──────────┘
```

## 🔍 故障排除

### 问题1：模块无法解析

**错误信息**：
```
Module not found: Can't resolve '@mluonet/pre-hydration-cleanup'
```

**解决方案**：
1. 确保已正确解压和构建工具包
2. 检查 `pre-hydration-cleanup/dist/` 目录是否存在
3. 重新安装本地包：`npm install ./pre-hydration-cleanup`

### 问题2：构建失败

**错误信息**：
```
npm run build failed
```

**解决方案**：
1. 确保在 `pre-hydration-cleanup` 目录中运行构建命令
2. 检查Node.js版本（需要 >= 18.0.0）
3. 清理并重新安装依赖：
   ```bash
   cd pre-hydration-cleanup
   rm -rf node_modules package-lock.json
   npm install
   npm run build
   ```

### 问题3：水合错误仍然存在

**解决方案**：
1. 检查浏览器控制台是否有清理脚本的日志
2. 确认脚本已正确注入到页面中
3. 尝试添加自定义属性到环境变量中

## 📚 更多信息

- 详细的技术文档：`PRE_HYDRATION_CLEANUP_SOLUTION.md`
- 水合错误修复记录：`HYDRATION_FIX.md`
- 工具包README：`pre-hydration-cleanup/README.md`

## 🤝 支持

如果在设置过程中遇到问题，请：

1. 检查本指南的故障排除部分
2. 查看相关的技术文档
3. 联系项目维护者获取支持

---

**注意**：此工具仅用于本地开发环境，不会包含在生产构建中。在生产环境中，建议使用CDN版本或通过npm发布的方式集成。
