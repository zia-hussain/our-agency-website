// The offer registry the frontend reads from. Product Rescue is the only
// entry today (Section 2/3 of the mission: launch one offer, build the
// pattern so Idea-to-Build and Manual-to-System can be added as entries
// later without new page architecture) — deliberately not a generic "Offer
// Engine," just a typed object literal a future offer can copy.
//
// A parallel, smaller registry exists server-side at api/_lib/offers.js —
// see that file's header comment for why it isn't a shared import.

export type OfferCategory = "FIX" | "BUILD" | "AUTOMATE";

export interface OfferDefinition {
  slug: string;
  category: OfferCategory;
  name: string;
  price: number;
  boundary: string;
  deliveryRule: string;
  corePromise: string;
}

export const OFFERS: Record<string, OfferDefinition> = {
  "product-rescue": {
    slug: "product-rescue",
    category: "FIX",
    name: "Product Rescue Assessment",
    price: 750,
    boundary: "One bounded software product",
    deliveryRule: "5 business days after required access/evidence is ready",
    corePromise: "Before you rebuild your product, find out what actually needs rebuilding.",
  },
  "idea-to-build": {
    slug: "idea-to-build",
    category: "BUILD",
    name: "Idea-to-Build Sprint",
    price: 950,
    boundary: "One product concept, one primary V1 decision",
    deliveryRule: "5 business days after required context is ready",
    corePromise: "Version 1 does not need to contain the future. It needs to earn the future.",
  },
  "manual-to-system": {
    slug: "manual-to-system",
    category: "AUTOMATE",
    name: "Manual-to-System Sprint",
    price: 750,
    boundary: "One bounded workflow",
    deliveryRule: "5 business days after required input is ready",
    corePromise: "Your team should not be the integration. Automation has to earn its place.",
  },
};

export const getOffer = (slug: string): OfferDefinition | undefined => OFFERS[slug];

// What best describes where you're stuck? — the application's first,
// branching question (brief Section 5). The value is what's sent to the
// server and stored in Airtable; the label is what the button shows.
export const SITUATION_TYPES: { value: string; label: string }[] = [
  { value: "product-breaking", label: "Product keeps breaking" },
  { value: "development-stalled", label: "Development has stalled" },
  { value: "considering-rebuild", label: "I'm considering rebuilding" },
  { value: "inherited-product", label: "I inherited the product" },
  { value: "distrust-direction", label: "I don't trust the current direction" },
  { value: "something-else", label: "Something else" },
];
