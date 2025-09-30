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
  BarChart3,
  Globe,
  Star,
  Clock,
  Award,
  Activity,
  Calendar,
  DollarSign,
  Target
} from 'lucide-react';
import { useServices, useProjects, useArticles, useTestimonials, useFounders } from '../../hooks/useSupabaseData';

const AdminDashboard: React.FC = () => {
  const { services } = useServices();
  const { projects } = useProjects();
  const { articles } = useArticles();
  const { testimonials } = useTestimonials();
  const { founders } = useFounders();

  // KPI Data
  const kpiStats = [
    {
      name: 'Total Projects',
      value: projects.length,
      change: '+12%',
      changeType: 'positive',
      icon: FileText,
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10',
      description: 'Active portfolio projects'
    },
    {
      name: 'Services Offered',
      value: services.length,
      change: '+8%',
      changeType: 'positive',
      icon: Briefcase,
      color: 'text-green-500',
      bgColor: 'bg-green-500/10',
      description: 'Available service packages'
    },
    {
      name: 'Published Articles',
      value: articles.length,
      change: '+25%',
      changeType: 'positive',
      icon: BookOpen,
      color: 'text-purple-500',
      bgColor: 'bg-purple-500/10',
      description: 'Expert insights published'
    },
    {
      name: 'Client Testimonials',
      value: testimonials.length,
      change: '+15%',
      changeType: 'positive',
      icon: MessageSquare,
      color: 'text-orange-500',
      bgColor: 'bg-orange-500/10',
      description: 'Happy client reviews'
    },
  ];

  // Business Metrics
  const businessMetrics = [
    {
      name: 'Client Satisfaction',
      value: '100%',
      icon: Star,
      color: 'text-primary',
      bgColor: 'bg-primary/10',
    },
    {
      name: 'Project Success Rate',
      value: '100%',
      icon: Target,
      color: 'text-green-500',
      bgColor: 'bg-green-500/10',
    },
    {
      name: 'Avg. Response Time',
      value: '24h',
      icon: Clock,
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10',
    },
    {
      name: 'Countries Served',
      value: '6+',
      icon: Globe,
      color: 'text-purple-500',
      bgColor: 'bg-purple-500/10',
    },
  ];

  const quickActions = [
    {
      name: 'Add New Project',
      href: '/admin/projects/new',
      icon: Plus,
      description: 'Showcase your latest work',
      color: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
    },
    {
      name: 'Write Article',
      href: '/admin/articles/new',
      icon: Plus,
      description: 'Share expert insights',
      color: 'bg-purple-500/10 text-purple-500 border-purple-500/20',
    },
    {
      name: 'Add Service',
      href: '/admin/services/new',
      icon: Plus,
      description: 'Create new offering',
      color: 'bg-green-500/10 text-green-500 border-green-500/20',
    },
    {
      name: 'View Live Site',
      href: '/',
      icon: Eye,
      description: 'See your changes live',
      color: 'bg-primary/10 text-primary border-primary/20',
    },
  ];

  const recentActivity = [
    { action: 'Project updated', item: 'Ifyify AI Platform', time: '2 hours ago', type: 'project' },
    { action: 'Article published', item: 'SaaS MVP Guide', time: '1 day ago', type: 'article' },
    { action: 'Service modified', item: 'AI Automation', time: '2 days ago', type: 'service' },
    { action: 'Testimonial added', item: 'Kelly Andrews', time: '3 days ago', type: 'testimonial' },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="bg-gradient-to-r from-card/80 to-card/60 backdrop-blur-xl border border-border rounded-2xl p-8"
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-foreground mb-2">
              Welcome to Your Digital Empire
            </h1>
            <p className="text-lg text-muted-foreground">
              Manage your world-class software development agency from here
            </p>
          </div>
          <div className="hidden md:block">
            <div className="w-20 h-20 bg-gradient-to-r from-primary to-primary/80 rounded-2xl flex items-center justify-center shadow-glow">
              <BarChart3 size={32} className="text-primary-foreground" />
            </div>
          </div>
        </div>
      </motion.div>

      {/* KPI Stats Grid */}
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
          <TrendingUp size={24} className="text-primary" />
          Content Analytics
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {kpiStats.map((stat, index) => (
            <motion.div
              key={stat.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Link to={stat.href || '#'}>
                <motion.div
                  whileHover={{ y: -4, scale: 1.02 }}
                  transition={{ duration: 0.15 }}
                  className="bg-card/50 backdrop-blur-xl border border-border rounded-xl p-6 hover:border-primary/30 transition-all duration-150 group cursor-pointer"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 rounded-xl ${stat.bgColor}`}>
                      <stat.icon size={24} className={stat.color} />
                    </div>
                    <div className={`text-xs font-medium px-2 py-1 rounded-full ${
                      stat.changeType === 'positive' 
                        ? 'bg-green-500/10 text-green-500' 
                        : 'bg-red-500/10 text-red-500'
                    }`}>
                      {stat.change}
                    </div>
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-foreground group-hover:text-primary transition-colors duration-150">
                      {stat.value}
                    </p>
                    <p className="text-sm font-medium text-foreground mb-1">
                      {stat.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {stat.description}
                    </p>
                  </div>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Business Metrics */}
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
          <Award size={24} className="text-primary" />
          Business Performance
        </h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {businessMetrics.map((metric, index) => (
            <motion.div
              key={metric.name}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              whileHover={{ scale: 1.02 }}
              className="bg-card/50 backdrop-blur-xl border border-border rounded-xl p-4 hover:border-primary/30 transition-all duration-150 text-center"
            >
              <div className={`w-12 h-12 ${metric.bgColor} rounded-xl flex items-center justify-center mx-auto mb-3`}>
                <metric.icon size={20} className={metric.color} />
              </div>
              <div className="text-2xl font-bold text-foreground mb-1">
                {metric.value}
              </div>
              <div className="text-sm text-muted-foreground">
                {metric.name}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
          <Activity size={24} className="text-primary" />
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
              <Link to={action.href} target={action.href === '/' ? '_blank' : undefined}>
                <motion.div
                  whileHover={{ y: -2, scale: 1.02 }}
                  transition={{ duration: 0.15 }}
                  className={`bg-card/50 backdrop-blur-xl border border-border rounded-xl p-6 hover:border-primary/30 transition-all duration-150 group ${action.color}`}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-current/10 rounded-lg">
                      <action.icon size={18} className="text-current" />
                    </div>
                    <h3 className="font-semibold text-foreground group-hover:text-current transition-colors duration-150">
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

      {/* Content Overview Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Projects */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="bg-card/50 backdrop-blur-xl border border-border rounded-xl p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-foreground flex items-center gap-2">
              <FileText size={20} className="text-primary" />
              Recent Projects
            </h3>
            <Link to="/admin/projects" className="text-primary hover:underline text-sm font-medium">
              Manage all →
            </Link>
          </div>
          <div className="space-y-4">
            {projects.slice(0, 4).map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, delay: index * 0.05 }}
                className="flex items-center gap-4 p-4 bg-background/50 rounded-lg hover:bg-background/80 transition-colors duration-150"
              >
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-12 h-12 rounded-lg object-cover border border-border"
                />
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-foreground truncate">
                    {project.title}
                  </p>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span>{project.client_name}</span>
                    <span>•</span>
                    <span>{project.client_country}</span>
                  </div>
                </div>
                {project.featured && (
                  <div className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full font-medium">
                    Featured
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Recent Articles */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="bg-card/50 backdrop-blur-xl border border-border rounded-xl p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-foreground flex items-center gap-2">
              <BookOpen size={20} className="text-primary" />
              Recent Articles
            </h3>
            <Link to="/admin/articles" className="text-primary hover:underline text-sm font-medium">
              Manage all →
            </Link>
          </div>
          <div className="space-y-4">
            {articles.slice(0, 4).map((article, index) => (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, delay: index * 0.05 }}
                className="flex items-center gap-4 p-4 bg-background/50 rounded-lg hover:bg-background/80 transition-colors duration-150"
              >
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-12 h-12 rounded-lg object-cover border border-border"
                />
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-foreground truncate">
                    {article.title}
                  </p>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span>By {article.author}</span>
                    <span>•</span>
                    <span>{article.category}</span>
                  </div>
                </div>
                {article.featured && (
                  <div className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full font-medium">
                    Featured
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Recent Activity & System Status */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
          className="lg:col-span-2 bg-card/50 backdrop-blur-xl border border-border rounded-xl p-6"
        >
          <h3 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
            <Activity size={20} className="text-primary" />
            Recent Activity
          </h3>
          <div className="space-y-4">
            {[
              { action: 'Project updated', item: 'Ifyify AI Platform', time: '2 hours ago', type: 'project', icon: FileText },
              { action: 'Article published', item: 'SaaS MVP Guide', time: '1 day ago', type: 'article', icon: BookOpen },
              { action: 'Service modified', item: 'AI Automation', time: '2 days ago', type: 'service', icon: Briefcase },
              { action: 'Testimonial added', item: 'Kelly Andrews', time: '3 days ago', type: 'testimonial', icon: MessageSquare },
              { action: 'Settings updated', item: 'Site Configuration', time: '1 week ago', type: 'settings', icon: Settings },
            ].map((activity, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2, delay: index * 0.05 }}
                className="flex items-center gap-4 p-4 bg-background/30 rounded-lg hover:bg-background/50 transition-colors duration-150"
              >
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <activity.icon size={16} className="text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">
                    {activity.action}: <span className="text-primary">{activity.item}</span>
                  </p>
                  <p className="text-xs text-muted-foreground">{activity.time}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* System Status */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.5 }}
          className="bg-card/50 backdrop-blur-xl border border-border rounded-xl p-6"
        >
          <h3 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
            <Globe size={20} className="text-primary" />
            System Status
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm font-medium text-foreground">Website</span>
              </div>
              <span className="text-xs text-green-500 font-medium">Online</span>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm font-medium text-foreground">Database</span>
              </div>
              <span className="text-xs text-green-500 font-medium">Connected</span>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-foreground">Analytics</span>
              </div>
              <span className="text-xs text-blue-500 font-medium">Tracking</span>
            </div>

            <div className="mt-6 p-4 bg-primary/5 border border-primary/20 rounded-lg">
              <div className="text-sm font-medium text-foreground mb-2">Quick Stats</div>
              <div className="space-y-2 text-xs text-muted-foreground">
                <div className="flex justify-between">
                  <span>Last backup:</span>
                  <span className="text-primary">2 hours ago</span>
                </div>
                <div className="flex justify-between">
                  <span>Uptime:</span>
                  <span className="text-green-500">99.9%</span>
                </div>
                <div className="flex justify-between">
                  <span>Storage used:</span>
                  <span className="text-foreground">2.3 GB</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Content Management Shortcuts */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.6 }}
        className="bg-card/50 backdrop-blur-xl border border-border rounded-xl p-6"
      >
        <h3 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
          <Settings size={20} className="text-primary" />
          Content Management Shortcuts
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { name: 'Edit Homepage', href: '/admin/home-content', icon: Home, desc: 'Hero, services, testimonials' },
            { name: 'Manage Navigation', href: '/admin/navigation', icon: NavigationIcon, desc: 'Menu links & footer' },
            { name: 'Update FAQs', href: '/admin/faqs', icon: MessageSquare, desc: 'Page-specific questions' },
            { name: 'Site Settings', href: '/admin/settings', icon: Settings, desc: 'Global configuration' },
            { name: 'SEO Settings', href: '/admin/seo', icon: TrendingUp, desc: 'Meta tags & analytics' },
            { name: 'View Analytics', href: '/admin/analytics', icon: BarChart3, desc: 'Performance metrics' },
          ].map((shortcut, index) => (
            <motion.div
              key={shortcut.name}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.2, delay: index * 0.03 }}
            >
              <Link to={shortcut.href}>
                <motion.div
                  whileHover={{ scale: 1.02, y: -2 }}
                  transition={{ duration: 0.15 }}
                  className="p-4 bg-background/30 border border-border rounded-lg hover:border-primary/30 hover:bg-background/50 transition-all duration-150 group"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <shortcut.icon size={16} className="text-primary" />
                    <span className="font-medium text-foreground group-hover:text-primary transition-colors duration-150">
                      {shortcut.name}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {shortcut.desc}
                  </p>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default AdminDashboard;