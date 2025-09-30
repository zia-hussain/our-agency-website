import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Plus, CreditCard as Edit, Trash2, Eye, Star } from 'lucide-react';
import { useServices } from '../../hooks/useSupabaseData';
import { supabase } from '../../lib/supabase';

const ServiceManagement: React.FC = () => {
  const { services, loading, error, refetch } = useServices();
  const [deleting, setDeleting] = useState<string | null>(null);

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete "${title}"?`)) return;
    
    setDeleting(id);
    try {
      const { error } = await supabase
        .from('services')
        .delete()
        .eq('id', id);

      if (error) throw error;
      refetch();
    } catch (err) {
      alert('Failed to delete service: ' + (err instanceof Error ? err.message : 'Unknown error'));
    } finally {
      setDeleting(null);
    }
  };

  const togglePopular = async (id: string, currentPopular: boolean) => {
    try {
      const { error } = await supabase
        .from('services')
        .update({ popular: !currentPopular })
        .eq('id', id);

      if (error) throw error;
      refetch();
    } catch (err) {
      alert('Failed to update service: ' + (err instanceof Error ? err.message : 'Unknown error'));
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
        Error loading services: {error}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Services</h1>
          <p className="text-muted-foreground">
            Manage your service offerings and pricing
          </p>
        </div>
        <Link to="/admin/services/new">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.15 }}
            className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground px-4 py-2 rounded-lg font-medium flex items-center gap-2 hover:shadow-glow"
          >
            <Plus size={18} />
            Add Service
          </motion.button>
        </Link>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service, index) => (
          <motion.div
            key={service.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            className="bg-card/50 backdrop-blur-xl border border-border rounded-lg overflow-hidden hover:border-primary/30 transition-all duration-150"
          >
            {/* Service Image */}
            <div className="relative aspect-[16/9] overflow-hidden">
              <img
                src={service.image}
                alt={service.title}
                className="w-full h-full object-cover"
              />
              {service.popular && (
                <div className="absolute top-2 left-2">
                  <span className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground px-2 py-1 rounded-full text-xs font-medium">
                    Popular
                  </span>
                </div>
              )}
            </div>

            {/* Content */}
            <div className="p-6">
              <h3 className="font-semibold text-foreground mb-2 line-clamp-1">
                {service.title}
              </h3>
              <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                {service.description}
              </p>
              
              <div className="flex items-center justify-between mb-4">
                <span className="text-lg font-bold text-primary">
                  {service.price}
                </span>
                <button
                  onClick={() => togglePopular(service.id, service.popular)}
                  className={`p-1 rounded ${
                    service.popular ? 'text-primary' : 'text-muted-foreground hover:text-primary'
                  }`}
                  title={service.popular ? 'Remove from popular' : 'Mark as popular'}
                >
                  <Star size={16} className={service.popular ? 'fill-current' : ''} />
                </button>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <Link to={`/services/${service.slug}`} target="_blank" className="flex-1">
                  <button className="w-full bg-background/50 text-foreground px-3 py-2 rounded text-sm hover:bg-background/80 transition-colors duration-150 flex items-center justify-center gap-1">
                    <Eye size={14} />
                    View
                  </button>
                </Link>
                <Link to={`/admin/services/edit/${service.id}`} className="flex-1">
                  <button className="w-full bg-primary/10 text-primary px-3 py-2 rounded text-sm hover:bg-primary/20 transition-colors duration-150 flex items-center justify-center gap-1">
                    <Edit size={14} />
                    Edit
                  </button>
                </Link>
                <button
                  onClick={() => handleDelete(service.id, service.title)}
                  disabled={deleting === service.id}
                  className="bg-destructive/10 text-destructive px-3 py-2 rounded text-sm hover:bg-destructive/20 transition-colors duration-150 disabled:opacity-50 flex items-center justify-center"
                >
                  {deleting === service.id ? (
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
      {services.length === 0 && (
        <div className="text-center py-12">
          <Briefcase size={48} className="text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-foreground mb-2">
            No services yet
          </h3>
          <p className="text-muted-foreground mb-6">
            Start by adding your first service offering
          </p>
          <Link to="/admin/services/new">
            <button className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground px-6 py-3 rounded-lg font-medium">
              Add Your First Service
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default ServiceManagement;