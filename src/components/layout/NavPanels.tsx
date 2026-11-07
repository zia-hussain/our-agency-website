/* eslint-disable react-refresh/only-export-components -- data-driven panel set, no state to preserve across HMR */
import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, PlayCircle, Sparkles } from "lucide-react";
import { services, rescueService } from "../../data/services";
import { articles } from "../../data/articles.js";
import { NAV_FEATURED_ORDER, pickInOrder } from "../../data/articleHierarchy";
import { getProjectBySlug } from "../../data/projects";
import { listingImageForProject } from "../../data/covers";
import { trackOffersNavClick, trackOfferSelect } from "../../utils/analytics";

// The content of the four desktop panels, kept apart from the shell so the
// Navigation component only has to own hover/focus state and the morphing
// container. Every panel is a plain block of <Link>s: it is rendered into
// the document on the server too (hidden until opened), so the site's main
// routes are reachable from every page's markup, not only after a hover.

export type PanelKey = "services" | "start" | "portfolio" | "articles";

export const PANEL_WIDTH: Record<PanelKey, number> = {
  services: 784,
  start: 640,
  portfolio: 680,
  articles: 560,
};

const FEATURED_ARTICLES = pickInOrder(articles, NAV_FEATURED_ORDER);

// The three cases that already lead the homepage, in the same BUILD / FIX /
// AUTOMATE order — one source of truth for "what we'd show first".
const PORTFOLIO_PICKS = [
  { slug: "fast-track-usa-app-rescue", kicker: "Rescued" },
  { slug: "knipsr-event-media-saas", kicker: "Built from zero" },
  { slug: "floating-stone-ranch-processor-intake-engine", kicker: "Automated" },
]
  .map((p) => ({ ...p, project: getProjectBySlug(p.slug) }))
  .filter((p) => p.project);

const flagship = getProjectBySlug("fast-track-usa-app-rescue");

const START_DOORS = [
  {
    offer: "product-rescue",
    situation: "I have a product and it's stuck",
    next: "A $750 assessment first — findings in five business days, then a plan priced from what we find.",
    step: "Assessment first",
    to: "/product-rescue?from=nav",
  },
  {
    offer: "idea-to-build",
    situation: "I have an idea and nothing built yet",
    next: "A build conversation. If V1 isn't settled, a $950 sprint decides it in writing first.",
    step: "Talk, or decide V1 first",
    to: "/contact?service=saas-mvp-development&situation=nothing-built",
  },
  {
    offer: "manual-to-system",
    situation: "My team still does this by hand",
    next: "One workflow, built and live. Several systems involved? A $750 plan comes first.",
    step: "One workflow, direct",
    to: "/contact?service=ai-automation-solutions&situation=manual-workflow",
  },
] as const;

const rowLink =
  "group flex items-start gap-3.5 rounded-2xl p-3.5 transition-colors duration-200 hover:bg-white/[0.045] focus:outline-none focus-visible:bg-white/[0.045] focus-visible:ring-1 focus-visible:ring-primary/40";
const iconRing =
  "flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border-2 border-primary/25 bg-background transition-colors duration-200 group-hover:border-primary/50";
const rowTitle = "block text-[14px] font-semibold text-foreground transition-colors duration-200 group-hover:text-primary";
const rowSub = "mt-0.5 block text-[12.5px] leading-snug text-muted-foreground/70";
const footLink =
  "group inline-flex items-center gap-2 text-[13px] font-medium text-muted-foreground/80 transition-colors duration-200 hover:text-primary";
const footArrow = "transition-transform duration-200 group-hover:translate-x-0.5";
const eyebrow = "px-2 pb-2 text-[10.5px] font-semibold uppercase tracking-[0.16em] text-primary/70";

const ServicesPanel: React.FC = () => (
  <div className="grid grid-cols-[1fr_236px]">
    <div className="p-3">
      <p className={`${eyebrow} pt-1.5`}>What we build</p>
      <div className="grid grid-cols-2 gap-1">
        {services.map((service) => (
          <Link key={service.slug} to={`/services/${service.slug}`} className={rowLink}>
            <span className={iconRing}>
              <service.icon size={17} className="text-primary" />
            </span>
            <span className="min-w-0">
              <span className={rowTitle}>{service.title}</span>
              <span className="mt-0.5 line-clamp-2 text-[12.5px] leading-snug text-muted-foreground/70">{service.subtitle}</span>
            </span>
          </Link>
        ))}
      </div>
      {/* Rescue sits apart from the four build services on purpose: it is a
          different buyer state (something exists and is stuck), not a fifth
          interchangeable option — the same rule the Services hub follows. */}
      <Link
        to={`/services/${rescueService.slug}`}
        className={`${rowLink} mt-1 items-center border border-white/[0.05] bg-white/[0.02] hover:border-primary/20`}
      >
        <span className={`${iconRing} border-border/60`}>
          <rescueService.icon size={17} className="text-muted-foreground transition-colors duration-200 group-hover:text-primary" />
        </span>
        <span className="min-w-0 flex-1">
          <span className={rowTitle}>{rescueService.title}</span>
          <span className={rowSub}>{rescueService.subtitle}</span>
        </span>
        <span className="hidden xl:block flex-shrink-0 text-[11px] font-semibold uppercase tracking-[0.12em] text-primary/80">
          Assessment $750
        </span>
      </Link>
      <div className="mt-2 flex items-center justify-between border-t border-white/[0.06] px-3.5 pb-1.5 pt-3.5">
        <Link to="/services" className={footLink}>
          Compare all five, with prices
          <ArrowRight size={12} strokeWidth={2.5} className={footArrow} />
        </Link>
        <Link to="/start" onClick={trackOffersNavClick} className={`${footLink} text-primary/90`}>
          Not sure which? Start here
          <ArrowRight size={12} strokeWidth={2.5} className={footArrow} />
        </Link>
      </div>
    </div>

    {/* Proof rail — the one record that travels with every service list.
        Same facts, same wording as the homepage flagship: film, Trustpilot,
        Upwork contract. Nothing here is claimed that the case page doesn't. */}
    <aside className="m-3 ml-0 flex flex-col rounded-2xl border border-primary/15 bg-gradient-to-b from-primary/[0.08] to-transparent p-4">
      <p className="text-[10.5px] font-semibold uppercase tracking-[0.16em] text-primary/70">On the record</p>
      {flagship?.testimonial?.quote && (
        <blockquote className="mt-3">
          <p className="text-[13.5px] leading-snug text-foreground/90">“{flagship.testimonial.quote}”</p>
          <footer className="mt-2 text-[11.5px] text-muted-foreground/70">
            {flagship.testimonial.author} · Fast Track USA
          </footer>
        </blockquote>
      )}
      <p className="mt-3 text-[11.5px] leading-snug text-muted-foreground/70">
        Two years stuck with another team. Launched three weeks after handover — on film and on Trustpilot.
      </p>
      <Link
        to="/portfolio/fast-track-usa-app-rescue"
        className="group mt-auto inline-flex items-center gap-2 pt-4 text-[13px] font-semibold text-primary transition-colors duration-200 hover:text-primary/80"
      >
        <PlayCircle size={15} strokeWidth={2} />
        Watch Josh tell it
        <ArrowRight size={12} strokeWidth={2.5} className={footArrow} />
      </Link>
    </aside>
  </div>
);

const StartPanel: React.FC = () => (
  <div className="p-3">
    <p className={`${eyebrow} pt-1.5`}>Which one is you this week?</p>
    <div className="flex flex-col gap-1">
      {START_DOORS.map((d) => (
        <Link
          key={d.offer}
          to={d.to}
          onClick={() => {
            trackOffersNavClick();
            trackOfferSelect(d.offer);
          }}
          className={`${rowLink} items-center`}
        >
          <span className="min-w-0 flex-1">
            <span className={`${rowTitle} text-[15px]`}>{d.situation}</span>
            <span className={`${rowSub} max-w-[26rem]`}>{d.next}</span>
          </span>
          <span className="flex-shrink-0 self-start pt-0.5 text-right text-[10.5px] font-semibold uppercase tracking-[0.12em] text-primary/80">
            {d.step}
          </span>
        </Link>
      ))}
    </div>
    <div className="mt-2 flex items-center justify-between border-t border-white/[0.06] px-3.5 pb-1.5 pt-3.5">
      <Link to="/start" onClick={trackOffersNavClick} className={footLink}>
        See all three in full
        <ArrowRight size={12} strokeWidth={2.5} className={footArrow} />
      </Link>
      <Link to="/contact" className={`${footLink} text-primary/90`}>
        Prefer to just talk? Let&apos;s talk
        <ArrowRight size={12} strokeWidth={2.5} className={footArrow} />
      </Link>
    </div>
  </div>
);

const PortfolioPanel: React.FC = () => (
  <div className="p-3">
    <p className={`${eyebrow} pt-1.5`}>Work we&apos;d show first</p>
    <div className="grid grid-cols-3 gap-1">
      {PORTFOLIO_PICKS.map(({ slug, kicker, project }) => {
        if (!project) return null;
        const cover = listingImageForProject(project);
        return (
          <Link key={slug} to={`/portfolio/${slug}`} className="group flex flex-col rounded-2xl p-2 transition-colors duration-200 hover:bg-white/[0.045] focus:outline-none focus-visible:ring-1 focus-visible:ring-primary/40">
            <span className="block overflow-hidden rounded-xl border border-border/60 bg-background">
              <img
                src={cover.src}
                alt=""
                width={cover.width}
                height={cover.height}
                loading="lazy"
                decoding="async"
                className={`aspect-[4/3] w-full transition-transform duration-500 ease-out group-hover:scale-[1.03] ${project.heroImageFit === "contain" ? "object-contain" : "object-cover"}`}
              />
            </span>
            <span className="mt-2.5 block px-1 text-[10.5px] font-semibold uppercase tracking-[0.12em] text-primary/70">{kicker}</span>
            <span className="mt-0.5 block px-1 text-[13.5px] font-semibold leading-snug text-foreground transition-colors duration-200 group-hover:text-primary">
              {project.client.name.split(" — ").pop()}
            </span>
            <span className="mt-0.5 line-clamp-3 px-1 text-[12px] leading-snug text-muted-foreground/70">{project.description}</span>
          </Link>
        );
      })}
    </div>
    <div className="mt-2 flex items-center justify-between border-t border-white/[0.06] px-3.5 pb-1.5 pt-3.5">
      <Link to="/portfolio" className={footLink}>
        All case studies
        <ArrowRight size={12} strokeWidth={2.5} className={footArrow} />
      </Link>
      <Link to="/client-stories" className={`${footLink} text-primary/90`}>
        <PlayCircle size={14} strokeWidth={2} />
        Clients on film
        <ArrowRight size={12} strokeWidth={2.5} className={footArrow} />
      </Link>
    </div>
  </div>
);

const ArticlesPanel: React.FC = () => (
  <div className="p-3">
    <p className={`${eyebrow} pt-1.5`}>Decisions, written down</p>
    <div className="flex flex-col gap-0.5">
      {FEATURED_ARTICLES.map((article) => (
        <Link key={article.slug} to={`/articles/${article.slug}`} className={`${rowLink} flex-col gap-0 py-3`}>
          <span className="mb-1 flex items-center gap-2 text-[11px] text-muted-foreground/60">
            <span>{article.category}</span>
            <span aria-hidden="true">·</span>
            <span>{article.readTime}</span>
          </span>
          <span className={`${rowTitle} leading-snug`}>{article.title}</span>
        </Link>
      ))}
    </div>
    <div className="mt-2 flex items-center justify-between border-t border-white/[0.06] px-3.5 pb-1.5 pt-3.5">
      <Link to="/articles" className={footLink}>
        All articles
        <ArrowRight size={12} strokeWidth={2.5} className={footArrow} />
      </Link>
      <Link to="/rescue-or-rebuild" className={`${footLink} text-primary/90`}>
        <Sparkles size={13} strokeWidth={2} />
        Free tool: rescue or rebuild?
        <ArrowRight size={12} strokeWidth={2.5} className={footArrow} />
      </Link>
    </div>
  </div>
);

export const PANELS: Record<PanelKey, React.FC> = {
  services: ServicesPanel,
  start: StartPanel,
  portfolio: PortfolioPanel,
  articles: ArticlesPanel,
};
