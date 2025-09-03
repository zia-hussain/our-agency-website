import React, { useState, useEffect } from "react";
import { Star, Quote, ChevronLeft, ChevronRight, MapPin } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { getSiteData } from "../../data/site";

const TestimonialsCarousel: React.FC = () => {
  const { testimonials } = getSiteData();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-advance testimonials
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 7000);

    return () => clearInterval(interval);
  }, [testimonials.length, isAutoPlaying]);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const prevTestimonial = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const goToTestimonial = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  return (
    <section className="py-20 lg:py-24 bg-background relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="text-center mb-16 lg:mb-20"
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 tracking-tight leading-[1.1]">
            What Our Global
            <span className="block bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
              Clients Say
            </span>
          </h2>
          <p className="text-lg sm:text-xl lg:text-2xl text-muted-foreground max-w-4xl mx-auto leading-[1.6] font-light">
            Real feedback from international clients across the US, UK, Canada, Australia, UAE, and Singapore
          </p>
        </motion.div>

        {/* Premium Testimonial Carousel */}
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 100, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -100, scale: 0.95 }}
              transition={{ 
                duration: 0.6, 
                ease: [0.25, 0.46, 0.45, 0.94] // Premium easing curve
              }}
              className="bg-card/60 backdrop-blur-xl border border-border rounded-3xl p-8 lg:p-12 hover:border-primary/30 transition-all duration-300 shadow-2xl"
            >
              {/* Quote Icon */}
              <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-primary/30 border border-primary/30 rounded-2xl flex items-center justify-center mx-auto mb-8">
                <Quote size={28} className="text-primary" />
              </div>

              {/* Rating Stars */}
              <div className="flex justify-center mb-8">
                {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.2, delay: i * 0.1 }}
                  >
                    <Star size={20} className="text-primary fill-current mx-0.5" />
                  </motion.div>
                ))}
              </div>

              {/* Quote Text */}
              <blockquote className="text-xl sm:text-2xl lg:text-3xl text-foreground font-light leading-[1.5] mb-10 italic text-center max-w-4xl mx-auto">
                "{testimonials[currentIndex].quote}"
              </blockquote>

              {/* Author Section */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-8">
                <motion.img
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.15 }}
                  src={testimonials[currentIndex].avatar}
                  alt={testimonials[currentIndex].author}
                  className="w-16 h-16 lg:w-20 lg:h-20 rounded-full object-cover border-3 border-border shadow-lg"
                />
                <div className="text-center sm:text-left">
                  <div className="font-bold text-foreground text-lg lg:text-xl mb-1">
                    {testimonials[currentIndex].author}
                  </div>
                  <div className="text-primary font-semibold mb-1">
                    {testimonials[currentIndex].role}
                  </div>
                  <div className="text-sm text-muted-foreground flex items-center gap-2 justify-center sm:justify-start">
                    <span>{testimonials[currentIndex].company}</span>
                    <span>•</span>
                    <div className="flex items-center gap-1">
                      <MapPin size={12} />
                      <span>{testimonials[currentIndex].country}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Project Result Badge */}
              <div className="text-center">
                <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-primary/20 to-primary/10 text-primary rounded-full text-sm font-semibold border border-primary/30">
                  {testimonials[currentIndex].project} • {testimonials[currentIndex].results}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Arrows - Premium Style */}
          <motion.button
            onClick={prevTestimonial}
            whileHover={{ scale: 1.1, x: -2 }}
            whileTap={{ scale: 0.9 }}
            transition={{ duration: 0.15 }}
            className="absolute left-2 lg:left-4 top-1/2 -translate-y-1/2 w-12 h-12 lg:w-14 lg:h-14 bg-card/80 backdrop-blur-xl border border-border rounded-full flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/30 hover:bg-card transition-all duration-150 shadow-lg"
          >
            <ChevronLeft size={20} />
          </motion.button>

          <motion.button
            onClick={nextTestimonial}
            whileHover={{ scale: 1.1, x: 2 }}
            whileTap={{ scale: 0.9 }}
            transition={{ duration: 0.15 }}
            className="absolute right-2 lg:right-4 top-1/2 -translate-y-1/2 w-12 h-12 lg:w-14 lg:h-14 bg-card/80 backdrop-blur-xl border border-border rounded-full flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/30 hover:bg-card transition-all duration-150 shadow-lg"
          >
            <ChevronRight size={20} />
          </motion.button>
        </div>

        {/* Premium Indicators */}
        <div className="flex justify-center gap-3 mt-8">
          {testimonials.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => goToTestimonial(index)}
              whileHover={{ scale: 1.3 }}
              whileTap={{ scale: 0.9 }}
              transition={{ duration: 0.15 }}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                currentIndex === index
                  ? "bg-primary shadow-glow scale-125"
                  : "bg-border hover:bg-primary/50"
              }`}
            />
          ))}
        </div>

        {/* Auto-play Indicator */}
        <div className="text-center mt-6">
          <div className="inline-flex items-center gap-2 text-xs text-muted-foreground">
            <div className={`w-2 h-2 rounded-full ${isAutoPlaying ? 'bg-primary animate-pulse' : 'bg-border'}`} />
            <span>{isAutoPlaying ? 'Auto-playing' : 'Paused'}</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsCarousel;