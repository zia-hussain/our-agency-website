import React, { useState, useEffect } from "react";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";
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
    }, 6000);
    
    return () => clearInterval(interval);
  }, [testimonials.length, isAutoPlaying]);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    setIsAutoPlaying(false);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setIsAutoPlaying(false);
  };

  const goToTestimonial = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
  };

  return (
    <section className="py-24 bg-[#0C0C0C] relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-6xl font-bold text-[#EDEDED] mb-6 tracking-tight leading-tight">
            What Our Global
            <span className="block bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
              Clients Say
            </span>
          </h2>
          <p className="text-xl text-[#B6B6B6] max-w-4xl mx-auto leading-[1.7] font-light">
            Real feedback from international clients across the US, UK, Canada, Australia, UAE, and Singapore
          </p>
        </motion.div>

        {/* Testimonial Carousel */}
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="bg-[#131313]/60 backdrop-blur-xl border border-[#1E1E1E]/60 rounded-2xl p-12 text-center hover:border-primary/30 transition-all duration-140"
            >
              {/* Quote Icon */}
              <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-primary/30 border border-primary/30 rounded-full flex items-center justify-center mx-auto mb-8">
                <Quote size={24} className="text-primary" />
              </div>

              {/* Rating */}
              <div className="flex justify-center mb-6">
                {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                  <Star key={i} size={20} className="text-primary fill-current" />
                ))}
              </div>

              {/* Quote */}
              <blockquote className="text-2xl md:text-3xl text-[#EDEDED] font-light leading-[1.7] mb-8 italic max-w-4xl mx-auto">
                "{testimonials[currentIndex].quote}"
              </blockquote>

              {/* Author Info */}
              <div className="flex items-center justify-center gap-6">
                <motion.img
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.12 }}
                  src={testimonials[currentIndex].avatar}
                  alt={testimonials[currentIndex].author}
                  className="w-16 h-16 rounded-full object-cover border-2 border-[#1E1E1E]/60"
                />
                <div className="text-left">
                  <div className="font-semibold text-[#EDEDED] text-lg">
                    {testimonials[currentIndex].author}
                  </div>
                  <div className="text-primary font-medium">
                    {testimonials[currentIndex].role}
                  </div>
                  <div className="text-sm text-[#B6B6B6]">
                    {testimonials[currentIndex].company} • {testimonials[currentIndex].country}
                  </div>
                </div>
              </div>

              {/* Project Result */}
              <div className="mt-6 inline-flex items-center px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium border border-primary/20">
                {testimonials[currentIndex].project} • {testimonials[currentIndex].results}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Arrows */}
          <motion.button
            onClick={prevTestimonial}
            whileHover={{ scale: 1.1, x: -2 }}
            whileTap={{ scale: 0.9 }}
            transition={{ duration: 0.12 }}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-[#131313]/80 backdrop-blur-xl border border-[#1E1E1E]/60 rounded-full flex items-center justify-center text-[#B6B6B6] hover:text-primary hover:border-primary/30 transition-all duration-120"
          >
            <ChevronLeft size={20} />
          </motion.button>

          <motion.button
            onClick={nextTestimonial}
            whileHover={{ scale: 1.1, x: 2 }}
            whileTap={{ scale: 0.9 }}
            transition={{ duration: 0.12 }}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-[#131313]/80 backdrop-blur-xl border border-[#1E1E1E]/60 rounded-full flex items-center justify-center text-[#B6B6B6] hover:text-primary hover:border-primary/30 transition-all duration-120"
          >
            <ChevronRight size={20} />
          </motion.button>
        </div>

        {/* Indicators */}
        <div className="flex justify-center gap-2 mt-8">
          {testimonials.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => goToTestimonial(index)}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              transition={{ duration: 0.12 }}
              className={`w-2 h-2 rounded-full transition-all duration-120 ${
                currentIndex === index
                  ? "bg-primary shadow-[0_0_10px_rgba(196,138,100,0.5)]"
                  : "bg-[#1E1E1E] hover:bg-primary/50"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsCarousel;