import {boundedBody,safeError} from '../../checkout/lib/http.mjs';
// CSP violation report collector. Port of api/csp-report.js for Pages Functions. Logs to Pages function logs; no PII stored.
export async function onRequestPost(context) {
  const { request } = context;
  const origin = request.headers.get('origin');
  if (origin && origin !== 'https://thepsychicstudio.com' && origin !== 'https://www.thepsychicstudio.com' && origin !== 'https://psychic-studio.pages.dev') {
    return new Response(JSON.stringify({ error: 'Forbidden' }), { status: 403, headers: { 'Content-Type': 'application/json' } });
  }
  try {
    const raw = await boundedBody(request,8000);
    let report;
    try { report = JSON.parse(raw); } catch { report = { unparseable: raw.slice(0, 500) }; }
    const entry = report['csp-report'] || report;
    console.log('[csp-report]', JSON.stringify({
      directive: entry['violated-directive'] || entry.effectiveDirective,
      blocked: entry['blocked-uri'],
      document: entry['document-uri'],
      source: entry['source-file'],
      line: entry['line-number'],
    }));
    return new Response(null, { status: 204 });
  } catch (e) {
    return safeError(e);
  }
}

export async function onRequest(context) {
  if (context.request.method === 'POST') return onRequestPost(context);
  return new Response(null, { status: 405, headers: { Allow: 'POST' } });
}
