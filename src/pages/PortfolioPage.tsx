import React, { useState } from "react";
import { Link } from "react-router-dom";
import SEO from "../components/common/SEO";
import PageTransition from "../components/common/PageTransition";
import AnimatedSection from "../components/common/AnimatedSection";
import { motion, AnimatePresence } from "framer-motion";
import { projects, projectCategories } from "../data/projects";
import { portfolioFAQs } from "../data/faqs/portfolio";
import { Plus } from "lucide-react";
import {
  Calendar,
  Users,
  Code,
  Award,
  MapPin,
  Building,
  ArrowRight,
  Eye
} from "lucide-react";

const PortfolioPage: React.FC = () => {
  const [openFAQ, setOpenFAQ] = useState<number | null>(0);

  // Show only featured/best projects on main portfolio page
  const featuredProjects = projects.filter(project => project.featured).slice(0, 6);

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  const stats = [
    { icon: Code, number: "50+", label: "Projects Completed" },
    { icon: Users, number: "25+", label: "Happy Clients" },
    { icon: Calendar, number: "3+", label: "Years Experience" },
    { icon: Award, number: "100%", label: "Success Rate" },
  ];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Zumetrix Labs Portfolio - Software Development Projects",
    description: "Explore our portfolio of successful software development projects including SaaS applications, mobile apps, enterprise solutions, and startup MVPs for international clients.",
    url: "https://zumetrix.com/portfolio",
    mainEntity: {
      "@type": "ItemList",
      itemListElement: featuredProjects.map((project, index) => ({
        "@type": "CreativeWork",
        position: index + 1,
        name: project.title,
        description: project.description,
        image: project.image,
        creator: {
          "@type": "Organization",
          name: "Zumetrix Labs"
        }
      }))
    }
  };

  return (
    <PageTransition>
      <SEO
        gaTagId="G-PRSP59FL20"
        googleVerification="XbgNbYnq2H0qTIfTCwVFlXrYWHnnvw0acGCUjdlI_Cs"
        title="Software Development Portfolio | SaaS MVP, React, Mobile Apps | Zumetrix Labs"
        description="Explore Zumetrix Labs' portfolio of successful software projects including SaaS MVPs, React/Node.js applications, mobile apps, and enterprise solutions for international clients in US, UK, Canada, Australia, UAE, and worldwide. Founded by expert developers Zia Hussain and Syed Omer Shah."
        keywords="software development portfolio, SaaS MVP projects, React development projects, mobile app portfolio, enterprise software solutions, startup MVP case studies, international software projects, web application portfolio, Zia Hussain projects, Syed Omer Shah portfolio"
        url="https://zumetrix.com/portfolio"
        structuredData={structuredData}
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
              <Eye size={16} className="mr-2" />
              Our Best Work
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
              engagement across global markets.
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
                  whileHover={{ scale: 1.05, y: -2 }}
                  transition={{ duration: 0.15 }}
                  className="w-16 h-16 bg-card/50 backdrop-blur-xl border border-border rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/10 group-hover:border-primary/30"
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

      {/* Featured Projects Grid */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            {featuredProjects.map((project, index) => (
              <AnimatedSection
                key={project.id}
                delay={index * 0.05}
                className="group"
              >
                <Link to={`/portfolio/${project.slug}`}>
                  <motion.div
                    whileHover={{ y: -8, scale: 1.01 }}
                    transition={{ duration: 0.15 }}
                    className="bg-card/50 backdrop-blur-xl border border-border rounded-lg overflow-hidden cursor-pointer h-full flex flex-col hover:border-primary/30 group-hover:bg-card/70 group-hover:shadow-card-hover"
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

          {/* See All Projects Button */}
          <AnimatedSection className="text-center">
            <Link to="/portfolio/all">
              <motion.button
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.15 }}
                className="group bg-gradient-to-r from-primary to-primary/80 text-primary-foreground px-8 py-4 rounded-lg font-medium 
                         hover:shadow-glow transition-all duration-150
                         flex items-center gap-3 text-lg mx-auto"
              >
                See All Projects
                <ArrowRight
                  size={20}
                  className="group-hover:translate-x-1 transition-transform duration-150"
                />
              </motion.button>
            </Link>
          </AnimatedSection>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-card/20 border-t border-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold text-foreground mb-6 tracking-tight">
              Portfolio
              <span className="block bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                Questions
              </span>
            </h2>
            <p className="text-xl text-muted-foreground leading-relaxed font-light">
              Learn more about our projects and client work
            </p>
          </AnimatedSection>

          <div className="space-y-4">
            {portfolioFAQs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="bg-card/50 backdrop-blur-xl border border-border rounded-lg overflow-hidden hover:border-primary/30 transition-all duration-150"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-6 py-6 text-left flex items-center justify-between hover:bg-card/70 transition-all duration-150"
                >
                  <h3 className="text-lg font-semibold text-foreground pr-4">
                    {faq.question}
                  </h3>
                  <motion.div
                    animate={{ rotate: openFAQ === index ? 45 : 0 }}
                    transition={{ duration: 0.15 }}
                    className="flex-shrink-0"
                  >
                    <Plus size={20} className="text-primary" />
                  </motion.div>
                </button>

                <AnimatePresence>
                  {openFAQ === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.15 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6">
                        <p className="text-[#DBDBDB] leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
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
              business results for your global audience.
            </p>

            <Link to="/contact">
              <motion.button
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.15 }}
                className="group bg-gradient-to-r from-primary to-primary/80 text-primary-foreground px-8 py-4 rounded-lg font-medium 
                         hover:shadow-glow transition-all duration-150
                         flex items-center gap-3 text-lg mx-auto"
              >
                Start Your Project
                <ArrowRight
                  size={20}
                  className="group-hover:translate-x-1 transition-transform duration-150"
                />
              </motion.button>
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </PageTransition>
  );
};

export default PortfolioPage;