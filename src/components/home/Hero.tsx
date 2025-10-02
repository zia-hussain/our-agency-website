import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Play,
  Sparkles,
  Star,
  Users,
  Award,
  Clock,
  Globe,
  CheckCircle,
  Zap,
  Shield,
  Rocket
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { getSiteData } from "../../data/site";

const Hero: React.FC = () => {
  const [currentMockup, setCurrentMockup] = useState(0);
  const siteData = getSiteData();
  const { hero, metrics } = siteData;

  // BEAST MODE: Premium tech-focused hero images
  const heroImages = [
    "https://images.pexels.com/photos/574071/pexels-photo-574071.jpeg?auto=compress&cs=tinysrgb&w=1200",
    "https://images.pexels.com/photos/3861458/pexels-photo-3861458.jpeg?auto=compress&cs=tinysrgb&w=1200",
    "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1200"
  ];

  // Auto-rotate mockups
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMockup((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [heroImages.length]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const trustMetrics = [
    {
      icon: Star,
      value: "5.0★",
      label: "Client Rating",
      description: "100% satisfaction"
    },
    {
      icon: Globe,
      value: "50+",
      label: "Global Projects",
      description: "6 countries served"
    },
    {
      icon: Clock,
      value: "30d",
      label: "MVP Delivery",
      description: "Rapid development"
    },
    {
      icon: Award,
      value: "100%",
      label: "Success Rate",
      description: "Zero failures"
    }
  ];

  return (
    <section className="min-h-screen bg-background flex items-center justify-center relative overflow-hidden pt-24 sm:pt-28 lg:pt-32 pb-12 sm:pb-16">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, #C48A64 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      {/* Gradient Orbs - Subtle */}
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.03, 0.08, 0.03],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
          {/* Left Column - Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="text-center lg:text-left order-2 lg:order-1"
          >
            {/* Overline Chip */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="inline-flex items-center px-3 sm:px-4 py-2 bg-card/80 backdrop-blur-xl border border-border rounded-full text-xs sm:text-sm font-medium text-primary mb-4 sm:mb-6 hover:bg-card transition-all duration-150 mx-auto lg:mx-0"
            >
              <Sparkles size={14} className="sm:hidden mr-2" />
              <Sparkles size={16} className="hidden sm:block mr-2" />
              {hero.overline}
            </motion.div>

            {/* Headline - SEO Optimized & Trust-Building */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-foreground mb-4 sm:mb-6 leading-[1.1] tracking-tight px-2 lg:px-0">
              <span className="block mb-2">Transform Your Vision Into</span>
              <span className="block bg-gradient-to-r from-primary via-primary/90 to-primary/80 bg-clip-text text-transparent mb-2">
                World-Class Software
              </span>
            </h1>

            {/* Subtext - Clear Value Proposition */}
            <div className="text-sm sm:text-base lg:text-lg xl:text-xl text-muted-foreground leading-[1.6] mb-6 sm:mb-8 max-w-2xl mx-auto lg:mx-0 px-2 lg:px-0">
              <p className="mb-3 sm:mb-4">
                <strong className="text-foreground">Zumetrix Labs is the world's premier software development agency building enterprise-grade SaaS MVPs in 30 days, AI automation systems, and mobile apps</strong> for ambitious global startups and enterprises.
              </p>
              <p className="text-sm sm:text-base lg:text-lg">
                Founded by world-class developers <strong className="text-primary">Zia Hussain & Syed Omer Shah</strong>. Trusted by <strong className="text-primary">50+ international clients</strong> with <strong className="text-primary">100% satisfaction rate</strong> and <strong className="text-primary">85% funding success</strong> for startup MVPs.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-6 sm:mb-8 lg:mb-12 px-2 lg:px-0">
              <Link to="/contact">
                <motion.button
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.15, ease: "easeOut" }}
                  className="group bg-gradient-to-r from-primary to-primary/90 text-primary-foreground px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold 
                           hover:shadow-glow transition-all duration-150
                           flex items-center gap-2 sm:gap-3 text-sm sm:text-base lg:text-lg shadow-lg w-full sm:w-auto justify-center"
                >
                  Start Your Project
                  <ArrowRight size={16} className="sm:hidden group-hover:translate-x-1 transition-transform duration-150" />
                  <ArrowRight size={18} className="hidden sm:block group-hover:translate-x-1 transition-transform duration-150" />
                </motion.button>
              </Link>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.15, ease: "easeOut" }}
                onClick={() => scrollToSection("portfolio")}
                className="group text-muted-foreground hover:text-primary font-semibold px-6 sm:px-8 py-3 sm:py-4 
                         transition-all duration-150 text-sm sm:text-base lg:text-lg flex items-center gap-2 sm:gap-3 justify-center
                         bg-card/50 backdrop-blur-xl border border-border rounded-xl
                         hover:bg-card/80 hover:border-primary/30 w-full sm:w-auto"
              >
                <Play size={16} className="text-primary" />
                View Success Stories
              </motion.button>
            </div>
          </motion.div>

          {/* Right Column - Premium Visual Carousel */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="relative order-1 lg:order-2"
          >
            <div className="relative w-full max-w-sm sm:max-w-md lg:max-w-lg xl:max-w-xl mx-auto">
              {/* Main Image Display */}
              <div className="relative aspect-[4/3] rounded-2xl lg:rounded-3xl overflow-hidden border border-border shadow-2xl group">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={currentMockup}
                    src={heroImages[currentMockup]}
                    alt={`Premium software development project ${currentMockup + 1}`}
                    initial={{ opacity: 0, scale: 1.1, rotate: 2 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9, rotate: -2 }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                    className="w-full h-full object-cover rounded-2xl lg:rounded-3xl group-hover:scale-105 transition-transform duration-700"
                  />
                </AnimatePresence>

                {/* Enhanced Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-background/30 via-transparent to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent" />
                
                {/* Premium Badge */}
                <div className="absolute top-2 sm:top-4 left-2 sm:left-4">
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.8 }}
                    className="bg-card/95 backdrop-blur-xl border border-border rounded-full px-2 sm:px-3 py-1 text-xs font-medium text-foreground shadow-lg"
                  >
                    Enterprise Grade
                  </motion.div>
                </div>

                {/* Floating Tech Icons */}
                <motion.div
                  animate={{ 
                    y: [0, -8, 0],
                    rotate: [0, 2, 0]
                  }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute top-4 right-4 w-8 h-8 bg-primary/20 backdrop-blur-xl border border-primary/30 rounded-lg flex items-center justify-center"
                >
                  <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                </motion.div>
              </div>

              {/* Image Indicators */}
              <div className="flex justify-center gap-3 mt-6 sm:mt-8">
                {heroImages.map((_, index) => (
                  <motion.button
                    key={index}
                    onClick={() => setCurrentMockup(index)}
                    whileHover={{ scale: 1.3, y: -2 }}
                    whileTap={{ scale: 0.9 }}
                    transition={{ duration: 0.15 }}
                    className={`w-3 h-3 lg:w-4 lg:h-4 rounded-full transition-all duration-300 ${
                      currentMockup === index
                        ? "bg-primary shadow-glow scale-125"
                        : "bg-border hover:bg-primary/50"
                    }`}
                  />
                ))}
              </div>

              {/* Enhanced Floating Elements */}
              <motion.div
                animate={{ 
                  y: [0, -15, 0], 
                  rotate: [0, 5, 0],
                  scale: [1, 1.05, 1]
                }}
                transition={{
                  duration: 10,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute -top-8 -right-8 w-20 h-20 lg:w-24 lg:h-24 bg-gradient-to-br from-primary/15 to-primary/25 backdrop-blur-xl border border-primary/30 rounded-2xl hidden xl:flex items-center justify-center shadow-lg"
              >
                <Sparkles size={28} className="text-primary animate-pulse" />
              </motion.div>

              <motion.div
                animate={{ 
                  y: [0, 18, 0], 
                  rotate: [0, -8, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{
                  duration: 12,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute -bottom-8 -left-8 w-16 h-16 lg:w-20 lg:h-20 bg-gradient-to-br from-primary/20 to-primary/30 rounded-full hidden xl:flex items-center justify-center shadow-lg border border-primary/20"
              >
                <Star size={24} className="text-primary fill-current animate-pulse" />
              </motion.div>

              {/* Code Symbol Floating Element */}
              <motion.div
                animate={{ 
                  y: [0, -10, 0], 
                  x: [0, 5, 0],
                  rotate: [0, 10, 0]
                }}
                transition={{
                  duration: 14,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute top-1/2 -left-4 w-12 h-12 bg-gradient-to-br from-primary/10 to-primary/20 backdrop-blur-xl border border-primary/20 rounded-xl hidden lg:flex items-center justify-center shadow-lg"
              >
                <div className="text-primary font-mono text-sm font-bold">{`</>`}</div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Trust Metrics Row - Perfectly Responsive */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.6 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mt-8 sm:mt-12 lg:mt-16 xl:mt-20 px-2 sm:px-0"
        >
          {trustMetrics.map((metric, index) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ y: -2, scale: 1.02 }}
              transition={{ duration: 0.15, delay: 0.8 + index * 0.05 }}
              className="text-center bg-card/50 backdrop-blur-xl border border-border rounded-lg lg:rounded-xl px-2 sm:px-3 lg:px-4 py-3 sm:py-4 lg:py-6 xl:py-8 hover:bg-card/80 hover:border-primary/30 transition-all duration-150 cursor-pointer group"
            >
              <div className="flex items-center justify-center mb-3">
                <metric.icon size={14} className="sm:hidden text-primary mr-1" />
                <metric.icon size={16} className="hidden sm:block lg:hidden text-primary mr-1 sm:mr-2" />
                <metric.icon size={18} className="hidden lg:block text-primary mr-2" />
                <span className="text-base sm:text-lg lg:text-xl xl:text-2xl font-bold text-foreground group-hover:text-primary transition-colors duration-150">
                  {metric.value}
                </span>
              </div>
              <div className="text-xs sm:text-sm lg:text-base font-medium text-foreground mb-1 leading-tight">
                {metric.label}
              </div>
              <div className="text-xs lg:text-sm text-muted-foreground leading-tight">
                {metric.description}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;