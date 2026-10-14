import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Layout } from './Layout';
import { TarotArtwork } from '../components/TarotArtwork';
import { SEOHead } from '../components/SEOHead';
import { FAQS } from '../data/readingsData';
import { getBlogPosts } from '../services/cmsStorage';
const inline = (t: string): React.ReactNode[] => {
  const out: React.ReactNode[] = []; const re = /\[([^\]]+)\]\(([^)]+)\)/g; let last = 0; let m: RegExpExecArray | null; let k = 0;
  while ((m = re.exec(t))) { if (m.index > last) out.push(t.slice(last, m.index)); out.push(m[2].startsWith('http') ? <a key={k++} href={m[2]} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--leaf)', textDecoration: 'underline' }}>{m[1]}</a> : <Link key={k++} to={m[2]} style={{ color: 'var(--leaf)', textDecoration: 'underline' }}>{m[1]}</Link>); last = m.index + m[0].length; }
  if (last < t.length) out.push(t.slice(last)); return out;
};
const headingId = (t: string) => t.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const minutes = (text: string) => Math.max(1, Math.ceil(text.split(/\s+/).length / 200));
export const Md: React.FC<{ text: string; resolveImage?: (src:string)=>string }> = ({ text, resolveImage = src=>src }) => (<>{text.split(/\n{2,}/).map((b, i) => {
  const img = b.match(/^!\[([^\]]*)\]\(([^)]+)\)$/); if (img) return <figure key={i} className="st-journal-figure"><TarotArtwork src={resolveImage(img[2])} alt={img[1]} loading="lazy" /><figcaption>{img[1]}</figcaption></figure>;
  const h = b.match(/^(#{2,3})\s+(.*)$/); if (h) return h[1].length === 2 ? <h2 key={i} id={headingId(h[2])}>{h[2]}</h2> : <h3 key={i} id={headingId(h[2])}>{h[2]}</h3>;
  return <p key={i}>{inline(b)}</p>; })}</>);
export const About: React.FC = () => (
  <Layout><div className="st-page"><div className="wrap">
    <span className="eyebrow">About</span><h1>About The Psychic Studio</h1>
    <div className="st-prose">
      <p>I use tarot as a way to slow down, ask better questions and see your situation from a new angle.</p>
      <p>This site is where I share free tarot draws, horoscopes, card meanings and guides. If you want something personal, explore the personal reading topics here.</p>
      <p>Readings are for entertainment and personal reflection. They don't replace medical, legal, financial or mental health advice.</p>
      <h2>What you will find here</h2>
      <ul>
        <li><Link to="/free-tarot">Free tarot draw</Link>: pull one or three cards from the 22 Major Arcana, with upright and reversed meanings. No account or payment details needed.</li>
        <li><Link to="/tarot-card-meanings">Tarot card meanings</Link>: a page for each of the 78 cards covering upright and reversed meanings, love, career, symbolism and a reflection question.</li>
        <li><Link to="/horoscope">Horoscopes</Link>, <Link to="/zodiac">zodiac sign guides</Link> and <Link to="/zodiac-compatibility">compatibility pages</Link> for the twelve signs.</li>
        <li><Link to="/angel-numbers">Angel numbers</Link>, <Link to="/numerology">numerology</Link> and other symbolism guides.</li>
        <li><Link to="/blog">The journal</Link>: tarot guides and ways to reflect on a question.</li>
        <li><Link to="/shop">Personal reading topics</Link> you can ask the studio about by email.</li>
      </ul>
      <h2>How the guides are written</h2>
      <p>Card meanings follow the common Rider-Waite-Smith tradition of imagery and symbolism. The artwork on this site is the studio's own set of 78 illustrations, an interpretation of the cards rather than a reproduction of a historic deck.</p>
      <p>Every guide is written as a prompt for reflection. A card can help you frame a question; it cannot predict events, confirm what another person feels or replace professional advice.</p>
      <h2>How personal readings work</h2>
      <p>Choose the topic closest to your question, then email the studio with the context you want to share. The studio confirms what the reading includes, how it is delivered and the payment arrangements before anything is arranged. This website itself does not take payments.</p>
      <h2>Get in touch</h2>
      <p>Questions about a reading or a guide? Write to <a href="mailto:contact.thepsychicstudio@gmail.com">contact.thepsychicstudio@gmail.com</a> or visit the <Link to="/contact">contact page</Link>. Common questions are answered in the <Link to="/faq">reading FAQ</Link>.</p>
      <p><Link className="btn" to="/shop">See my readings</Link></p>
    </div>
  </div></div></Layout>
);
export const Contact: React.FC = () => (
  <Layout><div className="st-page"><div className="wrap">
    <span className="eyebrow">Contact</span><h1>Questions about a reading?</h1>
    <div className="st-prose"><p>Email the studio with your question or the reading topic you are interested in.</p>
      <p><a className="btn" href="mailto:contact.thepsychicstudio@gmail.com">contact.thepsychicstudio@gmail.com</a></p>
      <p style={{ fontSize: 14 }}>This website does not take payments. Contact the studio to ask about reading details.</p></div>
  </div></div></Layout>
);
export const Blog: React.FC = () => {
  const posts = getBlogPosts().filter((p) => p.published !== false);
  const [category, setCategory] = useState('All stories');
  const categories = ['All stories', ...Array.from(new Set(posts.map((p) => p.category))).filter(Boolean)];
  const shown = category === 'All stories' ? posts : posts.filter((p) => p.category === category);
  return <Layout><div className="st-journal wrap">
    <div className="st-journal-intro"><span className="eyebrow">The studio journal</span><h1>A little clarity, one story at a time.</h1><p>Tarot guides, thoughtful questions and practical ways to reflect.</p></div>
    <div className="st-journal-filters" aria-label="Filter stories by category">{categories.map((c) => <button key={c} className={c === category ? 'active' : ''} aria-pressed={c === category} onClick={() => setCategory(c)}>{c}</button>)}</div>
    <div className="st-journal-layout"><section aria-label="Journal stories">{shown.map((p, index) => <Link key={p.id} className="st-journal-row" to={`/blog/${p.slug || p.id}`}>
      <div className="st-journal-story"><span className="eyebrow">{p.category}</span><h2>{p.title}</h2><p>{p.excerpt}</p><span className="st-journal-meta">The Psychic Studio · {minutes(p.content)} min read</span></div>
      <div className="st-journal-thumb">{p.slug?.startsWith('888-') || p.slug?.startsWith('757-') ? <span className="st-journal-number-label">{p.slug.slice(0,3)}<small>ANGEL NUMBER</small></span> : null}<TarotArtwork src={p.coverImage || '/tarot/the_fool.jpg'} alt={p.title} loading={index===0 ? "eager" : "lazy"} fetchPriority={index===0 ? "high" : "auto"} /></div>
    </Link>)}{shown.length === 0 && <p>No stories in this category yet.</p>}</section>
    <aside className="st-journal-sidebar"><span className="eyebrow">Start here</span><h2>New to tarot?</h2><p>You do not need to know every card. Start with one question and one small reflection.</p><Link className="btn" to="/free-tarot">Try a free card →</Link><hr /><span className="eyebrow">Explore</span><ul><li><Link to="/tarot-card-meanings">All 78 card meanings ↗</Link></li><li><Link to="/shop">Choosing a reading ↗</Link></li><li><Link to="/faq">Questions to ask ↗</Link></li></ul></aside></div>
  </div></Layout>;
};
export const BlogPostPage: React.FC = () => {
  const { slug } = useParams();
  const p = getBlogPosts().find((x) => (x.slug === slug || x.id === slug) && x.published !== false);
  const headings = p ? Array.from(p.content.matchAll(/^#{2,3}\s+(.+)$/gm)).map((m) => m[1]) : [];
  return <Layout seo={false}><div className="st-journal st-journal-article wrap"><Link className="st-journal-back" to="/blog">← Back to the journal</Link>
    {p ? <><SEOHead title={p.metaTitle || `${p.title} | The Psychic Studio`} description={p.excerpt.slice(0, 155)} ogType="article" ogImage={p.coverImage.startsWith('https://') ? p.coverImage : `https://thepsychicstudio.com${p.coverImage}`} canonicalUrl={`https://thepsychicstudio.com/blog/${p.slug}`} schema={{"@context":"https://schema.org","@type":"BlogPosting",headline:p.title,description:p.excerpt,image:p.coverImage.startsWith('https://') ? p.coverImage : `https://thepsychicstudio.com${p.coverImage}`,author:{"@type":"Organization",name:"The Psychic Studio",url:"https://thepsychicstudio.com/about"},publisher:{"@id":"https://thepsychicstudio.com/#organization"},url:`https://thepsychicstudio.com/blog/${p.slug}`,datePublished:p.publishedDate,mainEntityOfPage:`https://thepsychicstudio.com/blog/${p.slug}`}} />
    <div className="st-journal-article-head"><div><span className="eyebrow">{p.category} · {minutes(p.content)} min read</span><h1>{p.title}</h1><p>{p.excerpt}</p><div className="st-journal-meta">By The Psychic Studio · <time dateTime={p.publishedDate}>{p.publishedDate}</time></div></div><figure className="st-journal-hero">{p.slug?.startsWith('888-') || p.slug?.startsWith('757-') ? <span className="st-journal-number-label">{p.slug.slice(0,3)}<small>ANGEL NUMBER</small></span> : null}<TarotArtwork src={p.coverImage || '/tarot/the_fool.jpg'} alt={p.title} /></figure></div>
    <div className="st-journal-reading"><nav className="st-journal-toc" aria-label="In this guide"><span className="eyebrow">In this guide</span>{headings.map((h, i) => <a key={`${h}-${i}`} href={`#${headingId(h)}`}>{h}</a>)}<hr /><Link to="/tarot-card-meanings">Explore card meanings ↗</Link></nav><article className="st-journal-copy"><Md text={p.content} /><div className="st-journal-note">Let the reading help you think. Your choices remain your own.</div></article></div></> : <><SEOHead title="Post not found | The Psychic Studio" description="This journal story could not be found. Browse the latest tarot guides and reflections." /><h1>Post not found</h1></>}
  </div></Layout>;
};
export const Faq: React.FC = () => (
  <Layout><div className="st-page"><div className="wrap">
    <span className="eyebrow">FAQ</span><h1>Questions to Ask a Psychic and Reading FAQs</h1>
    <div className="st-faq" style={{ maxWidth: 780, marginTop: 24 }}>{FAQS.map((f) => (<details key={f.question}><summary>{f.question}</summary><p>{f.answer}</p></details>))}</div>
    <p style={{ marginTop: 30 }}><Link className="btn" to="/contact">Still have a question?</Link></p>
  </div></div></Layout>
);
export const NotFound: React.FC = () => (
  <Layout seo={false}><SEOHead title="Page not found | The Psychic Studio" description="This page could not be found. Explore free tarot, card meanings, horoscopes and the studio journal instead." noindex />
    <div className="st-page"><div className="wrap">
      <span className="eyebrow">404</span><h1>We could not find that page</h1>
      <div className="st-prose"><p>The link may be old or mistyped. These pages are a good place to start:</p>
        <p><Link className="btn" to="/">Home</Link> <Link className="btn" to="/free-tarot">Free tarot draw</Link> <Link className="btn" to="/tarot-card-meanings">Card meanings</Link> <Link className="btn" to="/blog">Blog</Link></p></div>
    </div></div></Layout>
);
