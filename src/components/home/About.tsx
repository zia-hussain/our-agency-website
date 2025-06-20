import React from 'react';
import { Link } from 'react-router-dom';
import { Target, Users, Zap, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import AnimatedSection from '../common/AnimatedSection';

const About: React.FC = () => {
  const values = [
    {
      icon: Target,
      title: "Precision",
      description: "Every line of code, every pixel, every interaction is crafted with meticulous attention to detail and purpose."
    },
    {
      icon: Users,
      title: "Partnership",
      description: "We work alongside you as true partners, not just vendors, to achieve your business objectives and vision."
    },
    {
      icon: Zap,
      title: "Innovation",
      description: "We leverage cutting-edge technologies and methodologies to build solutions that give you a competitive advantage."
    }
  ];

  return (
    <section id="about" className="py-24 lg:py-32 bg-cream relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/4 right-1/4 w-64 h-64 border border-terracotta/10 rounded-full"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-1/4 left-1/4 w-96 h-96 border border-sage/10 rounded-full"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <AnimatedSection className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="inline-flex items-center px-4 py-2 bg-sage/10 border border-sage/20 rounded-full text-sm font-medium text-sage-dark mb-8"
          >
            Our Foundation
          </motion.div>
          
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-charcoal mb-8 tracking-tight leading-tight">
            Built on
            <span className="block text-sage">Excellence & Vision</span>
          </h2>
          
          <p className="text-xl lg:text-2xl text-stone max-w-4xl mx-auto leading-relaxed font-light mb-12">
            We believe exceptional software is born from the intersection of technical mastery, 
            design excellence, and deep understanding of human needs. Our mission is to create 
            digital experiences that don't just function—they inspire and transform businesses.
          </p>

          <Link to="/about">
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="group text-charcoal hover:text-sage font-medium px-6 py-3 
                       transition-colors duration-300 text-lg flex items-center gap-2 mx-auto
                       border border-charcoal/20 rounded-sm hover:border-sage/30 hover:bg-sage/5"
            >
              Learn Our Story
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform duration-300" />
            </motion.button>
          </Link>
        </AnimatedSection>

        <div className="grid md:grid-cols-3 gap-12 lg:gap-16">
          {values.map((value, index) => (
            <AnimatedSection
              key={value.title}
              delay={index * 0.2}
              className="text-center group"
            >
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ duration: 0.3 }}
                className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-terracotta/10 to-sage/10 rounded-2xl mb-8 group-hover:shadow-lg transition-shadow duration-300"
              >
                <value.icon size={32} className="text-terracotta group-hover:text-sage transition-colors duration-300" />
              </motion.div>
              
              <h3 className="text-2xl font-semibold text-charcoal mb-6 group-hover:text-sage transition-colors duration-300">
                {value.title}
              </h3>
              
              <p className="text-stone leading-relaxed text-lg">
                {value.description}
              </p>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;