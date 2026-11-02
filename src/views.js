import { i18n } from './i18n.js';

export function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

// ?lang= 优先，其次浏览器语言，默认中文以外的走英文
export function resolveLang(c) {
  const q = c.req.query('lang');
  if (q === 'zh' || q === 'en') return q;
  const accept = (c.req.header('accept-language') || '').toLowerCase();
  return accept.startsWith('zh') || accept.includes(',zh') ? 'zh' : 'en';
}

export function formatDate(date, lang, opts = { year: 'numeric', month: 'long', day: 'numeric' }) {
  return new Date(date).toLocaleDateString(lang === 'zh' ? 'zh-CN' : 'en-US', { timeZone: 'UTC', ...opts });
}

export function isoDate(date) {
  return new Date(date).toISOString().slice(0, 10);
}

export function readingLabel(post, lang) {
  if (!post.readingMinutes) return '';
  return i18n[lang].readingTime.replace('{n}', post.readingMinutes);
}

export function postUrl(post, lang) {
  return `/post/${encodeURIComponent(post.slug)}?lang=${lang}`;
}

export function sortByDate(list) {
  return [...list].sort((a, b) => new Date(b.date) - new Date(a.date));
}

function metaLine(post, lang) {
  const parts = [`<time datetime="${isoDate(post.date)}">${formatDate(post.date, lang)}</time>`];
  const rt = readingLabel(post, lang);
  if (rt) parts.push(`<span>${rt}</span>`);
  return parts.join('<span class="dot" aria-hidden="true">·</span>');
}

export function featuredCard(post, lang) {
  return `
    <a class="featured" href="${postUrl(post, lang)}">
      <div class="featured-label">${i18n[lang].latest}${post.category ? ` · ${escapeHtml(post.category)}` : ''}</div>
      <h2 class="featured-title">${escapeHtml(post.title)}</h2>
      ${post.excerpt ? `<p class="featured-excerpt">${escapeHtml(post.excerpt)}</p>` : ''}
      <div class="meta">${metaLine(post, lang)}</div>
      <span class="featured-cta">${i18n[lang].readMore} <span aria-hidden="true">→</span></span>
    </a>`;
}

export function postRow(post, lang) {
  return `
    <li class="post-row">
      <a href="${postUrl(post, lang)}">
        <time class="post-row-date" datetime="${isoDate(post.date)}">${formatDate(post.date, lang, { month: '2-digit', day: '2-digit' })}</time>
        <div class="post-row-main">
          <h3 class="post-row-title">${escapeHtml(post.title)}</h3>
          ${post.excerpt ? `<p class="post-row-excerpt">${escapeHtml(post.excerpt)}</p>` : ''}
          <div class="meta">
            ${post.category ? `<span class="chip">${escapeHtml(post.category)}</span>` : ''}
            ${readingLabel(post, lang) ? `<span>${readingLabel(post, lang)}</span>` : ''}
          </div>
        </div>
      </a>
    </li>`;
}

// 按年份分组的文章列表
export function postArchive(list, lang) {
  if (list.length === 0) return '';
  const byYear = new Map();
  for (const post of list) {
    const year = new Date(post.date).getUTCFullYear();
    if (!byYear.has(year)) byYear.set(year, []);
    byYear.get(year).push(post);
  }
  return [...byYear.entries()].map(([year, items]) => `
    <section class="year-group">
      <h2 class="year-heading"><span>${year}</span><span class="year-count">${items.length}</span></h2>
      <ul class="post-list">${items.map(p => postRow(p, lang)).join('')}</ul>
    </section>`).join('');
}

export function searchForm(lang, query = '', autofocus = false) {
  return `
    <form action="/search" method="get" class="search-form" role="search">
      <input type="hidden" name="lang" value="${lang}">
      <svg class="search-form-icon" viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>
      <input type="search" name="q" class="search-input" placeholder="${i18n[lang].searchPlaceholder}" value="${escapeHtml(query)}" aria-label="${i18n[lang].search}" ${autofocus ? 'autofocus' : ''}>
      <button type="submit" class="search-button">${i18n[lang].search}</button>
    </form>`;
}
