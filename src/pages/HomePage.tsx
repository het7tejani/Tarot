import React from 'react';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Award,
  BookOpen,
  CheckCircle2,
  ExternalLink,
  HeartHandshake,
  Compass,
  Star,
  Users,
  Clock,
  Layers,
  Play,
  Eye
} from 'lucide-react';
import { Link } from 'react-router-dom';
import {
  SERVICES_CATEGORIES,
  COURSES_DATA,
  STATS,
  READINGS_DATA,
  TESTIMONIALS
} from '../data/readingsData';
import { ReadingTopic } from '../types';
import { ReadingHistorySection } from '../components/ReadingHistorySection';

interface HomePageProps {
  onSelectReading: (reading: ReadingTopic) => void;
  getEtsyUrl: (reading: ReadingTopic) => string;
}

export const HomePage: React.FC<HomePageProps> = ({ onSelectReading, getEtsyUrl }) => {
  return (
    <div className="pt-28 md:pt-32 bg-[#FAF8F5] text-[#1f2322]">
      {/* 1. Hero Section (Clean, open typography — no boxed badge) */}
      <section className="relative pt-16 pb-20 md:pt-24 md:pb-28 overflow-hidden">
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Natural clean eyebrow */}
          <p className="text-xs uppercase tracking-widest text-[#73a89a] font-semibold mb-4">
            Master Healer • Reiki Grandmaster • Tarot Expert Since 2004
          </p>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold text-[#1f2322] tracking-tight leading-[1.15] mb-6 max-w-4xl mx-auto">
            Empowering Lives Through Healing &amp; Divine Guidance
          </h1>

          <p className="text-lg sm:text-xl text-[#1f2322]/75 leading-relaxed max-w-3xl mx-auto mb-10 font-normal">
            Holistic healing, spiritual growth &amp; personal empowerment. Guiding individuals through emotional release, chakra balance, intuitive tarot clarity, and root trauma healing.
          </p>

          {/* Primary Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <a
              href="https://wa.me/919872771591?text=Hi%20The%20Tarot%20Company%2C%20I%20would%20like%20to%20book%20a%20session."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#1f2322] hover:bg-[#73a89a] text-[#FAF8F5] font-semibold text-sm tracking-wide transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm"
            >
              <span>Book a Session</span>
              <ArrowRight className="w-4 h-4 text-[#FAF8F5]" />
            </a>

            <Link
              to="/readings"
              className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-[#1f2322]/5 hover:bg-[#1f2322]/10 text-[#1f2322] font-semibold text-sm transition-colors flex items-center justify-center gap-2"
            >
              <span>Tarot Readings on Etsy</span>
            </Link>

            <a
              href="#reading-history-section"
              className="w-full sm:w-auto px-6 py-3.5 text-[#1f2322]/80 hover:text-[#73a89a] font-medium text-sm transition-colors flex items-center justify-center gap-2"
            >
              <Play className="w-3.5 h-3.5 fill-[#73a89a] text-[#73a89a]" />
              <span>Watch Ritual &amp; History Video</span>
            </a>
          </div>

          {/* Hero Visual Collage: Authentic Tarot & Psychic Elements */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 max-w-4xl mx-auto mb-14">
            <div className="relative aspect-4/3 rounded-xl overflow-hidden shadow-xs border border-[#1f2322]/10 bg-[#e9e0d1] group">
              <img
                src="https://images.unsplash.com/photo-1638803040283-7a5ffd48dad5?auto=format&fit=crop&w=600&q=80"
                alt="Consecrated Tarot Altar and Cards"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#121514]/75 via-transparent to-transparent flex items-end p-2.5">
                <span className="text-[11px] font-semibold text-white tracking-wide">Altar Spreads</span>
              </div>
            </div>

            <div className="relative aspect-4/3 rounded-xl overflow-hidden shadow-xs border border-[#1f2322]/10 bg-[#e9e0d1] group">
              <img
                src="https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&w=600&q=80"
                alt="Clairvoyant Rose & Incense Divination"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#121514]/75 via-transparent to-transparent flex items-end p-2.5">
                <span className="text-[11px] font-semibold text-white tracking-wide">Clairvoyant Channeling</span>
              </div>
            </div>

            <div className="relative aspect-4/3 rounded-xl overflow-hidden shadow-xs border border-[#1f2322]/10 bg-[#e9e0d1] group">
              <img
                src="https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=600&q=80"
                alt="Consecrated Crystals & Tarot Geometry"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#121514]/75 via-transparent to-transparent flex items-end p-2.5">
                <span className="text-[11px] font-semibold text-white tracking-wide">Crystal Grids</span>
              </div>
            </div>

            <div className="relative aspect-4/3 rounded-xl overflow-hidden shadow-xs border border-[#1f2322]/10 bg-[#e9e0d1] group">
              <img
                src="https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=600&q=80"
                alt="Chakra & Biofield Energy Realignment"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#121514]/75 via-transparent to-transparent flex items-end p-2.5">
                <span className="text-[11px] font-semibold text-white tracking-wide">Reiki &amp; Prana</span>
              </div>
            </div>
          </div>

          {/* Stats Bar (Clean, unboxed) */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 max-w-4xl mx-auto pt-8 border-t border-[#1f2322]/10">
            {STATS.map((stat, idx) => (
              <div key={idx} className="py-2 text-center">
                <div className="font-semibold text-3xl sm:text-4xl text-[#1f2322] tracking-tight">
                  {stat.value}
                </div>
                <div className="text-xs text-[#1f2322]/60 mt-1 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 2. Interactive Tool Feature Callout (Seamless section, unboxed) */}
      <section className="py-16 border-y border-[#1f2322]/10 bg-[#FAF8F5]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
            {/* Text and CTA */}
            <div className="space-y-3 max-w-lg text-center lg:text-left">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#73a89a]">
                Interactive Sacred Oracle
              </span>
              <h2 className="text-2xl sm:text-3xl font-semibold text-[#1f2322]">
                Try the Free Online Tarot Tool
              </h2>
              <p className="text-sm text-[#1f2322]/70 leading-relaxed">
                Draw authentic 1909 Rider-Waite cards directly on screen. Choose between a 1-Card daily focus or a 3-Card Past-Present-Future spread with upright and shadow meanings.
              </p>
              <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-4">
                <Link
                  to="/free-tarot"
                  className="px-7 py-3 rounded-full bg-[#1f2322] hover:bg-[#73a89a] text-[#FAF8F5] font-semibold text-sm tracking-wide shrink-0 transition-colors inline-flex items-center gap-2 shadow-sm"
                >
                  <span>Draw Your Cards</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <span className="text-xs text-[#1f2322]/50 font-mono">22 Major Arcana Deck</span>
              </div>
            </div>

            {/* Visual Real Tarot Card Fan (Natural shadow, unboxed) */}
            <div className="relative w-64 h-44 flex items-center justify-center shrink-0">
              <div className="absolute w-24 aspect-[2/3] rounded-lg overflow-hidden shadow-md transform -rotate-12 -translate-x-12 translate-y-2">
                <img
                  src="/tarot/the_star.jpg"
                  alt="The Star Tarot Card"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute w-24 aspect-[2/3] rounded-lg overflow-hidden shadow-lg transform rotate-12 translate-x-12 translate-y-2">
                <img
                  src="/tarot/the_sun.jpg"
                  alt="The Sun Tarot Card"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="relative w-26 aspect-[2/3] rounded-lg overflow-hidden shadow-xl z-10 transform -translate-y-2">
                <img
                  src="/tarot/the_fool.jpg"
                  alt="The Fool Tarot Card"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Featured Etsy Tarot Spreads (Open, normal product grid) */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <span className="text-xs uppercase tracking-wider font-semibold text-[#73a89a]">
                PsychicEra On Etsy
              </span>
              <h2 className="text-3xl sm:text-4xl font-semibold text-[#1f2322] mt-1">
                Personalized Tarot &amp; Psychic Readings
              </h2>
            </div>
            <Link
              to="/readings"
              className="mt-4 md:mt-0 inline-flex items-center gap-1.5 text-sm font-semibold text-[#1f2322] hover:text-[#73a89a] transition-colors"
            >
              <span>Explore all readings</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {READINGS_DATA.slice(0, 6).map((reading) => (
              <div
                key={reading.id}
                className="group flex flex-col justify-between"
              >
                <div>
                  {reading.imageUrl && (
                    <div className="relative mb-4 aspect-video w-full overflow-hidden rounded-xl bg-[#e9e0d1] shadow-sm">
                      <img
                        src={reading.imageUrl}
                        alt={reading.title}
                        className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300"
                        loading="lazy"
                        referrerPolicy="no-referrer"
                        onError={(e) => {
                          e.currentTarget.src = 'https://images.unsplash.com/photo-1638803040283-7a5ffd48dad5?auto=format&fit=crop&w=800&q=80';
                        }}
                      />
                      {reading.badge && (
                        <span className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-full text-[10px] font-semibold tracking-wider bg-[#1f2322]/90 text-[#FAF8F5] backdrop-blur-xs shadow-xs">
                          {reading.badge}
                        </span>
                      )}
                    </div>
                  )}

                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-medium text-[#73a89a]">
                      {reading.cardsCount}
                    </span>
                    <div className="flex items-baseline gap-1.5">
                      {reading.originalPrice && (
                        <span className="text-xs text-[#1f2322]/40 line-through">
                          {reading.originalPrice}
                        </span>
                      )}
                      <span className="text-lg font-semibold text-[#1f2322]">
                        {reading.price}
                      </span>
                    </div>
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold text-[#1f2322] mb-1 group-hover:text-[#73a89a] transition-colors line-clamp-2">
                    {reading.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#1f2322]/70 leading-relaxed mb-4 line-clamp-2">
                    {reading.tagline}
                  </p>
                </div>

                <div className="pt-2 flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => onSelectReading(reading)}
                    className="py-2 px-4 rounded-full bg-[#1f2322]/5 hover:bg-[#1f2322]/10 text-[#1f2322] text-xs font-semibold tracking-wide transition-colors cursor-pointer text-center"
                  >
                    Details
                  </button>
                  <a
                    href={getEtsyUrl(reading)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-2 px-5 rounded-full bg-[#1f2322] hover:bg-[#73a89a] text-[#FAF8F5] text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors shadow-xs"
                  >
                    <span>Order on Etsy</span>
                    <ExternalLink className="w-3 h-3 text-[#FAF8F5]" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Our Services Section (Clean 4-column layout, unboxed) */}
      <section className="py-20 border-t border-[#1f2322]/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs uppercase tracking-wider font-semibold text-[#73a89a]">
              Holistic Guidance
            </span>
            <h2 className="text-3xl sm:text-4xl font-semibold text-[#1f2322] mt-2 mb-3">
              Holistic Guidance for Mind, Body &amp; Spirit
            </h2>
            <p className="text-sm text-[#1f2322]/70">
              Over 30 healing methods, guidance systems, and therapeutic modalities to support your evolutionary journey.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {SERVICES_CATEGORIES.map((category) => (
              <div
                key={category.id}
                className="flex flex-col justify-between group pt-4 border-t border-[#1f2322]/15"
              >
                <div>
                  <h3 className="font-semibold text-lg text-[#1f2322] mb-1 group-hover:text-[#73a89a] transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-xs text-[#73a89a] font-medium mb-3">
                    {category.subtitle}
                  </p>
                  <p className="text-xs sm:text-sm text-[#1f2322]/75 leading-relaxed mb-4">
                    {category.description}
                  </p>
                </div>

                <div className="pt-2">
                  <Link
                    to={`/services#${category.id}`}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-[#1f2322] hover:text-[#73a89a] transition-colors"
                  >
                    <span>Explore Pillar</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#73a89a]" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center pt-4">
            <Link
              to="/services"
              className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-[#1f2322]/5 hover:bg-[#1f2322]/10 text-[#1f2322] text-xs font-semibold tracking-wide transition-colors"
            >
              <span>View Breakdown of All 30+ Methods</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#73a89a]" />
            </Link>
          </div>
        </div>
      </section>

      {/* 5. About Story Teaser */}
      <section className="py-20 border-t border-[#1f2322]/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <span className="text-xs uppercase tracking-wider font-semibold text-[#73a89a]">
                About The Tarot Company
              </span>
              <h2 className="text-3xl sm:text-4xl font-semibold text-[#1f2322]">
                A Journey of Healing &amp; Divine Guidance Since 2004
              </h2>
              <p className="text-sm sm:text-base text-[#1f2322]/75 leading-relaxed">
                The Tarot Company provides a grounded, compassionate sanctuary where ancient esoteric truths meet practical emotional empowerment.
              </p>
              <p className="text-sm sm:text-base text-[#1f2322]/75 leading-relaxed">
                With deep mastery across intuitive tarot, Usui Reiki Grandmastery, NLP, and energy healing, our sessions have illuminated the paths of over 20,000 seekers worldwide.
              </p>

              <div className="flex flex-wrap gap-2 pt-2">
                {['Reiki Grandmaster', 'Tarot Acharya', 'Deep Healing Coach', 'NLP Practitioner', 'Certified Hypnotherapist'].map((tag) => (
                  <span key={tag} className="px-3 py-1 rounded-full bg-[#fdfcfb] border border-[#1f2322]/10 text-xs font-medium text-[#1f2322]/80">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="pt-4">
                <Link
                  to="/about"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-[#1f2322] hover:text-[#73a89a] transition-colors"
                >
                  <span>Read Full Story &amp; Philosophy</span>
                  <ArrowRight className="w-4 h-4 text-[#73a89a]" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5 space-y-6 pt-6 lg:pt-0 lg:border-l lg:border-[#1f2322]/15 lg:pl-10">
              <div className="pb-4 border-b border-[#1f2322]/10 flex items-center gap-4">
                <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden border-2 border-[#73a89a]/30 shrink-0 shadow-sm">
                  <img
                    src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80"
                    alt="Daisy Hayes - Shop Owner & Master Intuitive"
                    className="w-full h-full object-cover"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div>
                  <h3 className="font-semibold text-xl text-[#1f2322]">
                    Daisy Hayes
                  </h3>
                  <p className="text-xs text-[#73a89a] font-semibold">Shop Owner &amp; Master Intuitive</p>
                  <p className="text-xs text-[#1f2322]/60 mt-0.5">Founder of The Tarot Company &amp; PsychicEra</p>
                </div>
              </div>

              <div className="space-y-3 text-xs text-[#1f2322]/80">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#73a89a] shrink-0" />
                  <span>In-person private sessions in Mohali &amp; Chandigarh</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#73a89a] shrink-0" />
                  <span>Online remote consultations across 18+ countries</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#73a89a] shrink-0" />
                  <span>Featured in Times of India, Life Positive &amp; Dainik Bhaskar</span>
                </div>
              </div>

              <a
                href="https://wa.me/919872771591?text=Hi%20The%20Tarot%20Company%2C%20I%20would%20like%20to%20consult%20with%20you."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 rounded-full bg-[#1f2322] hover:bg-[#73a89a] text-[#FAF8F5] text-xs font-semibold text-center block transition-colors shadow-xs"
              >
                Inquire on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Reading History, Mechanics & Importance Section with Video & Top-Notch Images */}
      <ReadingHistorySection
        onBookClick={() => {}}
        etsyBaseUrl="https://www.etsy.com/shop/PsychicEra"
      />

      {/* 6. Popular Courses Preview (Clean, open layout) */}
      <section className="py-20 border-t border-[#1f2322]/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <span className="text-xs uppercase tracking-wider font-semibold text-[#73a89a]">
                Learn &amp; Grow
              </span>
              <h2 className="text-3xl sm:text-4xl font-semibold text-[#1f2322] mt-1">
                Popular Courses &amp; Certifications
              </h2>
            </div>
            <Link
              to="/courses"
              className="mt-4 md:mt-0 inline-flex items-center gap-1.5 text-sm font-semibold text-[#1f2322] hover:text-[#73a89a] transition-colors"
            >
              <span>View all courses</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {COURSES_DATA.slice(0, 3).map((course) => (
              <div
                key={course.id}
                className="flex flex-col justify-between pt-4 border-t border-[#1f2322]/15"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold text-[#73a89a]">
                      {course.level}
                    </span>
                    <span className="text-xs text-[#1f2322]/60 font-medium">
                      {course.duration}
                    </span>
                  </div>

                  <h3 className="font-semibold text-xl text-[#1f2322] mb-2">
                    {course.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#1f2322]/70 leading-relaxed mb-4">
                    {course.tagline}
                  </p>
                </div>

                <div className="pt-2">
                  <Link
                    to="/courses"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#1f2322] hover:text-[#73a89a] transition-colors"
                  >
                    <span>Learn More &amp; Syllabi</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#73a89a]" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Testimonials (Clean editorial quote columns) */}
      <section className="py-20 border-t border-[#1f2322]/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs uppercase tracking-wider font-semibold text-[#73a89a]">
              Client Words
            </span>
            <h2 className="text-3xl font-semibold text-[#1f2322] mt-2 mb-3">
              Stories of Healing &amp; Clarity
            </h2>
            <p className="text-xs sm:text-sm text-[#1f2322]/70">
              Verified feedback from seekers around the globe.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TESTIMONIALS.slice(0, 3).map((t) => (
              <div
                key={t.id}
                className="flex flex-col justify-between pt-4 border-t border-[#1f2322]/15"
              >
                <div>
                  <div className="flex items-center gap-1 text-[#73a89a] mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-[#73a89a]" />
                    ))}
                  </div>
                  <p className="text-sm text-[#1f2322]/80 leading-relaxed mb-4 italic">
                    &ldquo;{t.review}&rdquo;
                  </p>
                </div>
                <div className="pt-2">
                  <p className="text-xs font-semibold text-[#1f2322]">{t.clientName}</p>
                  <p className="text-[11px] text-[#1f2322]/60">{t.readingType}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
