import React, { useState } from 'react';
import { X, Calendar, Clock, BookOpen, Share2, Check, ExternalLink, ArrowLeft, Sparkles, CheckCircle2 } from 'lucide-react';
import { BlogPost, ReadingTopic } from '../types';
import { READINGS_DATA } from '../data/readingsData';

interface ArticleReaderModalProps {
  article: BlogPost | null;
  onClose: () => void;
  onSelectReading?: (reading: ReadingTopic) => void;
}

export const ArticleReaderModal: React.FC<ArticleReaderModalProps> = ({
  article,
  onClose,
  onSelectReading
}) => {
  const [copied, setCopied] = useState(false);

  if (!article) return null;

  const handleCopyLink = () => {
    const url = `${window.location.origin}/blog?article=${article.slug || article.id}`;
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  // Find a related reading based on article category or tags
  const relatedReading = READINGS_DATA.find((r) => {
    const artText = (article.category + ' ' + article.tags.join(' ') + ' ' + article.title).toLowerCase();
    if (artText.includes('love') || artText.includes('flame') || artText.includes('spicy')) {
      return r.category === 'love';
    }
    if (artText.includes('dream') || artText.includes('telepathic')) {
      return r.category === 'intuition';
    }
    return r.category === 'future' || r.id === 'psychic-era-360-future-reading';
  }) || READINGS_DATA[0];

  // Render markdown-like sections
  const renderFormattedContent = (content: string) => {
    const lines = content.split('\n\n');
    return lines.map((block, idx) => {
      const trimmed = block.trim();
      if (trimmed.startsWith('### ')) {
        return (
          <h3
            key={idx}
            className="text-xl sm:text-2xl font-serif font-bold text-[#1f2322] mt-8 mb-3 pt-2 border-b border-[#1f2322]/10 pb-2"
          >
            {trimmed.replace('### ', '')}
          </h3>
        );
      }
      if (trimmed.startsWith('## ')) {
        return (
          <h2
            key={idx}
            className="text-2xl sm:text-3xl font-serif font-bold text-[#1f2322] mt-10 mb-4"
          >
            {trimmed.replace('## ', '')}
          </h2>
        );
      }
      if (trimmed.startsWith('1. ') || trimmed.startsWith('2. ') || trimmed.startsWith('3. ') || trimmed.startsWith('4. ')) {
        const items = trimmed.split('\n');
        return (
          <ol key={idx} className="space-y-2.5 my-4 pl-5 list-decimal text-[#1f2322]/85 text-base leading-relaxed">
            {items.map((it, itIdx) => (
              <li key={itIdx} className="pl-1">
                {it.replace(/^\d+\.\s+/, '')}
              </li>
            ))}
          </ol>
        );
      }
      if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
        const items = trimmed.split('\n');
        return (
          <ul key={idx} className="space-y-2 my-4 pl-5 list-disc text-[#1f2322]/85 text-base leading-relaxed">
            {items.map((it, itIdx) => (
              <li key={itIdx} className="pl-1">
                {it.replace(/^[-*]\s+/, '')}
              </li>
            ))}
          </ul>
        );
      }
      if (trimmed.startsWith('> ')) {
        return (
          <blockquote
            key={idx}
            className="my-6 pl-4 border-l-4 border-[#73a89a] italic text-[#1f2322]/90 text-lg bg-[#FAF8F5] p-4 rounded-r-2xl font-serif"
          >
            {trimmed.replace('> ', '')}
          </blockquote>
        );
      }
      return (
        <p key={idx} className="text-[#1f2322]/85 text-base sm:text-lg leading-relaxed mb-5 font-normal">
          {trimmed}
        </p>
      );
    });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex justify-center p-3 sm:p-6 md:p-8 animate-fadeIn">
      <div className="relative bg-[#fdfcfb] w-full max-w-4xl rounded-3xl shadow-2xl border border-[#1f2322]/15 overflow-hidden flex flex-col my-auto max-h-[92vh]">
        {/* Top Sticky Header */}
        <div className="sticky top-0 z-20 bg-[#fdfcfb]/95 backdrop-blur-md px-6 py-4 border-b border-[#1f2322]/10 flex items-center justify-between">
          <button
            type="button"
            onClick={onClose}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#1f2322]/70 hover:text-[#1f2322] px-3 py-1.5 rounded-full hover:bg-[#1f2322]/5 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Articles</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleCopyLink}
              className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full bg-[#1f2322]/5 hover:bg-[#73a89a]/20 text-[#1f2322] transition-colors"
              title="Copy shareable link"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-green-600" />
                  <span className="text-green-700 font-semibold">Copied!</span>
                </>
              ) : (
                <>
                  <Share2 className="w-3.5 h-3.5" />
                  <span>Share</span>
                </>
              )}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-full text-[#1f2322]/60 hover:text-[#1f2322] hover:bg-[#1f2322]/10 transition-colors"
              aria-label="Close article"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Article Body */}
        <div className="overflow-y-auto px-6 sm:px-10 md:px-14 py-8">
          {/* Category & Metadata */}
          <div className="flex flex-wrap items-center gap-2.5 text-xs text-[#1f2322]/60 mb-4">
            <span className="px-3 py-1 rounded-full bg-[#73a89a]/15 text-[#1f2322] font-semibold tracking-wide">
              {article.category}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              {article.date}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {article.readTime}
            </span>
          </div>

          {/* Article Title */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-[#1f2322] leading-tight mb-6">
            {article.title}
          </h1>

          {/* Author Card */}
          <div className="flex items-center gap-3.5 pb-6 mb-6 border-b border-[#1f2322]/10">
            <img
              src={article.author.avatar || 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80'}
              alt={article.author.name}
              className="w-12 h-12 rounded-full object-cover ring-2 ring-[#73a89a]/30"
              referrerPolicy="no-referrer"
            />
            <div>
              <p className="text-sm font-semibold text-[#1f2322]">{article.author.name}</p>
              <p className="text-xs text-[#1f2322]/60">{article.author.role}</p>
            </div>
          </div>

          {/* Featured Cover Image */}
          {article.coverImage && (
            <div className="mb-8 rounded-2xl overflow-hidden shadow-md aspect-video max-h-[380px] w-full bg-[#1f2322]/5">
              <img
                src={article.coverImage}
                alt={article.title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          )}

          {/* Key Takeaways Box if available */}
          {article.keyTakeaways && article.keyTakeaways.length > 0 && (
            <div className="mb-8 p-5 sm:p-6 rounded-2xl bg-[#FAF8F5] border border-[#73a89a]/30 shadow-xs">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#1f2322] mb-3">
                <Sparkles className="w-4 h-4 text-[#73a89a]" />
                <span>Sacred Key Insights</span>
              </div>
              <ul className="space-y-2.5 text-sm text-[#1f2322]/85">
                {article.keyTakeaways.map((takeaway, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#73a89a] shrink-0 mt-0.5" />
                    <span>{takeaway}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Lead Excerpt */}
          <p className="text-lg sm:text-xl font-serif italic text-[#1f2322]/90 leading-relaxed mb-6 pl-4 border-l-2 border-[#73a89a]">
            {article.excerpt}
          </p>

          {/* Main Content */}
          <div className="article-body">
            {renderFormattedContent(article.content)}
          </div>

          {/* Tags */}
          {article.tags && article.tags.length > 0 && (
            <div className="pt-6 mt-8 border-t border-[#1f2322]/10 flex flex-wrap items-center gap-2">
              <span className="text-xs font-semibold text-[#1f2322]/50 uppercase tracking-wider mr-1">
                Topics:
              </span>
              {article.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="text-xs px-3 py-1 rounded-full bg-[#1f2322]/5 text-[#1f2322]/75 hover:bg-[#73a89a]/20 transition-colors"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* Related Reading Feature Box */}
          {relatedReading && (
            <div className="mt-10 p-6 rounded-3xl bg-[#f4efec] border border-[#1f2322]/15">
              <div className="flex items-center justify-between gap-4 mb-3">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#73a89a]">
                  <BookOpen className="w-4 h-4" />
                  <span>Recommended Reading For This Topic</span>
                </div>
                {relatedReading.badge && (
                  <span className="text-[10px] font-semibold px-2.5 py-0.5 rounded-full bg-[#73a89a]/20 text-[#1f2322]">
                    {relatedReading.badge}
                  </span>
                )}
              </div>
              <h3 className="text-lg sm:text-xl font-serif font-bold text-[#1f2322] mb-1">
                {relatedReading.title}
              </h3>
              <p className="text-xs sm:text-sm text-[#1f2322]/70 mb-4 line-clamp-2">
                {relatedReading.tagline}
              </p>
              <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-[#1f2322]/10">
                <span className="text-lg font-bold text-[#1f2322]">{relatedReading.price}</span>
                <div className="flex items-center gap-2">
                  {onSelectReading && (
                    <button
                      type="button"
                      onClick={() => {
                        onClose();
                        onSelectReading(relatedReading);
                      }}
                      className="px-4 py-2 rounded-full text-xs font-semibold bg-[#1f2322] text-[#fdfcfb] hover:bg-[#73a89a] transition-colors"
                    >
                      View Spread Details
                    </button>
                  )}
                  <a
                    href={relatedReading.etsyListingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold bg-[#73a89a]/20 text-[#1f2322] hover:bg-[#73a89a]/30 transition-colors"
                  >
                    <span>Order on Etsy</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
