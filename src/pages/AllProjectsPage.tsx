import React, { useState } from "react";
import { Link } from "react-router-dom";
import SEO from "../components/common/SEO";
import PageTransition from "../components/common/PageTransition";
import AnimatedSection from "../components/common/AnimatedSection";
import { motion } from "framer-motion";
import { projects, projectCategories } from "../data/projects";
import {
  Calendar,
  Users,
  Filter,
  MapPin,
  Building,
  ArrowLeft,
  ChevronRight
} from "lucide-react";

const AllProjectsPage: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState("all");

  const filteredProjects = projects.filter((project) => {
    return activeFilter === "all" || project.type === activeFilter;
  });

  return (
    <PageTransition>
      <SEO
        title="All Projects | Complete Portfolio | Zumetrix Labs"
        description="Browse all Zumetrix Labs software development projects. Filter by category to see SaaS applications, mobile apps, enterprise solutions, and startup MVPs."
        keywords="all projects portfolio, software development projects, SaaS projects, mobile app projects, enterprise solutions, MVP development"
        url="https://zumetrix.com/portfolio/all"
      />

      {/* Breadcrumbs */}
      <section className="pt-32 pb-8 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <nav className="flex items-center space-x-2 text-sm text-muted-foreground mb-8">
              <Link to="/" className="hover:text-primary transition-colors duration-150">
                Home
              </Link>
              <ChevronRight size={16} />
              <Link to="/portfolio" className="hover:text-primary transition-colors duration-150">
                Portfolio
              </Link>
              <ChevronRight size={16} />
              <span className="text-foreground font-medium">All Projects</span>
            </nav>

            <Link to="/portfolio">
              <motion.div
                whileHover={{ x: -2 }}
                transition={{ duration: 0.15 }}
                className="inline-flex items-center text-muted-foreground hover:text-primary transition-colors duration-150 mb-8 group"
              >
                <ArrowLeft size={16} className="mr-2 group-hover:-translate-x-0.5 transition-transform duration-150" />
                Back to Portfolio
              </motion.div>
            </Link>
          </AnimatedSection>
        </div>
      </section>

      {/* Hero Section */}
      <section className="pb-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center">
            <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-8 tracking-tight leading-tight">
              All
              <span className="block bg-shimmer bg-clip-text text-transparent pb-4 leading-[1.1]">
                Projects
              </span>
            </h1>

            <p className="text-xl lg:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed font-light">
              Explore our complete portfolio of successful software development projects
              for international clients across various industries and technologies.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Filter Section - Category Only */}
      <section className="py-12 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center mb-8">
              <h3 className="text-xl font-semibold text-foreground mb-4 flex items-center justify-center gap-2">
                <Filter size={20} />
                Filter by Category
              </h3>
            </div>
            
            <div className="flex flex-wrap justify-center gap-3">
              {projectCategories.map((filter) => (
                <motion.button
                  key={filter.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.15 }}
                  onClick={() => setActiveFilter(filter.id)}
                  className={`px-6 py-3 rounded-xl font-semibold transition-all duration-150 ${
                    activeFilter === filter.id
                      ? "bg-gradient-to-r from-primary to-primary/80 text-primary-foreground shadow-glow"
                      : "bg-card/60 backdrop-blur-xl text-muted-foreground border border-border hover:border-primary/30 hover:text-primary hover:bg-card/80"
                  }`}
                >
                  {filter.label}
                </motion.button>
              ))}
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
                    whileHover={{ y: -8, scale: 1.01 }}
                    transition={{ duration: 0.15 }}
                    className={`bg-card/50 backdrop-blur-xl border rounded-lg overflow-hidden cursor-pointer h-full flex flex-col ${
                      project.featured
                        ? "border-primary/50 shadow-glow"
                        : "border-border hover:border-primary/30"
                    } group-hover:bg-card/70 group-hover:shadow-card-hover`}
                  >
                    {project.featured && (
                      <div className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground text-xs font-medium px-3 py-1 text-center">
                        Featured Project
                      </div>
                    )}

                    {/* Project Image */}
                    <div className="relative w-full aspect-[16/9] overflow-hidden">
                      <motion.img
                        src={project.image}
                        alt={project.title}
                        whileHover={{ scale: 1.03 }}
                        transition={{ duration: 0.3 }}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-150"></div>

                      {/* Client Location Badge */}
                      <div className="absolute top-4 left-4">
                        <div className="flex items-center gap-2 px-3 py-1 bg-card/80 backdrop-blur-xl text-foreground text-xs font-medium rounded-full border border-border">
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

                    {/* Project Content */}
                    <div className="p-8 flex-grow flex flex-col">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors duration-150 line-clamp-2 leading-tight">
                          {project.title}
                        </h3>
                        <span className="text-sm text-muted-foreground font-medium">
                          {project.year}
                        </span>
                      </div>

                      <p className="text-muted-foreground leading-relaxed mb-6 line-clamp-3">
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
                              <span className="line-clamp-1">{result}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Technologies */}
                      <div className="flex flex-wrap gap-2 mt-auto">
                        {project.tags.slice(0, 4).map((tag) => (
                          <motion.span
                            key={tag}
                            whileHover={{ scale: 1.02 }}
                            transition={{ duration: 0.15 }}
                            className="text-xs px-3 py-1 bg-primary/10 text-primary rounded-full hover:bg-primary/20 transition-colors duration-150 cursor-pointer"
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
                onClick={() => setActiveFilter("all")}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.15 }}
                className="text-primary hover:underline"
              >
                Clear all filters
              </motion.button>
            </div>
          )}
        </div>
      </section>
    </PageTransition>
  );
};

export default AllProjectsPage;