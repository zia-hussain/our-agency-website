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
  MapPin,
  Phone,
  Calendar,
  MessageCircle,
  Clock,
  CheckCircle,
} from "lucide-react";
import { trackCTAClick } from "../utils/analytics";
import { routeLead } from "../services/leadRouter";

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    projectType: "",
    budget: "",
    timeline: "",
    message: "",
    marketingConsent: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [openFAQ, setOpenFAQ] = useContactState<number | null>(0);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const value =
      e.target instanceof HTMLInputElement && e.target.type === "checkbox"
        ? e.target.checked
        : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError("");

    try {
      const leadResult = await routeLead({
        name: formData.name,
        email: formData.email,
        company: formData.company || undefined,
        source: "contact_form",
        leadType: "contact",
        message: formData.message,
        metadata: {
          projectType: formData.projectType,
          budget: formData.budget,
          timeline: formData.timeline,
          marketingConsent: formData.marketingConsent,
        },
      });

      if (!leadResult.success) {
        throw new Error(leadResult.error || "We could not deliver your project brief.");
      }

      setIsSubmitted(true);
      setFormData({
        name: "",
        email: "",
        company: "",
        projectType: "",
        budget: "",
        timeline: "",
        message: "",
        marketingConsent: false,
      });
    } catch (err) {
      console.error("Form submission error:", err);
      setSubmitError(
        `We could not send your brief. Please try again or email ${SITE_CONFIG.company.email}.`,
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleScheduleCall = () => {
    trackCTAClick("Schedule Consultation", "/contact");
    window.open(SITE_CONFIG.contact.calendlyUrl, "_blank");
  };

  const handleQuickEstimate = () => {
    trackCTAClick("Quick Estimate", "/contact");
    window.open(
      SITE_CONFIG.contact.calendlyUrl ||
        "https://calendly.com/zumetrix-labs/project-estimate",
      "_blank",
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
      title: "Call or WhatsApp",
      details: SITE_CONFIG.company.phone,
      description: "Use this number for direct project conversations",
      action: `tel:${SITE_CONFIG.company.phone.replace(/[^\d+]/g, "")}`,
    },
    {
      icon: MapPin,
      title: "Location",
      details: SITE_CONFIG.company.address,
      description: "We work with clients globally from our base in Pakistan",
      action: "https://www.google.com/maps/search/?api=1&query=Pakistan",
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
        title="Contact Zumetrix Labs | Forge Clear Ideas Into Shipped Software"
        description="Forge Clear Ideas Into Shipped Software. Contact Zumetrix Labs to discuss your SaaS MVP, React/Node.js app, AI automation, or mobile app project."
        keywords="contact Zumetrix Labs, software development consultation, web development quote, mobile app development contact, Syed Zia Hussain Shah contact, Syed Omer Shah contact"
        url="https://zumetrix.com/contact"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "ContactPage",
          name: "Contact Zumetrix Labs - Software Development Agency",
          description:
            "Contact Zumetrix Labs for SaaS MVP development, React/Node.js applications, AI automation services, and mobile app development.",
          mainEntity: {
            "@type": "Organization",
            "@id": "https://zumetrix.com/#organization",
            name: "Zumetrix Labs",
            description:
              "Zumetrix Labs builds software for founders who need thinking partners, not order-takers. Services include SaaS MVPs, React/Node.js applications, AI automation, and mobile apps for international clients.",
              contactPoint: {
              "@type": "ContactPoint",
              contactType: "sales",
              email: "hello@zumetrix.com",
              telephone: SITE_CONFIG.company.phone,
              availableLanguage: ["English", "Urdu"],
            },
          },
        }}
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

            <h1 className="mx-auto max-w-full text-[2.55rem] sm:text-5xl md:text-7xl lg:text-8xl font-bold text-foreground mb-8 tracking-tight leading-[1.08]">
              Bring Us the
              <span className="block bg-shimmer bg-clip-text text-transparent pb-4 leading-[1.08]">
                Real Problem
              </span>
            </h1>

            <p className="mx-auto max-w-[22rem] px-1 text-base leading-[1.75] text-muted-foreground font-light sm:max-w-4xl sm:text-xl lg:text-2xl">
              Tell us what is blocked, what is changing in the business, and
              what a successful first release must prove. We will reply with
              useful questions and the clearest next step.
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
                      Project brief received
                    </h3>
                    <p className="text-muted-foreground">
                      A confirmation is on its way to your inbox. We will review
                      the full context and reply within 24 hours.
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
                      hover:border-border focus:shadow-[0_0_0_1px_rgba(196,138,100,0.6)]";
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
                   hover:border-border focus:shadow-[0_0_0_1px_rgba(196,138,100,0.6)]"
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
                   hover:border-border focus:shadow-[0_0_0_1px_rgba(196,138,100,0.6)]"
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
                 hover:border-border focus:shadow-[0_0_0_1px_rgba(196,138,100,0.6)]"
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
                   hover:border-border focus:shadow-[0_0_0_1px_rgba(196,138,100,0.6)]"
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
                     hover:border-border focus:shadow-[0_0_0_1px_rgba(196,138,100,0.6)]"
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
                     hover:border-border focus:shadow-[0_0_0_1px_rgba(196,138,100,0.6)]"
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
                 hover:border-border focus:shadow-[0_0_0_1px_rgba(196,138,100,0.6)]"
                        placeholder="Tell us about your project, goals, and any specific requirements…"
                      />
                      <p className="mt-1 text-xs text-muted-foreground/70">
                        Tip: Mention goals, audience, deadlines, and any links
                        (Figma, docs, or references).
                      </p>
                    </div>

                    <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-border/70 bg-background/35 p-4">
                      <input
                        type="checkbox"
                        name="marketingConsent"
                        checked={formData.marketingConsent}
                        onChange={handleInputChange}
                        className="mt-1 h-4 w-4 accent-primary"
                      />
                      <span className="text-sm leading-relaxed text-muted-foreground">
                        Send me occasional practical notes about product strategy,
                        automation, and software delivery. Optional, and I can
                        unsubscribe at any time.
                      </span>
                    </label>

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
                    {submitError && (
                      <p role="alert" className="text-sm text-red-400/80 leading-relaxed">
                        {submitError}
                      </p>
                    )}
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
                    Send the context you already have. We will help turn it into
                    a focused product decision, a sensible scope, and a clear
                    next move.
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
