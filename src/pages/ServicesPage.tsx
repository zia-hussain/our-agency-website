import React from "react";
import SEO from "../components/common/SEO";
import PageTransition from "../components/common/PageTransition";
import AnimatedSection from "../components/common/AnimatedSection";
import PlatformIcon from "../components/common/PlatformIcon";
import FAQAccordion from "../components/common/FAQAccordion";
import SectionEyebrow from "../components/common/SectionEyebrow";
import ClientVideoPlayer from "../components/common/ClientVideoPlayer";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Check, ChevronDown, Code2, Layers3, Lightbulb, Map, Rocket, Search, Send, ShieldCheck, TrendingDown, TrendingUp, X } from "lucide-react";
import { Link } from "react-router-dom";
import { services, process, rescueService } from "../data/services.ts";
import { servicesFAQs } from "../data/faqs/services";
import { getProjectBySlug } from "../data/projects";
import { TESTIMONIALS } from "../data/testimonials";
import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { AnimatePresence } from "framer-motion";

const saas = services.find((s) => s.slug === "saas-mvp-development")!;
const webApp = services.find((s) => s.slug === "web-application-development")!;
const mobile = services.find((s) => s.slug === "mobile-app-development")!;
const automation = services.find((s) => s.slug === "ai-automation-solutions")!;

const liftlyProject = getProjectBySlug("liftly-operational-mvp-v1");
const learningPlatformProject = getProjectBySlug("learning-platform-saas-stabilization");
const knipsrProject = getProjectBySlug("knipsr-event-media-saas");
const forlagProject = getProjectBySlug("forlag-publishing-sales-inventory-dashboard");
const skillXSwapProject = getProjectBySlug("skill-x-swap-mvp");
const floatingStoneProject = getProjectBySlug("floating-stone-ranch-processor-intake-engine");
const fastTrackTestimonial = TESTIMONIALS.find((t) => t.id === "josh-fast-track");

// Same fractal-noise grain already used on the Homepage testimonial cards —
// reused verbatim so the seal cluster's surface matches the site's existing
// premium-texture language instead of inventing a new one.
const RECORD_GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

// The Record — the one number kept is computed live from the real proof
// library so it can never drift from what's verifiable.
const recordRatedTestimonials = TESTIMONIALS.filter((t) => typeof t.rating === "number");
const recordAverageRating = (
  recordRatedTestimonials.reduce((sum, t) => sum + (t.rating || 0), 0) / recordRatedTestimonials.length
).toFixed(1);

type RecordVoice = {
  id: string;
  excerpt: string;
  attribution: string;
  platform: "Fiverr" | "Upwork" | "Trustpilot" | "Clutch";
};

const recordVoices: RecordVoice[] = [
  { id: "founder-knipsr", excerpt: "We could not be happier about working with Zumetrix Labs!", attribution: "Founder, Knipsr", platform: "Trustpilot" },
  { id: "andi-first-north", excerpt: "Their combination of web development, AI integration, design, UX, and SEO into one solution was impressive.", attribution: "Andi, First North Peptides", platform: "Clutch" },
  { id: "reema", excerpt: "The best team I have worked with in over a decade.", attribution: "Reema", platform: "Fiverr" },
  { id: "kelly-andrews-ifyify", excerpt: "Zumetrix Labs delivered exactly what we envisioned and more.", attribution: "Kelly Andrews", platform: "Fiverr" },
  { id: "bharat-bondfire", excerpt: "You jumped into a messy situation and got us back to shipping.", attribution: "Bharat, Bondfire", platform: "Fiverr" },
  { id: "nathan-api-rescue", excerpt: "Zia is the kind of dev who makes you double-check the delivery time because surely no one builds something that good, that fast.", attribution: "Nathan", platform: "Fiverr" },
  { id: "alan-learning-platform", excerpt: "You can trust him with any task.", attribution: "Alan Ayoubi", platform: "Upwork" },
  { id: "kelly-longterm", excerpt: "One of THE BEST Freelancers I have worked with in the over 10 years I have been using Upwork.", attribution: "Kelly", platform: "Upwork" },
  { id: "jenny-hjelpna", excerpt: "Your Bubble knowledge and system thinking saved me from so many future problems.", attribution: "Jenny, HjelpNå", platform: "Fiverr" },
  { id: "jay-lancaster", excerpt: "Excellent. I may steal him from the platform altogether.", attribution: "Jay Lancaster", platform: "Fiverr" },
];
const recordVoicesRowA = recordVoices.filter((_, i) => i % 2 === 0);
const recordVoicesRowB = recordVoices.filter((_, i) => i % 2 === 1);

// The lane — real voices drifting past, unhurried. Doubled for a seamless
// loop, masked at both edges so it reads as flowing in from a pool of proof
// larger than the viewport. "depth" racks the lane softly out of focus, an
// actual camera effect, so it sits visually behind the sharp lane in front.
const RecordVoiceRow: React.FC<{
  voices: readonly RecordVoice[];
  duration: number;
  size: "lg" | "sm";
  reverse?: boolean;
  depth?: boolean;
}> = ({ voices, duration, size, reverse, depth }) => {
  const shouldReduceMotion = useReducedMotion();
  const doubled = [...voices, ...voices];
  return (
    <div className={`overflow-hidden ${depth ? "blur-[1.5px]" : ""}`}>
      <motion.div
        className="flex items-center w-max"
        animate={shouldReduceMotion ? undefined : { x: reverse ? ["-50%", "0%"] : ["0%", "-50%"] }}
        transition={{ duration, repeat: Infinity, ease: "linear" }}
      >
        {doubled.map((v, i) => (
          <span key={`${v.id}-${i}`} className="flex items-baseline flex-shrink-0">
            <span
              className={
                size === "lg"
                  ? "font-serif italic text-3xl sm:text-4xl text-foreground/90 whitespace-nowrap tracking-tight"
                  : "font-serif italic text-xl sm:text-2xl text-foreground/40 whitespace-nowrap tracking-tight"
              }
            >
              "{v.excerpt}"
            </span>
            <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-primary/45 whitespace-nowrap ml-5 mr-14 sm:mr-24">
              <PlatformIcon platform={v.platform} size={11} className="text-primary/45" />
              {v.attribution} · {v.platform}
            </span>
          </span>
        ))}
      </motion.div>
    </div>
  );
};

// The seal cluster — the section's one crafted object, the way a phone or a
// browser window carries the Mobile/Web chapters. A verification seal per
// platform, fanned around the average rating like medals placed on a desk:
// real dimension, real shadow, deliberately not a card or a logo strip.
const SealBadge: React.FC<{
  sizeClass: string;
  rotate: string;
  z: number;
  primary?: boolean;
  children: React.ReactNode;
}> = ({ sizeClass, rotate, z, primary, children }) => (
  <div
    className={`relative flex-shrink-0 flex flex-col items-center justify-center rounded-full ${sizeClass} ${rotate} ${
      primary
        ? "border-2 border-primary/50 bg-gradient-to-b from-primary/20 to-primary/5 shadow-[0_30px_60px_-15px_rgba(196,138,100,0.45)]"
        : "border border-border/60 bg-card/25 shadow-[0_20px_45px_-18px_rgba(0,0,0,0.6)]"
    }`}
    style={{ zIndex: z }}
  >
    <div
      className={`pointer-events-none absolute inset-0 rounded-full ${
        primary ? "bg-gradient-to-br from-foreground/10 via-transparent to-transparent" : "bg-gradient-to-br from-foreground/[0.06] via-transparent to-transparent"
      }`}
    />
    {children}
  </div>
);

// The Close — a slow, breathing glow behind the final button, like it's
// been waiting. Pauses entirely under reduced motion rather than just
// slowing down, since a paused glow is still a glow; a jittery one isn't.
const ClosingGlow: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();
  return (
    <motion.span
      aria-hidden="true"
      className="pointer-events-none absolute -inset-8 sm:-inset-10 rounded-full bg-[radial-gradient(ellipse_60%_60%_at_50%_50%,rgba(196,138,100,0.24),transparent_70%)]"
      animate={shouldReduceMotion ? undefined : { opacity: [0.55, 1, 0.55], scale: [0.96, 1.04, 0.96] }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
    />
  );
};

// Not a claim about the visitor's situation — six of them, in first person,
// none reused from copy elsewhere on this page. The point isn't which one
// matches; it's that saying it plainly, in your own words, is the whole ask.
const CLOSING_PHRASES = [
  "I have an idea, but nothing built yet.",
  "Something's already live, and it's falling apart.",
  "We've outgrown the spreadsheet we built this on.",
  "This needs to work on a phone, not just a laptop.",
  "I keep copying data between tools by hand.",
  "Honestly, I'm not sure where to even start.",
];

const ClosingTypewriter: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [phase, setPhase] = useState<"typing" | "pausing" | "deleting">("typing");

  useEffect(() => {
    if (shouldReduceMotion) {
      setDisplayText(CLOSING_PHRASES[0]);
      return;
    }
    const current = CLOSING_PHRASES[phraseIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (phase === "typing") {
      if (displayText.length < current.length) {
        timeout = setTimeout(() => setDisplayText(current.slice(0, displayText.length + 1)), 38);
      } else {
        timeout = setTimeout(() => setPhase("pausing"), 1700);
      }
    } else if (phase === "pausing") {
      timeout = setTimeout(() => setPhase("deleting"), 900);
    } else {
      if (displayText.length > 0) {
        timeout = setTimeout(() => setDisplayText(displayText.slice(0, -1)), 20);
      } else {
        setPhraseIndex((i) => (i + 1) % CLOSING_PHRASES.length);
        setPhase("typing");
      }
    }
    return () => clearTimeout(timeout);
  }, [displayText, phase, phraseIndex, shouldReduceMotion]);

  return (
    <>
      <div className="min-h-[4.5rem] sm:min-h-[6rem] flex items-center justify-center px-4">
        <p aria-hidden="true" className="font-serif italic text-2xl sm:text-4xl text-foreground text-center">
          {displayText}
          <span className="inline-block w-[2px] sm:w-[3px] h-6 sm:h-9 bg-primary/70 ml-1 -mb-1 align-middle animate-pulse" />
        </p>
      </div>
      <p className="sr-only">
        Whatever your situation — {CLOSING_PHRASES.join(" Or: ")} — tell us in your own words.
      </p>
    </>
  );
};

// The capability index — answers "what can you do" in the time it takes to
// fast-scroll past it, before the five chapters ask for a slower read. Every
// clause here is drawn from the real features[] data behind each service
// (services.ts) or a phrase the page already uses elsewhere for that service
// — nothing invented for this list. Each row jumps to its chapter, so a
// visitor who already knows their problem can skip straight to it.
const CAPABILITY_INDEX = [
  {
    chapterId: "chapter-saas",
    name: "SaaS Product Development",
    blurb: "MVPs with real accounts, payments, dashboards, and admin tools — not a disposable prototype.",
  },
  {
    chapterId: "chapter-rescue",
    name: "Product Rescue & Stabilization",
    blurb: "An honest assessment first, then bug fixes, performance work, and a clear repair-vs-rebuild call.",
  },
  {
    chapterId: "chapter-web",
    name: "Web Application Development",
    blurb: "Custom dashboards, internal tools, and integrations for the business logic spreadsheets can't hold.",
  },
  {
    chapterId: "chapter-mobile",
    name: "Mobile App Development",
    blurb: "iOS and Android apps, from React Native builds through App Store submission.",
  },
  {
    chapterId: "chapter-automation",
    name: "AI Automation & Workflows",
    blurb: "Connecting the tools you already use and automating the manual work between them.",
  },
];

const ServicesPage: React.FC = () => {
  const [selectedProcessStep, setSelectedProcessStep] = useState<number | null>(null);

  const scrollToChapter = (chapterId: string) => {
    document.getElementById(chapterId)?.scrollIntoView({ behavior: "smooth", block: "start" });
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
          "Zumetrix Labs provides software development services specializing in SaaS MVP development, React/Node.js applications, AI automation, mobile app development, and custom software.",
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
      {
        "@type": "CollectionPage",
        "@id": "https://zumetrix.com/services#webpage",
        url: "https://zumetrix.com/services",
        name: "Software Development Services",
        isPartOf: { "@id": "https://zumetrix.com/#website" },
        about: { "@id": "https://zumetrix.com/#organization" },
      },
      ...services.map((service) => ({
        "@type": "Service",
        "@id": `https://zumetrix.com/services/${service.slug}#service`,
        url: `https://zumetrix.com/services/${service.slug}`,
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
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: "https://zumetrix.com/",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Software Development Services",
            item: "https://zumetrix.com/services",
          },
        ],
      },
    ],
  };

  return (
    <PageTransition>
      <SEO
        gaTagId="G-PRSP59FL20"
        googleVerification="XbgNbYnq2H0qTIfTCwVFlXrYWHnnvw0acGCUjdlI_Cs"
        title="Software Development Services | Zumetrix Labs"
        description="Explore founder-led SaaS MVP, web application, mobile app, AI automation, and technical strategy services from Zumetrix Labs."
        keywords="software development services, SaaS MVP development, React development, mobile app development, AI automation, custom software"
        url="https://zumetrix.com/services"
        structuredData={structuredData}
      />

      {/* ================================================================ */}
      {/* HERO — one idea, one center of gravity                            */}
      {/* ================================================================ */}
      <section className="bg-background pt-48 pb-32 relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_78%_20%,rgba(196,138,100,0.1),transparent_38%),radial-gradient(circle_at_15%_80%,rgba(196,138,100,0.06),transparent_32%)]" />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <AnimatedSection>
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card/40 px-4 py-2 text-sm font-medium text-primary mb-10">
              Software Development Services
            </span>
            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[1.15] sm:leading-[1.05] mb-8">
              <span className="block text-foreground">Your starting point</span>
              <span className="block bg-gradient-to-r from-primary via-primary/95 to-primary/85 bg-clip-text text-transparent">
                decides what's next.
              </span>
            </h1>
            <p className="text-2xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              Whether that means building something new, fixing what's not
              working, or turning manual work into a system.
            </p>
          </AnimatedSection>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.1 }}
            className="relative z-10 flex justify-center mt-16 sm:mt-20 text-muted-foreground/25"
            aria-hidden="true"
          >
            <ChevronDown size={18} />
          </motion.div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* SECTION 2 — five real capability chapters. Each one gets the      */}
      {/* room its own story earns. Not a repeated template.                */}
      {/* ================================================================ */}
      <section className="bg-background">
        <AnimatedSection className="text-center pt-20 sm:pt-28 pb-8 sm:pb-10">
          <SectionEyebrow>Where You Start</SectionEyebrow>
        </AnimatedSection>

        {/* The capability index — the signature moment, not a directory.     */}
        {/* One system line runs through all five services instead of five    */}
        {/* separate tiles; the service NAME carries the weight (large, bold, */}
        {/* first thing read), the capability clause supports it underneath.  */}
        {/* A fast-scroller gets all five names and their real breadth in one */}
        {/* pass; a visitor who already knows their problem clicks straight   */}
        {/* to it. The same spine then continues past the last service and    */}
        {/* carries the visitor down into Chapter 01 — overview becoming      */}
        {/* deep-dive through one continuous line, not a hard cut.            */}
        <AnimatedSection delay={0.05} className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-2">
          <div className="relative pl-6 sm:pl-10">
            <span
              aria-hidden="true"
              className="pointer-events-none absolute left-0 top-3 bottom-3 w-px bg-gradient-to-b from-primary/50 via-border to-border/40"
            />
            {CAPABILITY_INDEX.map((item) => (
              <button
                key={item.chapterId}
                type="button"
                onClick={() => scrollToChapter(item.chapterId)}
                className="group relative w-full flex items-start sm:items-center justify-between gap-4 sm:gap-8 py-6 sm:py-8 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 rounded-sm"
              >
                <span>
                  <span className="block text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-foreground/90 group-hover:text-foreground transition-colors duration-200">
                    {item.name}
                  </span>
                  <span className="block text-sm sm:text-base text-muted-foreground mt-2 max-w-md">
                    {item.blurb}
                  </span>
                </span>
                <span className="flex-shrink-0 mt-2 sm:mt-0 flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-border/60 text-muted-foreground/60 group-hover:border-primary/40 group-hover:text-primary group-hover:bg-primary/10 transition-all duration-300">
                  <ArrowRight size={14} strokeWidth={2.5} className="group-hover:translate-x-0.5 transition-transform duration-200" />
                </span>
              </button>
            ))}
          </div>
          <p className="text-center text-sm text-muted-foreground mt-6 sm:mt-8">
            Click any service to jump straight to it.
          </p>
        </AnimatedSection>

        {/* The handoff — the spine keeps going. "Here's what we do" becomes  */}
        {/* "now see what it looks like" through one continuing line, the     */}
        {/* same device The Record uses between its seal cluster and caption. */}
        <div className="flex justify-center py-10 sm:py-14" aria-hidden="true">
          <span className="w-px h-14 sm:h-20 bg-gradient-to-b from-border to-primary/50" />
        </div>

        {/* ============================================================ */}
        {/* CHAPTER 1 — SaaS Product Development                          */}
        {/* One room. One transforming panel as the dominant visual —      */}
        {/* idea resolving into product within a single artifact.          */}
        {/* ============================================================ */}
        <div id="chapter-saas" className="relative py-28 sm:py-40 overflow-hidden scroll-mt-20">
          <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <AnimatedSection>
              <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-primary/60 mb-6">
                <span className="w-4 h-px bg-primary/40" aria-hidden="true" />
                Chapter 01
              </span>
              <h3 className="text-5xl sm:text-6xl font-bold text-foreground tracking-tight mb-5">
                {saas.title}
              </h3>
              <p className="text-lg sm:text-xl lg:text-2xl font-semibold tracking-tight leading-[1.35] mb-8 max-w-lg mx-auto">
                <span className="text-muted-foreground/50">Every idea feels like it needs everything.</span>{" "}
                <span className="text-foreground">It doesn't.</span>
              </p>
              <Link
                to={`/services/${saas.slug}`}
                className="group inline-flex items-center gap-2.5 rounded-full border border-primary/30 pl-5 pr-1.5 py-1.5 text-sm font-semibold text-primary hover:bg-primary/10 hover:border-primary/50 transition-all duration-200"
              >
                View Full Service
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors duration-300">
                  <ArrowRight size={11} strokeWidth={2.5} className="group-hover:translate-x-[1.5px] transition-transform duration-200" />
                </span>
              </Link>
            </AnimatedSection>

            {/* The transforming panel — idea resolving into product. The ghost "?"    */}
            {/* is the idea's own uncertainty, bleeding out from behind the panel and  */}
            {/* left unresolved exactly where "an idea" gives way to "a real product". */}
            <AnimatedSection delay={0.08} className="my-16">
              <div className="relative w-full max-w-md mx-auto">
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute -left-8 top-3 sm:-left-16 sm:top-7 select-none font-serif italic text-[8rem] sm:text-[12rem] leading-none text-primary/[0.13] -rotate-6"
                >
                  ?
                </span>
                <div className="relative rounded-2xl border border-border/50 overflow-hidden shadow-2xl shadow-black/50 bg-background">
                  <div className="px-8 py-9 bg-card/10 border-b border-dashed border-border/50">
                    <Lightbulb size={22} className="text-muted-foreground/40 mb-3 mx-auto" />
                    <p className="text-base text-muted-foreground/50">An idea</p>
                  </div>
                  <div className="px-8 py-10 bg-gradient-to-b from-primary/10 to-primary/[0.03]">
                    <Rocket size={24} className="text-primary mb-3 mx-auto" />
                    <p className="text-xl font-semibold text-foreground">A real product</p>
                    <p className="text-sm text-muted-foreground mt-1.5">Liftly — live in production</p>
                  </div>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.12}>
              <p className="text-lg text-muted-foreground leading-relaxed max-w-xl mx-auto mb-7">
                We take the idea, make the scope decisions, build the real
                architecture, and get it into users' hands — a focused first
                version, not a six-month overbuild.
              </p>
              <ul className="inline-flex flex-col gap-2.5 mb-9 text-left">
                {["User accounts, roles & permissions", "Stripe payments & subscription billing", "Dashboards, analytics & admin panel", "Onboarding flows & launch support"].map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                    <span className="flex items-center justify-center w-4 h-4 rounded-full bg-primary/10 ring-1 ring-primary/15 flex-shrink-0 mt-0.5">
                      <Check size={9} strokeWidth={3} className="text-primary" />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
                <Link
                  to={`/contact?service=${saas.slug}`}
                  className="group inline-flex items-center gap-3 rounded-full bg-primary text-primary-foreground pl-7 pr-2 py-2 text-sm font-semibold hover:bg-primary/90 transition-colors duration-200"
                >
                  Build Your Product
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-black/10 group-hover:bg-black/[0.16] transition-colors duration-300">
                    <ArrowRight size={14} strokeWidth={2.5} className="group-hover:translate-x-[1.5px] transition-transform duration-200" />
                  </span>
                </Link>
                {liftlyProject && (
                  <Link to={`/portfolio/${liftlyProject.slug}`} className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors duration-200">
                    View Liftly's case study →
                  </Link>
                )}
              </div>
            </AnimatedSection>
          </div>
        </div>

        {/* ============================================================ */}
        {/* CHAPTER 2 — Product Rescue & Stabilization                    */}
        {/* The mess, scattered — resolving into a clean checklist, then   */}
        {/* the Fast Track peak.                                          */}
        {/* ============================================================ */}
        <div id="chapter-rescue" className="relative py-28 sm:py-40 bg-card/10 border-y border-border/40 overflow-hidden scroll-mt-20">
          <div aria-hidden="true" className="hidden sm:block relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 h-20 mb-6">
            {[
              { text: "no documentation", top: "0%", left: "6%", rotate: "-6deg" },
              { text: "half the tests fail", top: "40%", left: "27%", rotate: "4deg" },
              { text: "nobody remembers why", top: "5%", left: "48%", rotate: "-3deg" },
              { text: "it works, until it doesn't", top: "45%", left: "66%", rotate: "3deg" },
              { text: "the last dev just left", top: "0%", left: "84%", rotate: "-5deg" },
            ].map((frag) => (
              <span
                key={frag.text}
                className="absolute whitespace-nowrap text-sm text-muted-foreground/25 italic"
                style={{ top: frag.top, left: frag.left, transform: `rotate(${frag.rotate})` }}
              >
                {frag.text}
              </span>
            ))}
          </div>

          <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <AnimatedSection className="mb-14">
              <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-primary/60 mb-6">
                <span className="w-4 h-px bg-primary/40" aria-hidden="true" />
                Chapter 02
              </span>
              <h3 className="text-5xl sm:text-6xl font-bold text-foreground tracking-tight mb-5">
                {rescueService.title}
              </h3>
              <p className="text-lg sm:text-xl lg:text-2xl font-semibold tracking-tight leading-[1.35] mb-8 max-w-lg mx-auto">
                <span className="text-muted-foreground/50">You've already paid for this once.</span>{" "}
                <span className="text-foreground">We're not going to make you pay for it twice.</span>
              </p>
              <Link
                to={`/services/${rescueService.slug}`}
                className="group inline-flex items-center gap-2.5 rounded-full border border-primary/30 pl-5 pr-1.5 py-1.5 text-sm font-semibold text-primary hover:bg-primary/10 hover:border-primary/50 transition-all duration-200"
              >
                View Full Service
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors duration-300">
                  <ArrowRight size={11} strokeWidth={2.5} className="group-hover:translate-x-[1.5px] transition-transform duration-200" />
                </span>
              </Link>
            </AnimatedSection>

            <AnimatedSection delay={0.05} className="mb-14">
              <p className="text-lg text-muted-foreground leading-relaxed max-w-xl mx-auto">
                Before we recommend anything, we find out what's actually wrong —
                and what's already working. Most of the time, more survives than
                people expect.
              </p>
            </AnimatedSection>

            {/* The diagnosis, made visible — the same panel, before and after */}
            <AnimatedSection delay={0.08} className="mb-14">
              <div className="relative w-full max-w-lg mx-auto rounded-2xl border border-border/50 overflow-hidden shadow-2xl shadow-black/50 grid sm:grid-cols-2 text-left">
                <div className="relative p-7 sm:p-8 bg-card/10 border-b sm:border-b-0 sm:border-r border-dashed border-border/50">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground/45 mb-6">
                    Before
                  </p>
                  <div className="space-y-2.5 mb-6">
                    <span className="block h-2 rounded-full bg-red-400/25 w-4/5" />
                    <span className="block h-2 rounded-full bg-border w-3/5" />
                    <span className="block h-2 rounded-full bg-red-400/25 w-full" />
                    <span className="block h-2 rounded-full bg-border w-2/5" />
                  </div>
                  <span className="inline-flex items-center gap-2 text-xs text-red-400/70">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-400/60 flex-shrink-0" />
                    Breaking under real use
                  </span>
                </div>
                <div className="relative p-7 sm:p-8 bg-gradient-to-br from-primary/10 to-primary/[0.03]">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary/70 mb-6">
                    After
                  </p>
                  <div className="space-y-2.5 mb-6">
                    <span className="block h-2 rounded-full bg-primary/35 w-4/5" />
                    <span className="block h-2 rounded-full bg-primary/20 w-3/5" />
                    <span className="block h-2 rounded-full bg-primary/35 w-full" />
                    <span className="block h-2 rounded-full bg-primary/20 w-2/5" />
                  </div>
                  <span className="inline-flex items-center gap-2 text-xs text-primary font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                    Stable, monitored, understood
                  </span>
                </div>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 mt-7 max-w-lg mx-auto">
                {["Stable", "Performant", "Maintainable", "Ready to grow"].map((item, i, arr) => (
                  <React.Fragment key={item}>
                    <span className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground/80">
                      <span className="flex items-center justify-center w-4 h-4 rounded-full bg-primary/10 ring-1 ring-primary/15">
                        <Check size={9} strokeWidth={3} className="text-primary" />
                      </span>
                      {item}
                    </span>
                    {i < arr.length - 1 && <span className="text-border">·</span>}
                  </React.Fragment>
                ))}
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.09} className="mb-14">
              <ul className="inline-flex flex-col gap-2.5 text-left">
                {["Codebase & architecture health review", "Bug fixes & critical issue resolution", "Performance & reliability improvements", "Honest repair-vs-rebuild recommendation"].map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                    <span className="flex items-center justify-center w-4 h-4 rounded-full bg-primary/10 ring-1 ring-primary/15 flex-shrink-0 mt-0.5">
                      <Check size={9} strokeWidth={3} className="text-primary" />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </AnimatedSection>

            <AnimatedSection delay={0.1} className="mb-20">
              <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
                <Link
                  to={`/contact?service=${rescueService.slug}`}
                  className="group inline-flex items-center gap-3 rounded-full bg-primary text-primary-foreground pl-7 pr-2 py-2 text-sm font-semibold hover:bg-primary/90 transition-colors duration-200"
                >
                  Get a Free Assessment
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-black/10 group-hover:bg-black/[0.16] transition-colors duration-300">
                    <ArrowRight size={14} strokeWidth={2.5} className="group-hover:translate-x-[1.5px] transition-transform duration-200" />
                  </span>
                </Link>
                {learningPlatformProject && (
                  <Link to={`/portfolio/${learningPlatformProject.slug}`} className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors duration-200">
                    View case study →
                  </Link>
                )}
              </div>
            </AnimatedSection>

          </div>

          {/* The peak — a human proof moment, not a marketing statistic. Full */}
          {/* width, the same scale as the video on Home — sized to feel like  */}
          {/* a real cinematic moment, not a shrunken afterthought squeezed    */}
          {/* into the chapter's narrow text column. The video slot is a      */}
          {/* temporary placeholder (real client footage already used on      */}
          {/* Home), captioned generically on purpose — it is not attributed  */}
          {/* to Josh or Fast Track. Josh's real, exact quote stays in its own */}
          {/* correctly-attributed blockquote below, unchanged. When Josh's   */}
          {/* real video is ready, only the `src` and caption need to change  */}
          {/* — the section itself does not.                                 */}
          {fastTrackTestimonial?.evidence?.before && fastTrackTestimonial.evidence.after && (
            <>
              <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <AnimatedSection delay={0.09} className="mb-8">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground/60">
                    A client, unscripted
                  </p>
                </AnimatedSection>
              </div>

              <AnimatedSection delay={0.1} className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-14">
                <ClientVideoPlayer src="/videos/Reema-Testimonial.mp4" />
              </AnimatedSection>

              <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <AnimatedSection delay={0.11} className="mb-20">
                  <div className="max-w-xl mx-auto">
                    <p className="text-sm text-muted-foreground mb-4">
                      One team spent{" "}
                      <span className="text-foreground font-semibold">
                        {fastTrackTestimonial.evidence.before.stat.toLowerCase()}
                      </span>{" "}
                      failing to make it work. Zia's team needed{" "}
                      <span className="text-foreground font-semibold">
                        {fastTrackTestimonial.evidence.after.stat.toLowerCase()}
                      </span>.
                    </p>
                    <blockquote>
                      <p className="text-lg text-foreground/90 leading-snug mb-3">
                        "I had a Dev team before them and for two years struggle to get my
                        app up and running. Within 3 weeks of Zia taking over it was up and
                        running in Flawless condition."
                      </p>
                      <footer className="text-sm text-muted-foreground">
                        {fastTrackTestimonial.author}, Fast Track
                      </footer>
                    </blockquote>
                    <p className="text-xs text-muted-foreground/50 italic mt-5">
                      One verified client story — not a typical timeline.
                    </p>
                    {knipsrProject && (
                      <p className="text-sm text-muted-foreground mt-3">
                        Not a one-off —{" "}
                        <Link to={`/portfolio/${knipsrProject.slug}`} className="text-primary hover:underline">
                          Knipsr's event-day systems
                        </Link>{" "}
                        got the same treatment.
                      </p>
                    )}
                  </div>
                </AnimatedSection>
              </div>
            </>
          )}
        </div>

        {/* ============================================================ */}
        {/* CHAPTER 3 — Web Application Development                       */}
        {/* Wide, environmental — an abstract browser frame with a real    */}
        {/* operational skeleton inside. No invented data.                */}
        {/* ============================================================ */}
        <div id="chapter-web" className="py-28 sm:py-40 scroll-mt-20">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <AnimatedSection>
              <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-primary/60 mb-6">
                <span className="w-4 h-px bg-primary/40" aria-hidden="true" />
                Chapter 03
              </span>
              <h3 className="text-5xl sm:text-6xl font-bold text-foreground tracking-tight mb-5">
                {webApp.title}
              </h3>
              <p className="text-lg sm:text-xl lg:text-2xl font-semibold tracking-tight leading-[1.35] mb-8 max-w-lg mx-auto">
                <span className="text-muted-foreground/50">Not always a new product —</span>{" "}
                <span className="text-foreground">often a business that's outgrown spreadsheets.</span>
              </p>
              <Link
                to={`/services/${webApp.slug}`}
                className="group inline-flex items-center gap-2.5 rounded-full border border-primary/30 pl-5 pr-1.5 py-1.5 text-sm font-semibold text-primary hover:bg-primary/10 hover:border-primary/50 transition-all duration-200"
              >
                View Full Service
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors duration-300">
                  <ArrowRight size={11} strokeWidth={2.5} className="group-hover:translate-x-[1.5px] transition-transform duration-200" />
                </span>
              </Link>
            </AnimatedSection>
          </div>

          {/* The application itself — standing on its own, full width. Real page   */}
          {/* names from the real build (Forlag runs Dashboard/Orders/Inventory/    */}
          {/* Customers entirely off uploaded files, no backend database).          */}
          <AnimatedSection delay={0.08} className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 my-16">
            <div className="relative rounded-xl border border-border/60 overflow-hidden bg-card/15 shadow-[0_50px_110px_-25px_rgba(0,0,0,0.7),0_25px_55px_-20px_rgba(196,138,100,0.2)]">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_75%_10%,rgba(196,138,100,0.1),transparent_65%)]" />
              <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-foreground/[0.06]" />

              <div className="relative flex flex-wrap items-center gap-x-1 gap-y-1.5 px-4 py-3 border-b border-border/60 bg-card/40">
                <div className="flex items-center gap-1.5 mr-4">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-400/60" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400/50" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/50" />
                </div>
                {["Dashboard", "Orders", "Inventory", "Customers"].map((tab, i) => (
                  <span
                    key={tab}
                    className={`px-3 py-1.5 rounded-md text-[11px] sm:text-xs font-medium whitespace-nowrap ${
                      i === 0
                        ? "bg-primary/15 text-primary border border-primary/25"
                        : "text-muted-foreground/45"
                    }`}
                  >
                    {tab}
                  </span>
                ))}
              </div>

              <div aria-hidden="true" className="relative p-6 sm:p-9">
                <div className="flex items-center justify-between mb-6">
                  <span className="h-3 w-32 rounded-full bg-foreground/15" />
                  <div className="flex items-center gap-3">
                    <div className="hidden sm:flex items-center rounded-full border border-border/60 bg-background/40 p-0.5">
                      <span className="px-2.5 py-1 rounded-full text-[9px] font-semibold bg-primary/20 text-primary">MTD</span>
                      <span className="px-2.5 py-1 rounded-full text-[9px] font-medium text-muted-foreground/50">YTD</span>
                    </div>
                    <span className="w-7 h-7 rounded-full bg-primary/20 border border-primary/30 flex-shrink-0" />
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-3 sm:gap-4 mb-6">
                  {[
                    { active: true, Icon: TrendingUp, up: true },
                    { active: false, Icon: TrendingUp, up: true },
                    { active: false, Icon: TrendingDown, up: false },
                  ].map(({ active, Icon, up }, i) => (
                    <div
                      key={i}
                      className={`rounded-lg border p-3 sm:p-3.5 ${active ? "border-primary/30 bg-gradient-to-br from-primary/10 to-transparent" : "border-border/60 bg-background/40"}`}
                    >
                      <div className="flex items-center justify-between mb-2.5">
                        <span className="h-1.5 w-8 rounded-full bg-border" />
                        <Icon size={11} strokeWidth={2.5} className={up ? "text-primary/60" : "text-red-400/60"} />
                      </div>
                      <span className={`block h-3 w-1/2 rounded-full ${active ? "bg-primary/50" : "bg-foreground/20"}`} />
                    </div>
                  ))}
                </div>
                <div className="relative rounded-lg border border-primary/25 bg-gradient-to-br from-primary/10 to-transparent p-4 sm:p-5 h-36 sm:h-44 flex items-end gap-2 mb-6">
                  <span className="pointer-events-none absolute inset-x-4 sm:inset-x-5 top-1/3 border-t border-border/25" />
                  <span className="pointer-events-none absolute inset-x-4 sm:inset-x-5 top-2/3 border-t border-border/25" />
                  {[0.3, 0.5, 0.4, 0.7, 0.55, 0.85, 0.65, 0.5].map((h, i) => (
                    <span
                      key={i}
                      className={`relative flex-1 rounded-t-sm ${i === 5 ? "bg-primary/60" : "bg-primary/20"}`}
                      style={{ height: `${h * 100}%` }}
                    />
                  ))}
                </div>
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-3 pb-2 mb-1.5 border-b border-border/40">
                    <span className="w-6 h-6 flex-shrink-0" />
                    <span className="h-1.5 w-14 rounded-full bg-border/50" />
                    <span className="h-1.5 w-10 rounded-full bg-border/50 ml-auto" />
                  </div>
                  {[0, 1, 2, 3].map((i) => (
                    <div key={i} className="flex items-center gap-3 py-1.5">
                      <span className="w-6 h-6 rounded-md bg-border/30 flex-shrink-0" />
                      <span className="h-2 rounded-full bg-border/60" style={{ width: `${62 - i * 8}%` }} />
                      <span className={`h-2 w-10 rounded-full ml-auto flex-shrink-0 ${i % 2 === 0 ? "bg-primary/25" : "bg-border/35"}`} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </AnimatedSection>

          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <AnimatedSection delay={0.14}>
              <blockquote className="max-w-xl mx-auto mb-7">
                <p className="text-lg text-foreground/90 leading-snug mb-3">
                  "He built a beautiful sales and inventory dashboard for me, and
                  went out of his way to make it just as I wanted it."
                </p>
                <footer className="text-sm text-muted-foreground">
                  Harald, Co-owner, Forlag
                  {forlagProject && (
                    <>
                      {" · "}
                      <Link to={`/portfolio/${forlagProject.slug}`} className="text-primary hover:underline">Case study</Link>
                    </>
                  )}
                </footer>
              </blockquote>
              <ul className="inline-flex flex-col gap-2.5 mb-9 text-left">
                {["Custom dashboards & internal tools", "API integrations with your other business tools", "Real-time features with live updates", "Security-minded architecture & access control"].map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                    <span className="flex items-center justify-center w-4 h-4 rounded-full bg-primary/10 ring-1 ring-primary/15 flex-shrink-0 mt-0.5">
                      <Check size={9} strokeWidth={3} className="text-primary" />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 mb-10">
                <Link
                  to={`/contact?service=${webApp.slug}`}
                  className="group inline-flex items-center gap-3 rounded-full bg-primary text-primary-foreground pl-7 pr-2 py-2 text-sm font-semibold hover:bg-primary/90 transition-colors duration-200"
                >
                  Build Your Web App
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-black/10 group-hover:bg-black/[0.16] transition-colors duration-300">
                    <ArrowRight size={14} strokeWidth={2.5} className="group-hover:translate-x-[1.5px] transition-transform duration-200" />
                  </span>
                </Link>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2">
                {["MTD/YTD comparisons", "7-KPI inventory view with dead-stock detection", "30,000+ order rows, no backend database"].map((fact) => (
                  <span key={fact} className="text-sm text-muted-foreground/60">
                    {fact}
                  </span>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </div>

        {/* ============================================================ */}
        {/* CHAPTER 4 — Mobile App Development                            */}
        {/* A held device, given real presence — not a tiny icon.         */}
        {/* ============================================================ */}
        <div id="chapter-mobile" className="py-28 sm:py-40 bg-card/10 border-y border-border/40 overflow-hidden scroll-mt-20">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <AnimatedSection>
              <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-primary/60 mb-6">
                <span className="w-4 h-px bg-primary/40" aria-hidden="true" />
                Chapter 04
              </span>
              <h3 className="text-5xl sm:text-6xl font-bold text-foreground tracking-tight mb-5">
                {mobile.title}
              </h3>
              <p className="text-lg sm:text-xl lg:text-2xl font-semibold tracking-tight leading-[1.35] mb-8 max-w-lg mx-auto">
                <span className="text-muted-foreground/50">Web software lives on a desk.</span>{" "}
                <span className="text-foreground">This has to live in someone's hand.</span>
              </p>
              <Link
                to={`/services/${mobile.slug}`}
                className="group inline-flex items-center gap-2.5 rounded-full border border-primary/30 pl-5 pr-1.5 py-1.5 text-sm font-semibold text-primary hover:bg-primary/10 hover:border-primary/50 transition-all duration-200"
              >
                View Full Service
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors duration-300">
                  <ArrowRight size={11} strokeWidth={2.5} className="group-hover:translate-x-[1.5px] transition-transform duration-200" />
                </span>
              </Link>
            </AnimatedSection>

            {/* The device — large, tactile, the chapter's dominant visual */}
            <AnimatedSection delay={0.08} aria-hidden="true" className="my-16 flex justify-center">
              <div className="relative w-60 sm:w-72 aspect-[9/19.5] rounded-[2.75rem] bg-gradient-to-b from-card via-card/70 to-card/40 border border-border p-[3px] -rotate-2 shadow-[0_35px_80px_-20px_rgba(0,0,0,0.85),0_0_60px_-15px_rgba(196,138,100,0.22)]">
                <div className="pointer-events-none absolute inset-0 rounded-[2.75rem] bg-gradient-to-br from-foreground/10 via-transparent to-transparent" />
                <span className="absolute -left-px top-20 w-[3px] h-7 rounded-l-sm bg-border" />
                <span className="absolute -left-px top-32 w-[3px] h-11 rounded-l-sm bg-border" />
                <span className="absolute -right-px top-28 w-[3px] h-14 rounded-r-sm bg-border" />
                <div className="relative w-full h-full rounded-[2.55rem] overflow-hidden bg-background border border-border/50">
                  <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_65%_40%_at_50%_8%,rgba(196,138,100,0.20),transparent_60%)]" />
                  <span className="absolute top-3.5 left-1/2 -translate-x-1/2 w-16 h-5 rounded-full bg-foreground/90 z-10" />
                  <div className="relative h-full flex flex-col p-4 pt-14">
                    <div className="flex items-center justify-between mb-5 px-1">
                      <div className="h-2.5 w-14 rounded-full bg-foreground/15" />
                      <div className="h-5 w-5 rounded-full bg-primary/40" />
                    </div>
                    <div className="rounded-2xl border border-primary/30 bg-gradient-to-br from-primary/15 via-primary/5 to-transparent p-4 mb-3 h-24">
                      <div className="h-2 w-1/2 rounded-full bg-foreground/20 mb-2" />
                      <div className="h-2 w-1/3 rounded-full bg-foreground/10" />
                    </div>
                    <div className="flex-1 flex flex-col gap-2.5">
                      {[0, 1, 2].map((i) => (
                        <div key={i} className="h-10 rounded-xl bg-card/60 border border-border/50 flex items-center gap-3 px-3">
                          <span className="w-5 h-5 rounded-full bg-foreground/10 flex-shrink-0" />
                          <span className="h-2 rounded-full bg-foreground/10 flex-1" />
                        </div>
                      ))}
                    </div>
                    <div className="h-12 rounded-2xl bg-card/60 border border-border/50 mt-3 flex items-center justify-around px-2">
                      {[0, 1, 2, 3].map((i) => (
                        <span key={i} className={`w-4 h-4 rounded-full ${i === 0 ? "bg-primary/70" : "bg-foreground/10"}`} />
                      ))}
                    </div>
                  </div>
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-foreground/[0.05] via-transparent to-transparent" />
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.14}>
              <blockquote className="mb-7 max-w-md mx-auto">
                <p className="text-lg text-foreground/90 leading-snug mb-3">
                  "I wouldn't have been able to launch my startup without his
                  expertise in app building and development."
                </p>
                <footer className="text-sm text-muted-foreground">
                  Sam, Founder, Skill x Swap
                  {skillXSwapProject && (
                    <>
                      {" · "}
                      <Link to={`/portfolio/${skillXSwapProject.slug}`} className="text-primary hover:underline">Case study</Link>
                    </>
                  )}
                </footer>
              </blockquote>
              <ul className="inline-flex flex-col gap-2.5 mb-9 text-left">
                {["iOS & Android from one React Native codebase", "Push notifications & offline mode", "Device features — camera, location, biometrics", "App Store & Play Store submission"].map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                    <span className="flex items-center justify-center w-4 h-4 rounded-full bg-primary/10 ring-1 ring-primary/15 flex-shrink-0 mt-0.5">
                      <Check size={9} strokeWidth={3} className="text-primary" />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
              <div>
                <Link
                  to={`/contact?service=${mobile.slug}`}
                  className="group inline-flex items-center gap-3 rounded-full bg-primary text-primary-foreground pl-7 pr-2 py-2 text-sm font-semibold hover:bg-primary/90 transition-colors duration-200"
                >
                  Build Your Mobile App
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-black/10 group-hover:bg-black/[0.16] transition-colors duration-300">
                    <ArrowRight size={14} strokeWidth={2.5} className="group-hover:translate-x-[1.5px] transition-transform duration-200" />
                  </span>
                </Link>
              </div>
            </AnimatedSection>
          </div>
        </div>

        {/* ============================================================ */}
        {/* CHAPTER 5 — AI Automation & Workflows                         */}
        {/* Fragmentation becoming coordination — labeled, then the       */}
        {/* real pipeline as supporting evidence.                         */}
        {/* ============================================================ */}
        <div id="chapter-automation" className="py-28 sm:py-40 scroll-mt-20">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <AnimatedSection>
              <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-primary/60 mb-6">
                <span className="w-4 h-px bg-primary/40" aria-hidden="true" />
                Chapter 05
              </span>
              <h3 className="text-5xl sm:text-6xl font-bold text-foreground tracking-tight mb-5">
                {automation.title}
              </h3>
              <p className="text-lg sm:text-xl lg:text-2xl font-semibold tracking-tight leading-[1.35] mb-8 max-w-lg mx-auto">
                <span className="text-muted-foreground/50">Somewhere in your company, someone opens the same three tools every morning</span>{" "}
                <span className="text-foreground">and copies data between them by hand.</span>
              </p>
              <Link
                to={`/services/${automation.slug}`}
                className="group inline-flex items-center gap-2.5 rounded-full border border-primary/30 pl-5 pr-1.5 py-1.5 text-sm font-semibold text-primary hover:bg-primary/10 hover:border-primary/50 transition-all duration-200"
              >
                View Full Service
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors duration-300">
                  <ArrowRight size={11} strokeWidth={2.5} className="group-hover:translate-x-[1.5px] transition-transform duration-200" />
                </span>
              </Link>
            </AnimatedSection>

            {/* Fragmentation → coordination, given real scale */}
            <AnimatedSection delay={0.08} className="my-20">
              <div className="flex items-center justify-center px-2">
                <div className="flex items-end gap-2 sm:gap-7">
                  {[
                    { label: "Emails", mt: "0px", rotate: "-7deg" },
                    { label: "Sheets", mt: "20px", rotate: "5deg" },
                    { label: "Manual", mt: "-8px", rotate: "-3deg" },
                    { label: "Tools", mt: "14px", rotate: "6deg" },
                  ].map((sq) => (
                    <span key={sq.label} className="flex flex-col items-center gap-2 sm:gap-3" style={{ marginTop: sq.mt }}>
                      <span
                        className="block w-6 h-6 sm:w-11 sm:h-11 rounded-[6px] sm:rounded-[7px] border border-muted-foreground/30"
                        style={{ transform: `rotate(${sq.rotate})` }}
                      />
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
            </AnimatedSection>

            <AnimatedSection delay={0.14}>
              <p className="text-xl sm:text-2xl text-foreground/90 leading-relaxed mb-9">
                The result: nobody copies anything by hand anymore.
              </p>
              <ul className="inline-flex flex-col gap-2.5 mb-9 text-left">
                {["Custom AI bots & OpenAI integrations", "Connecting your tools — CRM, Sheets, Slack & more", "Automated data processing & reporting", "No-code workflows with Make, Zapier & n8n"].map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                    <span className="flex items-center justify-center w-4 h-4 rounded-full bg-primary/10 ring-1 ring-primary/15 flex-shrink-0 mt-0.5">
                      <Check size={9} strokeWidth={3} className="text-primary" />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 mb-16">
                <Link
                  to={`/contact?service=${automation.slug}`}
                  className="group inline-flex items-center gap-3 rounded-full bg-primary text-primary-foreground pl-7 pr-2 py-2 text-sm font-semibold hover:bg-primary/90 transition-colors duration-200"
                >
                  Automate Your Workflow
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-black/10 group-hover:bg-black/[0.16] transition-colors duration-300">
                    <ArrowRight size={14} strokeWidth={2.5} className="group-hover:translate-x-[1.5px] transition-transform duration-200" />
                  </span>
                </Link>
                {floatingStoneProject && (
                  <Link to={`/portfolio/${floatingStoneProject.slug}`} className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors duration-200">
                    View case study →
                  </Link>
                )}
              </div>

              <div className="max-w-lg mx-auto">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground/60 mb-3">
                  One real engagement
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                  Carcass intake, logged the moment it arrives. Boxing and lot
                  tracking, every box traceable. Status changes handled by Make.com,
                  not a person. Bills of lading generated automatically.
                </p>
                <p className="text-base text-foreground/70 italic leading-relaxed mb-2">
                  "The team understood the complexity of my industry and of the
                  project quickly and were flexible with the scope."
                </p>
                <p className="text-sm text-muted-foreground">James, Owner, Floating Stone Ranch</p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Process Section — the filmstrip. Instead of describing five steps,   */}
      {/* five small mockups literally get more finished, frame by frame: empty */}
      {/* thoughts, then a wireframe, then a design, then a working build, then */}
      {/* a live product with its own glow. The process IS the visual.         */}
      <section className="relative overflow-hidden bg-background py-28 sm:py-40">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16 sm:mb-20">
          <AnimatedSection>
            <SectionEyebrow className="mb-6">The Process</SectionEyebrow>
            <p className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.15]">
              <span className="text-muted-foreground/50">Nothing, then a live product.</span>{" "}
              <span className="text-foreground">Five frames, five approvals.</span>
            </p>
          </AnimatedSection>
        </div>

        <AnimatedSection delay={0.08} className="max-w-3xl sm:max-w-6xl mx-auto">
          <div className="flex gap-3.5 sm:gap-4 overflow-x-auto sm:overflow-visible snap-x snap-mandatory px-4 sm:px-6 lg:px-8 pb-2 sm:pb-0 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {process.map((step, index) => {
              const phase = processPhaseDetails[index];
              const Icon = phase.icon;
              const isLast = index === process.length - 1;

              return (
                <button
                  key={step.step}
                  type="button"
                  onClick={() => setSelectedProcessStep(index)}
                  className={`group relative flex-shrink-0 snap-center w-[64%] sm:w-auto sm:flex-1 text-left focus:outline-none transition-transform duration-300 ${isLast ? "sm:-translate-y-1.5" : ""}`}
                >
                  <div
                    className={`relative rounded-xl border overflow-hidden bg-card/15 transition-all duration-300 ${
                      isLast
                        ? "border-primary/45 shadow-[0_35px_70px_-25px_rgba(196,138,100,0.4)]"
                        : "border-border/60 group-hover:border-primary/30"
                    }`}
                  >
                    <div className="relative h-7 flex items-center gap-2.5 px-3 border-b border-border/50 bg-card/30">
                      <div className="flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-400/50" />
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400/40" />
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400/40" />
                      </div>
                      <span className="h-1.5 flex-1 max-w-[44px] rounded-full bg-background/50" />
                      {isLast && (
                        <span className="flex items-center gap-1 flex-shrink-0">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                          <span className="text-[8px] font-bold text-primary uppercase tracking-wide">Live</span>
                        </span>
                      )}
                    </div>

                    <div aria-hidden="true" className="relative h-28 sm:h-32 p-3">
                      {index === 0 && (
                        <div className="relative h-full">
                          <span className="absolute top-3 left-5 w-1.5 h-1.5 rounded-full bg-border" />
                          <span className="absolute top-10 left-11 w-1.5 h-1.5 rounded-full bg-border" />
                          <span className="absolute top-6 right-7 w-1.5 h-1.5 rounded-full bg-border" />
                          <span className="absolute bottom-4 left-8 w-2 h-2 rounded-full bg-border/70" />
                          <span className="absolute bottom-6 right-9 w-1.5 h-1.5 rounded-full bg-border" />
                        </div>
                      )}
                      {index === 1 && (
                        <div className="h-full flex flex-col gap-2">
                          <div className="h-3 w-1/2 rounded border border-border" />
                          <div className="flex-1 grid grid-cols-2 gap-2">
                            <div className="rounded border border-border" />
                            <div className="rounded border border-border" />
                          </div>
                        </div>
                      )}
                      {index === 2 && (
                        <div className="h-full flex flex-col gap-2">
                          <div className="h-3 w-1/2 rounded-full bg-foreground/15" />
                          <div className="flex-1 grid grid-cols-2 gap-2">
                            <div className="rounded-lg bg-primary/15 border border-primary/20" />
                            <div className="rounded-lg bg-border/40" />
                          </div>
                        </div>
                      )}
                      {index === 3 && (
                        <div className="h-full flex flex-col gap-1.5">
                          <div className="flex items-center justify-between">
                            <div className="h-2.5 w-1/3 rounded-full bg-foreground/20" />
                            <div className="h-4 w-8 rounded-full bg-primary/40" />
                          </div>
                          <div className="flex-1 grid grid-cols-3 gap-1.5">
                            <div className="rounded-md bg-primary/20 border border-primary/25" />
                            <div className="rounded-md bg-border/40" />
                            <div className="rounded-md bg-border/40" />
                          </div>
                          <div className="h-2 w-3/4 rounded-full bg-border/50" />
                        </div>
                      )}
                      {index === 4 && (
                        <div className="h-full flex flex-col gap-1.5">
                          <div className="flex items-center justify-between">
                            <div className="h-2.5 w-1/3 rounded-full bg-foreground/25" />
                            <div className="h-4 w-10 rounded-full bg-primary/60" />
                          </div>
                          <div className="flex-1 grid grid-cols-3 gap-1.5">
                            <div className="col-span-2 rounded-md bg-gradient-to-br from-primary/25 to-transparent border border-primary/30" />
                            <div className="rounded-md bg-primary/20 border border-primary/25" />
                          </div>
                          <div className="flex gap-1.5">
                            <div className="h-2 flex-1 rounded-full bg-border/60" />
                            <div className="h-2 w-6 rounded-full bg-primary/50" />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex items-start justify-between gap-2 mt-3 px-0.5">
                    <div className="flex items-center gap-2 min-w-0">
                      <Icon size={14} className="text-primary/70 flex-shrink-0" />
                      <span>
                        <span className="block text-sm font-bold text-foreground group-hover:text-primary transition-colors duration-200">
                          {phase.title}
                        </span>
                        <span className="block text-[11px] text-muted-foreground/55 truncate">{phase.output}</span>
                      </span>
                    </div>
                    <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full border border-border/60 text-muted-foreground/50 group-hover:border-primary/40 group-hover:text-primary group-hover:bg-primary/10 transition-all duration-300">
                      <Plus size={11} className="group-hover:rotate-90 transition-transform duration-300" />
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </AnimatedSection>

        <p className="text-center text-sm text-muted-foreground mt-10 sm:mt-14 px-4">
          Click any frame to see what happens, what you approve, and what you receive.
        </p>
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

      {/* The Record — not an audit of our own proof library. A skeptical      */}
      {/* founder doesn't need our math; they need to feel real client voices, */}
      {/* independently placed, forming a pattern too consistent to fake.      */}
      <section className="relative overflow-hidden bg-background py-28 sm:py-40">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16 sm:mb-20">
          <AnimatedSection>
            <SectionEyebrow className="mb-6">The Record</SectionEyebrow>
            <p className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.15]">
              <span className="text-muted-foreground/50">A five-star badge is easy to put on a website.</span>{" "}
              <span className="text-foreground">What clients said somewhere we don't control isn't.</span>
            </p>
          </AnimatedSection>
        </div>

        {/* The lane — real voices drifting past at two depths, unhurried. Not  */}
        {/* a claim we're making: words that already exist, permanently, on     */}
        {/* someone else's platform. Framed like light through a slot, staged. */}
        <AnimatedSection delay={0.05} className="relative mb-16 sm:mb-20">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_85%_at_50%_50%,rgba(196,138,100,0.08),transparent_70%)]"
          />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none font-serif text-[16rem] sm:text-[22rem] leading-none text-primary/[0.035]"
          >
            "
          </span>
          <div className="relative border-y border-border/40 space-y-9 sm:space-y-12 py-10 sm:py-14 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)] [-webkit-mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
            <RecordVoiceRow voices={recordVoicesRowB} duration={64} size="sm" reverse depth />
            <RecordVoiceRow voices={recordVoicesRowA} duration={48} size="lg" />
          </div>
        </AnimatedSection>

        {/* The seal cluster — the section's one crafted object, the way a      */}
        {/* phone or a browser window carries Mobile or Web. Verification       */}
        {/* seals fanned around the average, like medals set on a desk.         */}
        <AnimatedSection delay={0.1} className="relative mb-12 sm:mb-14 px-4">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_45%_55%_at_50%_45%,rgba(196,138,100,0.18),transparent_65%)]"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-[0.03] mix-blend-overlay"
            style={{ backgroundImage: RECORD_GRAIN }}
          />
          <div className="relative flex items-center justify-center -space-x-4 sm:-space-x-6">
            <SealBadge sizeClass="w-16 h-16 sm:w-20 sm:h-20" rotate="-rotate-6" z={1}>
              <PlatformIcon platform="Fiverr" size={20} className="text-foreground/55" />
            </SealBadge>
            <SealBadge sizeClass="w-20 h-20 sm:w-28 sm:h-28" rotate="-rotate-3" z={2}>
              <PlatformIcon platform="Upwork" size={26} className="text-foreground/60" />
            </SealBadge>
            <SealBadge sizeClass="w-28 h-28 sm:w-44 sm:h-44" rotate="rotate-0" z={3} primary>
              <span className="text-3xl sm:text-6xl font-bold text-primary leading-none">{recordAverageRating}</span>
              <span className="text-[8px] sm:text-[11px] font-semibold uppercase tracking-[0.14em] text-primary/70 mt-1.5 sm:mt-2">
                Avg. Rating
              </span>
            </SealBadge>
            <SealBadge sizeClass="w-20 h-20 sm:w-28 sm:h-28" rotate="rotate-3" z={2}>
              <PlatformIcon platform="Trustpilot" size={26} className="text-foreground/60" />
            </SealBadge>
            <SealBadge sizeClass="w-16 h-16 sm:w-20 sm:h-20" rotate="rotate-6" z={1}>
              <PlatformIcon platform="Clutch" size={20} className="text-foreground/55" />
            </SealBadge>
          </div>
        </AnimatedSection>

        <div className="flex justify-center mb-6 sm:mb-8" aria-hidden="true">
          <span className="w-px h-8 sm:h-10 bg-gradient-to-b from-primary/40 to-transparent" />
        </div>

        <AnimatedSection delay={0.1} className="text-center px-4 mb-16 sm:mb-20">
          <div className="flex justify-center mb-3">
            <ShieldCheck size={16} className="text-primary/60" />
          </div>
          <p className="text-sm text-muted-foreground max-w-xs mx-auto">
            Every rated review on Fiverr, Upwork, Trustpilot, and Clutch — not a curated subset.
          </p>
        </AnimatedSection>

        <div className="text-center px-4">
          <Link
            to="/client-stories"
            className="group inline-flex items-center gap-2.5 rounded-full border border-primary/30 pl-5 pr-1.5 py-1.5 text-sm font-semibold text-primary hover:bg-primary/10 hover:border-primary/50 transition-all duration-200"
          >
            Open the full record
            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors duration-300">
              <ArrowRight size={11} strokeWidth={2.5} className="group-hover:translate-x-[1.5px] transition-transform duration-200" />
            </span>
          </Link>
        </div>
      </section>

      {/* The Close — not another CTA band. The Hero opened with "your starting */}
      {/* point decides what's next" as a claim; this is where it becomes an   */}
      {/* action. No menu of situations to sort yourself into — that would put */}
      {/* the self-diagnosis burden right back on the visitor. One line, one   */}
      {/* door, and the Hero's own words handed back at the very end.         */}
      <section className="relative overflow-hidden bg-background py-32 sm:py-48">
        <div className="relative max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <p className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight leading-[1.25] mb-8 sm:mb-10">
              <span className="block text-muted-foreground/50">You don't need the solution.</span>
              <span className="block text-foreground mt-1.5">Just tell us where you are.</span>
            </p>
          </AnimatedSection>

          <AnimatedSection delay={0.05} className="mb-12 sm:mb-16">
            <ClosingTypewriter />
          </AnimatedSection>

          <AnimatedSection delay={0.08} className="relative inline-block">
            <ClosingGlow />
            <Link to="/contact">
              <motion.button
                whileHover={{ scale: 1.015, y: -2 }}
                whileTap={{ scale: 0.985 }}
                transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="group relative bg-gradient-to-b from-primary to-primary/[0.92] text-primary-foreground pl-9 pr-7 sm:pl-10 sm:pr-8 py-4 sm:py-[1.15rem] rounded-full font-semibold text-base sm:text-lg tracking-[-0.01em]
                         shadow-[0_1px_0_0_rgba(255,255,255,0.25)_inset,0_2px_10px_-2px_rgba(0,0,0,0.35),0_16px_36px_-16px_rgba(196,138,100,0.4)]
                         hover:shadow-[0_1px_0_0_rgba(255,255,255,0.3)_inset,0_2px_10px_-2px_rgba(0,0,0,0.4),0_20px_42px_-16px_rgba(196,138,100,0.5)]
                         flex items-center gap-3 overflow-hidden transition-shadow duration-300"
              >
                <span className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-b from-white/[0.14] via-white/0 to-black/[0.06]" />
                <span className="relative">Tell us where you are</span>
                <span className="relative flex items-center justify-center w-5 h-5 rounded-full bg-black/10 group-hover:bg-black/[0.14] transition-colors duration-300">
                  <ArrowRight size={12} strokeWidth={2.5} className="group-hover:translate-x-[1.5px] transition-transform duration-200" />
                </span>
              </motion.button>
            </Link>
          </AnimatedSection>

          <AnimatedSection delay={0.14}>
            <p className="mt-14 sm:mt-16 text-xs sm:text-sm italic text-muted-foreground/40">
              Your starting point decides what's next.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* FAQ Section — one continuous moment, not two placed side by side.    */}
      {/* Same devices every big section above uses — eyebrow, centered        */}
      {/* muted-to-foreground sentence, one faint atmosphere — at the quiet    */}
      {/* register The Close already established. The vertical thread below   */}
      {/* the headline is the same connector The Record uses between its seal */}
      {/* cluster and its caption; here it runs straight into the list's own  */}
      {/* top rule, so the introduction and the questions read as one object  */}
      {/* instead of a header sitting above an unrelated block.               */}
      <section className="relative overflow-hidden bg-background py-24 sm:py-28 md:py-32">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_55%_at_50%_18%,rgba(196,138,100,0.06),transparent_70%)]"
        />

        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center">
            <SectionEyebrow className="mb-6">FAQ</SectionEyebrow>
            <h2 className="text-xl sm:text-2xl lg:text-3xl tracking-tight leading-[1.35]">
              <span className="text-muted-foreground/50">A few things are still worth spelling out.</span>{" "}
              <span className="text-foreground">Here's what founders usually ask before reaching out.</span>
            </h2>
          </AnimatedSection>

          <div className="flex justify-center my-10 sm:my-12" aria-hidden="true">
            <span className="w-px h-10 sm:h-12 bg-gradient-to-b from-primary/40 to-transparent" />
          </div>

          <AnimatedSection delay={0.06}>
            <FAQAccordion items={servicesFAQs} idPrefix="services-faq" />
          </AnimatedSection>
        </div>
      </section>
    </PageTransition>
  );
};

export default ServicesPage;
