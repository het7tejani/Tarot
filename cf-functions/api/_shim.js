// Shared helpers for the Cloudflare Pages Functions port of the /api/* CMS endpoints.
// The Pages project runs with the nodejs_compat compatibility flag, so node:crypto works.
import crypto from 'node:crypto';

const RATE_WINDOW_MS = 60000;
const RATE_MAX = 10;
const hits = new Map();

export function rateLimited(request) {
  const ip = (request.headers.get('cf-connecting-ip') || request.headers.get('x-forwarded-for') || '').split(',')[0].trim() || 'anon';
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter((t) => now - t < RATE_WINDOW_MS);
  if (recent.length >= RATE_MAX) return true;
  recent.push(now);
  hits.set(ip, recent);
  return false;
}

export function json(status, value, headers = {}) {
  return new Response(JSON.stringify(value), {
    status,
    headers: { 'Content-Type': 'application/json', ...headers },
  });
}

export const cookieName = 'studio_admin';

export const secureEquals = (a, b) => {
  const x = Buffer.from(a), y = Buffer.from(b);
  return x.length === y.length && crypto.timingSafeEqual(x, y);
};

export function sessionToken(secret) {
  const payload = Buffer.from(JSON.stringify({ exp: Date.now() + 8 * 60 * 60 * 1000 })).toString('base64url');
  return payload + '.' + crypto.createHmac('sha256', secret).update(payload).digest('base64url');
}

export function validSession(request, secret) {
  const token = (request.headers.get('cookie') || '').split(';').map((c) => c.trim()).find((c) => c.startsWith(cookieName + '='))?.slice(cookieName.length + 1);
  if (!token) return false;
  const [payload, signature] = token.split('.');
  if (!payload || !signature || !secureEquals(signature, crypto.createHmac('sha256', secret).update(payload).digest('base64url'))) return false;
  try { return JSON.parse(Buffer.from(payload, 'base64url').toString()).exp > Date.now(); } catch { return false; }
}

// Decode a markdown post from raw text. sha is the git blob oid used for optimistic concurrency.
export function decodePostRaw(rawText, name, sha) {
  const raw = rawText.replace(/\r\n/g, '\n');
  const m = raw.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  const field = (k) => {
    const v = m?.[1].match(new RegExp('^' + k + ':\\s*(.*?)\\s*$', 'm'))?.[1] || '';
    if (v.startsWith('"')) { try { return JSON.parse(v); } catch {} }
    return v.replace(/^'|'$/g, '');
  };
  return {
    slug: name.replace(/\.md$/, ''),
    title: field('title'),
    category: field('category'),
    date: field('date'),
    excerpt: field('excerpt'),
    metaTitle: field('metaTitle'),
    coverImage: field('coverImage'),
    content: m?.[2].trim() || raw,
    published: field('published') !== 'false',
    sha,
  };
}
