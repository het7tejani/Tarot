import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Search, X, Sparkles, BookOpen, ArrowRight, CornerDownLeft, Filter } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { getReadings, getBlogPosts, CMS_UPDATE_EVENT } from '../services/cmsStorage';
import { ReadingTopic, BlogPost } from '../types';

interface HeaderSearchProps {
  onSelectReading?: (reading: ReadingTopic) => void;
  className?: string;
  isMobile?: boolean;
  onCloseMobile?: () => void;
}

export type SearchResultItem =
  | {
      type: 'reading';
      id: string;
      title: string;
      subtitle: string;
      badge?: string;
      price: string;
      category?: string;
      imageUrl?: string;
      reading: ReadingTopic;
    }
  | {
      type: 'blog';
      id: string;
      title: string;
      subtitle: string;
      category: string;
      date: string;
      readTime: string;
    };

export const HeaderSearch: React.FC<HeaderSearchProps> = ({
  onSelectReading,
  className = '',
  isMobile = false,
  onCloseMobile
}) => {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [filterType, setFilterType] = useState<'all' | 'readings' | 'blogs'>('all');
  const [selectedIndex, setSelectedIndex] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const [readingsList, setReadingsList] = useState<ReadingTopic[]>(() => getReadings());
  const [blogPostsList, setBlogPostsList] = useState<BlogPost[]>(() => getBlogPosts());

  useEffect(() => {
    const handleCmsUpdate = () => {
      setReadingsList(getReadings());
      setBlogPostsList(getBlogPosts());
    };
    window.addEventListener(CMS_UPDATE_EVENT, handleCmsUpdate);
    return () => window.removeEventListener(CMS_UPDATE_EVENT, handleCmsUpdate);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Keyboard shortcut: Cmd/Ctrl + K opens search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        inputRef.current?.focus();
        setIsOpen(true);
      }
      if (e.key === 'Escape') {
        setIsOpen(false);
        inputRef.current?.blur();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Filter items matching query
  const results: SearchResultItem[] = useMemo(() => {
    const cleanQuery = query.trim().toLowerCase();
    if (!cleanQuery) return [];

    const readingResults: SearchResultItem[] = readingsList
      .filter((r) => {
        const titleMatch = r.title.toLowerCase().includes(cleanQuery);
        const taglineMatch = r.tagline.toLowerCase().includes(cleanQuery);
        const categoryMatch = r.category ? r.category.toLowerCase().includes(cleanQuery) : false;
        const questionsMatch = r.questionsAnswered.some((q) => q.toLowerCase().includes(cleanQuery));
        return titleMatch || taglineMatch || categoryMatch || questionsMatch;
      })
      .map((r) => ({
        type: 'reading',
        id: r.id,
        title: r.title,
        subtitle: r.tagline,
        badge: r.badge,
        price: r.price,
        category: r.category,
        imageUrl: r.imageUrl,
        reading: r
      }));

    const blogResults: SearchResultItem[] = blogPostsList
      .filter((b) => {
        if (b.published === false) return false;
        const titleMatch = b.title.toLowerCase().includes(cleanQuery);
        const excerptMatch = b.excerpt.toLowerCase().includes(cleanQuery);
        const categoryMatch = b.category ? b.category.toLowerCase().includes(cleanQuery) : false;
        const tagsMatch = b.tags && b.tags.some((t) => t.toLowerCase().includes(cleanQuery));
        return titleMatch || excerptMatch || categoryMatch || tagsMatch;
      })
      .map((b) => ({
        type: 'blog',
        id: b.slug || b.id,
        title: b.title,
        subtitle: b.excerpt,
        category: b.category,
        date: b.date,
        readTime: b.readTime
      }));

    if (filterType === 'readings') return readingResults;
    if (filterType === 'blogs') return blogResults;
    return [...readingResults, ...blogResults];
  }, [query, filterType, readingsList, blogPostsList]);

  // Keep selected index within bounds
  useEffect(() => {
    setSelectedIndex(0);
  }, [results]);

  const handleSelectItem = (item: SearchResultItem) => {
    setIsOpen(false);
    setQuery('');
    if (onCloseMobile) onCloseMobile();

    if (item.type === 'reading') {
      if (onSelectReading) {
        onSelectReading(item.reading);
      } else {
        navigate(`/readings?search=${encodeURIComponent(item.title.split('|')[0].trim())}#card-${item.id}`);
      }
    } else {
      navigate(`/blog?article=${item.id}`);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isOpen || results.length === 0) {
      if (e.key === 'ArrowDown' && query.trim().length > 0) {
        setIsOpen(true);
      }
      return;
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % results.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + results.length) % results.length);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (results[selectedIndex]) {
        handleSelectItem(results[selectedIndex]);
      }
    }
  };

  const clearSearch = () => {
    setQuery('');
    inputRef.current?.focus();
  };

  return (
    <div ref={containerRef} className={`relative ${className}`} id="header-search-container">
      {/* Search Input Bar */}
      <div className="relative flex items-center">
        <div className="absolute left-3 pointer-events-none text-[#1f2322]/50 flex items-center">
          <Search className="w-4 h-4" />
        </div>

        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            if (!isOpen) setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder="Search readings or blog topics..."
          className="w-full pl-9 pr-14 sm:pr-20 py-2 text-xs sm:text-sm rounded-full bg-[#1f2322]/5 hover:bg-[#1f2322]/8 focus:bg-[#FAF8F5] text-[#1f2322] placeholder-[#1f2322]/50 border border-transparent focus:border-[#73a89a]/50 focus:outline-none transition-all duration-200 shadow-2xs"
          aria-label="Search Tarot readings and blog topics"
          id="header-search-input"
        />

        <div className="absolute right-2.5 flex items-center gap-1">
          {query ? (
            <button
              type="button"
              onClick={clearSearch}
              className="p-1 rounded-full text-[#1f2322]/50 hover:text-[#1f2322] hover:bg-[#1f2322]/10 transition-colors"
              aria-label="Clear search"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          ) : (
            !isMobile && (
              <kbd className="hidden lg:inline-flex items-center gap-0.5 px-1.5 py-0.5 text-[10px] font-medium text-[#1f2322]/40 bg-[#1f2322]/5 rounded border border-[#1f2322]/10 pointer-events-none">
                <span className="text-[11px]">⌘</span>K
              </kbd>
            )
          )}
        </div>
      </div>

      {/* Instant Search Results Flyout */}
      {isOpen && (
        <div
          className={`absolute z-50 mt-2 bg-[#FAF8F5] border border-[#1f2322]/15 rounded-2xl shadow-xl overflow-hidden animate-fadeIn ${
            isMobile
              ? 'left-0 right-0 max-h-[70vh]'
              : 'right-0 sm:left-auto w-full sm:w-[420px] md:w-[460px] max-h-[480px]'
          } flex flex-col`}
          id="header-search-results-flyout"
        >
          {/* Filter Pills (All / Tarot Readings / Blog Articles) */}
          <div className="p-2.5 border-b border-[#1f2322]/10 bg-[#f4efec] flex items-center justify-between gap-2">
            <div className="flex items-center gap-1.5">
              <Filter className="w-3.5 h-3.5 text-[#1f2322]/50" />
              <button
                type="button"
                onClick={() => setFilterType('all')}
                className={`px-2.5 py-1 text-[11px] font-medium rounded-full transition-all ${
                  filterType === 'all'
                    ? 'bg-[#1f2322] text-[#FAF8F5]'
                    : 'text-[#1f2322]/70 hover:bg-[#1f2322]/10'
                }`}
              >
                All
              </button>
              <button
                type="button"
                onClick={() => setFilterType('readings')}
                className={`px-2.5 py-1 text-[11px] font-medium rounded-full transition-all flex items-center gap-1 ${
                  filterType === 'readings'
                    ? 'bg-[#1f2322] text-[#FAF8F5]'
                    : 'text-[#1f2322]/70 hover:bg-[#1f2322]/10'
                }`}
              >
                <Sparkles className="w-3 h-3 text-[#73a89a]" />
                <span>Readings ({readingsList.length})</span>
              </button>
              <button
                type="button"
                onClick={() => setFilterType('blogs')}
                className={`px-2.5 py-1 text-[11px] font-medium rounded-full transition-all flex items-center gap-1 ${
                  filterType === 'blogs'
                    ? 'bg-[#1f2322] text-[#FAF8F5]'
                    : 'text-[#1f2322]/70 hover:bg-[#1f2322]/10'
                }`}
              >
                <BookOpen className="w-3 h-3 text-[#7C5F1E]" />
                <span>Blog ({blogPostsList.length})</span>
              </button>
            </div>

            {results.length > 0 && (
              <span className="text-[11px] font-semibold text-[#73a89a]">
                {results.length} found
              </span>
            )}
          </div>

          {/* Results List or Empty State */}
          <div className="overflow-y-auto divide-y divide-[#1f2322]/5 p-1 flex-1">
            {query.trim().length === 0 ? (
              <div className="py-8 px-4 text-center">
                <p className="text-xs font-medium text-[#1f2322]/60 mb-2">
                  Type any topic, card name, or question:
                </p>
                <div className="flex flex-wrap items-center justify-center gap-1.5 max-w-xs mx-auto">
                  {['Love', 'Soulmate', 'Court Cards', 'Destiny', 'Reiki', 'Cord Cutting'].map((tag) => (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => {
                        setQuery(tag);
                        inputRef.current?.focus();
                      }}
                      className="px-2.5 py-1 text-[11px] rounded-full bg-[#1f2322]/5 text-[#1f2322]/80 hover:bg-[#73a89a]/15 hover:text-[#1f2322] transition-colors"
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            ) : results.length === 0 ? (
              <div className="py-10 px-4 text-center">
                <p className="text-sm font-semibold text-[#1f2322]">No direct matches found</p>
                <p className="text-xs text-[#1f2322]/60 mt-1 max-w-xs mx-auto">
                  Try searching for &quot;Love&quot;, &quot;Career&quot;, &quot;Court cards&quot;, or &quot;Destiny&quot;.
                </p>
                <div className="mt-4 flex justify-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setIsOpen(false);
                      if (onCloseMobile) onCloseMobile();
                      navigate('/readings');
                    }}
                    className="text-xs font-semibold text-[#73a89a] hover:underline"
                  >
                    Browse all readings →
                  </button>
                  <span className="text-xs text-[#1f2322]/30">•</span>
                  <button
                    type="button"
                    onClick={() => {
                      setIsOpen(false);
                      if (onCloseMobile) onCloseMobile();
                      navigate('/blog');
                    }}
                    className="text-xs font-semibold text-[#7C5F1E] hover:underline"
                  >
                    Read all blog posts →
                  </button>
                </div>
              </div>
            ) : (
              results.map((item, index) => {
                const isSelected = index === selectedIndex;
                if (item.type === 'reading') {
                  return (
                    <div
                      key={`reading-${item.id}`}
                      onClick={() => handleSelectItem(item)}
                      onMouseEnter={() => setSelectedIndex(index)}
                      className={`p-3 rounded-xl cursor-pointer transition-colors flex items-start gap-3 ${
                        isSelected ? 'bg-[#1f2322]/8' : 'hover:bg-[#1f2322]/4'
                      }`}
                    >
                      {item.imageUrl ? (
                        <div className="w-12 h-12 rounded-lg overflow-hidden shrink-0 bg-[#e9e0d1] border border-[#1f2322]/10">
                          <img
                            src={item.imageUrl}
                            alt={item.title}
                            className="w-full h-full object-cover"
                            loading="lazy"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                      ) : (
                        <div className="w-10 h-10 rounded-lg bg-[#73a89a]/15 text-[#73a89a] flex items-center justify-center shrink-0">
                          <Sparkles className="w-5 h-5" />
                        </div>
                      )}

                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-1 mb-0.5">
                          <span className="text-[10px] font-semibold tracking-wide uppercase text-[#73a89a]">
                            Tarot Reading
                          </span>
                          <span className="text-xs font-bold text-[#1f2322]">
                            {item.price}
                          </span>
                        </div>
                        <h4 className="text-xs sm:text-sm font-semibold text-[#1f2322] truncate">
                          {item.title}
                        </h4>
                        <p className="text-[11px] text-[#1f2322]/70 line-clamp-1 mt-0.5">
                          {item.subtitle}
                        </p>
                      </div>

                      <ArrowRight className="w-4 h-4 text-[#1f2322]/40 shrink-0 self-center" />
                    </div>
                  );
                }

                // Blog post item
                return (
                  <div
                    key={`blog-${item.id}`}
                    onClick={() => handleSelectItem(item)}
                    onMouseEnter={() => setSelectedIndex(index)}
                    className={`p-3 rounded-xl cursor-pointer transition-colors flex items-start gap-3 ${
                      isSelected ? 'bg-[#1f2322]/8' : 'hover:bg-[#1f2322]/4'
                    }`}
                  >
                    <div className="w-10 h-10 rounded-lg bg-[#FDF6EC] border border-[#E8D5A0] text-[#7C5F1E] flex items-center justify-center shrink-0">
                      <BookOpen className="w-4 h-4" />
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-1 mb-0.5">
                        <span className="text-[10px] font-semibold tracking-wide uppercase text-[#7C5F1E]">
                          Blog • {item.category}
                        </span>
                        <span className="text-[10px] text-[#1f2322]/50">
                          {item.readTime}
                        </span>
                      </div>
                      <h4 className="text-xs sm:text-sm font-semibold text-[#1f2322] truncate">
                        {item.title}
                      </h4>
                      <p className="text-[11px] text-[#1f2322]/70 line-clamp-1 mt-0.5">
                        {item.subtitle}
                      </p>
                    </div>

                    <ArrowRight className="w-4 h-4 text-[#1f2322]/40 shrink-0 self-center" />
                  </div>
                );
              })
            )}
          </div>

          {/* Footer bar with quick navigation shortcut hint */}
          {results.length > 0 && (
            <div className="p-2 px-3 border-t border-[#1f2322]/10 bg-[#f4efec] text-[11px] text-[#1f2322]/60 flex items-center justify-between">
              <span className="flex items-center gap-1">
                <CornerDownLeft className="w-3 h-3 text-[#1f2322]/40" /> Select with Enter
              </span>
              <button
                type="button"
                onClick={() => {
                  setIsOpen(false);
                  if (onCloseMobile) onCloseMobile();
                  navigate(`/readings?search=${encodeURIComponent(query)}`);
                }}
                className="text-[11px] font-semibold text-[#73a89a] hover:underline"
              >
                View all results in Readings →
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
