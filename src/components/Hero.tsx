import React, { useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';

const Hero: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="min-h-screen bg-cream flex items-center justify-center relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className={`transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-charcoal mb-6 leading-tight tracking-tight">
            We Build
            <span className="block text-terracotta">Exceptional Software</span>
          </h1>
          
          <p className="text-lg md:text-xl text-stone max-w-3xl mx-auto mb-12 leading-relaxed font-light">
            Zumetrix Labs crafts premium digital experiences for forward-thinking companies. 
            From elegant web applications to sophisticated mobile solutions, we transform 
            your vision into extraordinary software.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={scrollToContact}
              className="group bg-charcoal text-cream px-8 py-4 rounded-sm font-medium 
                       hover:bg-charcoal-light transition-all duration-300 
                       flex items-center gap-2 text-lg"
            >
              Start Your Project
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform duration-300" />
            </button>
            
            <button
              onClick={() => document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' })}
              className="text-charcoal hover:text-terracotta font-medium px-8 py-4 
                       transition-colors duration-300 text-lg"
            >
              View Our Work
            </button>
          </div>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-terracotta/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-stone/5 rounded-full blur-3xl"></div>
    </section>
  );
};

export default Hero;