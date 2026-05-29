import React from "react";
import SEO from "../components/common/SEO";
import PageTransition from "../components/common/PageTransition";
import AnimatedSection from "../components/common/AnimatedSection";
import { motion } from "framer-motion";
import { ArrowRight, Check, Code2, Layers3, Map, Rocket, Search, Send, X } from "lucide-react";
import { Link } from "react-router-dom";
import { services, process } from "../data/services.ts";
import { servicesFAQs } from "../data/faqs/services";
import { useState } from "react";
import { Plus } from "lucide-react";
import { AnimatePresence } from "framer-motion";
import AIROICalculator from "../components/home/AIROICalculator.tsx";

const ServicesPage: React.FC = () => {
  const [openFAQ, setOpenFAQ] = useState<number | null>(0);
  const [selectedProcessStep, setSelectedProcessStep] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  const processPhaseDetails = [
    {
      icon: Search,
      title: "Understand",
      line: "We learn the business, users, and real problem before writing code.",
      output: "Clear product direction",
      receive:
        "A simple direction document that explains what we are building, who it is for, why it matters, and what the first version must prove.",
      approve: "The main problem, the first user group, the success goal, and what we should not build yet.",
      details: [
        "We ask what the business needs, who the product is for, and what result would make the first version worth building.",
        "We remove vague ideas, duplicate features, and anything that sounds exciting but does not help the first release.",
        "We write the direction in plain language so you, your team, and our team are working from the same understanding.",
      ],
      done: "This step is done when everyone can explain the product in one clear sentence.",
      why: "This protects your budget from unclear scope and keeps the first version focused.",
    },
    {
      icon: Map,
      title: "Plan",
      line: "We choose the smartest first version, timeline, and technical path.",
      output: "Scope and roadmap",
      receive:
        "A practical build plan with features, priorities, milestones, integrations, and the technical choices needed to move without confusion.",
      approve: "The first feature set, build order, timeline, integrations, and technical direction.",
      details: [
        "We decide what belongs in the first release and what should move to a later phase.",
        "We map the pages, user roles, data flow, integrations, and the order we will build them in.",
        "We explain the plan before development starts, so you know what is included and what is not.",
      ],
      done: "This step is done when the roadmap is clear enough to estimate, build, and review.",
      why: "This gives you confidence before investment moves into full build mode.",
    },
    {
      icon: Layers3,
      title: "Design",
      line: "We turn the idea into simple screens, flows, and user journeys.",
      output: "Clickable product flow",
      receive:
        "A visible product experience you can click through, review with your team, and improve before expensive engineering decisions are locked in.",
      approve: "The main screens, user journey, content structure, and important interactions.",
      details: [
        "We turn the plan into screens so you can see how the product will actually work.",
        "We keep the interface simple, focused, and easy for users to understand without explanation.",
        "We review the flow with you before heavy development, so changes are easier and cheaper to make.",
      ],
      done: "This step is done when the main user journey feels obvious and ready to build.",
      why: "This reduces rework and makes the software feel intentional from the first release.",
    },
    {
      icon: Code2,
      title: "Build",
      line: "We develop in focused releases and show progress as it becomes real.",
      output: "Working software",
      receive:
        "A real, tested product version with the core flows working, progress visible, and the foundation ready for future improvements.",
      approve: "Working milestones, core flows, quality checks, and what is ready for launch.",
      details: [
        "We build the product in small, reviewable parts instead of disappearing until the end.",
        "You see progress through demos, milestone reviews, and clear updates on what changed.",
        "We test the important flows and keep the codebase clean so future work does not become painful.",
      ],
      done: "This step is done when the core product works, important flows are tested, and launch blockers are removed.",
      why: "This keeps momentum high while giving you control over the product as it takes shape.",
    },
    {
      icon: Send,
      title: "Launch",
      line: "We deploy, hand over, and prepare the next useful product move.",
      output: "Live product",
      receive:
        "A launched product with deployment complete, key details handed over, and a clear next-step list for growth, fixes, or phase two.",
      approve: "Final release, deployment checklist, handover notes, and next-step priorities.",
      details: [
        "We prepare the release, deploy the product, and confirm the live experience works as expected.",
        "We hand over the important details so your team understands the product and the system behind it.",
        "We help choose the next improvements based on real launch priorities, not random feature ideas.",
      ],
      done: "This step is done when the product is live, handed over, and ready for real users or the next phase.",
      why: "This turns the project into a live asset, not just a finished development task.",
    },
  ];

  const selectedProcess =
    selectedProcessStep !== null ? processPhaseDetails[selectedProcessStep] : null;

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://zumetrix.com/#organization",
        name: "Zumetrix Labs",
        url: "https://zumetrix.com",
        description:
          "Zumetrix Labs provides software development services specializing in SaaS MVP development, React/Node.js applications, AI automation, mobile app development, and custom software. Top Rated on Upwork.",
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Software Development Services",
          itemListElement: services.map((service) => ({
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: service.title,
              description: service.description,
              provider: {
                "@id": "https://zumetrix.com/#organization",
              },
            },
          })),
        },
      },
      ...services.map((service) => ({
        "@type": "Service",
        name: service.title,
        description: service.description,
        provider: {
          "@id": "https://zumetrix.com/#organization",
        },
        areaServed: [
          {
            "@type": "Country",
            name: "Pakistan"
          },
          {
            "@type": "Country",
            name: "United States"
          },
          {
            "@type": "Country", 
            name: "United Kingdom"
          },
          {
            "@type": "Country",
            name: "Canada"
          },
          {
            "@type": "Country",
            name: "Australia"
          },
          {
            "@type": "Country",
            name: "United Arab Emirates"
          },
          {
            "@type": "Country",
            name: "Singapore"
          },
          {
            "@type": "Place",
            name: "Worldwide"
          }
        ],
        serviceType: service.technologies,
      })),
    ],
  };

  return (
    <PageTransition>
      <SEO
        gaTagId="G-PRSP59FL20"
        googleVerification="XbgNbYnq2H0qTIfTCwVFlXrYWHnnvw0acGCUjdlI_Cs"
        title="Software Development Services | Forge Clear Ideas Into Shipped Software | Zumetrix Labs"
        description="Forge Clear Ideas Into Shipped Software. Explore Zumetrix Labs services for SaaS MVP development, React/Node.js applications, mobile apps, and AI automation."
        keywords="software development services, SaaS MVP development, React development, mobile app development, AI automation, custom software"
        url="https://zumetrix.com/services"
        structuredData={structuredData}
      />

      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-background relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <AnimatedSection className="text-center">
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="inline-flex items-center px-4 py-2 bg-card/50 backdrop-blur-xl border border-border rounded-full text-sm font-medium text-primary mb-8"
            >
                            <Rocket size={16} className="mr-2" />

              Software Development Services
            </motion.div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-8 tracking-tight leading-tight">
              Services Built for Founders
              <span className="block bg-shimmer bg-clip-text text-transparent">
                Who Need Thinking Partners
              </span>
            </h1>

            <div className="max-w-5xl mx-auto mb-12">
              <p className="text-xl lg:text-2xl text-muted-foreground leading-relaxed font-light mb-6">
                We build <strong>SaaS MVPs</strong>, <strong>mobile apps</strong>, and <strong>AI automation</strong> for founders who've done their customer research and know what problem they're solving. 50+ projects delivered over 3 years, most launched in 4-8 weeks.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Founded by <strong>Zia Hussain</strong> and <strong>Syed Omer Shah</strong>. Top Rated on Upwork with 100% Job Success Score. Serving clients across the <strong>United States, United Kingdom, Canada, Australia, UAE, and Singapore</strong>. We use React, Next.js, TypeScript, Node.js, Firebase, and Supabase to build maintainable systems that scale.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-20 space-y-7">
            {services.map((service, index) => (
              <AnimatedSection
                key={service.id}
                delay={index * 0.05}
                className="group"
              >
                <motion.div
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className="relative h-full overflow-hidden rounded-2xl border border-border bg-card/50 backdrop-blur-xl transition-all duration-200 hover:border-primary/35 hover:bg-card/70 hover:shadow-card-hover"
                >
                  {service.popular && (
                    <div className="absolute right-5 top-5 z-20">
                      <span className="rounded-full border border-primary/25 bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground shadow-lg shadow-primary/10">
                        Most Popular
                      </span>
                    </div>
                  )}

                  <div className="grid h-full lg:grid-cols-[1.38fr_0.9fr]">
                    <div className="flex min-h-[360px] flex-col p-6 sm:p-8 lg:p-10">
                      <div className="mb-5 flex flex-wrap items-center gap-3">
                        <span className="rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                          {service.price}
                        </span>
                        <span className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
                          {service.id.replace(/-/g, " ")}
                        </span>
                      </div>

                      <div className="mb-5 flex items-start gap-4">
                        <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl border border-primary/25 bg-primary/10 text-primary">
                          <service.icon size={25} />
                        </div>
                        <div>
                          <h3 className="text-3xl font-bold tracking-tight text-foreground transition-colors duration-150 group-hover:text-primary">
                            {service.title}
                          </h3>
                          <p className="mt-2 text-sm font-semibold leading-relaxed text-primary/85">
                            {service.subtitle}
                          </p>
                        </div>
                      </div>

                      <p className="mb-6 max-w-3xl text-muted-foreground leading-relaxed">
                        {service.description}
                      </p>

                      <div className="mb-7 grid gap-3 md:grid-cols-3">
                        {service.features.slice(0, 3).map((feature) => (
                          <div
                            key={feature}
                            className="rounded-xl border border-border/70 bg-background/35 p-4 text-sm leading-relaxed text-muted-foreground"
                          >
                            <Check
                              size={15}
                              className="mb-3 text-primary"
                            />
                            {feature}
                          </div>
                        ))}
                      </div>

                      <div className="mt-auto flex flex-col gap-5 border-t border-border/70 pt-6 sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex flex-wrap gap-2">
                          {service.technologies.slice(0, 5).map((tech) => (
                            <span
                              key={tech}
                              className="rounded-full border border-border/70 bg-background/35 px-2.5 py-1 text-xs font-medium text-muted-foreground"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>

                        <Link
                          to={`/services/${service.slug}`}
                          className="inline-flex min-w-[170px] items-center justify-center gap-2 whitespace-nowrap rounded-xl border border-border bg-background/55 px-5 py-3 text-sm font-semibold text-foreground transition-all duration-200 hover:border-primary/35 hover:bg-primary/10 hover:text-primary"
                        >
                          Explore Service
                          <ArrowRight size={16} />
                        </Link>
                      </div>
                    </div>

                    <div className="relative flex min-h-[330px] flex-col justify-center overflow-hidden border-t border-border/60 bg-background/70 px-5 py-8 lg:min-h-full lg:border-l lg:border-t-0 lg:px-8">
                      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(196,138,100,0.10),transparent_58%)]" />
                      <img
                        src={service.image}
                        alt=""
                        className="pointer-events-none absolute inset-0 h-full w-full scale-125 object-cover opacity-20 blur-xl saturate-75"
                        loading="lazy"
                        aria-hidden="true"
                      />
                      <div className="relative z-10">
                        <img
                          src={service.image}
                          alt={service.title}
                          className="mx-auto max-h-[360px] w-full rounded-xl border border-border/60 object-contain shadow-2xl shadow-black/40 transition-transform duration-700 group-hover:scale-[1.025]"
                          loading="lazy"
                        />
                      </div>
                      <div className="relative z-10 mt-5 grid grid-cols-2 gap-3">
                        <div className="rounded-xl border border-border/70 bg-background/45 p-4 backdrop-blur-xl">
                          <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                            Best for
                          </p>
                          <p className="mt-2 text-sm font-semibold leading-snug text-foreground">
                            {service.title.split(" ").slice(0, 2).join(" ")}
                          </p>
                        </div>
                        <div className="rounded-xl border border-border/70 bg-background/45 p-4 backdrop-blur-xl">
                          <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                            Scope
                          </p>
                          <p className="mt-2 text-sm font-semibold leading-snug text-foreground">
                            {service.features.length}+ deliverables
                          </p>
                        </div>
                      </div>
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/55 via-transparent to-transparent lg:bg-gradient-to-r lg:from-background/10 lg:via-transparent lg:to-background/35" />
                      <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-primary/25 to-transparent" />
                    </div>
                  </div>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>

          {/* CTA Section */}
          <AnimatedSection className="text-center">
            <h3 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Ready to build something
              <span className="bg-shimmer bg-clip-text text-transparent">
                {" "}
                exceptional
              </span>
              ?
            </h3>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Let's discuss your project and create a solution that drives real
              business results.
            </p>
            <Link to="/contact">
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.15 }}
                className="bg-beige-gradient text-primary-foreground px-8 py-4 rounded-lg font-medium 
                         hover:shadow-glow  
                         flex items-center gap-3 text-lg mx-auto"
              >
                Start Your Project
                <ArrowRight size={20} />
              </motion.button>
            </Link>
          </AnimatedSection>
        </div>
      </section>

      {/* Process Section */}
      <section className="relative overflow-hidden bg-background py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="mb-16 text-center">
            <div className="mb-6 inline-flex items-center rounded-full border border-primary/15 bg-card/35 px-4 py-2 text-sm font-medium text-primary backdrop-blur-xl">
              <Rocket size={16} className="mr-2" />
              Build Method
            </div>

            <h2 className="text-5xl md:text-7xl font-bold text-foreground mb-6 tracking-tight">
              How we build
              <span className="block bg-shimmer bg-clip-text pb-2 text-transparent">
                without confusion
              </span>
            </h2>

            <p className="mx-auto max-w-3xl text-lg text-muted-foreground leading-relaxed font-light md:text-xl">
              Five calm stages from idea to launch. You always know what we are
              doing, what you are approving, and what comes next.
            </p>
          </AnimatedSection>

          <AnimatedSection className="relative mx-auto max-w-5xl">
            <div className="overflow-hidden rounded-3xl border border-border/70 bg-card/25 p-2 backdrop-blur-xl">
              {process.map((step, index) => {
                const phase = processPhaseDetails[index];
                const Icon = phase.icon;

                return (
                  <AnimatedSection
                    key={step.step}
                    delay={index * 0.07}
                    className="h-full"
                  >
                    <motion.button
                      type="button"
                      onClick={() => setSelectedProcessStep(index)}
                      whileHover={{ backgroundColor: "rgba(255,255,255,0.025)" }}
                      transition={{ duration: 0.22, ease: "easeOut" }}
                      className="group relative w-full overflow-hidden rounded-2xl p-5 text-left transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary/35 sm:p-7"
                    >
                      {index > 0 && (
                        <div className="absolute inset-x-7 top-0 h-px bg-border/55" />
                      )}

                      <div className="grid gap-5 sm:grid-cols-[72px_1fr] lg:grid-cols-[72px_1fr_auto] lg:items-center">
                        <div className="flex items-center gap-3">
                          <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl border border-primary/15 bg-primary/5 text-primary/90 transition-all duration-300 group-hover:border-primary/30 group-hover:bg-primary/10 group-hover:text-primary">
                            <Icon size={21} />
                          </div>
                          <span className="text-xs font-bold text-primary/70 sm:hidden">
                            {step.step}
                          </span>
                        </div>

                        <div>
                          <div className="flex items-center gap-3">
                            <span className="hidden text-xs font-bold text-primary/70 sm:inline">
                              {step.step}
                            </span>
                            <h3 className="text-2xl font-bold leading-tight text-foreground transition-colors duration-200 group-hover:text-primary md:text-3xl">
                              {phase.title}
                            </h3>
                          </div>
                          <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted-foreground">
                            {phase.line}
                          </p>
                        </div>

                        <div className="rounded-xl border border-border/60 bg-background/30 px-4 py-3 lg:min-w-[210px]">
                          <p className="mb-1 text-xs uppercase tracking-[0.16em] text-muted-foreground">
                            Output
                          </p>
                          <p className="text-sm font-semibold leading-relaxed text-foreground">
                            {phase.output}
                          </p>
                        </div>
                      </div>
                    </motion.button>
                  </AnimatedSection>
                );
              })}
            </div>
            <p className="mt-4 text-center text-sm text-muted-foreground">
              Click any step to see what happens, what you approve, and what you receive.
            </p>
          </AnimatedSection>
        </div>
      </section>

      <AnimatePresence>
        {selectedProcess && selectedProcessStep !== null && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-background/80 px-4 py-6 backdrop-blur-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProcessStep(null)}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="process-modal-title"
              initial={{ opacity: 0, y: 22, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 18, scale: 0.98 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              className="relative max-h-[88vh] w-full max-w-3xl overflow-y-auto rounded-3xl border border-border bg-card/95 p-6 shadow-2xl shadow-black/50 sm:p-8"
              onClick={(event) => event.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setSelectedProcessStep(null)}
                className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background/50 text-muted-foreground transition-colors duration-200 hover:border-primary/30 hover:text-primary"
                aria-label="Close process details"
              >
                <X size={18} />
              </button>

              <div className="mb-8 flex items-start gap-4 pr-12">
                <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10 text-primary">
                  <selectedProcess.icon size={24} />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">
                    Step {selectedProcessStep + 1}
                  </p>
                  <h3
                    id="process-modal-title"
                    className="mt-2 text-3xl font-bold leading-tight text-foreground sm:text-4xl"
                  >
                    {selectedProcess.title}
                  </h3>
                  <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted-foreground">
                    {selectedProcess.line}
                  </p>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-border/70 bg-background/25 p-5">
                  <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                    You confirm
                  </p>
                  <p className="mt-3 text-base font-semibold leading-relaxed text-foreground">
                    {selectedProcess.approve}
                  </p>
                </div>
                <div className="rounded-2xl border border-primary/15 bg-primary/5 p-5">
                  <p className="text-xs uppercase tracking-[0.18em] text-primary/80">
                    You receive
                  </p>
                  <p className="mt-3 text-base font-semibold leading-relaxed text-foreground">
                    {selectedProcess.output}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {selectedProcess.receive}
                  </p>
                </div>
              </div>

              <div className="mt-5 rounded-2xl border border-border/70 bg-background/25 p-5">
                <p className="mb-4 text-xs uppercase tracking-[0.18em] text-muted-foreground">
                  What we do
                </p>
                <div className="space-y-3">
                  {selectedProcess.details.map((detail) => (
                    <div key={detail} className="flex gap-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
                      <Check size={16} className="mt-0.5 flex-shrink-0 text-primary" />
                      <span>{detail}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-border/70 bg-background/20 p-5">
                  <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                    Ready for next step when
                  </p>
                  <p className="mt-3 text-base leading-relaxed text-foreground">
                    {selectedProcess.done}
                  </p>
                </div>
                <div className="rounded-2xl border border-border/70 bg-background/20 p-5">
                <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                  Why this helps
                </p>
                <p className="mt-3 text-base leading-relaxed text-foreground">
                  {selectedProcess.why}
                </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AIROICalculator />
    

      {/* FAQ Section */}
      <section className="py-24 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold text-foreground mb-6 tracking-tight">
              Frequently Asked
              <span className="block bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                Questions
              </span>
            </h2>
            <p className="text-xl text-muted-foreground leading-relaxed font-light">
              Common questions about our software development services
            </p>
          </AnimatedSection>

          <div className="space-y-4">
            {servicesFAQs.map((faq, index) => (
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

export default ServicesPage;
