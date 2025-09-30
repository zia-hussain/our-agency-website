import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Briefcase,
  FileText,
  BookOpen,
  MessageSquare,
  Users,
  Settings,
  TrendingUp,
  Eye,
  Plus,
  BarChart3
} from 'lucide-react';
import { useServices, useProjects, useArticles, useTestimonials, useFounders } from '../../hooks/useSupabaseData';

const AdminDashboard: React.FC = () => {
  const { services } = useServices();
  const { projects } = useProjects();
  const { articles } = useArticles();
  const { testimonials } = useTestimonials();
  const { founders } = useFounders();

  const stats = [
    {
      name: 'Services',
      value: services.length,
      icon: Briefcase,
      href: '/admin/services',
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10',
    },
    {
      name: 'Projects',
      value: projects.length,
      icon: FileText,
      href: '/admin/projects',
      color: 'text-green-500',
      bgColor: 'bg-green-500/10',
    },
    {
      name: 'Articles',
      value: articles.length,
      icon: BookOpen,
      href: '/admin/articles',
      color: 'text-purple-500',
      bgColor: 'bg-purple-500/10',
    },
    {
      name: 'Testimonials',
      value: testimonials.length,
      icon: MessageSquare,
      href: '/admin/testimonials',
      color: 'text-orange-500',
      bgColor: 'bg-orange-500/10',
    },
  ];

  const quickActions = [
    {
      name: 'Add New Service',
      href: '/admin/services/new',
      icon: Plus,
      description: 'Create a new service offering',
    },
    {
      name: 'Add New Project',
      href: '/admin/projects/new',
      icon: Plus,
      description: 'Showcase a new project',
    },
    {
      name: 'Write Article',
      href: '/admin/articles/new',
      icon: Plus,
      description: 'Publish a new blog post',
    },
    {
      name: 'View Live Site',
      href: '/',
      icon: Eye,
      description: 'See your changes live',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Welcome to Zumetrix Labs Admin
        </h1>
        <p className="text-muted-foreground">
          Manage your content and monitor your digital empire from here.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <Link to={stat.href}>
              <motion.div
                whileHover={{ y: -4, scale: 1.02 }}
                transition={{ duration: 0.15 }}
                className="bg-card/50 backdrop-blur-xl border border-border rounded-lg p-6 hover:border-primary/30 transition-all duration-150 group"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      {stat.name}
                    </p>
                    <p className="text-3xl font-bold text-foreground group-hover:text-primary transition-colors duration-150">
                      {stat.value}
                    </p>
                  </div>
                  <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                    <stat.icon size={24} className={stat.color} />
                  </div>
                </div>
              </motion.div>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-xl font-semibold text-foreground mb-6">
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action, index) => (
            <motion.div
              key={action.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <Link to={action.href}>
                <motion.div
                  whileHover={{ y: -2, scale: 1.02 }}
                  transition={{ duration: 0.15 }}
                  className="bg-card/50 backdrop-blur-xl border border-border rounded-lg p-4 hover:border-primary/30 transition-all duration-150 group"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <action.icon size={16} className="text-primary" />
                    </div>
                    <h3 className="font-medium text-foreground group-hover:text-primary transition-colors duration-150">
                      {action.name}
                    </h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {action.description}
                  </p>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div>
        <h2 className="text-xl font-semibold text-foreground mb-6">
          Content Overview
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Projects */}
          <div className="bg-card/50 backdrop-blur-xl border border-border rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-foreground">Recent Projects</h3>
              <Link to="/admin/projects" className="text-primary hover:underline text-sm">
                View all
              </Link>
            </div>
            <div className="space-y-3">
              {projects.slice(0, 3).map((project) => (
                <div key={project.id} className="flex items-center gap-3 p-3 bg-background/50 rounded-lg">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-10 h-10 rounded object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-foreground truncate">
                      {project.title}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {project.client_name}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Articles */}
          <div className="bg-card/50 backdrop-blur-xl border border-border rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-foreground">Recent Articles</h3>
              <Link to="/admin/articles" className="text-primary hover:underline text-sm">
                View all
              </Link>
            </div>
            <div className="space-y-3">
              {articles.slice(0, 3).map((article) => (
                <div key={article.id} className="flex items-center gap-3 p-3 bg-background/50 rounded-lg">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-10 h-10 rounded object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-foreground truncate">
                      {article.title}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      By {article.author}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;