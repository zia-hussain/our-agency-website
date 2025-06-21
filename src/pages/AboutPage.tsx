import React from "react";
import SEO from "../components/common/SEO";
import PageTransition from "../components/common/PageTransition";
import AnimatedSection from "../components/common/AnimatedSection";
import { motion } from "framer-motion";
import { Users, Target, Award, Globe, Code, Heart } from "lucide-react";

const AboutPage: React.FC = () => {
  const founders = [
    {
      name: "Zia Hussain",
      role: "Co-Founder & Lead Developer",
      bio: "Full-stack developer with 5+ years of experience building scalable web applications. Passionate about clean code and user-centric design.",
      image:
        "https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=400",
      skills: ["React", "Node.js", "TypeScript", "AWS"],
    },
    {
      name: "Umer Gillani",
      role: "Co-Founder & Technical Architect",
      bio: "Systems architect and backend specialist with expertise in building robust, high-performance applications that scale with business growth.",
      image:
        "https://images.pexels.com/photos/762020/pexels-photo-762020.jpeg?auto=compress&cs=tinysrgb&w=400",
      skills: ["Python", "PostgreSQL", "Docker", "Microservices"],
    },
  ];

  const values = [
    {
      icon: Target,
      title: "Precision",
      description:
        "Every line of code, every pixel, every interaction is crafted with meticulous attention to detail and purpose.",
    },
    {
      icon: Users,
      title: "Partnership",
      description:
        "We work alongside you as true partners, not just vendors, to achieve your business objectives and vision.",
    },
    {
      icon: Award,
      title: "Excellence",
      description:
        "We set the highest standards for ourselves and deliver solutions that exceed expectations every time.",
    },
    {
      icon: Globe,
      title: "Innovation",
      description:
        "We leverage cutting-edge technologies and methodologies to build solutions that give you a competitive advantage.",
    },
    {
      icon: Code,
      title: "Quality",
      description:
        "Clean, maintainable, and scalable code is at the heart of everything we build for long-term success.",
    },
    {
      icon: Heart,
      title: "Passion",
      description:
        "We genuinely love what we do, and that passion shows in the quality and care we put into every project.",
    },
  ];

  return (
    <PageTransition>
      <SEO
        title="About Us - Zumetrix Labs | Zia Hussain & Umer Gillani"
        description="Meet the founders of Zumetrix Labs - Zia Hussain and Umer Gillani. Learn about our mission, values, and commitment to building exceptional software."
        keywords="Zia Hussain, Umer Gillani, Zumetrix Labs founders, software development team, web development experts Pakistan"
        url="https://zumetrixlabs.com/about"
      />

      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-cream via-cream to-sage/5 relative overflow-hidden">
        <div className="absolute inset-0">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
            className="absolute top-1/4 right-1/4 w-64 h-64 border border-terracotta/10 rounded-full"
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <AnimatedSection className="text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center px-4 py-2 bg-sage/10 border border-sage/20 rounded-full text-sm font-medium text-sage-dark mb-8"
            >
              Our Story
            </motion.div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-charcoal mb-8 tracking-tight leading-tight">
              Built on
              <span className="block text-sage">Vision & Values</span>
            </h1>

            <p className="text-xl lg:text-2xl text-stone max-w-4xl mx-auto leading-relaxed font-light">
              Zumetrix Labs was founded with a simple yet powerful vision: to
              create software that doesn't just function—it inspires,
              transforms, and drives real business results.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Founders Section */}
      <section className="py-24 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-bold text-charcoal mb-6 tracking-tight">
              Meet the
              <span className="block text-terracotta">Founders</span>
            </h2>
            <p className="text-xl text-stone max-w-3xl mx-auto leading-relaxed font-light">
              Two passionate developers united by a shared vision of creating
              exceptional software experiences.
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 gap-12 lg:gap-16">
            {founders.map((founder, index) => (
              <AnimatedSection
                key={founder.name}
                delay={index * 0.2}
                className="group"
              >
                <motion.div
                  whileHover={{ y: -8 }}
                  transition={{ duration: 0.3 }}
                  className="bg-cream border border-stone/10 rounded-lg p-8 hover:border-sage/30 hover:shadow-xl transition-all duration-300"
                >
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                    className="w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden border-4 border-sage/20 group-hover:border-sage/40 transition-colors duration-300"
                  >
                    <img
                      src={founder.image}
                      alt={founder.name}
                      className="w-full h-full object-cover"
                    />
                  </motion.div>

                  <h3 className="text-2xl font-bold text-charcoal mb-2 group-hover:text-sage transition-colors duration-300">
                    {founder.name}
                  </h3>

                  <p className="text-terracotta font-medium mb-4">
                    {founder.role}
                  </p>

                  <p className="text-stone leading-relaxed mb-6">
                    {founder.bio}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {founder.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1 bg-sage/10 text-sage-dark text-sm rounded-full hover:bg-sage/20 transition-colors duration-200"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 bg-charcoal">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-bold text-cream mb-6 tracking-tight">
              Our
              <span className="block text-terracotta">Core Values</span>
            </h2>
            <p className="text-xl text-stone-light max-w-3xl mx-auto leading-relaxed font-light">
              These principles guide every decision we make and every line of
              code we write.
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <AnimatedSection
                key={value.title}
                delay={index * 0.1}
                className="group"
              >
                <motion.div
                  whileHover={{ y: -8, scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                  className="bg-charcoal-light p-8 rounded-lg hover:bg-charcoal-lighter 
                           transition-all duration-500 border border-stone/10 hover:border-terracotta/30 h-full"
                >
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.3 }}
                    className="inline-flex items-center justify-center w-16 h-16 bg-terracotta/20 rounded-xl mb-6 group-hover:bg-terracotta/30 transition-colors duration-300"
                  >
                    <value.icon size={28} className="text-terracotta" />
                  </motion.div>

                  <h3 className="text-xl font-semibold text-cream mb-4 group-hover:text-terracotta transition-colors duration-300">
                    {value.title}
                  </h3>

                  <p className="text-stone-light leading-relaxed">
                    {value.description}
                  </p>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-24 bg-gradient-to-br from-cream via-cream to-terracotta/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center">
            <h2 className="text-3xl md:text-5xl font-bold text-charcoal mb-8 tracking-tight">
              Our
              <span className="block text-terracotta">Mission</span>
            </h2>

            <div className="max-w-4xl mx-auto">
              <p className="text-xl lg:text-2xl text-stone leading-relaxed font-light mb-8">
                To empower businesses with exceptional software that drives
                growth, enhances user experiences, and creates lasting
                competitive advantages in an increasingly digital world.
              </p>

              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
                className="bg-cream/50 backdrop-blur-sm border border-stone/10 rounded-lg p-8 hover:border-terracotta/30 transition-all duration-300"
              >
                <p className="text-lg text-stone leading-relaxed italic">
                  "We believe that great software is more than just code—it's a
                  bridge between human needs and technological possibilities.
                  Every project we undertake is an opportunity to create
                  something meaningful, something that makes a real difference
                  in people's lives and businesses."
                </p>
                <div className="mt-6 text-terracotta font-medium">
                  — Zia Hussain & Umer Gillani, Co-Founders
                </div>
              </motion.div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </PageTransition>
  );
};

export default AboutPage;
