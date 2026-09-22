import React from 'react';
import { ArrowDown, Sparkles, ShieldCheck, Clock, Star, Compass } from 'lucide-react';

interface HeroProps {
  onExploreClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreClick }) => {
  return (
    <section
      id="home"
      className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-radial from-[#FBF8F2] via-[#F8F4EC] to-[#F1EAE0]"
    >
      {/* Delicate background celestial elements in soft warm tones */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute top-16 left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full border border-[#E7DBC9]/60" />
        <div className="absolute top-28 left-1/2 -translate-x-1/2 w-[520px] h-[520px] rounded-full border border-dashed border-[#DECFBA]/70" />
        <div className="absolute top-44 left-1/2 -translate-x-1/2 w-[340px] h-[340px] rounded-full border border-[#D5C2AA]/50" />
      </div>

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Subtle decorative badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EFE6D8]/90 border border-[#DACBB8] text-[#7A5B3E] text-xs font-semibold tracking-wider uppercase mb-6 shadow-xs">
          <Sparkles className="w-3.5 h-3.5 text-[#B8860B]" />
          <span>Compassionate • Confidential • 24–48h Delivery</span>
        </div>

        {/* Welcoming Heading as required */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-semibold text-[#2E1F14] tracking-tight leading-[1.15] mb-6 max-w-4xl mx-auto">
          Insightful Tarot &amp; Psychic Readings
        </h1>

        {/* Brief Tagline explaining clarity, guidance, and spiritual direction */}
        <p className="text-lg sm:text-xl text-[#5F4837] font-serif-body italic leading-relaxed max-w-2xl mx-auto mb-10">
          Unveil the hidden currents shaping your journey. Receive gentle, intuitive spiritual clarity and honest guidance to illuminate your decisions with peace of mind.
        </p>

        {/* Primary CTA & Secondary Action */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <button
            type="button"
            onClick={onExploreClick}
            id="hero-explore-readings-btn"
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#3B291C] hover:bg-[#25170E] text-[#F8F5EE] font-semibold text-sm tracking-wide shadow-md hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2.5 group cursor-pointer"
          >
            <span>Explore Readings</span>
            <ArrowDown className="w-4 h-4 text-[#D8B45E] group-hover:translate-y-0.5 transition-transform" />
          </button>

          <a
            href="#how-it-works"
            className="w-full sm:w-auto px-7 py-4 rounded-full bg-[#EFE5D6] hover:bg-[#E5D7C2] text-[#422E1F] border border-[#D5C2AB] font-medium text-sm transition-all duration-200"
            id="hero-how-it-works-link"
          >
            How It Works
          </a>
        </div>

        {/* Value Badges Banner */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto pt-6 border-t border-[#E4D7C4]">
          <div className="flex items-center justify-center sm:justify-start gap-3 p-3 rounded-xl bg-[#FDFBF7]/60 border border-[#E9DFCF]">
            <div className="w-8 h-8 rounded-full bg-[#EFE6D8] flex items-center justify-center text-[#8C6925] shrink-0">
              <Clock className="w-4 h-4" />
            </div>
            <div className="text-left">
              <p className="text-xs font-semibold text-[#3B281B]">Swift Delivery</p>
              <p className="text-[11px] text-[#78604D]">Sent in 24–48 hours</p>
            </div>
          </div>

          <div className="flex items-center justify-center sm:justify-start gap-3 p-3 rounded-xl bg-[#FDFBF7]/60 border border-[#E9DFCF]">
            <div className="w-8 h-8 rounded-full bg-[#EFE6D8] flex items-center justify-center text-[#8C6925] shrink-0">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div className="text-left">
              <p className="text-xs font-semibold text-[#3B281B]">100% Confidential</p>
              <p className="text-[11px] text-[#78604D]">Private &amp; non-judgmental</p>
            </div>
          </div>

          <div className="flex items-center justify-center sm:justify-start gap-3 p-3 rounded-xl bg-[#FDFBF7]/60 border border-[#E9DFCF]">
            <div className="w-8 h-8 rounded-full bg-[#EFE6D8] flex items-center justify-center text-[#8C6925] shrink-0">
              <Star className="w-4 h-4 fill-[#B8860B]/20 text-[#B8860B]" />
            </div>
            <div className="text-left">
              <p className="text-xs font-semibold text-[#3B281B]">Trusted Etsy Shop</p>
              <p className="text-[11px] text-[#78604D]">Encrypted &amp; secure checkout</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
