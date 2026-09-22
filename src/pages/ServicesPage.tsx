import React, { useState } from 'react';
import { Sparkles, Compass, HeartHandshake, ShieldCheck, ArrowRight, ExternalLink, CheckCircle2 } from 'lucide-react';
import { SERVICES_CATEGORIES } from '../data/readingsData';
import { Link } from 'react-router-dom';

interface ServicesPageProps {
  etsyBaseUrl: string;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({ etsyBaseUrl }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const filteredCategories = activeCategory === 'all'
    ? SERVICES_CATEGORIES
    : SERVICES_CATEGORIES.filter(c => c.id === activeCategory);

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Compass':
        return <Compass className="w-6 h-6 text-[#C9A84C]" />;
      case 'Sparkles':
        return <Sparkles className="w-6 h-6 text-[#C9A84C]" />;
      case 'HeartHandshake':
        return <HeartHandshake className="w-6 h-6 text-[#C9A84C]" />;
      default:
        return <ShieldCheck className="w-6 h-6 text-[#C9A84C]" />;
    }
  };

  return (
    <div className="pt-32 pb-24 bg-[#FAF8F5] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FDF6EC] border border-[#E8D5A0] text-[#7C5F1E] text-xs font-semibold uppercase tracking-widest mb-3">
            <span>Holistic Spectrum for Mind, Body &amp; Spirit</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-serif font-bold text-[#2A1B3D] mb-4">
            Our Holistic Services
          </h1>
          <p className="text-base sm:text-lg text-[#554763] font-serif italic leading-relaxed">
            Over 30 specialized healing methods, intuitive divination systems, and therapeutic modalities to support your evolutionary path. Available in-person and remotely worldwide.
          </p>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                activeCategory === 'all'
                  ? 'bg-[#2A1B3D] text-[#FFFFFF] shadow-xs'
                  : 'bg-[#FDF6EC] text-[#7C5F1E] border border-[#E8D5A0] hover:bg-[#F8EEDD]'
              }`}
            >
              All 4 Pillars
            </button>
            {SERVICES_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                  activeCategory === cat.id
                    ? 'bg-[#2A1B3D] text-[#FFFFFF] shadow-xs'
                    : 'bg-[#FDF6EC] text-[#7C5F1E] border border-[#E8D5A0] hover:bg-[#F8EEDD]'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Categories Stack */}
        <div className="space-y-20">
          {filteredCategories.map((category) => (
            <div
              key={category.id}
              id={category.id}
              className="py-6 border-b border-[#E8DDCF]/80 pb-16 last:border-b-0"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 mb-6 border-b border-[#F5EFE6]">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#FDF6EC] flex items-center justify-center shrink-0">
                    {getCategoryIcon(category.iconName)}
                  </div>
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-[#C9A84C]">
                      {category.badge}
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#2A1B3D]">
                      {category.name}
                    </h2>
                    <p className="text-xs sm:text-sm text-[#705D7F] mt-1 font-serif italic">
                      {category.subtitle}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  {category.id === 'fortune-guidance' ? (
                    <Link
                      to="/readings"
                      className="px-5 py-2.5 rounded-full bg-[#2A1B3D] hover:bg-[#3D2756] text-[#FFFFFF] text-xs font-semibold flex items-center gap-1.5 transition-colors"
                    >
                      <span>Explore Tarot Spreads</span>
                      <ArrowRight className="w-3.5 h-3.5 text-[#C9A84C]" />
                    </Link>
                  ) : (
                    <a
                      href={`https://wa.me/919872771591?text=${encodeURIComponent(`Hi The Tarot Company, I would like to inquire about ${category.name} sessions.`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-5 py-2.5 rounded-full bg-[#C9A84C] hover:bg-[#B3933C] text-[#2A1B3D] text-xs font-semibold flex items-center gap-1.5 transition-colors"
                    >
                      <span>Book Session via WhatsApp</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>

              <p className="text-sm sm:text-base text-[#4C3E56] leading-relaxed mb-8 max-w-3xl">
                {category.description}
              </p>

              {/* Items Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {category.items.map((item, i) => (
                  <div
                    key={i}
                    className="py-2"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-serif font-bold text-lg text-[#2A1B3D]">
                        {item.title}
                      </h3>
                      {item.duration && (
                        <span className="text-[11px] font-medium text-[#7C5F1E]">
                          {item.duration}
                        </span>
                      )}
                    </div>
                    <p className="text-xs sm:text-sm text-[#5C4C66] leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Flagship Callout Banner */}
        <div className="mt-16 p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-[#2A1B3D] to-[#3D2756] text-[#F5EDE0] flex flex-col md:flex-row items-center justify-between gap-8 shadow-md">
          <div className="space-y-2 text-center md:text-left">
            <span className="text-xs uppercase tracking-widest text-[#E8D5A0] font-semibold">
              Flagship Transformation Program
            </span>
            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#FFFFFF]">
              Heal to Empower™ Signature Journey
            </h3>
            <p className="text-xs sm:text-sm text-[#D1C3DF] max-w-xl">
              Break free from recurring emotional patterns, heal subconscious wounds, and step into self-sovereignty combining multi-modality energy healing and intuitive mentorship.
            </p>
          </div>
          <a
            href={`https://wa.me/919872771591?text=${encodeURIComponent('Hi Daisy, I would like to learn more about the Heal to Empower program.')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-7 py-3.5 rounded-full bg-[#C9A84C] hover:bg-[#B3933C] text-[#2A1B3D] font-semibold text-xs tracking-wide shrink-0 transition-transform active:scale-95 shadow-md"
          >
            Inquire About Program
          </a>
        </div>
      </div>
    </div>
  );
};
