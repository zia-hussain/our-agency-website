// POST /api/offer-application — the one write path for every paid-offer
// application (Product Rescue today; Idea-to-Build / Manual-to-System later
// reuse this same endpoint by sending a different offerSlug).
//
// Resilient-stage order (audit Section 6, brief Section 6):
//   1. validate + honeypot + rate-limit
//   2. Airtable create — DURABLE. If this fails, the submission is NOT
//      considered captured, and the applicant gets an honest, recoverable
//      error asking them to retry or email directly.
//   3. Notion sync — best-effort. Logged on failure, never blocks, never
//      causes a resubmit.
//   4. Resend emails (applicant confirmation + internal notification) —
//      best-effort, same as step 3.
// The response's `success` field reflects step 2 only. Steps 3/4 failures
// are reported back as non-fatal `warnings` so ops has visibility without
// the applicant ever seeing an error for something that isn't their problem.
import { escapeHtml, isEmail, isSafeHttpUrl } from "./_lib/text.js";
import { airtableCreate } from "./_lib/airtable.js";
import { checkOfferRateLimit } from "./_lib/rateLimit.js";
import { createOfferOpportunity } from "./_lib/notion.js";
import { sendResendEmail, getOpsRecipients } from "./_lib/email.js";
import { applicationReceivedHtml, internalApplicationNotificationHtml } from "./_lib/offerEmails.js";
import { generateReferenceToken } from "./_lib/token.js";
import { getOffer } from "./_lib/offers.js";
import { STATUS } from "./_lib/lifecycle.js";

const json = (res, status, body) => {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(body));
};

const readRequestBody = async (req) => {
  if (req.body && typeof req.body === "object") return req.body;
  if (typeof req.body === "string") return JSON.parse(req.body || "{}");
  const chunks = [];
  for await (const chunk of req) chunks.push(Buffer.from(chunk));
  const raw = Buffer.concat(chunks).toString("utf8");
  return raw ? JSON.parse(raw) : {};
};

// Free-text fields get a generous but bounded length — long enough for a
// genuine, detailed description, short enough that nobody can use this
// endpoint to store arbitrary megabytes of text in Airtable/Notion.
const clampText = (value, max) => (typeof value === "string" ? value.trim().slice(0, max) : "");

// Same discipline as evidence links: a malformed product URL is dropped
// rather than stored as-is — Airtable/Notion should never show a reviewer
// something that isn't actually a clickable link.
const cleanProductUrl = (raw) => {
  const value = clampText(raw, 300);
  return value && isSafeHttpUrl(value) ? value : "";
};

// Evidence links: newline/comma-separated URLs, validated one by one, joined
// back into a single newline-delimited string for Airtable's long-text
// field. Anything that isn't a well-formed http(s) URL is dropped silently
// rather than rejecting the whole submission over one typo.
const cleanEvidenceLinks = (raw) => {
  if (!raw) return "";
  const candidates = Array.isArray(raw) ? raw : String(raw).split(/[\n,]/);
  const valid = candidates
    .map((c) => c.trim())
    .filter(Boolean)
    .filter((c) => {
      try {
        const u = new URL(c);
        return u.protocol === "https:" || u.protocol === "http:";
      } catch {
        return false;
      }
    })
    .slice(0, 8);
  return valid.join("\n");
};

const SITUATION_TYPES = new Set([
  "product-breaking",
  "development-stalled",
  "considering-rebuild",
  "inherited-product",
  "distrust-direction",
  "something-else",
]);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return json(res, 405, { success: false, error: "Method not allowed" });
  }

  let body;
  try {
    body = await readRequestBody(req);
  } catch {
    return json(res, 400, { success: false, error: "Invalid request body." });
  }

  // Honeypot: identical contract to api/leads.js — a hidden field real
  // visitors never fill. Respond as if it succeeded so a bot gets no signal
  // it was caught; do nothing with the submission.
  if (body.hpToken) {
    return json(res, 200, { success: true, captured: false, honeypot: true });
  }

  const offer = getOffer(body.offerSlug);
  if (!offer) {
    return json(res, 400, { success: false, error: "Unknown offer." });
  }

  if (!isEmail(body.email)) {
    return json(res, 400, { success: false, error: "A valid email is required." });
  }
  if (!body.name || !String(body.name).trim()) {
    return json(res, 400, { success: false, error: "Your name is required." });
  }
  if (!SITUATION_TYPES.has(body.situationType)) {
    return json(res, 400, { success: false, error: "Please choose what best describes your situation." });
  }
  if (!body.problemDescription || String(body.problemDescription).trim().length < 10) {
    return json(res, 400, { success: false, error: "Tell us a bit more about what's happening." });
  }

  const email = String(body.email).trim().toLowerCase();
  const tableName = offer.airtableTable();

  try {
    const rateLimit = await checkOfferRateLimit(tableName, email).catch(() => ({ limited: false }));
    if (rateLimit.limited) {
      return json(res, 429, {
        success: false,
        error: "You've already submitted recently. We're reviewing it — feel free to email hello@zumetrix.com if it's urgent.",
      });
    }

    const referenceToken = generateReferenceToken();
    const nowIso = new Date().toISOString();

    const application = {
      offerSlug: offer.slug,
      offerName: offer.name,
      value: offer.price,
      referenceToken,
      name: clampText(body.name, 120),
      email,
      company: clampText(body.company, 120),
      situationType: body.situationType,
      productName: clampText(body.productName, 160),
      productDescription: clampText(body.productDescription, 600),
      productUrl: cleanProductUrl(body.productUrl),
      problemDescription: clampText(body.problemDescription, 3000),
      decisionNeeded: clampText(body.decisionNeeded, 600),
      duration: clampText(body.duration, 160),
      priorAttempts: clampText(body.priorAttempts, 800),
      accessAvailability: clampText(body.accessAvailability, 160),
      evidenceLinks: cleanEvidenceLinks(body.evidenceLinks),
      source: clampText(body.source, 80) || "Website",
      pageUrl: clampText(body.pageUrl, 400),
      referrer: clampText(body.referrer, 400),
      utmSource: clampText(body.utmSource, 80),
      utmMedium: clampText(body.utmMedium, 80),
      utmCampaign: clampText(body.utmCampaign, 120),
      marketingConsent: Boolean(body.marketingConsent),
    };

    // Step 2 — DURABLE write. A failure here is a failure of the whole
    // request: nothing downstream (Notion, email) is attempted, and the
    // applicant is told plainly that it was not captured.
    const airtableResult = await airtableCreate(tableName, {
      "Offer Slug": application.offerSlug,
      "Reference Token": application.referenceToken,
      "Created At": nowIso,
      Name: application.name,
      Email: application.email,
      Company: application.company,
      "Situation Type": application.situationType,
      "Product Name": application.productName,
      "Product Description": application.productDescription,
      "Product URL": application.productUrl,
      "Problem Description": application.problemDescription,
      "Decision Needed": application.decisionNeeded,
      Duration: application.duration,
      "Prior Attempts": application.priorAttempts,
      "Access Availability": application.accessAvailability,
      "Evidence Links": application.evidenceLinks,
      Status: STATUS.APPLIED,
      Fit: "Unknown",
      "Quoted Price": offer.price,
      "Payment Status": "Unverified",
      "Intake Status": "Pending",
      "Access Ready": false,
      Source: application.source,
      "Page URL": application.pageUrl,
      Referrer: application.referrer,
      "UTM Source": application.utmSource,
      "UTM Medium": application.utmMedium,
      "UTM Campaign": application.utmCampaign,
      "Marketing Consent": application.marketingConsent,
      "Notion Sync Status": "Not Attempted",
    });

    if (!airtableResult.created) {
      // Airtable not configured at all — not a partial failure, a hard stop.
      console.error("Offer application: Airtable not configured", airtableResult.reason);
      return json(res, 503, {
        success: false,
        error: "We could not capture your application. Please email hello@zumetrix.com directly and we'll pick it up from there.",
      });
    }

    // Step 3 — best-effort. Failure is recorded on the Airtable row itself
    // ("Notion Sync Status": "Failed") so it's visible and retryable from
    // inside Airtable without needing log access.
    const notionResult = await createOfferOpportunity(application).catch((error) => ({ synced: false, reason: error.message }));
    if (!notionResult.synced) {
      console.error("Offer application: Notion sync failed", notionResult.reason);
      await import("./_lib/airtable.js").then(({ airtableUpdate }) =>
        airtableUpdate(tableName, airtableResult.id, {
          "Notion Sync Status": "Failed",
          "Notion Sync Error": escapeHtml(String(notionResult.reason || "").slice(0, 500)),
        }).catch(() => {}),
      );
    } else {
      await import("./_lib/airtable.js").then(({ airtableUpdate }) =>
        airtableUpdate(tableName, airtableResult.id, {
          "Notion Sync Status": "Synced",
          "Notion Page ID": notionResult.id,
        }).catch(() => {}),
      );
    }

    // Step 4 — best-effort, two independent sends so one failing doesn't
    // suppress the other.
    const applicantEmail = await sendResendEmail({
      to: application.email,
      subject: `Your ${offer.name} application`,
      html: applicationReceivedHtml(application),
      replyTo: "hello@zumetrix.com",
    }).catch((error) => ({ sent: false, reason: error.message }));

    const internalEmail = await sendResendEmail({
      to: getOpsRecipients(),
      subject: `New ${offer.name} application: ${application.email}`,
      html: internalApplicationNotificationHtml(application, { notionSynced: notionResult.synced }),
      replyTo: application.email,
    }).catch((error) => ({ sent: false, reason: error.message }));

    return json(res, 200, {
      success: true,
      captured: true,
      warnings: [
        !notionResult.synced ? `Notion sync: ${notionResult.reason}` : null,
        !applicantEmail.sent ? `Applicant email: ${applicantEmail.reason}` : null,
        !internalEmail.sent ? `Internal email: ${internalEmail.reason}` : null,
      ].filter(Boolean),
    });
  } catch (error) {
    console.error("Offer application API error:", error);
    return json(res, 500, {
      success: false,
      error: "We could not process this request. Please email hello@zumetrix.com directly.",
    });
  }
}
