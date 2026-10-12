import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Check, X, Rocket, Wrench, Workflow } from "lucide-react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import SEO from "../components/common/SEO";
import PageTransition from "../components/common/PageTransition";
import AnimatedSection from "../components/common/AnimatedSection";
import SectionEyebrow from "../components/common/SectionEyebrow";
import ClosingGlow from "../components/common/ClosingGlow";
import TestimonialFilm from "../components/common/TestimonialFilm";
import TiltFrame from "../components/portfolio/TiltFrame";
import { TESTIMONIAL_FILMS } from "../data/testimonialFilms";
import { OFFERS, offerHref } from "../config/offers";
import { trackOfferSelect, trackOffersHubView, trackContextualOfferCtaClick } from "../utils/analytics";

// Fifth pass (2026-10-18, same day): the prior pass fixed the repetition
// (cards, imagery, alternating sides) but still read as safe/borrowed —
// every device was recomposed from elsewhere on the site. This pass adds
// three things unique to this page: a scroll-synced wayfinder rail (fixed
// left edge, desktop only — nothing like it exists on any other page),
// giant parallax-drifting chapter numerals behind each headline for real
// scale, and a cinematic scroll-linked reveal (scale+opacity tied to
// scroll position, not a generic viewport fade) on each chapter's proof
// visual. The static proof images (Liftly, Floating Stone Ranch) now sit
// in TiltFrame — the site's own cursor-tilt-plus-glare signature
// component, already used on every case-study hero image, just never
// brought over here. FIX's video stays bare (TiltFrame's own border would
// double up against the video frame's existing one). Copy is untouched.
const josh = TESTIMONIAL_FILMS.josh;

// Fixed left-edge rail, desktop only — IntersectionObserver marks which
// chapter is centered in the viewport and fills the connecting line up to
// it. Doubles as in-page navigation (click a number, jump to that chapter).
const ChapterRail: React.FC<{ chapters: { n: string; offer: string }[] }> = ({ chapters }) => {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const sections = chapters
      .map((c) => document.getElementById(`chapter-${c.offer}`))
      .filter((el): el is HTMLElement => el !== null);
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = sections.indexOf(entry.target as HTMLElement);
            if (idx !== -1) setActive(idx);
          }
        });
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [chapters]);

  return (
    <div
      aria-hidden="true"
      className="hidden xl:flex fixed left-8 top-1/2 -translate-y-1/2 z-30 flex-col items-start"
    >
      {chapters.map((c, i) => {
        const offer = OFFERS[c.offer];
        return (
          <React.Fragment key={c.offer}>
            {i > 0 && (
              <span className="relative h-10 w-px ml-[13px] overflow-hidden bg-border/30">
                <span
                  className="absolute inset-x-0 top-0 bg-primary transition-[height] duration-500 ease-out"
                  style={{ height: active >= i ? "100%" : "0%" }}
                />
              </span>
            )}
            <button
              type="button"
              tabIndex={-1}
              onClick={() =>
                document.getElementById(`chapter-${c.offer}`)?.scrollIntoView({ behavior: "smooth", block: "start" })
              }
              className="group flex items-center gap-3 py-1.5"
            >
              <span
                className={`flex h-[27px] w-[27px] flex-shrink-0 items-center justify-center rounded-full border font-mono text-[10px] transition-colors duration-300 ${
                  active === i
                    ? "border-primary text-primary bg-primary/10"
                    : "border-border/50 text-muted-foreground/50 group-hover:border-primary/40 group-hover:text-muted-foreground/80"
                }`}
              >
                {c.n}
              </span>
              <span
                className={`text-[10px] font-semibold uppercase tracking-[0.14em] transition-colors duration-300 ${
                  active === i ? "text-foreground/90" : "text-muted-foreground/40 group-hover:text-muted-foreground/70"
                }`}
              >
                {offer.category}
              </span>
            </button>
          </React.Fragment>
        );
      })}
    </div>
  );
};

// A huge, low-opacity numeral behind each chapter's headline, drifting
// slightly as the section scrolls past — scale and real motion, not a
// decoration pasted on top.
const GhostNumeral: React.FC<{ n: string }> = ({ n }) => {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], reduceMotion ? [0, 0] : [-50, 50]);

  return (
    <div ref={ref} aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden z-0">
      <motion.span
        style={{ y }}
        className="absolute -right-2 sm:right-2 lg:right-6 top-4 sm:top-8 text-[8rem] sm:text-[13rem] lg:text-[17rem] font-black leading-none tracking-tighter text-primary/[0.05] select-none"
      >
        {n}
      </motion.span>
    </div>
  );
};

// Cinematic reveal for the proof visual — scale and opacity tied to actual
// scroll position as the chapter comes into view, not a generic fade.
const ScrollRevealVisual: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = "" }) => {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.92", "start 0.4"] });
  const scale = useTransform(scrollYProgress, [0, 1], reduceMotion ? [1, 1] : [0.94, 1]);
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <motion.div ref={ref} style={{ scale, opacity }} className={className}>
      {children}
    </motion.div>
  );
};

const CHAPTERS = [
  {
    n: "01",
    offer: "idea-to-build" as const,
    icon: Rocket,
    label: "Nothing Has Been Built Yet",
    statement: ["You have the idea.", "You don't know what V1 needs yet."],
    body: "Before turning assumptions into development cost, this decides exactly what your first version needs to prove — not the whole product, the one thing.",
    resultDescription: "A documented decision — what belongs in V1, what doesn't, and why — yours to build with us or hand to any other team.",
    stakes: [
      { label: "Right now", state: "A wrong guess costs a conversation.", detail: "The V1 boundary is still just a decision — changing your mind here costs nothing but time." },
      { label: "Mid-build", state: "A wrong guess costs sprints.", detail: "Code exists for the wrong version. Undoing it means rewriting, not reprioritizing." },
      { label: "After launch", state: "A wrong guess costs trust.", detail: "Early users formed an opinion of the wrong product. That's harder to walk back than code." },
    ],
    forYou: ["An idea exists, but V1's boundary doesn't yet", "You want the decision made before development spend, not during it", "You're fine building the result with us or another team"],
    notForYou: ["Something's already built and the problem is what's wrong with it — that's Product Rescue", "You already have a validated, specific V1 scope — you need a build, not a decision"],
    deliverable: "Build-Ready V1 Brief",
    cta: "Show Us What You're Building",
    proofLabel: "Liftly",
    proof: "The founder's broader marketplace vision already existed — a logistics platform with a sophisticated variable-pricing engine as the real differentiator. We separated the vision from the first release: V1 shipped the operational core — booking, serviceability, payment, admin — as a complete system on its own. The pricing engine was scoped and documented for a defined V2, not built prematurely into a release that didn't need it yet.",
    proofHref: "/portfolio/liftly-operational-mvp-v1",
    proofImage: "/project_images/liftly-cover.svg",
  },
  {
    n: "02",
    offer: "product-rescue" as const,
    icon: Wrench,
    label: "The Product Already Exists",
    statement: ["The code exists.", "You don't know what's wrong."],
    body: "Before another sprint or rebuild, this finds out — from evidence, not a guess — what actually deserves fixing, replacing, or keeping.",
    resultDescription: "An evidence-based read on what to keep, what to fix, and where a rebuild is actually justified — not a guess.",
    stakes: [
      { label: "Right now", state: "A wrong diagnosis costs a conversation.", detail: "Nothing has been built on the guess yet — changing course here costs nothing but time." },
      { label: "Next fix", state: "A wrong diagnosis costs a sprint.", detail: "Work goes into patching a symptom. If it was the wrong one, that work doesn't transfer." },
      { label: "Next rebuild", state: "A wrong diagnosis costs a rebuild.", detail: "The biggest bet, made on the same unverified read of what's actually wrong." },
    ],
    forYou: ["A real product already exists — stalled, breaking, inherited, or just not trusted anymore", "You can share access or evidence if accepted (we never ask for credentials up front)", "You want an outside, evidence-based read before spending on another attempt"],
    notForYou: ["Nothing's been built yet — that's a V1 decision, not a rescue. Try Idea-to-Build instead", "You already know exactly what's wrong and just need it fixed — that's implementation, a service, not this assessment"],
    deliverable: "Rescue Brief",
    cta: "Show Us Where You're Stuck",
    proofLabel: "Fast Track USA",
    proof: "Josh Nyce, owner and founder, describes roughly two years with a previous team without a reliable launch. Zumetrix took the project over and shipped it in three weeks — bug-free, by his account, on video and in a separately-worded, verified Trustpilot review corroborated on Google.",
    proofHref: "/portfolio/fast-track-usa-app-rescue",
    emphasis: true,
  },
  {
    n: "03",
    offer: "manual-to-system" as const,
    icon: Workflow,
    label: "The Workflow Already Exists",
    statement: ["The workflow works.", "You don't know what's worth automating."],
    body: "Before adding another tool, this decides what should actually be automated, simplified, connected, or left for a person to keep doing.",
    resultDescription: "A clear plan for what to remove, simplify, connect, automate, or keep human — a decision, not a tool recommendation.",
    stakes: [
      { label: "This week", state: "One person quietly absorbs it.", detail: "It feels manageable — a few extra minutes per handoff, easy to not notice." },
      { label: "This quarter", state: "It becomes \"how we do things.\"", detail: "New hires learn the workaround as normal, not as a problem worth fixing." },
      { label: "Next hire", state: "You hire to cover the workflow.", detail: "Not because the business grew — because a person is now load-bearing infrastructure." },
    ],
    forYou: ["A real, recurring workflow already runs today — carried by people, not a system", "You want to know what's actually worth automating before buying another tool", "You're open to some of it staying human — that's a legitimate outcome, not a failure"],
    notForYou: ["Nothing's running manually yet to analyze — there's no workflow to automate", "You already know exactly what to automate and just need it built — that's implementation, a service, not this sprint"],
    deliverable: "Workflow System Plan",
    cta: "Show Us The Workflow",
    proofLabel: "Floating Stone Ranch",
    proof: "A beef processor's carcass intake, boxing, and shipping ran on spreadsheets and paper — no single source of truth, no reliable manifest. We centralized it into one Airtable-backed system and automated the status transitions that used to be tracked by hand, with a structure built to support the reporting that comes next.",
    proofHref: "/portfolio/floating-stone-ranch-processor-intake-engine",
    proofImage: "/project_images/floating-stone.jpg",
  },
];

const DIFFERENCE = [
  {
    typical: "Open-ended discovery call, then a scope that firms up (or doesn't) once work has already started.",
    zumetrix: "A bounded, fixed-price assessment. You know the cost and the timeline before anything begins.",
  },
  {
    typical: "The exploration happens on your dime, inside the build — figuring out what's actually needed while you're already paying to build it.",
    zumetrix: "The decision happens first, on its own. What gets built is informed by it, not tangled with it.",
  },
  {
    typical: "If it doesn't work out, you've paid for partial work and still don't have clarity.",
    zumetrix: "You keep the Brief either way — usable with us or with anyone else. Nothing about it depends on hiring us next.",
  },
];

const FACTS = [
  "5 business days",
  "A concrete decision artifact",
  "Implementation is separate",
  "Use the output with us or another team",
];

const OffersPage: React.FC = () => {
  useEffect(() => {
    trackOffersHubView();
  }, []);

  return (
    <PageTransition>
      <SEO
        title="Offers — Three Ways to Start With Zumetrix | Zumetrix Labs"
        description="Three bounded, paid decisions — not packages. Idea-to-Build, Product Rescue, and Manual-to-System each give you a clear next step before any larger commitment."
        url="https://zumetrix.com/offers"
      />

      {/* Hero */}
      <section className="relative overflow-hidden bg-background pt-32 pb-20 sm:pt-40 sm:pb-28">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(196,138,100,0.06),transparent_65%)]" />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection mode="hero" className="mb-7">
            <SectionEyebrow>Three Ways to Start</SectionEyebrow>
          </AnimatedSection>
          <AnimatedSection mode="hero" delay={0.04}>
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05] text-foreground mb-8 text-balance">
              Start with what already exists.
            </h1>
          </AnimatedSection>
          <AnimatedSection mode="hero" delay={0.08} className="space-y-2 mb-9">
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
              No product yet? Decide what V1 needs to prove.
            </p>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
              Product already exists? Decide what deserves fixing.
            </p>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
              Workflow already exists? Decide what deserves automation.
            </p>
          </AnimatedSection>
          <AnimatedSection delay={0.14}>
            <p className="text-sm text-muted-foreground/70">
              Offers decide what should happen next.{" "}
              <span className="text-foreground/80 font-medium">Services are how we implement it.</span>
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Three editorial chapters, full depth */}
      <ChapterRail chapters={CHAPTERS} />
      <div className="relative bg-background">
        {CHAPTERS.map((chapter, idx) => {
          const offer = OFFERS[chapter.offer];
          const reversed = idx === 2;
          return (
            <section
              key={chapter.offer}
              id={`chapter-${chapter.offer}`}
              className={`relative border-t border-border/40 ${chapter.emphasis ? "py-24 sm:py-32 bg-card/10" : "py-20 sm:py-28"}`}
            >
              <GhostNumeral n={chapter.n} />
              <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header row: statement + proof, asymmetric and alternating
                    sides per chapter so the page isn't the same block three
                    times in a row. */}
                <div className="grid lg:grid-cols-[1.15fr_1fr] gap-10 lg:gap-14 items-start mb-20 lg:mb-28">
                  <div className={reversed ? "lg:order-2" : ""}>
                    <AnimatedSection className="flex items-center gap-3.5 mb-8">
                      <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl border border-primary/20 bg-primary/[0.08] text-primary">
                        <chapter.icon size={18} />
                      </span>
                      <span className="flex items-baseline gap-3">
                        <span className="text-sm font-mono text-primary/50 tracking-wider">{chapter.n}</span>
                        <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-primary/70">
                          {chapter.label}
                        </span>
                      </span>
                    </AnimatedSection>

                    <AnimatedSection delay={0.04}>
                      <h2
                        className={`font-bold tracking-tight leading-[1.06] text-foreground mb-9 ${
                          chapter.emphasis ? "text-4xl sm:text-6xl lg:text-7xl" : "text-4xl sm:text-5xl lg:text-6xl"
                        }`}
                      >
                        {chapter.statement.map((line, i) => (
                          <span key={i} className={`block ${i === 1 ? "text-muted-foreground/50" : ""}`}>
                            {line}
                          </span>
                        ))}
                      </h2>
                    </AnimatedSection>

                    <AnimatedSection delay={0.08}>
                      <p className="text-base sm:text-lg text-muted-foreground leading-relaxed mb-10 max-w-lg">
                        {chapter.body}
                      </p>
                    </AnimatedSection>

                    {/* What You Get — the result, stated plainly and given
                        real weight, not buried in a metadata chip. This is
                        the part a cold reader needs to find instantly, so
                        it gets its own clear space, not a tight stack. */}
                    <AnimatedSection delay={0.1} className="mb-10">
                      <div className="rounded-xl border border-primary/25 bg-primary/[0.05] px-6 py-5 max-w-lg">
                        <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-primary/70 mb-2">
                          What You Get
                        </p>
                        <p className="text-lg font-bold text-foreground mb-2">{chapter.deliverable}</p>
                        <p className="text-sm text-muted-foreground leading-relaxed">{chapter.resultDescription}</p>
                      </div>
                    </AnimatedSection>

                    <AnimatedSection delay={0.12}>
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-foreground/80 mb-10">
                        <span className="font-semibold">{offer.name}</span>
                        <span className="text-muted-foreground/40" aria-hidden="true">·</span>
                        <span className="font-semibold text-foreground">${offer.price}</span>
                        <span className="text-muted-foreground/40" aria-hidden="true">·</span>
                        <span className="text-muted-foreground">5 business days</span>
                      </div>
                    </AnimatedSection>

                    <AnimatedSection delay={0.16}>
                      <Link
                        to={offerHref(chapter.offer, "offers-hub")}
                        onClick={() => trackOfferSelect(chapter.offer)}
                        className="btn-sheen group inline-flex items-center gap-3 rounded-full bg-gradient-to-b from-primary to-primary/[0.92] text-primary-foreground pl-6 pr-2 py-2.5 text-sm font-semibold"
                      >
                        {chapter.cta}
                        <span className="flex items-center justify-center w-7 h-7 rounded-full bg-black/10 group-hover:bg-black/[0.14] transition-colors duration-300">
                          <ArrowRight size={13} strokeWidth={2.5} className="group-hover:translate-x-[1.5px] transition-transform duration-200" />
                        </span>
                      </Link>
                    </AnimatedSection>
                  </div>

                  {/* Proof — both branches get the cinematic scroll
                      reveal. FIX's video stands alone (its own frame
                      already exists); BUILD/AUTOMATE wrap the real
                      case-study image in TiltFrame, the site's own
                      cursor-tilt signature from the case-study pages. */}
                  {chapter.offer === "product-rescue" ? (
                    <ScrollRevealVisual className={reversed ? "lg:order-1" : ""}>
                      <TestimonialFilm
                        src={josh.src}
                        poster={josh.poster}
                        captionsSrc={josh.captionsSrc}
                        variant="proof"
                      />
                      <div className="mt-5">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-primary/70 mb-2.5">
                          {chapter.proofLabel}
                        </p>
                        <p className="text-sm text-muted-foreground leading-relaxed mb-3">{chapter.proof}</p>
                        <Link
                          to={chapter.proofHref}
                          onClick={() => trackContextualOfferCtaClick(chapter.offer, "offers-hub-proof")}
                          className="group/link inline-flex items-center gap-1.5 text-xs font-medium text-primary/80 hover:text-primary transition-colors duration-200"
                        >
                          See the full case study
                          <ArrowRight size={11} className="group-hover/link:translate-x-0.5 transition-transform duration-200" />
                        </Link>
                      </div>
                    </ScrollRevealVisual>
                  ) : (
                    <ScrollRevealVisual className={reversed ? "lg:order-1" : ""}>
                      <TiltFrame>
                        <img
                          src={chapter.proofImage}
                          alt=""
                          width="1000"
                          height="625"
                          loading="lazy"
                          decoding="async"
                          className="w-full h-auto object-contain bg-background"
                        />
                      </TiltFrame>
                      <div className="mt-5">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-primary/70 mb-2.5">
                          {chapter.proofLabel}
                        </p>
                        <p className="text-sm text-muted-foreground leading-relaxed mb-3">{chapter.proof}</p>
                        <Link
                          to={chapter.proofHref}
                          onClick={() => trackContextualOfferCtaClick(chapter.offer, "offers-hub-proof")}
                          className="group/link inline-flex items-center gap-1.5 text-xs font-medium text-primary/80 hover:text-primary transition-colors duration-200"
                        >
                          See the case study
                          <ArrowRight size={11} className="group-hover/link:translate-x-0.5 transition-transform duration-200" />
                        </Link>
                      </div>
                    </ScrollRevealVisual>
                  )}
                </div>

                {/* Stakes — real cards (the same gradient-emphasis
                    treatment each offer's own ConsequenceStakes uses),
                    not a bare text row. */}
                <AnimatedSection delay={0.1} className="mb-16 lg:mb-20">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground/50 mb-6">
                    Why Now
                  </p>
                  <div className="grid gap-4 sm:grid-cols-3">
                    {chapter.stakes.map((stage, i) => (
                      <div
                        key={stage.label}
                        className={`h-full rounded-2xl border p-7 ${
                          i === 2 ? "border-primary/40 bg-gradient-to-b from-primary/[0.08] to-transparent" : "border-border/50 bg-background/40"
                        }`}
                      >
                        <p className="mb-3.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground/50">
                          {stage.label}
                        </p>
                        <p className={`mb-3.5 text-base sm:text-lg font-bold leading-snug ${i === 2 ? "text-primary" : "text-foreground"}`}>
                          {stage.state}
                        </p>
                        <p className="text-sm text-muted-foreground leading-relaxed">{stage.detail}</p>
                      </div>
                    ))}
                  </div>
                </AnimatedSection>

                {/* Honest qualification — card surfaces, not bare text columns */}
                <AnimatedSection delay={0.14}>
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div className="rounded-2xl border border-primary/20 bg-primary/[0.04] p-7">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-primary/70 mb-5">
                        This is for you if
                      </p>
                      <ul className="space-y-3.5">
                        {chapter.forYou.map((line) => (
                          <li key={line} className="flex items-start gap-2.5 text-sm text-foreground/80 leading-snug">
                            <Check size={14} className="text-primary/70 mt-0.5 flex-shrink-0" />
                            <span>{line}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="rounded-2xl border border-border/50 bg-background/30 p-7">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-foreground/60 mb-5">
                        Not for you if
                      </p>
                      <ul className="space-y-3.5">
                        {chapter.notForYou.map((line) => (
                          <li key={line} className="flex items-start gap-2.5 text-sm text-muted-foreground leading-snug">
                            <X size={14} className="text-muted-foreground/50 mt-0.5 flex-shrink-0" />
                            <span>{line}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </AnimatedSection>
              </div>
            </section>
          );
        })}
      </div>

      {/* How Zumetrix is different */}
      <section className="relative border-t border-border/40 bg-card/10 py-20 sm:py-28">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-14">
            <SectionEyebrow className="mb-5">How This Is Different</SectionEyebrow>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground tracking-tight max-w-xl mx-auto leading-[1.2]">
              Most engagements start with a conversation. This one starts with a decision.
            </h2>
          </AnimatedSection>

          <div className="space-y-5">
            {DIFFERENCE.map((row, i) => (
              <AnimatedSection key={i} delay={i * 0.06}>
                <div className="grid sm:grid-cols-2 gap-5">
                  <div className="h-full rounded-2xl border border-border/50 bg-background/40 p-6">
                    <div className="flex items-center gap-2.5 mb-3">
                      <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full border border-border/60 text-muted-foreground/60">
                        <X size={12} />
                      </span>
                      <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-foreground/50">
                        The Usual Way
                      </p>
                    </div>
                    <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">{row.typical}</p>
                  </div>
                  <div className="h-full rounded-2xl border border-primary/30 bg-gradient-to-b from-primary/[0.06] to-transparent p-6">
                    <div className="flex items-center gap-2.5 mb-3">
                      <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full border border-primary/40 text-primary">
                        <Check size={12} />
                      </span>
                      <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-primary/70">
                        Zumetrix
                      </p>
                    </div>
                    <p className="text-sm sm:text-base text-foreground/90 leading-relaxed font-medium">{row.zumetrix}</p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Engagement model — four facts, not a comparison table */}
      <section className="relative bg-background py-16 sm:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <p className="text-lg sm:text-xl font-bold text-foreground tracking-tight mb-8">
              Different decision. Same engagement model.
            </p>
          </AnimatedSection>
          <AnimatedSection delay={0.05}>
            <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-muted-foreground">
              {FACTS.map((fact, i) => (
                <React.Fragment key={fact}>
                  {i > 0 && <span className="hidden sm:inline text-muted-foreground/30" aria-hidden="true">·</span>}
                  <span>{fact}</span>
                </React.Fragment>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Close — thinking-partner positioning, not a generic sales CTA */}
      <section className="relative bg-background pb-24 sm:pb-32">
        <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground/60 mb-5">
              None of These Sound Exactly Right?
            </p>
            <p className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight leading-[1.2] mb-5">
              Don't choose an offer just to choose one.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-9 max-w-md mx-auto">
              Tell us what's happening. We'll tell you honestly whether one of
              these fits — or whether you shouldn't buy one at all.
            </p>
          </AnimatedSection>
          <AnimatedSection delay={0.06} className="relative inline-block">
            <ClosingGlow />
            <Link to="/contact">
              <motion.span
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.15 }}
                className="btn-sheen group relative inline-flex items-center gap-3 rounded-full bg-gradient-to-b from-primary to-primary/[0.92] text-primary-foreground pl-7 pr-2 py-3 text-base font-semibold"
              >
                Tell Us The Situation
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-black/10 group-hover:bg-black/[0.14] transition-colors duration-300">
                  <ArrowRight size={14} strokeWidth={2.5} className="group-hover:translate-x-[1.5px] transition-transform duration-200" />
                </span>
              </motion.span>
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </PageTransition>
  );
};

export default OffersPage;
