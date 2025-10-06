// 这个文件由构建脚本自动生成
// 请勿手动编辑
export const posts = [
  {
    "slug": "welcome-to-anixops-blog",
    "title": "Welcome to AnixOps Blog",
    "date": "2025-10-06T00:00:00.000Z",
    "author": "Dawei Zhang (@KaliJerry)",
    "tags": [
      "announcement",
      "blog"
    ],
    "category": "announcement",
    "excerpt": "Welcome to our new blog platform built with modern web technologies.",
    "content": "<h1>Welcome to AnixOps Blog</h1>\n<p>We&#39;re excited to launch our new blog platform! This is a lightweight, fast, and modern blogging system built specifically for Cloudflare Workers.</p>\n<h2>Features</h2>\n<ul>\n<li><strong>📝 Markdown Support</strong>: Write your posts in simple Markdown</li>\n<li><strong>🎨 Beautiful Design</strong>: Clean and modern interface with dark mode</li>\n<li><strong>🌍 Internationalization</strong>: Built-in i18n support (English &amp; Chinese)</li>\n<li><strong>⚡ Lightning Fast</strong>: Deployed on Cloudflare&#39;s global network</li>\n<li><strong>🎯 SEO Friendly</strong>: Optimized for search engines</li>\n</ul>\n<h2>How to Use</h2>\n<p>Simply create a new <code>.md</code> file in the <code>posts</code> directory with frontmatter:</p>\n<pre><code class=\"language-markdown\">---\ntitle: Your Post Title\ndate: 2025-01-15\nauthor: Your Name\ntags: [tag1, tag2]\n---\n\nYour content here...\n</code></pre>\n<p>Then run <code>npm run build</code> to generate the static files and <code>npm run deploy</code> to publish!</p>\n<h2>Technology Stack</h2>\n<ul>\n<li><strong>Hono</strong>: Lightweight web framework for Cloudflare Workers</li>\n<li><strong>Marked</strong>: Fast Markdown parser</li>\n<li><strong>Gray Matter</strong>: YAML front matter parser</li>\n<li><strong>Cloudflare Workers</strong>: Edge computing platform</li>\n</ul>\n<hr>\n<p>Happy blogging! 🎉</p>\n",
    "filePath": "posts\\2025\\welcome-to-anixops-blog.md"
  },
  {
    "slug": "modern-web-development-in-2025",
    "title": "Modern Web Development in 2025",
    "date": "2025-10-06T00:00:00.000Z",
    "author": "Dawei Zhang (@KaliJerry)",
    "tags": [
      "web-development",
      "trends",
      2025
    ],
    "category": "tech-news",
    "excerpt": "Exploring the latest trends and technologies shaping web development.",
    "content": "<h1>Modern Web Development in 2025</h1>\n<p>The web development landscape continues to evolve rapidly. Let&#39;s explore the key trends shaping our industry.</p>\n<h2>Edge Computing</h2>\n<p>Edge computing has become mainstream, with platforms like Cloudflare Workers, Vercel Edge, and Deno Deploy leading the way.</p>\n<h3>Benefits:</h3>\n<ul>\n<li>Lower latency</li>\n<li>Better performance</li>\n<li>Global distribution</li>\n<li>Cost efficiency</li>\n</ul>\n<h2>Framework Evolution</h2>\n<p>Modern frameworks are focusing on:</p>\n<ul>\n<li><strong>Server Components</strong>: Better performance and SEO</li>\n<li><strong>Islands Architecture</strong>: Partial hydration for better performance</li>\n<li><strong>Type Safety</strong>: TypeScript everywhere</li>\n<li><strong>Developer Experience</strong>: Better tooling and DX</li>\n</ul>\n<h2>The Future</h2>\n<p>The web is becoming faster, more accessible, and more developer-friendly. We&#39;re excited to be part of this journey!</p>\n<h3>What&#39;s Next?</h3>\n<ul>\n<li>AI-powered development tools</li>\n<li>WebAssembly adoption</li>\n<li>Better performance metrics</li>\n<li>Improved accessibility standards</li>\n</ul>\n<hr>\n<p>Stay tuned for more updates! 🚀</p>\n",
    "filePath": "posts\\news\\modern-web-development-2025.md"
  },
  {
    "slug": "getting-started-with-cloudflare-workers",
    "title": "Getting Started with Cloudflare Workers",
    "date": "2025-10-06T00:00:00.000Z",
    "author": "Dawei Zhang (@KaliJerry)",
    "tags": [
      "cloudflare",
      "tutorial",
      "serverless"
    ],
    "category": "tutorial",
    "excerpt": "Learn how to deploy applications on Cloudflare Workers platform.",
    "content": "<h1>Getting Started with Cloudflare Workers</h1>\n<p>Cloudflare Workers is a serverless platform that allows you to run JavaScript code at the edge, closer to your users.</p>\n<h2>Why Cloudflare Workers?</h2>\n<ol>\n<li><strong>Global Distribution</strong>: Your code runs in 300+ data centers worldwide</li>\n<li><strong>Zero Cold Starts</strong>: Instant execution with V8 isolates</li>\n<li><strong>Cost Effective</strong>: Generous free tier and pay-as-you-go pricing</li>\n<li><strong>Easy Deployment</strong>: Simple CLI tools and Git integration</li>\n</ol>\n<h2>Quick Start</h2>\n<pre><code class=\"language-bash\"># Install Wrangler CLI\nnpm install -g wrangler\n\n# Login to Cloudflare\nwrangler login\n\n# Deploy your app\nwrangler deploy\n</code></pre>\n<h2>Best Practices</h2>\n<ul>\n<li>Keep your code lightweight</li>\n<li>Use caching strategically</li>\n<li>Monitor usage and performance</li>\n<li>Implement proper error handling</li>\n</ul>\n<h2>Conclusion</h2>\n<p>Cloudflare Workers provides an excellent platform for modern web applications. Give it a try!</p>\n",
    "filePath": "posts\\tutorials\\getting-started-with-cloudflare-workers.md"
  }
];
