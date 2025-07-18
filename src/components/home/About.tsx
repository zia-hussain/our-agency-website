import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { Target, Users, Zap, ArrowRight, Award } from "lucide-react";
import { motion, useInView } from "framer-motion";

const About: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const values = [
    {
      icon: Target,
      title: "Precision",
      description:
        "Every line of code, every pixel, every interaction is crafted with meticulous attention to detail and purpose.",
    },
    {
      icon: Users,
      title: "Partnership",
      description:
        "We work alongside you as true partners, not just vendors, to achieve your business objectives and vision.",
    },
    {
      icon: Zap,
      title: "Innovation",
      description:
        "We leverage cutting-edge technologies and methodologies to build solutions that give you a competitive advantage.",
    },
  ];

  return (
    <section
      id="about"
      className="py-24 lg:py-32 bg-background relative overflow-hidden"
      ref={ref}
    >
      {/* Background Elements */}
      <div className="absolute inset-0">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/4 right-1/4 w-64 h-64 border border-primary/10 rounded-full"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-1/4 left-1/4 w-96 h-96 border border-primary/5 rounded-full"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.4 }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={
              isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }
            }
            transition={{ duration: 0.3 }}
            className="inline-flex items-center px-4 py-2 bg-card/50 backdrop-blur-xl border border-border rounded-full text-sm font-medium text-primary mb-8"
          >
            <Award size={16} className="mr-2" />
            Our Foundation
          </motion.div>

          <h2 className="text-5xl md:text-7xl font-bold text-foreground mb-8 tracking-tight leading-tight">
            Built on
            <span className="block bg-shimmer bg-clip-text text-transparent pb-4 leading-[1.1]">
              Excellence & Vision
            </span>
          </h2>

          <p className="text-xl lg:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed font-light mb-12">
            We believe exceptional software is born from the intersection of
            technical mastery, design excellence, and deep understanding of
            human needs. Our mission is to create digital experiences that don't
            just function—they inspire and transform businesses.
          </p>

          <Link to="/about">
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="group text-muted-foreground hover:text-primary font-medium px-6 py-3 
                       transition-colors duration-200 text-lg flex items-center gap-2 mx-auto
                       bg-card/30 backdrop-blur-xl border border-border rounded-lg hover:border-primary/30"
            >
              Learn Our Story
              <ArrowRight
                size={18}
                className="group-hover:translate-x-1 transition-transform duration-200"
              />
            </motion.button>
          </Link>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-12 lg:gap-16">
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="text-center group"
            >
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5, y: -5 }}
                transition={{ duration: 0.2 }}
                className="inline-flex items-center justify-center w-20 h-20 bg-card/50 backdrop-blur-xl border border-border rounded-2xl mb-8 group-hover:bg-primary/10 group-hover:border-primary/30 group-hover:shadow-glow "
              >
                <value.icon
                  size={32}
                  className="text-primary group-hover:text-primary transition-colors duration-200"
                />
              </motion.div>

              <h3 className="text-2xl font-semibold text-foreground mb-6 group-hover:text-primary transition-colors duration-200">
                {value.title}
              </h3>

              <p className="text-muted-foreground leading-relaxed text-lg">
                {value.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
