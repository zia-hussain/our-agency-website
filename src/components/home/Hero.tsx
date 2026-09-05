import React from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  ChevronDown,
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
    <section className="bg-background relative overflow-hidden pt-24 sm:pt-40 pb-20 sm:pb-28">
      {/* The light is motivated — it gathers around the one line that
          matters most, not the block as a whole */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_50%_40%,rgba(196,138,100,0.10),transparent_68%)]" />

      {/* Edge falloff — the canvas has depth, not a spotlight */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_90%_80%_at_50%_30%,transparent_50%,rgba(0,0,0,0.4)_100%)]" />

      {/* Fine grain — tactile, not decorative */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.02] mix-blend-overlay"
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
          {/* Eyebrow */}
          <motion.div variants={item} className="flex justify-center">
            <Link
              to="/contact"
              className="
      group relative inline-flex items-center gap-2.5
      rounded-full px-4 py-2
      text-xs font-medium uppercase tracking-[0.14em]
      text-primary/90
      border border-primary/15
      bg-background/40
      backdrop-blur-xl
      transition-all duration-300
      hover:border-primary/30 hover:text-primary
      focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/25 mb-10 sm:mb-12
    "
            >
              <Sparkles size={13} className="opacity-70" />
              <span>{BRAND_CONTENT.hero.badge}</span>
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inset-0 rounded-full bg-primary/60 animate-ping" style={{ animationDuration: "2.5s" }} />
                <span className="relative h-1.5 w-1.5 rounded-full bg-primary" />
              </span>
            </Link>
          </motion.div>

          {/* Headline — one silhouette, three registers, no register an afterthought */}
          <h1 className="font-bold mb-9 sm:mb-10 tracking-[-0.02em]">
            <motion.span
              variants={item}
              className="block text-foreground text-4xl sm:text-5xl md:text-6xl lg:text-6xl xl:text-7xl 2xl:text-8xl leading-[1.05] mb-1 sm:mb-1.5"
            >
              We build software
              <br className="sm:hidden" />
              <span className="hidden sm:inline"> </span>
              for founders
            </motion.span>
            <motion.span
              variants={item}
              className="block bg-gradient-to-r from-primary via-primary/95 to-primary/85 bg-clip-text text-transparent text-4xl sm:text-5xl md:text-6xl lg:text-6xl xl:text-7xl 2xl:text-8xl leading-[1.05] pb-1 sm:pb-1.5"
            >
              {BRAND_CONTENT.hero.headline.line2}
            </motion.span>
            <motion.span
              variants={item}
              className="block text-[#F3EAE1] text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl 2xl:text-7xl leading-[1.05] tracking-[0.01em] mt-4 sm:mt-5"
            >
              {BRAND_CONTENT.hero.headline.line3}
            </motion.span>
          </h1>

          {/* One sharp supporting thought — tells them when to come to us */}
          <motion.p
            variants={item}
            className="mb-9 sm:mb-10 max-w-xl text-base sm:text-lg font-light leading-[1.6] text-muted-foreground"
          >
            {renderContentSegments(BRAND_CONTENT.hero.subheadline)}
          </motion.p>

          {/* CTAs — one deliberately-built control, one quiet piece of navigation */}
          <motion.div variants={item} className="flex flex-col items-center gap-5">
            <Link to={BRAND_CONTENT.hero.primaryCTA.link}>
              <motion.button
                whileHover={{ scale: 1.015, y: -2 }}
                whileTap={{ scale: 0.985 }}
                transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="group relative bg-gradient-to-b from-primary to-primary/[0.92] text-primary-foreground pl-9 pr-7 sm:pl-10 sm:pr-8 py-4 sm:py-[1.15rem] rounded-full font-semibold text-base sm:text-lg tracking-[-0.01em]
                         shadow-[0_1px_0_0_rgba(255,255,255,0.25)_inset,0_2px_10px_-2px_rgba(0,0,0,0.35),0_16px_36px_-16px_rgba(196,138,100,0.4)]
                         hover:shadow-[0_1px_0_0_rgba(255,255,255,0.3)_inset,0_2px_10px_-2px_rgba(0,0,0,0.4),0_20px_42px_-16px_rgba(196,138,100,0.5)]
                         flex items-center gap-3 overflow-hidden transition-shadow duration-300"
              >
                <span className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-b from-white/[0.14] via-white/0 to-black/[0.06]" />
                <span className="relative">
                  {BRAND_CONTENT.hero.primaryCTA.text}
                </span>
                <span className="relative flex items-center justify-center w-5 h-5 rounded-full bg-black/10 group-hover:bg-black/[0.14] transition-colors duration-300">
                  <ArrowRight
                    size={12}
                    strokeWidth={2.5}
                    className="group-hover:translate-x-[1.5px] transition-transform duration-200"
                  />
                </span>
              </motion.button>
            </Link>

            {/* Secondary path and quiet proof, read as one authored line */}
            <div className="flex items-center gap-2.5 text-sm">
              <button
                onClick={() => scrollToSection("portfolio")}
                className="group text-foreground/65 hover:text-primary font-medium flex items-center gap-1.5 transition-colors duration-200 py-1"
              >
                <span className="border-b border-foreground/15 group-hover:border-primary/50 transition-colors duration-200">
                  {BRAND_CONTENT.hero.secondaryCTA.text}
                </span>
                <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform duration-200" />
              </button>
              <span className="text-muted-foreground/30">·</span>
              <span className="text-muted-foreground/45">{BRAND_CONTENT.hero.proofLine}</span>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Handoff into the next section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.1 }}
        className="relative z-10 flex justify-center mt-16 sm:mt-20 text-muted-foreground/25"
        aria-hidden="true"
      >
        <ChevronDown size={18} />
      </motion.div>
    </section>
  );
};

export default Hero;
