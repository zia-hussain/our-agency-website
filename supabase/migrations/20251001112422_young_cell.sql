/*
  # Hybrid CMS Schema - SEO-Safe Implementation
  
  1. New Tables
    - `articles` - Blog posts with full SEO fields and Cloudinary images
    - `portfolio_projects` - Case studies with SEO optimization
    - `testimonials` - Client testimonials with avatars
    - `content_migrations` - Track migration status
  
  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users only
    - Public read access for published content
  
  3. SEO Features
    - Complete meta fields for each content type
    - Slug management with uniqueness
    - Publish/draft control
    - Schema.org structured data support
*/

-- Create articles table with full SEO fields
CREATE TABLE IF NOT EXISTS public.articles (
  id uuid DEFAULT gen_random_uuid() NOT NULL,
  slug text UNIQUE NOT NULL,
  title text NOT NULL,
  excerpt text NOT NULL,
  content text NOT NULL, -- Rich HTML content
  featured_image text, -- Cloudinary URL
  author text NOT NULL,
  author_role text,
  author_image text, -- Cloudinary URL
  published_at timestamp with time zone,
  read_time text,
  tags text[] DEFAULT '{}',
  category text NOT NULL,
  featured boolean DEFAULT false,
  is_published boolean DEFAULT false,
  view_count integer DEFAULT 0,
  
  -- SEO Fields
  seo_title text,
  seo_description text,
  seo_keywords text,
  og_title text,
  og_description text,
  og_image text, -- Cloudinary URL
  twitter_title text,
  twitter_description text,
  twitter_image text, -- Cloudinary URL
  canonical_url text,
  
  -- Timestamps
  created_at timestamp with time zone DEFAULT now() NOT NULL,
  updated_at timestamp with time zone DEFAULT now() NOT NULL,
  
  PRIMARY KEY (id)
);

-- Create portfolio_projects table with full SEO fields
CREATE TABLE IF NOT EXISTS public.portfolio_projects (
  id uuid DEFAULT gen_random_uuid() NOT NULL,
  slug text UNIQUE NOT NULL,
  title text NOT NULL,
  category text NOT NULL,
  type text NOT NULL, -- 'saas', 'mobile', 'enterprise', 'mvp'
  description text NOT NULL,
  long_description text,
  featured_image text, -- Cloudinary URL
  gallery text[] DEFAULT '{}', -- Array of Cloudinary URLs
  tags text[] DEFAULT '{}',
  
  -- Client Information
  client_name text NOT NULL,
  client_country text NOT NULL,
  client_industry text,
  
  -- Project Details
  duration text,
  team text,
  year text,
  featured boolean DEFAULT false,
  is_active boolean DEFAULT true,
  
  -- Results & Metrics
  results text[] DEFAULT '{}',
  problem text,
  solution text,
  kpis jsonb DEFAULT '[]', -- Array of {label, value, description}
  
  -- Testimonial
  testimonial_quote text,
  testimonial_author text,
  testimonial_role text,
  
  -- Links
  live_link text,
  github_link text,
  
  -- Technology Stack
  stack text[] DEFAULT '{}',
  services text[] DEFAULT '{}',
  
  -- SEO Fields
  seo_title text,
  seo_description text,
  seo_keywords text,
  og_title text,
  og_description text,
  og_image text, -- Cloudinary URL
  twitter_title text,
  twitter_description text,
  twitter_image text, -- Cloudinary URL
  canonical_url text,
  
  -- Order & Status
  order_index integer DEFAULT 0,
  
  -- Timestamps
  created_at timestamp with time zone DEFAULT now() NOT NULL,
  updated_at timestamp with time zone DEFAULT now() NOT NULL,
  
  PRIMARY KEY (id)
);

-- Create testimonials table
CREATE TABLE IF NOT EXISTS public.testimonials (
  id uuid DEFAULT gen_random_uuid() NOT NULL,
  quote text NOT NULL,
  author text NOT NULL,
  role text NOT NULL,
  company text NOT NULL,
  country text NOT NULL,
  project text,
  avatar text, -- Cloudinary URL
  rating integer DEFAULT 5 CHECK (rating >= 1 AND rating <= 5),
  results text, -- e.g., "300% user engagement increase"
  industry text,
  featured boolean DEFAULT false,
  is_active boolean DEFAULT true,
  order_index integer DEFAULT 0,
  
  -- Timestamps
  created_at timestamp with time zone DEFAULT now() NOT NULL,
  updated_at timestamp with time zone DEFAULT now() NOT NULL,
  
  PRIMARY KEY (id)
);

-- Create content_migrations table to track migration status
CREATE TABLE IF NOT EXISTS public.content_migrations (
  id uuid DEFAULT gen_random_uuid() NOT NULL,
  migration_name text UNIQUE NOT NULL,
  status text DEFAULT 'pending', -- 'pending', 'completed', 'failed'
  migrated_count integer DEFAULT 0,
  total_count integer DEFAULT 0,
  error_message text,
  migrated_at timestamp with time zone,
  created_at timestamp with time zone DEFAULT now() NOT NULL,
  
  PRIMARY KEY (id)
);

-- Enable RLS on all tables
ALTER TABLE public.articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.portfolio_projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.content_migrations ENABLE ROW LEVEL SECURITY;

-- RLS Policies for articles
CREATE POLICY "Enable read access for published articles" ON public.articles 
  FOR SELECT USING (is_published = true OR auth.role() = 'authenticated');

CREATE POLICY "Enable insert for authenticated users" ON public.articles 
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Enable update for authenticated users" ON public.articles 
  FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Enable delete for authenticated users" ON public.articles 
  FOR DELETE USING (auth.role() = 'authenticated');

-- RLS Policies for portfolio_projects
CREATE POLICY "Enable read access for active projects" ON public.portfolio_projects 
  FOR SELECT USING (is_active = true OR auth.role() = 'authenticated');

CREATE POLICY "Enable insert for authenticated users" ON public.portfolio_projects 
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Enable update for authenticated users" ON public.portfolio_projects 
  FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Enable delete for authenticated users" ON public.portfolio_projects 
  FOR DELETE USING (auth.role() = 'authenticated');

-- RLS Policies for testimonials
CREATE POLICY "Enable read access for active testimonials" ON public.testimonials 
  FOR SELECT USING (is_active = true OR auth.role() = 'authenticated');

CREATE POLICY "Enable insert for authenticated users" ON public.testimonials 
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Enable update for authenticated users" ON public.testimonials 
  FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Enable delete for authenticated users" ON public.testimonials 
  FOR DELETE USING (auth.role() = 'authenticated');

-- RLS Policies for content_migrations (admin only)
CREATE POLICY "Enable read access for authenticated users" ON public.content_migrations 
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Enable insert for authenticated users" ON public.content_migrations 
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Enable update for authenticated users" ON public.content_migrations 
  FOR UPDATE USING (auth.role() = 'authenticated');

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_articles_slug ON public.articles(slug);
CREATE INDEX IF NOT EXISTS idx_articles_published ON public.articles(is_published, published_at DESC);
CREATE INDEX IF NOT EXISTS idx_articles_category ON public.articles(category);
CREATE INDEX IF NOT EXISTS idx_articles_featured ON public.articles(featured);

CREATE INDEX IF NOT EXISTS idx_portfolio_slug ON public.portfolio_projects(slug);
CREATE INDEX IF NOT EXISTS idx_portfolio_featured ON public.portfolio_projects(featured);
CREATE INDEX IF NOT EXISTS idx_portfolio_category ON public.portfolio_projects(category);
CREATE INDEX IF NOT EXISTS idx_portfolio_active ON public.portfolio_projects(is_active);

CREATE INDEX IF NOT EXISTS idx_testimonials_featured ON public.testimonials(featured);
CREATE INDEX IF NOT EXISTS idx_testimonials_active ON public.testimonials(is_active);
CREATE INDEX IF NOT EXISTS idx_testimonials_order ON public.testimonials(order_index);

-- Insert initial migration tracking record
INSERT INTO public.content_migrations (migration_name, status, total_count)
VALUES ('initial_schema_setup', 'completed', 0)
ON CONFLICT (migration_name) DO NOTHING;