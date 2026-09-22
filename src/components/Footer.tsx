import React from 'react';
import { ExternalLink, SlidersHorizontal } from 'lucide-react';
import { Link } from 'react-router-dom';

interface FooterProps {
  onOpenSettings?: () => void;
  etsyBaseUrl: string;
}

export const Footer: React.FC<FooterProps> = ({ onOpenSettings, etsyBaseUrl }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#f4efec] text-[#1f2322] pt-16 pb-12 border-t border-[#1f2322]/10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-[#1f2322]/10">
          {/* Brand Col */}
          <div className="md:col-span-5 space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-[#73a89a]" />
              <span className="font-semibold text-lg text-[#1f2322] tracking-tight">
                The Tarot Company
              </span>
            </Link>
            <p className="text-sm text-[#1f2322]/70 leading-relaxed max-w-sm">
              Intuitive spiritual guidance, compassionate tarot readings, and energetic clarity delivered directly through our verified Etsy shop.
            </p>
            <div className="pt-2 flex items-center gap-3">
              <a
                href={etsyBaseUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold bg-[#1f2322] text-[#fdfcfb] hover:bg-[#73a89a] transition-colors"
              >
                <span>PsychicEra on Etsy</span>
                <ExternalLink className="w-3 h-3 opacity-70" />
              </a>

              {onOpenSettings && (
                <button
                  onClick={onOpenSettings}
                  className="inline-flex items-center gap-1 text-xs text-[#1f2322]/60 hover:text-[#73a89a] transition-colors"
                >
                  <SlidersHorizontal className="w-3.5 h-3.5" />
                  <span>Configure URLs</span>
                </button>
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs uppercase tracking-wider text-[#1f2322]/50 font-semibold">
              Navigation
            </h4>
            <ul className="space-y-2 text-sm text-[#1f2322]/75">
              <li>
                <Link to="/" className="hover:text-[#73a89a] transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/readings" className="hover:text-[#73a89a] transition-colors">
                  Readings &amp; Spreads
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-[#73a89a] transition-colors">
                  All Services
                </Link>
              </li>
              <li>
                <Link to="/blog" className="hover:text-[#73a89a] transition-colors">
                  Blog &amp; Mystic Articles
                </Link>
              </li>
              <li>
                <Link to="/free-tarot" className="hover:text-[#73a89a] transition-colors">
                  Free Card Draw
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-[#73a89a] transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-[#73a89a] transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-[#73a89a] transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact / Etsy Shop */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs uppercase tracking-wider text-[#1f2322]/50 font-semibold">
              Connect &amp; Inquiries
            </h4>
            <div className="space-y-2 text-sm text-[#1f2322]/75">
              <p>Email: <a href="mailto:contact.onclickinfotech@gmail.com" className="hover:text-[#73a89a] underline underline-offset-4">contact.onclickinfotech@gmail.com</a></p>
              <p>WhatsApp: <a href="https://wa.me/919872771591" target="_blank" rel="noopener noreferrer" className="hover:text-[#73a89a] underline underline-offset-4">+91 9872771591</a></p>
              <p>Studio: Buddha Marg, Sector 125, Greater Mohali, India</p>
            </div>
            <div className="pt-2">
              <p className="text-xs text-[#1f2322]/60">
                All custom spreads and clairvoyant reports delivered safely within 24–48 hours directly on Etsy.
              </p>
            </div>
          </div>
        </div>

        {/* Minimal Legal Links like Instinct */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#1f2322]/60">
          <p>
            Copyright &copy; {currentYear} The Tarot Company. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link to="/faq" className="hover:text-[#73a89a] transition-colors">
              Terms &amp; Ethics
            </Link>
            <Link to="/contact" className="hover:text-[#73a89a] transition-colors">
              Privacy
            </Link>
            <Link
              to="/admin"
              className="text-[#1f2322]/50 hover:text-[#1f2322] font-medium transition-colors flex items-center gap-1 bg-[#1f2322]/5 hover:bg-[#1f2322]/10 px-2.5 py-1 rounded-full text-[11px]"
              title="Staff & CMS Management Portal"
            >
              <span>Admin CMS</span>
            </Link>
            <a
              href={etsyBaseUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#73a89a] transition-colors flex items-center gap-1"
            >
              <span>Etsy Shop</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
