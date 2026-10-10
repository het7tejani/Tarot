import { BlogPost } from '../types';

// Blog posts written in the /cms/ editor are saved as markdown files in content/blog/.
const files = import.meta.glob('../../content/blog/*.md', { query: '?raw', import: 'default', eager: true }) as Record<string, string>;

const unquote = (v: string): string => {
  const t = v.trim();
  if ((t.startsWith('"') && t.endsWith('"')) || (t.startsWith("'") && t.endsWith("'"))) {
    return t.slice(1, -1).replace(/\\"/g, '"').replace(/\\n/g, '\n').replace(/''/g, "'");
  }
  return t;
};

const parse = (raw: string): { data: Record<string, string | string[]>; body: string } => {
  const m = raw.replace(/\r\n/g, '\n').match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!m) return { data: {}, body: raw };
  const data: Record<string, string | string[]> = {};
  let listKey: string | null = null;
  for (const line of m[1].split('\n')) {
    const item = line.match(/^\s*-\s+(.*)$/);
    if (item && listKey) {
      (data[listKey] as string[]).push(unquote(item[1]));
      continue;
    }
    const kv = line.match(/^([A-Za-z_][\w-]*):\s*(.*)$/);
    if (!kv) continue;
    if (kv[2] === '' || kv[2] === '[]') {
      data[kv[1]] = [];
      listKey = kv[1];
    } else {
      data[kv[1]] = unquote(kv[2]);
      listKey = null;
    }
  }
  return { data, body: m[2].trim() };
};

const fmtDate = (s: string): string => {
  const d = new Date(s);
  return isNaN(d.getTime()) ? s : d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
};

export const REPO_BLOG_POSTS: BlogPost[] = Object.entries(files)
  .map(([path, raw]) => {
    const { data, body } = parse(raw);
    const slug = path.split('/').pop()!.replace(/\.md$/, '');
    const str = (k: string) => (typeof data[k] === 'string' ? (data[k] as string) : '');
    const arr = (k: string) => (Array.isArray(data[k]) ? (data[k] as string[]) : []);
    const words = body.split(/\s+/).filter(Boolean).length;
    return {
      id: `repo-${slug}`,
      slug,
      title: str('title') || slug,
      metaTitle: str('metaTitle'),
      category: str('category') || 'Blog',
      date: fmtDate(str('date')),
      readTime: `${Math.max(1, Math.round(words / 200))} min read`,
      excerpt: str('excerpt'),
      content: body,
      coverImage: str('coverImage') || '/tarot/the_star.jpg',
      featured: str('featured') === 'true',
      published: str('published') !== 'false',
      views: 0,
      author: { name: 'The Psychic Studio', role: 'The studio' },
      tags: arr('tags'),
      keyTakeaways: arr('keyTakeaways'),
      _ts: new Date(str('date')).getTime() || 0,
    } as BlogPost & { _ts: number };
  })
  .sort((a, b) => ((b as any)._ts || 0) - ((a as any)._ts || 0));
