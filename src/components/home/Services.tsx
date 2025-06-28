import React from 'react';
import { Link } from 'react-router-dom';
import { Monitor, Smartphone, Database, Cog, Rocket, Palette, ArrowRight, Code } from 'lucide-react';
import { motion } from 'framer-motion';

const Services: React.FC = () => {
  const services = [
    {
      icon: Monitor,
      title: "Web Applications",
      description: "Sophisticated web platforms built with modern frameworks, optimized for performance and scalability.",
      features: ["React & TypeScript", "Cloud Architecture", "Performance Optimization"],
      gradient: "warm-gradient"
    },
    {
      icon: Smartphone,
      title: "Mobile Apps",
      description: "Native iOS and Android applications that deliver seamless user experiences across all devices.",
      features: ["iOS & Android", "Cross-Platform", "App Store Optimization"],
      gradient: "accent-gradient"
    },
    {
      icon: Database,
      title: "Data Solutions",
      description: "Robust backend systems and APIs that power your applications with reliable, secure data management.",
      features: ["API Development", "Database Design", "Cloud Integration"],
      gradient: "success-gradient"
    },
    {
      icon: Cog,
      title: "Automation",
      description: "Streamline your operations with intelligent automation solutions that save time and reduce errors.",
      features: ["Workflow Automation", "System Integration", "Process Optimization"],
      gradient: "warm-gradient"
    },
    {
      icon: Rocket,
      title: "MVP Development",
      description: "Launch your startup idea quickly with a minimum viable product that validates your concept.",
      features: ["Rapid Prototyping", "Market Validation", "Iterative Development"],
      gradient: "accent-gradient"
    },
    {
      icon: Palette,
      title: "UI/UX Design",
      description: "Beautiful, intuitive interfaces that create memorable experiences and drive user engagement.",
      features: ["User Research", "Design Systems", "Prototyping"],
      gradient: "success-gradient"
    }
  ];

  return (
    <section id="services" className="py-24 lg:py-32 bg-gradient-to-br from-primary-50/50 via-neutral-50 to-accent-50/30 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, #C17B5C 2px, transparent 2px),
                           radial-gradient(circle at 75% 75%, #0EA5E9 2px, transparent 2px)`,
          backgroundSize: '50px 50px'
        }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            viewport={{ once: true }}
            className="inline-flex items-center px-4 py-2 bg-glass-warm backdrop-blur-xl border border-primary-200/30 rounded-full text-sm font-medium text-primary-700 mb-8"
          >
            <Code size={16} className="mr-2" />
            What We Do
          </motion.div>

          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-neutral-800 mb-8 tracking-tight leading-tight">
            Comprehensive
            <span className="block bg-warm-gradient bg-clip-text text-transparent">Software Solutions</span>
          </h2>
          
          <p className="text-xl lg:text-2xl text-neutral-600 max-w-4xl mx-auto leading-relaxed font-light mb-12">
            From concept to deployment, we offer comprehensive software development 
            services that drive business growth and user satisfaction.
          </p>

          <Link to="/services">
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="group text-neutral-600 hover:text-primary-600 font-medium px-6 py-3 
                       transition-colors duration-300 text-lg flex items-center gap-2 mx-auto
                       bg-glass-warm backdrop-blur-xl border border-primary-200/30 rounded-lg hover:border-primary-300/40"
            >
              Explore All Services
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform duration-300" />
            </motion.button>
          </Link>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <motion.div
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ duration: 0.3 }}
                className="bg-glass-warm backdrop-blur-xl p-8 rounded-2xl hover:bg-primary-100/50 
                         transition-all duration-300 border border-primary-200/30 hover:border-primary-300/40
                         h-full flex flex-col hover:shadow-warm"
              >
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ duration: 0.3 }}
                  className={`inline-flex items-center justify-center w-16 h-16 rounded-xl mb-6 
                    bg-${service.gradient} group-hover:shadow-warm transition-all duration-300`}
                >
                  <service.icon size={28} className="text-white" />
                </motion.div>
                
                <h3 className="text-xl font-semibold text-neutral-800 mb-4 group-hover:text-primary-600 transition-colors duration-300">
                  {service.title}
                </h3>
                
                <p className="text-neutral-600 mb-6 leading-relaxed flex-grow">
                  {service.description}
                </p>
                
                <ul className="space-y-2">
                  {service.features.map((feature) => (
                    <li key={feature} className="text-sm text-neutral-500 flex items-center">
                      <div className="w-1.5 h-1.5 bg-primary-500 rounded-full mr-3"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;