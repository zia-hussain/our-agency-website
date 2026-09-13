import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Check, Map, Cog, Send, ShieldCheck, Search, RefreshCw, Eye } from "lucide-react";
import SEO from "../../components/common/SEO";
import PageTransition from "../../components/common/PageTransition";
import AnimatedSection from "../../components/common/AnimatedSection";
import SectionEyebrow from "../../components/common/SectionEyebrow";
import FAQAccordion from "../../components/common/FAQAccordion";
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
            <p className="text-base text-foreground/85 leading-relaxed">Every box logged and traceable. Status changes handled by Make.com, not a person.</p>
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
            <div className="grid grid-cols-2 divide-x divide-border/40">
              <div className="text-center px-4 py-9 sm:py-11">
                <p className="text-5xl sm:text-7xl font-bold text-primary tracking-tight">100%</p>
                <p className="text-xs sm:text-sm text-muted-foreground mt-3 max-w-[10rem] mx-auto">carcass, box &amp; shipment data centralized</p>
              </div>
              <div className="text-center px-4 py-9 sm:py-11">
                <p className="text-5xl sm:text-7xl font-bold text-primary tracking-tight">-60%</p>
                <p className="text-xs sm:text-sm text-muted-foreground mt-3 max-w-[10rem] mx-auto">manual steps replaced by automation</p>
              </div>
            </div>
          </div>
        </AnimatedSection>

        <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection delay={0.12}>
            <p className="text-sm text-muted-foreground leading-relaxed mb-8">
              Bills of lading generated automatically — the full pipeline, not just the intake
              step, running without a person in the loop.
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

          {(kevinTestimonial || allaythTestimonial) && (
            <AnimatedSection delay={0.14} className="grid sm:grid-cols-2 gap-6 text-left pt-8 border-t border-border/30">
              {kevinTestimonial && (
                <div className="rounded-xl border border-border/50 bg-background/30 p-5">
                  <p className="text-sm text-foreground/85 leading-relaxed mb-3">"{kevinTestimonial.quote}"</p>
                  <p className="text-xs text-muted-foreground">{kevinTestimonial.author} <span className="text-muted-foreground/50">({kevinTestimonial.platform})</span></p>
                </div>
              )}
              {allaythTestimonial && (
                <div className="rounded-xl border border-border/50 bg-background/30 p-5">
                  <p className="text-sm text-foreground/85 leading-relaxed mb-3">"{allaythTestimonial.quote}"</p>
                  <p className="text-xs text-muted-foreground">{allaythTestimonial.author}, {allaythTestimonial.role}</p>
                </div>
              )}
            </AnimatedSection>
          )}
        </div>
      </section>

      {/* ================================================================ */}
      {/* WHEN SOMETHING FAILS — a real branching flow: most failures       */}
      {/* resolve themselves; the rare ones are handed to a person, never   */}
      {/* left silent. Drawn, not listed in three cards.                    */}
      {/* ================================================================ */}
      <section className="relative bg-background py-24 sm:py-28">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-10">
          <AnimatedSection>
            <p className="text-lg sm:text-xl font-bold text-foreground tracking-tight">Failure doesn't disappear silently.</p>
          </AnimatedSection>
        </div>

        <AnimatedSection delay={0.05} className="max-w-md mx-auto">
          <div className="flex justify-center mb-1">
            <span className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-card/15 px-4 py-2 text-sm font-semibold text-foreground">
              Error detected
            </span>
          </div>
          <svg viewBox="0 0 320 80" className="w-full h-auto" aria-hidden="true">
            <path d="M 160 0 L 160 22 L 250 70" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" className="text-primary" />
            <path d="M 160 0 L 160 22 L 70 70" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" className="text-border/50" />
          </svg>
          <div className="grid sm:grid-cols-2 gap-4 sm:gap-8 -mt-2">
            <div className="text-center sm:text-left order-2 sm:order-1 opacity-45">
              <p className="text-sm font-semibold text-muted-foreground mb-1">Escalates to a person</p>
              <p className="text-xs text-muted-foreground/60 leading-relaxed">Rare — and you're told exactly what happened, not left guessing.</p>
            </div>
            <div className="text-center sm:text-right order-1 sm:order-2">
              <p className="text-base font-bold text-foreground mb-1">Retry &amp; recovery succeeds</p>
              <p className="text-sm text-muted-foreground leading-relaxed">The common case — automatic retry logic handles it without anyone noticing.</p>
            </div>
          </div>
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
