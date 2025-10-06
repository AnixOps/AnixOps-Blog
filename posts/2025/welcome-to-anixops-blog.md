---
title: Welcome to AnixOps Blog
date: 2025-10-06
author: Dawei Zhang (@KaliJerry)
tags: [announcement, blog]
category: announcement
excerpt: Welcome to our new blog platform built with modern web technologies.
---

# Welcome to AnixOps Blog

We're excited to launch our new blog platform! This is a lightweight, fast, and modern blogging system built specifically for Cloudflare Workers.

## Features

- **📝 Markdown Support**: Write your posts in simple Markdown
- **🎨 Beautiful Design**: Clean and modern interface with dark mode
- **🌍 Internationalization**: Built-in i18n support (English & Chinese)
- **⚡ Lightning Fast**: Deployed on Cloudflare's global network
- **🎯 SEO Friendly**: Optimized for search engines

## How to Use

Simply create a new `.md` file in the `posts` directory with frontmatter:

```markdown
---
title: Your Post Title
date: 2025-01-15
author: Your Name
tags: [tag1, tag2]
---

Your content here...
```

Then run `npm run build` to generate the static files and `npm run deploy` to publish!

## Technology Stack

- **Hono**: Lightweight web framework for Cloudflare Workers
- **Marked**: Fast Markdown parser
- **Gray Matter**: YAML front matter parser
- **Cloudflare Workers**: Edge computing platform

---

Happy blogging! 🎉
