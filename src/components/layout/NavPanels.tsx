/* eslint-disable react-refresh/only-export-components -- data-driven panel set, no state to preserve across HMR */
import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight, Play, Sparkles } from "lucide-react";
import { services, rescueService } from "../../data/services";
import { articles } from "../../data/articles.js";
import { NAV_FEATURED_ORDER, pickInOrder } from "../../data/articleHierarchy";
import { getProjectBySlug } from "../../data/projects";
import { coverForArticle, listingImageForProject } from "../../data/covers";
import { TESTIMONIAL_FILMS } from "../../data/testimonialFilms";
import { FACTS } from "../../config/facts";
import { trackOffersNavClick, trackOfferSelect } from "../../utils/analytics";

// The content of the four desktop panels, kept apart from the shell so the
// Navigation component only has to own hover/focus state and the morphing
// container. Every panel is a plain block of <Link>s: it is rendered into
// the document on the server too (hidden until opened), so the site's main
// routes are reachable from every page's markup, not only after a hover.
//
// Design rule for every panel: one list, one proof. The list is what the
// visitor came for; the proof (a film, a cover, a number) is the thing a
// template menu never has — and it is always a record the site already
// stands behind, never a decoration.

export type PanelKey = "services" | "start" | "portfolio" | "articles";

export const PANEL_WIDTH: Record<PanelKey, number> = {
  services: 920,
  start: 900,
  portfolio: 920,
  articles: 820,
};

const FEATURED_ARTICLES = pickInOrder(articles, NAV_FEATURED_ORDER).slice(0, 4);

// The three cases that already lead the homepage, in the same FIX / BUILD /
// AUTOMATE order — one source of truth for "what we'd show first".
const PORTFOLIO_PICKS = [
  { slug: "fast-track-usa-app-rescue", kicker: "Rescued", line: "Two years stuck. Launched three weeks after handover." },
  { slug: "knipsr-event-media-saas", kicker: "Built from zero", line: "A private event-media SaaS, built to hold on event day." },
  { slug: "floating-stone-ranch-processor-intake-engine", kicker: "Automated", line: "A beef processor's intake and shipping, run by one system." },
]
  .map((p) => ({ ...p, project: getProjectBySlug(p.slug) }))
  .filter((p) => p.project);

const flagship = getProjectBySlug("fast-track-usa-app-rescue");
const joshFilm = TESTIMONIAL_FILMS.josh;

const START_DOORS = [
  {
    offer: "product-rescue",
    situation: "I have a product and it's stuck",
    next: "A $750 assessment first. Findings in five business days, then a plan priced from what we actually find.",
    step: "Assessment first",
    to: "/product-rescue?from=nav",
  },
  {
    offer: "idea-to-build",
    situation: "I have an idea and nothing built yet",
    next: "A build conversation. If V1 isn't settled yet, a $950 sprint decides it in writing before any code.",
    step: "Talk, or decide V1 first",
    to: "/contact?service=saas-mvp-development&situation=nothing-built",
  },
  {
    offer: "manual-to-system",
    situation: "My team still does this by hand",
    next: "One workflow, built and live. If it spans several teams or systems, a $750 plan comes first.",
    step: "One workflow, direct",
    to: "/contact?service=ai-automation-solutions&situation=manual-workflow",
  },
] as const;

/* ---------- shared pieces ---------- */

const eyebrow = "text-[10.5px] font-semibold uppercase tracking-[0.18em] text-primary/75";
const row =
  "group relative flex items-start gap-4 rounded-2xl px-3.5 py-3 transition-colors duration-200 hover:bg-white/[0.045] focus:outline-none focus-visible:bg-white/[0.045] focus-visible:ring-1 focus-visible:ring-primary/40";
const tile =
  "flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-[14px] border border-primary/20 bg-gradient-to-b from-primary/[0.14] to-primary/[0.03] text-primary shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] transition-all duration-300 group-hover:border-primary/45 group-hover:from-primary/[0.22]";
const title = "block text-[15px] font-semibold leading-snug text-foreground transition-colors duration-200 group-hover:text-primary";
const sub = "mt-1 block text-[13px] leading-[1.5] text-muted-foreground/75";
const rowArrow =
  "absolute right-3.5 top-1/2 -translate-y-1/2 translate-x-1 text-primary opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100";

const Foot: React.FC<{ left: { to: string; label: string; onClick?: () => void }; right: { to: string; label: string; onClick?: () => void; icon?: React.ReactNode } }> = ({ left, right }) => (
  <div className="mt-3 flex items-center justify-between border-t border-white/[0.06] px-3.5 pt-4">
    <Link to={left.to} onClick={left.onClick} className="group inline-flex items-center gap-2 text-[13px] font-medium text-muted-foreground/80 transition-colors duration-200 hover:text-foreground">
      {left.label}
      <ArrowRight size={12} strokeWidth={2.5} className="transition-transform duration-200 group-hover:translate-x-0.5" />
    </Link>
    <Link to={right.to} onClick={right.onClick} className="group inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/[0.07] px-3.5 py-1.5 text-[13px] font-semibold text-primary transition-colors duration-200 hover:bg-primary/[0.14]">
      {right.icon}
      {right.label}
      <ArrowRight size={12} strokeWidth={2.5} className="transition-transform duration-200 group-hover:translate-x-0.5" />
    </Link>
  </div>
);

/** The one record every service list travels with: Josh, on film. */
const FilmCard: React.FC = () => (
  <Link
    to="/portfolio/fast-track-usa-app-rescue"
    className="group/film relative flex h-full flex-col overflow-hidden rounded-2xl border border-primary/20 bg-background focus:outline-none focus-visible:ring-1 focus-visible:ring-primary/40"
  >
    <span className="relative block aspect-video overflow-hidden">
      <img
        src={joshFilm.poster}
        alt="Josh Nyce, owner of Fast Track USA, on film about working with Zumetrix Labs"
        width="1080"
        height="608"
        loading="lazy"
        decoding="async"
        className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover/film:scale-[1.04]"
      />
      <span className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#0A0908] to-transparent" />
      <span className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-black/45 px-2.5 py-1 text-[10.5px] font-semibold uppercase tracking-[0.14em] text-white/90 backdrop-blur">
        <span className="h-1.5 w-1.5 rounded-full bg-primary" />
        On film · 1:26
      </span>
      <span className="absolute left-1/2 top-[44%] flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-[0_12px_30px_-8px_rgba(196,138,100,0.7)] transition-transform duration-300 group-hover/film:scale-110">
        <Play size={16} strokeWidth={2.5} className="ml-0.5" fill="currentColor" />
      </span>
    </span>
    <span className="flex flex-1 flex-col px-4 pb-4 pt-3">
      {flagship?.testimonial?.quote && (
        <span className="block text-[13.5px] leading-snug text-foreground/90">“{flagship.testimonial.quote}”</span>
      )}
      <span className="mt-2 block text-[11.5px] text-muted-foreground/70">
        Josh Nyce · Fast Track USA · also on Trustpilot
      </span>
      <span className="mt-auto flex items-center justify-between pt-3">
        <span className="flex items-baseline gap-1.5 font-semibold tracking-tight text-foreground">
          <span className="text-[13px] text-muted-foreground/70 line-through decoration-primary/60">2 yrs</span>
          <ArrowRight size={12} className="text-primary" />
          <span className="text-[17px]">3 weeks</span>
        </span>
        <span className="inline-flex items-center gap-1 text-[12.5px] font-semibold text-primary">
          Watch
          <ArrowUpRight size={13} strokeWidth={2.5} className="transition-transform duration-200 group-hover/film:translate-x-0.5 group-hover/film:-translate-y-0.5" />
        </span>
      </span>
    </span>
  </Link>
);

/* ---------- panels ---------- */

const ServicesPanel: React.FC = () => (
  <div className="grid grid-cols-[1fr_292px] gap-5 p-5">
    <div>
      <p className={`${eyebrow} px-3.5 pb-2.5 pt-1`}>What we build</p>
      <div className="grid grid-cols-2 gap-1">
        {services.map((service) => (
          <Link key={service.slug} to={`/services/${service.slug}`} className={row}>
            <span className={tile}>
              <service.icon size={19} strokeWidth={1.8} />
            </span>
            <span className="min-w-0 pr-5">
              <span className={title}>{service.title}</span>
              <span className={`${sub} line-clamp-2`}>{service.subtitle}</span>
            </span>
            <ArrowRight size={14} strokeWidth={2.5} className={rowArrow} />
          </Link>
        ))}
      </div>

      {/* Rescue sits apart from the four build services on purpose: it is a
          different buyer state (something exists and is stuck), not a fifth
          interchangeable option — the same rule the Services hub follows. */}
      <p className={`${eyebrow} px-3.5 pb-2 pt-4`}>When something already exists</p>
      <Link
        to={`/services/${rescueService.slug}`}
        className={`${row} items-center rounded-2xl border border-primary/15 bg-gradient-to-r from-primary/[0.08] to-transparent hover:border-primary/35 hover:from-primary/[0.12]`}
      >
        <span className={tile}>
          <rescueService.icon size={19} strokeWidth={1.8} />
        </span>
        <span className="min-w-0 flex-1 pr-28">
          <span className={title}>{rescueService.title}</span>
          <span className={sub}>{rescueService.subtitle}</span>
        </span>
        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-right">
          <span className="block text-[10px] font-semibold uppercase tracking-[0.16em] text-primary/70">Assessment first</span>
          <span className="block text-[15px] font-semibold tracking-tight text-foreground">$750</span>
        </span>
      </Link>

      <Foot
        left={{ to: "/services", label: "Compare all five, with prices" }}
        right={{ to: "/start", label: "Not sure which? Start here", onClick: trackOffersNavClick }}
      />
    </div>
    <FilmCard />
  </div>
);

const StartPanel: React.FC = () => (
  <div className="grid grid-cols-[1fr_250px] gap-5 p-5">
    <div>
      <p className={`${eyebrow} px-3.5 pb-2.5 pt-1`}>Which one is you this week?</p>
      <div className="flex flex-col gap-1">
        {START_DOORS.map((d) => (
          <Link
            key={d.offer}
            to={d.to}
            onClick={() => {
              trackOffersNavClick();
              trackOfferSelect(d.offer);
            }}
            className={`${row} items-center py-3.5`}
          >
            <span className="min-w-0 flex-1 pr-6">
              <span className={`${title} text-[16px]`}>{d.situation}</span>
              <span className={`${sub} max-w-[30rem]`}>{d.next}</span>
            </span>
            <span className="flex-shrink-0 rounded-full border border-primary/25 bg-primary/[0.06] px-3 py-1 text-[10.5px] font-semibold uppercase tracking-[0.14em] text-primary transition-colors duration-200 group-hover:bg-primary/[0.14]">
              {d.step}
            </span>
          </Link>
        ))}
      </div>
      <Foot
        left={{ to: "/start", label: "See all three in full", onClick: trackOffersNavClick }}
        right={{ to: "/contact", label: "Prefer to just talk? Let's talk" }}
      />
    </div>

    {/* What every door shares. Three facts the pages already state, so the
        visitor who hasn't picked yet knows the rules before they do. */}
    <aside className="flex flex-col rounded-2xl border border-white/[0.07] bg-gradient-to-b from-white/[0.04] to-transparent p-5">
      <p className={eyebrow}>Every path, same rules</p>
      <ul className="mt-4 flex flex-col gap-4">
        {[
          ["A price before the call", "Every paid step is published here, not quoted after a discovery meeting."],
          ["A written answer", "Findings, a V1 decision or a workflow plan — on paper, yours to keep."],
          ["“Don't” is an allowed answer", "If something shouldn't be built, the written answer says so."],
        ].map(([h, b]) => (
          <li key={h} className="flex gap-3">
            <span className="mt-[7px] h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
            <span>
              <span className="block text-[13.5px] font-semibold leading-snug text-foreground">{h}</span>
              <span className="mt-0.5 block text-[12.5px] leading-snug text-muted-foreground/75">{b}</span>
            </span>
          </li>
        ))}
      </ul>
      <p className="mt-auto pt-5 text-[11.5px] leading-snug text-muted-foreground/60">
        Zia or Omer reads every brief and replies within two business days.
      </p>
    </aside>
  </div>
);

const PortfolioPanel: React.FC = () => (
  <div className="p-5">
    <div className="flex items-end justify-between px-3.5 pb-3 pt-1">
      <p className={eyebrow}>Work we&apos;d show first</p>
      <p className="text-[11.5px] text-muted-foreground/60">
        {FACTS.counts.projectsShipped} projects · {FACTS.counts.clients} clients · {FACTS.counts.writtenReviews} written reviews
      </p>
    </div>
    <div className="grid grid-cols-3 gap-2">
      {PORTFOLIO_PICKS.map(({ slug, kicker, line, project }) => {
        if (!project) return null;
        const cover = listingImageForProject(project);
        const client = project.client.name.split(" — ").pop();
        return (
          <Link
            key={slug}
            to={`/portfolio/${slug}`}
            className="group flex flex-col rounded-2xl border border-transparent p-2 transition-colors duration-200 hover:border-white/[0.06] hover:bg-white/[0.035] focus:outline-none focus-visible:ring-1 focus-visible:ring-primary/40"
          >
            <span className="relative block overflow-hidden rounded-xl border border-border/60 bg-background">
              <img
                src={cover.src}
                alt={`${project.title} — case study cover`}
                title={project.title}
                width={cover.width}
                height={cover.height}
                loading="lazy"
                decoding="async"
                className={`aspect-[4/3] w-full transition-transform duration-700 ease-out group-hover:scale-[1.04] ${project.heroImageFit === "contain" ? "object-contain" : "object-cover"}`}
              />
              <span className="absolute left-3 top-3 rounded-full border border-white/10 bg-black/45 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-white/90 backdrop-blur">
                {kicker}
              </span>
            </span>
            <span className="flex items-start justify-between gap-2 px-1.5 pt-3">
              <span className="min-w-0">
                <span className="block text-[14.5px] font-semibold leading-snug text-foreground transition-colors duration-200 group-hover:text-primary">{client}</span>
                <span className="mt-1 block text-[12.5px] leading-snug text-muted-foreground/75">{line}</span>
              </span>
              <ArrowUpRight size={15} strokeWidth={2.5} className="mt-0.5 flex-shrink-0 text-primary opacity-0 transition-all duration-200 group-hover:opacity-100" />
            </span>
          </Link>
        );
      })}
    </div>
    <Foot
      left={{ to: "/portfolio", label: "All case studies" }}
      right={{ to: "/client-stories", label: "Clients on film", icon: <Play size={11} strokeWidth={2.5} fill="currentColor" /> }}
    />
  </div>
);

const ArticlesPanel: React.FC = () => (
  <div className="grid grid-cols-[1fr_236px] gap-5 p-5">
    <div>
      <p className={`${eyebrow} px-3.5 pb-2.5 pt-1`}>Decisions, written down</p>
      <div className="flex flex-col gap-1">
        {FEATURED_ARTICLES.map((article) => {
          const cover = coverForArticle(article);
          return (
            <Link key={article.slug} to={`/articles/${article.slug}`} className={`${row} items-center`}>
              <span className="block w-[104px] flex-shrink-0 overflow-hidden rounded-lg border border-border/60 bg-background">
                <img
                  src={cover.src}
                  alt={`${article.title} — article cover`}
                  title={article.title}
                  width={cover.width}
                  height={cover.height}
                  loading="lazy"
                  decoding="async"
                  className="aspect-video w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                />
              </span>
              <span className="min-w-0 pr-6">
                <span className="mb-1 flex items-center gap-2 text-[11px] text-muted-foreground/60">
                  <span>{article.category}</span>
                  <span aria-hidden="true">·</span>
                  <span>{article.readTime}</span>
                </span>
                <span className={`${title} text-[14.5px]`}>{article.title}</span>
              </span>
              <ArrowRight size={14} strokeWidth={2.5} className={rowArrow} />
            </Link>
          );
        })}
      </div>
      <Foot
        left={{ to: "/articles", label: "All articles" }}
        right={{ to: "/start", label: "Which of these is you? Start here", onClick: trackOffersNavClick }}
      />
    </div>

    <Link
      to="/rescue-or-rebuild"
      className="group flex flex-col rounded-2xl border border-primary/20 bg-gradient-to-b from-primary/[0.1] to-transparent p-5 transition-colors duration-200 hover:border-primary/40 focus:outline-none focus-visible:ring-1 focus-visible:ring-primary/40"
    >
      <p className={eyebrow}>Free · 2 minutes</p>
      <p className="mt-3 text-[18px] font-semibold leading-tight tracking-tight text-foreground">
        Rescue it, or rebuild it?
      </p>
      <p className="mt-2 text-[12.5px] leading-snug text-muted-foreground/75">
        Four questions, no email, an honest read on where your product stands — the same first pass we run ourselves.
      </p>
      <ul className="mt-4 grid grid-cols-2 gap-x-3 gap-y-2 text-[12px] text-muted-foreground/70">
        {["Structural integrity", "Operational control", "Business reversibility", "Scope of the problem"].map((q) => (
          <li key={q} className="flex items-center gap-2">
            <Sparkles size={10} strokeWidth={2.2} className="text-primary/70" />
            {q}
          </li>
        ))}
      </ul>
      <span className="mt-auto inline-flex items-center gap-2 pt-5 text-[13px] font-semibold text-primary">
        Run it now
        <ArrowRight size={13} strokeWidth={2.5} className="transition-transform duration-200 group-hover:translate-x-0.5" />
      </span>
    </Link>
  </div>
);

export const PANELS: Record<PanelKey, React.FC> = {
  services: ServicesPanel,
  start: StartPanel,
  portfolio: PortfolioPanel,
  articles: ArticlesPanel,
};
