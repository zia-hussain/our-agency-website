import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "What services does Zumetrix Labs provide?",
      answer: "Zumetrix Labs is a leading software development agency in Pakistan specializing in SaaS MVP development, React/Node.js web applications, mobile app development, AI automation workflows, custom dashboards, Firebase development, and no-code automation solutions. We serve startups and enterprises worldwide with premium, scalable software solutions."
    },
    {
      question: "Who founded Zumetrix Labs?",
      answer: "Zumetrix Labs was founded by two expert software developers: Zia Hussain (Co-Founder & CEO) and Syed Omer Shah (Co-Founder & CTO). Zia Hussain is a full-stack developer with expertise in React, Node.js, and business strategy, while Syed Omer Shah specializes in advanced engineering, AI automation, and scalable architecture. Together, they have 6+ years of combined experience and have delivered 50+ successful projects."
    },
    {
      question: "Does Zumetrix build SaaS MVPs?",
      answer: "Yes! SaaS MVP development is one of our core specialties. We help startups and entrepreneurs validate their ideas quickly by building lean, scalable MVPs using React, Next.js, Node.js, Firebase, and modern tech stacks. Our MVP development process includes rapid prototyping, user authentication, payment integration (Stripe), database design, and deployment. We've helped clients secure funding and launch successful SaaS products."
    },
    {
      question: "Can I hire React and Firebase developers from Zumetrix?",
      answer: "Absolutely! You can hire our expert React and Firebase developers for your projects. Our team has deep expertise in React.js, Next.js, TypeScript, Firebase (Auth, Firestore, Cloud Functions), Node.js, and modern development practices. We offer flexible engagement models including dedicated developers, project-based development, and ongoing maintenance. Contact us to discuss your requirements."
    },
    {
      question: "What makes Zumetrix different from other software agencies?",
      answer: "Zumetrix Labs stands out through our founder-led approach, technical expertise, and proven track record. Unlike typical agencies, our founders (Zia Hussain & Syed Omer Shah) are hands-on developers who personally oversee every project. We specialize in modern tech stacks (React, Node.js, Firebase, AI automation), deliver pixel-perfect UI/UX, and maintain 100% client satisfaction. We're also experts in AI automation and no-code solutions, giving us a unique edge."
    },
    {
      question: "Do you provide AI automation and no-code solutions?",
      answer: "Yes! We're experts in AI automation workflows and no-code solutions. Our services include custom AI integrations (OpenAI, LangChain), workflow automation (Zapier, Make.com), chatbot development, data processing automation, and intelligent business process optimization. We help businesses reduce manual work, increase efficiency, and leverage AI to gain competitive advantages."
    },
    {
      question: "What technologies does Zumetrix specialize in?",
      answer: "Our core technology stack includes React.js, Next.js, TypeScript, Node.js, Firebase, PostgreSQL, MongoDB, Python, React Native, Tailwind CSS, and modern deployment platforms (Vercel, AWS). We also specialize in AI technologies (OpenAI API, LangChain), payment systems (Stripe), authentication systems, and no-code platforms (Zapier, Make.com, Airtable)."
    },
    {
      question: "How can I start a project with Zumetrix Labs?",
      answer: "Starting a project with Zumetrix is simple! Contact us through our website, email (hello@zumetrix.com), or schedule a free consultation call. We'll discuss your requirements, provide a detailed proposal with timeline and pricing, and once approved, our founders will personally kick off your project. We maintain transparent communication throughout the development process and deliver on time, every time."
    }
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
            transition={{ duration: 0.6 }}
            className="inline-flex items-center px-4 py-2 bg-card/50 backdrop-blur-xl border border-border rounded-full text-sm font-medium text-primary mb-8"
          >
            Frequently Asked Questions
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
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
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-muted-foreground leading-relaxed"
          >
            Get answers to common questions about our software development services, 
            founders, and how we can help transform your business ideas into reality.
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
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="bg-card/50 backdrop-blur-xl border border-border rounded-lg overflow-hidden hover:border-primary/30 transition-all duration-300"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-6 text-left flex items-center justify-between hover:bg-card/70 transition-all duration-200"
              >
                <h3 className="text-lg font-semibold text-foreground pr-4">
                  {faq.question}
                </h3>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
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
                    transition={{ duration: 0.3 }}
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
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-16"
        >
          <p className="text-muted-foreground mb-6">
            Still have questions? We'd love to help!
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground px-8 py-3 rounded-lg font-medium hover:shadow-lg transition-all duration-300"
          >
            Contact Us Today
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQ;