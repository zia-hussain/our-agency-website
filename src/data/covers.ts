/**
 * COVER SYSTEM — one authored family of category-led visuals.
 *
 * Portfolio cards and article cards never show a client's real interface
 * (permission, consistency and truth problems) and never show stock. Each
 * category/cluster gets one lit physical object that carries one idea, in
 * the site's own palette, drawn as SVG (crisp at any size) with raster OG
 * siblings for social previews. Project titles, clients, quotes and article
 * headlines stay in HTML — the image creates curiosity, the HTML carries
 * the information.
 *
 * Source of the artwork: scripts/covers/build-covers.mjs (regenerates the
 * SVGs) and scripts/covers/render-covers.mjs (WebP/PNG + OG variants).
 * Hand-authored evidence diagrams (Fast Track timeline, the five article
 * diagrams) are not covers and keep their own paths in the data files.
 */

export type CoverKey =
  | "product-rescue"
  | "saas-product"
  | "automation"
  | "web-application"
  | "mobile-application"
  | "internal-system";

export type ArticleCoverKey =
  | "repair-or-rebuild"
  | "what-belongs-in-v1"
  | "reliable-automation"
  | "taking-over-code"
  | "field-notes"
  | "development-guides";

export interface Cover {
  /** 0 = centred, 1 = object sits slightly left/up, 2 = slightly right/down (listing variety). */
  shift?: 0 | 1 | 2;
  /** Vector master — use as <img src> (crisp, ~5–10 KB). */
  src: string;
  /** Raster siblings for srcSet (1x/2x WebP). */
  srcSet: string;
  sizes: string;
  width: number;
  height: number;
  /** Describes the picture and its category; never the project name. */
  alt: string;
  /** 1200×630 share image (PNG — the broadest crawler support). */
  og: string;
  ogAlt: string;
  /** Short name of the idea, for captions/aria where useful. */
  concept: string;
  /** Mirror the composition so two neighbours from one cluster don't read
   *  as duplicates (set per article, never per category). */
  flip?: boolean;
}

const P = "/project_images/covers";
const A = "/article_images/covers";

const PROJECT_COVERS: Record<CoverKey, Cover> = {
  "product-rescue": {
    src: `${P}/cover-product-rescue.svg`,
    srcSet: `${P}/cover-product-rescue-800.webp 800w, ${P}/cover-product-rescue-1600.webp 1600w`,
    sizes: "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw",
    width: 1200,
    height: 900,
    alt: "A dark stone slab whose fractures have been mended with seams of copper, lit from one side — the mark of product rescue work.",
    og: `${P}/cover-product-rescue-og.png`,
    ogAlt: "Product rescue case study — a fractured stone slab mended with copper.",
    concept: "Kintsugi: the repair becomes the strongest line",
  },
  "saas-product": {
    src: `${P}/cover-saas-product.svg`,
    srcSet: `${P}/cover-saas-product-800.webp 800w, ${P}/cover-saas-product-1600.webp 1600w`,
    sizes: "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw",
    width: 1200,
    height: 900,
    alt: "A dark stone arch held together by a single glowing copper keystone — a SaaS product built around the one decision that holds it up.",
    og: `${P}/cover-saas-product-og.png`,
    ogAlt: "SaaS product case study — a stone arch with a copper keystone.",
    concept: "Keystone: the one decision the first version rests on",
  },
  automation: {
    src: `${P}/cover-automation.svg`,
    srcSet: `${P}/cover-automation-800.webp 800w, ${P}/cover-automation-1600.webp 1600w`,
    sizes: "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw",
    width: 1200,
    height: 900,
    alt: "A Newton's cradle of dark spheres with one copper sphere caught mid-swing — a system that keeps running once it is set in motion.",
    og: `${P}/cover-automation-og.png`,
    ogAlt: "Automation case study — a Newton's cradle with one copper sphere in motion.",
    concept: "Newton's cradle: set it in motion once",
  },
  "web-application": {
    src: `${P}/cover-web-application.svg`,
    srcSet: `${P}/cover-web-application-800.webp 800w, ${P}/cover-web-application-1600.webp 1600w`,
    sizes: "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw",
    width: 1200,
    height: 900,
    alt: "A dark ledger plate with rows cut into it and one copper row raised and lit — operational software that makes one record visible.",
    og: `${P}/cover-web-application-og.png`,
    ogAlt: "Web application case study — a ledger plate with one copper row raised.",
    concept: "Ledger: the operation made visible",
  },
  "mobile-application": {
    src: `${P}/cover-mobile-application.svg`,
    srcSet: `${P}/cover-mobile-application-800.webp 800w, ${P}/cover-mobile-application-1600.webp 1600w`,
    sizes: "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw",
    width: 1200,
    height: 900,
    alt: "A smooth dark stone shaped to fit a hand, with a rim of copper light along its edge — software that lives in someone's hand.",
    og: `${P}/cover-mobile-application-og.png`,
    ogAlt: "Mobile application case study — a hand-sized dark stone with a copper rim of light.",
    concept: "River stone: made to be held",
  },
  "internal-system": {
    src: `${P}/cover-internal-system.svg`,
    srcSet: `${P}/cover-internal-system-800.webp 800w, ${P}/cover-internal-system-1600.webp 1600w`,
    sizes: "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw",
    width: 1200,
    height: 900,
    alt: "Nested dark boxes opening inward to one copper-edged compartment — an internal system built around the record that matters.",
    og: `${P}/cover-internal-system-og.png`,
    ogAlt: "Internal system case study — nested boxes with one copper-edged compartment.",
    concept: "Nested boxes: the record inside the operation",
  },
};

const ARTICLE_COVERS: Record<ArticleCoverKey, Cover> = {
  "repair-or-rebuild": {
    src: `${A}/cover-repair-or-rebuild.svg`,
    srcSet: `${A}/cover-repair-or-rebuild-800.webp 800w, ${A}/cover-repair-or-rebuild-1600.webp 1600w`,
    sizes: "(min-width: 1024px) 50vw, 100vw",
    width: 1600,
    height: 900,
    alt: "A dark bowl with cracks running down both sides; the cracks on one side are still open, the ones on the other side are mended with copper.",
    og: `${A}/cover-repair-or-rebuild-og.png`,
    ogAlt: "Repair or rebuild — a cracked bowl, half mended in copper.",
    concept: "Half mended, half open",
  },
  "what-belongs-in-v1": {
    src: `${A}/cover-what-belongs-in-v1.svg`,
    srcSet: `${A}/cover-what-belongs-in-v1-800.webp 800w, ${A}/cover-what-belongs-in-v1-1600.webp 1600w`,
    sizes: "(min-width: 1024px) 50vw, 100vw",
    width: 1600,
    height: 900,
    alt: "A block of dark stone carved away to leave one small, precise copper form standing in a cavity.",
    og: `${A}/cover-what-belongs-in-v1-og.png`,
    ogAlt: "What belongs in V1 — a carved block with one copper form left standing.",
    concept: "Everything removed except what has to prove itself",
  },
  "reliable-automation": {
    src: `${A}/cover-reliable-automation.svg`,
    srcSet: `${A}/cover-reliable-automation-800.webp 800w, ${A}/cover-reliable-automation-1600.webp 1600w`,
    sizes: "(min-width: 1024px) 50vw, 100vw",
    width: 1600,
    height: 900,
    alt: "A copper plumb bob hanging perfectly still on a thread above a single marked point on a dark floor.",
    og: `${A}/cover-reliable-automation-og.png`,
    ogAlt: "Reliable automation — a copper plumb bob at rest over its mark.",
    concept: "Plumb: it only works if it is still",
  },
  "taking-over-code": {
    src: `${A}/cover-taking-over-code.svg`,
    srcSet: `${A}/cover-taking-over-code-800.webp 800w, ${A}/cover-taking-over-code-1600.webp 1600w`,
    sizes: "(min-width: 1024px) 50vw, 100vw",
    width: 1600,
    height: 900,
    alt: "A heavy dark rope with one tight knot in it; beyond the knot the rope continues in bright copper.",
    og: `${A}/cover-taking-over-code-og.png`,
    ogAlt: "Where projects get stuck — a dark rope knotted once, then copper beyond it.",
    concept: "The knot, then the clear strand",
  },
  "field-notes": {
    src: `${A}/cover-field-notes.svg`,
    srcSet: `${A}/cover-field-notes-800.webp 800w, ${A}/cover-field-notes-1600.webp 1600w`,
    sizes: "(min-width: 1024px) 50vw, 100vw",
    width: 1600,
    height: 900,
    alt: "A closed dark notebook with its page edges catching the light and a copper ribbon slipping out to mark the place.",
    og: `${A}/cover-field-notes-og.png`,
    ogAlt: "Field notes — a closed notebook with a copper ribbon marker.",
    concept: "The notebook, kept",
  },
  "development-guides": {
    src: `${A}/cover-development-guides.svg`,
    srcSet: `${A}/cover-development-guides-800.webp 800w, ${A}/cover-development-guides-1600.webp 1600w`,
    sizes: "(min-width: 1024px) 50vw, 100vw",
    width: 1600,
    height: 900,
    alt: "A copper try-square resting on a dark stone workbench, lit from above.",
    og: `${A}/cover-development-guides-og.png`,
    ogAlt: "Development guide — a copper try-square on a workbench.",
    concept: "The square: measure before you cut",
  },
};

/* ------------------------------------------------------------------ */
/* Selection                                                           */
/* ------------------------------------------------------------------ */

type ProjectLike = {
  slug: string;
  type?: string;
  category?: string;
  primaryService?: string;
  services?: string[];
  image?: string;
  ogImage?: string;
  heroImageFit?: string;
};

/** A few projects are better served by a category other than their filter
 *  bucket (e.g. a SaaS stabilisation listed under "enterprise"). */
const PROJECT_OVERRIDES: Record<string, CoverKey> = {
  "learning-platform-saas-stabilization": "product-rescue",
  "bondfire-event-booking-app": "product-rescue",
  "floating-stone-ranch-processor-intake-engine": "automation",
  "zumetrix-labs-internal-automation-stack": "internal-system",
  "forlag-publishing-sales-inventory-dashboard": "web-application",
  "hostel-management-system-mern": "internal-system",
  "skill-x-swap-mvp": "mobile-application",
  "hjelpna-handyman-marketplace": "web-application",
  "utility-bill-deal-finder": "saas-product",
  "ifyify-ai-personal-branding": "saas-product",
};

export const coverKeyForProject = (p: ProjectLike): CoverKey => {
  if (PROJECT_OVERRIDES[p.slug]) return PROJECT_OVERRIDES[p.slug];
  if (p.type === "rescue" || p.primaryService === "product-rescue") return "product-rescue";
  if (p.type === "automation" || p.primaryService === "ai-automation") return "automation";
  if (p.type === "mobile" || p.primaryService === "mobile") return "mobile-application";
  if (p.type === "enterprise") return "internal-system";
  if (p.category === "Web Application" && p.primaryService === "web-app") return "web-application";
  return "saas-product";
};

/** True when the project carries its own hand-authored evidence visual
 *  (Fast Track's recovery timeline) that should be shown instead of a
 *  category cover. */
const hasAuthoredVisual = (p: ProjectLike) =>
  Boolean(p.heroImageFit === "contain" || (p.image && /fast-track/.test(p.image)));

// Neighbouring cases in one category would otherwise show the identical
// frame. A stable per-slug variant (mirror, and a slight shift of the object
// in its frame) keeps the family recognisable without reading as copies.
const variantFor = (slug: string): { flip: boolean; shift: 0 | 1 | 2 } => {
  let h = 0;
  for (const ch of slug) h = (h * 31 + ch.charCodeAt(0)) >>> 0;
  return { flip: h % 2 === 1, shift: (h % 3) as 0 | 1 | 2 };
};

export const coverForProject = (p: ProjectLike): Cover => {
  const base = PROJECT_COVERS[coverKeyForProject(p)];
  const v = variantFor(p.slug);
  return { ...base, flip: v.flip ? !base.flip : base.flip, shift: v.shift };
};

/** The image a card/listing should show: the authored evidence diagram where
 *  one exists, otherwise the category cover. */
export const listingImageForProject = (p: ProjectLike): Cover => {
  if (hasAuthoredVisual(p) && p.image) {
    return {
      src: p.image,
      srcSet: "",
      sizes: "",
      width: 1200,
      height: 900,
      alt: "Recovery timeline diagram: roughly two years with the previous team, then launch about three weeks after takeover.",
      og: p.ogImage || p.image,
      ogAlt: "Fast Track USA recovery timeline.",
      concept: "Evidence diagram",
    };
  }
  return coverForProject(p);
};

type ArticleLike = { slug: string; category?: string; heroImage?: string };

const ARTICLE_OVERRIDES: Record<string, ArticleCoverKey> = {
  "should-you-rescue-or-rebuild-your-saas": "repair-or-rebuild",
  "signs-your-saas-needs-stabilization-not-rebuild": "repair-or-rebuild",
  "build-saas-mvp-in-30-days": "what-belongs-in-v1",
  "decision-room-001-liftly-sequencing": "what-belongs-in-v1",
  "when-is-ai-automation-the-wrong-choice": "reliable-automation",
  "ai-automation-business-growth": "reliable-automation",
  "no-code-automation-zapier-make-n8n": "reliable-automation",
  "taking-over-a-saas-from-another-dev-team": "taking-over-code",
  "why-software-projects-get-stuck": "taking-over-code",
  "what-we-learned-building-50-projects": "field-notes",
  "mobile-app-development-flutter-react-native": "field-notes",
  "react-nodejs-best-practices-2024": "development-guides",
  "firebase-complete-guide-pakistani-developers": "development-guides",
};

export const articleCoverKey = (a: ArticleLike): ArticleCoverKey => {
  if (ARTICLE_OVERRIDES[a.slug]) return ARTICLE_OVERRIDES[a.slug];
  const c = (a.category || "").toLowerCase();
  if (c.includes("rescue")) return "repair-or-rebuild";
  if (c.includes("automation")) return "reliable-automation";
  if (c.includes("saas") || c.includes("decision")) return "what-belongs-in-v1";
  if (c.includes("development") || c.includes("mobile")) return "development-guides";
  return "field-notes";
};

const FLIPPED_ARTICLES = new Set([
  "signs-your-saas-needs-stabilization-not-rebuild",
  "decision-room-001-liftly-sequencing",
  "ai-automation-business-growth",
  "why-software-projects-get-stuck",
  "mobile-app-development-flutter-react-native",
  "firebase-complete-guide-pakistani-developers",
]);

export const coverForArticle = (a: ArticleLike): Cover => {
  const base = ARTICLE_COVERS[articleCoverKey(a)];
  return FLIPPED_ARTICLES.has(a.slug) ? { ...base, flip: true } : base;
};

/** Absolute share-image URL for an article: its own OG if the data has
 *  one, otherwise the cluster cover's OG. Replaces the old stock-photo
 *  `image` fields, which are no longer read anywhere. */
export const articleShareImage = (a: ArticleLike & { ogImage?: string }): string => {
  const path = a.ogImage || coverForArticle(a).og;
  return path.startsWith("http") ? path : `https://zumetrix.com${path}`;
};

export const COVER_KEYS = Object.keys(PROJECT_COVERS) as CoverKey[];
export const ARTICLE_COVER_KEYS = Object.keys(ARTICLE_COVERS) as ArticleCoverKey[];
export { PROJECT_COVERS, ARTICLE_COVERS };
