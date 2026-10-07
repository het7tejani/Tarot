import React, { useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ExternalLink } from 'lucide-react';
import { SEOHead } from '../components/SEOHead';
import { ALL_SEO_PAGES, CARD_PAGES, SIGN_INFO, SeoPageDef } from '../data/seoPages';

import { FREE_TAROT_CARDS } from '../data/readingsData';

const inkSigns = [
'M0 20 Q1 -5 -9 -17 Q-22 -27 -25 -10 Q-23 3 -12 -4 M0 20 Q-1 -5 9 -17 Q23 -27 25 -10 Q23 3 12 -4',
'M-23 -23 Q-19 -7 0 -7 Q19 -7 23 -23 M0 -7 C-23 -7 -23 24 0 24 C23 24 23 -7 0 -7Z',
'M-23 -22 Q0 -15 23 -22 M-23 22 Q0 15 23 22 M-12 -18 L-12 18 M12 -18 L12 18',
'M-26 -10 C-11 -27 24 -25 23 -10 C22 3 7 2 8 -9 C9 -20 20 -18 23 -10 M26 10 C11 27 -24 25 -23 10 C-22 -3 -7 -2 -8 9 C-9 20 -20 18 -23 10',
'M-13 15 C-26 14 -26 -3 -14 -4 C-5 -5 1 5 -7 11 M-7 11 C6 -3 -7 -17 2 -25 C15 -35 25 -17 17 -5 C8 8 3 22 16 23 Q25 24 26 14',
'M-26 20 L-26 -20 Q-18 -26 -12 -15 L-12 20 M-12 -15 Q-4 -28 3 -15 L3 20 M3 -15 Q12 -28 17 -13 L17 11 Q14 26 7 28 M9 3 Q30 -8 28 9 Q26 18 13 23',
'M-26 20 L26 20 M-25 6 L-12 6 C-26 -22 27 -22 12 6 L26 6',
'M-26 20 L-26 -20 Q-18 -26 -12 -15 L-12 20 M-12 -15 Q-4 -28 3 -15 L3 20 M3 -15 Q12 -28 17 -13 L17 12 Q17 22 29 19 M24 13 L31 19 L25 26',
'M-23 24 L24 -24 M5 -23 L24 -24 L23 -5 M-21 -3 L3 21',
'M-28 -17 Q-17 -30 -13 -7 L-10 20 M-10 -13 Q5 -31 8 -11 Q8 3 -5 18 M-5 18 C6 2 25 -8 28 7 C32 25 5 26 5 13 Q5 5 15 2',
'M-28 -9 L-18 -18 L-7 -7 L4 -18 L15 -7 L27 -18 M-28 15 L-18 6 L-7 17 L4 6 L15 17 L27 6',
'M-19 -25 Q0 0 -19 25 M19 -25 Q0 0 19 25 M-26 0 L26 0'
];
const ZodiacArc: React.FC = () => <div className="st-hand-arc" aria-hidden="true"><svg viewBox="0 0 1000 1000" fill="none">
  <g className="st-hand-ring">
    <circle cx="500" cy="500" r="422" stroke="#8b9b68" strokeWidth="1.4" />
    <path d="M502 76C735 78 925 263 926 501C927 733 737 925 499 924C264 925 75 735 76 499C76 265 263 74 502 76Z" stroke="#8b9b68" strokeWidth=".7" opacity=".45" />
    <circle cx="500" cy="500" r="334" stroke="#a9b68c" strokeWidth="1" strokeDasharray="2 9" />
    {inkSigns.map((ink, i) => { const a=(i*30)*Math.PI/180, x=500+378*Math.cos(a),y=500+378*Math.sin(a);return <g key={i} transform={`translate(${x} ${y})`}>
      <path d={ink} stroke="#667b48" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M-10 52 Q0 55 10 52" stroke="#b69d64" strokeWidth=".9" />
    </g>})}
    {Array.from({length:12},(_,i)=>{const a=(i*30+15)*Math.PI/180;return <path key={i} d={`M${500+338*Math.cos(a)} ${500+338*Math.sin(a)} Q${500+378*Math.cos(a)+2} ${500+378*Math.sin(a)-2} ${500+418*Math.cos(a)} ${500+418*Math.sin(a)}`} stroke="#aab790" strokeWidth=".8"/>})}
  </g>
</svg></div>;

const GLYPHS = ['♈','♉','♊','♋','♌','♍','♎','♏','♐','♑','♒','♓'];
const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
const norm = (s: string) => s.toLowerCase().replace(/^the\s+/, '').replace(/[^a-z]/g, '');
const byPath: Record<string, SeoPageDef> = Object.fromEntries(ALL_SEO_PAGES.map((p) => [p.path, p]));

const dayKey = () => {
  const d = new Date();
  return d.getFullYear() * 10000 + (d.getMonth() + 1) * 100 + d.getDate();
};

const DailyCard: React.FC<{ signIndex: number; label: string }> = ({ signIndex, label }) => {
  const card = useMemo(() => {
    const seed = (dayKey() * 31 + (signIndex + 1) * 97) % FREE_TAROT_CARDS.length;
    return FREE_TAROT_CARDS[seed];
  }, [signIndex]);
  return (
    <section className="st-daily-card rounded-2xl border border-[#1f2322]/10 bg-white/50 p-6 grid sm:grid-cols-[120px_1fr] gap-6 items-start">
      <img src={card.image} alt={`${card.name} tarot card`} className="w-28 rounded-lg shadow-md" loading="lazy" />
      <div>
        <h2 className="text-xl font-semibold mb-1">{label}: {card.name}</h2>
        <p className="text-xs uppercase tracking-widest text-[#73a89a] font-semibold mb-3">{card.keywords}</p>
        <p className="text-sm leading-relaxed text-[#1f2322]/75 mb-2">{card.upright}</p>
        <p className="text-sm leading-relaxed text-[#1f2322]/75"><strong>Reflect:</strong> {card.advice}</p>
        <p className="text-xs text-[#1f2322]/50 mt-3">The card changes each day. It is a prompt for reflection, not a prediction.</p>
      </div>
    </section>
  );
};

const H2: React.FC<{ children: React.ReactNode }> = ({ children }) => <h2 className="text-2xl font-semibold mt-10 mb-3">{children}</h2>;
const P: React.FC<{ children: React.ReactNode }> = ({ children }) => <p className="text-base leading-relaxed text-[#1f2322]/75 mb-4">{children}</p>;

const EXTRA_LABELS: Record<string, string> = { '/free-tarot': 'Free tarot reading online', '/readings': 'Personal readings (shop)', '/shop': 'Personal readings (shop)' };
const LinkGrid: React.FC<{ paths: string[] }> = ({ paths }) => (
  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 my-4">
    {paths.map((p) => {
      const t = byPath[p];
      return (
        <Link key={p} to={p === '/readings' ? '/shop' : p} className="rounded-xl border border-[#1f2322]/10 bg-white/40 px-4 py-3 text-sm font-semibold hover:border-[#73a89a]">
          {t ? t.h1 : (EXTRA_LABELS[p] || p)}
        </Link>
      );
    })}
  </div>
);

const ReadingCTA: React.FC<{ etsyBaseUrl: string }> = ({ etsyBaseUrl }) => (
  <section className="mt-12 rounded-2xl border border-[#1f2322]/10 bg-[#f0ebe4] p-7">
    <h2 className="text-xl font-semibold mb-2">Want a personal reading?</h2>
    <p className="text-sm text-[#1f2322]/70 mb-5">Browse our readings. Each one opens its Etsy listing, where you check the price, delivery and what is included before you order.</p>
    <div className="flex flex-wrap gap-3">
      <Link to="/readings" className="px-6 py-3 rounded-full bg-[#1f2322] text-white text-sm font-semibold hover:bg-[#73a89a]">See readings</Link>
      <a href={etsyBaseUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-[#1f2322]/20 text-sm font-semibold hover:bg-[#1f2322]/5">Open Etsy shop <ExternalLink className="w-4 h-4" /></a>
      <Link to="/free-tarot" className="px-6 py-3 rounded-full border border-[#1f2322]/20 text-sm font-semibold hover:bg-[#1f2322]/5">Free tarot draw</Link>
    </div>
    <p className="text-xs text-[#1f2322]/50 mt-4">For entertainment and personal reflection. Readings cannot guarantee outcomes or replace medical, legal, financial or mental health advice.</p>
  </section>
);

const compatBlurb = (a: string, b: string) => {
  const A = SIGN_INFO.find((s) => s.n === a)!;
  const B = SIGN_INFO.find((s) => s.n === b)!;
  return { A, B };
};

export const SeoPage: React.FC<{ etsyBaseUrl: string }> = ({ etsyBaseUrl }) => {
  const { pathname } = useLocation();
  const page = byPath[pathname.replace(/\/$/, '') || '/'];
  if (!page) return null;
  const sign = page.sign ? SIGN_INFO.find((s) => s.n === page.sign) : undefined;
  const signIndex = sign ? SIGN_INFO.indexOf(sign) : 0;
  const related = (page.kind === 'hub-tarot' ? CARD_PAGES.map((c) => c.path) : page.links) || [];
  const N = sign ? cap(sign.n) : '';

  const isHoroscope = page.path === '/horoscope' || page.kind === 'horoscope';
  const card = page.card;
  const major = card?.arcana === 'Major Arcana' ? FREE_TAROT_CARDS.find((c) => norm(c.name) === norm(card.name)) : undefined;

  return (
    <div className={`pt-32 pb-24 bg-[#FAF8F5] min-h-screen text-[#1f2322] ${isHoroscope ? "st-astro-page" : "st-editorial"}`}>
      <SEOHead title={`${page.title} | The Psychic Studio`} description={page.meta} canonicalUrl={`${typeof window !== 'undefined' ? window.location.origin : ''}${page.path}`} />
      <div className={`mx-auto px-4 sm:px-6 lg:px-8 ${isHoroscope ? "st-astro-wrap" : "max-w-4xl"}`}>
        <nav className="text-xs text-[#1f2322]/50 mb-5" aria-label="Breadcrumb"><Link to="/" className="hover:text-[#73a89a]">Home</Link> / <span>{page.h1}</span></nav>
        <div className={isHoroscope ? "st-astro-hero" : "st-editorial-heading"}>
          <div>
            <p className="eyebrow">{isHoroscope ? 'A little perspective from the stars' : 'The Psychic Studio'}</p>
            <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight mb-5">{page.h1}</h1>
            {page.intro && <p className="text-lg leading-relaxed text-[#1f2322]/70 mb-8">{page.intro}</p>}
            {sign && <div className="st-sign-meta"><span>{sign.dates}</span><span>{sign.el}</span><span>{sign.ruler}</span></div>}
            {page.path === '/horoscope' && <a className="btn ghost" href="#your-sign">Find your sign ↓</a>}
          </div>
          {isHoroscope && (sign ? <div className="st-sign-orbit" aria-hidden="true"><span className="st-orbit-star">✦</span><b>{GLYPHS[signIndex]}{'\uFE0E'}</b><span className="st-orbit-label">{N} · {sign.el}</span></div> : <div className="st-wheel-slice st-hand-slice"><ZodiacArc /></div>)}
        </div>
        {page.path === '/horoscope' && <section id="your-sign" className="st-sign-selection">
          <span className="eyebrow">Twelve signs. Your own perspective.</span><h2>Choose your sign</h2>
          <div className="st-zodiac-gallery">{SIGN_INFO.map((s, i) => <Link key={s.n} to={`/horoscope/${s.n}`} className="st-zodiac-tile"><span className="st-zodiac-glyph" aria-hidden="true">{GLYPHS[i]}{'\uFE0E'}</span><span className="st-zodiac-name">{cap(s.n)}</span><span className="st-zodiac-dates">{s.dates}</span><span className="st-zodiac-element">{s.el} <span aria-hidden="true">↗</span></span></Link>)}</div>
        </section>}

        {page.kind === 'horoscope' && sign && (
          <>
            <DailyCard signIndex={signIndex} label={`Today's guidance card for ${N}`} />
            <H2>{N} today: what to reflect on</H2>
            <P>{N} is {sign.traits}. Use today's card as a lens: ask where those traits are helping you and where they may be getting in the way.</P>
            <H2>{N} in love</H2>
            <P>{sign.love}</P>
            <H2>{N} at work</H2>
            <P>{sign.work}</P>
            <H2>Read other signs</H2>
            <LinkGrid paths={SIGN_INFO.map((s) => `/horoscope/${s.n}`)} />
          </>
        )}

        {page.kind === 'love' && (
          <>
            <DailyCard signIndex={0} label="Today's love guidance card" />
            <H2>How each sign loves</H2>
            {SIGN_INFO.map((s) => (
              <div key={s.n} className="mb-5">
                <h3 className="text-lg font-semibold"><Link to={`/horoscope/${s.n}`} className="hover:text-[#73a89a]">{cap(s.n)} love horoscope</Link></h3>
                <p className="text-base text-[#1f2322]/75 leading-relaxed">{s.love}</p>
              </div>
            ))}
          </>
        )}

        {page.kind === 'zodiac' && sign && (
          <>
            <ul className="grid sm:grid-cols-2 gap-3 mb-6 text-sm">
              <li className="rounded-xl border border-[#1f2322]/10 bg-white/40 px-4 py-3"><strong>Dates:</strong> {sign.dates}</li>
              <li className="rounded-xl border border-[#1f2322]/10 bg-white/40 px-4 py-3"><strong>Element:</strong> {sign.el}</li>
              <li className="rounded-xl border border-[#1f2322]/10 bg-white/40 px-4 py-3"><strong>Quality:</strong> {sign.mod}</li>
              <li className="rounded-xl border border-[#1f2322]/10 bg-white/40 px-4 py-3"><strong>Ruling planet:</strong> {sign.ruler}</li>
            </ul>
            <H2>{N} traits</H2>
            <P>{N} is {sign.traits}.</P>
            <H2>{N} in love</H2>
            <P>{sign.love}</P>
            <H2>{N} career strengths</H2>
            <P>{sign.work}</P>
            <P>Your sun sign is only one part of your chart. For the full picture, see the <Link to="/birth-chart" className="text-[#73a89a] font-semibold">birth chart guide</Link>.</P>
          </>
        )}

        {page.kind === 'compat' && page.a && page.b && (() => {
          const { A, B } = compatBlurb(page.a, page.b);
          return (
            <>
              <H2>{cap(A.n)}: {A.traits}</H2>
              <P>{A.love}</P>
              <H2>{cap(B.n)}: {B.traits}</H2>
              <P>{B.love}</P>
              <H2>Making it work</H2>
              <P>{cap(A.n)} is {A.mod.toLowerCase()} and {B.n.charAt(0).toUpperCase() + B.n.slice(1)} is {B.mod.toLowerCase()}, so talk openly about pace, decisions and who leads. Ask what each of you needs to feel safe and appreciated, and say it plainly.</P>
              <P>Sun signs describe only part of a match. Compare full birth charts for a fuller view.</P>
            </>
          );
        })()}

        {page.kind === 'angel' && (
          <>
            <H2>What {page.num} may be telling you</H2>
            <P>{page.body}</P>
            <H2>In love</H2>
            <P>Treat {page.num} as a pause to check in with yourself and your partner: what do I want, and what am I avoiding saying?</P>
            <H2>At work</H2>
            <P>Use it as a prompt to review your goals. Pick one small action that matches what you want and do it today.</P>
            <H2>Questions to reflect on</H2>
            <P>What was I thinking when I saw {page.num}? What decision is waiting? What would I do if I trusted myself?</P>
            <p className="text-xs text-[#1f2322]/50">Angel numbers are a spiritual belief, not a scientific fact. Use them as a reflection tool.</p>
          </>
        )}

        {page.kind === 'article' && (
          <>
            <H2>The short version</H2>
            <P>{page.body}</P>
            <H2>How to use this</H2>
            <P>Write down what stands out, then draw a free card to explore it. If you want to go deeper with a person, choose a personal reading.</P>
          </>
        )}

        {page.kind === 'hub-tarot' && (
          <>
            <H2>Major Arcana (22 cards)</H2>
            <LinkGrid paths={CARD_PAGES.filter((c) => c.card?.arcana === 'Major Arcana').map((c) => c.path)} />
            {['Wands', 'Cups', 'Swords', 'Pentacles'].map((s) => (
              <div key={s}>
                <H2>Suit of {s} (14 cards)</H2>
                <LinkGrid paths={CARD_PAGES.filter((c) => c.card?.suit === s).map((c) => c.path)} />
              </div>
            ))}
          </>
        )}

        {page.kind === 'card' && card && (
          <>
            <div className="grid sm:grid-cols-[160px_1fr] gap-6 items-start mb-6">
              <img src={card.img} alt={`${card.name} tarot card`} className="w-40 rounded-lg shadow-md" loading="lazy" />
              <div>
                <p className="text-xs uppercase tracking-widest text-[#73a89a] font-semibold mb-2">{card.arcana}{card.suit ? ` - ${card.suit}` : ''}</p>
                {major ? <P>{major.keywords}</P> : <P>{card.name} speaks to {card.dom}. As a {card.num}, it stands for {card.up}.</P>}
              </div>
            </div>
            <H2>{card.name} upright</H2>
            <P>{major ? major.upright : `Upright, the ${card.name} points to ${card.up}, in the area of ${card.dom}.`}</P>
            <H2>{card.name} reversed</H2>
            <P>{major?.reversed ? major.reversed : card.rev ? `Reversed, the ${card.name} can point to ${card.rev}.` : 'Reversed, look at where this energy is blocked or overdone.'}</P>
            <H2>{card.name} in love</H2>
            <P>{card.suit === 'Cups' ? `As a Cups card, the ${card.name} puts feelings and connection in front. Ask what you truly feel and what you need to hear.` : `In a love question, ask how the themes of the ${card.name} show up in how you and your partner talk, trust and commit.`}</P>
            <H2>{card.name} in career</H2>
            <P>{card.suit === 'Pentacles' ? `As a Pentacles card, the ${card.name} speaks directly to work, money and effort. Look at what is practical and sustainable.` : `At work, ask where the ${card.name} shows up in your goals, your team and your habits.`}</P>
            {major && (<><H2>Advice</H2><P>{major.advice}</P></>)}
          </>
        )}

        {related.length > 0 && page.kind !== 'hub-tarot' && page.path !== '/horoscope' && (
          <>
            <H2>Keep exploring</H2>
            <LinkGrid paths={related.slice(0, 24)} />
          </>
        )}

        <ReadingCTA etsyBaseUrl={etsyBaseUrl} />
      </div>
    </div>
  );
};
