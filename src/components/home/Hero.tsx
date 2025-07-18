import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Play, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

const Hero: React.FC = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="min-h-screen bg-background flex items-center justify-center relative overflow-hidden pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="inline-flex items-center px-4 py-2 bg-card/50 backdrop-blur-xl border border-border rounded-full text-sm font-medium text-primary mb-8 hover:bg-card/70 transition-all duration-100"
          >
            <Sparkles size={16} className="mr-2" />
            <span className="w-2 h-2 bg-primary rounded-full mr-2 animate-pulse"></span>
            Available for new projects
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="text-5xl md:text-7xl lg:text-8xl xl:text-8xl font-bold text-foreground mb-8 leading-tight tracking-tight"
          >
            We build
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.4 }}
              className="block bg-shimmer bg-clip-text text-transparent pb-4 leading-[1.1]"
            >
              world-class
            </motion.span>
            <motion.span
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.6 }}
              className="block text-foreground"
            >
              software solutions
            </motion.span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.8 }}
            className="text-lg md:text-xl lg:text-2xl text-muted-foreground max-w-4xl mx-auto mb-12 leading-relaxed font-light"
          >
            Zumetrix Labs transforms ambitious ideas into powerful digital
            experiences. Led by Syed Zia Hussain and Syed Omer Shah, we craft
            exceptional web applications, MVPs, and custom software that drives
            real business results.
          </motion.p>

          {/* CTA Buttons - PERFECT HIERARCHY */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 1 }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16"
          >
            {/* PRIMARY BUTTON - BIGGER & MORE PROMINENT */}
            <Link to="/contact">
              <motion.button
                whileHover={{
                  scale: 1.02,
                  y: -1,
                  transition: { duration: 0.1, ease: "easeOut" },
                }}
                whileTap={{
                  scale: 0.98,
                  transition: { duration: 0.05 },
                }}
                className="group bg-beige-gradient text-primary-foreground px-10 py-4 rounded-xl font-semibold 
                         hover:shadow-glow transition-all duration-100 ease-out
                         flex items-center gap-3 text-lg shadow-lg"
              >
                Start Your Project
                <ArrowRight
                  size={20}
                  className="group-hover:translate-x-0.5 transition-transform duration-100"
                />
              </motion.button>
            </Link>

            {/* SECONDARY BUTTON - SMALLER WITH PLAY ICON */}
            <motion.button
              whileHover={{
                scale: 1.02,
                transition: { duration: 0.1, ease: "easeOut" },
              }}
              whileTap={{
                scale: 0.98,
                transition: { duration: 0.05 },
              }}
              onClick={() => scrollToSection("portfolio")}
              className="group text-muted-foreground hover:text-primary font-medium px-6 py-3 
                       transition-all duration-100 ease-out text-base flex items-center gap-3 
                       bg-card/30 backdrop-blur-xl border border-border rounded-xl
                       hover:bg-card/50 hover:border-primary/30"
            >
              <div className="w-10 h-10 bg-card/50 backdrop-blur-xl rounded-full flex items-center justify-center group-hover:bg-primary/10 transition-all duration-100 border border-border">
                <Play size={14} className="text-primary ml-0.5" />
              </div>
              View Our Work
            </motion.button>
          </motion.div>

          {/* Stats - PERFECTLY ALIGNED */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 1.2 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto"
          >
            {[
              { number: "50+", label: "Web & App Projects Delivered" },
              { number: "25+", label: "Clients Served Worldwide" },
              { number: "3+", label: "Years of Modern Stack Experience" },
              { number: "100%", label: "Client Satisfaction Rate" },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 1.4 + index * 0.05 }}
                whileHover={{
                  y: -2,
                  transition: { duration: 0.1 },
                }}
                className="text-center bg-card/30 backdrop-blur-xl border border-border rounded-xl p-4 hover:bg-card/50 hover:border-primary/30 transition-all duration-100 cursor-pointer"
              >
                <div className="text-2xl md:text-3xl font-bold text-foreground mb-1 bg-shimmer bg-clip-text text-transparent">
                  {stat.number}
                </div>
                <div className="text-sm text-muted-foreground font-medium">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Floating Elements */}
      <motion.div
        animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 right-1/4 w-20 h-20 bg-primary/10 backdrop-blur-xl border border-border rounded-2xl hidden lg:block"
      />
      <motion.div
        animate={{ y: [0, 20, 0], rotate: [0, -5, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-1/4 left-1/4 w-16 h-16 bg-primary/50 rounded-full hidden lg:block opacity-60"
      />

      {/* PERFECTLY CENTERED SCROLL INDICATOR */}
      {/* <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 1.5 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-6 h-10 border-2 border-border rounded-full flex justify-center bg-card/20 backdrop-blur-xl"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-1 h-3 bg-primary rounded-full mt-2"
          />
        </motion.div>
      </motion.div> */}
    </section>
  );
};

export default Hero;
