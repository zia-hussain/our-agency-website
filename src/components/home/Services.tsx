import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { Monitor, Smartphone, Database, Cog, Rocket, Palette, ArrowRight, Code } from 'lucide-react';
import { motion, useInView } from 'framer-motion';

const Services: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const services = [
    {
      icon: Monitor,
      title: "Web Applications",
      description: "Custom web platforms that deliver exceptional user experiences and drive business growth.",
      features: ["React & TypeScript", "Cloud Architecture", "Performance Optimization"],
      price: "Starting at $5,000",
      popular: false
    },
    {
      icon: Database,
      title: "SaaS Dashboards", 
      description: "Data visualization and analytics platforms that transform complex data into actionable insights.",
      features: ["Real-time Analytics", "Custom Dashboards", "API Integration"],
      price: "Starting at $8,000",
      popular: true
    },
    {
      icon: Smartphone,
      title: "Mobile Applications",
      description: "Native and cross-platform mobile apps that users love and businesses depend on.",
      features: ["iOS & Android", "Cross-Platform", "App Store Optimization"],
      price: "Starting at $12,000",
      popular: false
    },
    {
      icon: Rocket,
      title: "MVP Development",
      description: "Rapid prototyping to validate your ideas and get to market fast with a solid foundation.",
      features: ["Rapid Prototyping", "Market Validation", "Iterative Development"],
      price: "Starting at $4,000",
      popular: false
    },
    {
      icon: Cog,
      title: "Automation Solutions",
      description: "Streamline operations with intelligent automation that saves time and reduces errors.",
      features: ["Workflow Automation", "API Development", "Process Optimization"],
      price: "Starting at $3,000",
      popular: false
    },
    {
      icon: Palette,
      title: "Digital Strategy",
      description: "Technology roadmaps and digital transformation strategies that drive growth.",
      features: ["Technology Planning", "Architecture Planning", "Growth Strategy"],
      price: "Starting at $1,500",
      popular: false
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      scale: 0.9
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    }
  };

  return (
    <section id="services" className="py-24 lg:py-32 bg-background relative overflow-hidden" ref={ref}>
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, #D4A574 2px, transparent 2px),
                           radial-gradient(circle at 75% 75%, #D4A574 2px, transparent 2px)`,
          backgroundSize: '50px 50px'
        }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.4 }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
            className="inline-flex items-center px-4 py-2 bg-card/50 backdrop-blur-xl border border-border rounded-full text-sm font-medium text-primary mb-8"
          >
            <Code size={16} className="mr-2" />
            Premium Software Development Services
          </motion.div>

          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-foreground mb-8 tracking-tight leading-tight">
            From web applications to mobile apps, we deliver world-class solutions that transform businesses and drive exceptional results.
          </h2>

          <Link to="/services">
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="group text-muted-foreground hover:text-primary font-medium px-6 py-3 
                       transition-colors duration-200 text-lg flex items-center gap-2 mx-auto
                       bg-card/30 backdrop-blur-xl border border-border rounded-lg hover:border-primary/30"
            >
              Get Started Today
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform duration-200" />
            </motion.button>
          </Link>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              variants={cardVariants}
              whileHover={{ 
                y: -12, 
                scale: 1.02,
                transition: { duration: 0.2 }
              }}
              className="group relative"
            >
              {service.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                  <span className="bg-beige-gradient text-primary-foreground px-4 py-1 rounded-full text-sm font-medium">
                    Most Popular
                  </span>
                </div>
              )}
              
              <div className={`bg-card/50 backdrop-blur-xl p-8 rounded-2xl transition-all duration-200 border h-full flex flex-col
                ${service.popular 
                  ? 'border-primary/50 shadow-glow' 
                  : 'border-border hover:border-primary/30'
                } group-hover:bg-card/70 group-hover:shadow-card-hover`}
              >
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ duration: 0.2 }}
                  className={`inline-flex items-center justify-center w-16 h-16 rounded-xl mb-6 
                    ${service.popular 
                      ? 'bg-beige-gradient shadow-glow' 
                      : 'bg-primary/10 group-hover:bg-beige-gradient'
                    } transition-all duration-200`}
                >
                  <service.icon size={28} className={service.popular ? 'text-primary-foreground' : 'text-primary group-hover:text-primary-foreground'} />
                </motion.div>
                
                <h3 className="text-xl font-semibold text-foreground mb-4 group-hover:text-primary transition-colors duration-200">
                  {service.title}
                </h3>
                
                <p className="text-muted-foreground mb-6 leading-relaxed flex-grow">
                  {service.description}
                </p>

                <div className="mb-6">
                  <div className="text-2xl font-bold text-primary mb-4">
                    {service.price}
                  </div>
                  <ul className="space-y-2">
                    {service.features.map((feature) => (
                      <li key={feature} className="text-sm text-muted-foreground flex items-center">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full mr-3"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className={`w-full py-3 px-6 rounded-lg font-medium transition-all duration-200 ${
                    service.popular
                      ? 'bg-beige-gradient text-primary-foreground hover:shadow-glow'
                      : 'bg-card border border-border text-foreground hover:bg-primary/10 hover:border-primary/30'
                  }`}
                >
                  Learn More
                </motion.button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.4, delay: 0.6 }}
          className="text-center mt-20"
        >
          <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-6">
            Ready to build something 
            <span className="bg-shimmer bg-clip-text text-transparent"> exceptional</span>?
          </h3>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Let's discuss your project and create a solution that drives real business results.
          </p>
          <Link to="/contact">
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="bg-beige-gradient text-primary-foreground px-8 py-4 rounded-lg font-medium 
                       hover:shadow-glow transition-all duration-200 
                       flex items-center gap-3 text-lg mx-auto"
            >
              Start Your Project
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform duration-200" />
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;