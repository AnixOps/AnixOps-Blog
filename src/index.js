import { Hono } from 'hono';
import { serveStatic } from 'hono/cloudflare-workers';
import { posts } from './posts.js';
import { getHTML } from './template.js';
import { i18n } from './i18n.js';
import { escapeHtml, resolveLang, formatDate, isoDate, readingLabel, postUrl, sortByDate, featuredCard, postArchive, postRow, searchForm } from './views.js';

const app = new Hono();

// 静态资源
app.get('/favicon.ico', (c) => c.notFound());

// 首页 - 博客列表
app.get('/', (c) => {
  const lang = resolveLang(c);
  const categoryFilter = c.req.query('category');
  const t = i18n[lang];

  const sortedPosts = sortByDate(categoryFilter ? posts.filter(p => p.category === categoryFilter) : posts);
  const categories = [...new Set(posts.map(p => p.category).filter(Boolean))].sort();
  const [featured, ...rest] = categoryFilter ? [null, ...sortedPosts] : sortedPosts;

  return c.html(getHTML({
    title: t.blogTitle,
    lang,
    path: c.req.path,
    content: `
      <div class="container">
        <header class="hero">
          <h1 class="hero-title">${t.blogTitle}</h1>
          <p class="hero-subtitle">${t.blogSubtitle}</p>
          ${searchForm(lang)}
        </header>

        ${categories.length > 0 ? `
          <nav class="chips" aria-label="${t.categories}">
            <a href="/?lang=${lang}" class="chip-link ${!categoryFilter ? 'active' : ''}">${t.allPosts}<span>${posts.length}</span></a>
            ${categories.map(cat => `
              <a href="/?category=${encodeURIComponent(cat)}&lang=${lang}" class="chip-link ${categoryFilter === cat ? 'active' : ''}">${escapeHtml(cat)}<span>${posts.filter(p => p.category === cat).length}</span></a>
            `).join('')}
          </nav>
        ` : ''}

        ${featured ? featuredCard(featured, lang) : ''}
        ${sortedPosts.length > 0 ? postArchive(rest, lang) : `<p class="empty">${t.noPosts}</p>`}
      </div>
    `
  }));
});

// 博客文章详情
app.get('/post/:slug', (c) => {
  const slug = c.req.param('slug');
  const lang = resolveLang(c);
  const t = i18n[lang];
  const ordered = sortByDate(posts);
  const index = ordered.findIndex(p => p.slug === slug);

  if (index === -1) {
    return c.notFound();
  }

  const post = ordered[index];
  const newer = ordered[index - 1];
  const older = ordered[index + 1];
  const toc = (post.toc || []).filter(h => h.level <= 3);
  const seriesPosts = post.series
    ? posts.filter(p => p.series === post.series)
        .sort((a, b) => (new Date(a.date) - new Date(b.date)) || String(a.slug).localeCompare(String(b.slug)))
    : [];
  const seriesIndex = seriesPosts.findIndex(p => p.slug === post.slug);

  return c.html(getHTML({
    title: `${post.title} - ${t.blogTitle}`,
    description: post.excerpt,
    lang,
    path: c.req.path,
    progress: true,
    content: `
      <article class="container article">
        <header class="article-header">
          <a href="/?lang=${lang}" class="back-link">← ${t.backToList}</a>
          ${post.category ? `<a class="chip" href="/?category=${encodeURIComponent(post.category)}&lang=${lang}">${escapeHtml(post.category)}</a>` : ''}
          <h1 class="article-title">${escapeHtml(post.title)}</h1>
          <div class="meta">
            ${post.author ? `<span class="author">${escapeHtml(post.author)}</span><span class="dot" aria-hidden="true">·</span>` : ''}
            <time datetime="${isoDate(post.date)}">${formatDate(post.date, lang)}</time>
            ${readingLabel(post, lang) ? `<span class="dot" aria-hidden="true">·</span><span>${readingLabel(post, lang)}</span>` : ''}
          </div>
        </header>

        ${seriesPosts.length > 1 ? `
          <details class="series-box">
            <summary>${t.seriesLabel} <strong>${escapeHtml(post.series)}</strong><span>${t.seriesPosition.replace('{i}', seriesIndex + 1).replace('{n}', seriesPosts.length)}</span></summary>
            <ol>
              ${seriesPosts.map(p => `<li>${p.slug === post.slug ? `<strong>${escapeHtml(p.title)}</strong>` : `<a href="${postUrl(p, lang)}">${escapeHtml(p.title)}</a>`}</li>`).join('')}
            </ol>
          </details>
        ` : ''}

        <div class="article-layout ${toc.length >= 3 ? 'has-toc' : ''}">
          <div class="post-content markdown-body">
            ${post.content}
          </div>
          ${toc.length >= 3 ? `
            <aside class="toc" aria-label="${t.onThisPage}">
              <div class="toc-title">${t.onThisPage}</div>
              <ol>
                ${toc.map(h => `<li class="toc-l${h.level}"><a href="#${h.id}">${escapeHtml(h.text)}</a></li>`).join('')}
              </ol>
            </aside>
          ` : ''}
        </div>

        <footer class="article-footer">
          ${post.tags && post.tags.length ? `
            <div class="tags">${post.tags.map(tag => `<a class="tag" href="/search?q=${encodeURIComponent(tag)}&lang=${lang}">#${escapeHtml(tag)}</a>`).join('')}</div>
          ` : ''}
          <nav class="pager">
            ${older ? `<a class="pager-link" href="${postUrl(older, lang)}"><span>← ${t.prevPost}</span><strong>${escapeHtml(older.title)}</strong></a>` : '<span></span>'}
            ${newer ? `<a class="pager-link next" href="${postUrl(newer, lang)}"><span>${t.nextPost} →</span><strong>${escapeHtml(newer.title)}</strong></a>` : '<span></span>'}
          </nav>
        </footer>
      </article>
    `
  }));
});

// 搜索页面
app.get('/search', (c) => {
  const lang = resolveLang(c);
  const t = i18n[lang];
  const query = c.req.query('q') || '';

  // 如果搜索内容为空，重定向到主页
  if (!query.trim()) {
    return c.redirect(`/?lang=${lang}`);
  }

  const searchTerm = query.toLowerCase();
  const searchResults = sortByDate(posts.filter(post => {
    if (post.title && String(post.title).toLowerCase().includes(searchTerm)) return true;
    if (post.excerpt && String(post.excerpt).toLowerCase().includes(searchTerm)) return true;
    if (Array.isArray(post.tags) && post.tags.some(tag => String(tag).toLowerCase().includes(searchTerm))) return true;
    if (post.content && String(post.content).replace(/<[^>]*>/g, '').toLowerCase().includes(searchTerm)) return true;
    if (post.category && String(post.category).toLowerCase().includes(searchTerm)) return true;
    return false;
  }));

  return c.html(getHTML({
    title: `${t.search} - ${t.blogTitle}`,
    lang,
    path: c.req.path,
    content: `
      <div class="container">
        <header class="hero hero-compact">
          <h1 class="hero-title">${t.search}</h1>
          ${searchForm(lang, query, true)}
          <p class="search-summary">${t.resultsFor.replace('{n}', searchResults.length)} <strong>“${escapeHtml(query)}”</strong></p>
        </header>
        ${searchResults.length > 0
          ? `<ul class="post-list">${searchResults.map(p => postRow(p, lang)).join('')}</ul>`
          : `<p class="empty">${t.noSearchResults}</p>`}
      </div>
    `
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
  const lang = resolveLang(c);
  return c.html(getHTML({
    title: '404 - Not Found',
    lang,
    path: c.req.path,
    content: `
      <div class="container error-page">
        <h1>404</h1>
        <p>${i18n[lang].notFound}</p>
        <a href="/?lang=${lang}" class="button">${i18n[lang].backToHome}</a>
      </div>
    `
  }), 404);
});

export default app;
