// Step 2 of GitHub login for the /cms/ blog editor: swap the code for a token and hand it to the editor window.
// Port of api/callback.js for Pages Functions.
const page = (status, payload) => `<!doctype html><html><body><script>
(function () {
  function receive(e) {
    window.opener.postMessage('authorization:github:${status}:' + ${JSON.stringify(JSON.stringify(payload))}, e.origin);
    window.removeEventListener('message', receive, false);
  }
  window.addEventListener('message', receive, false);
  window.opener.postMessage('authorizing:github', '*');
})();
</script></body></html>`;

export async function onRequestGet(context) {
  const { request, env } = context;
  const id = env.OAUTH_GITHUB_CLIENT_ID;
  const secret = env.OAUTH_GITHUB_CLIENT_SECRET;
  const send = (code, html) => new Response(html, { status: code, headers: { 'Content-Type': 'text/html; charset=utf-8' } });
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
    if (data.error || !data.access_token) return send(401, page('error', { message: data.error_description || data.error || 'No token' }));
    return send(200, page('success', { token: data.access_token, provider: 'github' }));
  } catch (e) {
    return send(500, page('error', { message: 'Token request failed' }));
  }
}
