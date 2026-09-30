// POST /api/internal/payment-verified
//
// The "internal/manual verified-payment state for development/testing" the
// architecture explicitly asks for (Section 6/11), built as safely as that
// requirement allows:
//   - never reachable from any public page or client-side code
//   - not a GET, not a query-string flag — a POST gated by a server-only
//     secret header nobody but you (or a future real webhook) will ever have
//   - looked up by the same opaque reference token as everything else, never
//     a sequential ID
//
// USAGE TODAY (manual/testing, until a real payment provider exists):
//   curl -X POST https://zumetrix.com/api/internal/payment-verified \
//     -H "X-Internal-Token: $INTERNAL_OPS_TOKEN" \
//     -H "Content-Type: application/json" \
//     -d '{"ref":"<the applicant's Reference Token from Airtable>"}'
//
// FUTURE PROVIDER: once a real payment provider is chosen, its webhook
// handler should verify the provider's own signature and then call the same
// markPaymentVerified() transition this file calls — never re-implement the
// Airtable/Notion/email side effects a second time in the webhook itself.
import { airtableFindByField, airtableUpdate } from "../_lib/airtable.js";
import { isValidReferenceToken } from "../_lib/token.js";
import { getOffer, getApplicationsTableName } from "../_lib/offers.js";
import { updateOpportunityStage } from "../_lib/notion.js";
import { sendResendEmail, getOpsRecipients } from "../_lib/email.js";
import { paymentReceivedHtml } from "../_lib/offerEmails.js";
import { escapeHtml } from "../_lib/text.js";
import { isClockEligible, computeDeliveryDueDate } from "../_lib/lifecycle.js";

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

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return json(res, 405, { success: false, error: "Method not allowed" });
  }

  const configuredSecret = process.env.INTERNAL_OPS_TOKEN;
  if (!configuredSecret) {
    // Fails closed: if the secret was never configured, this route can
    // never be used, by anyone, rather than falling back to "no auth."
    console.error("payment-verified: INTERNAL_OPS_TOKEN is not configured");
    return json(res, 503, { success: false, error: "Not configured." });
  }
  const provided = req.headers["x-internal-token"];
  if (provided !== configuredSecret) {
    return json(res, 401, { success: false, error: "Unauthorized." });
  }

  const body = await readRequestBody(req).catch(() => ({}));
  if (!isValidReferenceToken(body.ref)) {
    return json(res, 400, { success: false, error: "Missing or malformed reference." });
  }

  const table = getApplicationsTableName();

  const lookup = await airtableFindByField(table, "Reference Token", body.ref, { limit: 1 }).catch(() => ({ found: false, records: [] }));
  if (!lookup.found) {
    return json(res, 404, { success: false, error: "No application found for that reference." });
  }

  const record = lookup.records[0];
  const fields = record.fields || {};
  // Same shared-table, record-decides-the-offer resolution as set-fit.js —
  // see that file's comment (2026-09-30 BUILD/AUTOMATE expansion).
  const offer = getOffer(fields["Offer Slug"]) || getOffer("product-rescue");

  if (fields["Payment Status"] === "Verified") {
    return json(res, 200, { success: true, alreadyVerified: true });
  }

  const paidAt = body.verifiedAt && !Number.isNaN(Date.parse(body.verifiedAt)) ? new Date(body.verifiedAt).toISOString() : new Date().toISOString();

  const updates = {
    "Payment Status": "Verified",
    "Paid At": paidAt,
    Status: "paid",
  };
  const alreadyEligible = isClockEligible({
    intakeComplete: fields["Intake Status"] === "Complete",
    accessReady: Boolean(fields["Access Ready"]),
  });
  if (alreadyEligible && !fields["Clock Start At"]) {
    updates["Clock Start At"] = paidAt;
    updates["Delivery Due At"] = computeDeliveryDueDate(paidAt);
    updates.Status = "ready";
  }

  const updated = await airtableUpdate(table, record.id, updates);
  if (!updated.updated) {
    return json(res, 503, { success: false, error: "Airtable update failed." });
  }

  // Won means payment verified, not just qualified — a Standard Fit
  // acceptance alone stops at "Proposal / Payment" (set in set-fit.js).
  // Fit isn't re-sent here: it was already written correctly (in Notion's
  // own "Standard Fit"/"Custom Scope" terminology) during qualification,
  // and fields.Fit here is Airtable's own "Standard"/"Custom" text, which
  // would be the wrong value if sent straight through to Notion's Fit
  // select (2026-09-29 Notion verification pass).
  const notionPageId = fields["Notion Page ID"];
  const notionResult = await updateOpportunityStage(notionPageId, "Won").catch((error) => ({ synced: false, reason: error.message }));

  const applicantEmail = await sendResendEmail({
    to: fields.Email,
    subject: `Payment received — ${offer.name}`,
    html: paymentReceivedHtml({
      name: fields.Name,
      offerName: offer.name,
      offerSlug: offer.slug,
      referenceToken: body.ref,
      intakeComplete: fields["Intake Status"] === "Complete",
      accessReady: Boolean(fields["Access Ready"]),
    }),
    replyTo: "hello@zumetrix.com",
  }).catch((error) => ({ sent: false, reason: error.message }));

  const internalEmail = await sendResendEmail({
    to: getOpsRecipients(),
    subject: `Payment verified: ${fields.Email}`,
    html: `<p>Payment marked verified for ${escapeHtml(fields.Email)} (${escapeHtml(offer.name)}). Reference: ${escapeHtml(body.ref)}.</p>`,
    replyTo: fields.Email,
  }).catch((error) => ({ sent: false, reason: error.message }));

  return json(res, 200, {
    success: true,
    clockStarted: Boolean(updates["Clock Start At"]),
    warnings: [
      !notionResult.synced ? `Notion stage update: ${notionResult.reason}` : null,
      !applicantEmail.sent ? `Applicant email: ${applicantEmail.reason}` : null,
      !internalEmail.sent ? `Internal email: ${internalEmail.reason}` : null,
    ].filter(Boolean),
  });
}
