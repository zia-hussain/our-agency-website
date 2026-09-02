import React from "react";
import { motion } from "framer-motion";
import { Globe, Users, Award, Clock, TrendingUp, Building2 } from "lucide-react";
import { getSiteData } from "../../data/site";

const TrustBand: React.FC = () => {
  const { trustBand } = getSiteData();

  const iconMap = {
    globe: Globe,
    projects: Users,
    success: Award,
    response: Clock,
  };

  return (
    <section className="py-16 lg:py-20 bg-background relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center px-4 py-2 bg-card/50 backdrop-blur-xl border border-border rounded-full text-sm font-medium text-primary mb-8"
          >
            <TrendingUp className="w-4 h-4 mr-2" />
            Global Impact
          </motion.div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 tracking-tight leading-[1.1]">
            From Beef Plants
            <span className="block bg-gradient-to-r from-primary via-primary/90 to-primary/70 bg-clip-text text-transparent mt-2">
              to Book Publishers
            </span>
          </h2>

          <p className="text-lg sm:text-xl lg:text-2xl text-muted-foreground max-w-4xl mx-auto leading-[1.7] font-light">
            If your business doesn't fit a neat template, good — neither do
            the ones we've already built for.
          </p>
        </motion.div>

        {/* Stats — compact bordered tiles */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 max-w-4xl mx-auto mb-14"
        >
          {trustBand.globalStats.map((stat) => {
            const IconComponent = iconMap[stat.icon as keyof typeof iconMap];
            return (
              <div
                key={stat.label}
                className="group flex items-center gap-3 px-5 py-4 rounded-xl border border-border/70 bg-card/30 hover:border-primary/30 hover:bg-card/50 transition-all duration-200"
              >
                <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-200">
                  <IconComponent size={16} className="text-primary" />
                </div>
                <div>
                  <div className="text-base font-bold text-foreground leading-none">{stat.value}</div>
                  <div className="text-xs text-muted-foreground mt-1">{stat.label}</div>
                </div>
              </div>
            );
          })}
        </motion.div>

        {/* Industries — a compact list with premium hover presence */}
        <div className="max-w-4xl mx-auto rounded-2xl border border-border/70 bg-card/20 p-2 sm:p-3">
          {trustBand.clients.map((client, index) => (
            <motion.div
              key={client.name}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className={`group flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 py-5 px-4 rounded-xl text-sm hover:bg-card/60 transition-colors duration-200 ${
                index !== trustBand.clients.length - 1 ? "border-b border-border/50" : ""
              }`}
            >
              <div className="flex items-center gap-3 sm:w-56 flex-shrink-0">
                <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-200">
                  <Building2 size={14} className="text-primary" />
                </div>
                <span className="font-semibold text-foreground">{client.name}</span>
              </div>
              <span className="text-muted-foreground sm:w-44 flex-shrink-0">{client.industry}</span>
              <span className="text-muted-foreground/70 sm:w-28 flex-shrink-0">{client.country}</span>
              <span className="text-primary font-medium sm:ml-auto sm:w-60 sm:flex-shrink-0 sm:text-right">
                {client.project}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustBand;
