import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, HelpCircle, Plus } from "lucide-react";
import { homeFAQs } from "../../data/faqs/home";

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);


  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 bg-background relative overflow-hidden">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header — uniform with every other section title */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center px-4 py-2 bg-card/50 backdrop-blur-xl border border-border rounded-full text-sm font-medium text-primary mb-8"
          >
            <HelpCircle size={16} className="mr-2" />
            Frequently Asked Questions
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 tracking-tight leading-[1.1]"
          >
            Before You
            <span className="block bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
              Reach Out
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="text-lg sm:text-xl lg:text-2xl text-muted-foreground max-w-3xl mx-auto leading-[1.6] font-light"
          >
            The questions we actually get asked — pricing, ownership, timelines,
            and what it's like to work with Zia and Omer directly.
          </motion.p>
        </div>

        {/* FAQ Items — individually framed, premium cards */}
        <div className="space-y-3">
          {homeFAQs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className={`rounded-xl border bg-card/20 backdrop-blur-xl transition-colors duration-200 ${
                  isOpen ? "border-primary/30 bg-card/40" : "border-border/70 hover:border-border"
                }`}
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full py-5 px-5 sm:px-6 text-left flex items-center justify-between gap-4 group"
                >
                  <h3 className="text-base font-medium text-foreground group-hover:text-primary transition-colors duration-150">
                    {faq.question}
                  </h3>
                  <motion.div
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.15 }}
                    className={`flex-shrink-0 flex items-center justify-center w-7 h-7 rounded-full transition-colors duration-150 ${
                      isOpen ? "bg-primary/15 text-primary" : "bg-card/60 text-muted-foreground group-hover:text-primary"
                    }`}
                  >
                    <Plus size={15} />
                  </motion.div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.15 }}
                      className="overflow-hidden"
                    >
                      <p className="text-sm text-muted-foreground leading-relaxed px-5 sm:px-6 pb-5 pr-10">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <p className="text-sm text-muted-foreground mb-5">
            Still have questions? We'd love to help.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-7 py-3.5 rounded-full font-semibold text-sm hover:shadow-glow transition-all duration-150"
          >
            Contact us today
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
