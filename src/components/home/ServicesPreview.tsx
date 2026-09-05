import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Check, Rocket, Brain, Monitor } from "lucide-react";
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
    <section className="py-28 bg-background relative overflow-hidden">
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
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3 }}
            className="inline-flex items-center px-3.5 py-1.5 bg-card/40 backdrop-blur-xl border border-border/70 rounded-full text-xs font-medium uppercase tracking-[0.1em] text-primary/90 mb-7"
          >
            <Monitor size={14} className="mr-2" />
            What We Actually Build
          </motion.div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-5 tracking-tight leading-[1.12]">
            Three services.
            <span className="block bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent mt-1">
              Real starting prices.
            </span>
          </h2>

          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-[1.6] font-light">
            No "contact us for a quote" games. Here's what we build and what
            it costs to start.
          </p>
        </motion.div>

        {/* Bento Grid Layout */}
        <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
          {servicesPreview.services.map((service, index) => {
            const IconComponent = iconMap[service.icon as keyof typeof iconMap];
            const isFeatured = index === 0;

            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ y: -4, scale: 1.01 }}
                transition={{ duration: 0.15, delay: index * 0.1 }}
                className={`group ${
                  isFeatured ? "lg:col-span-2 lg:row-span-2" : ""
                }`}
              >
                <div
                  className={`relative bg-card/25 backdrop-blur-xl p-8 rounded-2xl border border-border/70 h-full flex flex-col overflow-hidden transition-all duration-300 hover:border-primary/30 hover:bg-card/40 hover:shadow-[0_24px_60px_-20px_rgba(0,0,0,0.5)] ring-1 ring-inset ring-white/[0.02] ${
                    isFeatured ? "lg:p-12" : ""
                  }`}
                >
                  <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Icon */}
                  <motion.div
                    whileHover={{ scale: 1.08, rotate: 4 }}
                    transition={{ duration: 0.2 }}
                    className="inline-flex items-center justify-center w-12 h-12 rounded-xl mb-6 bg-primary/[0.08] border border-primary/10 group-hover:bg-primary/15 transition-colors duration-300"
                  >
                    <IconComponent size={21} className="text-primary" />
                  </motion.div>

                  {/* Content */}
                  <h3
                    className={`${
                      isFeatured
                        ? "text-3xl lg:text-4xl"
                        : "text-2xl lg:text-3xl"
                    } font-bold text-foreground mb-2.5 tracking-tight group-hover:text-primary transition-colors duration-300`}
                  >
                    {service.title}
                  </h3>

                  <p className="text-primary/90 font-medium mb-6">
                    {service.oneLiner}
                  </p>

                  {isFeatured && (
                    <p className="text-muted-foreground leading-relaxed mb-6 max-w-lg">
                      {service.description}
                    </p>
                  )}

                  {isFeatured && (
                    <div className="relative w-full mb-10 rounded-2xl overflow-hidden border border-border/70 ring-1 ring-inset ring-white/[0.04] shadow-[0_16px_40px_-20px_rgba(0,0,0,0.5)]">
                      <img
                        src="/services_images/mvp.webp"
                        alt=""
                        width="1000"
                        height="600"
                        loading="lazy"
                        decoding="async"
                        fetchpriority="low"
                        className="w-full h-auto object-contain bg-background"
                      />
                    </div>
                  )}

                  {/* Everything below this line is one decision: the offer.
                      Bookended once, at the top — not fragmented by a second
                      rule above the price. Whatever air the grid leaves above
                      this point reads as a considered pause, not a leftover. */}
                  <div className="mt-auto pt-7 border-t border-border/50">
                    {isFeatured ? (
                      <div className="mb-7">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground/60 mb-4">
                          What's included
                        </p>
                        <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-3">
                          {service.bullets.map((bullet) => (
                            <li key={bullet} className="flex items-start gap-2.5 text-sm text-foreground/80 leading-snug">
                              <Check size={14} className="text-primary/70 mt-0.5 flex-shrink-0" />
                              <span>{bullet}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ) : (
                      <div className="mb-6">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground/60 mb-3">
                          What's included
                        </p>
                        <ul className="space-y-3">
                          {service.bullets.slice(0, 3).map((bullet) => (
                            <li key={bullet} className="flex items-start gap-2.5 text-sm text-muted-foreground/90 leading-snug">
                              <Check size={14} className="text-primary/70 mt-0.5 flex-shrink-0" />
                              <span>{bullet}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <div className="flex items-end justify-between gap-4">
                      <div>
                        <span className="text-[11px] uppercase tracking-[0.14em] text-muted-foreground/70">Starting at</span>
                        <p className={`${isFeatured ? "text-4xl" : "text-2xl"} font-bold text-foreground leading-none tracking-tight mt-1.5`}>
                          {service.pricing.replace(/^Starting at\s*/i, "")}
                        </p>
                      </div>

                      <Link to={service.link} className="flex-shrink-0 mb-0.5" aria-label={`Explore ${service.title}`}>
                        <motion.div
                          whileHover={{ x: 2 }}
                          transition={{ duration: 0.15 }}
                          className="group/link flex items-center gap-2 text-sm font-semibold text-primary"
                          aria-hidden="true"
                        >
                          <span>Explore</span>
                          <span className="relative flex items-center justify-center w-7 h-7 rounded-full bg-primary/10 group-hover/link:bg-primary/20 transition-colors duration-300">
                            <ArrowRight size={14} className="group-hover/link:translate-x-[1.5px] transition-transform duration-200" />
                          </span>
                        </motion.div>
                      </Link>
                    </div>
                  </div>
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
              transition={{ duration: 0.15 }}
              className="group text-foreground hover:text-primary font-medium px-8 py-4
                       transition-colors duration-150 text-lg flex items-center gap-3 mx-auto
                       bg-card/30 backdrop-blur-xl border border-border rounded-full hover:border-primary/30 hover:bg-card/50"
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
