import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import { getSiteData } from "../../data/site";
import { getFeaturedProjects } from "../../data/homepageProjects/projects";

const FeaturedCaseStudies: React.FC = () => {
  const { featuredCaseStudies } = getSiteData();
  const projects = getFeaturedProjects().slice(0, 3);
  const [hero, second, third] = projects;

  return (
    <section id="portfolio" className="py-24 lg:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-14"
        >
          <div>
            <p className="text-sm font-semibold tracking-widest uppercase text-primary mb-3">
              Case Studies
            </p>
            <h2 className="text-4xl sm:text-5xl font-bold text-foreground leading-[1.08] tracking-tight">
              Success Stories from<br />
              <span className="text-primary">Global Markets</span>
            </h2>
          </div>
          <Link
            to={featuredCaseStudies.cta.link}
            className="group inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-150 shrink-0 pb-1"
          >
            {featuredCaseStudies.cta.text}
            <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform duration-150" />
          </Link>
        </motion.div>

        {/* Grid */}
        <div className="grid lg:grid-cols-12 gap-5">

          {/* HERO CARD — large left */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="lg:col-span-7 group"
          >
            <Link to={`/portfolio/${hero.slug}`}>
              <div className="bg-card border border-border rounded-2xl overflow-hidden hover:border-primary/25 transition-all duration-300 h-full flex flex-col">
                {/* Image */}
                <div className="relative overflow-hidden" style={{ height: "300px" }}>
                  <img
                    src={hero.image}
                    alt={hero.title}
                    className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                  {/* Subtle top vignette only */}
                  <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-card to-transparent" />
                </div>

                {/* Content */}
                <div className="p-7 flex flex-col flex-grow">
                  <div className="flex items-center gap-2.5 mb-4">
                    <span className="text-xs font-medium text-primary bg-primary/10 border border-primary/20 px-3 py-1 rounded-full">
                      {hero.category}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                      <MapPin size={11} />
                      {hero.client.country}
                    </span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-foreground leading-snug mb-3 group-hover:text-primary transition-colors duration-200">
                    {hero.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2 mb-6 flex-grow">
                    {hero.description}
                  </p>
                  <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground group-hover:text-primary transition-colors duration-200">
                    View case study
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-150" />
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>

          {/* RIGHT COLUMN — two stacked cards */}
          <div className="lg:col-span-5 flex flex-col gap-5">
            {[second, third].map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: (index + 1) * 0.1 }}
                className="group flex-1"
              >
                <Link to={`/portfolio/${project.slug}`}>
                  <div className="bg-card border border-border rounded-2xl overflow-hidden hover:border-primary/25 transition-all duration-300 h-full flex flex-col">
                    {/* Image */}
                    <div className="relative overflow-hidden" style={{ height: "160px" }}>
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.04]"
                      />
                      <div className="absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-card to-transparent" />
                    </div>

                    {/* Content */}
                    <div className="p-5 flex flex-col flex-grow">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-xs font-medium text-primary bg-primary/10 border border-primary/20 px-2.5 py-0.5 rounded-full">
                          {project.category}
                        </span>
                        <span className="flex items-center gap-1 text-xs text-muted-foreground">
                          <MapPin size={10} />
                          {project.client.country}
                        </span>
                      </div>
                      <h3 className="text-base font-bold text-foreground leading-snug mb-4 flex-grow group-hover:text-primary transition-colors duration-200 line-clamp-2">
                        {project.title}
                      </h3>
                      <div className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground group-hover:text-primary transition-colors duration-200">
                        View case study
                        <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform duration-150" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default FeaturedCaseStudies;
