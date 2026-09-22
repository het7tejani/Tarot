import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ScrollToTop } from './components/ScrollToTop';
import { RouteSEO } from './components/RouteSEO';
import { ReadingModal } from './components/ReadingModal';
import { EtsyLinkManager } from './components/EtsyLinkManager';
import { HomePage } from './pages/HomePage';
import { ServicesPage } from './pages/ServicesPage';
import { CoursesPage } from './pages/CoursesPage';
import { FreeTarotPage } from './pages/FreeTarotPage';
import { BlogPage } from './pages/BlogPage';
import { ReadingsPage } from './pages/ReadingsPage';
import { HowItWorksPage } from './pages/HowItWorksPage';
import { AboutPage } from './pages/AboutPage';
import { FAQPage } from './pages/FAQPage';
import { ContactPage } from './pages/ContactPage';
import { AdminPage } from './pages/AdminPage';
import { READINGS_DATA } from './data/readingsData';
import { ReadingTopic } from './types';
import { MessageCircle, Sparkles } from 'lucide-react';

export default function App() {
  const [selectedReading, setSelectedReading] = useState<ReadingTopic | null>(null);
  const [isEtsySettingsOpen, setIsEtsySettingsOpen] = useState(false);

  // Pure Light Theme enforcement
  useEffect(() => {
    document.documentElement.classList.remove('dark');
    localStorage.removeItem('app_theme');
  }, []);

  // Etsy URL State persisted in localStorage
  const [baseShopUrl, setBaseShopUrl] = useState<string>(() => {
    return localStorage.getItem('etsy_base_shop_url') || 'https://www.etsy.com/shop/PsychicEra';
  });

  const [customListingUrls, setCustomListingUrls] = useState<Record<string, string>>(() => {
    const saved = localStorage.getItem('etsy_custom_listing_urls');
    return saved ? JSON.parse(saved) : {};
  });

  const handleUpdateBaseShopUrl = (url: string) => {
    setBaseShopUrl(url);
    localStorage.setItem('etsy_base_shop_url', url);
  };

  const handleUpdateListingUrl = (id: string, url: string) => {
    const next = { ...customListingUrls, [id]: url };
    setCustomListingUrls(next);
    localStorage.setItem('etsy_custom_listing_urls', JSON.stringify(next));
  };

  const handleResetToDefaults = () => {
    setBaseShopUrl('https://www.etsy.com/shop/PsychicEra');
    setCustomListingUrls({});
    localStorage.removeItem('etsy_base_shop_url');
    localStorage.removeItem('etsy_custom_listing_urls');
  };

  const getEtsyUrl = (reading: ReadingTopic): string => {
    if (customListingUrls[reading.id]) {
      return customListingUrls[reading.id];
    }
    if (reading.etsyListingUrl && reading.etsyListingUrl !== 'YOUR_ETSY_LISTING_URL') {
      return reading.etsyListingUrl;
    }
    if (baseShopUrl && baseShopUrl !== 'YOUR_ETSY_LISTING_URL') {
      const cleanBase = baseShopUrl.replace(/\/$/, '');
      return `${cleanBase}?search_query=${encodeURIComponent(reading.title.split('|')[0].trim())}`;
    }
    return reading.etsyListingUrl || 'https://www.etsy.com/shop/PsychicEra';
  };

  return (
    <BrowserRouter>
      <ScrollToTop />
      <RouteSEO />
      <div className="min-h-screen flex flex-col justify-between bg-[#FAF8F5] text-[#2D2D2D] selection:bg-[#E8D5A0] selection:text-[#2A1B3D]">
        {/* Navigation Header with instant search for readings and blogs */}
        <Header
          onOpenSettings={() => setIsEtsySettingsOpen(true)}
          etsyBaseUrl={baseShopUrl}
          onSelectReading={(reading) => setSelectedReading(reading)}
        />

        {/* Multi-Page Route Structure */}
        <main id="main-content" className="flex-1">
          <Routes>
            <Route
              path="/"
              element={
                <HomePage
                  onSelectReading={(reading) => setSelectedReading(reading)}
                  getEtsyUrl={getEtsyUrl}
                />
              }
            />
            <Route
              path="/services"
              element={<ServicesPage etsyBaseUrl={baseShopUrl} />}
            />
            <Route path="/courses" element={<CoursesPage />} />
            <Route path="/free-tarot" element={<FreeTarotPage />} />
            <Route
              path="/blog"
              element={
                <BlogPage
                  onSelectReading={(reading) => setSelectedReading(reading)}
                />
              }
            />
            <Route path="/admin" element={<AdminPage />} />
            <Route
              path="/readings"
              element={
                <ReadingsPage
                  onSelectReading={(reading) => setSelectedReading(reading)}
                  getEtsyUrl={getEtsyUrl}
                />
              }
            />
            <Route
              path="/how-it-works"
              element={<HowItWorksPage etsyBaseUrl={baseShopUrl} />}
            />
            <Route path="/about" element={<AboutPage />} />
            <Route
              path="/faq"
              element={<FAQPage etsyBaseUrl={baseShopUrl} />}
            />
            <Route
              path="/contact"
              element={<ContactPage etsyBaseUrl={baseShopUrl} />}
            />
            {/* Fallback to Home */}
            <Route
              path="*"
              element={
                <HomePage
                  onSelectReading={(reading) => setSelectedReading(reading)}
                  getEtsyUrl={getEtsyUrl}
                />
              }
            />
          </Routes>
        </main>

        {/* Global Footer in deep plum & gold */}
        <Footer
          onOpenSettings={() => setIsEtsySettingsOpen(true)}
          etsyBaseUrl={baseShopUrl}
        />

        {/* Detail Modal for Readings */}
        <ReadingModal
          reading={selectedReading}
          onClose={() => setSelectedReading(null)}
          etsyUrl={selectedReading ? getEtsyUrl(selectedReading) : ''}
        />

        {/* Etsy Listing URL Configurator */}
        <EtsyLinkManager
          isOpen={isEtsySettingsOpen}
          onClose={() => setIsEtsySettingsOpen(false)}
          baseShopUrl={baseShopUrl}
          onUpdateBaseShopUrl={handleUpdateBaseShopUrl}
          customListingUrls={customListingUrls}
          onUpdateListingUrl={handleUpdateListingUrl}
          onResetToDefaults={handleResetToDefaults}
          readings={READINGS_DATA}
        />

        {/* Floating Quick Action Buttons (WhatsApp Booking + Free Tarot) */}
        <div className="fixed bottom-5 right-5 z-30 flex flex-col gap-2 items-end">
          <a
            href="https://wa.me/919872771591?text=Hi%20Daisy%2C%20I%20would%20like%20to%20inquire%20about%20a%20session."
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-semibold shadow-lg transition-all border border-[#25D366]/40 bg-[#25D366] text-[#FFFFFF] hover:bg-[#20ba5a] active:scale-95"
            title="Chat on WhatsApp"
            id="floating-whatsapp-btn"
          >
            <MessageCircle className="w-4 h-4 fill-white" />
            <span className="hidden sm:inline">WhatsApp Us</span>
          </a>
        </div>
      </div>
    </BrowserRouter>
  );
}
