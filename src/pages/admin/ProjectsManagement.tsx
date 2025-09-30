import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Plus, CreditCard as Edit, Trash2, Eye, Star, Search, Filter, Grid2x2 as Grid, List, FileText, MapPin, Calendar, Building, CheckCircle, AlertCircle } from 'lucide-react';
import { useProjects } from '../../hooks/useSupabaseData';
import { supabase, isSupabaseConfigured } from '../../lib/supabase';
import { logActivity } from '../../hooks/useSupabaseData';

const ProjectsManagement: React.FC = () => {
  const { projects, loading, error, refetch } = useProjects();
  const [deleting, setDeleting] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filterFeatured, setFilterFeatured] = useState<'all' | 'featured' | 'regular'>('all');
  const [filterCategory, setFilterCategory] = useState<string>('all');

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete "${title}"?`)) return;
    if (!isSupabaseConfigured || !supabase) return;
    
    setDeleting(id);
    try {
      const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      await logActivity('delete', 'projects', id, title);
      refetch();
    } catch (err) {
      alert('Failed to delete project: ' + (err instanceof Error ? err.message : 'Unknown error'));
    } finally {
      setDeleting(null);
    }
  };

  const toggleFeatured = async (id: string, currentFeatured: boolean, title: string) => {
    if (!isSupabaseConfigured || !supabase) return;

    try {
      const { error } = await supabase
        .from('projects')
        .update({ featured: !currentFeatured, updated_at: new Date().toISOString() })
        .eq('id', id);

      if (error) throw error;
      
      await logActivity('update', 'projects', id, title, { featured: !currentFeatured });
      refetch();
    } catch (err) {
      alert('Failed to update project: ' + (err instanceof Error ? err.message : 'Unknown error'));
    }
  };

  // Get unique categories
  const categories = ['all', ...Array.from(new Set(projects.map(p => p.category)))];

  // Filter projects
  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.client_name.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFeatured = filterFeatured === 'all' || 
                           (filterFeatured === 'featured' && project.featured) ||
                           (filterFeatured === 'regular' && !project.featured);
    
    const matchesCategory = filterCategory === 'all' || project.category === filterCategory;
    
    return matchesSearch && matchesFeatured && matchesCategory;
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
        Error loading projects: {error}
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Professional Header */}
      <div className="bg-card border border-border rounded-xl p-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Project Portfolio Management</h1>
            <p className="text-muted-foreground">
              Manage your case studies and showcase your best work with full CRUD control
            </p>
            <div className="flex items-center gap-4 mt-3 text-sm">
              <span className="text-muted-foreground">
                Total: <span className="font-semibold text-foreground">{projects.length}</span>
              </span>
              <span className="text-muted-foreground">
                Featured: <span className="font-semibold text-primary">{projects.filter(p => p.featured).length}</span>
              </span>
              <span className="text-muted-foreground">
                Categories: <span className="font-semibold text-foreground">{categories.length - 1}</span>
              </span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/portfolio" target="_blank" rel="noopener noreferrer">
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
            <Link to="/admin/projects/new">
              <motion.button
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.15 }}
                className="bg-primary text-primary-foreground px-6 py-3 rounded-xl font-medium flex items-center gap-2 hover:shadow-lg transition-all duration-150"
              >
                <Plus size={18} />
                Add New Project
              </motion.button>
            </Link>
            <div className="w-16 h-16 bg-primary rounded-xl flex items-center justify-center">
              <FileText size={24} className="text-primary-foreground" />
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
              placeholder="Search projects, clients, or descriptions..."
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
              <option value="all">All Projects</option>
              <option value="featured">Featured Only</option>
              <option value="regular">Regular Only</option>
            </select>

            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="px-4 py-3 bg-background border border-border rounded-lg text-foreground focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all duration-150"
            >
              <option value="all">All Categories</option>
              {categories.slice(1).map((category) => (
                <option key={category} value={category}>{category}</option>
              ))}
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

      {/* Projects Display */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              whileHover={{ y: -4, scale: 1.02 }}
              className="bg-card border border-border rounded-xl overflow-hidden hover:border-primary/30 transition-all duration-150 group"
            >
              {/* Project Image */}
              <div className="relative aspect-[16/9] overflow-hidden">
                <img
                  src={project.image || 'https://images.pexels.com/photos/7688336/pexels-photo-7688336.jpeg?auto=compress&cs=tinysrgb&w=800'}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {project.featured && (
                  <div className="absolute top-3 left-3">
                    <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-medium shadow-lg">
                      Featured
                    </span>
                  </div>
                )}
                <div className="absolute top-3 right-3">
                  <span className="bg-card/90 backdrop-blur-xl text-foreground px-3 py-1 rounded-full text-xs font-medium border border-border">
                    {project.category}
                  </span>
                </div>
                <div className="absolute bottom-3 left-3">
                  <div className="flex items-center gap-1 bg-card/90 backdrop-blur-xl text-foreground px-2 py-1 rounded-full text-xs border border-border">
                    <MapPin size={10} />
                    {project.client_country}
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="font-bold text-foreground mb-2 line-clamp-1 group-hover:text-primary transition-colors duration-150">
                  {project.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2 leading-relaxed">
                  {project.description}
                </p>
                
                {/* Client & Duration */}
                <div className="grid grid-cols-2 gap-4 mb-4 text-xs">
                  <div className="flex items-center gap-1">
                    <Building size={12} className="text-primary" />
                    <span className="text-muted-foreground truncate">
                      {project.client_name}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar size={12} className="text-primary" />
                    <span className="text-muted-foreground">
                      {project.duration}
                    </span>
                  </div>
                </div>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.stack.slice(0, 3).map((tech) => (
                    <span
                      key={tech}
                      className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.stack.length > 3 && (
                    <span className="text-xs px-2 py-1 bg-muted/20 text-muted-foreground rounded-full">
                      +{project.stack.length - 3}
                    </span>
                  )}
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <Link to={`/portfolio/${project.slug}`} target="_blank" className="flex-1">
                    <button className="w-full bg-background text-foreground px-3 py-2 rounded-lg text-sm hover:bg-background/80 transition-colors duration-150 flex items-center justify-center gap-1 border border-border hover:border-primary/30">
                      <Eye size={14} />
                      View
                    </button>
                  </Link>
                  <Link to={`/admin/projects/edit/${project.id}`} className="flex-1">
                    <button className="w-full bg-primary/10 text-primary px-3 py-2 rounded-lg text-sm hover:bg-primary/20 transition-colors duration-150 flex items-center justify-center gap-1">
                      <Edit size={14} />
                      Edit
                    </button>
                  </Link>
                  <button
                    onClick={() => toggleFeatured(project.id, project.featured, project.title)}
                    className={`p-2 rounded-lg text-sm transition-colors duration-150 ${
                      project.featured 
                        ? 'bg-primary/20 text-primary' 
                        : 'bg-muted/20 text-muted-foreground hover:text-primary hover:bg-primary/10'
                    }`}
                    title={project.featured ? 'Remove from featured' : 'Mark as featured'}
                  >
                    <Star size={14} className={project.featured ? 'fill-current' : ''} />
                  </button>
                  <button
                    onClick={() => handleDelete(project.id, project.title)}
                    disabled={deleting === project.id}
                    className="bg-destructive/10 text-destructive px-3 py-2 rounded-lg text-sm hover:bg-destructive/20 transition-colors duration-150 disabled:opacity-50 flex items-center justify-center"
                  >
                    {deleting === project.id ? (
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
                  <th className="text-left py-4 px-6 font-semibold text-foreground">Project</th>
                  <th className="text-left py-4 px-6 font-semibold text-foreground">Client</th>
                  <th className="text-left py-4 px-6 font-semibold text-foreground">Category</th>
                  <th className="text-left py-4 px-6 font-semibold text-foreground">Status</th>
                  <th className="text-left py-4 px-6 font-semibold text-foreground">Year</th>
                  <th className="text-right py-4 px-6 font-semibold text-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProjects.map((project, index) => (
                  <motion.tr
                    key={project.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2, delay: index * 0.03 }}
                    className="border-b border-border/50 hover:bg-card/30 transition-colors duration-150"
                  >
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-4">
                        <img
                          src={project.image || 'https://images.pexels.com/photos/7688336/pexels-photo-7688336.jpeg?auto=compress&cs=tinysrgb&w=800'}
                          alt={project.title}
                          className="w-12 h-12 rounded-lg object-cover border border-border"
                        />
                        <div>
                          <div className="font-medium text-foreground line-clamp-1">{project.title}</div>
                          <div className="text-sm text-muted-foreground line-clamp-1">
                            {project.description}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div>
                        <div className="font-medium text-foreground">{project.client_name}</div>
                        <div className="text-sm text-muted-foreground flex items-center gap-1">
                          <MapPin size={12} />
                          {project.client_country}
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className="inline-flex items-center px-2 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium">
                        {project.category}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        {project.featured && (
                          <span className="inline-flex items-center px-2 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium">
                            <Star size={12} className="mr-1 fill-current" />
                            Featured
                          </span>
                        )}
                        {project.is_active && (
                          <span className="inline-flex items-center px-2 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium">
                            <CheckCircle size={12} className="mr-1" />
                            Active
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className="text-sm text-muted-foreground">{project.year}</span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center justify-end gap-2">
                        <Link to={`/portfolio/${project.slug}`} target="_blank">
                          <button className="p-2 text-muted-foreground hover:text-foreground hover:bg-card/50 rounded-lg transition-all duration-150">
                            <Eye size={16} />
                          </button>
                        </Link>
                        <Link to={`/admin/projects/edit/${project.id}`}>
                          <button className="p-2 text-primary hover:bg-primary/10 rounded-lg transition-all duration-150">
                            <Edit size={16} />
                          </button>
                        </Link>
                        <button
                          onClick={() => toggleFeatured(project.id, project.featured, project.title)}
                          className={`p-2 rounded-lg transition-all duration-150 ${
                            project.featured 
                              ? 'text-primary bg-primary/10' 
                              : 'text-muted-foreground hover:text-primary hover:bg-primary/10'
                          }`}
                        >
                          <Star size={16} className={project.featured ? 'fill-current' : ''} />
                        </button>
                        <button
                          onClick={() => handleDelete(project.id, project.title)}
                          disabled={deleting === project.id}
                          className="p-2 text-destructive hover:bg-destructive/10 rounded-lg transition-all duration-150 disabled:opacity-50"
                        >
                          {deleting === project.id ? (
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
      {filteredProjects.length === 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="text-center py-16 bg-card/30 border border-border rounded-xl"
        >
          <FileText size={48} className="text-muted-foreground mx-auto mb-4" />
          <h3 className="text-xl font-bold text-foreground mb-2">
            {searchTerm || filterFeatured !== 'all' || filterCategory !== 'all' ? 'No projects found' : 'No projects yet'}
          </h3>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            {searchTerm || filterFeatured !== 'all' || filterCategory !== 'all'
              ? 'Try adjusting your search or filter criteria'
              : 'Start by adding your first project to showcase your expertise'
            }
          </p>
          {(!searchTerm && filterFeatured === 'all' && filterCategory === 'all') && (
            <Link to="/admin/projects/new">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.15 }}
                className="bg-primary text-primary-foreground px-6 py-3 rounded-xl font-medium hover:shadow-lg transition-all duration-150"
              >
                Add Your First Project
              </motion.button>
            </Link>
          )}
        </motion.div>
      )}

      {/* Results Summary */}
      {(searchTerm || filterFeatured !== 'all' || filterCategory !== 'all') && filteredProjects.length > 0 && (
        <div className="text-center text-sm text-muted-foreground">
          Showing {filteredProjects.length} of {projects.length} projects
        </div>
      )}
    </div>
  );
};

export default ProjectsManagement;