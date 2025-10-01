import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Plus, CreditCard as Edit, Trash2, Eye, Star, Search, Filter, Grid2x2 as Grid, List, MessageSquare, MapPin, Building, Award, CheckCircle, AlertCircle, Quote, Globe } from 'lucide-react';
import { useTestimonials } from '../../hooks/useSupabaseData';
import { supabase, isSupabaseConfigured } from '../../lib/supabase';
import { logActivity } from '../../hooks/useSupabaseData';

const TestimonialsManagement: React.FC = () => {
  const { testimonials, loading, error, refetch } = useTestimonials();
  const [deleting, setDeleting] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filterFeatured, setFilterFeatured] = useState<'all' | 'featured' | 'regular'>('all');
  const [filterRating, setFilterRating] = useState<string>('all');

  const handleDelete = async (id: string, author: string) => {
    if (!confirm(`Are you sure you want to delete testimonial from "${author}"?`)) return;
    if (!isSupabaseConfigured || !supabase) return;
    
    setDeleting(id);
    try {
      const { error } = await supabase
        .from('testimonials')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      await logActivity('delete', 'testimonials', id, `${author} - ${testimonials.find(t => t.id === id)?.company}`);
      refetch();
    } catch (err) {
      alert('Failed to delete testimonial: ' + (err instanceof Error ? err.message : 'Unknown error'));
    } finally {
      setDeleting(null);
    }
  };

  const toggleFeatured = async (id: string, currentFeatured: boolean, author: string) => {
    if (!isSupabaseConfigured || !supabase) return;

    try {
      const { error } = await supabase
        .from('testimonials')
        .update({ featured: !currentFeatured, updated_at: new Date().toISOString() })
        .eq('id', id);

      if (error) throw error;
      
      await logActivity('update', 'testimonials', id, `${author} Testimonial`, { featured: !currentFeatured });
      refetch();
    } catch (err) {
      alert('Failed to update testimonial: ' + (err instanceof Error ? err.message : 'Unknown error'));
    }
  };

  const toggleActive = async (id: string, currentActive: boolean, author: string) => {
    if (!isSupabaseConfigured || !supabase) return;

    try {
      const { error } = await supabase
        .from('testimonials')
        .update({ is_active: !currentActive, updated_at: new Date().toISOString() })
        .eq('id', id);

      if (error) throw error;
      
      await logActivity('update', 'testimonials', id, `${author} Testimonial`, { is_active: !currentActive });
      refetch();
    } catch (err) {
      alert('Failed to update testimonial: ' + (err instanceof Error ? err.message : 'Unknown error'));
    }
  };

  // Filter testimonials
  const filteredTestimonials = testimonials.filter(testimonial => {
    const matchesSearch = testimonial.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         testimonial.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         testimonial.quote.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFeatured = filterFeatured === 'all' || 
                           (filterFeatured === 'featured' && testimonial.featured) ||
                           (filterFeatured === 'regular' && !testimonial.featured);
    
    const matchesRating = filterRating === 'all' || testimonial.rating.toString() === filterRating;
    
    return matchesSearch && matchesFeatured && matchesRating;
  });

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
        Error loading testimonials: {error}
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Professional Header */}
      <div className="bg-card border border-border rounded-xl p-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Client Testimonials Management</h1>
            <p className="text-muted-foreground">
              Manage client feedback, success stories, and social proof with professional presentation
            </p>
            <div className="flex items-center gap-4 mt-3 text-sm">
              <span className="text-muted-foreground">
                Total: <span className="font-semibold text-foreground">{testimonials.length}</span>
              </span>
              <span className="text-muted-foreground">
                Featured: <span className="font-semibold text-primary">{testimonials.filter(t => t.featured).length}</span>
              </span>
              <span className="text-muted-foreground">
                Active: <span className="font-semibold text-primary">{testimonials.filter(t => t.is_active).length}</span>
              </span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/#testimonials" target="_blank" rel="noopener noreferrer">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.15 }}
                className="bg-card border border-border text-foreground px-4 py-2 rounded-lg hover:border-primary/30 transition-all duration-150 flex items-center gap-2"
              >
                <Eye size={16} />
                View Live
              </motion.button>
            </Link>
            <Link to="/admin/testimonials/new">
              <motion.button
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.15 }}
                className="bg-primary text-primary-foreground px-6 py-3 rounded-xl font-medium flex items-center gap-2 hover:shadow-lg transition-all duration-150"
              >
                <Plus size={18} />
                Add New Testimonial
              </motion.button>
            </Link>
            <div className="w-16 h-16 bg-primary rounded-xl flex items-center justify-center">
              <MessageSquare size={24} className="text-primary-foreground" />
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Filters & Search */}
      <div className="bg-card border border-border rounded-xl p-6">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search by client name, company, or testimonial content..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-background border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all duration-150"
            />
          </div>

          {/* Filters */}
          <div className="flex items-center gap-3">
            <Filter size={18} className="text-muted-foreground" />
            <select
              value={filterFeatured}
              onChange={(e) => setFilterFeatured(e.target.value as 'all' | 'featured' | 'regular')}
              className="px-4 py-3 bg-background border border-border rounded-lg text-foreground focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all duration-150"
            >
              <option value="all">All Testimonials</option>
              <option value="featured">Featured Only</option>
              <option value="regular">Regular Only</option>
            </select>

            <select
              value={filterRating}
              onChange={(e) => setFilterRating(e.target.value)}
              className="px-4 py-3 bg-background border border-border rounded-lg text-foreground focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all duration-150"
            >
              <option value="all">All Ratings</option>
              <option value="5">5 Stars</option>
              <option value="4">4 Stars</option>
              <option value="3">3 Stars</option>
            </select>
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center gap-2 bg-background border border-border rounded-lg p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded transition-all duration-150 ${
                viewMode === 'grid' 
                  ? 'bg-primary text-primary-foreground' 
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Grid size={16} />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded transition-all duration-150 ${
                viewMode === 'list' 
                  ? 'bg-primary text-primary-foreground' 
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <List size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Testimonials Display */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTestimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              whileHover={{ y: -4, scale: 1.02 }}
              className="bg-card border border-border rounded-xl overflow-hidden hover:border-primary/30 transition-all duration-150 group"
            >
              {/* Header with Avatar */}
              <div className="p-6 border-b border-border">
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={testimonial.avatar || 'https://images.pexels.com/photos/762020/pexels-photo-762020.jpeg?auto=compress&cs=tinysrgb&w=150'}
                    alt={testimonial.author}
                    className="w-12 h-12 rounded-full object-cover border-2 border-border"
                  />
                  <div className="flex-1">
                    <h3 className="font-bold text-foreground group-hover:text-primary transition-colors duration-150">
                      {testimonial.author}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {testimonial.role} at {testimonial.company}
                    </p>
                    <div className="flex items-center gap-1 mt-1">
                      <MapPin size={12} className="text-primary" />
                      <span className="text-xs text-muted-foreground">{testimonial.country}</span>
                    </div>
                  </div>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} size={14} className="text-primary fill-current" />
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">({testimonial.rating}/5)</span>
                </div>

                {/* Status Badges */}
                <div className="flex gap-2">
                  {testimonial.featured && (
                    <span className="bg-primary text-primary-foreground px-2 py-1 rounded-full text-xs font-medium">
                      Featured
                    </span>
                  )}
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    testimonial.is_active 
                      ? 'bg-green-500/20 text-green-400' 
                      : 'bg-red-500/20 text-red-400'
                  }`}>
                    {testimonial.is_active ? 'Active' : 'Inactive'}
                  </span>
                </div>
              </div>

              {/* Quote Content */}
              <div className="p-6">
                <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Quote size={16} className="text-primary" />
                </div>
                
                <blockquote className="text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-4 italic">
                  "{testimonial.quote}"
                </blockquote>

                {testimonial.project && (
                  <div className="text-xs text-primary font-medium bg-primary/10 px-2 py-1 rounded-full inline-block mb-4">
                    Project: {testimonial.project}
                  </div>
                )}

                {testimonial.results && (
                  <div className="text-xs text-green-400 font-medium bg-green-500/10 px-2 py-1 rounded-full inline-block mb-4">
                    Result: {testimonial.results}
                  </div>
                )}

                {/* Actions */}
                <div className="flex gap-2">
                  <Link to={`/admin/testimonials/edit/${testimonial.id}`} className="flex-1">
                    <button className="w-full bg-primary/10 text-primary px-3 py-2 rounded-lg text-sm hover:bg-primary/20 transition-colors duration-150 flex items-center justify-center gap-1">
                      <Edit size={14} />
                      Edit
                    </button>
                  </Link>
                  <button
                    onClick={() => toggleFeatured(testimonial.id, testimonial.featured, testimonial.author)}
                    className={`p-2 rounded-lg text-sm transition-colors duration-150 ${
                      testimonial.featured 
                        ? 'bg-primary/20 text-primary' 
                        : 'bg-muted/20 text-muted-foreground hover:text-primary hover:bg-primary/10'
                    }`}
                    title={testimonial.featured ? 'Remove from featured' : 'Mark as featured'}
                  >
                    <Star size={14} className={testimonial.featured ? 'fill-current' : ''} />
                  </button>
                  <button
                    onClick={() => toggleActive(testimonial.id, testimonial.is_active, testimonial.author)}
                    className={`p-2 rounded-lg text-sm transition-colors duration-150 ${
                      testimonial.is_active 
                        ? 'bg-green-500/20 text-green-400' 
                        : 'bg-red-500/20 text-red-400 hover:bg-red-500/30'
                    }`}
                    title={testimonial.is_active ? 'Deactivate testimonial' : 'Activate testimonial'}
                  >
                    <Globe size={14} />
                  </button>
                  <button
                    onClick={() => handleDelete(testimonial.id, testimonial.author)}
                    disabled={deleting === testimonial.id}
                    className="bg-destructive/10 text-destructive px-3 py-2 rounded-lg text-sm hover:bg-destructive/20 transition-colors duration-150 disabled:opacity-50 flex items-center justify-center"
                  >
                    {deleting === testimonial.id ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                        className="w-4 h-4 border border-destructive/30 border-t-destructive rounded-full"
                      />
                    ) : (
                      <Trash2 size={14} />
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        /* List View */
        <div className="bg-card border border-border rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-card/30 border-b border-border">
                <tr>
                  <th className="text-left py-4 px-6 font-semibold text-foreground">Client</th>
                  <th className="text-left py-4 px-6 font-semibold text-foreground">Company</th>
                  <th className="text-left py-4 px-6 font-semibold text-foreground">Rating</th>
                  <th className="text-left py-4 px-6 font-semibold text-foreground">Status</th>
                  <th className="text-left py-4 px-6 font-semibold text-foreground">Project</th>
                  <th className="text-right py-4 px-6 font-semibold text-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredTestimonials.map((testimonial, index) => (
                  <motion.tr
                    key={testimonial.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2, delay: index * 0.03 }}
                    className="border-b border-border/50 hover:bg-card/30 transition-colors duration-150"
                  >
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-4">
                        <img
                          src={testimonial.avatar || 'https://images.pexels.com/photos/762020/pexels-photo-762020.jpeg?auto=compress&cs=tinysrgb&w=150'}
                          alt={testimonial.author}
                          className="w-10 h-10 rounded-full object-cover border border-border"
                        />
                        <div>
                          <div className="font-medium text-foreground">{testimonial.author}</div>
                          <div className="text-sm text-muted-foreground">
                            {testimonial.role}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div>
                        <div className="font-medium text-foreground">{testimonial.company}</div>
                        <div className="text-sm text-muted-foreground flex items-center gap-1">
                          <MapPin size={12} />
                          {testimonial.country}
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-1">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} size={12} className="text-primary fill-current" />
                        ))}
                        <span className="text-sm text-muted-foreground ml-1">({testimonial.rating})</span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        {testimonial.featured && (
                          <span className="inline-flex items-center px-2 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium">
                            <Star size={12} className="mr-1 fill-current" />
                            Featured
                          </span>
                        )}
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                          testimonial.is_active 
                            ? 'bg-green-500/20 text-green-400' 
                            : 'bg-red-500/20 text-red-400'
                        }`}>
                          {testimonial.is_active ? 'Active' : 'Inactive'}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className="text-sm text-muted-foreground">
                        {testimonial.project || 'General'}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center justify-end gap-2">
                        <Link to={`/admin/testimonials/edit/${testimonial.id}`}>
                          <button className="p-2 text-primary hover:bg-primary/10 rounded-lg transition-all duration-150">
                            <Edit size={16} />
                          </button>
                        </Link>
                        <button
                          onClick={() => toggleFeatured(testimonial.id, testimonial.featured, testimonial.author)}
                          className={`p-2 rounded-lg transition-all duration-150 ${
                            testimonial.featured 
                              ? 'text-primary bg-primary/10' 
                              : 'text-muted-foreground hover:text-primary hover:bg-primary/10'
                          }`}
                        >
                          <Star size={16} className={testimonial.featured ? 'fill-current' : ''} />
                        </button>
                        <button
                          onClick={() => toggleActive(testimonial.id, testimonial.is_active, testimonial.author)}
                          className={`p-2 rounded-lg transition-all duration-150 ${
                            testimonial.is_active 
                              ? 'text-green-400 bg-green-500/10' 
                              : 'text-red-400 bg-red-500/10 hover:bg-red-500/20'
                          }`}
                        >
                          <Globe size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(testimonial.id, testimonial.author)}
                          disabled={deleting === testimonial.id}
                          className="p-2 text-destructive hover:bg-destructive/10 rounded-lg transition-all duration-150 disabled:opacity-50"
                        >
                          {deleting === testimonial.id ? (
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                              className="w-4 h-4 border border-destructive/30 border-t-destructive rounded-full"
                            />
                          ) : (
                            <Trash2 size={16} />
                          )}
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Empty State */}
      {filteredTestimonials.length === 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="text-center py-16 bg-card/30 border border-border rounded-xl"
        >
          <MessageSquare size={48} className="text-muted-foreground mx-auto mb-4" />
          <h3 className="text-xl font-bold text-foreground mb-2">
            {searchTerm || filterFeatured !== 'all' || filterRating !== 'all' ? 'No testimonials found' : 'No testimonials yet'}
          </h3>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            {searchTerm || filterFeatured !== 'all' || filterRating !== 'all'
              ? 'Try adjusting your search or filter criteria'
              : 'Start by adding your first client testimonial to build social proof'
            }
          </p>
          {(!searchTerm && filterFeatured === 'all' && filterRating === 'all') && (
            <Link to="/admin/testimonials/new">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.15 }}
                className="bg-primary text-primary-foreground px-6 py-3 rounded-xl font-medium hover:shadow-lg transition-all duration-150"
              >
                Add Your First Testimonial
              </motion.button>
            </Link>
          )}
        </motion.div>
      )}

      {/* Results Summary */}
      {(searchTerm || filterFeatured !== 'all' || filterRating !== 'all') && filteredTestimonials.length > 0 && (
        <div className="text-center text-sm text-muted-foreground">
          Showing {filteredTestimonials.length} of {testimonials.length} testimonials
        </div>
      )}
    </div>
  );
};

export default TestimonialsManagement;