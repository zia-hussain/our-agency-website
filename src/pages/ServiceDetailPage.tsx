import React from "react";
import { useParams, Link } from "react-router-dom";
import SEO from "../components/common/SEO";
import PageTransition from "../components/common/PageTransition";
import AnimatedSection from "../components/common/AnimatedSection";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  CheckCircle,
  Quote,
  ChevronRight,
  Target,
  Code2,
  AlertTriangle,
  TrendingUp,
  Users,
  Calendar,
  Award,
  ExternalLink,
  ArrowRight,
} from "lucide-react";
import { getServiceBySlug } from "../data/services";
import { getProjectBySlug } from "../data/projects";

const ServiceDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const service = slug ? getServiceBySlug(slug) : null;

  if (!service) {
    return (
      <PageTransition>
        <div className="min-h-screen bg-background flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-foreground mb-4">
              Service Not Found
            </h1>
            <p className="text-muted-foreground mb-8">
              The service you're looking for doesn't exist.
            </p>
            <Link to="/services">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.15 }}
                className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground px-6 py-3 rounded-lg font-medium"
              >
                Back to Services
              </motion.button>
            </Link>
          </div>
        </div>
      </PageTransition>
    );
  }

  // Get related projects
  const relatedProjects = service.relatedProjects?.map(projectSlug => 
    getProjectBySlug(projectSlug)
  ).filter(Boolean) || [];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.description,
    provider: {
      "@type": "Organization",
      name: "Zumetrix Labs",
      url: "https://zumetrix.com"
    },
    serviceType: service.technologies,
    areaServed: ["Pakistan", "United States", "United Kingdom", "Canada", "Australia", "UAE", "Singapore", "Worldwide"],
    offers: {
      "@type": "Offer",
      price: service.price,
      priceCurrency: "USD"
    }
  };

  return (
    <PageTransition>
      <SEO
        title={service.seo.title}
        description={service.seo.description}
        keywords={service.seo.keywords}
        image={service.image}
        url={`https://zumetrix.com/services/${service.slug}`}
        structuredData={structuredData}
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
              <Link to="/services" className="hover:text-primary transition-colors duration-150">
                Services
              </Link>
              <ChevronRight size={16} />
              <span className="text-foreground font-medium line-clamp-1">
                {service.title}
              </span>
            </nav>

            <Link to="/services">
              <motion.div
                whileHover={{ x: -2 }}
                transition={{ duration: 0.15 }}
                className="inline-flex items-center text-muted-foreground hover:text-primary transition-colors duration-150 mb-8 group"
              >
                <ArrowLeft size={16} className="mr-2 group-hover:-translate-x-0.5 transition-transform duration-150" />
                Back to Services
              </motion.div>
            </Link>
          </AnimatedSection>
        </div>
      </section>

      {/* Service Hero */}
      <section className="pb-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <AnimatedSection>
              <div className="flex items-center gap-3 mb-6">
                <span className="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold border border-primary/20">
                  {service.title}
                </span>
                {service.popular && (
                  <span className="px-4 py-2 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground rounded-full text-sm font-semibold">
                    Most Popular
                  </span>
                )}
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight tracking-tight">
                {service.title}
              </h1>

              <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed mb-8 font-light">
                {service.subtitle}
              </p>

              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                {service.longDescription}
              </p>

              <div className="flex items-center gap-6 mb-8">
                <div className="text-3xl font-bold text-primary">
                  {service.price}
                </div>
                <div className="text-sm text-muted-foreground">
                  Professional development with enterprise-grade quality
                </div>
              </div>

              <Link to="/contact">
                <motion.button
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.15 }}
                  className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground px-8 py-4 rounded-lg font-medium flex items-center gap-3 text-lg hover:shadow-glow"
                >
                  Start Your Project
                  <ExternalLink size={20} />
                </motion.button>
              </Link>
            </AnimatedSection>

            <AnimatedSection delay={0.1}>
              <div className="relative">
                <motion.img
                  initial={{ scale: 1.02 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.6 }}
                  src={service.image}
                  alt={service.title}
                  className="w-full rounded-2xl shadow-2xl border border-border"
                />
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Problems, Methodology, Results */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            <AnimatedSection>
              <motion.div
                whileHover={{ y: -4, scale: 1.01 }}
                transition={{ duration: 0.15 }}
                className="text-center bg-card/50 backdrop-blur-xl border border-border rounded-2xl p-8 hover:border-primary/30 hover:bg-card/70 h-full"
              >
                <div className="w-16 h-16 bg-primary/10 border border-primary/30 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <AlertTriangle size={24} className="text-primary" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-6">Problems We Solve</h3>
                <ul className="space-y-3 text-left">
                  {service.problems.map((problem, index) => (
                    <li key={index} className="text-muted-foreground flex items-start gap-3">
                      <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0 mt-2"></div>
                      <span className="leading-relaxed">{problem}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </AnimatedSection>

            <AnimatedSection delay={0.1}>
              <motion.div
                whileHover={{ y: -4, scale: 1.01 }}
                transition={{ duration: 0.15 }}
                className="text-center bg-card/50 backdrop-blur-xl border border-border rounded-2xl p-8 hover:border-primary/30 hover:bg-card/70 h-full"
              >
                <div className="w-16 h-16 bg-primary/10 border border-primary/30 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Code2 size={24} className="text-primary" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-6">Our Methodology</h3>
                <ul className="space-y-3 text-left">
                  {service.methodology.map((step, index) => (
                    <li key={index} className="text-muted-foreground flex items-start gap-3">
                      <div className="w-6 h-6 bg-primary/10 text-primary rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">
                        {index + 1}
                      </div>
                      <span className="leading-relaxed">{step}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <motion.div
                whileHover={{ y: -4, scale: 1.01 }}
                transition={{ duration: 0.15 }}
                className="text-center bg-card/50 backdrop-blur-xl border border-border rounded-2xl p-8 hover:border-primary/30 hover:bg-card/70 h-full"
              >
                <div className="w-16 h-16 bg-primary/10 border border-primary/30 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <TrendingUp size={24} className="text-primary" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-6">Results Achieved</h3>
                <ul className="space-y-3 text-left">
                  {service.results.map((result, index) => (
                    <li key={index} className="text-muted-foreground flex items-start gap-3">
                      <CheckCircle size={16} className="text-primary flex-shrink-0 mt-0.5" />
                      <span className="leading-relaxed">{result}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Features & Technologies */}
      <section className="py-24 bg-card/20 border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            <AnimatedSection>
              <h2 className="text-4xl font-bold text-foreground mb-8 tracking-tight">
                What's
                <span className="block bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                  Included
                </span>
              </h2>
              <div className="space-y-4">
                {service.features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="flex items-start gap-4 p-4 bg-card/30 backdrop-blur-xl rounded-lg border border-border/50 hover:border-primary/30 transition-all duration-150"
                  >
                    <CheckCircle size={20} className="text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground leading-relaxed">{feature}</span>
                  </motion.div>
                ))}
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.1}>
              <h2 className="text-4xl font-bold text-foreground mb-8 tracking-tight">
                Technology
                <span className="block bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                  Stack
                </span>
              </h2>
              <div className="flex flex-wrap gap-3 mb-8">
                {service.technologies.map((tech) => (
                  <motion.span
                    key={tech}
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.15 }}
                    className="px-4 py-2 bg-card/50 backdrop-blur-xl text-foreground rounded-lg border border-border hover:border-primary/30 transition-all duration-150 font-medium"
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
              
              <div className="bg-card/50 backdrop-blur-xl border border-border rounded-xl p-6">
                <h3 className="font-semibold text-foreground mb-4">Why These Technologies?</h3>
                <p className="text-muted-foreground leading-relaxed">
                  We carefully select each technology in our stack based on proven performance, 
                  scalability, security, and long-term maintainability. Our choices ensure your 
                  solution is built on solid foundations that can grow with your business and 
                  adapt to future requirements.
                </p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Related Projects */}
      {relatedProjects.length > 0 && (
        <section className="py-24 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <AnimatedSection className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6 tracking-tight">
                Example
                <span className="block bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                  Projects
                </span>
              </h2>
              <p className="text-xl text-muted-foreground font-light">
                See how we've delivered this service for our clients
              </p>
            </AnimatedSection>

            <div className="grid md:grid-cols-2 gap-8">
              {relatedProjects.map((project, index) => (
                <AnimatedSection key={project.id} delay={index * 0.05}>
                  <Link to={`/portfolio/${project.slug}`}>
                    <motion.div
                      whileHover={{ y: -8, scale: 1.01 }}
                      transition={{ duration: 0.15 }}
                      className="bg-card/50 backdrop-blur-xl border border-border rounded-lg overflow-hidden hover:border-primary/30 hover:bg-card/70 hover:shadow-card-hover transition-all duration-150 group"
                    >
                      <div className="relative aspect-[16/9] overflow-hidden">
                        <motion.img
                          src={project.image}
                          alt={project.title}
                          whileHover={{ scale: 1.03 }}
                          transition={{ duration: 0.3 }}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-150"></div>
                      </div>

                      <div className="p-6">
                        <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors duration-150">
                          {project.title}
                        </h3>
                        <p className="text-muted-foreground leading-relaxed mb-4 line-clamp-2">
                          {project.description}
                        </p>
                        <div className="flex items-center text-primary font-medium">
                          <span>View Case Study</span>
                          <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform duration-150" />
                        </div>
                      </div>
                    </motion.div>
                  </Link>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Testimonials */}
      {service.testimonials && service.testimonials.length > 0 && (
        <section className="py-24 bg-card/20 border-y border-border">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <AnimatedSection className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6 tracking-tight">
                Client
                <span className="block bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                  Success Stories
                </span>
              </h2>
            </AnimatedSection>

            <div className="space-y-8">
              {service.testimonials.map((testimonial, index) => (
                <AnimatedSection key={index} delay={index * 0.1}>
                  <motion.div
                    whileHover={{ scale: 1.01, y: -2 }}
                    transition={{ duration: 0.15 }}
                    className="bg-card/50 backdrop-blur-xl border border-border rounded-xl p-8 hover:border-primary/30 hover:bg-card/70 transition-all duration-150"
                  >
                    <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-primary/30 border border-primary/30 rounded-full flex items-center justify-center mb-6">
                      <Quote size={20} className="text-primary" />
                    </div>
                    
                    <blockquote className="text-xl text-foreground font-light leading-relaxed mb-6 italic">
                      "{testimonial.quote}"
                    </blockquote>
                    
                    <div className="flex items-center gap-4">
                      <div>
                        <div className="font-semibold text-foreground text-lg">
                          {testimonial.author}
                        </div>
                        <div className="text-primary font-medium">
                          {testimonial.role}, {testimonial.company}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-8 tracking-tight">
              Ready to Get
              <span className="block bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                Started?
              </span>
            </h2>

            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-12 leading-relaxed font-light">
              Let's discuss your project requirements and create a solution that drives real business results.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact">
                <motion.button
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.15 }}
                  className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground px-8 py-4 rounded-lg font-medium flex items-center gap-3 text-lg hover:shadow-glow"
                >
                  Start Your Project
                  <ExternalLink size={20} />
                </motion.button>
              </Link>

              <Link to="/portfolio">
                <motion.button
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.15 }}
                  className="bg-card/50 backdrop-blur-xl text-foreground hover:text-primary px-8 py-4 rounded-lg font-medium border border-border hover:border-primary/30 flex items-center gap-3 text-lg"
                >
                  View Our Work
                  <ArrowRight size={20} />
                </motion.button>
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </PageTransition>
  );
};

export default ServiceDetailPage;