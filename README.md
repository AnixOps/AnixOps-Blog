# AnixOps Blog

[English](#english) | [中文](#中文)

---

## English

A lightweight, modern blog framework built for Cloudflare Workers. Write in Markdown, deploy globally in seconds.

### ✨ Features

- 📝 **Markdown Writing**: Write posts in simple Markdown format
- ⚡ **Cloudflare Workers**: Deploy on edge network for global performance
- 🎨 **Modern Design**: Clean, responsive UI inspired by anixops.com
- 🌓 **Dark Mode**: Auto-detect system theme preference with manual toggle
- 🔍 **Full-Text Search**: Search across titles, content, tags, and categories
- 🌍 **i18n Support**: Built-in internationalization (English & Chinese)
- 🚀 **Zero Config**: Simple setup, automatic build process
- 📱 **Mobile Friendly**: Fully responsive design
- 📁 **Flexible Organization**: Support nested folders and auto-categorization
- 🏷️ **Category Filtering**: Browse posts by category with one click

### 🚀 Quick Start

#### 1. Install Dependencies

\`\`\`bash
npm install
\`\`\`

#### 2. Write Your First Post

Create a new file in the `posts` directory (supports nested folders):

\`\`\`markdown
---
title: My First Post
date: 2025-01-15
author: Your Name
category: tutorials
tags: [blog, announcement]
excerpt: This is my first blog post!
---

# Hello World

This is my first blog post using AnixOps Blog framework!
\`\`\`

#### 3. Build & Preview

\`\`\`bash
npm run build    # Build the blog (converts markdown to JS)
npm run dev      # Preview locally at http://localhost:8787
\`\`\`

#### 4. Deploy to Cloudflare Workers

\`\`\`bash
npm run deploy   # Deploy to production
\`\`\`

## 📁 Project Structure

\`\`\`
AnixOps-Blog/
├── posts/                  # Your markdown blog posts
│   ├── 2025/              # Organize by year (optional)
│   │   ├── tutorials/     # Organize by category (optional)
│   │   │   └── post.md
│   │   └── news/
│   ├── drafts/            # Draft posts (optional)
│   └── simple-post.md     # Or use flat structure
├── src/
│   ├── index.js           # Main application
│   ├── template.js        # HTML template with styles
│   ├── i18n.js            # Internationalization texts
│   └── posts.js           # Auto-generated from markdown
├── scripts/
│   └── build.js           # Build script (recursive scan)
├── package.json
├── wrangler.toml          # Cloudflare Workers config
├── POSTS_GUIDE.md         # Detailed folder organization guide
├── QUICKSTART.md          # Quick reference
└── README.md
\`\`\`

💡 **Tip**: The build script automatically scans all subfolders recursively. Organize your posts however you like!

## 📝 Writing Posts

### Frontmatter Options

All posts require YAML frontmatter at the top:

\`\`\`yaml
---
title: Post Title          # Required
date: 2025-01-15          # Required (YYYY-MM-DD)
author: Author Name        # Optional
category: tutorials        # Optional (auto-extracted from folder name)
tags: [tag1, tag2]        # Optional
excerpt: Short summary     # Optional (auto-generated if not provided)
slug: custom-url-slug     # Optional (auto-generated from title)
---
\`\`\`

**Auto-categorization**: If you place a post in a subfolder (e.g., `posts/tutorials/my-post.md`), it automatically gets `category: "tutorials"` unless you specify otherwise in frontmatter.

📖 **For detailed folder organization strategies**, see [POSTS_GUIDE.md](./POSTS_GUIDE.md)

### Markdown Support

Full GitHub Flavored Markdown (GFM) support:

- Headers (H1-H6)
- Bold, italic, strikethrough
- Lists (ordered/unordered)
- Links and images
- Code blocks with syntax highlighting
- Blockquotes
- Tables
- And more!

## 🎨 Customization

### Theme Colors

Edit `src/template.js` to customize colors:

\`\`\`css
:root {
  --accent: #3b82f6;        /* Primary color */
  --accent-hover: #2563eb;  /* Hover state */
  /* ... more variables */
}
\`\`\`

### i18n Texts

Edit `src/i18n.js` to customize UI texts:

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

## ⚙️ Configuration

### Custom Domain

Edit `wrangler.toml` to add your custom domain:

\`\`\`toml
routes = [
  { pattern = "blog.anixops.com", custom_domain = true }
]
\`\`\`

### Environment Variables

Add environment variables in Cloudflare dashboard or `.dev.vars` file:

\`\`\`
ENVIRONMENT=production
\`\`\`

## 🚀 Deployment

### Option 1: Wrangler CLI

\`\`\`bash
npm run deploy
\`\`\`

### Option 2: GitHub Actions

Set up automatic deployment on push:

1. Add Cloudflare API token to GitHub Secrets
2. Create `.github/workflows/deploy.yml`
3. Push to main branch

## 🔗 API Endpoints

- `GET /` - Blog homepage (list of posts)
- `GET /post/:slug` - Individual post
- `GET /api/posts` - JSON API for all posts

Query parameters:
- `?lang=zh` - Switch to Chinese
- `?lang=en` - Switch to English (default)

## 📦 Tech Stack

- **Hono**: Ultra-fast web framework for edge
- **Marked**: Markdown parser and compiler
- **Gray Matter**: YAML frontmatter parser
- **Cloudflare Workers**: Serverless platform

## 🎯 Performance

- ⚡ **< 50ms** response time globally
- 📦 **< 30KB** bundle size
- 🚀 **Zero** cold starts
- 🌍 **300+** edge locations

## 📄 License

MIT License - see LICENSE file for details

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 💬 Support

- 🌐 Website: [anixops.com](https://anixops.com)
- 📧 Email: contact@anixops.com
- 🐦 Twitter: [@AnixOps](https://twitter.com/AnixOps)
- 💻 GitHub: [github.com/AnixOps](https://github.com/AnixOps)

---

## 中文

一个轻量级、现代化的博客框架，专为 Cloudflare Workers 构建。使用 Markdown 写作，秒级全球部署。

### ✨ 特性

- 📝 **Markdown 写作**：使用简单的 Markdown 格式写文章
- ⚡ **Cloudflare Workers**：部署在边缘网络，全球性能优异
- 🎨 **现代设计**：简洁响应式 UI，灵感来自 anixops.com
- 🌓 **暗色模式**：自动检测系统主题偏好，支持手动切换
- 🔍 **全文搜索**：搜索标题、内容、标签和分类
- 🌍 **国际化**：内置 i18n 支持（中英文）
- 🚀 **零配置**：简单设置，自动构建流程
- 📱 **移动友好**：完全响应式设计
- 📁 **灵活组织**：支持嵌套文件夹和自动分类
- 🏷️ **分类筛选**：一键按分类浏览文章

### 🚀 快速开始

#### 1. 安装依赖

\`\`\`bash
npm install
\`\`\`

#### 2. 写你的第一篇文章

在 `posts` 目录创建新文件（支持嵌套文件夹）：

\`\`\`markdown
---
title: 我的第一篇文章
date: 2025-01-15
author: 你的名字
category: tutorials
tags: [博客, 公告]
excerpt: 这是我的第一篇博客文章！
---

# Hello World

这是我使用 AnixOps Blog 框架写的第一篇博客！
\`\`\`

#### 3. 构建与预览

\`\`\`bash
npm run build    # 构建博客（将 markdown 转换为 JS）
npm run dev      # 本地预览 http://localhost:8787
\`\`\`

#### 4. 部署到 Cloudflare Workers

\`\`\`bash
npm run deploy   # 部署到生产环境
\`\`\`

### 📁 项目结构

\`\`\`
AnixOps-Blog/
├── posts/                  # 你的 markdown 博客文章
│   ├── 2025/              # 按年份组织（可选）
│   │   ├── tutorials/     # 按分类组织（可选）
│   │   │   └── post.md
│   │   └── news/
│   ├── drafts/            # 草稿文章（可选）
│   └── simple-post.md     # 或使用扁平结构
├── src/
│   ├── index.js           # 主应用
│   ├── template.js        # HTML 模板和样式
│   ├── i18n.js            # 国际化文本
│   └── posts.js           # 从 markdown 自动生成
├── scripts/
│   └── build.js           # 构建脚本（递归扫描）
├── package.json
├── wrangler.toml          # Cloudflare Workers 配置
└── README.md
\`\`\`

💡 **提示**：构建脚本会自动递归扫描所有子文件夹。你可以按自己喜欢的方式组织文章！

### 📝 写作文章

#### Frontmatter 选项

所有文章需要在顶部添加 YAML frontmatter：

\`\`\`yaml
---
title: 文章标题           # 必需
date: 2025-01-15         # 必需 (YYYY-MM-DD)
author: 作者名           # 可选
category: tutorials      # 可选（从文件夹名自动提取）
tags: [标签1, 标签2]     # 可选
excerpt: 简短摘要         # 可选（未提供时自动生成）
slug: 自定义url路径      # 可选（从标题自动生成）
---
\`\`\`

**自动分类**：如果你将文章放在子文件夹中（如 `posts/tutorials/my-post.md`），它会自动获得 `category: "tutorials"`，除非你在 frontmatter 中另行指定。

#### Markdown 支持

完整支持 GitHub Flavored Markdown (GFM)：

- 标题 (H1-H6)
- 粗体、斜体、删除线
- 列表（有序/无序）
- 链接和图片
- 代码块（支持语法高亮）
- 引用块
- 表格
- 更多功能！

### 🎨 自定义

#### 主题颜色

编辑 `src/template.js` 自定义颜色：

\`\`\`css
:root {
  --accent: #3b82f6;        /* 主色调 */
  --accent-hover: #2563eb;  /* 悬停状态 */
  /* ... 更多变量 */
}
\`\`\`

#### i18n 文本

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

### ⚙️ 配置

#### 自定义域名

编辑 `wrangler.toml` 添加自定义域名：

\`\`\`toml
routes = [
  { pattern = "blog.anixops.com", custom_domain = true }
]
\`\`\`

#### 环境变量

在 Cloudflare 控制台或 `.dev.vars` 文件中添加环境变量：

\`\`\`
ENVIRONMENT=production
\`\`\`

### 🚀 部署

#### 方式 1: Wrangler CLI

\`\`\`bash
npm run deploy
\`\`\`

#### 方式 2: GitHub Actions

设置自动部署：

1. 添加 Cloudflare API token 到 GitHub Secrets
2. 创建 `.github/workflows/deploy.yml`
3. 推送到 main 分支

### 🔗 API 端点

- `GET /` - 博客主页（文章列表）
- `GET /post/:slug` - 单篇文章
- `GET /search` - 搜索页面
- `GET /api/posts` - 所有文章的 JSON API
- `GET /api/search` - 搜索 API

查询参数：
- `?lang=zh` - 切换到中文
- `?lang=en` - 切换到英文（默认）
- `?category=tutorials` - 按分类筛选
- `?q=keyword` - 搜索关键词

### 📁 文章组织方式

支持多种文件夹组织方式，构建脚本会自动递归扫描：

#### 扁平结构（简单项目）
\`\`\`
posts/
├── post1.md
├── post2.md
└── post3.md
\`\`\`

#### 按分类
\`\`\`
posts/
├── tutorials/
├── news/
└── reviews/
\`\`\`

#### 按年份
\`\`\`
posts/
├── 2024/
└── 2025/
\`\`\`

#### 年份 + 分类（推荐⭐）
\`\`\`
posts/
├── 2025/
│   ├── tutorials/
│   ├── news/
│   └── projects/
└── drafts/
\`\`\`

### 📦 技术栈

- **Hono**: 超快的边缘 web 框架
- **Marked**: Markdown 解析器和编译器
- **Gray Matter**: YAML frontmatter 解析器
- **Cloudflare Workers**: 无服务器平台

### 🎯 性能

- ⚡ **< 50ms** 全球响应时间
- 📦 **< 30KB** 打包体积
- 🚀 **零** 冷启动
- 🌍 **300+** 边缘节点

### 📄 许可证

MIT License - 查看 LICENSE 文件了解详情

### 🤝 贡献

欢迎贡献！请随时提交 Pull Request。

### 💬 支持

- 🌐 网站: [anixops.com](https://anixops.com)
- 📧 邮箱: contact@anixops.com
- 🐦 Twitter: [@AnixOps](https://twitter.com/AnixOps)
- 💻 GitHub: [github.com/AnixOps](https://github.com/AnixOps)

---

Made with ❤️ by [AnixOps Studio](https://anixops.com)
