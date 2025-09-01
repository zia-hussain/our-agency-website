import React from "react";
import { Link } from "react-router-dom";
import { Calendar, Mail, ArrowRight, CheckCircle, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { getSiteData } from "../../data/site";

const FinalCTA: React.FC = () => {
  const { finalCTA, metrics } = getSiteData();

  return (
    <section className="py-24 bg-[#0C0C0C] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="text-center"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3 }}
            className="inline-flex items-center px-4 py-2 bg-[#131313]/80 backdrop-blur-xl border border-[#1E1E1E]/60 rounded-full text-sm font-medium text-primary mb-8"
          >
            <Sparkles size={16} className="mr-2" />
            <span className="w-2 h-2 bg-primary rounded-full mr-2 animate-pulse"></span>
            Ready to Start?
          </motion.div>

          {/* Headline */}
          <h2 className="text-5xl md:text-7xl font-bold text-[#EDEDED] mb-8 tracking-tight leading-tight">
            {finalCTA.headline.split(' ').slice(0, 3).join(' ')}
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="block bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent"
            >
              {finalCTA.headline.split(' ').slice(3).join(' ')}
            </motion.span>
          </h2>

          {/* Subtitle */}
          <p className="text-xl text-[#B6B6B6] max-w-4xl mx-auto mb-16 leading-[1.7] font-light">
            {finalCTA.subtitle}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
            <motion.a
              href={finalCTA.primaryCTA.link}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02, y: -3 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.12 }}
              className="group bg-gradient-to-r from-primary to-primary/80 text-primary-foreground px-10 py-5 rounded-xl font-semibold 
                       hover:shadow-[0_0_30px_rgba(196,138,100,0.4)] transition-all duration-120
                       flex items-center gap-3 text-lg shadow-lg"
            >
              <Calendar size={22} />
              {finalCTA.primaryCTA.text}
              <ArrowRight
                size={22}
                className="group-hover:translate-x-1 transition-transform duration-120"
              />
            </motion.a>

            <Link to={finalCTA.secondaryCTA.link}>
              <motion.button
                whileHover={{ scale: 1.02, y: -3 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.12 }}
                className="group bg-[#131313]/60 backdrop-blur-xl text-[#B6B6B6] hover:text-primary px-10 py-5 rounded-xl font-semibold 
                         hover:bg-[#131313]/80 transition-all duration-120
                         flex items-center gap-3 text-lg border border-[#1E1E1E]/60 hover:border-primary/30"
              >
                <Mail size={22} />
                {finalCTA.secondaryCTA.text}
              </motion.button>
            </Link>
          </div>

          {/* Trust Signals */}
          <div className="grid md:grid-cols-3 gap-8 text-center max-w-4xl mx-auto">
            {finalCTA.trustSignals.map((signal, index) => (
              <motion.div
                key={signal}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ y: -2, scale: 1.02 }}
                transition={{ duration: 0.12, delay: index * 0.05 }}
                className="group"
              >
                <div className="bg-[#131313]/60 backdrop-blur-xl p-6 rounded-xl border border-[#1E1E1E]/60 hover:border-primary/30 group-hover:bg-[#131313]/80 transition-all duration-120">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.12 }}
                    className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-gradient-to-r group-hover:from-primary group-hover:to-primary/80 transition-all duration-120"
                  >
                    <CheckCircle size={20} className="text-primary group-hover:text-primary-foreground transition-colors duration-120" />
                  </motion.div>
                  <h3 className="font-semibold text-[#EDEDED] group-hover:text-primary transition-colors duration-120">
                    {signal}
                  </h3>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FinalCTA;