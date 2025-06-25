import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Mail, MessageCircle, Calendar, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

const CTA: React.FC = () => {
  return (
    <section className="py-24 lg:py-32 bg-dark-800 relative overflow-hidden">
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
          className="absolute top-0 left-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl"
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
          className="absolute bottom-0 right-0 w-128 h-128 bg-emerald-400/5 rounded-full blur-3xl"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="inline-flex items-center px-4 py-2 bg-glass-light backdrop-blur-xl border border-emerald-500/20 rounded-full text-sm font-medium text-emerald-400 mb-8"
          >
            <Sparkles size={16} className="mr-2" />
            <span className="w-2 h-2 bg-emerald-400 rounded-full mr-2 animate-pulse"></span>
            Ready to Start?
          </motion.div>

          <h2 className="text-3xl md:text-5xl lg:text-7xl font-bold text-text-primary mb-8 tracking-tight leading-tight">
            Let's Build Something
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
              className="block bg-emerald-gradient bg-clip-text text-transparent"
            >
              Exceptional Together
            </motion.span>
          </h2>
          
          <p className="text-xl lg:text-2xl text-text-secondary max-w-4xl mx-auto mb-16 leading-relaxed font-light">
            Ready to transform your vision into reality? We're here to help you create 
            software that doesn't just meet expectations—it exceeds them and drives real business results.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-20">
            <Link to="/contact">
              <motion.button
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.95 }}
                className="group bg-emerald-gradient text-white px-10 py-5 rounded-lg font-medium 
                         hover:shadow-xl hover:shadow-emerald-500/25 transition-all duration-300 
                         flex items-center gap-3 text-lg backdrop-blur-sm border border-emerald-500/20"
              >
                <Mail size={22} />
                Start Your Project
                <ArrowRight size={22} className="group-hover:translate-x-1 transition-transform duration-300" />
              </motion.button>
            </Link>
            
            <motion.button
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.95 }}
              className="group bg-glass-light backdrop-blur-xl text-text-secondary hover:text-emerald-400 px-10 py-5 rounded-lg font-medium 
                       hover:bg-glass-medium transition-all duration-300 
                       flex items-center gap-3 text-lg border border-glass-light hover:border-emerald-500/20"
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
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: item.delay }}
                viewport={{ once: true }}
                className="group"
              >
                <motion.div
                  whileHover={{ scale: 1.05, y: -5 }}
                  transition={{ duration: 0.3 }}
                  className="bg-glass-light backdrop-blur-xl p-6 rounded-2xl border border-glass-light hover:border-emerald-500/30 hover:bg-glass-medium transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/10"
                >
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.3 }}
                    className="w-12 h-12 bg-emerald-gradient rounded-full flex items-center justify-center mx-auto mb-4 group-hover:shadow-lg group-hover:shadow-emerald-500/25 transition-all duration-300"
                  >
                    <item.icon size={20} className="text-white" />
                  </motion.div>
                  <h3 className="font-semibold text-text-primary mb-2 group-hover:text-emerald-400 transition-colors duration-300">
                    {item.title}
                  </h3>
                  <p className="text-text-secondary text-sm leading-relaxed">
                    {item.description}
                  </p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTA;