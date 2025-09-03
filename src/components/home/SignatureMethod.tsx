import React from "react";
import { Link } from "react-router-dom";
import { AlertTriangle, Target, TrendingUp, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { getSiteData } from "../../data/site";

const SignatureMethod: React.FC = () => {
  const { signatureMethod } = getSiteData();

  const iconMap = {
    problem: AlertTriangle,
    approach: Target,
    results: TrendingUp,
  };

  return (
    <section className="py-20 lg:py-24 bg-background relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="text-center mb-16 lg:mb-20"
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 tracking-tight leading-[1.1]">
            Why Global Enterprises
            <span className="block bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
              Choose Zumetrix Labs
            </span>
          </h2>

          <p className="text-lg sm:text-xl lg:text-2xl text-muted-foreground max-w-4xl mx-auto leading-[1.6] font-light">
            {signatureMethod.subtitle}
          </p>
        </motion.div>

        {/* Method Grid - Equal Height Cards */}
        <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
          {signatureMethod.sections.map((section, index) => {
            const IconComponent = iconMap[section.icon as keyof typeof iconMap];
            
            return (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ duration: 0.15, delay: index * 0.1 }}
                className="group text-center h-full"
              >
                <div className="bg-card/50 backdrop-blur-xl p-6 lg:p-8 rounded-2xl border border-border hover:border-primary/30 h-full flex flex-col group-hover:bg-card/80 group-hover:shadow-card-hover transition-all duration-150">
                  {/* Icon */}
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.15 }}
                    className="w-16 h-16 bg-primary/10 border border-primary/30 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-gradient-to-r group-hover:from-primary group-hover:to-primary/80 group-hover:shadow-glow transition-all duration-150"
                  >
                    <IconComponent size={24} className="text-primary group-hover:text-primary-foreground transition-colors duration-150" />
                  </motion.div>

                  <h3 className="text-xl lg:text-2xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors duration-150">
                    {section.title}
                  </h3>

                  <p className="text-muted-foreground leading-[1.6] mb-6 flex-grow">
                    {section.description}
                  </p>

                  {/* Stats Badge */}
                  <div className="inline-flex items-center px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold border border-primary/20 mx-auto">
                    {section.stats}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="text-center mt-12 lg:mt-16"
        >
          <Link to={signatureMethod.cta.link}>
            <motion.button
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.15 }}
              className="group text-muted-foreground hover:text-primary font-medium px-8 py-4 
                       transition-colors duration-150 text-lg flex items-center gap-3 mx-auto
                       bg-card/50 backdrop-blur-xl border border-border rounded-xl hover:border-primary/30 hover:bg-card/80"
            >
              {signatureMethod.cta.text}
              <ArrowRight
                size={18}
                className="group-hover:translate-x-1 transition-transform duration-150"
              />
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default SignatureMethod;