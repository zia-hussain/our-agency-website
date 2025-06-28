import React from 'react';
import { Star, Quote } from 'lucide-react';
import { motion } from 'framer-motion';

const Testimonials: React.FC = () => {
  const testimonials = [
    {
      quote: "Zumetrix Labs transformed our vision into a sophisticated platform that exceeded our expectations. Their attention to detail and technical expertise are unmatched in the industry.",
      author: "Sarah Chen",
      title: "CEO, TechFlow Solutions",
      company: "TechFlow",
      avatar: "https://images.pexels.com/photos/762020/pexels-photo-762020.jpeg?auto=compress&cs=tinysrgb&w=150",
      rating: 5
    },
    {
      quote: "Working with Zumetrix Labs was a game-changer for our startup. They delivered a world-class mobile application that helped us secure Series A funding within months.",
      author: "Marcus Rodriguez",
      title: "Founder, WellnessPath",
      company: "WellnessPath",
      avatar: "https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=150",
      rating: 5
    },
    {
      quote: "The team's expertise in both design and development created a solution that not only works flawlessly but also delights our users every single day. Exceptional work.",
      author: "Emily Foster",
      title: "CTO, RetailOps",
      company: "RetailOps",
      avatar: "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=150",
      rating: 5
    }
  ];

  const clients = [
    "TechFlow", "WellnessPath", "RetailOps", "DataSync", "CloudWorks", "FinanceFlow"
  ];

  return (
    <section className="py-24 lg:py-32 bg-gradient-to-br from-primary-50/30 via-neutral-50 to-accent-50/20 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0"
          style={{
            backgroundImage: `conic-gradient(from 0deg, transparent, #C17B5C, transparent)`,
            backgroundSize: '200px 200px'
          }}
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
            <Star size={16} className="mr-2" />
            Client Stories
          </motion.div>

          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-neutral-800 mb-8 tracking-tight leading-tight">
            What Our
            <span className="block bg-warm-gradient bg-clip-text text-transparent">Clients Say</span>
          </h2>
          
          <p className="text-xl lg:text-2xl text-neutral-600 max-w-4xl mx-auto leading-relaxed font-light">
            Don't just take our word for it. Here's what our clients say about 
            working with Zumetrix Labs and the results we've delivered together.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8 mb-20">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.author}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="group"
            >
              <motion.div
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ duration: 0.3 }}
                className="bg-glass-warm backdrop-blur-xl p-8 rounded-2xl transition-all duration-300 border border-primary-200/30 hover:border-primary-300/40 h-full flex flex-col hover:bg-primary-100/50 hover:shadow-warm"
              >
                {/* Quote Icon */}
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="w-12 h-12 bg-warm-gradient rounded-full flex items-center justify-center mb-6"
                >
                  <Quote size={20} className="text-white" />
                </motion.div>

                {/* Rating */}
                <div className="flex mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: index * 0.1 + i * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <Star size={16} className="text-primary-500 fill-current" />
                    </motion.div>
                  ))}
                </div>
                
                <blockquote className="text-neutral-600 leading-relaxed mb-8 italic flex-grow text-lg">
                  "{testimonial.quote}"
                </blockquote>
                
                <div className="flex items-center">
                  <motion.img 
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                    src={testimonial.avatar} 
                    alt={testimonial.author}
                    className="w-14 h-14 rounded-full object-cover mr-4 border-2 border-primary-200/30"
                  />
                  <div>
                    <div className="font-semibold text-neutral-800 text-lg">
                      {testimonial.author}
                    </div>
                    <div className="text-sm text-neutral-600">
                      {testimonial.title}
                    </div>
                    <div className="text-xs text-primary-600 font-medium">
                      {testimonial.company}
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Client Logos */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h3 className="text-xl font-semibold text-neutral-800 mb-12">Trusted by Leading Companies</h3>
          <div className="flex flex-wrap justify-center items-center gap-12 opacity-60">
            {clients.map((client, index) => (
              <motion.div 
                key={client}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 0.6, y: 0 }}
                whileHover={{ opacity: 1, scale: 1.1 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-neutral-600 font-medium text-lg hover:text-primary-600 transition-colors duration-300 cursor-pointer bg-glass-warm backdrop-blur-xl px-6 py-3 rounded-lg border border-primary-200/30 hover:border-primary-300/40"
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