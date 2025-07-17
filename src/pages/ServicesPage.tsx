import React from "react";
import SEO from "../components/common/SEO";
import PageTransition from "../components/common/PageTransition";
import AnimatedSection from "../components/common/AnimatedSection";
import { motion } from "framer-motion";
import {
  Monitor,
  Smartphone,
  Database,
  Cog,
  Rocket,
  Palette,
  ArrowRight,
  Check,
} from "lucide-react";
import { Link } from "react-router-dom";

const ServicesPage: React.FC = () => {
  const services = [
    {
      id: "web-apps",
      icon: Monitor,
      title: "Web Applications",
      subtitle: "Modern, scalable web solutions",
      description:
        "We build sophisticated web platforms using cutting-edge frameworks and technologies. Our applications are designed for performance, scalability, and exceptional user experiences.",
      features: [
        "React & TypeScript Development",
        "Progressive Web Apps (PWA)",
        "Cloud Architecture & Deployment",
        "Performance Optimization",
        "SEO & Accessibility",
        "Real-time Features",
        "API Integration",
        "Responsive Design",
      ],
      technologies: [
        "React",
        "Next.js",
        "TypeScript",
        "Node.js",
        "PostgreSQL",
        "AWS",
      ],
      price: "Starting at $5,000",
      popular: false,
      image:
        "https://images.pexels.com/photos/7688336/pexels-photo-7688336.jpeg?auto=compress&cs=tinysrgb&w=800",
    },
    {
      id: "saas-dashboards",
      icon: Database,
      title: "SaaS Dashboards",
      subtitle: "Data visualization that tells stories",
      description:
        "Transform complex data into intuitive, actionable insights with custom dashboards that empower decision-making and drive business growth.",
      features: [
        "Real-time Analytics",
        "Custom Data Visualization",
        "Interactive Dashboards",
        "Multi-tenant Architecture",
        "Role-based Access Control",
        "API Integration",
        "Export & Reporting",
        "Mobile Responsive",
      ],
      technologies: [
        "React",
        "D3.js",
        "Chart.js",
        "Node.js",
        "PostgreSQL",
        "Redis",
      ],
      price: "Starting at $8,000",
      popular: true,
      image:
        "https://images.pexels.com/photos/7688880/pexels-photo-7688880.jpeg?auto=compress&cs=tinysrgb&w=800",
    },
    {
      id: "mobile-apps",
      icon: Smartphone,
      title: "Mobile Applications",
      subtitle: "Native iOS & Android experiences",
      description:
        "Create powerful mobile applications that deliver seamless experiences across all devices. From concept to app store deployment, we handle the entire mobile development lifecycle.",
      features: [
        "Native iOS & Android Development",
        "Cross-Platform Solutions",
        "App Store Optimization",
        "Push Notifications",
        "Offline Functionality",
        "Device Integration",
        "Performance Monitoring",
        "User Analytics",
      ],
      technologies: [
        "React Native",
        "Swift",
        "Kotlin",
        "Firebase",
        "Redux",
        "GraphQL",
      ],
      price: "Starting at $12,000",
      popular: false,
      image:
        "https://images.pexels.com/photos/4386370/pexels-photo-4386370.jpeg?auto=compress&cs=tinysrgb&w=800",
    },
    {
      id: "mvp-development",
      icon: Rocket,
      title: "MVP Development",
      subtitle: "Launch your startup idea fast",
      description:
        "Turn your startup idea into reality with a minimum viable product that validates your concept and attracts investors. Get to market quickly with a solid foundation for growth.",
      features: [
        "Rapid Prototyping",
        "Market Validation",
        "Iterative Development",
        "User Feedback Integration",
        "Scalable Architecture",
        "Analytics Implementation",
        "A/B Testing Setup",
        "Growth Planning",
      ],
      technologies: [
        "React",
        "Node.js",
        "Firebase",
        "Vercel",
        "Stripe",
        "Analytics",
      ],
      price: "Starting at $4,000",
      popular: false,
      image:
        "https://images.pexels.com/photos/7688336/pexels-photo-7688336.jpeg?auto=compress&cs=tinysrgb&w=800",
    },
    {
      id: "automation",
      icon: Cog,
      title: "Automation Solutions",
      subtitle: "Streamline operations intelligently",
      description:
        "Eliminate repetitive tasks and optimize workflows with intelligent automation solutions. Save time, reduce errors, and focus on what matters most to your business.",
      features: [
        "Workflow Automation",
        "System Integration",
        "Data Processing",
        "Report Generation",
        "Email Automation",
        "Task Scheduling",
        "Error Handling",
        "Monitoring & Alerts",
      ],
      technologies: [
        "Python",
        "Zapier",
        "AWS Lambda",
        "Celery",
        "RabbitMQ",
        "Cron",
      ],
      price: "Starting at $2,500",
      popular: false,
      image:
        "https://images.pexels.com/photos/7688880/pexels-photo-7688880.jpeg?auto=compress&cs=tinysrgb&w=800",
    },
    {
      id: "design",
      icon: Palette,
      title: "Digital Strategy",
      subtitle: "Technology roadmaps that drive growth",
      description:
        "Strategic planning and digital transformation consulting that helps businesses leverage technology for competitive advantage and sustainable growth.",
      features: [
        "Technology Consulting",
        "Architecture Planning",
        "Digital Transformation",
        "Growth Strategy",
        "Performance Audits",
        "Security Assessment",
        "Scalability Planning",
        "Team Training",
      ],
      technologies: [
        "Consulting",
        "Strategy",
        "Planning",
        "Analysis",
        "Roadmapping",
        "Training",
      ],
      price: "Starting at $1,500",
      popular: false,
      image:
        "https://images.pexels.com/photos/4386370/pexels-photo-4386370.jpeg?auto=compress&cs=tinysrgb&w=800",
    },
  ];

  const process = [
    {
      step: "01",
      title: "Discovery",
      description:
        "We start by understanding your business, goals, and challenges through detailed consultation.",
    },
    {
      step: "02",
      title: "Strategy",
      description:
        "We develop a comprehensive strategy and technical roadmap tailored to your specific needs.",
    },
    {
      step: "03",
      title: "Design",
      description:
        "Our team creates intuitive designs and prototypes that align with your brand and user expectations.",
    },
    {
      step: "04",
      title: "Development",
      description:
        "We build your solution using best practices, clean code, and rigorous testing procedures.",
    },
    {
      step: "05",
      title: "Launch",
      description:
        "We deploy your solution and provide ongoing support to ensure optimal performance.",
    },
  ];

  return (
    <PageTransition>
      <SEO
        gaTagId="G-PRSP59FL20"
        googleVerification="XbgNbYnq2H0qTIfTCwVFlXrYWHnnvw0acGCUjdlI_Cs"
        title="Services - Web Apps, Mobile Apps, MVP Development | Zumetrix Labs"
        description="Comprehensive software development services including web applications, mobile apps, MVP development, automation, and UI/UX design. Expert developers in Pakistan."
        keywords="web development services, mobile app development, MVP development, software automation, UI UX design, React development, Node.js development"
        url="https://zumetrixlabs.com/services"
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
              Premium Software Development Services
            </motion.div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-8 tracking-tight leading-tight">
              From web applications to mobile apps, we deliver
              <span className="block bg-shimmer bg-clip-text text-transparent">
                world-class solutions
              </span>
              that transform businesses and drive exceptional results.
            </h1>
          </AnimatedSection>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            {services.map((service, index) => (
              <AnimatedSection
                key={service.id}
                delay={index * 0.05}
                className="group"
              >
                <motion.div
                  whileHover={{ y: -12, scale: 1.02 }}
                  transition={{ duration: 0.15 }}
                  className="relative h-full"
                >
                  {service.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                      <span className="bg-beige-gradient text-primary-foreground px-4 py-1 rounded-full text-sm font-medium">
                        Most Popular
                      </span>
                    </div>
                  )}

                  <div
                    className={`bg-card/50 backdrop-blur-xl p-8 rounded-2xl  border h-full flex flex-col
                    ${
                      service.popular
                        ? "border-primary/50 shadow-glow"
                        : "border-border hover:border-primary/30"
                    } group-hover:bg-card/70 group-hover:shadow-card-hover`}
                  >
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ duration: 0.15 }}
                      className={`inline-flex items-center justify-center w-16 h-16 rounded-xl mb-6 
                        ${
                          service.popular
                            ? "bg-beige-gradient shadow-glow"
                            : "bg-primary/10 group-hover:bg-beige-gradient"
                        } `}
                    >
                      <service.icon
                        size={28}
                        className={
                          service.popular
                            ? "text-primary-foreground"
                            : "text-primary group-hover:text-primary-foreground"
                        }
                      />
                    </motion.div>

                    <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors duration-150">
                      {service.title}
                    </h3>

                    <p className="text-primary/80 text-sm font-medium mb-4">
                      {service.subtitle}
                    </p>

                    <p className="text-muted-foreground mb-6 leading-relaxed flex-grow">
                      {service.description}
                    </p>

                    <div className="mb-6">
                      <div className="text-2xl font-bold text-primary mb-4">
                        {service.price}
                      </div>
                      <ul className="space-y-2 mb-6">
                        {service.features.slice(0, 4).map((feature) => (
                          <li
                            key={feature}
                            className="text-sm text-muted-foreground flex items-center"
                          >
                            <Check
                              size={14}
                              className="text-primary mr-2 flex-shrink-0"
                            />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {service.technologies.slice(0, 3).map((tech) => (
                        <span
                          key={tech}
                          className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      className={`w-full py-3 px-6 rounded-lg font-medium  ${
                        service.popular
                          ? "bg-beige-gradient text-primary-foreground hover:shadow-glow"
                          : "bg-card border border-border text-foreground hover:bg-primary/10 hover:border-primary/30"
                      }`}
                    >
                      Learn More
                    </motion.button>
                  </div>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>

          {/* CTA Section */}
          <AnimatedSection className="text-center">
            <h3 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Ready to build something
              <span className="bg-shimmer bg-clip-text text-transparent">
                {" "}
                exceptional
              </span>
              ?
            </h3>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Let's discuss your project and create a solution that drives real
              business results.
            </p>
            <Link to="/contact">
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.15 }}
                className="bg-beige-gradient text-primary-foreground px-8 py-4 rounded-lg font-medium 
                         hover:shadow-glow  
                         flex items-center gap-3 text-lg mx-auto"
              >
                Start Your Project
                <ArrowRight size={20} />
              </motion.button>
            </Link>
          </AnimatedSection>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center">
            <h2 className="text-5xl md:text-8xl font-bold text-foreground mb-6 tracking-tight">
              Our
              <span className="block bg-shimmer bg-clip-text text-transparent pb-4 pb-4 leading-[1.1]">
                Process
              </span>
            </h2>
          </AnimatedSection>

          <div className="relative">
            <h2 className="text-center text-xl md:text-2xl text-muted-foreground font-medium mb-12">
              A proven methodology that delivers from concept → launch.
              <br />
              We follow a structured process to ensure your project is a
              success.
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-8 max-w-6xl mx-auto px-4">
              {process.map((step, index) => (
                <AnimatedSection
                  key={step.step}
                  delay={index * 0.08}
                  className="relative group flex flex-col items-center text-center"
                >
                  {/* Circle with glow */}
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 1 }}
                    transition={{ duration: 0.3 }}
                    className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-primary to-orange-400 text-white text-lg md:text-xl font-bold rounded-full flex items-center justify-center shadow-lg z-10"
                  >
                    {step.step}
                  </motion.div>

                  {/* Vertical line */}
                  {index !== process.length && (
                    <div className="hidden md:block h-16 w-px bg-primary/20" />
                  )}

                  {/* Title + Description */}
                  <div className="mt-6">
                    <h3 className="text-base md:text-lg font-semibold text-foreground group-hover:text-primary transition">
                      {step.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-2 leading-relaxed max-w-[220px] mx-auto">
                      {step.description}
                    </p>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </div>
      </section>
    </PageTransition>
  );
};

export default ServicesPage;
