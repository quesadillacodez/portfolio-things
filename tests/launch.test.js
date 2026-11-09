import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { pages, resolveRoute, siteUrl } from '../src/lib/routes.js';
import { validateMessage } from '../src/lib/contact.js';

test('deployment headers have no duplicate names within a route rule', () => {
  const config = JSON.parse(readFileSync('vercel.json', 'utf8'));
  for (const rule of config.headers) {
    const names = rule.headers.map((header) => header.key.toLowerCase());
    assert.equal(new Set(names).size, names.length, rule.source);
  }
});

test('every content page resolves from its real URL and its legacy hash', () => {
  for (const page of pages.filter((page) => page.path !== '/')) {
    assert.equal(resolveRoute(page.path)?.path, page.path);
    assert.equal(resolveRoute('/', `#${page.path}`)?.path, page.path);
  }
  assert.equal(resolveRoute('/', '#work'), null);
  assert.equal(resolveRoute('/case/no-such-case').kind, 'missing');
  assert.equal(resolveRoute('/', '#/made-up').kind, 'missing');
  assert.equal(resolveRoute('/privacy', '#main-content').kind, 'privacy');
});

test('composer rejects missing, malformed, and oversized input', () => {
  assert.equal(Object.keys(validateMessage({ name: '', email: 'bad', message: 'short' })).length, 3);
  assert.ok(validateMessage({ name: 'A\nBcc: x', email: 'a@b.com', message: 'Hello about a role' }).name);
  assert.ok(validateMessage({ name: 'A', email: 'a@b.com', message: 'x'.repeat(1201) }).message);
  assert.deepEqual(validateMessage({ name: 'A', email: 'a@b.com', message: 'Hello about a role' }), {});
});

test('contact form uses the configured Formspree form', () => {
  const composer = readFileSync('src/components/ContactComposer.jsx', 'utf8');
  const config = JSON.parse(readFileSync('vercel.json', 'utf8'));
  assert.match(composer, /useForm\('xvkojqge'\)/);
  assert.ok(!composer.includes('/api/contact'));
  assert.match(JSON.stringify(config), /https:\/\/formspree\.io/);
});

test('all target="_blank" links include rel="noopener noreferrer"', () => {
  const getFiles = (dir) => {
    let results = [];
    for (const file of readdirSync(dir)) {
      const fullPath = join(dir, file);
      if (statSync(fullPath).isDirectory()) {
        results = results.concat(getFiles(fullPath));
      } else if (file.endsWith('.jsx') || file.endsWith('.js') || file.endsWith('.html')) {
        results.push(fullPath);
      }
    }
    return results;
  };

  const files = [...getFiles('src'), ...getFiles('public')];
  const blankLinkRegex = /<a\b[^>]*\btarget=["']_blank["'][^>]*>/g;

  for (const file of files) {
    const content = readFileSync(file, 'utf8');
    const matches = content.match(blankLinkRegex) || [];
    for (const match of matches) {
      assert.match(
        match,
        /rel=["']noopener noreferrer["']/,
        `File ${file} has a target="_blank" link missing rel="noopener noreferrer": ${match}`,
      );
    }
  }
});

test('build emits crawler-visible metadata and only real URLs in the sitemap', () => {
  const sitemap = readFileSync('dist/sitemap.xml', 'utf8');
  for (const page of pages) {
    const html = readFileSync(page.path === '/' ? 'dist/index.html' : `dist${page.path}/index.html`, 'utf8');
    assert.ok(html.includes(`href="${siteUrl}${page.path}"`), page.path);
    assert.ok(html.includes(page.title.replaceAll('&', '&amp;')), page.path);
    assert.equal(sitemap.includes(`<loc>${siteUrl}${page.path}</loc>`), !page.noindex);
  }
  assert.ok(!sitemap.includes('#'));
  assert.ok(existsSync('dist/404.html'));
});
