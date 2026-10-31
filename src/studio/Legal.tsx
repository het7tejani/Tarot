import React from 'react';
import { Link } from 'react-router-dom';
import { Layout } from './Layout';
import { SEOHead } from '../components/SEOHead';

const EMAIL = 'contact.thepsychicstudio@gmail.com';

const LegalPage: React.FC<{ eyebrow: string; title: string; description: string; children: React.ReactNode }> = ({ eyebrow, title, description, children }) => (
  <Layout seo={false}>
    <SEOHead title={`${title} | The Psychic Studio`} description={description} canonicalUrl={`https://thepsychicstudio.com/${eyebrow === 'PRIVACY' ? 'privacy-policy' : eyebrow === 'TERMS' ? 'terms' : 'cookie-policy'}`} />
    <div className="st-page"><div className="wrap" style={{ maxWidth: 780 }}>
      <span className="eyebrow">{eyebrow}</span><h1>{title}</h1>
      <div className="st-prose">{children}</div>
      <p style={{ marginTop: 26, fontSize: 13, opacity: .7 }}>Last updated: 31 October 2026. Questions? Write to <a href={`mailto:${EMAIL}`}>{EMAIL}</a>.</p>
    </div></div>
  </Layout>
);

export const PrivacyPolicy: React.FC = () => (
  <LegalPage eyebrow="PRIVACY" title="Privacy Policy" description="What The Psychic Studio collects, why, and how to ask us to delete it. Plain language, no fine print.">
    <p>The Psychic Studio is an online tarot and psychic reading studio run from India. The Psychic Studio is our business name, and the way to reach us is contact.thepsychicstudio@gmail.com. This page says what we collect when you use thepsychicstudio.com, what we do with it, and how to reach us about it. The short version: we collect only what a reading needs, we never sell your data, and you can ask us to delete everything at any time.</p>
    <h2>What we collect</h2>
    <p>When you send a reading inquiry or contact form, we receive your name, email address, your questions and, if you choose to share it, your date of birth. The form is delivered to our studio email through FormSubmit. When you join the free daily horoscope email, we store your email address and, if you give it, your zodiac sign. When you buy a reading, payment is handled outside this website; we never see or store your card number.</p>
    <h2>Analytics and cookies</h2>
    <p>With your consent, we use Google Analytics and Microsoft Clarity to understand which pages people read and where they get stuck. These tools set cookies only after you press Accept on the cookie banner. Press Reject and no analytics cookies are set. Details are in our <Link to="/cookie-policy">cookie policy</Link>.</p>
    <h2>How we use your information</h2>
    <p>We use your details to answer your message, prepare and deliver your reading, and send the horoscope email you asked for. That is the full list. We do not send marketing you did not ask for, and we do not sell or rent your information to anyone.</p>
    <h2>Who sees your information</h2>
    <p>Only the people and services needed to run the studio: our form service (FormSubmit), our email service, and, with consent, Google and Microsoft for analytics. Each processes data under its own privacy terms.</p>
    <h2>Your rights under India's DPDP Act</h2>
    <p>Under the Digital Personal Data Protection Act, 2023, you give consent when you submit a form, and you can withdraw it at any time. You can ask us what we hold about you, ask us to correct it, and ask us to erase it. For any of these, or for any grievance, email <a href={`mailto:${EMAIL}`}>{EMAIL}</a>. We answer within 7 days.</p>
    <h2>How long we keep it</h2>
    <p>Reading inquiries stay in our mailbox while we work with you and for a short while after, in case you follow up. Ask us to delete them and they go. Horoscope emails keep your address until you unsubscribe; every email has an unsubscribe link.</p>
    <h2>Children</h2>
    <p>Our readings are for adults. If you are under 18, please do not send us your details.</p>
  </LegalPage>
);

export const Terms: React.FC = () => (
  <LegalPage eyebrow="TERMS" title="Terms and Conditions" description="The plain terms for using thepsychicstudio.com and buying a digital reading from The Psychic Studio.">
    <p>These terms govern thepsychicstudio.com and the readings sold here. By using the site or ordering a reading, you accept them. They are short on purpose.</p>
    <h2>What we sell</h2>
    <p>The Psychic Studio sells digital tarot and psychic readings. You send an inquiry through the site, the studio confirms the details with you by email, and your reading is prepared for you and delivered to the contact details you give us. The site also offers free content: daily horoscopes, card meanings, a free tarot draw and the journal.</p>
    <h2>What a reading is, and is not</h2>
    <p>A reading is a reflective and entertainment service. It is not medical, psychological, legal or financial advice, and it never replaces a qualified professional. No reading can guarantee another person's feelings, a date, or any future outcome. If you face a health, legal or money emergency, contact a professional, not a tarot reader.</p>
    <h2>Who can order</h2>
    <p>You must be 18 or older to buy a reading.</p>
    <h2>Prices and payment</h2>
    <p>Prices are listed in US dollars on each reading page and confirmed before you pay. Payment is completed before your reading is prepared. We do not store your payment card details on this website.</p>
    <h2>Delivery</h2>
    <p>Your reading goes to the email address you give us. Check your spam folder if it has not arrived within 48 hours, then write to us at <a href={`mailto:${EMAIL}`}>{EMAIL}</a> and we will resend it. If you gave us a wrong email address, tell us and we will fix it.</p>
    <h2>Refunds</h2>
    <p>If your reading is not delivered within 48 hours of payment, you get a full refund. Because each reading is a digital service made for you, refunds are not available after delivery. Details are on the <Link to="/refund-policy">refund policy</Link> page. For any refund request, write to <a href={`mailto:${EMAIL}`}>{EMAIL}</a>.</p>
    <h2>Fair use</h2>
    <p>Do not misuse the site: no scraping, no attempts to break in, no sending us unlawful content. We can refuse service to anyone who abuses the site or the reader.</p>
    <h2>Our content</h2>
    <p>The text, artwork and design on this site belong to The Psychic Studio. You may read and share links freely; you may not copy the content for your own commercial use.</p>
    <h2>Liability</h2>
    <p>To the extent the law allows, our total liability for any claim about a reading is limited to the amount you paid for that reading.</p>
    <h2>Governing law</h2>
    <p>These terms are governed by the laws of India.</p>
  </LegalPage>
);

export const CookiePolicy: React.FC = () => (
  <LegalPage eyebrow="COOKIES" title="Cookie Policy" description="Which cookies thepsychicstudio.com sets, why, and how to say no.">
    <p>This site sets very few cookies, and the only tracking ones need your consent first.</p>
    <h2>What we set</h2>
    <p>When you press Accept on the cookie banner, Google Analytics and Microsoft Clarity set cookies that tell us which pages are read, how long people stay, and where they struggle. This helps us decide what to write and what to fix. When you press Reject, none of these cookies are set and the site works exactly the same.</p>
    <h2>What we do not set</h2>
    <p>No advertising cookies, no cross-site tracking pixels, no social media trackers. The banner itself stores your choice so we do not ask you on every visit.</p>
    <h2>Change your mind</h2>
    <p>Use the "Clarity cookie settings" button at the bottom of any page to change your choice at any time. You can also clear cookies in your browser settings, which resets the banner.</p>
    <h2>More</h2>
    <p>For what we do with the rest of your information, read the <Link to="/privacy-policy">privacy policy</Link>.</p>
  </LegalPage>
);

export const RefundPolicy: React.FC = () => (
  <LegalPage eyebrow="REFUNDS" title="Refund Policy" description="Refund terms for digital readings from The Psychic Studio: full refund if not delivered in 48 hours.">
    <p>Readings from The Psychic Studio are digital services, prepared by hand for each person. Our refund terms are short and firm.</p>
    <h2>Not delivered in 48 hours</h2>
    <p>If your reading has not reached you within 48 hours of payment, you get a full refund. Check your spam folder first; if it is not there, write to <a href={`mailto:${EMAIL}`}>{EMAIL}</a> and we will either deliver immediately or refund you, your choice.</p>
    <h2>After delivery</h2>
    <p>Once a reading is delivered, refunds are not available. The work is done for you alone and cannot be returned or resold. This is the standard position for digital services.</p>
    <h2>Wrong email address</h2>
    <p>If your reading went to a mistyped email address, that does not count as non-delivery. Write to us and we will resend it to the right address at no charge.</p>
    <h2>How to ask</h2>
    <p>Email <a href={`mailto:${EMAIL}`}>{EMAIL}</a> with the email address you ordered with and the date. Approved refunds go back through the original payment method within 7 working days.</p>
  </LegalPage>
);
