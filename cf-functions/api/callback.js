// Step 2 of GitHub login for the /cms/ blog editor: swap the code for a token and hand it to the editor window.
// Port of api/callback.js for Pages Functions.
const scriptValue = value => JSON.stringify(value).replace(/</g, '\\u003c').replace(/>/g, '\\u003e').replace(/&/g, '\\u0026');
const page = (status, payload, origin) => `<!doctype html><html><body><script>
(function () {
  const trustedOrigin = ${scriptValue(origin)};
  const opener = window.opener;
  if (!opener) return;
  function receive(e) {
    if (e.source !== opener || e.origin !== trustedOrigin) return;
    opener.postMessage('authorization:github:${status}:' + ${scriptValue(JSON.stringify(payload))}, trustedOrigin);
    window.removeEventListener('message', receive, false);
  }
  window.addEventListener('message', receive, false);
  opener.postMessage('authorizing:github', trustedOrigin);
})();
</script></body></html>`;

export async function onRequestGet(context) {
  const { request, env } = context;
  const origin = env.CMS_ORIGIN || 'https://thepsychicstudio.com';
  if (origin !== new URL(request.url).origin) return new Response('Login origin not allowed.', {status: 403});
  const id = env.OAUTH_GITHUB_CLIENT_ID;
  const secret = env.OAUTH_GITHUB_CLIENT_SECRET;
  const send = (code, html) => new Response(html, { status: code, headers: { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control':'no-store', 'Referrer-Policy':'no-referrer', 'X-Content-Type-Options':'nosniff', 'Set-Cookie':'oauth_state=; HttpOnly; Secure; Path=/; Max-Age=0; SameSite=Lax' } });
  if (!id || !secret) return send(500, 'Blog login is not set up yet: client id/secret missing.');
  const url = new URL(request.url);
  const code = url.searchParams.get('code');
  const state = url.searchParams.get('state');
  const cookie = (request.headers.get('cookie') || '').split(';').map((c) => c.trim()).find((c) => c.startsWith('oauth_state='));
  if (!code || !state || !cookie || cookie.split('=')[1] !== state) return send(400, 'Login check failed. Close this window and try again.');
  try {
    const r = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json', 'User-Agent': 'psychic-studio-cms' },
      body: JSON.stringify({ client_id: id, client_secret: secret, code }),
    });
    const data = await r.json();
    if (data.error || !data.access_token) return send(401, page('error', { message: data.error_description || data.error || 'No token' }, origin));
    return send(200, page('success', { token: data.access_token, provider: 'github' }, origin));
  } catch (e) {
    return send(500, page('error', { message: 'Token request failed' }, origin));
  }
}
