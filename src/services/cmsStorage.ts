import { BlogPost, ReadingTopic, CMSSettings } from '../types';
import { INITIAL_BLOG_POSTS } from '../data/blogData';
import { READINGS_DATA } from '../data/readingsData';

const STORAGE_KEYS = {
  BLOG_POSTS: 'tarot_company_blog_posts_v1',
  READINGS: 'tarot_company_readings_v1',
  AUTH: 'tarot_company_admin_auth_v1',
  SETTINGS: 'tarot_company_cms_settings_v1'
};

export const CMS_UPDATE_EVENT = 'tarot_cms_data_updated';

function triggerUpdate() {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent(CMS_UPDATE_EVENT));
  }
}

// ==========================================
// BLOG POSTS STORAGE
// ==========================================
export function getBlogPosts(): BlogPost[] {
  if (typeof window === 'undefined') return INITIAL_BLOG_POSTS;
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.BLOG_POSTS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.BLOG_POSTS, JSON.stringify(INITIAL_BLOG_POSTS));
      return INITIAL_BLOG_POSTS;
    }
    return JSON.parse(raw);
  } catch (err) {
    console.error('Failed reading blog posts from storage', err);
    return INITIAL_BLOG_POSTS;
  }
}

export function getBlogPostById(id: string): BlogPost | undefined {
  const posts = getBlogPosts();
  return posts.find((p) => p.id === id || p.slug === id);
}

export function saveBlogPost(post: BlogPost): void {
  const posts = getBlogPosts();
  const existingIndex = posts.findIndex((p) => p.id === post.id);

  let updated: BlogPost[];
  if (existingIndex >= 0) {
    updated = [...posts];
    updated[existingIndex] = { ...post };
  } else {
    // New post at the top
    updated = [{ ...post }, ...posts];
  }

  try {
    localStorage.setItem(STORAGE_KEYS.BLOG_POSTS, JSON.stringify(updated));
    triggerUpdate();
  } catch (err) {
    console.error('Error saving blog post', err);
  }
}

export function deleteBlogPost(id: string): void {
  const posts = getBlogPosts();
  const filtered = posts.filter((p) => p.id !== id);
  try {
    localStorage.setItem(STORAGE_KEYS.BLOG_POSTS, JSON.stringify(filtered));
    triggerUpdate();
  } catch (err) {
    console.error('Error deleting blog post', err);
  }
}

export function resetBlogPosts(): void {
  try {
    localStorage.setItem(STORAGE_KEYS.BLOG_POSTS, JSON.stringify(INITIAL_BLOG_POSTS));
    triggerUpdate();
  } catch (err) {
    console.error('Error resetting blog posts', err);
  }
}

// ==========================================
// READINGS STORAGE
// ==========================================
export function getReadings(): ReadingTopic[] {
  if (typeof window === 'undefined') return READINGS_DATA;
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.READINGS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.READINGS, JSON.stringify(READINGS_DATA));
      return READINGS_DATA;
    }
    return JSON.parse(raw);
  } catch (err) {
    console.error('Failed reading readings from storage', err);
    return READINGS_DATA;
  }
}

export function saveReading(reading: ReadingTopic): void {
  const readings = getReadings();
  const index = readings.findIndex((r) => r.id === reading.id);
  let updated: ReadingTopic[];
  if (index >= 0) {
    updated = [...readings];
    updated[index] = { ...reading };
  } else {
    updated = [{ ...reading }, ...readings];
  }

  try {
    localStorage.setItem(STORAGE_KEYS.READINGS, JSON.stringify(updated));
    triggerUpdate();
  } catch (err) {
    console.error('Error saving reading topic', err);
  }
}

export function deleteReading(id: string): void {
  const readings = getReadings();
  const filtered = readings.filter((r) => r.id !== id);
  try {
    localStorage.setItem(STORAGE_KEYS.READINGS, JSON.stringify(filtered));
    triggerUpdate();
  } catch (err) {
    console.error('Error deleting reading', err);
  }
}

export function resetReadings(): void {
  try {
    localStorage.setItem(STORAGE_KEYS.READINGS, JSON.stringify(READINGS_DATA));
    triggerUpdate();
  } catch (err) {
    console.error('Error resetting readings', err);
  }
}

// ==========================================
// CMS SETTINGS STORAGE
// ==========================================
const DEFAULT_SETTINGS: CMSSettings = {
  etsyBaseUrl: 'https://www.etsy.com/shop/PsychicEra',
  whatsappNumber: '+1 (555) 728-3722',
  siteAnnouncement: '✨ Autumn Equinox Flash Offer: 70% OFF all 360 Future Dossiers & Spicy Tarot Readings.',
  contactEmail: 'sanctuary@thetarotcompany.com',
  showAnnouncement: true
};

export function getCMSSettings(): CMSSettings {
  if (typeof window === 'undefined') return DEFAULT_SETTINGS;
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.SETTINGS);
    if (!raw) return DEFAULT_SETTINGS;
    return { ...DEFAULT_SETTINGS, ...JSON.parse(raw) };
  } catch {
    return DEFAULT_SETTINGS;
  }
}

export function saveCMSSettings(settings: CMSSettings): void {
  try {
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
    triggerUpdate();
  } catch (err) {
    console.error('Error saving CMS settings', err);
  }
}

// ==========================================
// ADMIN AUTHENTICATION
// ==========================================
const ADMIN_VALID_PASSWORDS = ['tarotadmin', 'admin123', 'admin', 'thetarotcompany2026'];

export function isAdminAuthenticated(): boolean {
  if (typeof window === 'undefined') return false;
  return localStorage.getItem(STORAGE_KEYS.AUTH) === 'true';
}

export function loginAdmin(password: string): boolean {
  if (ADMIN_VALID_PASSWORDS.includes(password.trim())) {
    localStorage.setItem(STORAGE_KEYS.AUTH, 'true');
    return true;
  }
  return false;
}

export function logoutAdmin(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(STORAGE_KEYS.AUTH);
  }
}
