import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout, ETSY } from './studio/Layout';
import { Home } from './studio/Home';
import { Shop } from './studio/Shop';
import { About, Contact, Blog, BlogPostPage, Faq } from './studio/Pages';
import { FreeTarotPage } from './pages/FreeTarotPage';
import { SeoPage } from './pages/SeoPage';
import { ALL_SEO_PAGES } from './data/seoPages';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/readings" element={<Navigate to="/shop" replace />} />
        <Route path="/about" element={<About />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogPostPage />} />
        <Route path="/free-tarot" element={<Layout seo={false}><FreeTarotPage /></Layout>} />
        {ALL_SEO_PAGES.map((p) => (
          <Route key={p.path} path={p.path} element={<Layout seo={false}><SeoPage etsyBaseUrl={ETSY} /></Layout>} />
        ))}
        <Route path="*" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}
