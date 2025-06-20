import React from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink, ArrowRight, Github } from 'lucide-react';
import { motion } from 'framer-motion';
import AnimatedSection from '../common/AnimatedSection';

const Portfolio: React.FC = () => {
  const projects = [
    {
      title: "FinanceFlow Dashboard",
      category: "Web Application",
      description: "A comprehensive financial analytics platform with real-time data visualization and automated reporting capabilities.",
      image: "https://images.pexels.com/photos/7688336/pexels-photo-7688336.jpeg?auto=compress&cs=tinysrgb&w=800",
      tags: ["React", "TypeScript", "D3.js", "Node.js"],
      color: "terracotta"
    },
    {
      title: "WellnessTracker Mobile",
      category: "Mobile App",
      description: "An intuitive health and wellness tracking application with personalized insights and goal management.",
      image: "https://images.pexels.com/photos/4386370/pexels-photo-4386370.jpeg?auto=compress&cs=tinysrgb&w=800",
      tags: ["React Native", "Firebase", "Machine Learning"],
      color: "sage"
    },
    {
      title: "RetailOps Automation",
      category: "Enterprise Solution",
      description: "End-to-end inventory management and order processing automation for a growing e-commerce business.",
      image: "https://images.pexels.com/photos/7688880/pexels-photo-7688880.jpeg?auto=compress&cs=tinysrgb&w=800",
      tags: ["Python", "AWS", "PostgreSQL", "REST API"],
      color: "terracotta"
    }
  ];

  return (
    <section id="portfolio" className="py-24 lg:py-32 bg-cream relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <motion.div
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.1, 0.3]
          }}
          transition={{ 
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-terracotta/10 to-sage/10 rounded-full blur-3xl"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <AnimatedSection className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="inline-flex items-center px-4 py-2 bg-terracotta/10 border border-terracotta/20 rounded-full text-sm font-medium text-terracotta mb-8"
          >
            Our Work
          </motion.div>

          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-charcoal mb-8 tracking-tight leading-tight">
            Featured
            <span className="block text-sage">Projects</span>
          </h2>
          
          <p className="text-xl lg:text-2xl text-stone max-w-4xl mx-auto leading-relaxed font-light mb-12">
            A selection of our recent work that showcases our commitment to excellence 
            and innovation in software development.
          </p>

          <Link to="/portfolio">
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="group text-charcoal hover:text-sage font-medium px-6 py-3 
                       transition-colors duration-300 text-lg flex items-center gap-2 mx-auto
                       border border-charcoal/20 rounded-sm hover:border-sage/30 hover:bg-sage/5"
            >
              View All Projects
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform duration-300" />
            </motion.button>
          </Link>
        </AnimatedSection>

        <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
          {projects.map((project, index) => (
            <AnimatedSection
              key={project.title}
              delay={index * 0.2}
              className="group cursor-pointer"
            >
              <motion.div
                whileHover={{ y: -12, scale: 1.02 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="h-full flex flex-col"
              >
                <div className="relative overflow-hidden rounded-lg mb-6 aspect-[4/3]">
                  <motion.img 
                    src={project.image} 
                    alt={project.title}
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  {/* Hover Actions */}
                  <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="bg-cream/90 backdrop-blur-sm p-2 rounded-lg shadow-lg"
                    >
                      <ExternalLink size={16} className="text-charcoal" />
                    </motion.div>
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="bg-cream/90 backdrop-blur-sm p-2 rounded-lg shadow-lg"
                    >
                      <Github size={16} className="text-charcoal" />
                    </motion.div>
                  </div>

                  {/* Category Badge */}
                  <div className="absolute bottom-4 left-4">
                    <span className={`px-3 py-1 text-xs font-medium rounded-full backdrop-blur-sm
                      ${project.color === 'terracotta' 
                        ? 'bg-terracotta/20 text-terracotta border border-terracotta/30' 
                        : 'bg-sage/20 text-sage border border-sage/30'
                      }`}>
                      {project.category}
                    </span>
                  </div>
                </div>
                
                <div className="space-y-4 flex-grow flex flex-col">
                  <h3 className="text-2xl font-semibold text-charcoal group-hover:text-terracotta transition-colors duration-300">
                    {project.title}
                  </h3>
                  
                  <p className="text-stone leading-relaxed flex-grow">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 pt-2">
                    {project.tags.map((tag) => (
                      <span 
                        key={tag}
                        className="text-xs px-3 py-1 bg-stone/10 text-stone rounded-full hover:bg-stone/20 transition-colors duration-200"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;