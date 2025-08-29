import React from "react";
import SEO from "../components/common/SEO";
import PageTransition from "../components/common/PageTransition";
import AnimatedSection from "../components/common/AnimatedSection";
import { motion, AnimatePresence } from "framer-motion";
import { Users, Target, Award, Globe, Code, Heart, Plus } from "lucide-react";

const AboutPage: React.FC = () => {
  const [openFAQ, setOpenFAQ] = React.useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  const aboutFAQs = [
    {
      question: "Who are Zia Hussain and Syed Omer Shah?",
      answer: "Zia Hussain (CEO) and Syed Omer Shah (CTO) are expert software developers and the co-founders of Zumetrix Labs. With combined 6+ years of experience in modern web development, they specialize in React/Node.js development, SaaS MVP building, AI automation, and enterprise software solutions. They personally oversee all client projects to ensure exceptional quality and results."
    },
    {
      question: "What makes Zumetrix Labs different from other development agencies?",
      answer: "Zumetrix Labs is founder-led, meaning Zia and Omer are directly involved in every project. As expert developers themselves, they bring hands-on technical expertise rather than just project management. They specialize in modern technologies like React, TypeScript, Node.js, and AI automation, serving international clients with world-class quality standards."
    },
    {
      question: "Which countries and markets do you serve?",
      answer: "We serve international clients across the United States, United Kingdom, Canada, Australia, UAE, Singapore, and worldwide. Our founders understand global market requirements and international business standards, making us ideal partners for ambitious tech projects regardless of location."
    },
    {
      question: "What types of projects do Zia and Omer specialize in?",
      answer: "Our founders specialize in SaaS MVP development, React/TypeScript applications, Node.js backend systems, mobile app development, AI automation workflows, and enterprise software solutions. They're particularly skilled at helping startups build their first products and enterprises scale their existing systems."
    },
    {
      question: "How experienced are the founders in software development?",
      answer: "Zia Hussain brings expertise in full-stack development, business strategy, and client success, while Syed Omer Shah specializes in scalable architecture, modern web stacks, and AI automation. Together, they've delivered 50+ successful projects and maintain a 100% client satisfaction rate with their hands-on approach."
    }
  ];

  const founders = [
    {
      name: "Syed Zia Hussain Shah",
      role: "Co-Founder · Product & Growth",
      bio: "Zia is the visionary mind behind Zumetrix Labs. As the bridge between strategy, clients, and execution, he leads product direction, client success, and growth. With a strong background in full-stack development and a sharp instinct for business, Zia ensures every solution isn't just built well — it solves the right problem, beautifully.",
      image: "/zia-hussain-founder.png",
      skills: [
        "Strategy",
        "Client Acquisition",
        "React",
        "Node.js",
        "Growth Systems",
      ],
    },
    {
      name: "Syed Omer Shah",
      role: "Co-Founder · Engineering & Automation",
      bio: "Umer is the technical backbone of Zumetrix Labs. A focused engineering leader with deep expertise in scalable architecture, modern web stacks, and emerging AI automation, he turns complex ideas into fast, clean, production-ready systems. Currently diving deeper into intelligent automation and AI workflows to help clients stay ahead of the curve.",
      image: "/syed-omer-shah-founder.png",
      skills: ["Next.js", "TypeScript", "Firebase", "Python", "AI Automation"],
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
        title="Meet Zia Hussain & Syed Omer Shah | Expert Software Developers & Zumetrix Labs Founders"
        description="Meet Zia Hussain (CEO) and Syed Omer Shah (CTO), expert software developers and founders of Zumetrix Labs. Leading React/Node.js developers, SaaS MVP builders, and AI automation experts serving international clients in US, UK, Canada, Australia, UAE, and worldwide. Hire top software development talent for your startup or enterprise project."
        keywords="Zia Hussain software developer, Syed Omer Shah developer, React Node.js experts, SaaS MVP developers, AI automation specialists, hire software developers, startup CTO services, enterprise software consultants, international software team, remote development team, expert full stack developers, software development founders"
        url="https://zumetrix.com/about"
      />

      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-background relative overflow-hidden">
        <div className="absolute inset-0">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
            className="absolute top-1/4 right-1/4 w-64 h-64 border border-primary/10 rounded-full"
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <AnimatedSection className="text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="inline-flex items-center px-4 py-2 bg-card/50 backdrop-blur-xl border border-border rounded-full text-sm font-medium text-primary mb-8"
            >
              Our Story
            </motion.div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-foreground mb-8 tracking-tight leading-tight">
              Built on
              <span className="block bg-shimmer bg-clip-text text-transparent pb-4 leading-[1.1]">
                Vision & Values
              </span>
            </h1>

            {/* ✅ SEO RICH CONTENT */}
            <div className="max-w-4xl mx-auto">
              <p className="text-xl lg:text-2xl text-muted-foreground leading-relaxed font-light mb-6">
                <strong>Zia Hussain</strong> and <strong>Syed Omer Shah</strong> are expert software developers and the visionary founders behind <strong>Zumetrix Labs</strong>. With combined expertise in React/Node.js development, SaaS MVP building, AI automation, and enterprise software solutions, they've helped 50+ international clients transform their business ideas into successful digital products.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Founded in 2021, <strong>Zumetrix Labs</strong> serves international clients across the <strong>United States, United Kingdom, Canada, Australia, UAE, Singapore</strong>, and worldwide. Our founder-led approach ensures every <strong>SaaS MVP</strong>, <strong>React application</strong>, <strong>mobile app</strong>, and <strong>AI automation project</strong> receives expert attention from experienced software developers who understand global market requirements.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ✅ KEYWORD-RICH INTRO SECTION */}
      <section className="py-16 bg-card/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Pakistan's Premier Software Development Agency
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                <strong>Zia Hussain (CEO)</strong> and <strong>Syed Omer Shah (CTO)</strong> bring deep expertise in modern software development to every project. As hands-on founders, they personally oversee all client work, ensuring exceptional quality and results. Their combined experience spans <strong>React/TypeScript development</strong>, <strong>Node.js backend architecture</strong>, <strong>Firebase integration</strong>, <strong>AI automation workflows</strong>, and <strong>startup MVP development</strong>.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Serving international markets including the <strong>United States, United Kingdom, European Union, Canada, Australia, UAE, and Singapore</strong>, Zumetrix Labs has delivered <strong>50+ successful projects</strong> ranging from early-stage startup MVPs to enterprise-scale applications. Our founders' expertise in <strong>modern JavaScript frameworks</strong>, <strong>cloud architecture</strong>, and <strong>business automation</strong> makes them ideal partners for ambitious tech projects.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Whether you're a startup founder looking to <strong>build your first SaaS MVP</strong>, an enterprise needing <strong>custom software solutions</strong>, or a business seeking <strong>AI automation services</strong>, Zia and Omer provide the technical leadership and development expertise to bring your vision to life with world-class quality and international standards.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-card/50 backdrop-blur-xl p-6 rounded-lg border border-border">
                <div className="text-3xl font-bold text-primary mb-2">50+</div>
                <div className="text-sm text-muted-foreground">
                  Successful Projects Delivered
                </div>
              </div>
              <div className="bg-card/50 backdrop-blur-xl p-6 rounded-lg border border-border">
                <div className="text-3xl font-bold text-primary mb-2">25+</div>
                <div className="text-sm text-muted-foreground">
                  Happy Clients Worldwide
                </div>
              </div>
              <div className="bg-card/50 backdrop-blur-xl p-6 rounded-lg border border-border">
                <div className="text-3xl font-bold text-primary mb-2">3+</div>
                <div className="text-sm text-muted-foreground">
                  Years of Excellence
                </div>
              </div>
              <div className="bg-card/50 backdrop-blur-xl p-6 rounded-lg border border-border">
                <div className="text-3xl font-bold text-primary mb-2">100%</div>
                <div className="text-sm text-muted-foreground">
                  Client Satisfaction Rate
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Founders Section */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-bold text-foreground mb-6 tracking-tight">
              Meet the
              <span className=" block bg-shimmer bg-clip-text text-transparent pb-4 leading-[1.1]">
                Expert Founders
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed font-light">
              <strong>Zia Hussain</strong> and <strong>Syed Omer Shah</strong>{" "}
              are the expert developers and visionary founders behind Zumetrix
              Labs. With combined 6+ years of experience in modern software
              development, they lead Pakistan's most innovative software
              development agency.
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 gap-12 lg:gap-16">
            {founders.map((founder, index) => (
              <AnimatedSection
                key={founder.name}
                delay={index * 0.1}
                className="group"
              >
                <motion.div
                  whileHover={{ y: -8, scale: 1.02 }}
                  transition={{ duration: 0.15 }}
                  className="bg-card/50 backdrop-blur-xl border border-border rounded-lg p-8 hover:border-primary/30 hover:shadow-card-hover "
                >
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.15 }}
                    className="w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden border-4 border-border group-hover:border-primary/50 transition-colors duration-150"
                  >
                    <img
                      src={founder.image}
                      alt={founder.name}
                      className="w-full h-full object-cover"
                    />
                  </motion.div>

                  <h3 className="text-2xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors duration-150">
                    {founder.name}
                  </h3>

                  <p className="text-primary font-medium mb-4">
                    {founder.role}
                  </p>

                  <p className="text-muted-foreground leading-relaxed mb-6">
                    {founder.bio}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {founder.skills.map((skill) => (
                      <motion.span
                        key={skill}
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.15 }}
                        className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full hover:bg-primary/20 transition-colors duration-150 cursor-pointer"
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-20">
            <h2 className="text-5xl md:text-7xl font-bold text-foreground mb-6 tracking-tight">
              Our
              <span className="block bg-shimmer bg-clip-text text-transparent pb-4 leading-[1.1]">
                Core Values
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed font-light">
              These principles guide every decision we make and every line of
              code we write.
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <AnimatedSection
                key={value.title}
                delay={index * 0.05}
                className="group"
              >
                <motion.div
                  whileHover={{ y: -8, scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                  className="bg-card/50 backdrop-blur-xl p-8 rounded-lg  border border-border hover:border-primary/30 h-full hover:shadow-card-hover"
                >
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.15 }}
                    className="inline-flex items-center justify-center w-16 h-16 bg-beige-gradient rounded-xl mb-6 group-hover:shadow-glow "
                  >
                    <value.icon size={28} className="text-primary-foreground" />
                  </motion.div>

                  <h3 className="text-xl font-semibold text-foreground mb-4 group-hover:text-primary transition-colors duration-150">
                    {value.title}
                  </h3>

                  <p className="text-muted-foreground leading-relaxed">
                    {value.description}
                  </p>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center">
            <h2 className="text-5xl md:text-7xl font-bold text-foreground mb-8 tracking-tight">
              Our
              <span className="block bg-shimmer bg-clip-text text-transparent pb-4 leading-[1.1]">
                Mission
              </span>
            </h2>

            <div className="max-w-4xl mx-auto">
              <p className="text-xl lg:text-2xl text-muted-foreground leading-relaxed font-light mb-8">
                To empower businesses with exceptional software that drives
                growth, enhances user experiences, and creates lasting
                competitive advantages in an increasingly digital world.
              </p>

              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.15 }}
                className="bg-card/50 backdrop-blur-xl border border-border rounded-lg p-8 hover:border-primary/30 "
              >
                <p className="text-lg text-muted-foreground leading-relaxed italic">
                  "We believe that great software is more than just code—it's a
                  bridge between human needs and technological possibilities.
                  Every project we undertake is an opportunity to create
                  something meaningful, something that makes a real difference
                  in people's lives and businesses."
                </p>
                <div className="mt-6 text-primary font-medium">
                  — Syed Zia Hussain Shah & Syed Omer Shah, Co-Founders
                </div>
              </motion.div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-card/20 border-t border-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold text-foreground mb-6 tracking-tight">
              About Our
              <span className="block bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                Founders
              </span>
            </h2>
            <p className="text-xl text-muted-foreground leading-relaxed font-light">
              Common questions about Zia Hussain, Syed Omer Shah, and Zumetrix Labs
            </p>
          </AnimatedSection>

          <div className="space-y-4">
            {aboutFAQs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="bg-card/50 backdrop-blur-xl border border-border rounded-lg overflow-hidden hover:border-primary/30 transition-all duration-150"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-6 py-6 text-left flex items-center justify-between hover:bg-card/70 transition-all duration-150"
                >
                  <h3 className="text-lg font-semibold text-foreground pr-4">
                    {faq.question}
                  </h3>
                  <motion.div
                    animate={{ rotate: openFAQ === index ? 45 : 0 }}
                    transition={{ duration: 0.15 }}
                    className="flex-shrink-0"
                  >
                    <Plus size={20} className="text-primary" />
                  </motion.div>
                </button>

                <AnimatePresence>
                  {openFAQ === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.15 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6">
                        <p className="text-[#DBDBDB] leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </PageTransition>
  );
};

export default AboutPage;
