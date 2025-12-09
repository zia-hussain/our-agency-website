import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Play, Star } from "lucide-react";
import { motion } from "framer-motion";
import { getSiteData } from "../../data/site";

const Hero: React.FC = () => {
  const siteData = getSiteData();
  const { metrics } = siteData;

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const trustMetrics = [
    {
      value: "5.0★",
      label: "Rating",
    },
    {
      value: "50+",
      label: "Projects",
    },
    {
      value: "30d",
      label: "Delivery",
    },
    {
      value: "100%",
      label: "Success",
    },
  ];

  return (
    <section className="min-h-screen bg-card/20 flex items-center justify-center relative overflow-hidden pt-32 pb-20">
      {/* Animated Gradient Background - BEAST MODE */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 90, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute right-0 top-0 w-1/2 h-full bg-gradient-to-br from-primary/5 via-primary/10 to-transparent blur-3xl rounded-full"
      />

      {/* Subtle Pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, #C48A64 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="flex flex-col items-center text-center">
          {/* Status Badge - MINIMAL */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="inline-flex items-center px-4 py-2 bg-card/80 backdrop-blur-xl border border-border rounded-full text-sm font-medium text-primary mb-8 hover:bg-card transition-all duration-150"
          >
            <span className="relative flex h-2 w-2 mr-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            Available for New Projects
          </motion.div>

          {/* MASSIVE HEADLINE - 2 LINES MAX */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-foreground mb-6 sm:mb-8 leading-[1.15] tracking-tight px-4"
          >
            <span className="block">Launch Your SaaS MVP</span>
            <span className="block bg-gradient-to-r from-primary via-primary/90 to-primary/80 bg-clip-text text-transparent">
              In 30 Days or Less
            </span>
          </motion.h1>

          {/* PUNCHY SUBTEXT - 1 LINE */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="text-base sm:text-lg md:text-xl lg:text-2xl text-muted-foreground mb-8 max-w-4xl leading-relaxed px-4"
          >
            Enterprise-grade MVPs, AI automation, and mobile apps for ambitious founders. 50+ successful launches. 100% satisfaction.
          </motion.p>

          {/* CTA BUTTONS - 20% LARGER */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 mb-12"
          >
            <Link to="/contact">
              <motion.button
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                animate={{
                  boxShadow: [
                    "0 0 0 0 rgba(196, 138, 100, 0)",
                    "0 0 0 8px rgba(196, 138, 100, 0.1)",
                    "0 0 0 0 rgba(196, 138, 100, 0)",
                  ],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="group bg-gradient-to-r from-primary to-primary/90 text-primary-foreground px-10 py-5 rounded-xl font-semibold
                         hover:shadow-glow transition-all duration-150
                         flex items-center gap-3 text-lg shadow-lg"
              >
                Get Started
                <ArrowRight
                  size={20}
                  className="group-hover:translate-x-1 transition-transform duration-150"
                />
              </motion.button>
            </Link>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => scrollToSection("portfolio")}
              className="group text-foreground hover:text-primary font-semibold px-10 py-5
                       transition-all duration-150 text-lg flex items-center gap-3
                       bg-card/50 backdrop-blur-xl border border-border rounded-xl
                       hover:bg-card/80 hover:border-primary/30"
            >
              <Play size={18} className="text-primary" />
              See Our Work
            </motion.button>
          </motion.div>

          {/* Trust Band - INLINE */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.4 }}
            className="flex items-center gap-2 text-sm text-muted-foreground mb-12"
          >
            <Star size={16} className="text-primary fill-current" />
            <span>5.0 Rating • 50+ Projects • 6 Countries Served</span>
          </motion.div>

          {/* Trust Metrics - MINIMAL */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.5 }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 w-full max-w-4xl"
          >
            {trustMetrics.map((metric, index) => (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ y: -2, scale: 1.02 }}
                transition={{ duration: 0.15, delay: 0.6 + index * 0.05 }}
                className="text-center bg-card/30 backdrop-blur-xl border border-border rounded-xl px-4 py-6 hover:bg-card/50 hover:border-primary/30 transition-all duration-150 cursor-pointer group"
              >
                <div className="text-2xl lg:text-3xl font-bold text-foreground group-hover:text-primary transition-colors duration-150 mb-2">
                  {metric.value}
                </div>
                <div className="text-sm text-muted-foreground">
                  {metric.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
