import React from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Play,
  CheckCircle,
  Zap,
  Award,
  Sparkles,
} from "lucide-react";
import { motion } from "framer-motion";
import { BRAND_CONTENT } from "../../config/content";
import { renderContentSegments } from "../../utils/contentRenderer";

const Hero: React.FC = () => {

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const stats = [
    {
      icon: Zap,
      title: BRAND_CONTENT.hero.stats[0].title,
      desc: BRAND_CONTENT.hero.stats[0].description,
    },
    {
      icon: Award,
      title: BRAND_CONTENT.hero.stats[1].title,
      desc: BRAND_CONTENT.hero.stats[1].description,
    },
    {
      icon: CheckCircle,
      title: BRAND_CONTENT.hero.stats[2].title,
      desc: BRAND_CONTENT.hero.stats[2].description,
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

      <div className="mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="flex flex-col items-center text-center">
          {/* PREMIUM Status Badge */}
         <motion.div
  initial={{ opacity: 0, y: -14, filter: "blur(6px)" }}
  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
  transition={{ duration: 0.55, ease: "easeOut" }}
  className="flex justify-center"
>
  <Link
    to="/contact"
    className="
      group relative inline-flex items-center gap-2
      rounded-full px-5 py-2.5
      text-sm font-semibold
      text-primary
      border border-primary/20
      bg-gradient from-primary/10 via-background/40 to-background/20
      backdrop-blur-xl
      shadow-[0_0_0_1px_rgba(0,0,0,0.04),0_14px_50px_rgba(0,0,0,0.35)]
      transition-all duration-300
      hover:border-primary/30 hover:from-primary/15
      active:scale-[0.99]
      focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/25 mb-8
    "
  >
    {/* subtle top highlight (Bolt feel) */}
    <span className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-b from-white/10 via-white/5 to-transparent opacity-70" />

    {/* ultra-soft glow using your primary */}
    <span className="pointer-events-none absolute -inset-1 rounded-full bg-primary/20 blur-xl opacity-0 transition-opacity duration-300 group-hover:opacity-20" />

    <Sparkles size={16} className="opacity-80" />
    <span className="relative">{BRAND_CONTENT.hero.badge}</span>

    {/* clean right dot (no ping, premium) */}
    <span className="relative ml-2 flex h-2 w-2">
      <span className="absolute inset-0 rounded-full bg-primary/70 blur-[2px]" />
      <span className="relative h-2 w-2 rounded-full bg-primary" />
    </span>
  </Link>
</motion.div>

          {/* ULTIMATE HEADLINE - Maximum Impact */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-6xl xl:text-7xl 2xl:text-8xl font-bold mb-6 sm:mb-8 leading-[1.15] tracking-tight sm:px-4"
          >
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="block text-foreground mb-2 sm:mb-3"
            >
              {BRAND_CONTENT.hero.headline.line1}
            </motion.span>
            <motion.span
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="block bg-gradient-to-r from-primary via-primary/90 to-primary/80 bg-clip-text text-transparent lg:pb-2"
            >
              {BRAND_CONTENT.hero.headline.line2}
            </motion.span>
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="block text-foreground text-2xl sm:text-3xl md:text-4xl lg:text-5xl 2xl:text-6xl mt-3 sm:mt-4"
            >
              {BRAND_CONTENT.hero.headline.line3}
            </motion.span>
          </motion.h1>

          {/* POWERFUL Value Proposition */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="text-base sm:text-lg lg:text-xl text-muted-foreground mb-8 sm:mb-10 max-w-4xl leading-relaxed px-2 sm:px-4 font-light"
          >
            {renderContentSegments(BRAND_CONTENT.hero.subheadline)}
          </motion.p>

          {/* Trust Badge */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.1 }}
            className="flex flex-wrap items-center justify-center gap-6 sm:gap-6 mb-10 sm:mb-12 px-2 sm:px-4"
          >
            <a
              href={BRAND_CONTENT.hero.trustBadge.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 bg-card/50 backdrop-blur-xl px-4 py-3 rounded-lg border border-border hover:border-primary/40 transition-colors"
            >
              <Award size={24} className="text-primary" />
              <div className="text-left">
                <div className="text-sm font-semibold text-foreground">
                  {BRAND_CONTENT.hero.trustBadge.text}
                </div>
                <div className="text-xs text-muted-foreground">
                  {BRAND_CONTENT.hero.trustBadge.subtext}
                </div>
              </div>
            </a>
            <div className="w-px h-5 bg-border hidden sm:block" />
            <div className="flex items-center gap-2 text-foreground">
              <CheckCircle size={18} className="text-primary" />
              <span>
                <strong className="text-foreground">{BRAND_CONTENT.trust.metrics.projects}</strong>{" "}
                <span className="text-muted-foreground">{BRAND_CONTENT.trust.metrics.projectsDescription}</span>
              </span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1 }}
            className="flex flex-col justify-center items-center sm:flex-row gap-5 mb-24"
          >
            <Link to={BRAND_CONTENT.hero.primaryCTA.link}>
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
                <span className="relative">{BRAND_CONTENT.hero.primaryCTA.text}</span>
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
              {BRAND_CONTENT.hero.secondaryCTA.text}
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
