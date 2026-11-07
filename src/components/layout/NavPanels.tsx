/* eslint-disable react-refresh/only-export-components -- data-driven panel set, no state to preserve across HMR */
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { services, rescueService } from "../../data/services";
import { articles } from "../../data/articles.js";
import { NAV_FEATURED_ORDER, pickInOrder } from "../../data/articleHierarchy";
import { getProjectBySlug } from "../../data/projects";
import { TESTIMONIAL_FILMS } from "../../data/testimonialFilms";
import { FACTS } from "../../config/facts";
import { trackOffersNavClick, trackOfferSelect } from "../../utils/analytics";
import NavVignette, { type VignetteKind } from "./NavVignettes";

// One instrument for all four menus: a list on the left, a stage on the
// right. Resting on an item changes the stage — a living miniature of the
// thing (a dashboard drawing its chart, a workflow with a pulse running
// through it, a triage board turning green), its one line, the fact that
// matters, and the action. The stage is itself the link. Everything renders
// on the server with the first item staged, so each page's markup carries
// these links.

export type PanelKey = "services" | "start" | "portfolio" | "articles";

const WIDTH = 940;
export const PANEL_WIDTH: Record<PanelKey, number> = { services: WIDTH, start: WIDTH, portfolio: WIDTH, articles: WIDTH };

type Item = {
  id: string;
  label: string;
  desc: string;
  to: string;
  onClick?: () => void;
  icon?: React.ComponentType<{ size?: number; strokeWidth?: number; className?: string }>;
  scene: VignetteKind;
  sceneSrc?: string;
  kicker: string;
  title: string;
  body: string;
  meta?: string;
  cta: string;
};

type PanelSpec = {
  eyebrow: string;
  items: Item[];
  notes?: { h: string; b: string }[];
  foot: { to: string; label: string; onClick?: () => void };
  footLeft: string;
  footCta: { to: string; label: string; onClick?: () => void };
};

/* ---------- data ---------- */

const SCENE_FOR_SERVICE: Record<string, VignetteKind> = {
  "web-application-development": "dashboard",
  "saas-mvp-development": "saas",
  "mobile-app-development": "mobile",
  "ai-automation-solutions": "automation",
};

const flagship = getProjectBySlug("fast-track-usa-app-rescue");
const knipsr = getProjectBySlug("knipsr-event-media-saas");
const fsr = getProjectBySlug("floating-stone-ranch-processor-intake-engine");
const josh = TESTIMONIAL_FILMS.josh;
const reema = TESTIMONIAL_FILMS.reema;

const SERVICES_SPEC: PanelSpec = {
  eyebrow: "What we build",
  items: [
    ...services.map((s) => ({
      id: s.slug,
      label: s.title,
      desc: s.subtitle,
      to: `/services/${s.slug}`,
      icon: s.icon,
      scene: SCENE_FOR_SERVICE[s.slug] ?? "dashboard",
      kicker: s.price,
      title: s.subtitle,
      body: s.description,
      meta: "Price published before the call",
      cta: "Explore the service",
    })),
    {
      id: rescueService.slug,
      label: rescueService.title,
      desc: "Already built and stuck? Assessment first.",
      to: `/services/${rescueService.slug}`,
      icon: rescueService.icon,
      scene: "rescue",
      kicker: "Assessment $750 · findings in 5 business days",
      title: "We read the code before anyone prices a fix.",
      body: "Written findings — what's broken, what's fragile, what's fine — then a stabilization plan priced from what we actually found.",
      meta: "Fast Track USA: two years stuck, launched three weeks after handover",
      cta: "See how a rescue starts",
    },
  ],
  foot: { to: "/services", label: "Compare all five, with prices" },
  footLeft: "Five services. Every price on the page — none after a discovery call.",
  footCta: { to: "/start", label: "Not sure which? Start here", onClick: trackOffersNavClick },
};

const door = (offer: string) => () => {
  trackOffersNavClick();
  trackOfferSelect(offer);
};

const START_SPEC: PanelSpec = {
  eyebrow: "Which one is you this week?",
  items: [
    {
      id: "fix",
      label: "I have a product and it's stuck",
      desc: "Assessment first — $750, five business days",
      to: "/product-rescue?from=nav",
      onClick: door("product-rescue"),
      scene: "rescue",
      kicker: "FIX · assessment first",
      title: "Find out what's actually wrong before paying to fix it.",
      body: "A $750 assessment reads the codebase, architecture, security and dependencies. Five business days later you hold written findings and a plan priced from them — and “don't” is an allowed answer.",
      meta: "Where every rescue starts",
      cta: "Show us where you're stuck",
    },
    {
      id: "build",
      label: "I have an idea and nothing built yet",
      desc: "A build conversation — V1 decided in writing if needed",
      to: "/contact?service=saas-mvp-development&situation=nothing-built",
      onClick: door("idea-to-build"),
      scene: "decision",
      kicker: "BUILD · talk, or decide V1 first",
      title: "Decide what the first version has to prove. Then build that.",
      body: "Tell us what you're building and we talk scope. If V1 isn't settled, the $950 Idea-to-Build Sprint decides it in writing in five business days — yours to build with us or anyone.",
      meta: "SaaS MVP from $4,800",
      cta: "Tell us what you're building",
    },
    {
      id: "automate",
      label: "My team still does this by hand",
      desc: "One workflow, built and live — direct",
      to: "/contact?service=ai-automation-solutions&situation=manual-workflow",
      onClick: door("manual-to-system"),
      scene: "automation",
      kicker: "AUTOMATE · one workflow, direct",
      title: "Get one workflow off your team's plate. Built, live, watched.",
      body: "Start with the workflow that hurts most. If it spans several teams or systems, the $750 Manual-to-System Sprint maps it first so the build lands in the right order.",
      meta: "Automation from $2,500",
      cta: "Show us the workflow",
    },
  ],
  notes: [
    { h: "A price before the call", b: "Every paid step is published, never quoted after a discovery meeting." },
    { h: "A written answer", b: "Findings, a V1 decision or a workflow plan — on paper, yours to keep." },
    { h: "“Don't” is an allowed answer", b: "If something shouldn't be built, the written answer says so." },
  ],
  foot: { to: "/start", label: "See all three in full", onClick: trackOffersNavClick },
  footLeft: "Zia or Omer reads every brief and replies within two business days.",
  footCta: { to: "/contact", label: "Prefer to just talk? Let's talk" },
};

const PORTFOLIO_SPEC: PanelSpec = {
  eyebrow: "Work we'd show first",
  items: [
    ...(flagship
      ? [
          {
            id: flagship.slug,
            label: "Fast Track USA",
            desc: "Product rescue · launched in three weeks",
            to: `/portfolio/${flagship.slug}`,
            scene: "film" as VignetteKind,
            sceneSrc: josh.poster,
            kicker: "Rescued · on film",
            title: flagship.title,
            body: flagship.testimonial?.quote ? `“${flagship.testimonial.quote}”` : flagship.description,
            meta: flagship.testimonial ? `${flagship.testimonial.author}, ${flagship.testimonial.role ?? ""}` : undefined,
            cta: "Read the case study",
          },
        ]
      : []),
    ...(knipsr
      ? [
          {
            id: knipsr.slug,
            label: "Knipsr",
            desc: "Event-media SaaS · built from zero",
            to: `/portfolio/${knipsr.slug}`,
            scene: "gallery" as VignetteKind,
            kicker: "Built from zero",
            title: knipsr.title,
            body: knipsr.description,
            meta: `${knipsr.client.name}${knipsr.client.country ? ` · ${knipsr.client.country}` : ""}`,
            cta: "Read the case study",
          },
        ]
      : []),
    ...(fsr
      ? [
          {
            id: fsr.slug,
            label: "Floating Stone Ranch",
            desc: "Processor intake · automated",
            to: `/portfolio/${fsr.slug}`,
            scene: "automation" as VignetteKind,
            kicker: "Automated",
            title: fsr.title,
            body: fsr.testimonial?.quote ? `“${fsr.testimonial.quote}”` : fsr.description,
            meta: fsr.testimonial ? `${fsr.testimonial.author}, ${fsr.testimonial.role ?? ""}` : `${fsr.client.name} · ${fsr.client.country ?? ""}`,
            cta: "Read the case study",
          },
        ]
      : []),
    {
      id: "films",
      label: "Clients on film",
      desc: "Four founders, in their own words",
      to: "/client-stories",
      scene: "film",
      sceneSrc: reema.poster,
      kicker: "Four films",
      title: reema.context,
      body: "Josh, Reema, Sarah and Krystof — four founders on what it was like to work with Zumetrix, in their own words, uncut.",
      meta: `${reema.name} · ${reema.role}`,
      cta: "Watch the films",
    },
  ],
  notes: [
    { h: "Every case says three things", b: "What was decided, what shipped, and what the client said." },
    { h: "Named only with permission", b: "Where a client asked us not to name them, we don't." },
  ],
  foot: { to: "/portfolio/all", label: "Every project" },
  footLeft: `${FACTS.counts.projectsShipped} projects · ${FACTS.counts.clients} clients · ${FACTS.counts.writtenReviews} written reviews on five platforms`,
  footCta: { to: "/portfolio", label: "Case studies" },
};

const SCENE_FOR_ARTICLE: Record<string, VignetteKind> = {
  "Product Rescue": "notes",
  "AI & Automation": "automation",
  SaaS: "decision",
  "Decision Room": "decision",
};

const FEATURED_ARTICLES = pickInOrder(articles, NAV_FEATURED_ORDER).slice(0, 4);
const ARTICLES_SPEC: PanelSpec = {
  eyebrow: "Decisions, written down",
  items: [
    ...FEATURED_ARTICLES.map((a) => ({
      id: a.slug,
      label: a.title,
      desc: `${a.category} · ${a.readTime}`,
      to: `/articles/${a.slug}`,
      scene: SCENE_FOR_ARTICLE[a.category] ?? ("notes" as VignetteKind),
      kicker: `${a.category} · ${a.readTime}`,
      title: a.title,
      body: a.excerpt,
      meta: `By ${a.author}`,
      cta: "Read the article",
    })),
    {
      id: "tool",
      label: "Rescue or rebuild? Free check",
      desc: "Four questions, no email, two minutes",
      to: "/rescue-or-rebuild",
      scene: "rescue",
      kicker: "Free tool · 2 minutes",
      title: "Rescue it, or rebuild it?",
      body: "Structural integrity, operational control, business reversibility, scope of the problem. Four honest answers — including “I don't know” — and a read on where your product stands.",
      meta: "No email. No score. The same first pass we run ourselves.",
      cta: "Run the free check",
    },
  ],
  foot: { to: "/articles", label: "All articles" },
  footLeft: "Written by Zia and Omer from real delivery work.",
  footCta: { to: "/start", label: "Which of these is you? Start here", onClick: trackOffersNavClick },
};

const SPECS: Record<PanelKey, PanelSpec> = { services: SERVICES_SPEC, start: START_SPEC, portfolio: PORTFOLIO_SPEC, articles: ARTICLES_SPEC };

/* ---------- the instrument ---------- */

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const ListStagePanel: React.FC<{ spec: PanelSpec; panelKey: PanelKey; live: boolean }> = ({ spec, panelKey, live }) => {
  const [active, setActive] = useState(0);
  const reduce = useReducedMotion();
  const item = spec.items[active] ?? spec.items[0];

  const onKey = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key !== "ArrowDown" && e.key !== "ArrowUp") return;
    e.preventDefault();
    const next = (active + (e.key === "ArrowDown" ? 1 : -1) + spec.items.length) % spec.items.length;
    setActive(next);
    e.currentTarget.querySelectorAll<HTMLAnchorElement>("a[data-item]")[next]?.focus();
  };

  return (
    <div className="grid grid-cols-[348px_1fr]">
      {/* list */}
      <div className="flex flex-col p-5 pr-0">
        <p className="px-4 pb-3 pt-1 text-[10.5px] font-semibold uppercase tracking-[0.2em] text-primary/75">{spec.eyebrow}</p>
        <div className="relative flex flex-col gap-0.5" onKeyDown={onKey}>
          {spec.items.map((it, i) => {
            const on = i === active;
            return (
              <Link
                key={it.id}
                to={it.to}
                data-item
                onClick={it.onClick}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                className={`group relative flex items-center gap-3.5 rounded-xl py-3 pl-4 pr-3 transition-colors duration-200 focus:outline-none ${on ? "bg-white/[0.05]" : "hover:bg-white/[0.03]"}`}
              >
                {on && (
                  <motion.span
                    layoutId={`nav-stage-mark-${panelKey}`}
                    transition={{ type: "spring", stiffness: 500, damping: 40 }}
                    className="absolute bottom-3 left-0 top-3 w-[2px] rounded-full bg-primary"
                  />
                )}
                {it.icon && (
                  <span className={`flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-[11px] border transition-colors duration-200 ${on ? "border-primary/40 bg-primary/[0.12] text-primary" : "border-white/[0.07] bg-white/[0.02] text-muted-foreground/70"}`}>
                    <it.icon size={16} strokeWidth={1.9} />
                  </span>
                )}
                <span className="min-w-0 flex-1">
                  <span className={`line-clamp-2 text-[14.5px] font-semibold leading-snug transition-colors duration-200 ${on ? "text-foreground" : "text-foreground/80"}`}>{it.label}</span>
                  <span className="mt-0.5 block truncate text-[12px] text-muted-foreground/65">{it.desc}</span>
                </span>
                <ArrowRight size={14} strokeWidth={2.5} className={`flex-shrink-0 text-primary transition-all duration-200 ${on ? "translate-x-0 opacity-100" : "-translate-x-1 opacity-0"}`} />
              </Link>
            );
          })}
        </div>
        {spec.notes && (
          <ul className="mt-5 flex flex-col gap-3 border-t border-white/[0.06] px-4 pt-5">
            {spec.notes.map((n) => (
              <li key={n.h} className="flex gap-3">
                <span className="mt-[7px] h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary/80" />
                <span>
                  <span className="block text-[13px] font-semibold leading-snug text-foreground/90">{n.h}</span>
                  <span className="mt-0.5 block text-[12px] leading-snug text-muted-foreground/65">{n.b}</span>
                </span>
              </li>
            ))}
          </ul>
        )}
        <div className="mt-auto px-4 pt-5">
          <Link to={spec.foot.to} onClick={spec.foot.onClick} className="group inline-flex items-center gap-1.5 text-[12.5px] font-medium text-muted-foreground/75 transition-colors duration-200 hover:text-foreground">
            {spec.foot.label}
            <ArrowRight size={11} strokeWidth={2.5} className="transition-transform duration-200 group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>

      {/* stage */}
      <Link
        to={item.to}
        onClick={item.onClick}
        aria-label={`${item.cta}: ${item.title}`}
        className="group/stage m-5 flex flex-col overflow-hidden rounded-[22px] border border-white/[0.08] bg-[#0B0A09] shadow-[0_30px_70px_-30px_rgba(0,0,0,0.9),inset_0_1px_0_rgba(255,255,255,0.05)] focus:outline-none focus-visible:ring-1 focus-visible:ring-primary/50"
      >
        <span className="relative block min-h-[300px] flex-1 overflow-hidden">
          <AnimatePresence initial={false} mode="popLayout">
            <motion.span
              key={item.id}
              initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 1.03 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: reduce ? 0 : 0.4, ease: EASE }}
              className="absolute inset-0 block"
            >
              {/* Scenes only run while this panel is the open one — four
                  panels of perpetual motion behind a closed menu would tax a
                  low-end phone for nothing. */}
              <NavVignette kind={item.scene} src={item.sceneSrc} live={live} />
            </motion.span>
          </AnimatePresence>
          <AnimatePresence initial={false} mode="wait">
            <motion.span
              key={`${item.id}-k`}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute bottom-3.5 left-4 inline-flex max-w-[85%] items-center gap-1.5 rounded-full border border-white/10 bg-black/50 px-2.5 py-1 text-[10.5px] font-semibold uppercase tracking-[0.14em] text-white/90 backdrop-blur"
            >
              <span className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
              <span className="truncate">{item.kicker}</span>
            </motion.span>
          </AnimatePresence>
        </span>
        <AnimatePresence initial={false} mode="wait">
          <motion.span
            key={`${item.id}-t`}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: reduce ? 0 : 0.22, ease: "easeOut" }}
            className="flex flex-col px-5 pb-5 pt-4"
          >
            <span className="block text-[16.5px] font-semibold leading-snug tracking-tight text-foreground [text-wrap:balance]">{item.title}</span>
            <span className="mt-2 line-clamp-2 text-[13px] leading-[1.55] text-muted-foreground/80">{item.body}</span>
            <span className="mt-4 flex items-end justify-between gap-4 border-t border-white/[0.06] pt-3.5">
              <span className="line-clamp-2 text-[11.5px] leading-snug text-muted-foreground/60">{item.meta}</span>
              <span className="inline-flex flex-shrink-0 items-center gap-1.5 text-[13px] font-semibold text-primary">
                {item.cta}
                <ArrowUpRight size={14} strokeWidth={2.5} className="transition-transform duration-200 group-hover/stage:translate-x-0.5 group-hover/stage:-translate-y-0.5" />
              </span>
            </span>
          </motion.span>
        </AnimatePresence>
      </Link>

      <div className="col-span-2 flex items-center justify-between border-t border-white/[0.06] px-6 py-3.5">
        <span className="text-[11.5px] text-muted-foreground/55">{spec.footLeft}</span>
        <Link
          to={spec.footCta.to}
          onClick={spec.footCta.onClick}
          className="group inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/[0.07] px-3.5 py-1.5 text-[12.5px] font-semibold text-primary transition-colors duration-200 hover:bg-primary/[0.15]"
        >
          {spec.footCta.label}
          <ArrowRight size={12} strokeWidth={2.5} className="transition-transform duration-200 group-hover:translate-x-0.5" />
        </Link>
      </div>
    </div>
  );
};

export const PANELS: Record<PanelKey, React.FC<{ live?: boolean }>> = {
  services: ({ live = false }) => <ListStagePanel spec={SPECS.services} panelKey="services" live={live} />,
  start: ({ live = false }) => <ListStagePanel spec={SPECS.start} panelKey="start" live={live} />,
  portfolio: ({ live = false }) => <ListStagePanel spec={SPECS.portfolio} panelKey="portfolio" live={live} />,
  articles: ({ live = false }) => <ListStagePanel spec={SPECS.articles} panelKey="articles" live={live} />,
};
