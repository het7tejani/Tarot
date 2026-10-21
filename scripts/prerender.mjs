// Build-time prerender: writes real HTML (title, meta, canonical, JSON-LD, content) for every public route.
import fs from 'node:fs';
import path from 'node:path';
import {pathToFileURL, fileURLToPath} from 'node:url';
import {generateSitemap} from './sitemap.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
const template = fs.readFileSync(path.join(dist, 'index.html'), 'utf8');
if (!template.includes('<!--seo-head-->')) throw new Error('index.html is missing the <!--seo-head--> marker');
// Page styles live in lazy CSS chunks (Layout etc). Link them in every prerendered page so the first paint is styled before JS loads.
const cssLinks = fs.readdirSync(path.join(dist, 'assets')).filter((f) => f.endsWith('.css') && !/^Admin/.test(f) && !template.includes(f)).map((f) => `<link rel="stylesheet" crossorigin href="/assets/${f}">`).join('\n    ');
const {render} = await import(pathToFileURL(path.join(root, 'dist-ssr/entry-server.js')).href);

const esc = (v) => String(v).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const headTags = (h) => [
  `<title>${esc(h.title)}</title>`,
  `<meta name="description" content="${esc(h.description)}" />`,
  `<meta name="robots" content="${h.noindex ? 'noindex, nofollow' : 'index, follow'}" />`,
  `<link rel="canonical" href="${esc(h.canonical)}" />`,
  `<meta property="og:title" content="${esc(h.title)}" />`,
  `<meta property="og:description" content="${esc(h.description)}" />`,
  `<meta property="og:url" content="${esc(h.canonical)}" />`,
  `<meta property="og:type" content="${esc(h.ogType)}" />`,
  `<meta property="og:site_name" content="The Psychic Studio" />`,
  `<meta property="og:image" content="${esc(h.image)}" />`,
  `<meta name="twitter:card" content="summary_large_image" />`,
  `<meta name="twitter:title" content="${esc(h.title)}" />`,
  `<meta name="twitter:description" content="${esc(h.description)}" />`,
  `<meta name="twitter:image" content="${esc(h.image)}" />`,
  h.schema && h.schema.length ? `<script id="seo-dynamic-json-ld" type="application/ld+json">${JSON.stringify(h.schema).replace(/</g, '\\u003c')}</script>` : '',
].filter(Boolean).join('\n    ');

const write = (route, html) => {
  const file = route === '/' ? path.join(dist, 'index.html') : path.join(dist, route.replace(/^\//, ''), 'index.html');
  fs.mkdirSync(path.dirname(file), {recursive: true});
  fs.writeFileSync(file, html);
};

// Empty shells for pages that must not be indexed and are rendered in the browser only.
const shell = (title, description) => template.replace('<!--seo-head-->', headTags({title, description, canonical: 'https://thepsychicstudio.com/', ogType: 'website', image: 'https://thepsychicstudio.com/tarot/the_star.jpg', noindex: true, schema: []}));
fs.writeFileSync(path.join(dist, '404.html'), shell('Page not found | The Psychic Studio', 'This page could not be found.'));
write('/admin', shell('Admin | The Psychic Studio', 'Private admin area.'));

const sitemap = generateSitemap(root);
const paths = new Set([...sitemap.matchAll(/<loc>https:\/\/thepsychicstudio\.com([^<]*)<\/loc>/g)].map((m) => m[1] || '/'));
for (const extra of ['/', '/shop', '/about', '/faq', '/contact', '/blog', '/free-tarot', '/privacy-policy', '/terms', '/cookie-policy', '/refund-policy']) paths.add(extra);

const problems = [];
let count = 0;
for (const route of [...paths].sort()) {
  const {html, head, dailyCardDayKey} = await render(route);
  const h1s = (html.match(/<h1[\s>]/g) || []).length;
  if (!head) { problems.push(`${route}: no SEO head collected`); continue; }
  if (/Page not found/.test(head.title)) { problems.push(`${route}: rendered the 404 page`); continue; }
  if (h1s !== 1) problems.push(`${route}: ${h1s} H1 elements`);
  if (head.title.length > 70 || head.description.length > 175) problems.push(`${route}: long title/description (${head.title.length}/${head.description.length})`);
  const preloads = route === '/' ? fs.readdirSync(path.join(dist,'assets')).filter(f=>/^(Home-|Layout-|readingsData-|etsyListings-|SEOHead-).*\.js$/.test(f)).map(f=>`<link rel="modulepreload" href="/assets/${f}" crossorigin>`).join('\n') : '';
  const page = template.replace('<!--seo-head-->', headTags(head)+'\n'+preloads).replace(/(<link rel="stylesheet"[^>]*index-[^>]*>)/, '$1\n    ' + cssLinks).replace('<div id="root"></div>', `<div id="root" data-daily-card-day="${dailyCardDayKey}">${html}</div>`);
  write(route, page);
  count++;
}
console.log(`Prerendered ${count} routes`);
if (problems.length) { console.warn(problems.join('\n')); if (process.env.PRERENDER_STRICT) process.exit(1); }
fs.rmSync(path.join(root, 'dist-ssr'), {recursive: true, force: true});
