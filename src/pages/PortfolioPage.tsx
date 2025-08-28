import React, { useState } from "react";
import { Link } from "react-router-dom";
import SEO from "../components/common/SEO";
import PageTransition from "../components/common/PageTransition";
import AnimatedSection from "../components/common/AnimatedSection";
import { motion } from "framer-motion";
import { projects, projectCategories, projectRegions } from "../data/projects";
import {
  ExternalLink,
  Github,
  Calendar,
  Users,
  Code,
  Award,
  Filter,
  MapPin,
  Building
} from "lucide-react";

const PortfolioPage: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [activeRegion, setActiveRegion] = useState("all");

  const filteredProjects = projects.filter((project) => {
    const matchesCategory = activeFilter === "all" || project.type === activeFilter;
    const matchesRegion = activeRegion === "all" || 
      (activeRegion === "north-america" && ["United States", "Canada"].includes(project.client.country)) ||
      (activeRegion === "europe" && ["United Kingdom", "Germany", "France", "Netherlands"].includes(project.client.country)) ||
      (activeRegion === "asia-pacific" && ["Australia", "Singapore", "Japan"].includes(project.client.country)) ||
      (activeRegion === "middle-east" && ["UAE", "Saudi Arabia", "Qatar"].includes(project.client.country));
    
    return matchesCategory && matchesRegion;
  });

  const stats = [
    { icon: Code, number: "50+", label: "Projects Completed" },
    { icon: Users, number: "25+", label: "Happy Clients" },
    { icon: Calendar, number: "3+", label: "Years Experience" },
    { icon: Award, number: "100%", label: "Success Rate" },
  ];

  return (
    <PageTransition>
      <SEO
        gaTagId="G-PRSP59FL20"
        googleVerification="XbgNbYnq2H0qTIfTCwVFlXrYWHnnvw0acGCUjdlI_Cs"
        title="Portfolio - Our Best Work | Zumetrix Labs"
        description="Explore our portfolio of web applications, mobile apps, and enterprise solutions. See how we've helped businesses achieve their goals with exceptional software."
        keywords="portfolio, web development projects, mobile app projects, software development case studies, React projects, Node.js projects"
        url="https://zumetrix.com/portfolio"
      />

      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-background relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <AnimatedSection className="text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="inline-flex items-center px-4 py-2 bg-card/50 backdrop-blur-xl border border-border rounded-full text-sm font-medium text-primary mb-8"
            >
              Our Work
            </motion.div>

            <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-8 tracking-tight leading-tight">
              Portfolio of
              <span className="block bg-shimmer bg-clip-text text-transparent pb-4 leading-[1.1]">
                Excellence
              </span>
            </h1>

            <p className="text-xl lg:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed font-light">
              Discover how we've helped businesses transform their ideas into
              successful digital solutions that drive growth and user
              engagement.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-background border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <AnimatedSection
                key={stat.label}
                delay={index * 0.05}
                className="text-center group"
              >
                <motion.div
                  whileHover={{ scale: 1.1, y: -5 }}
                  transition={{ duration: 0.15 }}
                  className="w-16 h-16 bg-card/50 backdrop-blur-xl border border-border rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/10 group-hover:border-primary/30 "
                >
                  <stat.icon size={24} className="text-primary" />
                </motion.div>
                <div className="text-5xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors duration-150">
                  {stat.number}
                </div>
                <div className="text-muted-foreground text-sm font-medium">
                  {stat.label}
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-12 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center mb-8">
              <h3 className="text-xl font-semibold text-foreground mb-4 flex items-center justify-center gap-2">
                <Filter size={20} />
                Filter Projects
              </h3>
            </div>
            
            <div className="space-y-6">
              {/* Category Filters */}
              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-3 text-center">By Category</h4>
                <div className="flex flex-wrap justify-center gap-3">
                  {projectCategories.map((filter) => (
                    <motion.button
                      key={filter.id}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ duration: 0.1 }}
                      onClick={() => setActiveFilter(filter.id)}
                      className={`px-6 py-3 rounded-xl font-semibold shadow-lg ${
                        activeFilter === filter.id
                          ? "bg-gradient-to-r from-primary to-primary/80 text-primary-foreground shadow-glow scale-105"
                          : "bg-card/60 backdrop-blur-xl text-muted-foreground border border-border hover:border-primary/30 hover:text-primary hover:bg-card/80"
                      }`}
                    >
                      {filter.label}
                    </motion.button>
                  ))}
                </div>
              </div>
              
              {/* Region Filters */}
              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-3 text-center">By Region</h4>
                <div className="flex flex-wrap justify-center gap-3">
                  {projectRegions.map((region) => (
                    <motion.button
                      key={region.id}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ duration: 0.1 }}
                      onClick={() => setActiveRegion(region.id)}
                      className={`px-4 py-2 rounded-lg font-medium ${
                        activeRegion === region.id
                          ? "bg-primary/20 text-primary border border-primary/30"
                          : "bg-card/40 text-muted-foreground border border-border hover:border-primary/20 hover:text-primary"
                      }`}
                    >
                      {region.label}
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Results Count */}
      <section className="py-8 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center">
              <p className="text-muted-foreground">
                Showing <span className="font-semibold text-foreground">{filteredProjects.length}</span> projects
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {filteredProjects.map((project, index) => (
              <AnimatedSection
                key={project.id}
                delay={index * 0.05}
                className="group"
              >
                <Link to={`/portfolio/${project.slug}`}>
                  <motion.div
                    whileHover={{ y: -12, scale: 1.02 }}
                    transition={{ duration: 0.1 }}
                    className={`bg-card/50 backdrop-blur-xl border rounded-lg overflow-hidden cursor-pointer ${
                      project.featured
                        ? "border-primary/50 shadow-glow"
                        : "border-border hover:border-primary/30"
                    } group-hover:bg-card/70 group-hover:shadow-card-hover`}
                  >
                    {project.featured && (
                      <div className="bg-beige-gradient text-primary-foreground text-xs font-medium px-3 py-1 text-center">
                        Featured Project
                      </div>
                    )}

                    {/* Project Image */}
                    <div className="relative w-full aspect-[16/9] overflow-hidden">
                      <motion.img
                        src={project.image}
                        alt={project.title}
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.3 }}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-100"></div>

                      {/* Client Location Badge */}
                      <div className="absolute top-4 left-4">
                        <div className="flex items-center gap-2 px-3 py-1 bg-card/80 backdrop-blur-xl text-foreground text-xs font-medium rounded-full border border-border">
                          <MapPin size={12} />
                          {project.client.country}
                        </div>
                      </div>

                      {/* Category Badge */}
                      <div className="absolute bottom-4 left-4">
                        <span className="px-3 py-1 bg-beige-gradient text-primary-foreground text-xs font-medium rounded-full backdrop-blur-xl">
                          {project.category}
                        </span>
                      </div>
                    </div>

                    {/* Project Content */}
                    <div className="p-8">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors duration-100">
                          {project.title}
                        </h3>
                        <span className="text-sm text-muted-foreground font-medium">
                          {project.year}
                        </span>
                      </div>

                      <p className="text-muted-foreground leading-relaxed mb-6">
                        {project.description}
                      </p>

                      {/* Client Info */}
                      <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
                        <div className="flex items-center gap-2">
                          <Building size={14} className="text-primary" />
                          <div>
                            <span className="text-muted-foreground">Client:</span>
                            <div className="font-medium text-foreground line-clamp-1">
                              {project.client.name}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar size={14} className="text-primary" />
                          <div>
                            <span className="text-muted-foreground">Duration:</span>
                            <div className="font-medium text-foreground">
                              {project.duration}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Key Results */}
                      <div className="mb-6">
                        <h4 className="font-semibold text-foreground mb-3">
                          Key Results:
                        </h4>
                        <div className="grid grid-cols-1 gap-2">
                          {project.results.slice(0, 2).map((result, idx) => (
                            <div
                              key={idx}
                              className="text-sm text-muted-foreground flex items-center gap-2"
                            >
                              <div className="w-1.5 h-1.5 bg-primary rounded-full flex-shrink-0"></div>
                              {result}
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Technologies */}
                      <div className="flex flex-wrap gap-2">
                        {project.tags.slice(0, 4).map((tag) => (
                          <motion.span
                            key={tag}
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.1 }}
                            className="text-xs px-3 py-1 bg-primary/10 text-primary rounded-full hover:bg-primary/20 transition-colors duration-100 cursor-pointer"
                          >
                            {tag}
                          </motion.span>
                        ))}
                        {project.tags.length > 4 && (
                          <span className="text-xs px-3 py-1 bg-muted/20 text-muted-foreground rounded-full">
                            +{project.tags.length - 4} more
                          </span>
                        )}
                      </div>
                    </div>
                  </motion.div>
                </Link>
              </AnimatedSection>
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <div className="col-span-full text-center py-16">
              <div className="text-muted-foreground mb-4">
                No projects found matching your filters.
              </div>
              <motion.button
                onClick={() => {
                  setActiveFilter("all");
                  setActiveRegion("all");
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.1 }}
                className="text-primary hover:underline"
              >
                Clear all filters
              </motion.button>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center">
            <h2 className="text-5xl md:text-7xl font-bold text-foreground mb-8 tracking-tight">
              Ready to Create
              <span className="block bg-shimmer bg-clip-text text-transparent pb-4 leading-[1.1]">
                Your Success Story?
              </span>
            </h2>

            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-12 leading-relaxed font-light">
              Let's discuss your project and create a solution that drives real
              business results.
            </p>

            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.15 }}
              className="group bg-beige-gradient text-primary-foreground px-8 py-4 rounded-lg font-medium 
                       hover:shadow-glow  
                       flex items-center gap-3 text-lg mx-auto"
            >
              Start Your Project
              <ExternalLink
                size={20}
                className="group-hover:translate-x-1 transition-transform duration-150"
              />
            </motion.button>
          </AnimatedSection>
        </div>
      </section>
    </PageTransition>
  );
};

export default PortfolioPage;