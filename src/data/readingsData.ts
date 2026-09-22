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
    imageUrl: 'https://images.unsplash.com/photo-1514537092892-23c2a9d821fc?auto=format&fit=crop&w=800&q=80',
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

export const READINGS_DATA: ReadingTopic[] = [
  {
    id: 'psychic-era-360-future-reading',
    title: '360 Future Psychic Reading | 20 Page Love & Destiny Reading',
    slug: '360-future-psychic-reading-love-destiny',
    tagline: 'Our flagship 20-page comprehensive dossier revealing love, soulmate timing, career crossroads, and full-year destiny.',
    price: '$33',
    originalPrice: '$110',
    iconName: 'SunMedium',
    badge: 'Bestseller • 70% OFF',
    imageUrl: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=800&q=80',
    cardsCount: '20-Page Master Report • 7 Spiritual Methods',
    deliveryTime: 'Delivered within 24–48 hours',
    category: 'future',
    overview:
      'The definitive 360-degree psychic reading from PsychicEra. Synthesizing 7 distinct spiritual divination systems—clairvoyant channeling, tarot arcana, numerological destiny matrix, astrological transit windows, and angelic guidance—this 20-page sacred manuscript uncovers your trajectory across love, marriage, vocation, wealth, and soul evolution.',
    questionsAnswered: [
      'Who is your soulmate or twin flame, and what is your divine timing for commitment?',
      'What major career breakthroughs or unexpected financial shifts are entering your horizon?',
      'What karmic patterns or subconscious blockages are ready to be dissolved once and for all?',
      'What does your month-by-month destiny roadmap reveal over the next 12 to 24 months?'
    ],
    spreadDetails:
      'Complete 360° holistic synthesis across 7 esoteric disciplines: Clairvoyant Channeling, 12-Month Astrological Wheel Spread, Celtic Cross Deep Dive, Love & Soulmate Alignment Grid, Financial Matrix, Akashic Record Inspection, and Archangelic Blessing.',
    whatYouReceive: [
      'In-depth 20-page personalized written reading report in downloadable PDF format',
      'High-resolution multi-angle photographs of your consecrated altar and drawn card spreads',
      'Exact timing predictions, date windows, and milestone indicators',
      'One direct follow-up clarification message directly on Etsy'
    ],
    etsyListingUrl: 'https://www.etsy.com/shop/PsychicEra?search_query=360+Future+Psychic+Reading'
  },
  {
    id: 'psychic-era-spicy-tarot-18',
    title: 'Spicy Tarot Reading 18+ | What Are Their Desires & Passion',
    slug: 'spicy-tarot-reading-18-what-are-their-desires',
    tagline: 'An unfiltered, raw clairvoyant dive into their deepest hidden fantasies, physical desires, and secret intentions toward you.',
    price: '$12',
    originalPrice: '$40',
    iconName: 'HeartHandshake',
    badge: '18+ Desires • Same Day',
    imageUrl: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&w=800&q=80',
    cardsCount: '6-Card Passion Spread + Clairvoyant Channel',
    deliveryTime: 'Delivered Same Day (Under 12h)',
    category: 'love',
    overview:
      'A deeply candid, unfiltered 18+ psychic intimacy consultation. We peer past pleasantries and public masks straight into their subconscious erotic thoughts, physical attraction, unspoken desires, and what they secretly crave when your name enters their mind.',
    questionsAnswered: [
      'What are their raw, unfiltered physical desires and fantasies about you?',
      'How intense is your mutual sexual chemistry and energetic magnetism?',
      'What are they holding back or too shy/intimidated to confess out loud?',
      'Where will the physical and romantic passion lead between you next?'
    ],
    spreadDetails:
      'Dedicated 6-Card Passion Layout: (1) Their Raw Attraction & Chemistry, (2) Secret Desires & Hidden Fantasies, (3) Emotional vs. Physical Intentions, (4) Unspoken Thoughts About Your Body & Energy, (5) Passion Horizon & Next Encounter, (6) Guiding Oracle Advice.',
    whatYouReceive: [
      'Honest, explicit, non-judgmental written clairvoyant report (1,000+ words)',
      'Clear digital photograph of your drawn cards illuminated by sacred candle flame',
      'Same-day priority delivery directly to your Etsy message inbox',
      '100% confidential and discreet dispatch'
    ],
    etsyListingUrl: 'https://www.etsy.com/shop/PsychicEra?search_query=Spicy+Tarot+Reading+18'
  },
  {
    id: 'psychic-era-telepathic-dream-reading',
    title: 'Telepathic Dream Interpretation & Clairvoyant Reading',
    slug: 'telepathic-dream-interpretation-clairvoyant-reading',
    tagline: 'Decode mysterious dreams, astral visitations, and telepathic spirit communications from loved ones or guides.',
    price: '$11',
    originalPrice: '$36',
    iconName: 'Sparkles',
    badge: 'Same Day Express',
    imageUrl: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=800&q=80',
    cardsCount: 'Dream Symbol Decoding + Subconscious Channeling',
    deliveryTime: 'Delivered Same Day',
    category: 'intuition',
    overview:
      'Dreams are the language of the subconscious mind, astral realm, and telepathic cords. If you have been waking with lingering questions about a recurring dream, vivid symbol, night vision, or an encounter with a specific person in the dream realm, this reading unravels its true spiritual transmission.',
    questionsAnswered: [
      'Was your dream a subconscious processing or a genuine telepathic contact?',
      'What are your spirit guides or ancestors trying to alert you to through dream symbols?',
      'Is the person in your dream thinking about you or reaching out on the astral plane?',
      'What actions or spiritual rituals should you perform upon waking to integrate the dream medicine?'
    ],
    spreadDetails:
      'Dual-Phase Interpretation: In-depth Jungian & esoteric symbol translation combined with a 5-card Astral Dream Oracle spread uncovering root origin, subconscious trigger, external telepathic sender, and waking reality impact.',
    whatYouReceive: [
      'Comprehensive written dream analysis breakdown and telepathic verification',
      'High-resolution photograph of the oracle and tarot cards drawn for your dream',
      'Practical grounding advice and dream journaling prompts',
      'Fast same-day delivery via Etsy digital message'
    ],
    etsyListingUrl: 'https://www.etsy.com/shop/PsychicEra?search_query=Telepathic+Dream+Interpretation'
  },
  {
    id: 'psychic-era-distant-energy-healing',
    title: 'Distant Energy Healing | Aura Cleansing & Balance',
    slug: 'distant-energy-healing-aura-cleansing-balance',
    tagline: 'High-frequency biofield transmission clearing heavy cords, balancing the 7 chakras, and restoring vitality.',
    price: '$15',
    originalPrice: '$50',
    iconName: 'Sparkles',
    badge: 'Chakra & Aura • 70% OFF',
    imageUrl: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=80',
    cardsCount: 'Remote Biofield Attunement + Chakra Scan Report',
    deliveryTime: 'Conducted within 24 Hours',
    category: 'healing',
    overview:
      'Energy knows no spatial limits. Using Usui Reiki Grandmastery, Tibetan Lama Fera symbols, and auric cord-cutting protocols, this remote healing session sweeps away psychic heaviness, dissolves emotional knots, restores energetic circulation across all 7 chakras, and envelops your aura in a golden protective shield.',
    questionsAnswered: [
      'Which of your 7 primary chakras are congested, closed, or depleted?',
      'Are there energetic cords or draining psychic attachments attached to your biofield?',
      'What emotional trauma or stress residue has been dislodged during the session?',
      'How can you maintain your restored high vibrational aura in daily environments?'
    ],
    spreadDetails:
      'Complete 4-Step Distant Protocol: (1) Energetic Smudging & Biofield Clearing, (2) Deep Cord Cutting & Heavy Energy Extraction, (3) 7-Chakra Balancing with Consecrated Crystals, (4) Golden Auric Shielding & Grandmaster Attunement.',
    whatYouReceive: [
      'Personalized written Auric Health & Chakra Diagnostic Report (800+ words)',
      'Photographic evidence of your consecrated distance healing altar grid and crystals',
      'Post-healing integration guide with grounding exercises and personalized affirmations',
      'Immediate sense of lightness, emotional relief, and mental clarity'
    ],
    etsyListingUrl: 'https://www.etsy.com/shop/PsychicEra?search_query=Distant+Energy+Healing'
  },
  {
    id: 'psychic-era-5-yes-no-questions',
    title: '5 Yes/No Psychic Question Reading | Same Day Answers',
    slug: '5-yes-no-psychic-question-reading-same-day',
    tagline: 'Swift, decisive, and grounded answers to your five most urgent questions with concise intuitive reasoning.',
    price: '$9',
    originalPrice: '$30',
    iconName: 'Compass',
    badge: 'Fast Answers • Same Day',
    imageUrl: 'https://images.unsplash.com/photo-1514533450685-4493e01d1fdc?auto=format&fit=crop&w=800&q=80',
    cardsCount: '5 Direct Answers + Pendulum Dowsing',
    deliveryTime: 'Delivered within 2–6 Hours',
    category: 'quick',
    overview:
      'When you need clear, honest, immediate answers without endless vagueness, this rapid divination reading delivers. Ask five specific questions across love, career, moving, timing, or life choices, and receive definitive Yes, No, or Likely outcomes confirmed by both Tarot and consecrated pendulum dowsing.',
    questionsAnswered: [
      'Direct Yes or No answer for Question #1 with intuitive context',
      'Direct Yes or No answer for Question #2 with intuitive context',
      'Direct Yes or No answer for Question #3 with intuitive context',
      'Direct Yes or No answers for Questions #4 and #5 with spiritual advice'
    ],
    spreadDetails:
      'Five distinct single-card draws validated by a consecrated quartz pendulum: Each card provides a definitive polarity (Yes, Leaning Yes, Neutral/Uncertain, Leaning No, Definitive No) along with 2-3 sentences explaining why.',
    whatYouReceive: [
      'Prompt, concise written breakdown for each of your 5 specific questions',
      'Photo of your 5 pulled cards and pendulum verification setup',
      'Speedy delivery within 2 to 6 hours directly in your Etsy chat',
      'Honest, non-sugarcoated spiritual clarity'
    ],
    etsyListingUrl: 'https://www.etsy.com/shop/PsychicEra?search_query=5+Yes+No+Psychic+Question'
  },
  {
    id: 'psychic-era-fortune-teller-prediction',
    title: 'Fortune Teller & Future Prediction | Written PDF',
    slug: 'fortune-teller-future-prediction-written-pdf',
    tagline: 'Clairvoyant vision revealing imminent breakthroughs, key life milestones, warnings, and synchronistic timing.',
    price: '$14',
    originalPrice: '$45',
    iconName: 'Compass',
    badge: 'Written PDF • Same Day',
    imageUrl: 'https://images.unsplash.com/photo-1519638399535-1b036603ac77?auto=format&fit=crop&w=800&q=80',
    cardsCount: 'Clairvoyant Scrying + 7-Point Future Timeline',
    deliveryTime: 'Delivered Same Day',
    category: 'future',
    overview:
      'Classic fortune telling grounded in authentic clairvoyance and crystal scrying. This reading illuminates what destiny has prepared for you in the near and mid future—forecasting romantic opportunities, career turns, travels, financial surprises, and key choices awaiting your arrival.',
    questionsAnswered: [
      'What major unforeseen events or blessings are on their way into your life?',
      'What warning signs or tricky situations should you sidestep in coming weeks?',
      'Who is entering your sphere that will significantly influence your path?',
      'What is your dominant spiritual growth theme for the approaching season?'
    ],
    spreadDetails:
      'A 7-Point Clairvoyant Timeline: (1) Imminent Horizon (1-4 Weeks), (2) Rising Financial / Career Opportunity, (3) Romantic & Emotional Undercurrent, (4) Roadblock to Watch Out For, (5) Unexpected Synchronicity, (6) Spiritual Lesson, (7) Crowning Outcome.',
    whatYouReceive: [
      'Detailed written Fortune Telling Report delivered in PDF format',
      'Photograph of the antique crystal scrying sphere and card arrangement',
      'Actionable advice for capitalizing on favorable cosmic windows',
      'Same-day guaranteed turnaround on Etsy'
    ],
    etsyListingUrl: 'https://www.etsy.com/shop/PsychicEra?search_query=Fortune+Teller+Future+Prediction'
  },
  {
    id: 'psychic-era-cartomancy-reading',
    title: 'Cartomancy Reading: Same Hour Playing Card Guidance',
    slug: 'cartomancy-reading-same-hour-playing-card-guidance',
    tagline: 'Traditional esoteric cartomancy utilizing consecrated 52-card decks for pinpoint relationship and career revelations.',
    price: '$12',
    originalPrice: '$40',
    iconName: 'Sparkles',
    badge: 'Same Hour Option',
    imageUrl: 'https://images.unsplash.com/photo-1511193311914-0346f16efe90?auto=format&fit=crop&w=800&q=80',
    cardsCount: '52-Card Esoteric Cartomancy Spread',
    deliveryTime: 'Express Same Hour / Same Day',
    category: 'intuition',
    overview:
      'Long before modern oracle decks, master diviners read the secret language of standard 52 playing cards. The suits (Hearts for Love, Diamonds for Wealth, Clubs for Action & Energy, Spades for Challenges & Truth) offer unmatched precision in uncovering dates, initials, family dynamics, and pragmatic everyday truths.',
    questionsAnswered: [
      'What are the concrete motives and hidden agendas of the people around you?',
      'Are financial contracts, contracts, or legal papers turning in your favor?',
      'What emotional developments are approaching in your home life and relationships?',
      'What immediate action must you take to secure success this month?'
    ],
    spreadDetails:
      'Traditional 9-Card French Grand Jeu Grid: Rows represent Mind, Heart, and Action, while columns map Past Influence, Present Reality, and Imminent Result using classic playing card suit symbolism.',
    whatYouReceive: [
      'Precise, factual written cartomancy interpretation (900+ words)',
      'Clear digital image of your fanned playing cards upon green velvet cloth',
      'Express same-hour delivery available or same-day guaranteed',
      'Direct messaging support for immediate questions'
    ],
    etsyListingUrl: 'https://www.etsy.com/shop/PsychicEra?search_query=Cartomancy+Reading'
  },
  {
    id: 'psychic-era-3-months-ahead-tarot',
    title: '3 Months Ahead Tarot Reading | 24 Hours or Less',
    slug: '3-months-ahead-tarot-reading-24-hours',
    tagline: 'A structured three-month astrological roadmap charting Month 1, Month 2, and Month 3 energies and transitions.',
    price: '$18',
    originalPrice: '$60',
    iconName: 'SunMedium',
    badge: '24-Hour Express • 70% OFF',
    imageUrl: 'https://images.unsplash.com/photo-1638803040283-7a5ffd48dad5?auto=format&fit=crop&w=800&q=80',
    cardsCount: '9-Card Quarterly Roadmap (3 per Month)',
    deliveryTime: 'Delivered in 24 Hours or Less',
    category: 'future',
    overview:
      'Plan your next 90 days with total confidence. This reading breaks down the upcoming three consecutive months into dedicated chapters—examining the primary theme, romantic/relational flow, career/financial outlook, and actionable guidance for each individual month.',
    questionsAnswered: [
      'Month 1: What is the main breakthrough and primary challenge of the current month?',
      'Month 2: What shifts will take place in your relationships and career momentum?',
      'Month 3: Where will your efforts culminate, and what harvest will you reap?',
      'What overarching spiritual lesson ties this entire quarter together?'
    ],
    spreadDetails:
      'Sequential 9-Card Spread (3 cards per month): For Month 1, 2, and 3, one card represents Focus & Opportunity, one represents Challenge / Warning, and one represents Outcome & Spiritual Blessing.',
    whatYouReceive: [
      'Comprehensive month-by-month written forecast in PDF format (1,400+ words)',
      'High-resolution altar photo of all 9 cards laid out in temporal sequence',
      'Actionable checklist of best dates for signing contracts or making romantic moves',
      'Fast 24-hour turnaround guaranteed on Etsy'
    ],
    etsyListingUrl: 'https://www.etsy.com/shop/PsychicEra?search_query=3+Months+Ahead+Tarot+Reading'
  },
  {
    id: 'psychic-era-voodoo-wish-fulfillment',
    title: "Voodoo Wish Fulfillment - Papa Legba's Gate Opener Ritual",
    slug: 'voodoo-wish-fulfillment-papa-legba-gate-opener',
    tagline: 'Potent crossroads ritual channeling Papa Legba to dismantle obstacles, remove stubborn locks, and open your manifestation gates.',
    price: '$22',
    originalPrice: '$75',
    iconName: 'Sparkles',
    badge: 'Sacred Ritual • Blockage Breaker',
    imageUrl: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80',
    cardsCount: 'Crossroads Altar Ritual + Manifestation Sigil',
    deliveryTime: 'Conducted within 48h with Altar Photos',
    category: 'ritual',
    overview:
      'In traditional esoteric Vodou, Papa Legba is the benevolent Master of the Crossroads who holds the celestial keys to all spiritual gates. When doors in your life seem stubbornly slammed shut—whether in romance, career, finance, or personal peace—this consecrated road-opener ritual beseeches Legba to clear impediments and open your path to fulfillment.',
    questionsAnswered: [
      'What energetic or karmic barrier has been holding your wish back?',
      'How does the ritual clear blocked energy at your spiritual crossroads?',
      'What divine signs or synchronicities should you look for over the next 21 days?',
      'What personal affirmation and action should you take to welcome the open door?'
    ],
    spreadDetails:
      'A full ceremonial altar ritual conducted with sacred keys, consecrated beeswax candles, offerings of rum and tobacco, hand-drawn veve sigil, and an accompanying 3-card divinatory check of your opening gates.',
    whatYouReceive: [
      'High-resolution photographic proof of your personalized altar ritual with your name and wish inscribed',
      'Detailed written report explaining the signs observed during candle burning and smoke divination',
      'Personalized manifestation affirmation to recite during the 21-day opening cycle',
      'Direct confirmation message on Etsy upon completion'
    ],
    etsyListingUrl: 'https://www.etsy.com/shop/PsychicEra?search_query=Voodoo+Wish+Fulfillment+Papa+Legba'
  },
  {
    id: 'psychic-era-wolf-spirit-spell',
    title: 'Wolf Spell & Sacred Wolf Spirit Ritual',
    slug: 'wolf-spell-wolf-spirit-ritual-protection',
    tagline: 'Call upon the medicine of the Wolf spirit totem for fierce energetic shielding, loyalty, and unwavering inner courage.',
    price: '$24',
    originalPrice: '$80',
    iconName: 'Sparkles',
    badge: 'Totem Medicine • Protection',
    imageUrl: 'https://images.unsplash.com/photo-1564865878688-9a244444042a?auto=format&fit=crop&w=800&q=80',
    cardsCount: 'Full Moon Wolf Totem Ritual + Energetic Ward',
    deliveryTime: 'Completed within 48 Hours with Photo Proof',
    category: 'ritual',
    overview:
      'The Wolf spirit embodies the fierce guardian, the cunning pathfinder, and the loyal protector. If you have been feeling emotionally exposed, threatened by toxic environments, or struggling to assert your boundaries, this ritual aligns your aura with the unshakeable instinct, psychic armor, and quiet power of the Wolf totem.',
    questionsAnswered: [
      'How does the Wolf spirit totem fortify your spiritual boundaries and psychic aura?',
      'What intuitive instincts are you currently underutilizing or doubting?',
      'How will this ritual protect your family, home, or personal space from malice?',
      'What totem messages did the Wolf medicine deliver during the casting?'
    ],
    spreadDetails:
      'Full ceremonial working performed during auspicious lunar phases with consecrated pine incense, wolf totem effigies, silver protection cords, obsidian grounding crystals, and an Oracle Totem card pull.',
    whatYouReceive: [
      'Photographic documentation of your dedicated wolf spirit altar and candles',
      'Written ceremony summary detailing the energies, visions, and guidance received',
      'A customized Wolf Totem Protection Mantra to recite when facing conflicts',
      'Peace of mind and enduring psychic fortification'
    ],
    etsyListingUrl: 'https://www.etsy.com/shop/PsychicEra?search_query=Wolf+Spell+Spirit+Ritual'
  },
  {
    id: 'psychic-era-clan-1313-magnetic-spell',
    title: 'CLAN 1313 Magnetic Attraction Spell | Allure & Stamina',
    slug: 'clan-1313-magnetic-sex-spell-stamina-allure',
    tagline: 'An occult enchantment designed to charge your presence with intense attraction, mutual passion, and magnetic allure.',
    price: '$25',
    originalPrice: '$85',
    iconName: 'Sparkles',
    badge: 'Occult Enchantment • 70% OFF',
    imageUrl: 'https://images.unsplash.com/photo-1514533450685-4493e01d1fdc?auto=format&fit=crop&w=800&q=80',
    cardsCount: '1313 Lineage Casting + Consecrated Sigil',
    deliveryTime: 'Cast within 48 Hours with Verification',
    category: 'ritual',
    overview:
      'Derived from the esoteric CLAN 1313 tradition, this potent energetic enchantment supercharges your bio-magnetic field. It radiates irresistible charisma, boosts stamina and vitality, awakens magnetic sexual allure, and makes your presence unforgettable to those you desire.',
    questionsAnswered: [
      'How does the 1313 magnetic frequency shift how others perceive your energy?',
      'How can you amplify the spell’s magnetic effects through conscious body language?',
      'What energetic shifts will occur in your romantic or physical connections?',
      'What signs confirm the magnetic enchantment has taken full hold?'
    ],
    spreadDetails:
      'Consecrated working using lodestones, magnetic sand, crimson ritual candles, rose oil anointing, and a personalized parchment sigil charged with 1313 numerological chants.',
    whatYouReceive: [
      'Full photographic evidence of your personalized spell casting and candle burn',
      'Detailed written explanation of the working and planetary timing used',
      'Specific instructions on how to activate your magnetic frequency upon meeting your person',
      'Delivered discreetly via Etsy messages'
    ],
    etsyListingUrl: 'https://www.etsy.com/shop/PsychicEra?search_query=CLAN+1313+Magnetic+Spell'
  },
  {
    id: 'psychic-era-rainbow-fluorite-sphere',
    title: 'Rainbow Fluorite Crystal Mini Sphere | Consecrated Talisman',
    slug: 'rainbow-fluorite-crystal-mini-sphere',
    tagline: 'Natural banded purple and green fluorite gemstone sphere charged with Reiki Grandmaster blessing for third-eye clarity.',
    price: '$28',
    originalPrice: '$92',
    iconName: 'Sparkles',
    badge: 'Natural Gemstone • Reiki Charged',
    imageUrl: 'https://images.unsplash.com/photo-1596704017254-9b121068fb31?auto=format&fit=crop&w=800&q=80',
    cardsCount: 'Physical Crystal Sphere + Blessing Certificate',
    deliveryTime: 'Safely Packed & Shipped with Tracking',
    category: 'healing',
    overview:
      'A genuine, hand-selected natural Rainbow Fluorite mini sphere displaying exquisite bands of amethyst purple, emerald green, and crystalline translucence. Each sphere is cleansed with consecrated sage smoke, attuned to Usui Reiki Master frequencies, and programmed to absorb electromagnetic smog and awaken psychic clarity.',
    questionsAnswered: [
      'How does Rainbow Fluorite protect your third-eye and mental clarity?',
      'Where is the most auspicious location in your home or meditation altar for the sphere?',
      'How do you cleanse and recharge the crystal under moonlight?',
      'What specific Reiki blessing was infused into your individual specimen?'
    ],
    spreadDetails:
      'Physical item: Natural rainbow fluorite polished crystal sphere (approx. 25–35mm), accompanied by a wooden display stand, velvet storage pouch, and hand-signed energetic attunement certificate.',
    whatYouReceive: [
      '1x Authentic Natural Rainbow Fluorite Crystal Mini Sphere',
      '1x Wooden or brass mini sphere display stand',
      '1x Velvet protective drawstring pouch',
      'Certificate of Reiki Consecration and crystal usage guide'
    ],
    etsyListingUrl: 'https://www.etsy.com/shop/PsychicEra?search_query=Rainbow+Fluorite+Crystal+Mini+Sphere'
  },
  {
    id: 'love-relationships',
    title: 'Love & Relationships Deep Reading',
    slug: 'love-relationships',
    tagline: 'Deep insight into current connections, soulmate paths, and unspoken emotional truths.',
    price: '$28',
    originalPrice: '$35',
    iconName: 'HeartHandshake',
    badge: 'Most Popular',
    imageUrl: 'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?auto=format&fit=crop&w=800&q=80',
    cardsCount: '6-Card Spread',
    deliveryTime: 'Delivered within 24–48 hours',
    category: 'love',
    overview:
      'Whether you are seeking clarity on a new romance, navigating a crossroad with your existing partner, or calling in conscious love, this spread illuminates both your conscious energies and hidden undercurrents.',
    questionsAnswered: [
      'What are their genuine thoughts, feelings, and intentions toward you?',
      'What unseen energies or obstacles are currently influencing your bond?',
      'Where is this connection heading over the next 3 to 6 months?',
      'What guidance do your spiritual guides offer to heal or deepen love?'
    ],
    spreadDetails:
      'A structured 6-card spread: (1) Your Energy & Heart Space, (2) Their Current Energy, (3) Underlying Dynamic / Core Lesson, (4) Unspoken Thoughts, (5) Likely Trajectory, (6) Oracle Advice Card.',
    whatYouReceive: [
      'High-resolution photograph of your physically pulled cards & altar setup',
      'Detailed, multi-page written PDF reading (1,200+ words) packed with personalized insights',
      'Direct, compassionate advice for your next emotional steps',
      'One follow-up clarification message via Etsy chat if needed'
    ],
    etsyListingUrl: 'https://www.etsy.com/shop/PsychicEra?search_query=Love+Relationships+Reading'
  },
  {
    id: 'celtic-cross-psychic',
    title: 'Celtic Cross Detailed Reading',
    slug: 'celtic-cross-psychic',
    tagline: 'The master 10-card clairvoyant spread revealing past influences, fears, hopes, and ultimate destiny.',
    price: '$38',
    originalPrice: '$48',
    iconName: 'Sparkles',
    badge: 'Signature Spread',
    imageUrl: 'https://images.unsplash.com/photo-1638803040283-7a5ffd48dad5?auto=format&fit=crop&w=800&q=80',
    cardsCount: '10-Card Master Spread',
    deliveryTime: 'Delivered within 24–48 hours',
    category: 'future',
    overview:
      'The sacred Celtic Cross is the crown jewel of tarot divination. It dives deep into your core situation, subconscious motivations, external influences, and spiritual evolution to reveal the complete picture.',
    questionsAnswered: [
      'What is the central root of your present circumstances?',
      'What past experiences or energetic debris are still shaping your present?',
      'What are your subconscious hopes, hidden fears, and true aspirations?',
      'What is the ultimate outcome and spiritual advice for your path?'
    ],
    spreadDetails:
      'Complete 10-card Celtic Cross: (1) Present Situation, (2) The Crossing Force, (3) Subconscious Root, (4) Recent Past, (5) Crowning Potential, (6) Near Future, (7) Self Perspective, (8) Environment, (9) Hopes & Fears, (10) Final Outcome.',
    whatYouReceive: [
      'High-resolution altar photograph of your full 10-card spread layout',
      'Comprehensive in-depth written guidance report (1,500+ words)',
      'Specific timing windows, warning flags, and empowering action points',
      'Direct priority support via Etsy chat'
    ],
    etsyListingUrl: 'https://www.etsy.com/shop/PsychicEra?search_query=Celtic+Cross+Detailed+Reading'
  },
  {
    id: 'career-life-path',
    title: 'Career & Life Path Guidance',
    slug: 'career-life-path',
    tagline: 'Clarity on professional milestones, career transitions, and your soul purpose.',
    price: '$32',
    originalPrice: '$40',
    iconName: 'Compass',
    badge: 'Empowering',
    imageUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80',
    cardsCount: '7-Card Spread',
    deliveryTime: 'Delivered within 24–48 hours',
    category: 'quick',
    overview:
      'Feeling stalled, seeking a promotion, or contemplating an entrepreneurial leap? This reading aligns your natural talents with divine timing, pinpointing opportunities and advising on tactical career moves.',
    questionsAnswered: [
      'Are you aligned with your true vocation or is a pivot approaching?',
      'What strengths are ready to be recognized by leaders and peers?',
      'What internal or external roadblocks are slowing your professional growth?',
      'What is the highest-probability outcome if you pursue your new venture?'
    ],
    spreadDetails:
      'A targeted 7-card layout: (1) Current Professional Footing, (2) Hidden Opportunities, (3) Immediate Challenges, (4) Financial Potential, (5) Necessary Action to Take, (6) 3-Month Outlook, (7) Higher Vocation / Spiritual Message.',
    whatYouReceive: [
      'Crystal-clear photo of your physical card spread with crystal companions',
      'Thorough written analysis (1,300+ words) detailing timing and vocational guidance',
      'Actionable recommendations for interviews, contracts, or business decisions',
      'Delivered straight to your Etsy messages inbox or private email'
    ],
    etsyListingUrl: 'https://www.etsy.com/shop/PsychicEra?search_query=Career+Life+Path+Reading'
  }
];

export const HOW_IT_WORKS_STEPS = [
  {
    stepNumber: '01',
    title: 'Choose your reading topic',
    description:
      'Browse our curated readings—from Love and Career to Full Year Roadmaps—and select the focus that speaks directly to your current questions.'
  },
  {
    stepNumber: '02',
    title: 'Complete your order via Etsy',
    description:
      'Click the Etsy link to order securely with buyer protection. In the order personalization box, simply provide your first name, date of birth (optional), and any specific questions.'
  },
  {
    stepNumber: '03',
    title: 'Receive your detailed reading',
    description:
      'Within 24 to 48 hours, your comprehensive written reading and high-resolution altar photos will arrive straight in your Etsy message inbox and email.'
  }
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
  {
    question: 'What services are offered and how do online sessions work?',
    answer:
      'We offer four categories of holistic guidance: Fortune & Guidance (Tarot Reading, Numerology, Yearly Birthday Reading); Energy Healing (Reiki, Chakra Balancing, Crystal Healing); Deep Healing (Inner Child Healing, Past Life Regression, Emotional Cord Cutting); and Empowerment Coaching. All sessions are available remotely with full effectiveness, delivered via Etsy digital dispatch, secure PDF guide, or private video call.',
    category: 'reading'
  },
  {
    question: 'How do I submit my questions after ordering?',
    answer:
      'When checking out on Etsy, you will see a "Personalization" text field right above the Buy button. Simply type your first name, your questions, or brief context about your situation. If you forget, you can also message us directly on Etsy immediately after placing your order.',
    category: 'ordering'
  },
  {
    question: 'How and when will my reading be delivered?',
    answer:
      'All readings are delivered within 24 to 48 hours of order placement. You will receive a direct Etsy message containing your high-resolution card spread photo and a formatted PDF reading report, as well as an email notification.',
    category: 'delivery'
  },
  {
    question: 'Do I need to be present live or on video for a tarot reading?',
    answer:
      'No live session or video call is necessary for our core tarot spreads. This format allows you to digest your reading in peace without social anxiety, and keeps a permanent written record you can reread whenever you need reassurance.',
    category: 'reading'
  },
  {
    question: 'Can I learn Tarot or become a certified healer through your courses?',
    answer:
      'Yes! We offer structured certified training from Tarot Foundations (learning all 78 cards without booklets) to professional Tarot Arcana Mastership and our comprehensive Reiki Grandmaster lineage courses. Visit the Courses page for full syllabi.',
    category: 'reading'
  },
  {
    question: 'Can I ask follow-up questions if something is unclear?',
    answer:
      'Yes! We want you to feel fully heard and supported. Each reading includes one free follow-up clarification message through Etsy chat to ensure you have total clarity.',
    category: 'reading'
  },
  {
    question: 'Why do you process orders through Etsy?',
    answer:
      'Etsy provides safe, encrypted transactions, full buyer protection, flexible payment methods (Credit Card, Apple Pay, PayPal, Klarna), and an organized inbox where your reading is permanently saved.',
    category: 'ordering'
  }
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
