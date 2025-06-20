import React, { useEffect, useRef, useState } from 'react';
import { Star } from 'lucide-react';

const Testimonials: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const testimonials = [
    {
      quote: "Zumetrix Labs transformed our vision into a sophisticated platform that exceeded our expectations. Their attention to detail and technical expertise are unmatched.",
      author: "Sarah Chen",
      title: "CEO, TechFlow Solutions",
      company: "TechFlow",
      avatar: "https://images.pexels.com/photos/762020/pexels-photo-762020.jpeg?auto=compress&cs=tinysrgb&w=150"
    },
    {
      quote: "Working with Zumetrix Labs was a game-changer for our startup. They delivered a world-class mobile application that helped us secure Series A funding.",
      author: "Marcus Rodriguez",
      title: "Founder, WellnessPath",
      company: "WellnessPath",
      avatar: "https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=150"
    },
    {
      quote: "The team's expertise in both design and development created a solution that not only works flawlessly but also delights our users every day.",
      author: "Emily Foster",
      title: "CTO, RetailOps",
      company: "RetailOps",
      avatar: "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=150"
    }
  ];

  const clients = [
    "TechFlow", "WellnessPath", "RetailOps", "DataSync", "CloudWorks", "FinanceFlow"
  ];

  return (
    <section 
      id="testimonials" 
      ref={sectionRef}
      className="py-24 lg:py-32 bg-charcoal"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-bold text-cream mb-6 tracking-tight">
              Client Success Stories
            </h2>
            <p className="text-xl text-stone-light max-w-3xl mx-auto leading-relaxed font-light">
              Don't just take our word for it. Here's what our clients say about 
              working with Zumetrix Labs.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 mb-16">
            {testimonials.map((testimonial, index) => (
              <div 
                key={testimonial.author}
                className={`bg-charcoal-light p-8 rounded-sm transition-all duration-700 ${
                  isVisible 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} className="text-terracotta fill-current" />
                  ))}
                </div>
                
                <blockquote className="text-stone-light leading-relaxed mb-6 italic">
                  "{testimonial.quote}"
                </blockquote>
                
                <div className="flex items-center">
                  <img 
                    src={testimonial.avatar} 
                    alt={testimonial.author}
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <div className="font-semibold text-cream">
                      {testimonial.author}
                    </div>
                    <div className="text-sm text-stone">
                      {testimonial.title}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <h3 className="text-lg font-semibold text-cream mb-8">Trusted by Leading Companies</h3>
            <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
              {clients.map((client, index) => (
                <div 
                  key={client}
                  className={`text-stone-light font-medium transition-all duration-500 ${
                    isVisible 
                      ? 'opacity-60 translate-y-0' 
                      : 'opacity-0 translate-y-4'
                  }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  {client}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;