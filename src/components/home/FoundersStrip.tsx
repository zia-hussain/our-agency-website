import React from "react";
import { Calendar, Linkedin, Users } from "lucide-react";
import { motion } from "framer-motion";
import { getSiteData } from "../../data/site";

const FoundersStrip: React.FC = () => {
  const { foundersStrip } = getSiteData();

  return (
    <section className="py-20 lg:py-24 bg-card/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="text-center mb-12 sm:mb-16 lg:mb-20 px-4"
        >
          <div className="inline-flex items-center px-3.5 py-1.5 bg-card/40 backdrop-blur-xl border border-border/70 rounded-full text-xs font-medium uppercase tracking-[0.1em] text-primary/90 mb-7">
            <Users size={14} className="mr-2" />
            Who You'll Work With
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-5 tracking-tight leading-[1.12]">
            {foundersStrip.title}
            <span className="block bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent mt-1">
              {foundersStrip.themedTitle}
            </span>
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-[1.6] font-light">
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
              whileHover={{ y: -4 }}
              transition={{ duration: 0.2, delay: index * 0.1 }}
              className="group h-full"
            >
              <div className="relative bg-card/40 backdrop-blur-xl border border-border/70 rounded-xl lg:rounded-2xl p-4 sm:p-6 lg:p-8 hover:border-primary/25 group-hover:bg-card/60 transition-all duration-300 h-full flex flex-col ring-1 ring-inset ring-white/[0.02]">
                <div className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Founder Image & Basic Info */}
                <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 mb-5 sm:mb-6 text-center sm:text-left">
                  <div className="relative flex-shrink-0">
                    <div className="absolute -inset-0.5 rounded-full bg-gradient-to-br from-primary/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <motion.img
                      whileHover={{ scale: 1.04 }}
                      transition={{ duration: 0.2 }}
                      src={founder.image}
                      alt={founder.fullName}
                      width="192"
                      height="192"
                      loading="lazy"
                      decoding="async"
                      className="relative w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 rounded-full object-cover border-2 border-border group-hover:border-primary/40 transition-colors duration-300"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-foreground group-hover:text-primary transition-colors duration-300 mb-1 leading-tight tracking-tight">
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
                <div className="mb-5 sm:mb-6 flex-grow">
                  <div className="flex flex-wrap gap-1.5 justify-center sm:justify-start">
                    {founder.expertise.map((skill) => (
                      <span
                        key={skill}
                        className="text-[11px] px-2.5 py-1 bg-primary/[0.06] text-primary/80 rounded-full border border-primary/15"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Credibility Points */}
                <div className="mb-6 sm:mb-7">
                  <ul className="space-y-2.5">
                    {founder.credibility.map((point, idx) => (
                      <li key={idx} className="text-xs sm:text-sm text-muted-foreground flex items-start gap-2.5">
                        <div className="w-1 h-1 bg-primary/70 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="leading-[1.6]">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-2.5 mt-auto">
                  <motion.a
                    href={founder.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ duration: 0.15 }}
                    className="flex-1 border border-border/70 text-foreground/85 hover:text-primary px-4 py-2.5 rounded-full font-medium hover:border-primary/25 transition-all duration-200 flex items-center justify-center gap-2 text-sm"
                  >
                    <Linkedin size={14} />
                    <span className="hidden sm:inline">LinkedIn</span>
                    <span className="sm:hidden">Profile</span>
                  </motion.a>
                  <motion.a
                    href={founder.calendly}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ duration: 0.15 }}
                    className="flex-1 bg-gradient-to-r from-primary to-primary/90 text-primary-foreground px-4 py-2.5 rounded-full font-semibold hover:shadow-[0_12px_30px_-10px_rgba(196,138,100,0.5)] transition-all duration-300 flex items-center justify-center gap-2 text-sm"
                  >
                    <Calendar size={14} />
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
