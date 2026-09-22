import React, { useState } from 'react';
import { BookOpen, GraduationCap, CheckCircle2, ArrowRight, ExternalLink, Sparkles, Award } from 'lucide-react';
import { COURSES_DATA } from '../data/readingsData';
import { ReadingHistorySection } from '../components/ReadingHistorySection';

export const CoursesPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'tarot' | 'reiki'>('all');

  const filteredCourses = activeTab === 'all'
    ? COURSES_DATA
    : COURSES_DATA.filter(c => c.category === activeTab);

  return (
    <div className="pt-32 pb-24 bg-[#FAF8F5] min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FDF6EC] border border-[#E8D5A0] text-[#7C5F1E] text-xs font-semibold uppercase tracking-widest mb-3">
            <GraduationCap className="w-3.5 h-3.5 text-[#C9A84C]" />
            <span>Certified Sacred Education &amp; Mentorship</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-serif font-bold text-[#2A1B3D] mb-4">
            Learn &amp; Grow: Certified Courses
          </h1>
          <p className="text-base sm:text-lg text-[#554763] font-serif italic leading-relaxed">
            Transform your passion for spiritual healing and esoteric wisdom into master-level practitioner skill. Taught through direct lineage transmission with extensive real-world client mentorship.
          </p>

          {/* Filter */}
          <div className="flex items-center justify-center gap-3 mt-8">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                activeTab === 'all'
                  ? 'bg-[#2A1B3D] text-[#FFFFFF] shadow-xs'
                  : 'bg-[#FDF6EC] text-[#7C5F1E] border border-[#E8D5A0] hover:bg-[#F8EEDD]'
              }`}
            >
              All Courses
            </button>
            <button
              onClick={() => setActiveTab('tarot')}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                activeTab === 'tarot'
                  ? 'bg-[#2A1B3D] text-[#FFFFFF] shadow-xs'
                  : 'bg-[#FDF6EC] text-[#7C5F1E] border border-[#E8D5A0] hover:bg-[#F8EEDD]'
              }`}
            >
              Tarot Arcana Courses
            </button>
            <button
              onClick={() => setActiveTab('reiki')}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                activeTab === 'reiki'
                  ? 'bg-[#2A1B3D] text-[#FFFFFF] shadow-xs'
                  : 'bg-[#FDF6EC] text-[#7C5F1E] border border-[#E8D5A0] hover:bg-[#F8EEDD]'
              }`}
            >
              Reiki &amp; Energy Lineage
            </button>
          </div>
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          {filteredCourses.map((course) => (
            <div
              key={course.id}
              className="py-4 flex flex-col justify-between border-b border-[#E8DDCF]/80 pb-12"
            >
              <div>
                {course.imageUrl && (
                  <div className="w-full aspect-16/9 rounded-xl overflow-hidden mb-5 bg-[#e9e0d1] shadow-xs border border-[#1f2322]/10">
                    <img
                      src={course.imageUrl}
                      alt={course.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                )}

                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-semibold text-[#7C5F1E]">
                    {course.level}
                  </span>
                  <span className="text-xs font-medium text-[#7D6B88]">
                    {course.duration}
                  </span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#2A1B3D] mb-2">
                  {course.title}
                </h2>
                <p className="text-sm text-[#5B4C65] leading-relaxed mb-6">
                  {course.tagline}
                </p>

                <div className="pt-3 border-t border-[#F5EFE6] space-y-2.5 mb-8">
                  <p className="text-xs font-semibold uppercase tracking-wider text-[#C9A84C]">
                    Curriculum Highlights:
                  </p>
                  {course.features.map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs text-[#44384D]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#C9A84C] shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-2">
                <a
                  href={`https://wa.me/919872771591?text=${encodeURIComponent(`Hi The Tarot Company, I would like to inquire regarding enrollment in the ${course.title}.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex py-3 px-7 rounded-full bg-[#2A1B3D] hover:bg-[#3D2756] text-[#FFFFFF] text-xs font-semibold tracking-wide items-center justify-center gap-2 transition-colors"
                >
                  <span>{course.ctaText}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#C9A84C]" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Credentials Assurance Banner */}
        <div className="py-10 text-center max-w-3xl mx-auto space-y-3 border-t border-[#E8DDCF]/80">
          <Award className="w-7 h-7 text-[#C9A84C] mx-auto" />
          <h3 className="text-xl font-serif font-bold text-[#2A1B3D]">
            Authentic Lineage &amp; Authorised Teaching
          </h3>
          <p className="text-xs sm:text-sm text-[#6A5741] leading-relaxed">
            All certifications carry direct Usui Shiki Ryoho lineage attunements and recognized accreditation under The Tarot Company. Small batch sizes ensure direct mentor attention.
          </p>
        </div>

        {/* Sacred Lineage & Ritual Video Section */}
        <div className="mt-16 -mx-4 sm:-mx-6 lg:-mx-8">
          <ReadingHistorySection />
        </div>
      </div>
    </div>
  );
};
