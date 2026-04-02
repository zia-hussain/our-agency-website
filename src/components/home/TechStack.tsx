import React from "react";
import { Code2, Zap, Shield, Globe, Cloud, Smartphone, Bot, Blocks } from "lucide-react";
import { motion } from "framer-motion";
import { getSiteData } from "../../data/site";

const coreCapabilities = [
  {
    icon: Code2,
    title: "Frontend Excellence",
    description: "React, Next.js, TypeScript for scalable, performant user interfaces",
    technologies: ["React", "Next.js", "TypeScript", "TailwindCSS"],
  },
  {
    icon: Cloud,
    title: "Backend Mastery",
    description: "Node.js, Python, databases for robust and secure server architecture",
    technologies: ["Node.js", "Python", "PostgreSQL", "Supabase"],
  },
  {
    icon: Globe,
    title: "Cloud Infrastructure",
    description: "AWS, Firebase, Vercel for global deployment and effortless scaling",
    technologies: ["AWS", "Firebase", "Vercel", "Docker"],
  },
  {
    icon: Smartphone,
    title: "Mobile Development",
    description: "React Native, Flutter for high-quality cross-platform mobile apps",
    technologies: ["React Native", "Flutter", "Expo", "iOS & Android"],
  },
  {
    icon: Blocks,
    title: "No-Code Platforms",
    description: "Bubble, Webflow, FlutterFlow — ship faster without compromising quality",
    technologies: ["Bubble", "Webflow", "FlutterFlow", "Adalo", "Softr"],
  },
  {
    icon: Bot,
    title: "AI & Automation",
    description: "Make.com, Zapier, n8n, OpenAI — intelligent workflows that run themselves",
    technologies: ["Make.com", "Zapier", "n8n", "OpenAI", "LangChain"],
  },
  {
    icon: Zap,
    title: "Integrations",
    description: "Stripe, Twilio, Airtable, Shopify — connect your entire product ecosystem",
    technologies: ["Stripe", "Twilio", "Airtable", "Shopify"],
  },
  {
    icon: Shield,
    title: "Security & Auth",
    description: "OAuth, JWT, RLS, end-to-end encryption for enterprise-grade security",
    technologies: ["Supabase Auth", "OAuth", "JWT", "RLS"],
  },
];

const allTechPills = [
  "React", "Next.js", "TypeScript", "TailwindCSS", "Vite",
  "Node.js", "Python", "PostgreSQL", "MongoDB", "Supabase",
  "AWS", "Firebase", "Vercel", "Docker", "Redis",
  "React Native", "Flutter", "Expo", "FlutterFlow",
  "Bubble", "Webflow", "Adalo", "Softr", "Glide",
  "Make.com", "Zapier", "n8n", "OpenAI", "LangChain",
  "Stripe", "Twilio", "Airtable", "Shopify", "HubSpot",
];

const TechStack: React.FC = () => {
  const { techStack } = getSiteData();

  return (
    <section className="py-20 lg:py-28 bg-card/20 border-y border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="text-center mb-16 lg:mb-20"
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-foreground mb-5 tracking-tight leading-[1.1]">
            {techStack.title}
            <span className="block bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
              {techStack.themedTitle}
            </span>
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed font-light">
            {techStack.subtitle}
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
          {coreCapabilities.map((capability, index) => (
            <motion.div
              key={capability.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.15, delay: index * 0.04 }}
              className="group"
            >
              <div className="bg-card/50 backdrop-blur-xl border border-border rounded-xl p-6 hover:border-primary/30 group-hover:bg-card/80 transition-all duration-150 h-full flex flex-col">
                <div className="w-11 h-11 bg-primary/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors duration-150">
                  <capability.icon size={19} className="text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors duration-150 text-sm">
                  {capability.title}
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed mb-4 flex-grow">
                  {capability.description}
                </p>
                <div className="flex flex-wrap gap-1">
                  {capability.technologies.slice(0, 3).map((tech) => (
                    <span
                      key={tech}
                      className="text-xs px-2 py-0.5 bg-primary/8 text-primary/80 border border-primary/15 rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="text-center"
        >
          <p className="text-sm font-medium text-muted-foreground mb-6 uppercase tracking-widest">
            Full Technology Stack
          </p>
          <div className="flex flex-wrap justify-center gap-2.5">
            {allTechPills.map((tech, index) => (
              <motion.span
                key={tech}
                initial={{ opacity: 0, scale: 0.85 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.12, delay: index * 0.015 }}
                className="px-3.5 py-1.5 bg-card/60 backdrop-blur-xl border border-border rounded-full text-sm text-muted-foreground hover:text-primary hover:border-primary/30 hover:bg-card/80 transition-all duration-150 cursor-default"
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
