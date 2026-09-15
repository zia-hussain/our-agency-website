import React, { useState } from "react";
import { Link } from "react-router-dom";
import SEO from "../components/common/SEO";
import PageTransition from "../components/common/PageTransition";
import AnimatedSection from "../components/common/AnimatedSection";
import ProjectCard from "../components/portfolio/ProjectCard";
import { motion } from "framer-motion";
import { projects, projectCategories } from "../data/projects";
import { ArrowLeft, ChevronRight } from "lucide-react";

const AllProjectsPage: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState("all");

  const filteredProjects = projects.filter((project) => {
    return activeFilter === "all" || project.type === activeFilter;
  });

  return (
    <PageTransition>
      <SEO
        title="Project Archive | Zumetrix Labs"
        description="Browse the wider Zumetrix Labs build archive across SaaS, mobile applications, automation, internal systems, and product concepts."
        keywords="all projects portfolio, software development projects, SaaS projects, mobile app projects, enterprise solutions, MVP development"
        url="https://zumetrix.com/portfolio/all"
        noIndex
      />

      {/* Breadcrumbs */}
      <section className="pt-32 pb-6 bg-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <nav className="flex items-center space-x-2 text-sm text-muted-foreground mb-8">
              <Link to="/" className="hover:text-primary transition-colors duration-150">Home</Link>
              <ChevronRight size={16} />
              <Link to="/portfolio" className="hover:text-primary transition-colors duration-150">Portfolio</Link>
              <ChevronRight size={16} />
              <span className="text-foreground font-medium">All Projects</span>
            </nav>

            <Link to="/portfolio">
              <motion.div
                whileHover={{ x: -2 }}
                transition={{ duration: 0.15 }}
                className="inline-flex items-center text-muted-foreground hover:text-primary transition-colors duration-150 group"
              >
                <ArrowLeft size={16} className="mr-2 group-hover:-translate-x-0.5 transition-transform duration-150" />
                Back to Portfolio
              </motion.div>
            </Link>
          </AnimatedSection>
        </div>
      </section>

      {/* Hero */}
      <section className="pt-8 pb-16 bg-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection mode="hero">
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight leading-[1.1] mb-6">
              <span className="block text-foreground">The wider</span>
              <span className="block bg-gradient-to-r from-primary via-primary/95 to-primary/85 bg-clip-text text-transparent">
                build archive.
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl leading-relaxed font-light">
              Every project in the catalogue, not just the three we lead with —
              client work, internal systems, and product concepts across industries.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Filter — a quiet segmented row, count folded into the active label */}
      <section className="pb-12 bg-background border-b border-border/60">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="flex flex-wrap gap-2">
              {projectCategories.map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => setActiveFilter(filter.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-150 border ${
                    activeFilter === filter.id
                      ? "bg-primary/10 text-primary border-primary/40"
                      : "text-muted-foreground border-border/60 hover:text-foreground hover:border-border"
                  }`}
                >
                  {filter.label}
                  <span
                    className={activeFilter === filter.id ? "text-primary/60 ml-1.5" : "text-muted-foreground/50 ml-1.5"}
                  >
                    {filter.count}
                  </span>
                </button>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-20 bg-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-x-10 gap-y-16">
            {filteredProjects.map((project, index) => (
              <AnimatedSection key={project.id} delay={index * 0.04}>
                <ProjectCard project={project} size="archive" />
              </AnimatedSection>
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <div className="text-center py-16">
              <div className="text-muted-foreground mb-4">
                No projects found matching your filters.
              </div>
              <button
                onClick={() => setActiveFilter("all")}
                className="text-primary hover:underline"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </section>
    </PageTransition>
  );
};

export default AllProjectsPage;
