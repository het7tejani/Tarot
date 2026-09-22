export interface PageSEO {
  title: string;
  description: string;
  canonicalPath: string;
  ogType?: 'website' | 'article' | 'profile';
  ogImage?: string;
  schema?: Record<string, unknown>;
}

export const SEO_CONFIG: Record<string, PageSEO> = {
  '/': {
    title: 'The Tarot Company — Insightful Spiritual Guidance & Tarot Readings',
    description: 'Empowering lives through authentic Tarot readings, Usui Reiki Grandmastery, chakra balance, and holistic spiritual guidance since 2004.',
    canonicalPath: '/',
    ogType: 'website',
    ogImage: '/tarot/the_star.jpg',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'ProfessionalService',
      name: 'The Tarot Company',
      url: 'https://thetarotcompany.com',
      image: '/tarot/the_star.jpg',
      description: 'Holistic healing, intuitive tarot readings, and spiritual empowerment by Poonam Sharma.',
      founder: {
        '@type': 'Person',
        name: 'Poonam Sharma',
        jobTitle: 'Master Intuitive & Reiki Grandmaster',
      },
      foundingDate: '2004',
      priceRange: '$$',
    },
  },
  '/free-tarot': {
    title: 'Free Online Tarot Card Reading — The Tarot Company',
    description: 'Draw authentic 1909 Rider-Waite Tarot cards online with instant intuitive upright and reversed interpretations for daily clarity.',
    canonicalPath: '/free-tarot',
    ogType: 'website',
    ogImage: '/tarot/the_fool.jpg',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      name: 'Free Online Tarot Oracle',
      applicationCategory: 'LifestyleApplication',
      operatingSystem: 'All',
      description: 'Interactive digital divination tool rendering high-resolution 1909 Rider-Waite Major Arcana cards with upright and shadow interpretations.',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
      },
    },
  },
  '/readings': {
    title: 'Personalized Tarot & Psychic Readings — The Tarot Company',
    description: 'Order personalized Tarot readings on consecrated linen delivered with physical altar photos and detailed PDF guidance within 24–48 hours.',
    canonicalPath: '/readings',
    ogType: 'website',
    ogImage: '/tarot/the_magician.jpg',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'OfferCatalog',
      name: 'Personalized Tarot Consultations',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Love & Twin Flame Sacred Spread',
            description: '5-card deep dive into relationship dynamics, karmic connections, and future trajectory.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Career & Life Purpose Blueprint',
            description: 'Comprehensive 7-card spread identifying career transitions and soul mission alignment.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Spiritual Awakening & Shadow Work',
            description: '9-card sacred mirror session uncovering hidden blocks and subconscious guidance.',
          },
        },
      ],
    },
  },
  '/services': {
    title: 'Holistic Healing Services & Modalities — The Tarot Company',
    description: 'Explore 30+ healing modalities including Usui Reiki, Lama Fera, Akashic Records, Chakra Balancing, Hypnotherapy, and Spiritual Life Coaching.',
    canonicalPath: '/services',
    ogType: 'website',
    ogImage: '/tarot/the_high_priestess.jpg',
  },
  '/courses': {
    title: 'Tarot & Reiki Certification Courses — The Tarot Company',
    description: 'Professional certification courses in Rider-Waite-Smith Tarot, Usui Reiki Grandmastery, Pendulum Dowsing, and Angelic Healing.',
    canonicalPath: '/courses',
    ogType: 'website',
    ogImage: '/tarot/the_hierophant.jpg',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'EducationalOccupationalProgram',
      name: 'The Tarot Company Academy',
      description: 'Comprehensive esoteric training programs for aspiring professional tarot readers and certified Reiki healers.',
      provider: {
        '@type': 'Organization',
        name: 'The Tarot Company',
      },
    },
  },
  '/how-it-works': {
    title: 'How It Works: Ordering Your Tarot Reading — The Tarot Company',
    description: 'Learn about our sacred preparation, consecrated linen draws, photographic proof, and personalized delivery process within 24–48 hours.',
    canonicalPath: '/how-it-works',
    ogType: 'website',
    ogImage: '/tarot/wheel_of_fortune.jpg',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'HowTo',
      name: 'How to Receive an Intuitive Tarot Reading',
      step: [
        {
          '@type': 'HowToStep',
          name: 'Choose Your Reading Topic',
          text: 'Select the reading spread that corresponds to your present questions on love, career, or spiritual path.',
        },
        {
          '@type': 'HowToStep',
          name: 'Sacred Ritual & Card Draw',
          text: 'Poonam Sharma meditates upon your question and draws cards upon consecrated linen in a sacred space.',
        },
        {
          '@type': 'HowToStep',
          name: 'Personalized Delivery',
          text: 'Receive a high-resolution photo of your actual card spread and a comprehensive PDF interpretation within 24-48 hours.',
        },
      ],
    },
  },
  '/about': {
    title: 'About Poonam Sharma — Master Intuitive & Reiki Grandmaster',
    description: 'Discover the 20-year journey of Poonam Sharma, Tarot Acharya, author, and Usui Reiki Grandmaster guiding seekers worldwide since 2004.',
    canonicalPath: '/about',
    ogType: 'profile',
    ogImage: '/tarot/the_empress.jpg',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: 'Poonam Sharma',
      jobTitle: 'Founder, Master Intuitive & Reiki Grandmaster',
      worksFor: {
        '@type': 'Organization',
        name: 'The Tarot Company',
      },
      description: 'Pioneering spiritual author, Tarot Acharya, and healer with over 20,000 global consultations.',
    },
  },
  '/faq': {
    title: 'Frequently Asked Questions — The Tarot Company',
    description: 'Find answers to common questions regarding tarot readings, energy healing, confidentiality, delivery timelines, and session prep.',
    canonicalPath: '/faq',
    ogType: 'website',
    ogImage: '/tarot/the_hermit.jpg',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'How do distance tarot readings work?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Energy is non-local. Poonam Sharma conducts an in-depth meditation and ritual, drawing physical cards on consecrated linen specifically attuned to your question.',
          },
        },
        {
          '@type': 'Question',
          name: 'How quickly will I receive my reading?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'All Etsy personalized readings are delivered directly to your Etsy messages within 24 to 48 hours accompanied by physical altar photos.',
          },
        },
      ],
    },
  },
  '/contact': {
    title: 'Contact Us & Book Private Session — The Tarot Company',
    description: 'Connect with Poonam Sharma for in-person consultations in Mohali & Chandigarh or online remote healing sessions across 18+ countries.',
    canonicalPath: '/contact',
    ogType: 'website',
    ogImage: '/tarot/the_sun.jpg',
  },
  '/blog': {
    title: 'Sacred Insights & Tarot Wisdom — The Tarot Company',
    description: 'Articles, seasonal tarot guidance, meditation practices, and esoteric wisdom for spiritual alignment and conscious living.',
    canonicalPath: '/blog',
    ogType: 'website',
    ogImage: '/tarot/the_world.jpg',
  },
};
