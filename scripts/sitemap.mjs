import fs from 'node:fs';
import path from 'node:path';

const escapeXml = value => value.replace(/[<>&"']/g, ch => ({'<':'&lt;','>':'&gt;','&':'&amp;','"':'&quot;',"'":'&apos;'}[ch]));

export function generateSitemap(root) {
  const base = fs.readFileSync(path.join(root, 'scripts/sitemap-static.xml'), 'utf8');
  const urls = new Map([...base.matchAll(/<loc>([^<]+)<\/loc>/g)].map(match => [match[1], null]));
  const directory = path.join(root, 'content/blog');
  for (const filename of fs.readdirSync(directory).filter(name => name.endsWith('.md')).sort()) {
    const raw = fs.readFileSync(path.join(directory, filename), 'utf8').replace(/\r\n/g, '\n');
    const frontmatter = raw.match(/^---\n([\s\S]*?)\n---\n?/);
    const published = frontmatter?.[1].match(/^published:\s*(.*?)\s*$/m)?.[1];
    if (published?.replace(/^['"]|['"]$/g, '') === 'false') continue;
    // Article routes use the Markdown filename as the slug, not a frontmatter slug.
    const slug = filename.slice(0, -3);
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) throw new Error(`Invalid blog filename: ${filename}`);
    const date = frontmatter?.[1].match(/^date:\s*["']?(\d{4}-\d{2}-\d{2})["']?\s*$/m)?.[1] || null;
    urls.set(`https://thepsychicstudio.com/blog/${slug}`, date);
  }
  return '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
    + [...urls].map(([url, lastmod]) => `<url><loc>${escapeXml(url)}</loc>${lastmod ? `<lastmod>${lastmod}</lastmod>` : ''}</url>`).join('\n') + '\n</urlset>\n';
}
