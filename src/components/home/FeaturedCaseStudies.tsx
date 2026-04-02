import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, MapPin, Monitor } from "lucide-react";
import { motion } from "framer-motion";
import { getSiteData } from "../../data/site";
import { getFeaturedProjects } from "../../data/homepageProjects/projects";

const FeaturedCaseStudies: React.FC = () => {
  const { featuredCaseStudies } = getSiteData();
  const projects = getFeaturedProjects().slice(0, 3);
  const [hero, second, third] = projects;

  return (
    <section id="portfolio" className="py-28 bg-background relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Header — exact same pattern as ServicesPreview */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="text-center mb-16 lg:mb-20"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3 }}
            className="inline-flex items-center px-4 py-2 bg-card/50 backdrop-blur-xl border border-border rounded-full text-sm font-medium text-primary mb-8"
          >
            <Monitor size={16} className="mr-2" />
            Success Stories from Global Markets
          </motion.div>

          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 tracking-tight leading-[1.1]">
            Real Results for
            <span className="block bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
              Real Businesses
            </span>
          </h2>

          <p className="text-lg sm:text-xl lg:text-2xl text-muted-foreground max-w-3xl mx-auto leading-[1.6] font-light">
            Across US, UK, Canada, Australia, UAE & Singapore — we build products that move the needle.
          </p>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">

          {/* HERO CARD — spans 2 cols like featured service */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -4, scale: 1.01 }}
            transition={{ duration: 0.15 }}
            className="group lg:col-span-2"
          >
            <Link to={`/portfolio/${hero.slug}`}>
              <div className="bg-card/30 backdrop-blur-xl p-8 lg:p-12 rounded-2xl border border-border h-full flex flex-col transition-all duration-150 hover:border-primary/30 hover:bg-card/50 hover:shadow-lg">

                {/* Category & Country */}
                <div className="flex items-center gap-3 mb-5">
                  <span className="text-xs font-medium text-primary bg-primary/10 border border-primary/20 px-3 py-1 rounded-full">
                    {hero.category}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-muted-foreground">
                    <MapPin size={11} />
                    {hero.client.country}
                  </span>
                </div>

                <h3 className="text-3xl lg:text-4xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors duration-150">
                  {hero.title}
                </h3>

                <p className="text-primary font-medium mb-6">
                  {hero.description}
                </p>

                {/* Image container — same pattern as services */}
                <div className="bg-[#0E0A07] w-full my-4 rounded-2xl flex-grow flex items-center justify-center overflow-hidden" style={{ minHeight: "280px" }}>
                  <img
                    src={hero.image}
                    alt={hero.title}
                    className="w-full h-full object-contain rounded-2xl"
                    style={{ maxHeight: "360px" }}
                  />
                </div>

                <motion.div
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.15 }}
                  className="flex items-center gap-2 text-primary font-medium group-hover:gap-3 mt-4"
                >
                  View Case Study
                  <ArrowRight size={18} />
                </motion.div>
              </div>
            </Link>
          </motion.div>

          {/* RIGHT COLUMN — two stacked cards */}
          <div className="flex flex-col gap-6 lg:gap-8">
            {[second, third].map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ y: -4, scale: 1.01 }}
                transition={{ duration: 0.15, delay: (index + 1) * 0.1 }}
                className="group flex-1"
              >
                <Link to={`/portfolio/${project.slug}`}>
                  <div className="bg-card/30 backdrop-blur-xl p-8 rounded-2xl border border-border h-full flex flex-col transition-all duration-150 hover:border-primary/30 hover:bg-card/50 hover:shadow-lg">

                    <div className="flex items-center gap-2 mb-4">
                      <span className="text-xs font-medium text-primary bg-primary/10 border border-primary/20 px-2.5 py-0.5 rounded-full">
                        {project.category}
                      </span>
                      <span className="flex items-center gap-1 text-xs text-muted-foreground">
                        <MapPin size={10} />
                        {project.client.country}
                      </span>
                    </div>

                    <h3 className="text-2xl lg:text-3xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors duration-150 line-clamp-2">
                      {project.title}
                    </h3>

                    <p className="text-primary font-medium mb-5 text-sm line-clamp-2">
                      {project.description}
                    </p>

                    {/* Image container */}
                    <div className="bg-[#0E0A07] w-full rounded-2xl flex-grow flex items-center justify-center overflow-hidden mb-5" style={{ minHeight: "180px" }}>
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-contain rounded-2xl"
                        style={{ maxHeight: "220px" }}
                      />
                    </div>

                    <motion.div
                      whileHover={{ x: 4 }}
                      transition={{ duration: 0.15 }}
                      className="flex items-center gap-2 text-primary font-medium group-hover:gap-3 mt-auto"
                    >
                      View Case Study
                      <ArrowRight size={18} />
                    </motion.div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

        </div>

        {/* CTA — same pattern as ServicesPreview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="text-center mt-16"
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
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform duration-150" />
            </motion.button>
          </Link>
        </motion.div>

      </div>
    </section>
  );
};

export default FeaturedCaseStudies;
