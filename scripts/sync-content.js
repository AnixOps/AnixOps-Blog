import fs from 'fs';
import path from 'path';
import { execFileSync } from 'child_process';
import { fileURLToPath } from 'url';
import matter from 'gray-matter';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, '..');

const sourceDir = path.resolve(
  process.env.CONTENT_SOURCE || path.join(rootDir, '..', 'X-post')
);
const postsRoot = path.join(rootDir, 'posts');
const generatedPostsRoot = path.join(postsRoot, '_content');
const publicRoot = path.join(rootDir, 'public');
const generatedStaticRoot = path.join(publicRoot, 'static');

function assertInsideRoot(targetPath, basePath) {
  const relative = path.relative(basePath, targetPath);
  if (relative.startsWith('..') || path.isAbsolute(relative)) {
    throw new Error(`Refusing to touch path outside workspace: ${targetPath}`);
  }
}

function removeDir(dirPath) {
  assertInsideRoot(dirPath, rootDir);
  fs.rmSync(dirPath, { recursive: true, force: true });
}

function ensureDir(dirPath) {
  fs.mkdirSync(dirPath, { recursive: true });
}

function walkFiles(dirPath, files = []) {
  for (const entry of fs.readdirSync(dirPath, { withFileTypes: true })) {
    const fullPath = path.join(dirPath, entry.name);
    if (entry.isDirectory()) {
      walkFiles(fullPath, files);
      continue;
    }
    if (entry.isFile()) {
      files.push(fullPath);
    }
  }
  return files;
}

function readGitDate(filePath) {
  try {
    const relativePath = path.relative(sourceDir, filePath);
    const output = execFileSync(
      'git',
      ['-C', sourceDir, 'log', '-1', '--format=%cs', '--', relativePath],
      { encoding: 'utf8' }
    ).trim();

    if (output) {
      return output;
    }
  } catch {
    // Fall through to filesystem timestamps.
  }

  return fs.statSync(filePath).mtime.toISOString().slice(0, 10);
}

function extractTitle(markdownBody, fallbackTitle) {
  const headingMatch = markdownBody.match(/^#\s+(.+)$/m);
  if (headingMatch) {
    return headingMatch[1].trim();
  }
  return fallbackTitle;
}

function normalizeStaticLinks(markdownBody) {
  return markdownBody.replace(/((?:\.\.\/)+)static\//g, '/static/');
}

function inferCategory(relativePath) {
  const parts = relativePath.split(path.sep).filter(Boolean);
  if (parts[0] === 'series' && parts.length > 1) {
    return parts[1];
  }
  if (parts[0] === 'posts' && parts.length > 1) {
    return parts[1];
  }
  if (parts[0] === 'drafts' || parts[0] === 'static') {
    return null;
  }
  return parts.length > 1 ? parts[0] : null;
}

function destinationForPost(relativePath) {
  const parts = relativePath.split(path.sep).filter(Boolean);

  if (parts[0] === 'series' && parts.length > 2) {
    return path.join(generatedPostsRoot, parts[1], ...parts.slice(2));
  }

  if (parts[0] === 'posts' && parts.length > 1) {
    return path.join(generatedPostsRoot, ...parts.slice(1));
  }

  if (parts[0] === 'drafts') {
    return null;
  }

  return path.join(generatedPostsRoot, ...parts);
}

function isPublishedMarkdown(relativePath) {
  const parts = relativePath.split(path.sep).filter(Boolean);
  return ['series', 'posts', 'drafts'].includes(parts[0]);
}

function copyFile(sourcePath, targetPath) {
  assertInsideRoot(targetPath, rootDir);
  ensureDir(path.dirname(targetPath));
  fs.copyFileSync(sourcePath, targetPath);
}

function syncPosts() {
  if (!fs.existsSync(sourceDir)) {
    throw new Error(`Content source not found: ${sourceDir}`);
  }

  removeDir(generatedPostsRoot);
  removeDir(generatedStaticRoot);
  ensureDir(generatedPostsRoot);
  ensureDir(generatedStaticRoot);

  const markdownFiles = walkFiles(sourceDir).filter(filePath => {
    if (!filePath.endsWith('.md')) {
      return false;
    }

    const relativePath = path.relative(sourceDir, filePath);
    return isPublishedMarkdown(relativePath);
  });

  for (const sourcePath of markdownFiles) {
    const relativePath = path.relative(sourceDir, sourcePath);
    const destinationPath = destinationForPost(relativePath);
    if (!destinationPath) {
      continue;
    }

    const raw = fs.readFileSync(sourcePath, 'utf8');
    const parsed = matter(raw);
    const body = normalizeStaticLinks(parsed.content.trimStart());
    const fallbackSlug = path.basename(sourcePath, '.md');
    const title = parsed.data.title || extractTitle(body, fallbackSlug);
    const slug = parsed.data.slug || fallbackSlug;
    const date = parsed.data.date || readGitDate(sourcePath);
    const category = parsed.data.category || inferCategory(relativePath);

    const frontmatter = {
      ...parsed.data,
      title,
      slug,
      date,
    };

    if (category && !frontmatter.category) {
      frontmatter.category = category;
    }

    const output = matter.stringify(body, frontmatter);
    ensureDir(path.dirname(destinationPath));
    fs.writeFileSync(destinationPath, output, 'utf8');
  }

  const staticDir = path.join(sourceDir, 'static');
  if (fs.existsSync(staticDir)) {
    for (const sourcePath of walkFiles(staticDir)) {
      const relativePath = path.relative(staticDir, sourcePath);
      const destinationPath = path.join(generatedStaticRoot, relativePath);
      copyFile(sourcePath, destinationPath);
    }
  }

  console.log(`Synced ${markdownFiles.length} markdown file(s) from ${sourceDir}`);
}

syncPosts();
