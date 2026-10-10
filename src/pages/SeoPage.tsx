import { RESEARCH_SECTIONS, PRIORITY_CARD_DETAILS, CARD_REFLECTIONS } from "../data/seoResearch";
import { TarotArtwork } from '../components/TarotArtwork';
import React, { useMemo } from 'react';
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

const H2: React.FC<{ children: React.ReactNode }> = ({ children }) => <h2 className="text-2xl font-semibold mt-10 mb-3">{children}</h2>;
const P: React.FC<{ children: React.ReactNode }> = ({ children }) => <p className="text-base leading-relaxed text-[#1f2322]/75 mb-4">{children}</p>;

const EXTRA_LABELS: Record<string, string> = { '/free-tarot': 'Free tarot reading online', '/readings': 'Personal readings (shop)', '/shop': 'Personal readings (shop)' };
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
      <Link to="/readings" className="px-6 py-3 rounded-full bg-[#1f2322] text-white text-sm font-semibold hover:bg-[#73a89a]">See readings</Link>
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

export const SeoPage: React.FC = () => {
  const { pathname } = useLocation();
  const page = byPath[pathname.replace(/\/$/, '') || '/'];
  if (!page) return null;
  const sign = page.sign ? SIGN_INFO.find((s) => s.n === page.sign) : undefined;
  const signIndex = sign ? SIGN_INFO.indexOf(sign) : 0;
  const related = (page.kind === 'hub-tarot' ? CARD_PAGES.map((c) => c.path) : page.links) || [];
  const N = sign ? cap(sign.n) : '';

  const isHoroscope = page.path === '/horoscope' || page.kind === 'horoscope';
  const card = page.card;
  const reflection = card ? CARD_REFLECTIONS[card.slug] : undefined;
  const details = card ? PRIORITY_CARD_DETAILS[card.slug] : undefined;
  const researchSections = RESEARCH_SECTIONS[page.path];
  const major = card?.arcana === 'Major Arcana' ? FREE_TAROT_CARDS.find((c) => norm(c.name) === norm(card.name)) : undefined;

  return (
    <div className={`pt-32 pb-24 bg-[#FAF8F5] min-h-screen text-[#1f2322] ${isHoroscope ? "st-astro-page" : "st-editorial"}`}>
      <SEOHead title={page.title.includes("| The Psychic Studio") ? page.title : `${page.title} | The Psychic Studio`} description={page.meta} schema={reflection && card ? {'@context':'https://schema.org','@type':'FAQPage',mainEntity:[{'@type':'Question',name:`What does ${card.name} mean in a reading?`,acceptedAnswer:{'@type':'Answer',text:`${reflection.theme}. Read that theme with your question, the card's position and the surrounding cards. There is no single interpretation that fits every situation.`}},{'@type':'Question',name:`Is ${card.name} reversed a bad sign?`,acceptedAnswer:{'@type':'Answer',text:`No. Its reversed reflection is ${reflection.challenge.toLowerCase()}. Use that as a question about your situation, not a judgment or a guaranteed prediction.`}},{'@type':'Question',name:`Can ${card.name} tell me how someone feels?`,acceptedAnswer:{'@type':'Answer',text:"It can help you reflect on relationship themes, but it cannot verify another person's thoughts or intentions. Ask directly and pay attention to their words and actions."}}]} : undefined} canonicalUrl={`${typeof window !== 'undefined' ? window.location.origin : ''}${page.path}`} />
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

        {page.kind === 'article' && !researchSections && (
          <>
            <H2>The short version</H2>
            <P>{page.body}</P>
            <H2>How to use this</H2>
            <P>Write down what stands out, then draw a free card to explore it. If you want to go deeper with a person, choose a personal reading.</P>
          </>
        )}

        {researchSections && <section aria-label="Reading guide">{researchSections.map(([heading, text]) => <React.Fragment key={heading}><H2>{heading}</H2><P>{text}</P></React.Fragment>)}</section>}

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
              <TarotArtwork src={card.img} alt={`${card.name} tarot card illustration for upright and reversed meanings`} className="w-40 rounded-lg shadow-md" loading="lazy" />
              <div>
                <p className="text-xs uppercase tracking-widest text-[#73a89a] font-semibold mb-2">{card.arcana}{card.suit ? ` - ${card.suit}` : ''}</p>
                {major ? <P>{major.keywords}</P> : <P>{card.name} speaks to {card.dom}. As a {card.num}, it stands for {card.up}.</P>}
              </div>
            </div>
            {reflection && <section aria-label="Card at a glance" className="rounded-xl border border-[#1f2322]/10 bg-white/40 p-5 my-6"><h2 className="text-xl font-semibold mb-3">{card.name} at a glance</h2><dl className="space-y-3 text-sm leading-relaxed"><div><dt className="font-semibold">Upright theme</dt><dd>{reflection.theme}.</dd></div><div><dt className="font-semibold">Reversed theme</dt><dd>{reflection.challenge}.</dd></div><div><dt className="font-semibold">Card group and number</dt><dd>{reflection.group} · {reflection.number}{reflection.element ? ` · ${reflection.element}` : ''}</dd></div></dl></section>}
            <H2>{card.name} upright</H2>
            <P>{reflection ? reflection.theme + ". " + reflection.prompt : major ? major.upright : `Upright, the ${card.name} points to ${card.up}, in the area of ${card.dom}.`}</P>
            {reflection && <P>{reflection.theme}. Think about where this theme is already present rather than waiting for the card to make something happen. In an advice position, it asks how you could respond deliberately; in a challenge position, it may describe something that needs more attention. {reflection.prompt}</P>}
            <H2>{card.name} reversed</H2>
            <P>{reflection ? reflection.challenge + ". " + "Consider whether the theme is blocked, excessive or asking for a different response." : major?.reversed ? major.reversed : card.rev ? `Reversed, the ${card.name} can point to ${card.rev}.` : 'Reversed, look at where this energy is blocked or overdone.'}</P>
            {reflection && <P>{reflection.challenge}. A reversed card is not automatically the opposite of the upright meaning. It can bring attention to the same theme being blocked, exaggerated or directed inward. Check which possibility matches your situation and which relies on an assumption.</P>}
            <H2>{card.name} in love</H2>
            <P>{details ? details.love : card.suit === 'Cups' ? `As a Cups card, the ${card.name} puts feelings and connection in front. Ask what you truly feel and what you need to hear.` : `In a love question, ask how the themes of the ${card.name} show up in how you and your partner talk, trust and commit.`}</P>
            {reflection && <P>For a relationship question, start with this reflection: {reflection.prompt} Consider both your needs and the other person's stated needs. If you are single, apply the theme to the kind of connection you want to build. If you are partnered, use it to start a direct conversation. The card cannot confirm another person's private feelings.</P>}
            <H2>{card.name} in career</H2>
            <P>{details ? details.career : card.suit === 'Pentacles' ? `As a Pentacles card, the ${card.name} speaks directly to work, money and effort. Look at what is practical and sustainable.` : `At work, ask where the ${card.name} shows up in your goals, your team and your habits.`}</P>
            {reflection && <P>For work or money questions, {reflection.theme.toLowerCase()} can help you review your approach. Look at the resources, commitments and facts of the situation before changing direction. {reflection.prompt} This is a reflection tool, not a financial forecast or investment recommendation.</P>}
            {reflection && <><H2>Advice and a journal prompt</H2><P>{reflection.prompt} Write down the part of the card that feels relevant, then name one action that stays within your control. Compare that action with what you would choose without the reading; the card should help you think, not take the decision away from you.</P><H2>{card.name}: yes or no?</H2><P>Tarot traditions do not share one fixed yes/no answer for every card. For {card.name}, consider whether the theme of {reflection.theme.toLowerCase()} supports the step you are considering. The reversed theme may suggest a condition to address first. A card is not reliable evidence that an event will happen.</P><H2>Common questions about {card.name}</H2><div className="space-y-5"><div><h3 className="text-lg font-semibold">What does {card.name} mean in a reading?</h3><P>{reflection.theme}. Read that theme with your question, the card's position and the surrounding cards. There is no single interpretation that fits every situation.</P></div><div><h3 className="text-lg font-semibold">Is {card.name} reversed a bad sign?</h3><P>No. Its reversed reflection is {reflection.challenge.toLowerCase()}. Use that as a question about your situation, not a judgment or a guaranteed prediction.</P></div><div><h3 className="text-lg font-semibold">Can {card.name} tell me how someone feels?</h3><P>It can help you reflect on relationship themes, but it cannot verify another person's thoughts or intentions. Ask directly and pay attention to their words and actions.</P></div></div></>}
            {details && <><H2>Symbolism and the card's message</H2><P>{details.symbolism}</P><P>{details.question}</P></>}
            {!details && <><H2>Reading this card in a spread</H2><P>Compare {card.name} with the question you asked and the position it occupies. A card describing a challenge may invite a different reflection from the same card in an advice position. Notice the surrounding cards before settling on an interpretation.</P></>}
            {major && (<><h3 className="text-lg font-semibold mt-6 mb-2">A question to reflect on</h3><P>{major.advice}</P></>)}
          </>
        )}

        {related.length > 0 && page.kind !== 'hub-tarot' && page.path !== '/horoscope' && (
          <>
            <H2>Keep exploring</H2>
            <LinkGrid paths={related.slice(0, 24)} />
          </>
        )}

        <ReadingCTA />
      </div>
    </div>
  );
};
