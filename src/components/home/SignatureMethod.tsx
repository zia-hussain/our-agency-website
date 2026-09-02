import React from "react";
import { Link } from "react-router-dom";
import { AlertTriangle, Target, TrendingUp, ArrowRight, MessageSquare } from "lucide-react";
import { motion } from "framer-motion";
import { getSiteData } from "../../data/site";
import { BRAND_CONTENT } from "../../config/content";
import { renderContentSegments } from "../../utils/contentRenderer";

const SignatureMethod: React.FC = () => {
  const siteData = getSiteData();
  const signatureMethod = BRAND_CONTENT.signatureMethod;

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
          <div className="inline-flex items-center px-4 py-2 bg-card/50 backdrop-blur-xl border border-border rounded-full text-sm font-medium text-primary mb-8">
            <MessageSquare size={16} className="mr-2" />
            How We Work
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 tracking-tight leading-[1.1]">
           Why Founders Choose Us
            <span className="block bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
              (And Why Some Don't)
            </span>
          </h2>

          <p className="text-lg sm:text-xl lg:text-2xl text-muted-foreground max-w-4xl mx-auto leading-[1.6] font-light">
            That wasn't a lucky call. It's how every engagement works.{" "}
            {signatureMethod.subtitle}
          </p>
        </motion.div>

        {/* Principles — a stacked statement, not three benefit cards */}
        <div className="max-w-5xl mx-auto border-t border-border">
          {signatureMethod.sections.map((section, index) => {
            const IconComponent = iconMap[section.icon as keyof typeof iconMap];

            return (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                className="group py-9 sm:py-11 border-b border-border"
              >
                <div className="flex flex-wrap items-center gap-4 sm:gap-5 mb-4">
                  <span className="text-4xl sm:text-5xl font-bold text-border group-hover:text-primary/30 transition-colors duration-300 leading-none flex-shrink-0">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div className="flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-primary/10 border border-primary/20 flex-shrink-0">
                    <IconComponent size={20} className="text-primary" />
                  </div>
                  <h3 className="text-xl lg:text-2xl font-bold text-foreground">
                    {section.title}
                  </h3>
                  {section.stat && (
                    <span className="ml-auto hidden sm:inline-flex items-center px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold border border-primary/20 flex-shrink-0">
                      {section.stat}
                    </span>
                  )}
                </div>

                <p className="text-muted-foreground leading-[1.7] max-w-2xl sm:pl-[5.75rem]">
                  {renderContentSegments(section.description)}
                </p>

                {section.stat && (
                  <span className="sm:hidden mt-4 inline-flex items-center px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold border border-primary/20">
                    {section.stat}
                  </span>
                )}
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
          <Link to={siteData.signatureMethod.cta.link}>
            <motion.button
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.15 }}
              className="group text-muted-foreground hover:text-primary font-medium px-8 py-4
                       transition-colors duration-150 text-lg flex items-center gap-3 mx-auto
                       bg-card/50 backdrop-blur-xl border border-border rounded-full hover:border-primary/30 hover:bg-card/80"
            >
              {siteData.signatureMethod.cta.text}
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