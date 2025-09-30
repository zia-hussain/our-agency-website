import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Rocket, Brain, Monitor, CheckCircle } from "lucide-react";
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
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3 }}
            className="inline-flex items-center px-4 py-2 bg-card/50 backdrop-blur-xl border border-border rounded-full text-sm font-medium text-primary mb-8"
          >
            <Monitor size={16} className="mr-2" />
            Premium Software Development Services
          </motion.div>

          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 tracking-tight leading-[1.1]">
            Enterprise-Grade Software
            <span className="block bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
              Development Services
            </span>
          </h2>

          <p className="text-lg sm:text-xl lg:text-2xl text-muted-foreground max-w-4xl mx-auto leading-[1.6] font-light">
            {servicesPreview.subtitle}
          </p>
        </motion.div>

        {/* Services Grid - Equal Height Cards */}
        <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
          {servicesPreview.services.map((service, index) => {
            const IconComponent = iconMap[service.icon as keyof typeof iconMap];

            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ duration: 0.15, delay: index * 0.1 }}
                className="group h-full"
              >
                <div
                  className={`bg-card/50 backdrop-blur-xl p-6 lg:p-8 rounded-2xl border h-full flex flex-col transition-all duration-150 ${
                    service.popular
                      ? "border-primary/50 shadow-glow"
                      : "border-border hover:border-primary/30"
                  } group-hover:bg-card/80 group-hover:shadow-card-hover`}
                >
                  {/* Popular Badge */}
                  {service.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                      <span className="bg-beige-gradient text-primary-foreground px-4 py-1 rounded-full text-sm font-medium">
                        Most Popular
                      </span>
                    </div>
                  )}

                  {/* Icon */}
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.15 }}
                    className={`inline-flex items-center justify-center w-16 h-16 rounded-xl mb-6 ${
                      service.popular
                        ? "bg-gradient-to-r from-primary to-primary/80 shadow-glow"
                        : "bg-primary/10 group-hover:bg-gradient-to-r group-hover:from-primary group-hover:to-primary/80"
                    }`}
                  >
                    <IconComponent
                      size={28}
                      className={
                        service.popular
                          ? "text-primary-foreground"
                          : "text-primary group-hover:text-primary-foreground"
                      }
                    />
                  </motion.div>

                  {/* Content */}
                  <h3 className="text-xl lg:text-2xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors duration-150">
                    {service.title}
                  </h3>

                  <p className="text-primary/80 text-sm font-medium mb-4">
                    {service.oneLiner}
                  </p>

                  <p className="text-muted-foreground mb-6 leading-[1.6] flex-grow">
                    {service.description}
                  </p>

                  {/* Pricing & Timeline */}
                  <div className="flex items-center justify-between mb-6 p-3 bg-primary/5 rounded-lg border border-primary/20">
                    <div>
                      <div className="text-lg font-bold text-primary">
                        {service.pricing}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {service.timeline}
                      </div>
                    </div>
                    <div className="text-xs text-primary font-medium bg-primary/10 px-2 py-1 rounded-full">
                      Enterprise Grade
                    </div>
                  </div>

                  {/* Key Bullets */}
                  <ul className="space-y-2 mb-8">
                    {service.bullets.slice(0, 3).map((bullet, idx) => (
                      <li
                        key={idx}
                        className="text-sm text-muted-foreground flex items-start gap-3"
                      >
                        <CheckCircle
                          size={14}
                          className="text-primary flex-shrink-0 mt-0.5"
                        />
                        <span className="leading-[1.5]">{bullet}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Learn More Button */}
                  <Link to={service.link} className="mt-auto">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      transition={{ duration: 0.15 }}
                      className={`w-full py-3 px-6 rounded-xl font-medium transition-all duration-150 flex items-center justify-center gap-2 ${
                        service.popular
                          ? "bg-gradient-to-r from-primary to-primary/80 text-primary-foreground hover:shadow-glow"
                          : "bg-card border border-border text-foreground hover:bg-primary/10 hover:border-primary/30 hover:text-primary"
                      }`}
                    >
                      Learn More
                      <ArrowRight
                        size={16}
                        className="group-hover:translate-x-1 transition-transform duration-150"
                      />
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
          className="text-center mt-12 lg:mt-16"
        >
          <Link to="/services">
            <motion.button
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.15 }}
              className="group text-muted-foreground hover:text-primary font-medium px-8 py-4 
                       transition-colors duration-150 text-lg flex items-center gap-3 mx-auto
                       bg-card/50 backdrop-blur-xl border border-border rounded-xl hover:border-primary/30 hover:bg-card/80"
            >
              Explore All Services
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

export default ServicesPreview;
