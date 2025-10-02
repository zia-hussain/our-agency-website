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
  BookOpen, 
  Globe, 
  Star,
  Calendar,
  User,
  Tag,
  Image as ImageIcon,
  FileText,
  Search,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { supabase, isSupabaseConfigured } from '../../../lib/supabase';
import { uploadToCloudinary, logActivity } from '../../../hooks/useSupabaseData';
import type { Article } from '../../../lib/supabase';

const ArticleForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEditing = !!id;
  
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  
  const [formData, setFormData] = useState<Partial<Article>>({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    featured_image: '',
    author: 'Zia Hussain',
    author_role: 'Co-Founder & CEO',
    author_image: '/zia-hussain-founder.png',
    read_time: '5 min read',
    tags: [],
    category: 'Development',
    featured: false,
    is_published: false,
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

  // Load existing article for editing
  useEffect(() => {
    if (isEditing && id && isSupabaseConfigured && supabase) {
      loadArticle();
    }
  }, [id, isEditing]);

  const loadArticle = async () => {
    if (!supabase) return;
    
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('articles')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      setFormData(data);
    } catch (err) {
      alert('Failed to load article: ' + (err instanceof Error ? err.message : 'Unknown error'));
      navigate('/admin/articles');
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
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleImageUpload = async (field: 'featured_image' | 'author_image' | 'og_image' | 'twitter_image') => {
    setUploadingImage(true);
    try {
      // Simulate Cloudinary upload - replace with actual implementation
      const mockFile = new File([''], 'image.jpg');
      const imageUrl = await uploadToCloudinary(mockFile);
      
      setFormData(prev => ({ ...prev, [field]: imageUrl }));
      
      // Log media upload
      if (supabase) {
        await supabase.from('media_assets').insert({
          filename: `article-${field}-${Date.now()}.jpg`,
          cloudinary_url: imageUrl,
          cloudinary_public_id: `article-${field}-${Date.now()}`,
          file_type: 'image/jpeg',
          used_in_pages: ['articles']
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

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isSupabaseConfigured || !supabase) {
      alert('Supabase is not configured');
      return;
    }

    setSaving(true);
    try {
      const articleData = {
        ...formData,
        updated_at: new Date().toISOString(),
        published_at: formData.is_published ? (formData.published_at || new Date().toISOString()) : null,
      };

      if (isEditing) {
        const { error } = await supabase
          .from('articles')
          .update(articleData)
          .eq('id', id);

        if (error) throw error;
        await logActivity('update', 'articles', id, formData.title);
      } else {
        const { error } = await supabase
          .from('articles')
          .insert(articleData);

        if (error) throw error;
        await logActivity('create', 'articles', '', formData.title);
      }

      navigate('/admin/articles');
    } catch (err) {
      alert('Failed to save article: ' + (err instanceof Error ? err.message : 'Unknown error'));
    } finally {
      setSaving(false);
    }
  };

  const categories = [
    'Development',
    'AI & Automation', 
    'Mobile Development',
    'SaaS',
    'Firebase',
    'Automation',
    'Business Strategy'
  ];

  const authors = [
    { name: 'Zia Hussain', role: 'Co-Founder & CEO', image: '/zia-hussain-founder.png' },
    { name: 'Syed Omer Shah', role: 'Co-Founder & CTO', image: '/syed-omer-shah-founder.png' }
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
            <Link to="/admin/articles">
              <motion.div
                whileHover={{ x: -2 }}
                transition={{ duration: 0.15 }}
                className="inline-flex items-center text-muted-foreground hover:text-primary transition-colors duration-150 mb-4 group"
              >
                <ArrowLeft size={16} className="mr-2 group-hover:-translate-x-0.5 transition-transform duration-150" />
                Back to Articles
              </motion.div>
            </Link>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              {isEditing ? 'Edit Article' : 'Create New Article'}
            </h1>
            <p className="text-muted-foreground">
              {isEditing ? 'Update your expert insight article' : 'Share your expertise with the world'}
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
              <BookOpen size={24} className="text-primary-foreground" />
            </div>
          </div>
        </div>
      </div>

      <form onSubmit={handleSave} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content - 2/3 width */}
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
              Article Content
            </h2>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Article Title *
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all duration-150"
                  placeholder="How to Build Your SaaS MVP in 30 Days..."
                />
              </div>

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
                  placeholder="build-saas-mvp-in-30-days"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  URL: /articles/{formData.slug}
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Excerpt *
                </label>
                <textarea
                  name="excerpt"
                  value={formData.excerpt}
                  onChange={handleInputChange}
                  required
                  rows={3}
                  className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all duration-150 resize-y"
                  placeholder="Brief description that appears in article listings..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Article Content *
                </label>
                <textarea
                  name="content"
                  value={formData.content}
                  onChange={handleInputChange}
                  required
                  rows={12}
                  className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all duration-150 resize-y font-mono text-sm"
                  placeholder="<h2>Your Article Content</h2><p>Write your expert insights here...</p>"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Use HTML tags for formatting. Supports h2, h3, p, ul, li, strong, em, code, blockquote
                </p>
              </div>
            </div>
          </motion.div>

          {/* SEO Settings */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="bg-card border border-border rounded-xl p-6"
          >
            <h2 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
              <Globe size={20} className="text-primary" />
              SEO & Social Media
            </h2>

            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    SEO Title
                  </label>
                  <input
                    type="text"
                    name="seo_title"
                    value={formData.seo_title}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all duration-150"
                    placeholder="SEO optimized title (60 chars max)"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    SEO Keywords
                  </label>
                  <input
                    type="text"
                    name="seo_keywords"
                    value={formData.seo_keywords}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all duration-150"
                    placeholder="keyword1, keyword2, keyword3"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  SEO Description
                </label>
                <textarea
                  name="seo_description"
                  value={formData.seo_description}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all duration-150 resize-y"
                  placeholder="Meta description for search engines (160 chars max)"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Open Graph Title
                  </label>
                  <input
                    type="text"
                    name="og_title"
                    value={formData.og_title}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all duration-150"
                    placeholder="Title for social media sharing"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Twitter Title
                  </label>
                  <input
                    type="text"
                    name="twitter_title"
                    value={formData.twitter_title}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all duration-150"
                    placeholder="Title for Twitter cards"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Sidebar - 1/3 width */}
        <div className="lg:col-span-1 space-y-8">
          {/* Publish Settings */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="bg-card border border-border rounded-xl p-6"
          >
            <h3 className="text-lg font-bold text-foreground mb-6 flex items-center gap-2">
              <Globe size={18} className="text-primary" />
              Publish Settings
            </h3>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-foreground">
                  Published
                </label>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    name="is_published"
                    checked={formData.is_published}
                    onChange={handleInputChange}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-border peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>

              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-foreground">
                  Featured Article
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
                  Category
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all duration-150"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Read Time
                </label>
                <input
                  type="text"
                  name="read_time"
                  value={formData.read_time}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all duration-150"
                  placeholder="5 min read"
                />
              </div>
            </div>
          </motion.div>

          {/* Author Settings */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
            className="bg-card border border-border rounded-xl p-6"
          >
            <h3 className="text-lg font-bold text-foreground mb-6 flex items-center gap-2">
              <User size={18} className="text-primary" />
              Author Information
            </h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Author
                </label>
                <select
                  name="author"
                  value={formData.author}
                  onChange={(e) => {
                    const selectedAuthor = authors.find(a => a.name === e.target.value);
                    setFormData(prev => ({
                      ...prev,
                      author: e.target.value,
                      author_role: selectedAuthor?.role || '',
                      author_image: selectedAuthor?.image || ''
                    }));
                  }}
                  className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all duration-150"
                >
                  {authors.map(author => (
                    <option key={author.name} value={author.name}>{author.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Author Role
                </label>
                <input
                  type="text"
                  name="author_role"
                  value={formData.author_role}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all duration-150"
                  placeholder="Co-Founder & CEO"
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
                className="w-full border-2 border-dashed border-border hover:border-primary/30 rounded-lg p-8 text-center transition-all duration-150 group"
              >
                {uploadingImage ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full mx-auto mb-2"
                  />
                ) : (
                  <Upload size={32} className="text-muted-foreground group-hover:text-primary transition-colors duration-150 mx-auto mb-2" />
                )}
                <p className="text-muted-foreground group-hover:text-primary transition-colors duration-150">
                  {uploadingImage ? 'Uploading...' : 'Upload Featured Image'}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Recommended: 1200x630px for optimal social sharing
                </p>
              </motion.button>
            </div>
          </motion.div>

          {/* Tags */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.5 }}
            className="bg-card border border-border rounded-xl p-6"
          >
            <h3 className="text-lg font-bold text-foreground mb-6 flex items-center gap-2">
              <Tag size={18} className="text-primary" />
              Tags
            </h3>

            <div className="space-y-4">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                  className="flex-1 px-4 py-2 bg-background border border-border rounded-lg text-foreground focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all duration-150"
                  placeholder="Add a tag..."
                />
                <motion.button
                  type="button"
                  onClick={addTag}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                  className="bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:shadow-lg transition-all duration-150"
                >
                  <Plus size={16} />
                </motion.button>
              </div>

              <div className="flex flex-wrap gap-2">
                {formData.tags?.map((tag) => (
                  <motion.span
                    key={tag}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary rounded-full text-sm border border-primary/20"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => removeTag(tag)}
                      className="hover:text-destructive transition-colors duration-150"
                    >
                      <X size={12} />
                    </button>
                  </motion.span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Save Button - Fixed Position */}
        <div className="lg:col-span-3 sticky bottom-0 bg-background/80 backdrop-blur-xl border-t border-border p-6 -mx-6">
          <div className="flex justify-end gap-4">
            <Link to="/admin/articles">
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
                  {isEditing ? 'Update Article' : 'Create Article'}
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
            className="bg-card border border-border rounded-2xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-foreground">Live Preview</h3>
              <button
                onClick={() => setPreviewMode(false)}
                className="p-2 text-muted-foreground hover:text-foreground rounded-lg hover:bg-card/50 transition-all duration-150"
              >
                <X size={20} />
              </button>
            </div>

            {/* Article Preview */}
            <div className="bg-background border border-border rounded-xl p-8">
              <div className="max-w-3xl mx-auto">
                {/* Category Badge */}
                <div className="mb-6">
                  <span className="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold border border-primary/20">
                    {formData.category}
                  </span>
                  {formData.featured && (
                    <span className="ml-3 px-4 py-2 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground rounded-full text-sm font-semibold">
                      Featured Article
                    </span>
                  )}
                </div>

                {/* Title */}
                <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
                  {formData.title || 'Article Title'}
                </h1>

                {/* Excerpt */}
                <p className="text-xl text-muted-foreground leading-relaxed mb-8">
                  {formData.excerpt || 'Article excerpt will appear here...'}
                </p>

                {/* Meta */}
                <div className="flex items-center gap-6 mb-8 pb-8 border-b border-border">
                  <div className="flex items-center gap-3">
                    <img
                      src={formData.author_image}
                      alt={formData.author}
                      className="w-12 h-12 rounded-full object-cover border-2 border-border"
                    />
                    <div>
                      <div className="font-semibold text-foreground">{formData.author}</div>
                      <div className="text-sm text-muted-foreground">{formData.author_role}</div>
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {formData.read_time}
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

                {/* Content */}
                <div 
                  className="prose prose-lg prose-invert max-w-none"
                  dangerouslySetInnerHTML={{ __html: formData.content || '<p>Article content will appear here...</p>' }}
                />

                {/* Tags */}
                {formData.tags && formData.tags.length > 0 && (
                  <div className="mt-8 pt-8 border-t border-border">
                    <div className="flex flex-wrap gap-2">
                      {formData.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm border border-primary/20"
                        >
                          {tag}
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

export default ArticleForm;