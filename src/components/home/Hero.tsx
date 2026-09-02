import React from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Play,
  Sparkles,
} from "lucide-react";
import { motion } from "framer-motion";
import { BRAND_CONTENT } from "../../config/content";
import { renderContentSegments } from "../../utils/contentRenderer";

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.05 },
  },
};

const item = {
  hidden: { opacity: 0, y: 22 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

const Hero: React.FC = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="min-h-screen bg-background flex items-center justify-center relative overflow-hidden pt-20 sm:pt-32 pb-20">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_82%_25%,rgba(196,138,100,0.10),transparent_32%),radial-gradient(circle_at_10%_75%,rgba(196,138,100,0.06),transparent_28%)]" />

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(rgba(196, 138, 100, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(196, 138, 100, 0.1) 1px, transparent 1px)`,
            backgroundSize: "80px 80px",
            maskImage: "radial-gradient(ellipse 60% 50% at 50% 40%, black 40%, transparent 100%)",
            WebkitMaskImage: "radial-gradient(ellipse 60% 50% at 50% 40%, black 40%, transparent 100%)",
          }}
        />
      </div>

      {/* Fine grain texture for tactile depth */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.025] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full"
      >
        <div className="flex flex-col items-center text-center">
          {/* Status Badge */}
          <motion.div variants={item} className="flex justify-center">
            <Link
              to="/contact"
              className="
      group relative inline-flex items-center gap-2 overflow-hidden
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
              <span className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-b from-white/10 via-white/5 to-transparent opacity-70" />
              <span className="pointer-events-none absolute -inset-1 rounded-full bg-primary/20 blur-xl opacity-0 transition-opacity duration-300 group-hover:opacity-20" />

              <Sparkles size={16} className="opacity-80" />
              <span className="relative">{BRAND_CONTENT.hero.badge}</span>

              <span className="relative ml-2 flex h-2 w-2">
                <span className="absolute inset-0 rounded-full bg-primary/70 blur-[2px]" />
                <span className="relative h-2 w-2 rounded-full bg-primary" />
              </span>
            </Link>
          </motion.div>

          {/* Headline */}
          <h1 className="text-4xl md:text-6xl xl:text-7xl 2xl:text-8xl font-bold mb-6 sm:mb-8 leading-[1.15] tracking-tight sm:px-4">
            <motion.span variants={item} className="block text-foreground mb-2 sm:mb-3">
              {BRAND_CONTENT.hero.headline.line1}
            </motion.span>
            <motion.span
              variants={item}
              className="block bg-gradient-to-r from-primary via-primary/90 to-primary/80 bg-clip-text text-transparent lg:pb-2 [text-shadow:0_0_28px_rgba(196,138,100,0.16)]"
            >
              {BRAND_CONTENT.hero.headline.line2}
            </motion.span>
            <motion.span
              variants={item}
              className="block text-foreground text-2xl sm:text-3xl md:text-4xl lg:text-5xl 2xl:text-6xl mt-3 sm:mt-4"
            >
              {BRAND_CONTENT.hero.headline.line3}
            </motion.span>
          </h1>

          {/* Supporting copy */}
          <motion.div
            variants={item}
            className="mb-10 sm:mb-12 max-w-4xl px-2 text-base font-light leading-relaxed text-muted-foreground sm:px-4 sm:text-lg lg:text-xl"
          >
            <p className="mb-6">
              {renderContentSegments(BRAND_CONTENT.hero.subheadline.slice(0, 2))}
            </p>
            <p>
              {renderContentSegments(BRAND_CONTENT.hero.subheadline.slice(4))}
            </p>
          </motion.div>

          {/* CTAs */}
          <motion.div variants={item} className="flex flex-col justify-center items-center sm:flex-row gap-5">
            <Link to={BRAND_CONTENT.hero.primaryCTA.link}>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="group relative bg-gradient-to-r from-primary to-primary/90 text-primary-foreground px-8 sm:px-12 py-4 sm:py-6 rounded-full font-bold text-lg
                         shadow-2xl shadow-primary/25 hover:shadow-primary/40
                         flex items-center gap-3 overflow-hidden"
              >
                <span className="relative">
                  {BRAND_CONTENT.hero.primaryCTA.text}
                </span>
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
              className="group text-foreground hover:text-primary font-bold px-8 sm:px-12 py-4 sm:py-6 rounded-full text-lg
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
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
