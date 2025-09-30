import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Plus, Edit, Trash2, Eye, Star, MapPin, Calendar } from 'lucide-react';
import { useProjects } from '../../hooks/useSupabaseData';
import { supabase } from '../../lib/supabase';

const ProjectManagement: React.FC = () => {
  const { projects, loading, error, refetch } = useProjects();
  const [deleting, setDeleting] = useState<number | null>(null);

  const handleDelete = async (id: number, title: string) => {
    if (!confirm(`Are you sure you want to delete "${title}"?`)) return;
    
    setDeleting(id);
    try {
      const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', id);

      if (error) throw error;
      refetch();
    } catch (err) {
      alert('Failed to delete project: ' + (err instanceof Error ? err.message : 'Unknown error'));
    } finally {
      setDeleting(null);
    }
  };

  const toggleFeatured = async (id: number, currentFeatured: boolean) => {
    try {
      const { error } = await supabase
        .from('projects')
        .update({ featured: !currentFeatured })
        .eq('id', id);

      if (error) throw error;
      refetch();
    } catch (err) {
      alert('Failed to update project: ' + (err instanceof Error ? err.message : 'Unknown error'));
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
        Error loading projects: {error}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Projects</h1>
          <p className="text-muted-foreground">
            Manage your portfolio and case studies
          </p>
        </div>
        <Link to="/admin/projects/new">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.15 }}
            className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground px-4 py-2 rounded-lg font-medium flex items-center gap-2 hover:shadow-glow"
          >
            <Plus size={18} />
            Add Project
          </motion.button>
        </Link>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            className="bg-card/50 backdrop-blur-xl border border-border rounded-lg overflow-hidden hover:border-primary/30 transition-all duration-150"
          >
            {/* Project Image */}
            <div className="relative aspect-[16/9] overflow-hidden">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover"
              />
              {project.featured && (
                <div className="absolute top-2 left-2">
                  <span className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground px-2 py-1 rounded-full text-xs font-medium">
                    Featured
                  </span>
                </div>
              )}
              <div className="absolute top-2 right-2">
                <span className="bg-card/80 backdrop-blur-xl text-foreground px-2 py-1 rounded-full text-xs font-medium border border-border">
                  {project.category}
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              <h3 className="font-semibold text-foreground mb-2 line-clamp-1">
                {project.title}
              </h3>
              <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                {project.description}
              </p>
              
              {/* Client Info */}
              <div className="grid grid-cols-2 gap-4 mb-4 text-xs">
                <div className="flex items-center gap-1">
                  <MapPin size={12} className="text-primary" />
                  <span className="text-muted-foreground truncate">
                    {project.client_country}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar size={12} className="text-primary" />
                  <span className="text-muted-foreground">
                    {project.year}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-medium text-foreground">
                  {project.client_name}
                </span>
                <button
                  onClick={() => toggleFeatured(project.id, project.featured)}
                  className={`p-1 rounded ${
                    project.featured ? 'text-primary' : 'text-muted-foreground hover:text-primary'
                  }`}
                  title={project.featured ? 'Remove from featured' : 'Mark as featured'}
                >
                  <Star size={16} className={project.featured ? 'fill-current' : ''} />
                </button>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <Link to={`/portfolio/${project.slug}`} target="_blank" className="flex-1">
                  <button className="w-full bg-background/50 text-foreground px-3 py-2 rounded text-sm hover:bg-background/80 transition-colors duration-150 flex items-center justify-center gap-1">
                    <Eye size={14} />
                    View
                  </button>
                </Link>
                <Link to={`/admin/projects/edit/${project.id}`} className="flex-1">
                  <button className="w-full bg-primary/10 text-primary px-3 py-2 rounded text-sm hover:bg-primary/20 transition-colors duration-150 flex items-center justify-center gap-1">
                    <Edit size={14} />
                    Edit
                  </button>
                </Link>
                <button
                  onClick={() => handleDelete(project.id, project.title)}
                  disabled={deleting === project.id}
                  className="bg-destructive/10 text-destructive px-3 py-2 rounded text-sm hover:bg-destructive/20 transition-colors duration-150 disabled:opacity-50 flex items-center justify-center"
                >
                  {deleting === project.id ? (
                    <div className="w-4 h-4 border border-destructive/30 border-t-destructive rounded-full animate-spin" />
                  ) : (
                    <Trash2 size={14} />
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Empty State */}
      {projects.length === 0 && (
        <div className="text-center py-12">
          <FileText size={48} className="text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-foreground mb-2">
            No projects yet
          </h3>
          <p className="text-muted-foreground mb-6">
            Start by adding your first project to showcase your work
          </p>
          <Link to="/admin/projects/new">
            <button className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground px-6 py-3 rounded-lg font-medium">
              Add Your First Project
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default ProjectManagement;