// Personalised tarot reflection via Gemini free tier. Port of api/reflect.ts for Pages Functions.
// The API key lives only in the GEMINI_API_KEY secret (set in the Pages project, never in the repo).
const RATE_WINDOW_MS = 60000;
const RATE_MAX = 10;
const hits = new Map();

export async function onRequestPost(context) {
  const { request, env } = context;
  const key = env.GEMINI_API_KEY;
  if (!key) return new Response(JSON.stringify({ error: 'not_configured' }), { status: 503, headers: { 'Content-Type': 'application/json' } });

  const ip = request.headers.get('cf-connecting-ip') || request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'anon';
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter((t) => now - t < RATE_WINDOW_MS);
  if (recent.length >= RATE_MAX) return new Response(JSON.stringify({ error: 'rate_limited' }), { status: 429, headers: { 'Content-Type': 'application/json' } });
  recent.push(now);
  hits.set(ip, recent);

  let body;
  try { body = await request.json(); } catch { return new Response(JSON.stringify({ error: 'bad_request' }), { status: 400, headers: { 'Content-Type': 'application/json' } }); }

  const question = String(body.question || '').slice(0, 500).trim();
  const card = String(body.card || '').slice(0, 80).trim();
  const keywords = String(body.keywords || '').slice(0, 200).trim();
  const orientation = body.orientation === 'reversed' ? 'reversed' : body.orientation === 'mixed' ? 'mixed' : 'upright';
  if (!question || !card) return new Response(JSON.stringify({ error: 'bad_request' }), { status: 400, headers: { 'Content-Type': 'application/json' } });

  const prompt = [
    'You write short, warm tarot reflections for a small studio website.',
    'A visitor drew a card and shared what is on their mind. Write a personalised reflection of 60 to 90 words.',
    'Rules: speak directly to their situation; use plain, gentle language; frame everything as reflection, never prediction or certainty;',
    "never claim to know their future, other people's feelings, or outcomes; no medical, legal or financial advice;",
    'no dashes of any kind except hyphens inside words; no lists; one short paragraph; end with one gentle question they can sit with.',
    `Card: ${card}${orientation === 'mixed' ? '' : ' (' + orientation + ')'}. Themes: ${keywords}.`,
    `What they wrote: "${question}"`,
  ].join(' ');

  const gm = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash-lite:generateContent?key=${key}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: { maxOutputTokens: 1000, temperature: 0.7 },
      safetySettings: [
        { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
        { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
        { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
      ],
    }),
  });
  if (!gm.ok) return new Response(JSON.stringify({ error: 'upstream' }), { status: 502, headers: { 'Content-Type': 'application/json' } });
  const data = await gm.json();
  const parts = data?.candidates?.[0]?.content?.parts || [];
  const text = parts.filter((pt) => !pt.thought && typeof pt.text === 'string').map((pt) => pt.text).join(' ').trim();
  if (!text) return new Response(JSON.stringify({ error: 'empty' }), { status: 502, headers: { 'Content-Type': 'application/json' } });
  return new Response(JSON.stringify({ reflection: text }), { status: 200, headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' } });
}

export async function onRequest(context) {
  if (context.request.method === 'POST') return onRequestPost(context);
  return new Response('Method not allowed', { status: 405 });
}
