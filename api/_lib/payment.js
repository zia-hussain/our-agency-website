// The provider-neutral payment boundary (audit Section 11 / brief Section
// 6+11). Nothing outside this file is allowed to know whether a payment
// provider is configured, or which one. Today: unconfigured, so this module
// always returns null links and the UI/email layers render an honest
// "we'll send you a secure payment link" fallback instead of a dead button.
//
// TO PLUG IN A REAL PROVIDER LATER:
//   Set PAYMENT_PROVIDER to a name ("stripe", "paddle", "manual-invoice", …)
//   and PAYMENT_LINK_STANDARD to that provider's hosted payment-link URL for
//   the $750 Product Rescue Assessment (a Stripe Payment Link, a Paddle
//   checkout link, whatever the chosen provider calls it). getPaymentLink()
//   below is the only place that needs to change if a provider ever needs
//   per-applicant dynamic URLs instead of one static link — nothing that
//   calls it (emails, the landing page, the application flow) needs to
//   change.
//
//   For webhook-verified payment confirmation (recommended once a provider
//   is chosen): point the provider's webhook at a new api/payment-webhook.js
//   that validates the provider's signature and then calls the exact same
//   markApplicationPaid() transition that api/internal/payment-verified.js
//   calls today for manual/testing confirmation. That transition function
//   already contains all the "what happens when payment becomes verified"
//   logic (Airtable update, Notion stage move, Day-0 email) — a webhook
//   should only ever be a new way to *trigger* it, never a rewrite of it.

export const getPaymentProviderName = () => process.env.PAYMENT_PROVIDER || null;

// Offer slug -> its own payment-link env var. product-rescue keeps the
// original, un-prefixed PAYMENT_LINK_STANDARD (zero behavior change for the
// live/frozen offer); idea-to-build and manual-to-system get their own
// vars because they're priced differently ($950 and $750, not $750) — one
// shared var would have silently sent every offer to the same link/price
// the moment any provider was ever configured (2026-09-30 BUILD/AUTOMATE
// expansion).
const PAYMENT_LINK_ENV_VAR = {
  "product-rescue": "PAYMENT_LINK_STANDARD",
  "idea-to-build": "PAYMENT_LINK_IDEA_TO_BUILD",
  "manual-to-system": "PAYMENT_LINK_MANUAL_TO_SYSTEM",
};

export const isPaymentConfigured = (offerSlug = "product-rescue") =>
  Boolean(process.env[PAYMENT_LINK_ENV_VAR[offerSlug] || "PAYMENT_LINK_STANDARD"]);

/**
 * Returns the URL an applicant should be sent to pay, or null if no
 * provider is configured yet for that specific offer. `referenceToken` is
 * accepted now so a future provider that supports per-session URLs (e.g.
 * Stripe's client_reference_id query param) can be wired in without
 * changing this function's signature — it is unused while only a static
 * link exists.
 */
export const getPaymentLink = (offerSlug, referenceToken) => {
  const envVar = PAYMENT_LINK_ENV_VAR[offerSlug] || "PAYMENT_LINK_STANDARD";
  const base = process.env[envVar];
  if (!base) return null;
  try {
    const url = new URL(base);
    if (referenceToken) url.searchParams.set("client_reference_id", referenceToken);
    return url.toString();
  } catch {
    return base;
  }
};
