import React, { useState } from "react";
import { motion } from "framer-motion";
import { getSiteData } from "../../data/site";

const InfiniteLogoCarousel: React.FC = () => {
  const { companyLogosCarousel } = getSiteData();
  const [isPaused, setIsPaused] = useState(false);

  const duplicatedLogos = [...companyLogosCarousel.logos, ...companyLogosCarousel.logos];

  return (
    <section className="py-16 bg-background border-y border-border/30 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <p className="text-sm font-semibold text-muted-foreground uppercase tracking-widest">
            {companyLogosCarousel.title}
          </p>
        </motion.div>
      </div>

      <div
        className="relative"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Fade Masks */}
        <div className="absolute left-0 top-0 bottom-0 w-24 sm:w-32 bg-gradient-to-r from-background via-background/80 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 sm:w-32 bg-gradient-to-l from-background via-background/80 to-transparent z-10 pointer-events-none" />

        {/* Scrolling Logos */}
        <motion.div
          className="flex gap-8 sm:gap-12 md:gap-16 items-center"
          animate={{
            x: isPaused ? undefined : [0, "-50%"],
          }}
          transition={{
            x: {
              duration: 30,
              repeat: Infinity,
              ease: "linear",
            },
          }}
        >
          {duplicatedLogos.map((logo, index) => (
            <motion.div
              key={`${logo.name}-${index}`}
              className="flex-shrink-0 w-24 sm:w-32 md:w-36 h-12 sm:h-16 flex items-center justify-center grayscale hover:grayscale-0 opacity-40 hover:opacity-100 transition-all duration-300 cursor-pointer"
              whileHover={{ scale: 1.15 }}
              transition={{ duration: 0.2 }}
            >
              <img
                src={logo.imageUrl}
                alt={logo.name}
                className="max-w-full max-h-full object-contain"
                loading="lazy"
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default InfiniteLogoCarousel;
