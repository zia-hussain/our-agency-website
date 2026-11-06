import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Wrench, Rocket, Workflow } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { services, rescueService } from "../../data/services";
import { OFFERS, offerHref } from "../../config/offers";
import { trackOfferSelect, trackCTAClick } from "../../utils/analytics";

/**
 * "Which one is you?" — a selector, not three documents.
 *
 * Left: the three buying situations as one-line statements in the buyer's
 * own words. Right: the detail for the selected one — what we do, the
 * engagement that exists, one piece of proof, one action. The reader
 * recognises themselves in a second and reads only the panel that applies.
 * On narrow screens the same content becomes a stack of expandable rows.
 *
 * Beneath it, the capability layer: five disciplines that execute the
 * situations, each tied to a shipped case, so "we can start small" never
 * reads as "we are small".
 */
type Door = {
  key: "build" | "fix" | "automate";
  tag: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  statement: string;
  voice: string;
  approach: string;
  engagement: { title: string; meta: string };
  proof: { line: string; href: string };
  cta: { label: string; href: string; offer: "product-rescue" | "manual-to-system" | null };
  secondary: { label: string; href: string };
};

const DOORS: Door[] = [
  {
    key: "fix",
    tag: "FIX",
    icon: Wrench,
    statement: "I have a product, and it's stuck.",
    voice: "“Three developers have looked at it. I've had three different answers.”",
    approach:
      "Before another fix or a rebuild, we find out from the product's own evidence what to keep, what to fix and what to replace — then do the work that's actually warranted.",
    engagement: {
      title: OFFERS["product-rescue"].name,
      meta: `$${OFFERS["product-rescue"].price} · five business days · then the implementation`,
    },
    proof: {
      line: "Fast Track USA — two years with a previous team; live three weeks after we took over, by the founder's account.",
      href: "/portfolio/fast-track-usa-app-rescue",
    },
    cta: { label: "Show us where you're stuck", href: offerHref("product-rescue", "homepage-door"), offer: "product-rescue" },
    secondary: { label: "Not ready to pay? Four free questions", href: "/rescue-or-rebuild" },
  },
  {
    key: "build",
    tag: "BUILD",
    icon: Rocket,
    statement: "I have an idea, and nothing built yet.",
    voice: "“I know what the product should become. I don't know what belongs in the first version.”",
    approach:
      "We decide what V1 has to prove — in writing, in week one — then build exactly that: accounts, payments, the core flow and the admin it needs. The rest waits until the product has earned it.",
    engagement: {
      title: "SaaS & product development",
      meta: "from $4,800 · scope decided in week one · optional V1 brief first",
    },
    proof: {
      line: "Knipsr — built from the ground up to a launch-ready SaaS; the founder's words are on Trustpilot.",
      href: "/portfolio/knipsr-event-media-saas",
    },
    cta: { label: "Tell us what you're building", href: "/services/saas-mvp-development", offer: null },
    secondary: { label: "Want the V1 decision on its own first?", href: "/services/saas-mvp-development#v1-brief" },
  },
  {
    key: "automate",
    tag: "AUTOMATE",
    icon: Workflow,
    statement: "My operation still runs on people and spreadsheets.",
    voice: "“The process works because people remember what to do. That's the problem.”",
    approach:
      "We map the manual steps, build the one that costs your team the most, and leave it running with failures flagged to a person, not lost. Then we decide together if there's a second.",
    engagement: {
      title: "AI Automation & Workflows",
      meta: "from $2,500 · one bounded workflow · built, live, watched",
    },
    proof: {
      line: "Floating Stone Ranch — paper and spreadsheets to one traceable system; eight months on, still a client.",
      href: "/portfolio/floating-stone-ranch-processor-intake-engine",
    },
    cta: { label: "Show us the workflow", href: "/services/ai-automation-solutions#start-small", offer: null },
    secondary: { label: "Spans several teams? Start with a plan", href: offerHref("manual-to-system", "homepage-door") },
  },
];

const CAPABILITIES: { s: typeof rescueService; proof: string; href: string; price?: string }[] = [
  { s: services.find((x) => x.slug === "saas-mvp-development")!, proof: "Knipsr", href: "/portfolio/knipsr-event-media-saas" },
  { s: services.find((x) => x.slug === "web-application-development")!, proof: "Forlag", href: "/portfolio/forlag-publishing-sales-inventory-dashboard" },
  { s: services.find((x) => x.slug === "mobile-app-development")!, proof: "Skill x Swap", href: "/portfolio/skill-x-swap-mvp" },
  { s: services.find((x) => x.slug === "ai-automation-solutions")!, proof: "Floating Stone Ranch", href: "/portfolio/floating-stone-ranch-processor-intake-engine" },
  { s: rescueService, proof: "Fast Track USA", href: "/portfolio/fast-track-usa-app-rescue", price: "Assessment $750" },
].filter((c) => c.s);

const Panel: React.FC<{ d: Door; compact?: boolean }> = ({ d, compact }) => (
  <div className={compact ? "pt-5" : ""}>
    <p className="text-[15px] sm:text-base italic text-foreground/75 leading-snug border-l border-primary/40 pl-4 mb-6">{d.voice}</p>
    <p className="text-base text-muted-foreground leading-relaxed mb-7 max-w-xl">{d.approach}</p>

    <div className="grid sm:grid-cols-2 gap-5 mb-8">
      <div className="rounded-xl border border-primary/20 bg-primary/[0.05] px-5 py-4">
        <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-primary/70 mb-1.5">How it starts</p>
        <p className="text-sm font-semibold text-foreground leading-snug">{d.engagement.title}</p>
        <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{d.engagement.meta}</p>
      </div>
      <Link to={d.proof.href} className="group rounded-xl border border-border/50 bg-card/15 px-5 py-4 hover:border-primary/30 transition-colors duration-200">
        <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground/60 mb-1.5">One piece of proof</p>
        <p className="text-sm text-foreground/85 leading-snug group-hover:text-foreground">{d.proof.line}</p>
        <span className="mt-2 inline-flex items-center gap-1 text-xs text-primary/80 group-hover:text-primary">
          Read the case <ArrowRight size={11} className="group-hover:translate-x-0.5 transition-transform duration-200" />
        </span>
      </Link>
    </div>

    <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
      <Link
        to={d.cta.href}
        onClick={() => (d.cta.offer ? trackOfferSelect(d.cta.offer) : trackCTAClick(`door-${d.key}`, "homepage"))}
        className="btn-sheen group/cta inline-flex items-center gap-3 whitespace-nowrap rounded-full bg-gradient-to-b from-primary to-primary/[0.92] text-primary-foreground pl-6 pr-2 py-2.5 text-sm font-semibold w-fit"
      >
        {d.cta.label}
        <span className="flex items-center justify-center w-7 h-7 rounded-full bg-black/10">
          <ArrowRight size={13} strokeWidth={2.5} className="group-hover/cta:translate-x-[1.5px] transition-transform duration-200" />
        </span>
      </Link>
      <Link to={d.secondary.href} className="text-sm text-muted-foreground hover:text-primary transition-colors underline-offset-4 hover:underline">
        {d.secondary.label} →
      </Link>
    </div>
  </div>
);

const ServicesPreview: React.FC = () => {
  const [active, setActive] = useState<Door["key"]>("fix");
  const [openMobile, setOpenMobile] = useState<Door["key"] | null>("fix");
  const shouldReduceMotion = useReducedMotion();
  const current = DOORS.find((d) => d.key === active)!;
  const panelRef = useRef<HTMLDivElement>(null);

  // Keyboard: arrow keys move between situations when the list is focused.
  const onKey = (e: React.KeyboardEvent) => {
    const i = DOORS.findIndex((d) => d.key === active);
    if (e.key === "ArrowDown" || e.key === "ArrowRight") { e.preventDefault(); setActive(DOORS[(i + 1) % DOORS.length].key); }
    if (e.key === "ArrowUp" || e.key === "ArrowLeft") { e.preventDefault(); setActive(DOORS[(i - 1 + DOORS.length) % DOORS.length].key); }
  };
  useEffect(() => { panelRef.current?.querySelector<HTMLElement>("a")?.blur(); }, [active]);

  return (
    <section id="situations" className="py-24 sm:py-28 lg:py-32 bg-background relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_40%_at_50%_0%,rgba(196,138,100,0.05),transparent_70%)]" />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header — centred, like every other section header on the page */}
        <motion.div
          initial={{ opacity: 0.95, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.28 }}
          className="text-center max-w-2xl mx-auto mb-12 lg:mb-16"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary/80 mb-5">Three situations. Three ways in.</p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground tracking-tight leading-[1.08]">
            Which one is you?
          </h2>
          <p className="mt-5 text-lg text-muted-foreground leading-[1.6] font-light">
            Pick the one that sounds like this week. Each has one engagement, one price, and one piece of proof — and in every one, the decision comes before the code.
          </p>
        </motion.div>

        {/* Desktop: selector + panel */}
        <div className="hidden lg:grid grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] gap-10 xl:gap-14 items-start rounded-3xl border border-border/50 bg-card/10 p-8 xl:p-10 ring-1 ring-inset ring-white/[0.02]">
          <div role="tablist" aria-label="Your situation" onKeyDown={onKey} className="flex flex-col gap-2">
            {DOORS.map((d, i) => {
              const selected = d.key === active;
              return (
                <button
                  key={d.key}
                  role="tab"
                  aria-selected={selected}
                  aria-controls={`situation-panel-${d.key}`}
                  id={`situation-tab-${d.key}`}
                  tabIndex={selected ? 0 : -1}
                  onMouseEnter={() => setActive(d.key)}
                  onFocus={() => setActive(d.key)}
                  onClick={() => setActive(d.key)}
                  className={`group relative text-left rounded-2xl px-6 py-5 transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 ${
                    selected ? "bg-primary/[0.07]" : "hover:bg-white/[0.025]"
                  }`}
                >
                  {selected && (
                    <motion.span
                      layoutId="situation-rail"
                      className="absolute left-0 top-4 bottom-4 w-[3px] rounded-full bg-primary"
                      transition={shouldReduceMotion ? { duration: 0 } : { type: "spring", stiffness: 380, damping: 34 }}
                    />
                  )}
                  <span className="flex items-center gap-3 mb-2">
                    <span className={`font-mono text-[11px] font-semibold tracking-[0.18em] ${selected ? "text-primary" : "text-muted-foreground/50"}`}>{d.tag}</span>
                    <span className="font-mono text-[11px] text-muted-foreground/35">0{i + 1}</span>
                  </span>
                  <span className={`block text-xl xl:text-[1.45rem] font-semibold tracking-tight leading-[1.2] transition-colors duration-200 ${selected ? "text-foreground" : "text-muted-foreground/70 group-hover:text-foreground/90"}`}>
                    {d.statement}
                  </span>
                </button>
              );
            })}
            <p className="px-6 pt-4 text-xs text-muted-foreground/60 leading-relaxed">
              None of these?{" "}
              <Link to="/contact" className="text-foreground/80 hover:text-primary underline-offset-2 hover:underline">
                Say what's happening
              </Link>{" "}
              and we'll tell you which fits — or that none does.
            </p>
          </div>

          <div ref={panelRef} className="min-h-[420px] border-l border-border/40 pl-10 xl:pl-14">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={current.key}
                id={`situation-panel-${current.key}`}
                role="tabpanel"
                aria-labelledby={`situation-tab-${current.key}`}
                initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: -6 }}
                transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="flex items-center gap-3 mb-5">
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-primary/20 bg-primary/[0.08] text-primary">
                    <current.icon size={16} />
                  </span>
                  <h3 className="text-2xl font-bold tracking-tight text-foreground">{current.statement}</h3>
                </div>
                <Panel d={current} />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Mobile / tablet: expandable rows */}
        <div className="lg:hidden rounded-2xl border border-border/50 bg-card/10 divide-y divide-border/40">
          {DOORS.map((d) => {
            const open = openMobile === d.key;
            return (
              <div key={d.key} className="px-5 sm:px-6">
                <button
                  type="button"
                  aria-expanded={open}
                  aria-controls={`situation-row-${d.key}`}
                  onClick={() => setOpenMobile(open ? null : d.key)}
                  className="w-full text-left py-5 flex items-start gap-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 rounded-lg"
                >
                  <span className={`mt-1 font-mono text-[11px] font-semibold tracking-[0.18em] w-20 flex-shrink-0 ${open ? "text-primary" : "text-muted-foreground/50"}`}>{d.tag}</span>
                  <span className={`flex-1 text-lg font-semibold tracking-tight leading-snug ${open ? "text-foreground" : "text-foreground/80"}`}>{d.statement}</span>
                  <span className={`mt-1 text-muted-foreground/50 transition-transform duration-300 ${open ? "rotate-90 text-primary" : ""}`} aria-hidden="true">
                    <ArrowRight size={16} />
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {open && (
                    <motion.div
                      id={`situation-row-${d.key}`}
                      initial={shouldReduceMotion ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={shouldReduceMotion ? { height: 0, opacity: 0 } : { height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="pb-7 sm:pl-24">
                        <Panel d={d} compact />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Capability layer — what executes the three. Each discipline is tied
            to a shipped case so depth is shown, not asserted. */}
        <motion.div
          initial={{ opacity: 0.95, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.28 }}
          id="capabilities"
          className="scroll-mt-24 mt-20 lg:mt-24 grid lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] gap-10 lg:gap-16 items-start"
        >
          <div className="lg:sticky lg:top-28">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary/80 mb-5">What we can execute</p>
            <h3 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight leading-[1.12] mb-4">
              Five disciplines.
              <span className="block text-muted-foreground/50">One team, start to launch.</span>
            </h3>
            <p className="text-base text-muted-foreground leading-relaxed mb-6">
              Starting small is a way in, not the size of the company. Every discipline below has shipped under its own name — and the people who decided the scope are the people who built it.
            </p>
            <Link to="/services" className="group inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary/80 transition-colors">
              All five services, in depth
              <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform duration-200" />
            </Link>
          </div>
          <ul className="divide-y divide-border/40 border-y border-border/40">
            {CAPABILITIES.map(({ s, proof, href, price }) => (
              <li key={s.slug} className="group relative grid sm:grid-cols-[minmax(0,1fr)_auto] gap-x-8 gap-y-2 items-baseline py-6 transition-all duration-300 hover:pl-2">
                <div className="min-w-0">
                  <Link to={`/services/${s.slug}`} className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 rounded">
                    <span className="block text-xl sm:text-2xl font-semibold tracking-tight text-foreground group-hover:text-primary transition-colors duration-200">
                      {s.title}
                    </span>
                    <span className="block text-sm text-muted-foreground mt-1.5 leading-relaxed">{s.subtitle}</span>
                  </Link>
                  <span className="block text-xs text-muted-foreground/60 mt-2">
                    Shipped for{" "}
                    <Link to={href} className="relative z-10 text-foreground/70 hover:text-primary underline-offset-2 hover:underline">
                      {proof}
                    </Link>
                  </span>
                </div>
                <Link to={`/services/${s.slug}`} tabIndex={-1} aria-hidden="true" className="text-sm font-medium text-foreground/80 whitespace-nowrap inline-flex items-center gap-2 sm:justify-self-end">
                  {price ?? s.price}
                  <ArrowRight size={13} className="text-primary/70 group-hover:translate-x-0.5 transition-transform duration-200" />
                </Link>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesPreview;
