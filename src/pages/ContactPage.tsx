import React, { useState } from "react";
import SEO from "../components/common/SEO";
import PageTransition from "../components/common/PageTransition";
import AnimatedSection from "../components/common/AnimatedSection";
import { motion } from "framer-motion";
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
      // Submit to Formspree (replace with your actual endpoint)
      const formspreeResponse = await fetch('https://formspree.io/f/xdkogkqr', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          company: formData.company,
          projectType: formData.projectType,
          budget: formData.budget,
          timeline: formData.timeline,
          message: formData.message,
          _subject: `New Project Inquiry from ${formData.name}`,
        }),
      });

      // Submit to Google Sheets via Zapier webhook (replace with your actual webhook)
      const zapierResponse = await fetch('https://hooks.zapier.com/hooks/catch/19579896/2mq8kqj/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
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
        }),
      });

      if (formspreeResponse.ok) {
        setIsSubmitted(true);
        // Reset form after 3 seconds
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
      }
    } catch (error) {
      console.error('Form submission error:', error);
      alert('There was an error submitting the form. Please try again.');
    }

    setIsSubmitting(false);
  };

  const handleScheduleCall = () => {
    window.open('https://calendly.com/zumetrix-labs/consultation', '_blank');
  };

  const handleQuickEstimate = () => {
    window.open('https://calendly.com/zumetrix-labs/project-estimate', '_blank');
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "Email Us",
      details: "hello@zumetrix.com",
      description: "Send us an email and we'll respond within 24 hours",
      action: "mailto:hello@zumetrix.com",
    },
    {
      icon: Phone,
      title: "Call Us",
      details: "+92 XXX XXXXXXX",
      description: "Speak directly with our team during business hours",
      action: "tel:+92XXXXXXXXX",
    },
    {
      icon: MapPin,
      title: "Location",
      details: "Pakistan",
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
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label
                          htmlFor="name"
                          className="block text-sm font-medium text-foreground mb-2"
                        >
                          Full Name *
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-border rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20 transition-colors duration-150 bg-background text-foreground"
                          placeholder="Your full name"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium text-foreground mb-2"
                        >
                          Email Address *
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-border rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20 transition-colors duration-150 bg-background text-foreground"
                          placeholder="your@email.com"
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="company"
                        className="block text-sm font-medium text-foreground mb-2"
                      >
                        Company Name
                      </label>
                      <input
                        type="text"
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-border rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20 transition-colors duration-150 bg-background text-foreground"
                        placeholder="Your company name"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="projectType"
                        className="block text-sm font-medium text-foreground mb-2"
                      >
                        Project Type *
                      </label>
                      <select
                        id="projectType"
                        name="projectType"
                        required
                        value={formData.projectType}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-border rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20 transition-colors duration-150 bg-background text-foreground"
                      >
                        <option value="">Select a service</option>
                        {services.map((service) => (
                          <option key={service} value={service}>
                            {service}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label
                          htmlFor="budget"
                          className="block text-sm font-medium text-foreground mb-2"
                        >
                          Budget Range
                        </label>
                        <select
                          id="budget"
                          name="budget"
                          value={formData.budget}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-border rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20 transition-colors duration-150 bg-background text-foreground"
                        >
                          <option value="">Select budget range</option>
                          {budgetRanges.map((range) => (
                            <option key={range} value={range}>
                              {range}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label
                          htmlFor="timeline"
                          className="block text-sm font-medium text-foreground mb-2"
                        >
                          Timeline
                        </label>
                        <select
                          id="timeline"
                          name="timeline"
                          value={formData.timeline}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-border rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20 transition-colors duration-150 bg-background text-foreground"
                        >
                          <option value="">Select timeline</option>
                          {timelines.map((timeline) => (
                            <option key={timeline} value={timeline}>
                              {timeline}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="message"
                        className="block text-sm font-medium text-foreground mb-2"
                      >
                        Project Description *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        required
                        rows={6}
                        value={formData.message}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-border rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20 transition-colors duration-150 resize-none bg-background text-foreground"
                        placeholder="Tell us about your project, goals, and any specific requirements..."
                      />
                    </div>

                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      transition={{ duration: 0.15 }}
                      className="w-full bg-beige-gradient text-primary-foreground px-8 py-4 rounded-lg font-medium 
                               hover:shadow-glow  
                               flex items-center justify-center gap-3 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <>
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{
                              duration: 1,
                              repeat: Infinity,
                              ease: "linear",
                            }}
                            className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full"
                          />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send size={20} />
                          Send Message
                        </>
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
              Frequently Asked
              <span className="block bg-shimmer bg-clip-text text-transparent pb-4 leading-[1.1]">
                Questions
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed font-light">
              Quick answers to common questions about working with Zumetrix
              Labs.
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {[
              {
                question: "How quickly can you start my project?",
                answer:
                  "We typically begin new projects within 1-2 weeks of contract signing, depending on our current workload and project complexity.",
              },
              {
                question: "Do you work with startups?",
                answer:
                  "Absolutely! We love working with startups and offer special MVP packages to help validate ideas quickly and cost-effectively.",
              },
              {
                question: "What's your development process?",
                answer:
                  "We follow an agile methodology with regular check-ins, transparent communication, and iterative development to ensure your vision is realized.",
              },
              {
                question: "Do you provide ongoing support?",
                answer:
                  "Yes, we offer comprehensive maintenance and support packages to keep your software running smoothly after launch.",
              },
            ].map((faq, index) => (
              <AnimatedSection
                key={index}
                delay={index * 0.05}
                className="group"
              >
                <motion.div
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.15 }}
                  className="bg-card/50 backdrop-blur-xl p-6 rounded-lg border border-border hover:border-primary/30 "
                >
                  <h3 className="font-semibold text-foreground mb-3 group-hover:text-primary transition-colors duration-150">
                    {faq.question}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {faq.answer}
                  </p>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </PageTransition>
  );
};

export default ContactPage;