import React from 'react';
import { Star, CheckCircle } from 'lucide-react';
import { TESTIMONIALS } from '../data/readingsData';

export const Testimonials: React.FC = () => {
  return (
    <section className="py-20 bg-[#FAF7F0] border-t border-[#E6D9C8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EADDCB] text-[#7A5B3E] text-xs font-semibold uppercase tracking-widest mb-3">
            <Star className="w-3.5 h-3.5 fill-[#B8860B] text-[#B8860B]" />
            <span>Verified Etsy Client Words</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-semibold text-[#2D1D13] mb-3">
            Words of Gratitude &amp; Light
          </h2>
          <p className="text-sm sm:text-base text-[#614936] font-serif-body italic">
            Over 1,200+ readings fulfilled with a 5.0-star average rating on Etsy.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.id}
              className="bg-[#FFFDF9] p-7 rounded-2xl border border-[#E7D9C6] flex flex-col justify-between shadow-xs"
            >
              <div>
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#B8860B] text-[#B8860B]" />
                  ))}
                </div>
                <p className="text-sm text-[#4E3828] font-serif-body italic leading-relaxed mb-6">
                  "{t.review}"
                </p>
              </div>

              <div className="pt-4 border-t border-[#F2E7DA] flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-[#2D1D13]">{t.clientName}</h4>
                  <p className="text-[11px] text-[#7D6450]">{t.location}</p>
                </div>
                <div className="flex items-center gap-1 text-[11px] text-[#8C6925] font-medium bg-[#F6EFE3] px-2 py-0.5 rounded-md">
                  <CheckCircle className="w-3 h-3" />
                  <span>{t.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
