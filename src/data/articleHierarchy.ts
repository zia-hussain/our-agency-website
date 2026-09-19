// Editorial hierarchy for the Articles hub and the nav's "Featured Reading".
//
// The intellectual system the site presents is Build (what deserves to be
// built now?), Fix (rescue, stabilize, rebuild or audit first?) and Automate
// (is the workflow ready, rules or AI, does a person confirm?). The strongest
// piece for each leads; everything else stays discoverable below it. This is
// only an ordering: article data, URLs and the Previous/Next neighbours are
// unchanged.

export type DecisionLabel = "Fix" | "Automate" | "Build";

/** The hub's Featured band: one flagship per decision, in this order. */
export const FEATURED_ORDER = [
  "should-you-rescue-or-rebuild-your-saas",
  "when-is-ai-automation-the-wrong-choice",
  "build-saas-mvp-in-30-days",
] as const;

/** Which decision each featured piece works through (shown on the hub). */
export const DECISION_LABEL: Record<string, DecisionLabel> = {
  "should-you-rescue-or-rebuild-your-saas": "Fix",
  "when-is-ai-automation-the-wrong-choice": "Automate",
  "build-saas-mvp-in-30-days": "Build",
};

/** The nav dropdown's "Featured Reading": the three flagships plus Decision Room. */
export const NAV_FEATURED_ORDER = [...FEATURED_ORDER, "decision-room-001-liftly-sequencing"] as const;

/** Full list order on the hub: decision pieces first, supporting guides below. */
export const INDEX_ORDER = [
  ...NAV_FEATURED_ORDER,
  "taking-over-a-saas-from-another-dev-team",
  "signs-your-saas-needs-stabilization-not-rebuild",
  "why-software-projects-get-stuck",
  "ai-automation-business-growth",
  "mobile-app-development-flutter-react-native",
  "what-we-learned-building-50-projects",
  "no-code-automation-zapier-make-n8n",
  "react-nodejs-best-practices-2024",
  "firebase-complete-guide-pakistani-developers",
] as const;

interface HasSlug {
  slug: string;
}

/** Orders by `order`; anything not listed keeps its original relative order at the end. */
export function sortByOrder<T extends HasSlug>(items: T[], order: readonly string[]): T[] {
  const rank = (slug: string) => {
    const i = order.indexOf(slug);
    return i === -1 ? order.length : i;
  };
  return [...items].sort((a, b) => rank(a.slug) - rank(b.slug));
}

/** Picks the listed slugs, in order, skipping any that do not exist. */
export function pickInOrder<T extends HasSlug>(items: T[], order: readonly string[]): T[] {
  return order.map((slug) => items.find((a) => a.slug === slug)).filter((a): a is T => Boolean(a));
}
