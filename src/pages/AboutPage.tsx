import React from 'react';
import { Sparkles, Heart, Lock, Feather, Award, BookOpen, Star, CheckCircle2, ShieldCheck } from 'lucide-react';
import { CORE_VALUES } from '../data/readingsData';
import { Link } from 'react-router-dom';
import { ReadingHistorySection } from '../components/ReadingHistorySection';

export const AboutPage: React.FC = () => {
  return (
    <div className="pt-32 pb-24 bg-[#FAF8F5] min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FDF6EC] border border-[#E8D5A0] text-[#7C5F1E] text-xs font-semibold uppercase tracking-widest mb-3">
            <span>Our Founder &amp; Master Healer</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-serif font-bold text-[#2A1B3D] mb-4">
            About The Tarot Company
          </h1>
          <p className="text-base sm:text-lg text-[#554763] font-serif italic leading-relaxed">
            Bridging timeless esoteric wisdom with modern emotional intelligence, intuitive tarot clarity, and deep personal empowerment since 2004.
          </p>
        </div>

        {/* Bio & Origins */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20">
          <div className="lg:col-span-7 space-y-6">
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#2A1B3D]">
              Healing the Root, Empowering the Sovereign Soul
            </h2>
            <p className="text-sm sm:text-base text-[#4C3E56] leading-relaxed">
              Founded by master intuitive and shop owner Daisy Hayes, The Tarot Company offers a sacred space where ancient card wisdom meets practical emotional clarity.
            </p>
            <p className="text-sm sm:text-base text-[#4C3E56] leading-relaxed">
              Believing that divination and energy healing must never foster dependency or fatalistic fear, we author pioneering literature and craft grounded consultations that return clarity and agency to every seeker.
            </p>
            <p className="text-sm sm:text-base text-[#4C3E56] leading-relaxed">
              Every consultation—whether hand-drawn tarot spreads, distant Reiki attunements, or subconscious personal coaching—is held in a sacred, non-judgmental space designed to illuminate your true potential.
            </p>

            <div className="pt-2">
              <a
                href="https://wa.me/919872771591?text=Hi%20The%20Tarot%20Company%2C%20I%20would%20like%20to%20learn%20more%20about%20your%20consultations."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#2A1B3D] hover:bg-[#3D2756] text-[#FFFFFF] text-xs font-semibold tracking-wide transition-colors"
              >
                <span>Connect with Us on WhatsApp</span>
                <span>→</span>
              </a>
            </div>
          </div>

          <div className="lg:col-span-5 p-6 sm:p-8 space-y-6">
            <div className="text-center pb-4 border-b border-[#E8DDCF]">
              <div className="w-28 h-28 rounded-full overflow-hidden border-3 border-[#C9A84C] mx-auto mb-4 shadow-md bg-[#2A1B3D]">
                <img
                  src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=500&q=80"
                  alt="Daisy Hayes - Shop Owner & Master Intuitive"
                  className="w-full h-full object-cover"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
              </div>
              <h3 className="font-serif font-bold text-2xl text-[#2A1B3D]">
                The Tarot Company
              </h3>
              <p className="text-xs text-[#7C5F1E] font-medium">Daisy Hayes • Shop Owner &amp; Master Intuitive</p>
              <p className="text-xs text-[#705D7F] mt-1">Serving clients worldwide &amp; in-person</p>
            </div>

            <div className="space-y-3 text-xs sm:text-sm text-[#4C3E56]">
              <div className="flex items-center gap-2.5">
                <Award className="w-4 h-4 text-[#C9A84C] shrink-0" />
                <span>Reiki Grandmaster Lineage Teacher</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Award className="w-4 h-4 text-[#C9A84C] shrink-0" />
                <span>Tarot Acharya &amp; Arcana Grandmaster</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Award className="w-4 h-4 text-[#C9A84C] shrink-0" />
                <span>Certified Clinical Hypnotherapist &amp; NLP Master</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Award className="w-4 h-4 text-[#C9A84C] shrink-0" />
                <span>Alumna of Tasso International (Regression Institute)</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Award className="w-4 h-4 text-[#C9A84C] shrink-0" />
                <span>EFT &amp; Emotional Cord Cutting Specialist</span>
              </div>
            </div>
          </div>
        </div>

        {/* 3 Core Ethical Values */}
        <div className="mb-20">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs uppercase tracking-widest font-semibold text-[#C9A84C]">
              Guiding Principles
            </span>
            <h2 className="text-3xl font-serif font-bold text-[#2A1B3D] mt-2 mb-3">
              Our Sacred Commitments
            </h2>
            <p className="text-sm text-[#6A5A77] font-serif italic">
              Every session adheres strictly to compassionate ethics, absolute confidentiality, and grounded empowerment.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="py-4 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-full bg-[#FDF6EC] text-[#C9A84C] flex items-center justify-center mb-4">
                  <Heart className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-serif font-bold text-[#2A1B3D] mb-2">
                  Compassionate Sanctuary
                </h3>
                <p className="text-sm text-[#52445C] leading-relaxed">
                  Zero judgment for complex personal or relationship circumstances. You are welcomed into an emotionally safe, honoring space.
                </p>
              </div>
            </div>

            <div className="py-4 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-full bg-[#FDF6EC] text-[#C9A84C] flex items-center justify-center mb-4">
                  <Lock className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-serif font-bold text-[#2A1B3D] mb-2">
                  Absolute Confidentiality
                </h3>
                <p className="text-sm text-[#52445C] leading-relaxed">
                  All personal details, questions, astrological data, and reading logs are protected with strict professional privacy.
                </p>
              </div>
            </div>

            <div className="py-4 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-full bg-[#FDF6EC] text-[#C9A84C] flex items-center justify-center mb-4">
                  <Feather className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-serif font-bold text-[#2A1B3D] mb-2">
                  Grounded Truth
                </h3>
                <p className="text-sm text-[#52445C] leading-relaxed">
                  We never manipulate with fear-based predictions or false promises. We deliver constructive clarity so you make empowered life choices.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Media Mentions & Accolades */}
        <div className="py-10 text-center max-w-4xl mx-auto border-t border-[#E8DDCF]/80">
          <span className="text-xs uppercase tracking-widest font-semibold text-[#7C5F1E] block mb-2">
            Featured In Renowned Media Publications
          </span>
          <p className="text-sm font-serif italic text-[#4A3B2C] mb-4">
            The Times of India • Life Positive Magazine • Mystic India Magazine • The Tribune India • Dainik Bhaskar • Times of Chandigarh
          </p>
          <div className="flex justify-center gap-4 text-xs font-semibold text-[#2A1B3D]">
            <span>20+ Years Dedicated Experience</span>
            <span>•</span>
            <span>20,000+ Seekers Guided</span>
            <span>•</span>
            <span>Author of Hindi Tarot Literature</span>
          </div>
        </div>

        {/* The Sacred Lineage, Mechanics & Altar Ritual Video */}
        <div className="mt-16 -mx-4 sm:-mx-6 lg:-mx-8">
          <ReadingHistorySection />
        </div>
      </div>
    </div>
  );
};
