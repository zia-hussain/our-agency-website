import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { SITE_CONFIG } from "../../config/site";

const Navigation: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  // Check if current path matches nav item (including nested routes)
  const isActiveRoute = (path: string) => {
    if (path === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(path);
  };

  const navItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Services", path: "/services" },
    { name: "Portfolio", path: "/portfolio" },
    { name: "Articles", path: "/articles" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        isScrolled
          ? "bg-[#0C0C0C]/95 backdrop-blur-xl border-b border-[#1E1E1E]/60 shadow-2xl"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0 group">
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.12 }}
              className="flex items-center"
            >
              <img
                className="h-8 lg:h-10 w-auto"
                src="/Zumetrix_Labs_Logo (7).png"
                alt={SITE_CONFIG.company.name}
              />
            </motion.div>
          </Link>

          {/* Desktop Navigation - Rounded Style */}
          <div className="hidden lg:block">
            <div className="bg-[#131313]/80 backdrop-blur-xl border border-[#1E1E1E]/60 rounded-full px-2 py-2 shadow-lg">
              <div className="flex items-center space-x-1">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    className="relative group"
                  >
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      transition={{ duration: 0.12 }}
                      className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-140 ${
                        isActiveRoute(item.path)
                          ? "bg-gradient-to-r from-primary to-primary/80 text-primary-foreground shadow-[0_0_20px_rgba(196,138,100,0.3)]"
                          : "text-[#B6B6B6] hover:text-primary hover:bg-[#131313]/80"
                      }`}
                    >
                      {item.name}
                    </motion.div>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <div className="hidden lg:block">
            <Link to="/contact">
              <motion.button
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.12 }}
                className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground px-6 py-3 rounded-full font-medium 
                         hover:shadow-[0_0_20px_rgba(196,138,100,0.4)] transition-all duration-120 text-sm"
              >
                Let's Talk
              </motion.button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-[#EDEDED] hover:text-primary transition-colors duration-120 p-2 rounded-lg bg-[#131313]/80 backdrop-blur-xl border border-[#1E1E1E]/60"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden bg-[#0C0C0C]/95 backdrop-blur-xl border-b border-[#1E1E1E]/60"
          >
            <div className="px-4 pt-2 pb-6 space-y-2">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05, duration: 0.15 }}
                >
                  <Link
                    to={item.path}
                    className={`block px-4 py-3 text-base font-medium rounded-xl transition-all duration-140 ${
                      isActiveRoute(item.path)
                        ? "text-primary bg-primary/10 border border-primary/20"
                        : "text-[#B6B6B6] hover:text-primary hover:bg-[#131313]/60"
                    }`}
                  >
                    {item.name}
                  </Link>
                </motion.div>
              ))}

              {/* Mobile CTA */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: navItems.length * 0.05, duration: 0.15 }}
                className="pt-4"
              >
                <Link to="/contact">
                  <button className="w-full bg-gradient-to-r from-primary to-primary/80 text-primary-foreground px-6 py-3 rounded-xl font-medium">
                    Let's Talk
                  </button>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navigation;