import React from "react";
import { Link } from "react-router-dom";
import { Calendar, Mail, ArrowRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { BRAND_CONTENT } from "../../config/content";
import { renderContentSegments } from "../../utils/contentRenderer";

const FinalCTA: React.FC = () => {
  const finalCTA = BRAND_CONTENT.finalCTA;

  return (
    <section className="py-28 lg:py-36 bg-background relative overflow-hidden">
      {/* A single quiet, static field of light — no pulsing blob */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_30%,rgba(196,138,100,0.07),transparent_60%)]" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="text-center"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3 }}
            className="inline-flex items-center px-3.5 py-1.5 bg-card/40 backdrop-blur-xl border border-border/70 rounded-full text-xs font-medium uppercase tracking-[0.1em] text-primary/90 mb-9"
          >
            <Sparkles size={14} className="mr-2" />
            {finalCTA.badge}
          </motion.div>

          {/* Headline — closing register */}
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-7 tracking-tight leading-[1.08] px-4">
            {finalCTA.headline.line1}
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="block bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent mt-2"
            >
              {finalCTA.headline.line2}
            </motion.span>
          </h2>

          {/* Subtitle */}
          <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-xl mx-auto mb-12 lg:mb-14 leading-[1.6] font-light px-4">
            {renderContentSegments(finalCTA.subtitle)}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 lg:gap-6 justify-center items-center mb-8 sm:mb-12 lg:mb-16 px-4">
            <motion.a
              href={finalCTA.primaryCTA.link}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02, y: -3 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.15 }}
              className="group bg-gradient-to-r from-primary to-primary/90 text-primary-foreground px-6 sm:px-8 lg:px-10 py-3.5 sm:py-4 lg:py-5 rounded-full font-semibold
                       shadow-[0_16px_40px_-14px_rgba(196,138,100,0.5)] hover:shadow-[0_20px_48px_-14px_rgba(196,138,100,0.6)] transition-all duration-300
                       flex items-center gap-2 sm:gap-3 text-sm sm:text-base lg:text-lg w-full sm:w-auto justify-center"
            >
              <Calendar size={18} className="sm:hidden" />
              <Calendar size={20} className="hidden sm:block lg:hidden" />
              <Calendar size={22} className="hidden lg:block" />
              {finalCTA.primaryCTA.text}
              <ArrowRight size={18} className="sm:hidden group-hover:translate-x-1 transition-transform duration-150" />
              <ArrowRight size={20} className="hidden sm:block lg:hidden group-hover:translate-x-1 transition-transform duration-150" />
              <ArrowRight size={22} className="hidden lg:block group-hover:translate-x-1 transition-transform duration-150" />
            </motion.a>

            <Link to={finalCTA.secondaryCTA.link}>
              <motion.button
                whileHover={{ scale: 1.02, y: -3 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.15 }}
                className="group bg-card/30 backdrop-blur-xl text-foreground/80 hover:text-primary px-6 sm:px-8 lg:px-10 py-3.5 sm:py-4 lg:py-5 rounded-full font-semibold
                         hover:bg-card/50 transition-all duration-300
                         flex items-center gap-2 sm:gap-3 text-sm sm:text-base lg:text-lg border border-border/70 hover:border-primary/25 w-full sm:w-auto justify-center"
              >
                <Mail size={18} className="sm:hidden" />
                <Mail size={20} className="hidden sm:block lg:hidden" />
                <Mail size={22} className="hidden lg:block" />
                {finalCTA.secondaryCTA.text}
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FinalCTA;
