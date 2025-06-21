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

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsSubmitting(false);
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
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "Email Us",
      details: "hello@zumetrixlabs.com",
      description: "Send us an email and we'll respond within 24 hours",
      action: "mailto:hello@zumetrixlabs.com",
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
    "Mobile App Development",
    "MVP Development",
    "Process Automation",
    "UI/UX Design",
    "Technical Consulting",
  ];

  const budgetRanges = [
    "Under $10,000",
    "$10,000 - $25,000",
    "$25,000 - $50,000",
    "$50,000 - $100,000",
    "Over $100,000",
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
        keywords="contact Zumetrix Labs, software development consultation, web development quote, mobile app development contact, Zia Hussain contact, Umer Gillani contact"
        url="https://zumetrixlabs.com/contact"
      />

      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-cream via-cream to-terracotta/5 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <AnimatedSection className="text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center px-4 py-2 bg-terracotta/10 border border-terracotta/20 rounded-full text-sm font-medium text-terracotta mb-8"
            >
              <span className="w-2 h-2 bg-terracotta rounded-full mr-2 animate-pulse-soft"></span>
              Let's Talk
            </motion.div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-charcoal mb-8 tracking-tight leading-tight">
              Start Your
              <span className="block text-terracotta">Project Today</span>
            </h1>

            <p className="text-xl lg:text-2xl text-stone max-w-4xl mx-auto leading-relaxed font-light">
              Ready to transform your vision into reality? Let's discuss your
              project requirements and create a solution that exceeds your
              expectations.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Contact Form & Info Section */}
      <section className="py-24 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <AnimatedSection>
              <div className="bg-cream border border-stone/10 rounded-lg p-8 hover:border-sage/30 transition-all duration-300">
                <h2 className="text-3xl font-bold text-charcoal mb-8">
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
                      className="w-16 h-16 bg-sage/20 rounded-full flex items-center justify-center mx-auto mb-6"
                    >
                      <CheckCircle size={32} className="text-sage" />
                    </motion.div>
                    <h3 className="text-2xl font-bold text-charcoal mb-4">
                      Thank You!
                    </h3>
                    <p className="text-stone">
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
                          className="block text-sm font-medium text-charcoal mb-2"
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
                          className="w-full px-4 py-3 border border-stone/20 rounded-sm focus:border-sage focus:ring-2 focus:ring-sage/20 transition-colors duration-200"
                          placeholder="Your full name"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium text-charcoal mb-2"
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
                          className="w-full px-4 py-3 border border-stone/20 rounded-sm focus:border-sage focus:ring-2 focus:ring-sage/20 transition-colors duration-200"
                          placeholder="your@email.com"
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="company"
                        className="block text-sm font-medium text-charcoal mb-2"
                      >
                        Company Name
                      </label>
                      <input
                        type="text"
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-stone/20 rounded-sm focus:border-sage focus:ring-2 focus:ring-sage/20 transition-colors duration-200"
                        placeholder="Your company name"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="projectType"
                        className="block text-sm font-medium text-charcoal mb-2"
                      >
                        Project Type *
                      </label>
                      <select
                        id="projectType"
                        name="projectType"
                        required
                        value={formData.projectType}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-stone/20 rounded-sm focus:border-sage focus:ring-2 focus:ring-sage/20 transition-colors duration-200"
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
                          className="block text-sm font-medium text-charcoal mb-2"
                        >
                          Budget Range
                        </label>
                        <select
                          id="budget"
                          name="budget"
                          value={formData.budget}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-stone/20 rounded-sm focus:border-sage focus:ring-2 focus:ring-sage/20 transition-colors duration-200"
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
                          className="block text-sm font-medium text-charcoal mb-2"
                        >
                          Timeline
                        </label>
                        <select
                          id="timeline"
                          name="timeline"
                          value={formData.timeline}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-stone/20 rounded-sm focus:border-sage focus:ring-2 focus:ring-sage/20 transition-colors duration-200"
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
                        className="block text-sm font-medium text-charcoal mb-2"
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
                        className="w-full px-4 py-3 border border-stone/20 rounded-sm focus:border-sage focus:ring-2 focus:ring-sage/20 transition-colors duration-200 resize-none"
                        placeholder="Tell us about your project, goals, and any specific requirements..."
                      />
                    </div>

                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full bg-charcoal text-cream px-8 py-4 rounded-sm font-medium 
                               hover:bg-charcoal-light transition-all duration-300 
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
                            className="w-5 h-5 border-2 border-cream/30 border-t-cream rounded-full"
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
            <AnimatedSection delay={0.2}>
              <div className="space-y-8">
                <div>
                  <h2 className="text-3xl font-bold text-charcoal mb-6">
                    Get In Touch
                  </h2>
                  <p className="text-lg text-stone leading-relaxed mb-8">
                    We're here to help bring your vision to life. Reach out
                    through any of these channels and we'll get back to you
                    promptly.
                  </p>
                </div>

                <div className="space-y-6">
                  {contactInfo.map((info, index) => (
                    <motion.a
                      key={info.title}
                      href={info.action}
                      whileHover={{ scale: 1.02, y: -2 }}
                      transition={{ duration: 0.2 }}
                      className="block bg-cream border border-stone/10 rounded-lg p-6 hover:border-terracotta/30 hover:shadow-lg transition-all duration-300 group"
                    >
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-terracotta/20 rounded-lg flex items-center justify-center group-hover:bg-terracotta/30 transition-colors duration-300">
                          <info.icon size={24} className="text-terracotta" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-charcoal mb-1 group-hover:text-terracotta transition-colors duration-300">
                            {info.title}
                          </h3>
                          <p className="text-lg font-medium text-charcoal mb-2">
                            {info.details}
                          </p>
                          <p className="text-stone text-sm">
                            {info.description}
                          </p>
                        </div>
                      </div>
                    </motion.a>
                  ))}
                </div>

                {/* Quick Actions */}
                <div className="bg-sage/5 border border-sage/20 rounded-lg p-6">
                  <h3 className="font-semibold text-charcoal mb-4 flex items-center gap-2">
                    <Calendar size={20} className="text-sage" />
                    Quick Actions
                  </h3>
                  <div className="space-y-3">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full text-left p-3 bg-cream rounded-sm border border-stone/10 hover:border-sage/30 transition-colors duration-200 group"
                    >
                      <div className="flex items-center gap-3">
                        <MessageCircle size={16} className="text-sage" />
                        <span className="text-charcoal group-hover:text-sage transition-colors duration-200">
                          Schedule a 30-minute consultation call
                        </span>
                      </div>
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full text-left p-3 bg-cream rounded-sm border border-stone/10 hover:border-sage/30 transition-colors duration-200 group"
                    >
                      <div className="flex items-center gap-3">
                        <Clock size={16} className="text-sage" />
                        <span className="text-charcoal group-hover:text-sage transition-colors duration-200">
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
      <section className="py-24 bg-charcoal">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-cream mb-6 tracking-tight">
              Frequently Asked
              <span className="block text-sage">Questions</span>
            </h2>
            <p className="text-xl text-stone-light max-w-3xl mx-auto leading-relaxed font-light">
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
                delay={index * 0.1}
                className="group"
              >
                <motion.div
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.3 }}
                  className="bg-charcoal-light p-6 rounded-lg border border-stone/10 hover:border-sage/30 transition-all duration-300"
                >
                  <h3 className="font-semibold text-cream mb-3 group-hover:text-sage transition-colors duration-300">
                    {faq.question}
                  </h3>
                  <p className="text-stone-light leading-relaxed">
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
