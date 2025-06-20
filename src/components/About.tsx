import React, { useEffect, useRef, useState } from 'react';
import { Target, Users, Zap } from 'lucide-react';

const About: React.FC = () => {
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

  const values = [
    {
      icon: Target,
      title: "Precision",
      description: "Every line of code, every pixel, every interaction is crafted with meticulous attention to detail."
    },
    {
      icon: Users,
      title: "Partnership",
      description: "We work alongside you as true partners, not just vendors, to achieve your business objectives."
    },
    {
      icon: Zap,
      title: "Innovation",
      description: "We leverage cutting-edge technologies to build solutions that give you a competitive advantage."
    }
  ];

  return (
    <section 
      id="about" 
      ref={sectionRef}
      className="py-24 lg:py-32 bg-cream"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-bold text-charcoal mb-6 tracking-tight">
              Our Vision
            </h2>
            <p className="text-xl text-stone max-w-4xl mx-auto leading-relaxed font-light">
              We believe exceptional software is born from the intersection of technical mastery, 
              design excellence, and deep understanding of human needs. Our mission is to create 
              digital experiences that don't just function—they inspire.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12 lg:gap-16">
            {values.map((value, index) => (
              <div 
                key={value.title}
                className={`text-center transition-all duration-700 ${
                  isVisible 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-terracotta/10 rounded-full mb-6">
                  <value.icon size={32} className="text-terracotta" />
                </div>
                <h3 className="text-xl font-semibold text-charcoal mb-4">
                  {value.title}
                </h3>
                <p className="text-stone leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;