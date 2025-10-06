# Changelog / 更新日志

[English](#english) | [中文](#中文)

---

## English

### Version 1.1.0 - Folder Management (2025-10-06)

#### ✨ New Features

**1. Recursive Folder Scanning**
- ✅ Build script now supports **any depth** of subfolders
- ✅ Automatically discovers all `.md` files regardless of directory

**2. Auto-Categorization**
- ✅ Automatically sets post category based on folder name
- ✅ Example: `posts/tutorials/my-post.md` → `category: "tutorials"`
- ✅ Can override auto-categorization in frontmatter

**3. Category Filtering UI**
- ✅ Homepage displays all category buttons
- ✅ Click category buttons to filter posts
- ✅ Shows post count for each category
- ✅ Supports URL parameter: `?category=tutorials`

**4. Enhanced Build Output**
- ✅ Build results displayed grouped by category
- ✅ Shows count of found Markdown files
- ✅ Clearer build logs

#### 📁 Supported Organization Methods

**Flat Structure**
```
posts/
├── post1.md
├── post2.md
└── post3.md
```

**By Year**
```
posts/
├── 2024/
└── 2025/
```

**By Category**
```
posts/
├── tutorials/
├── news/
└── reviews/
```

**Year + Category (Recommended⭐)**
```
posts/
├── 2025/
│   ├── tutorials/
│   ├── news/
│   └── projects/
└── drafts/
```

**Multi-level Nesting**
```
posts/
├── 2025/
│   └── web-development/
│       ├── frontend/
│       └── backend/
└── archive/
```

#### 🎨 UI Updates

**New Components:**
- Category filter bar with clickable buttons
- Category badges on post cards
- Empty state message when no posts found

#### 🔧 Technical Improvements

**Build Script (`scripts/build.js`)**
- Added `findAllMarkdownFiles()`: Recursively finds all MD files
- Added `extractCategoryFromPath()`: Extracts category from file path
- Enhanced build logs with category grouping

**Frontend Routes (`src/index.js`)**
- Category filtering functionality
- Support for `?category=xxx` query parameter
- Auto-generated category list

**Styles (`src/template.js`)**
- Category filter styles
- Category button styles  
- Category badge styles
- Empty state styles

**i18n (`src/i18n.js`)**
- Added `allPosts` translations
- Added `noPosts` translations
- Added `categories` translations

#### � Documentation

- README.md updated with bilingual content (EN/ZH)
- CHANGELOG.md updated with bilingual content (EN/ZH)

#### 🚀 Usage Examples

**Create categorized post:**
```bash
# Create in tutorials folder
posts/tutorials/my-tutorial.md
```

```yaml
---
title: My Tutorial
date: 2025-10-06
# category auto-set to "tutorials"
---
```

**Override auto-categorization:**
```yaml
---
category: advanced  # Override folder name
---
```

**Access category pages:**
```
https://yourblog.com/?category=tutorials
https://yourblog.com/?category=news&lang=zh
```

#### ✅ Compatibility

- ✅ **Backward Compatible**: Existing flat structure still works
- ✅ **Progressive Migration**: Gradually move old posts to subfolders
- ✅ **Flexible Organization**: Choose what works best for you

#### � Performance

- Fast build times even with many files
- Efficient recursive file system traversal
- Minimal memory footprint

#### 💡 Best Practices

- **Small blogs (< 50 posts)**: Flat or simple category structure
- **Medium blogs (50-200 posts)**: Year-based or category-based
- **Large blogs (> 200 posts)**: Year + category combination
- **Ongoing**: Use `drafts` folder for work-in-progress
- **Archive**: Use `archive` folder for old content

---

### Version 1.0.0 - Initial Release (2025-01-15)

#### ✨ Initial Features

- Markdown-based blog posts
- Cloudflare Workers deployment
- Dark/Light theme support
- i18n support (English & Chinese)
- Modern, responsive design
- Zero-config setup

---

---

## 中文

### 版本 1.1.0 - 文件夹管理功能 (2025-10-06)

#### ✨ 新增功能

**1. 递归文件夹扫描**
- ✅ 构建脚本现在支持**任意深度**的子文件夹
- ✅ 自动发现所有 `.md` 文件，无论它们在哪个子目录

**2. 自动分类**
- ✅ 根据文件夹名自动设置文章分类
- ✅ 例如：`posts/tutorials/my-post.md` → `category: "tutorials"`
- ✅ 可以在 frontmatter 中覆盖自动分类

**3. 分类筛选界面**
- ✅ 首页显示所有分类按钮
- ✅ 点击分类按钮可筛选对应文章
- ✅ 显示每个分类的文章数量
- ✅ 支持 URL 参数：`?category=tutorials`

**4. 增强的构建输出**
- ✅ 按分类分组显示构建结果
- ✅ 显示找到的 Markdown 文件数量
- ✅ 更清晰的构建日志

#### 📁 支持的组织方式

**扁平结构**
```
posts/
├── post1.md
├── post2.md
└── post3.md
```

**按年份**
```
posts/
├── 2024/
└── 2025/
```

**按分类**
```
posts/
├── tutorials/
├── news/
└── reviews/
```

**年份 + 分类（推荐⭐）**
```
posts/
├── 2025/
│   ├── tutorials/
│   ├── news/
│   └── projects/
└── drafts/
```

**多层嵌套**
```
posts/
├── 2025/
│   └── web-development/
│       ├── frontend/
│       └── backend/
└── archive/
```

#### 🎨 界面更新

**新增组件：**
- 分类筛选栏，可点击按钮
- 文章卡片上的分类徽章
- 无文章时的空状态提示

#### 🔧 技术改进

**构建脚本 (`scripts/build.js`)**
- 新增 `findAllMarkdownFiles()`：递归查找所有 MD 文件
- 新增 `extractCategoryFromPath()`：从路径提取分类
- 改进构建日志，按分类分组显示

**前端路由 (`src/index.js`)**
- 新增分类筛选功能
- 支持 `?category=xxx` 查询参数
- 自动生成分类列表

**样式 (`src/template.js`)**
- 分类筛选样式
- 分类按钮样式
- 分类徽章样式
- 空状态样式

**i18n (`src/i18n.js`)**
- 新增 `allPosts` 翻译
- 新增 `noPosts` 翻译
- 新增 `categories` 翻译

#### 📖 文档

- README.md 更新为中英双语版本
- CHANGELOG.md 更新为中英双语版本

#### 🚀 使用示例

**创建带分类的文章：**
```bash
# 在 tutorials 文件夹创建文章
posts/tutorials/my-tutorial.md
```

```yaml
---
title: 我的教程
date: 2025-10-06
# category 会自动设置为 "tutorials"
---
```

**覆盖自动分类：**
```yaml
---
category: advanced  # 覆盖文件夹名
---
```

**访问分类页面：**
```
https://yourblog.com/?category=tutorials
https://yourblog.com/?category=news&lang=zh
```

#### ✅ 兼容性

- ✅ **向后兼容**：现有的扁平结构仍然有效
- ✅ **渐进式迁移**：可以逐步将旧文章移到子文件夹
- ✅ **灵活组织**：选择最适合你的组织方式

#### 📈 性能

- 即使文件数量增加，构建时间仍然很快
- 高效的递归文件系统遍历
- 最小的内存占用

#### 💡 最佳实践

- **小型博客（< 50 篇）**：使用扁平结构或简单分类
- **中型博客（50-200 篇）**：使用按年份或按分类
- **大型博客（> 200 篇）**：使用年份 + 分类组合
- **持续更新**：使用 `drafts` 文件夹管理进行中的内容
- **归档**：使用 `archive` 文件夹归档旧内容

---

### 版本 1.0.0 - 初始发布 (2025-01-15)

#### ✨ 初始特性

- 基于 Markdown 的博客文章
- Cloudflare Workers 部署
- 暗色/亮色主题支持
- i18n 支持（中英文）
- 现代响应式设计
- 零配置设置

---

Made with ❤️ by [AnixOps Studio](https://anixops.com)
