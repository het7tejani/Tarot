import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, ShieldCheck, CheckCircle2, Send, ExternalLink, MessageCircle } from 'lucide-react';

interface ContactPageProps {
  etsyBaseUrl: string;
}

export const ContactPage: React.FC<ContactPageProps> = ({ etsyBaseUrl }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    serviceInterest: 'tarot',
    sessionType: 'online',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="pt-32 pb-24 bg-[#FAF8F5] min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FDF6EC] border border-[#E8D5A0] text-[#7C5F1E] text-xs font-semibold uppercase tracking-widest mb-3">
            <span>Connect &amp; Consultation Booking</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-serif font-bold text-[#2A1B3D] mb-4">
            Contact &amp; Book a Session
          </h1>
          <p className="text-base sm:text-lg text-[#554763] font-serif italic leading-relaxed">
            Appointments available in-person at our Mohali / Chandigarh center and online via secure video or phone call worldwide.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Direct Channels */}
          <div className="lg:col-span-5 space-y-8">
            {/* WhatsApp Priority Section */}
            <div className="space-y-4">
              <div className="w-10 h-10 rounded-full bg-[#FDF6EC] flex items-center justify-center text-[#2A1B3D]">
                <MessageCircle className="w-5 h-5 text-[#C9A84C]" />
              </div>
              <h2 className="text-2xl font-serif font-bold text-[#2A1B3D]">
                Instant WhatsApp Booking
              </h2>
              <p className="text-sm text-[#5B4C66] leading-relaxed">
                For the swiftest response on session availability, course admissions, or personalized tarot questions, message our team on WhatsApp directly.
              </p>

              <a
                href="https://wa.me/919872771591?text=Hi%20The%20Tarot%20Company%2C%20I%20would%20like%20to%20book%20a%20consultation%20session."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex py-3 px-6 rounded-full bg-[#2A1B3D] hover:bg-[#3D2756] text-[#FFFFFF] text-xs font-semibold tracking-wide items-center justify-center gap-2 transition-colors"
              >
                <span>Chat via WhatsApp (+91 9872771591)</span>
                <ExternalLink className="w-3.5 h-3.5 text-[#C9A84C]" />
              </a>
            </div>

            {/* Address & Clinic Info */}
            <div className="pt-6 border-t border-[#E8DDCF]/80 space-y-5 text-xs sm:text-sm text-[#4C3E56]">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#C9A84C] shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-bold text-[#2A1B3D]">Center Location</h3>
                  <p className="text-[#6B5A77] mt-0.5">
                    #8062, Buddha Marg, Sector 125, Greater Mohali, Chandigarh Tricity (Punjab, 140301, India)
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 pt-3 border-t border-[#F5EFE6]">
                <Phone className="w-5 h-5 text-[#C9A84C] shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-bold text-[#2A1B3D]">Direct Helpline</h3>
                  <p className="text-[#6B5A77] mt-0.5">+91 9872771591</p>
                </div>
              </div>

              <div className="flex items-start gap-3 pt-3 border-t border-[#F5EFE6]">
                <Mail className="w-5 h-5 text-[#C9A84C] shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-bold text-[#2A1B3D]">Email Support</h3>
                  <p className="text-[#6B5A77] mt-0.5">contact@thetarotcompany.com</p>
                </div>
              </div>

              <div className="flex items-start gap-3 pt-3 border-t border-[#F5EFE6]">
                <Clock className="w-5 h-5 text-[#C9A84C] shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-bold text-[#2A1B3D]">Consultation Hours</h3>
                  <p className="text-[#6B5A77] mt-0.5">Monday to Saturday: 10:00 AM – 7:00 PM IST</p>
                  <p className="text-[11px] text-[#8F7E9B]">Sunday by pre-scheduled appointment only</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact & Consultation Request Form */}
          <div className="lg:col-span-7">
            <h2 className="text-2xl font-serif font-bold text-[#2A1B3D] mb-2">
              Send an Appointment Request
            </h2>
            <p className="text-sm text-[#6A5A77] mb-6">
              Complete the intake form and our coordinator will confirm your preferred timing and details.
            </p>

            {submitted ? (
              <div className="py-8 text-center space-y-3 border-t border-[#E8DDCF]">
                <CheckCircle2 className="w-10 h-10 text-[#C9A84C] mx-auto" />
                <h3 className="text-xl font-serif font-bold text-[#2A1B3D]">
                  Request Received with Gratitude
                </h3>
                <p className="text-sm text-[#5C4C66] leading-relaxed max-w-md mx-auto">
                  Thank you for reaching out to The Tarot Company. We will review your inquiry and connect via email or WhatsApp within 12 business hours.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ name: '', email: '', phone: '', serviceInterest: 'tarot', sessionType: 'online', message: '' });
                  }}
                  className="mt-3 text-xs text-[#7C5F1E] underline hover:text-[#2A1B3D] cursor-pointer"
                >
                  Send another inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#685573] mb-1.5">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Elena Sharma"
                      className="w-full px-4 py-3 rounded-full bg-[#FAF8F5] border border-[#D9CDBF] text-sm text-[#2D2D2D] focus:outline-none focus:border-[#C9A84C]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#685573] mb-1.5">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="elena@example.com"
                      className="w-full px-4 py-3 rounded-full bg-[#FAF8F5] border border-[#D9CDBF] text-sm text-[#2D2D2D] focus:outline-none focus:border-[#C9A84C]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#685573] mb-1.5">
                      Phone / WhatsApp Number
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91 98727 71591"
                      className="w-full px-4 py-3 rounded-full bg-[#FAF8F5] border border-[#D9CDBF] text-sm text-[#2D2D2D] focus:outline-none focus:border-[#C9A84C]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#685573] mb-1.5">
                      Format Preferred
                    </label>
                    <select
                      value={formData.sessionType}
                      onChange={(e) => setFormData({ ...formData, sessionType: e.target.value })}
                      className="w-full px-4 py-3 rounded-full bg-[#FAF8F5] border border-[#D9CDBF] text-sm text-[#2D2D2D] focus:outline-none focus:border-[#C9A84C]"
                    >
                      <option value="online">Online Video / Voice Call (Worldwide)</option>
                      <option value="in-person">In-Person (Mohali / Chandigarh Center)</option>
                      <option value="written">Written PDF Report &amp; Altar Photo</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#685573] mb-1.5">
                    Modality or Area of Life
                  </label>
                  <select
                    value={formData.serviceInterest}
                    onChange={(e) => setFormData({ ...formData, serviceInterest: e.target.value })}
                    className="w-full px-4 py-3 rounded-full bg-[#FAF8F5] border border-[#D9CDBF] text-sm text-[#2D2D2D] focus:outline-none focus:border-[#C9A84C]"
                  >
                    <option value="tarot">Tarot &amp; Oracle Consultation</option>
                    <option value="reiki">Reiki &amp; Chakra Biofield Healing</option>
                    <option value="inner-child">Inner Child Healing / Regression</option>
                    <option value="cord-cutting">Emotional Cord Cutting</option>
                    <option value="coaching">Heal to Empower™ Mentorship</option>
                    <option value="courses">Course / Certification Enrollment</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#685573] mb-1.5">
                    Brief Background or Questions
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us what situation you are seeking insight or healing for..."
                    className="w-full px-4 py-3 rounded-2xl bg-[#FAF8F5] border border-[#D9CDBF] text-sm text-[#2D2D2D] focus:outline-none focus:border-[#C9A84C] resize-y"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 px-6 rounded-full bg-[#2A1B3D] hover:bg-[#3D2756] text-[#FFFFFF] text-xs font-semibold tracking-wide uppercase transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5 text-[#C9A84C]" />
                  <span>Submit Appointment Request</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
