// GET  /api/rescue-status?ref=<token>   — powers /product-rescue/confirmed
// POST /api/rescue-status               — the Day-0 intake form on that page
//
// Both are looked up by the opaque reference token only (never a sequential
// or Airtable record ID — Section 12). Both return the minimum needed to
// render the page: payment/intake/access booleans and dates. Never the
// applicant's name, email, problem description, or any other field from the
// application.
import { airtableFindByField, airtableUpdate } from "./_lib/airtable.js";
import { isValidReferenceToken } from "./_lib/token.js";
import { getApplicationsTableName } from "./_lib/offers.js";
import { isClockEligible, computeDeliveryDueDate } from "./_lib/lifecycle.js";

const json = (res, status, body) => {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json");
  // This endpoint returns per-applicant data keyed by an unguessable token;
  // it must never be cached at a shared layer (a CDN cache keyed only on the
  // URL would otherwise happily serve applicant A's status to applicant B if
  // their tokens ever collided with a cache key by coincidence of path).
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

const publicStatus = (fields) => ({
  found: true,
  status: fields.Status || null,
  paymentVerified: fields["Payment Status"] === "Verified",
  intakeComplete: fields["Intake Status"] === "Complete",
  accessReady: Boolean(fields["Access Ready"]),
  clockStartAt: fields["Clock Start At"] || null,
  deliveryDueAt: fields["Delivery Due At"] || null,
});

export default async function handler(req, res) {
  const table = getApplicationsTableName();
  const ref = req.method === "GET" ? req.query?.ref : (await readRequestBody(req)).ref;

  if (!isValidReferenceToken(ref)) {
    return json(res, 400, { found: false, error: "Missing or malformed reference." });
  }

  const lookup = await airtableFindByField(table, "Reference Token", ref, { limit: 1 }).catch(() => ({ found: false, records: [] }));
  if (!lookup.found) {
    return json(res, 200, { found: false });
  }

  const record = lookup.records[0];
  const fields = record.fields || {};

  if (req.method === "GET") {
    return json(res, 200, publicStatus(fields));
  }

  if (req.method !== "POST") {
    res.setHeader("Allow", "GET, POST");
    return json(res, 405, { found: false, error: "Method not allowed" });
  }

  // POST — the Day-0 intake form. Only accepted once payment is verified;
  // an applicant who hasn't paid has nothing to submit intake against.
  if (fields["Payment Status"] !== "Verified") {
    return json(res, 409, { found: true, error: "Payment isn't confirmed yet for this application." });
  }

  const body = await readRequestBody(req).catch(() => ({}));
  const accessReady = Boolean(body.accessReady);
  const accessNote = typeof body.accessNote === "string" ? body.accessNote.trim().slice(0, 1000) : "";

  const nowIntakeComplete = true; // reaching this handler at all means the intake form was submitted
  const updates = {
    "Intake Status": "Complete",
    "Access Ready": accessReady,
  };
  if (accessNote) updates["Access Availability"] = accessNote;

  if (isClockEligible({ intakeComplete: nowIntakeComplete, accessReady }) && !fields["Clock Start At"]) {
    const clockStartAt = new Date().toISOString();
    updates["Clock Start At"] = clockStartAt;
    updates["Delivery Due At"] = computeDeliveryDueDate(clockStartAt);
    updates.Status = "ready";
  } else {
    updates.Status = accessReady ? "intake_pending" : "access_pending";
  }

  const updated = await airtableUpdate(table, record.id, updates).catch((error) => ({ updated: false, reason: error.message }));
  if (!updated.updated) {
    return json(res, 503, { found: true, error: "We could not save that just now. Please try again in a moment." });
  }

  return json(res, 200, publicStatus({ ...fields, ...updates }));
}
