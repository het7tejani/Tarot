import { SEO_PASS_SECTIONS, SEO_CONTEXT_LINKS } from '../data/seoPass17';
import { SEARCH_SNIPPETS } from '../data/searchSnippetUpdates';
import { SearchGuidance } from '../components/SearchGuidance';
import { TarotStudyGuide } from '../components/TarotStudyGuide';
import { TarotCardLibrary } from '../components/TarotCardLibrary';
import { MAJOR_PRACTICE } from '../data/cardPractice';
import journalLinks from 'virtual:journal-links';
import { CARD_LORE } from "../data/cardLore";
import { minorExtra } from "../data/minorExtra";
import { RESEARCH_SECTIONS, PRIORITY_CARD_DETAILS, CARD_REFLECTIONS } from "../data/seoResearch";
import { TarotArtwork } from '../components/TarotArtwork';
import { NumerologyCalculator } from '../components/NumerologyCalculator';
import { ZodiacSignFinder } from '../components/ZodiacSignFinder';
import { DailyCardSignup } from '../components/DailyCardSignup';
import React, { useMemo } from 'react';
import {useDailyCardDay} from '../contexts/DailyCardDate';
import { Link, useLocation } from 'react-router-dom';
import { ExternalLink } from 'lucide-react';
import { SEOHead } from '../components/SEOHead';
import { ALL_SEO_PAGES, CARD_PAGES, SIGN_INFO, SeoPageDef } from '../data/seoPages';

import { FREE_TAROT_CARDS } from '../data/readingsData';

const zodiacNames = ['Aries','Taurus','Gemini','Cancer','Leo','Virgo','Libra','Scorpio','Sagittarius','Capricorn','Aquarius','Pisces'];
const ZodiacArc: React.FC = () => <div className="st-hand-arc" aria-hidden="true"><svg className="st-figure-wheel" viewBox="0 0 1000 1000"><g transform="translate(500 500) rotate(180) translate(-500 -500)"><image width="1000" height="1000" href="/perf-assets/zodiac.webp" /></g></svg></div>;

const GLYPHS = ['♈','♉','♊','♋','♌','♍','♎','♏','♐','♑','♒','♓'];
const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
const norm = (s: string) => s.toLowerCase().replace(/^the\s+/, '').replace(/[^a-z]/g, '');
const byPath: Record<string, SeoPageDef> = Object.fromEntries(ALL_SEO_PAGES.map((p) => [p.path, p]));

const DailyCard: React.FC<{ signIndex: number; label: string }> = ({ signIndex, label }) => {
  const dayKey = useDailyCardDay();
  const card = useMemo(() => {
    const seed = (dayKey * 31 + (signIndex + 1) * 97) % FREE_TAROT_CARDS.length;
    return FREE_TAROT_CARDS[seed];
  }, [signIndex, dayKey]);
  return (
    <section className="st-daily-card rounded-2xl border border-[#1f2322]/10 bg-white/50 p-6 grid sm:grid-cols-[120px_1fr] gap-6 items-start">
      <TarotArtwork src={card.image} alt={`${card.name} tarot card illustration for upright and reversed meanings`} className="w-28 rounded-lg shadow-md" loading="lazy" />
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


const dayKeyToDate = (k: number) => new Date(Date.UTC(Math.floor(k / 10000), Math.floor((k % 10000) / 100) - 1, k % 100, 12));
const dateToKey = (d: Date) => d.getUTCFullYear() * 10000 + (d.getUTCMonth() + 1) * 100 + d.getUTCDate();
const shiftKey = (k: number, days: number) => { const d = dayKeyToDate(k); d.setUTCDate(d.getUTCDate() + days); return dateToKey(d); };
const TODAY_TABS = ['Daily', 'Yesterday', 'Tomorrow', 'Weekly', 'Monthly', 'Yearly'] as const;
type TodayTab = typeof TODAY_TABS[number];
const TAB_COPY: Record<TodayTab, string> = {
  Daily: 'Your card for today, one per sign.',
  Yesterday: 'Yesterday\u2019s cards, for looking back.',
  Tomorrow: 'Tomorrow\u2019s cards, a day ahead.',
  Weekly: 'One card per sign to carry through this week (Monday to Sunday).',
  Monthly: 'One card per sign as a theme for this month.',
  Yearly: 'One card per sign as a theme for this year.',
};
const TodayBoard: React.FC = () => {
  const dayKey = useDailyCardDay();
  const [now, setNow] = React.useState<Date | null>(null);
  const [tab, setTab] = React.useState<TodayTab>('Daily');
  React.useEffect(() => {
    setNow(new Date());
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);
  const base = dayKeyToDate(dayKey);
  const fmt = (d: Date) => new Intl.DateTimeFormat('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' }).format(d);
  const dateLabel = fmt(base);
  const timeLabel = now ? new Intl.DateTimeFormat(undefined, { hour: 'numeric', minute: '2-digit', second: '2-digit', timeZoneName: 'short' }).format(now) : '';
  const dow = (base.getUTCDay() + 6) % 7;
  const weekStart = shiftKey(dayKey, -dow);
  const y = Math.floor(dayKey / 10000), m = Math.floor((dayKey % 10000) / 100);
  const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  let key = dayKey, heading = dateLabel;
  if (tab === 'Yesterday') { key = shiftKey(dayKey, -1); heading = fmt(dayKeyToDate(key)); }
  else if (tab === 'Tomorrow') { key = shiftKey(dayKey, 1); heading = fmt(dayKeyToDate(key)); }
  else if (tab === 'Weekly') { key = weekStart * 7 + 3; const e = shiftKey(weekStart, 6); heading = `Week of ${new Intl.DateTimeFormat('en-US', { month: 'long', day: 'numeric', timeZone: 'UTC' }).format(dayKeyToDate(weekStart))} to ${new Intl.DateTimeFormat('en-US', { month: 'long', day: 'numeric', timeZone: 'UTC' }).format(dayKeyToDate(e))}`; }
  else if (tab === 'Monthly') { key = (y * 100 + m) * 13 + 5; heading = `${MONTHS[m - 1]} ${y}`; }
  else if (tab === 'Yearly') { key = y * 17 + 11; heading = String(y); }
  return (
    <section id="today" className="st-today">
      <div className="st-today-tabs" role="tablist" aria-label="Horoscope period">
        {TODAY_TABS.map((t) => <button key={t} type="button" role="tab" aria-selected={tab === t} className={tab === t ? 'on' : ''} onClick={() => setTab(t)}>{t}</button>)}
      </div>
      <div className="st-today-head">
        <div>
          <span className="eyebrow">{tab === 'Daily' ? "Today's horoscope" : `${tab} horoscope`}</span>
          <h2>{heading}</h2>
          <p className="st-today-time" aria-live="off">{timeLabel ? `Now: ${timeLabel}` : '\u00A0'}</p>
        </div>
        <p className="st-today-note">{TAB_COPY[tab]} Dates follow your own time zone. These are tarot reflections, not planetary-transit forecasts or predictions.</p>
      </div>
      <div className="st-today-grid">
        {SIGN_INFO.map((s, i) => {
          const c = FREE_TAROT_CARDS[(key * 31 + (i + 1) * 97) % FREE_TAROT_CARDS.length];
          return (
            <Link key={s.n} to={`/horoscope/${s.n}`} className="st-today-tile">
              <img className="st-today-art" src={`/perf-assets/signs/${s.n}.svg`} alt="" width={64} height={64} loading="lazy" decoding="async" />
              <span className="st-today-sign"><b aria-hidden="true">{GLYPHS[i]}{'\uFE0E'}</b>{cap(s.n)}</span>
              <span className="st-today-dates">{s.dates}</span>
              <span className="st-today-card">{c.name}</span>
              <span className="st-today-kw">{c.keywords}</span>
              <span className="st-today-adv">{c.advice}</span>
              <span className="st-today-more">Read {cap(s.n)} <span aria-hidden="true">&rarr;</span></span>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

const periodInfo = (tab: TodayTab, dayKey: number) => {
  const fmt = (k: number) => new Intl.DateTimeFormat('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' }).format(dayKeyToDate(k));
  const md = (k: number) => new Intl.DateTimeFormat('en-US', { month: 'long', day: 'numeric', timeZone: 'UTC' }).format(dayKeyToDate(k));
  const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  const y = Math.floor(dayKey / 10000), m = Math.floor((dayKey % 10000) / 100);
  const dow = (dayKeyToDate(dayKey).getUTCDay() + 6) % 7;
  const ws = shiftKey(dayKey, -dow);
  if (tab === 'Yesterday') { const k = shiftKey(dayKey, -1); return { key: k, heading: fmt(k) }; }
  if (tab === 'Tomorrow') { const k = shiftKey(dayKey, 1); return { key: k, heading: fmt(k) }; }
  if (tab === 'Weekly') return { key: ws * 7 + 3, heading: `Week of ${md(ws)} to ${md(shiftKey(ws, 6))}` };
  if (tab === 'Monthly') return { key: (y * 100 + m) * 13 + 5, heading: `${MONTHS[m - 1]} ${y}` };
  if (tab === 'Yearly') return { key: y * 17 + 11, heading: String(y) };
  return { key: dayKey, heading: fmt(dayKey) };
};
const LiveClock: React.FC = () => {
  const dayKey = useDailyCardDay();
  const [now, setNow] = React.useState<Date | null>(null);
  React.useEffect(() => { setNow(new Date()); const t = setInterval(() => setNow(new Date()), 1000); return () => clearInterval(t); }, []);
  const date = new Intl.DateTimeFormat('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric', timeZone: 'UTC' }).format(dayKeyToDate(dayKey));
  const time = now ? new Intl.DateTimeFormat(undefined, { hour: 'numeric', minute: '2-digit', second: '2-digit', timeZoneName: 'short' }).format(now) : '';
  return <p className="st-live-clock" aria-live="off"><span>{date}</span><b>{time || '\u00A0'}</b></p>;
};
const SignPeriods: React.FC<{ signIndex: number; name: string }> = ({ signIndex, name }) => {
  const dayKey = useDailyCardDay();
  const [tab, setTab] = React.useState<TodayTab>('Daily');
  const { key, heading } = periodInfo(tab, dayKey);
  const c = FREE_TAROT_CARDS[(key * 31 + (signIndex + 1) * 97) % FREE_TAROT_CARDS.length];
  return (
    <section className="st-today st-today-sign-page">
      <div className="st-today-tabs" role="tablist" aria-label={`${name} horoscope period`}>
        {TODAY_TABS.map((t) => <button key={t} type="button" role="tab" aria-selected={tab === t} className={tab === t ? 'on' : ''} onClick={() => setTab(t)}>{t}</button>)}
      </div>
      <div className="st-period-card" style={{border:0,boxShadow:"none",background:"transparent"}}>
        <TarotArtwork src={c.image} alt={`${c.name} tarot card illustration for ${name}`} className="w-28 rounded-lg shadow-md" loading="lazy" />
        <div>
          <span className="eyebrow">{name} {tab.toLowerCase()} horoscope</span>
          <p className="st-period-h">{heading}</p>
          <p className="st-period-card-name">{c.name}</p>
          <p className="st-today-kw">{c.keywords}</p>
          <p className="st-today-adv">{c.upright}</p>
          <p className="st-today-adv"><strong>Reflect:</strong> {c.advice}</p>
          <p className="st-today-note">{TAB_COPY[tab]} Dates follow your own time zone. A tarot reflection, not a planetary-transit forecast or a prediction.</p>
        </div>
      </div>
    </section>
  );
};

const H2: React.FC<{ children: React.ReactNode }> = ({ children }) => <h2 className="text-2xl font-semibold mt-10 mb-3">{children}</h2>;
const P: React.FC<{ children: React.ReactNode }> = ({ children }) => <p className="text-base leading-relaxed text-[#1f2322]/75 mb-4">{children}</p>;

const EXTRA_LABELS: Record<string, string> = { '/free-tarot': 'Free tarot reading online', '/readings': 'Personal readings (shop)', '/shop': 'Personal readings (shop)', '/faq': 'Reading questions and answers' };
const LinkGrid: React.FC<{ paths: string[] }> = ({ paths }) => (
  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 my-4">
    {paths.map((p) => {
      const t = byPath[p];
      return (
        <Link key={p} to={p === '/readings' ? '/shop' : p} className="rounded-xl border border-[#1f2322]/10 bg-white/40 px-4 py-3 text-sm font-semibold hover:border-[#73a89a]">
          {t?.card && <TarotArtwork src={t.card.img} alt={`${t.card.name} tarot card`} className="w-12 rounded-md mb-2" loading="lazy" />}{t ? t.h1 : (EXTRA_LABELS[p] || p)}
        </Link>
      );
    })}
  </div>
);

const ReadingCTA: React.FC = () => (
  <section className="mt-12 rounded-2xl border border-[#1f2322]/10 bg-[#f0ebe4] p-7">
    <h2 className="text-xl font-semibold mb-2">Want a personal reading?</h2>
    <p className="text-sm text-[#1f2322]/70 mb-5">Explore our personal reading topics. Contact the studio to ask about format, price, delivery and what is included.</p>
    <div className="flex flex-wrap gap-3">
      <Link to="/shop" className="px-6 py-3 rounded-full bg-[#1f2322] text-white text-sm font-semibold hover:bg-[#73a89a]">See readings</Link>
      <Link to="/free-tarot" className="px-6 py-3 rounded-full border border-[#1f2322]/20 text-sm font-semibold hover:bg-[#1f2322]/5">Free tarot draw</Link>
    </div>
    <p className="text-xs text-[#1f2322]/50 mt-4">For entertainment and personal reflection. Readings cannot guarantee outcomes or replace medical, legal, financial or mental health advice.</p>
  </section>
);

const ELEMENT_PAIR: Record<string, string> = {
  'Fire|Fire': 'Two fire signs spark fast. The attraction is quick and the energy is high, and the risk is that two strong wills both want to lead. The pair works best when each person gets a clear area to run and arguments are kept short and honest.',
  'Earth|Fire': 'Fire starts things and earth finishes them. Fire gives earth momentum and a reason to try something new, while earth gives fire a base and a plan. Friction shows up when fire calls earth slow or earth calls fire reckless.',
  'Air|Fire': 'Air feeds fire. Ideas, talk and curiosity give fire a direction, and fire gives air the push to act on what it has been thinking about. The weak point is follow-through when both enjoy the start more than the middle.',
  'Fire|Water': 'Fire and water can make steam or put each other out. Fire brings warmth and courage, water brings depth and feeling. The pair needs direct talk about intensity, since fire can run over a sensitive moment and water can hold a quiet grudge.',
  'Earth|Earth': 'Two earth signs build well together. Shared habits, money sense and loyalty make the bond steady. The risk is routine: when neither person pushes for change, the relationship can settle into a rut without anyone noticing.',
  'Air|Earth': 'Air likes ideas and options, earth likes proof and routine. Each can teach the other something. Air loosens earth up, earth keeps air on the ground, and the friction is usually about speed and certainty.',
  'Earth|Water': 'Earth and water nourish each other. Earth gives water safety and structure, water gives earth warmth and emotional range. This is one of the more natural elemental pairings, with the usual risk of avoiding hard conversations to keep things calm.',
  'Air|Air': 'Two air signs talk easily. The friendship is strong and the conversation rarely stops. The gap tends to be emotional follow-through: it is easy to discuss a feeling at length and still not act on it.',
  'Air|Water': 'Air thinks, water feels. Air can help water put words to what it senses, and water can show air that not everything is solved by analysis. Trouble starts when air treats feelings as a debate or water expects air to read the mood without being told.',
  'Water|Water': 'Two water signs understand each other without much explaining. The bond is emotional and protective. The risk is a shared mood spiral, where both absorb each other\'s worries and nobody holds the practical side.'
};
const elementPair = (a: string, b: string) => ELEMENT_PAIR[[a, b].sort().join('|')] || '';

const compatBlurb = (a: string, b: string) => {
  const A = SIGN_INFO.find((s) => s.n === a)!;
  const B = SIGN_INFO.find((s) => s.n === b)!;
  return { A, B };
};

export const SeoPage: React.FC = () => {
  const { pathname } = useLocation();
  const page = byPath[pathname.replace(/\/$/, '') || '/'];
  if (!page) return null;
  const sign = page.sign ? SIGN_INFO.find((s) => s.n === page.sign) : undefined;
  const signIndex = sign ? SIGN_INFO.indexOf(sign) : 0;
  const related = (page.kind === 'hub-tarot' ? CARD_PAGES.map((c) => c.path) : page.links) || [];
  const N = sign ? cap(sign.n) : '';

  const isHoroscope = page.path === '/horoscope' || page.kind === 'horoscope';
  const ctaIcon = <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><rect x="5" y="3" width="14" height="18" rx="2.5"/><path d="M12 7.2l1.15 2.3 2.5.36-1.8 1.76.43 2.5L12 13.05l-2.24 1.17.42-2.5-1.8-1.76 2.5-.36z" fill="currentColor" stroke="none"/></svg>;
  const card = page.card;
  const reflection = card ? CARD_REFLECTIONS[card.slug] : undefined;
  const details = card ? PRIORITY_CARD_DETAILS[card.slug] : undefined;
  const lore = card && !details ? CARD_LORE[card.slug] : undefined;
  const researchSections = RESEARCH_SECTIONS[page.path];
  const companionPosts = card ? journalLinks.filter(p => (p.slug?.startsWith(card.slug + '-') || (card.slug === 'the-lovers' && p.slug === 'aquarius-leo-compatibility'))).slice(0, 3) : [];
  const major = card?.arcana === 'Major Arcana' ? FREE_TAROT_CARDS.find((c) => norm(c.name) === norm(card.name)) : undefined;

  return (
    <div className={`pt-32 pb-24 bg-[#FAF8F5] min-h-screen text-[#1f2322] ${isHoroscope ? "st-astro-page" : "st-editorial"}`}>
      <SEOHead title={SEARCH_SNIPPETS[page.path]?.title ? SEARCH_SNIPPETS[page.path].title! : page.title.includes("| The Psychic Studio") ? page.title : `${page.title} | The Psychic Studio`} description={SEARCH_SNIPPETS[page.path]?.meta || page.meta} schema={reflection && card ? {'@context':'https://schema.org','@type':'FAQPage',mainEntity:[{'@type':'Question',name:`What does ${card.name} mean in a reading?`,acceptedAnswer:{'@type':'Answer',text:`${reflection.theme}. Read that theme with your question, the card's position and the surrounding cards. There is no single interpretation that fits every situation.`}},{'@type':'Question',name:`Is ${card.name} reversed a bad sign?`,acceptedAnswer:{'@type':'Answer',text:`No. Its reversed reflection is ${reflection.challenge.toLowerCase()}. Use that as a question about your situation, not a judgment or a guaranteed prediction.`}},{'@type':'Question',name:`Can ${card.name} tell me how someone feels?`,acceptedAnswer:{'@type':'Answer',text:"It can help you reflect on relationship themes, but it cannot verify another person's thoughts or intentions. Ask directly and pay attention to their words and actions."}}]} : undefined} canonicalUrl={page.path} />
      <div className={`mx-auto px-4 sm:px-6 lg:px-8 ${isHoroscope ? "st-astro-wrap" : page.kind === 'hub-tarot' ? "max-w-6xl" : "max-w-4xl"}`}>
        <div className={isHoroscope ? "st-astro-hero" : "st-editorial-heading"}>
          <div>
            <p className="eyebrow">{isHoroscope ? 'A little perspective from the stars' : 'The Psychic Studio'}</p>
            <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight mb-5">{page.h1}</h1>
            {page.intro && <p className="text-lg leading-relaxed text-[#1f2322]/70 mb-8">{page.intro}</p>}
            {sign && <div className="st-sign-meta"><span>{sign.dates}</span><span>{sign.el}</span><span>{sign.ruler}</span></div>}
            {isHoroscope && <LiveClock />}
            {page.path === '/horoscope' && <a className="btn ghost" href="#today">See today's cards ↓</a>}
            {isHoroscope && (
              <div className="st-quick-cta v-minimal">
                <Link to="/free-tarot" className="st-quick-cta-btn">{ctaIcon}Free tarot reading: draw 1 or 3 cards</Link>
                <span className="st-quick-cta-note">No sign-up, takes under a minute.</span>
              </div>
            )}
          </div>
          {isHoroscope && (sign ? <div className="st-sign-orbit" aria-hidden="true"><img className="st-sign-drawing" src={`/perf-assets/signs/${sign.n}.svg`} alt="" width={340} height={423} loading="eager" fetchPriority="high" decoding="async" /><span className="st-orbit-label">{N}</span></div> : <div className="st-wheel-slice st-hand-slice"><ZodiacArc /></div>)}
        </div>
        {(page.kind === 'zodiac' || page.kind === 'dates') && (
          <div className="st-quick-cta v-minimal">
            <Link to="/free-tarot" className="st-quick-cta-btn">{ctaIcon}Free tarot reading: draw 1 or 3 cards</Link>
            <span className="st-quick-cta-note">No sign-up, takes under a minute.</span>
          </div>
        )}
        {page.path === '/numerology' && <NumerologyCalculator />}
        {page.path === '/zodiac' && <ZodiacSignFinder />}
        {(page.path === '/horoscope' || page.kind === 'horoscope') && <DailyCardSignup sign={page.kind === 'horoscope' && sign ? sign.n.charAt(0).toUpperCase() + sign.n.slice(1) : undefined} />}
        {page.path === '/horoscope' && <TodayBoard />}
        {page.path === '/horoscope' && <section id="your-sign" className="st-sign-selection">
          <span className="eyebrow">Twelve signs. Your own perspective.</span><h2>Choose your sign</h2>
          <div className="st-zodiac-gallery">{SIGN_INFO.map((s, i) => <Link key={s.n} to={`/horoscope/${s.n}`} className="st-zodiac-tile"><span className="st-zodiac-glyph" aria-hidden="true">{GLYPHS[i]}{'\uFE0E'}</span><span className="st-zodiac-name">{cap(s.n)}</span><span className="st-zodiac-dates">{s.dates}</span><span className="st-zodiac-element">{s.el} <span aria-hidden="true">↗</span></span></Link>)}</div>
        </section>}

        {page.kind === 'horoscope' && sign && (
          <>
            <SignPeriods signIndex={signIndex} name={N} />
            <H2>{N} today: what to reflect on</H2>
            <P>{N} is {sign.traits}. Use today's card as a lens: ask where those traits are helping you and where they may be getting in the way.</P>
            <H2>{N} in love</H2>
            <P>{sign.love}</P>
            <H2>{N} at work</H2>
            <P>{sign.work}</P>
            <H2>Your next step, {N}</H2>
            <P>Draw a <Link to="/free-tarot" className="text-[#73a89a] font-semibold">free tarot card</Link>, read what <Link to={`/tarot-card-meanings/${sign.cardSlug}`} className="text-[#73a89a] font-semibold">{sign.card}</Link> means for {N}, or find your date on the <Link to="/zodiac" className="text-[#73a89a] font-semibold">zodiac sign finder</Link>. If you would like to talk a question through with the studio, see the <Link to="/readings" className="text-[#73a89a] font-semibold">personal readings</Link>.</P>
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
            <H2>{N} strengths and blind spots</H2>
            <P>{sign.strengths}</P>
            <H2>{N} and the tarot</H2>
            <P>{sign.tarot} Explore the <Link to={`/tarot-card-meanings/${sign.cardSlug}`} className="text-[#73a89a] font-semibold">{sign.card}</Link> card meaning, your <Link to={`/horoscope/${sign.n}`} className="text-[#73a89a] font-semibold">{N} daily tarot reflection</Link>, and how {N} pairs with every other sign in the <Link to="/zodiac-compatibility" className="text-[#73a89a] font-semibold">compatibility guide</Link>.</P>
            <H2>Living well as a {N}</H2>
            <P>{sign.growth}</P>
            <P>Your sun sign is only one part of your chart. For the full picture, see the <Link to="/birth-chart" className="text-[#73a89a] font-semibold">birth chart guide</Link>.</P>
            <P>Next, draw a <Link to="/free-tarot" className="text-[#73a89a] font-semibold">free tarot card</Link>, read the <Link to={`/horoscope/${sign.n}`} className="text-[#73a89a] font-semibold">{cap(sign.n)} tarot reflection</Link>, or see the <Link to="/readings" className="text-[#73a89a] font-semibold">personal readings</Link> if you want to talk a question through with the studio.</P>
          </>
        )}

        {page.kind === 'dates' && (
          <>
            <ul className="grid sm:grid-cols-2 gap-3 mb-6 text-sm">
              {SIGN_INFO.map((sg) => (
                <li key={sg.n} className="rounded-xl border border-[#1f2322]/10 bg-white/40 px-4 py-3">
                  <Link to={`/zodiac/${sg.n}`} className="font-semibold text-[#73a89a]">{cap(sg.n)}</Link>: {sg.dates} ({sg.el}, ruled by {sg.ruler})
                </li>
              ))}
            </ul>
            <H2>How to find your sign by birthday</H2>
            <P>Find your birth date in the list above. The sign whose date range contains it is your sun sign, the sign most people mean when they ask "what is your sign". If your birthday falls on the first or last day of a range, read the cusp section below.</P>
            <H2>Born on the cusp?</H2>
            <P>A cusp birthday is one within about two days of a sign change, for example March 20 or April 19. Because the sun changes signs at a specific hour that shifts slightly each year, cusp birthdays can fall in either sign depending on the year and time of birth. The reliable way to settle a cusp birthday is a full <Link to="/birth-chart" className="text-[#73a89a] font-semibold">birth chart</Link> calculated from your date, time and place of birth.</P>
            <H2>Why the dates sometimes look different</H2>
            <P>Different astrology books print slightly different sign dates, usually by a day at each boundary. The ranges above are the most commonly used Western tropical dates. The wobble comes from leap years and the exact hour of the sun's sign change, which is another reason cusp birthdays deserve a real chart rather than a table.</P>
            <H2>More than a sun sign</H2>
            <P>Your sun sign describes one layer: broad style and themes. A full chart adds your moon sign, rising sign and the houses, which is why two people with the same birthday can read so differently. When you know your sign, you can explore its <Link to="/zodiac" className="text-[#73a89a] font-semibold">traits, love and work themes</Link> or its <Link to="/horoscope" className="text-[#73a89a] font-semibold">daily tarot reflection</Link>.</P>
          </>
        )}

        {page.kind === 'compat' && page.a && page.b && (() => {
          const { A, B } = compatBlurb(page.a, page.b);
          return (
            <>
              <H2>{cap(A.n)}: {A.traits}</H2>
              <P>{A.love}</P>
              {A.n !== B.n && <><H2>{cap(B.n)}: {B.traits}</H2>
              <P>{B.love}</P></>}
              <H2>Making it work</H2>
              <P>{A.n === B.n ? `Two ${cap(A.n)} partners share the same pace and the same blind spots, so talk openly about who leads and who gives way.` : `${cap(A.n)} is ${A.mod.toLowerCase()} and ${cap(B.n)} is ${B.mod.toLowerCase()}, so talk openly about pace, decisions and who leads.`} Ask what each of you needs to feel safe and appreciated, and say it plainly.</P>
              <H2>{A.el === B.el ? `Two ${A.el.toLowerCase()} signs` : `${A.el} and ${B.el.toLowerCase()} together`}</H2>
              <P>{elementPair(A.el, B.el)}</P>
              <P>{A.n === B.n ? `Both partners are ${A.mod.toLowerCase()}, so they hold their positions the same way and neither gives ground easily. Agree early on how decisions get made.` : A.mod === B.mod ? `Both signs are ${A.mod.toLowerCase()}, so they move at a similar pace and tend to want the same kind of change at the same time. Disagreements come from competing for the same role rather than from different rhythms.` : `${cap(A.n)} is ${A.mod.toLowerCase()} and ${cap(B.n)} is ${B.mod.toLowerCase()}, which gives them different rhythms. One may start, hold or adjust at a different time than the other, and naming that early saves a lot of misreading.`}</P>
              <H2>In love, friendship and work</H2>
              <P><strong>Love.</strong> {A.n === B.n ? `Two ${cap(A.n)} partners recognize each other quickly, which is both the pull and the problem. ${A.love}` : `${A.love} ${B.love}`}</P>
              <P><strong>Work.</strong> {A.n === B.n ? A.work : `${A.work} ${B.work}`} As coworkers or business partners they do best when each person owns a clear piece of the job.</P>
              <H2>What each sign brings</H2>
              <P>{A.strengths}</P>
              {A.n !== B.n && <P>{B.strengths}</P>}
              <H2>A practice to try together</H2>
              <P>{A.growth}</P>
              {A.n !== B.n && <P>{B.growth}</P>}
              <H2>The tarot link</H2>
              <P>{A.n === B.n ? A.tarot : `${A.tarot} ${B.tarot}`} Draw a card for each of you in the <Link to="/free-tarot" className="text-[#73a89a] font-semibold">free tarot reading</Link> and compare what each one asks of the relationship.</P>
              <P>Explore the <Link to={`/tarot-card-meanings/${A.cardSlug}`} className="text-[#73a89a] font-semibold">{A.card}</Link> card{A.n !== B.n && <>, the <Link to={`/tarot-card-meanings/${B.cardSlug}`} className="text-[#73a89a] font-semibold">{B.card}</Link> card</>}, and the daily tarot reflections for <Link to={`/horoscope/${A.n}`} className="text-[#73a89a] font-semibold">{cap(A.n)}</Link>{A.n !== B.n && <> and <Link to={`/horoscope/${B.n}`} className="text-[#73a89a] font-semibold">{cap(B.n)}</Link></>}.</P>
              <P>Sun signs describe only part of a match. Compare full birth charts for a fuller view, and treat any pairing guide as reflection rather than a verdict on a relationship.</P>
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

        {page.kind === 'article' && !researchSections && (
          <>
            <H2>The short version</H2>
            <P>{page.body}</P>
            <H2>How to use this</H2>
            <P>Write down what stands out, then draw a free card to explore it. If you want to go deeper with a person, choose a personal reading.</P>
          </>
        )}

        {page.kind === 'hub-tarot' && <><TarotCardLibrary /><TarotStudyGuide /></>}

        {researchSections && <section aria-label="Reading guide">{researchSections.map(([heading, text]) => <React.Fragment key={heading}><H2>{heading}</H2><P>{text}</P></React.Fragment>)}</section>}

        {SEO_PASS_SECTIONS[page.path] && <section aria-label="Practical questions and examples">{SEO_PASS_SECTIONS[page.path].map(([heading, text]) => <React.Fragment key={heading}><H2>{heading}</H2><P>{text}</P></React.Fragment>)}</section>}
        {SEO_CONTEXT_LINKS[page.path] && <section aria-label="Related learning"><H2>Related guides</H2><ul className="space-y-3 mb-6">{SEO_CONTEXT_LINKS[page.path].map(([url, label]) => <li key={url}><Link to={url} className="text-[#507d71] underline underline-offset-4" style={{color:'#3f6b5f',textDecoration:'underline',textUnderlineOffset:'4px',fontWeight:600}}>{label}</Link></li>)}</ul></section>}

        {page.kind === 'card' && card && (
          <div className="st-card-detail">
            <section aria-label="Card overview" className="pb-8 mb-10 border-b border-[#e4ded3]">
              <div className="grid sm:grid-cols-[190px_1fr] gap-6 sm:gap-10 items-center">
                <TarotArtwork src={card.img} alt={`${card.name} tarot card illustration for upright and reversed meanings`} className="w-44 sm:w-full rounded-md shadow-lg mx-auto" loading="lazy" />
                <div>
                  <p className="text-xs uppercase tracking-[0.18em] text-[#4a3560] font-semibold mb-3">{card.arcana}{card.suit ? ` - ${card.suit}` : ''}</p>
                  {major ? (
                    <p className="text-base text-[#1b1a17] font-medium">{major.keywords}</p>
                  ) : <P>{card.name} speaks to {card.dom}. As a {card.num}, it stands for {card.up}.</P>}
                </div>
              </div>
            </section>
            {reflection && (
              <section aria-label="Card at a glance" className="mb-12">
                <h2 className="text-xs uppercase tracking-[0.18em] text-[#4a3560] font-semibold mb-4">{card.name} at a glance</h2>
                <dl className="grid sm:grid-cols-3 gap-6 text-sm leading-relaxed">
                  <div className="border-t-2 border-[#1b1a17] pt-3"><dt className="text-xs uppercase tracking-widest text-[#4a3560] font-semibold mb-1">Upright theme</dt><dd>{reflection.theme}.</dd></div>
                  <div className="border-t-2 border-[#1b1a17] pt-3"><dt className="text-xs uppercase tracking-widest text-[#4a3560] font-semibold mb-1">Reversed theme</dt><dd>{reflection.challenge}.</dd></div>
                  <div className="border-t-2 border-[#1b1a17] pt-3"><dt className="text-xs uppercase tracking-widest text-[#4a3560] font-semibold mb-1">Card group and number</dt><dd>{reflection.group} · {reflection.number}{reflection.element ? ` · ${reflection.element}` : ''}</dd></div>
                </dl>
              </section>
            )}
            <div className="grid sm:grid-cols-2 gap-x-10 gap-y-10 mb-12">
              <section aria-label={`${card.name} upright meaning`} className="border-t-2 border-[#1b1a17] pt-4">
                <p className="text-xs uppercase tracking-[0.18em] text-[#4a3560] font-semibold mb-2">Upright</p>
                <h2 className="text-2xl font-semibold mb-3 text-[#1b1a17]">{card.name} upright</h2>
                <P>{reflection ? reflection.theme + ". " + reflection.prompt : major ? major.upright : `Upright, the ${card.name} points to ${card.up}, in the area of ${card.dom}.`}</P>
                {reflection && !lore && <P>{reflection.theme}. Think about where this theme is already present rather than waiting for the card to make something happen. In an advice position, it asks how you could respond deliberately; in a challenge position, it may describe something that needs more attention. {reflection.prompt}</P>}
              </section>
              <section aria-label={`${card.name} reversed meaning`} className="border-t border-[#e4ded3] pt-4">
                <p className="text-xs uppercase tracking-[0.18em] text-[#4a3560] font-semibold mb-2">Reversed</p>
                <h2 className="text-2xl font-semibold mb-3 text-[#1b1a17]">{card.name} reversed</h2>
                <P>{reflection ? reflection.challenge + ". " + "Consider whether the theme is blocked, excessive or asking for a different response." : major?.reversed ? major.reversed : card.rev ? `Reversed, the ${card.name} can point to ${card.rev}.` : 'Reversed, look at where this energy is blocked or overdone.'}</P>
                {lore ? <P>{lore[3]}</P> : reflection && <P>{reflection.challenge}. A reversed card is not automatically the opposite of the upright meaning. It can bring attention to the same theme being blocked, exaggerated or directed inward. Check which possibility matches your situation and which relies on an assumption.</P>}
              </section>
              <section aria-label={`${card.name} in love`} className="border-t border-[#e4ded3] pt-4">
                <p className="text-xs uppercase tracking-[0.18em] text-[#4a3560] font-semibold mb-2">Love</p>
                <h2 className="text-2xl font-semibold mb-3 text-[#1b1a17]">{card.name} in love</h2>
                <P>{lore ? lore[1] : details ? details.love : card.suit === 'Cups' ? `As a Cups card, the ${card.name} puts feelings and connection in front. Ask what you truly feel and what you need to hear.` : `In a love question, ask how the themes of the ${card.name} show up in how you and your partner talk, trust and commit.`}</P>
                {reflection && !lore && <P>For a relationship question, start with this reflection: {reflection.prompt} Consider both your needs and the other person's stated needs. If you are single, apply the theme to the kind of connection you want to build. If you are partnered, use it to start a direct conversation. The card cannot confirm another person's private feelings.</P>}
              </section>
              <section aria-label={`${card.name} in career`} className="border-t border-[#e4ded3] pt-4">
                <p className="text-xs uppercase tracking-[0.18em] text-[#4a3560] font-semibold mb-2">Career</p>
                <h2 className="text-2xl font-semibold mb-3 text-[#1b1a17]">{card.name} in career</h2>
                <P>{lore ? lore[2] : details ? details.career : card.suit === 'Pentacles' ? `As a Pentacles card, the ${card.name} speaks directly to work, money and effort. Look at what is practical and sustainable.` : `At work, ask where the ${card.name} shows up in your goals, your team and your habits.`}</P>
                {reflection && !lore && <P>For work or money questions, {reflection.theme.toLowerCase()} can help you review your approach. Look at the resources, commitments and facts of the situation before changing direction. {reflection.prompt} This is a reflection tool, not a financial forecast or investment recommendation.</P>}
              </section>
            </div>
            {reflection && (
              <>
                <section aria-label="Advice and journal prompt" className="border-t-2 border-[#1b1a17] pt-4 mb-10">
                  <h2 className="text-2xl font-semibold mb-3 text-[#1b1a17]">Advice and a journal prompt</h2>
                  <P>{reflection.prompt} Write down the part of the card that feels relevant, then name one action that stays within your control. Compare that action with what you would choose without the reading; the card should help you think, not take the decision away from you.</P>
                </section>
                <section aria-label="Yes or no" className="border-t border-[#e4ded3] pt-4 mb-12">
                  <h2 className="text-2xl font-semibold mb-3 text-[#1b1a17]">{card.name}: yes or no?</h2>
                  <P>Tarot traditions do not share one fixed yes/no answer for every card. For {card.name}, consider whether the theme of {reflection.theme.toLowerCase()} supports the step you are considering. The reversed theme may suggest a condition to address first. A card is not reliable evidence that an event will happen.</P>
                </section>
                <h2 className="text-2xl font-semibold mt-12 mb-5 text-[#1b1a17]">Common questions about {card.name}</h2>
                <div className="grid sm:grid-cols-3 gap-6 mb-8">
                  <div className="border-t border-[#e4ded3] pt-3"><h3 className="text-base font-semibold mb-2 text-[#1b1a17]">What does {card.name} mean in a reading?</h3><P>{reflection.theme}. Read that theme with your question, the card's position and the surrounding cards. There is no single interpretation that fits every situation.</P></div>
                  <div className="border-t border-[#e4ded3] pt-3"><h3 className="text-base font-semibold mb-2 text-[#1b1a17]">Is {card.name} reversed a bad sign?</h3><P>No. Its reversed reflection is {reflection.challenge.toLowerCase()}. Use that as a question about your situation, not a judgment or a guaranteed prediction.</P></div>
                  <div className="border-t border-[#e4ded3] pt-3"><h3 className="text-base font-semibold mb-2 text-[#1b1a17]">Can {card.name} tell me how someone feels?</h3><P>It can help you reflect on relationship themes, but it cannot verify another person's thoughts or intentions. Ask directly and pay attention to their words and actions.</P></div>
                </div>
              </>
            )}
            {details && <><H2>Symbolism and the card's message</H2><P>{details.symbolism}</P><P>{details.question}</P></>}
            {lore && <><H2>Symbolism and imagery</H2><P>{lore[0]}</P></>}
            {lore && card && card.arcana !== 'Major Arcana' && (() => { const x = minorExtra(card.slug, card.name); return x ? <><H2>Meaning in practice</H2><P>{x[0]}</P><P>{x[1]}</P><P>{x[2]}</P></> : null; })()}
            {!details && <><H2>Reading this card in a spread</H2><P>Compare {card.name} with the question you asked and the position it occupies. A card describing a challenge may invite a different reflection from the same card in an advice position. Notice the surrounding cards before settling on an interpretation.</P></>}
            {card.arcana === 'Major Arcana' && MAJOR_PRACTICE[card.slug] && <><H2>A practical example for {card.name}</H2><P>{MAJOR_PRACTICE[card.slug][0]}</P><H2>A useful card comparison</H2><P>{MAJOR_PRACTICE[card.slug][1]}</P><LinkGrid paths={CARD_PAGES.filter(c => c.card && c.card.slug !== card.slug && MAJOR_PRACTICE[card.slug][1].toLowerCase().includes(c.card.name.toLowerCase())).map(c => c.path)} /></>}
            {companionPosts.length > 0 && <section><H2>Related reflections from the journal</H2><ul className="space-y-2">{companionPosts.map(p => <li key={p.slug}><Link to={`/blog/${p.slug}`} className="underline underline-offset-4 decoration-[#d8d0e2] hover:decoration-[#4a3560]">{p.title}</Link></li>)}</ul></section>}
            {major && (<div className="border-l-2 border-[#4a3560] pl-5 mt-10"><h3 className="text-lg font-semibold mb-2 text-[#1b1a17]">A question to reflect on</h3><P>{major.advice}</P></div>)}
          </div>
        )}

        <SearchGuidance path={page.path} />

        {related.length > 0 && page.kind !== 'hub-tarot' && page.path !== '/horoscope' && (
          <>
            <H2>Keep exploring</H2>
            <LinkGrid paths={Array.from(new Set(page.kind === 'hub-compat' ? related : related.slice(0, 24)))} />
          </>
        )}

        <ReadingCTA />
      </div>
    </div>
  );
};
