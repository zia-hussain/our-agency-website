import React, { useState, useEffect, useRef } from "react";
import { motion, useAnimationFrame, useMotionValue, useTransform, useSpring } from "framer-motion";
import { getSiteData } from "../../data/site";

const InfiniteLogoCarousel: React.FC = () => {
  const { companyLogosCarousel } = getSiteData();
  
  const [isHovered, setIsHovered] = useState(false);
  const baseVelocity = -1; // pixels per frame (negative = left scroll)
  const x = useMotionValue(0);
  const velocity = useMotionValue(baseVelocity);
  
  // Super smooth spring physics for the brake effect
  const smoothVelocity = useSpring(velocity, {
    damping: 50,
    stiffness: 400,
    restDelta: 0.001
  });

  const logos = companyLogosCarousel?.logos ?? [];
  // Quadruple for extra smooth infinite loop
  const repeatedLogos = [...logos, ...logos, ...logos, ...logos];
  
  const totalWidth = repeatedLogos.length * 200; // approximate width per logo
  const singleSetWidth = logos.length * 200;

  // Continuous animation with smooth brake on hover
  useAnimationFrame((t, delta) => {
    if (!logos.length) return;

    // Target velocity based on hover state
    const targetVelocity = isHovered ? 0 : baseVelocity;
    velocity.set(targetVelocity);

    // Move based on current velocity
    let moveBy = smoothVelocity.get() * (delta / 16);
    
    let newX = x.get() + moveBy;
    
    // Seamless loop - reset when we've scrolled one full set
    if (newX <= -singleSetWidth) {
      newX = 0;
    }
    
    x.set(newX);
  });

  if (!logos.length) return null;

  return (
    <section className="py-20 bg-background relative overflow-hidden border-t border-b border-zinc-800/50">
      {/* Ambient background */}
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16 sm:mb-20"
        >
          <p className="am:text-xl font-medium tracking-[0.3em] uppercase text-zinc-500/80 mb-3">
            {companyLogosCarousel?.eyebrow || "TRUSTED BY"}
          </p>
          <h2 className="text-2xl sm:text-5xl !text-foreground font-light tracking-wide">
            {companyLogosCarousel?.title || "Companies building the future"}
            <span className="block bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">{companyLogosCarousel?.themedTitle}</span>
          </h2>
        </motion.div>

        {/* Carousel */}
        <div 
          className="relative"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Edge fade masks */}
          <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-24 sm:w-40 md:w-56 bg-gradient-to-r from-background via-background to-transparent z-10" />
          <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-24 sm:w-40 md:w-56 bg-gradient-to-l from-background via-background to-transparent z-10" />
          
          {/* Logo track */}
          <div className="overflow-hidden py-4">
            <motion.div
              className="flex items-center gap-8 sm:gap-12 will-change-transform"
              style={{ x }}
            >
              {repeatedLogos.map((logo, index) => (
                <motion.div
                  key={`${logo.name}-${index}`}
                  className="flex-shrink-0"
                  whileHover={{ 
                    scale: 1.08,
                    transition: { 
                      type: "spring",
                      stiffness: 400,
                      damping: 20
                    }
                  }}
                >
                  <div className="group relative flex h-16 sm:h-20 w-32 sm:w-40 items-center justify-center rounded-lg sm:rounded-xl bg-zinc-900/40 border border-zinc-800/50 hover:border-zinc-700/60 hover:bg-zinc-900/60 backdrop-blur-sm transition-all duration-500 ease-out">
                    {/* Glow effect on hover */}
                    <div className="absolute inset-0 rounded-lg sm:rounded-xl bg-gradient-to-br from-zinc-700/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    <img
                      src={logo.imageUrl}
                      alt={logo.name}
                      className="relative max-h-[50%] max-w-[70%] object-contain opacity-30 group-hover:opacity-60 transition-opacity duration-500 brightness-0 invert"
                      draggable={false}
                    />
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InfiniteLogoCarousel;