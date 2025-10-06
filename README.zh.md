# AnixOps 博客

一个轻量级、现代化的博客框架，专为 Cloudflare Workers 构建。使用 Markdown 写作，秒级全球部署。

## ✨ 特性

- 📝 **Markdown 写作**：使用简单的 Markdown 格式写文章
- ⚡ **Cloudflare Workers**：部署在边缘网络，全球性能优异
- 🎨 **现代设计**：简洁响应式 UI，灵感来自 anixops.com
- 🌓 **暗色模式**：自动主题切换，支持用户偏好
- 🌍 **国际化**：内置 i18n 支持（中英文）
- 🚀 **零配置**：简单设置，自动构建流程
- 📱 **移动友好**：完全响应式设计

## 🚀 快速开始

### 1. 安装依赖

\`\`\`bash
npm install
\`\`\`

### 2. 写你的第一篇文章

在 `posts` 目录创建新文件：

\`\`\`markdown
---
title: 我的第一篇文章
date: 2025-01-15
author: 你的名字
tags: [博客, 公告]
excerpt: 这是我的第一篇博客文章！
---

# Hello World

这是我使用 AnixOps Blog 框架写的第一篇博客！

## 我喜欢的特性

- 使用简单
- 快速部署
- 精美设计
\`\`\`

### 3. 构建与预览

\`\`\`bash
# 构建博客（将 markdown 转换为 JS）
npm run build

# 本地预览
npm run dev
\`\`\`

### 4. 部署到 Cloudflare Workers

\`\`\`bash
# 部署到生产环境
npm run deploy
\`\`\`

## 📁 项目结构

\`\`\`
AnixOps-Blog/
├── posts/                  # 你的 markdown 博客文章
│   ├── example-post.md
│   └── another-post.md
├── src/
│   ├── index.js           # 主应用
│   ├── template.js        # HTML 模板和样式
│   ├── i18n.js            # 国际化文本
│   └── posts.js           # 从 markdown 自动生成
├── scripts/
│   └── build.js           # 构建脚本
├── package.json
├── wrangler.toml          # Cloudflare Workers 配置
└── README.md
\`\`\`

## 📝 写作文章

### Frontmatter 选项

所有文章需要在顶部添加 YAML frontmatter：

\`\`\`yaml
---
title: 文章标题           # 必需
date: 2025-01-15         # 必需 (YYYY-MM-DD)
author: 作者名           # 可选
tags: [标签1, 标签2]     # 可选
excerpt: 简短摘要         # 可选（未提供时自动生成）
slug: 自定义url路径      # 可选（从标题自动生成）
---
\`\`\`

### Markdown 支持

完整支持 GitHub Flavored Markdown (GFM)：

- 标题 (H1-H6)
- 粗体、斜体、删除线
- 列表（有序/无序）
- 链接和图片
- 代码块（支持语法高亮）
- 引用块
- 表格
- 更多功能！

## 🎨 自定义

### 主题颜色

编辑 `src/template.js` 自定义颜色：

\`\`\`css
:root {
  --accent: #3b82f6;        /* 主色调 */
  --accent-hover: #2563eb;  /* 悬停状态 */
  /* ... 更多变量 */
}
\`\`\`

### i18n 文本

编辑 `src/i18n.js` 自定义 UI 文本：

\`\`\`javascript
export const i18n = {
  en: {
    blogTitle: 'Your Blog Name',
    // ...
  },
  zh: {
    blogTitle: '你的博客名称',
    // ...
  }
};
\`\`\`

## ⚙️ 配置

### 自定义域名

编辑 `wrangler.toml` 添加自定义域名：

\`\`\`toml
routes = [
  { pattern = "blog.anixops.com", custom_domain = true }
]
\`\`\`

### 环境变量

在 Cloudflare 控制台或 `.dev.vars` 文件中添加环境变量：

\`\`\`
ENVIRONMENT=production
\`\`\`

## 🚀 部署

### 方式 1: Wrangler CLI

\`\`\`bash
npm run deploy
\`\`\`

### 方式 2: GitHub Actions

设置自动部署：

1. 添加 Cloudflare API token 到 GitHub Secrets
2. 创建 `.github/workflows/deploy.yml`
3. 推送到 main 分支

## 🔗 API 端点

- `GET /` - 博客主页（文章列表）
- `GET /post/:slug` - 单篇文章
- `GET /api/posts` - 所有文章的 JSON API

查询参数：
- `?lang=zh` - 切换到中文
- `?lang=en` - 切换到英文（默认）

## 📦 技术栈

- **Hono**: 超快的边缘 web 框架
- **Marked**: Markdown 解析器和编译器
- **Gray Matter**: YAML frontmatter 解析器
- **Cloudflare Workers**: 无服务器平台

## 🎯 性能

- ⚡ **< 50ms** 全球响应时间
- 📦 **< 30KB** 打包体积
- 🚀 **零** 冷启动
- 🌍 **300+** 边缘节点

## 📄 许可证

MIT License - 查看 LICENSE 文件了解详情

## 🤝 贡献

欢迎贡献！请随时提交 Pull Request。

## 💬 支持

- 🌐 网站: [anixops.com](https://anixops.com)
- 📧 邮箱: contact@anixops.com
- 🐦 Twitter: [@AnixOps](https://twitter.com/AnixOps)
- 💻 GitHub: [github.com/AnixOps](https://github.com/AnixOps)

---

Made with ❤️ by [AnixOps Studio](https://anixops.com)
