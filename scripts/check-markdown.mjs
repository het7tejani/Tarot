// Pre-publish check: no raw markdown artifacts may survive prerendering.
// Scans every prerendered HTML file for literal '**', unrendered link syntax '](',
// and list markers that leaked into paragraphs. Exits non-zero on any hit.
import fs from 'node:fs';
import path from 'node:path';

const dist = path.resolve(process.argv[2] || 'dist');
const files = [];
const walk = (dir) => { for (const e of fs.readdirSync(dir, { withFileTypes: true })) { const p = path.join(dir, e.name); if (e.isDirectory()) walk(p); else if (e.name.endsWith('.html')) files.push(p); } };
walk(dist);
const textOf = (html) => html.replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>/g, ' ');
const problems = [];
for (const f of files) {
  const t = textOf(fs.readFileSync(f, 'utf8'));
  const rel = path.relative(dist, f);
  if (t.includes('**')) problems.push(`${rel}: literal ** in rendered text`);
  if (/\]\((\/|https?:)/.test(t)) problems.push(`${rel}: unrendered markdown link ](...)`);
  if (/<p[^>]*>\s*(?:[-*]|\d+\.) \S/.test(t.replace(/<[uo]l[\s\S]*?<\/[uo]l>/g, ''))) problems.push(`${rel}: list marker leaked into a paragraph`);
}
if (problems.length) {
  console.error('Markdown artifact check FAILED:');
  for (const p of problems) console.error(' - ' + p);
  process.exit(1);
}
console.log(`Markdown artifact check passed for ${files.length} prerendered HTML files.`);
