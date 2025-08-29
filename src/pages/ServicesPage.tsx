import React from "react";
import SEO from "../components/common/SEO";
import PageTransition from "../components/common/PageTransition";
import AnimatedSection from "../components/common/AnimatedSection";
import { motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import { Link } from "react-router-dom";
import { services, process } from "../data/service.js";
import { servicesFAQs } from "../data/faqs/services";
import { useState } from "react";
import { Plus } from "lucide-react";
import { AnimatePresence } from "framer-motion";

const ServicesPage: React.FC = () => {
  const [openFAQ, setOpenFAQ] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://zumetrix.com/#organization",
        name: "Zumetrix Labs",
        url: "https://zumetrix.com",
        description:
          "Pakistan's #1 software development agency specializing in SaaS MVP development, React/Node.js applications, AI automation services, mobile app development, and custom software solutions.",
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Software Development Services",
          itemListElement: services.map((service) => ({
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: service.title,
              description: service.description,
              provider: {
                "@id": "https://zumetrix.com/#organization",
              },
            },
          })),
        },
      },
      ...services.map((service) => ({
        "@type": "Service",
        name: service.title,
        description: service.description,
        provider: {
          "@id": "https://zumetrix.com/#organization",
        },
        areaServed: ["Pakistan", "Worldwide"],
        serviceType: service.technologies,
      })),
    ],
  };

  return (
    <PageTransition>
      <SEO
        gaTagId="G-PRSP59FL20"
        googleVerification="XbgNbYnq2H0qTIfTCwVFlXrYWHnnvw0acGCUjdlI_Cs"
        title="Software Development Services Pakistan | SaaS MVP, React, AI Automation | Zumetrix Labs"
        description="Expert software development services in Pakistan by Zumetrix Labs. SaaS MVP development, React/Node.js applications, mobile apps, AI automation, Firebase integration, custom dashboards. Founded by Zia Hussain & Syed Omer Shah. Serving Karachi, Lahore, Islamabad & worldwide."
        keywords="software development services Pakistan, SaaS MVP development, React development agency Pakistan, Node.js developers Pakistan, mobile app development Pakistan, AI automation services, Firebase experts Pakistan, custom software solutions, web application development, dashboard development, no-code automation, Zia Hussain, Syed Omer Shah, Zumetrix Labs services, hire React developers Pakistan, enterprise software development, startup MVP builder, business automation Pakistan"
        url="https://zumetrix.com/services"
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
              🚀 Premium Software Development Services in Pakistan
            </motion.div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-8 tracking-tight leading-tight">
              Expert Software Development Services in
              <span className="block bg-shimmer bg-clip-text text-transparent">
                Pakistan & Worldwide
              </span>
              world-class solutions that transform businesses and drive
              exceptional results.
            </h1>

            <div className="max-w-5xl mx-auto mb-12">
              <p className="text-xl lg:text-2xl text-muted-foreground leading-relaxed font-light mb-6">
                <strong>Zumetrix Labs</strong> delivers world-class{" "}
                <strong>software development services</strong> across Pakistan
                and globally. Founded by expert developers{" "}
                <strong>Zia Hussain</strong> and <strong>Syed Omer Shah</strong>
                , we specialize in
                <strong> SaaS MVP development</strong>,{" "}
                <strong>React/Node.js applications</strong>,{" "}
                <strong>mobile app development</strong>,
                <strong> AI automation services</strong>, and{" "}
                <strong>custom software solutions</strong>.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Our <strong>software development agency</strong> serves clients
                in <strong>Karachi, Lahore, Islamabad</strong>, and
                internationally. We build scalable web applications, custom
                dashboards, Firebase integrations, no-code automations, and
                enterprise software using modern tech stacks including React.js,
                Next.js, TypeScript, Node.js, and AI technologies.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12 mb-20">
            {services.map((service, index) => (
              <AnimatedSection
                key={service.id}
                delay={index * 0.05}
                className={`group ${service.popular ? "!-translate-y-4" : ""}`}
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
            <h2 className="text-5xl md:text-7xl font-bold text-foreground mb-6 tracking-tight">
              Our
              <span className="block bg-shimmer bg-clip-text text-transparent pb-4 leading-[1.1]">
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

      {/* FAQ Section */}
      <section className="py-24 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold text-foreground mb-6 tracking-tight">
              Frequently Asked
              <span className="block bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                Questions
              </span>
            </h2>
            <p className="text-xl text-muted-foreground leading-relaxed font-light">
              Common questions about our software development services
            </p>
          </AnimatedSection>

          <div className="space-y-4">
            {servicesFAQs.map((faq, index) => (
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
    </PageTransition>
  );
};

export default ServicesPage;
