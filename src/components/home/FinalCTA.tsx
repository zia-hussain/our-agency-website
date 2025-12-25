import React from "react";
import { Link } from "react-router-dom";
import { Calendar, Mail, ArrowRight, CheckCircle, Sparkles, Star } from "lucide-react";
import { motion } from "framer-motion";
import { BRAND_CONTENT } from "../../config/content";

const FinalCTA: React.FC = () => {
  const finalCTA = BRAND_CONTENT.finalCTA;

  return (
    <section className="py-20 lg:py-24 bg-background relative overflow-hidden">
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
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
            className="inline-flex items-center px-4 py-2 bg-card/50 backdrop-blur-xl border border-border rounded-full text-sm font-medium text-primary mb-8"
          >
            <Sparkles size={16} className="mr-2" />
            <span className="w-2 h-2 bg-primary rounded-full mr-2 animate-pulse"></span>
            {finalCTA.badge}
          </motion.div>

          {/* Headline */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-foreground mb-6 sm:mb-8 tracking-tight leading-[1.1] px-4">
            {finalCTA.headline.line1}
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="block bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent mt-1 sm:mt-2"
            >
              {finalCTA.headline.line2}
            </motion.span>
          </h2>

          {/* Subtitle */}
          <p className="text-sm sm:text-base lg:text-lg xl:text-xl text-muted-foreground max-w-4xl mx-auto mb-8 sm:mb-12 lg:mb-16 leading-[1.6] font-light px-4">
            {finalCTA.subtitle}
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
              className="group bg-gradient-to-r from-primary to-primary/80 text-primary-foreground px-6 sm:px-8 lg:px-10 py-3 sm:py-4 lg:py-5 rounded-xl font-semibold 
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
                className="group bg-card/50 backdrop-blur-xl text-muted-foreground hover:text-primary px-6 sm:px-8 lg:px-10 py-3 sm:py-4 lg:py-5 rounded-xl font-semibold 
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

          {/* Trust Signals - Responsive Grid */}
         <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-6 lg:gap-8 max-w-4xl mx-auto mb-12 px-4">
  {finalCTA.trustSignals.map((signal, index) => (
    <motion.div
      key={signal}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -6, scale: 1.02 }}
      transition={{ duration: 0.2, delay: index * 0.06 }}
      className="relative group h-full hover:border-primary/30 bg-card/60 backdrop-blur-xl border border-border/50 rounded-2xl p-6 sm:p-8 flex flex-col"
    >
      {/* Soft glow ring */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/20 via-primary/0 to-primary/0 opacity-0 group-hover:opacity-100 blur-2xl transition-opacity duration-300 pointer-events-none" />

      {/* Main Glass Card */}
      <div
        className="
          relative h-full overflow-hidden rounded-2xl
          border border-white/5
          bg-white/[0.02]
          backdrop-blur-md
          px-5 py-6
          flex flex-col items-center text-center
          transition-all duration-300
          group-hover:border-white/15
          group-hover:bg-white/[0.04]
        "
      >
        {/* Top accent line */}
        <div className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent opacity-70" />

        {/* Icon Container */}
        <motion.div
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.18 }}
          className="
            h-10 w-10 sm:h-12 sm:w-12
            flex items-center justify-center
            rounded-xl
            border border-white/10
            bg-white/[0.04]
            shadow-[0_0_0_1px_rgba(255,255,255,0.02)]
            mb-4
            transition-all duration-300
            group-hover:bg-white/[0.08]
            group-hover:border-white/20
          "
        >
          <CheckCircle
            size={20}
            className="text-primary group-hover:text-primary transition-colors duration-300"
          />
        </motion.div>

        {/* Text */}
        <h3 className="text-sm sm:text-base font-medium text-white/80 leading-relaxed">
          {signal}
        </h3>

        {/* Bottom accent line */}
        <div className="mt-4 h-px w-full bg-gradient-to-r from-transparent via-white/12 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
    </motion.div>
  ))}
</div>


        </motion.div>
      </div>
    </section>
  );
};

export default FinalCTA;