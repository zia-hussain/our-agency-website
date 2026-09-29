// Durable, serverless-safe rate limit for the offer-application endpoint —
// same shape as api/leads.js's Supabase-backed checkRateLimit, but reading
// from Airtable instead, because the offer system is deliberately kept off
// Supabase (see audit Section 3). Airtable is already the durable record for
// this flow, so it's also the natural place to ask "has this email already
// applied recently."
import { airtableFindByField } from "./airtable.js";

const WINDOW_MINUTES = 30;
const MAX_SUBMISSIONS = 3;

export const checkOfferRateLimit = async (tableName, email) => {
  // Airtable's filterByFormula can't do "created in the last N minutes"
  // without a formula field keyed to NOW(), which this table doesn't define.
  // A same-email lookup capped at a handful of recent records is enough to
  // stop the realistic case (double-click, retry-happy bot) without adding
  // Airtable schema the base doesn't already need. Fails open, same as the
  // existing leads.js rate limiter: a broken check never blocks a real
  // applicant.
  try {
    const { records } = await airtableFindByField(tableName, "Email", email.toLowerCase(), { limit: MAX_SUBMISSIONS + 2 });
    const cutoff = Date.now() - WINDOW_MINUTES * 60 * 1000;
    const recent = records.filter((r) => {
      const createdAt = r.fields?.["Created At"];
      return createdAt && new Date(createdAt).getTime() > cutoff;
    });
    return { limited: recent.length >= MAX_SUBMISSIONS, count: recent.length };
  } catch (error) {
    return { limited: false, reason: error.message };
  }
};
