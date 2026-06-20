import React, { useEffect, useMemo, useRef, useState } from "react";
import { ArrowUpRight, MapPin, Quote, Star } from "lucide-react";
import { Link } from "react-router-dom";
import {
  motion,
  useAnimationFrame,
  useInView,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";
import { getSiteData } from "../../data/site";

const TestimonialsCarousel: React.FC = () => {
  const { testimonials } = getSiteData();
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [loopWidth, setLoopWidth] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const reduceMotion = useReducedMotion();
  const isInView = useInView(trackRef, { margin: "300px 0px" });

  const baseVelocity = -30;
  const x = useMotionValue(0);
  const velocity = useMotionValue(baseVelocity);
  const smoothVelocity = useSpring(velocity, {
    damping: 85,
    stiffness: 460,
    restDelta: 0.001,
  });

  const repeatedTestimonials = useMemo(
    () => [...testimonials, ...testimonials],
    [testimonials]
  );

  useEffect(() => {
    const track = trackRef.current;
    if (!track || !testimonials.length) return;

    const measureLoopWidth = () => {
      const first = track.children[0] as HTMLElement | undefined;
      const secondSet = track.children[testimonials.length] as HTMLElement | undefined;
      if (!first || !secondSet) return;

      setLoopWidth(secondSet.offsetLeft - first.offsetLeft);
    };

    measureLoopWidth();

    const resizeObserver = new ResizeObserver(measureLoopWidth);
    resizeObserver.observe(track);

    return () => resizeObserver.disconnect();
  }, [testimonials.length]);

  useAnimationFrame((_, delta) => {
    if (!testimonials.length || !loopWidth || !isInView) return;

    velocity.set(isHovered || reduceMotion ? 0 : baseVelocity);

    const moveBy = smoothVelocity.get() * (delta / 1000);
    let nextX = x.get() + moveBy;

    if (nextX <= -loopWidth) {
      nextX += loopWidth;
    } else if (nextX > 0) {
      nextX -= loopWidth;
    }

    x.set(nextX);
  });

  if (!testimonials.length) return null;

  return (
    <section className="relative overflow-hidden border-y border-border/50 bg-background py-24 lg:py-28">
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto mb-16 max-w-4xl text-center"
        >
          <p className="mb-3 text-sm font-medium uppercase tracking-[0.3em] text-zinc-500/80">
            Client Feedback
          </p>
          <h2 className="text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            What founders say after
            <span className="block bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
              the work ships
            </span>
          </h2>
          <p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-muted-foreground">
            Quiet proof from people who trusted us with strategy, product
            decisions, and software delivery.
          </p>
        </motion.div>

        <div
          className="relative"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="pointer-events-none absolute bottom-0 left-0 top-0 z-10 w-24 bg-gradient-to-r from-background via-background to-transparent sm:w-40 md:w-56" />
          <div className="pointer-events-none absolute bottom-0 right-0 top-0 z-10 w-24 bg-gradient-to-l from-background via-background to-transparent sm:w-40 md:w-56" />

          <div className="overflow-hidden py-3">
            <motion.div
              ref={trackRef}
              className="flex items-stretch gap-5 will-change-transform sm:gap-6"
              style={{ x }}
            >
              {repeatedTestimonials.map((testimonial, index) => (
                <motion.article
                  key={`${testimonial.id}-${index}`}
                  whileHover={{
                    y: -4,
                    transition: { duration: 0.2, ease: "easeOut" },
                  }}
                  className="group relative flex h-[530px] w-[350px] flex-shrink-0 flex-col overflow-hidden rounded-2xl border border-border bg-card/45 p-6 backdrop-blur-xl transition-all duration-500 hover:border-primary/30 hover:bg-card/65 sm:h-[500px] sm:w-[500px] sm:p-7 lg:h-[470px] lg:w-[620px] lg:p-8"
                >
                  <div className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent opacity-70" />

                  <div className="mb-5 flex items-start justify-between gap-5">
                    <div className="flex items-center gap-3">
                      <div
                        aria-hidden="true"
                        className="flex h-12 w-12 items-center justify-center rounded-full border border-primary/25 bg-primary/10 text-sm font-semibold text-primary sm:h-14 sm:w-14"
                      >
                        {testimonial.initials}
                      </div>
                      <div>
                        <h3 className="text-base font-semibold text-foreground">
                          {testimonial.author}
                        </h3>
                        <p className="text-sm font-medium text-primary">
                          {testimonial.role}, {testimonial.company}
                        </p>
                        <div className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground">
                          <MapPin size={12} />
                          {testimonial.country}
                        </div>
                      </div>
                    </div>

                    <div className="hidden items-center gap-1 rounded-full border border-primary/20 bg-primary/10 px-2.5 py-1 text-primary sm:flex">
                      {Array.from({ length: testimonial.rating }).map((_, starIndex) => (
                        <Star key={starIndex} size={12} className="fill-current" />
                      ))}
                    </div>
                  </div>

                  <Quote size={30} className="mb-4 flex-shrink-0 text-primary/70" />

                  <blockquote className="flex-grow text-lg font-light leading-relaxed tracking-tight text-foreground sm:text-xl lg:text-2xl">
                    "{testimonial.quote}"
                  </blockquote>

                  <div className="mt-6 flex-shrink-0 border-t border-border/70 pt-5">
                    <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                      {testimonial.industry}
                    </p>
                    <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                      <Link
                        to={`/portfolio/${testimonial.projectSlug}`}
                        className="inline-flex items-center gap-2 text-sm font-semibold text-foreground transition-colors hover:text-primary"
                      >
                        <span className="line-clamp-1">{testimonial.project}</span>
                        <ArrowUpRight size={14} className="shrink-0" />
                      </Link>
                      <span className="w-fit rounded-full border border-primary/25 bg-background/50 px-3 py-1 text-xs font-semibold text-primary">
                        Verified project
                      </span>
                    </div>
                  </div>
                </motion.article>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsCarousel;
