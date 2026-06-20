import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import AnimatedSection from "./AnimatedSection";

export interface TestimonialCarouselItem {
  quote: string;
  author: string;
  role: string;
  company?: string;
}

interface TestimonialCarouselProps {
  eyebrow: string;
  titleStart?: string;
  titleAccent?: string;
  subtitle?: string;
  testimonials: TestimonialCarouselItem[];
}

const TestimonialCarousel: React.FC<TestimonialCarouselProps> = ({
  eyebrow,
  titleStart = "Client",
  titleAccent = "Notes",
  subtitle = "Short proof from people who trusted us with the work.",
  testimonials,
}) => {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    setActiveTestimonial(0);
  }, [eyebrow, testimonials.length]);

  useEffect(() => {
    if (testimonials.length < 2 || reduceMotion) return undefined;

    const interval = window.setInterval(() => {
      setActiveTestimonial((current) => (current + 1) % testimonials.length);
    }, 6000);

    return () => window.clearInterval(interval);
  }, [reduceMotion, testimonials.length]);

  if (testimonials.length === 0) return null;

  const testimonial = testimonials[activeTestimonial];

  return (
    <section className="py-24 bg-card/20 border-y border-border">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-14">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6 tracking-tight">
            {titleStart}
            <span className="block bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
              {titleAccent}
            </span>
          </h2>
          {subtitle && (
            <p className="text-lg text-muted-foreground font-light">{subtitle}</p>
          )}
        </AnimatedSection>

        <AnimatedSection>
          <div className="relative overflow-hidden rounded-2xl border border-border bg-background/45 p-1 backdrop-blur-xl">
            <div className="relative overflow-hidden rounded-[14px] bg-card/55">
              <motion.div
                key={`${testimonial.author}-${activeTestimonial}`}
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="min-h-[300px] p-7 sm:p-10 md:p-12"
              >
                <div className="mb-8 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full border border-primary/25 bg-primary/10">
                      <Quote size={18} className="text-primary" />
                    </div>
                    <div>
                      <div className="text-xs uppercase tracking-[0.2em] text-primary">
                        {eyebrow}
                      </div>
                      {testimonials.length > 1 && (
                        <div className="text-sm text-muted-foreground">
                          {activeTestimonial + 1} of {testimonials.length}
                        </div>
                      )}
                    </div>
                  </div>

                  {testimonials.length > 1 && (
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        aria-label="Previous testimonial"
                        onClick={() =>
                          setActiveTestimonial((current) =>
                            current === 0 ? testimonials.length - 1 : current - 1,
                          )
                        }
                        className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background/60 text-muted-foreground transition-colors duration-150 hover:border-primary/35 hover:text-primary"
                      >
                        <ChevronLeft size={18} />
                      </button>
                      <button
                        type="button"
                        aria-label="Next testimonial"
                        onClick={() =>
                          setActiveTestimonial((current) => (current + 1) % testimonials.length)
                        }
                        className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background/60 text-muted-foreground transition-colors duration-150 hover:border-primary/35 hover:text-primary"
                      >
                        <ChevronRight size={18} />
                      </button>
                    </div>
                  )}
                </div>

                <blockquote className="max-w-4xl text-2xl font-light leading-relaxed text-foreground md:text-3xl">
                  "{testimonial.quote}"
                </blockquote>

                <div className="mt-10 flex flex-col gap-2 border-t border-border/60 pt-6 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <div className="text-lg font-semibold text-foreground">
                      {testimonial.author}
                    </div>
                    <div className="text-primary">
                      {testimonial.role}
                      {testimonial.company ? `, ${testimonial.company}` : ""}
                    </div>
                  </div>

                  {testimonials.length > 1 && (
                    <div className="flex gap-2">
                      {testimonials.map((item, index) => (
                        <button
                          key={`${item.author}-${index}`}
                          type="button"
                          aria-label={`Show testimonial ${index + 1}`}
                          onClick={() => setActiveTestimonial(index)}
                          className={`h-2 rounded-full transition-all duration-200 ${
                            index === activeTestimonial
                              ? "w-8 bg-primary"
                              : "w-2 bg-muted-foreground/30 hover:bg-primary/60"
                          }`}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default TestimonialCarousel;
