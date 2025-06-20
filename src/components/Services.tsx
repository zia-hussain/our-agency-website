import React, { useEffect, useRef, useState } from 'react';
import { Monitor, Smartphone, Database, Cog, Rocket, Palette } from 'lucide-react';

const Services: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const services = [
    {
      icon: Monitor,
      title: "Web Applications",
      description: "Sophisticated web platforms built with modern frameworks, optimized for performance and scalability.",
      features: ["React & TypeScript", "Cloud Architecture", "Performance Optimization"]
    },
    {
      icon: Smartphone,
      title: "Mobile Apps",
      description: "Native iOS and Android applications that deliver seamless user experiences across all devices.",
      features: ["iOS & Android", "Cross-Platform", "App Store Optimization"]
    },
    {
      icon: Database,
      title: "Data Solutions",
      description: "Robust backend systems and APIs that power your applications with reliable, secure data management.",
      features: ["API Development", "Database Design", "Cloud Integration"]
    },
    {
      icon: Cog,
      title: "Automation",
      description: "Streamline your operations with intelligent automation solutions that save time and reduce errors.",
      features: ["Workflow Automation", "System Integration", "Process Optimization"]
    },
    {
      icon: Rocket,
      title: "MVP Development",
      description: "Launch your startup idea quickly with a minimum viable product that validates your concept.",
      features: ["Rapid Prototyping", "Market Validation", "Iterative Development"]
    },
    {
      icon: Palette,
      title: "UI/UX Design",
      description: "Beautiful, intuitive interfaces that create memorable experiences and drive user engagement.",
      features: ["User Research", "Design Systems", "Prototyping"]
    }
  ];

  return (
    <section 
      id="services" 
      ref={sectionRef}
      className="py-24 lg:py-32 bg-charcoal"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-bold text-cream mb-6 tracking-tight">
              What We Do
            </h2>
            <p className="text-xl text-stone-light max-w-3xl mx-auto leading-relaxed font-light">
              From concept to deployment, we offer comprehensive software development 
              services that drive business growth and user satisfaction.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div 
                key={service.title}
                className={`group bg-charcoal-light p-8 rounded-sm hover:bg-charcoal-light/80 
                          transition-all duration-500 border border-stone/10 hover:border-terracotta/30
                          ${isVisible 
                            ? 'opacity-100 translate-y-0' 
                            : 'opacity-0 translate-y-8'
                          }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="inline-flex items-center justify-center w-12 h-12 bg-terracotta/20 rounded-sm mb-6 group-hover:bg-terracotta/30 transition-colors duration-300">
                  <service.icon size={24} className="text-terracotta" />
                </div>
                
                <h3 className="text-xl font-semibold text-cream mb-4">
                  {service.title}
                </h3>
                
                <p className="text-stone-light mb-6 leading-relaxed">
                  {service.description}
                </p>
                
                <ul className="space-y-2">
                  {service.features.map((feature) => (
                    <li key={feature} className="text-sm text-stone flex items-center">
                      <div className="w-1 h-1 bg-terracotta rounded-full mr-3"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;