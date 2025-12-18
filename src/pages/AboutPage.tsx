import React from "react";
import SEO from "../components/common/SEO";
import PageTransition from "../components/common/PageTransition";
import AnimatedSection from "../components/common/AnimatedSection";
import { motion, AnimatePresence } from "framer-motion";
import { Users, Target, Award, Globe, Code, Heart, Plus, BookOpen } from "lucide-react";
import { aboutFAQs } from "../data/faqs/about";

const AboutPage: React.FC = () => {
  const [openFAQ, setOpenFAQ] = React.useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

const founders = [
  {
    name: "Syed Zia Hussain Shah",
    role: "Co-Founder · CEO · Product & Growth",
    bio: "Zia leads product and growth at Zumetrix Labs. He lives in the space between founders, users, and engineering—turning messy ideas into clear roadmaps, offers, and shipped products. He cares about clean execution, simple user flows, and making sure every build actually moves revenue, not just adds more features. Most clients know him as the person who will challenge their ideas, sharpen the vision, and then help lead it all the way to launch.",
    image: "/zia-hussain-founder.png",
    skills: [
      "SaaS Product Strategy",
      "MVP Scoping & Roadmapping",
      "Client Acquisition & Sales",
      "Offer & Pricing Design",
      "Agency & Delivery Operations",
    ],
  },
  {
    name: "Syed Omer Shah",
    role: "Co-Founder · CTO · Engineering & Automation",
    bio: "Omer leads engineering and automation at Zumetrix Labs. He takes complex requirements, constraints, and integrations—and turns them into systems that are fast, reliable, and easy to grow. He thinks in terms of architecture, data flows, and long-term maintainability, making sure what we ship today doesn’t become tomorrow’s technical debt. Most clients rely on him as their technical backbone: the person who quietly keeps everything stable, scalable, and efficient.",
    image: "/syed-omer-shah-founder.png",
    skills: [
      "Technical Architecture & System Design",
      "AI & Automation Workflows",
      "Scalable Backend & Infrastructure",
      "Integration & Platform Engineering",
      "Code Quality, Reviews & Standards",
    ],
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
        title="About Zumetrix Labs | Meet Zia Hussain & Syed Omer Shah | Technical Founders"
        description="Meet Zia Hussain (CEO) and Syed Omer Shah (CTO), technical founders of Zumetrix Labs. 50+ projects delivered across US, UK, Canada, Australia, UAE, and Singapore. Top Rated on Upwork. Specializing in SaaS MVP development, React/Node.js applications, and AI automation. Founder-led approach means direct access to senior developers."
        keywords="Zia Hussain, Syed Omer Shah, software development agency, SaaS MVP development, React development, AI automation"
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
            <BookOpen size={16} className="mr-2" />
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
                <strong>Zia Hussain</strong> and <strong>Syed Omer Shah</strong> are the technical founders behind <strong>Zumetrix Labs</strong>, a software development company that builds for founders who need thinking partners, not order-takers. With experience in React/Node.js development, SaaS MVP building, AI automation, and mobile apps, they've delivered 50+ projects for international clients.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Founded in 2021, <strong>Zumetrix Labs</strong> works with startups and businesses across the <strong>United States, United Kingdom, Canada, Australia, UAE, and Singapore</strong>. The founder-led approach means every project gets direct attention from senior developers who've built this before.
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
                Technical Founders Who Build
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                <strong>Zia Hussain (CEO)</strong> and <strong>Syed Omer Shah (CTO)</strong> are hands-on technical founders who personally architect and oversee all client work. Their combined experience spans <strong>React/TypeScript development</strong>, <strong>Node.js backend architecture</strong>, <strong>Firebase integration</strong>, <strong>AI automation workflows</strong>, <strong>startup MVP development</strong>, and <strong>mobile app development using React Native</strong>.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Serving clients in the <strong>United States, United Kingdom, Canada, Australia, UAE, and Singapore</strong>, Zumetrix Labs has delivered <strong>50+ projects</strong> ranging from early-stage startup MVPs to business applications. Top Rated on Upwork with 100% Job Success Score.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Whether you're building your <strong>first SaaS MVP</strong>, need <strong>custom software</strong>, want <strong>AI automation</strong>, or require <strong>white-label development</strong>, Zia and Omer provide technical leadership and hands-on development to ship products that work.
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
