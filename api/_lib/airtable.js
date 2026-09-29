// Generic Airtable REST helpers. api/leads.js and api/reviews.js each built
// their own one-off fetch() call to Airtable; this is the same call, made
// once, reusable by any table. No new dependency — Airtable's REST API is a
// handful of fetch() calls, same as the rest of this codebase already does.

const BASE_URL = "https://api.airtable.com/v0";

const auth = () => {
  const apiKey = process.env.AIRTABLE_API_KEY;
  const baseId = process.env.AIRTABLE_BASE_ID;
  if (!apiKey || !baseId) return null;
  return { apiKey, baseId };
};

export const isAirtableConfigured = () => auth() !== null;

/** Creates one record. Airtable's `typecast` auto-creates select options and
 * infers field types on first write — this table's schema is managed from
 * the Airtable UI, the same way every other Airtable table in this repo
 * already is; there is no local migration file for it. */
export const airtableCreate = async (tableName, fields) => {
  const creds = auth();
  if (!creds) return { created: false, reason: "Airtable env not configured" };

  const clean = Object.fromEntries(
    Object.entries(fields).filter(([, value]) => value !== undefined && value !== null && value !== ""),
  );

  const response = await fetch(`${BASE_URL}/${creds.baseId}/${encodeURIComponent(tableName)}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${creds.apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ fields: clean, typecast: true }),
  });

  if (!response.ok) {
    const detail = await response.text();
    throw new Error(`Airtable create failed: ${response.status} ${detail}`);
  }

  const record = await response.json();
  return { created: true, id: record.id, fields: record.fields };
};

export const airtableUpdate = async (tableName, recordId, fields) => {
  const creds = auth();
  if (!creds) return { updated: false, reason: "Airtable env not configured" };

  const clean = Object.fromEntries(Object.entries(fields).filter(([, value]) => value !== undefined));

  const response = await fetch(`${BASE_URL}/${creds.baseId}/${encodeURIComponent(tableName)}/${recordId}`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${creds.apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ fields: clean, typecast: true }),
  });

  if (!response.ok) {
    const detail = await response.text();
    throw new Error(`Airtable update failed: ${response.status} ${detail}`);
  }

  const record = await response.json();
  return { updated: true, id: record.id, fields: record.fields };
};

/** Exact-match lookup on one field, used for rate-limiting and for the
 * opaque-token lookup behind /product-rescue/confirmed. `value` is
 * interpolated into an Airtable formula string, so callers MUST validate it
 * against a strict allow-list pattern (see api/_lib/token.js) before calling
 * this — this function does not attempt to escape arbitrary user input. */
export const airtableFindByField = async (tableName, fieldName, value, { limit = 5 } = {}) => {
  const creds = auth();
  if (!creds) return { found: false, records: [], reason: "Airtable env not configured" };

  const formula = `{${fieldName}}="${value}"`;
  const url = `${BASE_URL}/${creds.baseId}/${encodeURIComponent(tableName)}?filterByFormula=${encodeURIComponent(formula)}&maxRecords=${limit}`;

  const response = await fetch(url, {
    headers: { Authorization: `Bearer ${creds.apiKey}` },
  });

  if (!response.ok) {
    // Fail open on lookups used for rate-limiting (never block a real
    // submission over a transient Airtable read failure); callers that need
    // the record to exist (status/intake lookups) check `found` themselves.
    return { found: false, records: [], reason: `Airtable lookup failed: ${response.status}` };
  }

  const body = await response.json();
  return { found: (body.records || []).length > 0, records: body.records || [] };
};
