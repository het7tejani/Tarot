import React, { useState } from 'react';
import {
  History,
  Compass,
  Sparkles,
  HelpCircle,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize2,
  BookOpen,
  Hourglass,
  Layers,
  HeartHandshake,
  CheckCircle2,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  Eye
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface ReadingHistorySectionProps {
  onBookClick?: () => void;
  etsyBaseUrl?: string;
}

export const ReadingHistorySection: React.FC<ReadingHistorySectionProps> = ({
  onBookClick,
  etsyBaseUrl = 'https://www.etsy.com/shop/PsychicEra'
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [activeTab, setActiveTab] = useState<'origins' | 'mechanism' | 'importance'>('origins');
  const [activeVideoIndex, setActiveVideoIndex] = useState(0);

  const videoScenes = [
    {
      id: 'ritual',
      title: 'Sacred Tarot Card Shuffling & Spread',
      subtitle: 'Hands of the intuitive drawing linen cards',
      tag: 'Tarot Spread',
      src: 'https://assets.mixkit.co/videos/preview/mixkit-hands-of-a-woman-holding-tarot-cards-42635-large.mp4',
      poster: 'https://images.unsplash.com/photo-1638803040283-7a5ffd48dad5?q=80&w=1600&auto=format&fit=crop'
    },
    {
      id: 'candles',
      title: 'Altar Candle Flame & Psychic Scrying',
      subtitle: 'Consecrated flame focus for clairvoyant channeling',
      tag: 'Psychic Focus',
      src: 'https://assets.mixkit.co/videos/preview/mixkit-lit-candles-in-the-dark-42867-large.mp4',
      poster: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?q=80&w=1600&auto=format&fit=crop'
    },
    {
      id: 'incense',
      title: 'Sacred Smoke & Aura Smudging',
      subtitle: 'Purifying energetic channels prior to consultation',
      tag: 'Energy Cleansing',
      src: 'https://assets.mixkit.co/videos/preview/mixkit-smoke-from-an-incense-stick-moving-in-the-air-42638-large.mp4',
      poster: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?q=80&w=1600&auto=format&fit=crop'
    }
  ];

  const handleSelectVideo = (index: number) => {
    setActiveVideoIndex(index);
    const video = document.getElementById('tarot-reading-video') as HTMLVideoElement | null;
    if (video) {
      video.pause();
      video.src = videoScenes[index].src;
      video.load();
      video.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  const handleTogglePlay = (e: React.MouseEvent<HTMLButtonElement | HTMLDivElement>) => {
    e.stopPropagation();
    const video = document.getElementById('tarot-reading-video') as HTMLVideoElement | null;
    if (video) {
      if (video.paused) {
        video.play().catch(() => {});
        setIsPlaying(true);
      } else {
        video.pause();
        setIsPlaying(false);
      }
    }
  };

  const handleToggleMute = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    const video = document.getElementById('tarot-reading-video') as HTMLVideoElement | null;
    if (video) {
      video.muted = !video.muted;
      setIsMuted(video.muted);
    }
  };

  const timelineMilestones = [
    {
      period: '15th Century (c. 1440)',
      title: 'The Italian Renaissance & Visconti-Sforza',
      description:
        'Tarot was born in Milan, Ferrara, and Bologna as "Tarocchi" (or Carte da Trionfi—cards of triumphs). Master illuminators painted gold-leaf archetypes reflecting Renaissance philosophy, Neoplatonic virtues, and cosmic order.',
      tag: 'Birth of the Deck'
    },
    {
      period: 'Late 18th Century (1781)',
      title: 'Antoine Court de Gébelin & Esoteric Rebirth',
      description:
        'French clergymen and scholars recognized that the 22 Major Arcana preserved ancient Egyptian and Hermetic allegories of the human soul\'s evolutionary journey, pivoting the cards toward esoteric exploration.',
      tag: 'Esoteric System'
    },
    {
      period: '1909 London',
      title: 'The Rider-Waite-Smith Revolution',
      description:
        'Occult scholar Arthur Edward Waite and Jamaican-British artist Pamela Colman Smith created the definitive modern deck, illustrating all 56 Minor Arcana with emotional narratives and deep human scenes.',
      tag: 'Modern Landmark'
    },
    {
      period: 'Mid-20th Century to Present',
      title: 'Jungian Psychology & Archetypal Clarity',
      description:
        'Carl Jung recognized tarot as a profound visual map of the collective unconscious. Today, an authentic reading serves as an intuitive mirror for emotional healing, shadow work, and conscious decision-making.',
      tag: 'Conscious Healing'
    }
  ];

  const workingSteps = [
    {
      number: '01',
      title: 'The Law of Synchronicity',
      subtitle: 'Meaningful coincidences beyond physical causality',
      body: 'Carl Jung defined synchronicity as an acausal connecting principle. When you bring your honest question and focused intention, the cards shuffled and pulled reflect your exact subconscious energetic landscape at that pivotal moment.',
      highlight: 'Subconscious Mirror'
    },
    {
      number: '02',
      title: 'Archetypal Resonance',
      subtitle: '78 universal keys to the human experience',
      body: 'From The Fool\'s innocent leap of faith to The World\'s cosmic integration, each card embodies timeless psychological archetypes that illuminate the hidden currents beneath relationships, careers, and spiritual awakenings.',
      highlight: 'Universal Symbolism'
    },
    {
      number: '03',
      title: 'Intuitive Synthesis & Channeled Guidance',
      subtitle: 'Connecting card geometry into actionable clarity',
      body: 'An experienced reader does not recite cookie-cutter definitions. We read the energetic dialogue between adjoining cards, elemental balances (Fire, Water, Air, Earth), and celestial frequencies to unearth what your higher self already knows.',
      highlight: 'Clairvoyant Synthesis'
    }
  ];

  const importancePillars = [
    {
      icon: Eye,
      title: 'Unraveling Blind Spots',
      desc: 'When emotionally entangled in heartbreak, family friction, or career burnout, we miss subtle patterns. A reading pulls you up to a bird’s-eye vantage point.'
    },
    {
      icon: Compass,
      title: 'Restoring Sovereign Free Will',
      desc: 'Authentic divination never dictates fatalistic futures. Instead, it reveals the trajectory of your current momentum and empowers you to actively rewrite the outcome.'
    },
    {
      icon: Sparkles,
      title: 'Energetic Chakra Realignment',
      desc: 'Reveals where vital Prana or Chi is clogged—illuminating past trauma, blocked throat chakras, or unhealed grief so true emotional release can begin.'
    },
    {
      icon: HeartHandshake,
      title: 'Validated Inner Intuition',
      desc: 'Most seekers discover the cards eloquently articulate the quiet, sacred gut feeling they had been second-guessing for weeks or months.'
    }
  ];

  return (
    <section
      id="reading-history-section"
      className="py-20 md:py-28 border-t border-[#1f2322]/10 bg-[#FAF8F5] relative overflow-hidden text-[#1f2322]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header Eyebrow & Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#73a89a]/10 border border-[#73a89a]/20 text-[#73a89a] text-xs font-semibold uppercase tracking-widest mb-4">
            <History className="w-3.5 h-3.5" />
            <span>The Sacred Lineage of Divination</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-[#1f2322] leading-tight mb-5">
            The History, Mechanics &amp; Importance of Reading
          </h2>
          <p className="text-base sm:text-lg text-[#1f2322]/75 leading-relaxed font-normal">
            From 15th-century Italian courts to modern Jungian depth psychology—discover how intuitive card readings started, the cosmic mechanics of synchronicity, and why conscious divination remains an essential sanctuary for clarity today.
          </p>
        </div>

        {/* Cinematic Video Feature Card */}
        <div className="mb-20 rounded-2xl md:rounded-3xl overflow-hidden border border-[#1f2322]/10 bg-[#121514] text-[#FAF8F5] shadow-xl relative group">
          <div className="relative aspect-video sm:aspect-21/9 md:aspect-21/9 max-h-[520px] w-full overflow-hidden bg-[#1f2322]">
            {/* Native Video Element */}
            <video
              id="tarot-reading-video"
              className="w-full h-full object-cover opacity-90 transition-opacity duration-500"
              poster="https://images.unsplash.com/photo-1638803040283-7a5ffd48dad5?q=80&w=1600&auto=format&fit=crop"
              playsInline
              loop
              muted={isMuted}
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
            >
              <source
                src="https://assets.mixkit.co/videos/preview/mixkit-hands-of-a-woman-holding-tarot-cards-42635-large.mp4"
                type="video/mp4"
              />
              Your browser does not support the video tag.
            </video>

            {/* Gradient Vignette Overlay for Editorial Feel */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#121514] via-[#121514]/30 to-transparent pointer-events-none" />

            {/* Big Center Play/Pause Indicator (Disappears when playing, appears on hover) */}
            <div
              onClick={handleTogglePlay}
              className="absolute inset-0 flex items-center justify-center cursor-pointer"
            >
              {!isPlaying && (
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#FAF8F5]/90 text-[#1f2322] flex items-center justify-center shadow-2xl hover:scale-105 hover:bg-[#FAF8F5] transition-all duration-300">
                  <Play className="w-7 h-7 sm:w-8 sm:h-8 ml-1 text-[#1f2322] fill-[#1f2322]" />
                </div>
              )}
            </div>

            {/* Video Control Bar Overlay */}
            <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-8 sm:right-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4 z-10">
              <div className="max-w-xl">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#FAF8F5]/20 backdrop-blur-md text-[11px] font-semibold tracking-wider uppercase text-[#FAF8F5] mb-2">
                  <Sparkles className="w-3 h-3 text-[#73a89a]" /> Channeled Altar Ritual
                </span>
                <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold text-white tracking-tight leading-snug">
                  Inside the Sacred Reading Sanctuary
                </h3>
                <p className="text-xs sm:text-sm text-white/80 line-clamp-2 mt-1 hidden sm:block">
                  Witness how consecrated incense, sacred geometries, hand-shuffled linen cards, and deep meditative presence combine to bring transcendent clarity to every consultation.
                </p>
              </div>

              {/* Media Controls */}
              <div className="flex items-center gap-2.5 self-start sm:self-auto">
                <button
                  type="button"
                  onClick={handleTogglePlay}
                  className="px-4 py-2 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md text-white text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer"
                  id="tarot-video-toggle-play"
                  aria-label={isPlaying ? 'Pause ritual video' : 'Play ritual video'}
                >
                  {isPlaying ? (
                    <>
                      <Pause className="w-3.5 h-3.5 fill-white" />
                      <span>Pause</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-3.5 h-3.5 fill-white" />
                      <span>Watch Ritual</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={handleToggleMute}
                  className="p-2 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md text-white transition-all cursor-pointer"
                  title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
                  aria-label={isMuted ? 'Unmute Audio' : 'Mute Audio'}
                  id="tarot-video-toggle-mute"
                >
                  {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </button>
              </div>
            </div>
          </div>

          {/* Interactive Multi-Scene Selector Bar */}
          <div className="bg-[#181d1b] border-t border-white/10 p-3 sm:p-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <span className="text-xs font-medium text-white/60 uppercase tracking-wider pl-1">
                Select Sacred Ritual View:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {videoScenes.map((scene, idx) => (
                  <button
                    key={scene.id}
                    type="button"
                    onClick={() => handleSelectVideo(idx)}
                    className={`px-3 py-2 rounded-lg text-left transition-all flex items-center gap-2.5 cursor-pointer ${
                      activeVideoIndex === idx
                        ? 'bg-[#73a89a]/20 border border-[#73a89a]/60 text-white'
                        : 'bg-white/5 border border-white/5 text-white/70 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    <div className="w-8 h-8 rounded-md overflow-hidden shrink-0 border border-white/10">
                      <img
                        src={scene.poster}
                        alt={scene.title}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[11px] font-semibold text-[#73a89a] leading-none mb-0.5">
                        {scene.tag}
                      </p>
                      <p className="text-xs font-medium truncate">
                        {scene.title}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Deep-Dive Tabs (Origins, Mechanics, Importance) */}
        <div className="mb-12 flex justify-center">
          <div className="inline-flex p-1.5 rounded-full bg-[#1f2322]/5 border border-[#1f2322]/10 max-w-full overflow-x-auto">
            <button
              type="button"
              onClick={() => setActiveTab('origins')}
              className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 flex items-center gap-2 cursor-pointer whitespace-nowrap ${
                activeTab === 'origins'
                  ? 'bg-[#1f2322] text-[#FAF8F5] shadow-sm'
                  : 'text-[#1f2322]/70 hover:text-[#1f2322]'
              }`}
              id="tab-reading-history"
            >
              <Hourglass className="w-4 h-4" />
              <span>How Reading Started (History)</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('mechanism')}
              className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 flex items-center gap-2 cursor-pointer whitespace-nowrap ${
                activeTab === 'mechanism'
                  ? 'bg-[#1f2322] text-[#FAF8F5] shadow-sm'
                  : 'text-[#1f2322]/70 hover:text-[#1f2322]'
              }`}
              id="tab-reading-mechanism"
            >
              <Layers className="w-4 h-4" />
              <span>How It Works (Mechanics)</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('importance')}
              className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 flex items-center gap-2 cursor-pointer whitespace-nowrap ${
                activeTab === 'importance'
                  ? 'bg-[#1f2322] text-[#FAF8F5] shadow-sm'
                  : 'text-[#1f2322]/70 hover:text-[#1f2322]'
              }`}
              id="tab-reading-importance"
            >
              <Sparkles className="w-4 h-4" />
              <span>Importance &amp; Value of Reading</span>
            </button>
          </div>
        </div>

        {/* Tab 1: Origins & History */}
        {activeTab === 'origins' && (
          <div className="animate-fadeIn space-y-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-5 space-y-4">
                <span className="text-xs uppercase tracking-wider font-semibold text-[#73a89a]">
                  Six Centuries of Wisdom
                </span>
                <h3 className="text-2xl sm:text-3xl font-semibold text-[#1f2322] leading-tight">
                  From Renaissance Parlors to Cosmic Soul Cartography
                </h3>
                <p className="text-sm sm:text-base text-[#1f2322]/75 leading-relaxed">
                  Before tarot was an esoteric oracle, it emerged in Northern Italy during the 1440s as a magnificent game of trumps known as <em>Trionfi</em>. Noble families like the Visconti and Sforza commissioned court artists to illuminate 78 miniature canvases laced with Renaissance allegory, Christian virtue, and Neoplatonic cosmological maps.
                </p>
                <p className="text-sm sm:text-base text-[#1f2322]/75 leading-relaxed">
                  Over centuries, visionary mystics, cabalists, and psychological pioneers recognized that the cards were not mere playthings, but a complete codex of the human psyche—charting our trials through love, adversity, enlightenment, and ultimate rebirth.
                </p>
              </div>

              <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="relative aspect-4/3 rounded-2xl overflow-hidden shadow-sm border border-[#1f2322]/10 bg-[#e9e0d1] group">
                  <img
                    src="https://images.unsplash.com/photo-1638803040283-7a5ffd48dad5?q=80&w=800&auto=format&fit=crop"
                    alt="Antique tarot cards and esoteric relics"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#121514]/80 via-transparent to-transparent flex items-end p-4">
                    <div>
                      <p className="text-xs font-semibold text-white">Hand-Painted Gold Leaf Origins</p>
                      <p className="text-[11px] text-white/80">Renaissance 1440s Trionfi decks</p>
                    </div>
                  </div>
                </div>

                <div className="relative aspect-4/3 rounded-2xl overflow-hidden shadow-sm border border-[#1f2322]/10 bg-[#e9e0d1] group">
                  <img
                    src="https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=800&auto=format&fit=crop"
                    alt="Vintage book of esoteric symbology"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#121514]/80 via-transparent to-transparent flex items-end p-4">
                    <div>
                      <p className="text-xs font-semibold text-white">The Hermetic Canon</p>
                      <p className="text-[11px] text-white/80">Rider-Waite-Smith 1909 transformation</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Timeline Breakdown */}
            <div className="pt-6 border-t border-[#1f2322]/10">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {timelineMilestones.map((milestone, idx) => (
                  <div
                    key={idx}
                    className="p-6 rounded-2xl bg-[#fdfcfb] border border-[#1f2322]/10 shadow-xs flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-[11px] uppercase tracking-wider font-semibold text-[#73a89a]">
                          {milestone.tag}
                        </span>
                        <span className="text-xs text-[#1f2322]/50 font-medium">0{idx + 1}</span>
                      </div>
                      <p className="text-xs font-semibold text-[#1f2322]/60 mb-1">{milestone.period}</p>
                      <h4 className="text-base font-semibold text-[#1f2322] mb-2 leading-snug">
                        {milestone.title}
                      </h4>
                      <p className="text-xs text-[#1f2322]/70 leading-relaxed">
                        {milestone.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: How It Works / Mechanics */}
        {activeTab === 'mechanism' && (
          <div className="animate-fadeIn space-y-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-6 relative aspect-16/10 rounded-2xl overflow-hidden shadow-sm border border-[#1f2322]/10 bg-[#e9e0d1] group">
                <img
                  src="https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?q=80&w=1000&auto=format&fit=crop"
                  alt="Tarot spread layout with candles and crystals"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#121514]/80 via-transparent to-transparent flex items-end p-6">
                  <div>
                    <span className="text-xs font-semibold text-[#73a89a] uppercase tracking-widest">
                      Energetic Synthesis
                    </span>
                    <p className="text-base font-semibold text-white mt-1">
                      78 Archetypes • 4 Elements • Cosmic Synchronicity
                    </p>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-6 space-y-5">
                <span className="text-xs uppercase tracking-wider font-semibold text-[#73a89a]">
                  Demystifying the Mystical
                </span>
                <h3 className="text-2xl sm:text-3xl font-semibold text-[#1f2322] leading-tight">
                  Not Fortune-Telling: The Science &amp; Art of Synchronicity
                </h3>
                <p className="text-sm sm:text-base text-[#1f2322]/75 leading-relaxed">
                  Many assume tarot is superstitious guessing. In reality, modern intuitive reading functions as a sophisticated, symbolic language that interfaces directly with your higher self and the subconscious mind.
                </p>
                <div className="p-4 rounded-xl bg-[#73a89a]/10 border border-[#73a89a]/20">
                  <p className="text-xs sm:text-sm text-[#1f2322]/90 italic font-medium leading-relaxed">
                    &ldquo;Until you make the unconscious conscious, it will direct your life and you will call it fate.&rdquo;
                    <span className="block mt-1 font-semibold not-italic text-[#73a89a]">
                      — Carl Gustav Jung, Founder of Analytical Psychology
                    </span>
                  </p>
                </div>
              </div>
            </div>

            {/* 3 Step Mechanics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
              {workingSteps.map((step) => (
                <div
                  key={step.number}
                  className="p-6 rounded-2xl bg-[#fdfcfb] border border-[#1f2322]/10 shadow-xs flex flex-col justify-between hover:border-[#73a89a]/50 transition-colors"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="w-10 h-10 rounded-full bg-[#1f2322] text-[#FAF8F5] text-sm font-semibold flex items-center justify-center">
                        {step.number}
                      </span>
                      <span className="text-[11px] font-semibold text-[#73a89a] uppercase tracking-wider">
                        {step.highlight}
                      </span>
                    </div>
                    <h4 className="text-lg font-semibold text-[#1f2322] mb-1">{step.title}</h4>
                    <p className="text-xs font-medium text-[#1f2322]/60 mb-3">{step.subtitle}</p>
                    <p className="text-xs sm:text-sm text-[#1f2322]/75 leading-relaxed">{step.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: Importance of Reading */}
        {activeTab === 'importance' && (
          <div className="animate-fadeIn space-y-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-6 space-y-5">
                <span className="text-xs uppercase tracking-wider font-semibold text-[#73a89a]">
                  Why Seek a Reading Today?
                </span>
                <h3 className="text-2xl sm:text-3xl font-semibold text-[#1f2322] leading-tight">
                  Clarity in an Overstimulated World
                </h3>
                <p className="text-sm sm:text-base text-[#1f2322]/75 leading-relaxed">
                  In a noisy modern world saturated with outside opinions, social pressures, and decision fatigue, we frequently lose touch with our own internal compass.
                </p>
                <p className="text-sm sm:text-base text-[#1f2322]/75 leading-relaxed">
                  An authentic reading provides a dedicated sanctuary of stillness. It cuts through mental static, reveals root emotional blockages, validates quiet intuitions, and hands you the reins to navigate with total peace and grounded purpose.
                </p>
                <div className="pt-2 flex items-center gap-3">
                  <Link
                    to="/readings"
                    className="px-6 py-3 rounded-full bg-[#1f2322] hover:bg-[#73a89a] text-[#FAF8F5] text-xs font-semibold tracking-wide transition-colors"
                  >
                    Browse Our Spreads
                  </Link>
                  <Link
                    to="/free-tarot"
                    className="px-6 py-3 rounded-full bg-[#1f2322]/5 hover:bg-[#1f2322]/10 text-[#1f2322] text-xs font-semibold tracking-wide transition-colors"
                  >
                    Try Free Single Draw
                  </Link>
                </div>
              </div>

              <div className="lg:col-span-6 relative aspect-16/10 rounded-2xl overflow-hidden shadow-sm border border-[#1f2322]/10 bg-[#e9e0d1] group">
                <img
                  src="https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=1000&auto=format&fit=crop"
                  alt="Contemplative spiritual seeker receiving clarity"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#121514]/80 via-transparent to-transparent flex items-end p-6">
                  <div>
                    <p className="text-xs font-semibold text-[#73a89a] uppercase tracking-widest">
                      Personal Empowerment
                    </p>
                    <p className="text-base font-semibold text-white mt-1">
                      Turning Confusion Into Confident Action
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* 4 Pillars of Importance */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-4">
              {importancePillars.map((pillar, idx) => {
                const IconComponent = pillar.icon;
                return (
                  <div
                    key={idx}
                    className="p-6 rounded-2xl bg-[#fdfcfb] border border-[#1f2322]/10 shadow-xs flex flex-col justify-between"
                  >
                    <div>
                      <div className="w-10 h-10 rounded-full bg-[#73a89a]/15 text-[#73a89a] flex items-center justify-center mb-4">
                        <IconComponent className="w-5 h-5" />
                      </div>
                      <h4 className="text-base font-semibold text-[#1f2322] mb-2">{pillar.title}</h4>
                      <p className="text-xs sm:text-sm text-[#1f2322]/70 leading-relaxed">
                        {pillar.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Action Callout Footnote */}
        <div className="mt-16 p-8 rounded-2xl bg-[#fdfcfb] border border-[#1f2322]/10 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xs">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="text-lg font-semibold text-[#1f2322]">
              Ready to experience this six-century tradition firsthand?
            </h4>
            <p className="text-xs sm:text-sm text-[#1f2322]/70">
              Every reading is hand-drawn on consecrated linen with personalized guidance delivered within 24–48 hours.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <a
              href="https://wa.me/919872771591?text=Hi%20The%20Tarot%20Company%2C%20I%20would%20like%20to%20consult%20with%20you."
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-full bg-[#1f2322] hover:bg-[#73a89a] text-[#FAF8F5] text-xs font-semibold tracking-wide transition-colors"
            >
              Consult with Healer
            </a>
            <Link
              to="/how-it-works"
              className="px-5 py-2.5 rounded-full bg-[#1f2322]/5 hover:bg-[#1f2322]/10 text-[#1f2322] text-xs font-semibold tracking-wide transition-colors"
            >
              Order Step-by-Step
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
