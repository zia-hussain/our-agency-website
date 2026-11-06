import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Wrench, Rocket, Workflow } from "lucide-react";
import { motion } from "framer-motion";
import { services, rescueService } from "../../data/services";
import { OFFERS, offerHref } from "../../config/offers";
import { trackOfferSelect, trackCTAClick } from "../../utils/analytics";

/**
 * One hierarchy, stated once.
 *
 * Primary: the three situations a buyer arrives in — BUILD / FIX / AUTOMATE —
 * each written in the buyer's own words, each leading to one engagement with
 * a stated price and one piece of proof. Secondary, beneath: the capability
 * layer that executes them (the five services), as a quiet list, not a
 * second set of cards competing with the first.
 *
 * Replaces the previous "Three services. Real starting prices." bento (three
 * cards that merged web and mobile under one price) and its separate offer
 * router. The paid bounded steps are reached through the doors, not shown
 * here as products.
 */
const DOORS = [
  {
    door: "FIX",
    icon: Wrench,
    heading: "A product already exists.",
    voice: "“Three developers have looked at it. I’ve had three different answers.”",
    what: "Before another fix or a rebuild, we find out — from the product's own evidence — what to keep, what to fix and what to replace. Then we do the work that's actually warranted.",
    engagement: `${OFFERS["product-rescue"].name} · $${OFFERS["product-rescue"].price} · then the work`,
    proof: "Fast Track USA — two years with a previous team, live three weeks after we took over, by the founder's account.",
    proofHref: "/portfolio/fast-track-usa-app-rescue",
    cta: { label: "Show us where you're stuck", href: offerHref("product-rescue", "homepage-door"), offer: "product-rescue" as const },
    secondary: { label: "Not ready to pay? Four free questions", href: "/rescue-or-rebuild" },
    emphasis: true,
  },
  {
    door: "BUILD",
    icon: Rocket,
    heading: "Nothing is built yet.",
    voice: "“I know what the product should become. I don’t know what belongs in the first version.”",
    what: "We decide what V1 has to prove — in writing, in week one — then build that: accounts, payments, the core flow and the admin it needs. The rest waits until the product has earned it.",
    engagement: "SaaS & product development · from $4,800 · scope decided in week one",
    proof: "Knipsr — built from the ground up to a launch-ready SaaS; the founder's words are on Trustpilot.",
    proofHref: "/portfolio/knipsr-event-media-saas",
    cta: { label: "Tell us what you're building", href: "/services/saas-mvp-development", offer: null },
    secondary: { label: "Want the V1 decision on its own first?", href: "/services/saas-mvp-development#v1-brief" },
  },
  {
    door: "AUTOMATE",
    icon: Workflow,
    heading: "A workflow runs by hand.",
    voice: "“The process works because people remember what to do. That’s the problem.”",
    what: "We map the manual steps, build the one that costs your team the most, and leave it running — with failures flagged to a person, not lost. Then we decide together if there's a second.",
    engagement: "AI Automation & Workflows · from $2,500 · one bounded workflow",
    proof: "Floating Stone Ranch — paper and spreadsheets to one traceable system; eight months on, still a client.",
    proofHref: "/portfolio/floating-stone-ranch-processor-intake-engine",
    cta: { label: "Show us the workflow", href: "/services/ai-automation-solutions#start-small", offer: null },
    secondary: { label: "Spans several teams? Start with a plan", href: offerHref("manual-to-system", "homepage-door") },
  },
];

const CAPABILITIES = [...services, rescueService].map((s) => ({
  slug: s.slug,
  title: s.title,
  line: s.subtitle,
  price: s.price,
}));

const ServicesPreview: React.FC = () => (
  <section id="situations" className="py-24 sm:py-28 bg-background relative overflow-hidden">
    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_40%_at_50%_0%,rgba(196,138,100,0.05),transparent_70%)]" />
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <motion.div
        initial={{ opacity: 0.95, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.28 }}
        className="max-w-3xl mb-14 lg:mb-16"
      >
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary/80 mb-5">Where you are decides where we start</p>
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground tracking-tight leading-[1.08]">
          Three situations.
          <span className="block text-muted-foreground/50">One way of deciding.</span>
        </h2>
        <p className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-2xl leading-[1.6] font-light">
          Pick the one that sounds like this week. Each leads to one engagement with a stated price — and the decision is made before the code is.
        </p>
      </motion.div>

      {/* The three doors */}
      <div className="grid lg:grid-cols-3 gap-5 lg:gap-6">
        {DOORS.map((d, index) => (
          <motion.article
            key={d.door}
            initial={{ opacity: 0.95, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: index * 0.08 }}
            className={`group relative flex flex-col rounded-2xl border p-7 sm:p-8 transition-all duration-300 ring-1 ring-inset ring-white/[0.02] hover:shadow-[0_30px_70px_-30px_rgba(0,0,0,0.6)] ${
              d.emphasis
                ? "border-primary/35 bg-gradient-to-b from-primary/[0.09] via-card/20 to-transparent hover:border-primary/50"
                : "border-border/60 bg-card/20 hover:border-primary/30 hover:bg-card/35"
            }`}
          >
            <div className="flex items-center justify-between mb-7">
              <span className="flex items-center gap-2.5">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-primary/20 bg-primary/[0.08] text-primary">
                  <d.icon size={16} />
                </span>
                <span className="font-mono text-[11px] font-semibold tracking-[0.18em] text-primary/80">{d.door}</span>
              </span>
              <span className="font-mono text-[11px] text-muted-foreground/40">0{index + 1}</span>
            </div>

            <h3 className="text-2xl sm:text-[1.7rem] font-bold tracking-tight text-foreground leading-[1.15] mb-4">{d.heading}</h3>
            <p className="text-[15px] italic text-foreground/70 leading-snug mb-6 border-l border-primary/30 pl-4">{d.voice}</p>
            <p className="text-sm text-muted-foreground leading-relaxed mb-7">{d.what}</p>

            <dl className="space-y-4 border-t border-border/40 pt-6 mb-8">
              <div>
                <dt className="text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground/50 mb-1">The engagement</dt>
                <dd className="text-sm font-semibold text-foreground leading-snug">{d.engagement}</dd>
              </div>
              <div>
                <dt className="text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground/50 mb-1">One piece of proof</dt>
                <dd className="text-sm text-muted-foreground leading-snug">
                  <Link to={d.proofHref} className="hover:text-foreground transition-colors underline-offset-4 hover:underline">
                    {d.proof}
                  </Link>
                </dd>
              </div>
            </dl>

            <div className="mt-auto">
              <Link
                to={d.cta.href}
                onClick={() => (d.cta.offer ? trackOfferSelect(d.cta.offer) : trackCTAClick(`door-${d.door.toLowerCase()}`, "homepage"))}
                className={`btn-sheen group/cta inline-flex items-center gap-3 rounded-full pl-6 pr-2 py-2.5 text-sm font-semibold transition-colors duration-200 ${
                  d.emphasis
                    ? "bg-gradient-to-b from-primary to-primary/[0.92] text-primary-foreground"
                    : "border border-primary/40 bg-primary/[0.08] text-foreground hover:bg-primary/[0.14]"
                }`}
              >
                {d.cta.label}
                <span className={`flex items-center justify-center w-7 h-7 rounded-full ${d.emphasis ? "bg-black/10" : "bg-primary/15 text-primary"}`}>
                  <ArrowRight size={13} strokeWidth={2.5} className="group-hover/cta:translate-x-[1.5px] transition-transform duration-200" />
                </span>
              </Link>
              <p className="mt-4 text-xs text-muted-foreground/70">
                <Link to={d.secondary.href} className="hover:text-primary transition-colors underline-offset-2 hover:underline">
                  {d.secondary.label} →
                </Link>
              </p>
            </div>
          </motion.article>
        ))}
      </div>

      {/* Capability layer — what executes the doors. Quiet on purpose. */}
      <motion.div
        initial={{ opacity: 0.95, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.28 }}
        className="mt-16 lg:mt-20"
      >
        <div className="flex flex-wrap items-end justify-between gap-4 mb-5">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground/60">What we can execute</p>
          <Link to="/services" className="group inline-flex items-center gap-1.5 text-sm font-medium text-primary/90 hover:text-primary transition-colors">
            All five services, in depth
            <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform duration-200" />
          </Link>
        </div>
        <ul className="rounded-2xl border border-border/50 bg-card/10 divide-y divide-border/40">
          {CAPABILITIES.map((c) => (
            <li key={c.slug}>
              <Link
                to={`/services/${c.slug}`}
                className="group grid sm:grid-cols-[minmax(0,15rem)_1fr_auto] items-center gap-1.5 sm:gap-6 px-5 sm:px-6 py-4 hover:bg-card/40 transition-colors duration-200"
              >
                <span className="font-semibold text-foreground group-hover:text-primary transition-colors">{c.title}</span>
                <span className="text-sm text-muted-foreground sm:truncate">{c.line}</span>
                <span className="text-sm font-medium text-foreground/80 sm:text-right whitespace-nowrap inline-flex items-center gap-2">
                  {c.price}
                  <ArrowRight size={12} className="text-primary/70 group-hover:translate-x-0.5 transition-transform duration-200" />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </motion.div>
    </div>
  </section>
);

export default ServicesPreview;
