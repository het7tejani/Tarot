import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { Layout, ETSY } from './Layout';
import { FAQS } from '../data/readingsData';
import { getBlogPosts } from '../services/cmsStorage';
const inline = (t: string): React.ReactNode[] => {
  const out: React.ReactNode[] = []; const re = /\[([^\]]+)\]\(([^)]+)\)/g; let last = 0; let m: RegExpExecArray | null; let k = 0;
  while ((m = re.exec(t))) { if (m.index > last) out.push(t.slice(last, m.index)); out.push(m[2].startsWith('http') ? <a key={k++} href={m[2]} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--leaf)', textDecoration: 'underline' }}>{m[1]}</a> : <Link key={k++} to={m[2]} style={{ color: 'var(--leaf)', textDecoration: 'underline' }}>{m[1]}</Link>); last = m.index + m[0].length; }
  if (last < t.length) out.push(t.slice(last)); return out;
};
const Md: React.FC<{ text: string }> = ({ text }) => (<>{text.split(/\n{2,}/).map((b, i) => {
  const img = b.match(/^!\[([^\]]*)\]\(([^)]+)\)$/); if (img) return <img key={i} src={img[2]} alt={img[1]} loading="lazy" style={{ maxWidth: 280, borderRadius: 16, margin: '8px 0 22px', display: 'block', boxShadow: '0 8px 22px rgba(56,68,27,.2)' }} />;
  const h = b.match(/^(#{2,3})\s+(.*)$/); if (h) return <h2 key={i} style={{ fontSize: 28, margin: '30px 0 12px' }}>{h[2]}</h2>;
  return <p key={i}>{inline(b)}</p>; })}</>);
export const About: React.FC = () => (
  <Layout><div className="st-page"><div className="wrap">
    <span className="eyebrow">About</span><h1>Meet Daisy Hayes</h1>
    <div className="st-prose">
      <p>I'm Daisy Hayes, the reader behind The Psychic Studio. I use tarot as a way to slow down, ask better questions and see your situation from a new angle.</p>
      <p>This site is where I share free tarot draws, horoscopes, card meanings and guides. If you want something personal, my readings are in my Etsy shop.</p>
      <p>Readings are for entertainment and personal reflection. They don't replace medical, legal, financial or mental health advice.</p>
      <p><Link className="btn" to="/shop">See my readings</Link></p>
    </div>
  </div></div></Layout>
);
export const Contact: React.FC = () => (
  <Layout><div className="st-page"><div className="wrap">
    <span className="eyebrow">Contact</span><h1>Questions about a reading?</h1>
    <div className="st-prose"><p>The easiest way to reach me is through my Etsy shop. Send a message there with your question and I'll reply as soon as I can.</p>
      <p><a className="btn" href={ETSY} target="_blank" rel="noopener noreferrer">Message me on Etsy ↗</a></p>
      <p style={{ fontSize: 14 }}>This site doesn't take payments or contact forms. All orders go through Etsy.</p></div>
  </div></div></Layout>
);
export const Blog: React.FC = () => {
  const posts = getBlogPosts().filter((p) => p.published !== false);
  return (
    <Layout><div className="st-page"><div className="wrap">
      <span className="eyebrow">Blog</span><h1>Tarot guides and reflections</h1>
      <div className="st-grid c2">{posts.map((p) => (
        <Link key={p.id} className="st-card st-post" to={`/blog/${p.slug || p.id}`}>
          {p.coverImage && <img src={p.coverImage} alt="" loading="lazy" />}
          <div><span className="eyebrow">{p.category}</span><h3>{p.title}</h3><p>{p.excerpt}</p></div>
        </Link>))}</div>
    </div></div></Layout>
  );
};
export const BlogPostPage: React.FC = () => {
  const { slug } = useParams();
  const p = getBlogPosts().find((x) => x.slug === slug || x.id === slug);
  React.useEffect(() => { if (p) document.title = `${p.title} | The Psychic Studio`; }, [p]);
  return (
    <Layout seo={false}><div className="st-page"><div className="wrap">
      {p ? (<><span className="eyebrow">{p.category}</span><h1>{p.title}</h1>
        <div className="st-prose" style={{ marginTop: 20 }}><Md text={p.content} /></div></>)
        : <h1>Post not found</h1>}
      <p style={{ marginTop: 30 }}><Link className="btn ghost" to="/blog">← All posts</Link></p>
    </div></div></Layout>
  );
};
export const Faq: React.FC = () => (
  <Layout><div className="st-page"><div className="wrap">
    <span className="eyebrow">FAQ</span><h1>Questions about readings and ordering</h1>
    <div className="st-faq" style={{ maxWidth: 780, marginTop: 24 }}>{FAQS.map((f) => (<details key={f.question}><summary>{f.question}</summary><p>{f.answer}</p></details>))}</div>
    <p style={{ marginTop: 30 }}><Link className="btn" to="/contact">Still have a question?</Link></p>
  </div></div></Layout>
);
