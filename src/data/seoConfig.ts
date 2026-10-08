export interface PageSEO {
  title: string; description: string; canonicalPath: string;
  ogType?: 'website' | 'article' | 'profile'; ogImage?: string;
  schema?: Record<string, unknown>;
}
const page = (path: string, title: string, description: string): PageSEO => ({
  title: `${title} | The Psychic Studio`, description, canonicalPath: path,
  ogType: 'website', ogImage: '/tarot/the_star.jpg',
});
export const SEO_CONFIG: Record<string, PageSEO> = {
  '/': page('/', 'Online Psychic & Tarot Readings', 'Explore personal psychic and tarot readings for love, life direction, and spiritual reflection. Browse Etsy readings or try a free online tarot draw.'),
  '/free-tarot': {
    ...page('/free-tarot', 'Free Tarot Reading Online: 1 or 3 Cards', 'Draw one or three cards from the 22 Major Arcana for a free online tarot reflection. Upright and reversed meanings, no account or payment details needed.'),
    schema: { '@context': 'https://schema.org', '@type': 'WebApplication', name: 'The Psychic Studio Free Tarot', applicationCategory: 'LifestyleApplication', operatingSystem: 'Web browser', offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' } },
  },
  '/shop': page('/shop', 'Psychic & Tarot Readings on Etsy', 'Browse personal psychic and tarot readings for love and life questions. Open each Etsy listing for current prices, formats, delivery details and policies.'),
  '/readings': page('/readings', 'Personal Psychic & Tarot Readings', 'Browse readings by question and explore love, life direction, and spiritual guidance. Review current prices, delivery details, and policies on Etsy.'),
  '/services': page('/services', 'Spiritual Services', 'Explore the spiritual service topics listed by The Psychic Studio. Check availability and service details before making a booking.'),
  '/courses': page('/courses', 'Tarot & Spiritual Learning', 'Explore tarot and spiritual learning topics. Contact the shop to confirm course availability, format, and details.'),
  '/how-it-works': page('/how-it-works', 'How to Order a Reading', 'Choose a reading, review its Etsy listing, and follow the order instructions. Check current prices, format, delivery estimates, and shop policies.'),
  '/about': page('/about', 'About Daisy Hayes and Her Tarot Approach', 'Meet Daisy Hayes at The Psychic Studio. Learn about her tarot approach, explore free card meanings and find personal readings in her Etsy shop.'),
  '/faq': page('/faq', 'Questions to Ask a Psychic: Reading FAQ', 'Find questions to ask a psychic and practical answers about tarot readings, free draws, Etsy orders, listing details and preparing for your reading.'),
  '/contact': page('/contact', 'Contact Daisy: Psychic Reading Questions', 'Have a question about a reading or an Etsy order? Contact the shop through Etsy and check the listing for delivery and service details.'),
  '/blog': page('/blog', 'Tarot Guides & Spiritual Reflection', 'Explore tarot guides, card meanings, and spiritual reflection articles. Find ideas for preparing questions and understanding your reading.'),
};
