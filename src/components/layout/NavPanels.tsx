/* eslint-disable react-refresh/only-export-components -- data-driven panel set, no state to preserve across HMR */
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { services, rescueService } from "../../data/services";
import { articles } from "../../data/articles.js";
import { NAV_FEATURED_ORDER, pickInOrder } from "../../data/articleHierarchy";
import { getProjectBySlug } from "../../data/projects";
import { FACTS } from "../../config/facts";
import { trackOffersNavClick, trackOfferSelect } from "../../utils/analytics";

// Pure type. No pictures, no tiles, no chips, no descriptions. A list of
// large, quiet links on the left; on the right, one statement that changes
// with the pointer — the sentence the destination page opens on, plus the
// one fact that matters (a price, a step, a client's own words). Hairlines,
// air, a single copper accent. Everything renders on the server with the
// first item staged, so each page's markup carries these links.

export type PanelKey = "services" | "start" | "portfolio" | "articles";

const WIDTH = 980;
export const PANEL_WIDTH: Record<PanelKey, number> = { services: WIDTH, start: WIDTH, portfolio: WIDTH, articles: WIDTH };

type Item = {
  id: string;
  label: string;
  /** Small right-aligned fact next to the label (a price, a category). */
  aside?: string;
  to: string;
  onClick?: () => void;
  /** Mono eyebrow over the statement. */
  eyebrow: string;
  /** The one sentence the destination page would open on. */
  statement: string;
  /** One line of fact beneath it — never a pitch. */
  fact?: string;
  cta: string;
};

type PanelSpec = {
  title: string;
  items: Item[];
  footLeft: string;
  footLink: { to: string; label: string; onClick?: () => void };
};

/* ---------- data ---------- */

const flagship = getProjectBySlug("fast-track-usa-app-rescue");
const knipsr = getProjectBySlug("knipsr-event-media-saas");
const fsr = getProjectBySlug("floating-stone-ranch-processor-intake-engine");

const SERVICES_SPEC: PanelSpec = {
  title: "Services",
  items: [
    ...services.map((s) => ({
      id: s.slug,
      label: s.title,
      aside: s.price,
      to: `/services/${s.slug}`,
      eyebrow: s.title,
      statement: s.subtitle,
      fact: `${s.price} · published before the call`,
      cta: "Explore",
    })),
    {
      id: rescueService.slug,
      label: rescueService.title,
      aside: "Assessment $750",
      to: `/services/${rescueService.slug}`,
      eyebrow: "When something already exists",
      statement: "We read the code before anyone prices a fix.",
      fact: "Assessment $750 · findings in five business days · then a plan priced from what we find",
      cta: "See how a rescue starts",
    },
  ],
  footLeft: "Five services. Every price on the page, none after a discovery call.",
  footLink: { to: "/start", label: "Not sure which? Start here", onClick: trackOffersNavClick },
};

const door = (offer: string) => () => {
  trackOffersNavClick();
  trackOfferSelect(offer);
};

const START_SPEC: PanelSpec = {
  title: "Start here",
  items: [
    {
      id: "fix",
      label: "I have a product and it's stuck",
      aside: "Fix",
      to: "/product-rescue?from=nav",
      onClick: door("product-rescue"),
      eyebrow: "Assessment first",
      statement: "Find out what's actually wrong before paying to fix it.",
      fact: "$750 · five business days · written findings · “don't” is an allowed answer",
      cta: "Show us where you're stuck",
    },
    {
      id: "build",
      label: "I have an idea and nothing built yet",
      aside: "Build",
      to: "/contact?service=saas-mvp-development&situation=nothing-built",
      onClick: door("idea-to-build"),
      eyebrow: "Talk — or decide V1 in writing first",
      statement: "Decide what the first version has to prove. Then build that.",
      fact: "Build from $4,800 · optional Idea-to-Build Sprint $950 when V1 isn't settled",
      cta: "Tell us what you're building",
    },
    {
      id: "automate",
      label: "My team still does this by hand",
      aside: "Automate",
      to: "/contact?service=ai-automation-solutions&situation=manual-workflow",
      onClick: door("manual-to-system"),
      eyebrow: "One workflow, direct",
      statement: "Get one workflow off your team's plate. Built, live, watched.",
      fact: "From $2,500 · a $750 plan first only when it spans several teams or systems",
      cta: "Show us the workflow",
    },
  ],
  footLeft: "Zia or Omer reads every brief and replies within two business days.",
  footLink: { to: "/contact", label: "Prefer to just talk? Let's talk" },
};

const caseItem = (p: ReturnType<typeof getProjectBySlug>, aside: string): Item | null =>
  p
    ? {
        id: p.slug,
        label: p.client.name.split(" — ").pop() || p.client.name,
        aside,
        to: `/portfolio/${p.slug}`,
        eyebrow: p.title,
        statement: p.testimonial?.quote ? `“${p.testimonial.quote}”` : p.description,
        fact: p.testimonial ? `${p.testimonial.author}${p.testimonial.role ? ` · ${p.testimonial.role}` : ""}` : p.client.name,
        cta: "Read the case study",
      }
    : null;

const PORTFOLIO_SPEC: PanelSpec = {
  title: "Portfolio",
  items: [
    caseItem(flagship, "Rescued"),
    caseItem(knipsr, "Built from zero"),
    caseItem(fsr, "Automated"),
    {
      id: "films",
      label: "Clients on film",
      aside: "Four founders",
      to: "/client-stories",
      eyebrow: "In their own words",
      statement: "Another team spent two years without shipping it. Josh explains what changed the moment Zumetrix took over.",
      fact: "Josh Nyce · Owner & Founder, Fast Track USA · also on Trustpilot",
      cta: "Watch the films",
    },
  ].filter(Boolean) as Item[],
  footLeft: `${FACTS.counts.projectsShipped} projects · ${FACTS.counts.clients} clients · ${FACTS.counts.writtenReviews} written reviews on five platforms`,
  footLink: { to: "/portfolio/all", label: "Every project" },
};

const FEATURED_ARTICLES = pickInOrder(articles, NAV_FEATURED_ORDER).slice(0, 4);
const ARTICLES_SPEC: PanelSpec = {
  title: "Articles",
  items: [
    ...FEATURED_ARTICLES.map((a) => ({
      id: a.slug,
      label: a.title,
      aside: a.readTime,
      to: `/articles/${a.slug}`,
      eyebrow: `${a.category} · by ${a.author}`,
      statement: a.title,
      fact: a.excerpt,
      cta: "Read",
    })),
    {
      id: "tool",
      label: "Rescue or rebuild?",
      aside: "Free · 2 min",
      to: "/rescue-or-rebuild",
      eyebrow: "A free check, not a lead form",
      statement: "Four questions. No email. An honest read on where your product stands.",
      fact: "Structural integrity · operational control · business reversibility · scope of the problem",
      cta: "Run it",
    },
  ],
  footLeft: "Written by Zia and Omer from real delivery work.",
  footLink: { to: "/articles", label: "All articles" },
};

const SPECS: Record<PanelKey, PanelSpec> = { services: SERVICES_SPEC, start: START_SPEC, portfolio: PORTFOLIO_SPEC, articles: ARTICLES_SPEC };

/* ---------- the panel ---------- */

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const TypePanel: React.FC<{ spec: PanelSpec; panelKey: PanelKey }> = ({ spec, panelKey }) => {
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
    <div className="px-10 pb-7 pt-8">
      <div className="grid grid-cols-[1fr_1fr] gap-x-14">
        {/* list */}
        <div className="flex flex-col" onKeyDown={onKey}>
          <p className="mb-5 font-mono text-[10.5px] uppercase tracking-[0.22em] text-primary/80">{spec.title}</p>
          <div className="flex flex-col">
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
                  className="group relative flex items-baseline justify-between gap-6 border-t border-white/[0.06] py-[15px] focus:outline-none first:border-t-0"
                >
                  <span
                    className={`block text-[19px] font-semibold leading-tight tracking-[-0.012em] transition-[color,transform] duration-300 ease-out ${
                      on ? "translate-x-1.5 text-foreground" : "text-foreground/55"
                    }`}
                  >
                    {it.label}
                  </span>
                  {it.aside && (
                    <span
                      className={`flex-shrink-0 font-mono text-[11px] uppercase tracking-[0.12em] transition-colors duration-300 ${
                        on ? "text-primary" : "text-muted-foreground/45"
                      }`}
                    >
                      {it.aside}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>
        </div>

        {/* statement */}
        <Link
          to={item.to}
          onClick={item.onClick}
          aria-label={`${item.cta}: ${item.label}`}
          className="group/stage relative flex flex-col border-l border-white/[0.06] pl-14 focus:outline-none"
        >
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -left-px top-0 h-16 w-px bg-gradient-to-b from-primary/70 to-transparent"
          />
          <AnimatePresence initial={false} mode="wait">
            <motion.span
              key={item.id}
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, y: -6 }}
              transition={{ duration: reduce ? 0 : 0.28, ease: EASE }}
              className="flex flex-1 flex-col"
            >
              <span className="mb-5 block font-mono text-[10.5px] uppercase tracking-[0.22em] text-muted-foreground/60">{item.eyebrow}</span>
              <span className="block text-[28px] font-semibold leading-[1.18] tracking-[-0.02em] text-foreground [text-wrap:balance]">
                {item.statement}
              </span>
              {item.fact && <span className="mt-5 line-clamp-3 text-[13px] leading-relaxed text-muted-foreground/70">{item.fact}</span>}
              <span className="mt-auto inline-flex items-center gap-2 pt-8 text-[14px] font-medium text-primary">
                {item.cta}
                <ArrowRight size={14} strokeWidth={2.25} className="transition-transform duration-300 ease-out group-hover/stage:translate-x-1" />
              </span>
            </motion.span>
          </AnimatePresence>
        </Link>
      </div>

      <div className="mt-8 flex items-center justify-between border-t border-white/[0.06] pt-5">
        <span className="text-[12.5px] text-muted-foreground/55">{spec.footLeft}</span>
        <Link
          to={spec.footLink.to}
          onClick={spec.footLink.onClick}
          className="group inline-flex items-center gap-2 text-[13px] font-medium text-foreground/80 transition-colors duration-200 hover:text-primary"
        >
          {spec.footLink.label}
          <ArrowRight size={13} strokeWidth={2.25} className="transition-transform duration-300 ease-out group-hover:translate-x-1" />
        </Link>
      </div>
      <span className="sr-only">{panelKey}</span>
    </div>
  );
};

export const PANELS: Record<PanelKey, React.FC> = {
  services: () => <TypePanel spec={SPECS.services} panelKey="services" />,
  start: () => <TypePanel spec={SPECS.start} panelKey="start" />,
  portfolio: () => <TypePanel spec={SPECS.portfolio} panelKey="portfolio" />,
  articles: () => <TypePanel spec={SPECS.articles} panelKey="articles" />,
};
