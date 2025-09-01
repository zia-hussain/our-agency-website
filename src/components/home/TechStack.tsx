import React from "react";
import { Code2, Zap, Shield, Globe } from "lucide-react";
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
      title: "Modern Development",
      description: "React, Next.js, TypeScript for scalable applications"
    },
    {
      icon: Zap,
      title: "AI Integration", 
      description: "OpenAI, automation workflows, intelligent systems"
    },
    {
      icon: Shield,
      title: "Enterprise Security",
      description: "Firebase, AWS, secure authentication & data protection"
    },
    {
      icon: Globe,
      title: "Global Scale",
      description: "Cloud-native architecture for worldwide deployment"
    }
  ];

  return (
    <section className="py-20 bg-[#131313]/30 border-y border-[#1E1E1E]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-[#EDEDED] mb-4 tracking-tight">
            {techStack.title}
          </h2>
          <p className="text-lg text-[#B6B6B6] font-light max-w-3xl mx-auto">
            {techStack.subtitle}
          </p>
        </motion.div>

        {/* Core Capabilities */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {coreCapabilities.map((capability, index) => (
            <motion.div
              key={capability.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -4, scale: 1.02 }}
              transition={{ duration: 0.12, delay: index * 0.05 }}
              className="group text-center"
            >
              <div className="bg-[#131313]/60 backdrop-blur-xl border border-[#1E1E1E]/60 rounded-xl p-6 hover:border-primary/30 group-hover:bg-[#131313]/80 transition-all duration-120">
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ duration: 0.12 }}
                  className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-gradient-to-r group-hover:from-primary group-hover:to-primary/80 transition-all duration-120"
                >
                  <capability.icon size={20} className="text-primary group-hover:text-primary-foreground transition-colors duration-120" />
                </motion.div>
                <h3 className="font-semibold text-[#EDEDED] mb-2 group-hover:text-primary transition-colors duration-120">
                  {capability.title}
                </h3>
                <p className="text-sm text-[#B6B6B6] leading-[1.7]">
                  {capability.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Technology Pills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="text-center"
        >
          <div className="flex flex-wrap justify-center gap-3">
            {allTechnologies.map((tech, index) => (
              <motion.span
                key={tech}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.12, delay: index * 0.03 }}
                className="px-4 py-2 bg-[#131313]/60 backdrop-blur-xl border border-[#1E1E1E]/60 rounded-full text-sm font-medium text-[#B6B6B6] hover:text-primary hover:border-primary/30 transition-all duration-120 cursor-pointer"
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