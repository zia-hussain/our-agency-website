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

export const isPaymentConfigured = () => Boolean(process.env.PAYMENT_LINK_STANDARD);

/**
 * Returns the URL an applicant should be sent to pay, or null if no
 * provider is configured yet. `referenceToken` is accepted now so a future
 * provider that supports per-session URLs (e.g. Stripe's client_reference_id
 * query param) can be wired in without changing this function's signature —
 * it is unused while only a static link exists.
 */
export const getPaymentLink = (offerSlug, referenceToken) => {
  const base = process.env.PAYMENT_LINK_STANDARD;
  if (!base) return null;
  try {
    const url = new URL(base);
    if (referenceToken) url.searchParams.set("client_reference_id", referenceToken);
    return url.toString();
  } catch {
    return base;
  }
};
