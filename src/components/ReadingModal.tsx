import React, { useEffect } from 'react';
import {
  X,
  ExternalLink,
  Clock,
  Sparkles,
  CheckCircle,
  HelpCircle,
  PackageCheck,
  Copy,
  Check
} from 'lucide-react';
import { ReadingTopic } from '../types';

interface ReadingModalProps {
  reading: ReadingTopic | null;
  onClose: () => void;
  etsyUrl: string;
}

export const ReadingModal: React.FC<ReadingModalProps> = ({
  reading,
  onClose,
  etsyUrl
}) => {
  const [copied, setCopied] = React.useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (reading) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [reading, onClose]);

  if (!reading) return null;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(etsyUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-[#1f2322]/45 backdrop-blur-xs animate-fadeIn"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-reading-title"
      id="reading-detail-modal"
    >
      <div
        className="relative w-full max-w-2xl bg-[#fdfcfb] rounded-3xl border border-[#1f2322]/10 shadow-2xl overflow-hidden my-8 text-[#1f2322] transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="bg-[#f4efec] px-6 sm:px-8 py-6 border-b border-[#1f2322]/10 relative">
          <button
            type="button"
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-full text-[#1f2322]/60 hover:text-[#1f2322] hover:bg-[#1f2322]/5 transition-colors focus:outline-none"
            aria-label="Close details modal"
            id="close-reading-modal-btn"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="px-3 py-0.5 rounded-full bg-[#fdfcfb] text-[#1f2322] border border-[#1f2322]/10 text-xs font-medium">
              {reading.cardsCount}
            </span>
            <div className="flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#fdfcfb] text-[#1f2322] border border-[#1f2322]/10 text-xs font-medium">
              <Clock className="w-3.5 h-3.5 text-[#73a89a]" />
              <span>{reading.deliveryTime}</span>
            </div>
          </div>

          <h2
            id="modal-reading-title"
            className="text-2xl sm:text-3xl font-semibold text-[#1f2322] tracking-tight"
          >
            {reading.title}
          </h2>
          <p className="text-sm sm:text-base text-[#1f2322]/70 mt-1">
            {reading.tagline}
          </p>
        </div>

        {/* Modal Scrollable Body */}
        <div className="px-6 sm:px-8 py-6 max-h-[65vh] overflow-y-auto space-y-6">
          {reading.imageUrl && (
            <div className="w-full h-56 rounded-2xl overflow-hidden bg-[#f4efec] border border-[#1f2322]/10">
              <img
                src={reading.imageUrl}
                alt={reading.title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          )}

          {/* Overview */}
          <div>
            <h3 className="text-xs uppercase tracking-wider font-semibold text-[#1f2322]/60 mb-2">
              Overview &amp; Energy Focus
            </h3>
            <p className="text-sm sm:text-base text-[#1f2322]/85 leading-relaxed">
              {reading.overview}
            </p>
          </div>

          {/* Spread Architecture */}
          <div className="p-4 rounded-2xl bg-[#f4efec]/70 border border-[#1f2322]/10">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#1f2322]/70 mb-1.5 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#73a89a]" />
              <span>Spread Structure</span>
            </h4>
            <p className="text-xs sm:text-sm text-[#1f2322]/80 leading-relaxed">
              {reading.spreadDetails}
            </p>
          </div>

          {/* Questions It Answers */}
          <div>
            <h3 className="text-xs uppercase tracking-wider font-semibold text-[#1f2322]/60 mb-3 flex items-center gap-1.5">
              <HelpCircle className="w-4 h-4 text-[#73a89a]" />
              <span>Key Questions Explored</span>
            </h3>
            <ul className="space-y-2.5">
              {reading.questionsAnswered.map((question, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-sm text-[#1f2322]/85">
                  <span className="w-5 h-5 rounded-full bg-[#f4efec] text-[#1f2322] font-semibold text-[11px] flex items-center justify-center shrink-0 mt-0.5 border border-[#1f2322]/10">
                    {idx + 1}
                  </span>
                  <span>{question}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* What The Client Gets */}
          <div>
            <h3 className="text-xs uppercase tracking-wider font-semibold text-[#1f2322]/60 mb-3 flex items-center gap-1.5">
              <PackageCheck className="w-4 h-4 text-[#73a89a]" />
              <span>What You Receive</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {reading.whatYouReceive.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-2 p-3 rounded-xl bg-[#f4efec]/50 border border-[#1f2322]/10 text-xs text-[#1f2322]/85"
                >
                  <CheckCircle className="w-4 h-4 text-[#73a89a] shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Delivery Note */}
          <div className="flex items-center justify-between p-3.5 rounded-2xl bg-[#f4efec] border border-[#1f2322]/10 text-xs text-[#1f2322]/80">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#73a89a]" />
              <span>
                <strong>Timeline:</strong> {reading.deliveryTime} directly via Etsy inbox &amp; email
              </span>
            </div>
            <span className="font-semibold text-[#1f2322] text-sm">{reading.price}</span>
          </div>

          {/* Etsy Placeholder Link Inspection */}
          <div className="pt-2">
            <div className="flex items-center justify-between text-[11px] text-[#1f2322]/60 mb-1">
              <span>Direct Etsy Link Attribute:</span>
              <button
                type="button"
                onClick={handleCopyLink}
                className="hover:text-[#73a89a] flex items-center gap-1 text-[11px] font-medium transition-colors"
              >
                {copied ? <Check className="w-3 h-3 text-[#73a89a]" /> : <Copy className="w-3 h-3" />}
                {copied ? 'Copied' : 'Copy link'}
              </button>
            </div>
            <div className="p-2.5 rounded-xl bg-[#f4efec] text-[#1f2322]/70 text-xs font-mono break-all select-all border border-[#1f2322]/10">
              {etsyUrl}
            </div>
          </div>
        </div>

        {/* Modal Footer with Clean Minimal CTA Button */}
        <div className="px-6 sm:px-8 py-5 bg-[#f4efec] border-t border-[#1f2322]/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-left">
            <p className="text-xs text-[#1f2322]/60 uppercase tracking-wider font-semibold">Price</p>
            <p className="text-2xl font-semibold text-[#1f2322]">{reading.price}</p>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              type="button"
              onClick={onClose}
              className="w-1/3 sm:w-auto px-5 py-3 rounded-full text-xs font-semibold text-[#1f2322]/80 bg-[#fdfcfb] hover:bg-[#1f2322]/5 border border-[#1f2322]/15 transition-colors cursor-pointer"
            >
              Back
            </button>

            <a
              href={etsyUrl}
              target="_blank"
              rel="noopener noreferrer"
              id="modal-buy-on-etsy-cta"
              className="flex-1 sm:flex-initial px-8 py-3.5 rounded-full text-sm font-semibold tracking-wide bg-[#1f2322] hover:bg-[#73a89a] text-[#fdfcfb] shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Buy on Etsy</span>
              <ExternalLink className="w-4 h-4 text-[#fdfcfb]" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
