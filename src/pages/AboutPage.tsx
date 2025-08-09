import React from "react";
import SEO from "../components/common/SEO";
import PageTransition from "../components/common/PageTransition";
import AnimatedSection from "../components/common/AnimatedSection";
import { motion } from "framer-motion";
import { Users, Target, Award, Globe, Code, Heart } from "lucide-react";

const AboutPage: React.FC = () => {
  const founders = [
    {
      name: "Syed Zia Hussain Shah",
      role: "Co-Founder · Product & Growth",
      bio: "Zia is the visionary mind behind Zumetrix Labs. As the bridge between strategy, clients, and execution, he leads product direction, client success, and growth. With a strong background in full-stack development and a sharp instinct for business, Zia ensures every solution isn’t just built well — it solves the right problem, beautifully.",
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
        title="About Zumetrix Labs | Meet Founders Zia Hussain & Syed Omer Shah | Software Development Agency Pakistan"
        description="Meet the expert founders of Zumetrix Labs - Zia Hussain (CEO) and Syed Omer Shah (CTO). Learn about Pakistan's leading software development agency, our mission, values, and commitment to building world-class SaaS MVPs, React/Node.js applications, and AI automation solutions. Founded in 2021, we've delivered 50+ successful projects worldwide."
        keywords="Zia Hussain, Syed Omer Shah, Zumetrix Labs founders, software development agency Pakistan, React developer Pakistan, Node.js experts, Firebase developers, SaaS MVP builders, AI automation experts, full stack developers Pakistan, startup founders Pakistan, software agency team"
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
                <strong>Zumetrix Labs</strong> was founded in 2021 with a simple
                yet powerful vision: to create
                <strong> world-class software solutions</strong> that don't just
                function—they inspire, transform, and drive real business
                results for startups and enterprises worldwide.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                As Pakistan's leading{" "}
                <strong>software development agency</strong>, we specialize in
                <strong> SaaS MVP development</strong>,{" "}
                <strong>React/Node.js applications</strong>,
                <strong> AI automation services</strong>, and custom software
                solutions. Our founder-led approach ensures every project
                receives expert attention and delivers exceptional results.
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
                Since our founding in 2021, <strong>Zumetrix Labs</strong> has
                established itself as Pakistan's most trusted{" "}
                <strong>software development agency</strong>. We've successfully
                delivered
                <strong> 50+ projects</strong> for clients across the globe,
                specializing in modern web technologies, mobile applications,
                and cutting-edge AI automation solutions.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Our expertise spans <strong>SaaS MVP development</strong>,{" "}
                <strong>React/Node.js development</strong>,
                <strong> Firebase integration</strong>,{" "}
                <strong>TypeScript applications</strong>, and
                <strong> no-code automation workflows</strong>. We pride
                ourselves on delivering pixel-perfect, scalable solutions that
                help businesses achieve their digital transformation goals.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                What sets us apart is our founder-led approach. Unlike typical
                software agencies, our founders
                <strong> Zia Hussain</strong> and{" "}
                <strong>Syed Omer Shah</strong> are hands-on developers who
                personally oversee every project, ensuring the highest quality
                standards and client satisfaction.
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
    </PageTransition>
  );
};

export default AboutPage;
