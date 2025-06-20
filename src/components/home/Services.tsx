import React from 'react';
import { Link } from 'react-router-dom';
import { Monitor, Smartphone, Database, Cog, Rocket, Palette, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import AnimatedSection from '../common/AnimatedSection';

const Services: React.FC = () => {
  const services = [
    {
      icon: Monitor,
      title: "Web Applications",
      description: "Sophisticated web platforms built with modern frameworks, optimized for performance and scalability.",
      features: ["React & TypeScript", "Cloud Architecture", "Performance Optimization"],
      color: "terracotta"
    },
    {
      icon: Smartphone,
      title: "Mobile Apps",
      description: "Native iOS and Android applications that deliver seamless user experiences across all devices.",
      features: ["iOS & Android", "Cross-Platform", "App Store Optimization"],
      color: "sage"
    },
    {
      icon: Database,
      title: "Data Solutions",
      description: "Robust backend systems and APIs that power your applications with reliable, secure data management.",
      features: ["API Development", "Database Design", "Cloud Integration"],
      color: "terracotta"
    },
    {
      icon: Cog,
      title: "Automation",
      description: "Streamline your operations with intelligent automation solutions that save time and reduce errors.",
      features: ["Workflow Automation", "System Integration", "Process Optimization"],
      color: "sage"
    },
    {
      icon: Rocket,
      title: "MVP Development",
      description: "Launch your startup idea quickly with a minimum viable product that validates your concept.",
      features: ["Rapid Prototyping", "Market Validation", "Iterative Development"],
      color: "terracotta"
    },
    {
      icon: Palette,
      title: "UI/UX Design",
      description: "Beautiful, intuitive interfaces that create memorable experiences and drive user engagement.",
      features: ["User Research", "Design Systems", "Prototyping"],
      color: "sage"
    }
  ];

  return (
    <section id="services" className="py-24 lg:py-32 bg-charcoal relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, #C87B5B 2px, transparent 2px),
                           radial-gradient(circle at 75% 75%, #9CAF88 2px, transparent 2px)`,
          backgroundSize: '50px 50px'
        }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <AnimatedSection className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="inline-flex items-center px-4 py-2 bg-terracotta/20 border border-terracotta/30 rounded-full text-sm font-medium text-terracotta mb-8"
          >
            What We Do
          </motion.div>

          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-cream mb-8 tracking-tight leading-tight">
            Comprehensive
            <span className="block text-terracotta">Software Solutions</span>
          </h2>
          
          <p className="text-xl lg:text-2xl text-stone-light max-w-4xl mx-auto leading-relaxed font-light mb-12">
            From concept to deployment, we offer comprehensive software development 
            services that drive business growth and user satisfaction.
          </p>

          <Link to="/services">
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="group text-cream hover:text-terracotta font-medium px-6 py-3 
                       transition-colors duration-300 text-lg flex items-center gap-2 mx-auto
                       border border-cream/20 rounded-sm hover:border-terracotta/30 hover:bg-terracotta/5"
            >
              Explore All Services
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform duration-300" />
            </motion.button>
          </Link>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <AnimatedSection
              key={service.title}
              delay={index * 0.1}
              className="group"
            >
              <motion.div
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ duration: 0.3 }}
                className="bg-charcoal-light p-8 rounded-lg hover:bg-charcoal-lighter 
                         transition-all duration-500 border border-stone/10 hover:border-terracotta/30
                         h-full flex flex-col"
              >
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ duration: 0.3 }}
                  className={`inline-flex items-center justify-center w-16 h-16 rounded-xl mb-6 
                    ${service.color === 'terracotta' 
                      ? 'bg-terracotta/20 group-hover:bg-terracotta/30' 
                      : 'bg-sage/20 group-hover:bg-sage/30'
                    } transition-colors duration-300`}
                >
                  <service.icon 
                    size={28} 
                    className={`${service.color === 'terracotta' ? 'text-terracotta' : 'text-sage'}`} 
                  />
                </motion.div>
                
                <h3 className="text-xl font-semibold text-cream mb-4 group-hover:text-terracotta transition-colors duration-300">
                  {service.title}
                </h3>
                
                <p className="text-stone-light mb-6 leading-relaxed flex-grow">
                  {service.description}
                </p>
                
                <ul className="space-y-2">
                  {service.features.map((feature) => (
                    <li key={feature} className="text-sm text-stone flex items-center">
                      <div className={`w-1.5 h-1.5 rounded-full mr-3 ${
                        service.color === 'terracotta' ? 'bg-terracotta' : 'bg-sage'
                      }`}></div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;