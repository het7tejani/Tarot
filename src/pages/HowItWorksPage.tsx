import React from 'react';
import { Feather, ShoppingBag, Mail, CheckCircle2, ShieldCheck, Clock, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import { HOW_IT_WORKS_STEPS } from '../data/readingsData';

interface HowItWorksPageProps {
  etsyBaseUrl: string;
}

export const HowItWorksPage: React.FC<HowItWorksPageProps> = ({ etsyBaseUrl }) => {
  return (
    <div className="pt-28 pb-24 bg-[#FAF6EE] min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#EFE4D2] border border-[#DDCBB5] text-[#7A5B3E] text-xs font-semibold uppercase tracking-widest mb-3">
            <span>Frictionless &amp; Secure Experience</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-display font-semibold text-[#2F1F14] mb-4">
            How Your Reading Works
          </h1>
          <p className="text-base sm:text-lg text-[#654D3B] font-serif-body italic leading-relaxed">
            From submitting your questions to receiving your personalized, in-depth illustrated PDF guide and high-resolution altar photo—explained step by step.
          </p>
        </div>

        {/* 3 Simple Steps Breakdown */}
        <div className="space-y-8 mb-16">
          {/* Step 1 */}
          <div className="bg-[#FFFDF9] rounded-2xl border border-[#E6D8C5] p-8 md:p-10 shadow-xs flex flex-col md:flex-row gap-8 items-start">
            <div className="w-16 h-16 rounded-2xl bg-[#F6EFE3] border border-[#E2D2BD] flex items-center justify-center text-[#8C6925] shrink-0">
              <span className="font-display font-bold text-2xl">01</span>
            </div>
            <div className="flex-1 space-y-3">
              <div className="flex items-center gap-2">
                <span className="text-xs uppercase tracking-wider font-semibold text-[#8C6925]">
                  Step One
                </span>
              </div>
              <h2 className="text-2xl font-display font-bold text-[#2E1E13]">
                Choose your reading topic &amp; focus
              </h2>
              <p className="text-sm sm:text-base text-[#57402F] leading-relaxed">
                Browse our curated reading categories. Whether you need insights into Love &amp; Relationships, vocational direction in Career &amp; Life Path, money mindset shifts in Financial Guidance, or a complete 12-month cosmic forecast in the Year Ahead spread, select the topic that aligns with your question.
              </p>
              <div className="pt-2 flex flex-wrap gap-2 text-xs text-[#6A5240]">
                <span className="px-3 py-1 rounded-full bg-[#F5ECDF] border border-[#E8DCcb]">5 targeted spreads</span>
                <span className="px-3 py-1 rounded-full bg-[#F5ECDF] border border-[#E8DCcb]">Specific or general questions</span>
              </div>
            </div>
          </div>

          {/* Step 2 */}
          <div className="bg-[#FFFDF9] rounded-2xl border border-[#E6D8C5] p-8 md:p-10 shadow-xs flex flex-col md:flex-row gap-8 items-start">
            <div className="w-16 h-16 rounded-2xl bg-[#F6EFE3] border border-[#E2D2BD] flex items-center justify-center text-[#8C6925] shrink-0">
              <span className="font-display font-bold text-2xl">02</span>
            </div>
            <div className="flex-1 space-y-3">
              <div className="flex items-center gap-2">
                <span className="text-xs uppercase tracking-wider font-semibold text-[#8C6925]">
                  Step Two
                </span>
              </div>
              <h2 className="text-2xl font-display font-bold text-[#2E1E13]">
                Complete your order via our secure Etsy shop
              </h2>
              <p className="text-sm sm:text-base text-[#57402F] leading-relaxed">
                Clicking "Buy on Etsy" routes you directly to the designated listing. When checking out, use the <strong>Personalization box</strong> right on the Etsy checkout page to write:
              </p>
              <ul className="space-y-1.5 text-sm text-[#57402F] list-disc list-inside bg-[#FAF6EE] p-4 rounded-xl border border-[#EBDDCB]">
                <li>Your preferred first name</li>
                <li>Your date of birth (optional, for astrological alignment)</li>
                <li>Specific questions or situations you want your reader to concentrate on</li>
              </ul>
              <p className="text-xs text-[#7A614E]">
                *If you ever forget to fill in the personalization box, simply message us directly through Etsy messages after purchasing!
              </p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="bg-[#FFFDF9] rounded-2xl border border-[#E6D8C5] p-8 md:p-10 shadow-xs flex flex-col md:flex-row gap-8 items-start">
            <div className="w-16 h-16 rounded-2xl bg-[#F6EFE3] border border-[#E2D2BD] flex items-center justify-center text-[#8C6925] shrink-0">
              <span className="font-display font-bold text-2xl">03</span>
            </div>
            <div className="flex-1 space-y-3">
              <div className="flex items-center gap-2">
                <span className="text-xs uppercase tracking-wider font-semibold text-[#8C6925]">
                  Step Three
                </span>
              </div>
              <h2 className="text-2xl font-display font-bold text-[#2E1E13]">
                Receive your detailed reading in 24–48 hours
              </h2>
              <p className="text-sm sm:text-base text-[#57402F] leading-relaxed">
                Within 24 to 48 hours of purchase, you will receive a message directly in your Etsy inbox with:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div className="p-3 rounded-xl bg-[#FAF6EE] border border-[#EBDDCB] flex items-start gap-2 text-xs text-[#523C2B]">
                  <CheckCircle2 className="w-4 h-4 text-[#9E741F] shrink-0 mt-0.5" />
                  <span>High-resolution photos of your actual hand-spread physical cards on our altar</span>
                </div>
                <div className="p-3 rounded-xl bg-[#FAF6EE] border border-[#EBDDCB] flex items-start gap-2 text-xs text-[#523C2B]">
                  <CheckCircle2 className="w-4 h-4 text-[#9E741F] shrink-0 mt-0.5" />
                  <span>Full illustrated PDF reading report (900 to 2,500+ words depending on spread)</span>
                </div>
                <div className="p-3 rounded-xl bg-[#FAF6EE] border border-[#EBDDCB] flex items-start gap-2 text-xs text-[#523C2B]">
                  <CheckCircle2 className="w-4 h-4 text-[#9E741F] shrink-0 mt-0.5" />
                  <span>Permanent access stored securely in your Etsy digital purchase history</span>
                </div>
                <div className="p-3 rounded-xl bg-[#FAF6EE] border border-[#EBDDCB] flex items-start gap-2 text-xs text-[#523C2B]">
                  <CheckCircle2 className="w-4 h-4 text-[#9E741F] shrink-0 mt-0.5" />
                  <span>1 free follow-up clarification message if you need added reassurance</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Direct Action banner */}
        <div className="mt-16 p-8 rounded-2xl bg-[#EFE5D6] border border-[#DAC7B0] text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-xl font-display font-bold text-[#2E1E13] mb-1">
              Ready to find clarity?
            </h3>
            <p className="text-xs sm:text-sm text-[#614A38]">
              Select a reading today and take the first step toward spiritual reassurance.
            </p>
          </div>
          <div className="flex gap-3">
            <Link
              to="/readings"
              className="px-6 py-3.5 rounded-full bg-[#3B291C] hover:bg-[#25170E] text-[#F8F5EE] text-xs font-semibold tracking-wide transition-colors shadow-xs"
            >
              Browse Readings
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
