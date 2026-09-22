import React from 'react';
import { Heart, Lock, Feather, ShoppingBag, Mail, Sparkles, CheckCircle2 } from 'lucide-react';
import { HOW_IT_WORKS_STEPS, CORE_VALUES } from '../data/readingsData';

export const AboutAndProcess: React.FC = () => {
  return (
    <section id="about" className="py-20 md:py-28 bg-[#FAF6EE]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* About: 2-Column Approach Section as required */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center mb-24">
          {/* Left Column: Mission & Approach */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EFE4D2] border border-[#DDCBB5] text-[#7A5B3E] text-xs font-semibold uppercase tracking-widest">
              <span>Our Philosophy &amp; Method</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-display font-semibold text-[#2E1E13] leading-tight">
              An Intuitive Sanctuary Grounded in Compassion &amp; Truth
            </h2>

            <p className="text-base text-[#553E2D] leading-relaxed">
              At Celestial Arcana, tarot is not used as fatalistic fortune-telling. Instead, we approach each spread as an enlightened mirror—a sacred dialogue between your subconscious, universal archetypes, and spiritual guides.
            </p>

            <p className="text-base text-[#553E2D] leading-relaxed">
              Every card is physically cleansed with white sage and cedar before being pulled by hand onto consecrated linen. We do not generate generic computer interpretations or automated scripts; every word is channeled, typed, and formatted by a devoted psychic reader with over a decade of tarot practice.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row gap-4">
              <div className="p-4 rounded-xl bg-[#FFFDF9] border border-[#E8DCcb] flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#F3EADE] flex items-center justify-center text-[#8C6925] shrink-0">
                  <Feather className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#322115]">Hand-Pulled Cards</p>
                  <p className="text-xs text-[#755D4A]">Physical decks, zero automated bots</p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#FFFDF9] border border-[#E8DCcb] flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#F3EADE] flex items-center justify-center text-[#8C6925] shrink-0">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#322115]">Clear &amp; Actionable</p>
                  <p className="text-xs text-[#755D4A]">Practical steps for peace of mind</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: 3 Core Values as explicitly highlighted */}
          <div className="lg:col-span-6 space-y-4">
            <h3 className="text-sm uppercase tracking-widest font-semibold text-[#8C6925] mb-2">
              Our Non-Negotiable Commitments
            </h3>

            {/* Value 1: Compassionate */}
            <div className="p-6 rounded-2xl bg-[#FFFDF9] border border-[#E5D8C6] shadow-xs hover:border-[#CBB79C] transition-all">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-9 h-9 rounded-lg bg-[#F8EFE3] text-[#8C6925] flex items-center justify-center">
                  <Heart className="w-5 h-5" />
                </div>
                <h4 className="text-lg font-display font-semibold text-[#301F14]">
                  {CORE_VALUES[0].title}
                </h4>
              </div>
              <p className="text-sm text-[#5B4332] leading-relaxed">
                {CORE_VALUES[0].description}
              </p>
            </div>

            {/* Value 2: Confidential */}
            <div className="p-6 rounded-2xl bg-[#FFFDF9] border border-[#E5D8C6] shadow-xs hover:border-[#CBB79C] transition-all">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-9 h-9 rounded-lg bg-[#F8EFE3] text-[#8C6925] flex items-center justify-center">
                  <Lock className="w-5 h-5" />
                </div>
                <h4 className="text-lg font-display font-semibold text-[#301F14]">
                  {CORE_VALUES[1].title}
                </h4>
              </div>
              <p className="text-sm text-[#5B4332] leading-relaxed">
                {CORE_VALUES[1].description}
              </p>
            </div>

            {/* Value 3: Honest */}
            <div className="p-6 rounded-2xl bg-[#FFFDF9] border border-[#E5D8C6] shadow-xs hover:border-[#CBB79C] transition-all">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-9 h-9 rounded-lg bg-[#F8EFE3] text-[#8C6925] flex items-center justify-center">
                  <Feather className="w-5 h-5" />
                </div>
                <h4 className="text-lg font-display font-semibold text-[#301F14]">
                  {CORE_VALUES[2].title}
                </h4>
              </div>
              <p className="text-sm text-[#5B4332] leading-relaxed">
                {CORE_VALUES[2].description}
              </p>
            </div>
          </div>
        </div>

        {/* How We Read / How It Works: The 3 Simple Steps */}
        <div id="how-it-works" className="pt-16 border-t border-[#E6D9C8]">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EFE4D2] border border-[#DDCBB5] text-[#7A5B3E] text-xs font-semibold uppercase tracking-widest mb-3">
              <span>Simple 3-Step Process</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-display font-semibold text-[#2F1F14] mb-3">
              How Your Reading Works
            </h2>
            <p className="text-sm sm:text-base text-[#654D3B] font-serif-body italic">
              From inquiry to enlightenment in three frictionless, clear steps.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {HOW_IT_WORKS_STEPS.map((step, idx) => (
              <div
                key={step.stepNumber}
                id={`process-step-${idx + 1}`}
                className="relative bg-[#FFFDF9] p-8 rounded-2xl border border-[#E5D7C4] shadow-xs flex flex-col justify-between"
              >
                {/* Step indicator */}
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-display font-bold text-3xl text-[#9E741F]/50">
                      {step.stepNumber}
                    </span>
                    <div className="w-10 h-10 rounded-full bg-[#F6EFE3] border border-[#E2D2BD] flex items-center justify-center text-[#8C6925]">
                      {idx === 0 && <Feather className="w-5 h-5" />}
                      {idx === 1 && <ShoppingBag className="w-5 h-5" />}
                      {idx === 2 && <Mail className="w-5 h-5" />}
                    </div>
                  </div>

                  <h3 className="text-lg font-display font-semibold text-[#2E1E13] mb-3">
                    {step.title}
                  </h3>

                  <p className="text-sm text-[#5B4331] leading-relaxed">
                    {step.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#F2E8DC] flex items-center gap-2 text-xs font-medium text-[#7C624D]">
                  <CheckCircle2 className="w-4 h-4 text-[#8C6925]" />
                  <span>
                    {idx === 0 && 'Select your focus or question'}
                    {idx === 1 && 'Encrypted Etsy buyer protection'}
                    {idx === 2 && 'Delivered in 24–48 hours'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
