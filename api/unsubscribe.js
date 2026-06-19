const supabaseConfig = () => {
  const url = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
  const key =
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.SUPABASE_ANON_KEY ||
    process.env.VITE_SUPABASE_ANON_KEY;

  return { url: url?.replace(/\/$/, ""), key };
};

const redirect = (res, status) => {
  res.statusCode = 302;
  res.setHeader("Location", `/unsubscribe?status=${status}`);
  res.end();
};

const syncAirtablePreference = async (email) => {
  const apiKey = process.env.AIRTABLE_API_KEY;
  const baseId = process.env.AIRTABLE_BASE_ID;
  const tableName = process.env.AIRTABLE_LEADS_TABLE || "Website Leads";
  if (!apiKey || !baseId) return;

  const formula = encodeURIComponent(`{Email}='${email.replaceAll("'", "\\'")}'`);
  const listResponse = await fetch(
    `https://api.airtable.com/v0/${baseId}/${encodeURIComponent(tableName)}?filterByFormula=${formula}`,
    { headers: { Authorization: `Bearer ${apiKey}` } },
  );
  if (!listResponse.ok) return;

  const payload = await listResponse.json();
  await Promise.all(
    (payload.records || []).map((record) =>
      fetch(
        `https://api.airtable.com/v0/${baseId}/${encodeURIComponent(tableName)}/${record.id}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            fields: {
              "Marketing Consent": false,
              "Last Activity": new Date().toISOString(),
            },
          }),
        },
      ),
    ),
  );
};

export default async function handler(req, res) {
  if (req.method !== "GET") {
    res.statusCode = 405;
    res.setHeader("Allow", "GET");
    return res.end();
  }

  const token = String(req.query?.token || "");
  if (!/^[0-9a-f-]{36}$/i.test(token)) return redirect(res, "invalid");

  const { url, key } = supabaseConfig();
  if (!url || !key) return redirect(res, "error");

  try {
    const response = await fetch(
      `${url}/rest/v1/marketing_subscribers?unsubscribe_token=eq.${encodeURIComponent(token)}`,
      {
        method: "PATCH",
        headers: {
          apikey: key,
          Authorization: `Bearer ${key}`,
          "Content-Type": "application/json",
          Prefer: "return=representation",
        },
        body: JSON.stringify({
          status: "unsubscribed",
          unsubscribed_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        }),
      },
    );
    const records = response.ok ? await response.json() : [];
    if (records[0]?.email) {
      await syncAirtablePreference(records[0].email).catch((error) =>
        console.warn("Airtable unsubscribe sync failed:", error),
      );
    }

    return redirect(res, records.length ? "success" : "invalid");
  } catch (error) {
    console.error("Unsubscribe error:", error);
    return redirect(res, "error");
  }
}
