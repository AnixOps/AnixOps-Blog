import { Hono } from 'hono';
import { serveStatic } from 'hono/cloudflare-workers';
import { posts } from './posts.js';
import { getHTML } from './template.js';
import { i18n } from './i18n.js';

const app = new Hono();

// 静态资源
app.get('/favicon.ico', (c) => c.notFound());

// 首页 - 博客列表
app.get('/', (c) => {
  const lang = c.req.query('lang') || 'en';
  const sortedPosts = [...posts].sort((a, b) => 
    new Date(b.date) - new Date(a.date)
  );
  
  return c.html(getHTML({
    title: `AnixOps Blog`,
    content: `
      <div class="container">
        <header class="blog-header">
          <h1>${i18n[lang].blogTitle}</h1>
          <p class="subtitle">${i18n[lang].blogSubtitle}</p>
        </header>
        
        <div class="posts-grid">
          ${sortedPosts.map(post => `
            <article class="post-card">
              <div class="post-meta">
                <time datetime="${post.date}">${new Date(post.date).toLocaleDateString(lang === 'zh' ? 'zh-CN' : 'en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}</time>
                ${post.tags ? `
                  <div class="tags">
                    ${post.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                  </div>
                ` : ''}
              </div>
              <h2><a href="/post/${post.slug}">${post.title}</a></h2>
              <p class="excerpt">${post.excerpt || ''}</p>
              <a href="/post/${post.slug}" class="read-more">${i18n[lang].readMore} →</a>
            </article>
          `).join('')}
        </div>
      </div>
    `,
    lang
  }));
});

// 博客文章详情
app.get('/post/:slug', (c) => {
  const slug = c.req.param('slug');
  const lang = c.req.query('lang') || 'en';
  const post = posts.find(p => p.slug === slug);
  
  if (!post) {
    return c.notFound();
  }
  
  return c.html(getHTML({
    title: `${post.title} - AnixOps Blog`,
    content: `
      <article class="container post-detail">
        <header class="post-header">
          <a href="/" class="back-link">← ${i18n[lang].backToList}</a>
          <h1>${post.title}</h1>
          <div class="post-meta">
            <time datetime="${post.date}">${new Date(post.date).toLocaleDateString(lang === 'zh' ? 'zh-CN' : 'en-US', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}</time>
            ${post.author ? `<span class="author">By ${post.author}</span>` : ''}
          </div>
          ${post.tags ? `
            <div class="tags">
              ${post.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
            </div>
          ` : ''}
        </header>
        
        <div class="post-content markdown-body">
          ${post.content}
        </div>
        
        <footer class="post-footer">
          <a href="/" class="back-link">← ${i18n[lang].backToList}</a>
        </footer>
      </article>
    `,
    lang
  }));
});

// API: 获取所有文章列表
app.get('/api/posts', (c) => {
  return c.json(posts.map(p => ({
    slug: p.slug,
    title: p.title,
    date: p.date,
    excerpt: p.excerpt,
    tags: p.tags,
    author: p.author
  })));
});

// 404
app.notFound((c) => {
  const lang = c.req.query('lang') || 'en';
  return c.html(getHTML({
    title: '404 - Not Found',
    content: `
      <div class="container error-page">
        <h1>404</h1>
        <p>${i18n[lang].notFound}</p>
        <a href="/" class="button">${i18n[lang].backToHome}</a>
      </div>
    `,
    lang
  }), 404);
});

export default app;
