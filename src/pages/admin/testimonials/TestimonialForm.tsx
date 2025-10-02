import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Save, 
  ArrowLeft, 
  Eye, 
  Upload, 
  X, 
  MessageSquare, 
  Globe, 
  Star,
  Building,
  MapPin,
  User,
  Quote,
  Award,
  Image as ImageIcon
} from 'lucide-react';
import { supabase, isSupabaseConfigured } from '../../../lib/supabase';
import { uploadToCloudinary, logActivity } from '../../../hooks/useSupabaseData';
import type { Testimonial } from '../../../lib/supabase';

const TestimonialForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEditing = !!id;
  
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  
  const [formData, setFormData] = useState<Partial<Testimonial>>({
    quote: '',
    author: '',
    role: '',
    company: '',
    country: 'United States',
    project: '',
    avatar: '',
    rating: 5,
    results: '',
    industry: '',
    featured: false,
    is_active: true,
    order_index: 0,
  });

  // Load existing testimonial for editing
  useEffect(() => {
    if (isEditing && id && isSupabaseConfigured && supabase) {
      loadTestimonial();
    }
  }, [id, isEditing]);

  const loadTestimonial = async () => {
    if (!supabase) return;
    
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('testimonials')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      setFormData(data);
    } catch (err) {
      alert('Failed to load testimonial: ' + (err instanceof Error ? err.message : 'Unknown error'));
      navigate('/admin/testimonials');
    } finally {
      setLoading(false);
    }
  };

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

  const handleImageUpload = async () => {
    setUploadingImage(true);
    try {
      const mockFile = new File([''], 'avatar.jpg');
      const imageUrl = await uploadToCloudinary(mockFile);
      
      setFormData(prev => ({ ...prev, avatar: imageUrl }));
      
      if (supabase) {
        await supabase.from('media_assets').insert({
          filename: `testimonial-avatar-${Date.now()}.jpg`,
          cloudinary_url: imageUrl,
          cloudinary_public_id: `testimonial-avatar-${Date.now()}`,
          file_type: 'image/jpeg',
          used_in_pages: ['testimonials']
        });
      }
    } catch (err) {
      alert('Failed to upload image: ' + (err instanceof Error ? err.message : 'Unknown error'));
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isSupabaseConfigured || !supabase) {
      alert('Supabase is not configured');
      return;
    }

    setSaving(true);
    try {
      const testimonialData = {
        ...formData,
        updated_at: new Date().toISOString(),
      };

      if (isEditing) {
        const { error } = await supabase
          .from('testimonials')
          .update(testimonialData)
          .eq('id', id);

        if (error) throw error;
        await logActivity('update', 'testimonials', id, `${formData.author} - ${formData.company}`);
      } else {
        const { error } = await supabase
          .from('testimonials')
          .insert(testimonialData);

        if (error) throw error;
        await logActivity('create', 'testimonials', '', `${formData.author} - ${formData.company}`);
      }

      navigate('/admin/testimonials');
    } catch (err) {
      alert('Failed to save testimonial: ' + (err instanceof Error ? err.message : 'Unknown error'));
    } finally {
      setSaving(false);
    }
  };

  const countries = [
    'United States', 'United Kingdom', 'Canada', 'Australia', 
    'United Arab Emirates', 'Singapore', 'Germany', 'France', 
    'Netherlands', 'Switzerland', 'Sweden', 'Norway'
  ];

  const industries = [
    'Technology', 'Healthcare', 'Finance', 'E-commerce', 'Education',
    'Manufacturing', 'Real Estate', 'Marketing', 'Consulting', 'Other'
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
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="bg-card border border-border rounded-xl p-6">
        <div className="flex items-center justify-between">
          <div>
            <Link to="/admin/testimonials">
              <motion.div
                whileHover={{ x: -2 }}
                transition={{ duration: 0.15 }}
                className="inline-flex items-center text-muted-foreground hover:text-primary transition-colors duration-150 mb-4 group"
              >
                <ArrowLeft size={16} className="mr-2 group-hover:-translate-x-0.5 transition-transform duration-150" />
                Back to Testimonials
              </motion.div>
            </Link>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              {isEditing ? 'Edit Testimonial' : 'Add New Testimonial'}
            </h1>
            <p className="text-muted-foreground">
              {isEditing ? 'Update client feedback' : 'Add client success story'}
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
              <MessageSquare size={24} className="text-primary-foreground" />
            </div>
          </div>
        </div>
      </div>

      <form onSubmit={handleSave} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Testimonial Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-card border border-border rounded-xl p-6"
          >
            <h2 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
              <Quote size={20} className="text-primary" />
              Testimonial Content
            </h2>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Client Quote *
                </label>
                <textarea
                  name="quote"
                  value={formData.quote}
                  onChange={handleInputChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all duration-150 resize-y"
                  placeholder="Zumetrix Labs delivered exactly what we envisioned and more. The AI integration is seamless..."
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Project Name
                  </label>
                  <input
                    type="text"
                    name="project"
                    value={formData.project}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all duration-150"
                    placeholder="Ifyify - AI Personal Branding Tool"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Results Achieved
                  </label>
                  <input
                    type="text"
                    name="results"
                    value={formData.results}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all duration-150"
                    placeholder="300% user engagement increase"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Rating *
                </label>
                <div className="flex items-center gap-4">
                  <select
                    name="rating"
                    value={formData.rating}
                    onChange={handleInputChange}
                    required
                    className="px-4 py-3 bg-background border border-border rounded-lg text-foreground focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all duration-150"
                  >
                    {[5, 4, 3, 2, 1].map(rating => (
                      <option key={rating} value={rating}>{rating} Star{rating !== 1 ? 's' : ''}</option>
                    ))}
                  </select>
                  <div className="flex">
                    {[...Array(formData.rating || 5)].map((_, i) => (
                      <Star key={i} size={16} className="text-primary fill-current" />
                    ))}
                  </div>
                </div>
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
              <User size={20} className="text-primary" />
              Client Information
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Client Name *
                </label>
                <input
                  type="text"
                  name="author"
                  value={formData.author}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all duration-150"
                  placeholder="Kelly Andrews"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Role/Title *
                </label>
                <input
                  type="text"
                  name="role"
                  value={formData.role}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all duration-150"
                  placeholder="Founder & CEO"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Company *
                </label>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all duration-150"
                  placeholder="Best Business Services"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Country *
                </label>
                <select
                  name="country"
                  value={formData.country}
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
                <select
                  name="industry"
                  value={formData.industry}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all duration-150"
                >
                  <option value="">Select Industry</option>
                  {industries.map(industry => (
                    <option key={industry} value={industry}>{industry}</option>
                  ))}
                </select>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1 space-y-8">
          {/* Status Settings */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
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
                  Featured
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

          {/* Avatar Upload */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
            className="bg-card border border-border rounded-xl p-6"
          >
            <h3 className="text-lg font-bold text-foreground mb-6 flex items-center gap-2">
              <ImageIcon size={18} className="text-primary" />
              Client Avatar
            </h3>

            <div className="space-y-4">
              {formData.avatar && (
                <div className="relative">
                  <img
                    src={formData.avatar}
                    alt="Avatar"
                    className="w-24 h-24 rounded-full object-cover border-2 border-border mx-auto"
                  />
                  <button
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, avatar: '' }))}
                    className="absolute top-0 right-1/2 translate-x-8 p-1 bg-destructive text-destructive-foreground rounded-full hover:bg-destructive/80 transition-colors duration-150"
                  >
                    <X size={16} />
                  </button>
                </div>
              )}
              
              <motion.button
                type="button"
                onClick={handleImageUpload}
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
                  {uploadingImage ? 'Uploading...' : 'Upload Avatar'}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Square image recommended
                </p>
              </motion.button>
            </div>
          </motion.div>
        </div>

        {/* Save Button */}
        <div className="lg:col-span-3 sticky bottom-0 bg-background/80 backdrop-blur-xl border-t border-border p-6 -mx-6">
          <div className="flex justify-end gap-4">
            <Link to="/admin/testimonials">
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
                  {isEditing ? 'Update Testimonial' : 'Create Testimonial'}
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
            className="bg-card border border-border rounded-2xl p-8 max-w-3xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-foreground">Testimonial Preview</h3>
              <button
                onClick={() => setPreviewMode(false)}
                className="p-2 text-muted-foreground hover:text-foreground rounded-lg hover:bg-card/50 transition-all duration-150"
              >
                <X size={20} />
              </button>
            </div>

            {/* Testimonial Preview */}
            <div className="bg-background border border-border rounded-xl p-8">
              <div className="text-center">
                {/* Quote Icon */}
                <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-primary/30 border border-primary/30 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Quote size={20} className="text-primary" />
                </div>

                {/* Rating */}
                <div className="flex justify-center mb-6">
                  {[...Array(formData.rating || 5)].map((_, i) => (
                    <Star key={i} size={16} className="text-primary fill-current mx-0.5" />
                  ))}
                </div>

                {/* Quote */}
                <blockquote className="text-xl text-foreground font-light leading-relaxed mb-8 italic">
                  "{formData.quote || 'Client testimonial will appear here...'}"
                </blockquote>

                {/* Author */}
                <div className="flex items-center justify-center gap-4 mb-6">
                  {formData.avatar && (
                    <img
                      src={formData.avatar}
                      alt={formData.author}
                      className="w-16 h-16 rounded-full object-cover border-2 border-border"
                    />
                  )}
                  <div className="text-center">
                    <div className="font-bold text-foreground text-lg">
                      {formData.author || 'Client Name'}
                    </div>
                    <div className="text-primary font-medium">
                      {formData.role || 'Role'}, {formData.company || 'Company'}
                    </div>
                    <div className="text-sm text-muted-foreground flex items-center gap-1 justify-center">
                      <MapPin size={12} />
                      {formData.country}
                    </div>
                  </div>
                </div>

                {/* Project & Results */}
                {(formData.project || formData.results) && (
                  <div className="flex flex-wrap justify-center gap-3">
                    {formData.project && (
                      <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm border border-primary/20">
                        {formData.project}
                      </span>
                    )}
                    {formData.results && (
                      <span className="px-3 py-1 bg-green-500/10 text-green-400 rounded-full text-sm border border-green-500/20">
                        {formData.results}
                      </span>
                    )}
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

export default TestimonialForm;