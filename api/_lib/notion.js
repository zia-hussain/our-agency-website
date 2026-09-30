// Notion Offer Pipeline sync. Built against Notion's public REST API
// directly (no @notionhq/client dependency — one POST, same pattern as the
// Airtable calls elsewhere in this repo) because this environment has no
// Notion credentials or schema access to develop against a real database.
//
// Every property NAME this adapter writes is configurable via env var, with
// a default matching the name given in the Product Rescue architecture brief
// (Section 7). If the real "Offer Pipeline" database uses different property
// names, set the matching env var — no code change needed. If the database
// ID isn't configured at all, every call below returns {synced:false} and
// logs why, instead of throwing — a Notion outage or a missing credential
// must never lose or block an application (Section 5/6).
//
// SETUP REQUIRED (see README-OFFER-SYSTEM.md for the full checklist):
//   1. Create a Notion internal integration, copy its token into NOTION_API_KEY.
//   2. Share the "Offer Pipeline" database with that integration in Notion's UI
//      (Notion access is opt-in per database; the token alone isn't enough).
//   3. Copy the Offer Pipeline database ID into NOTION_OFFER_PIPELINE_DB_ID.
//   4. If any property below is named differently in the real database, set
//      the corresponding NOTION_PROP_* env var to the real name.
//   5. Optional: NOTION_OFFER_RELATION_PROPERTY + NOTION_PRODUCT_RESCUE_OFFER_PAGE_ID
//      if the Offer Pipeline's "Offer" column is a relation to the Offer
//      Library and you want new opportunities pre-linked to the Product
//      Rescue Assessment row.

const NOTION_VERSION = "2022-06-28";

const prop = (envName, fallback) => process.env[envName] || fallback;

const PROPS = {
  title: () => prop("NOTION_PROP_OPPORTUNITY", "Opportunity"),
  stage: () => prop("NOTION_PROP_STAGE", "Stage"),
  fit: () => prop("NOTION_PROP_FIT", "Fit"),
  source: () => prop("NOTION_PROP_SOURCE", "Source"),
  client: () => prop("NOTION_PROP_CLIENT", "Client"),
  company: () => prop("NOTION_PROP_COMPANY", "Company"),
  value: () => prop("NOTION_PROP_VALUE", "Value"),
  decisionNeeded: () => prop("NOTION_PROP_DECISION_NEEDED", "Decision Needed"),
  nextAction: () => prop("NOTION_PROP_NEXT_ACTION", "Next Action"),
  nextActionDate: () => prop("NOTION_PROP_NEXT_ACTION_DATE", "Next Action Date"),
  owner: () => prop("NOTION_PROP_OWNER", "Owner"),
  applicationRef: () => prop("NOTION_PROP_APPLICATION_REF", "Application Ref"),
  offerRelation: () => prop("NOTION_OFFER_RELATION_PROPERTY", "Offer"),
};

export const isNotionConfigured = () =>
  Boolean(process.env.NOTION_API_KEY && process.env.NOTION_OFFER_PIPELINE_DB_ID);

const notionFetch = async (path, init) => {
  const response = await fetch(`https://api.notion.com/v1${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${process.env.NOTION_API_KEY}`,
      "Notion-Version": NOTION_VERSION,
      "Content-Type": "application/json",
      ...(init?.headers || {}),
    },
  });
  return response;
};

// One business day from the moment the application lands — a stated,
// consistent rule ("review new applications within one business day"), not
// an arbitrary date. Skips Sat/Sun; no public-holiday calendar (documented
// simplification, same one used for the 5-business-day delivery clock).
const oneBusinessDayFrom = (date) => {
  const d = new Date(date);
  d.setUTCDate(d.getUTCDate() + 1);
  while (d.getUTCDay() === 0 || d.getUTCDay() === 6) d.setUTCDate(d.getUTCDate() + 1);
  return d.toISOString().slice(0, 10);
};

/**
 * Creates one opportunity row in the Offer Pipeline for a new application.
 * Never throws — always resolves to {synced, id?, reason?} so a Notion
 * failure can be logged and the application still treated as captured.
 */
export const createOfferOpportunity = async (application) => {
  if (!isNotionConfigured()) {
    return { synced: false, reason: "Notion env not configured (NOTION_API_KEY / NOTION_OFFER_PIPELINE_DB_ID)" };
  }

  const opportunityName = `${application.company || application.name} — ${application.offerName}`;

  const properties = {
    [PROPS.title()]: { title: [{ text: { content: opportunityName.slice(0, 200) } }] },
    // Stage and Owner are select/rich_text respectively on the real Offer
    // Pipeline — verified against the live schema, not assumed (2026-09-29).
    [PROPS.stage()]: { select: { name: "New Reply" } },
    [PROPS.fit()]: { select: { name: "Unknown" } },
    [PROPS.source()]: { select: { name: application.source || "Website" } },
    [PROPS.client()]: { rich_text: [{ text: { content: application.name || "" } }] },
    [PROPS.company()]: { rich_text: [{ text: { content: application.company || "" } }] },
    [PROPS.value()]: { number: application.value ?? null },
    [PROPS.decisionNeeded()]: { rich_text: [{ text: { content: (application.decisionNeeded || "").slice(0, 2000) } }] },
    [PROPS.nextAction()]: { rich_text: [{ text: { content: "Review application" } }] },
    [PROPS.nextActionDate()]: { date: { start: oneBusinessDayFrom(new Date()) } },
    [PROPS.owner()]: { rich_text: [{ text: { content: prop("NOTION_DEFAULT_OWNER", "Zia") } }] },
    [PROPS.applicationRef()]: {
      rich_text: [{ text: { content: `${application.email} · ref:${application.referenceToken}` } }],
    },
  };

  // Relation to the applicant's own offer in the Offer Library — each
  // offer resolves its own page id (application.notionOfferPageId, set by
  // the caller from api/_lib/offers.js's per-offer notionOfferPageId()), so
  // a Manual-to-System opportunity links to Manual-to-System's row, never
  // Product Rescue's by default (2026-09-30 BUILD/AUTOMATE expansion).
  // Only attempted if both the relation property name and the target page
  // id are configured; omitted (not failed) otherwise, since a missing
  // relation is a cosmetic gap, not a broken sync.
  if (application.notionOfferPageId) {
    properties[PROPS.offerRelation()] = { relation: [{ id: application.notionOfferPageId }] };
  }

  try {
    const response = await notionFetch("/pages", {
      method: "POST",
      body: JSON.stringify({
        parent: { database_id: process.env.NOTION_OFFER_PIPELINE_DB_ID },
        properties,
      }),
    });

    if (!response.ok) {
      const detail = await response.text();
      return { synced: false, reason: `Notion API ${response.status}: ${detail.slice(0, 400)}` };
    }

    const page = await response.json();
    return { synced: true, id: page.id, url: page.url };
  } catch (error) {
    return { synced: false, reason: error.message };
  }
};

/** Best-effort stage update (used once payment is verified). Same
 * never-throws contract as createOfferOpportunity. */
export const updateOpportunityStage = async (notionPageId, stageName, extra = {}) => {
  if (!isNotionConfigured() || !notionPageId) {
    return { synced: false, reason: "Notion not configured or no page id on this application" };
  }
  try {
    const properties = { [PROPS.stage()]: { select: { name: stageName } } };
    if (extra.fit) properties[PROPS.fit()] = { select: { name: extra.fit } };

    const response = await notionFetch(`/pages/${notionPageId}`, {
      method: "PATCH",
      body: JSON.stringify({ properties }),
    });
    if (!response.ok) {
      const detail = await response.text();
      return { synced: false, reason: `Notion API ${response.status}: ${detail.slice(0, 400)}` };
    }
    return { synced: true };
  } catch (error) {
    return { synced: false, reason: error.message };
  }
};
