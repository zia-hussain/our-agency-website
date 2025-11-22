import React from 'react';
import { motion } from 'framer-motion';
import AnimatedSection from '../common/AnimatedSection';
import { Award, Users, Briefcase, Star } from 'lucide-react';

const ClientLogos: React.FC = () => {
  const trustBadges = [
    {
      icon: Award,
      value: '5.0',
      label: 'Rating',
      subtext: 'Based on 50+ projects'
    },
    {
      icon: Users,
      value: '100%',
      label: 'Satisfaction',
      subtext: 'Client success rate'
    },
    {
      icon: Briefcase,
      value: '50+',
      label: 'Projects',
      subtext: 'Delivered globally'
    },
    {
      icon: Star,
      value: 'Elite',
      label: 'Developers',
      subtext: 'World-class team'
    }
  ];

  const clients = [
    { name: 'Ifyify', industry: 'SaaS Platform' },
    { name: 'RetailOps', industry: 'E-Commerce' },
    { name: 'TaskFlow', industry: 'Productivity' },
    { name: 'EduTech', industry: 'Education' },
    { name: 'WellnessPath', industry: 'Healthcare' },
    { name: 'LogiCorp', industry: 'Logistics' },
  ];

  return (
    <section className="py-16 bg-card/20 border-y border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center px-4 py-2 bg-primary/10 backdrop-blur-xl border border-primary/20 rounded-full text-sm font-medium text-primary mb-6"
          >
            <Award className="w-4 h-4 mr-2" />
            Trusted by Leaders
          </motion.div>

          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
            Trusted by Leading Startups & Enterprises
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Join 50+ international clients who've transformed their vision into world-class software
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {trustBadges.map((badge, index) => (
            <motion.div
              key={badge.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="bg-card/50 backdrop-blur-xl border border-border rounded-lg p-6 hover:border-primary/30 transition-all duration-300 group"
            >
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-3 group-hover:bg-primary/20 transition-colors">
                  <badge.icon className="w-6 h-6 text-primary" />
                </div>
                <div className="text-2xl md:text-3xl font-bold text-foreground mb-1">
                  {badge.value}
                </div>
                <div className="text-sm font-medium text-foreground mb-1">
                  {badge.label}
                </div>
                <div className="text-xs text-muted-foreground">
                  {badge.subtext}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 items-center">
          {clients.map((client, index) => (
            <motion.div
              key={client.name}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="bg-card/30 backdrop-blur-sm border border-border/50 rounded-lg p-6 hover:border-primary/30 hover:bg-card/50 transition-all duration-300 cursor-default"
            >
              <div className="text-center">
                <div className="text-lg font-bold text-foreground mb-1">
                  {client.name}
                </div>
                <div className="text-xs text-muted-foreground">
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
          className="text-center mt-12"
        >
          <div className="inline-flex items-center gap-2 text-sm text-muted-foreground">
            <div className="flex -space-x-2">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} className="w-5 h-5 text-primary fill-current" />
              ))}
            </div>
            <span className="font-medium">5.0 rating</span>
            <span>·</span>
            <span>50+ client reviews</span>
            <span>·</span>
            <span>100% satisfaction rate</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ClientLogos;
