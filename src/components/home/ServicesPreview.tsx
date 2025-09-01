import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Rocket, Brain, Monitor } from "lucide-react";
import { motion } from "framer-motion";
import { getSiteData } from "../../data/site";

const ServicesPreview: React.FC = () => {
  const { servicesPreview } = getSiteData();

  const iconMap = {
    rocket: Rocket,
    brain: Brain,
    devices: Monitor,
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
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3 }}
            className="inline-flex items-center px-4 py-2 bg-[#131313]/80 backdrop-blur-xl border border-[#1E1E1E]/60 rounded-full text-sm font-medium text-primary mb-8"
          >
            <Monitor size={16} className="mr-2" />
            Premium Software Development Services
          </motion.div>

          <h2 className="text-5xl md:text-6xl font-bold text-[#EDEDED] mb-6 tracking-tight leading-tight">
            {servicesPreview.title.split(' ').slice(0, 2).join(' ')}
            <span className="block bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
              {servicesPreview.title.split(' ').slice(2).join(' ')}
            </span>
          </h2>

          <p className="text-xl text-[#B6B6B6] max-w-4xl mx-auto leading-[1.7] font-light">
            {servicesPreview.subtitle}
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {servicesPreview.services.map((service, index) => {
            const IconComponent = iconMap[service.icon as keyof typeof iconMap];
            
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ duration: 0.14, delay: index * 0.1 }}
                className="group"
              >
                <div className="bg-[#131313]/60 backdrop-blur-xl p-8 rounded-2xl border border-[#1E1E1E]/60 hover:border-primary/30 h-full flex flex-col group-hover:bg-[#131313]/80 group-hover:shadow-[0_8px_40px_rgba(196,138,100,0.15)] transition-all duration-140">
                  {/* Icon */}
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.12 }}
                    className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-xl mb-6 group-hover:bg-gradient-to-r group-hover:from-primary group-hover:to-primary/80 group-hover:shadow-[0_0_20px_rgba(196,138,100,0.3)] transition-all duration-140"
                  >
                    <IconComponent
                      size={28}
                      className="text-primary group-hover:text-primary-foreground transition-colors duration-140"
                    />
                  </motion.div>

                  {/* Content */}
                  <h3 className="text-xl font-semibold text-[#EDEDED] mb-3 group-hover:text-primary transition-colors duration-140">
                    {service.title}
                  </h3>

                  <p className="text-[#B6B6B6] mb-6 leading-[1.7] flex-grow">
                    {service.oneLiner}
                  </p>

                  {/* Key Bullets */}
                  <ul className="space-y-3 mb-8">
                    {service.bullets.map((bullet, idx) => (
                      <li
                        key={idx}
                        className="text-sm text-[#B6B6B6] flex items-start gap-3"
                      >
                        <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                        {bullet}
                      </li>
                    ))}
                  </ul>

                  {/* Learn More Button */}
                  <Link to={service.link}>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      transition={{ duration: 0.12 }}
                      className="w-full py-3 px-6 rounded-xl font-medium bg-[#131313] border border-[#1E1E1E]/60 text-[#EDEDED] hover:bg-primary/10 hover:border-primary/30 hover:text-primary transition-all duration-140 flex items-center justify-center gap-2"
                    >
                      Learn More
                      <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-140" />
                    </motion.button>
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* View All Services CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="text-center mt-16"
        >
          <Link to="/services">
            <motion.button
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.12 }}
              className="group text-[#B6B6B6] hover:text-primary font-medium px-8 py-4 
                       transition-colors duration-120 text-lg flex items-center gap-3 mx-auto
                       bg-[#131313]/50 backdrop-blur-xl border border-[#1E1E1E]/60 rounded-xl hover:border-primary/30 hover:bg-[#131313]/80"
            >
              Explore All Services
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

export default ServicesPreview;