import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Check, TrendingUp, TrendingDown, Network, Database, Plug, ShieldCheck, Compass, Layers, Rocket } from "lucide-react";
import SEO from "../../components/common/SEO";
import PageTransition from "../../components/common/PageTransition";
import AnimatedSection from "../../components/common/AnimatedSection";
import SectionEyebrow from "../../components/common/SectionEyebrow";
import FAQAccordion from "../../components/common/FAQAccordion";
import ClosingGlow from "../../components/common/ClosingGlow";
import TestimonialFilm from "../../components/common/TestimonialFilm";
import { services } from "../../data/services";
import { webDetailFAQs } from "../../data/faqs/service-web";
import { getProjectBySlug } from "../../data/projects";
import { TESTIMONIALS } from "../../data/testimonials";

const service = services.find((s) => s.slug === "web-application-development")!;
const pageUrl = `https://zumetrix.com/services/${service.slug}`;
const forlagProject = getProjectBySlug("forlag-publishing-sales-inventory-dashboard");
const raheemTestimonial = TESTIMONIALS.find((t) => t.id === "muhammad-raheem-ecommerce");

const THE_SYSTEM = ["Custom dashboards & internal tools", "Complex business logic, modeled correctly", "Real-time features with live updates"];
const CONNECTIONS = ["REST & GraphQL integrations with your tools", "Third-party API integration"];
const FOUNDATION = ["Security-minded architecture & access control", "Databases built for how you query them", "Cloud deployment & CI/CD"];

const ENGAGEMENT = [
  { icon: Compass, title: "Understand", description: "How the business actually runs — before we design anything." },
  { icon: Layers, title: "Model", description: "Architecture built around your real data and workflows." },
  { icon: Layers, title: "Build", description: "Weekly milestones. Real progress, not a reveal at the end." },
  { icon: Plug, title: "Integrate", description: "Connected to the tools you already run the business on." },
  { icon: Rocket, title: "Deploy", description: "Hardened, shipped, monitored from day one." },
];

const WebDetailPage: React.FC = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `${pageUrl}#service`,
        name: service.title,
        description: service.description,
        url: pageUrl,
        provider: { "@id": "https://zumetrix.com/#organization" },
        serviceType: service.technologies,
        areaServed: "Worldwide",
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://zumetrix.com/" },
          { "@type": "ListItem", position: 2, name: "Software Development Services", item: "https://zumetrix.com/services" },
          { "@type": "ListItem", position: 3, name: service.title, item: pageUrl },
        ],
      },
    ],
  };

  return (
    <PageTransition>
      <SEO
        title={service.seo.title}
        description={service.seo.description}
        keywords={service.seo.keywords}
        image={`https://zumetrix.com${service.image}`}
        url={pageUrl}
        structuredData={structuredData}
      />

      {/* ================================================================ */}
      {/* HERO — kept close to the approved direction. Not rebuilt.          */}
      {/* ================================================================ */}
      <section className="relative overflow-hidden bg-background pt-28 sm:pt-32 pb-20 sm:pb-24">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_55%_at_50%_10%,rgba(196,138,100,0.08),transparent_70%)]" />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection mode="hero">
            <Link to="/services" className="inline-block mb-8">
              <motion.div
                whileHover={{ scale: 1.03, y: -1 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.15 }}
                className="group inline-flex items-center gap-2.5 rounded-full border border-border/60 bg-card/25 pl-2 pr-5 py-2 text-sm font-semibold text-muted-foreground shadow-[0_12px_30px_-16px_rgba(0,0,0,0.6)] hover:border-primary/40 hover:text-primary hover:bg-primary/5 transition-colors duration-200 btn-sheen"
              >
                <span className="flex items-center justify-center w-7 h-7 rounded-full bg-background/80 group-hover:bg-primary/10 transition-colors duration-200">
                  <ArrowLeft size={13} className="group-hover:-translate-x-0.5 transition-transform duration-200" />
                </span>
                All Services
              </motion.div>
            </Link>
            <SectionEyebrow className="mb-7">Web Application Development</SectionEyebrow>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-foreground tracking-tight mb-6">{service.title}</h1>
            <p className="text-xl sm:text-2xl font-semibold tracking-tight leading-[1.35] mb-8 max-w-xl mx-auto">
              <span className="text-muted-foreground/50">The custom software your business runs on —</span>{" "}
              <span className="text-foreground">not a website, not a template.</span>
            </p>
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
              <Link to={`/contact?service=${service.slug}`} className="group inline-flex items-center gap-3 rounded-full bg-primary text-primary-foreground pl-7 pr-2 py-2 text-sm font-semibold hover:bg-primary/90 transition-colors duration-200 btn-sheen">
                Build Your Web App
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-black/10 group-hover:bg-black/[0.16] transition-colors duration-300">
                  <ArrowRight size={14} strokeWidth={2.5} className="group-hover:translate-x-[1.5px] transition-transform duration-200" />
                </span>
              </Link>
              <span className="text-sm font-medium text-muted-foreground">{service.price}</span>
            </div>
          </AnimatedSection>

          <AnimatedSection mode="hero" delay={0.1} className="mt-16 sm:mt-20 max-w-4xl mx-auto">
            <div className="relative rounded-xl border border-border/60 overflow-hidden bg-card/15 shadow-[0_50px_110px_-25px_rgba(0,0,0,0.7),0_25px_55px_-20px_rgba(196,138,100,0.2)]">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_75%_10%,rgba(196,138,100,0.1),transparent_65%)]" />
              <div className="relative flex flex-wrap items-center gap-x-1 gap-y-1.5 px-4 py-3 border-b border-border/60 bg-card/40">
                <div className="flex items-center gap-1.5 mr-4">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-400/60" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400/50" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/50" />
                </div>
                {["Dashboard", "Orders", "Inventory", "Customers"].map((tab, i) => (
                  <span key={tab} className={`px-3 py-1.5 rounded-md text-[11px] sm:text-xs font-medium whitespace-nowrap ${i === 0 ? "bg-primary/15 text-primary border border-primary/25" : "text-muted-foreground/45"}`}>{tab}</span>
                ))}
              </div>
              <div aria-hidden="true" className="relative p-6 sm:p-9">
                <div className="grid grid-cols-3 gap-3 sm:gap-4 mb-6">
                  {[{ active: true, Icon: TrendingUp, up: true }, { active: false, Icon: TrendingUp, up: true }, { active: false, Icon: TrendingDown, up: false }].map(({ active, Icon, up }, i) => (
                    <div key={i} className={`rounded-lg border p-3 sm:p-3.5 ${active ? "border-primary/30 bg-gradient-to-br from-primary/10 to-transparent" : "border-border/60 bg-background/40"}`}>
                      <div className="flex items-center justify-between mb-2.5">
                        <span className="h-1.5 w-8 rounded-full bg-border" />
                        <Icon size={11} strokeWidth={2.5} className={up ? "text-primary/60" : "text-red-400/60"} />
                      </div>
                      <span className={`block h-3 w-1/2 rounded-full ${active ? "bg-primary/50" : "bg-foreground/20"}`} />
                    </div>
                  ))}
                </div>
                <div className="relative rounded-lg border border-primary/25 bg-gradient-to-br from-primary/10 to-transparent p-4 sm:p-5 h-32 sm:h-40 flex items-end gap-2">
                  {[0.3, 0.5, 0.4, 0.7, 0.55, 0.85, 0.65, 0.5].map((h, i) => (
                    <span key={i} className={`relative flex-1 rounded-t-sm ${i === 5 ? "bg-primary/60" : "bg-primary/20"}`} style={{ height: `${h * 100}%` }} />
                  ))}
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ================================================================ */}
      {/* SIGNATURE SCENE — WEBSITE VS. BUSINESS SOFTWARE. Made undeniable   */}
      {/* by density, not just labels: software visibly has more going on.  */}
      {/* ================================================================ */}
      <section className="relative bg-background py-24 sm:py-32 border-b border-border/40">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="grid sm:grid-cols-5 gap-4 sm:gap-5 items-stretch">
            <div className="sm:col-span-2 rounded-2xl border border-border/40 bg-card/10 p-7 sm:p-9 opacity-55 flex flex-col justify-center">
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-muted-foreground mb-5">A website</p>
              <ul className="space-y-3 text-base text-muted-foreground">
                <li>Content, pages, a marketing surface</li>
                <li>Tells people who you are</li>
                <li>Nobody logs in to do work</li>
              </ul>
            </div>
            <div className="sm:col-span-3 rounded-2xl border border-primary/35 bg-gradient-to-b from-primary/[0.09] to-transparent p-7 sm:p-9 shadow-[0_35px_80px_-30px_rgba(196,138,100,0.28)]">
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-primary mb-5">Business software</p>
              <div className="flex flex-wrap gap-2.5">
                {["Users & roles", "Real workflows", "Live data", "Business rules", "Integrations", "Decisions made daily"].map((item) => (
                  <span key={item} className="inline-flex items-center gap-1.5 rounded-full border border-primary/25 bg-background/50 pl-3 pr-3.5 py-1.5 text-sm text-foreground/90">
                    <Check size={11} strokeWidth={2.5} className="text-primary flex-shrink-0" />
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ================================================================ */}
      {/* SIGNATURE SCENE — THE OPERATION, MODELED. Five real inputs         */}
      {/* converging into one operating system, wide and full-scale — the   */}
      {/* convergence itself teaches what "modeling the business" means.    */}
      {/* ================================================================ */}
      <section className="relative bg-card/10 border-b border-border/40 py-24 sm:py-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-4">
          <AnimatedSection>
            <SectionEyebrow className="mb-6">What We Build</SectionEyebrow>
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight max-w-lg mx-auto">
              Software your business runs through.
            </h2>
          </AnimatedSection>
        </div>

        <AnimatedSection delay={0.06} className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Five real inputs, five real lines — each one actually drawn    */}
          {/* from its own label down to the system, instead of one generic  */}
          {/* V-shape that states convergence without showing it happen.     */}
          <div className="grid grid-cols-5 gap-1 sm:gap-2 mb-1">
            {["People", "Data", "Workflows", "Rules", "Integrations"].map((item) => (
              <span key={item} className="text-[10px] sm:text-sm font-semibold text-muted-foreground text-center leading-tight px-0.5">
                {item}
              </span>
            ))}
          </div>
          <svg viewBox="0 0 500 64" className="w-full h-auto" aria-hidden="true">
            {[50, 175, 250, 325, 450].map((x) => (
              <motion.path
                key={x}
                d={`M ${x} 0 L 250 56`}
                fill="none"
                stroke="currentColor"
                strokeWidth={x === 250 ? 1.5 : 1}
                className="text-border/60"
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease: "easeInOut" }}
              />
            ))}
            <circle cx="250" cy="56" r="4" className="fill-primary" />
          </svg>
          <div className="flex items-center gap-2.5 justify-center mt-4 mb-10 sm:mb-12">
            <Network size={18} className="text-primary" />
            <p className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight">One operating system</p>
          </div>
          <div className="grid sm:grid-cols-3 gap-x-6 gap-y-8 sm:gap-x-8">
            {[
              { icon: Database, label: "The system", items: THE_SYSTEM },
              { icon: Plug, label: "Connections", items: CONNECTIONS },
              { icon: ShieldCheck, label: "Foundation", items: FOUNDATION },
            ].map((col, i) => (
              <div key={col.label} className={i > 0 ? "sm:border-l sm:border-border/40 sm:pl-6 lg:pl-8" : ""}>
                <div className="flex items-center gap-2 mb-4">
                  <col.icon size={15} className="text-primary/70" />
                  <p className="text-sm font-bold uppercase tracking-[0.14em] text-foreground/80">{col.label}</p>
                </div>
                <ul className="space-y-2.5">
                  {col.items.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground leading-relaxed">
                      <Check size={11} className="text-primary/70 flex-shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </AnimatedSection>
      </section>

      {/* ================================================================ */}
      {/* HOW WE WORK — the system accumulating layer by layer, sprint by   */}
      {/* sprint. Each step's icon carries more weight than the last.       */}
      {/* ================================================================ */}
      <section className="py-24 sm:py-28">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <SectionEyebrow className="mb-6">How We Work</SectionEyebrow>
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight">We model the operation before we write code.</h2>
          </AnimatedSection>

          <div className="grid sm:grid-cols-5 gap-6 sm:gap-4">
            {ENGAGEMENT.map((step, i) => (
              <AnimatedSection key={step.title + i} delay={i * 0.05}>
                <div className="text-center sm:text-left">
                  <div className="flex items-end gap-[3px] mb-4 h-8 justify-center sm:justify-start" aria-hidden="true">
                    {Array.from({ length: 5 }).map((_, layer) => (
                      <span
                        key={layer}
                        className={`w-2.5 rounded-sm ${layer <= i ? "bg-primary" : "bg-border/50"}`}
                        style={{ height: `${(layer + 1) * 16}%`, opacity: layer <= i ? 0.4 + (0.6 * (i + 1)) / 5 : 1 }}
                      />
                    ))}
                  </div>
                  <p className="text-xs font-semibold text-primary/60 mb-1.5">0{i + 1}</p>
                  <p className="text-sm font-bold text-foreground mb-2">{step.title}</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">{step.description}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>

          {/* Plain connector, not another squiggle — the accumulating-bars */}
          {/* icon above already carries this section's motion.             */}
          <div className="relative flex justify-center my-6 sm:my-8" aria-hidden="true">
            <span className="w-px h-12 sm:h-14 bg-gradient-to-b from-border to-primary/50" />
          </div>

          <AnimatedSection delay={0.08} className="max-w-2xl mx-auto">
            <div className="btn-sheen relative overflow-hidden rounded-[1.75rem] border border-primary/40 bg-gradient-to-b from-primary/[0.11] via-card/50 to-card/20 p-8 sm:p-11 text-center shadow-[0_45px_90px_-35px_rgba(196,138,100,0.4)]">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_55%_at_50%_0%,rgba(196,138,100,0.14),transparent_70%)]" />
              <div className="relative">
                {/* Layers, not a buoy — support is one more layer added to    */}
                {/* the system the page has been building this whole time.    */}
                <span className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/15 border border-primary/30 mb-5 shadow-[0_0_44px_-10px_rgba(196,138,100,0.55)]">
                  <Layers size={24} className="text-primary" />
                </span>
                <div className="flex items-center justify-center gap-2 mb-3">
                  <span className="relative flex h-2 w-2 flex-shrink-0">
                    <span className="absolute inset-0 rounded-full bg-primary/60 animate-ping" style={{ animationDuration: "2.5s" }} />
                    <span className="relative h-2 w-2 rounded-full bg-primary" />
                  </span>
                  <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-primary/80">After Deploy — Ongoing</span>
                </div>
                <p className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight mb-3">Support</p>
                <p className="text-base text-muted-foreground leading-relaxed max-w-md mx-auto">
                  We stay on after launch — fixes, changes, and the next phase, handled by the team that already knows the system.
                </p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ================================================================ */}
      {/* THE PROOF — two different doubts, two different kinds of         */}
      {/* evidence. Forlag proves the operational transformation. Reema     */}
      {/* Rafay proves the engineering depth behind the interface. Each    */}
      {/* is named before it's shown, so the visitor knows why it's there. */}
      {/* ================================================================ */}
      <section className="relative bg-card/10 border-y border-border/40 py-24 sm:py-32">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-4">
          <AnimatedSection>
            <SectionEyebrow className="mb-6">The Proof</SectionEyebrow>
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight max-w-xl mx-auto">
              Two doubts worth answering separately.
            </h2>
          </AnimatedSection>
        </div>

        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-14">
          <AnimatedSection delay={0.03}>
            <p className="text-sm font-bold uppercase tracking-[0.14em] text-primary/70 mb-2">Proof one — the operation</p>
            <h3 className="text-xl sm:text-2xl font-bold text-foreground tracking-tight max-w-lg mx-auto">
              A publishing company ran its business on spreadsheets. Now it runs on this.
            </h3>
          </AnimatedSection>
        </div>

        <AnimatedSection delay={0.06} className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 grid sm:grid-cols-2 gap-5 mb-6">
          <div className="rounded-2xl border border-border/40 bg-background/30 p-7 sm:p-8 opacity-60">
            <p className="text-sm font-bold uppercase tracking-[0.14em] text-muted-foreground mb-3">Fragmented operation</p>
            <p className="text-base text-muted-foreground leading-relaxed">Multiple spreadsheets, manual calculations, no clear read on MTD/YTD performance or inventory risk.</p>
          </div>
          <div className="rounded-2xl border border-primary/35 bg-gradient-to-b from-primary/[0.09] to-transparent p-7 sm:p-8 shadow-[0_30px_65px_-28px_rgba(196,138,100,0.28)]">
            <p className="text-sm font-bold uppercase tracking-[0.14em] text-primary mb-3">Modeled software system</p>
            <p className="text-base text-foreground/85 leading-relaxed">One dashboard. KPIs computed live from uploaded files. No backend database to maintain.</p>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.1} className="flex flex-col items-center my-2" aria-hidden="true">
          <span className="w-px h-10 bg-gradient-to-b from-border/40 to-primary/40" />
        </AnimatedSection>

        {/* The result — a dashboard readout, not four floating numbers.    */}
        <AnimatedSection delay={0.12} className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <div className="rounded-2xl border border-border/50 bg-background/50 overflow-hidden">
            <div className="flex items-center justify-center px-6 py-3.5 border-b border-border/50 bg-card/20">
              <span className="text-xs font-bold uppercase tracking-[0.16em] text-primary/70">Operational visibility</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-y sm:divide-y-0 divide-border/40">
              {[
                { value: "30,000+", label: "order rows, no backend database" },
                { value: "-80%", label: "manual reporting time" },
                { value: "7", label: "KPI inventory view" },
                { value: "MTD/YTD", label: "same-period comparisons" },
              ].map((stat) => (
                <div key={stat.label} className="text-center px-4 py-7 sm:py-8">
                  <p className="text-3xl sm:text-4xl font-bold text-primary tracking-tight mb-2">{stat.value}</p>
                  <p className="text-xs text-muted-foreground leading-snug">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>

        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection delay={0.14}>
            <blockquote className="mb-10">
              <p className="text-xl sm:text-2xl text-foreground/90 leading-snug tracking-tight mb-4">
                "He built a beautiful sales- and inventory dashboard for me over a month, and went
                out of his way to make it just as I wanted it."
              </p>
              <footer className="text-sm text-muted-foreground">
                Harald, Co-owner, Forlag
                {forlagProject && (<>{" · "}<Link to={`/portfolio/${forlagProject.slug}`} className="text-primary hover:underline">Case study</Link></>)}
              </footer>
            </blockquote>
            {/* Andi's wording proves breadth — several disciplines landing as */}
            {/* one solution. Raheem's proves something narrower — individual  */}
            {/* expertise and follow-through. Two different dimensions, so     */}
            {/* Andi leads at full weight and Raheem responds alongside it,    */}
            {/* not as a second identical card repeating the same claim.       */}
            <div className="pt-8 border-t border-border/30 text-left max-w-xl mx-auto">
              <p className="text-lg sm:text-xl text-foreground/90 leading-snug tracking-tight mb-3">
                "Their combination of web development, AI integration, design, UX, and SEO into
                one solution was impressive."
              </p>
              <p className="text-xs text-muted-foreground mb-6">Andi, First North Peptides <span className="text-muted-foreground/50">(Clutch, verified)</span></p>
              {raheemTestimonial && (
                <div className="flex gap-4 pt-5 border-t border-border/20">
                  <span className="w-px flex-shrink-0 bg-border/40 mt-0.5" aria-hidden="true" />
                  <div>
                    <p className="text-sm text-muted-foreground/80 leading-relaxed mb-2">"{raheemTestimonial.quote}"</p>
                    <p className="text-xs text-muted-foreground/60">{raheemTestimonial.author}, {raheemTestimonial.role}</p>
                  </div>
                </div>
              )}
            </div>
          </AnimatedSection>
        </div>

        {/* The bridge — names the shift from "what changed operationally"   */}
        {/* to "what it takes to build it" before the second proof appears.  */}
        <AnimatedSection delay={0.06} className="flex flex-col items-center my-16 sm:my-20" aria-hidden="true">
          <span className="w-px h-10 bg-gradient-to-b from-border/40 to-primary/40" />
        </AnimatedSection>

        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-10">
          <AnimatedSection>
            <p className="text-sm font-bold uppercase tracking-[0.14em] text-primary/70 mb-2">Proof two — the engineering</p>
            <h3 className="text-xl sm:text-2xl font-bold text-foreground tracking-tight max-w-lg mx-auto mb-4">
              Anyone can build a funnel. Not everyone builds what's behind it.
            </h3>
            <p className="text-sm text-muted-foreground max-w-md mx-auto">
              This is what a client means when she says the difference showed up in the engineering,
              not just the interface.
            </p>
          </AnimatedSection>
        </div>

        <AnimatedSection delay={0.09} className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <TestimonialFilm
            src="/videos/reema-rafay-testimonial.mp4"
            poster="/images/video-posters/reema-rafay-poster.jpg"
            captionsSrc="/captions/reema-rafay-testimonial.vtt"
            variant="proof"
          />
        </AnimatedSection>

        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center mt-10">
          <AnimatedSection delay={0.12}>
            <blockquote>
              <p className="text-xl sm:text-2xl text-foreground/90 leading-snug tracking-tight mb-4">
                "Anyone can build a funnel, okay? But to build a funnel and have the functionality,
                the coding, the programming at the back and the look and feel at the front end for a
                seamless client experience is second to none."
              </p>
              <footer className="text-sm text-muted-foreground">Reema Rafay, National Vice President, Arbonne</footer>
            </blockquote>
          </AnimatedSection>
        </div>
      </section>

      {/* ================================================================ */}
      {/* FAQ                                                                */}
      {/* ================================================================ */}
      <section className="py-24 sm:py-28 bg-background">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center">
            <SectionEyebrow className="mb-6">FAQ</SectionEyebrow>
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight">Before you scope this.</h2>
          </AnimatedSection>
          <div className="flex justify-center my-10 sm:my-12" aria-hidden="true">
            <span className="w-px h-10 sm:h-12 bg-gradient-to-b from-primary/40 to-transparent" />
          </div>
          <AnimatedSection delay={0.06}>
            <FAQAccordion items={webDetailFAQs} idPrefix="web-detail-faq" />
          </AnimatedSection>
        </div>
      </section>

      {/* ================================================================ */}
      {/* CLOSE                                                              */}
      {/* ================================================================ */}
      <section className="relative overflow-hidden bg-background py-32 sm:py-44">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_55%_55%_at_50%_50%,rgba(196,138,100,0.07),transparent_70%)]" />
        <div className="relative max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <p className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.15] mb-12">
              <span className="block text-muted-foreground/50">Tell us what your business</span>
              <span className="block text-foreground mt-2">actually runs on today.</span>
            </p>
          </AnimatedSection>
          <AnimatedSection delay={0.06} className="relative inline-block">
            <ClosingGlow />
            <Link to={`/contact?service=${service.slug}`}>
              <motion.button
                whileHover={{ scale: 1.02, y: -3 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.15 }}
                className="group relative bg-gradient-to-b from-primary to-primary/[0.92] text-primary-foreground pl-9 pr-7 sm:pl-11 sm:pr-9 py-4 sm:py-[1.35rem] rounded-full font-semibold text-base sm:text-xl tracking-[-0.01em]
                         shadow-[0_1px_0_0_rgba(255,255,255,0.25)_inset,0_2px_10px_-2px_rgba(0,0,0,0.35),0_16px_36px_-16px_rgba(196,138,100,0.4)]
                         hover:shadow-[0_1px_0_0_rgba(255,255,255,0.3)_inset,0_2px_10px_-2px_rgba(0,0,0,0.4),0_20px_42px_-16px_rgba(196,138,100,0.5)]
                         flex items-center gap-3 sm:gap-4 overflow-hidden transition-shadow duration-300 btn-sheen"
              >
                <span className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-b from-white/[0.14] via-white/0 to-black/[0.06]" />
                <span className="relative">Build Your Web App</span>
                <span className="relative flex items-center justify-center w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-black/10 group-hover:bg-black/[0.14] transition-colors duration-300">
                  <ArrowRight size={14} strokeWidth={2.5} className="group-hover:translate-x-[1.5px] transition-transform duration-200" />
                </span>
              </motion.button>
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </PageTransition>
  );
};

export default WebDetailPage;
