# AnixOps Blog

一个轻量化博客框架，专为 Cloudflare Workers 打造。用 Markdown 写作，自动全球部署。

## ✨ 特性

- 📝 **Markdown 写作** - 简单的 Markdown 格式
- ⚡ **全球部署** - Cloudflare Workers 边缘网络
- 🎨 **现代设计** - 简洁响应式，灵感来自 anixops.com
- 🌓 **明暗主题** - 自动切换，支持用户偏好
- 🌍 **中英文** - 内置 i18n 支持
- 🚀 **自动部署** - 推送 main 分支自动部署
- 📱 **移动友好** - 完全响应式

## 🎯 使用方式（超简单！）

### 一次性配置（5分钟）

1. Fork 或 Clone 这个仓库
2. 在 GitHub 仓库设置添加 Secrets（Settings → Secrets and variables → Actions）：
   - `CLOUDFLARE_API_TOKEN`
   - `CLOUDFLARE_ACCOUNT_ID`
3. 完成！🎉

**如何获取这些信息？** 查看 [USAGE.md](./USAGE.md)

### 日常写博客（只需 3 步）

```bash
# 1. 在 posts 目录创建 .md 文件
# 例如: posts/my-new-post.md

# 2. 提交
git add posts/my-new-post.md
git commit -m "添加新文章"

# 3. 推送到 main 分支
git push origin main

# ✨ 自动部署完成！
```

**就这么简单！** 只需要 main 分支，无需其他分支。

## 📝 文章格式

在 `posts` 目录创建 `.md` 文件：

```markdown
---
title: 我的新文章
date: 2025-10-06
author: 你的名字
tags: [标签1, 标签2]
excerpt: 这是文章摘要（可选）
---

# 文章标题

你的 Markdown 内容...
```

## 🔧 自定义

### 修改博客标题

编辑 `src/i18n.js`:

```javascript
blogTitle: '你的博客名称',
blogSubtitle: '你的副标题',
```

### 修改颜色主题

编辑 `src/template.js` 中的 CSS 变量:

```css
--accent: #3b82f6;  /* 主色调 */
```

### 配置自定义域名

编辑 `wrangler.toml`:

```toml
routes = [
  { pattern = "blog.anixops.com", custom_domain = true }
]
```

## 📦 项目结构

```
AnixOps-Blog/
├── posts/              ← 📝 在这里写文章！
│   └── *.md
├── src/
│   ├── index.js       ← 主应用
│   ├── template.js    ← HTML 模板和样式
│   ├── i18n.js        ← 界面文本
│   └── posts.js       ← 自动生成（勿编辑）
├── scripts/
│   └── build.js       ← 构建脚本
└── .github/
    └── workflows/
        └── deploy.yml ← 自动部署配置
```

## 🚀 本地开发

```bash
# 安装依赖
npm install

# 构建文章
npm run build

# 本地预览
npm run dev
# 访问 http://localhost:8787

# 手动部署（可选）
npm run deploy
```

## 💡 核心优势

- ✅ **只需 main 分支** - 无需复杂的分支管理
- ✅ **推送即部署** - 提交到 main 自动触发部署
- ✅ **轻量快速** - 不到 30KB 的打包体积
- ✅ **全球 CDN** - 300+ 边缘节点
- ✅ **完全免费** - Cloudflare Workers 免费额度很大

## 📖 详细文档

- [USAGE.md](./USAGE.md) - 详细使用指南
- [README.md](./README.md) - 英文版 README

## 🌐 访问你的博客

部署后访问：
- `https://anixops-blog.你的账户.workers.dev`
- 或你配置的自定义域名

## 📦 技术栈

- **Hono** - 轻量级 Web 框架
- **Marked** - Markdown 解析器
- **Gray Matter** - Frontmatter 解析
- **Cloudflare Workers** - 边缘计算平台

## ❓ 常见问题

**Q: 必须用 main 分支吗？**  
A: 是的，GitHub Actions 配置为监听 main 分支的推送。当然你也可以修改 `.github/workflows/deploy.yml` 来改变这个设置。

**Q: 如何删除示例文章？**  
A: 删除 `posts` 目录下的对应 `.md` 文件，提交到 main 分支即可。

**Q: 支持图片吗？**  
A: 支持！可以使用图床链接，或配置 Cloudflare R2 存储。

**Q: 如何更新样式？**  
A: 编辑 `src/template.js` 中的 CSS。

## 💬 支持

- 🌐 网站: [anixops.com](https://anixops.com)
- 📧 邮箱: contact@anixops.com
- 💻 GitHub: [github.com/AnixOps](https://github.com/AnixOps)

---

Made with ❤️ by [AnixOps Studio](https://anixops.com)
