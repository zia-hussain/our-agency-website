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
        gaTagId="G-PRSP59FL20"
        googleVerification="XbgNbYnq2H0qTIfTCwVFlXrYWHnnvw0acGCUjdlI_Cs"
        title="About Us - Zumetrix Labs | Zia Hussain & Umer Gillani"
        description="Meet the founders of Zumetrix Labs - Zia Hussain and Umer Gillani. Learn about our mission, values, and commitment to building exceptional software."
        keywords="Zia Hussain, Umer Gillani, Zumetrix Labs founders, software development team, web development experts Pakistan"
        url="https://zumetrixlabs.com/about"
      />

      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-primary-50 via-neutral-50 to-accent-50/30 relative overflow-hidden">
        <div className="absolute inset-0">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
            className="absolute top-1/4 right-1/4 w-64 h-64 border border-primary-200/20 rounded-full"
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <AnimatedSection className="text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center px-4 py-2 bg-glass-warm backdrop-blur-xl border border-primary-200/30 rounded-full text-sm font-medium text-primary-700 mb-8"
            >
              Our Story
            </motion.div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-neutral-800 mb-8 tracking-tight leading-tight">
              Built on
              <span className="block bg-warm-gradient bg-clip-text text-transparent">Vision & Values</span>
            </h1>

            <p className="text-xl lg:text-2xl text-neutral-600 max-w-4xl mx-auto leading-relaxed font-light">
              Zumetrix Labs was founded with a simple yet powerful vision: to
              create software that doesn't just function—it inspires,
              transforms, and drives real business results.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Founders Section */}
      <section className="py-24 bg-gradient-to-br from-neutral-50 via-primary-50/30 to-accent-50/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-bold text-neutral-800 mb-6 tracking-tight">
              Meet the
              <span className="block bg-warm-gradient bg-clip-text text-transparent">Founders</span>
            </h2>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto leading-relaxed font-light">
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
                  className="bg-glass-warm backdrop-blur-xl border border-primary-200/30 rounded-lg p-8 hover:border-primary-300/40 hover:shadow-warm transition-all duration-300"
                >
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                    className="w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden border-4 border-primary-200/30 group-hover:border-primary-300/50 transition-colors duration-300"
                  >
                    <img
                      src={founder.image}
                      alt={founder.name}
                      className="w-full h-full object-cover"
                    />
                  </motion.div>

                  <h3 className="text-2xl font-bold text-neutral-800 mb-2 group-hover:text-primary-600 transition-colors duration-300">
                    {founder.name}
                  </h3>

                  <p className="text-primary-600 font-medium mb-4">
                    {founder.role}
                  </p>

                  <p className="text-neutral-600 leading-relaxed mb-6">
                    {founder.bio}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {founder.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1 bg-primary-100/50 text-primary-700 text-sm rounded-full hover:bg-primary-200/50 transition-colors duration-200"
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
      <section className="py-24 bg-gradient-to-br from-neutral-800 via-neutral-900 to-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-bold text-neutral-100 mb-6 tracking-tight">
              Our
              <span className="block bg-warm-gradient bg-clip-text text-transparent">Core Values</span>
            </h2>
            <p className="text-xl text-neutral-400 max-w-3xl mx-auto leading-relaxed font-light">
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
                  className="bg-glass-warm backdrop-blur-xl p-8 rounded-lg hover:bg-primary-100/10 
                           transition-all duration-300 border border-primary-200/10 hover:border-primary-300/20 h-full"
                >
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.3 }}
                    className="inline-flex items-center justify-center w-16 h-16 bg-warm-gradient rounded-xl mb-6 group-hover:shadow-warm transition-all duration-300"
                  >
                    <value.icon size={28} className="text-white" />
                  </motion.div>

                  <h3 className="text-xl font-semibold text-neutral-100 mb-4 group-hover:text-primary-400 transition-colors duration-300">
                    {value.title}
                  </h3>

                  <p className="text-neutral-400 leading-relaxed">
                    {value.description}
                  </p>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-24 bg-gradient-to-br from-primary-50 via-neutral-50 to-accent-50/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center">
            <h2 className="text-3xl md:text-5xl font-bold text-neutral-800 mb-8 tracking-tight">
              Our
              <span className="block bg-warm-gradient bg-clip-text text-transparent">Mission</span>
            </h2>

            <div className="max-w-4xl mx-auto">
              <p className="text-xl lg:text-2xl text-neutral-600 leading-relaxed font-light mb-8">
                To empower businesses with exceptional software that drives
                growth, enhances user experiences, and creates lasting
                competitive advantages in an increasingly digital world.
              </p>

              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
                className="bg-glass-warm backdrop-blur-xl border border-primary-200/30 rounded-lg p-8 hover:border-primary-300/40 transition-all duration-300"
              >
                <p className="text-lg text-neutral-600 leading-relaxed italic">
                  "We believe that great software is more than just code—it's a
                  bridge between human needs and technological possibilities.
                  Every project we undertake is an opportunity to create
                  something meaningful, something that makes a real difference
                  in people's lives and businesses."
                </p>
                <div className="mt-6 text-primary-600 font-medium">
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