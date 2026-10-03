import React from 'react';
import { useLocation } from 'react-router-dom';
import { SEOHead } from './SEOHead';
import { SEO_CONFIG } from '../data/seoConfig';

export const RouteSEO: React.FC = () => {
  const location = useLocation();

  const currentSEO = SEO_CONFIG[location.pathname] || {
    title: 'Online Psychic & Tarot Readings | The Psychic Studio',
    description: 'Explore personal psychic and tarot readings, or try the free online tarot draw.',
    canonicalPath: location.pathname,
    ogType: 'website' as const,
    ogImage: '/tarot/the_star.jpg',
  };

  const origin = typeof window !== 'undefined' ? window.location.origin : '';
  const fullCanonicalUrl = `${origin}${currentSEO.canonicalPath}`;
  const fullImageUrl = currentSEO.ogImage?.startsWith('http')
    ? currentSEO.ogImage
    : `${origin}${currentSEO.ogImage || '/tarot/the_star.jpg'}`;

  return (
    <SEOHead
      title={currentSEO.title}
      description={currentSEO.description}
      canonicalUrl={fullCanonicalUrl}
      ogType={currentSEO.ogType}
      ogImage={fullImageUrl}
      schema={currentSEO.schema}
    />
  );
};
