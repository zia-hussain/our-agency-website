import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Badge, File, MapPin, PartyPopper } from "lucide-react";
import { motion } from "framer-motion";
import { getSiteData } from "../../data/site";
import { getFeaturedProjects } from "../../data/projects";

const FeaturedCaseStudies: React.FC = () => {
  const { featuredCaseStudies } = getSiteData();
  const projects = getFeaturedProjects().slice(0, 3);
  const [hero, ...sidebar] = projects;

  return (
    <section id="portfolio" className="py-28 bg-background relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
         {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="text-center mb-16 lg:mb-20"
        >
             {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3 }}
            className="inline-flex items-center px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-sm font-medium text-primary mb-6"
          >
            <Badge className="w-4 h-4 mr-2"  />
            Success Stories
          </motion.div>
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

        {/* Hero + Sidebar Layout */}
        <div className="grid lg:grid-cols-2 gap-6 lg:gap-8 mb-16 ">
          {/* Hero Project - Left */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="group lg:row-span-2 "
          >
            <Link to={`/portfolio/${hero.slug}`}>
              <div className="relative h-full min-h-[500px] lg:min-h-[600px] rounded-2xl overflow-hidden border border-transparent hover:border-primary/30 transition-all duration-150">
                <motion.img
                  src={hero.image}
                  alt={hero.title}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.4 }}
                  className="w-full h-full object-cover rounded-2xl"
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent"></div>

                {/* Content - Bottom */}
                <div className="absolute bottom-0 left-0 right-0 p-8 lg:p-10">
                  <div className="flex items-center gap-2 mb-4">
                    <MapPin size={16} className="text-primary" />
                    <span className="text-sm text-primary font-medium">
                      {hero.client.country}
                    </span>
                  </div>

                  <h3 className="text-2xl lg:text-3xl xl:text-4xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors duration-150">
                    {hero.title}
                  </h3>

                  <p className="text-base text-muted-foreground mb-4">
                    {hero.client.name}
                  </p>

                  <motion.div
                    whileHover={{ x: 4 }}
                    transition={{ duration: 0.15 }}
                    className="inline-flex items-center gap-2 text-primary font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-150"
                  >
                    View Case Study
                    <ArrowRight size={18} />
                  </motion.div>
                </div>
              </div>
            </Link>
          </motion.div>

          {/* Sidebar Projects - Right */}
          <div className="flex flex-col gap-6 lg:gap-8">
            {sidebar.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="group"
              >
                <Link to={`/portfolio/${project.slug}`}>
                  <div className="relative h-[250px] lg:h-[285px] rounded-2xl overflow-hidden border border-border hover:border-primary/30 transition-all duration-150">
                    <motion.img
                      src={project.image}
                      alt={project.title}
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.4 }}
                      className="w-full h-full object-cover rounded-2xl"
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent"></div>

                    {/* Content - Bottom */}
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <div className="flex items-center gap-2 mb-3">
                        <MapPin size={14} className="text-primary" />
                        <span className="text-xs text-primary font-medium">
                          {project.client.country}
                        </span>
                      </div>

                      <h3 className="text-xl lg:text-2xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors duration-150 line-clamp-2">
                        {project.title}
                      </h3>

                      <p className="text-sm text-muted-foreground mb-3">
                        {project.client.name}
                      </p>

                      <motion.div
                        whileHover={{ x: 4 }}
                        transition={{ duration: 0.15 }}
                        className="inline-flex items-center gap-2 text-sm text-primary font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-150"
                      >
                        View Case Study
                        <ArrowRight size={16} />
                      </motion.div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        {/* View All CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="text-center"
        >
          <Link to={featuredCaseStudies.cta.link}>
            <motion.button
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.15 }}
              className="group text-foreground hover:text-primary font-medium px-8 py-4
                       transition-colors duration-150 text-lg flex items-center gap-3 mx-auto
                       bg-card/30 backdrop-blur-xl border border-border rounded-xl hover:border-primary/30 hover:bg-card/50"
            >
              {featuredCaseStudies.cta.text}
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

export default FeaturedCaseStudies;