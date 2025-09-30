import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Plus, Edit, Trash2, Eye, Star, Search, Filter, Grid, List, Briefcase, DollarSign, Tag, Globe, CheckCircle, AlertCircle } from 'lucide-react';
import { useServices } from '../../hooks/useSupabaseData';
import { supabase, isSupabaseConfigured } from '../../lib/supabase';
import { logActivity } from '../../hooks/useSupabaseData';

const ServicesManagement: React.FC = () => {
  const { services, loading, error, refetch } = useServices();
  const [deleting, setDeleting] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filterPopular, setFilterPopular] = useState<'all' | 'popular' | 'regular'>('all');

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete "${title}"?`)) return;
    if (!isSupabaseConfigured || !supabase) return;
    
    setDeleting(id);
    try {
      const { error } = await supabase
        .from('services')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      await logActivity('delete', 'services', id, title);
      refetch();
    } catch (err) {
      alert('Failed to delete service: ' + (err instanceof Error ? err.message : 'Unknown error'));
    } finally {
      setDeleting(null);
    }
  };

  const togglePopular = async (id: string, currentPopular: boolean, title: string) => {
    if (!isSupabaseConfigured || !supabase) return;

    try {
      const { error } = await supabase
        .from('services')
        .update({ popular: !currentPopular, updated_at: new Date().toISOString() })
        .eq('id', id);

      if (error) throw error;
      
      await logActivity('update', 'services', id, title, { popular: !currentPopular });
      refetch();
    } catch (err) {
      alert('Failed to update service: ' + (err instanceof Error ? err.message : 'Unknown error'));
    }
  };

  // Filter services
  const filteredServices = services.filter(service => {
    const matchesSearch = service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         service.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filterPopular === 'all' || 
                         (filterPopular === 'popular' && service.popular) ||
                         (filterPopular === 'regular' && !service.popular);
    
    return matchesSearch && matchesFilter;
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
        Error loading services: {error}
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Professional Header */}
      <div className="bg-card border border-border rounded-xl p-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Service Management</h1>
            <p className="text-muted-foreground">
              Manage your service offerings, pricing, and descriptions with full CRUD control
            </p>
            <div className="flex items-center gap-4 mt-3 text-sm">
              <span className="text-muted-foreground">
                Total: <span className="font-semibold text-foreground">{services.length}</span>
              </span>
              <span className="text-muted-foreground">
                Popular: <span className="font-semibold text-primary">{services.filter(s => s.popular).length}</span>
              </span>
              <span className="text-muted-foreground">
                Active: <span className="font-semibold text-primary">{services.filter(s => s.is_active).length}</span>
              </span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/services" target="_blank" rel="noopener noreferrer">
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
            <Link to="/admin/services/new">
              <motion.button
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.15 }}
                className="bg-primary text-primary-foreground px-6 py-3 rounded-xl font-medium flex items-center gap-2 hover:shadow-lg transition-all duration-150"
              >
                <Plus size={18} />
                Add New Service
              </motion.button>
            </Link>
            <div className="w-16 h-16 bg-primary rounded-xl flex items-center justify-center">
              <Briefcase size={24} className="text-primary-foreground" />
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
              placeholder="Search services, descriptions, or technologies..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-background border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all duration-150"
            />
          </div>

          {/* Filters */}
          <div className="flex items-center gap-3">
            <Filter size={18} className="text-muted-foreground" />
            <select
              value={filterPopular}
              onChange={(e) => setFilterPopular(e.target.value as 'all' | 'popular' | 'regular')}
              className="px-4 py-3 bg-background border border-border rounded-lg text-foreground focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all duration-150"
            >
              <option value="all">All Services</option>
              <option value="popular">Popular Only</option>
              <option value="regular">Regular Only</option>
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

      {/* Services Display */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              whileHover={{ y: -4, scale: 1.02 }}
              className="bg-card border border-border rounded-xl overflow-hidden hover:border-primary/30 transition-all duration-150 group"
            >
              {/* Service Image */}
              <div className="relative aspect-[16/9] overflow-hidden">
                <img
                  src={service.image || 'https://images.pexels.com/photos/7688336/pexels-photo-7688336.jpeg?auto=compress&cs=tinysrgb&w=800'}
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {service.popular && (
                  <div className="absolute top-3 left-3">
                    <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-medium shadow-lg">
                      Most Popular
                    </span>
                  </div>
                )}
                <div className="absolute top-3 right-3">
                  <span className="bg-card/90 backdrop-blur-xl text-foreground px-3 py-1 rounded-full text-xs font-medium border border-border">
                    {service.price || 'Custom Pricing'}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="font-bold text-foreground mb-2 line-clamp-1 group-hover:text-primary transition-colors duration-150">
                  {service.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2 leading-relaxed">
                  {service.description}
                </p>
                
                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {service.technologies.slice(0, 3).map((tech) => (
                    <span
                      key={tech}
                      className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                  {service.technologies.length > 3 && (
                    <span className="text-xs px-2 py-1 bg-muted/20 text-muted-foreground rounded-full">
                      +{service.technologies.length - 3}
                    </span>
                  )}
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <Link to={`/services/${service.slug}`} target="_blank" className="flex-1">
                    <button className="w-full bg-background text-foreground px-3 py-2 rounded-lg text-sm hover:bg-background/80 transition-colors duration-150 flex items-center justify-center gap-1 border border-border hover:border-primary/30">
                      <Eye size={14} />
                      View
                    </button>
                  </Link>
                  <Link to={`/admin/services/edit/${service.id}`} className="flex-1">
                    <button className="w-full bg-primary/10 text-primary px-3 py-2 rounded-lg text-sm hover:bg-primary/20 transition-colors duration-150 flex items-center justify-center gap-1">
                      <Edit size={14} />
                      Edit
                    </button>
                  </Link>
                  <button
                    onClick={() => togglePopular(service.id, service.popular, service.title)}
                    className={`p-2 rounded-lg text-sm transition-colors duration-150 ${
                      service.popular 
                        ? 'bg-primary/20 text-primary' 
                        : 'bg-muted/20 text-muted-foreground hover:text-primary hover:bg-primary/10'
                    }`}
                    title={service.popular ? 'Remove from popular' : 'Mark as popular'}
                  >
                    <Star size={14} className={service.popular ? 'fill-current' : ''} />
                  </button>
                  <button
                    onClick={() => handleDelete(service.id, service.title)}
                    disabled={deleting === service.id}
                    className="bg-destructive/10 text-destructive px-3 py-2 rounded-lg text-sm hover:bg-destructive/20 transition-colors duration-150 disabled:opacity-50 flex items-center justify-center"
                  >
                    {deleting === service.id ? (
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
                  <th className="text-left py-4 px-6 font-semibold text-foreground">Service</th>
                  <th className="text-left py-4 px-6 font-semibold text-foreground">Price</th>
                  <th className="text-left py-4 px-6 font-semibold text-foreground">Status</th>
                  <th className="text-left py-4 px-6 font-semibold text-foreground">Technologies</th>
                  <th className="text-right py-4 px-6 font-semibold text-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredServices.map((service, index) => (
                  <motion.tr
                    key={service.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2, delay: index * 0.03 }}
                    className="border-b border-border/50 hover:bg-card/30 transition-colors duration-150"
                  >
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-4">
                        <img
                          src={service.image || 'https://images.pexels.com/photos/7688336/pexels-photo-7688336.jpeg?auto=compress&cs=tinysrgb&w=800'}
                          alt={service.title}
                          className="w-12 h-12 rounded-lg object-cover border border-border"
                        />
                        <div>
                          <div className="font-medium text-foreground">{service.title}</div>
                          <div className="text-sm text-muted-foreground line-clamp-1">
                            {service.subtitle}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className="font-semibold text-primary">{service.price || 'Custom'}</span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        {service.popular && (
                          <span className="inline-flex items-center px-2 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium">
                            <Star size={12} className="mr-1 fill-current" />
                            Popular
                          </span>
                        )}
                        {service.is_active && (
                          <span className="inline-flex items-center px-2 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium">
                            <CheckCircle size={12} className="mr-1" />
                            Active
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex flex-wrap gap-1">
                        {service.technologies.slice(0, 2).map((tech) => (
                          <span
                            key={tech}
                            className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full"
                          >
                            {tech}
                          </span>
                        ))}
                        {service.technologies.length > 2 && (
                          <span className="text-xs px-2 py-1 bg-muted/20 text-muted-foreground rounded-full">
                            +{service.technologies.length - 2}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center justify-end gap-2">
                        <Link to={`/services/${service.slug}`} target="_blank">
                          <button className="p-2 text-muted-foreground hover:text-foreground hover:bg-card/50 rounded-lg transition-all duration-150">
                            <Eye size={16} />
                          </button>
                        </Link>
                        <Link to={`/admin/services/edit/${service.id}`}>
                          <button className="p-2 text-primary hover:bg-primary/10 rounded-lg transition-all duration-150">
                            <Edit size={16} />
                          </button>
                        </Link>
                        <button
                          onClick={() => togglePopular(service.id, service.popular, service.title)}
                          className={`p-2 rounded-lg transition-all duration-150 ${
                            service.popular 
                              ? 'text-primary bg-primary/10' 
                              : 'text-muted-foreground hover:text-primary hover:bg-primary/10'
                          }`}
                        >
                          <Star size={16} className={service.popular ? 'fill-current' : ''} />
                        </button>
                        <button
                          onClick={() => handleDelete(service.id, service.title)}
                          disabled={deleting === service.id}
                          className="p-2 text-destructive hover:bg-destructive/10 rounded-lg transition-all duration-150 disabled:opacity-50"
                        >
                          {deleting === service.id ? (
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
      {filteredServices.length === 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="text-center py-16 bg-card/30 border border-border rounded-xl"
        >
          <Briefcase size={48} className="text-muted-foreground mx-auto mb-4" />
          <h3 className="text-xl font-bold text-foreground mb-2">
            {searchTerm || filterPopular !== 'all' ? 'No services found' : 'No services yet'}
          </h3>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            {searchTerm || filterPopular !== 'all' 
              ? 'Try adjusting your search or filter criteria'
              : 'Start by adding your first service offering to showcase your expertise'
            }
          </p>
          {(!searchTerm && filterPopular === 'all') && (
            <Link to="/admin/services/new">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.15 }}
                className="bg-primary text-primary-foreground px-6 py-3 rounded-xl font-medium hover:shadow-lg transition-all duration-150"
              >
                Add Your First Service
              </motion.button>
            </Link>
          )}
        </motion.div>
      )}

      {/* Results Summary */}
      {(searchTerm || filterPopular !== 'all') && filteredServices.length > 0 && (
        <div className="text-center text-sm text-muted-foreground">
          Showing {filteredServices.length} of {services.length} services
        </div>
      )}
    </div>
  );
};

export default ServicesManagement;