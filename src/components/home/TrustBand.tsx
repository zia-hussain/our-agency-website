import React from "react";
import { motion } from "framer-motion";
import { getSiteData } from "../../data/site";

const TrustBand: React.FC = () => {
  const { trustBand } = getSiteData();

  return (
    <section className="py-16 bg-[#131313]/30 border-y border-[#1E1E1E]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="text-center"
        >
          <h3 className="text-lg font-medium text-[#B6B6B6] mb-12">
            {trustBand.title}
          </h3>
          
          <div className="flex flex-wrap justify-center items-center gap-12 lg:gap-16">
            {trustBand.clients.map((client, index) => (
              <motion.div
                key={client.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ opacity: 1, scale: 1.05 }}
                transition={{ duration: 0.12, delay: index * 0.05 }}
                className="group flex flex-col items-center"
              >
                <div className="text-[#B6B6B6] font-semibold text-lg hover:text-primary transition-colors duration-120 cursor-pointer bg-[#131313]/50 backdrop-blur-xl px-6 py-3 rounded-xl border border-[#1E1E1E]/60 hover:border-primary/30 group-hover:bg-[#131313]/80">
                  {client.name}
                </div>
                <div className="text-xs text-[#B6B6B6]/60 mt-2 font-medium">
                  {client.country}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TrustBand;