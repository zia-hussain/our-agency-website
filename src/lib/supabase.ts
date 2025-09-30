import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database Types
export interface Service {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  long_description: string;
  features: string[];
  technologies: string[];
  price: string;
  popular: boolean;
  image: string;
  methodology: string[];
  problems: string[];
  results: string[];
  created_at: string;
  updated_at: string;
}

export interface Project {
  id: number;
  slug: string;
  title: string;
  category: string;
  type: string;
  description: string;
  long_description: string;
  image: string;
  gallery: string[];
  tags: string[];
  client_name: string;
  client_country: string;
  client_industry: string;
  duration: string;
  team: string;
  year: string;
  featured: boolean;
  results: string[];
  problem: string;
  solution: string;
  testimonial_quote?: string;
  testimonial_author?: string;
  testimonial_role?: string;
  live_link?: string;
  github_link?: string;
  stack: string[];
  services: string[];
  created_at: string;
  updated_at: string;
}

export interface Article {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  author: string;
  author_role: string;
  author_image: string;
  published_at: string;
  read_time: string;
  tags: string[];
  category: string;
  featured: boolean;
  seo_title: string;
  seo_description: string;
  seo_keywords: string;
  created_at: string;
  updated_at: string;
}

export interface Testimonial {
  id: number;
  quote: string;
  author: string;
  role: string;
  company: string;
  country: string;
  project: string;
  avatar: string;
  rating: number;
  results: string;
  industry: string;
  featured: boolean;
  created_at: string;
  updated_at: string;
}

export interface Founder {
  id: number;
  name: string;
  full_name: string;
  role: string;
  bio: string;
  image: string;
  skills: string[];
  achievements: string;
  credibility: string[];
  expertise: string[];
  linkedin: string;
  github?: string;
  calendly: string;
  order_index: number;
  active: boolean;
  created_at: string;
  updated_at: string;
}

export interface SiteSettings {
  id: number;
  company_name: string;
  tagline: string;
  email: string;
  phone: string;
  address: string;
  website: string;
  social_linkedin: string;
  social_github: string;
  social_twitter: string;
  social_instagram: string;
  ga_tag_id: string;
  google_verification: string;
  calendly_url: string;
  updated_at: string;
}