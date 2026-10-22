import crypto from 'node:crypto';

// Step 1 of GitHub login for the /cms/ blog editor.
const RATE_WINDOW_MS = 60000;
const RATE_MAX = 10;
const hits = new Map();
function rateLimited(req) {
  const ip = (req.headers['x-forwarded-for'] || '').split(',')[0].trim() || 'anon';
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter((t) => now - t < RATE_WINDOW_MS);
  if (recent.length >= RATE_MAX) return true;
  recent.push(now);
  hits.set(ip, recent);
  return false;
}

export default function handler(req, res) {
  if (rateLimited(req)) {
    res.statusCode = 429;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Too many attempts. Wait a minute and try again.');
    return;
  }
  const id = process.env.OAUTH_GITHUB_CLIENT_ID;
  if (!id) {
    res.statusCode = 500;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Blog login is not set up yet: OAUTH_GITHUB_CLIENT_ID is missing in Vercel.');
    return;
  }
  const state = crypto.randomBytes(16).toString('hex');
  res.setHeader('Set-Cookie', `oauth_state=${state}; HttpOnly; Secure; Path=/; Max-Age=600; SameSite=Lax`);
  const url = `https://github.com/login/oauth/authorize?client_id=${encodeURIComponent(id)}&scope=repo,user&state=${state}`;
  res.statusCode = 302;
  res.setHeader('Location', url);
  res.end();
}
