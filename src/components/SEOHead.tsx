import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const SITE_ORIGIN = 'https://thepsychicstudio.com';
const ORG_ID = `${SITE_ORIGIN}/#organization`;
const SEGMENT_LABELS: Record<string, string> = {
  'tarot-card-meanings': 'Tarot Card Meanings', horoscope: 'Horoscope', zodiac: 'Zodiac Signs', 'zodiac-compatibility': 'Zodiac Compatibility',
  'angel-numbers': 'Angel Numbers', blog: 'Blog', readings: 'Readings', shop: 'Shop', about: 'About', faq: 'FAQ', contact: 'Contact', 'free-tarot': 'Free Tarot',
};
const titleCase = (s: string) => s.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
export const siteSchemas = (pathname: string, pageName: string): Record<string, unknown>[] => {
  const out: Record<string, unknown>[] = [];
  if (pathname === '/') {
    out.push({
      '@context': 'https://schema.org', '@type': 'Organization', '@id': ORG_ID, name: 'The Psychic Studio', url: SITE_ORIGIN,
      logo: `${SITE_ORIGIN}/navbar-480.png`, email: 'contact.thepsychicstudio@gmail.com',
      sameAs: ['https://about.me/thepsychicstudio', 'https://medium.com/@thepsychicstudio', 'https://thepsychicstudio.tumblr.com', 'https://www.pinterest.com/contactthepsychicstudio/', 'https://www.quora.com/profile/The-Psychic-Studio', 'https://www.trustpilot.com/review/thepsychicstudio.com'],
    });
    out.push({ '@context': 'https://schema.org', '@type': 'WebSite', '@id': `${SITE_ORIGIN}/#website`, name: 'The Psychic Studio', url: SITE_ORIGIN, publisher: { '@id': ORG_ID } });
  } else {
    const parts = pathname.split('/').filter(Boolean);
    const items = [{ '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_ORIGIN}/` }];
    parts.forEach((seg, i) => {
      const path = '/' + parts.slice(0, i + 1).join('/');
      const last = i === parts.length - 1;
      const name = last && i > 0 ? pageName : SEGMENT_LABELS[seg] || titleCase(seg);
      items.push({ '@type': 'ListItem', position: i + 2, name, item: `${SITE_ORIGIN}${path}` });
    });
    out.push({ '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: items });
  }
  return out;
};

export interface SEOHeadProps {
  title: string;
  noindex?: boolean;
  description: string;
  canonicalUrl?: string;
  ogType?: 'website' | 'article' | 'profile';
  ogImage?: string;
  schema?: Record<string, unknown> | Array<Record<string, unknown>>;
}

const SEOHeadInner: React.FC<SEOHeadProps> = ({
  title,
  description,
  canonicalUrl,
  ogType = 'website',
  ogImage,
  schema,
  noindex = false,
}) => {
  const location = useLocation();
  const origin = SITE_ORIGIN;
  const rawCanonical = canonicalUrl ? (canonicalUrl.startsWith('/') ? `${origin}${canonicalUrl}` : canonicalUrl) : `${origin}${location.pathname}`;
  const resolvedCanonical = rawCanonical.replace(/\/+$/, '') + (rawCanonical.replace(/\/+$/, '') === origin ? '/' : '');
  const resolvedImage = ogImage || `${origin}/tarot/the_star.jpg`;
  const pageName = title.replace(/\s*\|\s*The Psychic Studio$/, '');
  const base = schema ? (Array.isArray(schema) ? schema : [schema]) : [];
  const allSchema = noindex ? base : [...base, ...siteSchemas(location.pathname, pageName)];
  const head = { title, description, canonical: resolvedCanonical, ogType, image: resolvedImage, noindex, schema: allSchema };
  if (typeof document === 'undefined') (globalThis as any).__SEO_HEAD__ = head;

  useEffect(() => {
    // 1. Update Document Title
    document.title = title;

    // Helper function to update or create a meta tag
    const setMetaTag = (attr: 'name' | 'property', key: string, content: string) => {
      let meta = document.querySelector(`meta[${attr}="${key}"]`);
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute(attr, key);
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', content);
    };

    // 2. Meta Description
    setMetaTag('name', 'description', description);
    setMetaTag('name', 'robots', noindex ? 'noindex, nofollow' : 'index, follow');

    // 3. Dynamic Canonical URL Resolution

    let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', resolvedCanonical);

    // 4. OpenGraph Social Meta Tags
    setMetaTag('property', 'og:title', title);
    setMetaTag('property', 'og:description', description);
    setMetaTag('property', 'og:url', resolvedCanonical);
    setMetaTag('property', 'og:type', ogType);
    setMetaTag('property', 'og:site_name', 'The Psychic Studio');

    setMetaTag('property', 'og:image', resolvedImage);

    // 5. Twitter / X Card Meta Tags
    setMetaTag('name', 'twitter:card', 'summary_large_image');
    setMetaTag('name', 'twitter:title', title);
    setMetaTag('name', 'twitter:description', description);
    setMetaTag('name', 'twitter:image', resolvedImage);

    // 6. Schema.org JSON-LD Structured Data
    const scriptId = 'seo-dynamic-json-ld';
    let scriptTag = document.getElementById(scriptId) as HTMLScriptElement | null;

    if (allSchema.length) {
      if (!scriptTag) {
        scriptTag = document.createElement('script');
        scriptTag.id = scriptId;
        scriptTag.type = 'application/ld+json';
        document.head.appendChild(scriptTag);
      }
      scriptTag.textContent = JSON.stringify(allSchema);
    } else if (scriptTag) {
      scriptTag.remove();
    }
  }, [title, description, resolvedCanonical, ogType, resolvedImage, noindex, location.pathname]);

  return null;
};

const SUFFIX = ' | The Psychic Studio';
// Titles stay within 50-65 characters and descriptions within 100-160 where the source copy allows it.
export const fitTitle = (t: string): string => (t.length > 65 && t.endsWith(SUFFIX) ? t.slice(0, -SUFFIX.length) : t);
export const fitDescription = (d: string): string => {
  let out = d.trim();
  if (out.length < 100) out = `${out} Free guides, card meanings and reflection tools from The Psychic Studio.`;
  if (out.length > 160) { out = out.slice(0, 157).replace(/\s+\S*$/, '').replace(/[,;:.\s]+$/, '') + '...'; }
  return out;
};
export const SEOHead: React.FC<SEOHeadProps> = (props) => <SEOHeadInner {...props} title={fitTitle(props.title)} description={fitDescription(props.description)} />;
