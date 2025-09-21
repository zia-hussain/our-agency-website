import React from "react";
import { ExternalLink, Calendar, Linkedin, Github } from "lucide-react";
import { motion } from "framer-motion";
import { getSiteData } from "../../data/site";

const FoundersStrip: React.FC = () => {
  const { foundersStrip } = getSiteData();

  return (
    <section className="py-20 lg:py-24 bg-card/20 border-y border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="text-center mb-12 sm:mb-16 lg:mb-20 px-4"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-foreground mb-3 sm:mb-4 tracking-tight leading-[1.1]">
            {foundersStrip.title}
          </h2>
          <p className="text-sm sm:text-base lg:text-lg xl:text-xl text-muted-foreground font-light max-w-3xl mx-auto leading-relaxed">
            {foundersStrip.subtitle}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 max-w-6xl mx-auto">
          {foundersStrip.founders.map((founder, index) => (
            <motion.div
              key={founder.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -6, scale: 1.02 }}
              transition={{ duration: 0.15, delay: index * 0.1 }}
              className="group h-full"
            >
              <div className="bg-card/60 backdrop-blur-xl border border-border rounded-xl lg:rounded-2xl p-4 sm:p-6 lg:p-8 hover:border-primary/30 group-hover:bg-card/80 group-hover:shadow-card-hover transition-all duration-150 h-full flex flex-col">
                
                {/* Founder Image & Basic Info */}
                <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 mb-4 sm:mb-6 text-center sm:text-left">
                  <motion.img
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.15 }}
                    src={founder.image}
                    alt={founder.fullName}
                    className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 rounded-full object-cover border-2 sm:border-3 border-border group-hover:border-primary/50 transition-colors duration-150 flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-foreground group-hover:text-primary transition-colors duration-150 mb-1 leading-tight">
                      {founder.name}
                    </h3>
                    <p className="text-sm sm:text-base text-primary font-semibold mb-2">
                      {founder.role}
                    </p>
                    <div className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                      {founder.achievements}
                    </div>
                  </div>
                </div>

                {/* Expertise Areas */}
                <div className="mb-4 sm:mb-6 flex-grow">
                  <h4 className="text-sm sm:text-base font-semibold text-foreground mb-3 text-center sm:text-left">Core Expertise:</h4>
                  <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                    {founder.expertise.map((skill) => (
                      <motion.span
                        key={skill}
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.15 }}
                        className="text-xs px-2 sm:px-3 py-1 bg-primary/10 text-primary rounded-full border border-primary/20 hover:bg-primary/20 transition-colors duration-150 cursor-pointer"
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>
                </div>

                {/* Credibility Points */}
                <div className="mb-4 sm:mb-6">
                  <h4 className="text-sm sm:text-base font-semibold text-foreground mb-3 text-center sm:text-left">Key Achievements:</h4>
                  <ul className="space-y-2">
                    {founder.credibility.map((point, idx) => (
                      <li key={idx} className="text-xs sm:text-sm text-muted-foreground flex items-start gap-2">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                        <span className="leading-[1.5]">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 mt-auto">
                  <motion.a
                    href={founder.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ duration: 0.15 }}
                    className="flex-1 bg-card border border-border text-foreground hover:text-primary px-4 py-3 rounded-xl font-medium hover:border-primary/30 hover:bg-card/80 transition-all duration-150 flex items-center justify-center gap-2 text-sm sm:text-base"
                  >
                    <Linkedin size={14} className="sm:hidden" />
                    <Linkedin size={16} className="hidden sm:block" />
                    <span className="hidden sm:inline">LinkedIn</span>
                    <span className="sm:hidden">Profile</span>
                  </motion.a>
                  <motion.a
                    href={founder.calendly}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ duration: 0.15 }}
                    className="flex-1 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground px-4 py-3 rounded-xl font-medium hover:shadow-glow transition-all duration-150 flex items-center justify-center gap-2 text-sm sm:text-base"
                  >
                    <Calendar size={14} className="sm:hidden" />
                    <Calendar size={16} className="hidden sm:block" />
                    <span className="hidden sm:inline">Book Call</span>
                    <span className="sm:hidden">Call</span>
                  </motion.a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FoundersStrip;