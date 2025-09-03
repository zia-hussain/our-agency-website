import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, MapPin, TrendingUp, ExternalLink, Building, Calendar } from "lucide-react";
import { motion } from "framer-motion";
import { getSiteData } from "../../data/site";
import { getFeaturedProjects } from "../../data/projects";

const FeaturedCaseStudies: React.FC = () => {
  const { featuredCaseStudies } = getSiteData();
  const projects = getFeaturedProjects().slice(0, 3);

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
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 tracking-tight leading-[1.1]">
            Success Stories from
            <span className="block bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
              Global Markets
            </span>
          </h2>

          <p className="text-lg sm:text-xl lg:text-2xl text-muted-foreground max-w-4xl mx-auto leading-[1.6] font-light">
            {featuredCaseStudies.subtitle}
          </p>
        </motion.div>

        {/* Case Studies Grid - Equal Height Cards */}
        <div className="grid lg:grid-cols-3 gap-6 lg:gap-8 mb-16">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -12, scale: 1.02 }}
              transition={{ duration: 0.15, delay: index * 0.1 }}
              className="group h-full"
            >
              <Link to={`/portfolio/${project.slug}`}>
                <div className="bg-card/50 backdrop-blur-xl border border-border rounded-2xl overflow-hidden hover:border-primary/30 h-full flex flex-col group-hover:bg-card/80 group-hover:shadow-card-hover transition-all duration-150">
                  
                  {/* Featured Badge */}
                  {project.featured && (
                    <div className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground text-xs font-medium px-3 py-1 text-center">
                      Featured Project
                    </div>
                  )}

                  {/* Project Image */}
                  <div className="relative aspect-[16/9] overflow-hidden">
                    <motion.img
                      src={project.image}
                      alt={project.title}
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.4 }}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-150"></div>

                    {/* Country Badge */}
                    <div className="absolute top-4 left-4">
                      <div className="flex items-center gap-2 px-3 py-1 bg-card/90 backdrop-blur-xl text-foreground text-xs font-medium rounded-full border border-border">
                        <MapPin size={12} />
                        {project.client.country}
                      </div>
                    </div>

                    {/* Category Badge */}
                    <div className="absolute bottom-4 left-4">
                      <span className="px-3 py-1 bg-primary/20 text-primary text-xs font-medium rounded-full backdrop-blur-xl border border-primary/30">
                        {project.category}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 lg:p-8 flex-grow flex flex-col">
                    <h3 className="text-xl lg:text-2xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors duration-150 line-clamp-2 leading-tight">
                      {project.title}
                    </h3>

                    <p className="text-muted-foreground leading-[1.6] mb-6 line-clamp-3 flex-grow">
                      {project.description}
                    </p>

                    {/* Client Info */}
                    <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
                      <div className="flex items-center gap-2">
                        <Building size={14} className="text-primary flex-shrink-0" />
                        <div className="min-w-0">
                          <span className="text-muted-foreground block">Client:</span>
                          <div className="font-medium text-foreground truncate">
                            {project.client.name}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar size={14} className="text-primary flex-shrink-0" />
                        <div>
                          <span className="text-muted-foreground block">Duration:</span>
                          <div className="font-medium text-foreground">
                            {project.duration}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Key Result */}
                    {project.kpis && project.kpis[0] && (
                      <div className="flex items-center gap-2 mb-6 p-3 bg-primary/5 rounded-lg border border-primary/20">
                        <TrendingUp size={16} className="text-primary flex-shrink-0" />
                        <span className="text-sm font-semibold text-primary">
                          {project.kpis[0].label}: {project.kpis[0].value}
                        </span>
                      </div>
                    )}

                    {/* Tech Stack Pills */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="text-xs px-3 py-1 bg-primary/10 text-primary rounded-full border border-primary/20"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Read Case Study Link */}
                    <div className="flex items-center justify-between mt-auto">
                      <div className="flex items-center text-primary font-medium">
                        <span>Read Case Study</span>
                        <ArrowRight
                          size={16}
                          className="ml-2 group-hover:translate-x-1 transition-transform duration-150"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* See All Projects Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.4 }}
          className="text-center"
        >
          <Link to={featuredCaseStudies.cta.link}>
            <motion.button
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.15 }}
              className="group bg-gradient-to-r from-primary to-primary/80 text-primary-foreground px-8 py-4 rounded-xl font-medium 
                       hover:shadow-glow transition-all duration-150
                       flex items-center gap-3 text-lg mx-auto"
            >
              {featuredCaseStudies.cta.text}
              <ArrowRight
                size={20}
                className="group-hover:translate-x-1 transition-transform duration-150"
              />
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedCaseStudies;