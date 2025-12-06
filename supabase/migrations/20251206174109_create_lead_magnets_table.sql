/*
  # Create Lead Magnets Table

  1. New Tables
    - `lead_magnets`
      - `id` (uuid, primary key)
      - `email` (text, required) - User's email address
      - `name` (text, optional) - User's name
      - `magnet_type` (text, required) - Type of lead magnet (pdf, calculator, checklist, etc.)
      - `magnet_name` (text, required) - Name of the specific lead magnet
      - `metadata` (jsonb, optional) - Additional data like calculator results, preferences, etc.
      - `page_url` (text, optional) - Page where magnet was downloaded
      - `user_agent` (text, optional) - Browser user agent
      - `created_at` (timestamptz) - When the lead magnet was downloaded
      - `status` (text) - Lead status (new, contacted, converted, closed)
      - `notes` (text, optional) - Admin notes

  2. Security
    - Enable RLS on `lead_magnets` table
    - Add policy for public inserts (anyone can download)
    - Add policy for authenticated admin reads

  3. Important Notes
    - This table tracks all lead magnet downloads (PDFs, calculator results, etc.)
    - Email validation should be done on the frontend
    - Metadata field stores flexible JSON data for different magnet types
*/

CREATE TABLE IF NOT EXISTS lead_magnets (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL,
  name text,
  magnet_type text NOT NULL CHECK (magnet_type IN ('pdf', 'calculator', 'checklist', 'template', 'guide', 'ebook', 'other')),
  magnet_name text NOT NULL,
  metadata jsonb DEFAULT '{}'::jsonb,
  page_url text,
  user_agent text,
  created_at timestamptz DEFAULT now(),
  status text DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'converted', 'closed')),
  notes text
);

ALTER TABLE lead_magnets ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit lead magnet downloads"
  ON lead_magnets
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can view all lead magnets"
  ON lead_magnets
  FOR SELECT
  TO authenticated
  USING (true);