import React from "react";
import { motion } from "framer-motion";
import { Globe, Users, Award, Clock, MapPin, Building } from "lucide-react";
import { getSiteData } from "../../data/site";

const TrustBand: React.FC = () => {
  const { trustBand } = getSiteData();

  return (
    <section className="py-16 lg:py-20 bg-card/20 border-y border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="text-center mb-12"
        >
          <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-4">
            {trustBand.title}
          </h2>
          <p className="text-lg text-muted-foreground font-light max-w-3xl mx-auto">
            {trustBand.subtitle}
          </p>
        </motion.div>

        {/* Global Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-16">
          {trustBand.globalStats.map((stat, index) => {
            const iconMap = {
              globe: Globe,
              projects: Users,
              success: Award,
              response: Clock
            };
            const IconComponent = iconMap[stat.icon as keyof typeof iconMap];

            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ y: -2, scale: 1.02 }}
                transition={{ duration: 0.15, delay: index * 0.05 }}
                className="text-center bg-card/50 backdrop-blur-xl border border-border rounded-xl px-4 py-6 hover:bg-card/80 hover:border-primary/30 transition-all duration-150 cursor-pointer group"
              >
                <div className="flex items-center justify-center mb-3">
                  <IconComponent size={20} className="text-primary mr-2" />
                  <span className="text-2xl lg:text-3xl font-bold text-foreground group-hover:text-primary transition-colors duration-150">
                    {stat.value}
                  </span>
                </div>
                <div className="text-sm lg:text-base font-medium text-foreground">
                  {stat.label}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Client Showcase */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {trustBand.clients.map((client, index) => (
            <motion.div
              key={client.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -4, scale: 1.02 }}
              transition={{ duration: 0.15, delay: index * 0.05 }}
              className="group bg-card/50 backdrop-blur-xl border border-border rounded-xl p-6 hover:border-primary/30 hover:bg-card/80 transition-all duration-150 h-full"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors duration-150">
                  <Building size={20} className="text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-foreground mb-1 group-hover:text-primary transition-colors duration-150 truncate">
                    {client.name}
                  </h3>
                  <div className="flex items-center gap-2 mb-2">
                    <MapPin size={12} className="text-primary flex-shrink-0" />
                    <span className="text-sm text-muted-foreground font-medium">
                      {client.country}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mb-2">
                    {client.industry}
                  </p>
                  <div className="text-xs text-primary font-medium bg-primary/10 px-2 py-1 rounded-full inline-block">
                    {client.project}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustBand;