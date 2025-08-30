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
      {/* Animated Background */}
      <div className="absolute inset-0">
        {/* Gradient Orbs */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0],
            opacity: [0.05, 0.2, 0.05],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute bottom-1/4 right-1/4 w-128 h-128 bg-primary/5 rounded-full blur-3xl"
        />

        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-[0.07]">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 25% 25%, #C48A64 2px, transparent 2px),
                             radial-gradient(circle at 75% 75%, #C48A64 2px, transparent 2px)`,
              backgroundSize: "50px 50px",
            }}
          />
        </div>
      </div>

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

          {/* ✅ SEO OPTIMIZED H1 HEADING */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl xl:text-8xl font-bold text-foreground mb-6 leading-tight tracking-tight">
            We build <br />
            <span className="bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
              world-class
            </span>{" "}
            <br />
            software solutions
          </h1>

          {/* ✅ SEO RICH DESCRIPTION WITH KEYWORDS */}
          <div className="max-w-4xl mx-auto mb-8">
            <p className="text-lg md:text-xl lg:text-2xl text-muted-foreground leading-relaxed font-light mb-4">
              <strong>Zumetrix Labs</strong> is Pakistan's #1{" "}
              <strong>software development agency</strong> founded by expert
              developers
              <strong> Zia Hussain</strong> and <strong>Syed Omer Shah</strong>.
              We specialize in <strong>SaaS MVP development</strong>,
              <strong> React/Node.js applications</strong>,{" "}
              <strong>mobile app development</strong>,{" "}
              <strong>AI automation services</strong>, and{" "}
              <strong>custom software solutions</strong>. Transform your
              ambitious business vision into powerful digital experiences that scale globally, drive measurable growth, and deliver exceptional ROI for your enterprise.
            </p>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
              Our world-class development team delivers <strong>enterprise-grade web applications</strong>,{" "}
              <strong>Firebase development</strong>,
              <strong> no-code automation solutions</strong>,{" "}
              <strong>AI workflow integration</strong>, and enterprise software
              using cutting-edge React.js, Next.js, TypeScript, Node.js, and cloud-native architectures. Trusted by 50+ international clients including ambitious startups and established enterprises across the United States, United Kingdom, Canada, Australia, UAE, Singapore, and Europe.
            </p>
          </div>

          {/* ✅ KEYWORD-RICH SERVICES HIGHLIGHT */}
          <div className="flex flex-wrap justify-center gap-3 mb-12 max-w-4xl mx-auto">
            {[
              "SaaS MVP Development",
              "React Developer Pakistan",
              "AI Automation Services",
              "Firebase Expert Pakistan",
              "Mobile App Development",
              "No-Code Automation Agency",
            ].map((service, index) => (
              <motion.span
                key={service}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.2, delay: 0.8 + index * 0.05 }}
                className="px-4 py-2 bg-card/30 backdrop-blur-xl border border-border rounded-full text-sm font-medium text-muted-foreground hover:text-primary hover:border-primary/30 transition-all duration-200"
              >
                {service}
              </motion.span>
            ))}
          </div>

          {/* ✅ INTERNAL LINKING SECTION */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 1 }}
            className="text-center mb-8"
          >
            <p className="text-muted-foreground text-sm">
              Learn more about our{" "}
              <a
                href="/services"
                className="text-primary hover:underline font-medium"
              >
                comprehensive software development services
              </a>
              , view our{" "}
              <a
                href="/portfolio"
                className="text-primary hover:underline font-medium"
              >
                portfolio of 50+ successful projects
              </a>
              , or{" "}
              <a
                href="/about"
                className="text-primary hover:underline font-medium"
              >
                meet founders Zia Hussain and Syed Omer Shah
              </a>
            </p>
          </motion.div>

          {/* CTA Buttons - PERFECT HIERARCHY */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16"
          >
            {/* PRIMARY BUTTON - BIGGER & MORE PROMINENT */}
            <Link to="/contact">
              <motion.button
                whileHover={{
                  scale: 1.02,
                  y: -1,
                  transition: { duration: 0.15, ease: "easeOut" },
                }}
                whileTap={{
                  scale: 0.98,
                  transition: { duration: 0.1 },
                }}
                className="group bg-beige-gradient text-primary-foreground px-10 py-4 rounded-xl font-semibold 
                         hover:shadow-glow transition-all duration-150 ease-out
                         flex items-center gap-3 text-lg shadow-lg"
              >
                Start Your Project
                <ArrowRight
                  size={20}
                  className="group-hover:translate-x-0.5 transition-transform duration-150"
                />
              </motion.button>
            </Link>

            {/* SECONDARY BUTTON - SMALLER WITH PLAY ICON */}
            <motion.button
              whileHover={{
                scale: 1.02,
                transition: { duration: 0.15, ease: "easeOut" },
              }}
              whileTap={{
                scale: 0.98,
                transition: { duration: 0.1 },
              }}
              onClick={() => scrollToSection("portfolio")}
              className="group text-muted-foreground hover:text-primary font-medium px-6 py-3 
                       transition-all duration-150 ease-out text-base flex items-center gap-3 
                       bg-card/30 backdrop-blur-xl border border-border rounded-xl
                       hover:bg-card/50 hover:border-primary/30"
            >
              <div className="w-10 h-10 bg-card/50 backdrop-blur-xl rounded-full flex items-center justify-center group-hover:bg-primary/10 transition-all duration-150 border border-border">
                <Play size={14} className="text-primary ml-0.5" />
              </div>
              View Our Work
            </motion.button>
          </motion.div>

          {/* Stats - PERFECTLY ALIGNED */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto"
          >
            {[
              { number: "50+", label: "Projects Delivered Successfully" },
              { number: "25+", label: "Happy Clients Worldwide" },
              { number: "3+", label: "Years of Expert Experience" },
              { number: "100%", label: "Client Satisfaction Rate" },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{
                  y: -2,
                  transition: { duration: 0.1 },
                }}
                className="text-center bg-card/30 backdrop-blur-xl border border-border rounded-xl p-4 hover:bg-card/50 hover:border-primary/30 transition-all duration-150 cursor-pointer"
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

      {/* SCROLL INDICATOR - PERFECTLY POSITIONED */}
      {/* <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 1.2 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-6 h-10 border-2 border-border rounded-full flex justify-center bg-card/30 backdrop-blur-xl hover:bg-card/50 transition-all duration-150 cursor-pointer"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-1 h-3 bg-primary rounded-full mt-2"
          />
        </motion.div>
      </motion.div> */}
    </section>
  );
};

export default Hero;
