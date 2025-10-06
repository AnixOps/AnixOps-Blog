import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import matter from 'gray-matter';
import { marked } from 'marked';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, '..');
const postsDir = path.join(rootDir, 'posts');
const outputFile = path.join(rootDir, 'src', 'posts.js');

// 配置 marked
marked.setOptions({
  gfm: true,
  breaks: true,
  headerIds: true,
  mangle: false
});

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

// 递归查找所有 markdown 文件
function findAllMarkdownFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);

  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      // 递归查找子目录
      findAllMarkdownFiles(filePath, fileList);
    } else if (file.endsWith('.md')) {
      fileList.push(filePath);
    }
  });

  return fileList;
}

// 从文件路径提取分类信息
function extractCategoryFromPath(filePath) {
  const relativePath = path.relative(postsDir, filePath);
  const pathParts = relativePath.split(path.sep);
  
  // 如果在子文件夹中，使用文件夹名作为分类
  if (pathParts.length > 1) {
    return pathParts[0];
  }
  
  return null;
}

function buildPosts() {
  console.log('🔨 Building blog posts...');

  // 确保 posts 目录存在
  if (!fs.existsSync(postsDir)) {
    fs.mkdirSync(postsDir, { recursive: true });
    console.log('📁 Created posts directory');
  }

  // 递归查找所有 markdown 文件
  const allFiles = findAllMarkdownFiles(postsDir);

  if (allFiles.length === 0) {
    console.log('⚠️  No markdown files found in posts directory');
    console.log('📝 Creating example posts with organized structure...');
    createExamplePosts();
    return buildPosts(); // 递归调用以处理示例文章
  }

  console.log(`📚 Found ${allFiles.length} markdown file(s)`);

  const posts = allFiles.map(filePath => {
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const { data, content } = matter(fileContent);

    // 生成 slug
    const slug = data.slug || slugify(data.title || path.basename(filePath, '.md'));

    // 转换 markdown 为 HTML
    const htmlContent = marked.parse(content);

    // 生成摘要（取前200个字符）
    const excerpt = data.excerpt || content
      .replace(/[#*`\[\]]/g, '')
      .substring(0, 200)
      .trim() + '...';

    // 从路径提取分类（如果在子文件夹中）
    const autoCategory = extractCategoryFromPath(filePath);
    const category = data.category || autoCategory;

    return {
      slug,
      title: data.title || 'Untitled',
      date: data.date || new Date().toISOString().split('T')[0],
      author: data.author || 'AnixOps',
      tags: data.tags || [],
      category: category,
      excerpt,
      content: htmlContent,
      filePath: path.relative(rootDir, filePath) // 保存相对路径便于调试
    };
  });

  // 生成 posts.js 文件
  const postsJS = `// 这个文件由构建脚本自动生成
// 请勿手动编辑
export const posts = ${JSON.stringify(posts, null, 2)};
`;

  fs.writeFileSync(outputFile, postsJS, 'utf-8');
  console.log(`✅ Built ${posts.length} post(s) successfully!`);
  
  // 按分类分组显示
  const categorized = {};
  posts.forEach(post => {
    const cat = post.category || 'Uncategorized';
    if (!categorized[cat]) categorized[cat] = [];
    categorized[cat].push(post);
  });

  Object.entries(categorized).forEach(([category, categoryPosts]) => {
    console.log(`\n   📁 ${category}:`);
    categoryPosts.forEach(post => {
      console.log(`      - ${post.title} (${post.slug})`);
    });
  });
}

function createExamplePosts() {
  // 创建分类文件夹结构示例
  const categories = ['tutorials', 'news', '2025'];
  categories.forEach(cat => {
    const catDir = path.join(postsDir, cat);
    if (!fs.existsSync(catDir)) {
      fs.mkdirSync(catDir, { recursive: true });
    }
  });

  const examplePosts = [
    {
      filename: '2025/welcome-to-anixops-blog.md',
      content: `---
title: Welcome to AnixOps Blog
date: 2025-01-15
author: AnixOps Team
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

Simply create a new \`.md\` file in the \`posts\` directory with frontmatter:

\`\`\`markdown
---
title: Your Post Title
date: 2025-01-15
author: Your Name
tags: [tag1, tag2]
---

Your content here...
\`\`\`

Then run \`npm run build\` to generate the static files and \`npm run deploy\` to publish!

## Technology Stack

- **Hono**: Lightweight web framework for Cloudflare Workers
- **Marked**: Fast Markdown parser
- **Gray Matter**: YAML front matter parser
- **Cloudflare Workers**: Edge computing platform

---

Happy blogging! 🎉
`
    },
    {
      filename: 'tutorials/getting-started-with-cloudflare-workers.md',
      content: `---
title: Getting Started with Cloudflare Workers
date: 2025-01-10
author: AnixOps Team
tags: [cloudflare, tutorial, serverless]
category: tutorial
excerpt: Learn how to deploy applications on Cloudflare Workers platform.
---

# Getting Started with Cloudflare Workers

Cloudflare Workers is a serverless platform that allows you to run JavaScript code at the edge, closer to your users.

## Why Cloudflare Workers?

1. **Global Distribution**: Your code runs in 300+ data centers worldwide
2. **Zero Cold Starts**: Instant execution with V8 isolates
3. **Cost Effective**: Generous free tier and pay-as-you-go pricing
4. **Easy Deployment**: Simple CLI tools and Git integration

## Quick Start

\`\`\`bash
# Install Wrangler CLI
npm install -g wrangler

# Login to Cloudflare
wrangler login

# Deploy your app
wrangler deploy
\`\`\`

## Best Practices

- Keep your code lightweight
- Use caching strategically
- Monitor usage and performance
- Implement proper error handling

## Conclusion

Cloudflare Workers provides an excellent platform for modern web applications. Give it a try!
`
    },
    {
      filename: 'news/modern-web-development-2025.md',
      content: `---
title: Modern Web Development in 2025
date: 2025-01-05
author: AnixOps Team
tags: [web-development, trends, 2025]
category: tech-news
excerpt: Exploring the latest trends and technologies shaping web development.
---

# Modern Web Development in 2025

The web development landscape continues to evolve rapidly. Let's explore the key trends shaping our industry.

## Edge Computing

Edge computing has become mainstream, with platforms like Cloudflare Workers, Vercel Edge, and Deno Deploy leading the way.

### Benefits:
- Lower latency
- Better performance
- Global distribution
- Cost efficiency

## Framework Evolution

Modern frameworks are focusing on:
- **Server Components**: Better performance and SEO
- **Islands Architecture**: Partial hydration for better performance
- **Type Safety**: TypeScript everywhere
- **Developer Experience**: Better tooling and DX

## The Future

The web is becoming faster, more accessible, and more developer-friendly. We're excited to be part of this journey!

### What's Next?

- AI-powered development tools
- WebAssembly adoption
- Better performance metrics
- Improved accessibility standards

---

Stay tuned for more updates! 🚀
`
    }
  ];

  examplePosts.forEach(({ filename, content }) => {
    const fullPath = path.join(postsDir, filename);
    const dir = path.dirname(fullPath);
    
    // 确保目录存在
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    
    fs.writeFileSync(fullPath, content, 'utf-8');
  });

  console.log('✅ Created example posts with organized structure');
}

// 运行构建
buildPosts();
