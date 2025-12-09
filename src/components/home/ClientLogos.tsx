import React from 'react';
import { motion } from 'framer-motion';
import AnimatedSection from '../common/AnimatedSection';
import { Award, Users, Briefcase, Star, Globe2 } from 'lucide-react';
import { getClientLogosData } from '../../data/site';

const iconMap = {
  award: Award,
  users: Users,
  briefcase: Briefcase,
  star: Star
};

const ClientLogos: React.FC = () => {
  const data = getClientLogosData();

  return (
    <section className="py-12 md:py-16 bg-card/20 border-y border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
            className="inline-flex items-center px-3 py-1.5 md:px-4 md:py-2 bg-primary/10 backdrop-blur-xl border border-primary/20 rounded-full text-xs md:text-sm font-medium text-primary mb-4 md:mb-6"
          >
            <Award className="w-3 h-3 md:w-4 md:h-4 mr-2" />
            Trusted by Leaders
          </motion.div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-foreground mb-6 tracking-tight leading-[1.1]">
            {data.title}
            <span className="block bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
              {data?.themedTitle}
            </span>
          </h2>

          <p className="text-lg sm:text-xl lg:text-2xl text-muted-foreground max-w-4xl mx-auto leading-[1.6] font-light">
            {data.subtitle}
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-12 md:mb-16">
          {data.trustBadges.map((badge, index) => {
            const IconComponent = iconMap[badge.icon as keyof typeof iconMap];
            return (
              <motion.div
                key={badge.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="bg-card/50 backdrop-blur-xl border border-border rounded-lg p-4 md:p-6 hover:border-primary/30 transition-all duration-300 group"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-primary/10 rounded-full flex items-center justify-center mb-2 md:mb-3 group-hover:bg-primary/20 transition-colors">
                    <IconComponent className="w-5 h-5 md:w-6 md:h-6 text-primary" />
                  </div>
                  <div className="text-xl md:text-2xl lg:text-3xl font-bold text-foreground mb-1">
                    {badge.value}
                  </div>
                  <div className="text-xs md:text-sm font-medium text-foreground mb-1">
                    {badge.label}
                  </div>
                  <div className="text-[10px] md:text-xs text-muted-foreground">
                    {badge.subtext}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-6 items-center">
          {data.clients.map((client, index) => (
            <motion.div
              key={client.name}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="bg-card/30 backdrop-blur-sm border border-border/50 rounded-lg p-4 md:p-6 hover:border-primary/30 hover:bg-card/50 transition-all duration-300 cursor-default"
            >
              <div className="text-center">
                <div className="text-sm md:text-lg font-bold text-foreground mb-1">
                  {client.name}
                </div>
                <div className="text-[10px] md:text-xs text-muted-foreground">
                  {client.industry}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="mt-8 md:mt-12 flex justify-center px-4"
        >
          <div className="inline-flex flex-col items-center gap-2 md:gap-3 rounded-full border border-border/60 bg-background/80 px-3 py-2 md:px-6 md:py-3 shadow-sm backdrop-blur-sm sm:flex-row">
            <div className="flex items-center gap-2 rounded-full bg-gradient-to-r from-primary/15 via-primary/5 to-primary/15 px-2 py-1 md:px-3">
              <div className="flex -space-x-0.5">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star
                    key={i}
                    className="h-3 w-3 md:h-4 md:w-4 text-primary fill-primary drop-shadow-sm"
                  />
                ))}
              </div>
              <span className="text-[10px] md:text-[11px] font-semibold uppercase tracking-[0.12em] text-primary">
                Top Rated
              </span>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-x-2 md:gap-x-3 gap-y-1 text-xs md:text-sm text-muted-foreground">
              <span className="font-semibold text-foreground">{data.bottomBadge.rating} rating</span>
              <span className="hidden sm:inline">•</span>
              <span className="text-[11px] md:text-sm">{data.bottomBadge.reviews}</span>
              <span className="hidden sm:inline">•</span>
              <span className="text-[11px] md:text-sm">{data.bottomBadge.satisfaction}</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ClientLogos;
