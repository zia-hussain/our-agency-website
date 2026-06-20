import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  motion,
  useAnimationFrame,
  useInView,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";
import { getSiteData } from "../../data/site";

const InfiniteLogoCarousel: React.FC = () => {
  const { companyLogosCarousel } = getSiteData();

  const trackRef = useRef<HTMLDivElement | null>(null);
  const [loopWidth, setLoopWidth] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const reduceMotion = useReducedMotion();
  const isInView = useInView(trackRef, { margin: "300px 0px" });

  // Negative = left scroll. Pixel-per-second based speed keeps motion consistent across devices.
  const baseVelocity = -42;
  const x = useMotionValue(0);
  const velocity = useMotionValue(baseVelocity);

  // Smooth spring makes hover pause/resume feel natural instead of instantly stopping.
  const smoothVelocity = useSpring(velocity, {
    damping: 80,
    stiffness: 500,
    restDelta: 0.001,
  });

  const logos = useMemo(
    () => companyLogosCarousel?.logos ?? [],
    [companyLogosCarousel?.logos]
  );

  const repeatedLogos = useMemo(
    () => [...logos, ...logos],
    [logos]
  );

  useEffect(() => {
    const track = trackRef.current;
    if (!track || !logos.length) return;

    const measureLoopWidth = () => {
      const firstLogo = track.children[0] as HTMLElement | undefined;
      const firstLogoOfSecondSet = track.children[logos.length] as HTMLElement | undefined;

      if (!firstLogo || !firstLogoOfSecondSet) return;

      const exactLoopWidth = firstLogoOfSecondSet.offsetLeft - firstLogo.offsetLeft;
      setLoopWidth(exactLoopWidth);
    };

    measureLoopWidth();

    const resizeObserver = new ResizeObserver(measureLoopWidth);
    resizeObserver.observe(track);

    return () => resizeObserver.disconnect();
  }, [logos]);

  // Continuous animation. Uses measured DOM width, not estimated card width, so the loop is invisible.
  useAnimationFrame((_, delta) => {
    if (!logos.length || !loopWidth || !isInView) return;

    velocity.set(isHovered || reduceMotion ? 0 : baseVelocity);

    const moveBy = smoothVelocity.get() * (delta / 1000);
    let newX = x.get() + moveBy;

    if (newX <= -loopWidth) {
      newX += loopWidth;
    } else if (newX > 0) {
      newX -= loopWidth;
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
          <p className="font-medium tracking-[0.3em] uppercase text-zinc-500/80 mb-3 sm:text-xl">
            {companyLogosCarousel?.eyebrow || "TRUSTED BY"}
          </p>
          <h2 className="text-2xl sm:text-5xl !text-foreground font-light tracking-wide">
            {companyLogosCarousel?.title || "Companies building the future"}
            <span className="block bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
              {companyLogosCarousel?.themedTitle}
            </span>
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
              ref={trackRef}
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
                      damping: 20,
                    },
                  }}
                >

                  <div className="group relative flex h-20 w-40 items-center justify-center sm:h-28 sm:w-56">
                    <div className="pointer-events-none absolute inset-x-8 bottom-2 h-px bg-gradient-to-r from-transparent via-primary/25 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                    <img
                      src={logo.imageUrl}
                      alt={logo.name}
                      width="224"
                      height="112"
                      loading="lazy"
                      decoding="async"
                      fetchpriority="low"
                      className="relative h-full w-full object-contain opacity-30 transition-all duration-500 group-hover:scale-[1.04] group-hover:opacity-95"
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
