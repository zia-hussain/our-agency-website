import React, { useCallback, useEffect } from "react";
import { Star, Quote, ChevronLeft, ChevronRight, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { getSiteData } from "../../data/site";

const TestimonialsCarousel: React.FC = () => {
  const { testimonials } = getSiteData();

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: "center",
      skipSnaps: false,
      dragFree: false,
      containScroll: "trimSnaps",
    },
    [Autoplay({ delay: 6000, stopOnInteraction: false })]
  );

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [scrollSnaps, setScrollSnaps] = React.useState<number[]>([]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on("select", onSelect);
    onSelect();
  }, [emblaApi, onSelect]);

  return (
    <section className="py-28 bg-background relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Impressive Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="text-center mb-20"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3 }}
            className="inline-flex items-center px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-sm font-medium text-primary mb-6"
          >
            <Star size={16} className="mr-2" />
            Client Feedback
          </motion.div>

          {/* Headline */}
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 tracking-tight leading-[1.1]">
            <span className="block text-foreground">Trusted By Founders and</span>
            <span className="block bg-gradient-to-r from-primary via-primary/90 to-primary/80 bg-clip-text text-transparent">
              CTOs Worldwide
            </span>
          </h2>

          {/* Subtitle */}
          <p className="text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Real feedback from international clients who transformed their businesses with our solutions
          </p>
        </motion.div>

        {/* Smooth Embla Carousel */}
        <div className="relative">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {testimonials.map((testimonial, index) => (
                <div
                  key={testimonial.id}
                  className="flex-[0_0_100%] min-w-0 px-4"
                >
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="bg-card/60 backdrop-blur-xl border border-border rounded-2xl lg:rounded-3xl p-6 sm:p-8 lg:p-12 hover:border-primary/30 transition-all duration-300 shadow-2xl max-w-5xl mx-auto"
                  >
                    {/* Quote Icon */}
                    <div className="w-12 h-12 lg:w-16 lg:h-16 bg-gradient-to-br from-primary/20 to-primary/30 border border-primary/30 rounded-xl lg:rounded-2xl flex items-center justify-center mx-auto mb-6 lg:mb-8">
                      <Quote size={20} className="lg:hidden text-primary" />
                      <Quote
                        size={28}
                        className="hidden lg:block text-primary"
                      />
                    </div>

                    {/* Rating Stars */}
                    <div className="flex justify-center mb-6 lg:mb-8">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.2, delay: i * 0.1 }}
                        >
                          <Star
                            size={16}
                            className="lg:hidden text-primary fill-current mx-0.5"
                          />
                          <Star
                            size={20}
                            className="hidden lg:block text-primary fill-current mx-0.5"
                          />
                        </motion.div>
                      ))}
                    </div>

                    {/* Quote Text - LARGER */}
                    <blockquote className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl text-foreground font-light leading-[1.5] mb-10 text-center max-w-4xl mx-auto">
                      "{testimonial.quote}"
                    </blockquote>

                    {/* Author Section - Mobile Optimized */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 lg:gap-6 mb-6 lg:mb-8">
                      <motion.img
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.15 }}
                        src={testimonial.avatar}
                        alt={testimonial.author}
                        className="w-14 h-14 lg:w-20 lg:h-20 rounded-full object-cover border-2 lg:border-3 border-border shadow-lg"
                      />
                      <div className="text-center sm:text-left">
                        <div className="font-bold text-foreground text-base lg:text-xl mb-1">
                          {testimonial.author}
                        </div>
                        <div className="text-primary font-semibold text-sm lg:text-base mb-1">
                          {testimonial.role}
                        </div>
                        <div className="text-xs lg:text-sm text-muted-foreground flex items-center gap-2 justify-center sm:justify-start">
                          <span>{testimonial.company}</span>
                          <span>•</span>
                          <div className="flex items-center gap-1">
                            <MapPin size={10} className="lg:hidden" />
                            <MapPin size={12} className="hidden lg:block" />
                            <span>{testimonial.country}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Project Result Badge - Mobile Optimized */}
                    <div className="text-center">
                      <div className="inline-flex items-center px-3 lg:px-4 py-2 bg-gradient-to-r from-primary/20 to-primary/10 text-primary rounded-full text-xs lg:text-sm font-semibold border border-primary/30">
                        <span className="hidden sm:inline">
                          {testimonial.project} •{" "}
                        </span>
                        <span className="sm:hidden">
                          {testimonial.project.split(" ").slice(0, 2).join(" ")}{" "}
                          •{" "}
                        </span>
                        {testimonial.results}
                      </div>
                    </div>
                  </motion.div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows - Mobile Optimized */}
          <motion.button
            onClick={scrollPrev}
            whileHover={{ scale: 1.1, x: -2 }}
            whileTap={{ scale: 0.9 }}
            transition={{ duration: 0.15 }}
            className="absolute left-2 lg:left-4 top-1/2 -translate-y-1/2 w-10 h-10 lg:w-14 lg:h-14 bg-card/80 backdrop-blur-xl border border-border rounded-full flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/30 hover:bg-card transition-all duration-150 shadow-lg z-10"
          >
            <ChevronLeft size={18} className="lg:hidden" />
            <ChevronLeft size={20} className="hidden lg:block" />
          </motion.button>

          <motion.button
            onClick={scrollNext}
            whileHover={{ scale: 1.1, x: 2 }}
            whileTap={{ scale: 0.9 }}
            transition={{ duration: 0.15 }}
            className="absolute right-2 lg:right-4 top-1/2 -translate-y-1/2 w-10 h-10 lg:w-14 lg:h-14 bg-card/80 backdrop-blur-xl border border-border rounded-full flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/30 hover:bg-card transition-all duration-150 shadow-lg z-10"
          >
            <ChevronRight size={18} className="lg:hidden" />
            <ChevronRight size={20} className="hidden lg:block" />
          </motion.button>
        </div>

        {/* Indicators */}
        <div className="flex justify-center gap-2 lg:gap-3 mt-8">
          {scrollSnaps.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => emblaApi?.scrollTo(index)}
              whileHover={{ scale: 1.3 }}
              whileTap={{ scale: 0.9 }}
              transition={{ duration: 0.15 }}
              className={`w-2 h-2 lg:w-3 lg:h-3 rounded-full transition-all duration-300 ${
                selectedIndex === index
                  ? "bg-primary scale-125"
                  : "bg-border hover:bg-primary/50"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsCarousel;
