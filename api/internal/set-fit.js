// POST /api/internal/set-fit
//
// The trigger for Section 9→10 of the architecture: qualification is human
// (you, reading the application in Airtable/Notion), but once you've
// decided, this is what sends the matching acceptance/custom-scope/decline
// email and moves the Airtable + Notion records forward. Same secret-header
// pattern as payment-verified.js — never reachable publicly, never called by
// the applicant.
//
// USAGE:
//   curl -X POST https://zumetrix.com/api/internal/set-fit \
//     -H "X-Internal-Token: $INTERNAL_OPS_TOKEN" \
//     -H "Content-Type: application/json" \
//     -d '{"ref":"<Reference Token>","fit":"standard"}'
//   fit is one of: "standard" | "custom" | "decline"
import { airtableFindByField, airtableUpdate } from "../_lib/airtable.js";
import { isValidReferenceToken } from "../_lib/token.js";
import { getOffer, getApplicationsTableName } from "../_lib/offers.js";
import { updateOpportunityStage } from "../_lib/notion.js";
import { sendResendEmail } from "../_lib/email.js";
import { acceptedStandardFitHtml, customScopeHtml, declineRedirectHtml } from "../_lib/offerEmails.js";
import { STATUS } from "../_lib/lifecycle.js";

const json = (res, status, body) => {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Cache-Control", "private, no-store");
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

// fitLabel and notionFit are deliberately separate: Airtable's Fit field
// (single select: Unknown/Standard/Custom/Decline) and the live Notion
// Offer Pipeline's Fit field (select: Unknown/Standard Fit/Custom Scope/
// Decline) use different option text for the same two outcomes — verified
// against both live schemas, not assumed. notionStage maps to the real
// Offer Pipeline Stage options; a qualified-but-unpaid Standard Fit is
// "Proposal / Payment", never "Won" — Won means payment verified, not just
// qualified (2026-09-29 Notion verification pass).
const ROUTES = {
  standard: { fitLabel: "Standard", notionFit: "Standard Fit", status: STATUS.ACCEPTED, notionStage: "Proposal / Payment", template: acceptedStandardFitHtml, subject: (offer) => `You're a fit — ${offer.name}` },
  custom: { fitLabel: "Custom", notionFit: "Custom Scope", status: STATUS.CUSTOM_SCOPE, notionStage: "Scope Decision", template: customScopeHtml, subject: (offer) => `About your ${offer.name} application` },
  decline: { fitLabel: "Decline", notionFit: "Decline", status: STATUS.DECLINED, notionStage: "Declined", template: declineRedirectHtml, subject: () => "Your application — next steps" },
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return json(res, 405, { success: false, error: "Method not allowed" });
  }

  const configuredSecret = process.env.INTERNAL_OPS_TOKEN;
  if (!configuredSecret) {
    console.error("set-fit: INTERNAL_OPS_TOKEN is not configured");
    return json(res, 503, { success: false, error: "Not configured." });
  }
  if (req.headers["x-internal-token"] !== configuredSecret) {
    return json(res, 401, { success: false, error: "Unauthorized." });
  }

  const body = await readRequestBody(req).catch(() => ({}));
  if (!isValidReferenceToken(body.ref)) {
    return json(res, 400, { success: false, error: "Missing or malformed reference." });
  }
  const route = ROUTES[body.fit];
  if (!route) {
    return json(res, 400, { success: false, error: 'fit must be "standard", "custom", or "decline".' });
  }

  const table = getApplicationsTableName();

  const lookup = await airtableFindByField(table, "Reference Token", body.ref, { limit: 1 }).catch(() => ({ found: false, records: [] }));
  if (!lookup.found) {
    return json(res, 404, { success: false, error: "No application found for that reference." });
  }

  const record = lookup.records[0];
  const fields = record.fields || {};
  // Every offer's applications share one table (Section 7 of the
  // BUILD/AUTOMATE expansion) — the record's own Offer Slug decides which
  // offer's name/price/templates this application actually gets, not an
  // assumption baked into this endpoint. Falls back to product-rescue only
  // for pre-expansion records that predate the Offer Slug field being read
  // here (all real rows have always written it — offer-application.js has
  // set it since the very first version of this table).
  const offer = getOffer(fields["Offer Slug"]) || getOffer("product-rescue");

  const updated = await airtableUpdate(table, record.id, { Fit: route.fitLabel, Status: route.status });
  if (!updated.updated) {
    return json(res, 503, { success: false, error: "Airtable update failed." });
  }

  const notionResult = await updateOpportunityStage(fields["Notion Page ID"], route.notionStage, { fit: route.notionFit }).catch((error) => ({ synced: false, reason: error.message }));

  const applicantEmail = await sendResendEmail({
    to: fields.Email,
    subject: route.subject(offer),
    html: route.template({
      name: fields.Name,
      productName: fields["Product Name"],
      offerName: offer.name,
      offerSlug: offer.slug,
      value: offer.price,
      decisionNeeded: fields["Decision Needed"],
      referenceToken: body.ref,
    }),
    replyTo: "hello@zumetrix.com",
  }).catch((error) => ({ sent: false, reason: error.message }));

  return json(res, 200, {
    success: true,
    fit: route.fitLabel,
    warnings: [
      !notionResult.synced ? `Notion stage update: ${notionResult.reason}` : null,
      !applicantEmail.sent ? `Applicant email: ${applicantEmail.reason}` : null,
    ].filter(Boolean),
  });
}
