import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getBlogPosts, getReadings } from '../services/cmsStorage';

type Item = { title: string; sub: string; to: string; kind: string };

const PAGES: Item[] = [
  { title: 'Shop personal readings', sub: 'Love, career, money and more', to: '/shop', kind: 'Page' },
  { title: 'Free tarot draw', sub: 'Draw your three cards', to: '/free-tarot', kind: 'Page' },
  { title: 'Daily horoscope', sub: 'All twelve signs, every day', to: '/horoscope', kind: 'Page' },
  { title: 'Love horoscope', sub: 'Daily love reading by sign', to: '/love-horoscope', kind: 'Page' },
  { title: 'Zodiac signs', sub: 'Dates, traits and compatibility', to: '/zodiac', kind: 'Page' },
  { title: 'Zodiac compatibility', sub: 'Check two signs together', to: '/zodiac-compatibility', kind: 'Page' },
  { title: 'Tarot card meanings', sub: 'All 78 cards explained', to: '/tarot-card-meanings', kind: 'Page' },
  { title: 'Angel numbers', sub: 'What repeating numbers mean', to: '/angel-numbers', kind: 'Page' },
  { title: 'Journal', sub: 'Tarot and astrology articles', to: '/blog', kind: 'Page' },
  { title: 'About the studio', sub: 'Who reads for you', to: '/about', kind: 'Page' },
  { title: 'FAQ', sub: 'Common questions', to: '/faq', kind: 'Page' },
  { title: 'Contact', sub: 'Ask a question', to: '/contact', kind: 'Page' },
];

export const SiteSearch: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState('');
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);

  const items = useMemo<Item[]>(() => {
    const posts = getBlogPosts()
      .filter((p) => p.published !== false)
      .map((p) => ({ title: p.title, sub: p.category || 'Journal', to: `/blog/${p.slug}`, kind: 'Journal' }));
    let readings: Item[] = [];
    try {
      readings = getReadings().map((r) => ({ title: r.title, sub: r.tagline || r.price || 'Reading', to: `/readings/${r.slug}`, kind: 'Reading' }));
    } catch { readings = []; }
    return [...PAGES, ...readings, ...posts];
  }, []);

  const results = useMemo(() => {
    const needle = q.trim().toLowerCase();
    if (needle.length < 2) return [];
    return items.filter((i) => (i.title + ' ' + i.sub).toLowerCase().includes(needle)).slice(0, 8);
  }, [q, items]);

  useEffect(() => {
    if (!open) return;
    const t = window.setTimeout(() => inputRef.current?.focus(), 40);
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('keydown', onKey);
    return () => { window.clearTimeout(t); document.removeEventListener('keydown', onKey); };
  }, [open]);

  const close = () => { setOpen(false); setQ(''); };

  return (
    <div className="st-search">
      <button type="button" className="st-search-btn" aria-label="Search the site" aria-expanded={open} onClick={() => setOpen((o) => !o)}>
        <svg aria-hidden="true" width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><circle cx="11" cy="11" r="7" /><line x1="16.5" y1="16.5" x2="21" y2="21" /></svg>
      </button>
      <div className={`st-drawer-scrim${open ? ' show' : ''}`} onClick={close} aria-hidden="true" />
      <div className={`st-search-panel${open ? ' open' : ''}`} role="dialog" aria-label="Site search" aria-hidden={!open}>
        <div className="st-drawer-head">
          <span>Search the site</span>
          <button type="button" className="st-drawer-x" aria-label="Close search" tabIndex={open ? 0 : -1} onClick={close}>&times;</button>
        </div>
        <input
            ref={inputRef}
          tabIndex={open ? 0 : -1}
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search readings, cards, articles"
            aria-label="Search the site"
            onKeyDown={(e) => { if (e.key === 'Enter' && results[0]) { close(); navigate(results[0].to); } }}
          />
          {q.trim().length >= 2 && (results.length ? (
            <ul>
              {results.map((r) => (
                <li key={r.to + r.title}>
                  <Link to={r.to} onClick={close}><strong>{r.title}</strong><span>{r.kind} · {r.sub}</span></Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="st-search-empty">Nothing found. Try a card name, a sign or a topic.</p>
          ))}
      </div>
    </div>
  );
};
