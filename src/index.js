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
  const categoryFilter = c.req.query('category');
  
  let filteredPosts = [...posts];
  
  // 按分类筛选
  if (categoryFilter) {
    filteredPosts = filteredPosts.filter(p => p.category === categoryFilter);
  }
  
  // 按日期排序
  const sortedPosts = filteredPosts.sort((a, b) => 
    new Date(b.date) - new Date(a.date)
  );
  
  // 获取所有分类
  const categories = [...new Set(posts.map(p => p.category).filter(Boolean))].sort();
  
  return c.html(getHTML({
    title: `AnixOps Blog`,
    content: `
      <div class="container">
        <header class="blog-header">
          <h1>${i18n[lang].blogTitle}</h1>
          <p class="subtitle">${i18n[lang].blogSubtitle}</p>
        </header>
        
        <div class="search-container">
          <form action="/search" method="get" class="search-form">
            <input type="hidden" name="lang" value="${lang}">
            <input 
              type="text" 
              name="q" 
              class="search-input" 
              placeholder="${i18n[lang].searchPlaceholder}"
            >
            <button type="submit" class="search-button">
              <span class="search-icon">🔍</span>
            </button>
          </form>
        </div>
        
        ${categories.length > 0 ? `
          <div class="category-filter">
            <a href="/?lang=${lang}" class="category-btn ${!categoryFilter ? 'active' : ''}">
              ${i18n[lang].allPosts || 'All Posts'} (${posts.length})
            </a>
            ${categories.map(cat => `
              <a href="/?category=${cat}&lang=${lang}" class="category-btn ${categoryFilter === cat ? 'active' : ''}">
                ${cat} (${posts.filter(p => p.category === cat).length})
              </a>
            `).join('')}
          </div>
        ` : ''}
        
        <div class="posts-grid">
          ${sortedPosts.length > 0 ? sortedPosts.map(post => `
            <article class="post-card">
              <div class="post-meta">
                <time datetime="${post.date}">${new Date(post.date).toLocaleDateString(lang === 'zh' ? 'zh-CN' : 'en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}</time>
                ${post.category ? `<span class="category-badge">${post.category}</span>` : ''}
                ${post.tags ? `
                  <div class="tags">
                    ${post.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                  </div>
                ` : ''}
              </div>
              <h2><a href="/post/${post.slug}?lang=${lang}">${post.title}</a></h2>
              <p class="excerpt">${post.excerpt || ''}</p>
              <a href="/post/${post.slug}?lang=${lang}" class="read-more">${i18n[lang].readMore} →</a>
            </article>
          `).join('') : `
            <div class="no-posts">
              <p>${i18n[lang].noPosts || 'No posts found in this category.'}</p>
            </div>
          `}
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

// 搜索页面
app.get('/search', (c) => {
  const lang = c.req.query('lang') || 'en';
  const query = c.req.query('q') || '';
  
  // 如果搜索内容为空，重定向到主页
  if (!query.trim()) {
    return c.redirect(`/?lang=${lang}`);
  }
  
  let searchResults = [];
  
  if (query.trim()) {
    const searchTerm = query.toLowerCase();
    
    searchResults = posts.filter(post => {
      // 搜索标题
      if (post.title && String(post.title).toLowerCase().includes(searchTerm)) return true;
      
      // 搜索摘要
      if (post.excerpt && String(post.excerpt).toLowerCase().includes(searchTerm)) return true;
      
      // 搜索标签
      if (post.tags && Array.isArray(post.tags)) {
        if (post.tags.some(tag => String(tag).toLowerCase().includes(searchTerm))) return true;
      }
      
      // 搜索内容（移除HTML标签）
      if (post.content) {
        const textContent = String(post.content).replace(/<[^>]*>/g, '').toLowerCase();
        if (textContent.includes(searchTerm)) return true;
      }
      
      // 搜索分类
      if (post.category && String(post.category).toLowerCase().includes(searchTerm)) return true;
      
      return false;
    }).sort((a, b) => new Date(b.date) - new Date(a.date));
  }
  
  return c.html(getHTML({
    title: `${i18n[lang].search} - AnixOps Blog`,
    content: `
      <div class="container">
        <header class="blog-header">
          <h1>${i18n[lang].search}</h1>
          <p class="subtitle">${i18n[lang].searchResults}</p>
        </header>
        
        <div class="search-container">
          <form action="/search" method="get" class="search-form">
            <input type="hidden" name="lang" value="${lang}">
            <input 
              type="text" 
              name="q" 
              class="search-input" 
              placeholder="${i18n[lang].searchPlaceholder}"
              value="${query}"
              autofocus
            >
            <button type="submit" class="search-button">
              <span class="search-icon">🔍</span>
              ${i18n[lang].search}
            </button>
          </form>
        </div>
        
        <div class="search-info">
          <p>${searchResults.length} ${lang === 'zh' ? '个结果' : 'results'} "${query}"</p>
        </div>
        
        <div class="posts-grid">
          ${searchResults.length > 0 ? searchResults.map(post => `
            <article class="post-card">
              <div class="post-meta">
                <time datetime="${post.date}">${new Date(post.date).toLocaleDateString(lang === 'zh' ? 'zh-CN' : 'en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}</time>
                ${post.category ? `<span class="category-badge">${post.category}</span>` : ''}
                ${post.tags ? `
                  <div class="tags">
                    ${post.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                  </div>
                ` : ''}
              </div>
              <h2><a href="/post/${post.slug}?lang=${lang}">${post.title}</a></h2>
              <p class="excerpt">${post.excerpt || ''}</p>
              <a href="/post/${post.slug}?lang=${lang}" class="read-more">${i18n[lang].readMore} →</a>
            </article>
          `).join('') : `
            <div class="no-posts">
              <p>${i18n[lang].noSearchResults}</p>
            </div>
          `}
        </div>
      </div>
    `,
    lang
  }));
});

// API: 搜索接口
app.get('/api/search', (c) => {
  const query = c.req.query('q') || '';
  
  if (!query.trim()) {
    return c.json({ results: [], query: '' });
  }
  
  const searchTerm = query.toLowerCase();
  
  const results = posts.filter(post => {
    const titleMatch = post.title && String(post.title).toLowerCase().includes(searchTerm);
    const excerptMatch = post.excerpt && String(post.excerpt).toLowerCase().includes(searchTerm);
    const tagsMatch = post.tags && Array.isArray(post.tags) && post.tags.some(tag => String(tag).toLowerCase().includes(searchTerm));
    const contentMatch = post.content && String(post.content).replace(/<[^>]*>/g, '').toLowerCase().includes(searchTerm);
    const categoryMatch = post.category && String(post.category).toLowerCase().includes(searchTerm);
    
    return titleMatch || excerptMatch || tagsMatch || contentMatch || categoryMatch;
  }).map(p => ({
    slug: p.slug,
    title: p.title,
    date: p.date,
    excerpt: p.excerpt,
    tags: p.tags,
    category: p.category,
    author: p.author
  })).sort((a, b) => new Date(b.date) - new Date(a.date));
  
  return c.json({ results, query, total: results.length });
});

// API: 获取所有文章列表
app.get('/api/posts', (c) => {
  return c.json(posts.map(p => ({
    slug: p.slug,
    title: p.title,
    date: p.date,
    excerpt: p.excerpt,
    tags: p.tags,
    category: p.category,
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
