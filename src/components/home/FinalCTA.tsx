import React from "react";
import { Link } from "react-router-dom";
import { Calendar, Mail, ArrowRight, CheckCircle, Sparkles, Star } from "lucide-react";
import { motion } from "framer-motion";
import { getSiteData } from "../../data/site";

const FinalCTA: React.FC = () => {
  const { finalCTA, metrics } = getSiteData();

  return (
    <section className="py-20 lg:py-24 bg-background relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.03, 0.08, 0.03],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl"
        />
      </div>

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
            className="inline-flex items-center px-4 py-2 bg-card/50 backdrop-blur-xl border border-border rounded-full text-sm font-medium text-primary mb-8"
          >
            <Sparkles size={16} className="mr-2" />
            <span className="w-2 h-2 bg-primary rounded-full mr-2 animate-pulse"></span>
            Ready to Start?
          </motion.div>

          {/* Headline */}
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-8 tracking-tight leading-[1.1]">
            Ready to Transform Your
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="block bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent"
            >
              Business Vision Into Reality?
            </motion.span>
          </h2>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl lg:text-2xl text-muted-foreground max-w-4xl mx-auto mb-12 lg:mb-16 leading-[1.6] font-light">
            {finalCTA.subtitle}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 lg:gap-6 justify-center items-center mb-12 lg:mb-16">
            <motion.a
              href={finalCTA.primaryCTA.link}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02, y: -3 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.15 }}
              className="group bg-gradient-to-r from-primary to-primary/80 text-primary-foreground px-8 lg:px-10 py-4 lg:py-5 rounded-xl font-semibold 
                       hover:shadow-glow transition-all duration-150
                       flex items-center gap-3 text-lg shadow-lg w-full sm:w-auto justify-center"
            >
              <Calendar size={22} />
              {finalCTA.primaryCTA.text}
              <ArrowRight
                size={22}
                className="group-hover:translate-x-1 transition-transform duration-150"
              />
            </motion.a>

            <Link to={finalCTA.secondaryCTA.link}>
              <motion.button
                whileHover={{ scale: 1.02, y: -3 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.15 }}
                className="group bg-card/50 backdrop-blur-xl text-muted-foreground hover:text-primary px-8 lg:px-10 py-4 lg:py-5 rounded-xl font-semibold 
                         hover:bg-card/80 transition-all duration-150
                         flex items-center gap-3 text-lg border border-border hover:border-primary/30 w-full sm:w-auto justify-center"
              >
                <Mail size={22} />
                {finalCTA.secondaryCTA.text}
              </motion.button>
            </Link>
          </div>

          {/* Trust Signals - Responsive Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 lg:gap-8 text-center max-w-4xl mx-auto mb-12">
            {finalCTA.trustSignals.map((signal, index) => (
              <motion.div
                key={signal}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ y: -2, scale: 1.02 }}
                transition={{ duration: 0.15, delay: index * 0.05 }}
                className="group"
              >
                <div className="bg-card/50 backdrop-blur-xl p-6 rounded-xl border border-border hover:border-primary/30 group-hover:bg-card/80 transition-all duration-150 h-full">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.15 }}
                    className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-gradient-to-r group-hover:from-primary group-hover:to-primary/80 transition-all duration-150"
                  >
                    <CheckCircle size={20} className="text-primary group-hover:text-primary-foreground transition-colors duration-150" />
                  </motion.div>
                  <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors duration-150">
                    {signal}
                  </h3>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Global Proof Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 max-w-4xl mx-auto"
          >
            {Object.entries(finalCTA.globalProof).map(([key, value], index) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.15, delay: index * 0.05 }}
                className="text-center bg-card/30 backdrop-blur-xl border border-border rounded-xl p-4 hover:border-primary/30 hover:bg-card/50 transition-all duration-150"
              >
                <div className="text-xl lg:text-2xl font-bold text-primary mb-1">
                  {value}
                </div>
                <div className="text-xs lg:text-sm text-muted-foreground capitalize">
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default FinalCTA;