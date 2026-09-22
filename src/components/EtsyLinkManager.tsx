import React, { useState } from 'react';
import { X, Check, RotateCcw, Link2, ExternalLink, Search } from 'lucide-react';
import { ReadingTopic } from '../types';

interface EtsyLinkManagerProps {
  isOpen: boolean;
  onClose: () => void;
  baseShopUrl: string;
  onUpdateBaseShopUrl: (newUrl: string) => void;
  customListingUrls: Record<string, string>;
  onUpdateListingUrl: (id: string, url: string) => void;
  onResetToDefaults: () => void;
  readings: ReadingTopic[];
}

export const EtsyLinkManager: React.FC<EtsyLinkManagerProps> = ({
  isOpen,
  onClose,
  baseShopUrl,
  onUpdateBaseShopUrl,
  customListingUrls,
  onUpdateListingUrl,
  onResetToDefaults,
  readings
}) => {
  const [shopInput, setShopInput] = useState(baseShopUrl);
  const [savedMessage, setSavedMessage] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  if (!isOpen) return null;

  const handleSaveBase = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateBaseShopUrl(shopInput);
    setSavedMessage(true);
    setTimeout(() => setSavedMessage(false), 2500);
  };

  const filteredReadings = readings.filter(r =>
    r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (r.category && r.category.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#21160E]/65 backdrop-blur-xs animate-fadeIn"
      role="dialog"
      aria-modal="true"
      aria-labelledby="etsy-settings-title"
    >
      <div className="relative w-full max-w-xl bg-[#FFFDF9] rounded-2xl border border-[#DDCFBD] shadow-2xl p-6 sm:p-8 text-[#3B291B] max-h-[85vh] overflow-y-auto">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-[#7B614D] hover:text-[#2E1F14] hover:bg-[#EBDCC8] transition-colors"
          aria-label="Close settings"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 mb-2">
          <div className="w-8 h-8 rounded-lg bg-[#F5ECDF] text-[#8C6925] flex items-center justify-center">
            <Link2 className="w-4 h-4" />
          </div>
          <h2 id="etsy-settings-title" className="text-xl font-display font-bold text-[#2E1E13]">
            Etsy URL Configuration
          </h2>
        </div>

        <p className="text-xs sm:text-sm text-[#664F3D] mb-6 leading-relaxed">
          Easily replace the default placeholder <code className="px-1.5 py-0.5 rounded bg-[#EFE6D8] font-mono text-[11px] text-[#3D2C1E]">YOUR_ETSY_LISTING_URL</code> with your live Etsy shop or individual listing URLs.
        </p>

        {/* Global Shop URL */}
        <form onSubmit={handleSaveBase} className="mb-6 p-4 rounded-xl bg-[#F7F2EA] border border-[#E7DAC7]">
          <label className="block text-xs font-semibold uppercase tracking-wider text-[#735741] mb-1.5">
            Default Base Etsy Store URL
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={shopInput}
              onChange={(e) => setShopInput(e.target.value)}
              placeholder="https://www.etsy.com/shop/YourShopName"
              className="flex-1 px-3.5 py-2.5 rounded-lg bg-[#FFFDF9] border border-[#D8C7B0] text-xs sm:text-sm text-[#382618] focus:outline-none focus:border-[#A47921]"
            />
            <button
              type="submit"
              className="px-4 py-2.5 rounded-lg bg-[#3C291B] hover:bg-[#281A10] text-[#FAF6F0] text-xs font-semibold shrink-0 transition-colors"
            >
              Apply All
            </button>
          </div>
          {savedMessage && (
            <p className="text-xs text-green-700 mt-2 flex items-center gap-1 font-medium">
              <Check className="w-3.5 h-3.5" /> Base Etsy Shop URL updated!
            </p>
          )}
        </form>

        {/* Individual Listing URLs */}
        <div className="space-y-4 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <h3 className="text-xs uppercase tracking-wider font-semibold text-[#8C6925]">
              Individual Product Listing URLs ({filteredReadings.length})
            </h3>
            <div className="relative w-full sm:w-48">
              <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 transform -translate-y-1/2 text-[#866C57]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Filter listings..."
                className="w-full pl-8 pr-3 py-1.5 rounded-lg bg-[#FAF6EE] border border-[#E9DDCB] text-xs text-[#322115] focus:outline-none focus:border-[#A47921]"
              />
            </div>
          </div>

          <div className="space-y-3">
            {filteredReadings.map((reading) => {
              const currentVal = customListingUrls[reading.id] || reading.etsyListingUrl;
              return (
                <div key={reading.id} className="p-3.5 rounded-xl bg-[#FAF6EE] border border-[#E9DDCB]">
                  <div className="flex items-center justify-between mb-1.5 gap-2">
                    <div className="flex items-center gap-2 truncate">
                      {reading.imageUrl && (
                        <img
                          src={reading.imageUrl}
                          alt={reading.title}
                          className="w-7 h-7 rounded object-cover shrink-0"
                          referrerPolicy="no-referrer"
                        />
                      )}
                      <span className="text-xs font-bold text-[#322115] truncate" title={reading.title}>
                        {reading.title}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-[11px] text-[#866C57] font-semibold">{reading.price}</span>
                      <a
                        href={currentVal}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1 rounded text-[#73a89a] hover:text-[#1f2322] hover:bg-[#E9DDCB]/60 transition-colors"
                        title="Open this particular listing in a new tab"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                  <input
                    type="text"
                    value={currentVal}
                    onChange={(e) => onUpdateListingUrl(reading.id, e.target.value)}
                    className="w-full px-3 py-2 rounded-md bg-[#FFFDF9] border border-[#D8C7B2] text-xs font-mono text-[#4A3628] focus:outline-none focus:border-[#A47921]"
                    placeholder="https://www.etsy.com/listing/..."
                  />
                </div>
              );
            })}
          </div>
        </div>

        {/* Reset and Close */}
        <div className="flex items-center justify-between pt-4 border-t border-[#EAE0D1]">
          <button
            type="button"
            onClick={onResetToDefaults}
            className="flex items-center gap-1.5 text-xs text-[#7A614E] hover:text-[#2E1F14] transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset to defaults</span>
          </button>

          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2.5 rounded-full bg-[#3B281B] hover:bg-[#25170E] text-[#FAF6EE] text-xs font-semibold transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
