import React from 'react';
import { ExternalLink, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
interface ContactPageProps { etsyBaseUrl: string; }
export const ContactPage: React.FC<ContactPageProps> = ({ etsyBaseUrl }) => (
  <div className="pt-32 pb-24 bg-[#FAF8F5] min-h-screen text-[#1f2322]">
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
      <p className="text-xs uppercase tracking-widest font-semibold text-[#73a89a] mb-4">The Psychic Studio</p>
      <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight mb-6">Questions about a reading?</h1>
      <p className="text-base text-[#1f2322]/70 leading-relaxed mb-10">Daisy Hayes runs The Psychic Studio. For a personal reading, delivery question, or an existing order, open our Etsy shop and use Etsy's contact option. If you have already ordered, message the shop from that order so your inquiry stays with your purchase.</p>
      <div className="rounded-2xl border border-[#1f2322]/10 p-7 bg-white/40">
        <MessageCircle className="w-7 h-7 text-[#73a89a] mb-5" />
        <h2 className="text-xl font-semibold mb-3">Contact the shop on Etsy</h2>
        <p className="text-sm text-[#1f2322]/65 leading-relaxed mb-6">Check the listing for the current price, delivery estimate, and what is included before ordering. Do not share payment details in a message.</p>
        <a href={etsyBaseUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#1f2322] text-white text-sm font-semibold hover:bg-[#73a89a]">Open Etsy shop <ExternalLink className="w-4 h-4" /></a>
      </div>
      <p className="text-xs text-[#1f2322]/55 mt-6">This site does not submit contact forms or take payment directly.</p>
      <Link to="/faq" className="inline-block text-sm font-semibold text-[#73a89a] mt-8">Read the frequently asked questions</Link>
    </div>
  </div>
);
