import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Mail, MessageCircle, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';
import AnimatedSection from '../common/AnimatedSection';

const CTA: React.FC = () => {
  return (
    <section className="py-24 lg:py-32 bg-gradient-to-br from-cream via-cream to-sage/5 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <motion.div
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{ 
            duration: 30,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-terracotta/5 to-sage/5 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ 
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0],
          }}
          transition={{ 
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute bottom-0 right-0 w-128 h-128 bg-gradient-to-tl from-sage/5 to-terracotta/5 rounded-full blur-3xl"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <AnimatedSection className="text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="inline-flex items-center px-4 py-2 bg-terracotta/10 border border-terracotta/20 rounded-full text-sm font-medium text-terracotta mb-8"
          >
            <span className="w-2 h-2 bg-terracotta rounded-full mr-2 animate-pulse-soft"></span>
            Ready to Start?
          </motion.div>

          <h2 className="text-3xl md:text-5xl lg:text-7xl font-bold text-charcoal mb-8 tracking-tight leading-tight">
            Let's Build Something
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
              className="block text-terracotta"
            >
              Exceptional Together
            </motion.span>
          </h2>
          
          <p className="text-xl lg:text-2xl text-stone max-w-4xl mx-auto mb-16 leading-relaxed font-light">
            Ready to transform your vision into reality? We're here to help you create 
            software that doesn't just meet expectations—it exceeds them and drives real business results.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-20">
            <Link to="/contact">
              <motion.button
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.95 }}
                className="group bg-charcoal text-cream px-10 py-5 rounded-sm font-medium 
                         hover:bg-charcoal-light transition-all duration-300 
                         flex items-center gap-3 text-lg shadow-xl hover:shadow-2xl"
              >
                <Mail size={22} />
                Start Your Project
                <ArrowRight size={22} className="group-hover:translate-x-1 transition-transform duration-300" />
              </motion.button>
            </Link>
            
            <motion.button
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.95 }}
              className="group bg-sage text-cream px-10 py-5 rounded-sm font-medium 
                       hover:bg-sage-dark transition-all duration-300 
                       flex items-center gap-3 text-lg shadow-xl hover:shadow-2xl"
            >
              <Calendar size={22} />
              Schedule a Call
            </motion.button>
          </div>

          <div className="grid md:grid-cols-3 gap-8 text-center max-w-4xl mx-auto">
            {[
              {
                icon: MessageCircle,
                title: "Quick Response",
                description: "We respond to all inquiries within 24 hours",
                delay: 0.2
              },
              {
                icon: Calendar,
                title: "Free Consultation",
                description: "30-minute strategy session to discuss your project",
                delay: 0.4
              },
              {
                icon: ArrowRight,
                title: "No Obligation",
                description: "Honest advice with no pressure to commit",
                delay: 0.6
              }
            ].map((item, index) => (
              <AnimatedSection
                key={item.title}
                delay={item.delay}
                className="group"
              >
                <motion.div
                  whileHover={{ scale: 1.05, y: -5 }}
                  transition={{ duration: 0.3 }}
                  className="bg-cream/50 backdrop-blur-sm p-6 rounded-lg border border-stone/10 hover:border-sage/30 hover:bg-cream/70 transition-all duration-300"
                >
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.3 }}
                    className="w-12 h-12 bg-sage/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-sage/30 transition-colors duration-300"
                  >
                    <item.icon size={20} className="text-sage" />
                  </motion.div>
                  <h3 className="font-semibold text-charcoal mb-2 group-hover:text-sage transition-colors duration-300">
                    {item.title}
                  </h3>
                  <p className="text-stone text-sm leading-relaxed">
                    {item.description}
                  </p>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default CTA;