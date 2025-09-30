import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Save, Eye, Upload, Home, Users, Briefcase, Zap, RefreshCw, CheckCircle, AlertCircle } from 'lucide-react';
import { useSiteSettings } from '../../hooks/useSupabaseData';
import { supabase, isSupabaseConfigured } from '../../lib/supabase';
import { logActivity } from '../../hooks/useSupabaseData';

const HomePageContent: React.FC = () => {
  const { settings, loading, error, refetch } = useSiteSettings();
  const [formData, setFormData] = useState({
    // Hero Section
    hero_headline: '',
    hero_subtext: '',
    hero_primary_cta_text: '',
    hero_primary_cta_link: '',
    hero_secondary_cta_text: '',
    hero_secondary_cta_link: '',
    
    // Trust Band Section
    trust_band_title: '',
    trust_band_subtitle: '',
    
    // Services Preview Section
    services_preview_title: '',
    services_preview_subtitle: '',
    
    // Final CTA Section
    final_cta_headline: '',
    final_cta_subtitle: '',
  });
  
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [previewMode, setPreviewMode] = useState(false);

  useEffect(() => {
    if (settings) {
      setFormData({
        hero_headline: settings.hero_headline || 'Transform Your Vision Into World-Class Software That Scales Globally',
        hero_subtext: settings.hero_subtext || 'Zumetrix Labs is the world\'s premier software development agency building enterprise-grade SaaS MVPs in 30 days, AI automation systems, and mobile apps for ambitious global startups and enterprises.',
        hero_primary_cta_text: settings.hero_primary_cta_text || 'Start Your Project',
        hero_primary_cta_link: settings.hero_primary_cta_link || '/contact',
        hero_secondary_cta_text: settings.hero_secondary_cta_text || 'View Our Work',
        hero_secondary_cta_link: settings.hero_secondary_cta_link || '/portfolio',
        trust_band_title: settings.trust_band_title || 'Trusted by Leading Global Companies Across International Markets',
        trust_band_subtitle: settings.trust_band_subtitle || 'From Silicon Valley startups to London enterprises - we deliver world-class results that dominate markets',
        services_preview_title: settings.services_preview_title || 'Enterprise-Grade Software Development Services',
        services_preview_subtitle: settings.services_preview_subtitle || 'From SaaS MVPs to AI automation - we deliver solutions that drive measurable business growth',
        final_cta_headline: settings.final_cta_headline || 'Ready to Transform Your Business Vision Into Reality?',
        final_cta_subtitle: settings.final_cta_subtitle || 'Join 50+ successful international clients who\'ve scaled their businesses with Zumetrix Labs',
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
    if (!isSupabaseConfigured || !supabase) {
      alert('Supabase is not configured');
      return;
    }

    setSaving(true);

    try {
      const { error } = await supabase
        .from('site_settings')
        .upsert({
          id: 1,
          ...formData,
          updated_at: new Date().toISOString(),
        });

      if (error) throw error;

      // Log activity
      await logActivity('update', 'site_settings', '1', 'Homepage Content', formData);

      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
      refetch();
    } catch (err) {
      alert('Failed to save homepage content: ' + (err instanceof Error ? err.message : 'Unknown error'));
    } finally {
      setSaving(false);
    }
  };

  const sections = [
    { 
      id: 'hero', 
      name: 'Hero Section', 
      icon: Home,
      description: 'Main headline, subtext, and CTA buttons'
    },
    { 
      id: 'trust', 
      name: 'Trust Band', 
      icon: Users,
      description: 'Client trust indicators and global stats'
    },
    { 
      id: 'services', 
      name: 'Services Preview', 
      icon: Briefcase,
      description: 'Service offerings preview section'
    },
    { 
      id: 'cta', 
      name: 'Final CTA', 
      icon: Zap,
      description: 'Bottom conversion section'
    },
  ];

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
      <div className="bg-destructive/10 border border-destructive/20 text-destructive px-4 py-3 rounded-lg flex items-center gap-2">
        <AlertCircle size={16} />
        Error loading content: {error}
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Professional Header */}
      <div className="bg-card border border-border rounded-xl p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Homepage Content Editor</h1>
            <p className="text-muted-foreground">
              Edit all sections of your homepage with real-time preview and instant saves
            </p>
            <div className="flex items-center gap-4 mt-3 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                <span className="text-muted-foreground">
                  Status: <span className="text-primary font-medium">Live</span>
                </span>
              </div>
              <div className="flex items-center gap-2">
                <RefreshCw size={14} className="text-primary" />
                <span className="text-muted-foreground">
                  Auto-save: <span className="text-primary font-medium">Enabled</span>
                </span>
              </div>
            </div>
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
                View Live
              </motion.button>
            </a>
            <div className="w-16 h-16 bg-primary rounded-xl flex items-center justify-center">
              <Home size={24} className="text-primary-foreground" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Section Navigation - Fixed Sidebar Style */}
        <div className="lg:col-span-1">
          <div className="bg-card border border-border rounded-xl p-4 sticky top-8">
            <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
              <Home size={16} className="text-primary" />
              Page Sections
            </h3>
            <nav className="space-y-2">
              {sections.map((section) => (
                <motion.button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.15 }}
                  className={`w-full flex items-start gap-3 px-3 py-3 rounded-lg text-sm font-medium transition-all duration-150 ${
                    activeSection === section.id
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:text-foreground hover:bg-card/50'
                  }`}
                >
                  <section.icon size={16} className="mt-0.5 flex-shrink-0" />
                  <div className="text-left">
                    <div className="font-medium">{section.name}</div>
                    <div className={`text-xs mt-1 ${
                      activeSection === section.id 
                        ? 'text-primary-foreground/80' 
                        : 'text-muted-foreground/70'
                    }`}>
                      {section.description}
                    </div>
                  </div>
                </motion.button>
              ))}
            </nav>

            {/* Preview Toggle */}
            <div className="mt-6 pt-4 border-t border-border">
              <motion.button
                onClick={() => setPreviewMode(!previewMode)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.15 }}
                className={`w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-150 ${
                  previewMode
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-card/50 text-muted-foreground hover:text-foreground hover:bg-card/80'
                }`}
              >
                <Eye size={14} />
                {previewMode ? 'Edit Mode' : 'Preview Mode'}
              </motion.button>
            </div>
          </div>
        </div>

        {/* Content Editor */}
        <div className="lg:col-span-3">
          <form onSubmit={handleSave} className="space-y-8">
            {/* Hero Section Editor */}
            {activeSection === 'hero' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-card border border-border rounded-xl p-6"
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
                    <Home size={20} className="text-primary" />
                    Hero Section
                  </h2>
                  <div className="text-xs text-muted-foreground bg-card/50 px-3 py-1 rounded-full">
                    Main landing section
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Main Headline *
                    </label>
                    <input
                      type="text"
                      name="hero_headline"
                      value={formData.hero_headline}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all duration-150"
                      placeholder="Transform Your Vision Into World-Class Software..."
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      This appears as the main H1 on your homepage
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Subtext Description *
                    </label>
                    <textarea
                      name="hero_subtext"
                      value={formData.hero_subtext}
                      onChange={handleInputChange}
                      required
                      rows={4}
                      className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all duration-150 resize-y"
                      placeholder="Zumetrix Labs is the world's premier software development agency..."
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Supporting text that explains your value proposition
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Primary CTA Text
                      </label>
                      <input
                        type="text"
                        name="hero_primary_cta_text"
                        value={formData.hero_primary_cta_text}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all duration-150"
                        placeholder="Start Your Project"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Primary CTA Link
                      </label>
                      <input
                        type="text"
                        name="hero_primary_cta_link"
                        value={formData.hero_primary_cta_link}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all duration-150"
                        placeholder="/contact"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Secondary CTA Text
                      </label>
                      <input
                        type="text"
                        name="hero_secondary_cta_text"
                        value={formData.hero_secondary_cta_text}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all duration-150"
                        placeholder="View Our Work"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Secondary CTA Link
                      </label>
                      <input
                        type="text"
                        name="hero_secondary_cta_link"
                        value={formData.hero_secondary_cta_link}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all duration-150"
                        placeholder="/portfolio"
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Trust Band Section Editor */}
            {activeSection === 'trust' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-card border border-border rounded-xl p-6"
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
                    <Users size={20} className="text-primary" />
                    Trust Band Section
                  </h2>
                  <div className="text-xs text-muted-foreground bg-card/50 px-3 py-1 rounded-full">
                    Client trust indicators
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Trust Band Title *
                    </label>
                    <input
                      type="text"
                      name="trust_band_title"
                      value={formData.trust_band_title}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all duration-150"
                      placeholder="Trusted by Leading Global Companies..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Trust Band Subtitle *
                    </label>
                    <textarea
                      name="trust_band_subtitle"
                      value={formData.trust_band_subtitle}
                      onChange={handleInputChange}
                      required
                      rows={3}
                      className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all duration-150 resize-y"
                      placeholder="From Silicon Valley startups to London enterprises..."
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {/* Services Preview Section Editor */}
            {activeSection === 'services' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-card border border-border rounded-xl p-6"
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
                    <Briefcase size={20} className="text-primary" />
                    Services Preview Section
                  </h2>
                  <div className="text-xs text-muted-foreground bg-card/50 px-3 py-1 rounded-full">
                    Service offerings preview
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Services Title *
                    </label>
                    <input
                      type="text"
                      name="services_preview_title"
                      value={formData.services_preview_title}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all duration-150"
                      placeholder="Enterprise-Grade Software Development Services"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Services Subtitle *
                    </label>
                    <textarea
                      name="services_preview_subtitle"
                      value={formData.services_preview_subtitle}
                      onChange={handleInputChange}
                      required
                      rows={3}
                      className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all duration-150 resize-y"
                      placeholder="From SaaS MVPs to AI automation - we deliver solutions..."
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {/* Final CTA Section Editor */}
            {activeSection === 'cta' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-card border border-border rounded-xl p-6"
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
                    <Zap size={20} className="text-primary" />
                    Final CTA Section
                  </h2>
                  <div className="text-xs text-muted-foreground bg-card/50 px-3 py-1 rounded-full">
                    Bottom conversion section
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      CTA Headline *
                    </label>
                    <input
                      type="text"
                      name="final_cta_headline"
                      value={formData.final_cta_headline}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all duration-150"
                      placeholder="Ready to Transform Your Business Vision Into Reality?"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      CTA Subtitle *
                    </label>
                    <textarea
                      name="final_cta_subtitle"
                      value={formData.final_cta_subtitle}
                      onChange={handleInputChange}
                      required
                      rows={3}
                      className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all duration-150 resize-y"
                      placeholder="Join 50+ successful international clients..."
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {/* Save Button - Always Visible */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              className="flex justify-end"
            >
              <motion.button
                type="submit"
                disabled={saving}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.15 }}
                className="bg-primary text-primary-foreground px-8 py-3 rounded-xl font-medium hover:shadow-lg transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
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
                    <CheckCircle size={18} />
                    Changes Saved!
                  </>
                ) : (
                  <>
                    <Save size={18} />
                    Save Homepage Content
                  </>
                )}
              </motion.button>
            </motion.div>
          </form>
        </div>
      </div>

      {/* Live Preview Panel */}
      {previewMode && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-card border border-border rounded-xl p-6"
        >
          <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
            <Eye size={18} className="text-primary" />
            Live Preview
          </h3>
          <div className="bg-background border border-border rounded-lg p-8">
            {activeSection === 'hero' && (
              <div className="text-center space-y-6">
                <h1 className="text-4xl font-bold text-foreground">
                  {formData.hero_headline}
                </h1>
                <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                  {formData.hero_subtext}
                </p>
                <div className="flex gap-4 justify-center">
                  <div className="bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium">
                    {formData.hero_primary_cta_text}
                  </div>
                  <div className="bg-card border border-border text-foreground px-6 py-3 rounded-lg font-medium">
                    {formData.hero_secondary_cta_text}
                  </div>
                </div>
              </div>
            )}
            {activeSection === 'trust' && (
              <div className="text-center space-y-4">
                <h2 className="text-2xl font-bold text-foreground">
                  {formData.trust_band_title}
                </h2>
                <p className="text-muted-foreground">
                  {formData.trust_band_subtitle}
                </p>
              </div>
            )}
            {activeSection === 'services' && (
              <div className="text-center space-y-4">
                <h2 className="text-2xl font-bold text-foreground">
                  {formData.services_preview_title}
                </h2>
                <p className="text-muted-foreground">
                  {formData.services_preview_subtitle}
                </p>
              </div>
            )}
            {activeSection === 'cta' && (
              <div className="text-center space-y-4">
                <h2 className="text-2xl font-bold text-foreground">
                  {formData.final_cta_headline}
                </h2>
                <p className="text-muted-foreground">
                  {formData.final_cta_subtitle}
                </p>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default HomePageContent;