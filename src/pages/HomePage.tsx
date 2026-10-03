import React from 'react';
import { ArrowRight, ExternalLink, Heart, Compass, Sparkles, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { READINGS_DATA } from '../data/readingsData';
import { ReadingTopic } from '../types';

interface HomePageProps {
  onSelectReading: (reading: ReadingTopic) => void;
  getEtsyUrl: (reading: ReadingTopic) => string;
}

const questions = [
  { label: 'Love & relationships', search: 'love', icon: Heart, text: 'Explore a connection, changing feelings, or what you want from love.' },
  { label: 'Life direction', search: 'future', icon: Compass, text: 'Reflect on a crossroads, a new chapter, or the choices ahead.' },
  { label: 'Spiritual guidance', search: 'intuition', icon: Sparkles, text: 'Make space for self-reflection, intuition, and a fresh perspective.' },
];
const faqs = [
  ['Is the free tarot reading really free?', 'Yes. Draw one or three cards in your browser without signing up or entering payment details. It is an automated reflection tool using the 22 Major Arcana, not a personal consultation.'],
  ['How do I order a personal reading?', 'Choose a reading and open its Etsy listing. Review the current price, what is included, delivery estimate, and shop policies before placing an order.'],
  ['Can a reading guarantee what will happen?', 'No. Tarot and psychic readings are for entertainment and personal reflection. They cannot guarantee a future outcome or replace medical, legal, financial, or mental health advice.'],
  ['Which reading should I choose?', 'Start with the question that matters most to you. The reading details describe the focus and questions covered. If you are unsure, contact the shop through Etsy before ordering.'],
];

export const HomePage: React.FC<HomePageProps> = ({ onSelectReading, getEtsyUrl }) => (
  <div className="pt-28 md:pt-32 bg-[#FAF8F5] text-[#1f2322]">
    <section className="relative pt-12 pb-16 md:pt-20 md:pb-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <p className="text-xs uppercase tracking-widest text-[#73a89a] font-semibold mb-5">The Psychic Studio</p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight leading-[1.12] mb-6">Online psychic &amp; tarot readings for your next chapter.</h1>
          <p className="text-base sm:text-lg text-[#1f2322]/70 leading-relaxed mb-8 max-w-xl">Questions about love, life, or where to go next? Explore readings focused on what is on your mind, or start with a free tarot draw at your own pace.</p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link to="/readings" className="px-7 py-3.5 rounded-full bg-[#1f2322] text-[#FAF8F5] hover:bg-[#73a89a] font-semibold text-sm flex items-center justify-center gap-2">Find your reading <ArrowRight className="w-4 h-4" /></Link>
            <Link to="/free-tarot" className="px-7 py-3.5 rounded-full border border-[#1f2322]/20 hover:bg-[#1f2322]/5 font-semibold text-sm text-center">Try free tarot</Link>
          </div>
          <p className="text-xs text-[#1f2322]/55 mt-5">No sign-up for free tarot. Personal readings ordered through Etsy.</p>
        </div>
        <div className="relative rounded-3xl bg-[#f0ebe4] border border-[#1f2322]/10 p-8 sm:p-12 flex items-center justify-center min-h-80" aria-label="Rider-Waite tarot card artwork">
          <img src="/tarot/the_star.jpg" alt="The Star tarot card" className="w-28 sm:w-36 rounded-lg shadow-lg -rotate-12 translate-x-3" />
          <img src="/tarot/the_sun.jpg" alt="The Sun tarot card" className="w-28 sm:w-36 rounded-lg shadow-xl rotate-6 -translate-x-3" />
        </div>
      </div>
    </section>

    <section className="py-14 border-t border-[#1f2322]/10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl font-semibold mb-3">What is on your mind?</h2>
        <p className="text-sm text-[#1f2322]/65 mb-8">You do not need to know a tarot spread to find a place to start.</p>
        <div className="grid md:grid-cols-3 gap-5">{questions.map(({ label, search, icon: Icon, text }) => (
          <Link key={search} to={`/readings?search=${search}`} className="group rounded-2xl p-6 border border-[#1f2322]/10 hover:border-[#73a89a] transition-colors bg-white/40">
            <Icon className="w-6 h-6 text-[#73a89a] mb-5" /><h3 className="font-semibold text-lg mb-2">{label}</h3><p className="text-sm text-[#1f2322]/65 leading-relaxed mb-5">{text}</p><span className="text-xs font-semibold flex gap-2 items-center">Explore readings <ArrowRight className="w-4 h-4" /></span>
          </Link>
        ))}</div>
      </div>
    </section>

    <section className="py-14 border-t border-[#1f2322]/10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap justify-between items-end gap-4 mb-8"><div><h2 className="text-2xl sm:text-3xl font-semibold mb-3">Explore personal readings</h2><p className="text-sm text-[#1f2322]/65 max-w-2xl">Read the details before you choose. Etsy shows the current price, available offers, delivery estimate, and buyer reviews.</p></div><Link to="/readings" className="text-sm font-semibold text-[#73a89a]">View all readings</Link></div>
        <div className="grid md:grid-cols-3 gap-6">{READINGS_DATA.slice(0, 3).map(reading => (
          <article key={reading.id} className="rounded-2xl p-6 border border-[#1f2322]/10 bg-white/40 flex flex-col">
            <p className="text-xs text-[#73a89a] uppercase tracking-wide mb-3">Personal reading</p><h3 className="text-xl font-semibold leading-snug mb-3">{reading.title.split('|')[0].trim()}</h3><p className="text-sm text-[#1f2322]/65 leading-relaxed flex-1 mb-6">{reading.tagline}</p>
            <p className="text-xs text-[#1f2322]/55 mb-4">See current price and delivery on Etsy</p>
            <div className="flex flex-wrap gap-3"><button onClick={() => onSelectReading(reading)} className="px-4 py-2 rounded-full border border-[#1f2322]/15 text-xs font-semibold cursor-pointer">Reading details</button><a href={getEtsyUrl(reading)} target="_blank" rel="noopener noreferrer" className="px-4 py-2 rounded-full bg-[#1f2322] text-white text-xs font-semibold inline-flex gap-2 items-center hover:bg-[#73a89a]">View on Etsy <ExternalLink className="w-3 h-3" /></a></div>
          </article>
        ))}</div>
      </div>
    </section>

    <section className="py-14 border-t border-[#1f2322]/10" id="how-it-works">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8"><h2 className="text-2xl sm:text-3xl font-semibold mb-8">A simple way to get started</h2><div className="grid md:grid-cols-3 gap-8">{[
        ['01', 'Choose your focus', 'Browse by question and check what the reading covers.'],
        ['02', 'Review the Etsy listing', 'Confirm the price, format, delivery estimate, and shop policies.'],
        ['03', 'Order through Etsy', 'Follow the listing instructions for your question and check your Etsy order for updates.'],
      ].map(([number, title, text]) => <div key={number}><span className="text-sm text-[#73a89a] font-semibold">{number}</span><h3 className="font-semibold text-lg mt-3 mb-2">{title}</h3><p className="text-sm text-[#1f2322]/65 leading-relaxed">{text}</p></div>)}</div></div>
    </section>

    <section className="py-14 bg-[#f0ebe4] border-y border-[#1f2322]/10"><div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-10 items-center"><div><p className="text-xs uppercase tracking-widest text-[#73a89a] font-semibold mb-3">A quiet moment for yourself</p><h2 className="text-2xl sm:text-3xl font-semibold mb-4">Your free tarot reading starts here.</h2><p className="text-sm text-[#1f2322]/65 leading-relaxed mb-6">Draw one card for a daily reflection or three cards for a past, present, and future spread. Explore upright and reversed meanings from the 22 Major Arcana.</p><Link to="/free-tarot" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#1f2322] text-white font-semibold text-sm">Draw your cards <ArrowRight className="w-4 h-4" /></Link></div><div className="space-y-5">{['Free to use, no payment details', 'No account or sign-up required', 'Automated card draw, separate from a personal reading'].map(text => <p key={text} className="flex items-start gap-3 text-sm"><CheckCircle2 className="w-5 h-5 text-[#73a89a] shrink-0" />{text}</p>)}</div></div></section>

    <section className="py-14"><div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8"><h2 className="text-2xl sm:text-3xl font-semibold mb-8">Before your first reading</h2>{faqs.map(([question, answer]) => <details key={question} className="border-b border-[#1f2322]/10 py-5"><summary className="font-semibold cursor-pointer text-sm sm:text-base">{question}</summary><p className="text-sm text-[#1f2322]/65 leading-relaxed mt-3">{answer}</p></details>)}<Link to="/faq" className="inline-block text-sm font-semibold text-[#73a89a] mt-6">More questions &amp; answers</Link></div></section>
  </div>
);
