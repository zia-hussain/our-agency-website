import React from "react";
import { Code2, Zap, Shield, Globe, Cloud, Smartphone } from "lucide-react";
import { motion } from "framer-motion";
import { getSiteData } from "../../data/site";

const TechStack: React.FC = () => {
  const { techStack } = getSiteData();

  // Extract all technologies from coreCapabilities
  const allTechnologies = techStack.coreCapabilities.flatMap(capability => 
    capability.technologies
  );

  const coreCapabilities = [
    {
      icon: Code2,
      title: "Frontend Excellence",
      description: "React, Next.js, TypeScript for scalable user interfaces",
      technologies: ["React", "Next.js", "TypeScript", "TailwindCSS"]
    },
    {
      icon: Cloud,
      title: "Backend Mastery", 
      description: "Node.js, Python, databases for robust server architecture",
      technologies: ["Node.js", "Python", "PostgreSQL", "MongoDB"]
    },
    {
      icon: Globe,
      title: "Cloud Infrastructure",
      description: "AWS, Firebase, Vercel for global deployment and scaling",
      technologies: ["AWS", "Firebase", "Vercel", "Docker"]
    },
    {
      icon: Zap,
      title: "AI Integration",
      description: "OpenAI, automation workflows for intelligent business solutions",
      technologies: ["OpenAI", "LangChain", "Zapier", "Make.com"]
    },
    {
      icon: Smartphone,
      title: "Mobile Development",
      description: "React Native, Flutter for cross-platform mobile excellence",
      technologies: ["React Native", "Flutter", "Expo", "App Store"]
    }
  ];

  return (
    <section className="py-20 lg:py-24 bg-card/20 border-y border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="text-center mb-16 lg:mb-20"
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-foreground mb-4 tracking-tight leading-[1.1]">
            {techStack.title}
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground font-light max-w-3xl mx-auto">
            {techStack.subtitle}
          </p>
        </motion.div>

        {/* Core Capabilities - Equal Height Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 lg:gap-8 mb-16">
          {coreCapabilities.map((capability, index) => (
            <motion.div
              key={capability.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -4, scale: 1.02 }}
              transition={{ duration: 0.15, delay: index * 0.05 }}
              className="group text-center h-full"
            >
              <div className="bg-card/50 backdrop-blur-xl border border-border rounded-xl p-6 hover:border-primary/30 group-hover:bg-card/80 transition-all duration-150 h-full flex flex-col">
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ duration: 0.15 }}
                  className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-gradient-to-r group-hover:from-primary group-hover:to-primary/80 transition-all duration-150"
                >
                  <capability.icon size={20} className="text-primary group-hover:text-primary-foreground transition-colors duration-150" />
                </motion.div>
                <h3 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors duration-150">
                  {capability.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-[1.5] mb-4 flex-grow">
                  {capability.description}
                </p>
                
                {/* Technology Pills */}
                <div className="flex flex-wrap gap-1 justify-center">
                  {capability.technologies.slice(0, 2).map((tech) => (
                    <span
                      key={tech}
                      className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Technology Pills - All Technologies */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="text-center"
        >
          <h3 className="text-xl font-semibold text-foreground mb-8">
            Complete Technology Stack
          </h3>
          <div className="flex flex-wrap justify-center gap-3">
            {allTechnologies.map((tech, index) => (
              <motion.span
                key={tech}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.15, delay: index * 0.02 }}
                className="px-4 py-2 bg-card/60 backdrop-blur-xl border border-border rounded-full text-sm font-medium text-muted-foreground hover:text-primary hover:border-primary/30 hover:bg-card/80 transition-all duration-150 cursor-pointer"
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TechStack;