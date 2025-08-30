import React, { useRef } from "react";
import { Star, Quote } from "lucide-react";
import { motion, useInView } from "framer-motion";

const Testimonials: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const testimonials = [
    {
      quote:
        "Zumetrix Labs delivered exactly what we envisioned and more. The AI integration is seamless, the user experience is fantastic, and the code quality is exceptional. Looking forward to Phase 2 expansion!",
      author: "Kelly Andrews",
      title: "Founder, Best Business Services",
      company: "Ifyify",
      avatar:
        "https://images.pexels.com/photos/762020/pexels-photo-762020.jpeg?auto=compress&cs=tinysrgb&w=150",
      rating: 5,
      project: "AI-Powered Personal Branding Tool"
    },
    {
      quote:
        "The team at Zumetrix Labs created an amazing wellness app that our users absolutely love. The AI insights feature is particularly impressive and has become our key differentiator in the market.",
      author: "Sarah Johnson",
      title: "CEO, WellnessPath",
      company: "WellnessTracker",
      avatar:
        "https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=150",
      rating: 5,
      project: "Health & Fitness Mobile App"
    },
    {
      quote:
        "Zumetrix Labs completely transformed our entire operation. The automation platform they built has saved us hundreds of hours monthly and significantly reduced errors while allowing us to scale confidently.",
      author: "James Mitchell",
      title: "Operations Director, RetailOps",
      company: "RetailOps",
      avatar:
        "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=150",
      rating: 5,
      project: "Enterprise E-commerce Automation"
    },
  ];

  const clients = [
    "Best Business Services",
    "WellnessPath",
    "RetailOps Enterprise",
    "TaskFlow Startup",
    "EduTech Institute",
    "LogiCorp Solutions",
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
      className="py-24 lg:py-32 bg-background relative overflow-hidden"
      ref={ref}
    >
      {/* Background Pattern */}
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
            <Star size={16} className="mr-2" />
            Client Success Stories
          </motion.div>

          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-8 tracking-tight leading-tight">
            What Our Global
            <span className="block bg-shimmer bg-clip-text text-transparent pb-4 leading-[1.1]">
              Clients Say
            </span>
          </h2>

          <p className="text-xl lg:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed font-light">
            Don't just take our word for it. Here's what our international clients from the United States, Canada, United Kingdom, UAE, Singapore, and Australia say about working with Zumetrix Labs and the exceptional results we've delivered together.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid lg:grid-cols-3 gap-8 mb-20"
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.author}
              variants={cardVariants}
              whileHover={{
                y: -8,
                scale: 1.02,
                transition: { duration: 0.15 },
              }}
              className="group"
            >
              <div className="bg-card/50 backdrop-blur-xl p-8 rounded-2xl border border-border hover:border-primary/30 h-full flex flex-col group-hover:bg-card/70 group-hover:shadow-card-hover transition-all duration-150">
                {/* Quote Icon */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={isInView ? { scale: 1 } : { scale: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="w-12 h-12 bg-gradient-to-br from-primary/20 to-primary/30 border border-primary/30 rounded-full flex items-center justify-center mb-6"
                >
                  <Quote size={20} className="text-primary" />
                </motion.div>

                {/* Rating */}
                <div className="flex mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={
                        isInView
                          ? { opacity: 1, scale: 1 }
                          : { opacity: 0, scale: 0 }
                      }
                      transition={{
                        duration: 0.2,
                        delay: index * 0.1 + i * 0.05,
                      }}
                    >
                      <Star size={16} className="text-primary fill-current" />
                    </motion.div>
                  ))}
                </div>

                <blockquote className="text-muted-foreground leading-relaxed mb-8 italic flex-grow text-lg">
                  "{testimonial.quote}"
                </blockquote>

                <div className="border-t border-border pt-6">
                  <div className="flex items-center">
                    <motion.img
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.15 }}
                      src={testimonial.avatar}
                      alt={testimonial.author}
                      className="w-14 h-14 rounded-full object-cover mr-4 border-2 border-border"
                    />
                    <div>
                      <div className="font-semibold text-foreground text-lg">
                        {testimonial.author}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {testimonial.title}
                      </div>
                      <div className="text-xs text-primary font-medium">
                        {testimonial.company} • {testimonial.project}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Client Logos */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.4 }}
          className="text-center"
        >
          <h3 className="text-xl font-semibold text-foreground mb-12">
            Trusted by Leading International Companies
          </h3>
          <div className="flex flex-wrap justify-center items-center gap-12 opacity-60">
            {clients.map((client, index) => (
              <motion.div
                key={client}
                initial={{ opacity: 0, y: 20 }}
                animate={
                  isInView ? { opacity: 0.6, y: 0 } : { opacity: 0, y: 20 }
                }
                whileHover={{ opacity: 1, scale: 1.1 }}
                transition={{ duration: 0.15, delay: index * 0.05 }}
                className="text-muted-foreground font-medium text-lg hover:text-primary transition-colors duration-150 cursor-pointer bg-card/30 backdrop-blur-xl px-6 py-3 rounded-lg border border-border hover:border-primary/30"
              >
                {client}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;