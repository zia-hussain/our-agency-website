import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight, Mail, MessageCircle } from 'lucide-react';

const CTA: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section 
      id="contact" 
      ref={sectionRef}
      className="py-24 lg:py-32 bg-cream relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className={`text-center transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-charcoal mb-8 tracking-tight leading-tight">
            Let's Build Something
            <span className="block text-terracotta">Exceptional Together</span>
          </h2>
          
          <p className="text-xl text-stone max-w-3xl mx-auto mb-12 leading-relaxed font-light">
            Ready to transform your vision into reality? We're here to help you create 
            software that doesn't just meet expectations—it exceeds them.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <button className="group bg-charcoal text-cream px-8 py-4 rounded-sm font-medium 
                             hover:bg-charcoal-light transition-all duration-300 
                             flex items-center gap-2 text-lg">
              <Mail size={20} />
              hello@zumetrixlabs.com
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform duration-300" />
            </button>
            
            <button className="group bg-terracotta text-cream px-8 py-4 rounded-sm font-medium 
                             hover:bg-terracotta-light transition-all duration-300 
                             flex items-center gap-2 text-lg">
              <MessageCircle size={20} />
              Schedule a Call
            </button>
          </div>

          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className={`transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`} style={{ transitionDelay: '200ms' }}>
              <h3 className="font-semibold text-charcoal mb-2">Quick Response</h3>
              <p className="text-stone">We respond to all inquiries within 24 hours</p>
            </div>
            
            <div className={`transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`} style={{ transitionDelay: '400ms' }}>
              <h3 className="font-semibold text-charcoal mb-2">Free Consultation</h3>
              <p className="text-stone">30-minute strategy session to discuss your project</p>
            </div>
            
            <div className={`transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`} style={{ transitionDelay: '600ms' }}>
              <h3 className="font-semibold text-charcoal mb-2">No Obligation</h3>
              <p className="text-stone">Honest advice with no pressure to commit</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-terracotta/5 rounded-full blur-3xl -translate-x-48 -translate-y-48"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-stone/5 rounded-full blur-3xl translate-x-48 translate-y-48"></div>
    </section>
  );
};

export default CTA;