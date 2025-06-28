import React from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink, ArrowRight, Github, Eye } from 'lucide-react';
import { motion } from 'framer-motion';

const Portfolio: React.FC = () => {
  const projects = [
    {
      title: "FinanceFlow Dashboard",
      category: "Web Application",
      description: "A comprehensive financial analytics platform with real-time data visualization and automated reporting capabilities.",
      image: "https://images.pexels.com/photos/7688336/pexels-photo-7688336.jpeg?auto=compress&cs=tinysrgb&w=800",
      tags: ["React", "TypeScript", "D3.js", "Node.js"],
      gradient: "warm-gradient"
    },
    {
      title: "WellnessTracker Mobile",
      category: "Mobile App",
      description: "An intuitive health and wellness tracking application with personalized insights and goal management.",
      image: "https://images.pexels.com/photos/4386370/pexels-photo-4386370.jpeg?auto=compress&cs=tinysrgb&w=800",
      tags: ["React Native", "Firebase", "Machine Learning"],
      gradient: "accent-gradient"
    },
    {
      title: "RetailOps Automation",
      category: "Enterprise Solution",
      description: "End-to-end inventory management and order processing automation for a growing e-commerce business.",
      image: "https://images.pexels.com/photos/7688880/pexels-photo-7688880.jpeg?auto=compress&cs=tinysrgb&w=800",
      tags: ["Python", "AWS", "PostgreSQL", "REST API"],
      gradient: "success-gradient"
    }
  ];

  return (
    <section id="portfolio" className="py-24 lg:py-32 bg-gradient-to-br from-neutral-50 via-accent-50/20 to-primary-50/30 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <motion.div
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.3, 0.1]
          }}
          transition={{ 
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-0 right-0 w-96 h-96 bg-primary-300/10 rounded-full blur-3xl"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            viewport={{ once: true }}
            className="inline-flex items-center px-4 py-2 bg-glass-warm backdrop-blur-xl border border-primary-200/30 rounded-full text-sm font-medium text-primary-700 mb-8"
          >
            <Eye size={16} className="mr-2" />
            Our Work
          </motion.div>

          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-neutral-800 mb-8 tracking-tight leading-tight">
            Featured
            <span className="block bg-warm-gradient bg-clip-text text-transparent">Projects</span>
          </h2>
          
          <p className="text-xl lg:text-2xl text-neutral-600 max-w-4xl mx-auto leading-relaxed font-light mb-12">
            A selection of our recent work that showcases our commitment to excellence 
            and innovation in software development.
          </p>

          <Link to="/portfolio">
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="group text-neutral-600 hover:text-primary-600 font-medium px-6 py-3 
                       transition-colors duration-300 text-lg flex items-center gap-2 mx-auto
                       bg-glass-warm backdrop-blur-xl border border-primary-200/30 rounded-lg hover:border-primary-300/40"
            >
              View All Projects
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform duration-300" />
            </motion.button>
          </Link>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="group cursor-pointer"
            >
              <motion.div
                whileHover={{ y: -12, scale: 1.02 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="h-full flex flex-col bg-glass-warm backdrop-blur-xl border border-primary-200/30 rounded-2xl overflow-hidden hover:bg-primary-100/50 hover:border-primary-300/40 hover:shadow-warm transition-all duration-300"
              >
                <div className="relative overflow-hidden aspect-[4/3]">
                  <motion.img 
                    src={project.image} 
                    alt={project.title}
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  {/* Hover Actions */}
                  <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="bg-glass-warm backdrop-blur-xl p-2 rounded-lg shadow-soft border border-primary-200/30 hover:bg-primary-100/50 transition-all duration-200"
                    >
                      <ExternalLink size={16} className="text-primary-600" />
                    </motion.div>
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="bg-glass-warm backdrop-blur-xl p-2 rounded-lg shadow-soft border border-primary-200/30 hover:bg-primary-100/50 transition-all duration-200"
                    >
                      <Github size={16} className="text-primary-600" />
                    </motion.div>
                  </div>

                  {/* Category Badge */}
                  <div className="absolute bottom-4 left-4">
                    <span className={`px-3 py-1 text-xs font-medium rounded-full backdrop-blur-xl border
                      bg-${project.gradient} text-white border-primary-300/30`}>
                      {project.category}
                    </span>
                  </div>
                </div>
                
                <div className="p-8 space-y-4 flex-grow flex flex-col">
                  <h3 className="text-2xl font-semibold text-neutral-800 group-hover:text-primary-600 transition-colors duration-300">
                    {project.title}
                  </h3>
                  
                  <p className="text-neutral-600 leading-relaxed flex-grow">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 pt-2">
                    {project.tags.map((tag) => (
                      <span 
                        key={tag}
                        className="text-xs px-3 py-1 bg-primary-100/50 backdrop-blur-xl text-neutral-600 rounded-full hover:bg-primary-200/50 hover:text-primary-700 transition-colors duration-200 border border-primary-200/30"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;