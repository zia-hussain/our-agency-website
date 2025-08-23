import React from "react";
import { ExternalLink, Calendar, Linkedin } from "lucide-react";
import { motion } from "framer-motion";
import { getSiteData } from "../../data/site";

const FoundersStrip: React.FC = () => {
  const { foundersStrip } = getSiteData();

  return (
    <section className="py-20 bg-[#131313]/30 border-y border-[#1E1E1E]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-[#EDEDED] mb-4 tracking-tight">
            {foundersStrip.title}
          </h2>
          <p className="text-lg text-[#B6B6B6] font-light">
            {foundersStrip.subtitle}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {foundersStrip.founders.map((founder, index) => (
            <motion.div
              key={founder.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -4, scale: 1.01 }}
              transition={{ duration: 0.14, delay: index * 0.1 }}
              className="group"
            >
              <div className="bg-[#131313]/60 backdrop-blur-xl border border-[#1E1E1E]/60 rounded-2xl p-8 hover:border-primary/30 group-hover:bg-[#131313]/80 group-hover:shadow-[0_8px_40px_rgba(196,138,100,0.15)] transition-all duration-140">
                <div className="flex items-center gap-6 mb-6">
                  <motion.img
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.12 }}
                    src={founder.image}
                    alt={founder.fullName}
                    className="w-20 h-20 rounded-full object-cover border-2 border-[#1E1E1E]/60 group-hover:border-primary/50"
                  />
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-[#EDEDED] group-hover:text-primary transition-colors duration-140">
                      {founder.name}
                    </h3>
                    <p className="text-primary font-medium mb-2">
                      {founder.role}
                    </p>
                    <p className="text-sm text-[#B6B6B6] leading-[1.7]">
                      {Array.isArray(founder.credibility) ? (
                        founder.credibility.map((line, i) => (
                          <div key={i}>• {line}</div>
                        ))
                      ) : (
                        <div>• {founder.credibility}</div>
                      )}
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <motion.a
                    href={founder.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ duration: 0.12 }}
                    className="flex-1 bg-[#131313] border border-[#1E1E1E]/60 text-[#EDEDED] hover:text-primary px-4 py-3 rounded-xl font-medium hover:border-primary/30 transition-all duration-120 flex items-center justify-center gap-2"
                  >
                    <Linkedin size={16} />
                    LinkedIn
                  </motion.a>
                  <motion.a
                    href={founder.calendly}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ duration: 0.12 }}
                    className="flex-1 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground px-4 py-3 rounded-xl font-medium hover:shadow-[0_0_20px_rgba(196,138,100,0.3)] transition-all duration-120 flex items-center justify-center gap-2"
                  >
                    <Calendar size={16} />
                    Book Call
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
