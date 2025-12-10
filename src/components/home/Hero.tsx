import React from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Play,
  Star,
  CheckCircle,
  Zap,
  Award,
  Sparkles,
} from "lucide-react";
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

  const stats = [
    {
      icon: Zap,
      title: "30-Day Delivery",
      desc: "Launch-ready MVPs",
    },
    {
      icon: Award,
      title: "85% Funded",
      desc: "Client success rate",
    },
    {
      icon: CheckCircle,
      title: "100% Satisfaction",
      desc: "Perfect track record",
    },
  ];

  const keyDiffContainer = {
    hidden: { opacity: 0, y: 24 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
        staggerChildren: 0.12,
        delayChildren: 0.6,
      },
    },
  };

  const keyDiffItem = {
    hidden: { opacity: 0, y: 20, scale: 0.98 },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.35, ease: "easeOut" },
    },
  };

  return (
    <section className="min-h-screen bg-gradient-to-b from-background via-background to-card/30 flex items-center justify-center relative overflow-hidden pt-20 sm:pt-32 pb-20">
      {/* PREMIUM Animated Gradient Background */}
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          rotate: [0, 180, 0],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-gradient-to-br from-primary/20 via-primary/10 to-transparent blur-3xl rounded-full"
      />
      <motion.div
        animate={{
          scale: [1.3, 1, 1.3],
          rotate: [0, -180, 0],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute bottom-1/4 left-0 w-[500px] h-[500px] bg-gradient-to-br from-primary/15 via-primary/8 to-transparent blur-3xl rounded-full"
      />

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 opacity-[0.015]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(rgba(196, 138, 100, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(196, 138, 100, 0.1) 1px, transparent 1px)`,
            backgroundSize: "80px 80px",
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="flex flex-col items-center text-center">
          {/* PREMIUM Status Badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center px-5 py-2.5 bg-gradient-to-r from-primary/10 to-primary/5 backdrop-blur-xl border border-primary/20 rounded-full text-sm font-semibold text-primary mb-8 shadow-lg shadow-primary/5"
          >
            <Sparkles size={16} className="mr-2" />
            <span className="mr-2">Accepting Elite Projects</span>
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
          </motion.div>

          {/* ULTIMATE HEADLINE - Maximum Impact */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl xl:text-8xl font-bold mb-6 sm:mb-8 leading-[1.15] tracking-tight sm:px-4"
          >
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="block text-foreground mb-2 sm:mb-3"
            >
              The World's Premier
            </motion.span>
            <motion.span
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="block bg-gradient-to-r from-primary via-primary/90 to-primary/80 bg-clip-text text-transparent lg:pb-2"
            >
              Software Agency
            </motion.span>
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="block text-foreground text-2xl sm:text-3xl md:text-4xl lg:text-5xl mt-3 sm:mt-4"
            >
              For Visionary Founders
            </motion.span>
          </motion.h1>

          {/* POWERFUL Value Proposition */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="text-base sm:text-lg lg:text-xl text-muted-foreground mb-8 sm:mb-10 max-w-4xl leading-relaxed px-2 sm:px-4 font-light"
          >
            <span className="text-foreground font-medium">
              Enterprise-grade SaaS MVPs in 30 days
            </span>
            , intelligent AI automation, and world-class mobile apps that{" "}
            <span className="text-primary font-medium">raise millions</span> and{" "}
            <span className="text-primary font-medium">dominate markets</span>.
          </motion.p>

          {/* Elite Trust Indicators */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.1 }}
            className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 mb-10 sm:mb-12 px-2 sm:px-4 text-sm sm:text-base"
          >
            <div className="flex items-center gap-2">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star
                    key={i}
                    size={16}
                    className="text-primary fill-current"
                  />
                ))}
              </div>
              <span className="text-foreground font-bold">5.0</span>
              <span className="text-muted-foreground">Perfect Rating</span>
            </div>
            <div className="w-px h-5 bg-border" />
            <div className="flex items-center gap-2 text-foreground">
              <Award size={18} className="text-primary" />
              <span>
                <strong className="text-foreground">50+</strong>{" "}
                <span className="text-muted-foreground">Elite Clients</span>
              </span>
            </div>
            <div className="w-px h-5 bg-border" />
            <div className="flex items-center gap-2 text-foreground">
              <Zap size={18} className="text-primary" />
              <span>
                <strong className="text-foreground">100%</strong>{" "}
                <span className="text-muted-foreground">Success Rate</span>
              </span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1 }}
            className="flex flex-col justify-center items-center sm:flex-row gap-5 mb-24"
          >
            <Link to="/contact">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="group relative bg-gradient-to-r from-primary to-primary/90 text-primary-foreground px-8 sm:px-12 py-4 sm:py-6 rounded-xl sm:rounded-2xl font-bold text-lg
                         shadow-2xl shadow-primary/25 hover:shadow-primary/40 
                         flex items-center gap-3 overflow-hidden"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-primary/0 via-white/20 to-primary/0"
                  animate={{
                    x: ["-200%", "200%"],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />
                <span className="relative">Start Your Project</span>
                <ArrowRight
                  size={22}
                  className="relative group-hover:translate-x-2 transition-transform duration-200"
                />
              </motion.button>
            </Link>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => scrollToSection("portfolio")}
              className="group text-foreground hover:text-primary font-bold px-8 sm:px-12 py-4 sm:py-6 rounded-xl sm:rounded-2xl text-lg
                        flex items-center gap-3
                       bg-card/60 backdrop-blur-xl border-2 border-border/50 
                       hover:bg-card hover:border-primary/40 shadow-xl"
            >
              <Play
                size={20}
                className="text-primary group-hover:scale-110 transition-transform duration-200"
              />
              View Success Stories
            </motion.button>
          </motion.div>

          {/* Key Differentiators */}
          <motion.div
            variants={keyDiffContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.4 }}
            className="w-full max-w-5xl mx-auto px-4 sm:px-0 cursor-default"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">
              {stats.map((item) => (
                <motion.div
                  key={item.title}
                  variants={keyDiffItem}
                  whileHover={{
                    y: -6,
                    scale: 1.015,
                    transition: { duration: 0.22, ease: "easeOut" },
                  }}
                  className="relative group h-full hover:border-primary/30 bg-card/60 backdrop-blur-xl border border-border/50 rounded-2xl p-6 sm:p-8 flex flex-col"
                >
                  {/* Glow ring on hover */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/20 via-primary/0 to-primary/0 opacity-0 group-hover:opacity-100 blur-2xl transition-opacity duration-300 pointer-events-none" />

                  <div
                    className="
            relative h-full overflow-hidden rounded-2xl
            border border-white/5
            bg-white/[0.02]
            backdrop-blur-md
            px-5 py-6
            flex flex-col
            transition-all duration-300
            group-hover:border-white/15
            group-hover:bg-white/[0.04]
          "
                  >
                    {/* Subtle top accent line */}
                    <div className="absolute inset-x-5 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent opacity-60" />

                    {/* Icon + label */}
                    <div className="flex items-center gap-3 mb-4">
                      <div
                        className="
                relative flex items-center justify-center
                h-10 w-10 rounded-xl
                border border-white/10
                bg-white/[0.04]
                shadow-[0_0_0_1px_rgba(255,255,255,0.02)]
                transition-all duration-300
                group-hover:bg-white/[0.06]
                group-hover:border-white/20
              "
                      >
                        <item.icon
                          className="w-5 h-5 text-primary"
                          strokeWidth={1.6}
                        />
                      </div>

                    </div>

                    {/* Title */}
                    <h2 className="text-2xl font-semibold text-white/45 tracking-tight mb-2">
                      {item.title}
                    </h2>

                    {/* Description */}
                    <p className="text-sm text-white/60 leading-relaxed mb-4">
                      {item.desc}
                    </p>

                    {/* Bottom accent line */}
                    <div className="mt-5 h-px w-full bg-gradient-to-r from-transparent via-white/12 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
