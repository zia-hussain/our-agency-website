import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Check, Map, Cog, Send, ShieldCheck, Search, RefreshCw, Eye, AlertCircle, UserCheck } from "lucide-react";
import SEO from "../../components/common/SEO";
import PageTransition from "../../components/common/PageTransition";
import AnimatedSection from "../../components/common/AnimatedSection";
import SectionEyebrow from "../../components/common/SectionEyebrow";
import FAQAccordion from "../../components/common/FAQAccordion";
import RelatedReading from "../../components/common/RelatedReading";
import ClosingGlow from "../../components/common/ClosingGlow";
import { services } from "../../data/services";
import { automationDetailFAQs } from "../../data/faqs/service-automation";
import { getProjectBySlug } from "../../data/projects";
import { TESTIMONIALS } from "../../data/testimonials";

const service = services.find((s) => s.slug === "ai-automation-solutions")!;
const pageUrl = `https://zumetrix.com/services/${service.slug}`;
const floatingStoneProject = getProjectBySlug("floating-stone-ranch-processor-intake-engine");
const kevinTestimonial = TESTIMONIALS.find((t) => t.id === "kevin-automation");
const allaythTestimonial = TESTIMONIALS.find((t) => t.id === "allayth-shopify-automation");

const PIPELINE = [
  { icon: Map, label: "Map", items: ["Workflow mapping before any tool gets touched", "CRM, Sheets, Slack & business-tool connections"] },
  { icon: Cog, label: "Logic", items: ["Make.com, n8n & Zapier orchestration", "Custom AI bots with OpenAI integration", "Document processing & data extraction"] },
  { icon: ShieldCheck, label: "Trust it", items: ["Error handling & recoverability, not just the happy path", "Automated reporting for visibility"] },
];

const PROCESS_LOG = [
  { icon: Search, title: "Map", description: "The actual manual process, step by step, before we decide what to automate." },
  { icon: Send, title: "Connect", description: "Your existing tools wired together properly, not duct-taped." },
  { icon: Cog, title: "Automate", description: "Triggers, actions, and AI where it genuinely helps." },
  { icon: RefreshCw, title: "Test", description: "Run against real conditions, not a clean demo scenario." },
  { icon: Eye, title: "Observe", description: "You can see the workflow running and know when something needs attention." },
];

const AutomationDetailPage: React.FC = () => {
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

        {/* Its own, wider row — left-aligned inside the narrow centered   */}
        {/* content column left it stranded in empty space at wide         */}
        {/* viewports, disconnected from everything below it. This width   */}
        {/* anchors it near the true page edge instead, the way the        */}
        {/* portfolio/article detail pages already do it.                  */}
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
          <AnimatedSection mode="hero">
            <Link to="/services" className="inline-block">
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
          </AnimatedSection>
        </div>

        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection mode="hero" delay={0.04}>
            <SectionEyebrow className="mb-7">AI Automation &amp; Workflows</SectionEyebrow>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-foreground tracking-tight mb-6">{service.title}</h1>
            <p className="text-xl sm:text-2xl font-semibold tracking-tight leading-[1.35] mb-8 max-w-xl mx-auto">
              <span className="text-muted-foreground/50">The manual work between your tools,</span>{" "}
              <span className="text-foreground">replaced by a system that runs it.</span>
            </p>
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
              <Link to={`/contact?service=${service.slug}`} className="group inline-flex items-center gap-3 rounded-full bg-primary text-primary-foreground pl-7 pr-2 py-2 text-sm font-semibold hover:bg-primary/90 transition-colors duration-200 btn-sheen">
                Automate Your Workflow
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-black/10 group-hover:bg-black/[0.16] transition-colors duration-300">
                  <ArrowRight size={14} strokeWidth={2.5} className="group-hover:translate-x-[1.5px] transition-transform duration-200" />
                </span>
              </Link>
              <span className="text-sm font-medium text-muted-foreground">{service.price}</span>
            </div>
          </AnimatedSection>

          <AnimatedSection mode="hero" delay={0.1} className="mt-16 sm:mt-20">
            <div className="flex items-center justify-center px-2 mb-10">
              <div className="flex items-end gap-2 sm:gap-7">
                {[{ label: "Emails", mt: "0px", rotate: "-7deg" }, { label: "Sheets", mt: "20px", rotate: "5deg" }, { label: "Manual", mt: "-8px", rotate: "-3deg" }, { label: "Tools", mt: "14px", rotate: "6deg" }].map((sq) => (
                  <span key={sq.label} className="flex flex-col items-center gap-2 sm:gap-3" style={{ marginTop: sq.mt }}>
                    <span className="block w-6 h-6 sm:w-11 sm:h-11 rounded-[6px] sm:rounded-[7px] border border-muted-foreground/30" style={{ transform: `rotate(${sq.rotate})` }} />
                    <span className="text-[10px] sm:text-xs text-muted-foreground/50 whitespace-nowrap">{sq.label}</span>
                  </span>
                ))}
              </div>
              <span className="w-6 sm:w-28 h-px mx-2 sm:mx-6 bg-gradient-to-r from-muted-foreground/20 via-primary/50 to-primary/80 flex-shrink-0" />
              <span className="flex flex-col items-center gap-2 sm:gap-3 flex-shrink-0">
                <span className="flex items-center justify-center w-11 h-11 sm:w-20 sm:h-20 rounded-full border-2 border-primary bg-primary/10">
                  <span className="w-3 h-3 rounded-full bg-primary" />
                </span>
                <span className="text-xs sm:text-sm text-primary/80 font-semibold whitespace-nowrap">One system</span>
              </span>
            </div>
            <div className="max-w-md mx-auto rounded-xl border border-border/50 bg-card/10 overflow-hidden text-left">
              <div className="flex items-center justify-between px-5 py-3 border-b border-border/50 bg-card/20">
                <span className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground/60">Workflow run</span>
                <span className="flex items-center gap-1.5 text-[10px] font-bold text-primary uppercase tracking-wide">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" /> Live
                </span>
              </div>
              <div className="divide-y divide-border/40">
                <div className="flex items-center justify-between px-5 py-3"><span className="text-xs text-foreground/80">Trigger: new order received</span><Check size={13} className="text-primary" /></div>
                <div className="flex items-center justify-between px-5 py-3"><span className="text-xs text-foreground/80">Action: sync to inventory sheet</span><Check size={13} className="text-primary" /></div>
                <div className="flex items-center justify-between px-5 py-3"><span className="text-xs text-foreground/80">Observed: no errors, 0 manual steps</span><Check size={13} className="text-primary" /></div>
              </div>
            </div>
            <p className="text-center text-xs text-muted-foreground/50 mt-4 italic">Illustrative — every real workflow is mapped to your own tools.</p>
          </AnimatedSection>
        </div>
      </section>

      {/* ================================================================ */}
      {/* SIGNATURE SCENE — THE LINE. One integrated flow: scattered manual  */}
      {/* inputs feed onto a belt, pass through three large stations, and   */}
      {/* exit as a single coordinated result. Not three bordered cards.    */}
      {/* ================================================================ */}
      <section className="relative bg-card/10 border-y border-border/40 py-24 sm:py-32 overflow-hidden">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-4">
          <AnimatedSection>
            <SectionEyebrow className="mb-6">What We Build</SectionEyebrow>
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight max-w-lg mx-auto">
              Not a tool logo wall. A line that holds up.
            </h2>
          </AnimatedSection>
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Feeding in — the real manual chaos, scattered and rotated */}
          <AnimatedSection delay={0.02} className="flex flex-wrap justify-center gap-2.5 mb-3">
            {["Email", "Spreadsheet", "Slack", "Manual entry"].map((chip, i) => (
              <span
                key={chip}
                className="text-xs font-medium text-muted-foreground/60 border border-border/40 rounded-full px-3.5 py-1.5"
                style={{ transform: `rotate(${[-3, 2, -2, 3][i]}deg)` }}
              >
                {chip}
              </span>
            ))}
          </AnimatedSection>
          <div aria-hidden="true" className="hidden sm:block relative max-w-xl mx-auto h-8 mb-1">
            {[
              { text: "checking three tabs to confirm one order", top: "0%", left: "4%", rotate: "-3deg" },
              { text: "re-typing the same data twice", top: "40%", left: "56%", rotate: "2deg" },
            ].map((frag) => (
              <span key={frag.text} className="absolute whitespace-nowrap text-xs text-muted-foreground/30 italic" style={{ top: frag.top, left: frag.left, transform: `rotate(${frag.rotate})` }}>
                {frag.text}
              </span>
            ))}
          </div>
          <AnimatedSection delay={0.04} className="flex justify-center mb-8" aria-hidden="true">
            <ArrowRight size={16} className="text-border rotate-90" />
          </AnimatedSection>

          {/* The line — three large stations riding a single belt */}
          <AnimatedSection delay={0.08} className="relative">
            <span aria-hidden="true" className="hidden sm:block absolute left-[16%] right-[16%] top-10 h-[3px] rounded-full bg-gradient-to-r from-border/40 via-primary/50 to-primary" />
            <div className="grid sm:grid-cols-3 gap-10 sm:gap-4">
              {PIPELINE.map((stage) => (
                <div key={stage.label} className="relative z-10 flex flex-col items-center text-center">
                  <span className="flex items-center justify-center w-20 h-20 rounded-full border-2 border-primary/50 bg-background shadow-[0_25px_55px_-22px_rgba(196,138,100,0.4)] mb-4">
                    <stage.icon size={26} className="text-primary" />
                  </span>
                  <p className="text-base font-bold text-foreground mb-3">{stage.label}</p>
                  <div className="flex flex-wrap justify-center gap-1.5 max-w-[13rem]">
                    {stage.items.map((item) => (
                      <span key={item} className="text-[11px] text-muted-foreground border border-border/50 rounded-full px-2.5 py-1 leading-snug">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </AnimatedSection>

          {/* Out the other end — one coordinated result */}
          <AnimatedSection delay={0.12} className="flex justify-center mt-12 sm:mt-14">
            <div className="inline-flex items-center gap-3 rounded-full border-2 border-primary bg-gradient-to-b from-primary/15 to-transparent px-7 py-3.5 shadow-[0_30px_65px_-25px_rgba(196,138,100,0.4)]">
              <Check size={18} strokeWidth={3} className="text-primary" />
              <span className="text-xl sm:text-2xl font-bold text-foreground tracking-tight">Coordinated</span>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ================================================================ */}
      {/* HOW WE WORK — the same five real steps, but the nodes themselves   */}
      {/* transform left to right: dashed and muted where the operation is   */}
      {/* still manual, solid and glowing once it's coordinated. The         */}
      {/* transformation is the visual, not a label sitting above a list.    */}
      {/* ================================================================ */}
      <section className="py-24 sm:py-32 overflow-hidden">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-14">
          <AnimatedSection>
            <SectionEyebrow className="mb-6">How We Work</SectionEyebrow>
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight">We map the manual process first.</h2>
          </AnimatedSection>
        </div>

        <AnimatedSection delay={0.06} className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-4 px-1">
            <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-muted-foreground/40">Manual</span>
            <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-primary/70">Coordinated</span>
          </div>

          <div className="relative">
            <span
              aria-hidden="true"
              className="hidden sm:block absolute left-[10%] right-[10%] top-8 h-[3px] rounded-full bg-gradient-to-r from-border/25 via-primary/40 to-primary"
            />
            <div className="grid grid-cols-5 gap-2 sm:gap-4">
              {PROCESS_LOG.map((step, i) => {
                const isPivot = i === 2;
                const isCoordinated = i >= 3;
                return (
                  <div key={step.title} className="relative z-10 flex flex-col items-center text-center px-0.5">
                    <span
                      className={`flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 rounded-full mb-3 transition-colors ${
                        isCoordinated
                          ? "border-2 border-primary bg-primary/10 shadow-[0_18px_38px_-16px_rgba(196,138,100,0.5)]"
                          : isPivot
                            ? "border-2 border-primary/50 bg-primary/5"
                            : "border-2 border-dashed border-border/40 bg-card/10"
                      }`}
                    >
                      <step.icon size={18} className={isCoordinated ? "text-primary" : isPivot ? "text-primary/70" : "text-muted-foreground/40"} />
                    </span>
                    <p className="text-[11px] font-bold text-primary/60 mb-1">0{i + 1}</p>
                    <p className={`text-xs sm:text-sm font-bold mb-1 leading-tight ${isCoordinated ? "text-foreground" : "text-muted-foreground"}`}>
                      {step.title}
                    </p>
                    <p className="text-[11px] text-muted-foreground/60 leading-snug hidden sm:block">{step.description}</p>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex justify-center my-6 sm:my-8" aria-hidden="true">
            <svg width="64" height="96" viewBox="0 0 64 96" fill="none" className="text-primary/80">
              <motion.path
                d="M32 4 C48 4, 51 21, 36 28 C19 35, 11 49, 24 58 C33 64, 40 69, 37 78"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                fill="none"
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, ease: "easeInOut" }}
              />
              <motion.path
                d="M25 71 L38 81 L48 68"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: 0.75 }}
              />
            </svg>
          </div>

          <AnimatedSection delay={0.08} className="max-w-2xl mx-auto">
            <div className="btn-sheen relative overflow-hidden rounded-[1.75rem] border border-primary/40 bg-gradient-to-b from-primary/[0.11] via-card/50 to-card/20 p-8 sm:p-11 text-center shadow-[0_45px_90px_-35px_rgba(196,138,100,0.4)]">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_55%_at_50%_0%,rgba(196,138,100,0.14),transparent_70%)]" />
              <div className="relative">
                {/* Eye, not a buoy — the same "still watched" idea as the    */}
                {/* Observe step and the reliability scene below: support     */}
                {/* means the system stays observed, not just fixable.        */}
                <span className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/15 border border-primary/30 mb-5 shadow-[0_0_44px_-10px_rgba(196,138,100,0.55)]">
                  <Eye size={24} className="text-primary" />
                </span>
                <div className="flex items-center justify-center gap-2 mb-3">
                  <span className="relative flex h-2 w-2 flex-shrink-0">
                    <span className="absolute inset-0 rounded-full bg-primary/60 animate-ping" style={{ animationDuration: "2.5s" }} />
                    <span className="relative h-2 w-2 rounded-full bg-primary" />
                  </span>
                  <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-primary/80">After Observe — Ongoing</span>
                </div>
                <p className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight mb-3">Support</p>
                <p className="text-base text-muted-foreground leading-relaxed max-w-md mx-auto">
                  We stay on to fix, extend, and add the next workflow when priorities change — the automation stays known, not abandoned.
                </p>
              </div>
            </div>
          </AnimatedSection>
        </AnimatedSection>
      </section>

      {/* ================================================================ */}
      {/* THE PROOF — Floating Stone Ranch, with the real metrics given     */}
      {/* real authority: giant numbers, not small text above a card.       */}
      {/* ================================================================ */}
      <section className="relative bg-card/10 border-y border-border/40 py-24 sm:py-32">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-4">
          <AnimatedSection className="mb-3">
            <SectionEyebrow>The Proof</SectionEyebrow>
          </AnimatedSection>
          <AnimatedSection delay={0.04}>
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight max-w-xl mx-auto mb-12">
              A beef processor ran logistics on paper. Now every box is traceable.
            </h2>
          </AnimatedSection>
        </div>

        <AnimatedSection delay={0.06} className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 grid sm:grid-cols-2 gap-5 mb-6">
          <div className="rounded-2xl border border-border/40 bg-background/30 p-7 sm:p-8 opacity-60">
            <p className="text-sm font-bold uppercase tracking-[0.14em] text-muted-foreground mb-3">Before</p>
            <p className="text-base text-muted-foreground leading-relaxed">Carcass intake, boxing, and lot tracking, run on paper and manual spreadsheets.</p>
          </div>
          <div className="rounded-2xl border border-primary/35 bg-gradient-to-b from-primary/[0.09] to-transparent p-7 sm:p-8 shadow-[0_30px_65px_-28px_rgba(196,138,100,0.28)]">
            <p className="text-sm font-bold uppercase tracking-[0.14em] text-primary mb-3">After</p>
            <p className="text-base text-foreground/85 leading-relaxed">Every box logged and traceable. Key status changes run through Make.com scenarios.</p>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.09} className="flex justify-center my-2" aria-hidden="true">
          <span className="w-px h-10 bg-gradient-to-b from-border/40 to-primary/40" />
        </AnimatedSection>

        <AnimatedSection delay={0.1} className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <div className="rounded-2xl border border-border/50 bg-background/50 overflow-hidden">
            <div className="flex items-center justify-center px-6 py-3.5 border-b border-border/50 bg-card/20">
              <span className="text-xs font-bold uppercase tracking-[0.16em] text-primary/70">The result</span>
            </div>
            <div className="grid grid-cols-1 divide-y divide-border/40 md:grid-cols-2 md:divide-x md:divide-y-0">
              <div className="text-center px-4 py-9 sm:py-11">
                <p className="text-5xl md:text-6xl font-bold text-primary tracking-tight">100%</p>
                <p className="text-xs sm:text-sm text-muted-foreground mt-3 max-w-[10rem] mx-auto">carcass, box &amp; shipment data centralized</p>
              </div>
              <div className="text-center px-4 py-9 sm:py-11">
                <p className="text-5xl md:text-6xl font-bold text-primary tracking-tight">Make.com</p>
                <p className="text-xs sm:text-sm text-muted-foreground mt-3 max-w-[10rem] mx-auto">scenarios run the key status transitions</p>
              </div>
            </div>
          </div>
        </AnimatedSection>

        <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection delay={0.12}>
            <p className="text-sm text-muted-foreground leading-relaxed mb-8">
              Bill of Lading data is generated automatically from the same base — the pipeline runs
              from intake through shipping, not just the intake step.
            </p>
            <blockquote className="mb-8">
              <p className="text-xl sm:text-2xl text-foreground/90 leading-snug tracking-tight mb-4">
                "The team understood the complexity of my industry and of the project quickly and
                were flexible with the scope as we all learned to deal with new solutions on the fly."
              </p>
              <footer className="text-sm text-muted-foreground">
                James, Owner, Floating Stone Ranch
                {floatingStoneProject && (<>{" · "}<Link to={`/portfolio/${floatingStoneProject.slug}`} className="text-primary hover:underline">Case study</Link></>)}
              </footer>
            </blockquote>
          </AnimatedSection>

          {/* Kevin's wording proves integration depth — a scalable system   */}
          {/* tying four real tools together. Allayth's proves something     */}
          {/* narrower — a concrete result, delivered with extra effort. Two */}
          {/* different dimensions: Kevin leads at full weight, Allayth      */}
          {/* responds as a smaller aside, not a second identical card.      */}
          {(kevinTestimonial || allaythTestimonial) && (
            <AnimatedSection delay={0.14} className="pt-8 border-t border-border/30 text-left max-w-xl mx-auto">
              {kevinTestimonial && (
                <>
                  <p className="text-lg sm:text-xl text-foreground/90 leading-snug tracking-tight mb-3">"{kevinTestimonial.quote}"</p>
                  <p className="text-xs text-muted-foreground mb-6">{kevinTestimonial.author} <span className="text-muted-foreground/50">({kevinTestimonial.platform})</span></p>
                </>
              )}
              {allaythTestimonial && (
                <p className="text-sm text-muted-foreground/80 leading-relaxed italic pl-6 border-l-2 border-primary/20">
                  "{allaythTestimonial.quote}"{" "}
                  <span className="not-italic text-muted-foreground/60">— {allaythTestimonial.author}, {allaythTestimonial.role}</span>
                </p>
              )}
            </AnimatedSection>
          )}
        </div>
      </section>

      {/* ================================================================ */}
      {/* WHEN SOMETHING FAILS — four beats, not two: detection, the real    */}
      {/* branch (retry dominant, escalate rare), and — the part that was    */}
      {/* missing — observability as its own persistent visual, not just a   */}
      {/* label. Reuses the hero's "workflow run" log language on purpose,   */}
      {/* so this reads as the same system, being watched, not a new device. */}
      {/* ================================================================ */}
      <section className="relative bg-background py-24 sm:py-32">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-14">
          <AnimatedSection>
            <SectionEyebrow className="mb-6">Reliability</SectionEyebrow>
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight">Failure shouldn't disappear silently.</h2>
            <p className="text-sm text-muted-foreground mt-4 max-w-sm mx-auto leading-relaxed">
              Automation isn't "it runs and we hope." A workflow should have a defined answer for a
              failed step — retry it, alert someone, or stop and wait for a person — settled before
              launch, not discovered after the first failure.
            </p>
          </AnimatedSection>
        </div>

        <AnimatedSection delay={0.06} className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center mb-9">
            <span className="inline-flex items-center gap-2.5 rounded-full border border-primary/40 bg-primary/10 px-5 py-2.5 text-sm font-semibold text-foreground shadow-[0_20px_45px_-25px_rgba(196,138,100,0.5)]">
              <span className="relative flex h-2 w-2 flex-shrink-0">
                <span className="absolute inset-0 rounded-full bg-primary/60 animate-ping" style={{ animationDuration: "2s" }} />
                <span className="relative h-2 w-2 rounded-full bg-primary" />
              </span>
              <AlertCircle size={15} className="text-primary flex-shrink-0" />
              Step failed — flagged
            </span>
          </div>

          <svg viewBox="0 0 400 90" className="w-full max-w-md mx-auto h-auto mb-1" aria-hidden="true">
            <path d="M 200 0 L 200 22 L 300 70" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" className="text-primary" />
            <path d="M 200 0 L 200 22 L 100 70" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" className="text-border/50" />
            <circle cx="200" cy="2" r="4" className="fill-foreground/50" />
          </svg>
          <div className="grid sm:grid-cols-2 gap-6 sm:gap-10 max-w-md mx-auto mb-16">
            <div className="text-center sm:text-right order-2 sm:order-1 opacity-50">
              <span className="inline-flex items-center justify-center w-10 h-10 rounded-full border border-dashed border-border/50 bg-background mb-3">
                <UserCheck size={16} className="text-muted-foreground/60" />
              </span>
              <p className="text-sm font-semibold text-muted-foreground mb-1">Escalated to a person</p>
              <p className="text-xs text-muted-foreground/60 leading-relaxed">When a retry isn't safe, a person should be told exactly what happened — not left guessing.</p>
            </div>
            <div className="text-center sm:text-left order-1 sm:order-2">
              <span className="inline-flex items-center justify-center w-12 h-12 rounded-full border-2 border-primary bg-primary/10 shadow-[0_18px_38px_-16px_rgba(196,138,100,0.5)] mb-3">
                <RefreshCw size={18} className="text-primary" />
              </span>
              <p className="text-base font-bold text-foreground mb-1">Retried automatically</p>
              <p className="text-sm text-muted-foreground leading-relaxed">When repeating a step is safe, it can be retried before anyone is interrupted.</p>
            </div>
          </div>

          {/* Observability — the fourth beat. Persistent regardless of      */}
          {/* which branch a given failure took, which is the point.         */}
          <div className="rounded-2xl border border-border/50 bg-card/10 overflow-hidden max-w-lg mx-auto">
            <div className="flex items-center gap-2 px-5 py-3 border-b border-border/50 bg-card/20">
              <Eye size={13} className="text-primary/70 flex-shrink-0" />
              <span className="text-xs font-bold uppercase tracking-[0.14em] text-foreground/80">What a run log looks like</span>
            </div>
            <div className="divide-y divide-border/30">
              {[
                { t: "14:02:11", label: "Order sync — retried once, recovered", ok: true },
                { t: "14:02:44", label: "Inventory update — completed", ok: true },
                { t: "14:03:02", label: "Payment webhook — escalated", ok: false },
              ].map((row) => (
                <div key={row.t} className="flex items-center gap-3 px-5 py-2.5">
                  <span className="font-mono text-[10px] text-muted-foreground/50 flex-shrink-0 w-14">{row.t}</span>
                  <span className="text-xs text-muted-foreground flex-1">{row.label}</span>
                  <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${row.ok ? "bg-primary" : "bg-muted-foreground/50"}`} />
                </div>
              ))}
            </div>
          </div>
          <p className="text-center text-xs text-muted-foreground/50 italic mt-4">Illustrative — what a failed step should do, and what's worth monitoring, depends on the workflow.</p>
        </AnimatedSection>
      </section>

      {/* ================================================================ */}
      {/* FAQ                                                                */}
      {/* ================================================================ */}
      <section className="py-24 sm:py-28 bg-background">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center">
            <SectionEyebrow className="mb-6">FAQ</SectionEyebrow>
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight">Before you automate this.</h2>
          </AnimatedSection>
          <div className="flex justify-center my-10 sm:my-12" aria-hidden="true">
            <span className="w-px h-10 sm:h-12 bg-gradient-to-b from-primary/40 to-transparent" />
          </div>
          <AnimatedSection delay={0.06}>
            <FAQAccordion items={automationDetailFAQs} idPrefix="automation-detail-faq" />
          </AnimatedSection>
        </div>
      </section>

      {/* ================================================================ */}
      {/* RELATED READING                                                    */}
      {/* ================================================================ */}
      <section className="pb-8 bg-background">
        <div className="px-4 sm:px-6 lg:px-8">
          <RelatedReading
            links={[
              {
                href: "/articles/when-is-ai-automation-the-wrong-choice",
                label: "When is AI automation the wrong choice?",
                description: "Deterministic, AI-assisted, human-in-the-loop, or not yet — how we actually decide.",
              },
              {
                href: "/articles/ai-automation-business-growth",
                label: "AI automation for business: where to start",
                description: "Where AI automation genuinely helps, and which workflows to automate first.",
              },
              {
                href: "/portfolio/stripe-to-airtable-subscription-sync",
                label: "Stripe to Airtable — subscription sync automation",
                description: "A real deterministic automation: no AI in the loop, because none was needed.",
              },
            ]}
          />
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
              <span className="block text-muted-foreground/50">Show us the manual workflow.</span>
              <span className="block text-foreground mt-2">We'll tell you what's worth automating.</span>
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
                <span className="relative">Automate Your Workflow</span>
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

export default AutomationDetailPage;
