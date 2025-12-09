import React from "react";
import { motion } from "framer-motion";
import { Globe, Users, Award, Clock, MapPin, Building, TrendingUp } from "lucide-react";
import { getSiteData } from "../../data/site";

const TrustBand: React.FC = () => {
  const { trustBand } = getSiteData();

  return (
    <section className="py-20 lg:py-28 bg-gradient-to-b from-card/10 via-card/30 to-card/10 border-y border-border/50 relative overflow-hidden">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 50% 50%, #C48A64 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16 lg:mb-20"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-primary/15 to-primary/5 backdrop-blur-xl border border-primary/30 rounded-full text-sm font-semibold text-primary mb-6 shadow-lg"
          >
            <TrendingUp className="w-4 h-4 mr-2" />
            Global Impact
          </motion.div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 tracking-tight leading-[1.1]">
            {trustBand.title}
            <span className="block bg-gradient-to-r from-primary via-primary/90 to-primary/70 bg-clip-text text-transparent mt-2">
              {trustBand.themedTitle}
            </span>
          </h2>

          <p className="text-lg sm:text-xl lg:text-2xl text-muted-foreground max-w-4xl mx-auto leading-[1.7] font-light">
            {trustBand.subtitle}
          </p>
        </motion.div>

        {/* Global Stats - Enhanced Design */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-20">
          {trustBand.globalStats.map((stat, index) => {
            const iconMap = {
              globe: Globe,
              projects: Users,
              success: Award,
              response: Clock,
            };
            const IconComponent = iconMap[stat.icon as keyof typeof iconMap];

            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ y: -6, scale: 1.03 }}
                transition={{ duration: 0.2, delay: index * 0.08 }}
                className="relative text-center bg-gradient-to-br from-card/70 to-card/40 backdrop-blur-xl border border-border/60 rounded-2xl px-5 py-8 hover:bg-card hover:border-primary/40 transition-all duration-200 cursor-pointer group shadow-lg hover:shadow-2xl hover:shadow-primary/10"
              >
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-2xl" />
                <div className="relative">
                  <div className="flex items-center justify-center mb-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-200">
                      <IconComponent size={24} className="text-primary" />
                    </div>
                  </div>
                  <div className="text-3xl lg:text-4xl font-bold text-foreground group-hover:text-primary transition-colors duration-200 mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm lg:text-base font-semibold text-muted-foreground">
                    {stat.label}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Client Showcase - Premium Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {trustBand.clients.map((client, index) => (
            <motion.div
              key={client.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -6, scale: 1.02 }}
              transition={{ duration: 0.2, delay: index * 0.06 }}
              className="group relative bg-gradient-to-br from-card/80 to-card/50 backdrop-blur-xl border border-border/60 rounded-2xl p-7 hover:border-primary/40 hover:bg-card transition-all duration-200 h-full shadow-lg hover:shadow-2xl hover:shadow-primary/10"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
              <div className="relative">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-primary/20 to-primary/10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-200">
                    <Building size={24} className="text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-lg text-foreground mb-2 group-hover:text-primary transition-colors duration-200">
                      {client.name}
                    </h3>
                    <div className="flex items-center gap-2 mb-3">
                      <MapPin size={14} className="text-primary flex-shrink-0" />
                      <span className="text-sm text-muted-foreground font-semibold">
                        {client.country}
                      </span>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-3 font-medium">
                  {client.industry}
                </p>
                <div className="inline-flex items-center text-xs text-primary font-bold bg-gradient-to-r from-primary/15 to-primary/5 px-3 py-2 rounded-lg border border-primary/20">
                  {client.project}
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
