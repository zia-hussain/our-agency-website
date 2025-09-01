import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Play, Sparkles, Star, Users, Award, Clock, Globe, CheckCircle, TrendingUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { getSiteData } from "../../data/site";

const Hero: React.FC = () => {
  const [currentShowcase, setCurrentShowcase] = useState(0);
  const siteData = getSiteData();
  const { hero, metrics } = siteData;

  // Auto-rotate visual showcase
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentShowcase((prev) => (prev + 1) % hero.visualShowcase.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [hero.visualShowcase.length]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="min-h-screen bg-[#0C0C0C] flex items-center justify-center relative overflow-hidden pt-20">
      {/* Subtle Premium Background */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, #C48A64 1px, transparent 1px)`,
            backgroundSize: "80px 80px",
          }}
        />
      </div>

      {/* Gradient Orbs - Ultra Subtle */}
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.03, 0.08, 0.03],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 xl:gap-20 items-center">
          {/* Left Column - Premium Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="text-left"
          >
            {/* Premium Overline Chip */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="inline-flex items-center px-6 py-3 bg-[#131313]/80 backdrop-blur-xl border border-[#1E1E1E]/60 rounded-full text-sm font-medium text-primary mb-8 hover:bg-[#131313] hover:border-primary/30 transition-all duration-150"
            >
              <Sparkles size={16} className="mr-2" />
              {hero.overline}
            </motion.div>

            {/* Powerful Headline */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-[#EDEDED] mb-8 leading-[1.1] tracking-tight">
              {hero.headline.split(' ').slice(0, 2).join(' ')}
              <span className="block bg-gradient-to-r from-primary via-primary/90 to-primary/80 bg-clip-text text-transparent mt-2">
                {hero.headline.split(' ').slice(2, 6).join(' ')}
              </span>
              <span className="block text-[#EDEDED] mt-2">
                {hero.headline.split(' ').slice(6).join(' ')}
              </span>
            </h1>

            {/* Trust-Building Subtext */}
            <p className="text-xl lg:text-2xl text-[#B6B6B6] leading-[1.7] mb-10 max-w-2xl font-light">
              {hero.subtext}
            </p>

            {/* Premium CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 mb-12">
              <Link to={hero.primaryCTA.link}>
                <motion.button
                  whileHover={{ scale: 1.02, y: -3 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.15, ease: "easeOut" }}
                  className="group bg-gradient-to-r from-primary to-primary/90 text-primary-foreground px-10 py-5 rounded-xl font-semibold 
                           hover:shadow-[0_0_40px_rgba(196,138,100,0.4)] transition-all duration-150 ease-out
                           flex items-center gap-3 text-lg shadow-xl"
                >
                  {hero.primaryCTA.text}
                  <ArrowRight
                    size={22}
                    className="group-hover:translate-x-1 transition-transform duration-150"
                  />
                </motion.button>
              </Link>

              <motion.button
                whileHover={{ scale: 1.02, y: -3 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.15, ease: "easeOut" }}
                onClick={() => scrollToSection("featured-projects")}
                className="group text-[#B6B6B6] hover:text-primary font-semibold px-8 py-5 
                         transition-all duration-150 ease-out text-lg flex items-center gap-3 
                         bg-[#131313]/60 backdrop-blur-xl border border-[#1E1E1E]/60 rounded-xl
                         hover:bg-[#131313]/80 hover:border-primary/30"
              >
                <div className="w-12 h-12 bg-[#131313]/80 backdrop-blur-xl rounded-full flex items-center justify-center group-hover:bg-primary/10 transition-all duration-150 border border-[#1E1E1E]/60">
                  <Play size={16} className="text-primary ml-0.5" />
                </div>
                {hero.secondaryCTA.text}
              </motion.button>
            </div>

            {/* Trust Cards Grid - Premium Design */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.6 }}
              className="grid grid-cols-2 lg:grid-cols-4 gap-4"
            >
              {hero.trustCards.map((card, index) => (
                <motion.div
                  key={card.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  whileHover={{ y: -4, scale: 1.02 }}
                  transition={{ duration: 0.15, delay: 0.8 + index * 0.05 }}
                  className="bg-[#131313]/60 backdrop-blur-xl border border-[#1E1E1E]/60 rounded-xl p-4 lg:p-5 hover:bg-[#131313]/80 hover:border-primary/30 transition-all duration-150 cursor-pointer group"
                >
                  <div className="flex items-center justify-center mb-3">
                    {card.icon === "star" && <Star size={18} className="text-primary mr-2" />}
                    {card.icon === "projects" && <Users size={18} className="text-primary mr-2" />}
                    {card.icon === "speed" && <Clock size={18} className="text-primary mr-2" />}
                    {card.icon === "success" && <Award size={18} className="text-primary mr-2" />}
                    <span className="text-xl lg:text-2xl font-bold text-[#EDEDED] group-hover:text-primary transition-colors duration-150">
                      {card.value}
                    </span>
                  </div>
                  <div className="text-center">
                    <div className="text-sm font-semibold text-[#EDEDED] mb-1">
                      {card.label}
                    </div>
                    <div className="text-xs text-[#B6B6B6] font-medium">
                      {card.subtext}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Column - Premium Visual Showcase */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative"
          >
            <div className="relative w-full max-w-lg xl:max-w-xl mx-auto">
              {/* Main Visual Display */}
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-[#1E1E1E]/60 shadow-2xl">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentShowcase}
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                    className="relative w-full h-full"
                  >
                    <img
                      src={hero.visualShowcase[currentShowcase].image}
                      alt={hero.visualShowcase[currentShowcase].title}
                      className="w-full h-full object-cover"
                    />
                    
                    {/* Premium Overlay with Project Info */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0C0C0C]/80 via-transparent to-transparent" />
                    
                    {/* Project Info Card */}
                    <div className="absolute bottom-6 left-6 right-6">
                      <div className="bg-[#131313]/90 backdrop-blur-xl border border-[#1E1E1E]/60 rounded-xl p-4">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-semibold text-[#EDEDED] text-sm">
                            {hero.visualShowcase[currentShowcase].title}
                          </h3>
                          <span className="text-xs px-2 py-1 bg-primary/20 text-primary rounded-full border border-primary/30">
                            {hero.visualShowcase[currentShowcase].tech}
                          </span>
                        </div>
                        <p className="text-xs text-[#B6B6B6]">
                          {hero.visualShowcase[currentShowcase].client}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Showcase Indicators */}
              <div className="flex justify-center gap-3 mt-8">
                {hero.visualShowcase.map((_, index) => (
                  <motion.button
                    key={index}
                    onClick={() => setCurrentShowcase(index)}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    transition={{ duration: 0.15 }}
                    className={`w-3 h-3 rounded-full transition-all duration-150 ${
                      currentShowcase === index
                        ? "bg-primary shadow-[0_0_15px_rgba(196,138,100,0.6)]"
                        : "bg-[#1E1E1E] hover:bg-primary/50"
                    }`}
                  />
                ))}
              </div>

              {/* Floating Premium Elements */}
              <motion.div
                animate={{ y: [0, -12, 0], rotate: [0, 3, 0] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-6 -right-6 w-20 h-20 bg-primary/10 backdrop-blur-xl border border-[#1E1E1E]/60 rounded-2xl hidden lg:block"
              />
              <motion.div
                animate={{ y: [0, 12, 0], rotate: [0, -3, 0] }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-6 -left-6 w-16 h-16 bg-primary/20 rounded-full hidden lg:block"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;