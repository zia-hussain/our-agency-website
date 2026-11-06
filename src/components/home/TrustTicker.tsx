import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import { Star } from "lucide-react";
import PlatformIcon from "../common/PlatformIcon";
import { TESTIMONIALS } from "../../data/testimonials";
import { FACTS } from "../../config/facts";
import { getSiteData } from "../../data/site";

/**
 * The quiet moving band beneath the hero. It used to be a logo wall; the
 * logos had no written permission, so they are gone until each client says
 * yes (see `companyLogosCarousel.logos[].permitted` in data/site.ts — a
 * permitted logo re-enters this same track automatically).
 *
 * What runs here instead is the proof the company can actually show: short
 * verbatim excerpts from reviews clients posted on platforms Zumetrix does
 * not control, each with the platform it lives on, interleaved with the
 * founders' verified platform standing from config/facts.ts. Same job the
 * logos did — movement, scale, recognition, a break in the rhythm — without
 * a single claim that can't be checked.
 */

type Tile =
  | { kind: "quote"; id: string; text: string; author: string; platform: TestimonialPlatform; rating?: number; href?: string }
  | { kind: "fact"; id: string; platform: TestimonialPlatform; headline: string; detail: string }
  | { kind: "logo"; id: string; name: string; imageUrl: string };

type TestimonialPlatform = "Fiverr" | "Upwork" | "Google" | "Trustpilot" | "Clutch";

// Excerpts are the first clause of a verbatim review, cut at a clean boundary.
const EXCERPT_IDS = [
  "josh-fast-track",
  "founder-knipsr",
  "andi-first-north",
  "james-floating-stone-ranch",
  "alan-learning-platform",
  "reema",
  "nathan-api-rescue",
  "dinah-mobile",
  "sarah-saas",
  "kevin-automation",
  "allayth-shopify-automation",
  "fateh-repeat",
];

const firstClause = (quote: string, max = 96): string => {
  const clean = quote.replace(/\s+/g, " ").trim();
  const cut = clean.search(/[.!?](\s|$)/);
  let out = cut > 20 && cut < max ? clean.slice(0, cut + 1) : clean;
  if (out.length > max) {
    out = out.slice(0, max).replace(/[,;:\s]+\S*$/, "") + "…";
  }
  return out;
};

const TrustTicker: React.FC = () => {
  const { companyLogosCarousel } = getSiteData();

  const tiles = useMemo<Tile[]>(() => {
    const quotes: Tile[] = EXCERPT_IDS.map((id) => TESTIMONIALS.find((t) => t.id === id))
      .filter((t): t is NonNullable<typeof t> => Boolean(t && t.platform))
      .map((t) => ({
        kind: "quote" as const,
        id: t.id,
        text: firstClause(t.quote),
        author: t.author,
        platform: t.platform as TestimonialPlatform,
        rating: t.rating,
        href: t.projectSlug ? `/portfolio/${t.projectSlug}` : "/client-stories",
      }));

    const p = FACTS.platforms;
    const facts: Tile[] = [
      { kind: "fact", id: "f-fiverr", platform: "Fiverr", headline: `${p.fiverrOmer.level} · ${p.fiverrOmer.rating} · ${p.fiverrOmer.reviews} reviews`, detail: "Omer Gillani on Fiverr" },
      { kind: "fact", id: "f-upwork", platform: "Upwork", headline: `${p.upworkZia.badge} · ${p.upworkZia.jss} Job Success`, detail: "Zia Hussain on Upwork" },
      { kind: "fact", id: "f-clutch", platform: "Clutch", headline: `${p.clutch.rating} · ${p.clutch.reviews} verified review`, detail: "Zumetrix Labs on Clutch" },
      { kind: "fact", id: "f-trustpilot", platform: "Trustpilot", headline: `${p.trustpilot.reviews} reviews · all five-star`, detail: "Zumetrix Labs on Trustpilot" },
    ];

    const logos: Tile[] = (companyLogosCarousel?.logos ?? [])
      .filter((l) => l.permitted)
      .map((l) => ({ kind: "logo" as const, id: `logo-${l.name}`, name: l.name, imageUrl: l.imageUrl }));

    // Interleave: three quotes, one fact (and a logo when any are permitted).
    const out: Tile[] = [];
    let f = 0;
    let g = 0;
    quotes.forEach((q, i) => {
      out.push(q);
      if ((i + 1) % 3 === 0 && facts[f]) out.push(facts[f++]);
      if ((i + 1) % 4 === 0 && logos[g]) out.push(logos[g++]);
    });
    while (facts[f]) out.push(facts[f++]);
    while (logos[g]) out.push(logos[g++]);
    return out;
  }, [companyLogosCarousel?.logos]);

  const track = useMemo(() => [...tiles, ...tiles], [tiles]);
  if (!tiles.length) return null;

  return (
    <section aria-label="What clients wrote on Fiverr, Upwork, Trustpilot, Clutch and Google" className="py-10 lg:py-12 bg-background relative overflow-hidden">
      <div className="relative">
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-20 sm:w-40 bg-gradient-to-r from-background via-background/90 to-transparent z-10" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-20 sm:w-40 bg-gradient-to-l from-background via-background/90 to-transparent z-10" />

        <div className="overflow-hidden py-2">
          <div className="flex items-stretch gap-3 sm:gap-4 w-max animate-marquee-slow will-change-transform [animation-duration:90s] hover:[animation-play-state:paused] motion-reduce:[animation:none]">
            {track.map((tile, index) => {
              const aria = index >= tiles.length ? { "aria-hidden": true as const } : {};
              if (tile.kind === "logo") {
                return (
                  <div key={`${tile.id}-${index}`} {...aria} className="flex-shrink-0 flex items-center justify-center w-44 rounded-xl border border-border/50 bg-card/15 px-6">
                    <img src={tile.imageUrl} alt={tile.name} width="176" height="64" loading="lazy" decoding="async" className="h-10 w-auto object-contain opacity-70" />
                  </div>
                );
              }
              if (tile.kind === "fact") {
                return (
                  <div key={`${tile.id}-${index}`} {...aria} className="flex-shrink-0 w-[260px] rounded-xl border border-primary/25 bg-gradient-to-b from-primary/[0.08] to-transparent px-5 py-4 flex flex-col justify-center">
                    <div className="flex items-center gap-2 text-primary mb-2">
                      <PlatformIcon platform={tile.platform} size={14} />
                      <span className="text-[11px] font-semibold uppercase tracking-[0.14em]">{tile.platform}</span>
                    </div>
                    <p className="text-sm font-semibold text-foreground leading-snug">{tile.headline}</p>
                    <p className="text-xs text-muted-foreground mt-1">{tile.detail}</p>
                  </div>
                );
              }
              return (
                <Link
                  key={`${tile.id}-${index}`}
                  {...aria}
                  to={tile.href || "/client-stories"}
                  tabIndex={index >= tiles.length ? -1 : 0}
                  className="group flex-shrink-0 w-[300px] sm:w-[340px] rounded-xl border border-border/50 bg-card/15 hover:border-primary/30 hover:bg-card/30 transition-colors duration-300 px-5 py-4 flex flex-col justify-between"
                >
                  <p className="text-[15px] leading-snug text-foreground/90 italic">“{tile.text}”</p>
                  <div className="mt-3 flex items-center justify-between gap-3 text-xs text-muted-foreground">
                    <span className="truncate">{tile.author}</span>
                    <span className="flex items-center gap-1.5 flex-shrink-0">
                      {tile.rating ? (
                        <span className="flex items-center gap-0.5 text-primary/80" aria-label={`${tile.rating} out of 5`}>
                          <Star size={10} fill="currentColor" />
                          <span className="font-semibold">{tile.rating.toFixed(1)}</span>
                        </span>
                      ) : null}
                      <span className="text-muted-foreground/40" aria-hidden="true">·</span>
                      <PlatformIcon platform={tile.platform} size={12} className="text-muted-foreground/80" />
                      <span>{tile.platform}</span>
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
        <p className="mt-5 text-center text-[11px] uppercase tracking-[0.14em] text-muted-foreground/50">
          Verbatim, from reviews clients posted where we can't edit them ·{" "}
          <Link to="/client-stories" className="text-primary/70 hover:text-primary transition-colors normal-case tracking-normal">
            the full record
          </Link>
        </p>
      </div>
    </section>
  );
};

export default TrustTicker;
