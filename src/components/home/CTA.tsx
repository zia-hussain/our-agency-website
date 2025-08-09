import React, { useRef } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Mail,
  MessageCircle,
  Calendar,
  Sparkles,
} from "lucide-react";
import { motion, useInView } from "framer-motion";

const CTA: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-24 lg:py-32 bg-background relative" ref={ref}>
      {/* Background Elements */}
      <div className="absolute inset-0">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute top-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute bottom-0 right-0 w-128 h-128 bg-primary/3 rounded-full blur-3xl"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.4 }}
          className="text-center"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={
              isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }
            }
            transition={{ duration: 0.3 }}
            className="inline-flex items-center px-4 py-2 bg-card/50 backdrop-blur-xl border border-border rounded-full text-sm font-medium text-primary mb-8"
          >
            <Sparkles size={16} className="mr-2" />
            <span className="w-2 h-2 bg-primary rounded-full mr-2 animate-pulse-soft"></span>
            Ready to Start?
          </motion.div>

          <h2 className="text-5xl md:text-7xl lg:text-7xl font-bold text-foreground mb-8 tracking-tight leading-tight">
            Let's Build Something
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="block bg-shimmer bg-clip-text text-transparent pb-2 leading-[1.1]"
            >
              Exceptional Together
            </motion.span>
          </h2>

          <p className="text-xl lg:text-2xl text-muted-foreground max-w-4xl mx-auto mb-16 leading-relaxed font-light">
            Ready to transform your vision into reality? We're here to help you
            create software that doesn't just meet expectations—it exceeds them
            and drives real business results.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-20">
            <Link to="/contact">
              <motion.button
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="group bg-beige-gradient text-primary-foreground px-10 py-5 rounded-lg font-medium 
                         hover:shadow-glow  
                         flex items-center gap-3 text-lg"
              >
                <Mail size={22} />
                Start Your Project
                <ArrowRight
                  size={22}
                  className="group-hover:translate-x-1 transition-transform duration-200"
                />
              </motion.button>
            </Link>

            <motion.button
              onClick={() =>
                window.open(
                  "https://calendly.com/zumetrix-labs/consultation",
                  "_blank"
                )
              }
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="group bg-card/50 backdrop-blur-xl text-muted-foreground hover:text-primary px-10 py-5 rounded-lg font-medium 
                       hover:bg-card/70  
                       flex items-center gap-3 text-lg border border-border hover:border-primary/30"
            >
              <Calendar size={22} />
              Schedule a Call
            </motion.button>
          </div>

          <div className="grid md:grid-cols-3 gap-8 text-center max-w-4xl mx-auto">
            {[
              {
                icon: MessageCircle,
                title: "Quick Response",
                description: "We respond to all inquiries within 24 hours",
                delay: 0.1,
              },
              {
                icon: Calendar,
                title: "Free Consultation",
                description:
                  "30-minute strategy session to discuss your project",
                delay: 0.2,
              },
              {
                icon: ArrowRight,
                title: "No Obligation",
                description: "Honest advice with no pressure to commit",
                delay: 0.3,
              },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                animate={
                  isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }
                }
                transition={{ duration: 0.4, delay: item.delay }}
                className="group"
              >
                <motion.div
                  whileHover={{ scale: 1.05, y: -5 }}
                  transition={{ duration: 0.2 }}
                  className="bg-card/50 backdrop-blur-xl p-6 rounded-2xl border border-border hover:border-primary/30 hover:bg-card/70  hover:shadow-card-hover"
                >
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.2 }}
                    className="w-12 h-12 bg-beige-gradient rounded-full flex items-center justify-center mx-auto mb-4 group-hover:shadow-glow "
                  >
                    <item.icon size={20} className="text-primary-foreground" />
                  </motion.div>
                  <h3 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors duration-200">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {item.description}
                  </p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTA;
