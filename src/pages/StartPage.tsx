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
import { offerHref } from "../config/offers";
import { getProjectBySlug } from "../data/projects";
import { listingImageForProject } from "../data/covers";
import CoverImage from "../components/common/CoverImage";
import { trackOfferSelect, trackOffersHubView, trackContextualOfferCtaClick } from "../utils/analytics";

// Editorial "final editing" pass (2026-10-19): the architecture, visual
// language and chapter structure below are approved and deliberately
// undisturbed. Changes applied: (1) chapter headlines' second line
// reframed from "You don't know X" to "X isn't clear yet" — same
// clarity, the uncertainty now sits in the decision, not read as a jab
// at the buyer's competence; (2) the standalone "Different decision.
// Same engagement model." facts strip was removed — every fact in it
// was already stated in the "How This Is Different" comparison cards or
// each chapter's own metadata row; (3) the GhostNumeral component (a
// giant low-opacity parallax numeral behind each headline) was removed —
// the chapter number, label, and ChapterRail already communicate
// sequence and orientation, so a third simultaneous wayfinding/
// decorative device didn't earn its place under the restraint test.
const josh = TESTIMONIAL_FILMS.josh;

// Fixed left-edge rail, desktop only — IntersectionObserver marks which
// chapter is centered in the viewport and fills the connecting line up to
// it. Doubles as in-page navigation (click a number, jump to that chapter).
const ChapterRail: React.FC<{ chapters: { n: string; offer: string; door: string }[] }> = ({ chapters }) => {
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
                {c.door}
              </span>
            </button>
          </React.Fragment>
        );
      })}
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
  const opacity = useTransform(scrollYProgress, [0, 1], reduceMotion ? [1, 1] : [0.35, 1]);

  return (
    <motion.div ref={ref} style={{ scale, opacity }} className={className}>
      {children}
    </motion.div>
  );
};

type Chapter = {
  n: string;
  offer: "product-rescue" | "idea-to-build" | "manual-to-system";
  door: "FIX" | "BUILD" | "AUTOMATE";
  icon: React.ComponentType<{ size?: number }>;
  label: string;
  statement: [string, string];
  body: string;
  /** The engagement the buyer actually wants — shown with real weight. */
  engagement: { eyebrow: string; title: string; description: string; meta: string[] };
  /** Primary action: implementation/conversation for BUILD and AUTOMATE, the
   * paid assessment for FIX (quoting rescue work blind is irresponsible). */
  primary: { label: string; href: string; event: "offer" | "contact" };
  /** The bounded paid step, offered where it helps, required only where it protects the buyer. */
  step?: { eyebrow: string; label: string; href: string };
  stakes: { label: string; state: string; detail: string }[];
  forYou: string[];
  notForYou: string[];
  proofLabel: string;
  proof: string;
  proofHref: string;
  proofImage?: string;
  emphasis?: boolean;
};

const CHAPTERS: Chapter[] = [
  {
    n: "01",
    offer: "product-rescue",
    door: "FIX",
    icon: Wrench,
    label: "A product already exists",
    statement: ["Find out what's actually wrong.", "Before paying to fix it."],
    body: "Stalled, fragile, inherited, or just not trusted anymore. Before another sprint or a rebuild, the Product Rescue Assessment finds out — from the product's own evidence, not a guess — what deserves to stay, what needs fixing, and what should go.",
    engagement: {
      eyebrow: "What you get",
      title: "A Rescue Brief, in five business days",
      description: "What to keep, fix and replace, and what to fund first. Yours whether or not you hire us for the work that follows.",
      meta: ["Product Rescue Assessment", "$750", "5 business days once access is ready"],
    },
    primary: { label: "Show us where you're stuck", href: offerHref("product-rescue", "start-hub"), event: "offer" },
    step: { eyebrow: "Not ready to pay for an assessment?", label: "Four free questions — rescue or rebuild?", href: "/rescue-or-rebuild" },
    stakes: [
      { label: "Right now", state: "A wrong diagnosis costs a conversation.", detail: "Nothing has been built on the guess yet — changing course here costs nothing but time." },
      { label: "Next fix", state: "A wrong diagnosis costs a sprint.", detail: "Work goes into patching a symptom. If it was the wrong one, that work doesn't transfer." },
      { label: "Next rebuild", state: "A wrong diagnosis costs a rebuild.", detail: "The biggest bet, made on the same unverified read of what's actually wrong." },
    ],
    forYou: ["A real product already exists — stalled, breaking, inherited, or just not trusted anymore", "You can share access or evidence if accepted (we never ask for credentials up front)", "You want an outside, evidence-based read before spending on another attempt"],
    notForYou: ["Nothing's been built yet — that's a build decision, not a rescue. Start with the build door below", "You already know exactly what's wrong and just need it fixed — tell us, and we'll scope the work directly"],
    proofLabel: "Fast Track USA",
    proof: "Josh Nyce, owner and founder, describes roughly two years with a previous team without a reliable launch. Zumetrix took the project over and shipped it in three weeks — by his account, on video and in a separately worded Trustpilot review corroborated on Google. One client's experience, not a typical timeline.",
    proofHref: "/portfolio/fast-track-usa-app-rescue",
    emphasis: true,
  },
  {
    n: "02",
    offer: "idea-to-build",
    door: "BUILD",
    icon: Rocket,
    label: "Nothing built yet",
    statement: ["Decide what the first version has to prove.", "Then build that."],
    body: "Every build here starts with a written V1 decision — what ships, what waits, and why — before any code. For most founders that is week one of the build. If you want the decision on its own first, before committing to a team, that's the Idea-to-Build Sprint.",
    engagement: {
      eyebrow: "The engagement",
      title: "A first version built to prove the second deserves to exist",
      description: "Accounts, payments, the core flow and the admin it needs — scoped in writing in week one, shipped by the people who scoped it, with the founders close throughout.",
      meta: ["SaaS & product development", "from $4,800", "scope decided in week one"],
    },
    primary: { label: "Tell us what you're building", href: "/contact?service=saas-mvp-development&situation=nothing-built", event: "contact" },
    step: { eyebrow: "Want the V1 decision in writing first?", label: "Idea-to-Build Sprint · $950 · five business days", href: offerHref("idea-to-build", "start-hub") },
    stakes: [
      { label: "Right now", state: "A wrong guess costs a conversation.", detail: "The V1 boundary is still just a decision — changing your mind here costs nothing but time." },
      { label: "Mid-build", state: "A wrong guess costs sprints.", detail: "Code exists for the wrong version. Undoing it means rewriting, not reprioritizing." },
      { label: "After launch", state: "A wrong guess costs trust.", detail: "Early users formed an opinion of the wrong product. That's harder to walk back than code." },
    ],
    forYou: ["You have a real idea, mockups or research — and nothing shipped yet", "You'd rather argue about scope now than pay for the wrong version later", "You want to see the V1 decision in writing before any code exists"],
    notForYou: ["Something's already built and the problem is what's wrong with it — that's the door above", "You want a slide deck or a prototype rather than working software"],
    proofLabel: "Knipsr",
    proof: "A product built from the ground up and taken to a launch-ready SaaS — durable background processing, retries, media streaming, and a stress test against real event-day failure modes before launch. The founder's own words are on Trustpilot; identity withheld at their request.",
    proofHref: "/portfolio/knipsr-event-media-saas",
    proofImage: "/project_images/knipsr-cover.svg",
  },
  {
    n: "03",
    offer: "manual-to-system",
    door: "AUTOMATE",
    icon: Workflow,
    label: "A workflow already exists",
    statement: ["Get one workflow off your team's plate.", "Built, live, watched."],
    body: "The process works because people remember what to do — that's the problem. We map the manual steps, build the one that hurts most, and leave it running with alerts and a handoff. Then we decide together whether there's a second.",
    engagement: {
      eyebrow: "The engagement",
      title: "One bounded workflow, built and live",
      description: "Make, n8n, Zapier or code — whichever the workflow deserves — with failures flagged to a person instead of disappearing, and a handoff document your team can actually use.",
      meta: ["AI Automation & Workflows", "from $2,500", "one bounded workflow"],
    },
    primary: { label: "Show us the workflow", href: "/contact?service=ai-automation-solutions&situation=manual-workflow", event: "contact" },
    step: { eyebrow: "Spans several teams or systems?", label: "Manual-to-System Sprint · $750 · a plan before any tool", href: offerHref("manual-to-system", "start-hub") },
    stakes: [
      { label: "This week", state: "One person quietly absorbs it.", detail: "It feels manageable — a few extra minutes per handoff, easy to not notice." },
      { label: "This quarter", state: "It becomes \"how we do things.\"", detail: "New hires learn the workaround as normal, not as a problem worth fixing." },
      { label: "Next hire", state: "You hire to cover the workflow.", detail: "Not because the business grew — because a person is now load-bearing infrastructure." },
    ],
    forYou: ["A real, recurring workflow runs today — carried by people, not a system", "You can name the step that hurts most", "You're open to some of it staying human — that's a legitimate outcome, not a failure"],
    notForYou: ["Nothing's running manually yet — there's no workflow to automate", "You want a tool recommendation rather than a running system"],
    proofLabel: "Floating Stone Ranch",
    proof: "A beef processor's carcass intake, boxing and shipping ran on spreadsheets and paper. We centralized it into one Airtable-backed system and automated the status transitions that used to be tracked by hand — and eight months later the client is still working with us.",
    proofHref: "/portfolio/floating-stone-ranch-processor-intake-engine",
    proofImage: "/project_images/floating-stone.jpg",
  },
];

const DIFFERENCE = [
  {
    typical: "A discovery call, then a scope that firms up (or doesn't) once work has already started.",
    zumetrix: "A starting price on every service page and a fixed price on every assessment — before any call.",
  },
  {
    typical: "The exploration happens on your dime, inside the build — figuring out what's needed while you're already paying to build it.",
    zumetrix: "The decision is made first and written down — in week one of a build, or on its own if you'd rather see it before committing.",
  },
  {
    typical: "If it doesn't work out, you've paid for partial work and still don't have clarity.",
    zumetrix: "Whatever was written — brief, plan or V1 decision — is yours, usable with us or with anyone else.",
  },
];

const StartPage: React.FC = () => {
  useEffect(() => {
    trackOffersHubView();
  }, []);

  return (
    <PageTransition>
      <SEO
        title="Start Here — Three Ways In | Zumetrix Labs"
        description="A product that's stuck, nothing built yet, or a workflow run by hand. Three ways to start with Zumetrix Labs — prices stated up front, a paid step only where it protects you."
        url="https://zumetrix.com/start"
        image="https://zumetrix.com/og/page-start.png"
      />

      {/* Hero */}
      <section className="relative overflow-hidden bg-background pt-32 pb-20 sm:pt-40 sm:pb-28">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(196,138,100,0.06),transparent_65%)]" />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection mode="hero" className="mb-7">
            <SectionEyebrow>Start here</SectionEyebrow>
          </AnimatedSection>
          <AnimatedSection mode="hero" delay={0.04}>
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05] text-foreground mb-8 text-balance">
              Three ways in.
              <span className="block text-muted-foreground/50">Pick the one that matches this week.</span>
            </h1>
          </AnimatedSection>
          <AnimatedSection mode="hero" delay={0.08} className="space-y-2 mb-9">
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
              A product that's stuck? Find out what's wrong before paying to fix it.
            </p>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
              Nothing built yet? Decide what V1 has to prove, then build that.
            </p>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
              A workflow run by hand? Get one off your team's plate.
            </p>
          </AnimatedSection>
          <AnimatedSection delay={0.14}>
            <p className="text-sm text-muted-foreground/70">
              Prices are stated before any call.{" "}
              <span className="text-foreground/80 font-medium">A paid step comes first only where buying the work blind would be a mistake.</span>
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Three editorial chapters, full depth */}
      <ChapterRail chapters={CHAPTERS} />
      <div className="relative bg-background">
        {CHAPTERS.map((chapter, idx) => {
          const reversed = idx === 1;
          return (
            <section
              key={chapter.offer}
              id={`chapter-${chapter.offer}`}
              className={`relative border-t border-border/40 ${chapter.emphasis ? "py-24 sm:py-32 bg-card/10" : "py-20 sm:py-28"}`}
            >
              <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
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
                          {chapter.door} · {chapter.label}
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

                    {/* The engagement — the thing the buyer actually wants,
                        given real weight. For FIX that is the assessment
                        itself; for BUILD and AUTOMATE it is the work. */}
                    <AnimatedSection delay={0.1} className="mb-8">
                      <div className="rounded-xl border border-primary/25 bg-primary/[0.05] px-6 py-5 max-w-lg">
                        <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-primary/70 mb-2">
                          {chapter.engagement.eyebrow}
                        </p>
                        <p className="text-lg font-bold text-foreground mb-2">{chapter.engagement.title}</p>
                        <p className="text-sm text-muted-foreground leading-relaxed">{chapter.engagement.description}</p>
                      </div>
                    </AnimatedSection>

                    <AnimatedSection delay={0.12}>
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-foreground/80 mb-8">
                        {chapter.engagement.meta.map((m, i) => (
                          <React.Fragment key={m}>
                            {i > 0 && <span className="text-muted-foreground/40" aria-hidden="true">·</span>}
                            <span className={i === 1 ? "font-semibold text-foreground" : i === 0 ? "font-semibold" : "text-muted-foreground"}>{m}</span>
                          </React.Fragment>
                        ))}
                      </div>
                    </AnimatedSection>

                    <AnimatedSection delay={0.16}>
                      <Link
                        to={chapter.primary.href}
                        onClick={() =>
                          chapter.primary.event === "offer"
                            ? trackOfferSelect(chapter.offer)
                            : trackContextualOfferCtaClick(chapter.offer, "start-hub-primary")
                        }
                        className="btn-sheen group inline-flex items-center gap-3 rounded-full bg-gradient-to-b from-primary to-primary/[0.92] text-primary-foreground pl-6 pr-2 py-2.5 text-sm font-semibold"
                      >
                        {chapter.primary.label}
                        <span className="flex items-center justify-center w-7 h-7 rounded-full bg-black/10 group-hover:bg-black/[0.14] transition-colors duration-300">
                          <ArrowRight size={13} strokeWidth={2.5} className="group-hover:translate-x-[1.5px] transition-transform duration-200" />
                        </span>
                      </Link>
                    </AnimatedSection>

                    {chapter.step && (
                      <AnimatedSection delay={0.2} className="mt-6">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-foreground/50 mb-1.5">
                          {chapter.step.eyebrow}
                        </p>
                        <Link
                          to={chapter.step.href}
                          onClick={() => trackOfferSelect(chapter.offer)}
                          className="group/step inline-flex items-center gap-1.5 text-sm font-medium text-foreground/80 hover:text-primary transition-colors duration-200"
                        >
                          <span className="border-b border-foreground/15 group-hover/step:border-primary/50 transition-colors duration-200">{chapter.step.label}</span>
                          <ArrowRight size={12} className="group-hover/step:translate-x-0.5 transition-transform duration-200" />
                        </Link>
                      </AnimatedSection>
                    )}
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
                        {(() => {
                          const proofProject = getProjectBySlug(chapter.proofHref.replace("/portfolio/", ""));
                          return proofProject ? (
                            <CoverImage cover={listingImageForProject(proofProject)} sizes="(min-width: 1024px) 45vw, 92vw" className="bg-background" />
                          ) : (
                            <img src={chapter.proofImage} alt="" width="1000" height="625" loading="lazy" decoding="async" className="w-full h-auto object-contain bg-background" />
                          );
                        })()}
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
              Most engagements start with a call and a vague scope. Ours start with a price and a written decision.
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

      {/* Close — thinking-partner positioning, not a generic sales CTA */}
      <section className="relative bg-background pt-16 sm:pt-20 pb-24 sm:pb-32">
        <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground/60 mb-5">
              None of these sound exactly right?
            </p>
            <p className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight leading-[1.2] mb-5">
              Don't pick a door just to pick one.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-9 max-w-md mx-auto">
              Say what's happening. We'll tell you which of these fits — or that
              you shouldn't buy anything from us yet.
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
                Tell us the situation
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

export default StartPage;
