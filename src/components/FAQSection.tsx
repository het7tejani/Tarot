import React, { useState } from 'react';
import { ChevronDown, HelpCircle, Mail, MessageSquare } from 'lucide-react';
import { FAQS } from '../data/readingsData';

export const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleIndex = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 md:py-28 bg-[#F5EFEB] border-t border-[#E6D9C8]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EADCC9] border border-[#D5C1A9] text-[#7A5A3D] text-xs font-semibold uppercase tracking-widest mb-3">
            <span>Questions &amp; Clarity</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-semibold text-[#2D1D12] mb-3">
            Frequently Asked Questions
          </h2>
          <p className="text-sm sm:text-base text-[#614A38] font-serif-body italic">
            Everything you need to know about placing an order and receiving your sacred reading.
          </p>
        </div>

        <div className="space-y-3.5">
          {FAQS.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="rounded-2xl bg-[#FFFDF9] border border-[#E5D7C4] overflow-hidden transition-all duration-200"
              >
                <button
                  type="button"
                  onClick={() => toggleIndex(index)}
                  className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 focus:outline-none cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span className="font-display font-semibold text-base sm:text-lg text-[#322115]">
                    {faq.question}
                  </span>
                  <div
                    className={`w-7 h-7 rounded-full bg-[#F5ECDF] flex items-center justify-center text-[#785C42] shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 bg-[#E8DAC6]' : ''
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-5 pt-1 text-sm text-[#5B4332] leading-relaxed border-t border-[#F3E9DD]">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Direct contact box */}
        <div
          id="contact"
          className="mt-14 p-8 rounded-2xl bg-[#ECE1CF] border border-[#DBC8B0] flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left"
        >
          <div>
            <h3 className="text-lg font-display font-semibold text-[#2F1F14] mb-1">
              Have a custom request or specific question?
            </h3>
            <p className="text-xs sm:text-sm text-[#614A39]">
              Reach out prior to ordering. We are happy to confirm which spread best aligns with your inquiry.
            </p>
          </div>
          <a
            href="mailto:guidance@celestialarcana.com?subject=Tarot%20Reading%20Inquiry"
            className="px-6 py-3 rounded-full bg-[#3B291C] hover:bg-[#25170E] text-[#F8F5EE] text-xs font-semibold tracking-wide flex items-center gap-2 shrink-0 transition-colors shadow-xs"
          >
            <Mail className="w-4 h-4 text-[#D8B45E]" />
            <span>Email Reader</span>
          </a>
        </div>
      </div>
    </section>
  );
};
