import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Check, Search, FileSearch, GitFork, Wrench, ShieldCheck, Send, X } from "lucide-react";
import SEO from "../../components/common/SEO";
import PageTransition from "../../components/common/PageTransition";
import AnimatedSection from "../../components/common/AnimatedSection";
import SectionEyebrow from "../../components/common/SectionEyebrow";
import FAQAccordion from "../../components/common/FAQAccordion";
import RelatedReading from "../../components/common/RelatedReading";
import TestimonialFilm from "../../components/common/TestimonialFilm";
import ClosingGlow from "../../components/common/ClosingGlow";
import { rescueService } from "../../data/services";
import { rescueDetailFAQs } from "../../data/faqs/service-rescue";
import { TESTIMONIAL_FILMS } from "../../data/testimonialFilms";
import { buildVideoObjectSchema } from "../../utils/videoSchema";
import { TESTIMONIALS } from "../../data/testimonials";

const service = rescueService;
const pageUrl = `https://zumetrix.com/services/${service.slug}`;
const fastTrackTestimonial = TESTIMONIALS.find((t) => t.id === "josh-fast-track");
const nathanTestimonial = TESTIMONIALS.find((t) => t.id === "nathan-api-rescue");
const bharatTestimonial = TESTIMONIALS.find((t) => t.id === "bharat-bondfire");

const SKEPTIC_FRAGMENTS = [
  { text: "\"promised, then ghosted\"", top: "2%", left: "4%", rotate: "-5deg" },
  { text: "\"fixed once, broke again a week later\"", top: "38%", left: "22%", rotate: "3deg" },
  { text: "\"already burned through a budget on this\"", top: "8%", left: "50%", rotate: "-3deg" },
  { text: "\"nobody ever explained what was actually wrong\"", top: "42%", left: "62%", rotate: "4deg" },
  { text: "\"the last team just disappeared\"", top: "0%", left: "82%", rotate: "-6deg" },
];

const ASSESSMENT = ["Codebase & architecture health review", "Security & dependency audit", "Clear findings report — what's broken, fragile, or fine"];
const FIX = ["Bug fixes & critical issue resolution", "Performance & reliability improvements", "API cleanup & database logic fixes"];
const FORWARD = ["Honest repair-vs-rebuild recommendation", "Documentation & team handover", "Ongoing support option after stabilization"];

const KNIPSR_HARDENED = [
  "Durable background processing for media, with retry & recovery",
  "Storage & delivery architecture across Supabase, Postgres, Edge Functions, Cloudflare Stream",
  "Caching & performance tuning for gallery load under real usage",
  "Private access & expiry flows for guest and host privacy",
];

const RescueDetailPage: React.FC = () => {
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
      buildVideoObjectSchema(TESTIMONIAL_FILMS.josh),
    ],
  };

  return (
    <PageTransition>
      <SEO
        title={service.seo.title}
        description={service.seo.description}
        keywords={service.seo.keywords}
        image={`https://zumetrix.com/og/services-${service.slug}.png`}
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
            <SectionEyebrow className="mb-7">Product Rescue &amp; Stabilization</SectionEyebrow>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-foreground tracking-tight mb-6">{service.title}</h1>
            <p className="text-xl sm:text-2xl font-semibold tracking-tight leading-[1.35] mb-8 max-w-xl mx-auto">
              <span className="text-muted-foreground/50">You already paid for this once.</span>{" "}
              <span className="text-foreground">We start by understanding what's actually wrong.</span>
            </p>
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
              <Link to={`/contact?service=${service.slug}`} className="group inline-flex items-center gap-3 rounded-full bg-primary text-primary-foreground pl-7 pr-2 py-2 text-sm font-semibold hover:bg-primary/90 transition-colors duration-200 btn-sheen">
                Get a Free Assessment
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-black/10 group-hover:bg-black/[0.16] transition-colors duration-300">
                  <ArrowRight size={14} strokeWidth={2.5} className="group-hover:translate-x-[1.5px] transition-transform duration-200" />
                </span>
              </Link>
              <span className="text-sm font-medium text-muted-foreground">{service.price}</span>
            </div>
          </AnimatedSection>

          <AnimatedSection mode="hero" delay={0.1} className="mt-16 sm:mt-20">
            <div className="relative max-w-lg mx-auto rounded-2xl border border-border/50 bg-card/10 overflow-hidden text-left">
              <div className="px-6 py-4 border-b border-border/50 bg-card/20">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground/60">Findings report</p>
              </div>
              <div className="divide-y divide-border/40">
                <div className="flex items-center justify-between px-6 py-4">
                  <span className="text-sm text-foreground/80">Core booking flow</span>
                  <span className="text-xs font-semibold text-primary">Fine — kept as is</span>
                </div>
                <div className="flex items-center justify-between px-6 py-4">
                  <span className="text-sm text-foreground/80">Payment webhook handling</span>
                  <span className="text-xs font-semibold text-red-400/80">Fragile — needs a fix</span>
                </div>
                <div className="flex items-center justify-between px-6 py-4">
                  <span className="text-sm text-foreground/80">Admin permission logic</span>
                  <span className="text-xs font-semibold text-muted-foreground/60">Unfinished — was mid-build</span>
                </div>
              </div>
            </div>
            <p className="text-center text-xs text-muted-foreground/50 mt-4 italic">Illustrative — every real assessment produces its own findings.</p>
          </AnimatedSection>
        </div>
      </section>

      {/* ================================================================ */}
      {/* WE KNOW YOU'RE SKEPTICAL — the emotional acknowledgment a rescue   */}
      {/* buyer needs before anything else. Scattered fragments of what     */}
      {/* people say before working with us, resolving into one line.       */}
      {/* ================================================================ */}
      <section className="relative bg-background py-20 sm:py-28 border-b border-border/40 overflow-hidden">
        <div aria-hidden="true" className="hidden sm:block relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 h-24 mb-4">
          {SKEPTIC_FRAGMENTS.map((frag) => (
            <span
              key={frag.text}
              className="absolute whitespace-nowrap text-sm text-muted-foreground/30 italic"
              style={{ top: frag.top, left: frag.left, transform: `rotate(${frag.rotate})` }}
            >
              {frag.text}
            </span>
          ))}
        </div>
        <div className="relative max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <p className="text-xl sm:text-2xl font-semibold text-foreground tracking-tight leading-snug">
              You don't need to trust us yet — we start by finding out what's actually true.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* ================================================================ */}
      {/* TRIAGE BOARD — everything that comes in, unsorted, feeding down    */}
      {/* into three ordered bins. The sorting happens visually instead of   */}
      {/* being asserted by three labeled boxes that happen to sit side by   */}
      {/* side.                                                              */}
      {/* ================================================================ */}
      <section className="relative bg-card/10 border-b border-border/40 py-24 sm:py-28">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-12">
            <SectionEyebrow className="mb-6">What We Do</SectionEyebrow>
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight max-w-lg mx-auto">
              Not a rebuild before we understand what deserves to stay.
            </h2>
          </AnimatedSection>

          {/* Everything that comes in — unsorted, no category yet. */}
          <AnimatedSection delay={0.02} className="flex flex-wrap justify-center gap-2 mb-1">
            {["Old bugs", "Half-built features", "Unclear code", "Security gaps", "Slow queries", "No docs"].map((chip, i) => (
              <span
                key={chip}
                className="text-xs font-medium text-muted-foreground/50 border border-border/40 rounded-full px-3.5 py-1.5"
                style={{ transform: `rotate(${[-3, 2, -2, 3, -1, 2][i]}deg)` }}
              >
                {chip}
              </span>
            ))}
          </AnimatedSection>
          <AnimatedSection delay={0.04} className="flex justify-center mb-9" aria-hidden="true">
            <ArrowRight size={16} className="text-border rotate-90" />
          </AnimatedSection>

          {/* Sorted into three ordered bins — numbered, so it reads as a    */}
          {/* sequence (assess, then fix, then move forward) rather than     */}
          {/* three equal, parallel categories.                              */}
          <AnimatedSection delay={0.08}>
            <div className="grid sm:grid-cols-3 gap-4">
              {[
                { n: "1", label: "Assess", tone: "border-border/50 bg-background/40", dot: "bg-muted-foreground/40", items: ASSESSMENT },
                { n: "2", label: "Fix", tone: "border-red-400/20 bg-background/40", dot: "bg-red-400/50", items: FIX },
                { n: "3", label: "Move forward", tone: "border-primary/30 bg-gradient-to-b from-primary/[0.06] to-transparent", dot: "bg-primary", items: FORWARD },
              ].map((col) => (
                <div key={col.label} className={`relative z-10 rounded-xl border ${col.tone}`}>
                  <div className="flex items-center gap-2.5 px-5 pt-5 pb-1">
                    <span className={`flex items-center justify-center w-6 h-6 rounded-full text-[10px] font-bold text-background ${col.dot}`}>{col.n}</span>
                    <p className="text-xs font-bold uppercase tracking-[0.16em] text-foreground/80">{col.label}</p>
                  </div>
                  <div className="p-5 pt-3">
                    <ul className="space-y-3">
                      {col.items.map((item) => (
                        <li key={item} className="text-xs text-muted-foreground leading-relaxed">{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ================================================================ */}
      {/* HOW WE WORK — a vertical investigation, not a horizontal row of    */}
      {/* icons. "Decide" is drawn as an inline fork: stabilize is the       */}
      {/* honest default, rebuild is the rare exception.                    */}
      {/* ================================================================ */}
      <section className="py-24 sm:py-28">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <SectionEyebrow className="mb-6">How We Work</SectionEyebrow>
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight">Investigate before we prescribe.</h2>
          </AnimatedSection>

          <div className="relative pl-9 sm:pl-11">
            <span aria-hidden="true" className="pointer-events-none absolute left-3.5 sm:left-4 top-1 bottom-1 w-px bg-gradient-to-b from-primary/50 via-border to-transparent" />
            {[
              { icon: Search, title: "Inspect", description: "Codebase, architecture, dependencies — reviewed before recommending anything." },
              { icon: FileSearch, title: "Diagnose", description: "A clear findings report: what's broken, what's fragile, what's actually fine." },
            ].map((step) => (
              <div key={step.title} className="relative pb-9">
                <span className="absolute -left-9 sm:-left-11 top-0.5 flex items-center justify-center w-7 h-7 rounded-full border border-primary/30 bg-background text-primary flex-shrink-0">
                  <step.icon size={12} />
                </span>
                <p className="text-base font-bold text-foreground mb-1">{step.title}</p>
                <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* SIGNATURE SCENE — the moment that matters most, given real       */}
        {/* width and asymmetric weight. Stabilize is the honest default,    */}
        {/* rendered large and solid; Rebuild is the rare exception.         */}
        <AnimatedSection delay={0.08} className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 my-4">
          <div className="flex items-center gap-3 justify-center mb-6">
            <GitFork size={16} className="text-primary" />
            <p className="text-xl sm:text-2xl font-bold text-foreground tracking-tight">Decide.</p>
          </div>
          <div className="grid sm:grid-cols-5 gap-4 sm:gap-5 items-stretch">
            <div className="sm:col-span-3 rounded-2xl border border-primary/40 bg-gradient-to-b from-primary/10 to-primary/[0.02] p-7 sm:p-9 shadow-[0_35px_80px_-30px_rgba(196,138,100,0.3)]">
              <p className="text-lg sm:text-xl font-bold text-foreground mb-2">Stabilize what deserves to stay</p>
              <p className="text-sm text-muted-foreground leading-relaxed">Where the foundation holds, we fix what blocks safe change and leave the rest alone.</p>
            </div>
            <div className="sm:col-span-2 rounded-2xl border border-dashed border-border/40 bg-card/5 p-6 sm:p-7 opacity-50 flex flex-col justify-center">
              <p className="text-sm font-semibold text-muted-foreground mb-2">Rebuild what can't responsibly be saved</p>
              <p className="text-xs text-muted-foreground/60 leading-relaxed">Only where the assessment shows it — and we'll show you exactly why.</p>
            </div>
          </div>
        </AnimatedSection>

        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative pl-9 sm:pl-11">
            <span aria-hidden="true" className="pointer-events-none absolute left-3.5 sm:left-4 top-0 bottom-1 w-px bg-gradient-to-b from-transparent via-border to-border/40" />
            {[
              { icon: Wrench, title: "Stabilize", description: "Fixes delivered in reviewable milestones, not a black box you wait on." },
              { icon: ShieldCheck, title: "Verify", description: "Testing and reliability verification before we call it done." },
              { icon: Send, title: "Move forward", description: "Full documentation and handover, so your team understands what changed and why." },
            ].map((step, i, arr) => (
              <div key={step.title} className={i < arr.length - 1 ? "relative pb-9 pt-2" : "relative pt-2"}>
                <span className="absolute -left-9 sm:-left-11 top-2.5 flex items-center justify-center w-7 h-7 rounded-full border border-primary/30 bg-background text-primary flex-shrink-0">
                  <step.icon size={12} />
                </span>
                <p className="text-base font-bold text-foreground mb-1">{step.title}</p>
                <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
              </div>
            ))}
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

          <div className="rounded-[1.75rem] border border-primary/40 bg-gradient-to-b from-primary/[0.11] via-card/50 to-card/20 p-8 sm:p-11 text-center shadow-[0_45px_90px_-35px_rgba(196,138,100,0.4)]">
            <div className="relative">
              <span className="inline-flex items-center justify-center w-16 h-16 rounded-full border border-primary/30 bg-background mb-5">
                <ShieldCheck size={26} className="text-primary" />
              </span>
              <div className="flex items-center justify-center gap-2 mb-3">
                <span className="h-2 w-2 rounded-full bg-primary flex-shrink-0" />
                <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-primary/80">After Handover — Ongoing</span>
              </div>
              <p className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight mb-3">Stay on</p>
              <p className="text-base text-muted-foreground leading-relaxed max-w-md mx-auto">
                After handover, you can keep us on for ongoing support — so the system stays known, not handed off into silence.
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="relative flex justify-center" aria-hidden="true">
        <span className="w-px h-12 sm:h-16 bg-gradient-to-b from-border to-primary/50" />
      </div>

      {/* ================================================================ */}
      {/* THE PROOF — one continuous experience: stat, name it RECOVER,     */}
      {/* video, quote, then the transition into the other two competencies */}
      {/* — never returning to small centered content until it's over.      */}
      {/* ================================================================ */}
      {fastTrackTestimonial?.evidence?.before && fastTrackTestimonial.evidence.after && (
        <section className="relative bg-card/10 border-y border-border/40 py-24 sm:py-32">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-14">
            <AnimatedSection className="mb-3">
              <SectionEyebrow>The Proof</SectionEyebrow>
            </AnimatedSection>
            <AnimatedSection delay={0.04}>
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight max-w-xl mx-auto mb-12">
                One rescue, in the client's own words.
              </h2>
              <div className="flex items-center justify-center gap-6 sm:gap-10">
                <div className="text-center">
                  <p className="text-4xl sm:text-6xl font-bold text-muted-foreground/35 line-through decoration-2 tracking-tight">{fastTrackTestimonial.evidence.before.stat}</p>
                  <p className="text-xs text-muted-foreground/50 mt-2">{fastTrackTestimonial.evidence.before.label}</p>
                </div>
                <ArrowRight size={22} className="text-primary/60 flex-shrink-0" />
                <div className="text-center">
                  <p className="text-4xl sm:text-6xl font-bold text-primary tracking-tight">{fastTrackTestimonial.evidence.after.stat}</p>
                  <p className="text-xs text-muted-foreground mt-2">{fastTrackTestimonial.evidence.after.label}</p>
                </div>
              </div>
              <p className="text-xs text-muted-foreground/50 italic mt-6">One verified client story — not a typical timeline.</p>
            </AnimatedSection>
          </div>

          <AnimatedSection delay={0.06} className="text-center mb-8">
            <span className="text-2xl sm:text-3xl font-bold text-primary tracking-tight">RECOVER</span>
            <p className="text-xs text-muted-foreground/60 mt-1">Recovery after prolonged delivery failure</p>
          </AnimatedSection>

          {/* The connector — a short vertical thread from the stat straight  */}
          {/* into the video, so Josh reads as confirming what was just shown, */}
          {/* not as a separate component dropped in afterward.                */}
          <AnimatedSection delay={0.07} className="flex justify-center mb-6" aria-hidden="true">
            <span className="w-px h-8 bg-gradient-to-b from-primary/50 to-border/40" />
          </AnimatedSection>

          <AnimatedSection delay={0.08} className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-4">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground/60 mb-6 text-center">Josh, in his own words</p>
            <TestimonialFilm
              src="/videos/Josh.mp4"
              poster="/images/video-posters/josh-nyce-poster.jpg"
              captionsSrc="/captions/josh-nyce-testimonial.vtt"
              variant="proof"
            />
          </AnimatedSection>

          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center mt-14 mb-4">
            <AnimatedSection delay={0.1}>
              <blockquote>
                <p className="text-lg text-foreground/90 leading-snug mb-3">
                  "I had a Dev team before them and for two years struggle to get my app up and
                  running. Within 3 weeks of Zia taking over it was up and running in Flawless
                  condition."
                </p>
                <footer className="text-sm text-muted-foreground">{fastTrackTestimonial.author}, Fast Track</footer>
              </blockquote>
            </AnimatedSection>
          </div>
        </section>
      )}

      {/* ================================================================ */}
      {/* THE OTHER TWO COMPETENCIES — its own quiet beat, not a straight    */}
      {/* continuation of the flagship scene above. RECOVER just happened   */}
      {/* in full color; this section is deliberately calmer before it      */}
      {/* names what else "rescue" covers.                                  */}
      {/* ================================================================ */}
      <section className="relative bg-background py-20 sm:py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-14">
            <p className="text-sm text-muted-foreground max-w-md mx-auto mb-6">
              "Rescue" isn't one kind of fix. We've handled three different kinds of broken.
            </p>
            <div className="flex items-center justify-center gap-3 sm:gap-6 flex-wrap">
              {["RECOVER", "STABILIZE", "UNTANGLE"].map((word, i) => (
                <span key={word} className={`text-lg sm:text-xl font-bold tracking-tight ${i === 0 ? "text-primary/50 line-through decoration-1" : "text-foreground"}`}>
                  {word}
                </span>
              ))}
            </div>
          </AnimatedSection>

          {/* STABILIZE and UNTANGLE — the competency word IS the visual,   */}
          {/* not a small caption above a paragraph.                        */}
          <AnimatedSection delay={0.08} className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 grid sm:grid-cols-2 gap-5 sm:gap-6">
            <div className="rounded-2xl border border-border/50 bg-background/50 p-7 sm:p-9">
              <p className="text-3xl sm:text-4xl font-bold text-foreground tracking-tight mb-1.5">STABILIZE</p>
              <p className="text-xs text-muted-foreground/60 mb-6">Production reliability under real load</p>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground/50 mb-3">
                Knipsr — event media platform
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed mb-5">
                The guest-facing side stayed simple by design. Underneath, none of that simplicity
                held up on its own against real event-day load.
              </p>
              <ul className="space-y-2 mb-5">
                {KNIPSR_HARDENED.slice(0, 3).map((item) => (
                  <li key={item} className="flex items-start gap-2 text-xs text-muted-foreground leading-relaxed">
                    <Check size={11} className="text-primary flex-shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
              <blockquote className="pt-5 border-t border-border/30">
                <p className="text-sm text-foreground/80 italic leading-relaxed">
                  "We could not be happier about working with Zumetrix Labs!"
                </p>
                <p className="text-xs text-muted-foreground mt-2">Founder, Knipsr</p>
              </blockquote>
            </div>

            <div className="rounded-2xl border border-border/50 bg-background/50 p-7 sm:p-9">
              <p className="text-3xl sm:text-4xl font-bold text-foreground tracking-tight mb-1.5">UNTANGLE</p>
              <p className="text-xs text-muted-foreground/60 mb-6">Bug vs. unfinished vs. intended vs. new scope</p>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground/50 mb-3">
                What "diagnose before fixing" looks like
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed mb-5">
                On one real stabilization engagement, everything got sorted into one of four
                categories before a single line changed:
              </p>
              <div className="grid grid-cols-2 gap-2">
                {["Bug", "Unfinished feature", "Intentional behavior", "Future scope"].map((cat) => (
                  <span key={cat} className="text-xs font-medium text-foreground/80 border border-border/50 rounded-lg px-2.5 py-2 text-center">
                    {cat}
                  </span>
                ))}
              </div>
              <p className="text-xs text-muted-foreground/60 leading-relaxed mt-5">
                That triage turns "something's wrong" into a plan you can actually approve.
              </p>
            </div>
          </AnimatedSection>

          {/* Folded in as a quiet, clearly-secondary coda rather than a     */}
          {/* third equal-weight card pair — these corroborate, they don't   */}
          {/* introduce a new doubt the way STABILIZE/UNTANGLE just did.     */}
          {(nathanTestimonial || bharatTestimonial) && (
            <AnimatedSection delay={0.1} className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-8 border-t border-border/30 grid sm:grid-cols-2 gap-5 text-left">
              {nathanTestimonial && (
                <div>
                  <p className="text-xs text-muted-foreground/80 leading-relaxed mb-2">"{nathanTestimonial.quote}"</p>
                  <p className="text-[11px] text-muted-foreground/60">{nathanTestimonial.author}, {nathanTestimonial.role}</p>
                </div>
              )}
              {bharatTestimonial && (
                <div>
                  <p className="text-xs text-muted-foreground/80 leading-relaxed mb-2">"{bharatTestimonial.quote}"</p>
                  <p className="text-[11px] text-muted-foreground/60">{bharatTestimonial.author}, {bharatTestimonial.role}</p>
                </div>
              )}
            </AnimatedSection>
          )}
        </div>
      </section>

      {/* ================================================================ */}
      {/* THE HONEST ANSWER — repair vs rebuild, addressed directly.        */}
      {/* ================================================================ */}
      <section className="relative bg-card/10 border-y border-border/40 py-20 sm:py-24">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection className="flex items-start gap-4 text-left max-w-xl mx-auto">
            <X size={18} className="text-muted-foreground/40 flex-shrink-0 mt-1" />
            <p className="text-sm text-muted-foreground leading-relaxed">
              <span className="text-foreground font-semibold">If the assessment finds it's genuinely beyond repair, we'll say so —</span>{" "}
              and show you exactly why — before any fix work is scoped or started. If it finds the
              opposite, we'll say that just as plainly, and tell you what we'd keep.
            </p>
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
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight">Before you hand this over.</h2>
          </AnimatedSection>
          <div className="flex justify-center my-10 sm:my-12" aria-hidden="true">
            <span className="w-px h-10 sm:h-12 bg-gradient-to-b from-primary/40 to-transparent" />
          </div>
          <AnimatedSection delay={0.06}>
            <FAQAccordion items={rescueDetailFAQs} idPrefix="rescue-detail-faq" />
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
                href: "/articles/should-you-rescue-or-rebuild-your-saas",
                label: "Should you rescue or rebuild your SaaS?",
                description: "The four-dimension framework this service is built around, including the honest \"you're probably fine\" outcome.",
              },
              {
                href: "/rescue-or-rebuild",
                label: "Get a private read on your situation",
                description: "Four questions, an honest result — no email required.",
              },
              {
                href: "/portfolio/fast-track-usa-app-rescue",
                label: "Fast Track — two years stuck, three weeks to launch",
                description: "A real takeover engagement, told honestly.",
              },
              {
                href: "/articles/taking-over-a-saas-from-another-dev-team",
                label: "Taking over a SaaS: what to check first",
                description: "The order that protects you when inheriting someone else's codebase.",
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
              <span className="block text-muted-foreground/50">Something's not working.</span>
              <span className="block text-foreground mt-2">Tell us what — we'll tell you honestly what it takes.</span>
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
                <span className="relative">Get a Free Assessment</span>
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

export default RescueDetailPage;
