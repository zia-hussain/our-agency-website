import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder-anon-key';

// Only create client if we have real Supabase credentials
const hasValidCredentials = supabaseUrl !== 'https://placeholder.supabase.co' && 
                           supabaseAnonKey !== 'placeholder-anon-key' &&
                           supabaseUrl && supabaseAnonKey;

export const supabase = hasValidCredentials ? 
  createClient(supabaseUrl, supabaseAnonKey) : 
  null;

export const isSupabaseConfigured = hasValidCredentials;

// Complete Database Types for Beast Mode CMS
export interface Service {
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  description: string;
  long_description?: string;
  features: string[];
  technologies: string[];
  price?: string;
  popular: boolean;
  image?: string;
  methodology: string[];
  problems: string[];
  results: string[];
  related_projects: string[];
  seo_title?: string;
  seo_description?: string;
  seo_keywords?: string;
  is_active: boolean;
  order_index: number;
  created_at: string;
  updated_at: string;
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  category: string;
  type: string;
  description: string;
  long_description?: string;
  image?: string;
  gallery: string[];
  tags: string[];
  client_name: string;
  client_country: string;
  client_industry?: string;
  duration?: string;
  team?: string;
  year?: string;
  featured: boolean;
  results: string[];
  problem?: string;
  solution?: string;
  testimonial_quote?: string;
  testimonial_author?: string;
  testimonial_role?: string;
  live_link?: string;
  github_link?: string;
  stack: string[];
  services: string[];
  kpis: Array<{
    label: string;
    value: string;
    description: string;
  }>;
  seo_title?: string;
  seo_description?: string;
  seo_keywords?: string;
  is_active: boolean;
  order_index: number;
  created_at: string;
  updated_at: string;
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  image?: string;
  author: string;
  author_role?: string;
  author_image?: string;
  published_at: string;
  read_time?: string;
  tags: string[];
  category: string;
  featured: boolean;
  seo_title?: string;
  seo_description?: string;
  seo_keywords?: string;
  is_published: boolean;
  view_count: number;
  created_at: string;
  updated_at: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  company: string;
  country: string;
  project?: string;
  avatar?: string;
  rating: number;
  results?: string;
  industry?: string;
  featured: boolean;
  is_active: boolean;
  order_index: number;
  created_at: string;
  updated_at: string;
}

export interface Founder {
  id: string;
  name: string;
  full_name?: string;
  role: string;
  bio?: string;
  image?: string;
  skills: string[];
  achievements?: string;
  credibility: string[];
  expertise: string[];
  linkedin?: string;
  github?: string;
  calendly?: string;
  order_index: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface PageSection {
  id: string;
  page_slug: string;
  section_key: string;
  section_title?: string;
  section_data: Record<string, any>;
  section_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface NavigationItem {
  id: string;
  label: string;
  href: string;
  type: string;
  is_external: boolean;
  icon?: string;
  order_index: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface FAQ {
  id: string;
  page_slug: string;
  question: string;
  answer: string;
  order_index: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface MediaUpload {
  id: string;
  filename: string;
  cloudinary_url: string;
  cloudinary_public_id: string;
  file_type?: string;
  file_size?: number;
  alt_text?: string;
  used_in_pages: string[];
  uploaded_by?: string;
  created_at: string;
}

export interface ActivityLog {
  id: string;
  action_type: string;
  table_name: string;
  record_id?: string;
  record_title?: string;
  user_email?: string;
  changes: Record<string, any>;
  ip_address?: string;
  user_agent?: string;
  created_at: string;
}

export interface SiteSettings {
  id: number;
  company_name?: string;
  tagline?: string;
  email?: string;
  phone?: string;
  address?: string;
  website?: string;
  social_linkedin?: string;
  social_github?: string;
  social_twitter?: string;
  social_instagram?: string;
  ga_tag_id?: string;
  google_verification?: string;
  calendly_url?: string;
  hero_headline?: string;
  hero_subtext?: string;
  hero_primary_cta_text?: string;
  hero_primary_cta_link?: string;
  hero_secondary_cta_text?: string;
  hero_secondary_cta_link?: string;
  trust_band_title?: string;
  trust_band_subtitle?: string;
  services_preview_title?: string;
  services_preview_subtitle?: string;
  final_cta_headline?: string;
  final_cta_subtitle?: string;
  updated_at: string;
}