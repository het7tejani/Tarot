export interface ReadingTopic {
  id: string;
  title: string;
  slug: string;
  tagline: string;
  price: string;
  originalPrice?: string;
  iconName: string;
  badge?: string;
  imageUrl?: string;
  cardsCount: string;
  deliveryTime: string;
  overview: string;
  questionsAnswered: string[];
  spreadDetails: string;
  whatYouReceive: string[];
  etsyListingUrl: string;
  category?: string;
}

export interface Testimonial {
  id: string;
  clientName: string;
  location: string;
  rating: number;
  readingType: string;
  date: string;
  review: string;
}

export interface FAQItem {
  question: string;
  answer: string;
  category: 'ordering' | 'reading' | 'delivery';
}

export interface TarotCard {
  name: string;
  number: string;
  arcana: string;
  image: string;
  keywords: string;
  upright: string;
  reversed?: string;
  advice: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  category: string;
  date: string;
  readTime: string;
  excerpt: string;
  content: string;
  coverImage: string;
  author: {
    name: string;
    role: string;
    avatar?: string;
  };
  tags: string[];
  featured?: boolean;
  published?: boolean;
  views?: number;
  keyTakeaways?: string[];
}

export interface CMSSettings {
  etsyBaseUrl: string;
  whatsappNumber: string;
  siteAnnouncement: string;
  contactEmail: string;
  showAnnouncement: boolean;
}
