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
    <section className="py-16 lg:py-20 bg-gradient-to-b from-background via-card/[0.15] to-background relative overflow-hidden">
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
            className="inline-flex items-center px-3.5 py-1.5 bg-card/40 backdrop-blur-xl border border-border/70 rounded-full text-xs font-medium uppercase tracking-[0.1em] text-primary/90 mb-7"
          >
            <TrendingUp className="w-3.5 h-3.5 mr-2" />
            Global Impact
          </motion.div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-5 tracking-tight leading-[1.12]">
            From Beef Plants
            <span className="block bg-gradient-to-r from-primary via-primary/90 to-primary/70 bg-clip-text text-transparent mt-1.5">
              to Book Publishers
            </span>
          </h2>

          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-[1.7] font-light">
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
                className="group flex items-center gap-3 px-5 py-4 rounded-xl border border-border/60 bg-card/20 hover:border-primary/25 hover:bg-card/40 transition-all duration-300"
              >
                <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-primary/[0.08] flex items-center justify-center group-hover:bg-primary/15 transition-colors duration-300">
                  <IconComponent size={15} className="text-primary/90" />
                </div>
                <div>
                  <div className="text-base font-bold text-foreground leading-none tracking-tight">{stat.value}</div>
                  <div className="text-[11px] text-muted-foreground mt-1.5">{stat.label}</div>
                </div>
              </div>
            );
          })}
        </motion.div>

        {/* Industries — a compact list with premium hover presence */}
        <div className="max-w-4xl mx-auto rounded-2xl border border-border/60 bg-card/10 backdrop-blur-sm p-2 sm:p-3 ring-1 ring-inset ring-white/[0.02]">
          {trustBand.clients.map((client, index) => (
            <motion.div
              key={client.name}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className={`group flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 py-5 px-4 rounded-xl text-sm hover:bg-card/50 transition-colors duration-300 ${
                index !== trustBand.clients.length - 1 ? "border-b border-border/40" : ""
              }`}
            >
              <div className="flex items-center gap-3 sm:w-56 flex-shrink-0">
                <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-primary/[0.08] flex items-center justify-center group-hover:bg-primary/15 transition-colors duration-300">
                  <Building2 size={14} className="text-primary/90" />
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
