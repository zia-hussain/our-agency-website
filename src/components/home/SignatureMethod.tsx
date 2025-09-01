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
    <section className="py-24 bg-[#0C0C0C] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-6xl font-bold text-[#EDEDED] mb-6 tracking-tight leading-tight">
            {signatureMethod.title.split(' ').slice(0, 3).join(' ')}
            <span className="block bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
              {signatureMethod.title.split(' ').slice(3).join(' ')}
            </span>
          </h2>

          <p className="text-xl text-[#B6B6B6] max-w-4xl mx-auto leading-[1.7] font-light">
            {signatureMethod.subtitle}
          </p>
        </motion.div>

        {/* Method Grid */}
        <div className="grid lg:grid-cols-3 gap-12">
          {signatureMethod.sections.map((section, index) => {
            const IconComponent = iconMap[section.icon as keyof typeof iconMap];
            
            return (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ duration: 0.14, delay: index * 0.1 }}
                className="group text-center"
              >
                <div className="bg-[#131313]/60 backdrop-blur-xl p-8 rounded-2xl border border-[#1E1E1E]/60 hover:border-primary/30 h-full flex flex-col group-hover:bg-[#131313]/80 group-hover:shadow-[0_8px_40px_rgba(196,138,100,0.15)] transition-all duration-140">
                  {/* Icon */}
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.12 }}
                    className="w-16 h-16 bg-primary/10 border border-primary/30 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-gradient-to-r group-hover:from-primary group-hover:to-primary/80 group-hover:shadow-[0_0_20px_rgba(196,138,100,0.3)] transition-all duration-140"
                  >
                    <IconComponent size={24} className="text-primary group-hover:text-primary-foreground transition-colors duration-140" />
                  </motion.div>

                  <h3 className="text-2xl font-bold text-[#EDEDED] mb-6 group-hover:text-primary transition-colors duration-140">
                    {section.title}
                  </h3>

                  <p className="text-[#B6B6B6] leading-[1.7] flex-grow">
                    {section.description}
                  </p>
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
          className="text-center mt-16"
        >
          <Link to={signatureMethod.cta.link}>
            <motion.button
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.12 }}
              className="group text-[#B6B6B6] hover:text-primary font-medium px-8 py-4 
                       transition-colors duration-120 text-lg flex items-center gap-3 mx-auto
                       bg-[#131313]/50 backdrop-blur-xl border border-[#1E1E1E]/60 rounded-xl hover:border-primary/30 hover:bg-[#131313]/80"
            >
              {signatureMethod.cta.text}
              <ArrowRight
                size={18}
                className="group-hover:translate-x-1 transition-transform duration-120"
              />
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default SignatureMethod;