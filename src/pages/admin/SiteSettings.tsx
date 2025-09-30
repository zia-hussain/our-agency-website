import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Save, RefreshCw } from 'lucide-react';
import { useSiteSettings } from '../../hooks/useSupabaseData';
import { supabase } from '../../lib/supabase';

const SiteSettings: React.FC = () => {
  const { settings, loading, error, refetch } = useSiteSettings();
  const [formData, setFormData] = useState({
    company_name: '',
    tagline: '',
    email: '',
    phone: '',
    address: '',
    website: '',
    social_linkedin: '',
    social_github: '',
    social_twitter: '',
    social_instagram: '',
    ga_tag_id: '',
    google_verification: '',
    calendly_url: '',
  });
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (settings) {
      setFormData({
        company_name: settings.company_name || '',
        tagline: settings.tagline || '',
        email: settings.email || '',
        phone: settings.phone || '',
        address: settings.address || '',
        website: settings.website || '',
        social_linkedin: settings.social_linkedin || '',
        social_github: settings.social_github || '',
        social_twitter: settings.social_twitter || '',
        social_instagram: settings.social_instagram || '',
        ga_tag_id: settings.ga_tag_id || '',
        google_verification: settings.google_verification || '',
        calendly_url: settings.calendly_url || '',
      });
    }
  }, [settings]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const { error } = await supabase
        .from('site_settings')
        .upsert({
          id: 1, // Single settings record
          ...formData,
          updated_at: new Date().toISOString(),
        });

      if (error) throw error;

      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
      refetch();
    } catch (err) {
      alert('Failed to save settings: ' + (err instanceof Error ? err.message : 'Unknown error'));
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-destructive/10 border border-destructive/20 text-destructive px-4 py-3 rounded-lg">
        Error loading settings: {error}
      </div>
    );
  }

  return (
    <div className="max-w-4xl space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Site Settings</h1>
        <p className="text-muted-foreground">
          Manage your company information and global site settings
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-8">
        {/* Company Information */}
        <div className="bg-card/50 backdrop-blur-xl border border-border rounded-lg p-6">
          <h2 className="text-xl font-semibold text-foreground mb-6">
            Company Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Company Name
              </label>
              <input
                type="text"
                name="company_name"
                value={formData.company_name}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-background/50 border border-border rounded-lg text-foreground focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all duration-150"
                placeholder="Zumetrix Labs"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Tagline
              </label>
              <input
                type="text"
                name="tagline"
                value={formData.tagline}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-background/50 border border-border rounded-lg text-foreground focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all duration-150"
                placeholder="Forge Your Digital Empire. Conquer Tomorrow."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-background/50 border border-border rounded-lg text-foreground focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all duration-150"
                placeholder="hello@zumetrix.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Phone
              </label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-background/50 border border-border rounded-lg text-foreground focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all duration-150"
                placeholder="+92 XXX XXXXXXX"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Address
              </label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-background/50 border border-border rounded-lg text-foreground focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all duration-150"
                placeholder="Pakistan"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Website
              </label>
              <input
                type="url"
                name="website"
                value={formData.website}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-background/50 border border-border rounded-lg text-foreground focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all duration-150"
                placeholder="https://www.zumetrix.com"
              />
            </div>
          </div>
        </div>

        {/* Social Media Links */}
        <div className="bg-card/50 backdrop-blur-xl border border-border rounded-lg p-6">
          <h2 className="text-xl font-semibold text-foreground mb-6">
            Social Media Links
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                LinkedIn
              </label>
              <input
                type="url"
                name="social_linkedin"
                value={formData.social_linkedin}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-background/50 border border-border rounded-lg text-foreground focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all duration-150"
                placeholder="https://linkedin.com/company/zumetrix-labs"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                GitHub
              </label>
              <input
                type="url"
                name="social_github"
                value={formData.social_github}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-background/50 border border-border rounded-lg text-foreground focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all duration-150"
                placeholder="https://github.com/zumetrix-labs"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Twitter/X
              </label>
              <input
                type="url"
                name="social_twitter"
                value={formData.social_twitter}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-background/50 border border-border rounded-lg text-foreground focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all duration-150"
                placeholder="https://x.com/zumetrix83892"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Instagram
              </label>
              <input
                type="url"
                name="social_instagram"
                value={formData.social_instagram}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-background/50 border border-border rounded-lg text-foreground focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all duration-150"
                placeholder="https://instagram.com/zumetrixlabs"
              />
            </div>
          </div>
        </div>

        {/* SEO & Analytics */}
        <div className="bg-card/50 backdrop-blur-xl border border-border rounded-lg p-6">
          <h2 className="text-xl font-semibold text-foreground mb-6">
            SEO & Analytics
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Google Analytics Tag ID
              </label>
              <input
                type="text"
                name="ga_tag_id"
                value={formData.ga_tag_id}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-background/50 border border-border rounded-lg text-foreground focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all duration-150"
                placeholder="G-XXXXXXXXXX"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Google Verification Code
              </label>
              <input
                type="text"
                name="google_verification"
                value={formData.google_verification}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-background/50 border border-border rounded-lg text-foreground focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all duration-150"
                placeholder="Verification code"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-foreground mb-2">
                Calendly URL
              </label>
              <input
                type="url"
                name="calendly_url"
                value={formData.calendly_url}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-background/50 border border-border rounded-lg text-foreground focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all duration-150"
                placeholder="https://calendly.com/zumetrix-labs/consultation"
              />
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <motion.button
            type="submit"
            disabled={saving}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.15 }}
            className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground px-6 py-3 rounded-lg font-medium hover:shadow-glow transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {saving ? (
              <>
                <RefreshCw size={18} className="animate-spin" />
                Saving...
              </>
            ) : saved ? (
              <>
                <Save size={18} />
                Saved!
              </>
            ) : (
              <>
                <Save size={18} />
                Save Settings
              </>
            )}
          </motion.button>
        </div>
      </form>
    </div>
  );
};

export default SiteSettings;