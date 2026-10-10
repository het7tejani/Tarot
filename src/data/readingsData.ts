import { ReadingTopic, FAQItem, Testimonial, TarotCard } from '../types';

export interface ServiceCategory {
  id: string;
  name: string;
  subtitle: string;
  badge: string;
  iconName: string;
  description: string;
  items: {
    title: string;
    description: string;
    duration?: string;
    slug?: string;
  }[];
}

export interface CourseItem {
  id: string;
  category: 'tarot' | 'reiki' | 'meditation';
  title: string;
  tagline: string;
  level: string;
  duration: string;
  features: string[];
  ctaText: string;
  imageUrl?: string;
}

export const SERVICES_CATEGORIES: ServiceCategory[] = [
  {
    id: 'fortune-guidance',
    name: 'Fortune & Guidance',
    subtitle: 'Tarot, Numerology, Astrology & Vaastu',
    badge: 'Guidance',
    iconName: 'Compass',
    description: 'Insightful, intuitive divination and celestial mapping to navigate crossroads, decode relationships, and align with divine timing.',
    items: [
      {
        title: 'Tarot Consultations & Spreads',
        description: 'Targeted spreads for Love, Career, Financial Abundance, and 12-Month Year Ahead forecasts.',
        duration: 'Delivered in 24–48h'
      },
      {
        title: 'Numerology & Name Correction',
        description: 'Vibrational destiny and life-path analysis to bring harmony to your personal and professional identity.',
        duration: 'In-depth Report'
      },
      {
        title: 'Vehicle Number Numerology',
        description: 'Harmonize your automobile and travel energetics with auspicious celestial numerical alignments.',
        duration: 'Quick Alignment'
      },
      {
        title: 'Yearly Solar Birthday Reading',
        description: 'A 13-card astrological wheel mapping your entire upcoming solar cycle month-by-month.',
        duration: '16+ Page Guide'
      }
    ]
  },
  {
    id: 'energy-healing',
    name: 'Energy Healing',
    subtitle: 'Reiki, Chakra, Crystal & Aura Balance',
    badge: 'Holistic Energy',
    iconName: 'Sparkles',
    description: 'Gentle, potent vibrational therapies to dissolve energetic blockages, restore the biofield, and awaken natural vitality.',
    items: [
      {
        title: 'Usui & Karuna Reiki Healing',
        description: 'Channeling pure universal life-force energy across chakras to revitalize fatigued subtle bodies.',
        duration: 'Remote & In-person'
      },
      {
        title: 'Chakra Balancing & Alignment',
        description: 'Clearing congested nodal meridians, grounding root energy, and opening intuition centers.',
        duration: '7 Chakra Session'
      },
      {
        title: 'Crystal Healing & Gridding',
        description: 'Utilizing consecrated sacred minerals to amplify high-frequency light within your aura.',
        duration: 'Targeted Aura Grid'
      },
      {
        title: 'Aura Cleansing & Shielding',
        description: 'Sweeping away stagnant external attachments and fortifying your energetic boundaries.',
        duration: 'Deep Purifying'
      }
    ]
  },
  {
    id: 'deep-healing',
    name: 'Deep Healing & Soul Therapy',
    subtitle: 'Inner Child, Regression & Cord Cutting',
    badge: 'Root Healing',
    iconName: 'HeartHandshake',
    description: 'Transformational therapeutic modalities reaching the subconscious root of recurring karmic loops, grief, and emotional blockages.',
    items: [
      {
        title: 'Inner Child Healing',
        description: 'Reconnecting with and nurturing wounded younger self-aspects to release adult anxiety and self-doubt.',
        duration: 'Guided Journey'
      },
      {
        title: 'Past Life Regression (PLR)',
        description: 'Safe subconscious exploration of prior soul memories to unlock persistent phobias and soul contracts.',
        duration: 'Transformational'
      },
      {
        title: 'Emotional Cord Cutting',
        description: 'Releasing toxic, draining psychological cords with past partners, family patterns, or old employers.',
        duration: 'Clean Severing'
      },
      {
        title: 'Ancestral & Lineage Healing',
        description: 'Healing intergenerational trauma and invoking the blessings and wisdom of your benevolent lineage.',
        duration: 'Deep Release'
      }
    ]
  },
  {
    id: 'coaching',
    name: 'Coaching & Mentorship',
    subtitle: 'Life Coaching, Leadership & Emotional Balance',
    badge: 'Empowerment',
    iconName: 'ShieldCheck',
    description: 'Structured, intuitive accountability and mindset coaching to help leaders, healers, and seekers step into their sovereign power.',
    items: [
      {
        title: 'Empowerment Life Coaching',
        description: 'Bridging spiritual intuition with actionable, disciplined milestone execution.',
        duration: 'Bi-Weekly Programs'
      },
      {
        title: 'Leadership & High-Impact Guidance',
        description: 'For entrepreneurs and visionaries seeking decision-making clarity without burnout.',
        duration: 'Custom Executive'
      },
      {
        title: 'Emotional Intelligence (EQ) Training',
        description: 'Mastering response over reaction, boundary setting, and conscious conflict resolution.',
        duration: 'Modular Coaching'
      }
    ]
  }
];

export const COURSES_DATA: CourseItem[] = [
  {
    id: 'tarot-foundations',
    category: 'tarot',
    title: 'Tarot Foundations Course',
    tagline: 'Master the 78 cards of the Rider-Waite deck from intuition—without relying on booklets.',
    level: 'Beginner to Intermediate',
    duration: '4 Weeks • Live + Self-Paced',
    imageUrl: 'https://images.unsplash.com/photo-1638803040283-7a5ffd48dad5?auto=format&fit=crop&w=800&q=80',
    features: [
      'Comprehensive breakdown of Major Arcana archetypes',
      'The 4 Elements, Suits & Court Card psychology',
      'How to cleanse, store, and consecrate your decks',
      'Conducting your first 3-card and 5-card spreads',
      'Official Certificate of Completion'
    ],
    ctaText: 'Enroll in Foundations'
  },
  {
    id: 'tarot-arcana-mastership',
    category: 'tarot',
    title: 'Tarot Arcana Mastership',
    tagline: 'Step into professional reading practice with confidence, ethical boundaries, and client mastery.',
    level: 'Professional Certification',
    duration: '20 Days Live + 3 Months Mentorship',
    imageUrl: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&w=800&q=80',
    features: [
      'Advanced Celtic Cross & Astrological Wheel reading',
      'Client psychology, handling sensitive relationship news',
      'Pricing, building your practice & Etsy shop setup',
      'Weekly live reading critiques & peer practice circles',
      'Professional Master Practitioner Credential'
    ],
    ctaText: 'Apply for Mastership'
  },
  {
    id: 'reiki-grandmaster',
    category: 'reiki',
    title: 'Reiki Grandmaster Lineage',
    tagline: 'Complete traditional Usui lineage transmission with attunements and master teaching authority.',
    level: 'Grandmaster Lineage',
    duration: '6 Months Intensive',
    imageUrl: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=80',
    features: [
      'Level 1, 2, 3 Master & Teacher Attunements',
      'Sacred sacred geometry symbols & distance healing attunement',
      'Teaching methodology to initiate your own students',
      'Deep psychic protection & sacred space holding',
      'Lifetime community & practitioner lineage certificate'
    ],
    ctaText: 'Inquire for Lineage'
  },
  {
    id: 'tarot-grandmaster',
    category: 'tarot',
    title: 'Tarot Arcana Grandmaster',
    tagline: 'Our premier 1-year apprenticeship combining Jungian archetypes, deep healing, and soul reading.',
    level: 'Elite Apprenticeship',
    duration: '1 Full Year • Weekly 1-on-1 Calls',
    imageUrl: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=800&q=80',
    features: [
      'Weekly personalized mentorship calls',
      'Combining Tarot with Inner Child & Shadow Work',
      'Curating custom therapeutic card spreads',
      'VIP guest masterclasses & retreat access',
      'Authorised Grandmaster Certification'
    ],
    ctaText: 'Apply for Apprenticeship'
  }
];

export const STATS = [
  { value: '20+ Years', label: 'Dedicated Sacred Practice' },
  { value: '20,000+', label: 'Clients Guided Worldwide' },
  { value: '4.9 ★', label: 'Etsy & Client Satisfaction' },
  { value: '30+', label: 'Healing & Divination Methods' }
];

export const FREE_TAROT_CARDS: TarotCard[] = [
  {
    name: 'The Fool',
    number: '0',
    arcana: 'Major Arcana',
    image: '/tarot/the_fool.jpg',
    keywords: 'New Beginnings, Innocent Faith, Spontaneity, Leap of Trust',
    upright: 'A fresh cycle beckons. Do not allow fear of the unknown to freeze your feet. Take the leap of faith—the universe will catch you.',
    reversed: 'Recklessness, unnecessary risk-taking, or fear holding you back from starting an exciting journey.',
    advice: 'Embrace a beginner’s mind. Release rigid expectations and allow wonder back into your decisions.'
  },
  {
    name: 'The Magician',
    number: 'I',
    arcana: 'Major Arcana',
    image: '/tarot/the_magician.jpg',
    keywords: 'Manifestation, Resourcefulness, Divine Alignment, Willpower',
    upright: 'You already possess every tool required to manifest your goal. Mind, emotion, spirit, and action are converging.',
    reversed: 'Untapped potential, blocked creativity, manipulation, or hesitation in using your natural gifts.',
    advice: 'Focus your intent. When you speak with conviction and act decisively, reality reshapes itself around you.'
  },
  {
    name: 'The High Priestess',
    number: 'II',
    arcana: 'Major Arcana',
    image: '/tarot/the_high_priestess.jpg',
    keywords: 'Intuition, Sacred Mystery, Subconscious Wisdom, Divine Feminine',
    upright: 'The answer is not found in outward noise or frantic logic. Sit quietly; your intuitive inner voice is whispering the exact direction.',
    reversed: 'Ignoring gut instincts, secrets coming to light, or emotional disconnect from your inner wisdom.',
    advice: 'Trust gut sensations and synchronicity. Look beyond obvious surfaces into emotional undercurrents.'
  },
  {
    name: 'The Empress',
    number: 'III',
    arcana: 'Major Arcana',
    image: '/tarot/the_empress.jpg',
    keywords: 'Abundance, Creative Fertility, Nurturing, Sensory Joy',
    upright: 'Prosperity and radiant growth surround you. A creative project, relationship, or personal dream is ready to bloom into tangible form.',
    reversed: 'Creative block, neglecting personal needs, smothering tendencies, or financial strain.',
    advice: 'Nurture yourself first. Treat your physical body as a temple and allow natural receptivity.'
  },
  {
    name: 'The Emperor',
    number: 'IV',
    arcana: 'Major Arcana',
    image: '/tarot/the_emperor.jpg',
    keywords: 'Structure, Divine Order, Stability, Protective Authority',
    upright: 'Clear boundaries and disciplined structure are needed. Step into benevolent leadership over your schedule and energy.',
    reversed: 'Rigidity, micromanagement, lack of discipline, or conflict with authority figures.',
    advice: 'Bring organization to chaos. Stand firm in your principles with calm, unshakeable composure.'
  },
  {
    name: 'The Hierophant',
    number: 'V',
    arcana: 'Major Arcana',
    image: '/tarot/the_hierophant.jpg',
    keywords: 'Spiritual Wisdom, Mentorship, Tradition, Higher Learning',
    upright: 'Seek counsel from proven mentors or timeless traditions. Deepen your study of sacred truths and ethical foundations.',
    reversed: 'Breaking outdated dogmas, forging your own unconventional path, or institutional restriction.',
    advice: 'Align actions with your deepest spiritual values rather than fleeting trends.'
  },
  {
    name: 'The Lovers',
    number: 'VI',
    arcana: 'Major Arcana',
    image: '/tarot/the_lovers.jpg',
    keywords: 'Soul Connection, Sacred Choice, Harmony, Core Alignment',
    upright: 'A meaningful union or pivotal crossroads. Choose with your heart and soul, not merely outward convenience.',
    reversed: 'Misalignment in values, inner conflict, communication breakdown, or rushed decisions.',
    advice: 'Ensure internal harmony before seeking external validation. Honesty in communication heals old rifts.'
  },
  {
    name: 'The Chariot',
    number: 'VII',
    arcana: 'Major Arcana',
    image: '/tarot/the_chariot.jpg',
    keywords: 'Focused Determination, Victory Over Discord, Momentum',
    upright: 'Conflicting forces are coming into alignment under your disciplined will. Keep your eyes on the finish line; momentum is building.',
    reversed: 'Loss of control, lack of direction, forceful aggression, or feeling pulled in opposite directions.',
    advice: 'Channel opposing emotions toward a singular worthy goal. Tenacity and focus deliver victory.'
  },
  {
    name: 'Strength',
    number: 'VIII',
    arcana: 'Major Arcana',
    image: '/tarot/strength.jpg',
    keywords: 'Gentle Fortitude, Compassion, Taming the Ego, Inner Courage',
    upright: 'True power does not shout or dominate—it embraces with patient compassion. You have the inner grace to navigate current pressures.',
    reversed: 'Self-doubt, feeling drained, raw emotional vulnerability, or explosive impatience.',
    advice: 'Tame reactive impulses with kindness. Soft power conquers what aggressive force cannot.'
  },
  {
    name: 'The Hermit',
    number: 'IX',
    arcana: 'Major Arcana',
    image: '/tarot/the_hermit.jpg',
    keywords: 'Introspection, Solitary Wisdom, Soul Searching, The Inner Lantern',
    upright: 'A time to step back from social chatter and seek solitude. Your inner light is illuminating the path step by step.',
    reversed: 'Excessive isolation, loneliness, withdrawal from loved ones, or fear of looking inward.',
    advice: 'Give yourself permission to pause and reflect. The clarity you seek will emerge in silence.'
  },
  {
    name: 'Wheel of Fortune',
    number: 'X',
    arcana: 'Major Arcana',
    image: '/tarot/wheel_of_fortune.jpg',
    keywords: 'Divine Timing, Cycles of Destiny, Karma, Breakthrough Turn',
    upright: 'The cosmic wheel is turning in your favor. Stagnant chapters are giving way to unexpected opportunity and serendipity.',
    reversed: 'Resisting inevitable transitions, temporary setbacks, or a reminder that all phases are cyclical.',
    advice: 'Adapt with lightness. Trust that changes occurring now are steering you toward greater soul expansion.'
  },
  {
    name: 'Justice',
    number: 'XI',
    arcana: 'Major Arcana',
    image: '/tarot/justice.jpg',
    keywords: 'Truth, Fairness, Karmic Balance, Accountable Decisions',
    upright: 'Clear clarity and fairness prevail. Honest self-examination and ethical clarity bring resolution to lingering disputes.',
    reversed: 'Dishonesty, unfair treatment, avoiding accountability, or harsh self-criticism.',
    advice: 'Weigh all perspectives objectively. Speak the truth with integrity and compassion.'
  },
  {
    name: 'The Hanged Man',
    number: 'XII',
    arcana: 'Major Arcana',
    image: '/tarot/the_hanged_man.jpg',
    keywords: 'Surrender, New Perspective, Sacred Pause, Spiritual Awakening',
    upright: 'Release resistance and suspend judgment. An intentional pause offers an enlightened shift in perspective that forceful action never could.',
    reversed: 'Unnecessary martyrdom, resistance to change, stalling, or feeling stuck without purpose.',
    advice: 'Stop pushing the river. Surrender control and let the situation reveal its deeper spiritual lesson.'
  },
  {
    name: 'Death',
    number: 'XIII',
    arcana: 'Major Arcana',
    image: '/tarot/death.jpg',
    keywords: 'Transformation, Metamorphosis, Clearing the Old, Rebirth',
    upright: 'A natural, inevitable ending makes way for profound spiritual rebirth. What is leaving has served its soul purpose.',
    reversed: 'Clinging to dead chapters, fear of the unknown, delayed closure, or lingering nostalgia.',
    advice: 'Gently release what no longer serves your growth. Every sunset guarantees a dawn.'
  },
  {
    name: 'Temperance',
    number: 'XIV',
    arcana: 'Major Arcana',
    image: '/tarot/temperance.jpg',
    keywords: 'Alchemy, Balance, Divine Patience, Harmonious Blending',
    upright: 'Middle paths and emotional alchemy. You are successfully synthesizing two opposing areas of life into a harmonious whole.',
    reversed: 'Imbalance, extremes, impatience, overindulgence, or lack of long-term vision.',
    advice: 'Practice patience and moderation. Blend different perspectives with calm, measured grace.'
  },
  {
    name: 'The Devil',
    number: 'XV',
    arcana: 'Major Arcana',
    image: '/tarot/the_devil.jpg',
    keywords: 'Shadow Self, Unhealthy Attachments, Breaking Chains, Illusions',
    upright: 'An invitation to look at limiting beliefs, addictions, or toxic cycles. The chains binding you are looser than they seem.',
    reversed: 'Breaking free from limitation, reclaiming sovereign autonomy, and dispelling false illusions.',
    advice: 'Confront your shadows without shame. Awareness is the first step toward complete liberation.'
  },
  {
    name: 'The Tower',
    number: 'XVI',
    arcana: 'Major Arcana',
    image: '/tarot/the_tower.jpg',
    keywords: 'Sudden Awakening, Breakthrough, Clearing False Foundations, Truth',
    upright: 'A sudden bolt of clarity shatters false illusions. Though disruptive, this lightning flash liberates you from structures built on shaky ground.',
    reversed: 'Narrowly escaping catastrophe, delaying necessary upheaval, or fear of inevitable change.',
    advice: 'Do not rebuild what the universe tore down. Celebrate the clearing that allows an authentic foundation.'
  },
  {
    name: 'The Star',
    number: 'XVII',
    arcana: 'Major Arcana',
    image: '/tarot/the_star.jpg',
    keywords: 'Renewed Hope, Spiritual Blessings, Inspiration, Serenity',
    upright: 'After recent storm clouds, tranquility returns. Pure cosmic hope, inspiration, and renewed faith fill your spirit.',
    reversed: 'Despair, temporary loss of faith, discouragement, or disconnected optimism.',
    advice: 'Keep your faith unwavering. You are protected, divinely guided, and walking into peaceful waters.'
  },
  {
    name: 'The Moon',
    number: 'XVIII',
    arcana: 'Major Arcana',
    image: '/tarot/the_moon.jpg',
    keywords: 'Subconscious, Dreams, Intuitive Depths, Navigating Shadows',
    upright: 'Things are not as they appear in the daylight. Trust your psychic sensitivity as you navigate mysterious or ambiguous terrain.',
    reversed: 'Lifting of confusion, seeing through deception, release of irrational phobias.',
    advice: 'Do not make hasty commitments based on fear. Let the veil part in natural timing.'
  },
  {
    name: 'The Sun',
    number: 'XIX',
    arcana: 'Major Arcana',
    image: '/tarot/the_sun.jpg',
    keywords: 'Radiant Joy, Vitality, Success, Total Clarity & Warmth',
    upright: 'Golden illumination, vitality, and authentic happiness. Shadows dissolve completely in the warm glow of success.',
    reversed: 'Temporary cloudiness, muted joy, or struggling to see the bright side of current events.',
    advice: 'Celebrate your wins openly. Share your warmth, optimism, and generous spirit with those around you.'
  },
  {
    name: 'Judgement',
    number: 'XX',
    arcana: 'Major Arcana',
    image: '/tarot/judgement.jpg',
    keywords: 'Higher Calling, Awakening, Forgiveness, Soul Evolution',
    upright: 'You are hearing the trumpet call of your higher self. Forgive past versions of yourself and step fully into your true vocation.',
    reversed: 'Harsh self-doubt, second-guessing your calling, fear of judgment from others.',
    advice: 'Answer your soul’s summons without regret. Release the past with deep gratitude and move forward.'
  },
  {
    name: 'The World',
    number: 'XXI',
    arcana: 'Major Arcana',
    image: '/tarot/the_world.jpg',
    keywords: 'Completion, Wholeness, Cosmic Harmony, Triumphant Cycle',
    upright: 'A major cycle reaches triumphant completion. You have integrated all lessons, arriving at wholeness and cosmic celebration.',
    reversed: 'Unfinished business, seeking external closure, delay in finalizing a major chapter.',
    advice: 'Take time to honor how far you have journeyed before embarking on the next grand adventure.'
  }
];

export const BLOG_POSTS = [
  {
    id: 'understanding-court-cards',
    title: 'How to Decode Court Cards in Tarot Without Memorization',
    category: 'Tarot Wisdom',
    date: 'Recent Insight',
    readTime: '5 min read',
    excerpt: 'Pages, Knights, Queens, and Kings often confound beginner readers. Here is how connecting them with Elemental Personalities simplifies your spreads instantly.'
  },
  {
    id: 'emotional-cord-cutting-practice',
    title: 'The Art of Emotional Cord Cutting: Healing From Past Ties',
    category: 'Deep Healing',
    date: 'Sacred Practice',
    readTime: '6 min read',
    excerpt: 'When lingering energetic connections to former partners or workplace toxicity drain your daily stamina, an intentional cord-cutting ritual restores sovereign wholeness.'
  },
  {
    id: 'why-yearly-birthday-reading-matters',
    title: 'Why a Solar Return Reading is Your Most Potent Birthday Ritual',
    category: 'Astrological Tarot',
    date: 'Annual Guidance',
    readTime: '4 min read',
    excerpt: 'The moment the Sun returns to your exact birth degree marks a celestial reset. Discover how a 13-card astrological wheel charts your upcoming 12 months with clarity.'
  }
];

export const READINGS_DATA: ReadingTopic[] = [];

export const HOW_IT_WORKS_STEPS = [
{stepNumber:'01',title:'Explore a reading topic',description:'Choose a topic that fits the question you want to reflect on.'},
{stepNumber:'02',title:'Contact the studio',description:'Ask about the reading format, price, delivery and what is included before deciding.'},
{stepNumber:'03',title:'Make space to reflect',description:'Use your reading as a prompt for reflection, not a promise of a particular outcome.'}
];

export const CORE_VALUES = [
  {
    title: 'Compassionate Guidance',
    description: 'Every reading is delivered with non-judgmental warmth, empathy, and genuine care for your emotional well-being.'
  },
  {
    title: '100% Confidential',
    description: 'Your identity, questions, and reading results are kept strictly private and never shared with third parties.'
  },
  {
    title: 'Honest & Grounded',
    description: 'We do not sell false promises or fear-based predictions. You receive real spiritual clarity grounded in empowerment.'
  }
];

export const FAQS: FAQItem[] = [
{question:'What is a psychic reading on this website?',answer:'The studio presents reading topics for personal reflection. This website does not take payments or book live sessions. Contact the studio to ask what a reading includes.',category:'reading'},
{question:'What questions should I ask?',answer:'Try open questions about your choices, communication and patterns. A reading cannot guarantee another person’s feelings, a date or a future outcome.',category:'reading'},
{question:'How do I choose a reading?',answer:'Start with the topic closest to your question. Contact the studio to ask about scope, format, price and delivery before deciding.',category:'ordering'},
{question:'Is free tarot really free?',answer:'The one-card and three-card draws need no account or payment details. They are self-guided tools for reflection.',category:'reading'},
{question:'Can readings replace professional advice?',answer:'No. Readings are for entertainment and personal reflection, not medical, legal, financial or mental health advice.',category:'reading'},
{question:'How can I contact the studio?',answer:'Email contact.thepsychicstudio@gmail.com with your question.',category:'ordering'}
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    clientName: 'Elena V.',
    location: 'United Kingdom',
    rating: 5,
    readingType: 'Love & Relationships Reading',
    date: 'Verified Etsy Buyer',
    review:
      'I was genuinely in tears reading this. The reader picked up on nuances about my partner’s communication style that I hadn’t even typed into my notes. It brought so much calm and reassurance.'
  },
  {
    id: '2',
    clientName: 'Marcus T.',
    location: 'California, USA',
    rating: 5,
    readingType: 'Career & Life Path Reading',
    date: 'Verified Etsy Buyer',
    review:
      'Delivered in less than 36 hours! The PDF was so thorough and beautifully formatted with high-res photos of the cards. Gave me the courage to sign my new freelance agreement.'
  },
  {
    id: '3',
    clientName: 'Chloe S.',
    location: 'Australia',
    rating: 5,
    readingType: 'Year Ahead Master Spread',
    date: 'Verified Etsy Buyer',
    review:
      'This 13-card breakdown is extraordinary. Every month has its own theme and clear guidance. Worth every single penny. I have it printed out in my journal!'
  },
  {
    id: '4',
    clientName: 'Rajesh K.',
    location: 'Chandigarh, India',
    rating: 5,
    readingType: 'Reiki & Chakra Alignment',
    date: 'Long-term Client',
    review:
      'The emotional weight I was carrying for years shifted after our deep cord-cutting and Reiki sessions. Exceptional grounding, wisdom, and compassionate energy.'
  }
];
