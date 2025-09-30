import React, { useState } from 'react';
import { Link, useLocation, Outlet } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  Settings,
  FileText,
  Briefcase,
  Users,
  MessageSquare,
  BookOpen,
  LogOut,
  Menu,
  X,
  Bell,
  User,
  ChevronDown,
  Home,
  Info,
  Phone,
  Eye,
  Globe,
  Navigation as NavigationIcon,
  HelpCircle,
  AlignEndHorizontal as FooterIcon,
  Search,
  Plus
} from 'lucide-react';
import { supabase } from '../../lib/supabase';

const AdminLayout: React.FC = () => {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    window.location.href = '/admin/login';
  };

  const navigation = [
    { 
      name: 'Dashboard', 
      href: '/admin', 
      icon: LayoutDashboard,
      description: 'Overview & Analytics'
    },
    { 
      name: 'Home Page', 
      href: '/admin/home-content', 
      icon: Home,
      description: 'Hero, Services, CTA sections'
    },
    { 
      name: 'About Page', 
      href: '/admin/about-content', 
      icon: Info,
      description: 'Company story & founders'
    },
    { 
      name: 'Services', 
      href: '/admin/services', 
      icon: Briefcase,
      description: 'Service offerings & pricing'
    },
    { 
      name: 'Portfolio', 
      href: '/admin/projects', 
      icon: FileText,
      description: 'Project case studies'
    },
    { 
      name: 'Articles', 
      href: '/admin/articles', 
      icon: BookOpen,
      description: 'Blog posts & insights'
    },
    { 
      name: 'Contact Page', 
      href: '/admin/contact-content', 
      icon: Phone,
      description: 'Contact info & forms'
    },
    { 
      name: 'Testimonials', 
      href: '/admin/testimonials', 
      icon: MessageSquare,
      description: 'Client feedback'
    },
    { 
      name: 'Founders', 
      href: '/admin/founders', 
      icon: Users,
      description: 'Founder profiles'
    },
    { 
      name: 'Navigation', 
      href: '/admin/navigation', 
      icon: NavigationIcon,
      description: 'Menu & navigation links'
    },
    { 
      name: 'Footer', 
      href: '/admin/footer', 
      icon: FooterIcon,
      description: 'Footer content & links'
    },
    { 
      name: 'FAQs', 
      href: '/admin/faqs', 
      icon: HelpCircle,
      description: 'Page-specific FAQs'
    },
    { 
      name: 'Site Settings', 
      href: '/admin/settings', 
      icon: Settings,
      description: 'Global configuration'
    },
  ];

  const isActive = (path: string) => {
    if (path === '/admin') {
      return location.pathname === '/admin';
    }
    return location.pathname.startsWith(path);
  };

  // Mock notifications for now
  const notifications = [
    { id: 1, message: "New contact form submission", time: "2 min ago", unread: true },
    { id: 2, message: "Project updated successfully", time: "1 hour ago", unread: false },
    { id: 3, message: "Article published", time: "3 hours ago", unread: false },
  ];

  const unreadCount = notifications.filter(n => n.unread).length;

  return (
    <div className="min-h-screen bg-background flex">
      {/* Mobile sidebar backdrop */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar - PROFESSIONAL FIXED DESIGN */}
      <motion.div
        initial={false}
        animate={{ x: sidebarOpen ? 0 : '-100%' }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="fixed inset-y-0 left-0 z-50 w-80 bg-card border-r border-border lg:translate-x-0 lg:static lg:inset-0 shadow-2xl"
      >
        <div className="flex flex-col h-full">
          {/* PREMIUM LOGO SECTION */}
          <div className="flex items-center justify-between h-20 px-6 border-b border-border bg-card/50">
            <div className="flex items-center space-x-3 group">
              <motion.img
                whileHover={{ scale: 1.05, rotate: 2 }}
                transition={{ duration: 0.15 }}
                src="/Zumetrix_Labs_Logo (7).png"
                alt="Zumetrix Labs"
                className="h-12 w-12"
              />
              <div>
                <span className="font-bold text-foreground text-lg group-hover:text-primary transition-colors duration-150">
                  Zumetrix Labs
                </span>
                <div className="text-xs text-muted-foreground">Content Management</div>
              </div>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden text-muted-foreground hover:text-foreground p-2 rounded-lg hover:bg-card/50 transition-all duration-150"
            >
              <X size={20} />
            </button>
          </div>

          {/* NAVIGATION - CLEAN & ORGANIZED */}
          <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
            {navigation.map((item) => (
              <motion.div
                key={item.name}
                whileHover={{ x: 4 }}
                transition={{ duration: 0.15 }}
              >
                <Link
                  to={item.href}
                  className={`group flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-150 ${
                    isActive(item.href)
                      ? 'bg-primary text-primary-foreground shadow-lg'
                      : 'text-muted-foreground hover:text-foreground hover:bg-card/70'
                  }`}
                >
                  <item.icon 
                    size={18} 
                    className={`mr-3 ${
                      isActive(item.href) 
                        ? 'text-primary-foreground' 
                        : 'text-primary'
                    }`} 
                  />
                  <div className="flex-1">
                    <div className="font-medium">{item.name}</div>
                    <div className={`text-xs ${
                      isActive(item.href) 
                        ? 'text-primary-foreground/80' 
                        : 'text-muted-foreground/70'
                    }`}>
                      {item.description}
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </nav>

          {/* QUICK ACTIONS FOOTER */}
          <div className="p-4 border-t border-border bg-card/30">
            <div className="space-y-2">
              <Link to="/" target="_blank">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.15 }}
                  className="w-full flex items-center px-4 py-3 text-sm font-medium text-muted-foreground hover:text-primary hover:bg-card/50 rounded-lg transition-all duration-150 group"
                >
                  <Eye size={16} className="mr-3 text-primary" />
                  <span>View Live Site</span>
                  <Globe size={14} className="ml-auto opacity-50 group-hover:opacity-100" />
                </motion.button>
              </Link>
              
              <motion.button
                onClick={handleSignOut}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.15 }}
                className="w-full flex items-center px-4 py-3 text-sm font-medium text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-lg transition-all duration-150 group"
              >
                <LogOut size={16} className="mr-3 text-destructive" />
                <span>Sign Out</span>
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* PROFESSIONAL HEADER BAR */}
        <header className="h-20 bg-card border-b border-border flex items-center justify-between px-6 shadow-lg sticky top-0 z-30">
          {/* Left side - Mobile menu + Current page info */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden text-muted-foreground hover:text-foreground p-2 rounded-lg hover:bg-card/50 transition-all duration-150"
            >
              <Menu size={20} />
            </button>
            
            <div>
              <h1 className="text-xl font-bold text-foreground">
                {navigation.find(nav => isActive(nav.href))?.name || 'Dashboard'}
              </h1>
              <p className="text-sm text-muted-foreground">
                {navigation.find(nav => isActive(nav.href))?.description || 'Manage your content'}
              </p>
            </div>
          </div>

          {/* Right side - Search, Notifications, User Menu */}
          <div className="flex items-center gap-4">
            {/* Global Search */}
            <div className="hidden md:block relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search content..."
                className="w-64 pl-10 pr-4 py-2 bg-background border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all duration-150 text-sm"
              />
            </div>

            {/* Quick Add Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.15 }}
              className="bg-primary text-primary-foreground p-2 rounded-lg hover:shadow-lg transition-all duration-150"
              title="Quick Add"
            >
              <Plus size={18} />
            </motion.button>

            {/* Notifications */}
            <div className="relative">
              <motion.button
                onClick={() => setNotificationsOpen(!notificationsOpen)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.15 }}
                className="relative p-2 text-muted-foreground hover:text-foreground rounded-lg hover:bg-card/50 transition-all duration-150"
              >
                <Bell size={20} />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-primary-foreground text-xs rounded-full flex items-center justify-center font-medium">
                    {unreadCount}
                  </span>
                )}
              </motion.button>

              {/* Notifications Dropdown */}
              <AnimatePresence>
                {notificationsOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 top-12 w-80 bg-card border border-border rounded-xl shadow-2xl z-50"
                  >
                    <div className="p-4 border-b border-border">
                      <h3 className="font-semibold text-foreground">Notifications</h3>
                    </div>
                    <div className="max-h-64 overflow-y-auto">
                      {notifications.map((notification) => (
                        <div
                          key={notification.id}
                          className={`p-4 border-b border-border/50 hover:bg-card/50 transition-colors duration-150 ${
                            notification.unread ? 'bg-primary/5' : ''
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            {notification.unread && (
                              <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                            )}
                            <div className="flex-1">
                              <p className="text-sm text-foreground">{notification.message}</p>
                              <p className="text-xs text-muted-foreground mt-1">{notification.time}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="p-4 text-center">
                      <button className="text-sm text-primary hover:underline">
                        View all notifications
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* User Menu */}
            <div className="relative">
              <motion.button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.15 }}
                className="flex items-center gap-3 p-2 text-muted-foreground hover:text-foreground rounded-lg hover:bg-card/50 transition-all duration-150"
              >
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                  <User size={16} className="text-primary-foreground" />
                </div>
                <div className="hidden sm:block text-left">
                  <div className="text-sm font-medium text-foreground">Admin</div>
                  <div className="text-xs text-muted-foreground">Zumetrix Labs</div>
                </div>
                <ChevronDown size={16} className="hidden sm:block" />
              </motion.button>

              {/* User Dropdown */}
              <AnimatePresence>
                {userMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 top-12 w-56 bg-card border border-border rounded-xl shadow-2xl z-50"
                  >
                    <div className="p-4 border-b border-border">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                          <User size={18} className="text-primary-foreground" />
                        </div>
                        <div>
                          <div className="font-medium text-foreground">Admin User</div>
                          <div className="text-sm text-muted-foreground">Administrator</div>
                        </div>
                      </div>
                    </div>
                    <div className="p-2">
                      <Link to="/" target="_blank">
                        <button className="w-full flex items-center px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-card/50 rounded-lg transition-all duration-150">
                          <Eye size={16} className="mr-3" />
                          View Live Site
                        </button>
                      </Link>
                      <button
                        onClick={handleSignOut}
                        className="w-full flex items-center px-3 py-2 text-sm text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-lg transition-all duration-150"
                      >
                        <LogOut size={16} className="mr-3" />
                        Sign Out
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </header>

        {/* PAGE CONTENT - SMOOTH TRANSITIONS */}
        <main className="flex-1 p-6 overflow-auto bg-background/50">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <Outlet />
          </motion.div>
        </main>
      </div>

      {/* Click outside handlers */}
      {(userMenuOpen || notificationsOpen) && (
        <div
          className="fixed inset-0 z-20"
          onClick={() => {
            setUserMenuOpen(false);
            setNotificationsOpen(false);
          }}
        />
      )}
    </div>
  );
};

export default AdminLayout;