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
          <div className="inline-flex items-center px-3.5 py-1.5 bg-card/40 backdrop-blur-xl border border-border/70 rounded-full text-xs font-medium uppercase tracking-[0.1em] text-primary/90 mb-7">
            <MessageSquare size={14} className="mr-2" />
            How We Work
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-5 tracking-tight leading-[1.12]">
           Why founders choose us
            <span className="block bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent mt-1">
              (and why some don't)
            </span>
          </h2>

          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-[1.6] font-light">
            That wasn't a lucky call. It's how every engagement works.{" "}
            {signatureMethod.subtitle}
          </p>
        </motion.div>

        {/* Principles — a stacked statement, not three benefit cards */}
        <div className="max-w-5xl mx-auto border-t border-border/70">
          {signatureMethod.sections.map((section, index) => {
            const IconComponent = iconMap[section.icon as keyof typeof iconMap];

            return (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                className="group py-10 sm:py-12 border-b border-border/70"
              >
                <div className="flex flex-wrap items-center gap-4 sm:gap-5 mb-4">
                  <span className="text-4xl sm:text-5xl font-bold text-border group-hover:text-primary/35 transition-colors duration-300 leading-none tracking-tight tabular-nums flex-shrink-0">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div className="flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-primary/[0.08] border border-primary/15 flex-shrink-0">
                    <IconComponent size={19} className="text-primary" />
                  </div>
                  <h3 className="text-xl lg:text-2xl font-bold text-foreground tracking-tight">
                    {section.title}
                  </h3>
                  {section.stat && (
                    <span className="ml-auto hidden sm:inline-flex items-center px-3.5 py-1.5 bg-primary/[0.08] text-primary text-xs font-semibold uppercase tracking-wide border border-primary/15 rounded-full flex-shrink-0">
                      {section.stat}
                    </span>
                  )}
                </div>

                <p className="text-muted-foreground leading-[1.7] max-w-2xl sm:pl-[5.75rem]">
                  {renderContentSegments(section.description)}
                </p>

                {section.stat && (
                  <span className="sm:hidden mt-4 inline-flex items-center px-3.5 py-1.5 bg-primary/[0.08] text-primary text-xs font-semibold uppercase tracking-wide border border-primary/15 rounded-full">
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