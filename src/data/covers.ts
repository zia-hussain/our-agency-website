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


/** Case-specific covers: the most visible cases get an object that belongs to
 *  their own story (same field, light and copper accent as the category
 *  family). Fast Track keeps its hand-authored timeline; cases not listed here
 *  fall back to their category cover. Artwork: scripts/covers/build-case-covers.mjs */
const caseCover = (file: string, concept: string, alt: string): Cover => ({
  src: `${P}/cover-${file}.svg`,
  srcSet: `${P}/cover-${file}-800.webp 800w, ${P}/cover-${file}-1600.webp 1600w`,
  sizes: "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw",
  width: 1200,
  height: 900,
  alt,
  og: `${P}/cover-${file}-og.png`,
  ogAlt: alt,
  concept,
});

export const CASE_COVERS: Record<string, Cover> = {
  "knipsr-event-media-saas": caseCover("knipsr-aperture", "Camera iris: eight dark blades closing on the light, one copper blade among them", "A camera iris seen head-on: eight dark overlapping blades around a small bright opening, one blade in copper, lit softly from the upper left."),
  "floating-stone-ranch-processor-intake-engine": caseCover("ranch-crate-tag", "Cold-room crate: one copper tag on a hook — every box traceable", "A dark wooden crate in cold light, frost on its lid, with a single copper tag hanging from a hook on its front."),
  "forlag-publishing-sales-inventory-dashboard": caseCover("forlag-spines", "Shelf of dark book spines, one copper spine pulled forward", "A short row of dark book spines on a shelf, one spine in copper pulled forward and catching the light."),
  "skill-x-swap-mvp": caseCover("swap-rings", "Two interlocking rings: one dark, one copper — an exchange", "Two interlocking rings on a dark field, one dark stone and one copper, each passing through the other."),
  "first-north-peptides-website-ai-concierge": caseCover("peptides-vial", "A dark glass vial with a copper cap, glowing faintly from within", "A single dark glass vial with a ridged copper cap, a soft warm glow inside its lower half, lit from the upper left."),
  "learning-platform-saas-stabilization": caseCover("platform-stair", "A dark staircase with hairline cracks low down, the third tread faced in copper", "A short flight of dark stone stairs seen from a three-quarter angle, hairline cracks in the two lowest risers, the third tread faced in copper."),
  "liftly-operational-mvp-v1": caseCover("liftly-stack-band", "A folded stack of dark cloth bound by one copper band", "A neat stack of folded dark cloth, bound around the middle by a single copper band with a small clasp."),
  "tomo-voice-ai-companion": caseCover("tomo-speaker", "A speaker cone, one copper concentric ring — a single voice", "A dark speaker cone seen head-on, concentric rings stepping inward to a domed centre, with one ring in copper."),
  "hjelpna-handyman-marketplace": caseCover("hjelpna-hex-nut", "A dark hex nut, one copper thread catching the light", "A heavy dark hexagonal nut seen from above, its bore dark, with one thread inside picked out in copper."),
  "pawspace-pet-services-marketplace": caseCover("pawspace-tag", "A flat blank pet tag, copper split ring through its edge", "A flat round dark pet tag, blank, lying at a slight angle, with a copper split ring through the hole at its edge."),
  "bondfire-event-booking-app": caseCover("bondfire-ember", "A single copper ember among cold charcoal", "One glowing copper ember resting among pieces of cold dark charcoal, its light falling on the pieces nearest it."),
};

export const coverForProject = (p: ProjectLike): Cover => {
  if (CASE_COVERS[p.slug]) return CASE_COVERS[p.slug];
  const base = PROJECT_COVERS[coverKeyForProject(p)];
  const v = variantFor(p.slug);
  // Two automation cases sit side by side in the archive and hash to the
  // same variant; mirror one by hand so the pair doesn't read as a copy.
  const flip = FORCE_FLIP.has(p.slug) ? !v.flip : v.flip;
  return { ...base, flip: flip ? !base.flip : base.flip, shift: v.shift };
};
const FORCE_FLIP = new Set(["twilio-conference-call-logic"]);

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
