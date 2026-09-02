import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { getSiteData } from "../../data/site";

const InfiniteLogoCarousel: React.FC = () => {
  const { companyLogosCarousel } = getSiteData();

  const logos = useMemo(
    () => companyLogosCarousel?.logos ?? [],
    [companyLogosCarousel?.logos]
  );

  const repeatedLogos = useMemo(() => [...logos, ...logos], [logos]);

  if (!logos.length) return null;

  return (
    <section className="py-14 lg:py-16 bg-background relative overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* No heading — a quiet, dark coda directly beneath the hero */}
        <div className="relative">
          {/* Edge fade masks */}
          <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-r from-background via-background to-transparent z-10" />
          <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-l from-background via-background to-transparent z-10" />

          {/* Logo track — CSS-driven infinite scroll, never pauses or drifts */}
          <div className="overflow-hidden py-2">
            <div className="flex items-center gap-14 sm:gap-20 lg:gap-28 w-max animate-marquee will-change-transform">
              {repeatedLogos.map((logo, index) => (
                <motion.div
                  key={`${logo.name}-${index}`}
                  className="flex-shrink-0"
                  whileHover={{
                    scale: 1.08,
                    transition: {
                      type: "spring",
                      stiffness: 400,
                      damping: 20,
                    },
                  }}
                >
                  <div className="group relative flex h-9 w-24 items-center justify-center sm:h-14 sm:w-32 lg:h-20 lg:w-44">
                    <img
                      src={logo.imageUrl}
                      alt={logo.name}
                      width="224"
                      height="112"
                      loading="lazy"
                      decoding="async"
                      fetchpriority="low"
                      className="relative h-full w-full object-contain opacity-35 transition-all duration-500 group-hover:scale-[1.05] group-hover:opacity-90"
                      draggable={false}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InfiniteLogoCarousel;
