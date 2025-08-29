import React from "react";
import { useParams, Link } from "react-router-dom";
import SEO from "../components/common/SEO";
import PageTransition from "../components/common/PageTransition";
import AnimatedSection from "../components/common/AnimatedSection";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ExternalLink,
  Github,
  Calendar,
  Users,
  MapPin,
  Building,
  CheckCircle,
  Quote,
  ChevronRight,
  Star,
  Globe,
  Code2,
  AlertTriangle,
  Target
} from "lucide-react";
import { projects } from "../data/projects";

const ProjectDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    return (
      <PageTransition>
        <div className="min-h-screen bg-background flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-foreground mb-4">
              Project Not Found
            </h1>
            <p className="text-muted-foreground mb-8">
              The project you're looking for doesn't exist.
            </p>
            <Link to="/portfolio">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.1 }}
                className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground px-6 py-3 rounded-lg font-medium"
              >
                Back to Portfolio
              </motion.button>
            </Link>
          </div>
        </div>
      </PageTransition>
    );
  }

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.description,
    image: project.image,
    creator: {
      "@type": "Organization",
      name: "Zumetrix Labs",
      url: "https://zumetrix.com"
    },
    dateCreated: project.year,
    keywords: project.tags.join(", "),
    client: {
      "@type": "Organization",
      name: project.client.name,
      location: project.client.country
    }
  };

  return (
    <PageTransition>
      <SEO
        title={`${project.title} - Case Study | Zumetrix Labs Portfolio`}
        description={project.description}
        keywords={`${project.tags.join(", ")}, case study, portfolio, ${project.client.country}`}
        image={project.image}
        url={`https://zumetrix.com/portfolio/${project.slug}`}
        structuredData={structuredData}
      />

      {/* Breadcrumbs */}
      <section className="pt-32 pb-8 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <nav className="flex items-center space-x-2 text-sm text-muted-foreground mb-8">
              <Link to="/" className="hover:text-primary transition-colors duration-100">
                Home
              </Link>
              <ChevronRight size={16} />
              <Link to="/portfolio" className="hover:text-primary transition-colors duration-100">
                Portfolio
              </Link>
              <ChevronRight size={16} />
              <span className="text-foreground font-medium line-clamp-1">
                {project.title}
              </span>
            </nav>

            <Link to="/portfolio">
              <motion.div
                whileHover={{ x: -2 }}
                transition={{ duration: 0.1 }}
                className="inline-flex items-center text-muted-foreground hover:text-primary transition-colors duration-100 mb-8 group"
              >
                <ArrowLeft size={16} className="mr-2 group-hover:-translate-x-0.5 transition-transform duration-100" />
                Back to Portfolio
              </motion.div>
            </Link>
          </AnimatedSection>
        </div>
      </section>

      {/* Project Hero */}
      <section className="pb-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <AnimatedSection>
              <div className="flex items-center gap-3 mb-6">
                <span className="px-4 py-2 bg-gradient-to-r from-primary/20 to-primary/10 text-primary rounded-full text-sm font-semibold border border-primary/20">
                  {project.category}
                </span>
                {project.featured && (
                  <span className="px-4 py-2 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground rounded-full text-sm font-semibold">
                    Featured Project
                  </span>
                )}
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight tracking-tight">
                {project.title}
              </h1>

              <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed mb-8 font-light">
                {project.description}
              </p>

              {/* Client Info */}
              <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="flex items-center gap-3">
                  <Building size={20} className="text-primary" />
                  <div>
                    <div className="text-sm text-muted-foreground">Client</div>
                    <div className="font-semibold text-foreground">{project.client.name}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin size={20} className="text-primary" />
                  <div>
                    <div className="text-sm text-muted-foreground">Location</div>
                    <div className="font-semibold text-foreground">{project.client.country}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar size={20} className="text-primary" />
                  <div>
                    <div className="text-sm text-muted-foreground">Duration</div>
                    <div className="font-semibold text-foreground">{project.duration}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Users size={20} className="text-primary" />
                  <div>
                    <div className="text-sm text-muted-foreground">Team</div>
                    <div className="font-semibold text-foreground">{project.team}</div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4">
                {project.liveLink && (
                  <motion.a
                    href={project.liveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ duration: 0.1 }}
                    className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground px-6 py-3 rounded-lg font-medium flex items-center gap-2"
                  >
                    <ExternalLink size={18} />
                    View Live Project
                  </motion.a>
                )}
                {project.githubLink && (
                  <motion.a
                    href={project.githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ duration: 0.1 }}
                    className="bg-card/50 backdrop-blur-xl text-foreground hover:text-primary px-6 py-3 rounded-lg font-medium border border-border hover:border-primary/30 flex items-center gap-2"
                  >
                    <Github size={18} />
                    View Code
                  </motion.a>
                )}
              </div>
            </AnimatedSection>

            {/* Project Image */}
            <AnimatedSection delay={0.1}>
              <div className="relative">
                <motion.img
                  initial={{ scale: 1.02 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.6 }}
                  src={project.image}
                  alt={project.title}
                  className="w-full rounded-2xl shadow-2xl border border-border"
                />
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Problem, Solution, Results */}
      <section className="py-24 bg-card/20 border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            <AnimatedSection>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <AlertTriangle size={24} className="text-white" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-4">The Problem</h3>
                <p className="text-muted-foreground leading-relaxed">{project.problem}</p>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.1}>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Code size={24} className="text-white" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-4">Our Solution</h3>
                <p className="text-muted-foreground leading-relaxed">{project.solution}</p>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Target size={24} className="text-white" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-4">The Results</h3>
                <ul className="space-y-2">
                  {project.results.map((result, index) => (
                    <li key={index} className="text-muted-foreground flex items-center gap-2">
                      <CheckCircle size={16} className="text-green-500 flex-shrink-0" />
                      {result}
                    </li>
                  ))}
                </ul>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Technology Stack */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6 tracking-tight">
              Technology
              <span className="block bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                Stack
              </span>
            </h2>
            <p className="text-xl text-muted-foreground font-light">
              Modern technologies used to build this project
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 gap-12">
            <AnimatedSection>
              <h3 className="text-2xl font-bold text-foreground mb-6">Technologies</h3>
              <div className="flex flex-wrap gap-3">
                {project.stack.map((tech) => (
                  <motion.span
                    key={tech}
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.1 }}
                    className="px-4 py-2 bg-card/50 backdrop-blur-xl text-foreground rounded-lg border border-border hover:border-primary/30 transition-all duration-100"
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.1}>
              <h3 className="text-2xl font-bold text-foreground mb-6">Services Provided</h3>
              <div className="space-y-3">
                {project.services.map((service) => (
                  <div key={service} className="flex items-center gap-3">
                    <CheckCircle size={16} className="text-primary" />
                    <span className="text-muted-foreground">{service}</span>
                  </div>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Testimonial */}
      {project.testimonial && (
        <section className="py-24 bg-card/20 border-y border-border">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <AnimatedSection className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary/80 rounded-full flex items-center justify-center mx-auto mb-8">
                <Quote size={24} className="text-primary-foreground" />
              </div>
              
              <blockquote className="text-2xl md:text-3xl text-foreground font-light leading-relaxed mb-8 italic">
                "{project.testimonial.quote}"
              </blockquote>
              
              <div className="text-center">
                <div className="font-semibold text-foreground text-lg">
                  {project.testimonial.author}
                </div>
                <div className="text-muted-foreground">
                  {project.testimonial.role}
                </div>
              </div>
            </AnimatedSection>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-8 tracking-tight">
              Ready to Start Your
              <span className="block bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                Next Project?
              </span>
            </h2>

            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-12 leading-relaxed font-light">
              Let's discuss how we can help you achieve similar results with your project.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact">
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.1 }}
                  className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground px-8 py-4 rounded-lg font-medium flex items-center gap-3 text-lg"
                >
                  Start Your Project
                  <ExternalLink size={20} />
                </motion.button>
              </Link>

              <Link to="/portfolio">
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.1 }}
                  className="bg-card/50 backdrop-blur-xl text-foreground hover:text-primary px-8 py-4 rounded-lg font-medium border border-border hover:border-primary/30 flex items-center gap-3 text-lg"
                >
                  View More Projects
                  <Globe size={20} />
                </motion.button>
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </PageTransition>
  );
};

export default ProjectDetailPage;