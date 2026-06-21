import React from "react";
import { useParams, Link } from "react-router-dom";
import SEO from "../components/common/SEO";
import PageTransition from "../components/common/PageTransition";
import AnimatedSection from "../components/common/AnimatedSection";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  CheckCircle,
  ChevronRight,
  Code2,
  AlertTriangle,
  TrendingUp,
  ExternalLink,
  ArrowRight,
} from "lucide-react";
import { getServiceBySlug } from "../data/services";
import { getProjectBySlug } from "../data/projects";
import TestimonialCarousel from "../components/common/TestimonialCarousel";

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

  const pageUrl = `https://zumetrix.com/services/${service.slug}`;
  const shareImage = service.image.startsWith("http")
    ? service.image
    : `https://zumetrix.com${service.image}`;

  // Get related projects
  const relatedProjects = service.relatedProjects?.map(projectSlug => 
    getProjectBySlug(projectSlug)
  ).filter(Boolean) || [];
  const testimonials = relatedProjects.flatMap((project) =>
    project?.testimonial
      ? [{
          quote: project.testimonial.quote,
          author: project.testimonial.author,
          role: project.testimonial.role,
        }]
      : []
  );

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `${pageUrl}#service`,
        name: service.title,
        description: service.description,
        url: pageUrl,
        provider: {
          "@id": "https://zumetrix.com/#organization",
        },
        serviceType: service.technologies,
        areaServed: "Worldwide",
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: "https://zumetrix.com/",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Software Development Services",
            item: "https://zumetrix.com/services",
          },
          {
            "@type": "ListItem",
            position: 3,
            name: service.title,
            item: pageUrl,
          },
        ],
      },
    ],
  };

  return (
    <PageTransition>
      <SEO
        title={service.seo.title}
        description={service.seo.description}
        keywords={service.seo.keywords}
        image={shareImage}
        url={pageUrl}
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
              <a
                href="/services"
                onClick={(event) => {
                  event.preventDefault();
                  window.location.assign("/services");
                }}
                className="cursor-pointer bg-transparent p-0 text-left text-muted-foreground transition-colors duration-150 hover:text-primary"
                aria-label="Go to services page"
              >
                Services
              </a>
              <ChevronRight size={16} />
              <span className="text-foreground font-medium line-clamp-1">
                {service.title}
              </span>
            </nav>

            <a
              href="/services"
              onClick={(event) => {
                event.preventDefault();
                window.location.assign("/services");
              }}
              className="block"
              aria-label="Back to services page"
            >
              <motion.div
                whileHover={{ x: -2 }}
                transition={{ duration: 0.15 }}
                className="inline-flex items-center text-muted-foreground hover:text-primary transition-colors duration-150 mb-8 group"
              >
                <ArrowLeft size={16} className="mr-2 group-hover:-translate-x-0.5 transition-transform duration-150" />
                Back to Services
              </motion.div>
            </a>
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
              <motion.div
                className="relative overflow-hidden rounded-2xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                style={{
                  boxShadow: "0 8px 40px rgba(0,0,0,0.5), 0 0 0 1.5px rgba(196,138,100,0.3)",
                }}
              >
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full aspect-[16/9] object-cover block"
                  loading="lazy"
                />
                <div
                  className="absolute inset-0 rounded-2xl pointer-events-none"
                  style={{ boxShadow: "inset 0 0 0 1.5px rgba(196,138,100,0.18)" }}
                />
              </motion.div>
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
                  <Link to={`/portfolio/${project.slug}`} className="block h-full">
                    <motion.div
                      whileHover={{ y: -6 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                      className="group h-full overflow-hidden rounded-2xl border border-border bg-card/55 backdrop-blur-xl transition-all duration-200 hover:border-primary/35 hover:bg-card/75 hover:shadow-card-hover"
                    >
                      <div className="relative aspect-[16/11] overflow-hidden bg-background/60">
                        <motion.img
                          src={project.image}
                          alt={project.title}
                          whileHover={{ scale: 1.04 }}
                          transition={{ duration: 0.35, ease: "easeOut" }}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background/85 via-background/10 to-transparent"></div>
                        <div className="absolute right-0 top-6 max-w-[64%] translate-x-px rounded-l-full border-y border-l border-primary/25 bg-background/80 px-4 py-2 text-xs font-semibold text-primary shadow-lg shadow-black/25 backdrop-blur-md">
                          {project.category}
                        </div>
                      </div>

                      <div className="flex min-h-[250px] flex-col p-6 md:p-7">
                        <div className="mb-3 flex flex-wrap gap-2">
                          {project.stack.slice(0, 4).map((tech) => (
                            <span
                              key={tech}
                              className="rounded-full border border-border/70 bg-background/35 px-2.5 py-1 text-[11px] font-medium text-muted-foreground"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>

                        <h3 className="mb-3 text-xl font-bold leading-tight text-foreground transition-colors duration-150 group-hover:text-primary">
                          {project.title}
                        </h3>
                        <p className="mb-6 line-clamp-3 flex-grow text-muted-foreground leading-relaxed">
                          {project.description}
                        </p>

                        <div className="mt-auto flex items-center justify-between border-t border-border/60 pt-5">
                          <div>
                            <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Project</div>
                            <div className="text-sm font-semibold text-foreground">{project.client.industry}</div>
                          </div>
                          <div className="flex items-center text-sm font-semibold text-primary">
                            <span>View</span>
                            <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform duration-150" />
                          </div>
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

      <TestimonialCarousel eyebrow={service.title} testimonials={testimonials} />

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
