import React, { useState } from 'react';
import { Shuffle, RefreshCw, ZoomIn, X, ChevronRight, Layers, ArrowUpCircle, ArrowDownCircle } from 'lucide-react';
import { FREE_TAROT_CARDS } from '../data/readingsData';
import { TarotCard } from '../types';
import { Link } from 'react-router-dom';
import { SEOHead } from '../components/SEOHead';

export const FreeTarotPage: React.FC = () => {
  const [spreadMode, setSpreadMode] = useState<'single' | 'three'>('single');
  const [selectedCards, setSelectedCards] = useState<number[]>([]);
  const [isRevealed, setIsRevealed] = useState(false);
  const [isShuffling, setIsShuffling] = useState(false);
  const [question, setQuestion] = useState('');
  const [activeTabByCard, setActiveTabByCard] = useState<Record<number, 'upright' | 'reversed'>>({});
  const [zoomedCard, setZoomedCard] = useState<TarotCard | null>(null);
  const [filterQuery, setFilterQuery] = useState('');
  const [showDeckGallery, setShowDeckGallery] = useState(false);

  const handleDraw = () => {
    setIsShuffling(true);
    const total = FREE_TAROT_CARDS.length;
    const count = spreadMode === 'single' ? 1 : 3;
    const chosen: number[] = [];

    while (chosen.length < count) {
      const idx = Math.floor(Math.random() * total);
      if (!chosen.includes(idx)) {
        chosen.push(idx);
      }
    }

    setTimeout(() => {
      setSelectedCards(chosen);
      setIsRevealed(true);
      setIsShuffling(false);
      const initialTabs: Record<number, 'upright' | 'reversed'> = {};
      chosen.forEach((_, i) => {
        initialTabs[i] = 'upright';
      });
      setActiveTabByCard(initialTabs);
    }, 450);
  };

  const handleReset = () => {
    setSelectedCards([]);
    setIsRevealed(false);
    setActiveTabByCard({});
  };

  const getPositionLabel = (idx: number) => {
    if (spreadMode === 'single') return 'Daily Guidance';
    if (idx === 0) return 'Past • Foundation';
    if (idx === 1) return 'Present • Active Dynamic';
    return 'Future • Emerging Path';
  };

  const toggleTab = (cardIdx: number, tab: 'upright' | 'reversed') => {
    setActiveTabByCard((prev) => ({
      ...prev,
      [cardIdx]: tab,
    }));
  };

  const filteredDeck = FREE_TAROT_CARDS.filter((c) =>
    c.name.toLowerCase().includes(filterQuery.toLowerCase()) ||
    c.keywords.toLowerCase().includes(filterQuery.toLowerCase())
  );

  const dynamicTitle = zoomedCard
    ? `${zoomedCard.name} Tarot Meaning — Free Tarot Oracle`
    : isRevealed && selectedCards.length === 1
    ? `${FREE_TAROT_CARDS[selectedCards[0]].name} Daily Card — Free Tarot Reading`
    : 'Free Online Tarot Card Reading — The Tarot Company';

  const dynamicDesc = zoomedCard
    ? `Explore ${zoomedCard.name} spiritual interpretation: ${zoomedCard.keywords}. Upright wisdom: ${zoomedCard.upright.slice(0, 100)}...`
    : 'Draw authentic 1909 Rider-Waite Tarot cards online with instant intuitive upright and reversed interpretations for daily clarity.';

  return (
    <div className="pt-32 pb-24 bg-[#FAF8F5] min-h-screen text-[#1f2322]">
      <SEOHead
        title={dynamicTitle}
        description={dynamicDesc}
        ogImage={zoomedCard?.image || (isRevealed && selectedCards.length > 0 ? FREE_TAROT_CARDS[selectedCards[0]].image : '/tarot/the_fool.jpg')}
      />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header (Clean, open typographic flow — no boxed badges) */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-[#1f2322] mb-3">
            Free Tarot Reading
          </h1>
          <p className="text-base text-[#1f2322]/70 leading-relaxed font-normal">
            Draw from the authentic 1909 Rider-Waite-Smith Major Arcana. Center your thoughts, hold an intention in mind, and draw your cards.
          </p>
        </div>

        {/* Spread Selector & Controls (Normal, unboxed layout) */}
        <div className="max-w-xl mx-auto mb-12 text-center">
          {/* Underline Tabs */}
          <div className="flex items-center justify-center gap-8 mb-6 border-b border-[#1f2322]/15 pb-2">
            <button
              onClick={() => {
                setSpreadMode('single');
                handleReset();
              }}
              className={`text-sm pb-2 font-medium transition-colors cursor-pointer relative ${
                spreadMode === 'single'
                  ? 'text-[#1f2322] font-semibold'
                  : 'text-[#1f2322]/50 hover:text-[#1f2322]'
              }`}
            >
              <span>Single Card (Daily Focus)</span>
              {spreadMode === 'single' && (
                <span className="absolute bottom-[-9px] left-0 right-0 h-0.5 bg-[#1f2322]" />
              )}
            </button>
            <button
              onClick={() => {
                setSpreadMode('three');
                handleReset();
              }}
              className={`text-sm pb-2 font-medium transition-colors cursor-pointer relative ${
                spreadMode === 'three'
                  ? 'text-[#1f2322] font-semibold'
                  : 'text-[#1f2322]/50 hover:text-[#1f2322]'
              }`}
            >
              <span>Three Cards (Past • Present • Future)</span>
              {spreadMode === 'three' && (
                <span className="absolute bottom-[-9px] left-0 right-0 h-0.5 bg-[#1f2322]" />
              )}
            </button>
          </div>

          {/* Clean text input line directly on page */}
          <div className="mb-6 max-w-md mx-auto">
            <input
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Focus on a question or intention (optional)..."
              className="w-full bg-transparent border-b border-[#1f2322]/20 focus:border-[#1f2322] py-2 text-center text-sm text-[#1f2322] placeholder:text-[#1f2322]/40 outline-none transition-colors"
            />
          </div>

          {/* Action Button */}
          <div className="flex items-center justify-center gap-4">
            <button
              onClick={handleDraw}
              disabled={isShuffling}
              className="px-8 py-3 rounded-full bg-[#1f2322] hover:bg-[#73a89a] text-[#FAF8F5] font-medium text-sm tracking-wide transition-colors inline-flex items-center gap-2 cursor-pointer shadow-sm disabled:opacity-50"
            >
              <Shuffle className={`w-4 h-4 ${isShuffling ? 'animate-spin' : ''}`} />
              <span>{isShuffling ? 'Shuffling Deck...' : isRevealed ? 'Reshuffle & Draw Again' : 'Draw Your Cards'}</span>
            </button>

            {isRevealed && (
              <button
                onClick={handleReset}
                className="text-xs font-medium text-[#1f2322]/60 hover:text-[#1f2322] transition-colors cursor-pointer underline underline-offset-4"
              >
                Reset
              </button>
            )}
          </div>
        </div>

        {/* REVEALED READING DISPLAY (Open editorial layout, NOT boxed cards) */}
        {isRevealed ? (
          <div className="space-y-12 animate-fadeIn">
            {question && (
              <p className="text-center text-xs text-[#1f2322]/60 italic max-w-md mx-auto">
                Inquiry: &ldquo;{question}&rdquo;
              </p>
            )}

            {/* 1-Card View: Natural Side-by-Side Reading Layout */}
            {spreadMode === 'single' && selectedCards.length > 0 && (() => {
              const card = FREE_TAROT_CARDS[selectedCards[0]];
              const activeTab = activeTabByCard[0] || 'upright';

              return (
                <div className="max-w-3xl mx-auto flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-12 py-4">
                  {/* Real Tarot Card Image (Directly on canvas with natural shadow) */}
                  <div className="shrink-0 flex flex-col items-center">
                    <div
                      className="group relative cursor-pointer"
                      onClick={() => setZoomedCard(card)}
                      title="Click to view card in full detail"
                    >
                      <img
                        src={card.image}
                        alt={`${card.name} Tarot Card`}
                        className="w-56 sm:w-64 aspect-[2/3] object-cover rounded-lg shadow-lg group-hover:scale-[1.02] transition-transform duration-200"
                        referrerPolicy="no-referrer"
                        onError={(e) => {
                          const target = e.currentTarget;
                          if (!target.src.endsWith('/tarot/card_back.jpg')) {
                            target.src = '/tarot/card_back.jpg';
                          }
                        }}
                      />
                      <div className="absolute inset-0 rounded-lg ring-1 ring-black/10 pointer-events-none" />
                      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-[#1f2322]/80 text-[#FAF8F5] text-[10px] font-medium tracking-wider flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                        <ZoomIn className="w-3 h-3" />
                        <span>Inspect Artwork</span>
                      </div>
                    </div>
                    <span className="text-[11px] text-[#1f2322]/50 mt-2 font-mono">
                      Major Arcana {card.number}
                    </span>
                  </div>

                  {/* Reading Content (Clean, natural paragraphs without boxes) */}
                  <div className="flex-1 space-y-5 text-left">
                    <div>
                      <span className="text-xs uppercase tracking-wider font-semibold text-[#73a89a] block">
                        {getPositionLabel(0)}
                      </span>
                      <h2 className="text-3xl font-semibold text-[#1f2322] mt-1 tracking-tight">
                        {card.name}
                      </h2>
                      <p className="text-xs sm:text-sm text-[#1f2322]/60 italic mt-1">
                        {card.keywords}
                      </p>
                    </div>

                    {/* Upright / Reversed Toggle Buttons */}
                    <div className="flex items-center gap-4 text-xs pt-1 border-b border-[#1f2322]/10 pb-2">
                      <button
                        onClick={() => toggleTab(0, 'upright')}
                        className={`inline-flex items-center gap-1.5 font-medium transition-colors cursor-pointer ${
                          activeTab === 'upright'
                            ? 'text-[#1f2322] font-semibold border-b-2 border-[#1f2322] pb-1 -mb-2'
                            : 'text-[#1f2322]/50 hover:text-[#1f2322]'
                        }`}
                      >
                        <ArrowUpCircle className="w-3.5 h-3.5 text-[#73a89a]" />
                        <span>Upright Light</span>
                      </button>
                      <button
                        onClick={() => toggleTab(0, 'reversed')}
                        className={`inline-flex items-center gap-1.5 font-medium transition-colors cursor-pointer ${
                          activeTab === 'reversed'
                            ? 'text-[#1f2322] font-semibold border-b-2 border-[#1f2322] pb-1 -mb-2'
                            : 'text-[#1f2322]/50 hover:text-[#1f2322]'
                        }`}
                      >
                        <ArrowDownCircle className="w-3.5 h-3.5 text-amber-700" />
                        <span>Reversed Shadow</span>
                      </button>
                    </div>

                    {/* Interpretation text */}
                    <div className="space-y-4 text-sm leading-relaxed text-[#1f2322]/85">
                      {activeTab === 'upright' ? (
                        <p>{card.upright}</p>
                      ) : (
                        <p>{card.reversed || 'Suggests subconscious hesitations, delay in timing, or looking at this archetype from an internal perspective.'}</p>
                      )}

                      <div className="pt-2">
                        <span className="font-semibold text-xs text-[#1f2322] uppercase tracking-wider block mb-1 text-[#73a89a]">
                          Actionable Guidance:
                        </span>
                        <p className="text-sm text-[#1f2322]/80 leading-relaxed">{card.advice}</p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })()}

            {/* 3-Card View: 3 Open Columns (No card-in-card boxes) */}
            {spreadMode === 'three' && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 pt-4">
                {selectedCards.map((cardIndex, i) => {
                  const card = FREE_TAROT_CARDS[cardIndex];
                  const activeTab = activeTabByCard[i] || 'upright';

                  return (
                    <div key={card.name} className="flex flex-col items-center text-center space-y-4">
                      {/* Position Tag */}
                      <span className="text-xs uppercase tracking-wider font-semibold text-[#73a89a]">
                        {getPositionLabel(i)}
                      </span>

                      {/* Tarot Card Image */}
                      <div
                        className="group relative cursor-pointer"
                        onClick={() => setZoomedCard(card)}
                        title="Click to zoom card artwork"
                      >
                        <img
                          src={card.image}
                          alt={`${card.name} Tarot Card`}
                          className="w-48 aspect-[2/3] object-cover rounded-lg shadow-md group-hover:scale-[1.02] transition-transform duration-200"
                          referrerPolicy="no-referrer"
                          onError={(e) => {
                            const target = e.currentTarget;
                            if (!target.src.endsWith('/tarot/card_back.jpg')) {
                              target.src = '/tarot/card_back.jpg';
                            }
                          }}
                        />
                        <div className="absolute inset-0 rounded-lg ring-1 ring-black/10 pointer-events-none" />
                        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-full bg-[#1f2322]/80 text-[#FAF8F5] text-[9px] font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                          Inspect
                        </div>
                      </div>

                      {/* Card Title */}
                      <div>
                        <h3 className="text-xl font-semibold text-[#1f2322]">
                          {card.name}
                        </h3>
                        <span className="text-xs text-[#1f2322]/50 font-mono">
                          Arcana {card.number}
                        </span>
                        <p className="text-xs text-[#1f2322]/65 italic mt-1 px-2">
                          {card.keywords}
                        </p>
                      </div>

                      {/* Upright / Reversed toggle */}
                      <div className="flex items-center justify-center gap-3 text-xs border-b border-[#1f2322]/10 pb-1.5 w-full max-w-[220px]">
                        <button
                          onClick={() => toggleTab(i, 'upright')}
                          className={`font-medium cursor-pointer ${
                            activeTab === 'upright'
                              ? 'text-[#1f2322] font-semibold border-b border-[#1f2322]'
                              : 'text-[#1f2322]/50 hover:text-[#1f2322]'
                          }`}
                        >
                          Upright
                        </button>
                        <button
                          onClick={() => toggleTab(i, 'reversed')}
                          className={`font-medium cursor-pointer ${
                            activeTab === 'reversed'
                              ? 'text-[#1f2322] font-semibold border-b border-[#1f2322]'
                              : 'text-[#1f2322]/50 hover:text-[#1f2322]'
                          }`}
                        >
                          Reversed
                        </button>
                      </div>

                      {/* Card meaning */}
                      <div className="text-xs leading-relaxed text-[#1f2322]/80 text-left px-1 space-y-3">
                        <p>
                          {activeTab === 'upright' ? card.upright : (card.reversed || 'Points to subconscious blocks, delayed timing, or unintegrated lessons.')}
                        </p>
                        <p className="text-[#1f2322]/70 text-[11px]">
                          <strong className="text-[#1f2322] font-medium">Guidance:</strong> {card.advice}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Seamless Etsy Recommendation (Normal typography, not a giant boxed card) */}
            <div className="pt-12 border-t border-[#1f2322]/10 text-center max-w-xl mx-auto space-y-3">
              <h4 className="text-xl font-semibold text-[#1f2322]">
                Looking for a Personal Altar Reading?
              </h4>
              <p className="text-xs sm:text-sm text-[#1f2322]/70 leading-relaxed">
                For in-depth inquiries regarding relationships, career transitions, or destiny spreads, book a hand-cast reading delivered with real altar photographs.
              </p>
              <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
                <Link
                  to="/readings"
                  className="px-6 py-2.5 rounded-full bg-[#1f2322] hover:bg-[#73a89a] text-[#FAF8F5] text-xs font-medium transition-colors inline-flex items-center gap-1.5"
                >
                  <span>Explore Readings</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
                <a
                  href="https://www.etsy.com/shop/PsychicEra"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-medium text-[#1f2322]/80 hover:text-[#1f2322] underline underline-offset-4"
                >
                  Visit PsychicEra on Etsy
                </a>
              </div>
            </div>
          </div>
        ) : (
          /* BEFORE DRAW: The Deck Floating on Canvas (Normal, unboxed layout) */
          <div className="text-center py-8">
            <div
              onClick={handleDraw}
              className="group relative w-44 aspect-[2/3] mx-auto cursor-pointer mb-6"
              title="Click to draw from the deck"
            >
              {/* Stacked background cards */}
              <div className="absolute inset-0 rounded-lg transform -rotate-6 -translate-x-3 translate-y-1 bg-[#1f2322] shadow-md overflow-hidden">
                <img
                  src="/tarot/card_back.jpg"
                  alt="Tarot Card Back"
                  className="w-full h-full object-cover opacity-80"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute inset-0 rounded-lg transform rotate-6 translate-x-3 translate-y-1 bg-[#1f2322] shadow-md overflow-hidden">
                <img
                  src="/tarot/card_back.jpg"
                  alt="Tarot Card Back"
                  className="w-full h-full object-cover opacity-80"
                  referrerPolicy="no-referrer"
                />
              </div>
              {/* Front card */}
              <div className="relative w-full h-full rounded-lg bg-[#1f2322] shadow-xl overflow-hidden group-hover:scale-105 transition-transform duration-300">
                <img
                  src="/tarot/card_back.jpg"
                  alt="Tarot Deck Ready"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>

            <p className="text-xs text-[#1f2322]/60 max-w-sm mx-auto mb-4">
              The 22 Major Arcana cards are ready. Tap the deck or click &ldquo;Draw Your Cards&rdquo; above.
            </p>
          </div>
        )}

        {/* MAJOR ARCANA ARCHIVE (Normal Gallery Grid, unboxed) */}
        <div className="mt-20 pt-10 border-t border-[#1f2322]/15">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h3 className="text-xl font-semibold text-[#1f2322]">
                Major Arcana Deck Archive
              </h3>
              <p className="text-xs text-[#1f2322]/60 mt-0.5">
                Authentic 1909 Rider-Waite-Smith cards by Pamela Colman Smith.
              </p>
            </div>
            <button
              onClick={() => setShowDeckGallery(!showDeckGallery)}
              className="text-xs font-semibold text-[#1f2322] hover:text-[#73a89a] underline underline-offset-4 cursor-pointer self-start sm:self-auto"
            >
              {showDeckGallery ? 'Hide Deck Gallery' : 'Browse All 22 Cards'}
            </button>
          </div>

          {showDeckGallery && (
            <div className="space-y-6 pt-2">
              <div className="max-w-xs">
                <input
                  type="text"
                  value={filterQuery}
                  onChange={(e) => setFilterQuery(e.target.value)}
                  placeholder="Filter cards by name..."
                  className="w-full bg-transparent border-b border-[#1f2322]/20 focus:border-[#1f2322] py-1.5 text-xs text-[#1f2322] placeholder:text-[#1f2322]/40 outline-none"
                />
              </div>

              {/* Clean open gallery grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-6">
                {filteredDeck.map((card) => (
                  <div
                    key={card.name}
                    onClick={() => setZoomedCard(card)}
                    className="group cursor-pointer flex flex-col items-center text-center"
                  >
                    <div className="w-full aspect-[2/3] rounded-md overflow-hidden shadow-sm group-hover:shadow-md group-hover:scale-105 transition-all duration-200 bg-[#e9e0d1] mb-2">
                      <img
                        src={card.image}
                        alt={card.name}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                        loading="lazy"
                        onError={(e) => {
                          const target = e.currentTarget;
                          if (!target.src.endsWith('/tarot/card_back.jpg')) {
                            target.src = '/tarot/card_back.jpg';
                          }
                        }}
                      />
                    </div>
                    <span className="text-[10px] font-mono text-[#1f2322]/50">{card.number}</span>
                    <span className="text-xs font-medium text-[#1f2322] group-hover:text-[#73a89a] transition-colors leading-tight">
                      {card.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Full-Resolution Card Inspector Modal (Clean, unboxed modal dialog) */}
        {zoomedCard && (
          <div className="fixed inset-0 z-50 bg-[#1f2322]/75 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-[#FAF8F5] rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl p-6 sm:p-8 relative">
              <button
                onClick={() => setZoomedCard(null)}
                className="absolute top-4 right-4 p-1.5 text-[#1f2322]/60 hover:text-[#1f2322] cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start pt-2">
                <img
                  src={zoomedCard.image}
                  alt={zoomedCard.name}
                  className="w-48 sm:w-56 shrink-0 aspect-[2/3] object-cover rounded-lg shadow-md"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    const target = e.currentTarget;
                    if (!target.src.endsWith('/tarot/card_back.jpg')) {
                      target.src = '/tarot/card_back.jpg';
                    }
                  }}
                />

                <div className="space-y-3 text-left">
                  <span className="text-[11px] uppercase tracking-wider font-semibold text-[#73a89a]">
                    1909 Rider-Waite-Smith
                  </span>
                  <h3 className="text-2xl font-semibold text-[#1f2322] leading-tight">
                    {zoomedCard.name}
                  </h3>
                  <p className="text-xs font-mono text-[#1f2322]/50">
                    Card {zoomedCard.number} • {zoomedCard.arcana}
                  </p>
                  <p className="text-xs text-[#1f2322]/70 italic">
                    {zoomedCard.keywords}
                  </p>

                  <div className="pt-2 space-y-2 text-xs leading-relaxed text-[#1f2322]/85">
                    <div>
                      <strong className="text-[#1f2322] block font-semibold text-[11px] uppercase tracking-wider text-[#73a89a]">
                        Upright Meaning:
                      </strong>
                      <p>{zoomedCard.upright}</p>
                    </div>

                    <div>
                      <strong className="text-[#1f2322] block font-semibold text-[11px] uppercase tracking-wider text-amber-700">
                        Reversed Nuance:
                      </strong>
                      <p>{zoomedCard.reversed || 'Points to subconscious blocks, delayed timing, or internal reflection.'}</p>
                    </div>

                    <div>
                      <strong className="text-[#1f2322] block font-semibold text-[11px] uppercase tracking-wider text-[#1f2322]/80">
                        Advice:
                      </strong>
                      <p>{zoomedCard.advice}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};


