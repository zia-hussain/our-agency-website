/* eslint-disable react-refresh/only-export-components -- data-driven panel set, no state to preserve across HMR */
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ArrowUpRight, Play } from "lucide-react";
import { services, rescueService } from "../../data/services";
import { articles } from "../../data/articles.js";
import { NAV_FEATURED_ORDER, pickInOrder } from "../../data/articleHierarchy";
import { getProjectBySlug } from "../../data/projects";
import { PROJECT_COVERS, ARTICLE_COVERS, coverForArticle, listingImageForProject, type Cover } from "../../data/covers";
import { TESTIMONIAL_FILMS } from "../../data/testimonialFilms";
import { FACTS } from "../../config/facts";
import { trackOffersNavClick, trackOfferSelect } from "../../utils/analytics";

// Every panel is the same instrument: a list on the left, a stage on the
// right. Resting on a list item changes the stage — its picture, its one
// line, its price or record — so the menu is something you read with the
// pointer, not a wall of links. The stage is itself a link, so the picture
// a visitor is looking at is the thing they click. All of it renders on the
// server (first item staged), so every page's markup carries these links.

export type PanelKey = "services" | "start" | "portfolio" | "articles";

const WIDTH = 930;
export const PANEL_WIDTH: Record<PanelKey, number> = { services: WIDTH, start: WIDTH, portfolio: WIDTH, articles: WIDTH };

type Stage = {
  image: Pick<Cover, "src" | "width" | "height"> & { alt: string; fit?: "cover" | "contain" };
  kicker: string;
  title: string;
  body: string;
  meta?: string;
  cta: string;
  film?: boolean;
};

type Item = {
  id: string;
  label: string;
  desc: string;
  to: string;
  onClick?: () => void;
  stage: Stage;
  icon?: React.ComponentType<{ size?: number; strokeWidth?: number; className?: string }>;
};

type PanelSpec = {
  eyebrow: string;
  aside?: string;
  /** Short facts under a short list, so the column never sits empty beside the stage. */
  notes?: { h: string; b: string }[];
  items: Item[];
  foot: { to: string; label: string; onClick?: () => void };
  footCta: { to: string; label: string; onClick?: () => void };
};

/* ---------- data ---------- */

const SERVICE_COVER: Record<string, keyof typeof PROJECT_COVERS> = {
  "web-application-development": "web-application",
  "saas-mvp-development": "saas-product",
  "mobile-app-development": "mobile-application",
  "ai-automation-solutions": "automation",
  "product-rescue-stabilization": "product-rescue",
};

const flagship = getProjectBySlug("fast-track-usa-app-rescue");
const knipsr = getProjectBySlug("knipsr-event-media-saas");
const fsr = getProjectBySlug("floating-stone-ranch-processor-intake-engine");
const josh = TESTIMONIAL_FILMS.josh;

const coverStage = (c: Cover, alt: string, fit: "cover" | "contain" = "cover") => ({ src: c.src, width: c.width, height: c.height, alt, fit });

const SERVICES_SPEC: PanelSpec = {
  eyebrow: "What we build",
  items: [
    ...services.map((s) => ({
      id: s.slug,
      label: s.title,
      desc: s.subtitle,
      to: `/services/${s.slug}`,
      icon: s.icon,
      stage: {
        image: coverStage(PROJECT_COVERS[SERVICE_COVER[s.slug]], `${s.title} — ${PROJECT_COVERS[SERVICE_COVER[s.slug]].alt}`),
        kicker: s.price,
        title: s.title,
        body: s.description,
        meta: "Price published before the call",
        cta: "Explore the service",
      },
    })),
    {
      id: rescueService.slug,
      label: rescueService.title,
      desc: "Already built and stuck? Assessment first, $750.",
      to: `/services/${rescueService.slug}`,
      icon: rescueService.icon,
      stage: {
        image: flagship
          ? coverStage(listingImageForProject(flagship), `${flagship.title} — recovery timeline`, "contain")
          : coverStage(PROJECT_COVERS["product-rescue"], rescueService.title),
        kicker: "Assessment $750 · findings in 5 business days",
        title: rescueService.title,
        body: "We read the code before anyone prices a fix. Findings in writing: what's broken, what's fragile, what's fine — then a plan priced from that.",
        meta: "Fast Track USA: two years stuck, launched three weeks after handover",
        cta: "See how a rescue starts",
      },
    },
  ],
  foot: { to: "/services", label: "Compare all five, with prices" },
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
      stage: {
        image: flagship ? coverStage(listingImageForProject(flagship), "Fast Track USA recovery timeline", "contain") : coverStage(PROJECT_COVERS["product-rescue"], "Product rescue"),
        kicker: "FIX · assessment first",
        title: "Find out what's actually wrong before paying to fix it.",
        body: "A $750 assessment reads the codebase, architecture, security and dependencies. Five business days later you hold written findings and a plan priced from them — and “don't” is an allowed answer.",
        meta: "Where every rescue starts",
        cta: "Show us where you're stuck",
      },
    },
    {
      id: "build",
      label: "I have an idea and nothing built yet",
      desc: "A build conversation — V1 decided in writing first if needed",
      to: "/contact?service=saas-mvp-development&situation=nothing-built",
      onClick: door("idea-to-build"),
      stage: {
        image: knipsr ? coverStage(listingImageForProject(knipsr), `${knipsr.title} — case study cover`) : coverStage(PROJECT_COVERS["saas-product"], "SaaS build"),
        kicker: "BUILD · talk, or decide V1 first",
        title: "Decide what the first version has to prove. Then build that.",
        body: "Tell us what you're building and we talk scope. If V1 isn't settled, the $950 Idea-to-Build Sprint decides it in writing in five business days — yours to build with us or anyone.",
        meta: "SaaS MVP from $4,800",
        cta: "Tell us what you're building",
      },
    },
    {
      id: "automate",
      label: "My team still does this by hand",
      desc: "One workflow, built and live — direct",
      to: "/contact?service=ai-automation-solutions&situation=manual-workflow",
      onClick: door("manual-to-system"),
      stage: {
        image: fsr ? coverStage(listingImageForProject(fsr), `${fsr.title} — case study cover`) : coverStage(PROJECT_COVERS.automation, "Automation"),
        kicker: "AUTOMATE · one workflow, direct",
        title: "Get one workflow off your team's plate. Built, live, watched.",
        body: "Start with the workflow that hurts most. If it spans several teams or systems, the $750 Manual-to-System Sprint maps it first so the build lands in the right order.",
        meta: "Automation from $2,500",
        cta: "Show us the workflow",
      },
    },
  ],
  notes: [
    { h: "A price before the call", b: "Every paid step is published, never quoted after a discovery meeting." },
    { h: "A written answer", b: "Findings, a V1 decision or a workflow plan — on paper, yours to keep." },
    { h: "“Don't” is an allowed answer", b: "If something shouldn't be built, the written answer says so." },
  ],
  foot: { to: "/start", label: "See all three in full", onClick: trackOffersNavClick },
  footCta: { to: "/contact", label: "Prefer to just talk? Let's talk" },
};

const PORTFOLIO_SPEC: PanelSpec = {
  eyebrow: "Work we'd show first",
  aside: `${FACTS.counts.projectsShipped} projects · ${FACTS.counts.clients} clients · ${FACTS.counts.writtenReviews} written reviews`,
  items: [
    ...[
      { p: flagship, kicker: "Rescued" },
      { p: knipsr, kicker: "Built from zero" },
      { p: fsr, kicker: "Automated" },
    ]
      .filter((x) => x.p)
      .map(({ p, kicker }) => {
        const project = p!;
        const cover = listingImageForProject(project);
        return {
          id: project.slug,
          label: project.client.name.split(" — ").pop() || project.client.name,
          desc: project.category,
          to: `/portfolio/${project.slug}`,
          stage: {
            image: coverStage(cover, `${project.title} — case study cover`, project.heroImageFit === "contain" ? "contain" : "cover"),
            kicker,
            title: project.title,
            body: project.testimonial?.quote ? `“${project.testimonial.quote}”` : project.description,
            meta: project.testimonial ? `${project.testimonial.author}${project.testimonial.role ? `, ${project.testimonial.role}` : ""}` : `${project.client.name} · ${project.client.country ?? ""}`,
            cta: "Read the case study",
          },
        } as Item;
      }),
    {
      id: "films",
      label: "Clients on film",
      desc: "Four founders, in their own words",
      to: "/client-stories",
      stage: {
        image: { src: josh.poster, width: 1080, height: 608, alt: "Josh Nyce on film about working with Zumetrix Labs" },
        kicker: "On film · 1:26",
        title: josh.context,
        body: flagship?.testimonial?.quote ? `“${flagship.testimonial.quote}”` : "",
        meta: `${josh.name} · ${josh.role}`,
        cta: "Watch the films",
        film: true,
      },
    },
  ],
  notes: [
    { h: "Every case says three things", b: "What was decided, what shipped, and what the client said." },
    { h: "Named only with permission", b: "Where a client asked us not to name them, we don't." },
  ],
  foot: { to: "/portfolio/all", label: "Every project" },
  footCta: { to: "/portfolio", label: "Case studies" },
};

const FEATURED_ARTICLES = pickInOrder(articles, NAV_FEATURED_ORDER).slice(0, 4);
const ARTICLES_SPEC: PanelSpec = {
  eyebrow: "Decisions, written down",
  items: [
    ...FEATURED_ARTICLES.map((a) => {
      const cover = coverForArticle(a);
      return {
        id: a.slug,
        label: a.title,
        desc: `${a.category} · ${a.readTime}`,
        to: `/articles/${a.slug}`,
        stage: {
          image: coverStage(cover, `${a.title} — article cover`),
          kicker: `${a.category} · ${a.readTime}`,
          title: a.title,
          body: a.excerpt,
          meta: `By ${a.author}`,
          cta: "Read the article",
        },
      } as Item;
    }),
    {
      id: "tool",
      label: "Rescue or rebuild? Free check",
      desc: "Four questions, no email, two minutes",
      to: "/rescue-or-rebuild",
      stage: {
        image: coverStage(ARTICLE_COVERS["repair-or-rebuild"], "Rescue or rebuild — free check"),
        kicker: "Free tool · 2 minutes",
        title: "Rescue it, or rebuild it?",
        body: "Structural integrity, operational control, business reversibility, scope of the problem. Four honest answers — including “I don't know” — and a read on where your product stands.",
        meta: "No email. No score. The same first pass we run ourselves.",
        cta: "Run the free check",
      },
    },
  ],
  foot: { to: "/articles", label: "All articles" },
  footCta: { to: "/start", label: "Which of these is you? Start here", onClick: trackOffersNavClick },
};

const SPECS: Record<PanelKey, PanelSpec> = { services: SERVICES_SPEC, start: START_SPEC, portfolio: PORTFOLIO_SPEC, articles: ARTICLES_SPEC };

/* ---------- the instrument ---------- */

const ListStagePanel: React.FC<{ spec: PanelSpec; panelKey: PanelKey }> = ({ spec, panelKey }) => {
  const [active, setActive] = useState(0);
  const reduce = useReducedMotion();
  const item = spec.items[active] ?? spec.items[0];
  const stage = item.stage;

  const onKey = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key !== "ArrowDown" && e.key !== "ArrowUp") return;
    e.preventDefault();
    const next = (active + (e.key === "ArrowDown" ? 1 : -1) + spec.items.length) % spec.items.length;
    setActive(next);
    const el = e.currentTarget.querySelectorAll<HTMLAnchorElement>("a[data-item]")[next];
    el?.focus();
  };

  return (
    <div className="grid grid-cols-[352px_1fr]">
      {/* list */}
      <div className="flex flex-col p-4 pr-0">
        <div className="flex items-baseline justify-between px-4 pb-3 pt-2">
          <p className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-primary/75">{spec.eyebrow}</p>
        </div>
        <div className="relative flex flex-col gap-0.5" onKeyDown={onKey} role="list">
          {spec.items.map((it, i) => {
            const on = i === active;
            return (
              <Link
                key={it.id}
                to={it.to}
                data-item
                role="listitem"
                onClick={it.onClick}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                className={`group relative flex items-center gap-3.5 rounded-xl py-3 pl-4 pr-3 transition-colors duration-200 focus:outline-none ${
                  on ? "bg-white/[0.05]" : "hover:bg-white/[0.03]"
                }`}
              >
                {on && (
                  <motion.span
                    layoutId={`nav-stage-mark-${panelKey}`}
                    transition={{ type: "spring", stiffness: 500, damping: 40 }}
                    className="absolute left-0 top-3 bottom-3 w-[2px] rounded-full bg-primary"
                  />
                )}
                {it.icon && (
                  <span
                    className={`flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-[11px] border transition-colors duration-200 ${
                      on ? "border-primary/40 bg-primary/[0.12] text-primary" : "border-white/[0.07] bg-white/[0.02] text-muted-foreground/70"
                    }`}
                  >
                    <it.icon size={16} strokeWidth={1.9} />
                  </span>
                )}
                <span className="min-w-0 flex-1">
                  <span className={`line-clamp-2 text-[14.5px] font-semibold leading-snug transition-colors duration-200 ${on ? "text-foreground" : "text-foreground/80"}`}>{it.label}</span>
                  <span className="mt-0.5 block truncate text-[12px] text-muted-foreground/65">{it.desc}</span>
                </span>
                <ArrowRight
                  size={14}
                  strokeWidth={2.5}
                  className={`flex-shrink-0 text-primary transition-all duration-200 ${on ? "translate-x-0 opacity-100" : "-translate-x-1 opacity-0"}`}
                />
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
        <div className="mt-auto flex items-center justify-between gap-3 px-4 pt-5">
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
        aria-label={`${stage.cta}: ${stage.title}`}
        className="group/stage m-4 flex flex-col overflow-hidden rounded-[22px] border border-white/[0.07] bg-[#0B0A09] shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] focus:outline-none focus-visible:ring-1 focus-visible:ring-primary/50"
      >
        <span className="relative block aspect-[16/9] overflow-hidden bg-background">
          <AnimatePresence initial={false} mode="popLayout">
            <motion.img
              key={item.id}
              src={stage.image.src}
              alt={stage.image.alt}
              width={stage.image.width}
              height={stage.image.height}
              loading="lazy"
              decoding="async"
              initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 1.06 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: reduce ? 0 : 0.45, ease: [0.22, 1, 0.36, 1] }}
              className={`absolute inset-0 h-full w-full ${stage.image.fit === "contain" ? "object-contain" : "object-cover"} transition-transform duration-700 ease-out group-hover/stage:scale-[1.03]`}
            />
          </AnimatePresence>
          <span className="pointer-events-none absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-[#0B0A09] to-transparent" />
          <AnimatePresence initial={false} mode="wait">
            <motion.span
              key={`${item.id}-k`}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute bottom-3.5 left-4 inline-flex max-w-[85%] items-center gap-1.5 rounded-full border border-white/10 bg-black/45 px-2.5 py-1 text-[10.5px] font-semibold uppercase tracking-[0.14em] text-white/90 backdrop-blur"
            >
              <span className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
              <span className="truncate">{stage.kicker}</span>
            </motion.span>
          </AnimatePresence>
          {stage.film && (
            <span className="absolute left-1/2 top-[44%] flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-[0_12px_30px_-8px_rgba(196,138,100,0.7)] transition-transform duration-300 group-hover/stage:scale-110">
              <Play size={17} strokeWidth={2.5} className="ml-0.5" fill="currentColor" />
            </span>
          )}
        </span>
        <AnimatePresence initial={false} mode="wait">
          <motion.span
            key={`${item.id}-t`}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: reduce ? 0 : 0.22, ease: "easeOut" }}
            className="flex flex-1 flex-col px-5 pb-4 pt-4"
          >
            <span className="block text-[16.5px] font-semibold leading-snug tracking-tight text-foreground">{stage.title}</span>
            <span className="mt-2 line-clamp-3 block text-[13px] leading-[1.55] text-muted-foreground/80">{stage.body}</span>
            <span className="mt-auto flex items-end justify-between gap-4 pt-4">
              <span className="text-[11.5px] leading-snug text-muted-foreground/60">{stage.meta}</span>
              <span className="inline-flex flex-shrink-0 items-center gap-1.5 text-[13px] font-semibold text-primary">
                {stage.cta}
                <ArrowUpRight size={14} strokeWidth={2.5} className="transition-transform duration-200 group-hover/stage:translate-x-0.5 group-hover/stage:-translate-y-0.5" />
              </span>
            </span>
          </motion.span>
        </AnimatePresence>
      </Link>

      {/* foot cta spans both columns */}
      <div className="col-span-2 flex items-center justify-between border-t border-white/[0.06] px-6 py-3.5">
        <span className="text-[11.5px] text-muted-foreground/55">{spec.aside ?? "Zia or Omer reads every brief and replies within two business days."}</span>
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

export const PANELS: Record<PanelKey, React.FC> = {
  services: () => <ListStagePanel spec={SPECS.services} panelKey="services" />,
  start: () => <ListStagePanel spec={SPECS.start} panelKey="start" />,
  portfolio: () => <ListStagePanel spec={SPECS.portfolio} panelKey="portfolio" />,
  articles: () => <ListStagePanel spec={SPECS.articles} panelKey="articles" />,
};
