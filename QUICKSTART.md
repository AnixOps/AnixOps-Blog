# 🚀 快速参考

## 写博客工作流程

### 日常使用（3步走）

```bash
# 1️⃣ 创建文章
# 在 posts/ 目录新建 .md 文件

# 2️⃣ 提交更改
git add posts/新文章.md
git commit -m "添加：新文章标题"

# 3️⃣ 推送部署
git push origin main

# ✨ 完成！GitHub Actions 自动部署
```

## 📁 文件夹组织（文章多时推荐）

构建脚本**自动递归扫描所有子文件夹**，你可以用任意方式组织：

### 按年份
```
posts/
├── 2024/
│   └── old-post.md
└── 2025/
    └── new-post.md
```

### 按分类
```
posts/
├── tutorials/
├── news/
└── reviews/
```

### 年份+分类（推荐⭐）
```
posts/
├── 2025/
│   ├── tutorials/
│   ├── news/
│   └── projects/
└── drafts/
```

### 扁平结构（简单项目）
```
posts/
├── post1.md
├── post2.md
```

📚 **详细指南**: 查看 [POSTS_GUIDE.md](./POSTS_GUIDE.md)

---

## 文章模板

```markdown
---
title: 文章标题
date: 2025-10-06
author: 你的名字
category: tutorials    # 可选，不填则使用文件夹名
tags: [标签1, 标签2]
excerpt: 文章摘要（可选）
---

# 标题

你的内容...
```

## 常用命令

```bash
# 本地预览
npm run build && npm run dev

# 查看构建的文章
npm run build

# 手动部署（通常不需要）
npm run deploy
```

## 重要提示

✅ **只用 main 分支** - 不需要其他分支  
✅ **自动部署** - 推送到 main 自动触发  
✅ **构建自动化** - GitHub Actions 自动执行 build  
✅ **无需本地构建** - 可以直接在 GitHub 网页编辑  

## 快速链接

- 📖 [完整使用指南](./USAGE.md)
- 🌐 [Cloudflare Dashboard](https://dash.cloudflare.com/)
- ⚙️ [GitHub Actions](../../actions)

## 一次性配置清单

- [ ] Fork/Clone 仓库
- [ ] 添加 `CLOUDFLARE_API_TOKEN` 到 GitHub Secrets
- [ ] 添加 `CLOUDFLARE_ACCOUNT_ID` 到 GitHub Secrets
- [ ] （可选）配置自定义域名在 `wrangler.toml`
- [ ] 完成！开始写博客 🎉

## 文件说明

| 文件/目录 | 说明 | 是否需要编辑 |
|---------|------|------------|
| `posts/*.md` | 博客文章 | ✅ 经常编辑 |
| `src/i18n.js` | 界面文本 | 🔧 可选自定义 |
| `src/template.js` | HTML/CSS | 🔧 可选自定义 |
| `src/posts.js` | 自动生成 | ❌ 不要编辑 |
| `wrangler.toml` | 部署配置 | 🔧 一次性设置 |
| `.github/workflows/` | CI/CD | ✅ 已配置好 |

---

💡 **提示**: 你甚至可以直接在 GitHub 网页上创建/编辑文章，提交后自动部署！
