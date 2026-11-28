import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Layout } from './Layout';
import { TarotArtwork } from '../components/TarotArtwork';
import { SEOHead } from '../components/SEOHead';
import { FAQS } from '../data/readingsData';
import { getBlogPosts } from '../services/cmsStorage';
const inline = (t: string): React.ReactNode[] => {
  const out: React.ReactNode[] = []; const re = /\[([^\]]+)\]\(([^)]+)\)/g; let last = 0; let m: RegExpExecArray | null; let k = 0;
  const pushText = (chunk: string) => {
    chunk.split(/\*\*([^*]+)\*\*/g).forEach((part, idx) => { if (part) out.push(idx % 2 === 1 ? <strong key={k++}>{part}</strong> : part); });
  };
  while ((m = re.exec(t))) { if (m.index > last) pushText(t.slice(last, m.index)); out.push(m[2].startsWith('http') ? <a key={k++} href={m[2]} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--leaf)', textDecoration: 'underline' }}>{m[1]}</a> : <Link key={k++} to={m[2]} style={{ color: 'var(--leaf)', textDecoration: 'underline' }}>{m[1]}</Link>); last = m.index + m[0].length; }
  if (last < t.length) pushText(t.slice(last)); return out;
};
const headingId = (t: string) => t.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const minutes = (text: string) => Math.max(1, Math.ceil(text.split(/\s+/).length / 200));
const angelNum = (p: { category?: string; slug?: string; coverImage?: string }) => p.category === 'Angel Numbers' && !(p.coverImage || '').startsWith('/blog-images/cover-') ? (p.slug || '').match(/^(\d{3,})/)?.[1] || null : null;
const isArtCover = (src?: string) => !!src && (src.startsWith('/tarot/') || src.includes('/signs/'));
const coverClass = (p: { category?: string; slug?: string; coverImage?: string }, base: string) => base + (angelNum(p) ? ' number' : isArtCover(p.coverImage) ? ' art' : '');
const CoverVisual: React.FC<{ p: any; eager?: boolean; sizes?: string }> = ({ p, eager, sizes }) => {
  const num = angelNum(p);
  if (num) return <span className="st-journal-number-label">{num}<small>ANGEL NUMBER</small></span>;
  return <TarotArtwork src={p.coverImage || '/tarot/the_fool.jpg'} alt={p.title} loading={eager ? 'eager' : 'lazy'} fetchPriority={eager ? 'high' : 'auto'} sizes={sizes} />;
};
export const Md: React.FC<{ text: string; resolveImage?: (src:string)=>string }> = ({ text, resolveImage = src=>src }) => (<>{text.split(/\n{2,}/).map((b, i) => {
  const img = b.match(/^!\[([^\]]*)\]\(([^)]+)\)$/); if (img) return <figure key={i} className="st-journal-figure"><TarotArtwork src={resolveImage(img[2])} alt={img[1]} loading="lazy" sizes="(max-width: 700px) calc(100vw - 44px), 740px" /><figcaption>{img[1]}</figcaption></figure>;
  const h = b.match(/^(#{2,3})\s+(.*)$/); if (h) return h[1].length === 2 ? <h2 key={i} id={headingId(h[2])}>{h[2]}</h2> : <h3 key={i} id={headingId(h[2])}>{h[2]}</h3>;
  const lines = b.split('\n');
  if (lines.length > 1 && lines.every((l) => /^- /.test(l))) return <ul key={i}>{lines.map((l, j) => <li key={j}>{inline(l.slice(2))}</li>)}</ul>;
  if (lines.length > 1 && lines.every((l) => /^\d+\.\s/.test(l))) return <ol key={i}>{lines.map((l, j) => <li key={j}>{inline(l.replace(/^\d+\.\s/, ''))}</li>)}</ol>;
  return <p key={i}>{lines.flatMap((l, j) => (j === 0 ? inline(l) : [<br key={`br-${i}-${j}`} />, ...inline(l)]))}</p>; })}</>);
export const About: React.FC = () => (
  <Layout><div className="st-page"><div className="wrap">
    <span className="eyebrow">About</span><h1>About The Psychic Studio</h1>
    <div className="st-about-intro"><div className="st-prose"><p>I use tarot as a way to slow down, ask better questions and see your situation from a new angle.</p><p>This is a space for reflection, with free card guides and personal written readings. Your choices stay yours.</p><Link className="btn" to="/shop">Explore personal readings</Link></div><div className="st-about-art"><TarotArtwork src="/tarot/the_star.jpg" alt="The studio's original Star tarot illustration" loading="eager" sizes="260px"/><span>Space to pause. A question to begin.</span></div></div>
    <div className="st-guide-links"><Link to="/free-tarot"><span>01 / TRY</span><h2>Start with one question</h2><p>Draw a free card and read its upright or reversed meaning.</p></Link><Link to="/tarot-card-meanings"><span>02 / LEARN</span><h2>Understand the symbolism</h2><p>Explore the studio's own artwork and guides to all 78 cards.</p></Link><Link to="/shop"><span>03 / REFLECT</span><h2>Talk it through</h2><p>Choose a personal reading topic and ask the studio before you decide.</p></Link></div>
    <div className="st-about-details"><section><h2>How the guides are written</h2><p>Card meanings follow the common Rider-Waite-Smith tradition. The studio's original set of 78 illustrations interprets the cards rather than reproducing a historic deck.</p><p>The guides are prompts for reflection. A card cannot confirm another person's thoughts or promise a future outcome.</p></section><section><h2>How personal readings work</h2><ol className="st-simple-steps"><li>Choose a topic and send your question.</li><li>The studio replies by email with the next step.</li><li>Confirm the scope and timing before you decide.</li></ol><p>Your written reading is delivered by email. Questions? <Link to="/contact">Contact the studio</Link> or read the <Link to="/faq">reading FAQ</Link>.</p></section></div>
    <p className="st-scope-note">For entertainment and personal reflection. Readings do not replace medical, legal, financial or mental health advice.</p>
  </div></div></Layout>
);
export const Contact: React.FC = () => (
  <Layout><div className="st-page"><div className="wrap">
    <span className="eyebrow">Contact</span><h1>Questions about a reading?</h1>
    <div className="st-contact-panel st-prose"><p>Email the studio with your question or the reading topic you are interested in. The studio replies personally with the next step, and you can ask anything before you decide.</p>
      <p><a className="btn" href="mailto:contact.thepsychicstudio@gmail.com">contact.thepsychicstudio@gmail.com</a></p>
      <p style={{ fontSize: 14 }}>Ordering is handled personally by email. Written readings are delivered by email once your inquiry is confirmed.</p></div>
  </div></div></Layout>
);
export const Blog: React.FC = () => {
  const posts = getBlogPosts().filter((p) => p.published !== false);
  const [category, setCategory] = useState('All stories');
  const [visibleCount, setVisibleCount] = useState(12);
  const categories = ['All stories', ...Array.from(new Set(posts.map((p) => p.category))).filter(Boolean)];
  const shown = category === 'All stories' ? posts : posts.filter((p) => p.category === category);
  return <Layout><div className="st-journal wrap">
    <div className="st-journal-intro"><span className="eyebrow">The studio journal</span><h1>A little clarity, one story at a time.</h1><p>Tarot guides, thoughtful questions and practical ways to reflect.</p></div>
    <div className="st-journal-filters" aria-label="Filter stories by category">{categories.map((c) => <button key={c} className={c === category ? 'active' : ''} aria-pressed={c === category} onClick={() => {setCategory(c);setVisibleCount(12);}}>{c}</button>)}</div>
    <div className="st-journal-layout"><section aria-label="Journal stories">{shown.slice(0,visibleCount).map((p, index) => <Link key={p.id} className="st-journal-row" to={`/blog/${p.slug || p.id}`}>
      <div className="st-journal-story"><span className="eyebrow">{p.category}</span><h2>{p.title}</h2><p>{p.excerpt}</p><span className="st-journal-meta">The Psychic Studio · {minutes(p.content)} min read</span></div>
      <div className={coverClass(p, "st-journal-thumb")}><CoverVisual p={p} eager={index<3} sizes="(max-width: 650px) calc(100vw - 44px), (max-width: 950px) calc(50vw - 46px), 354px" /></div>
    </Link>)}{shown.length > 0 && <div className="st-journal-pagination"><div className="st-journal-pagination-heading"><span></span><p aria-live="polite">{Math.min(visibleCount,shown.length)} of {shown.length} stories</p><span></span></div><div className="st-journal-pagination-track" aria-hidden="true"><span style={{width:`${Math.min(visibleCount/shown.length,1)*100}%`}} /></div>{shown.length > visibleCount ? <button type="button" className="st-journal-more" onClick={()=>setVisibleCount(n=>Math.min(n+12,shown.length))}>Explore more stories <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><path d="M12 5v14M5 12l7 7 7-7" /></svg></button> : <p className="st-journal-end">You're all caught up in this collection.</p>}</div>}{shown.length === 0 && <p>No stories in this category yet.</p>}</section>
    <aside className="st-journal-sidebar"><details className="st-journal-archive"><summary>All article titles</summary><ul>{posts.map(p=><li key={p.id}><Link to={`/blog/${p.slug || p.id}`}>{p.title}</Link></li>)}</ul></details><span className="eyebrow">Start here</span><h2>New to tarot?</h2><p>You do not need to know every card. Start with one question and one small reflection.</p><Link className="btn" to="/free-tarot">Try a free card →</Link><hr /><span className="eyebrow">Explore</span><ul><li><Link to="/tarot-card-meanings">All 78 card meanings ↗</Link></li><li><Link to="/shop">Choosing a reading ↗</Link></li><li><Link to="/faq">Questions to ask ↗</Link></li></ul></aside></div>
  </div></Layout>;
};
const CopyLink: React.FC = () => {
  const [done, setDone] = useState(false);
  return <button type="button" className="st-copy-link" onClick={() => { try { navigator.clipboard.writeText(window.location.href); } catch { /* clipboard unavailable */ } setDone(true); window.setTimeout(() => setDone(false), 2000); }}>{done ? 'Link copied' : 'Copy link'}</button>;
};
export const BlogPostPage: React.FC = () => {
  const { slug } = useParams();
  const p = getBlogPosts().find((x) => (x.slug === slug || x.id === slug) && x.published !== false);
  const headings = p ? Array.from(p.content.matchAll(/^#{2,3}\s+(.+)$/gm)).map((m) => m[1]) : [];
  return <Layout seo={false}><div className="st-journal st-journal-article wrap"><Link className="st-journal-back" to="/blog">← Back to the journal</Link>
    {p ? <><SEOHead title={p.metaTitle || `${p.title} | The Psychic Studio`} description={p.excerpt.slice(0, 155)} ogType="article" ogImage={p.coverImage.startsWith('https://') ? p.coverImage : `https://thepsychicstudio.com${p.coverImage}`} canonicalUrl={`https://thepsychicstudio.com/blog/${p.slug}`} schema={{"@context":"https://schema.org","@type":"BlogPosting",headline:p.title,description:p.excerpt,image:p.coverImage.startsWith('https://') ? p.coverImage : `https://thepsychicstudio.com${p.coverImage}`,author:{"@type":"Organization",name:"The Psychic Studio",url:"https://thepsychicstudio.com/about"},publisher:{"@id":"https://thepsychicstudio.com/#organization"},url:`https://thepsychicstudio.com/blog/${p.slug}`,datePublished:p.publishedDate,dateModified:p.publishedDate,mainEntityOfPage:`https://thepsychicstudio.com/blog/${p.slug}`}} />
    <div className="st-journal-article-head"><div><span className="eyebrow">{p.category} · {minutes(p.content)} min read</span><h1>{p.title}</h1><p>{p.excerpt}</p><div className="st-journal-meta">By The Psychic Studio · <time dateTime={p.publishedDate}>{p.publishedDate}</time> · <CopyLink /></div></div><figure className={coverClass(p, "st-journal-hero")}><CoverVisual p={p} eager sizes="(max-width: 900px) calc(100vw - 44px), 860px" /></figure></div>
    <div className="st-journal-reading"><nav className="st-journal-toc" aria-label="In this guide"><span className="eyebrow">In this guide</span>{headings.map((h, i) => <a key={`${h}-${i}`} href={`#${headingId(h)}`}>{h}</a>)}<hr /><Link to="/tarot-card-meanings">Explore card meanings ↗</Link></nav><article className="st-journal-copy"><Md text={p.content} /><div className="st-journal-note">Let the reading help you think. Your choices remain your own. This post is for reflection and entertainment, not medical, psychological, legal or financial advice.</div></article></div></> : <><SEOHead title="Post not found | The Psychic Studio" description="This journal story could not be found. Browse the latest tarot guides and reflections." /><h1>Post not found</h1></>}
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
