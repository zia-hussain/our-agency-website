import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { ExternalLink, ArrowRight, Github, Eye } from "lucide-react";
import { motion, useInView } from "framer-motion";

const Portfolio: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const projects = [
    {
      id: 1,
      title: "Ifyify - AI-Powered Personal Branding Tool",
      category: "Web Application",
      description:
        "A sleek and scalable React-based AI platform that helps users craft professional bios, taglines, and brand personas using custom-built prompt flows and style selectors.",
      image: "/project_images/YOU AS ART.png",
      tags: [
        "React",
        "TailwindCSS",
        "Supabase",
        "OpenAI",
        "JavaScript",
        "Responsive UI",
      ],
      featured: true,
      liveLink: "https://www.ifyify.art",
    },
    {
      title: "WellnessTracker Mobile",
      category: "Mobile App",
      description:
        "An intuitive health and wellness tracking application with personalized insights and goal management.",
      image:
        "https://images.pexels.com/photos/4386370/pexels-photo-4386370.jpeg?auto=compress&cs=tinysrgb&w=800",
      tags: ["React Native", "Firebase", "Machine Learning"],
      featured: false,
    },
    {
      title: "RetailOps Automation",
      category: "Enterprise Solution",
      description:
        "End-to-end inventory management and order processing automation for a growing e-commerce business.",
      image:
        "https://images.pexels.com/photos/7688880/pexels-photo-7688880.jpeg?auto=compress&cs=tinysrgb&w=800",
      tags: ["Python", "AWS", "PostgreSQL", "REST API"],
      featured: false,
    },
  ];

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
      id="portfolio"
      className="py-24 lg:py-32 bg-background relative overflow-hidden"
      ref={ref}
    >
      {/* Background Elements */}
      <div className="absolute inset-0">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.05, 0.15, 0.05],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl"
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
            <Eye size={16} className="mr-2" />
            Our Work
          </motion.div>

          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-8 tracking-tight leading-tight">
            Featured
            <span className="block bg-shimmer bg-clip-text text-transparent pb-4 leading-[1.1]">
              Projects
            </span>
          </h2>

          <p className="text-xl lg:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed font-light mb-12">
            A selection of our recent work that showcases our commitment to
            excellence and innovation in software development.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid lg:grid-cols-3 gap-8 lg:gap-12"
        >
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              variants={cardVariants}
              whileHover={{
                y: -12,
                scale: 1.02,
                transition: { duration: 0.2 },
              }}
              className="group cursor-pointer"
            >
              <div
                className={`h-full flex flex-col bg-card/50 backdrop-blur-xl border rounded-2xl overflow-hidden  ${
                  project.featured
                    ? "border-primary/50 shadow-glow"
                    : "border-border hover:border-primary/30"
                } group-hover:bg-card/70 group-hover:shadow-card-hover`}
              >
                {project.featured && (
                  <div className="bg-beige-gradient text-primary-foreground text-xs font-medium px-3 py-1 text-center">
                    Featured Project
                  </div>
                )}

                <div className="relative overflow-hidden aspect-[4/3]">
                  <motion.img
                    src={project.image}
                    alt={project.title}
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.4 }}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>

                  {/* Hover Actions */}
                  <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-150">
                    {/* Live Link */}
                    {project.liveLink && (
                      <motion.a
                        href={project.liveLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        transition={{ duration: 0.15 }}
                        className="bg-card/80 backdrop-blur-xl p-2 rounded-lg shadow-dark cursor-pointer"
                      >
                        <ExternalLink size={16} className="text-primary" />
                      </motion.a>
                    )}

                    {/* GitHub Link */}
                    {project.githubLink && (
                      <motion.a
                        href={project.githubLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        transition={{ duration: 0.15 }}
                        className="bg-card/80 backdrop-blur-xl p-2 rounded-lg shadow-dark cursor-pointer"
                      >
                        <Github size={16} className="text-primary" />
                      </motion.a>
                    )}
                  </div>

                  {/* Category Badge */}
                  <div className="absolute bottom-4 left-4">
                    <span className="px-3 py-1 bg-beige-gradient text-primary-foreground text-xs font-medium rounded-full backdrop-blur-xl">
                      {project.category}
                    </span>
                  </div>
                </div>

                <div className="p-8 space-y-4 flex-grow flex flex-col">
                  <h3 className="text-2xl font-semibold text-foreground group-hover:text-primary transition-colors duration-200">
                    {project.title}
                  </h3>

                  <p className="text-muted-foreground leading-relaxed flex-grow">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 pt-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-3 py-1 bg-primary/10 backdrop-blur-xl text-primary rounded-full hover:bg-primary/20 transition-colors duration-200 border border-primary/20"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* See All Projects Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.4, delay: 0.6 }}
          className="text-center mt-16"
        >
          <Link to="/portfolio/all">
            <motion.button
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.15 }}
              className="group bg-card/60 backdrop-blur-xl text-foreground hover:text-primary px-10 py-5 rounded-xl font-semibold 
                       hover:bg-card/80 transition-all duration-150 
                       flex items-center gap-3 text-lg mx-auto border border-border hover:border-primary/30 shadow-lg hover:shadow-2xl"
            >
              See All Projects
              <ArrowRight size={22} className="group-hover:translate-x-1 transition-transform duration-150" />
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default Portfolio;