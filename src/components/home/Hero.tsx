import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Play, Sparkles, Star, Users, Award, Clock } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { getSiteData } from "../../data/site";

const Hero: React.FC = () => {
  const [currentMockup, setCurrentMockup] = useState(0);
  const siteData = getSiteData();
  const { hero, metrics } = siteData;

  // Auto-rotate mockups
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMockup((prev) => (prev + 1) % hero.mockups.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [hero.mockups.length]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="min-h-screen bg-[#0C0C0C] flex items-center justify-center relative overflow-hidden pt-20">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
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
          opacity: [0.05, 0.1, 0.05],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Column - Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="text-left"
          >
            {/* Overline Chip */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="inline-flex items-center px-4 py-2 bg-[#131313]/80 backdrop-blur-xl border border-[#1E1E1E]/60 rounded-full text-sm font-medium text-primary mb-8 hover:bg-[#131313] transition-all duration-150"
            >
              <Sparkles size={16} className="mr-2" />
              {hero.overline}
            </motion.div>

            {/* Headline - Big & Bold */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-[#EDEDED] mb-6 leading-tight tracking-tight">
              {hero.headline.split('.')[0]}.
              <span className="block bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent mt-2">
                {hero.headline.split('.')[1]?.trim()}.
              </span>
            </h1>

            {/* Subtext - 2 lines max */}
            <p className="text-xl text-[#B6B6B6] leading-[1.7] mb-8 max-w-2xl">
              {hero.subtext}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Link to={hero.primaryCTA.link}>
                <motion.button
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.12, ease: "easeOut" }}
                  className="group bg-gradient-to-r from-primary to-primary/90 text-primary-foreground px-8 py-4 rounded-xl font-semibold 
                           hover:shadow-[0_0_30px_rgba(196,138,100,0.4)] transition-all duration-120 ease-out
                           flex items-center gap-3 text-lg shadow-lg"
                >
                  {hero.primaryCTA.text}
                  <ArrowRight
                    size={20}
                    className="group-hover:translate-x-1 transition-transform duration-120"
                  />
                </motion.button>
              </Link>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.12, ease: "easeOut" }}
                onClick={() => scrollToSection("portfolio")}
                className="group text-[#B6B6B6] hover:text-primary font-medium px-6 py-4 
                         transition-all duration-120 ease-out text-lg flex items-center gap-3 
                         bg-[#131313]/50 backdrop-blur-xl border border-[#1E1E1E]/60 rounded-xl
                         hover:bg-[#131313]/80 hover:border-primary/30"
              >
                <div className="w-10 h-10 bg-[#131313]/80 backdrop-blur-xl rounded-full flex items-center justify-center group-hover:bg-primary/10 transition-all duration-120 border border-[#1E1E1E]/60">
                  <Play size={14} className="text-primary ml-0.5" />
                </div>
                {hero.secondaryCTA.text}
              </motion.button>
            </div>

            {/* Proof Points Row */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.6 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-4"
            >
              {[
                { icon: Star, text: "5.0 rating", value: "★★★★★" },
                { icon: Users, text: metrics.projectsCompleted, label: "projects" },
                { icon: Award, text: "100%", label: "5-star reviews" },
                { icon: Clock, text: "<30d", label: "MVP delivery" },
              ].map((item, index) => (
                <motion.div
                  key={item.text}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  whileHover={{ y: -2, scale: 1.02 }}
                  transition={{ duration: 0.12, delay: 0.8 + index * 0.05 }}
                  className="text-center bg-[#131313]/50 backdrop-blur-xl border border-[#1E1E1E]/60 rounded-xl p-4 hover:bg-[#131313]/80 hover:border-primary/30 transition-all duration-120 cursor-pointer"
                >
                  <div className="flex items-center justify-center mb-2">
                    <item.icon size={16} className="text-primary mr-1" />
                    <span className="text-lg font-bold text-[#EDEDED]">
                      {item.value || item.text}
                    </span>
                  </div>
                  <div className="text-xs text-[#B6B6B6] font-medium">
                    {item.label || item.text}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Column - Rotating Mockups */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="relative"
          >
            <div className="relative w-full max-w-lg mx-auto">
              {/* Main Mockup Display */}
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-[#1E1E1E]/60 shadow-2xl">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={currentMockup}
                    src={hero.mockups[currentMockup]}
                    alt={`Project mockup ${currentMockup + 1}`}
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className="w-full h-full object-cover"
                  />
                </AnimatePresence>
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0C0C0C]/20 via-transparent to-transparent" />
              </div>

              {/* Mockup Indicators */}
              <div className="flex justify-center gap-2 mt-6">
                {hero.mockups.map((_, index) => (
                  <motion.button
                    key={index}
                    onClick={() => setCurrentMockup(index)}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    transition={{ duration: 0.12 }}
                    className={`w-2 h-2 rounded-full transition-all duration-120 ${
                      currentMockup === index
                        ? "bg-primary shadow-[0_0_10px_rgba(196,138,100,0.5)]"
                        : "bg-[#1E1E1E] hover:bg-primary/50"
                    }`}
                  />
                ))}
              </div>

              {/* Floating Elements */}
              <motion.div
                animate={{ y: [0, -10, 0], rotate: [0, 2, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-4 -right-4 w-16 h-16 bg-primary/10 backdrop-blur-xl border border-[#1E1E1E]/60 rounded-2xl hidden lg:block"
              />
              <motion.div
                animate={{ y: [0, 10, 0], rotate: [0, -2, 0] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-4 -left-4 w-12 h-12 bg-primary/20 rounded-full hidden lg:block"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;