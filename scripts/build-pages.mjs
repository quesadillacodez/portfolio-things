import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { pages, siteUrl } from '../src/lib/routes.js';

const escape = (text) =>
  text.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
const template = await readFile('dist/index.html', 'utf8');
for (const page of pages) {
  let html = template.replace(/<title>.*?<\/title>/s, `<title>${escape(page.title)}</title>`);
  for (const [attribute, key, value] of [
    ['name', 'description', page.description],
    ['property', 'og:title', page.title],
    ['property', 'og:description', page.description],
    ['property', 'og:url', siteUrl + page.path],
    ['name', 'twitter:title', page.title],
    ['name', 'twitter:description', page.description],
    ['name', 'robots', page.noindex ? 'noindex, follow' : 'index, follow'],
  ])
    html = html.replace(
      new RegExp(`<meta\\s+${attribute}="${key}"\\s+content="[^"]*"\\s*\\/?\\s*>`, 's'),
      `<meta ${attribute}="${key}" content="${escape(value)}" />`,
    );
  html = html.replace(
    /<link rel="canonical" href="[^"]*"\s*\/?\s*>/,
    `<link rel="canonical" href="${siteUrl}${page.path}" />`,
  );
  if (page.path !== '/') {
    // Portrait is only an above-the-fold asset on the home page.
    html = html.replace(/<link\s+rel="preload"\s+as="image"[\s\S]*?\/>/, '');
    const breadcrumb = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl + '/' },
        { '@type': 'ListItem', position: 2, name: page.title.split(' | ')[0], item: siteUrl + page.path },
      ],
    };
    html = html.replace(
      '</head>',
      `<script type="application/ld+json">${JSON.stringify(breadcrumb).replaceAll('<', '\\u003c')}</script>\n</head>`,
    );
    const directory = `dist${page.path}`;
    await mkdir(directory, { recursive: true });
    await writeFile(`${directory}/index.html`, html);
  } else await writeFile('dist/index.html', html);
}
await writeFile(
  'dist/sitemap.xml',
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${pages
    .filter((page) => !page.noindex)
    .map((page) => `  <url><loc>${siteUrl}${page.path}</loc></url>`)
    .join('\n')}\n</urlset>\n`,
);
console.log(`Generated ${pages.length} documents with unique metadata and a sitemap.`);
