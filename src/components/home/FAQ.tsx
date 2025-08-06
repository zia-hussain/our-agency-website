import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "What services does Zumetrix Labs provide?",
      answer:
        "Zumetrix Labs is Pakistan's leading software development agency specializing in SaaS MVP development, React/Node.js web applications, mobile app development, AI automation services, Firebase integration, custom dashboards, no-code automation solutions, and enterprise software development. We serve startups and enterprises worldwide with premium, scalable software solutions using modern tech stacks including React.js, Next.js, TypeScript, Node.js, MongoDB, and AI technologies.",
    },
    {
      question: "Who is Zia Hussain and who founded Zumetrix Labs?",
      answer:
        "Zumetrix Labs was founded by two expert software developers: Zia Hussain (Co-Founder & CEO) and Syed Omer Shah (Co-Founder & CTO). Zia Hussain is a full-stack developer with expertise in React, Node.js, Firebase, and business strategy. He's known on professional platforms like Upwork, Fiverr, and LinkedIn as a top-rated developer. Syed Omer Shah specializes in advanced engineering, AI automation, and scalable architecture. Together, they have 6+ years of combined experience and have delivered 50+ successful projects.",
    },
    {
      question: "Does Zumetrix build SaaS MVPs and support AI integrations?",
      answer:
        "Yes! SaaS MVP development and AI automation are our core specialties. We help startups and entrepreneurs validate their ideas quickly by building lean, scalable MVPs using React, Next.js, Node.js, Firebase, and modern tech stacks. Our AI integration services include OpenAI API integration, ChatGPT automation, custom AI workflows, business process automation, and intelligent chatbot development. We've helped clients secure funding and launch successful SaaS products with AI-powered features.",
    },
    {
      question:
        "Can Zumetrix automate business processes and do you offer mobile app development?",
      answer:
        "Absolutely! We're experts in business automation and mobile app development. Our automation services include workflow automation with Make.com and Zapier, CRM automation setup, WhatsApp automation, email parsing bots, task automation with n8n, sales funnel automation, and custom API integrations. For mobile apps, we develop native iOS and Android applications using React Native and Flutter, cross-platform apps, PWA development, and app store optimization. We've built mobile apps for various industries with 50,000+ downloads.",
    },
    {
      question:
        "Can I hire React, Node.js, and Firebase developers from Zumetrix?",
      answer:
        "Yes! You can hire our expert React, Node.js, and Firebase developers for your projects. Our team includes top-rated developers with deep expertise in React.js, Next.js, TypeScript, Node.js backend development, Firebase (Auth, Firestore, Cloud Functions), MongoDB, REST API development, and modern development practices. We offer flexible engagement models including dedicated developers, project-based development, and ongoing maintenance. Contact us to discuss your requirements and hire the best developers in Pakistan.",
    },
    {
      question:
        "What makes Zumetrix different from other software agencies in Pakistan?",
      answer:
        "Zumetrix Labs stands out as Pakistan's #1 software development agency through our founder-led approach, technical expertise, and proven track record. Unlike typical agencies, our founders Zia Hussain and Syed Omer Shah are hands-on developers who personally oversee every project. We specialize in modern tech stacks (React, Node.js, Firebase, AI automation), deliver pixel-perfect UI/UX, maintain 100% client satisfaction, and have offices serving Karachi, Lahore, and Islamabad. We're also experts in AI automation and no-code solutions, giving us a unique competitive edge in the Pakistani market.",
    },
    {
      question:
        "Do you provide AI automation, no-code solutions, and custom dashboards?",
      answer:
        "Yes! We're Pakistan's leading experts in AI automation workflows, no-code solutions, and custom dashboard development. Our services include custom AI integrations (OpenAI, ChatGPT), workflow automation (Zapier, Make.com, n8n), chatbot development, data processing automation, CRM automation, WhatsApp automation, email parsing bots, Stripe automation, custom admin panels, data visualization dashboards, real-time analytics dashboards, and intelligent business process optimization. We help businesses reduce manual work, increase efficiency, and leverage AI to gain competitive advantages.",
    },
    {
      question:
        "What technologies does Zumetrix specialize in and how can I start a project?",
      answer:
        "Our core technology stack includes React.js, Next.js, TypeScript, Node.js, Firebase, PostgreSQL, MongoDB, Python, React Native, Flutter, Tailwind CSS, and modern deployment platforms (Vercel, AWS). We also specialize in AI technologies (OpenAI API, ChatGPT), payment systems (Stripe), authentication systems, and no-code platforms (Zapier, Make.com, n8n). To start a project with Zumetrix Labs, contact us through our website, email (hello@zumetrix.com), or schedule a free consultation call. We'll discuss your requirements, provide a detailed proposal with timeline and pricing, and our founders will personally kick off your project.",
    },
    {
      question:
        "Does Zumetrix serve clients in Karachi, Lahore, Islamabad and internationally?",
      answer:
        "Yes! Zumetrix Labs serves clients across Pakistan including Karachi, Lahore, Islamabad, and internationally. We're Pakistan's top software development agency with a global reach, serving startups and enterprises worldwide. Whether you're looking for local Pakistani developers or need a remote development team from Pakistan, we provide world-class software development services. Our founders Zia Hussain and Syed Omer Shah lead a team of expert developers who deliver premium solutions regardless of your location.",
    },
    {
      question:
        "What is the pricing for Zumetrix services and do you work with startups?",
      answer:
        "We offer competitive pricing for all our services: Web Applications starting at $5,000, SaaS Dashboards starting at $8,000, Mobile Applications starting at $12,000, MVP Development starting at $4,000, Automation Solutions starting at $2,500, and Digital Strategy starting at $1,500. We absolutely love working with startups and offer special MVP packages to help validate ideas quickly and cost-effectively. We've helped numerous startups secure funding, launch successful products, and scale their businesses. Contact us for a custom quote based on your specific requirements.",
    },
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-24 bg-background relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center px-4 py-2 bg-card/50 backdrop-blur-xl border border-border rounded-full text-sm font-medium text-primary mb-8"
          >
            Frequently Asked Questions
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="text-4xl md:text-6xl font-bold text-foreground mb-6 tracking-tight"
          >
            Everything You Need to Know About
            <span className="block bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
              Zumetrix Labs
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="text-xl text-muted-foreground leading-relaxed"
          >
            Get answers to common questions about our software development
            services, founders Zia Hussain and Syed Omer Shah, and how we can
            help transform your business ideas into reality.
          </motion.p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="bg-card/50 backdrop-blur-xl border border-border rounded-lg overflow-hidden hover:border-primary/30 transition-all duration-200"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-6 text-left flex items-center justify-between hover:bg-card/70 transition-all duration-150"
              >
                <h3 className="text-lg font-semibold text-foreground pr-4">
                  {faq.question}
                </h3>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.15 }}
                  className="flex-shrink-0"
                >
                  {openIndex === index ? (
                    <Minus size={20} className="text-primary" />
                  ) : (
                    <Plus size={20} className="text-primary" />
                  )}
                </motion.div>
              </button>

              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6">
                      <p className="text-muted-foreground leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="text-center mt-16"
        >
          <p className="text-muted-foreground mb-6">
            Still have questions? We'd love to help!
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground px-8 py-3 rounded-lg font-medium hover:shadow-lg transition-all duration-200"
          >
            Contact Us Today
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQ;
