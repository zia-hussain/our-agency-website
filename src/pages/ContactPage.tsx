import React, { useState } from "react";
import SEO from "../components/common/SEO";
import PageTransition from "../components/common/PageTransition";
import AnimatedSection from "../components/common/AnimatedSection";
import { motion } from "framer-motion";
import { SITE_CONFIG } from "../config/site";
import { contactFAQs } from "../data/faqs/contact";
import { useState as useContactState } from "react";
import { Plus } from "lucide-react";
import { AnimatePresence } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Calendar,
  MessageCircle,
  Clock,
  CheckCircle,
} from "lucide-react";

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    projectType: "",
    budget: "",
    timeline: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [openFAQ, setOpenFAQ] = useContactState<number | null>(0);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formEndpoint = import.meta.env.VITE_CONTACT_FORM_ENDPOINT;
      const webhookEndpoint = import.meta.env.VITE_GOOGLE_SHEETS_WEBHOOK;
      
      if (!formEndpoint) {
        throw new Error("Contact form endpoint not configured");
      }

      // Submit to Formspree
      const formspreeData = new FormData();
      formspreeData.append("name", formData.name);
      formspreeData.append("email", formData.email);
      formspreeData.append("company", formData.company);
      formspreeData.append("projectType", formData.projectType);
      formspreeData.append("budget", formData.budget);
      formspreeData.append("timeline", formData.timeline);
      formspreeData.append("message", formData.message);
      formspreeData.append("_subject", `New Project Inquiry from ${formData.name}`);

      const formspreeResponse = await fetch(formEndpoint, {
        method: "POST",
        body: formspreeData,
        headers: {
          Accept: "application/json"
        }
      });

      if (!formspreeResponse.ok) {
        throw new Error(`Form submission failed: ${formspreeResponse.statusText}`);
      }

      // Send to Google Sheets webhook (Zapier)
      if (webhookEndpoint) {
        try {
          await fetch(webhookEndpoint, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name: formData.name,
              email: formData.email,
              company: formData.company,
              projectType: formData.projectType,
              budget: formData.budget,
              timeline: formData.timeline,
              message: formData.message,
              timestamp: new Date().toISOString(),
              source: "Zumetrix Contact Form"
            }),
          });
        } catch (webhookError) {
          console.warn("Webhook submission failed:", webhookError);
        }
      }

      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({
          name: "",
          email: "",
          company: "",
          projectType: "",
          budget: "",
          timeline: "",
          message: "",
        });
      }, 3000);
    } catch (err) {
      console.error("Form submission error:", err);
      alert("There was an error submitting the form. Please try again or contact us directly at " + SITE_CONFIG.company.email);
    } finally {
      setIsSubmitting(false);
    }
  };

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   setIsSubmitting(true);

  //   try {
  //     // Submit to Formspree (replace with your actual endpoint)
  //     const formDataToSend = new FormData();
  //     formDataToSend.append("name", formData.name);
  //     formDataToSend.append("email", formData.email);
  //     formDataToSend.append("company", formData.company);
  //     formDataToSend.append("projectType", formData.projectType);
  //     formDataToSend.append("budget", formData.budget);
  //     formDataToSend.append("timeline", formData.timeline);
  //     formDataToSend.append("message", formData.message);
  //     formDataToSend.append(
  //       "_subject",
  //       `New Project Inquiry from ${formData.name}`
  //     );

  //     const formspreeResponse = await fetch(
  //       import.meta.env.VITE_CONTACT_FORM_ENDPOINT,
  //       {
  //         method: "POST",
  //         body: formDataToSend,
  //         headers: { Accept: "application/json" }, // only Accept, not Content-Type
  //       }
  //     );

  //     // Submit to Google Sheets via Zapier webhook (replace with your actual webhook)
  //     const zapierResponse = await fetch(
  //       import.meta.env.VITE_GOOGLE_SHEETS_WEBHOOK,
  //       {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({
  //           name: formData.name,
  //           email: formData.email,
  //           company: formData.company,
  //           projectType: formData.projectType,
  //           budget: formData.budget,
  //           timeline: formData.timeline,
  //           message: formData.message,
  //           timestamp: new Date().toISOString(),
  //         }),
  //       }
  //     );

  //     if (formspreeResponse.ok) {
  //       setIsSubmitted(true);
  //       // Reset form after 3 seconds
  //       setTimeout(() => {
  //         setIsSubmitted(false);
  //         setFormData({
  //           name: "",
  //           email: "",
  //           company: "",
  //           projectType: "",
  //           budget: "",
  //           timeline: "",
  //           message: "",
  //         });
  //       }, 3000);
  //     }
  //   } catch (error) {
  //     console.error("Form submission error:", error);
  //     alert("There was an error submitting the form. Please try again.");
  //   }

  //   setIsSubmitting(false);
  // };

  const handleScheduleCall = () => {
    window.open(
      SITE_CONFIG.contact.calendlyUrl ||
        "https://calendly.com/zumetrix-labs/consultation",
      "_blank"
    );
  };

  const handleQuickEstimate = () => {
    window.open(
      SITE_CONFIG.contact.calendlyUrl ||
        "https://calendly.com/zumetrix-labs/project-estimate",
      "_blank"
    );
  };

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "Email Us",
      details: SITE_CONFIG.company.email,
      description: "Send us an email and we'll respond within 24 hours",
      action: `mailto:${SITE_CONFIG.company.email}`,
    },
    {
      icon: Phone,
      title: "Call Us",
      details: SITE_CONFIG.company.phone,
      description: "Speak directly with our team during business hours",
      action: `tel:${SITE_CONFIG.company.phone.replace(/\s/g, "")}`,
    },
    {
      icon: MapPin,
      title: "Location",
      details: SITE_CONFIG.company.address,
      description: "We work with clients globally from our base in Pakistan",
      action: "#",
    },
  ];

  const services = [
    "Web Application Development",
    "SaaS Dashboard Development",
    "Mobile App Development",
    "MVP Development",
    "Automation Solutions",
    "Digital Strategy Consulting",
  ];

  const budgetRanges = [
    "Under $5,000",
    "$5,000 - $15,000",
    "$15,000 - $30,000",
    "$30,000 - $50,000",
    "Over $50,000",
  ];

  const timelines = [
    "ASAP (Rush project)",
    "1-2 months",
    "3-4 months",
    "5-6 months",
    "6+ months",
  ];

  return (
    <PageTransition>
      <SEO
        gaTagId="G-PRSP59FL20"
        googleVerification="XbgNbYnq2H0qTIfTCwVFlXrYWHnnvw0acGCUjdlI_Cs"
        title="Contact Us - Start Your Project | Zumetrix Labs"
        description="Ready to start your software project? Contact Zumetrix Labs for a free consultation. We respond within 24 hours and offer honest advice with no obligation."
        keywords="contact Zumetrix Labs, software development consultation, web development quote, mobile app development contact, Syed Zia Hussain Shah contact, Syed Omer Shah contact"
        url="https://zumetrix.com/contact"
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
              <span className="w-2 h-2 bg-primary rounded-full mr-2 animate-pulse-soft"></span>
              Let's Talk
            </motion.div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-foreground mb-8 tracking-tight">
              Start Your
              <span className="block bg-shimmer bg-clip-text text-transparent pb-4 leading-[1.1]">
                Project Today
              </span>
            </h1>

            <p className="text-xl lg:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed font-light">
              Ready to transform your vision into reality? Let's discuss your
              project requirements and create a solution that exceeds your
              expectations.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Contact Form & Info Section */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <AnimatedSection>
              <div className="bg-card/50 backdrop-blur-xl border border-border rounded-lg p-8 hover:border-primary/30 ">
                <h2 className="text-5xl font-bold text-foreground mb-8">
                  Tell Us About Your Project
                </h2>

                {isSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2, type: "spring" }}
                      className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6"
                    >
                      <CheckCircle size={32} className="text-primary" />
                    </motion.div>
                    <h3 className="text-2xl font-bold text-foreground mb-4">
                      Thank You!
                    </h3>
                    <p className="text-muted-foreground">
                      We've received your message and will get back to you
                      within 24 hours.
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Shared style helpers */}
                    {/* Tip: put these at file top if you want, or keep inline */}
                    {/*
    const labelCls = "block text-[13px] font-medium text-muted-foreground mb-1.5";
    const fieldCls = "w-full h-12 px-4 rounded-xl bg-background/80 border border-border/70 text-foreground placeholder:text-muted-foreground/60 transition-all duration-200 outline-none
                      focus:border-primary/60 focus:ring-4 focus:ring-primary/15 focus:bg-background/95
                      hover:border-border focus:shadow-[0_0_0_1px_theme(colors.primary/60)]";
    const selectWrapCls = "relative";
    const selectChevron = (
      <svg className='pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 opacity-60'
           viewBox="0 0 20 20" fill="currentColor">
        <path d="M5.23 7.21a.75.75 0 011.06.02L10 11.17l3.71-3.94a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"/>
      </svg>
    );
  */}
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label
                          htmlFor="name"
                          className="block text-[13px] font-medium text-muted-foreground mb-1.5"
                        >
                          Full Name <span className="text-destructive">*</span>
                        </label>
                        <input
                          id="name"
                          name="name"
                          type="text"
                          required
                          autoComplete="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          className="w-full h-12 px-4 rounded-xl bg-background/80 border border-border/70 text-foreground placeholder:text-muted-foreground/60 transition-all duration-200 outline-none
                   focus:border-primary/60 focus:ring-4 focus:ring-primary/15 focus:bg-background/95
                   hover:border-border focus:shadow-[0_0_0_1px_theme(colors.primary/60)]"
                          placeholder="Your full name"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="email"
                          className="block text-[13px] font-medium text-muted-foreground mb-1.5"
                        >
                          Email Address{" "}
                          <span className="text-destructive">*</span>
                        </label>
                        <input
                          id="email"
                          name="email"
                          type="email"
                          required
                          autoComplete="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="w-full h-12 px-4 rounded-xl bg-background/80 border border-border/70 text-foreground placeholder:text-muted-foreground/60 transition-all duration-200 outline-none
                   focus:border-primary/60 focus:ring-4 focus:ring-primary/15 focus:bg-background/95
                   hover:border-border focus:shadow-[0_0_0_1px_theme(colors.primary/60)]"
                          placeholder="your@email.com"
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="company"
                        className="block text-[13px] font-medium text-muted-foreground mb-1.5"
                      >
                        Company Name
                      </label>
                      <input
                        id="company"
                        name="company"
                        type="text"
                        autoComplete="organization"
                        value={formData.company}
                        onChange={handleInputChange}
                        className="w-full h-12 px-4 rounded-xl bg-background/80 border border-border/70 text-foreground placeholder:text-muted-foreground/60 transition-all duration-200 outline-none
                 focus:border-primary/60 focus:ring-4 focus:ring-primary/15 focus:bg-background/95
                 hover:border-border focus:shadow-[0_0_0_1px_theme(colors.primary/60)]"
                        placeholder="Your company name"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="projectType"
                        className="block text-[13px] font-medium text-muted-foreground mb-1.5"
                      >
                        Project Type <span className="text-destructive">*</span>
                      </label>
                      <div className="relative">
                        <select
                          id="projectType"
                          name="projectType"
                          required
                          value={formData.projectType}
                          onChange={handleInputChange}
                          className="appearance-none w-full h-12 px-4 pr-10 rounded-xl bg-background/80 border border-border/70 text-foreground transition-all duration-200 outline-none
                   focus:border-primary/60 focus:ring-4 focus:ring-primary/15 focus:bg-background/95
                   hover:border-border focus:shadow-[0_0_0_1px_theme(colors.primary/60)]"
                        >
                          <option value="">Select a service</option>
                          {services.map((service) => (
                            <option key={service} value={service}>
                              {service}
                            </option>
                          ))}
                        </select>
                        {/* Chevron */}
                        <svg
                          className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 opacity-60"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path d="M5.23 7.21a.75.75 0 011.06.02L10 11.17l3.71-3.94a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" />
                        </svg>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label
                          htmlFor="budget"
                          className="block text-[13px] font-medium text-muted-foreground mb-1.5"
                        >
                          Budget Range
                        </label>
                        <div className="relative">
                          <select
                            id="budget"
                            name="budget"
                            value={formData.budget}
                            onChange={handleInputChange}
                            className="appearance-none w-full h-12 px-4 pr-10 rounded-xl bg-background/80 border border-border/70 text-foreground transition-all duration-200 outline-none
                     focus:border-primary/60 focus:ring-4 focus:ring-primary/15 focus:bg-background/95
                     hover:border-border focus:shadow-[0_0_0_1px_theme(colors.primary/60)]"
                          >
                            <option value="">Select budget range</option>
                            {budgetRanges.map((range) => (
                              <option key={range} value={range}>
                                {range}
                              </option>
                            ))}
                          </select>
                          <svg
                            className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 opacity-60"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path d="M5.23 7.21a.75.75 0 011.06.02L10 11.17l3.71-3.94a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" />
                          </svg>
                        </div>
                      </div>

                      <div>
                        <label
                          htmlFor="timeline"
                          className="block text-[13px] font-medium text-muted-foreground mb-1.5"
                        >
                          Timeline
                        </label>
                        <div className="relative">
                          <select
                            id="timeline"
                            name="timeline"
                            value={formData.timeline}
                            onChange={handleInputChange}
                            className="appearance-none w-full h-12 px-4 pr-10 rounded-xl bg-background/80 border border-border/70 text-foreground transition-all duration-200 outline-none
                     focus:border-primary/60 focus:ring-4 focus:ring-primary/15 focus:bg-background/95
                     hover:border-border focus:shadow-[0_0_0_1px_theme(colors.primary/60)]"
                          >
                            <option value="">Select timeline</option>
                            {timelines.map((t) => (
                              <option key={t} value={t}>
                                {t}
                              </option>
                            ))}
                          </select>
                          <svg
                            className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 opacity-60"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path d="M5.23 7.21a.75.75 0 011.06.02L10 11.17l3.71-3.94a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" />
                          </svg>
                        </div>
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="message"
                        className="block text-[13px] font-medium text-muted-foreground mb-1.5"
                      >
                        Project Description{" "}
                        <span className="text-destructive">*</span>
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        required
                        rows={6}
                        value={formData.message}
                        onChange={handleInputChange}
                        className="w-full min-h-[144px] px-4 py-3 rounded-xl bg-background/80 border border-border/70 text-foreground placeholder:text-muted-foreground/60 transition-all duration-200 outline-none resize-y
                 focus:border-primary/60 focus:ring-4 focus:ring-primary/15 focus:bg-background/95
                 hover:border-border focus:shadow-[0_0_0_1px_theme(colors.primary/60)]"
                        placeholder="Tell us about your project, goals, and any specific requirements…"
                      />
                      <p className="mt-1 text-xs text-muted-foreground/70">
                        Tip: Mention goals, audience, deadlines, and any links
                        (Figma, docs, or references).
                      </p>
                    </div>

                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      transition={{ duration: 0.15 }}
                      className="w-full bg-foreground text-background px-8 h-12 rounded-xl font-medium tracking-wide
               hover:opacity-95 hover:shadow-lg hover:shadow-foreground/10
               disabled:opacity-50 disabled:cursor-not-allowed"
                      aria-busy={isSubmitting}
                    >
                      {isSubmitting ? (
                        <span className="inline-flex items-center gap-3">
                          <motion.span
                            animate={{ rotate: 360 }}
                            transition={{
                              duration: 1,
                              repeat: Infinity,
                              ease: "linear",
                            }}
                            className="inline-block h-4 w-4 border-2 border-background/40 border-t-background rounded-full"
                            aria-hidden="true"
                          />
                          Sending…
                        </span>
                      ) : (
                        "Send Message"
                      )}
                    </motion.button>
                  </form>
                )}
              </div>
            </AnimatedSection>

            {/* Contact Information */}
            <AnimatedSection delay={0.1}>
              <div className="space-y-8">
                <div>
                  <h2 className="text-5xl font-bold text-foreground mb-6">
                    Get In Touch
                  </h2>
                  <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                    We're here to help bring your vision to life. Reach out
                    through any of these channels and we'll get back to you
                    promptly.
                  </p>
                </div>

                <div className="space-y-6">
                  {contactInfo.map((info) => (
                    <motion.a
                      key={info.title}
                      href={info.action}
                      whileHover={{ scale: 1.02, y: -2 }}
                      transition={{ duration: 0.15 }}
                      className="block bg-card/50 backdrop-blur-xl border border-border rounded-lg p-6 hover:border-primary/30 hover:shadow-card-hover  group"
                    >
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-beige-gradient rounded-lg flex items-center justify-center group-hover:shadow-glow ">
                          <info.icon
                            size={24}
                            className="text-primary-foreground"
                          />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-foreground mb-1 group-hover:text-primary transition-colors duration-150">
                            {info.title}
                          </h3>
                          <p className="text-lg font-medium text-foreground mb-2">
                            {info.details}
                          </p>
                          <p className="text-muted-foreground text-sm">
                            {info.description}
                          </p>
                        </div>
                      </div>
                    </motion.a>
                  ))}
                </div>

                {/* Quick Actions */}
                <div className="bg-primary/5 border border-primary/20 rounded-lg p-6">
                  <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                    <Calendar size={20} className="text-primary" />
                    Quick Actions
                  </h3>
                  <div className="space-y-3">
                    <motion.button
                      onClick={handleScheduleCall}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      transition={{ duration: 0.15 }}
                      className="w-full text-left p-3 bg-card/50 rounded-lg border border-border hover:border-primary/30 transition-colors duration-150 group"
                    >
                      <div className="flex items-center gap-3">
                        <MessageCircle size={16} className="text-primary" />
                        <span className="text-foreground group-hover:text-primary transition-colors duration-150">
                          Schedule a 30-minute consultation call
                        </span>
                      </div>
                    </motion.button>
                    <motion.button
                      onClick={handleQuickEstimate}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      transition={{ duration: 0.15 }}
                      className="w-full text-left p-3 bg-card/50 rounded-lg border border-border hover:border-primary/30 transition-colors duration-150 group"
                    >
                      <div className="flex items-center gap-3">
                        <Clock size={16} className="text-primary" />
                        <span className="text-foreground group-hover:text-primary transition-colors duration-150">
                          Get a project timeline estimate
                        </span>
                      </div>
                    </motion.button>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-5xl md:text-7xl font-bold text-foreground mb-6 tracking-tight">
              Contact
              <span className="block bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                Questions
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed font-light">
              Common questions about getting started with Zumetrix Labs
            </p>
          </AnimatedSection>

          <div className="space-y-4 max-w-4xl mx-auto">
            {contactFAQs.map((faq, index) => (
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
                      <div className="px-6 pb-6 text-muted-foreground leading-relaxed">
                        {faq.answer}
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

export default ContactPage;
