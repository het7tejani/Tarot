import React from 'react';
import { Link } from 'react-router-dom';
export const AboutPage: React.FC = () => (
  <div className="pt-32 pb-24 bg-[#FAF8F5] text-[#1f2322] min-h-screen"><div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
    <p className="text-xs uppercase tracking-widest text-[#73a89a] font-semibold mb-4">Our approach</p>
    <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight mb-6">About The Psychic Studio</h1>
    <p className="text-lg text-[#1f2322]/70 leading-relaxed mb-8">A place to explore tarot, personal readings, and the questions you are carrying about love, life direction, and your next chapter. The Psychic Studio is owned and run.</p>
    <div className="space-y-8 border-t border-[#1f2322]/10 pt-8">
      <section><h2 className="text-xl font-semibold mb-3">About The Psychic Studio</h2><p className="text-sm leading-relaxed text-[#1f2322]/65">She offers tarot and psychic readings through the shop and writes the guides on this site. Read her articles on the <Link to="/blog" className="text-[#73a89a] font-semibold">blog</Link>.</p></section>
      <section><h2 className="text-xl font-semibold mb-3">Start with your question</h2><p className="text-sm leading-relaxed text-[#1f2322]/65">Choose a reading by its focus, then review the current Etsy listing for the reader, format, price, and delivery details. Ask the shop if you need help deciding before you order.</p></section>
      <section><h2 className="text-xl font-semibold mb-3">Space for reflection, not certainty</h2><p className="text-sm leading-relaxed text-[#1f2322]/65">Readings are for entertainment and personal reflection. No reading can guarantee another person's feelings or a future outcome. Your choices remain your own, and professional support should guide medical, legal, financial, or mental health decisions.</p></section>
      <section><h2 className="text-xl font-semibold mb-3">Try tarot at your own pace</h2><p className="text-sm leading-relaxed text-[#1f2322]/65">Our free tool draws from the 22 Major Arcana and shares upright and reversed interpretations. It is an automated card draw, separate from a personal reading ordered through Etsy.</p></section>
    </div><div className="flex flex-wrap gap-4 mt-10"><Link to="/readings" className="px-6 py-3 rounded-full bg-[#1f2322] text-white text-sm font-semibold">Explore readings</Link><Link to="/free-tarot" className="px-6 py-3 rounded-full border border-[#1f2322]/20 text-sm font-semibold">Try free tarot</Link></div>
  </div></div>
);
