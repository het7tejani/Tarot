import React, { useState } from 'react';
import { ChevronDown, HelpCircle, Mail, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';
import { FAQS } from '../data/readingsData';

interface FAQPageProps {
  etsyBaseUrl: string;
}

export const FAQPage: React.FC<FAQPageProps> = ({ etsyBaseUrl }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'ordering' | 'reading' | 'delivery'>('all');

  const toggleIndex = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const filteredFaqs = selectedCategory === 'all'
    ? FAQS
    : FAQS.filter(f => f.category === selectedCategory);

  return (
    <div className="pt-32 pb-24 bg-[#F5EFEB] min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#EADCC9] border border-[#D5C1A9] text-[#7A5A3D] text-xs font-semibold uppercase tracking-widest mb-3">
            <span>Knowledge &amp; Reassurance</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-display font-semibold text-[#2D1D12] mb-3">
            Frequently Asked Questions
          </h1>
          <p className="text-base sm:text-lg text-[#614A38] font-serif-body italic">
            Answers regarding our Etsy checkout, delivery format, preparation, and follow-up support.
          </p>

          {/* Category Filter */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                selectedCategory === 'all'
                  ? 'bg-[#3B291C] text-[#FAF6EE] shadow-xs'
                  : 'bg-[#EFE5D6] text-[#553E2E] hover:bg-[#E5D7C2] border border-[#D5C2AB]'
              }`}
            >
              All Questions
            </button>
            <button
              onClick={() => setSelectedCategory('ordering')}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                selectedCategory === 'ordering'
                  ? 'bg-[#3B291C] text-[#FAF6EE] shadow-xs'
                  : 'bg-[#EFE5D6] text-[#553E2E] hover:bg-[#E5D7C2] border border-[#D5C2AB]'
              }`}
            >
              Ordering on Etsy
            </button>
            <button
              onClick={() => setSelectedCategory('delivery')}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                selectedCategory === 'delivery'
                  ? 'bg-[#3B291C] text-[#FAF6EE] shadow-xs'
                  : 'bg-[#EFE5D6] text-[#553E2E] hover:bg-[#E5D7C2] border border-[#D5C2AB]'
              }`}
            >
              Delivery &amp; Format
            </button>
            <button
              onClick={() => setSelectedCategory('reading')}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                selectedCategory === 'reading'
                  ? 'bg-[#3B291C] text-[#FAF6EE] shadow-xs'
                  : 'bg-[#EFE5D6] text-[#553E2E] hover:bg-[#E5D7C2] border border-[#D5C2AB]'
              }`}
            >
              The Reading Experience
            </button>
          </div>
        </div>

        <div className="space-y-3">
          {filteredFaqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="border-b border-[#E8DDCF]/80 pb-3"
              >
                <button
                  type="button"
                  onClick={() => toggleIndex(index)}
                  className="w-full py-4 text-left flex items-center justify-between gap-4 focus:outline-none cursor-pointer group"
                  aria-expanded={isOpen}
                >
                  <span className="font-serif font-semibold text-base sm:text-lg text-[#2A1B3D] group-hover:text-[#C9A84C] transition-colors">
                    {faq.question}
                  </span>
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center text-[#785C42] shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="pb-4 pt-1 text-sm text-[#5B4332] leading-relaxed">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Still have questions banner */}
        <div className="mt-14 py-8 border-t border-[#E8DDCF]/80 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <div>
            <h3 className="text-lg font-serif font-semibold text-[#2F1F14] mb-1">
              Still have questions before placing an order?
            </h3>
            <p className="text-xs sm:text-sm text-[#614A39]">
              Message us directly and we will gladly guide you to the perfect reading spread.
            </p>
          </div>
          <div className="flex gap-3">
            <Link
              to="/contact"
              className="px-6 py-3 rounded-full bg-[#3B291C] hover:bg-[#25170E] text-[#F8F5EE] text-xs font-semibold tracking-wide flex items-center gap-2 shrink-0 transition-colors"
            >
              <Mail className="w-4 h-4 text-[#D8B45E]" />
              <span>Contact Page</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
