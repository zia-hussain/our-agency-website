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
          className="text-center mb-16 lg:mb-20"
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-foreground mb-4 tracking-tight leading-[1.1]">
            {foundersStrip.title}
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground font-light max-w-3xl mx-auto">
            {foundersStrip.subtitle}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 max-w-6xl mx-auto">
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
              <div className="bg-card/60 backdrop-blur-xl border border-border rounded-2xl p-6 lg:p-8 hover:border-primary/30 group-hover:bg-card/80 group-hover:shadow-card-hover transition-all duration-150 h-full flex flex-col">
                
                {/* Founder Image & Basic Info */}
                <div className="flex items-center gap-6 mb-6">
                  <motion.img
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.15 }}
                    src={founder.image}
                    alt={founder.fullName}
                    className="w-20 h-20 lg:w-24 lg:h-24 rounded-full object-cover border-3 border-border group-hover:border-primary/50 transition-colors duration-150"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="text-xl lg:text-2xl font-bold text-foreground group-hover:text-primary transition-colors duration-150 mb-1">
                      {founder.name}
                    </h3>
                    <p className="text-primary font-semibold mb-2">
                      {founder.role}
                    </p>
                    <div className="text-sm text-muted-foreground">
                      {founder.achievements}
                    </div>
                  </div>
                </div>

                {/* Expertise Areas */}
                <div className="mb-6 flex-grow">
                  <h4 className="font-semibold text-foreground mb-3">Core Expertise:</h4>
                  <div className="flex flex-wrap gap-2">
                    {founder.expertise.map((skill) => (
                      <motion.span
                        key={skill}
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.15 }}
                        className="text-xs px-3 py-1 bg-primary/10 text-primary rounded-full border border-primary/20 hover:bg-primary/20 transition-colors duration-150 cursor-pointer"
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>
                </div>

                {/* Credibility Points */}
                <div className="mb-6">
                  <h4 className="font-semibold text-foreground mb-3">Key Achievements:</h4>
                  <ul className="space-y-2">
                    {founder.credibility.map((point, idx) => (
                      <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                        <span className="leading-[1.5]">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 mt-auto">
                  <motion.a
                    href={founder.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ duration: 0.15 }}
                    className="flex-1 bg-card border border-border text-foreground hover:text-primary px-4 py-3 rounded-xl font-medium hover:border-primary/30 hover:bg-card/80 transition-all duration-150 flex items-center justify-center gap-2"
                  >
                    <Linkedin size={16} />
                    <span className="hidden sm:inline">LinkedIn</span>
                  </motion.a>
                  <motion.a
                    href={founder.calendly}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ duration: 0.15 }}
                    className="flex-1 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground px-4 py-3 rounded-xl font-medium hover:shadow-glow transition-all duration-150 flex items-center justify-center gap-2"
                  >
                    <Calendar size={16} />
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