/*
  # Hybrid CMS Schema - Articles, Portfolio & Testimonials Only
  
  1. New Tables
    - `articles` - Blog posts with full SEO fields
    - `portfolio_projects` - Case studies with client info and results
    - `testimonials` - Client feedback with ratings and avatars
    - `media_assets` - Cloudinary image management
    - `activity_logs` - Admin activity tracking
    - `content_migrations` - Migration status tracking
  
  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users only
    - Secure admin-only access
  
  3. SEO Features
    - Complete meta fields for all content types
    - Slug management with uniqueness
    - Publish/draft control
    - Featured content flags
*/

-- Articles table with full SEO fields
CREATE TABLE IF NOT EXISTS articles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE NOT NULL,
  title text NOT NULL,
  excerpt text NOT NULL,
  content text NOT NULL,
  featured_image text,
  author text NOT NULL,
  author_role text,
  author_image text,
  published_at timestamptz,
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
  og_image text,
  twitter_title text,
  twitter_description text,
  twitter_image text,
  canonical_url text,
  
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Portfolio projects with comprehensive fields
CREATE TABLE IF NOT EXISTS portfolio_projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE NOT NULL,
  title text NOT NULL,
  category text NOT NULL,
  type text NOT NULL,
  description text NOT NULL,
  long_description text,
  featured_image text,
  gallery text[] DEFAULT '{}',
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
  kpis jsonb DEFAULT '[]',
  
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
  og_image text,
  twitter_title text,
  twitter_description text,
  twitter_image text,
  canonical_url text,
  
  -- Order & Status
  order_index integer DEFAULT 0,
  
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Testimonials with rating and project info
CREATE TABLE IF NOT EXISTS testimonials (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  quote text NOT NULL,
  author text NOT NULL,
  role text NOT NULL,
  company text NOT NULL,
  country text NOT NULL,
  project text,
  avatar text,
  rating integer DEFAULT 5 CHECK (rating >= 1 AND rating <= 5),
  results text,
  industry text,
  featured boolean DEFAULT false,
  is_active boolean DEFAULT true,
  order_index integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Media assets for Cloudinary integration
CREATE TABLE IF NOT EXISTS media_assets (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  filename text NOT NULL,
  cloudinary_url text NOT NULL,
  cloudinary_public_id text NOT NULL,
  file_type text,
  file_size bigint,
  used_in_pages text[],
  created_at timestamptz DEFAULT now()
);

-- Activity logs for admin tracking
CREATE TABLE IF NOT EXISTS activity_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  action_type text NOT NULL,
  table_name text NOT NULL,
  record_id text,
  record_title text,
  user_email text,
  changes jsonb,
  created_at timestamptz DEFAULT now()
);

-- Content migrations tracking
CREATE TABLE IF NOT EXISTS content_migrations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  migration_name text UNIQUE NOT NULL,
  status text DEFAULT 'pending',
  migrated_count integer DEFAULT 0,
  total_count integer DEFAULT 0,
  error_message text,
  migrated_at timestamptz,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE portfolio_projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE media_assets ENABLE ROW LEVEL SECURITY;
ALTER TABLE activity_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE content_migrations ENABLE ROW LEVEL SECURITY;

-- RLS Policies for Articles
CREATE POLICY "Enable read access for published articles"
  ON articles
  FOR SELECT
  TO public
  USING (is_published = true OR role() = 'authenticated');

CREATE POLICY "Enable insert for authenticated users"
  ON articles
  FOR INSERT
  TO public
  WITH CHECK (role() = 'authenticated');

CREATE POLICY "Enable update for authenticated users"
  ON articles
  FOR UPDATE
  TO public
  USING (role() = 'authenticated');

CREATE POLICY "Enable delete for authenticated users"
  ON articles
  FOR DELETE
  TO public
  USING (role() = 'authenticated');

-- RLS Policies for Portfolio Projects
CREATE POLICY "Enable read access for active projects"
  ON portfolio_projects
  FOR SELECT
  TO public
  USING (is_active = true OR role() = 'authenticated');

CREATE POLICY "Enable insert for authenticated users"
  ON portfolio_projects
  FOR INSERT
  TO public
  WITH CHECK (role() = 'authenticated');

CREATE POLICY "Enable update for authenticated users"
  ON portfolio_projects
  FOR UPDATE
  TO public
  USING (role() = 'authenticated');

CREATE POLICY "Enable delete for authenticated users"
  ON portfolio_projects
  FOR DELETE
  TO public
  USING (role() = 'authenticated');

-- RLS Policies for Testimonials
CREATE POLICY "Enable read access for active testimonials"
  ON testimonials
  FOR SELECT
  TO public
  USING (is_active = true OR role() = 'authenticated');

CREATE POLICY "Enable insert for authenticated users"
  ON testimonials
  FOR INSERT
  TO public
  WITH CHECK (role() = 'authenticated');

CREATE POLICY "Enable update for authenticated users"
  ON testimonials
  FOR UPDATE
  TO public
  USING (role() = 'authenticated');

CREATE POLICY "Enable delete for authenticated users"
  ON testimonials
  FOR DELETE
  TO public
  USING (role() = 'authenticated');

-- RLS Policies for Media Assets
CREATE POLICY "Enable read access for all users"
  ON media_assets
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Enable insert for authenticated users"
  ON media_assets
  FOR INSERT
  TO public
  WITH CHECK (role() = 'authenticated');

CREATE POLICY "Enable update for authenticated users"
  ON media_assets
  FOR UPDATE
  TO public
  USING (role() = 'authenticated');

CREATE POLICY "Enable delete for authenticated users"
  ON media_assets
  FOR DELETE
  TO public
  USING (role() = 'authenticated');

-- RLS Policies for Activity Logs
CREATE POLICY "Enable read access for authenticated users"
  ON activity_logs
  FOR SELECT
  TO public
  USING (role() = 'authenticated');

CREATE POLICY "Enable insert for authenticated users"
  ON activity_logs
  FOR INSERT
  TO public
  WITH CHECK (role() = 'authenticated');

-- RLS Policies for Content Migrations
CREATE POLICY "Enable read access for authenticated users"
  ON content_migrations
  FOR SELECT
  TO public
  USING (role() = 'authenticated');

CREATE POLICY "Enable insert for authenticated users"
  ON content_migrations
  FOR INSERT
  TO public
  WITH CHECK (role() = 'authenticated');

CREATE POLICY "Enable update for authenticated users"
  ON content_migrations
  FOR UPDATE
  TO public
  USING (role() = 'authenticated');

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_articles_slug ON articles(slug);
CREATE INDEX IF NOT EXISTS idx_articles_published ON articles(is_published, published_at DESC);
CREATE INDEX IF NOT EXISTS idx_articles_category ON articles(category);
CREATE INDEX IF NOT EXISTS idx_articles_featured ON articles(featured);

CREATE INDEX IF NOT EXISTS idx_portfolio_slug ON portfolio_projects(slug);
CREATE INDEX IF NOT EXISTS idx_portfolio_active ON portfolio_projects(is_active);
CREATE INDEX IF NOT EXISTS idx_portfolio_category ON portfolio_projects(category);
CREATE INDEX IF NOT EXISTS idx_portfolio_featured ON portfolio_projects(featured);

CREATE INDEX IF NOT EXISTS idx_testimonials_active ON testimonials(is_active);
CREATE INDEX IF NOT EXISTS idx_testimonials_featured ON testimonials(featured);
CREATE INDEX IF NOT EXISTS idx_testimonials_order ON testimonials(order_index);