import React, { useState, useEffect } from 'react';
import { Menu, X, ExternalLink, Sparkles, SlidersHorizontal, Search, Lock } from 'lucide-react';
import { NavLink, Link } from 'react-router-dom';
import { HeaderSearch } from './HeaderSearch';
import { ReadingTopic } from '../types';

interface HeaderProps {
  onOpenSettings?: () => void;
  etsyBaseUrl: string;
  onSelectReading?: (reading: ReadingTopic) => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenSettings,
  etsyBaseUrl,
  onSelectReading
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileSearchExpanded, setIsMobileSearchExpanded] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  // Auto-hide navbar on scroll down, reappear smoothly on scroll up or at page top
  useEffect(() => {
    let lastScrollY = Math.max(0, window.scrollY);

    const handleScroll = () => {
      const currentScrollY = Math.max(0, window.scrollY);

      // Always show at top of page
      if (currentScrollY <= 25) {
        setIsVisible(true);
        lastScrollY = currentScrollY;
        return;
      }

      // Keep navbar visible if mobile drawer or search dropdown is open
      if (isMobileMenuOpen || isMobileSearchExpanded) {
        setIsVisible(true);
        return;
      }

      const deltaY = currentScrollY - lastScrollY;
      // Scroll down threshold -> hide smoothly
      if (deltaY > 10 && currentScrollY > 100) {
        setIsVisible(false);
      } else if (deltaY < -10) {
        // Scroll up -> show
        setIsVisible(true);
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMobileMenuOpen, isMobileSearchExpanded]);

  return (
    <header
      id="header"
      className={`fixed top-0 left-0 right-0 z-40 bg-[#f4efec]/95 backdrop-blur-md border-b border-[#1f2322]/10 transition-transform duration-300 ease-in-out shadow-xs ${
        isVisible ? 'translate-y-0' : '-translate-y-full shadow-none pointer-events-none'
      }`}
    >
      {/* ─── UPPER DECK: Brand, Central Search Bar, Utility Actions & Etsy Store ─── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-3 sm:gap-6">
        {/* Brand / Logo */}
        <Link
          to="/"
          className="flex items-center gap-2.5 group focus:outline-none shrink-0"
          aria-label="The Tarot Company"
          id="brand-logo-link"
          onClick={() => {
            setIsMobileMenuOpen(false);
            setIsMobileSearchExpanded(false);
          }}
        >
          <div className="w-2.5 h-2.5 rounded-full bg-[#73a89a] group-hover:scale-125 transition-transform" />
          <div className="flex flex-col">
            <span className="font-semibold text-lg sm:text-xl text-[#1f2322] tracking-tight group-hover:text-[#73a89a] transition-colors whitespace-nowrap">
              The Tarot Company
            </span>
            <span className="hidden sm:inline-block text-[10px] tracking-wider uppercase text-[#1f2322]/50 font-medium">
              Spiritual Sanctuary &bull; Est. 2004
            </span>
          </div>
        </Link>

        {/* Central Search Bar (Desktop/Tablet) - Comfortable, prominent, uncrowded */}
        <div className="hidden md:block flex-1 max-w-md lg:max-w-lg mx-auto">
          <HeaderSearch onSelectReading={onSelectReading} />
        </div>

        {/* Upper Deck Right Actions */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          {/* Mobile Search Toggle Button */}
          <button
            type="button"
            onClick={() => {
              setIsMobileSearchExpanded(!isMobileSearchExpanded);
              if (isMobileMenuOpen) setIsMobileMenuOpen(false);
            }}
            className="md:hidden p-2 rounded-full text-[#1f2322]/80 hover:text-[#1f2322] hover:bg-[#1f2322]/5 transition-colors"
            aria-label="Search Tarot readings and blog topics"
            title="Search Tarot readings and blog topics"
            id="mobile-search-toggle-btn"
          >
            <Search className="w-4.5 h-4.5" />
          </button>

          {/* Admin CMS Access Link */}
          <Link
            to="/admin"
            className="hidden lg:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium text-[#1f2322]/70 hover:text-[#1f2322] hover:bg-[#1f2322]/5 transition-colors border border-[#1f2322]/10"
            title="Admin CMS & Blog Manager"
            id="header-admin-cms-link"
          >
            <Lock className="w-3 h-3 text-[#73a89a]" />
            <span>Admin CMS</span>
          </Link>

          {/* Etsy Shop Primary Button */}
          <a
            href={etsyBaseUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-2 rounded-full text-xs font-semibold bg-[#1f2322] text-[#fdfcfb] hover:bg-[#73a89a] transition-colors shadow-xs whitespace-nowrap"
            id="header-etsy-shop-btn"
          >
            <span>Etsy Shop</span>
            <ExternalLink className="w-3 h-3 opacity-70" />
          </a>

          {/* Etsy URLs Settings Trigger */}
          {onOpenSettings && (
            <button
              onClick={onOpenSettings}
              className="hidden sm:block p-2 rounded-full text-[#1f2322]/60 hover:text-[#1f2322] hover:bg-[#1f2322]/5 transition-colors"
              title="Configure Etsy URLs"
              aria-label="Configure Etsy URLs"
              id="header-settings-btn"
            >
              <SlidersHorizontal className="w-4 h-4" />
            </button>
          )}

          {/* Mobile Hamburger Toggle */}
          <button
            type="button"
            onClick={() => {
              setIsMobileMenuOpen(!isMobileMenuOpen);
              if (isMobileSearchExpanded) setIsMobileSearchExpanded(false);
            }}
            className="lg:hidden p-2 rounded-lg text-[#1f2322] hover:bg-[#1f2322]/5 transition-colors focus:outline-none ml-0.5"
            aria-label="Toggle navigation menu"
            id="mobile-menu-hamburger-btn"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* ─── LOWER DECK: Options Below (Clean, Spacious Primary Navigation) ─── */}
      <div className="border-t border-[#1f2322]/10 bg-[#FAF8F5]/90 backdrop-blur-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-11 sm:h-12 flex items-center justify-between gap-3 overflow-x-auto scrollbar-none">
          {/* Navigation Links Row */}
          <nav className="flex items-center gap-1 sm:gap-1.5 md:gap-2 shrink-0" aria-label="Main Navigation">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `text-[13px] sm:text-[14px] font-medium transition-colors py-1.5 px-2.5 sm:px-3 rounded-full whitespace-nowrap ${
                  isActive
                    ? 'text-[#1f2322] font-semibold bg-[#1f2322]/8'
                    : 'text-[#1f2322]/70 hover:text-[#1f2322] hover:bg-[#1f2322]/5'
                }`
              }
            >
              Home
            </NavLink>

            <NavLink
              to="/readings"
              className={({ isActive }) =>
                `text-[13px] sm:text-[14px] font-medium transition-colors py-1.5 px-2.5 sm:px-3 rounded-full whitespace-nowrap ${
                  isActive
                    ? 'text-[#1f2322] font-semibold bg-[#1f2322]/8'
                    : 'text-[#1f2322]/70 hover:text-[#1f2322] hover:bg-[#1f2322]/5'
                }`
              }
            >
              Readings
            </NavLink>

            <NavLink
              to="/services"
              className={({ isActive }) =>
                `text-[13px] sm:text-[14px] font-medium transition-colors py-1.5 px-2.5 sm:px-3 rounded-full whitespace-nowrap ${
                  isActive
                    ? 'text-[#1f2322] font-semibold bg-[#1f2322]/8'
                    : 'text-[#1f2322]/70 hover:text-[#1f2322] hover:bg-[#1f2322]/5'
                }`
              }
            >
              Services
            </NavLink>

            <NavLink
              to="/free-tarot"
              className={({ isActive }) =>
                `text-[13px] sm:text-[14px] font-medium transition-colors py-1.5 px-2.5 sm:px-3 rounded-full whitespace-nowrap inline-flex items-center gap-1.5 ${
                  isActive
                    ? 'text-[#1f2322] font-semibold bg-[#1f2322]/8'
                    : 'text-[#1f2322]/70 hover:text-[#1f2322] hover:bg-[#1f2322]/5'
                }`
              }
            >
              <span>Free Draw</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-[#73a89a]/15 text-[#73a89a] font-semibold">
                Instant
              </span>
            </NavLink>

            <NavLink
              to="/blog"
              className={({ isActive }) =>
                `text-[13px] sm:text-[14px] font-medium transition-colors py-1.5 px-2.5 sm:px-3 rounded-full whitespace-nowrap inline-flex items-center gap-1.5 ${
                  isActive
                    ? 'text-[#1f2322] font-semibold bg-[#1f2322]/8'
                    : 'text-[#1f2322]/70 hover:text-[#1f2322] hover:bg-[#1f2322]/5'
                }`
              }
            >
              <span>Blog</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-[#E8D5A0]/50 text-[#7C5F1E] font-medium">
                New
              </span>
            </NavLink>

            <NavLink
              to="/courses"
              className={({ isActive }) =>
                `text-[13px] sm:text-[14px] font-medium transition-colors py-1.5 px-2.5 sm:px-3 rounded-full whitespace-nowrap ${
                  isActive
                    ? 'text-[#1f2322] font-semibold bg-[#1f2322]/8'
                    : 'text-[#1f2322]/70 hover:text-[#1f2322] hover:bg-[#1f2322]/5'
                }`
              }
            >
              Courses
            </NavLink>

            <NavLink
              to="/about"
              className={({ isActive }) =>
                `text-[13px] sm:text-[14px] font-medium transition-colors py-1.5 px-2.5 sm:px-3 rounded-full whitespace-nowrap ${
                  isActive
                    ? 'text-[#1f2322] font-semibold bg-[#1f2322]/8'
                    : 'text-[#1f2322]/70 hover:text-[#1f2322] hover:bg-[#1f2322]/5'
                }`
              }
            >
              About
            </NavLink>

            <NavLink
              to="/faq"
              className={({ isActive }) =>
                `text-[13px] sm:text-[14px] font-medium transition-colors py-1.5 px-2.5 sm:px-3 rounded-full whitespace-nowrap ${
                  isActive
                    ? 'text-[#1f2322] font-semibold bg-[#1f2322]/8'
                    : 'text-[#1f2322]/70 hover:text-[#1f2322] hover:bg-[#1f2322]/5'
                }`
              }
            >
              FAQ
            </NavLink>

            <NavLink
              to="/contact"
              className={({ isActive }) =>
                `text-[13px] sm:text-[14px] font-medium transition-colors py-1.5 px-2.5 sm:px-3 rounded-full whitespace-nowrap ${
                  isActive
                    ? 'text-[#1f2322] font-semibold bg-[#1f2322]/8'
                    : 'text-[#1f2322]/70 hover:text-[#1f2322] hover:bg-[#1f2322]/5'
                }`
              }
            >
              Contact
            </NavLink>
          </nav>

          {/* Lower Deck Right Perk (Etsy Fast Turnaround Badge) */}
          <div className="hidden xl:flex items-center gap-2 text-xs text-[#1f2322]/70 shrink-0">
            <Sparkles className="w-3.5 h-3.5 text-[#73a89a]" />
            <span>24h-48h Delivery on Etsy &bull; 7,000+ Reviews</span>
          </div>
        </div>
      </div>

      {/* Mobile Search Bar Dropdown */}
      {isMobileSearchExpanded && (
        <div className="md:hidden bg-[#f4efec] border-t border-b border-[#1f2322]/10 px-4 py-3 animate-fadeIn">
          <HeaderSearch
            isMobile
            onSelectReading={onSelectReading}
            onCloseMobile={() => setIsMobileSearchExpanded(false)}
          />
        </div>
      )}

      {/* Mobile Drawer - Simple, clean list */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-[#f4efec] border-b border-[#1f2322]/10 px-6 py-6 animate-fadeIn">
          {/* Integrated search inside mobile drawer as well */}
          <div className="mb-4">
            <HeaderSearch
              isMobile
              onSelectReading={onSelectReading}
              onCloseMobile={() => setIsMobileMenuOpen(false)}
            />
          </div>

          <div className="flex flex-col gap-3 text-base">
            <Link
              to="/"
              onClick={() => setIsMobileMenuOpen(false)}
              className="py-2 text-[#1f2322] border-b border-[#1f2322]/5 font-medium hover:text-[#73a89a]"
            >
              Home
            </Link>
            <Link
              to="/readings"
              onClick={() => setIsMobileMenuOpen(false)}
              className="py-2 text-[#1f2322] border-b border-[#1f2322]/5 font-medium hover:text-[#73a89a]"
            >
              Readings &amp; Spreads
            </Link>
            <Link
              to="/services"
              onClick={() => setIsMobileMenuOpen(false)}
              className="py-2 text-[#1f2322] border-b border-[#1f2322]/5 font-medium hover:text-[#73a89a]"
            >
              Services &amp; Healing
            </Link>
            <Link
              to="/free-tarot"
              onClick={() => setIsMobileMenuOpen(false)}
              className="py-2 text-[#1f2322] border-b border-[#1f2322]/5 font-medium hover:text-[#73a89a] flex items-center justify-between"
            >
              <span>Free Online Card Draw</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#73a89a]/15 text-[#1f2322]">Instant</span>
            </Link>
            <Link
              to="/blog"
              onClick={() => setIsMobileMenuOpen(false)}
              className="py-2 text-[#1f2322] border-b border-[#1f2322]/5 font-medium hover:text-[#73a89a] flex items-center justify-between"
            >
              <span>Blog &amp; Esoteric Articles</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#E8D5A0]/50 text-[#7C5F1E]">New</span>
            </Link>
            <Link
              to="/courses"
              onClick={() => setIsMobileMenuOpen(false)}
              className="py-2 text-[#1f2322] border-b border-[#1f2322]/5 font-medium hover:text-[#73a89a]"
            >
              Courses &amp; Training
            </Link>
            <Link
              to="/about"
              onClick={() => setIsMobileMenuOpen(false)}
              className="py-2 text-[#1f2322] border-b border-[#1f2322]/5 font-medium hover:text-[#73a89a]"
            >
              About
            </Link>
            <Link
              to="/faq"
              onClick={() => setIsMobileMenuOpen(false)}
              className="py-2 text-[#1f2322] border-b border-[#1f2322]/5 font-medium hover:text-[#73a89a]"
            >
              FAQ
            </Link>
            <Link
              to="/contact"
              onClick={() => setIsMobileMenuOpen(false)}
              className="py-2 text-[#1f2322] border-b border-[#1f2322]/5 font-medium hover:text-[#73a89a]"
            >
              Contact
            </Link>
            <Link
              to="/admin"
              onClick={() => setIsMobileMenuOpen(false)}
              className="py-2 text-[#73a89a] border-b border-[#1f2322]/5 font-medium hover:text-[#1f2322] flex items-center justify-between"
            >
              <span className="flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5" />
                <span>Admin CMS Portal</span>
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#73a89a]/10 text-[#73a89a]">Manage</span>
            </Link>

            <div className="pt-4 flex flex-col gap-2.5">
              <a
                href={etsyBaseUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full text-center py-3 rounded-full text-xs font-semibold bg-[#1f2322] text-[#fdfcfb] hover:bg-[#73a89a] transition-colors"
              >
                Visit Etsy Shop (PsychicEra)
              </a>
              {onOpenSettings && (
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onOpenSettings();
                  }}
                  className="w-full text-center py-2.5 rounded-full text-xs font-medium text-[#1f2322]/70 border border-[#1f2322]/15 hover:bg-[#1f2322]/5 transition-colors"
                >
                  Configure Etsy Links
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
