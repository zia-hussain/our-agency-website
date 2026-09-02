import React from "react";
import { Code2, Zap, Shield, Globe, Cloud, Smartphone, Bot, Blocks, Layers } from "lucide-react";
import { motion } from "framer-motion";
import { getSiteData } from "../../data/site";

const coreCapabilities = [
  {
    icon: Code2,
    title: "Frontend Excellence",
    description: "Interfaces that stay fast even as the product grows",
    technologies: ["React", "Next.js", "TypeScript", "TailwindCSS"],
  },
  {
    icon: Cloud,
    title: "Backend Mastery",
    description: "Server architecture built to handle real traffic, not demos",
    technologies: ["Node.js", "Python", "PostgreSQL", "Supabase"],
  },
  {
    icon: Globe,
    title: "Cloud Infrastructure",
    description: "Deployed once, scales without you thinking about it again",
    technologies: ["AWS", "Firebase", "Vercel", "Docker"],
  },
  {
    icon: Smartphone,
    title: "Mobile Development",
    description: "One team, both platforms — no separate iOS and Android builds",
    technologies: ["React Native", "Flutter", "Expo", "iOS & Android"],
  },
  {
    icon: Blocks,
    title: "No-Code Platforms",
    description: "Ship faster when the problem doesn't need custom code",
    technologies: ["Bubble", "Webflow", "FlutterFlow", "Adalo", "Softr"],
  },
  {
    icon: Bot,
    title: "AI & Automation",
    description: "Workflows that keep running long after we're done building them",
    technologies: ["Make.com", "Zapier", "n8n", "OpenAI", "LangChain"],
  },
  {
    icon: Zap,
    title: "Integrations",
    description: "Payments, messaging, and data — wired together properly, not duct-taped",
    technologies: ["Stripe", "Twilio", "Airtable", "Shopify"],
  },
  {
    icon: Shield,
    title: "Security & Auth",
    description: "Access control that holds up to an actual security review",
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
    <section className="py-20 lg:py-28 bg-card/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="text-center mb-16 lg:mb-20"
        >
          <div className="inline-flex items-center px-4 py-2 bg-card/50 backdrop-blur-xl border border-border rounded-full text-sm font-medium text-primary mb-8">
            <Layers size={16} className="mr-2" />
            How We Build
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 tracking-tight leading-[1.1]">
            Whatever Your Product
            <span className="block bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
              Actually Needs
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
              whileHover={{ y: -6 }}
              transition={{ duration: 0.15, delay: index * 0.04 }}
              className="group relative"
            >
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/15 via-primary/0 to-primary/0 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-300 pointer-events-none" />
              <div className="relative bg-card/50 backdrop-blur-xl border border-border rounded-2xl p-6 hover:border-primary/40 group-hover:bg-card/80 group-hover:shadow-2xl group-hover:shadow-primary/5 transition-all duration-300 h-full flex flex-col">
                <div className="absolute inset-x-5 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="w-11 h-11 bg-primary/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300">
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
