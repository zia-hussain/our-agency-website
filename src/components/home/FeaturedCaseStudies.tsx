import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, MapPin, TrendingUp, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import { getSiteData } from "../../data/site";
import { getFeaturedProjects } from "../../data/projects";

const FeaturedCaseStudies: React.FC = () => {
  const { featuredCaseStudies } = getSiteData();
  const projects = getFeaturedProjects().slice(0, 3);

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
          <h2 className="text-5xl md:text-6xl font-bold text-[#EDEDED] mb-6 tracking-tight leading-tight">
            {featuredCaseStudies.title.split(" ").slice(0, 2).join(" ")}
            <span className="block bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
              {featuredCaseStudies.title.split(" ").slice(2).join(" ")}
            </span>
          </h2>

          <p className="text-xl text-[#B6B6B6] max-w-4xl mx-auto leading-[1.7] font-light">
            {featuredCaseStudies.subtitle}
          </p>
        </motion.div>

        {/* Case Studies Grid */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -12, scale: 1.02 }}
              transition={{ duration: 0.14, delay: index * 0.1 }}
              className="group"
            >
              <Link to={`/portfolio/${project.slug}`}>
                <div className="bg-[#131313]/60 backdrop-blur-xl border border-[#1E1E1E]/60 rounded-2xl overflow-hidden hover:border-primary/30 h-full flex flex-col group-hover:bg-[#131313]/80 group-hover:shadow-[0_8px_40px_rgba(196,138,100,0.15)] transition-all duration-140">
                  {/* Project Image */}
                  <div className="relative aspect-[16/9] overflow-hidden">
                    <motion.img
                      src={project.image}
                      alt={project.title}
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.3 }}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0C0C0C]/90 via-transparent to-transparent transition-opacity duration-140"></div>

                    {/* Country Badge */}
                    <div className="absolute top-4 left-4">
                      <div className="flex items-center gap-2 px-3 py-1 bg-[#131313]/80 backdrop-blur-xl text-[#EDEDED] text-xs font-medium rounded-full border border-[#1E1E1E]/60">
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
                  <div className="p-8 flex-grow flex flex-col">
                    <h3 className="text-xl font-bold text-[#EDEDED] mb-3 group-hover:text-primary transition-colors duration-140 line-clamp-2 leading-tight">
                      {project.title}
                    </h3>

                    <p className="text-[#B6B6B6] leading-[1.7] mb-6 line-clamp-3 flex-grow">
                      {project.description}
                    </p>

                    {/* Key Result */}
                    {project.kpis && project.kpis[0] && (
                      <div className="flex items-center gap-2 mb-6 p-3 bg-primary/5 rounded-lg border border-primary/20">
                        <TrendingUp size={16} className="text-primary" />
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
                          className="ml-2 group-hover:translate-x-1 transition-transform duration-140"
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
              transition={{ duration: 0.12 }}
              className="group bg-gradient-to-r from-primary to-primary/80 text-primary-foreground px-8 py-4 rounded-xl font-medium 
                       hover:shadow-[0_0_30px_rgba(196,138,100,0.4)] transition-all duration-120
                       flex items-center gap-3 text-lg mx-auto"
            >
              {featuredCaseStudies.cta.text}
              <ArrowRight
                size={20}
                className="group-hover:translate-x-1 transition-transform duration-120"
              />
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedCaseStudies;
