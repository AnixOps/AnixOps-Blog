# AnixOps Blog

A lightweight, modern blog framework built for Cloudflare Workers. Write in Markdown, deploy globally in seconds.

## ✨ Features

- 📝 **Markdown Writing**: Write posts in simple Markdown format
- ⚡ **Cloudflare Workers**: Deploy on edge network for global performance
- 🎨 **Modern Design**: Clean, responsive UI inspired by anixops.com
- 🌓 **Dark Mode**: Automatic theme switching with user preference
- 🌍 **i18n Support**: Built-in internationalization (English & Chinese)
- 🚀 **Zero Config**: Simple setup, automatic build process
- 📱 **Mobile Friendly**: Fully responsive design

## 🚀 Quick Start

### 1. Install Dependencies

\`\`\`bash
npm install
\`\`\`

### 2. Write Your First Post

Create a new file in the `posts` directory:

\`\`\`markdown
---
title: My First Post
date: 2025-01-15
author: Your Name
tags: [blog, announcement]
excerpt: This is my first blog post!
---

# Hello World

This is my first blog post using AnixOps Blog framework!

## Features I Love

- Easy to use
- Fast deployment
- Beautiful design
\`\`\`

### 3. Build & Preview

\`\`\`bash
# Build the blog (converts markdown to JS)
npm run build

# Preview locally
npm run dev
\`\`\`

### 4. Deploy to Cloudflare Workers

\`\`\`bash
# Deploy to production
npm run deploy
\`\`\`

## 📁 Project Structure

\`\`\`
AnixOps-Blog/
├── posts/                  # Your markdown blog posts
│   ├── example-post.md
│   └── another-post.md
├── src/
│   ├── index.js           # Main application
│   ├── template.js        # HTML template with styles
│   ├── i18n.js            # Internationalization texts
│   └── posts.js           # Auto-generated from markdown
├── scripts/
│   └── build.js           # Build script
├── package.json
├── wrangler.toml          # Cloudflare Workers config
└── README.md
\`\`\`

## 📝 Writing Posts

### Frontmatter Options

All posts require YAML frontmatter at the top:

\`\`\`yaml
---
title: Post Title          # Required
date: 2025-01-15          # Required (YYYY-MM-DD)
author: Author Name        # Optional
tags: [tag1, tag2]        # Optional
excerpt: Short summary     # Optional (auto-generated if not provided)
slug: custom-url-slug     # Optional (auto-generated from title)
---
\`\`\`

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

Made with ❤️ by [AnixOps Studio](https://anixops.com)
