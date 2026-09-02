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
      {/* Background Elements */}
      <div className="absolute inset-0">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.03, 0.08, 0.03],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl"
        />
      </div>

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
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3 }}
            className="inline-flex items-center px-4 py-2 bg-card/50 backdrop-blur-xl border border-border rounded-full text-sm font-medium text-primary mb-10"
          >
            <Sparkles size={16} className="mr-2" />
            {finalCTA.badge}
          </motion.div>

          {/* Headline — closing register, editorial serif */}
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-8 tracking-tight leading-[1.1] px-4">
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
          <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto mb-12 lg:mb-14 leading-[1.6] font-light px-4">
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
              className="group bg-gradient-to-r from-primary to-primary/80 text-primary-foreground px-6 sm:px-8 lg:px-10 py-3 sm:py-4 lg:py-5 rounded-full font-semibold
                       hover:shadow-glow transition-all duration-150
                       flex items-center gap-2 sm:gap-3 text-sm sm:text-base lg:text-lg shadow-lg w-full sm:w-auto justify-center"
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
                className="group bg-card/50 backdrop-blur-xl text-muted-foreground hover:text-primary px-6 sm:px-8 lg:px-10 py-3 sm:py-4 lg:py-5 rounded-full font-semibold
                         hover:bg-card/80 transition-all duration-150
                         flex items-center gap-2 sm:gap-3 text-sm sm:text-base lg:text-lg border border-border hover:border-primary/30 w-full sm:w-auto justify-center"
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
