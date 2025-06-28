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
      color: "warm",
      image:
        "https://images.pexels.com/photos/7688336/pexels-photo-7688336.jpeg?auto=compress&cs=tinysrgb&w=800",
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
      color: "accent",
      image:
        "https://images.pexels.com/photos/4386370/pexels-photo-4386370.jpeg?auto=compress&cs=tinysrgb&w=800",
    },
    {
      id: "data-solutions",
      icon: Database,
      title: "Data Solutions",
      subtitle: "Robust backend systems & APIs",
      description:
        "Build the foundation of your digital ecosystem with secure, scalable backend systems. We create APIs and data architectures that power your applications reliably.",
      features: [
        "RESTful API Development",
        "GraphQL Implementation",
        "Database Design & Optimization",
        "Cloud Infrastructure",
        "Data Migration",
        "Security Implementation",
        "Performance Monitoring",
        "Documentation",
      ],
      technologies: [
        "Node.js",
        "Python",
        "PostgreSQL",
        "MongoDB",
        "Redis",
        "Docker",
      ],
      color: "success",
      image:
        "https://images.pexels.com/photos/7688880/pexels-photo-7688880.jpeg?auto=compress&cs=tinysrgb&w=800",
    },
    {
      id: "automation",
      icon: Cog,
      title: "Process Automation",
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
      color: "warm",
      image:
        "https://images.pexels.com/photos/7688880/pexels-photo-7688880.jpeg?auto=compress&cs=tinysrgb&w=800",
    },
    {
      id: "mvp",
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
      color: "accent",
      image:
        "https://images.pexels.com/photos/7688336/pexels-photo-7688336.jpeg?auto=compress&cs=tinysrgb&w=800",
    },
    {
      id: "design",
      icon: Palette,
      title: "UI/UX Design",
      subtitle: "Beautiful, intuitive interfaces",
      description:
        "Create memorable user experiences with beautiful, intuitive interfaces. Our design process focuses on user research, usability, and creating interfaces that users love.",
      features: [
        "User Research & Analysis",
        "Wireframing & Prototyping",
        "Visual Design",
        "Design Systems",
        "Usability Testing",
        "Responsive Design",
        "Accessibility",
        "Brand Integration",
      ],
      technologies: [
        "Figma",
        "Adobe XD",
        "Sketch",
        "InVision",
        "Principle",
        "Framer",
      ],
      color: "success",
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
      <section className="pt-32 pb-20 bg-gradient-to-br from-primary-50 via-neutral-50 to-accent-50/30 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <AnimatedSection className="text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center px-4 py-2 bg-glass-warm backdrop-blur-xl border border-primary-200/30 rounded-full text-sm font-medium text-primary-700 mb-8"
            >
              What We Do
            </motion.div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-neutral-800 mb-8 tracking-tight leading-tight">
              Comprehensive
              <span className="block bg-warm-gradient bg-clip-text text-transparent">Software Solutions</span>
            </h1>

            <p className="text-xl lg:text-2xl text-neutral-600 max-w-4xl mx-auto leading-relaxed font-light">
              From web applications to mobile apps, we provide end-to-end
              software development services that drive business growth and user
              satisfaction.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 bg-gradient-to-br from-neutral-50 via-primary-50/30 to-accent-50/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-24">
            {services.map((service, index) => (
              <AnimatedSection
                key={service.id}
                delay={index * 0.1}
                className="group"
              >
                <div
                  className={`grid lg:grid-cols-2 gap-12 lg:gap-16 items-center ${
                    index % 2 === 1 ? "lg:grid-flow-col-dense" : ""
                  }`}
                >
                  {/* Content */}
                  <div className={index % 2 === 1 ? "lg:col-start-2" : ""}>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.3 }}
                      className={`inline-flex items-center justify-center w-16 h-16 rounded-xl mb-6 
                        bg-${service.color}-gradient group-hover:shadow-warm transition-all duration-300`}
                    >
                      <service.icon
                        size={28}
                        className="text-white"
                      />
                    </motion.div>

                    <h2 className="text-3xl md:text-4xl font-bold text-neutral-800 mb-4 group-hover:text-primary-600 transition-colors duration-300">
                      {service.title}
                    </h2>

                    <p
                      className={`text-lg font-medium mb-6 ${
                        service.color === "warm"
                          ? "text-primary-600"
                          : service.color === "accent"
                          ? "text-accent-600"
                          : "text-success-600"
                      }`}
                    >
                      {service.subtitle}
                    </p>

                    <p className="text-neutral-600 leading-relaxed mb-8 text-lg">
                      {service.description}
                    </p>

                    {/* Features */}
                    <div className="grid md:grid-cols-2 gap-3 mb-8">
                      {service.features.map((feature) => (
                        <div key={feature} className="flex items-center gap-3">
                          <Check
                            size={16}
                            className={
                              service.color === "warm"
                                ? "text-primary-600"
                                : service.color === "accent"
                                ? "text-accent-600"
                                : "text-success-600"
                            }
                          />
                          <span className="text-neutral-600 text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-2 mb-8">
                      {service.technologies.map((tech) => (
                        <span
                          key={tech}
                          className={`px-3 py-1 text-xs rounded-full ${
                            service.color === "warm"
                              ? "bg-primary-100/50 text-primary-700"
                              : service.color === "accent"
                              ? "bg-accent-100/50 text-accent-700"
                              : "bg-success-100/50 text-success-700"
                          }`}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <Link to="/contact">
                      <motion.button
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        className={`group font-medium px-6 py-3 rounded-lg transition-all duration-300 text-lg flex items-center gap-2 ${
                          service.color === "warm"
                            ? "bg-warm-gradient text-white hover:shadow-warm"
                            : service.color === "accent"
                            ? "bg-accent-gradient text-white hover:shadow-soft"
                            : "bg-success-gradient text-white hover:shadow-soft"
                        }`}
                      >
                        Get Started
                        <ArrowRight
                          size={18}
                          className="group-hover:translate-x-1 transition-transform duration-300"
                        />
                      </motion.button>
                    </Link>
                  </div>

                  {/* Image */}
                  <div className={index % 2 === 1 ? "lg:col-start-1" : ""}>
                    <motion.div
                      whileHover={{ scale: 1.05, y: -8 }}
                      transition={{ duration: 0.4 }}
                      className="relative overflow-hidden rounded-lg aspect-[4/3] group-hover:shadow-warm transition-shadow duration-300"
                    >
                      <img
                        src={service.image}
                        alt={service.title}
                        className="w-full h-full object-cover"
                      />
                      <div
                        className={`absolute inset-0 bg-gradient-to-br opacity-20 ${
                          service.color === "warm"
                            ? "from-primary-300/20 to-transparent"
                            : service.color === "accent"
                            ? "from-accent-300/20 to-transparent"
                            : "from-success-300/20 to-transparent"
                        }`}
                      ></div>
                    </motion.div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-24 bg-gradient-to-br from-neutral-800 via-neutral-900 to-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-bold text-neutral-100 mb-6 tracking-tight">
              Our
              <span className="block bg-warm-gradient bg-clip-text text-transparent">Process</span>
            </h2>
            <p className="text-xl text-neutral-400 max-w-3xl mx-auto leading-relaxed font-light">
              A proven methodology that ensures successful project delivery from
              concept to launch.
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-5 gap-8">
            {process.map((step, index) => (
              <AnimatedSection
                key={step.step}
                delay={index * 0.1}
                className="text-center group"
              >
                <motion.div
                  whileHover={{ scale: 1.1, y: -5 }}
                  transition={{ duration: 0.3 }}
                  className="w-16 h-16 bg-warm-gradient rounded-full flex items-center justify-center mx-auto mb-6 group-hover:shadow-warm transition-all duration-300"
                >
                  <span className="text-white font-bold text-lg">
                    {step.step}
                  </span>
                </motion.div>

                <h3 className="text-xl font-semibold text-neutral-100 mb-4 group-hover:text-primary-400 transition-colors duration-300">
                  {step.title}
                </h3>

                <p className="text-neutral-400 text-sm leading-relaxed">
                  {step.description}
                </p>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-primary-50 via-neutral-50 to-accent-50/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center">
            <h2 className="text-3xl md:text-5xl font-bold text-neutral-800 mb-8 tracking-tight">
              Ready to Start
              <span className="block bg-warm-gradient bg-clip-text text-transparent">Your Project?</span>
            </h2>

            <p className="text-xl text-neutral-600 max-w-3xl mx-auto mb-12 leading-relaxed font-light">
              Let's discuss your project requirements and create a solution that
              drives real business results.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link to="/contact">
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="group bg-warm-gradient text-white px-8 py-4 rounded-lg font-medium 
                           hover:shadow-warm transition-all duration-300 
                           flex items-center gap-3 text-lg"
                >
                  Get Free Consultation
                  <ArrowRight
                    size={20}
                    className="group-hover:translate-x-1 transition-transform duration-300"
                  />
                </motion.button>
              </Link>

              <Link to="/portfolio">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="text-neutral-600 hover:text-primary-600 font-medium px-8 py-4 
                           transition-colors duration-300 text-lg"
                >
                  View Our Work
                </motion.button>
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </PageTransition>
  );
};

export default ServicesPage;