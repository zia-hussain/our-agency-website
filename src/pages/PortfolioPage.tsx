import React, { useState } from "react";
import SEO from "../components/common/SEO";
import PageTransition from "../components/common/PageTransition";
import AnimatedSection from "../components/common/AnimatedSection";
import { motion } from "framer-motion";
import {
  ExternalLink,
  Github,
  Calendar,
  Users,
  Code,
  Award,
} from "lucide-react";

const PortfolioPage: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState("all");

  const filters = [
    { id: "all", label: "All Projects" },
    { id: "web", label: "Web Apps" },
    { id: "mobile", label: "Mobile Apps" },
    { id: "enterprise", label: "Enterprise" },
    { id: "mvp", label: "MVP" },
  ];

  const projects = [
    {
      id: 1,
      title: "FinanceFlow Dashboard",
      category: "Web Application",
      type: "web",
      description:
        "A comprehensive financial analytics platform with real-time data visualization, automated reporting capabilities, and advanced portfolio management features.",
      longDescription:
        "FinanceFlow Dashboard revolutionizes how financial advisors manage client portfolios. Built with React and TypeScript, it features real-time market data integration, customizable dashboards, automated report generation, and advanced analytics. The platform handles over 10,000 daily transactions and serves 500+ active users.",
      image:
        "https://images.pexels.com/photos/7688336/pexels-photo-7688336.jpeg?auto=compress&cs=tinysrgb&w=800",
      tags: ["React", "TypeScript", "D3.js", "Node.js", "PostgreSQL", "AWS"],
      client: "FinTech Solutions Inc.",
      duration: "4 months",
      team: "3 developers",
      year: "2024",
      featured: true,
      results: [
        "40% increase in user engagement",
        "60% reduction in report generation time",
        "99.9% uptime achieved",
        "500+ active daily users",
      ],
    },
    {
      id: 2,
      title: "WellnessTracker Mobile",
      category: "Mobile Application",
      type: "mobile",
      description:
        "An intuitive health and wellness tracking application with personalized insights, goal management, and social features for motivation.",
      longDescription:
        "WellnessTracker Mobile empowers users to take control of their health journey. The app features comprehensive health tracking, AI-powered insights, social challenges, and integration with popular fitness devices. Built with React Native for seamless cross-platform experience.",
      image:
        "https://images.pexels.com/photos/4386370/pexels-photo-4386370.jpeg?auto=compress&cs=tinysrgb&w=800",
      tags: [
        "React Native",
        "Firebase",
        "Machine Learning",
        "Redux",
        "GraphQL",
      ],
      client: "WellnessPath Startup",
      duration: "6 months",
      team: "4 developers",
      year: "2024",
      featured: false,
      results: [
        "50,000+ downloads in first month",
        "4.8/5 app store rating",
        "85% user retention rate",
        "Featured in App Store",
      ],
    },
    {
      id: 3,
      title: "RetailOps Automation",
      category: "Enterprise Solution",
      type: "enterprise",
      description:
        "End-to-end inventory management and order processing automation for a growing e-commerce business with multiple sales channels.",
      longDescription:
        "RetailOps Automation streamlines complex e-commerce operations across multiple channels. The system automates inventory management, order processing, supplier communications, and financial reporting. Built with Python and AWS, it processes thousands of orders daily.",
      image:
        "https://images.pexels.com/photos/7688880/pexels-photo-7688880.jpeg?auto=compress&cs=tinysrgb&w=800",
      tags: ["Python", "AWS", "PostgreSQL", "REST API", "Docker", "Redis"],
      client: "RetailOps Enterprise",
      duration: "8 months",
      team: "5 developers",
      year: "2023",
      featured: false,
      results: [
        "75% reduction in processing time",
        "99.5% order accuracy",
        "50% cost savings in operations",
        "Handles 10,000+ orders daily",
      ],
    },
    {
      id: 4,
      title: "TaskFlow MVP",
      category: "Startup MVP",
      type: "mvp",
      description:
        "A rapid prototype for a project management startup, built to validate market demand and secure seed funding.",
      longDescription:
        "TaskFlow MVP was developed in just 6 weeks to help a startup validate their project management concept. The platform features team collaboration, task management, time tracking, and basic reporting. The MVP successfully helped secure $500K in seed funding.",
      image:
        "https://images.pexels.com/photos/7688336/pexels-photo-7688336.jpeg?auto=compress&cs=tinysrgb&w=800",
      tags: ["React", "Node.js", "Firebase", "Stripe", "Vercel"],
      client: "TaskFlow Startup",
      duration: "6 weeks",
      team: "2 developers",
      year: "2024",
      featured: false,
      results: [
        "Secured $500K seed funding",
        "1,000+ beta users",
        "Validated product-market fit",
        "95% user satisfaction",
      ],
    },
    {
      id: 5,
      title: "EduPlatform Web",
      category: "Educational Platform",
      type: "web",
      description:
        "A comprehensive online learning platform with video streaming, interactive quizzes, and progress tracking for educational institutions.",
      longDescription:
        "EduPlatform Web transforms traditional education with modern technology. The platform supports video lectures, interactive content, student progress tracking, and instructor tools. Built to scale for thousands of concurrent users with optimized video delivery.",
      image:
        "https://images.pexels.com/photos/4386370/pexels-photo-4386370.jpeg?auto=compress&cs=tinysrgb&w=800",
      tags: [
        "Next.js",
        "TypeScript",
        "Prisma",
        "PostgreSQL",
        "AWS S3",
        "Stripe",
      ],
      client: "EduTech Institute",
      duration: "5 months",
      team: "4 developers",
      year: "2023",
      featured: false,
      results: [
        "5,000+ active students",
        "99% video uptime",
        "40% improvement in engagement",
        "Reduced infrastructure costs by 30%",
      ],
    },
    {
      id: 6,
      title: "LogiTrack Mobile",
      category: "Logistics App",
      type: "mobile",
      description:
        "A logistics tracking application for delivery companies with real-time GPS tracking, route optimization, and customer notifications.",
      longDescription:
        "LogiTrack Mobile revolutionizes delivery operations with real-time tracking, intelligent route optimization, and automated customer communications. The app integrates with existing logistics systems and provides comprehensive analytics for fleet management.",
      image:
        "https://images.pexels.com/photos/7688880/pexels-photo-7688880.jpeg?auto=compress&cs=tinysrgb&w=800",
      tags: [
        "React Native",
        "Google Maps API",
        "Node.js",
        "MongoDB",
        "Socket.io",
      ],
      client: "LogiCorp Solutions",
      duration: "7 months",
      team: "3 developers",
      year: "2023",
      featured: false,
      results: [
        "30% reduction in delivery time",
        "95% customer satisfaction",
        "25% fuel cost savings",
        "Tracks 1,000+ deliveries daily",
      ],
    },
  ];

  const filteredProjects =
    activeFilter === "all"
      ? projects
      : projects.filter((project) => project.type === activeFilter);

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
        url="https://zumetrixlabs.com/portfolio"
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

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-8 tracking-tight leading-tight">
              Portfolio of
              <span className="block bg-shimmer bg-clip-text text-transparent">Excellence</span>
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
                  className="w-16 h-16 bg-card/50 backdrop-blur-xl border border-border rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/10 group-hover:border-primary/30 transition-all duration-150"
                >
                  <stat.icon size={24} className="text-primary" />
                </motion.div>
                <div className="text-3xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors duration-150">
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
            <div className="flex flex-wrap justify-center gap-4">
              {filters.map((filter) => (
                <motion.button
                  key={filter.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                  onClick={() => setActiveFilter(filter.id)}
                  className={`px-6 py-3 rounded-lg font-medium transition-all duration-150 ${
                    activeFilter === filter.id
                      ? "bg-beige-gradient text-primary-foreground shadow-glow"
                      : "bg-card/50 backdrop-blur-xl text-muted-foreground border border-border hover:border-primary/30 hover:text-primary"
                  }`}
                >
                  {filter.label}
                </motion.button>
              ))}
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
                <motion.div
                  whileHover={{ y: -12, scale: 1.02 }}
                  transition={{ duration: 0.15 }}
                  className={`bg-card/50 backdrop-blur-xl border rounded-lg overflow-hidden transition-all duration-150 ${
                    project.featured 
                      ? 'border-primary/50 shadow-glow' 
                      : 'border-border hover:border-primary/30'
                  } group-hover:bg-card/70 group-hover:shadow-card-hover`}
                >
                  {project.featured && (
                    <div className="bg-beige-gradient text-primary-foreground text-xs font-medium px-3 py-1 text-center">
                      Featured Project
                    </div>
                  )}

                  {/* Project Image */}
                  <div className="relative overflow-hidden aspect-[16/10]">
                    <motion.img
                      src={project.image}
                      alt={project.title}
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.4 }}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-150"></div>

                    {/* Hover Actions */}
                    <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-150">
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        transition={{ duration: 0.15 }}
                        className="bg-card/80 backdrop-blur-xl p-2 rounded-lg shadow-dark cursor-pointer"
                      >
                        <ExternalLink size={16} className="text-primary" />
                      </motion.div>
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        transition={{ duration: 0.15 }}
                        className="bg-card/80 backdrop-blur-xl p-2 rounded-lg shadow-dark cursor-pointer"
                      >
                        <Github size={16} className="text-primary" />
                      </motion.div>
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
                      <h3 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors duration-150">
                        {project.title}
                      </h3>
                      <span className="text-sm text-muted-foreground font-medium">
                        {project.year}
                      </span>
                    </div>

                    <p className="text-muted-foreground leading-relaxed mb-6">
                      {project.description}
                    </p>

                    {/* Project Meta */}
                    <div className="grid grid-cols-3 gap-4 mb-6 text-sm">
                      <div>
                        <span className="text-muted-foreground">Client:</span>
                        <div className="font-medium text-foreground">
                          {project.client}
                        </div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Duration:</span>
                        <div className="font-medium text-foreground">
                          {project.duration}
                        </div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Team:</span>
                        <div className="font-medium text-foreground">
                          {project.team}
                        </div>
                      </div>
                    </div>

                    {/* Key Results */}
                    <div className="mb-6">
                      <h4 className="font-semibold text-foreground mb-3">
                        Key Results:
                      </h4>
                      <div className="grid grid-cols-2 gap-2">
                        {project.results.slice(0, 4).map((result, idx) => (
                          <div
                            key={idx}
                            className="text-sm text-muted-foreground flex items-center gap-2"
                          >
                            <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                            {result}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <motion.span
                          key={tag}
                          whileHover={{ scale: 1.05 }}
                          transition={{ duration: 0.15 }}
                          className="text-xs px-3 py-1 bg-primary/10 text-primary rounded-full hover:bg-primary/20 transition-colors duration-150 cursor-pointer"
                        >
                          {tag}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center">
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-8 tracking-tight">
              Ready to Create
              <span className="block bg-shimmer bg-clip-text text-transparent">Your Success Story?</span>
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
                       hover:shadow-glow transition-all duration-150 
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