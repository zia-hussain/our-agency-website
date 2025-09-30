/*
  # Complete CMS Database Schema

  1. New Tables
    - `page_content` - Stores all page sections as JSON blocks
    - `navigation_links` - Manages navbar and footer links
    - `faqs` - Page-specific FAQ management
    - `media_assets` - Track uploaded images/files
    - `activity_logs` - Track all CMS changes for dashboard

  2. Enhanced Tables
    - Expand existing tables with missing fields
    - Add proper indexes for performance

  3. Security
    - Enable RLS on all tables
    - Add policies for authenticated admin users
*/

-- Page Content Management (Hero, Features, etc.)
CREATE TABLE IF NOT EXISTS page_content (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  page_slug text NOT NULL, -- 'home', 'about', 'services', etc.
  section_key text NOT NULL, -- 'hero', 'features', 'testimonials', etc.
  section_data jsonb NOT NULL DEFAULT '{}', -- All section content as JSON
  section_order integer DEFAULT 0,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Navigation Links Management
CREATE TABLE IF NOT EXISTS navigation_links (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  label text NOT NULL,
  href text NOT NULL,
  link_type text NOT NULL DEFAULT 'main', -- 'main', 'footer-company', 'footer-services'
  is_external boolean DEFAULT false,
  order_index integer DEFAULT 0,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- FAQ Management
CREATE TABLE IF NOT EXISTS faqs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  page_slug text NOT NULL, -- 'home', 'about', 'services', etc.
  question text NOT NULL,
  answer text NOT NULL,
  order_index integer DEFAULT 0,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Media Assets Tracking
CREATE TABLE IF NOT EXISTS media_assets (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  filename text NOT NULL,
  cloudinary_url text NOT NULL,
  cloudinary_public_id text NOT NULL,
  file_type text NOT NULL, -- 'image', 'video', 'document'
  file_size integer,
  used_in_pages text[] DEFAULT '{}', -- Track where asset is used
  created_at timestamptz DEFAULT now()
);

-- Activity Logs for Dashboard
CREATE TABLE IF NOT EXISTS activity_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  action_type text NOT NULL, -- 'create', 'update', 'delete'
  table_name text NOT NULL,
  record_id text NOT NULL,
  record_title text,
  user_email text,
  changes jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now()
);

-- Expand site_settings for complete homepage control
DO $$
BEGIN
  -- Add homepage sections to site_settings
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'site_settings' AND column_name = 'hero_headline') THEN
    ALTER TABLE site_settings ADD COLUMN hero_headline text DEFAULT 'Transform Your Vision Into World-Class Software That Scales Globally';
    ALTER TABLE site_settings ADD COLUMN hero_subtext text DEFAULT 'Zumetrix Labs is the world''s premier software development agency...';
    ALTER TABLE site_settings ADD COLUMN hero_primary_cta_text text DEFAULT 'Start Your Project';
    ALTER TABLE site_settings ADD COLUMN hero_primary_cta_link text DEFAULT '/contact';
    ALTER TABLE site_settings ADD COLUMN hero_secondary_cta_text text DEFAULT 'View Our Work';
    ALTER TABLE site_settings ADD COLUMN hero_secondary_cta_link text DEFAULT '/portfolio';
    ALTER TABLE site_settings ADD COLUMN trust_band_title text DEFAULT 'Trusted by Leading Global Companies';
    ALTER TABLE site_settings ADD COLUMN trust_band_subtitle text DEFAULT 'From Silicon Valley startups to London enterprises';
    ALTER TABLE site_settings ADD COLUMN services_preview_title text DEFAULT 'Enterprise-Grade Software Development Services';
    ALTER TABLE site_settings ADD COLUMN services_preview_subtitle text DEFAULT 'From SaaS MVPs to AI automation';
    ALTER TABLE site_settings ADD COLUMN final_cta_headline text DEFAULT 'Ready to Transform Your Business Vision Into Reality?';
    ALTER TABLE site_settings ADD COLUMN final_cta_subtitle text DEFAULT 'Join 50+ successful international clients';
  END IF;
END $$;

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_page_content_page_slug ON page_content(page_slug);
CREATE INDEX IF NOT EXISTS idx_page_content_section_key ON page_content(section_key);
CREATE INDEX IF NOT EXISTS idx_navigation_links_type ON navigation_links(link_type);
CREATE INDEX IF NOT EXISTS idx_faqs_page_slug ON faqs(page_slug);
CREATE INDEX IF NOT EXISTS idx_activity_logs_created_at ON activity_logs(created_at DESC);

-- Enable RLS
ALTER TABLE page_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE navigation_links ENABLE ROW LEVEL SECURITY;
ALTER TABLE faqs ENABLE ROW LEVEL SECURITY;
ALTER TABLE media_assets ENABLE ROW LEVEL SECURITY;
ALTER TABLE activity_logs ENABLE ROW LEVEL SECURITY;

-- RLS Policies for authenticated admin users
CREATE POLICY "Admin can manage page content"
  ON page_content
  FOR ALL
  TO authenticated
  USING (true);

CREATE POLICY "Admin can manage navigation"
  ON navigation_links
  FOR ALL
  TO authenticated
  USING (true);

CREATE POLICY "Admin can manage FAQs"
  ON faqs
  FOR ALL
  TO authenticated
  USING (true);

CREATE POLICY "Admin can manage media"
  ON media_assets
  FOR ALL
  TO authenticated
  USING (true);

CREATE POLICY "Admin can view activity logs"
  ON activity_logs
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "System can create activity logs"
  ON activity_logs
  FOR INSERT
  TO authenticated
  USING (true);