// Durable, serverless-safe per-email throttle for the public POST endpoints
// (/api/leads and /api/offer-application). In-memory counters would reset on
// every cold start and are not shared across concurrent function instances,
// so the check reads recent rows from the table that already durably holds
// the submission: Airtable. Airtable is the single commercial datastore for
// this site (see docs/PHASE1_MEASUREMENT.md §7), so no second database is
// needed just to answer "has this email submitted recently?".
import { airtableFindByField } from "./airtable.js";

// Airtable formula strings use backslash escapes; the email has already
// passed isEmail() but that regex still admits quotes, so escape rather than
// trust it.
const escapeFormulaValue = (value) => String(value).replace(/\\/g, "\\\\").replace(/"/g, '\\"');

/**
 * Returns { limited, count } — `limited` when `email` already has
 * `maxSubmissions` rows created in the last `windowMinutes` on `tableName`.
 * Fails OPEN: a broken Airtable read never blocks a real submission. This
 * stops double-clicks and retry-happy bots, not a determined attacker
 * rotating addresses; that is deliberate for a low-volume agency site.
 */
export const checkAirtableRateLimit = async (
  tableName,
  email,
  { windowMinutes = 30, maxSubmissions = 3, createdField = "Created At" } = {},
) => {
  try {
    // Airtable's filterByFormula can't express "created in the last N
    // minutes" without a NOW()-keyed formula field the tables don't define,
    // so fetch a handful of same-email rows and filter by timestamp here.
    const { records } = await airtableFindByField(tableName, "Email", escapeFormulaValue(email.toLowerCase()), {
      limit: maxSubmissions + 2,
    });
    const cutoff = Date.now() - windowMinutes * 60 * 1000;
    const recent = records.filter((r) => {
      const createdAt = r.fields?.[createdField];
      return createdAt && new Date(createdAt).getTime() > cutoff;
    });
    return { limited: recent.length >= maxSubmissions, count: recent.length };
  } catch (error) {
    return { limited: false, reason: error.message };
  }
};

// Offer applications: 3 per email per 30 minutes (unchanged behaviour).
export const checkOfferRateLimit = (tableName, email) =>
  checkAirtableRateLimit(tableName, email, { windowMinutes: 30, maxSubmissions: 3 });
