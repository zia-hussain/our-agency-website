import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, MapPin, Trophy } from "lucide-react";
import { motion } from "framer-motion";
import { getSiteData } from "../../data/site";
import { getFeaturedProjects } from "../../data/homepageProjects/projects";

const FeaturedCaseStudies: React.FC = () => {
  const { featuredCaseStudies } = getSiteData();
  const projects = getFeaturedProjects().slice(0, 3);
  const [hero, ...sidebar] = projects;

  return (
    <section id="portfolio" className="py-24 lg:py-32 bg-background relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="text-center mb-16 lg:mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-sm font-medium text-primary mb-6">
            <Trophy size={14} />
            Success Stories
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-foreground mb-5 tracking-tight leading-[1.1]">
            Success Stories from
            <span className="block bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
              Global Markets
            </span>
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed font-light">
            {featuredCaseStudies.subtitle}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-4 lg:gap-5 mb-12">
          {/* Hero card — takes 3 cols */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="lg:col-span-3 group"
          >
            <Link to={`/portfolio/${hero.slug}`}>
              <div className="relative rounded-2xl overflow-hidden bg-card" style={{ height: "520px" }}>
                <img
                  src={hero.image}
                  alt={hero.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                <div className="absolute bottom-0 left-0 right-0 p-7 lg:p-8">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex items-center gap-1.5 px-3 py-1 bg-white/10 backdrop-blur-sm border border-white/15 rounded-full">
                      <MapPin size={12} className="text-primary" />
                      <span className="text-xs font-medium text-white/90">{hero.client.country}</span>
                    </div>
                  </div>
                  <h3 className="text-2xl lg:text-3xl font-bold text-white mb-2 leading-snug group-hover:text-primary transition-colors duration-200">
                    {hero.title}
                  </h3>
                  <p className="text-sm text-white/60 mb-4">{hero.client.name}</p>
                  <div className="flex items-center gap-2 text-primary text-sm font-medium opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-200">
                    View Case Study
                    <ArrowRight size={15} />
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>

          {/* Sidebar cards — 2 cols, stacked */}
          <div className="lg:col-span-2 flex flex-col gap-4 lg:gap-5">
            {sidebar.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: (index + 1) * 0.1 }}
                className="group flex-1"
              >
                <Link to={`/portfolio/${project.slug}`}>
                  <div className="relative rounded-2xl overflow-hidden bg-card h-full" style={{ minHeight: "246px" }}>
                    <img
                      src={project.image}
                      alt={project.title}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent" />

                    <div className="absolute bottom-0 left-0 right-0 p-5 lg:p-6">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="flex items-center gap-1.5 px-2.5 py-1 bg-white/10 backdrop-blur-sm border border-white/15 rounded-full">
                          <MapPin size={11} className="text-primary" />
                          <span className="text-xs font-medium text-white/90">{project.client.country}</span>
                        </div>
                      </div>
                      <h3 className="text-lg lg:text-xl font-bold text-white mb-1 leading-snug group-hover:text-primary transition-colors duration-200 line-clamp-2">
                        {project.title}
                      </h3>
                      <p className="text-xs text-white/55">{project.client.name}</p>
                      <div className="flex items-center gap-1.5 text-primary text-xs font-medium mt-3 opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-200">
                        View Case Study
                        <ArrowRight size={13} />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.35, delay: 0.2 }}
          className="text-center"
        >
          <Link to={featuredCaseStudies.cta.link}>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="group inline-flex items-center gap-2.5 px-7 py-3.5 bg-card/40 backdrop-blur-xl border border-border text-foreground hover:text-primary hover:border-primary/30 hover:bg-card/60 font-medium rounded-xl transition-all duration-150 text-base"
            >
              {featuredCaseStudies.cta.text}
              <ArrowRight size={17} className="group-hover:translate-x-1 transition-transform duration-150" />
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedCaseStudies;
