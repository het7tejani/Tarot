import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Lock,
  Unlock,
  KeyRound,
  FileText,
  ShoppingBag,
  Settings,
  Plus,
  Edit2,
  Trash2,
  Eye,
  EyeOff,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  Sparkles,
  RefreshCw,
  Search,
  ArrowRight,
  LogOut,
  Image as ImageIcon,
  Check,
  X,
  Clock,
  Calendar,
  Layers,
  SlidersHorizontal,
  Bookmark
} from 'lucide-react';
import { BlogPost, ReadingTopic, CMSSettings } from '../types';
import {
  getBlogPosts,
  saveBlogPost,
  deleteBlogPost,
  resetBlogPosts,
  getReadings,
  saveReading,
  deleteReading,
  resetReadings,
  getCMSSettings,
  saveCMSSettings,
  isAdminAuthenticated,
  loginAdmin,
  logoutAdmin,
  CMS_UPDATE_EVENT
} from '../services/cmsStorage';
import { ArticleReaderModal } from '../components/ArticleReaderModal';

export const AdminPage: React.FC = () => {
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => isAdminAuthenticated());
  const [passwordInput, setPasswordInput] = useState('');
  const [authError, setAuthError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Active CMS Tab
  const [activeTab, setActiveTab] = useState<'blogs' | 'readings' | 'settings'>('blogs');

  // Data States
  const [blogs, setBlogs] = useState<BlogPost[]>(() => getBlogPosts());
  const [readings, setReadings] = useState<ReadingTopic[]>(() => getReadings());
  const [settings, setSettings] = useState<CMSSettings>(() => getCMSSettings());

  // Blog Management States
  const [blogSearch, setBlogSearch] = useState('');
  const [blogCategoryFilter, setBlogCategoryFilter] = useState('all');
  const [blogStatusFilter, setBlogStatusFilter] = useState<'all' | 'published' | 'draft'>('all');
  const [isBlogModalOpen, setIsBlogModalOpen] = useState(false);
  const [editingBlog, setEditingBlog] = useState<BlogPost | null>(null);
  const [previewArticle, setPreviewArticle] = useState<BlogPost | null>(null);

  // Reading Management States
  const [isReadingModalOpen, setIsReadingModalOpen] = useState(false);
  const [editingReading, setEditingReading] = useState<ReadingTopic | null>(null);

  // Notification Banner
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Sync with storage updates
  useEffect(() => {
    const handleCmsUpdate = () => {
      setBlogs(getBlogPosts());
      setReadings(getReadings());
      setSettings(getCMSSettings());
    };
    window.addEventListener(CMS_UPDATE_EVENT, handleCmsUpdate);
    return () => window.removeEventListener(CMS_UPDATE_EVENT, handleCmsUpdate);
  }, []);

  // Handle Login
  const handleLogin = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (loginAdmin(passwordInput)) {
      setIsAuthenticated(true);
      setAuthError('');
      showToast('Welcome to The Tarot Company Admin CMS');
    } else {
      setAuthError('Incorrect passcode. Default passcode is: tarotadmin');
    }
  };

  const handleQuickDemoLogin = () => {
    setPasswordInput('tarotadmin');
    if (loginAdmin('tarotadmin')) {
      setIsAuthenticated(true);
      setAuthError('');
      showToast('Authenticated with Administrator access');
    }
  };

  const handleLogout = () => {
    logoutAdmin();
    setIsAuthenticated(false);
    setPasswordInput('');
  };

  // Blog Form Initial State
  const defaultBlogForm: BlogPost = {
    id: '',
    slug: '',
    title: '',
    category: 'Tarot Wisdom',
    date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    readTime: '6 min read',
    excerpt: '',
    content: '',
    coverImage: 'https://images.unsplash.com/photo-1514537092892-23c2a9d821fc?auto=format&fit=crop&w=1200&q=80',
    author: {
      name: 'Mystic Poonam',
      role: 'Founder & Grandmaster Tarot Reader',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80'
    },
    tags: ['Tarot Wisdom', 'Spiritual Practice'],
    featured: false,
    published: true,
    views: 120,
    keyTakeaways: [
      'Understand the core energetic meaning before doing the spread.',
      'Maintain clear sacred intention during your consultation.'
    ]
  };

  const [blogFormData, setBlogFormData] = useState<BlogPost>(defaultBlogForm);

  const handleOpenNewBlog = () => {
    const newId = 'post-' + Date.now();
    setBlogFormData({
      ...defaultBlogForm,
      id: newId,
      slug: 'new-sacred-article-' + Date.now().toString().slice(-4)
    });
    setEditingBlog(null);
    setIsBlogModalOpen(true);
  };

  const handleEditBlog = (post: BlogPost) => {
    setBlogFormData({ ...post });
    setEditingBlog(post);
    setIsBlogModalOpen(true);
  };

  const handleSaveBlog = (e: React.FormEvent) => {
    e.preventDefault();
    if (!blogFormData.title.trim()) {
      alert('Please enter an article title.');
      return;
    }
    const finalSlug = blogFormData.slug?.trim() || blogFormData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const toSave: BlogPost = {
      ...blogFormData,
      slug: finalSlug,
      id: blogFormData.id || 'post-' + Date.now()
    };
    saveBlogPost(toSave);
    setIsBlogModalOpen(false);
    showToast(editingBlog ? 'Article updated successfully' : 'New article published to blog');
  };

  const handleDeleteBlog = (id: string, title: string) => {
    if (window.confirm(`Are you sure you want to delete "${title}"?`)) {
      deleteBlogPost(id);
      showToast('Article removed from publication');
    }
  };

  const handleTogglePublish = (post: BlogPost) => {
    const updated: BlogPost = {
      ...post,
      published: !post.published
    };
    saveBlogPost(updated);
    showToast(updated.published ? 'Article marked as Published' : 'Article moved to Drafts');
  };

  const handleResetBlogSampleData = () => {
    if (window.confirm('Reset all blog articles to the original curated spiritual editorial collection?')) {
      resetBlogPosts();
      showToast('Blog articles restored to default curated series');
    }
  };

  // Preset Image URLs for quick selection
  const imagePresets = [
    { label: 'Tarot Deck', url: 'https://images.unsplash.com/photo-1514537092892-23c2a9d821fc?auto=format&fit=crop&w=1200&q=80' },
    { label: 'Meditation & Biofield', url: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1200&q=80' },
    { label: 'Celestial / Sun', url: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1200&q=80' },
    { label: 'Sacred Flame', url: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80' },
    { label: 'Romance / Roses', url: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&w=1200&q=80' },
    { label: 'Crystals / Alchemy', url: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=1200&q=80' }
  ];

  // ========================================================
  // VIEW: AUTHENTICATION LOGIN
  // ========================================================
  if (!isAuthenticated) {
    return (
      <div className="pt-32 pb-24 min-h-screen bg-[#FAF8F5] flex items-center justify-center px-4">
        <div className="w-full max-w-md bg-[#FFFFFF] rounded-3xl border border-[#1f2322]/15 shadow-xl p-8 sm:p-10 text-[#1f2322]">
          <div className="text-center mb-8">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-[#73a89a]/20 border border-[#73a89a]/30 flex items-center justify-center mb-4 text-[#1f2322]">
              <Lock className="w-7 h-7 text-[#73a89a]" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#1f2322]">
              The Tarot Company CMS
            </h1>
            <p className="text-xs sm:text-sm text-[#1f2322]/60 mt-1.5">
              Secure Administration &amp; Editorial Management Portal
            </p>
          </div>

          {authError && (
            <div className="mb-6 p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{authError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#1f2322]/70 mb-1.5">
                Admin Passcode / Master Key
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  placeholder="Enter admin passcode (e.g. tarotadmin)"
                  className="w-full pl-4 pr-10 py-3 rounded-xl bg-[#FAF8F5] border border-[#1f2322]/20 text-sm text-[#1f2322] focus:outline-none focus:border-[#73a89a]"
                  autoFocus
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-[#1f2322]/40 hover:text-[#1f2322]"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-full bg-[#1f2322] hover:bg-[#73a89a] text-[#fdfcfb] font-semibold text-xs transition-colors flex items-center justify-center gap-2"
            >
              <KeyRound className="w-4 h-4" />
              <span>Access CMS Workspace</span>
            </button>
          </form>

          {/* Quick Access helper button */}
          <div className="mt-8 pt-6 border-t border-[#1f2322]/10 text-center">
            <p className="text-xs text-[#1f2322]/60 mb-3">
              One-Click Administrator Passcode Access:
            </p>
            <button
              type="button"
              onClick={handleQuickDemoLogin}
              className="px-4 py-2 rounded-full bg-[#73a89a]/15 hover:bg-[#73a89a]/25 text-[#1f2322] text-xs font-medium border border-[#73a89a]/30 transition-colors inline-flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#73a89a]" />
              <span>Autofill &amp; Sign In (`tarotadmin`)</span>
            </button>
          </div>

          <div className="mt-6 text-center">
            <Link
              to="/"
              className="text-xs text-[#1f2322]/60 hover:text-[#73a89a] inline-flex items-center gap-1"
            >
              <span>&larr; Return to The Tarot Company Storefront</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Filtered blogs for table
  const filteredBlogs = blogs.filter((b) => {
    if (blogStatusFilter === 'published' && b.published === false) return false;
    if (blogStatusFilter === 'draft' && b.published !== false) return false;
    if (blogCategoryFilter !== 'all' && b.category !== blogCategoryFilter) return false;

    if (!blogSearch.trim()) return true;
    const q = blogSearch.toLowerCase().trim();
    return (
      b.title.toLowerCase().includes(q) ||
      b.category.toLowerCase().includes(q) ||
      b.excerpt.toLowerCase().includes(q) ||
      (b.tags && b.tags.some((t) => t.toLowerCase().includes(q)))
    );
  });

  const categoriesList = Array.from(new Set(blogs.map((b) => b.category)));

  // ========================================================
  // VIEW: AUTHENTICATED CMS DASHBOARD
  // ========================================================
  return (
    <div className="pt-32 pb-20 min-h-screen bg-[#FAF8F5] text-[#1f2322]">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#1f2322] text-[#fdfcfb] px-5 py-3 rounded-2xl shadow-xl flex items-center gap-3 text-xs font-medium animate-fadeIn border border-[#73a89a]/40">
          <CheckCircle2 className="w-4 h-4 text-[#73a89a]" />
          <span>{toastMessage}</span>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Header Bar */}
        <div className="bg-[#FFFFFF] rounded-3xl border border-[#1f2322]/10 p-6 sm:p-8 shadow-xs mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-[#73a89a] animate-pulse" />
              <span className="text-xs uppercase tracking-widest font-semibold text-[#73a89a]">
                Admin Management Console
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#1f2322]">
              The Tarot Company &bull; Content Studio
            </h1>
            <p className="text-xs sm:text-sm text-[#1f2322]/65 mt-0.5">
              Manage esoteric blog articles, adjust Tarot reading pricing &amp; configure storefront integrations.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 self-stretch md:self-auto">
            <Link
              to="/blog"
              target="_blank"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-medium bg-[#1f2322]/5 hover:bg-[#1f2322]/10 text-[#1f2322] transition-colors"
            >
              <span>View Public Blog</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-60" />
            </Link>

            <button
              type="button"
              onClick={handleResetBlogSampleData}
              title="Restore standard curated articles"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-medium bg-[#1f2322]/5 hover:bg-[#1f2322]/10 text-[#1f2322] transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5 text-[#73a89a]" />
              <span>Reset Default Articles</span>
            </button>

            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-semibold bg-red-50 text-red-700 hover:bg-red-100 transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>

        {/* CMS Navigation Tabs */}
        <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-2 scrollbar-none">
          <button
            type="button"
            onClick={() => setActiveTab('blogs')}
            className={`px-5 py-2.5 rounded-full text-xs font-semibold transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'blogs'
                ? 'bg-[#1f2322] text-[#fdfcfb] shadow-xs'
                : 'bg-[#FFFFFF] text-[#1f2322]/70 hover:bg-[#1f2322]/5 border border-[#1f2322]/10'
            }`}
          >
            <FileText className="w-4 h-4 text-[#73a89a]" />
            <span>Blog &amp; Mystic Articles ({blogs.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('readings')}
            className={`px-5 py-2.5 rounded-full text-xs font-semibold transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'readings'
                ? 'bg-[#1f2322] text-[#fdfcfb] shadow-xs'
                : 'bg-[#FFFFFF] text-[#1f2322]/70 hover:bg-[#1f2322]/5 border border-[#1f2322]/10'
            }`}
          >
            <ShoppingBag className="w-4 h-4 text-[#73a89a]" />
            <span>Tarot Spreads &amp; Listings ({readings.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('settings')}
            className={`px-5 py-2.5 rounded-full text-xs font-semibold transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'settings'
                ? 'bg-[#1f2322] text-[#fdfcfb] shadow-xs'
                : 'bg-[#FFFFFF] text-[#1f2322]/70 hover:bg-[#1f2322]/5 border border-[#1f2322]/10'
            }`}
          >
            <Settings className="w-4 h-4 text-[#73a89a]" />
            <span>Shop &amp; Altar Settings</span>
          </button>
        </div>

        {/* ======================================================== */}
        {/* TAB 1: BLOG ARTICLES CMS */}
        {/* ======================================================== */}
        {activeTab === 'blogs' && (
          <div className="space-y-6">
            {/* Quick Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="bg-[#FFFFFF] p-5 rounded-2xl border border-[#1f2322]/10">
                <p className="text-xs text-[#1f2322]/60 font-medium">Total Articles</p>
                <p className="text-2xl font-bold font-serif text-[#1f2322] mt-1">{blogs.length}</p>
              </div>
              <div className="bg-[#FFFFFF] p-5 rounded-2xl border border-[#1f2322]/10">
                <p className="text-xs text-[#1f2322]/60 font-medium">Published Live</p>
                <p className="text-2xl font-bold font-serif text-emerald-700 mt-1">
                  {blogs.filter((b) => b.published !== false).length}
                </p>
              </div>
              <div className="bg-[#FFFFFF] p-5 rounded-2xl border border-[#1f2322]/10">
                <p className="text-xs text-[#1f2322]/60 font-medium">Drafts Pending</p>
                <p className="text-2xl font-bold font-serif text-amber-600 mt-1">
                  {blogs.filter((b) => b.published === false).length}
                </p>
              </div>
              <div className="bg-[#FFFFFF] p-5 rounded-2xl border border-[#1f2322]/10">
                <p className="text-xs text-[#1f2322]/60 font-medium">Total Reader Views</p>
                <p className="text-2xl font-bold font-serif text-[#73a89a] mt-1">
                  {blogs.reduce((acc, curr) => acc + (curr.views || 0), 0).toLocaleString()}
                </p>
              </div>
            </div>

            {/* Action Bar & Filters */}
            <div className="bg-[#FFFFFF] rounded-2xl border border-[#1f2322]/10 p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
                <div className="relative flex-1 sm:w-64">
                  <Search className="w-4 h-4 text-[#1f2322]/40 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    value={blogSearch}
                    onChange={(e) => setBlogSearch(e.target.value)}
                    placeholder="Search articles..."
                    className="w-full pl-9 pr-3 py-1.5 rounded-full bg-[#FAF8F5] border border-[#1f2322]/15 text-xs text-[#1f2322] focus:outline-none focus:border-[#73a89a]"
                  />
                </div>

                <select
                  value={blogCategoryFilter}
                  onChange={(e) => setBlogCategoryFilter(e.target.value)}
                  className="px-3 py-1.5 rounded-full bg-[#FAF8F5] border border-[#1f2322]/15 text-xs text-[#1f2322] focus:outline-none focus:border-[#73a89a]"
                >
                  <option value="all">All Categories</option>
                  {categoriesList.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>

                <select
                  value={blogStatusFilter}
                  onChange={(e) => setBlogStatusFilter(e.target.value as any)}
                  className="px-3 py-1.5 rounded-full bg-[#FAF8F5] border border-[#1f2322]/15 text-xs text-[#1f2322] focus:outline-none focus:border-[#73a89a]"
                >
                  <option value="all">All Statuses</option>
                  <option value="published">Published Only</option>
                  <option value="draft">Drafts Only</option>
                </select>
              </div>

              <button
                type="button"
                onClick={handleOpenNewBlog}
                className="w-full sm:w-auto px-5 py-2.5 rounded-full bg-[#1f2322] hover:bg-[#73a89a] text-[#fdfcfb] text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 shrink-0"
              >
                <Plus className="w-4 h-4" />
                <span>Create New Article</span>
              </button>
            </div>

            {/* Articles Table */}
            <div className="bg-[#FFFFFF] rounded-3xl border border-[#1f2322]/10 overflow-hidden shadow-xs">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-[#1f2322]">
                  <thead className="bg-[#f4efec] border-b border-[#1f2322]/10 text-[#1f2322]/60 uppercase tracking-wider text-[10px]">
                    <tr>
                      <th className="py-3.5 px-4 font-semibold">Article</th>
                      <th className="py-3.5 px-4 font-semibold">Category</th>
                      <th className="py-3.5 px-4 font-semibold">Author</th>
                      <th className="py-3.5 px-4 font-semibold">Published</th>
                      <th className="py-3.5 px-4 font-semibold">Status</th>
                      <th className="py-3.5 px-4 font-semibold text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#1f2322]/5">
                    {filteredBlogs.map((post) => (
                      <tr key={post.id} className="hover:bg-[#FAF8F5] transition-colors">
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-3">
                            <img
                              src={post.coverImage}
                              alt=""
                              className="w-12 h-10 rounded-lg object-cover bg-[#1f2322]/10 shrink-0"
                              referrerPolicy="no-referrer"
                            />
                            <div className="max-w-xs sm:max-w-md">
                              <p className="font-semibold text-sm text-[#1f2322] line-clamp-1">
                                {post.title}
                              </p>
                              <p className="text-[11px] text-[#1f2322]/60 line-clamp-1">
                                {post.excerpt}
                              </p>
                            </div>
                          </div>
                        </td>

                        <td className="py-4 px-4 whitespace-nowrap">
                          <span className="px-2.5 py-0.5 rounded-full bg-[#73a89a]/15 text-[#1f2322] font-medium text-[11px]">
                            {post.category}
                          </span>
                        </td>

                        <td className="py-4 px-4 whitespace-nowrap text-[#1f2322]/80">
                          {post.author.name}
                        </td>

                        <td className="py-4 px-4 whitespace-nowrap text-[#1f2322]/60">
                          {post.date}
                        </td>

                        <td className="py-4 px-4 whitespace-nowrap">
                          <button
                            type="button"
                            onClick={() => handleTogglePublish(post)}
                            className={`px-2.5 py-1 rounded-full font-medium text-[10px] cursor-pointer inline-flex items-center gap-1 ${
                              post.published !== false
                                ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                                : 'bg-amber-100 text-amber-800 hover:bg-amber-200'
                            }`}
                          >
                            {post.published !== false ? 'Published' : 'Draft'}
                          </button>
                        </td>

                        <td className="py-4 px-4 whitespace-nowrap text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              type="button"
                              onClick={() => setPreviewArticle(post)}
                              title="Preview Article"
                              className="p-1.5 rounded-lg text-[#1f2322]/60 hover:text-[#1f2322] hover:bg-[#1f2322]/10 transition-colors"
                            >
                              <Eye className="w-4 h-4" />
                            </button>

                            <button
                              type="button"
                              onClick={() => handleEditBlog(post)}
                              title="Edit Article"
                              className="p-1.5 rounded-lg text-[#1f2322]/60 hover:text-[#73a89a] hover:bg-[#73a89a]/10 transition-colors"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>

                            <button
                              type="button"
                              onClick={() => handleDeleteBlog(post.id, post.title)}
                              title="Delete Article"
                              className="p-1.5 rounded-lg text-[#1f2322]/60 hover:text-red-600 hover:bg-red-50 transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}

                    {filteredBlogs.length === 0 && (
                      <tr>
                        <td colSpan={6} className="py-12 text-center text-sm text-[#1f2322]/60">
                          No articles found matching the current search filters.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 2: TAROT READINGS CMS */}
        {/* ======================================================== */}
        {activeTab === 'readings' && (
          <div className="space-y-6">
            <div className="bg-[#FFFFFF] rounded-2xl border border-[#1f2322]/10 p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-serif font-bold text-[#1f2322]">
                  Active Tarot Readings &amp; Clairvoyant Offerings
                </h3>
                <p className="text-xs text-[#1f2322]/65">
                  Update pricing, discount badges, delivery turnaround, and Etsy direct purchase links.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    if (window.confirm('Reset all reading topics to original curated catalog?')) {
                      resetReadings();
                      showToast('Tarot offerings reset to default');
                    }
                  }}
                  className="px-4 py-2 rounded-full bg-[#1f2322]/5 hover:bg-[#1f2322]/10 text-xs font-medium transition-colors"
                >
                  Reset Catalog
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {readings.map((r) => (
                <div
                  key={r.id}
                  className="bg-[#FFFFFF] rounded-2xl border border-[#1f2322]/10 p-5 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="text-[10px] uppercase font-bold text-[#73a89a] px-2 py-0.5 rounded-full bg-[#73a89a]/15">
                        {r.category || 'Tarot'}
                      </span>
                      {r.badge && (
                        <span className="text-[10px] font-semibold text-[#1f2322] bg-[#E8D5A0]/50 px-2 py-0.5 rounded-full">
                          {r.badge}
                        </span>
                      )}
                    </div>

                    <h4 className="font-serif font-bold text-base text-[#1f2322] mb-1 line-clamp-2">
                      {r.title}
                    </h4>
                    <p className="text-xs text-[#1f2322]/65 line-clamp-2 mb-3">
                      {r.tagline}
                    </p>

                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-xl font-bold text-[#1f2322]">{r.price}</span>
                      {r.originalPrice && (
                        <span className="text-xs line-through text-[#1f2322]/40">
                          {r.originalPrice}
                        </span>
                      )}
                      <span className="text-[11px] text-[#1f2322]/60 ml-auto">
                        {r.deliveryTime}
                      </span>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-[#1f2322]/10 flex items-center justify-between">
                    <a
                      href={r.etsyListingUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-medium text-[#73a89a] hover:underline flex items-center gap-1"
                    >
                      <span>Etsy Link</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>

                    <button
                      type="button"
                      onClick={() => {
                        setEditingReading(r);
                        setIsReadingModalOpen(true);
                      }}
                      className="px-3 py-1.5 rounded-full text-xs font-semibold bg-[#1f2322] text-[#fdfcfb] hover:bg-[#73a89a] transition-colors"
                    >
                      Edit Offering
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 3: SHOP & ALTAR SETTINGS */}
        {/* ======================================================== */}
        {activeTab === 'settings' && (
          <div className="bg-[#FFFFFF] rounded-3xl border border-[#1f2322]/10 p-6 sm:p-10 max-w-3xl">
            <h3 className="text-2xl font-serif font-bold text-[#1f2322] mb-2">
              Sanctuary &amp; Integration Settings
            </h3>
            <p className="text-xs sm:text-sm text-[#1f2322]/65 mb-8">
              Update global storefront endpoints, customer inquiry channels, and banner notifications.
            </p>

            <div className="space-y-6">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#1f2322]/75 mb-2">
                  Etsy Shop URL (Global Destination)
                </label>
                <input
                  type="text"
                  value={settings.etsyBaseUrl}
                  onChange={(e) => setSettings({ ...settings, etsyBaseUrl: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-[#FAF8F5] border border-[#1f2322]/15 text-sm text-[#1f2322] focus:outline-none focus:border-[#73a89a]"
                />
                <p className="text-[11px] text-[#1f2322]/50 mt-1">
                  Seekers clicking &ldquo;Shop on Etsy&rdquo; across all headers and footers are routed here.
                </p>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#1f2322]/75 mb-2">
                  WhatsApp Priority Inquiry Number
                </label>
                <input
                  type="text"
                  value={settings.whatsappNumber}
                  onChange={(e) => setSettings({ ...settings, whatsappNumber: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-[#FAF8F5] border border-[#1f2322]/15 text-sm text-[#1f2322] focus:outline-none focus:border-[#73a89a]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#1f2322]/75 mb-2">
                  Public Contact Email
                </label>
                <input
                  type="email"
                  value={settings.contactEmail}
                  onChange={(e) => setSettings({ ...settings, contactEmail: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-[#FAF8F5] border border-[#1f2322]/15 text-sm text-[#1f2322] focus:outline-none focus:border-[#73a89a]"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#1f2322]/75">
                    Storefront Announcement Banner
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer text-xs">
                    <input
                      type="checkbox"
                      checked={settings.showAnnouncement}
                      onChange={(e) => setSettings({ ...settings, showAnnouncement: e.target.checked })}
                      className="rounded text-[#73a89a]"
                    />
                    <span>Show Banner</span>
                  </label>
                </div>
                <input
                  type="text"
                  value={settings.siteAnnouncement}
                  onChange={(e) => setSettings({ ...settings, siteAnnouncement: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-[#FAF8F5] border border-[#1f2322]/15 text-sm text-[#1f2322] focus:outline-none focus:border-[#73a89a]"
                />
              </div>

              <div className="pt-4 border-t border-[#1f2322]/10">
                <button
                  type="button"
                  onClick={() => {
                    saveCMSSettings(settings);
                    showToast('Settings saved successfully');
                  }}
                  className="px-6 py-3 rounded-full bg-[#1f2322] hover:bg-[#73a89a] text-[#fdfcfb] font-semibold text-xs transition-colors"
                >
                  Save Storefront Settings
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ======================================================== */}
      {/* MODAL: CREATE / EDIT BLOG ARTICLE */}
      {/* ======================================================== */}
      {isBlogModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex justify-center p-3 sm:p-6 animate-fadeIn">
          <div className="relative bg-[#fdfcfb] w-full max-w-4xl rounded-3xl shadow-2xl border border-[#1f2322]/15 overflow-hidden flex flex-col my-auto max-h-[92vh]">
            <div className="sticky top-0 z-20 bg-[#fdfcfb] px-6 py-4 border-b border-[#1f2322]/10 flex items-center justify-between">
              <h2 className="text-xl font-serif font-bold text-[#1f2322]">
                {editingBlog ? 'Edit Spiritual Article' : 'Compose New Article'}
              </h2>
              <button
                type="button"
                onClick={() => setIsBlogModalOpen(false)}
                className="p-1.5 rounded-full text-[#1f2322]/60 hover:text-[#1f2322] hover:bg-[#1f2322]/5"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveBlog} className="overflow-y-auto p-6 sm:p-8 space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#1f2322]/75 mb-1">
                    Article Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={blogFormData.title}
                    onChange={(e) => setBlogFormData({ ...blogFormData, title: e.target.value })}
                    placeholder="e.g. How to Decode Court Cards in Tarot"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF8F5] border border-[#1f2322]/15 text-sm text-[#1f2322] focus:outline-none focus:border-[#73a89a]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#1f2322]/75 mb-1">
                    Category *
                  </label>
                  <input
                    type="text"
                    required
                    value={blogFormData.category}
                    onChange={(e) => setBlogFormData({ ...blogFormData, category: e.target.value })}
                    placeholder="Tarot Wisdom, Energy Healing, Psychic Insight..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF8F5] border border-[#1f2322]/15 text-sm text-[#1f2322] focus:outline-none focus:border-[#73a89a]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#1f2322]/75 mb-1">
                    Author Name
                  </label>
                  <input
                    type="text"
                    value={blogFormData.author.name}
                    onChange={(e) =>
                      setBlogFormData({
                        ...blogFormData,
                        author: { ...blogFormData.author, name: e.target.value }
                      })
                    }
                    className="w-full px-3.5 py-2 rounded-xl bg-[#FAF8F5] border border-[#1f2322]/15 text-xs text-[#1f2322]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#1f2322]/75 mb-1">
                    Read Time
                  </label>
                  <input
                    type="text"
                    value={blogFormData.readTime}
                    onChange={(e) => setBlogFormData({ ...blogFormData, readTime: e.target.value })}
                    placeholder="e.g. 7 min read"
                    className="w-full px-3.5 py-2 rounded-xl bg-[#FAF8F5] border border-[#1f2322]/15 text-xs text-[#1f2322]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#1f2322]/75 mb-1">
                    Date
                  </label>
                  <input
                    type="text"
                    value={blogFormData.date}
                    onChange={(e) => setBlogFormData({ ...blogFormData, date: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-[#FAF8F5] border border-[#1f2322]/15 text-xs text-[#1f2322]"
                  />
                </div>
              </div>

              {/* Cover Image URL with quick presets */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#1f2322]/75 mb-1">
                  Cover Image URL
                </label>
                <input
                  type="text"
                  value={blogFormData.coverImage}
                  onChange={(e) => setBlogFormData({ ...blogFormData, coverImage: e.target.value })}
                  placeholder="https://..."
                  className="w-full px-3.5 py-2 rounded-xl bg-[#FAF8F5] border border-[#1f2322]/15 text-xs text-[#1f2322] mb-2"
                />
                <div className="flex flex-wrap items-center gap-1.5">
                  <span className="text-[10px] text-[#1f2322]/50 mr-1">Quick Presets:</span>
                  {imagePresets.map((preset, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setBlogFormData({ ...blogFormData, coverImage: preset.url })}
                      className="text-[10px] px-2 py-0.5 rounded-md bg-[#1f2322]/5 hover:bg-[#73a89a]/20 text-[#1f2322]/80 transition-colors"
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Excerpt */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#1f2322]/75 mb-1">
                  Summary / Excerpt *
                </label>
                <textarea
                  rows={2}
                  required
                  value={blogFormData.excerpt}
                  onChange={(e) => setBlogFormData({ ...blogFormData, excerpt: e.target.value })}
                  placeholder="A compelling 2-3 sentence overview for the article preview card..."
                  className="w-full px-3.5 py-2 rounded-xl bg-[#FAF8F5] border border-[#1f2322]/15 text-xs text-[#1f2322] focus:outline-none focus:border-[#73a89a]"
                />
              </div>

              {/* Main Markdown / Content */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#1f2322]/75">
                    Article Body &amp; Markdown *
                  </label>
                  <span className="text-[10px] text-[#1f2322]/50">
                    Supports `### Subheading`, `1. Numbered List`, `&gt; Quote`
                  </span>
                </div>
                <textarea
                  rows={10}
                  required
                  value={blogFormData.content}
                  onChange={(e) => setBlogFormData({ ...blogFormData, content: e.target.value })}
                  placeholder="Write the full in-depth sacred article here. Use paragraph breaks and headings..."
                  className="w-full p-4 rounded-xl bg-[#FAF8F5] border border-[#1f2322]/15 text-sm text-[#1f2322] font-mono leading-relaxed focus:outline-none focus:border-[#73a89a]"
                />
              </div>

              {/* Tags */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#1f2322]/75 mb-1">
                  Tags (comma-separated)
                </label>
                <input
                  type="text"
                  value={blogFormData.tags.join(', ')}
                  onChange={(e) =>
                    setBlogFormData({
                      ...blogFormData,
                      tags: e.target.value.split(',').map((t) => t.trim()).filter(Boolean)
                    })
                  }
                  placeholder="Tarot, Major Arcana, Divination, Psychic Growth"
                  className="w-full px-3.5 py-2 rounded-xl bg-[#FAF8F5] border border-[#1f2322]/15 text-xs text-[#1f2322]"
                />
              </div>

              {/* Toggles */}
              <div className="flex flex-wrap items-center gap-6 pt-2">
                <label className="flex items-center gap-2 cursor-pointer text-xs font-medium">
                  <input
                    type="checkbox"
                    checked={blogFormData.published !== false}
                    onChange={(e) => setBlogFormData({ ...blogFormData, published: e.target.checked })}
                    className="rounded text-[#73a89a]"
                  />
                  <span>Published Live on Public Site</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer text-xs font-medium">
                  <input
                    type="checkbox"
                    checked={!!blogFormData.featured}
                    onChange={(e) => setBlogFormData({ ...blogFormData, featured: e.target.checked })}
                    className="rounded text-[#73a89a]"
                  />
                  <span>Mark as Featured Hero Story</span>
                </label>
              </div>

              {/* Modal Actions */}
              <div className="pt-4 border-t border-[#1f2322]/10 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsBlogModalOpen(false)}
                  className="px-5 py-2 rounded-full text-xs font-semibold text-[#1f2322]/70 hover:bg-[#1f2322]/5"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-full text-xs font-semibold bg-[#1f2322] text-[#fdfcfb] hover:bg-[#73a89a] transition-colors"
                >
                  {editingBlog ? 'Save Changes' : 'Publish Article'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* MODAL: EDIT TAROT READING OFFERING */}
      {/* ======================================================== */}
      {isReadingModalOpen && editingReading && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex justify-center p-3 sm:p-6 animate-fadeIn">
          <div className="relative bg-[#fdfcfb] w-full max-w-xl rounded-3xl shadow-2xl border border-[#1f2322]/15 overflow-hidden flex flex-col my-auto max-h-[90vh]">
            <div className="bg-[#fdfcfb] px-6 py-4 border-b border-[#1f2322]/10 flex items-center justify-between">
              <h2 className="text-xl font-serif font-bold text-[#1f2322]">
                Edit Tarot Spread Offering
              </h2>
              <button
                type="button"
                onClick={() => setIsReadingModalOpen(false)}
                className="p-1.5 rounded-full text-[#1f2322]/60 hover:text-[#1f2322] hover:bg-[#1f2322]/5"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4 overflow-y-auto">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#1f2322]/75 mb-1">
                  Reading Title
                </label>
                <input
                  type="text"
                  value={editingReading.title}
                  onChange={(e) => setEditingReading({ ...editingReading, title: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF8F5] border border-[#1f2322]/15 text-sm text-[#1f2322]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#1f2322]/75 mb-1">
                  Tagline / Catchphrase
                </label>
                <input
                  type="text"
                  value={editingReading.tagline}
                  onChange={(e) => setEditingReading({ ...editingReading, tagline: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF8F5] border border-[#1f2322]/15 text-xs text-[#1f2322]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#1f2322]/75 mb-1">
                    Current Price
                  </label>
                  <input
                    type="text"
                    value={editingReading.price}
                    onChange={(e) => setEditingReading({ ...editingReading, price: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-[#FAF8F5] border border-[#1f2322]/15 text-xs text-[#1f2322]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#1f2322]/75 mb-1">
                    Original Strike Price
                  </label>
                  <input
                    type="text"
                    value={editingReading.originalPrice || ''}
                    onChange={(e) => setEditingReading({ ...editingReading, originalPrice: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-[#FAF8F5] border border-[#1f2322]/15 text-xs text-[#1f2322]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#1f2322]/75 mb-1">
                    Badge / Tag
                  </label>
                  <input
                    type="text"
                    value={editingReading.badge || ''}
                    onChange={(e) => setEditingReading({ ...editingReading, badge: e.target.value })}
                    placeholder="Bestseller • 70% OFF"
                    className="w-full px-3.5 py-2 rounded-xl bg-[#FAF8F5] border border-[#1f2322]/15 text-xs text-[#1f2322]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#1f2322]/75 mb-1">
                    Turnaround Time
                  </label>
                  <input
                    type="text"
                    value={editingReading.deliveryTime}
                    onChange={(e) => setEditingReading({ ...editingReading, deliveryTime: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-[#FAF8F5] border border-[#1f2322]/15 text-xs text-[#1f2322]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#1f2322]/75 mb-1">
                  Etsy Listing Link
                </label>
                <input
                  type="text"
                  value={editingReading.etsyListingUrl}
                  onChange={(e) => setEditingReading({ ...editingReading, etsyListingUrl: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-[#FAF8F5] border border-[#1f2322]/15 text-xs text-[#1f2322]"
                />
              </div>

              <div className="pt-4 border-t border-[#1f2322]/10 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsReadingModalOpen(false)}
                  className="px-4 py-2 rounded-full text-xs font-semibold text-[#1f2322]/60 hover:bg-[#1f2322]/5"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => {
                    saveReading(editingReading);
                    setIsReadingModalOpen(false);
                    showToast('Reading offering updated');
                  }}
                  className="px-5 py-2 rounded-full text-xs font-semibold bg-[#1f2322] text-[#fdfcfb] hover:bg-[#73a89a]"
                >
                  Save Offering
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* MODAL: PREVIEW ARTICLE */}
      {/* ======================================================== */}
      {previewArticle && (
        <ArticleReaderModal
          article={previewArticle}
          onClose={() => setPreviewArticle(null)}
        />
      )}
    </div>
  );
};
