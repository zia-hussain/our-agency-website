// Server-side offer registry. Deliberately a small, separate file from
// src/config/offers.ts rather than a shared import: /api functions in this
// repo run as plain Node (no TS/bundler step — see every other file in
// api/), while src/ is Vite/TypeScript. The two files must be kept in sync
// by hand; each field here only exists because a server-side template
// (email or Notion/Airtable write) needs it, so the surface that can drift
// is intentionally tiny (name + price per offer, not the full landing-page
// copy).
//
// Three offers as of the BUILD/AUTOMATE expansion (2026-09-30). All three
// share one Airtable table and one Notion database — airtableTable() is
// deliberately offer-independent (same env var/default for every entry);
// notionOfferPageId() is the one genuinely per-offer lookup, each pointing
// at that offer's own row in the Notion Offer Library so new opportunities
// land pre-linked to the right offer, never Product Rescue's by accident.
export const OFFERS = {
  "product-rescue": {
    slug: "product-rescue",
    name: "Product Rescue Assessment",
    category: "FIX",
    price: 750,
    airtableTable: () => process.env.AIRTABLE_OFFER_APPLICATIONS_TABLE || "Offer Applications",
    notionOfferPageId: () => process.env.NOTION_PRODUCT_RESCUE_OFFER_PAGE_ID || null,
  },
  "idea-to-build": {
    slug: "idea-to-build",
    name: "Idea-to-Build Sprint",
    category: "BUILD",
    price: 950,
    airtableTable: () => process.env.AIRTABLE_OFFER_APPLICATIONS_TABLE || "Offer Applications",
    notionOfferPageId: () => process.env.NOTION_IDEA_TO_BUILD_OFFER_PAGE_ID || null,
  },
  "manual-to-system": {
    slug: "manual-to-system",
    name: "Manual-to-System Sprint",
    category: "AUTOMATE",
    price: 750,
    airtableTable: () => process.env.AIRTABLE_OFFER_APPLICATIONS_TABLE || "Offer Applications",
    notionOfferPageId: () => process.env.NOTION_MANUAL_TO_SYSTEM_OFFER_PAGE_ID || null,
  },
};

export const getOffer = (slug) => OFFERS[slug] || null;

// The one Airtable table every offer's applications live in — a plain
// constant, not per-offer, so callers that only need the table name (the
// qualification/payment/status endpoints, which look a record up by its
// globally-unique Reference Token and only need to know *which offer that
// record belongs to* after the fact) never have to guess a slug first.
export const getApplicationsTableName = () => process.env.AIRTABLE_OFFER_APPLICATIONS_TABLE || "Offer Applications";
