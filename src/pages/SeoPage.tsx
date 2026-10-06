import React, { useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ExternalLink } from 'lucide-react';
import { SEOHead } from '../components/SEOHead';
import { ALL_SEO_PAGES, CARD_PAGES, SIGN_INFO, SeoPageDef } from '../data/seoPages';
import { FREE_TAROT_CARDS } from '../data/readingsData';

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
    <section className="rounded-2xl border border-[#1f2322]/10 bg-white/50 p-6 grid sm:grid-cols-[120px_1fr] gap-6 items-start">
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

  const card = page.card;
  const major = card?.arcana === 'Major Arcana' ? FREE_TAROT_CARDS.find((c) => norm(c.name) === norm(card.name)) : undefined;

  return (
    <div className="pt-32 pb-24 bg-[#FAF8F5] min-h-screen text-[#1f2322]">
      <SEOHead title={`${page.title} | The Psychic Studio`} description={page.meta} canonicalUrl={`${typeof window !== 'undefined' ? window.location.origin : ''}${page.path}`} />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="text-xs text-[#1f2322]/50 mb-5" aria-label="Breadcrumb"><Link to="/" className="hover:text-[#73a89a]">Home</Link> / <span>{page.h1}</span></nav>
        <p className="text-xs uppercase tracking-widest font-semibold text-[#73a89a] mb-3">The Psychic Studio</p>
        <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight mb-5">{page.h1}</h1>
        {page.intro && <p className="text-lg leading-relaxed text-[#1f2322]/70 mb-8">{page.intro}</p>}

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

        {related.length > 0 && page.kind !== 'hub-tarot' && (
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
