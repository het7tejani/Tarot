import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Sparkles, ShieldCheck, CheckCircle2, ArrowRight, ExternalLink, X } from 'lucide-react';
import { READINGS_DATA } from '../data/readingsData';
import { ReadingTopic } from '../types';
import {
  HeartHandshake,
  Compass,
  Coins,
  SunMedium
} from 'lucide-react';

interface ReadingsPageProps {
  onSelectReading: (reading: ReadingTopic) => void;
  getEtsyUrl: (reading: ReadingTopic) => string;
}

export const ReadingsPage: React.FC<ReadingsPageProps> = ({
  onSelectReading,
  getEtsyUrl
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialSearchQuery = searchParams.get('search') || '';
  const [searchQuery, setSearchQuery] = useState(initialSearchQuery);
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  useEffect(() => {
    const q = searchParams.get('search') || '';
    setSearchQuery(q);
  }, [searchParams]);

  const categories = [
    { id: 'all', label: `All Listings (${READINGS_DATA.length})` },
    { id: 'future', label: 'Future & Destiny' },
    { id: 'love', label: 'Love & Desires' },
    { id: 'ritual', label: 'Spells & Rituals' },
    { id: 'healing', label: 'Energy & Crystals' },
    { id: 'intuition', label: 'Dreams & Cartomancy' }
  ];

  const filteredReadings = READINGS_DATA.filter((r) => {
    const matchesCategory = categoryFilter === 'all' || r.category === categoryFilter;
    if (!matchesCategory) return false;

    if (!searchQuery.trim()) return true;
    const cleanQ = searchQuery.toLowerCase().trim();
    const matchesTitle = r.title.toLowerCase().includes(cleanQ);
    const matchesTagline = r.tagline.toLowerCase().includes(cleanQ);
    const matchesCategoryName = r.category ? r.category.toLowerCase().includes(cleanQ) : false;
    const matchesQuestions = r.questionsAnswered.some((q) => q.toLowerCase().includes(cleanQ));
    return matchesTitle || matchesTagline || matchesCategoryName || matchesQuestions;
  });

  const clearSearchFilter = () => {
    setSearchQuery('');
    const newParams = new URLSearchParams(searchParams);
    newParams.delete('search');
    setSearchParams(newParams);
  };

  const renderIcon = (iconName: string) => {
    const iconClass = "w-5 h-5 text-[#1f2322]";
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
    <div className="pt-32 pb-24 bg-[#FAF8F5] min-h-screen text-[#1f2322]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-xs uppercase tracking-widest text-[#73a89a] font-semibold mb-3">
            Official PsychicEra Etsy Shop Collection
          </p>
          <h1 className="text-4xl sm:text-5xl font-semibold text-[#1f2322] tracking-tight mb-4">
            Psychic Readings, Spells &amp; Divination
          </h1>
          <p className="text-base sm:text-lg text-[#1f2322]/70 leading-relaxed">
            Directly from the PsychicEra shop on Etsy. Every reading and sacred ritual is consecrated on physical altar linen with authentic tools, delivered securely with detailed reports and altar photos.
          </p>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 mt-8">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setCategoryFilter(cat.id)}
                className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                  categoryFilter === cat.id
                    ? 'bg-[#1f2322] text-[#FAF8F5] shadow-xs'
                    : 'bg-[#1f2322]/5 text-[#1f2322]/80 hover:bg-[#1f2322]/10'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Active Search Filter Chip */}
          {searchQuery && (
            <div className="mt-4 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#73a89a]/15 text-[#1f2322] text-xs font-medium border border-[#73a89a]/30 animate-fadeIn">
              <span>
                Search filter: &ldquo;<strong>{searchQuery}</strong>&rdquo; ({filteredReadings.length} results)
              </span>
              <button
                type="button"
                onClick={clearSearchFilter}
                className="p-0.5 hover:bg-[#73a89a]/30 rounded-full transition-colors cursor-pointer"
                title="Clear search filter"
                aria-label="Clear search filter"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>

        {/* Empty Search State */}
        {filteredReadings.length === 0 && (
          <div className="text-center py-16 px-4 bg-[#FAF8F5] rounded-3xl border border-[#1f2322]/10 max-w-lg mx-auto mb-16">
            <Sparkles className="w-8 h-8 text-[#73a89a] mx-auto mb-3" />
            <h3 className="text-xl font-semibold text-[#1f2322] mb-2">No matching readings found</h3>
            <p className="text-sm text-[#1f2322]/70 mb-6">
              No Tarot listings match &ldquo;{searchQuery}&rdquo;. Try browsing all categories or searching for love, destiny, or 360 future.
            </p>
            <button
              type="button"
              onClick={clearSearchFilter}
              className="px-5 py-2.5 rounded-full bg-[#1f2322] text-[#fdfcfb] text-xs font-semibold hover:bg-[#73a89a] transition-colors"
            >
              Reset Search &amp; Show All
            </button>
          </div>
        )}

        {/* 3-Column Grid (Open, normal layout) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {filteredReadings.map((reading) => {
            const etsyUrl = getEtsyUrl(reading);
            return (
              <div
                key={reading.id}
                id={`card-${reading.id}`}
                className="group flex flex-col justify-between"
              >
                <div>
                  {reading.imageUrl && (
                    <div className="mb-4 aspect-video w-full overflow-hidden rounded-xl bg-[#e9e0d1] shadow-sm">
                      <img
                        src={reading.imageUrl}
                        alt={reading.title}
                        className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300"
                        loading="lazy"
                        referrerPolicy="no-referrer"
                        onError={(e) => {
                          e.currentTarget.src = 'https://images.unsplash.com/photo-1638803040283-7a5ffd48dad5?auto=format&fit=crop&w=800&q=80';
                        }}
                      />
                    </div>
                  )}

                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-medium text-[#73a89a]">
                      {reading.cardsCount}
                    </span>
                    <div className="flex items-baseline gap-1.5">
                      {reading.originalPrice && (
                        <span className="text-xs text-[#1f2322]/40 line-through">
                          {reading.originalPrice}
                        </span>
                      )}
                      <span className="text-xl font-semibold text-[#1f2322]">
                        {reading.price}
                      </span>
                    </div>
                  </div>

                  <h2 className="text-xl sm:text-2xl font-semibold text-[#1f2322] mb-2 group-hover:text-[#73a89a] transition-colors">
                    {reading.title}
                  </h2>

                  <p className="text-sm text-[#1f2322]/70 leading-relaxed mb-4 font-normal">
                    {reading.tagline}
                  </p>

                  <div className="space-y-1.5 mb-6 text-xs text-[#1f2322]/75">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#73a89a] shrink-0" />
                      <span>{reading.deliveryTime}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#73a89a] shrink-0" />
                      <span>Detailed PDF Guide &amp; Physical Altar Photo</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#73a89a] shrink-0" />
                      <span>1 Follow-Up Clarification Message Included</span>
                    </div>
                  </div>
                </div>

                <div className="pt-2 flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => onSelectReading(reading)}
                    id={`view-details-${reading.id}`}
                    className="py-2.5 px-4 rounded-full bg-[#1f2322]/5 hover:bg-[#1f2322]/10 text-[#1f2322] text-xs font-semibold tracking-wide transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>View Details</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#1f2322]/60" />
                  </button>

                  <a
                    href={etsyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    id={`direct-etsy-${reading.id}`}
                    className="py-2.5 px-5 rounded-full bg-[#1f2322] hover:bg-[#73a89a] text-[#FAF8F5] text-xs font-semibold tracking-wide transition-all flex items-center justify-center gap-1.5 shadow-xs"
                    title="Buy directly on Etsy"
                  >
                    <span>Buy on Etsy</span>
                    <ExternalLink className="w-3.5 h-3.5 text-[#FAF8F5]" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* Protection assurance */}
        <div className="mt-16 text-center flex flex-wrap items-center justify-center gap-6 text-xs text-[#1f2322]/60 pt-8 border-t border-[#1f2322]/10">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-[#73a89a]" />
            Secure checkout protected by Etsy Buyer Protection
          </span>
          <span className="hidden sm:inline text-[#1f2322]/30">•</span>
          <span>No registration required on this website</span>
          <span className="hidden sm:inline text-[#1f2322]/30">•</span>
          <span>Guaranteed delivery within 24–48 hours</span>
        </div>
      </div>
    </div>
  );
};
