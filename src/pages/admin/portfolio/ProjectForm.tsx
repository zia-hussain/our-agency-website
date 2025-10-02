import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Save, 
  ArrowLeft, 
  Eye, 
  Upload, 
  X, 
  Plus, 
  FileText, 
  Globe, 
  Star,
  Building,
  MapPin,
  Calendar,
  Users,
  ExternalLink,
  Github,
  Target,
  TrendingUp,
  CheckCircle,
  AlertCircle,
  Image as ImageIcon
} from 'lucide-react';
import { supabase, isSupabaseConfigured } from '../../../lib/supabase';
import { uploadToCloudinary, logActivity } from '../../../hooks/useSupabaseData';
import type { PortfolioProject } from '../../../lib/supabase';

const ProjectForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEditing = !!id;
  
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  
  const [formData, setFormData] = useState<Partial<PortfolioProject>>({
    title: '',
    slug: '',
    category: 'Web Application',
    type: 'saas',
    description: '',
    long_description: '',
    featured_image: '',
    gallery: [],
    tags: [],
    client_name: '',
    client_country: 'United States',
    client_industry: '',
    duration: '',
    team: '',
    year: new Date().getFullYear().toString(),
    featured: false,
    is_active: true,
    results: [],
    problem: '',
    solution: '',
    kpis: [],
    testimonial_quote: '',
    testimonial_author: '',
    testimonial_role: '',
    live_link: '',
    github_link: '',
    stack: [],
    services: [],
    order_index: 0,
    seo_title: '',
    seo_description: '',
    seo_keywords: '',
    og_title: '',
    og_description: '',
    og_image: '',
    twitter_title: '',
    twitter_description: '',
    twitter_image: '',
    canonical_url: '',
  });

  const [newTag, setNewTag] = useState('');
  const [newStackItem, setNewStackItem] = useState('');
  const [newService, setNewService] = useState('');
  const [newResult, setNewResult] = useState('');
  const [newKpi, setNewKpi] = useState({ label: '', value: '', description: '' });

  // Load existing project for editing
  useEffect(() => {
    if (isEditing && id && isSupabaseConfigured && supabase) {
      loadProject();
    }
  }, [id, isEditing]);

  const loadProject = async () => {
    if (!supabase) return;
    
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('portfolio_projects')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      setFormData(data);
    } catch (err) {
      alert('Failed to load project: ' + (err instanceof Error ? err.message : 'Unknown error'));
      navigate('/admin/portfolio');
    } finally {
      setLoading(false);
    }
  };

  // Auto-generate slug from title
  useEffect(() => {
    if (formData.title && !isEditing) {
      const slug = formData.title
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim();
      setFormData(prev => ({ ...prev, slug }));
    }
  }, [formData.title, isEditing]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else if (type === 'number') {
      setFormData(prev => ({ ...prev, [name]: parseInt(value) || 0 }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleImageUpload = async (field: 'featured_image' | 'og_image' | 'twitter_image') => {
    setUploadingImage(true);
    try {
      const mockFile = new File([''], 'image.jpg');
      const imageUrl = await uploadToCloudinary(mockFile);
      
      setFormData(prev => ({ ...prev, [field]: imageUrl }));
      
      if (supabase) {
        await supabase.from('media_assets').insert({
          filename: `project-${field}-${Date.now()}.jpg`,
          cloudinary_url: imageUrl,
          cloudinary_public_id: `project-${field}-${Date.now()}`,
          file_type: 'image/jpeg',
          used_in_pages: ['portfolio']
        });
      }
    } catch (err) {
      alert('Failed to upload image: ' + (err instanceof Error ? err.message : 'Unknown error'));
    } finally {
      setUploadingImage(false);
    }
  };

  const addTag = () => {
    if (newTag.trim() && !formData.tags?.includes(newTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...(prev.tags || []), newTag.trim()]
      }));
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags?.filter(tag => tag !== tagToRemove) || []
    }));
  };

  const addStackItem = () => {
    if (newStackItem.trim() && !formData.stack?.includes(newStackItem.trim())) {
      setFormData(prev => ({
        ...prev,
        stack: [...(prev.stack || []), newStackItem.trim()]
      }));
      setNewStackItem('');
    }
  };

  const removeStackItem = (item: string) => {
    setFormData(prev => ({
      ...prev,
      stack: prev.stack?.filter(tech => tech !== item) || []
    }));
  };

  const addService = () => {
    if (newService.trim() && !formData.services?.includes(newService.trim())) {
      setFormData(prev => ({
        ...prev,
        services: [...(prev.services || []), newService.trim()]
      }));
      setNewService('');
    }
  };

  const removeService = (service: string) => {
    setFormData(prev => ({
      ...prev,
      services: prev.services?.filter(s => s !== service) || []
    }));
  };

  const addResult = () => {
    if (newResult.trim()) {
      setFormData(prev => ({
        ...prev,
        results: [...(prev.results || []), newResult.trim()]
      }));
      setNewResult('');
    }
  };

  const removeResult = (index: number) => {
    setFormData(prev => ({
      ...prev,
      results: prev.results?.filter((_, i) => i !== index) || []
    }));
  };

  const addKpi = () => {
    if (newKpi.label.trim() && newKpi.value.trim()) {
      setFormData(prev => ({
        ...prev,
        kpis: [...(prev.kpis || []), newKpi]
      }));
      setNewKpi({ label: '', value: '', description: '' });
    }
  };

  const removeKpi = (index: number) => {
    setFormData(prev => ({
      ...prev,
      kpis: prev.kpis?.filter((_, i) => i !== index) || []
    }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isSupabaseConfigured || !supabase) {
      alert('Supabase is not configured');
      return;
    }

    setSaving(true);
    try {
      const projectData = {
        ...formData,
        updated_at: new Date().toISOString(),
      };

      if (isEditing) {
        const { error } = await supabase
          .from('portfolio_projects')
          .update(projectData)
          .eq('id', id);

        if (error) throw error;
        await logActivity('update', 'portfolio_projects', id, formData.title);
      } else {
        const { error } = await supabase
          .from('portfolio_projects')
          .insert(projectData);

        if (error) throw error;
        await logActivity('create', 'portfolio_projects', '', formData.title);
      }

      navigate('/admin/portfolio');
    } catch (err) {
      alert('Failed to save project: ' + (err instanceof Error ? err.message : 'Unknown error'));
    } finally {
      setSaving(false);
    }
  };

  const categories = [
    'Web Application',
    'Mobile Application', 
    'Enterprise Solution',
    'Startup MVP',
    'Educational Platform',
    'Logistics App',
    'E-commerce Platform',
    'AI Tool'
  ];

  const types = [
    { value: 'saas', label: 'SaaS Application' },
    { value: 'mobile', label: 'Mobile App' },
    { value: 'enterprise', label: 'Enterprise Solution' },
    { value: 'mvp', label: 'MVP Development' },
    { value: 'web', label: 'Web Application' }
  ];

  const countries = [
    'United States', 'United Kingdom', 'Canada', 'Australia', 
    'United Arab Emirates', 'Singapore', 'Germany', 'France', 
    'Netherlands', 'Switzerland', 'Sweden', 'Norway'
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

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="bg-card border border-border rounded-xl p-6">
        <div className="flex items-center justify-between">
          <div>
            <Link to="/admin/portfolio">
              <motion.div
                whileHover={{ x: -2 }}
                transition={{ duration: 0.15 }}
                className="inline-flex items-center text-muted-foreground hover:text-primary transition-colors duration-150 mb-4 group"
              >
                <ArrowLeft size={16} className="mr-2 group-hover:-translate-x-0.5 transition-transform duration-150" />
                Back to Portfolio
              </motion.div>
            </Link>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              {isEditing ? 'Edit Project' : 'Add New Project'}
            </h1>
            <p className="text-muted-foreground">
              {isEditing ? 'Update your case study details' : 'Create a new portfolio case study'}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <motion.button
              type="button"
              onClick={() => setPreviewMode(!previewMode)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.15 }}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-150 flex items-center gap-2 ${
                previewMode
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-card border border-border text-foreground hover:border-primary/30'
              }`}
            >
              <Eye size={16} />
              {previewMode ? 'Edit Mode' : 'Preview'}
            </motion.button>
            <div className="w-16 h-16 bg-primary rounded-xl flex items-center justify-center">
              <FileText size={24} className="text-primary-foreground" />
            </div>
          </div>
        </div>
      </div>

      <form onSubmit={handleSave} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Basic Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-card border border-border rounded-xl p-6"
          >
            <h2 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
              <FileText size={20} className="text-primary" />
              Project Information
            </h2>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Project Title *
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all duration-150"
                  placeholder="Ifyify - AI-Powered Personal Branding Tool"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    URL Slug *
                  </label>
                  <input
                    type="text"
                    name="slug"
                    value={formData.slug}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all duration-150"
                    placeholder="ifyify-ai-personal-branding"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Category *
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all duration-150"
                  >
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Short Description *
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                  rows={3}
                  className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all duration-150 resize-y"
                  placeholder="Brief description for project cards and listings..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Detailed Description
                </label>
                <textarea
                  name="long_description"
                  value={formData.long_description}
                  onChange={handleInputChange}
                  rows={6}
                  className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all duration-150 resize-y"
                  placeholder="Comprehensive project description for the detail page..."
                />
              </div>
            </div>
          </motion.div>

          {/* Client Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="bg-card border border-border rounded-xl p-6"
          >
            <h2 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
              <Building size={20} className="text-primary" />
              Client Information
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Client Name *
                </label>
                <input
                  type="text"
                  name="client_name"
                  value={formData.client_name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all duration-150"
                  placeholder="Best Business Services"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Client Country *
                </label>
                <select
                  name="client_country"
                  value={formData.client_country}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all duration-150"
                >
                  {countries.map(country => (
                    <option key={country} value={country}>{country}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Industry
                </label>
                <input
                  type="text"
                  name="client_industry"
                  value={formData.client_industry}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all duration-150"
                  placeholder="AI & Business Tools"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Project Type *
                </label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all duration-150"
                >
                  {types.map(type => (
                    <option key={type.value} value={type.value}>{type.label}</option>
                  ))}
                </select>
              </div>
            </div>
          </motion.div>

          {/* Project Details */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="bg-card border border-border rounded-xl p-6"
          >
            <h2 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
              <Calendar size={20} className="text-primary" />
              Project Details
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Duration
                </label>
                <input
                  type="text"
                  name="duration"
                  value={formData.duration}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all duration-150"
                  placeholder="2 weeks"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Team Size
                </label>
                <input
                  type="text"
                  name="team"
                  value={formData.team}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all duration-150"
                  placeholder="Solo Developer"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Year
                </label>
                <input
                  type="text"
                  name="year"
                  value={formData.year}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all duration-150"
                  placeholder="2025"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Live Project URL
                </label>
                <input
                  type="url"
                  name="live_link"
                  value={formData.live_link}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all duration-150"
                  placeholder="https://www.ifyify.art"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  GitHub Repository
                </label>
                <input
                  type="url"
                  name="github_link"
                  value={formData.github_link}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all duration-150"
                  placeholder="https://github.com/username/repo"
                />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1 space-y-8">
          {/* Publish Settings */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
            className="bg-card border border-border rounded-xl p-6"
          >
            <h3 className="text-lg font-bold text-foreground mb-6 flex items-center gap-2">
              <Globe size={18} className="text-primary" />
              Status
            </h3>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-foreground">
                  Active
                </label>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    name="is_active"
                    checked={formData.is_active}
                    onChange={handleInputChange}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-border peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>

              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-foreground">
                  Featured Project
                </label>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    name="featured"
                    checked={formData.featured}
                    onChange={handleInputChange}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-border peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Display Order
                </label>
                <input
                  type="number"
                  name="order_index"
                  value={formData.order_index}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all duration-150"
                  placeholder="0"
                />
              </div>
            </div>
          </motion.div>

          {/* Featured Image */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.4 }}
            className="bg-card border border-border rounded-xl p-6"
          >
            <h3 className="text-lg font-bold text-foreground mb-6 flex items-center gap-2">
              <ImageIcon size={18} className="text-primary" />
              Featured Image
            </h3>

            <div className="space-y-4">
              {formData.featured_image && (
                <div className="relative">
                  <img
                    src={formData.featured_image}
                    alt="Featured"
                    className="w-full h-48 object-cover rounded-lg border border-border"
                  />
                  <button
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, featured_image: '' }))}
                    className="absolute top-2 right-2 p-1 bg-destructive text-destructive-foreground rounded-full hover:bg-destructive/80 transition-colors duration-150"
                  >
                    <X size={16} />
                  </button>
                </div>
              )}
              
              <motion.button
                type="button"
                onClick={() => handleImageUpload('featured_image')}
                disabled={uploadingImage}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.15 }}
                className="w-full border-2 border-dashed border-border hover:border-primary/30 rounded-lg p-6 text-center transition-all duration-150 group"
              >
                {uploadingImage ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    className="w-6 h-6 border-2 border-primary/30 border-t-primary rounded-full mx-auto mb-2"
                  />
                ) : (
                  <Upload size={24} className="text-muted-foreground group-hover:text-primary transition-colors duration-150 mx-auto mb-2" />
                )}
                <p className="text-sm text-muted-foreground group-hover:text-primary transition-colors duration-150">
                  {uploadingImage ? 'Uploading...' : 'Upload Project Image'}
                </p>
              </motion.button>
            </div>
          </motion.div>
        </div>

        {/* Save Button */}
        <div className="lg:col-span-3 sticky bottom-0 bg-background/80 backdrop-blur-xl border-t border-border p-6 -mx-6">
          <div className="flex justify-end gap-4">
            <Link to="/admin/portfolio">
              <motion.button
                type="button"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.15 }}
                className="bg-card border border-border text-foreground px-6 py-3 rounded-xl font-medium hover:border-primary/30 transition-all duration-150"
              >
                Cancel
              </motion.button>
            </Link>
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
                  Saving...
                </>
              ) : (
                <>
                  <Save size={18} />
                  {isEditing ? 'Update Project' : 'Create Project'}
                </>
              )}
            </motion.button>
          </div>
        </div>
      </form>

      {/* Live Preview Modal */}
      {previewMode && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 bg-background/80 backdrop-blur-xl z-50 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="bg-card border border-border rounded-2xl p-8 max-w-5xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-foreground">Project Preview</h3>
              <button
                onClick={() => setPreviewMode(false)}
                className="p-2 text-muted-foreground hover:text-foreground rounded-lg hover:bg-card/50 transition-all duration-150"
              >
                <X size={20} />
              </button>
            </div>

            {/* Project Preview */}
            <div className="bg-background border border-border rounded-xl p-8">
              <div className="max-w-4xl mx-auto">
                {/* Badges */}
                <div className="flex items-center gap-3 mb-6">
                  <span className="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold border border-primary/20">
                    {formData.category}
                  </span>
                  {formData.featured && (
                    <span className="px-4 py-2 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground rounded-full text-sm font-semibold">
                      Featured Project
                    </span>
                  )}
                </div>

                {/* Title */}
                <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
                  {formData.title || 'Project Title'}
                </h1>

                {/* Description */}
                <p className="text-xl text-muted-foreground leading-relaxed mb-8">
                  {formData.description || 'Project description will appear here...'}
                </p>

                {/* Client Info */}
                <div className="grid grid-cols-2 gap-6 mb-8">
                  <div className="flex items-center gap-3">
                    <Building size={18} className="text-primary" />
                    <div>
                      <div className="text-sm text-muted-foreground">Client</div>
                      <div className="font-semibold text-foreground">{formData.client_name || 'Client Name'}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin size={18} className="text-primary" />
                    <div>
                      <div className="text-sm text-muted-foreground">Location</div>
                      <div className="font-semibold text-foreground">{formData.client_country}</div>
                    </div>
                  </div>
                </div>

                {/* Featured Image */}
                {formData.featured_image && (
                  <div className="mb-8">
                    <img
                      src={formData.featured_image}
                      alt={formData.title}
                      className="w-full rounded-xl shadow-lg border border-border"
                    />
                  </div>
                )}

                {/* Tech Stack */}
                {formData.stack && formData.stack.length > 0 && (
                  <div className="mb-8">
                    <h3 className="text-lg font-semibold text-foreground mb-4">Technology Stack</h3>
                    <div className="flex flex-wrap gap-2">
                      {formData.stack.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm border border-primary/20"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default ProjectForm;