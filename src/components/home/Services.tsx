import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Code } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { services } from "../../data/services.ts";

const Services: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 50,
      scale: 0.9,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: "easeOut",
      },
    },
  };

  return (
    <section
      id="services"
      className="py-24 lg:py-32 bg-background relative overflow-hidden"
      ref={ref}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, #D4A574 2px, transparent 2px),
                           radial-gradient(circle at 75% 75%, #D4A574 2px, transparent 2px)`,
            backgroundSize: "50px 50px",
          }}
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
            <Code size={16} className="mr-2" />
            Premium Software Development Services
          </motion.div>

          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-8 tracking-tight leading-tight">
            World-Class Software
            <span className="block bg-shimmer bg-clip-text text-transparent pb-4 leading-[1.1]">
              Development Services
            </span>
          </h2>

          <p className="text-xl lg:text-2xl text-muted-foreground max-w-5xl mx-auto leading-relaxed font-light mb-12">
            From enterprise web applications to mobile apps and AI automation, we deliver world-class software solutions that transform businesses, accelerate growth, and drive exceptional results for ambitious startups and established enterprises across global markets.
          </p>

          <Link to="/services">
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="group text-muted-foreground hover:text-primary font-medium px-6 py-3 
                       transition-colors duration-200 text-lg flex items-center gap-2 mx-auto
                       bg-card/30 backdrop-blur-xl border border-border rounded-lg hover:border-primary/30"
            >
              Explore All Services
              <ArrowRight
                size={18}
                className="group-hover:translate-x-1 transition-transform duration-200"
              />
            </motion.button>
          </Link>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              variants={cardVariants}
              whileHover={{
                y: -12,
                scale: 1.02,
                transition: { duration: 0.2 },
              }}
              className="group relative"
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
                  transition={{ duration: 0.2 }}
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

                <h3 className="text-xl font-semibold text-foreground mb-4 group-hover:text-primary transition-colors duration-200">
                  {service.title}
                </h3>

                <p className="text-muted-foreground mb-6 leading-relaxed flex-grow">
                  {service.description}
                </p>

                <div className="mb-6">
                  <div className="text-2xl font-bold text-primary mb-4">
                    {service.price}
                  </div>
                  <ul className="space-y-2 mb-4">
                    {service.features.slice(0, 4).map((feature) => (
                      <li
                        key={feature}
                        className="text-sm text-muted-foreground flex items-start gap-2"
                      >
                        <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  
                  {/* Technology Tags */}
                  <div className="flex flex-wrap gap-2">
                    {service.technologies.slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full border border-primary/20"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className={`w-full py-3 px-6 rounded-lg font-medium  ${
                    service.popular
                      ? "bg-beige-gradient text-primary-foreground hover:shadow-glow"
                      : "bg-card border border-border text-foreground hover:bg-primary/10 hover:border-primary/30"
                  }`}
                >
                  <Link to={`/services/${service.slug}`} className="block w-full h-full">
                    Learn More
                  </Link>
                </motion.button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.4, delay: 0.6 }}
          className="text-center mt-20"
        >
          <h3 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Ready to build something
            <span className="bg-shimmer bg-clip-text text-transparent">
              {" "}
              exceptional
            </span>
            ?
          </h3>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed font-light">
            Let's discuss your business vision and create a custom software solution that drives measurable growth, scales globally, and gives you a competitive advantage in your market.
          </p>
          <Link to="/contact">
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="bg-beige-gradient text-primary-foreground px-8 py-4 rounded-lg font-medium 
                       hover:shadow-glow  
                       flex items-center gap-3 text-lg mx-auto"
            >
              Start Your Project
              <ArrowRight
                size={20}
                className="group-hover:translate-x-1 transition-transform duration-200"
              />
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
