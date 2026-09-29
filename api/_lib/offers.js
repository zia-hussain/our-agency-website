// Server-side offer registry. Deliberately a small, separate file from
// src/config/offers.ts rather than a shared import: /api functions in this
// repo run as plain Node (no TS/bundler step — see every other file in
// api/), while src/ is Vite/TypeScript. The two files must be kept in sync
// by hand; each field here only exists because a server-side template
// (email or Notion/Airtable write) needs it, so the surface that can drift
// is intentionally tiny (name + price per offer, not the full landing-page
// copy).
export const OFFERS = {
  "product-rescue": {
    slug: "product-rescue",
    name: "Product Rescue Assessment",
    category: "FIX",
    price: 750,
    airtableTable: () => process.env.AIRTABLE_OFFER_APPLICATIONS_TABLE || "Offer Applications",
  },
};

export const getOffer = (slug) => OFFERS[slug] || null;
