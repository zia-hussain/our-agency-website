import React from "react";
import { ArrowUpRight, MessageCircle, Quote, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { getSiteData } from "../../data/site";

const TestimonialsCarousel: React.FC = () => {
  const { testimonials } = getSiteData();

  if (!testimonials.length) return null;

  const [spotlight, ...rest] = testimonials;

  return (
    <section className="relative overflow-hidden bg-card/20 py-24 lg:py-28 border-y border-border/40">
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto mb-16 max-w-4xl text-center"
        >
          <div className="inline-flex items-center px-4 py-2 bg-card/50 backdrop-blur-xl border border-border rounded-full text-sm font-medium text-primary mb-8">
            <MessageCircle size={16} className="mr-2" />
            Client Feedback
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 tracking-tight leading-[1.1]">
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

        {/* Spotlight — one quote given room to breathe before the grid */}
        {spotlight && (
          <motion.article
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="group relative mb-6 lg:mb-8 overflow-hidden rounded-3xl border border-primary/20 bg-background/60 p-8 sm:p-10 lg:p-14 backdrop-blur-xl"
          >
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_85%_15%,rgba(196,138,100,0.10),transparent_45%)]" />
            <Quote size={40} className="relative mb-6 text-primary/50" />
            <blockquote className="relative max-w-3xl text-2xl sm:text-3xl font-medium leading-[1.35] tracking-tight text-foreground">
              "{spotlight.quote}"
            </blockquote>
            <div className="relative mt-8 flex flex-wrap items-center gap-4">
              <div
                aria-hidden="true"
                className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full border border-primary/25 bg-primary/10 text-sm font-semibold text-primary"
              >
                {spotlight.initials}
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-foreground">
                  {spotlight.author}, {spotlight.company}
                </p>
                <Link
                  to={`/portfolio/${spotlight.projectSlug}`}
                  className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors"
                >
                  <span>{spotlight.project}</span>
                  <ArrowUpRight size={11} className="shrink-0" />
                </Link>
              </div>
              <div className="flex items-center gap-0.5 text-primary sm:ml-auto">
                {Array.from({ length: spotlight.rating }).map((_, starIndex) => (
                  <Star key={starIndex} size={13} className="fill-current" />
                ))}
              </div>
            </div>
          </motion.article>
        )}

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
          {rest.map((testimonial, index) => (
            <motion.article
              key={testimonial.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -6 }}
              transition={{ duration: 0.4, delay: index * 0.06 }}
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-border/60 bg-background/60 p-6 lg:p-7 backdrop-blur-xl transition-all duration-300 hover:border-primary/30 hover:shadow-2xl hover:shadow-black/20"
            >
              <div className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent opacity-70" />

              <Quote size={22} className="mb-4 flex-shrink-0 text-primary/60" />

              <blockquote className="flex-grow text-base lg:text-lg font-medium leading-[1.5] tracking-tight text-foreground">
                "{testimonial.quote}"
              </blockquote>

              <div className="mt-6 flex-shrink-0 border-t border-border/50 pt-4">
                <div className="flex items-start gap-3">
                  <div
                    aria-hidden="true"
                    className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full border border-primary/25 bg-primary/10 text-xs font-semibold text-primary"
                  >
                    {testimonial.initials}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-sm font-semibold text-foreground">
                        {testimonial.author}, {testimonial.company}
                      </p>
                      <div className="hidden items-center gap-0.5 text-primary flex-shrink-0 sm:flex">
                        {Array.from({ length: testimonial.rating }).map((_, starIndex) => (
                          <Star key={starIndex} size={10} className="fill-current" />
                        ))}
                      </div>
                    </div>
                    <Link
                      to={`/portfolio/${testimonial.projectSlug}`}
                      className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors"
                    >
                      <span className="truncate">{testimonial.project}</span>
                      <ArrowUpRight size={11} className="shrink-0" />
                    </Link>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsCarousel;
