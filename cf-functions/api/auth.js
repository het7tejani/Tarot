// Step 1 of GitHub login for the /cms/ blog editor. Port of api/auth.js for Pages Functions.
import crypto from 'node:crypto';
import { rateLimited } from './_shim.js';

export async function onRequest(context) {
  const { request, env } = context;
  if (rateLimited(request)) {
    return new Response('Too many attempts. Wait a minute and try again.', { status: 429, headers: { 'Content-Type': 'text/plain' } });
  }
  const id = env.OAUTH_GITHUB_CLIENT_ID;
  if (!id) {
    return new Response('Blog login is not set up yet: OAUTH_GITHUB_CLIENT_ID is missing.', { status: 500, headers: { 'Content-Type': 'text/plain' } });
  }
  const state = crypto.randomBytes(16).toString('hex');
  const url = `https://github.com/login/oauth/authorize?client_id=${encodeURIComponent(id)}&scope=repo,user&state=${state}`;
  return new Response(null, {
    status: 302,
    headers: {
      Location: url,
      'Set-Cookie': `oauth_state=${state}; HttpOnly; Secure; Path=/; Max-Age=600; SameSite=Lax`,
    },
  });
}
