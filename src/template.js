import { i18n } from './i18n.js';

export function getHTML({ title, content, lang = 'en' }) {
  return `<!DOCTYPE html>
<html lang="${lang}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  <meta name="description" content="AnixOps Blog - Thoughts, stories and ideas">
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    :root {
      --bg-primary: #ffffff;
      --bg-secondary: #f8f9fa;
      --bg-card: #ffffff;
      --text-primary: #1a1a1a;
      --text-secondary: #666666;
      --accent: #3b82f6;
      --accent-hover: #2563eb;
      --border: #e5e7eb;
      --shadow: rgba(0, 0, 0, 0.1);
      --code-bg: #f4f4f5;
      --transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }

    [data-theme="dark"] {
      --bg-primary: #0f172a;
      --bg-secondary: #1e293b;
      --bg-card: #1e293b;
      --text-primary: #f8fafc;
      --text-secondary: #94a3b8;
      --accent: #60a5fa;
      --accent-hover: #3b82f6;
      --border: #334155;
      --shadow: rgba(0, 0, 0, 0.3);
      --code-bg: #334155;
    }

    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
      background: var(--bg-primary);
      color: var(--text-primary);
      line-height: 1.6;
      transition: var(--transition);
    }

    .container {
      max-width: 900px;
      margin: 0 auto;
      padding: 2rem 1.5rem;
    }

    /* 头部导航 */
    .top-nav {
      position: sticky;
      top: 0;
      background: var(--bg-primary);
      border-bottom: 1px solid var(--border);
      padding: 1rem 0;
      z-index: 100;
      backdrop-filter: blur(10px);
      background: rgba(255, 255, 255, 0.8);
    }

    [data-theme="dark"] .top-nav {
      background: rgba(15, 23, 42, 0.8);
    }

    .nav-content {
      max-width: 900px;
      margin: 0 auto;
      padding: 0 1.5rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .logo {
      font-size: 1.25rem;
      font-weight: 700;
      color: var(--text-primary);
      text-decoration: none;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .logo::before {
      content: "📝";
    }

    .nav-controls {
      display: flex;
      gap: 1rem;
      align-items: center;
    }

    .theme-toggle, .lang-toggle {
      background: var(--bg-secondary);
      border: 1px solid var(--border);
      padding: 0.5rem 1rem;
      border-radius: 8px;
      cursor: pointer;
      transition: var(--transition);
      font-size: 0.9rem;
      color: var(--text-primary);
    }

    .theme-toggle:hover, .lang-toggle:hover {
      background: var(--accent);
      color: white;
      border-color: var(--accent);
    }

    .search-link {
      background: var(--bg-secondary);
      border: 1px solid var(--border);
      padding: 0.5rem 1rem;
      border-radius: 8px;
      cursor: pointer;
      transition: var(--transition);
      font-size: 0.9rem;
      color: var(--text-primary);
      text-decoration: none;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .search-link:hover {
      background: var(--accent);
      color: white;
      border-color: var(--accent);
    }

    /* 博客头部 */
    .blog-header {
      text-align: center;
      margin: 3rem 0 4rem;
      padding: 2rem 0;
    }

    .blog-header h1 {
      font-size: 3rem;
      font-weight: 800;
      margin-bottom: 1rem;
      background: linear-gradient(135deg, var(--accent), #8b5cf6);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    .subtitle {
      font-size: 1.25rem;
      color: var(--text-secondary);
    }

    /* 搜索框 */
    .search-container {
      margin: 2rem 0;
    }

    .search-form {
      display: flex;
      gap: 0.5rem;
      max-width: 600px;
      margin: 0 auto;
    }

    .search-input {
      flex: 1;
      padding: 0.75rem 1.25rem;
      border: 2px solid var(--border);
      border-radius: 12px;
      background: var(--bg-card);
      color: var(--text-primary);
      font-size: 1rem;
      transition: var(--transition);
      outline: none;
    }

    .search-input:focus {
      border-color: var(--accent);
      box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
    }

    .search-input::placeholder {
      color: var(--text-secondary);
    }

    .search-button {
      padding: 0.75rem 1.5rem;
      background: var(--accent);
      color: white;
      border: none;
      border-radius: 12px;
      font-size: 1rem;
      font-weight: 600;
      cursor: pointer;
      transition: var(--transition);
      display: flex;
      align-items: center;
      gap: 0.5rem;
      white-space: nowrap;
    }

    .search-button:hover {
      background: var(--accent-hover);
      transform: translateY(-2px);
      box-shadow: 0 4px 12px var(--shadow);
    }

    .search-icon {
      font-size: 1.2rem;
    }

    .search-info {
      margin: 1.5rem 0;
      padding: 1rem;
      background: var(--bg-secondary);
      border-radius: 8px;
      border-left: 4px solid var(--accent);
      color: var(--text-secondary);
    }

    .search-info p {
      margin: 0;
      font-size: 0.95rem;
    }

    /* 分类筛选 */
    .category-filter {
      display: flex;
      flex-wrap: wrap;
      gap: 0.75rem;
      margin: 2rem 0 3rem;
      padding: 1.5rem;
      background: var(--bg-secondary);
      border-radius: 12px;
      border: 1px solid var(--border);
    }

    .category-btn {
      padding: 0.5rem 1.25rem;
      background: var(--bg-card);
      border: 1px solid var(--border);
      border-radius: 8px;
      text-decoration: none;
      color: var(--text-primary);
      font-size: 0.9rem;
      font-weight: 500;
      transition: var(--transition);
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
    }

    .category-btn:hover {
      background: var(--accent);
      color: white;
      border-color: var(--accent);
      transform: translateY(-2px);
      box-shadow: 0 4px 8px var(--shadow);
    }

    .category-btn.active {
      background: var(--accent);
      color: white;
      border-color: var(--accent);
    }

    .category-badge {
      background: var(--accent);
      color: white;
      padding: 0.25rem 0.75rem;
      border-radius: 6px;
      font-size: 0.8rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    /* 文章网格 */
    .posts-grid {
      display: grid;
      gap: 2rem;
    }

    .no-posts {
      text-align: center;
      padding: 4rem 2rem;
      color: var(--text-secondary);
      font-size: 1.1rem;
    }

    .post-card {
      background: var(--bg-card);
      border: 1px solid var(--border);
      border-radius: 12px;
      padding: 2rem;
      transition: var(--transition);
      box-shadow: 0 2px 4px var(--shadow);
    }

    .post-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 8px 16px var(--shadow);
      border-color: var(--accent);
    }

    .post-card h2 {
      font-size: 1.75rem;
      margin: 1rem 0;
    }

    .post-card h2 a {
      color: var(--text-primary);
      text-decoration: none;
      transition: var(--transition);
    }

    .post-card h2 a:hover {
      color: var(--accent);
    }

    .post-meta {
      display: flex;
      gap: 1rem;
      align-items: center;
      flex-wrap: wrap;
      color: var(--text-secondary);
      font-size: 0.9rem;
    }

    .tags {
      display: flex;
      gap: 0.5rem;
      flex-wrap: wrap;
    }

    .tag {
      background: var(--bg-secondary);
      padding: 0.25rem 0.75rem;
      border-radius: 6px;
      font-size: 0.85rem;
      color: var(--text-secondary);
      border: 1px solid var(--border);
    }

    .excerpt {
      color: var(--text-secondary);
      margin: 1rem 0;
      line-height: 1.7;
    }

    .read-more {
      color: var(--accent);
      text-decoration: none;
      font-weight: 600;
      display: inline-flex;
      align-items: center;
      gap: 0.25rem;
      transition: var(--transition);
    }

    .read-more:hover {
      color: var(--accent-hover);
      gap: 0.5rem;
    }

    /* 文章详情 */
    .post-detail {
      max-width: 800px;
    }

    .post-header {
      margin-bottom: 3rem;
      padding-bottom: 2rem;
      border-bottom: 2px solid var(--border);
    }

    .post-header h1 {
      font-size: 2.5rem;
      margin: 1rem 0;
      line-height: 1.3;
    }

    .back-link {
      color: var(--accent);
      text-decoration: none;
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      transition: var(--transition);
      font-weight: 500;
    }

    .back-link:hover {
      color: var(--accent-hover);
      gap: 0.75rem;
    }

    /* Markdown内容样式 */
    .markdown-body {
      font-size: 1.1rem;
      line-height: 1.8;
    }

    .markdown-body h1,
    .markdown-body h2,
    .markdown-body h3,
    .markdown-body h4,
    .markdown-body h5,
    .markdown-body h6 {
      margin: 2rem 0 1rem;
      font-weight: 700;
      line-height: 1.3;
    }

    .markdown-body h1 { font-size: 2.25rem; }
    .markdown-body h2 { font-size: 1.875rem; }
    .markdown-body h3 { font-size: 1.5rem; }

    .markdown-body p {
      margin: 1.5rem 0;
    }

    .markdown-body a {
      color: var(--accent);
      text-decoration: none;
      border-bottom: 1px solid transparent;
      transition: var(--transition);
    }

    .markdown-body a:hover {
      border-bottom-color: var(--accent);
    }

    .markdown-body code {
      background: var(--code-bg);
      padding: 0.2rem 0.4rem;
      border-radius: 4px;
      font-size: 0.9em;
      font-family: "SF Mono", Monaco, Consolas, monospace;
    }

    .markdown-body pre {
      background: var(--code-bg);
      padding: 1.5rem;
      border-radius: 8px;
      overflow-x: auto;
      margin: 1.5rem 0;
      border: 1px solid var(--border);
    }

    .markdown-body pre code {
      background: none;
      padding: 0;
    }

    .markdown-body blockquote {
      border-left: 4px solid var(--accent);
      padding-left: 1.5rem;
      margin: 1.5rem 0;
      color: var(--text-secondary);
      font-style: italic;
    }

    .markdown-body ul,
    .markdown-body ol {
      margin: 1.5rem 0;
      padding-left: 2rem;
    }

    .markdown-body li {
      margin: 0.5rem 0;
    }

    .markdown-body img {
      max-width: 100%;
      height: auto;
      border-radius: 8px;
      margin: 1.5rem 0;
    }

    .post-footer {
      margin-top: 4rem;
      padding-top: 2rem;
      border-top: 2px solid var(--border);
    }

    /* 错误页面 */
    .error-page {
      text-align: center;
      padding: 4rem 0;
    }

    .error-page h1 {
      font-size: 6rem;
      margin-bottom: 1rem;
    }

    .error-page p {
      font-size: 1.25rem;
      color: var(--text-secondary);
      margin-bottom: 2rem;
    }

    .button {
      display: inline-block;
      background: var(--accent);
      color: white;
      padding: 0.75rem 2rem;
      border-radius: 8px;
      text-decoration: none;
      font-weight: 600;
      transition: var(--transition);
    }

    .button:hover {
      background: var(--accent-hover);
      transform: translateY(-2px);
      box-shadow: 0 4px 12px var(--shadow);
    }

    /* 响应式设计 */
    @media (max-width: 768px) {
      .blog-header h1 {
        font-size: 2rem;
      }

      .post-header h1 {
        font-size: 1.75rem;
      }

      .container {
        padding: 1.5rem 1rem;
      }

      .post-card {
        padding: 1.5rem;
      }

      .nav-controls {
        gap: 0.5rem;
      }

      .theme-toggle, .lang-toggle, .search-link {
        padding: 0.4rem 0.8rem;
        font-size: 0.85rem;
      }

      .search-form {
        flex-direction: column;
      }

      .search-button {
        width: 100%;
        justify-content: center;
      }

      .search-info {
        font-size: 0.9rem;
      }
    }

    /* 页面底部 */
    footer.site-footer {
      margin-top: 4rem;
      padding: 2rem 0;
      border-top: 1px solid var(--border);
      text-align: center;
      color: var(--text-secondary);
      font-size: 0.9rem;
    }

    footer.site-footer a {
      color: var(--accent);
      text-decoration: none;
    }

    footer.site-footer a:hover {
      text-decoration: underline;
    }
  </style>
</head>
<body>
  <nav class="top-nav">
    <div class="nav-content">
      <a href="/?lang=${lang}" class="logo">AnixOps Blog</a>
      <div class="nav-controls">
        <a href="/search?lang=${lang}" class="search-link">
          <span>🔍</span>
        </a>
        <button class="lang-toggle" onclick="toggleLanguage()">
          ${lang === 'zh' ? 'EN' : '中文'}
        </button>
        <button class="theme-toggle" onclick="toggleTheme()">
          <span class="theme-icon">🌙</span>
        </button>
      </div>
    </div>
  </nav>

  <main>
    ${content}
  </main>

  <footer class="site-footer">
    <div class="container">
      <p>© ${new Date().getFullYear()} AnixOps Studio. Made with ❤️ | 
      <a href="https://anixops.com" target="_blank">anixops.com</a></p>
    </div>
  </footer>

  <script>
    // 主题切换
    function toggleTheme() {
      const html = document.documentElement;
      const currentTheme = html.getAttribute('data-theme') || 'light';
      const newTheme = currentTheme === 'light' ? 'dark' : 'light';
      html.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
      
      const icon = document.querySelector('.theme-icon');
      icon.textContent = newTheme === 'light' ? '🌙' : '☀️';
    }

    // 语言切换
    function toggleLanguage() {
      const currentLang = new URLSearchParams(window.location.search).get('lang') || 'en';
      const newLang = currentLang === 'en' ? 'zh' : 'en';
      const url = new URL(window.location);
      url.searchParams.set('lang', newLang);
      window.location.href = url.toString();
    }

    // 初始化主题（自动检测系统偏好）
    (function() {
      // 检查是否有保存的主题偏好
      let theme = localStorage.getItem('theme');
      
      // 如果没有保存的偏好，则检测系统偏好
      if (!theme) {
        // 使用 matchMedia 检测系统暗色模式偏好
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
          theme = 'dark';
        } else {
          theme = 'light';
        }
      }
      
      // 应用主题
      document.documentElement.setAttribute('data-theme', theme);
      const icon = document.querySelector('.theme-icon');
      if (icon) {
        icon.textContent = theme === 'light' ? '🌙' : '☀️';
      }
      
      // 监听系统主题变化（如果用户没有手动设置过主题）
      if (window.matchMedia && !localStorage.getItem('theme')) {
        const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');
        darkModeQuery.addEventListener('change', (e) => {
          const newTheme = e.matches ? 'dark' : 'light';
          document.documentElement.setAttribute('data-theme', newTheme);
          const icon = document.querySelector('.theme-icon');
          if (icon) {
            icon.textContent = newTheme === 'light' ? '🌙' : '☀️';
          }
        });
      }
    })();
  </script>
</body>
</html>`;
}
