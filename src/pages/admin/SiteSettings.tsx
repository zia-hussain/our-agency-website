import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Save, RefreshCw, Building, Globe, Mail, Phone, MapPin, BarChart3, Calendar, Eye } from 'lucide-react';
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

      // Log activity
      await supabase
        .from('activity_logs')
        .insert({
          action_type: 'update',
          table_name: 'site_settings',
          record_id: '1',
          record_title: 'Global Site Settings',
          user_email: 'admin@zumetrix.com',
          changes: formData,
        });

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
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full"
        />
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
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-card/50 backdrop-blur-xl border border-border rounded-xl p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Global Site Settings</h1>
            <p className="text-muted-foreground">
              Manage your company information and global site configuration
            </p>
          </div>
          <div className="flex items-center gap-4">
            <a href="/" target="_blank" rel="noopener noreferrer">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.15 }}
                className="bg-card border border-border text-foreground px-4 py-2 rounded-lg hover:border-primary/30 transition-all duration-150 flex items-center gap-2"
              >
                <Eye size={16} />
                Preview Live
              </motion.button>
            </a>
            <div className="w-16 h-16 bg-primary rounded-xl flex items-center justify-center">
            <Globe size={24} className="text-primary-foreground" />
            </div>
          </div>
        </div>
      </div>

      <form onSubmit={handleSave} className="space-y-8">
        {/* Company Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-card/50 backdrop-blur-xl border border-border rounded-xl p-6"
        >
          <h2 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
            <Building size={20} className="text-primary" />
            Company Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Company Name *
              </label>
              <input
                type="text"
                name="company_name"
                value={formData.company_name}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 bg-background/50 border border-border rounded-lg text-foreground focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all duration-150"
                placeholder="Zumetrix Labs"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Company Tagline *
              </label>
              <input
                type="text"
                name="tagline"
                value={formData.tagline}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 bg-background/50 border border-border rounded-lg text-foreground focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all duration-150"
                placeholder="Forge Your Digital Empire. Conquer Tomorrow."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                <Mail size={16} className="inline mr-1" />
                Email Address *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 bg-background/50 border border-border rounded-lg text-foreground focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all duration-150"
                placeholder="hello@zumetrix.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                <Phone size={16} className="inline mr-1" />
                Phone Number
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
                <MapPin size={16} className="inline mr-1" />
                Address/Location
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
                <Globe size={16} className="inline mr-1" />
                Website URL
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
        </motion.div>

        {/* Social Media Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="bg-card/50 backdrop-blur-xl border border-border rounded-xl p-6"
        >
          <h2 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
            <Globe size={20} className="text-primary" />
            Social Media & External Links
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                LinkedIn Company Page
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
                GitHub Organization
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
                Twitter/X Profile
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
                Instagram Profile
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
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-foreground mb-2">
                <Calendar size={16} className="inline mr-1" />
                Calendly Booking URL
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
        </motion.div>

        {/* SEO & Analytics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="bg-card/50 backdrop-blur-xl border border-border rounded-xl p-6"
        >
          <h2 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
            <BarChart3 size={20} className="text-primary" />
            SEO & Analytics Configuration
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
              <p className="text-xs text-muted-foreground mt-1">
                Used for tracking website analytics and user behavior
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Google Search Console Verification
              </label>
              <input
                type="text"
                name="google_verification"
                value={formData.google_verification}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-background/50 border border-border rounded-lg text-foreground focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all duration-150"
                placeholder="Verification meta tag content"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Verification code for Google Search Console
              </p>
            </div>
          </div>
        </motion.div>

        {/* Save Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
          className="flex justify-end"
        >
          <motion.button
            type="submit"
            disabled={saving}
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.15 }}
            className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground px-8 py-3 rounded-xl font-medium hover:shadow-glow transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {saving ? (
              <>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full"
                />
                Saving Changes...
              </>
            ) : saved ? (
              <>
                <Save size={18} />
                Settings Saved!
              </>
            ) : (
              <>
                <Save size={18} />
                Save All Settings
              </>
            )}
          </motion.button>
        </motion.div>
      </form>

      {/* Preview Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.4 }}
        className="bg-card/50 backdrop-blur-xl border border-border rounded-xl p-6"
      >
        <h3 className="text-lg font-bold text-foreground mb-4">Settings Preview</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Company:</span>
              <span className="text-foreground font-medium">{formData.company_name || 'Not set'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Email:</span>
              <span className="text-foreground font-medium">{formData.email || 'Not set'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Phone:</span>
              <span className="text-foreground font-medium">{formData.phone || 'Not set'}</span>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Analytics:</span>
              <span className={`font-medium ${formData.ga_tag_id ? 'text-green-500' : 'text-muted-foreground'}`}>
                {formData.ga_tag_id ? 'Configured' : 'Not configured'}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Search Console:</span>
              <span className={`font-medium ${formData.google_verification ? 'text-green-500' : 'text-muted-foreground'}`}>
                {formData.google_verification ? 'Verified' : 'Not verified'}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Calendly:</span>
              <span className={`font-medium ${formData.calendly_url ? 'text-green-500' : 'text-muted-foreground'}`}>
                {formData.calendly_url ? 'Connected' : 'Not connected'}
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default SiteSettings;