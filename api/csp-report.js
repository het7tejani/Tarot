// CSP violation report collector. Logs reports to Vercel function logs; no PII stored.
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).end();
  }
  const origin = req.headers.origin;
  if (origin && origin !== 'https://thepsychicstudio.com' && origin !== 'https://www.thepsychicstudio.com') {
    return res.status(403).json({ error: 'Forbidden' });
  }
  try {
    const chunks = [];
    for await (const chunk of req) chunks.push(chunk);
    const raw = Buffer.concat(chunks).toString('utf8').slice(0, 8000);
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
    return res.status(204).end();
  } catch (e) {
    console.error('[csp-report] error', e.message);
    return res.status(204).end();
  }
}
