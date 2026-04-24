import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { getSiteData } from "../../data/site";

const InfiniteLogoCarousel: React.FC = () => {
  const { companyLogosCarousel } = getSiteData();

  const trackRef = useRef<HTMLDivElement | null>(null);
  const [loopWidth, setLoopWidth] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

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
    () => [...logos, ...logos, ...logos, ...logos, ...logos, ...logos],
    [logos]
  );

  useEffect(() => {
    if (!logos.length) return;

    const preloadedImages: HTMLImageElement[] = [];

    logos.forEach((logo) => {
      const img = new Image();
      img.src = logo.imageUrl;
      preloadedImages.push(img);
    });

    return () => {
      preloadedImages.length = 0;
    };
  }, [logos]);

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
    if (!logos.length || !loopWidth) return;

    velocity.set(isHovered ? 0 : baseVelocity);

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
          <p className="am:text-xl font-medium tracking-[0.3em] uppercase text-zinc-500/80 mb-3">
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
                  <div
                    className="group relative flex py-[0.1rem] h-16 sm:h-32 w-32 sm:w-60 items-center justify-center overflow-hidden rounded-[1.35rem] 
bg-[linear-gradient(135deg,rgba(255,255,255,0.05),rgba(255,255,255,0.015)_45%,rgba(255,255,255,0.035))] 
backdrop-blur-xl transition-all duration-700 ease-out 
hover:bg-[linear-gradient(135deg,rgba(255,255,255,0.08),rgba(255,255,255,0.02)_45%,rgba(255,255,255,0.05))]"
                  >
                    {/* glass border */}
                    <div
                      className="pointer-events-none absolute inset-0 rounded-[1.35rem] ring-1 ring-inset ring-white/[0.06] 
  transition-all duration-700 group-hover:ring-white/[0.12]"
                    />

                    {/* top light line */}
                    <div
                      className="pointer-events-none absolute inset-x-6 top-0 h-px 
  bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-40"
                    />

                    {/* subtle glow */}
                    <div
                      className="pointer-events-none absolute bottom-[-30%] left-1/2 h-24 w-28 -translate-x-1/2 
  rounded-full bg-primary/10 blur-2xl opacity-0 
  transition-all duration-700 group-hover:opacity-100"
                    />

                    <img
                      src={logo.imageUrl}
                      alt={logo.name}
                      loading={index < logos.length ? "eager" : "lazy"}
                      decoding="async"
                      fetchPriority={index < logos.length ? "high" : "low"}
                      className="relative h-[100%] w-full object-contain 
    opacity-35 brightness-0 invert grayscale 
    transition-all duration-700 
    group-hover:scale-[1.05] 
    group-hover:opacity-90 
    group-hover:grayscale-0"
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
