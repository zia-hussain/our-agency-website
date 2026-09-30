// Per-offer copy for the six customer-facing transactional templates in
// offerEmails.js. Exists because those templates share one HTML structure
// but not one offer's facts: price, boundary, deliverable name, and what's
// required before the delivery clock starts are all genuinely different
// per offer (2026-09-30 BUILD/AUTOMATE expansion).
//
// "product-rescue" below is transcribed verbatim from the strings the
// templates hardcoded before this file existed — byte-identical output,
// checked by diffing a pre-refactor render snapshot against the
// post-refactor one. Product Rescue is frozen; this file must never be the
// place that quietly changes what it says.
import { BRAND } from "./offerEmailShell.js";

const SITE = "https://zumetrix.com";

export const OFFER_COPY = {
  "product-rescue": {
    ctaLabelAccepted: "Start My Assessment",
    ctaLabelDelivered: "Open your Rescue Brief",
    applicationReceivedPreheader: "We have what we need to review whether Product Rescue is the right next step.",
    applicationReceived: {
      step2: "If it's a fit, we confirm the exact boundary and send a secure way to pay — the $750 assessment stays $750 unless the product genuinely needs a custom scope, and we'll say so plainly if it does.",
      step3: "The 5-business-day clock starts once payment, a short intake, and access/evidence are all ready — not the moment you pay.",
      closingLine: `If Product Rescue turns out not to be the right fit for your situation, we'll say so directly and point you at whatever actually helps — including our free <a href="${SITE}/rescue-or-rebuild" style="color:${BRAND.accent};">rescue-or-rebuild diagnostic</a>, which needs no application at all.`,
    },
    accepted: {
      title: "You're a fit for the Product Rescue Assessment.",
      introSuffix: "is exactly the kind of situation this assessment is built for.",
      metrics: [
        { label: "Price", value: "$750" },
        { label: "Boundary", value: "One bounded product" },
        { label: "Delivery", value: "5 business days after access is ready" },
      ],
      whatYouReceive: "A Rescue Brief: what to keep, what to fix, where replacement is actually justified, and what should happen next — plus a short walkthrough call.",
      notIncluded: "Implementation, exhaustive QA, a line-by-line code audit, penetration testing, or a guaranteed rebuild recommendation.",
      requiredBeforeClock: "A short intake form and read access to the product (or the evidence needed to assess it).",
      ownershipCallout: "The Brief is yours either way. Use your own team, another team, or ask us to implement it — the assessment doesn't assume the answer.",
    },
    customScope: {
      title: "This needs a scoped conversation, not a standard assessment.",
      introSuffix: "It's a genuine rescue situation — but fitting it inside the standard $750 / one-product / 5-day boundary would mean promising more than a bounded assessment can responsibly cover.",
    },
    decline: {
      title: "This probably isn't the right fit — here's what is.",
      declineIntroNoun: "product assessment",
      steps: [
        `Run the free <a href="${SITE}/rescue-or-rebuild" style="color:${BRAND.accent};">rescue-or-rebuild diagnostic</a> — four questions, an honest directional read, no application needed.`,
        `Read <a href="${SITE}/articles/should-you-rescue-or-rebuild-your-saas" style="color:${BRAND.accent};">the decision framework</a> the diagnostic is built on.`,
        `If none of that fits either, just reply to this email and tell us what's actually going on — we'll point you somewhere useful.`,
      ],
      cta: { href: `${SITE}/rescue-or-rebuild`, label: "Run the free diagnostic" },
    },
    paymentReceived: {
      accessLabel: "Access & evidence",
      clockSuffix: "intake and access/evidence are both ready",
      statusCtaLabel: "View your assessment status",
    },
    delivered: {
      eyebrow: "Assessment delivered",
      title: "Your Rescue Brief is ready.",
      introNoun: "assessment",
      callout: "From here, three paths are equally valid: use your own team, bring in another company, or ask us to execute it. The Brief works regardless of which one you pick.",
    },
  },

  "idea-to-build": {
    ctaLabelAccepted: "Start My Sprint",
    ctaLabelDelivered: "Open your V1 Brief",
    applicationReceivedPreheader: "We have what we need to review whether Idea-to-Build is the right next step.",
    applicationReceived: {
      step2: "If it's a fit, we confirm the exact boundary and send a secure way to pay — the $950 sprint stays $950 unless the idea genuinely needs a custom scope, and we'll say so plainly if it does.",
      step3: "The 5-business-day clock starts once payment, a short intake, and the context we need are all ready — not the moment you pay.",
      closingLine: `If Idea-to-Build turns out not to be the right fit, we'll say so directly — including pointing you at <a href="${SITE}/product-rescue" style="color:${BRAND.accent};">Product Rescue</a> or <a href="${SITE}/manual-to-system" style="color:${BRAND.accent};">Manual-to-System</a> if one of those actually fits better. Just reply and tell us what's going on.`,
    },
    accepted: {
      title: "You're a fit for the Idea-to-Build Sprint.",
      introSuffix: "is exactly the kind of decision this sprint is built for.",
      metrics: [
        { label: "Price", value: "$950" },
        { label: "Boundary", value: "One product concept, one primary V1 decision" },
        { label: "Delivery", value: "5 business days after required context is ready" },
      ],
      whatYouReceive: "A Build-Ready V1 Brief: what the first version needs to prove, the critical user journey, what belongs in V1, what deliberately waits, and what should happen next — plus a founder walkthrough.",
      notIncluded: "Implementation, a clickable prototype, UI design, invented market validation, or a guaranteed outcome for V2 — the sprint is the decision, not those things.",
      requiredBeforeClock: "A short intake form and the context we need to define V1 responsibly — your notes, research, or a working call, whatever's realistic.",
      ownershipCallout: "The Brief is yours either way. Use your own team, another team, or ask us to implement it — the sprint doesn't assume the answer.",
    },
    customScope: {
      title: "This needs a scoped conversation, not a standard sprint.",
      introSuffix: "It's a genuine build decision — but fitting it inside the standard $950 / one-concept / 5-day boundary would mean promising more than a bounded sprint can responsibly cover.",
    },
    decline: {
      title: "This probably isn't the right fit — here's what is.",
      declineIntroNoun: "V1 sprint",
      steps: [
        `If your product already exists and is stuck, fragile, or broken, that's <a href="${SITE}/product-rescue" style="color:${BRAND.accent};">Product Rescue Assessment</a>, not this sprint.`,
        `If the real problem is a manual workflow slowing your team down before any software gets built, that's <a href="${SITE}/manual-to-system" style="color:${BRAND.accent};">Manual-to-System Sprint</a>.`,
        `If neither of those fits either, just reply to this email and tell us what's actually going on — we'll point you somewhere useful.`,
      ],
      cta: undefined,
    },
    paymentReceived: {
      accessLabel: "Context & materials",
      clockSuffix: "intake and the context we need are both ready",
      statusCtaLabel: "View your sprint status",
    },
    delivered: {
      eyebrow: "Sprint delivered",
      title: "Your Build-Ready V1 Brief is ready.",
      introNoun: "sprint",
      callout: "From here, three paths are equally valid: use your own team, bring in another company, or ask us to implement it. The Brief works regardless of which one you pick.",
    },
  },

  "manual-to-system": {
    ctaLabelAccepted: "Start My Sprint",
    ctaLabelDelivered: "Open your System Plan",
    applicationReceivedPreheader: "We have what we need to review whether Manual-to-System is the right next step.",
    applicationReceived: {
      step2: "If it's a fit, we confirm the exact boundary and send a secure way to pay — the $750 sprint stays $750 unless the workflow genuinely needs a custom scope, and we'll say so plainly if it does.",
      step3: "The 5-business-day clock starts once payment, a short intake, and the workflow context we need are all ready — not the moment you pay.",
      closingLine: `If Manual-to-System turns out not to be the right fit, we'll say so directly — including pointing you at <a href="${SITE}/product-rescue" style="color:${BRAND.accent};">Product Rescue</a> or <a href="${SITE}/idea-to-build" style="color:${BRAND.accent};">Idea-to-Build</a> if one of those actually fits better. Just reply and tell us what's going on.`,
    },
    accepted: {
      title: "You're a fit for the Manual-to-System Sprint.",
      introSuffix: "is exactly the kind of workflow this sprint is built for.",
      metrics: [
        { label: "Price", value: "$750" },
        { label: "Boundary", value: "One bounded workflow" },
        { label: "Delivery", value: "5 business days after required input is ready" },
      ],
      whatYouReceive: "A Workflow System Plan: the current workflow reality, what should be removed, simplified, connected, or automated, what should stay human, and an implementation sequence — plus a founder/operator walkthrough.",
      notIncluded: "Implementation, a specific automation build, an invented hours-saved figure, or a recommendation to automate everything — the plan is the decision, not those things.",
      requiredBeforeClock: "A short intake form and a walkthrough of the current workflow — a Loom, screenshots, or a working call, whatever's realistic.",
      ownershipCallout: "The Plan is yours either way. Use your own team, another team, or ask us to implement it — the sprint doesn't assume the answer.",
    },
    customScope: {
      title: "This needs a scoped conversation, not a standard sprint.",
      introSuffix: "It's a genuine system decision — but fitting it inside the standard $750 / one-workflow / 5-day boundary would mean promising more than a bounded sprint can responsibly cover.",
    },
    decline: {
      title: "This probably isn't the right fit — here's what is.",
      declineIntroNoun: "workflow sprint",
      steps: [
        `If the real problem is an existing software product that's stuck or broken, that's <a href="${SITE}/product-rescue" style="color:${BRAND.accent};">Product Rescue Assessment</a>.`,
        `If you actually have a new product idea that needs software built, that's <a href="${SITE}/idea-to-build" style="color:${BRAND.accent};">Idea-to-Build Sprint</a>.`,
        `If neither of those fits either, just reply to this email and tell us what's actually going on — we'll point you somewhere useful.`,
      ],
      cta: undefined,
    },
    paymentReceived: {
      accessLabel: "Workflow context",
      clockSuffix: "intake and the workflow context we need are both ready",
      statusCtaLabel: "View your sprint status",
    },
    delivered: {
      eyebrow: "Sprint delivered",
      title: "Your Workflow System Plan is ready.",
      introNoun: "sprint",
      callout: "From here, three paths are equally valid: use your own team, bring in another company, or ask us to implement it. The Plan works regardless of which one you pick.",
    },
  },
};

export const getOfferCopy = (offerSlug) => OFFER_COPY[offerSlug] || OFFER_COPY["product-rescue"];
