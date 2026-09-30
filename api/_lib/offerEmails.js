// Every transactional email state for the offer system (audit Section 26).
// Six applicant-facing templates + one internal notification. The six
// customer-facing templates run on the dark, restrained-copper shell in
// api/_lib/offerEmailShell.js (2026-09-29 restyle pass — visual only, no
// change to recipients/subjects/triggers/lifecycle). The internal
// notification stays on the original api/_lib/email.js shell unchanged, per
// instruction that internal notifications don't need the customer-facing
// treatment.
import { BRAND, bodyText, calloutBlock, detailRows, emailShell, metricRow, numberedSteps, sectionLabel, signOff } from "./offerEmailShell.js";
import { escapeHtml, humanize, money } from "./text.js";
import { getPaymentLink } from "./payment.js";
import { getOfferCopy } from "./offerCopy.js";
import * as internalShell from "./email.js";

const SITE = "https://zumetrix.com";

// ---------------------------------------------------------------------------
// 1. APPLICATION RECEIVED — applicant-facing
// ---------------------------------------------------------------------------
export const applicationReceivedHtml = (application) => {
  const offerCopy = getOfferCopy(application.offerSlug);
  const copy = offerCopy.applicationReceived;
  return emailShell({
    preheader: offerCopy.applicationReceivedPreheader,
    eyebrow: "Application received",
    title: "We have what we need to start.",
    intro: `Hey ${escapeHtml(application.name || "there")}, thank you for the context on ${escapeHtml(application.productName || "your product")}. We review every application by hand before asking anyone to spend anything — here's exactly what happens next.`,
    content: `
      ${metricRow([
        { label: "Offer", value: application.offerName, emphasis: true },
        { label: "Standard price", value: money(application.value) },
        { label: "Review window", value: "Within 1 business day" },
      ])}
      <div style="margin-top:32px;">
        ${sectionLabel("What happens next")}
        ${numberedSteps([
          ["01", "We read the application and decide whether this is a standard fit, needs a custom scope, or isn't the right tool for the situation."],
          ["02", copy.step2],
          ["03", copy.step3],
        ])}
      </div>
      <p style="margin:26px 0 0;color:${BRAND.muted};font-size:14px;line-height:1.75;">${copy.closingLine}</p>
      ${signOff()}
    `,
  });
};

// ---------------------------------------------------------------------------
// 2. ACCEPTED — STANDARD FIT — applicant-facing
// ---------------------------------------------------------------------------
export const acceptedStandardFitHtml = (application) => {
  const paymentLink = getPaymentLink(application.offerSlug, application.referenceToken);
  const offerCopy = getOfferCopy(application.offerSlug);
  const copy = offerCopy.accepted;

  return emailShell({
    preheader: "You're a fit. Here's the exact scope and price.",
    eyebrow: "Application reviewed",
    title: copy.title,
    intro: `Hey ${escapeHtml(application.name || "there")}, we reviewed what you sent. ${escapeHtml(application.productName || "Your product")} ${copy.introSuffix}`,
    content: `
      ${metricRow(copy.metrics.map((m, i) => ({ ...m, emphasis: i === 0 })))}
      <div style="margin-top:32px;">
        ${sectionLabel("What's included")}
        ${detailRows([
          { label: "Decision being assessed", value: application.decisionNeeded },
          { label: "You receive", value: copy.whatYouReceive },
          { label: "Not included", value: copy.notIncluded },
          { label: "Required before the clock starts", value: copy.requiredBeforeClock },
        ])}
      </div>
      ${calloutBlock(copy.ownershipCallout)}
      ${paymentLink
        ? bodyText("Ready when you are — the button below is a secure payment link.")
        : bodyText("We'll follow up personally within one business day with a secure way to pay — no need to do anything else right now.")}
      ${signOff()}
    `,
    cta: paymentLink ? { href: paymentLink, label: offerCopy.ctaLabelAccepted } : undefined,
  });
};

// ---------------------------------------------------------------------------
// 3. CUSTOM SCOPE — applicant-facing (deliberately not a generated proposal)
// ---------------------------------------------------------------------------
export const customScopeHtml = (application) => {
  const copy = getOfferCopy(application.offerSlug).customScope;
  return emailShell({
    preheader: "Your situation is real — the standard boundary wouldn't be honest about it.",
    eyebrow: "Application reviewed",
    title: copy.title,
    intro: `Hey ${escapeHtml(application.name || "there")}, we reviewed what you sent on ${escapeHtml(application.productName || "your product")}. ${copy.introSuffix}`,
    content: `
      ${calloutBlock(`Zia will follow up personally within one business day with a scope and price that actually fits what you described — not a generic quote.`)}
      ${bodyText("If you'd rather talk it through first, reply to this email directly and we'll set up a short call.")}
      ${signOff()}
    `,
  });
};

// ---------------------------------------------------------------------------
// 4. DECLINE / REDIRECT — applicant-facing
// ---------------------------------------------------------------------------
export const declineRedirectHtml = (application) => {
  const copy = getOfferCopy(application.offerSlug).decline;
  return emailShell({
    preheader: "Here's the more useful next step for your situation.",
    eyebrow: "Application reviewed",
    title: copy.title,
    intro: `Hey ${escapeHtml(application.name || "there")}, thank you for the context. Based on what you described, a bounded ${copy.declineIntroNoun} isn't the most useful next step for this situation.`,
    content: `
      <div style="margin-top:6px;">
        ${sectionLabel("A better place to start")}
        ${numberedSteps(copy.steps.map((text, i) => [String(i + 1).padStart(2, "0"), text]))}
      </div>
      ${signOff()}
    `,
    cta: copy.cta,
  });
};

// ---------------------------------------------------------------------------
// 5. PAYMENT RECEIVED / DAY-0 ONBOARDING — applicant-facing
// ---------------------------------------------------------------------------
export const paymentReceivedHtml = (application) => {
  const copy = getOfferCopy(application.offerSlug).paymentReceived;
  const statusUrl = `${SITE}/${application.offerSlug}/confirmed?ref=${encodeURIComponent(application.referenceToken)}`;
  return emailShell({
    preheader: "Payment received. Here's exactly what starts the 5-day clock.",
    eyebrow: "Payment received",
    title: "You're in. Here's what starts the clock.",
    intro: `Hey ${escapeHtml(application.name || "there")}, payment for ${escapeHtml(application.offerName)} is confirmed. One thing worth being precise about: the 5-business-day clock starts once ${copy.clockSuffix} — not today, automatically.`,
    content: `
      ${metricRow([
        { label: "Payment", value: "Confirmed", emphasis: true },
        { label: "Intake", value: application.intakeComplete ? "Complete" : "Needed" },
        { label: copy.accessLabel, value: application.accessReady ? "Ready" : "Needed" },
      ])}
      ${bodyText("The status page below stays accurate as those two items are completed, and shows your delivery date once the clock starts.", { marginTop: 28 })}
      ${signOff()}
    `,
    cta: { href: statusUrl, label: copy.statusCtaLabel },
  });
};

// ---------------------------------------------------------------------------
// 6. ASSESSMENT / SPRINT DELIVERED — applicant-facing
// ---------------------------------------------------------------------------
export const assessmentDeliveredHtml = (application) => {
  const offerCopy = getOfferCopy(application.offerSlug);
  const copy = offerCopy.delivered;
  return emailShell({
    preheader: copy.title,
    eyebrow: copy.eyebrow,
    title: copy.title,
    intro: `Hey ${escapeHtml(application.name || "there")}, the ${copy.introNoun} for ${escapeHtml(application.productName || "your product")} is done. You now own this decision.`,
    content: `
      ${calloutBlock(copy.callout)}
      ${bodyText("If you'd like to talk through the findings before deciding, reply to this email and we'll set up the walkthrough.")}
      ${signOff()}
    `,
    cta: application.briefUrl ? { href: application.briefUrl, label: offerCopy.ctaLabelDelivered } : undefined,
  });
};

// ---------------------------------------------------------------------------
// 7. INTERNAL NOTIFICATION — new application (ops-facing)
// ---------------------------------------------------------------------------
export const internalApplicationNotificationHtml = (application, { notionSynced }) => {
  const rows = [
    { label: "Name", value: application.name },
    { label: "Email", value: application.email },
    { label: "Company", value: application.company },
    { label: "Situation", value: humanize(application.situationType) },
    { label: "Product", value: application.productName },
    { label: "Product URL", value: application.productUrl },
    { label: "Decision needed", value: application.decisionNeeded },
    { label: "Duration", value: application.duration },
    { label: "Already tried", value: application.priorAttempts },
    { label: "Access availability", value: application.accessAvailability },
    { label: "Source", value: application.source },
    { label: "Reference", value: application.referenceToken },
  ];

  // Internal-only — deliberately left on the original email.js shell,
  // untouched by the customer-facing restyle (2026-09-29): this notification
  // is utilitarian and doesn't need the same visual treatment.
  const iBrand = internalShell.BRAND;
  return internalShell.emailShell({
    preheader: `New ${application.offerName} application from ${application.email}`,
    eyebrow: "New offer application",
    title: `${escapeHtml(application.offerName)} application from ${escapeHtml(application.name || application.email)}.`,
    intro: "Review and set Fit in Airtable/Notion — nothing here has been auto-classified.",
    content: `
      ${internalShell.statLine([
        { label: "Offer", value: application.offerName, tone: "copper" },
        { label: "Notion sync", value: notionSynced ? "Synced" : "Failed — check Airtable", tone: notionSynced ? "green" : "blue" },
        { label: "Next action", value: "Review & set fit", tone: "blue" },
      ])}
      <div style="margin-top:34px;">
        <div style="margin-bottom:14px;color:${iBrand.text};font-size:17px;font-weight:680;">Application</div>
        ${internalShell.detailRows(rows)}
      </div>
      ${application.problemDescription ? `
        <div style="margin-top:30px;padding:0 0 0 20px;border-left:2px solid ${iBrand.accent};">
          <div style="margin-bottom:9px;color:${iBrand.accent};font-size:11px;font-weight:650;letter-spacing:1.3px;text-transform:uppercase;">What's happening</div>
          <div style="color:${iBrand.text};font-size:15px;line-height:1.8;">${escapeHtml(application.problemDescription)}</div>
        </div>
      ` : ""}
      ${application.evidenceLinks ? `
        <div style="margin-top:30px;padding:0 0 0 20px;border-left:2px solid ${iBrand.accent};">
          <div style="margin-bottom:9px;color:${iBrand.accent};font-size:11px;font-weight:650;letter-spacing:1.3px;text-transform:uppercase;">Evidence links</div>
          <div style="color:${iBrand.text};font-size:15px;line-height:1.9;">
            ${application.evidenceLinks.split("\n").filter(Boolean).map((link) => `<a href="${escapeHtml(link)}" style="color:${iBrand.accent};word-break:break-all;">${escapeHtml(link)}</a>`).join("<br/>")}
          </div>
        </div>
      ` : ""}
    `,
    cta: { href: `mailto:${application.email}`, label: "Reply to applicant" },
  });
};
