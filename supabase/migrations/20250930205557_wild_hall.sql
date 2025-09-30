/*
  # Complete CMS Database Schema
  
  1. New Tables
    - `services` - Complete service management with all fields
    - `projects` - Complete project portfolio with client info and results
    - `articles` - Blog/article management with SEO
    - `testimonials` - Client testimonials with ratings
    - `founders` - Founder profiles and social links
    - `page_sections` - Dynamic page content management
    - `navigation_items` - Navigation and footer link management
    - `faqs` - Page-specific FAQ management
    - `media_uploads` - Cloudinary asset management
    - `activity_logs` - Complete audit trail
    
  2. Enhanced Tables
    - Expand `site_settings` with all homepage content fields
    - Add proper indexes for performance
    
  3. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Create services table
CREATE TABLE IF NOT EXISTS public.services (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    slug text UNIQUE NOT NULL,
    title text NOT NULL,
    subtitle text,
    description text NOT NULL,
    long_description text,
    features text[] DEFAULT '{}',
    technologies text[] DEFAULT '{}',
    price text,
    popular boolean DEFAULT false,
    image text,
    methodology text[] DEFAULT '{}',
    problems text[] DEFAULT '{}',
    results text[] DEFAULT '{}',
    related_projects text[] DEFAULT '{}',
    seo_title text,
    seo_description text,
    seo_keywords text,
    is_active boolean DEFAULT true,
    order_index integer DEFAULT 0,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    PRIMARY KEY (id)
);

-- Create projects table
CREATE TABLE IF NOT EXISTS public.projects (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    slug text UNIQUE NOT NULL,
    title text NOT NULL,
    category text NOT NULL,
    type text NOT NULL,
    description text NOT NULL,
    long_description text,
    image text,
    gallery text[] DEFAULT '{}',
    tags text[] DEFAULT '{}',
    client_name text NOT NULL,
    client_country text NOT NULL,
    client_industry text,
    duration text,
    team text,
    year text,
    featured boolean DEFAULT false,
    results text[] DEFAULT '{}',
    problem text,
    solution text,
    testimonial_quote text,
    testimonial_author text,
    testimonial_role text,
    live_link text,
    github_link text,
    stack text[] DEFAULT '{}',
    services text[] DEFAULT '{}',
    kpis jsonb DEFAULT '[]',
    seo_title text,
    seo_description text,
    seo_keywords text,
    is_active boolean DEFAULT true,
    order_index integer DEFAULT 0,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    PRIMARY KEY (id)
);

-- Create articles table
CREATE TABLE IF NOT EXISTS public.articles (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    slug text UNIQUE NOT NULL,
    title text NOT NULL,
    excerpt text NOT NULL,
    content text NOT NULL,
    image text,
    author text NOT NULL,
    author_role text,
    author_image text,
    published_at timestamp with time zone DEFAULT now(),
    read_time text,
    tags text[] DEFAULT '{}',
    category text NOT NULL,
    featured boolean DEFAULT false,
    seo_title text,
    seo_description text,
    seo_keywords text,
    is_published boolean DEFAULT true,
    view_count integer DEFAULT 0,
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
    avatar text,
    rating integer DEFAULT 5 CHECK (rating >= 1 AND rating <= 5),
    results text,
    industry text,
    featured boolean DEFAULT false,
    is_active boolean DEFAULT true,
    order_index integer DEFAULT 0,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    PRIMARY KEY (id)
);

-- Create founders table
CREATE TABLE IF NOT EXISTS public.founders (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    name text NOT NULL,
    full_name text,
    role text NOT NULL,
    bio text,
    image text,
    skills text[] DEFAULT '{}',
    achievements text,
    credibility text[] DEFAULT '{}',
    expertise text[] DEFAULT '{}',
    linkedin text,
    github text,
    calendly text,
    order_index integer DEFAULT 0,
    is_active boolean DEFAULT true,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    PRIMARY KEY (id)
);

-- Create page_sections table for dynamic content
CREATE TABLE IF NOT EXISTS public.page_sections (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    page_slug text NOT NULL,
    section_key text NOT NULL,
    section_title text,
    section_data jsonb DEFAULT '{}' NOT NULL,
    section_order integer DEFAULT 0,
    is_active boolean DEFAULT true,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    PRIMARY KEY (id),
    UNIQUE(page_slug, section_key)
);

-- Create navigation_items table
CREATE TABLE IF NOT EXISTS public.navigation_items (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    label text NOT NULL,
    href text NOT NULL,
    type text NOT NULL, -- 'main', 'footer-company', 'footer-services', 'footer-legal'
    is_external boolean DEFAULT false,
    icon text,
    order_index integer DEFAULT 0,
    is_active boolean DEFAULT true,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    PRIMARY KEY (id)
);

-- Create faqs table
CREATE TABLE IF NOT EXISTS public.faqs (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    page_slug text NOT NULL,
    question text NOT NULL,
    answer text NOT NULL,
    order_index integer DEFAULT 0,
    is_active boolean DEFAULT true,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    PRIMARY KEY (id)
);

-- Create media_uploads table for Cloudinary
CREATE TABLE IF NOT EXISTS public.media_uploads (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    filename text NOT NULL,
    cloudinary_url text NOT NULL,
    cloudinary_public_id text NOT NULL,
    file_type text,
    file_size bigint,
    alt_text text,
    used_in_pages text[] DEFAULT '{}',
    uploaded_by text,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    PRIMARY KEY (id)
);

-- Enhanced activity_logs table
CREATE TABLE IF NOT EXISTS public.activity_logs (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    action_type text NOT NULL,
    table_name text NOT NULL,
    record_id text,
    record_title text,
    user_email text,
    changes jsonb DEFAULT '{}',
    ip_address text,
    user_agent text,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    PRIMARY KEY (id)
);

-- Add indexes for performance
CREATE INDEX IF NOT EXISTS idx_services_slug ON public.services(slug);
CREATE INDEX IF NOT EXISTS idx_services_popular ON public.services(popular);
CREATE INDEX IF NOT EXISTS idx_projects_slug ON public.projects(slug);
CREATE INDEX IF NOT EXISTS idx_projects_featured ON public.projects(featured);
CREATE INDEX IF NOT EXISTS idx_projects_type ON public.projects(type);
CREATE INDEX IF NOT EXISTS idx_articles_slug ON public.articles(slug);
CREATE INDEX IF NOT EXISTS idx_articles_featured ON public.articles(featured);
CREATE INDEX IF NOT EXISTS idx_articles_category ON public.articles(category);
CREATE INDEX IF NOT EXISTS idx_testimonials_featured ON public.testimonials(featured);
CREATE INDEX IF NOT EXISTS idx_page_sections_page_slug ON public.page_sections(page_slug);
CREATE INDEX IF NOT EXISTS idx_navigation_items_type ON public.navigation_items(type);
CREATE INDEX IF NOT EXISTS idx_faqs_page_slug ON public.faqs(page_slug);
CREATE INDEX IF NOT EXISTS idx_activity_logs_table_name ON public.activity_logs(table_name);

-- Enable RLS on all tables
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.founders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.page_sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.navigation_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.faqs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.media_uploads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.activity_logs ENABLE ROW LEVEL SECURITY;

-- RLS Policies for services
CREATE POLICY "Enable read access for all users" ON public.services FOR SELECT USING (true);
CREATE POLICY "Enable insert for authenticated users" ON public.services FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Enable update for authenticated users" ON public.services FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Enable delete for authenticated users" ON public.services FOR DELETE USING (auth.role() = 'authenticated');

-- RLS Policies for projects
CREATE POLICY "Enable read access for all users" ON public.projects FOR SELECT USING (true);
CREATE POLICY "Enable insert for authenticated users" ON public.projects FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Enable update for authenticated users" ON public.projects FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Enable delete for authenticated users" ON public.projects FOR DELETE USING (auth.role() = 'authenticated');

-- RLS Policies for articles
CREATE POLICY "Enable read access for all users" ON public.articles FOR SELECT USING (true);
CREATE POLICY "Enable insert for authenticated users" ON public.articles FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Enable update for authenticated users" ON public.articles FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Enable delete for authenticated users" ON public.articles FOR DELETE USING (auth.role() = 'authenticated');

-- RLS Policies for testimonials
CREATE POLICY "Enable read access for all users" ON public.testimonials FOR SELECT USING (true);
CREATE POLICY "Enable insert for authenticated users" ON public.testimonials FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Enable update for authenticated users" ON public.testimonials FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Enable delete for authenticated users" ON public.testimonials FOR DELETE USING (auth.role() = 'authenticated');

-- RLS Policies for founders
CREATE POLICY "Enable read access for all users" ON public.founders FOR SELECT USING (true);
CREATE POLICY "Enable insert for authenticated users" ON public.founders FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Enable update for authenticated users" ON public.founders FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Enable delete for authenticated users" ON public.founders FOR DELETE USING (auth.role() = 'authenticated');

-- RLS Policies for page_sections
CREATE POLICY "Enable read access for all users" ON public.page_sections FOR SELECT USING (true);
CREATE POLICY "Enable insert for authenticated users" ON public.page_sections FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Enable update for authenticated users" ON public.page_sections FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Enable delete for authenticated users" ON public.page_sections FOR DELETE USING (auth.role() = 'authenticated');

-- RLS Policies for navigation_items
CREATE POLICY "Enable read access for all users" ON public.navigation_items FOR SELECT USING (true);
CREATE POLICY "Enable insert for authenticated users" ON public.navigation_items FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Enable update for authenticated users" ON public.navigation_items FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Enable delete for authenticated users" ON public.navigation_items FOR DELETE USING (auth.role() = 'authenticated');

-- RLS Policies for faqs
CREATE POLICY "Enable read access for all users" ON public.faqs FOR SELECT USING (true);
CREATE POLICY "Enable insert for authenticated users" ON public.faqs FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Enable update for authenticated users" ON public.faqs FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Enable delete for authenticated users" ON public.faqs FOR DELETE USING (auth.role() = 'authenticated');

-- RLS Policies for media_uploads
CREATE POLICY "Enable read access for all users" ON public.media_uploads FOR SELECT USING (true);
CREATE POLICY "Enable insert for authenticated users" ON public.media_uploads FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Enable update for authenticated users" ON public.media_uploads FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Enable delete for authenticated users" ON public.media_uploads FOR DELETE USING (auth.role() = 'authenticated');

-- RLS Policies for activity_logs
CREATE POLICY "Enable read access for authenticated users" ON public.activity_logs FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Enable insert for authenticated users" ON public.activity_logs FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Insert default navigation items
INSERT INTO public.navigation_items (label, href, type, order_index) VALUES
('Home', '/', 'main', 1),
('About', '/about', 'main', 2),
('Services', '/services', 'main', 3),
('Portfolio', '/portfolio', 'main', 4),
('Articles', '/articles', 'main', 5),
('Contact', '/contact', 'main', 6)
ON CONFLICT DO NOTHING;

-- Insert default footer links
INSERT INTO public.navigation_items (label, href, type, order_index) VALUES
('About Us', '/about', 'footer-company', 1),
('Services', '/services', 'footer-company', 2),
('Portfolio', '/portfolio', 'footer-company', 3),
('Contact', '/contact', 'footer-company', 4),
('Articles', '/articles', 'footer-company', 5),
('Web Applications', '/services/enterprise-web-applications', 'footer-services', 1),
('SaaS MVP Development', '/services/saas-mvp-development', 'footer-services', 2),
('Mobile Apps', '/services/mobile-app-development', 'footer-services', 3),
('AI Automation', '/services/ai-automation-solutions', 'footer-services', 4),
('Privacy Policy', '/privacy-policy', 'footer-legal', 1),
('Terms of Service', '/terms-of-service', 'footer-legal', 2)
ON CONFLICT DO NOTHING;

-- Insert sample FAQs for home page
INSERT INTO public.faqs (page_slug, question, answer, order_index) VALUES
('home', 'What is Zumetrix Labs and what makes them the world''s leading software development agency?', 'Zumetrix Labs is the world''s premier software development agency founded by expert developers Zia Hussain (CEO) and Syed Omer Shah (CTO). We are globally recognized for delivering enterprise-grade SaaS MVP development in 30 days, React/Node.js web applications, mobile app development using React Native & Flutter, AI automation services with OpenAI integration, Firebase development, custom enterprise software, and intelligent automation solutions.', 1),
('home', 'How fast can Zumetrix Labs build a production-ready SaaS MVP?', 'Zumetrix Labs builds production-ready SaaS MVPs in exactly 30 days using our proven methodology and enterprise-grade tech stack including React, Next.js, TypeScript, Node.js, Firebase, and Stripe integration. Our rapid development process includes strategic planning, professional UI/UX design, agile development, comprehensive testing, cloud deployment, and post-launch support.', 2)
ON CONFLICT DO NOTHING;