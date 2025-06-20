import React, { useEffect, useRef, useState } from 'react';
import { ExternalLink, ArrowRight } from 'lucide-react';

const Portfolio: React.FC = () => {
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

  const projects = [
    {
      title: "FinanceFlow Dashboard",
      category: "Web Application",
      description: "A comprehensive financial analytics platform with real-time data visualization and automated reporting capabilities.",
      image: "https://images.pexels.com/photos/7688336/pexels-photo-7688336.jpeg?auto=compress&cs=tinysrgb&w=800",
      tags: ["React", "TypeScript", "D3.js", "Node.js"]
    },
    {
      title: "WellnessTracker Mobile",
      category: "Mobile App",
      description: "An intuitive health and wellness tracking application with personalized insights and goal management.",
      image: "https://images.pexels.com/photos/4386370/pexels-photo-4386370.jpeg?auto=compress&cs=tinysrgb&w=800",
      tags: ["React Native", "Firebase", "Machine Learning"]
    },
    {
      title: "RetailOps Automation",
      category: "Enterprise Solution",
      description: "End-to-end inventory management and order processing automation for a growing e-commerce business.",
      image: "https://images.pexels.com/photos/7688880/pexels-photo-7688880.jpeg?auto=compress&cs=tinysrgb&w=800",
      tags: ["Python", "AWS", "PostgreSQL", "REST API"]
    }
  ];

  return (
    <section 
      id="portfolio" 
      ref={sectionRef}
      className="py-24 lg:py-32 bg-cream"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-bold text-charcoal mb-6 tracking-tight">
              Featured Projects
            </h2>
            <p className="text-xl text-stone max-w-3xl mx-auto leading-relaxed font-light">
              A selection of our recent work that showcases our commitment to excellence 
              and innovation in software development.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
            {projects.map((project, index) => (
              <div 
                key={project.title}
                className={`group cursor-pointer transition-all duration-700 ${
                  isVisible 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <div className="relative overflow-hidden rounded-sm mb-6 aspect-[4/3]">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-charcoal/20 group-hover:bg-charcoal/10 transition-colors duration-300"></div>
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="bg-cream/90 p-2 rounded-sm">
                      <ExternalLink size={16} className="text-charcoal" />
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-terracotta uppercase tracking-wide">
                      {project.category}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-semibold text-charcoal group-hover:text-terracotta transition-colors duration-300">
                    {project.title}
                  </h3>
                  
                  <p className="text-stone leading-relaxed">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 pt-2">
                    {project.tags.map((tag) => (
                      <span 
                        key={tag}
                        className="text-xs px-3 py-1 bg-stone/10 text-stone rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-16">
            <button className="group text-charcoal hover:text-terracotta font-medium 
                             transition-colors duration-300 flex items-center gap-2 mx-auto">
              View All Projects
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;