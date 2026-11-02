import { i18n } from './i18n.js';
import { escapeHtml } from './views.js';

const ICON_SUN = '<svg class="icon-sun" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>';
const ICON_MOON = '<svg class="icon-moon" viewBox="0 0 24 24" aria-hidden="true"><path d="M20.5 14.5A8.5 8.5 0 0 1 9.5 3.5a8.5 8.5 0 1 0 11 11z"/></svg>';
const ICON_SEARCH = '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>';

const STYLES = `
*, *::before, *::after { box-sizing: border-box; }
* { margin: 0; padding: 0; }

:root {
  --bg: #faf9f6;
  --surface: #ffffff;
  --surface-2: #f2f0eb;
  --text: #1d1c1a;
  --text-2: #5f5c56;
  --text-3: #8d8981;
  --border: #e6e3dc;
  --accent: #2456d3;
  --accent-soft: rgba(36, 86, 211, 0.08);
  --code-bg: #f3f1ec;
  --pre-bg: #1b1d23;
  --pre-text: #e6e6e6;
  --shadow: 0 1px 2px rgba(28, 25, 20, 0.04), 0 8px 24px rgba(28, 25, 20, 0.06);
  --radius: 14px;
  --font-sans: -apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "Noto Sans SC", "Helvetica Neue", Arial, sans-serif;
  --font-mono: "JetBrains Mono", "SF Mono", ui-monospace, Menlo, Consolas, "Liberation Mono", monospace;
  color-scheme: light;
}

[data-theme="dark"] {
  --bg: #121315;
  --surface: #191a1d;
  --surface-2: #202226;
  --text: #ecebe8;
  --text-2: #a9a69f;
  --text-3: #7c7973;
  --border: #2b2d31;
  --accent: #8aa9ff;
  --accent-soft: rgba(138, 169, 255, 0.1);
  --code-bg: #24262b;
  --pre-bg: #0d0e10;
  --shadow: 0 1px 2px rgba(0, 0, 0, 0.3), 0 8px 24px rgba(0, 0, 0, 0.25);
  color-scheme: dark;
}

html { scroll-behavior: smooth; scroll-padding-top: 84px; }
body {
  font-family: var(--font-sans);
  background: var(--bg);
  color: var(--text);
  line-height: 1.7;
  font-size: 16px;
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
main { flex: 1; }
a { color: inherit; }
svg { width: 18px; height: 18px; fill: none; stroke: currentColor; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; }
::selection { background: var(--accent); color: #fff; }

.container { max-width: 760px; margin: 0 auto; padding: 0 20px; }

/* 阅读进度条 */
.progress { position: fixed; top: 0; left: 0; height: 2px; width: 0; background: var(--accent); z-index: 200; transition: width .1s linear; }

/* 顶部导航 */
.top-nav {
  position: sticky; top: 0; z-index: 100;
  background: color-mix(in srgb, var(--bg) 82%, transparent);
  backdrop-filter: saturate(180%) blur(12px);
  -webkit-backdrop-filter: saturate(180%) blur(12px);
  border-bottom: 1px solid transparent;
  transition: border-color .2s;
}
.top-nav.scrolled { border-bottom-color: var(--border); }
.nav-content { max-width: 1080px; margin: 0 auto; padding: 0 20px; height: 60px; display: flex; align-items: center; justify-content: space-between; }
.logo { display: inline-flex; align-items: center; gap: 10px; text-decoration: none; font-weight: 700; letter-spacing: -0.01em; }
.logo-mark { width: 28px; height: 28px; border-radius: 8px; background: var(--text); color: var(--bg); display: grid; place-items: center; font-size: 15px; font-weight: 800; }
.nav-controls { display: flex; gap: 4px; align-items: center; }
.icon-btn {
  height: 36px; min-width: 36px; padding: 0 10px; border-radius: 10px;
  display: inline-flex; align-items: center; justify-content: center; gap: 6px;
  background: transparent; border: 0; color: var(--text-2); cursor: pointer;
  font: 500 14px var(--font-sans); text-decoration: none; transition: background .15s, color .15s;
}
.icon-btn:hover { background: var(--surface-2); color: var(--text); }
.icon-sun { display: none; }
[data-theme="dark"] .icon-sun { display: block; }
[data-theme="dark"] .icon-moon { display: none; }

/* 首页头部 */
.hero { padding: 72px 0 32px; }
.hero-compact { padding: 48px 0 24px; }
.hero-title { font-size: clamp(2rem, 5vw, 2.75rem); font-weight: 800; letter-spacing: -0.03em; line-height: 1.15; }
.hero-subtitle { margin-top: 10px; font-size: 1.125rem; color: var(--text-2); }

.search-form { position: relative; display: flex; margin-top: 28px; }
.search-form-icon { position: absolute; left: 14px; top: 50%; transform: translateY(-50%); color: var(--text-3); pointer-events: none; }
.search-input {
  flex: 1; min-width: 0; height: 46px; padding: 0 92px 0 42px;
  border: 1px solid var(--border); border-radius: 12px; background: var(--surface);
  color: var(--text); font: 15px var(--font-sans); outline: none; transition: border-color .15s, box-shadow .15s;
}
.search-input::placeholder { color: var(--text-3); }
.search-input:focus { border-color: var(--accent); box-shadow: 0 0 0 4px var(--accent-soft); }
.search-button {
  position: absolute; right: 5px; top: 5px; height: 36px; padding: 0 16px; border: 0; border-radius: 8px;
  background: var(--text); color: var(--bg); font: 600 14px var(--font-sans); cursor: pointer;
}
.search-button:hover { opacity: .88; }
.search-summary { margin-top: 18px; color: var(--text-2); font-size: 15px; }
.search-summary strong { color: var(--text); }

/* 分类 */
.chips { display: flex; flex-wrap: wrap; gap: 8px; margin: 8px 0 36px; }
.chip-link {
  display: inline-flex; align-items: center; gap: 6px; height: 32px; padding: 0 12px;
  border: 1px solid var(--border); border-radius: 999px; text-decoration: none;
  font-size: 14px; color: var(--text-2); background: var(--surface); transition: all .15s;
}
.chip-link span { font-size: 12px; color: var(--text-3); font-variant-numeric: tabular-nums; }
.chip-link:hover { border-color: var(--text-3); color: var(--text); }
.chip-link.active { background: var(--text); border-color: var(--text); color: var(--bg); }
.chip-link.active span { color: inherit; opacity: .7; }
.chip {
  display: inline-block; padding: 2px 9px; border-radius: 6px; background: var(--accent-soft);
  color: var(--accent); font-size: 12px; font-weight: 600; text-decoration: none; letter-spacing: .02em;
}

.meta { display: flex; flex-wrap: wrap; align-items: center; gap: 6px 8px; color: var(--text-3); font-size: 14px; }
.dot { opacity: .6; }

/* 最新文章 */
.featured {
  display: block; text-decoration: none; padding: 32px; margin-bottom: 48px;
  background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius);
  box-shadow: var(--shadow); transition: transform .2s, border-color .2s;
  position: relative; overflow: hidden;
}
.featured::before { content: ""; position: absolute; inset: 0 0 auto 0; height: 3px; background: linear-gradient(90deg, var(--accent), #8b5cf6, #ec4899); }
.featured:hover { transform: translateY(-2px); border-color: var(--text-3); }
.featured-label { font-size: 13px; font-weight: 600; color: var(--accent); text-transform: uppercase; letter-spacing: .06em; }
.featured-title { margin: 10px 0 12px; font-size: clamp(1.5rem, 3.5vw, 1.875rem); line-height: 1.3; letter-spacing: -0.02em; }
.featured-excerpt { color: var(--text-2); font-size: 1.0625rem; margin-bottom: 18px; }
.featured-cta { display: inline-block; margin-top: 18px; font-weight: 600; color: var(--accent); font-size: 15px; }
.featured:hover .featured-cta span { margin-left: 4px; }

/* 年份归档 */
.year-group { margin-bottom: 40px; }
.year-heading {
  display: flex; align-items: baseline; gap: 10px; padding-bottom: 10px; margin-bottom: 4px;
  border-bottom: 1px solid var(--border); font-size: 1.125rem; font-weight: 700; font-variant-numeric: tabular-nums;
}
.year-count { font-size: 13px; color: var(--text-3); font-weight: 500; }
.post-list { list-style: none; }
.post-row > a {
  display: grid; grid-template-columns: 64px 1fr; gap: 16px; padding: 18px 12px; margin: 0 -12px;
  text-decoration: none; border-radius: 12px; transition: background .15s;
}
.post-row > a:hover { background: var(--surface-2); }
.post-row-date { font: 500 14px var(--font-mono); color: var(--text-3); padding-top: 3px; }
.post-row-title { font-size: 1.125rem; font-weight: 650; line-height: 1.45; }
.post-row > a:hover .post-row-title { color: var(--accent); }
.post-row-excerpt { margin: 4px 0 8px; color: var(--text-2); font-size: 15px; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
.empty { padding: 48px 0; text-align: center; color: var(--text-3); }

/* 文章页 */
.article { max-width: 1080px; }
.article-header { max-width: 720px; margin: 0 auto; padding: 48px 0 32px; border-bottom: 1px solid var(--border); }
.back-link { display: flex; width: fit-content; margin-bottom: 24px; color: var(--text-3); text-decoration: none; font-size: 14px; transition: color .15s; }
.back-link:hover { color: var(--text); }
.article-title { margin: 14px 0 16px; font-size: clamp(1.75rem, 4.5vw, 2.5rem); line-height: 1.25; letter-spacing: -0.025em; font-weight: 800; }
.author { color: var(--text-2); font-weight: 500; }

.article-layout { display: block; max-width: 720px; margin: 0 auto; }
.toc { display: none; }
@media (min-width: 1140px) {
  .article-layout.has-toc { max-width: none; display: grid; grid-template-columns: minmax(0, 720px) 220px; gap: 56px; justify-content: center; }
  .article:has(.has-toc) .article-header { margin-left: calc((100% - 720px - 276px) / 2); }
  .article-layout.has-toc ~ .article-footer { margin-left: calc((100% - 720px - 276px) / 2); }
  .toc { display: block; position: sticky; top: 92px; align-self: start; padding-top: 40px; max-height: calc(100vh - 110px); overflow: auto; }
}
.toc-title { font-size: 12px; font-weight: 700; color: var(--text-3); text-transform: uppercase; letter-spacing: .08em; margin-bottom: 12px; }
.toc ol { list-style: none; border-left: 1px solid var(--border); }
.toc li a { display: block; padding: 5px 0 5px 14px; margin-left: -1px; border-left: 2px solid transparent; color: var(--text-3); text-decoration: none; font-size: 13.5px; line-height: 1.5; transition: color .15s, border-color .15s; }
.toc li.toc-l3 a { padding-left: 26px; font-size: 13px; }
.toc li a:hover { color: var(--text); }
.toc li a.active { color: var(--accent); border-left-color: var(--accent); }

/* 系列导航 */
.series-box { max-width: 720px; margin: 28px auto 0; border: 1px solid var(--border); border-radius: 12px; background: var(--surface); font-size: 15px; }
.series-box summary { cursor: pointer; padding: 14px 18px; color: var(--text-2); display: flex; gap: 8px; align-items: baseline; flex-wrap: wrap; list-style: none; }
.series-box summary::-webkit-details-marker { display: none; }
.series-box summary::before { content: "▸"; color: var(--text-3); transition: transform .15s; }
.series-box[open] summary::before { transform: rotate(90deg); }
.series-box summary strong { color: var(--text); }
.series-box summary span { margin-left: auto; color: var(--text-3); font-size: 13px; }
.series-box ol { padding: 0 18px 14px 44px; color: var(--text-3); }
.series-box li { margin: 4px 0; }
.series-box li strong { color: var(--text); }
.series-box a { color: var(--text-2); text-decoration: none; }
.series-box a:hover { color: var(--accent); }
@media (min-width: 1140px) { .article:has(.has-toc) .series-box { margin-left: calc((100% - 720px - 276px) / 2); } }

/* 正文排版 */
.markdown-body { padding: 36px 0 8px; font-size: 1.0625rem; line-height: 1.9; color: var(--text); overflow-wrap: break-word; }
.markdown-body > :first-child { margin-top: 0; }
.markdown-body > h1:first-child { display: none; }
.markdown-body > h1:first-child + * { margin-top: 0; }
.markdown-body h1, .markdown-body h2, .markdown-body h3, .markdown-body h4 { position: relative; font-weight: 750; line-height: 1.4; letter-spacing: -0.015em; }
.markdown-body h1 { font-size: 1.75rem; margin: 2.4em 0 .8em; }
.markdown-body h2 { font-size: 1.5rem; margin: 2.2em 0 .7em; padding-bottom: .35em; border-bottom: 1px solid var(--border); }
.markdown-body h3 { font-size: 1.2rem; margin: 1.8em 0 .6em; }
.markdown-body h4 { font-size: 1.05rem; margin: 1.6em 0 .5em; }
.heading-anchor { position: absolute; left: -1.1em; width: 1em; color: var(--text-3); text-decoration: none; opacity: 0; font-weight: 500; transition: opacity .15s; }
.markdown-body h2:hover .heading-anchor, .markdown-body h3:hover .heading-anchor { opacity: 1; }
.markdown-body p { margin: 1.1em 0; }
.markdown-body a { color: var(--accent); text-decoration: underline; text-decoration-color: color-mix(in srgb, var(--accent) 35%, transparent); text-underline-offset: 3px; transition: text-decoration-color .15s; }
.markdown-body a:hover { text-decoration-color: var(--accent); }
.markdown-body strong { font-weight: 700; }
.markdown-body ul, .markdown-body ol { margin: 1.1em 0; padding-left: 1.5em; }
.markdown-body li { margin: .35em 0; }
.markdown-body li::marker { color: var(--text-3); }
.markdown-body hr { border: 0; height: 1px; background: var(--border); margin: 3em 0; }
.markdown-body blockquote { margin: 1.5em 0; padding: .9em 1.2em; border-left: 3px solid var(--accent); background: var(--accent-soft); border-radius: 0 10px 10px 0; color: var(--text-2); }
.markdown-body blockquote p { margin: .4em 0; }
.markdown-body code { font-family: var(--font-mono); font-size: .86em; background: var(--code-bg); padding: .15em .4em; border-radius: 5px; }
.markdown-body pre { position: relative; margin: 1.5em 0; padding: 18px 20px; background: var(--pre-bg); color: var(--pre-text); border-radius: 12px; overflow-x: auto; font-size: .875rem; line-height: 1.7; }
.markdown-body pre code { background: none; padding: 0; font-size: inherit; color: inherit; }
.copy-btn { position: absolute; top: 8px; right: 8px; padding: 3px 9px; border-radius: 6px; border: 1px solid rgba(255,255,255,.15); background: rgba(255,255,255,.06); color: #bbb; font: 12px var(--font-sans); cursor: pointer; opacity: 0; transition: opacity .15s; }
.markdown-body pre:hover .copy-btn, .copy-btn:focus { opacity: 1; }
.markdown-body table { display: block; width: 100%; overflow-x: auto; border-collapse: collapse; margin: 1.6em 0; font-size: .95rem; }
.markdown-body th, .markdown-body td { padding: .6em .9em; border-bottom: 1px solid var(--border); text-align: left; vertical-align: top; }
.markdown-body th { font-weight: 650; border-bottom-width: 2px; white-space: nowrap; }
.markdown-body img { display: block; max-width: 100%; height: auto; margin: 2em auto .75em; border-radius: 12px; border: 1px solid var(--border); }
.markdown-body p:has(> img), .markdown-body p:has(> a > img) { margin-bottom: 0; }
.markdown-body p em:only-child { display: block; text-align: center; font-size: .9rem; color: var(--text-3); font-style: normal; }

.article-footer { max-width: 720px; margin: 0 auto; padding: 32px 0 0; border-top: 1px solid var(--border); margin-top: 40px; }
.tags { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 28px; }
.tag { font-size: 14px; color: var(--text-2); text-decoration: none; padding: 3px 10px; border-radius: 999px; background: var(--surface-2); transition: color .15s; }
.tag:hover { color: var(--accent); }
.pager { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
.pager-link { display: flex; flex-direction: column; gap: 4px; padding: 16px 18px; border: 1px solid var(--border); border-radius: 12px; text-decoration: none; background: var(--surface); transition: border-color .15s; }
.pager-link:hover { border-color: var(--accent); }
.pager-link span { font-size: 13px; color: var(--text-3); }
.pager-link strong { font-size: 15px; font-weight: 600; line-height: 1.45; }
.pager-link.next { text-align: right; }

/* 404 */
.error-page { text-align: center; padding: 96px 20px; }
.error-page h1 { font-size: 5rem; font-weight: 800; letter-spacing: -0.04em; color: var(--text-3); }
.error-page p { margin: 8px 0 28px; color: var(--text-2); font-size: 1.125rem; }
.button { display: inline-block; padding: 10px 22px; border-radius: 10px; background: var(--text); color: var(--bg); text-decoration: none; font-weight: 600; }

/* 页脚 */
.site-footer { margin-top: 96px; border-top: 1px solid var(--border); }
.site-footer .container { max-width: 1080px; display: flex; flex-wrap: wrap; justify-content: space-between; gap: 8px; padding: 28px 20px 36px; color: var(--text-3); font-size: 14px; }
.site-footer a { color: var(--text-2); text-decoration: none; }
.site-footer a:hover { color: var(--accent); }

@media (max-width: 640px) {
  body { font-size: 15.5px; }
  .hero { padding: 44px 0 20px; }
  .featured { padding: 22px; }
  .post-row > a { grid-template-columns: 1fr; gap: 2px; }
  .markdown-body { font-size: 1rem; line-height: 1.85; }
  .heading-anchor { display: none; }
  .pager { grid-template-columns: 1fr; }
  .pager-link.next { text-align: left; }
  .lang-label { display: none; }
}

@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
  * { transition: none !important; }
}
`;

export function getHTML({ title, content, lang = 'en', description, path = '/', progress = false }) {
  const t = i18n[lang];
  const desc = escapeHtml(description || t.blogSubtitle);
  return `<!DOCTYPE html>
<html lang="${lang === 'zh' ? 'zh-CN' : 'en'}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(title)}</title>
  <meta name="description" content="${desc}">
  <meta property="og:title" content="${escapeHtml(title)}">
  <meta property="og:description" content="${desc}">
  <meta property="og:type" content="${progress ? 'article' : 'website'}">
  <meta name="theme-color" content="#faf9f6" media="(prefers-color-scheme: light)">
  <meta name="theme-color" content="#121315" media="(prefers-color-scheme: dark)">
  <link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' rx='8' fill='%231d1c1a'/%3E%3Ctext x='16' y='22.5' font-family='Arial' font-weight='800' font-size='18' fill='%23fff' text-anchor='middle'%3EA%3C/text%3E%3C/svg%3E">
  <script>
    // 主题初始化：在 body 渲染前执行，防止闪烁
    (function() {
      var theme = null;
      try { theme = localStorage.getItem('theme'); } catch (e) {}
      if (!theme) theme = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', theme);
    })();
  </script>
  <style>${STYLES}</style>
</head>
<body>
  ${progress ? '<div class="progress" id="progress"></div>' : ''}
  <nav class="top-nav" id="top-nav">
    <div class="nav-content">
      <a href="/?lang=${lang}" class="logo"><span class="logo-mark">A</span><span>${t.blogTitle}</span></a>
      <div class="nav-controls">
        <a href="/search?lang=${lang}" class="icon-btn" aria-label="${t.search}" onclick="var i=document.querySelector('.search-input'); if(i){event.preventDefault(); i.focus();}">${ICON_SEARCH}</a>
        <button class="icon-btn" type="button" onclick="toggleLanguage()" aria-label="${t.language}">${lang === 'zh' ? 'EN' : '中文'}</button>
        <button class="icon-btn" type="button" onclick="toggleTheme()" aria-label="${t.toggleTheme}">${ICON_MOON}${ICON_SUN}</button>
      </div>
    </div>
  </nav>

  <main>
    ${content}
  </main>

  <footer class="site-footer">
    <div class="container">
      <span>© ${new Date().getFullYear()} AnixOps Studio</span>
      <a href="https://anixops.com" target="_blank" rel="noopener">anixops.com</a>
    </div>
  </footer>

  <script>
    function toggleTheme() {
      var html = document.documentElement;
      var next = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      html.setAttribute('data-theme', next);
      try { localStorage.setItem('theme', next); } catch (e) {}
    }

    function toggleLanguage() {
      var url = new URL(window.location);
      url.searchParams.set('lang', '${lang === 'zh' ? 'en' : 'zh'}');
      window.location.href = url.toString();
    }

    (function() {
      var nav = document.getElementById('top-nav');
      var bar = document.getElementById('progress');
      var tocLinks = Array.prototype.slice.call(document.querySelectorAll('.toc a'));
      var heads = tocLinks.map(function(a) { return document.getElementById(decodeURIComponent(a.getAttribute('href').slice(1))); });

      function onScroll() {
        var y = window.scrollY;
        nav.classList.toggle('scrolled', y > 8);
        if (bar) {
          var max = document.documentElement.scrollHeight - window.innerHeight;
          bar.style.width = (max > 0 ? Math.min(100, y / max * 100) : 0) + '%';
        }
        if (tocLinks.length) {
          var current = 0;
          for (var i = 0; i < heads.length; i++) {
            if (heads[i] && heads[i].getBoundingClientRect().top < 120) current = i;
          }
          tocLinks.forEach(function(a, i) { a.classList.toggle('active', i === current); });
        }
      }
      window.addEventListener('scroll', onScroll, { passive: true });
      onScroll();

      // 代码块复制按钮
      document.querySelectorAll('.markdown-body pre').forEach(function(pre) {
        var btn = document.createElement('button');
        btn.className = 'copy-btn';
        btn.type = 'button';
        btn.textContent = '${t.copy}';
        btn.addEventListener('click', function() {
          var code = pre.querySelector('code') || pre;
          navigator.clipboard.writeText(code.innerText).then(function() {
            btn.textContent = '${t.copied}';
            setTimeout(function() { btn.textContent = '${t.copy}'; }, 1500);
          });
        });
        pre.appendChild(btn);
      });
    })();
  </script>
</body>
</html>`;
}
