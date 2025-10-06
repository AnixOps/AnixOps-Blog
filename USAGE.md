# AnixOps Blog - 使用指南

## 🚀 快速开始（仅需 3 步）

### 1. 配置 Cloudflare（一次性设置）

在 GitHub 仓库设置中添加 Secrets：

1. 进入 GitHub 仓库 → Settings → Secrets and variables → Actions
2. 添加以下 secrets：
   - `CLOUDFLARE_API_TOKEN`: 你的 Cloudflare API Token
   - `CLOUDFLARE_ACCOUNT_ID`: 你的 Cloudflare Account ID

**获取这些信息：**
- API Token: Cloudflare Dashboard → My Profile → API Tokens → Create Token
  - 使用 "Edit Cloudflare Workers" 模板
- Account ID: Cloudflare Dashboard → Workers & Pages → 右侧栏可见

### 2. 写文章

在 `posts` 目录创建新的 `.md` 文件：

```markdown
---
title: 我的新文章
date: 2025-10-06
author: 你的名字
tags: [标签1, 标签2]
excerpt: 这是文章摘要
---

# 文章标题

你的文章内容...
```

### 3. 提交并自动部署

```bash
git add .
git commit -m "Add new post"
git push origin main
```

**就这么简单！** GitHub Actions 会自动：
- 构建文章（将 Markdown 转换为 HTML）
- 部署到 Cloudflare Workers
- 全球边缘网络立即可访问

## 📝 日常写作流程

```bash
# 1. 在 posts 目录创建新文章
# 例如: posts/my-new-post.md

# 2. 本地预览（可选）
npm run build
npm run dev

# 3. 提交到 main 分支
git add posts/my-new-post.md
git commit -m "Add: 我的新文章"
git push

# 完成！自动部署
```

## 🎨 自定义博客

### 修改博客标题和样式

编辑 `src/i18n.js` 修改文本：
```javascript
blogTitle: '你的博客名称',
blogSubtitle: '你的副标题',
```

编辑 `src/template.js` 修改颜色：
```css
--accent: #3b82f6;  /* 主色调 */
```

### 配置自定义域名

编辑 `wrangler.toml`：
```toml
routes = [
  { pattern = "blog.anixops.com", custom_domain = true }
]
```

然后在 Cloudflare Dashboard 添加 CNAME 记录。

## 🔍 本地开发

```bash
# 安装依赖
npm install

# 构建文章
npm run build

# 本地预览
npm run dev
# 访问 http://localhost:8787

# 手动部署
npm run deploy
```

## 📦 项目结构

```
AnixOps-Blog/
├── posts/              ← 📝 在这里写文章！
│   └── *.md
├── src/
│   ├── index.js       ← 主应用
│   ├── template.js    ← 样式和 HTML 模板
│   ├── i18n.js        ← 界面文本（可自定义）
│   └── posts.js       ← 自动生成（不要编辑）
└── .github/
    └── workflows/
        └── deploy.yml ← 自动部署配置
```

## 💡 提示

- ✅ 只在 `main` 分支工作即可
- ✅ 提交 Markdown 文件会自动触发部署
- ✅ 支持中英文切换（`?lang=zh` 或 `?lang=en`）
- ✅ 自动亮色/暗色主题
- ✅ 完全免费（Cloudflare Workers 免费额度很大）

## 🌐 访问你的博客

部署后，你的博客会在：
- `https://anixops-blog.你的账户.workers.dev`
- 或你配置的自定义域名

## ❓ 常见问题

**Q: 如何删除示例文章？**
A: 删除 `posts` 目录下的对应 `.md` 文件，提交即可。

**Q: 文章不显示？**
A: 确保文章有正确的 frontmatter，运行 `npm run build` 检查是否有错误。

**Q: 如何修改样式？**
A: 编辑 `src/template.js` 文件中的 CSS 变量。

**Q: 支持图片吗？**
A: 支持！可以使用图床链接，或者配置 Cloudflare R2 存储。

---

Made with ❤️ by AnixOps Studio
