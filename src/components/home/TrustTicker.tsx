import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import PlatformIcon from "../common/PlatformIcon";
import { FACTS } from "../../config/facts";
import { getSiteData } from "../../data/site";
import { listedProjects } from "../../data/projects";

/**
 * The trust band beneath the film. It has one job the logo wall used to do —
 * scale and recognition at a glance, with movement — and it does it with
 * things that are true and checkable:
 *
 *  1. A still row: the platforms where clients review the founders, with the
 *     standing each platform shows (config/facts.ts). Five marks, no copy.
 *  2. A slow moving line of client and product names from published case
 *     studies — names, set in type, not logos. A permitted logo re-enters
 *     this same line automatically (`companyLogosCarousel.logos[].permitted`).
 *
 * Nothing here is a quote; the films above and the work below carry those.
 */
const CLIENT_NAMES: { slug: string; name: string }[] = [
  { slug: "fast-track-usa-app-rescue", name: "Fast Track USA" },
  { slug: "knipsr-event-media-saas", name: "Knipsr" },
  { slug: "floating-stone-ranch-processor-intake-engine", name: "Floating Stone Ranch" },
  { slug: "forlag-publishing-sales-inventory-dashboard", name: "Forlag" },
  { slug: "first-north-peptides-website-ai-concierge", name: "First North Peptides" },
  { slug: "skill-x-swap-mvp", name: "Skill x Swap" },
  { slug: "liftly-operational-mvp-v1", name: "Liftly" },
  { slug: "learning-platform-saas-stabilization", name: "Learning Platform SaaS" },
  { slug: "tomo-voice-ai-companion", name: "Tomo" },
  { slug: "pawspace-pet-services-marketplace", name: "PawSpace" },
  { slug: "bondfire-event-booking-app", name: "Bondfire" },
  { slug: "hjelpna-handyman-marketplace", name: "HjelpNå" },
  { slug: "ifyify-ai-personal-branding", name: "Ifyify" },
];

const TrustTicker: React.FC = () => {
  const { companyLogosCarousel } = getSiteData();
  const p = FACTS.platforms;

  const marks = [
    { platform: "Fiverr" as const, line: `${p.fiverrOmer.level} · ${p.fiverrOmer.rating} · ${p.fiverrOmer.reviews} reviews`, href: "https://www.fiverr.com/omershahgillani" },
    { platform: "Upwork" as const, line: `${p.upworkZia.badge} · ${p.upworkZia.jss} Job Success`, href: "https://www.upwork.com/freelancers/ziahussain1" },
    { platform: "Clutch" as const, line: `${p.clutch.rating} · verified review`, href: "https://clutch.co/profile/zumetrix-labs" },
    { platform: "Trustpilot" as const, line: `${p.trustpilot.reviews} reviews · all five-star`, href: "https://www.trustpilot.com/review/zumetrix.com" },
    { platform: "Google" as const, line: `${p.google.reviews} reviews`, href: "/client-stories" },
  ];

  const names = useMemo(() => {
    const listed = new Set(listedProjects.map((x) => x.slug));
    const items: { key: string; node: React.ReactNode }[] = CLIENT_NAMES.filter((c) => listed.has(c.slug)).map((c) => ({
      key: c.slug,
      node: (
        <Link to={`/portfolio/${c.slug}`} className="text-xl sm:text-2xl font-bold tracking-tight text-foreground/60 hover:text-foreground transition-colors duration-300 whitespace-nowrap">
          {c.name}
        </Link>
      ),
    }));
    (companyLogosCarousel?.logos ?? [])
      .filter((l) => l.permitted)
      .forEach((l) => items.splice(2, 0, { key: `logo-${l.name}`, node: <img src={l.imageUrl} alt={l.name} width="140" height="48" loading="lazy" decoding="async" className="h-9 w-auto object-contain opacity-75" /> }));
    return items;
  }, [companyLogosCarousel?.logos]);

  const track = [...names, ...names];

  return (
    <section id="trust" aria-label="Where clients review us, and who we've built for" className="py-12 lg:py-14 bg-background relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 1 — platform standing, still */}
        <ul className="flex flex-wrap justify-center gap-x-7 gap-y-4 sm:gap-x-9 lg:gap-x-5 lg:flex-nowrap xl:gap-x-11">
          {marks.map((m) => (
            <li key={m.platform}>
              <a
                href={m.href}
                target={m.href.startsWith("http") ? "_blank" : undefined}
                rel={m.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="group flex items-center gap-3 text-left"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-full border border-border/60 bg-card/20 text-muted-foreground/80 group-hover:text-primary group-hover:border-primary/40 transition-colors duration-200">
                  <PlatformIcon platform={m.platform} size={15} />
                </span>
                <span className="leading-tight">
                  <span className="block text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground/60 group-hover:text-primary/80 transition-colors">{m.platform}</span>
                  <span className="block text-[13px] text-foreground/85 whitespace-nowrap">{m.line}</span>
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* 2 — names in motion */}
      <div className="relative mt-10">
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-24 sm:w-48 bg-gradient-to-r from-background to-transparent z-10" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-24 sm:w-48 bg-gradient-to-l from-background to-transparent z-10" />
        <div className="overflow-hidden">
          <div className="flex items-center gap-10 sm:gap-14 w-max animate-marquee-slow will-change-transform hover:[animation-play-state:paused] motion-reduce:[animation:none]">
            {track.map((item, i) => (
              <React.Fragment key={`${item.key}-${i}`}>
                <span aria-hidden={i >= names.length ? true : undefined} className="flex items-center">
                  {item.node}
                </span>
                <span aria-hidden="true" className="h-1 w-1 rounded-full bg-primary/40 flex-shrink-0" />
              </React.Fragment>
            ))}
          </div>
        </div>
        <p className="mt-6 text-center text-xs text-muted-foreground/55 px-4">
          Clients and products from published case studies ·{" "}
          <Link to="/portfolio" className="text-primary/75 hover:text-primary transition-colors">
            see the work
          </Link>
        </p>
      </div>
    </section>
  );
};

export default TrustTicker;
