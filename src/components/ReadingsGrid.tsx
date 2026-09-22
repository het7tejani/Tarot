import React from 'react';
import {
  HeartHandshake,
  Compass,
  Coins,
  Sparkles,
  SunMedium,
  ExternalLink,
  ArrowRight,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';
import { ReadingTopic } from '../types';

interface ReadingsGridProps {
  readings: ReadingTopic[];
  onSelectReading: (reading: ReadingTopic) => void;
  getEtsyUrl: (reading: ReadingTopic) => string;
}

export const ReadingsGrid: React.FC<ReadingsGridProps> = ({
  readings,
  onSelectReading,
  getEtsyUrl
}) => {
  // Icon mapper helper
  const renderIcon = (iconName: string) => {
    const iconClass = "w-6 h-6 text-[#9E741F]";
    switch (iconName) {
      case 'HeartHandshake':
        return <HeartHandshake className={iconClass} />;
      case 'Compass':
        return <Compass className={iconClass} />;
      case 'Coins':
        return <Coins className={iconClass} />;
      case 'Sparkles':
        return <Sparkles className={iconClass} />;
      case 'SunMedium':
        return <SunMedium className={iconClass} />;
      default:
        return <Sparkles className={iconClass} />;
    }
  };

  return (
    <section id="readings" className="py-20 md:py-28 bg-[#F6F1E8] border-y border-[#E6DBCB] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ECE1D0] border border-[#DAC8B1] text-[#785A3D] text-xs font-semibold uppercase tracking-widest mb-3">
            <span>Curated Tarot Consultations</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-semibold text-[#302015] tracking-tight mb-4">
            Readings &amp; Topics
          </h2>
          <p className="text-base sm:text-lg text-[#634C3B] font-serif-body italic leading-relaxed">
            Select the focus that calls to you. Each reading is hand-spread, thoroughly interpreted, and delivered as an illustrated PDF report within 24–48 hours.
          </p>
        </div>

        {/* 3-Column Responsive Grid as required */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {readings.map((reading) => {
            const etsyUrl = getEtsyUrl(reading);
            return (
              <div
                key={reading.id}
                id={`card-${reading.id}`}
                className="group relative bg-[#FFFDF9] rounded-2xl border border-[#E4D7C5] p-7 flex flex-col justify-between shadow-xs hover:shadow-md hover:border-[#CDB99E] transition-all duration-300 hover:-translate-y-1"
              >
                {/* Top Badge if any */}
                {reading.badge && (
                  <div className="absolute -top-3 right-6 px-3 py-0.5 rounded-full bg-[#EADCC8] border border-[#D1BD9F] text-[#694E34] text-[11px] font-semibold tracking-wide uppercase shadow-xs">
                    {reading.badge}
                  </div>
                )}

                <div>
                  {/* Icon & Spread Tag */}
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-xl bg-[#F6EFE3] border border-[#E3D4C0] flex items-center justify-center group-hover:bg-[#EFE4D2] transition-colors shadow-xs">
                      {renderIcon(reading.iconName)}
                    </div>
                    <span className="text-xs font-medium px-2.5 py-1 rounded-md bg-[#F4EDE2] text-[#6A5340] border border-[#E6DBCE]">
                      {reading.cardsCount}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-display font-bold text-[#322115] mb-2 group-hover:text-[#8E671D] transition-colors">
                    {reading.title}
                  </h3>

                  {/* 1-Line Summary */}
                  <p className="text-sm text-[#5C4533] leading-relaxed mb-6 font-normal">
                    {reading.tagline}
                  </p>

                  {/* Highlights list for quick scannability */}
                  <div className="space-y-2 mb-6 pt-4 border-t border-[#F0E6D8]">
                    <div className="flex items-center gap-2 text-xs text-[#674F3C]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#A67C27] shrink-0" />
                      <span>{reading.deliveryTime}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-[#674F3C]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#A67C27] shrink-0" />
                      <span>In-depth PDF &amp; Altar Photo</span>
                    </div>
                  </div>
                </div>

                {/* Footer of Card: Starting Price & Action Buttons */}
                <div className="pt-4 border-t border-[#EFE6DA] flex flex-col gap-3">
                  <div className="flex items-baseline justify-between">
                    <span className="text-xs uppercase tracking-wider text-[#826955] font-semibold">
                      Starting Price
                    </span>
                    <div className="flex items-baseline gap-1.5">
                      {reading.originalPrice && (
                        <span className="text-xs text-[#A08976] line-through">
                          {reading.originalPrice}
                        </span>
                      )}
                      <span className="text-2xl font-display font-bold text-[#2A1B10]">
                        {reading.price}
                      </span>
                    </div>
                  </div>

                  {/* Main Action: "View Details & Order" as required */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-1">
                    <button
                      type="button"
                      onClick={() => onSelectReading(reading)}
                      id={`view-details-${reading.id}`}
                      className="w-full py-2.5 px-3 rounded-xl bg-[#EFE5D6] hover:bg-[#E5D7C2] text-[#422D1E] text-xs font-semibold tracking-wide border border-[#D9C8B2] transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <span>View Details</span>
                      <ArrowRight className="w-3.5 h-3.5 text-[#8E671D]" />
                    </button>

                    {/* Direct 1-Click Buy on Etsy Option to keep path <= 2 clicks */}
                    <a
                      href={etsyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      id={`direct-etsy-${reading.id}`}
                      className="w-full py-2.5 px-3 rounded-xl bg-[#3D291C] hover:bg-[#281A10] text-[#FAF6F0] text-xs font-semibold tracking-wide transition-all flex items-center justify-center gap-1.5 shadow-xs"
                      title="Buy directly on Etsy"
                    >
                      <span>Buy on Etsy</span>
                      <ExternalLink className="w-3.5 h-3.5 text-[#D8B45E]" />
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Reassurance note below grid */}
        <div className="mt-12 text-center flex flex-wrap items-center justify-center gap-6 text-xs text-[#735A47]">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-[#9E741F]" />
            Secure checkout protected by Etsy Buyer Protection
          </span>
          <span className="hidden sm:inline text-[#D2C2AD]">•</span>
          <span>No login required on this site</span>
          <span className="hidden sm:inline text-[#D2C2AD]">•</span>
          <span>Fast 24–48 hour delivery guarantee</span>
        </div>
      </div>
    </section>
  );
};
