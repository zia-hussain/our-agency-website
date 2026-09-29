// Every transactional email state for the offer system (audit Section 26).
// Six applicant-facing templates + one internal notification. All built on
// the shared emailShell/statLine/detailRows from api/_lib/email.js — no new
// visual system, same premium shell the contact form and lead magnet emails
// already use.
import { BRAND, detailRows, emailShell, numberedSteps, statLine } from "./email.js";
import { escapeHtml, humanize, money } from "./text.js";
import { getPaymentLink } from "./payment.js";

const SITE = "https://zumetrix.com";

// ---------------------------------------------------------------------------
// 1. APPLICATION RECEIVED — applicant-facing
// ---------------------------------------------------------------------------
export const applicationReceivedHtml = (application) => emailShell({
  preheader: "We have what we need to review whether Product Rescue is the right next step.",
  eyebrow: "Application received",
  title: "We have what we need to start.",
  intro: `Hey ${escapeHtml(application.name || "there")}, thank you for the context on ${escapeHtml(application.productName || "your product")}. We review every application by hand before asking anyone to spend anything — here's exactly what happens next.`,
  content: `
    ${statLine([
      { label: "Offer", value: application.offerName, tone: "copper" },
      { label: "Standard price", value: money(application.value), tone: "blue" },
      { label: "Review window", value: "Within 1 business day", tone: "green" },
    ])}
    <div style="margin-top:34px;">
      <div style="margin-bottom:14px;color:${BRAND.text};font-size:17px;font-weight:680;">What happens next</div>
      ${numberedSteps([
        ["01", "We read the application and decide whether this is a standard fit, needs a custom scope, or isn't the right tool for the situation."],
        ["02", "If it's a fit, we confirm the exact boundary and send a secure way to pay — the $750 assessment stays $750 unless the product genuinely needs a custom scope, and we'll say so plainly if it does."],
        ["03", "The 5-business-day clock starts once payment, a short intake, and access/evidence are all ready — not the moment you pay."],
      ])}
    </div>
    <p style="margin:28px 0 0;color:${BRAND.muted};font-size:14px;line-height:1.75;">If Product Rescue turns out not to be the right fit for your situation, we'll say so directly and point you at whatever actually helps — including our free <a href="${SITE}/rescue-or-rebuild" style="color:${BRAND.accent};">rescue-or-rebuild diagnostic</a>, which needs no application at all.</p>
    <p style="margin:25px 0 0;color:${BRAND.text};font-size:14px;line-height:1.6;font-weight:650;">Zia &amp; Omer<br><span style="color:${BRAND.subtle};font-weight:400;">Zumetrix Labs</span></p>
  `,
});

// ---------------------------------------------------------------------------
// 2. ACCEPTED — STANDARD FIT — applicant-facing
// ---------------------------------------------------------------------------
export const acceptedStandardFitHtml = (application) => {
  const paymentLink = getPaymentLink(application.offerSlug, application.referenceToken);

  return emailShell({
    preheader: "You're a fit. Here's the exact scope and price.",
    eyebrow: "Application reviewed",
    title: "You're a fit for the Product Rescue Assessment.",
    intro: `Hey ${escapeHtml(application.name || "there")}, we reviewed what you sent. ${escapeHtml(application.productName || "Your product")} is exactly the kind of situation this assessment is built for.`,
    content: `
      ${statLine([
        { label: "Price", value: "$750", tone: "copper" },
        { label: "Boundary", value: "One bounded product", tone: "blue" },
        { label: "Delivery", value: "5 business days after access is ready", tone: "green" },
      ])}
      <div style="margin-top:34px;">
        <div style="margin-bottom:14px;color:${BRAND.text};font-size:17px;font-weight:680;">What's included</div>
        ${detailRows([
          { label: "Decision being assessed", value: application.decisionNeeded },
          { label: "You receive", value: "A Rescue Brief: what to keep, what to fix, where replacement is actually justified, and what should happen next — plus a short walkthrough call." },
          { label: "Not included", value: "Implementation, exhaustive QA, a line-by-line code audit, penetration testing, or a guaranteed rebuild recommendation." },
          { label: "Required before the clock starts", value: "A short intake form and read access to the product (or the evidence needed to assess it)." },
        ])}
      </div>
      <div style="margin-top:30px;padding:0 0 0 20px;border-left:2px solid ${BRAND.accent};">
        <p style="margin:0;color:${BRAND.text};font-size:16px;line-height:1.75;">The Brief is yours either way. Use your own team, another team, or ask us to implement it — the assessment doesn't assume the answer.</p>
      </div>
      ${paymentLink
        ? `<p style="margin:28px 0 0;color:${BRAND.muted};font-size:14px;line-height:1.75;">Ready when you are — the button below is a secure payment link.</p>`
        : `<p style="margin:28px 0 0;color:${BRAND.muted};font-size:14px;line-height:1.75;">We'll follow up personally within one business day with a secure way to pay — no need to do anything else right now.</p>`}
      <p style="margin:25px 0 0;color:${BRAND.text};font-size:14px;line-height:1.6;font-weight:650;">Zia &amp; Omer<br><span style="color:${BRAND.subtle};font-weight:400;">Zumetrix Labs</span></p>
    `,
    cta: paymentLink ? { href: paymentLink, label: "Start My Assessment" } : undefined,
  });
};

// ---------------------------------------------------------------------------
// 3. CUSTOM SCOPE — applicant-facing (deliberately not a generated proposal)
// ---------------------------------------------------------------------------
export const customScopeHtml = (application) => emailShell({
  preheader: "Your situation is real — the standard boundary wouldn't be honest about it.",
  eyebrow: "Application reviewed",
  title: "This needs a scoped conversation, not a standard assessment.",
  intro: `Hey ${escapeHtml(application.name || "there")}, we reviewed what you sent on ${escapeHtml(application.productName || "your product")}. It's a genuine rescue situation — but fitting it inside the standard $750 / one-product / 5-day boundary would mean promising more than a bounded assessment can responsibly cover.`,
  content: `
    <div style="padding:2px 0 2px 24px;border-left:2px solid ${BRAND.accent};">
      <p style="margin:0;color:${BRAND.text};font-size:16px;line-height:1.75;">Zia will follow up personally within one business day with a scope and price that actually fits what you described — not a generic quote.</p>
    </div>
    <p style="margin:28px 0 0;color:${BRAND.muted};font-size:14px;line-height:1.75;">If you'd rather talk it through first, reply to this email directly and we'll set up a short call.</p>
    <p style="margin:25px 0 0;color:${BRAND.text};font-size:14px;line-height:1.6;font-weight:650;">Zia &amp; Omer<br><span style="color:${BRAND.subtle};font-weight:400;">Zumetrix Labs</span></p>
  `,
});

// ---------------------------------------------------------------------------
// 4. DECLINE / REDIRECT — applicant-facing
// ---------------------------------------------------------------------------
export const declineRedirectHtml = (application) => emailShell({
  preheader: "Here's the more useful next step for your situation.",
  eyebrow: "Application reviewed",
  title: "This probably isn't the right fit — here's what is.",
  intro: `Hey ${escapeHtml(application.name || "there")}, thank you for the context. Based on what you described, a bounded product assessment isn't the most useful next step for this situation.`,
  content: `
    <div style="margin-top:8px;">
      <div style="margin-bottom:14px;color:${BRAND.text};font-size:17px;font-weight:680;">A better place to start</div>
      ${numberedSteps([
        ["01", `Run the free <a href="${SITE}/rescue-or-rebuild" style="color:${BRAND.accent};">rescue-or-rebuild diagnostic</a> — four questions, an honest directional read, no application needed.`],
        ["02", `Read <a href="${SITE}/articles/should-you-rescue-or-rebuild-your-saas" style="color:${BRAND.accent};">the decision framework</a> the diagnostic is built on.`],
        ["03", `If none of that fits either, just reply to this email and tell us what's actually going on — we'll point you somewhere useful.`],
      ])}
    </div>
    <p style="margin:25px 0 0;color:${BRAND.text};font-size:14px;line-height:1.6;font-weight:650;">Zia &amp; Omer<br><span style="color:${BRAND.subtle};font-weight:400;">Zumetrix Labs</span></p>
  `,
  cta: { href: `${SITE}/rescue-or-rebuild`, label: "Run the free diagnostic" },
});

// ---------------------------------------------------------------------------
// 5. PAYMENT RECEIVED / DAY-0 ONBOARDING — applicant-facing
// ---------------------------------------------------------------------------
export const paymentReceivedHtml = (application) => {
  const statusUrl = `${SITE}/product-rescue/confirmed?ref=${encodeURIComponent(application.referenceToken)}`;
  return emailShell({
    preheader: "Payment received. Here's exactly what starts the 5-day clock.",
    eyebrow: "Payment received",
    title: "You're in. Here's what starts the clock.",
    intro: `Hey ${escapeHtml(application.name || "there")}, payment for ${escapeHtml(application.offerName)} is confirmed. One thing worth being precise about: the 5-business-day clock starts once intake and access/evidence are both ready — not today, automatically.`,
    content: `
      ${statLine([
        { label: "Payment", value: "Confirmed", tone: "green" },
        { label: "Intake", value: application.intakeComplete ? "Complete" : "Needed", tone: application.intakeComplete ? "green" : "copper" },
        { label: "Access & evidence", value: application.accessReady ? "Ready" : "Needed", tone: application.accessReady ? "green" : "copper" },
      ])}
      <p style="margin:28px 0 0;color:${BRAND.muted};font-size:14px;line-height:1.75;">The status page below stays accurate as those two items are completed, and shows your delivery date once the clock starts.</p>
      <p style="margin:25px 0 0;color:${BRAND.text};font-size:14px;line-height:1.6;font-weight:650;">Zia &amp; Omer<br><span style="color:${BRAND.subtle};font-weight:400;">Zumetrix Labs</span></p>
    `,
    cta: { href: statusUrl, label: "View your assessment status" },
  });
};

// ---------------------------------------------------------------------------
// 6. ASSESSMENT DELIVERED — applicant-facing
// ---------------------------------------------------------------------------
export const assessmentDeliveredHtml = (application) => emailShell({
  preheader: "Your Rescue Brief is ready.",
  eyebrow: "Assessment delivered",
  title: "Your Rescue Brief is ready.",
  intro: `Hey ${escapeHtml(application.name || "there")}, the assessment for ${escapeHtml(application.productName || "your product")} is done. You now own this decision.`,
  content: `
    <div style="padding:2px 0 2px 24px;border-left:2px solid ${BRAND.accent};">
      <p style="margin:0;color:${BRAND.text};font-size:16px;line-height:1.75;">From here, three paths are equally valid: use your own team, bring in another company, or ask us to execute it. The Brief works regardless of which one you pick.</p>
    </div>
    <p style="margin:28px 0 0;color:${BRAND.muted};font-size:14px;line-height:1.75;">If you'd like to talk through the findings before deciding, reply to this email and we'll set up the walkthrough.</p>
    <p style="margin:25px 0 0;color:${BRAND.text};font-size:14px;line-height:1.6;font-weight:650;">Zia &amp; Omer<br><span style="color:${BRAND.subtle};font-weight:400;">Zumetrix Labs</span></p>
  `,
  cta: application.briefUrl ? { href: application.briefUrl, label: "Open your Rescue Brief" } : undefined,
});

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

  return emailShell({
    preheader: `New Product Rescue application from ${application.email}`,
    eyebrow: "New offer application",
    title: `Product Rescue application from ${escapeHtml(application.name || application.email)}.`,
    intro: "Review and set Fit in Airtable/Notion — nothing here has been auto-classified.",
    content: `
      ${statLine([
        { label: "Offer", value: application.offerName, tone: "copper" },
        { label: "Notion sync", value: notionSynced ? "Synced" : "Failed — check Airtable", tone: notionSynced ? "green" : "blue" },
        { label: "Next action", value: "Review & set fit", tone: "blue" },
      ])}
      <div style="margin-top:34px;">
        <div style="margin-bottom:14px;color:${BRAND.text};font-size:17px;font-weight:680;">Application</div>
        ${detailRows(rows)}
      </div>
      ${application.problemDescription ? `
        <div style="margin-top:30px;padding:0 0 0 20px;border-left:2px solid ${BRAND.accent};">
          <div style="margin-bottom:9px;color:${BRAND.accent};font-size:11px;font-weight:650;letter-spacing:1.3px;text-transform:uppercase;">What's happening</div>
          <div style="color:${BRAND.text};font-size:15px;line-height:1.8;">${escapeHtml(application.problemDescription)}</div>
        </div>
      ` : ""}
      ${application.evidenceLinks ? `
        <div style="margin-top:30px;padding:0 0 0 20px;border-left:2px solid ${BRAND.accent};">
          <div style="margin-bottom:9px;color:${BRAND.accent};font-size:11px;font-weight:650;letter-spacing:1.3px;text-transform:uppercase;">Evidence links</div>
          <div style="color:${BRAND.text};font-size:15px;line-height:1.9;">
            ${application.evidenceLinks.split("\n").filter(Boolean).map((link) => `<a href="${escapeHtml(link)}" style="color:${BRAND.accent};word-break:break-all;">${escapeHtml(link)}</a>`).join("<br/>")}
          </div>
        </div>
      ` : ""}
    `,
    cta: { href: `mailto:${application.email}`, label: "Reply to applicant" },
  });
};
