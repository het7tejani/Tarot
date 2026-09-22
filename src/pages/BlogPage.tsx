import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams, Link, useLocation } from 'react-router-dom';
import {
  BookOpen,
  Calendar,
  Clock,
  ArrowRight,
  Sparkles,
  Search,
  X,
  Tag,
  Eye,
  ChevronRight,
  TrendingUp,
  Bookmark
} from 'lucide-react';
import { BlogPost, ReadingTopic } from '../types';
import { getBlogPosts, CMS_UPDATE_EVENT } from '../services/cmsStorage';
import { ArticleReaderModal } from '../components/ArticleReaderModal';

interface BlogPageProps {
  onSelectReading?: (reading: ReadingTopic) => void;
}

export const BlogPage: React.FC<BlogPageProps> = ({ onSelectReading }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();

  const [posts, setPosts] = useState<BlogPost[]>(() => getBlogPosts());
  const [selectedArticle, setSelectedArticle] = useState<BlogPost | null>(null);

  const initialSearch = searchParams.get('search') || '';
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Listen to live CMS updates from localStorage
  useEffect(() => {
    const handleUpdate = () => {
      setPosts(getBlogPosts());
    };
    window.addEventListener(CMS_UPDATE_EVENT, handleUpdate);
    return () => window.removeEventListener(CMS_UPDATE_EVENT, handleUpdate);
  }, []);

  // Synchronize URL search param
  useEffect(() => {
    const q = searchParams.get('search') || '';
    setSearchQuery(q);
  }, [searchParams]);

  // Check if an article is requested via query param ?article=slug-or-id
  useEffect(() => {
    const articleSlug = searchParams.get('article');
    if (articleSlug) {
      const match = posts.find((p) => p.slug === articleSlug || p.id === articleSlug);
      if (match) {
        setSelectedArticle(match);
      }
    }
  }, [searchParams, posts]);

  // Check URL hash if matching post ID
  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      const match = posts.find((p) => p.id === id || p.slug === id);
      if (match) {
        setSelectedArticle(match);
      }
    }
  }, [location.hash, posts]);

  // Categories list with counts
  const categories = useMemo(() => {
    const cats: { [key: string]: number } = {};
    posts.forEach((p) => {
      if (p.published !== false) {
        cats[p.category] = (cats[p.category] || 0) + 1;
      }
    });

    const list = [
      { id: 'all', label: 'All Chronicles', count: posts.filter((p) => p.published !== false).length },
      ...Object.keys(cats).map((c) => ({
        id: c,
        label: c,
        count: cats[c]
      }))
    ];
    return list;
  }, [posts]);

  // Filtered posts
  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      if (post.published === false) return false;
      if (selectedCategory !== 'all' && post.category !== selectedCategory) return false;

      if (!searchQuery.trim()) return true;
      const cleanQ = searchQuery.toLowerCase().trim();
      const titleMatch = post.title.toLowerCase().includes(cleanQ);
      const excerptMatch = post.excerpt.toLowerCase().includes(cleanQ);
      const categoryMatch = post.category.toLowerCase().includes(cleanQ);
      const tagsMatch = post.tags && post.tags.some((t) => t.toLowerCase().includes(cleanQ));
      const contentMatch = post.content ? post.content.toLowerCase().includes(cleanQ) : false;
      return titleMatch || excerptMatch || categoryMatch || tagsMatch || contentMatch;
    });
  }, [posts, selectedCategory, searchQuery]);

  // Featured article (first marked featured, or first published)
  const featuredArticle = useMemo(() => {
    return posts.find((p) => p.featured && p.published !== false) || posts.find((p) => p.published !== false);
  }, [posts]);

  const handleOpenArticle = (post: BlogPost) => {
    setSelectedArticle(post);
    const newParams = new URLSearchParams(searchParams);
    newParams.set('article', post.slug || post.id);
    setSearchParams(newParams);
  };

  const handleCloseArticle = () => {
    setSelectedArticle(null);
    const newParams = new URLSearchParams(searchParams);
    newParams.delete('article');
    setSearchParams(newParams);
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    const newParams = new URLSearchParams(searchParams);
    newParams.delete('search');
    setSearchParams(newParams);
  };

  return (
    <div className="pt-32 pb-24 bg-[#FAF8F5] min-h-screen text-[#1f2322]">
      {/* Top Banner / Publication Header */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#73a89a]/15 text-[#1f2322] text-xs font-semibold uppercase tracking-widest mb-3 border border-[#73a89a]/25">
            <BookOpen className="w-3.5 h-3.5 text-[#73a89a]" />
            <span>The Mystic Chronicle &bull; Editorial Journal</span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-[#1f2322] mb-4 tracking-tight">
            Esoteric Wisdom &amp; Guidance
          </h1>
          <p className="text-base sm:text-lg text-[#1f2322]/75 font-serif italic leading-relaxed max-w-2xl mx-auto">
            Deep-dive explorations into Tarot symbolism, energetic boundary clearing, astrological cycles, and clairvoyant discernment by Master Healer &amp; Shop Owner Daisy Hayes.
          </p>

          {/* In-Blog Search Bar */}
          <div className="mt-8 max-w-xl mx-auto relative">
            <div className="relative flex items-center">
              <Search className="w-4 h-4 text-[#1f2322]/40 absolute left-4 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  const newParams = new URLSearchParams(searchParams);
                  if (e.target.value) {
                    newParams.set('search', e.target.value);
                  } else {
                    newParams.delete('search');
                  }
                  setSearchParams(newParams);
                }}
                placeholder="Search articles, e.g. Court Cards, Cord Cutting, Twin Flame, Reiki..."
                className="w-full pl-11 pr-10 py-3 rounded-full bg-[#FFFFFF] border border-[#1f2322]/15 text-sm text-[#1f2322] placeholder:text-[#1f2322]/40 focus:outline-none focus:border-[#73a89a] shadow-xs"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={clearFilters}
                  className="absolute right-3 p-1 rounded-full text-[#1f2322]/40 hover:text-[#1f2322] hover:bg-[#1f2322]/5 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Featured Hero Story (shown when no search query is active) */}
        {!searchQuery && selectedCategory === 'all' && featuredArticle && (
          <div className="mb-14 bg-[#FFFFFF] rounded-3xl border border-[#1f2322]/10 overflow-hidden shadow-sm hover:shadow-md transition-all">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
              <div className="lg:col-span-7 h-64 sm:h-80 lg:h-auto relative overflow-hidden bg-[#1f2322]/5">
                <img
                  src={featuredArticle.coverImage}
                  alt={featuredArticle.title}
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 left-4">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1f2322] text-[#fdfcfb] text-xs font-semibold tracking-wide shadow-md">
                    <Sparkles className="w-3 h-3 text-[#E8D5A0]" />
                    Featured Dossier
                  </span>
                </div>
              </div>

              <div className="lg:col-span-5 p-8 sm:p-10 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2.5 text-xs text-[#1f2322]/60 mb-3">
                    <span className="font-semibold text-[#73a89a]">
                      {featuredArticle.category}
                    </span>
                    <span>&bull;</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {featuredArticle.readTime}
                    </span>
                  </div>

                  <h2
                    onClick={() => handleOpenArticle(featuredArticle)}
                    className="text-2xl sm:text-3xl font-serif font-bold text-[#1f2322] mb-3 hover:text-[#73a89a] transition-colors cursor-pointer leading-snug"
                  >
                    {featuredArticle.title}
                  </h2>

                  <p className="text-sm sm:text-base text-[#1f2322]/75 leading-relaxed mb-6 font-serif italic line-clamp-3">
                    {featuredArticle.excerpt}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#1f2322]/10 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <img
                      src={featuredArticle.author.avatar || 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80'}
                      alt={featuredArticle.author.name}
                      className="w-8 h-8 rounded-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div>
                      <p className="text-xs font-semibold text-[#1f2322]">{featuredArticle.author.name}</p>
                      <p className="text-[10px] text-[#1f2322]/50">{featuredArticle.date}</p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleOpenArticle(featuredArticle)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold bg-[#1f2322] text-[#fdfcfb] hover:bg-[#73a89a] transition-colors"
                  >
                    <span>Read Story</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Category Navigation Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none border-b border-[#1f2322]/10">
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-colors flex items-center gap-1.5 cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-[#1f2322] text-[#fdfcfb] shadow-xs'
                  : 'bg-[#FFFFFF] text-[#1f2322]/75 hover:bg-[#1f2322]/5 border border-[#1f2322]/10'
              }`}
            >
              <span>{cat.label}</span>
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                  selectedCategory === cat.id ? 'bg-[#fdfcfb]/20 text-white' : 'bg-[#1f2322]/5 text-[#1f2322]/60'
                }`}
              >
                {cat.count}
              </span>
            </button>
          ))}
        </div>

        {/* Active Filter Indicators */}
        {(searchQuery || selectedCategory !== 'all') && (
          <div className="mb-6 flex items-center justify-between bg-[#f4efec] px-4 py-2.5 rounded-2xl text-xs text-[#1f2322]/75 border border-[#1f2322]/10">
            <div>
              Showing {filteredPosts.length} article{filteredPosts.length === 1 ? '' : 's'}
              {searchQuery && (
                <span>
                  {' '}matching &ldquo;<strong>{searchQuery}</strong>&rdquo;
                </span>
              )}
              {selectedCategory !== 'all' && (
                <span>
                  {' '}in <strong>{selectedCategory}</strong>
                </span>
              )}
            </div>
            <button
              type="button"
              onClick={clearFilters}
              className="text-xs font-semibold text-[#1f2322] hover:text-[#73a89a] underline underline-offset-2"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Empty State */}
        {filteredPosts.length === 0 && (
          <div className="text-center py-16 px-4 bg-[#FFFFFF] rounded-3xl border border-[#1f2322]/10 max-w-lg mx-auto mb-16">
            <BookOpen className="w-10 h-10 text-[#73a89a] mx-auto mb-3" />
            <h3 className="text-xl font-bold font-serif text-[#1f2322] mb-2">No articles found</h3>
            <p className="text-sm text-[#1f2322]/70 mb-6 leading-relaxed">
              We couldn’t find any publications matching your filter criteria. Try searching for a broader term like &ldquo;Tarot&rdquo;, &ldquo;Reiki&rdquo;, or reset your filters.
            </p>
            <button
              type="button"
              onClick={clearFilters}
              className="px-5 py-2.5 rounded-full bg-[#1f2322] text-[#fdfcfb] text-xs font-semibold hover:bg-[#73a89a] transition-colors"
            >
              Show All Articles
            </button>
          </div>
        )}

        {/* Editorial Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {filteredPosts.map((post) => (
            <article
              key={post.id}
              id={post.id}
              className="bg-[#FFFFFF] rounded-3xl border border-[#1f2322]/10 overflow-hidden shadow-xs hover:shadow-md transition-all hover:border-[#73a89a]/50 flex flex-col justify-between group"
            >
              <div>
                {/* Image Thumbnail */}
                <div
                  onClick={() => handleOpenArticle(post)}
                  className="aspect-video relative overflow-hidden bg-[#1f2322]/5 cursor-pointer"
                >
                  <img
                    src={post.coverImage}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-0.5 rounded-full bg-[#fdfcfb]/90 backdrop-blur-xs text-[#1f2322] text-[11px] font-semibold border border-[#1f2322]/10">
                      {post.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center gap-2 text-[11px] text-[#1f2322]/60 mb-2.5">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {post.date}
                    </span>
                    <span>&bull;</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {post.readTime}
                    </span>
                    {post.views && (
                      <>
                        <span>&bull;</span>
                        <span className="flex items-center gap-1">
                          <Eye className="w-3 h-3" />
                          {post.views}
                        </span>
                      </>
                    )}
                  </div>

                  <h3
                    onClick={() => handleOpenArticle(post)}
                    className="text-xl font-serif font-bold text-[#1f2322] mb-2.5 line-clamp-2 hover:text-[#73a89a] transition-colors cursor-pointer leading-snug"
                  >
                    {post.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#1f2322]/70 leading-relaxed line-clamp-3 mb-4">
                    {post.excerpt}
                  </p>
                </div>
              </div>

              {/* Card Footer */}
              <div className="px-6 pb-6 pt-3 border-t border-[#1f2322]/5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <img
                    src={post.author.avatar || 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80'}
                    alt={post.author.name}
                    className="w-6 h-6 rounded-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <span className="text-xs text-[#1f2322]/80 font-medium">
                    {post.author.name}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => handleOpenArticle(post)}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-[#73a89a] hover:text-[#1f2322] transition-colors"
                >
                  <span>Read</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </article>
          ))}
        </div>

        {/* Newsletter & Free Tool Callout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="p-8 rounded-3xl bg-[#f4efec] border border-[#1f2322]/10 flex flex-col justify-between">
            <div>
              <Sparkles className="w-6 h-6 text-[#73a89a] mb-3" />
              <h3 className="text-2xl font-serif font-bold text-[#1f2322] mb-2">
                Practice Tarot on Our Free Altar
              </h3>
              <p className="text-sm text-[#1f2322]/75 leading-relaxed mb-6">
                Apply the card interpretations and elemental secrets from these articles instantly using our interactive 3-card spread tool with upright &amp; reversed card meanings.
              </p>
            </div>
            <Link
              to="/free-tarot"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#1f2322] text-[#fdfcfb] text-xs font-semibold hover:bg-[#73a89a] transition-colors w-full sm:w-auto self-start"
            >
              <span>Launch Interactive Card Draw</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="p-8 rounded-3xl bg-[#FFFFFF] border border-[#1f2322]/10 flex flex-col justify-between">
            <div>
              <Bookmark className="w-6 h-6 text-[#73a89a] mb-3" />
              <h3 className="text-2xl font-serif font-bold text-[#1f2322] mb-2">
                The Sacred Fortnightly Digest
              </h3>
              <p className="text-sm text-[#1f2322]/75 leading-relaxed mb-6">
                Curated astrological transit alerts, new moon rituals, and bespoke Tarot spreads delivered privately to your inbox twice a month.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                placeholder="Your sacred email address..."
                className="flex-1 px-4 py-2.5 rounded-full bg-[#FAF8F5] border border-[#1f2322]/15 text-xs text-[#1f2322] focus:outline-none focus:border-[#73a89a]"
              />
              <button
                type="button"
                onClick={() => alert('Thank you for subscribing to The Sacred Digest.')}
                className="px-5 py-2.5 rounded-full bg-[#1f2322] text-[#fdfcfb] text-xs font-semibold hover:bg-[#73a89a] transition-colors whitespace-nowrap"
              >
                Join Sanctuary
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Full Article Reader Modal */}
      {selectedArticle && (
        <ArticleReaderModal
          article={selectedArticle}
          onClose={handleCloseArticle}
          onSelectReading={onSelectReading}
        />
      )}
    </div>
  );
};
