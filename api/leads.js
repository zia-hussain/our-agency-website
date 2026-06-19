import { readFile } from "node:fs/promises";
import path from "node:path";

const json = (res, status, body) => {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(body));
};

const isEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value || ""));

const escapeHtml = (value) =>
  String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

const money = (value) =>
  typeof value === "number"
    ? `$${Math.round(value).toLocaleString("en-US")}`
    : escapeHtml(value || "Not provided");

const storeLead = async (lead) => {
  const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
  const supabaseKey =
    process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey || supabaseUrl.includes("your_supabase")) {
    return { stored: false, reason: "Supabase env not configured" };
  }

  const response = await fetch(`${supabaseUrl.replace(/\/$/, "")}/rest/v1/leads`, {
    method: "POST",
    headers: {
      apikey: supabaseKey,
      Authorization: `Bearer ${supabaseKey}`,
      "Content-Type": "application/json",
      Prefer: "return=minimal",
    },
    body: JSON.stringify({
      email: lead.email,
      name: lead.name || null,
      company: lead.company || null,
      phone: lead.phone || null,
      source: lead.source || "website",
      lead_type: lead.leadType || "general",
      magnet_name: lead.magnetName || null,
      message: lead.message || null,
      page_url: lead.pageUrl || null,
      referrer: lead.referrer || null,
      user_agent: lead.userAgent || null,
      metadata: lead.metadata || {},
      status: "new",
    }),
  });

  if (!response.ok) {
    const detail = await response.text();
    throw new Error(`Lead storage failed: ${response.status} ${detail}`);
  }

  return { stored: true };
};

const sendResendEmail = async ({ to, subject, html, attachments }) => {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return { sent: false, reason: "RESEND_API_KEY not configured" };

  const from = process.env.LEAD_FROM_EMAIL || "Zumetrix Labs <onboarding@resend.dev>";

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: Array.isArray(to) ? to : [to],
      subject,
      html,
      attachments,
    }),
  });

  if (!response.ok) {
    const detail = await response.text();
    throw new Error(`Email send failed: ${response.status} ${detail}`);
  }

  return { sent: true };
};

const getBlueprintAttachment = async () => {
  const pdfPath = path.join(process.cwd(), "public", "downloads", "30-day-saas-mvp-blueprint.pdf");
  const file = await readFile(pdfPath);

  return [
    {
      filename: "30-day-saas-mvp-blueprint.pdf",
      content: file.toString("base64"),
    },
  ];
};

const readRequestBody = async (req) => {
  if (req.body && typeof req.body === "object") return req.body;
  if (typeof req.body === "string") return JSON.parse(req.body || "{}");

  const chunks = [];
  for await (const chunk of req) {
    chunks.push(Buffer.from(chunk));
  }

  const raw = Buffer.concat(chunks).toString("utf8");
  return raw ? JSON.parse(raw) : {};
};

const leadNotificationHtml = (lead) => {
  const metadataRows = Object.entries(lead.metadata || {})
    .map(([key, value]) => {
      const displayValue = typeof value === "object" ? JSON.stringify(value) : value;
      return `<tr><td style="padding:8px 12px;color:#777;">${escapeHtml(key)}</td><td style="padding:8px 12px;color:#111;font-weight:600;">${escapeHtml(displayValue)}</td></tr>`;
    })
    .join("");

  return `
    <div style="font-family:Inter,Arial,sans-serif;max-width:680px;margin:0 auto;color:#111;">
      <h1 style="margin:0 0 8px;font-size:26px;">New Zumetrix lead</h1>
      <p style="margin:0 0 24px;color:#555;">A new website lead came in from ${escapeHtml(lead.source || "website")}.</p>
      <table style="width:100%;border-collapse:collapse;border:1px solid #eee;border-radius:12px;overflow:hidden;">
        <tr><td style="padding:10px 12px;color:#777;">Name</td><td style="padding:10px 12px;font-weight:700;">${escapeHtml(lead.name || "Not provided")}</td></tr>
        <tr><td style="padding:10px 12px;color:#777;">Email</td><td style="padding:10px 12px;font-weight:700;">${escapeHtml(lead.email)}</td></tr>
        <tr><td style="padding:10px 12px;color:#777;">Company</td><td style="padding:10px 12px;font-weight:700;">${escapeHtml(lead.company || "Not provided")}</td></tr>
        <tr><td style="padding:10px 12px;color:#777;">Type</td><td style="padding:10px 12px;font-weight:700;">${escapeHtml(lead.leadType || "general")}</td></tr>
        <tr><td style="padding:10px 12px;color:#777;">Page</td><td style="padding:10px 12px;font-weight:700;">${escapeHtml(lead.pageUrl || "Unknown")}</td></tr>
        ${metadataRows}
      </table>
      ${lead.message ? `<p style="margin:24px 0 0;padding:16px;background:#f8f8f8;border-radius:12px;line-height:1.6;">${escapeHtml(lead.message)}</p>` : ""}
    </div>
  `;
};

const blueprintEmailHtml = (lead) => `
  <div style="font-family:Inter,Arial,sans-serif;max-width:680px;margin:0 auto;color:#111;line-height:1.65;">
    <p style="color:#c98f67;font-weight:700;letter-spacing:.12em;text-transform:uppercase;">Zumetrix Labs</p>
    <h1 style="font-size:30px;line-height:1.15;margin:0 0 16px;">Your SaaS MVP blueprint is attached.</h1>
    <p>Hey ${escapeHtml(lead.name || "there")},</p>
    <p>Thanks for requesting the 30-day SaaS MVP blueprint. I attached the PDF here, and you can also keep this simple rule in mind before you read it:</p>
    <p style="padding:18px 20px;border-left:4px solid #c98f67;background:#faf7f4;border-radius:10px;"><strong>A useful MVP is not the smallest product. It is the smallest version that can prove one real business decision.</strong></p>
    <p>If you want us to review your idea, timeline, or first feature list, reply to this email or book a call from the website.</p>
    <p style="margin-top:28px;">Zia & Omer<br/>Zumetrix Labs</p>
  </div>
`;

const roiEmailHtml = (lead) => {
  const m = lead.metadata || {};

  return `
    <div style="font-family:Inter,Arial,sans-serif;max-width:720px;margin:0 auto;color:#111;line-height:1.65;">
      <p style="color:#c98f67;font-weight:700;letter-spacing:.12em;text-transform:uppercase;">Zumetrix Labs</p>
      <h1 style="font-size:30px;line-height:1.15;margin:0 0 16px;">Your AI automation ROI estimate</h1>
      <p>Hey ${escapeHtml(lead.name || "there")},</p>
      <p>Here is the estimate you requested. Treat this as a planning signal, not a final quote. The real number depends on the workflow, exceptions, tools, data quality, and how much human review still needs to stay in the loop.</p>
      <table style="width:100%;border-collapse:collapse;margin:24px 0;border:1px solid #eee;border-radius:12px;overflow:hidden;">
        <tr><td style="padding:12px;color:#777;">Process</td><td style="padding:12px;font-weight:700;">${escapeHtml(m.processName)}</td></tr>
        <tr><td style="padding:12px;color:#777;">Manual hours saved weekly</td><td style="padding:12px;font-weight:700;">${escapeHtml(m.hoursSavedWeekly)} hours</td></tr>
        <tr><td style="padding:12px;color:#777;">Estimated monthly savings</td><td style="padding:12px;font-weight:700;">${money(m.monthlySavings)}</td></tr>
        <tr><td style="padding:12px;color:#777;">Estimated yearly savings</td><td style="padding:12px;font-weight:700;">${money(m.yearlySavings)}</td></tr>
        <tr><td style="padding:12px;color:#777;">Estimated payback</td><td style="padding:12px;font-weight:700;">${escapeHtml(m.paybackMonths)} months</td></tr>
      </table>
      <p><strong>Best next step:</strong> write down the exact task, who touches it, what can go wrong, and what should happen when the automation is unsure. That is where most automation projects either become profitable or become messy.</p>
      <p>If you want, reply with the workflow you are thinking about and we will tell you what should be automated first.</p>
      <p style="margin-top:28px;">Zia & Omer<br/>Zumetrix Labs</p>
    </div>
  `;
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return json(res, 405, { success: false, error: "Method not allowed" });
  }

  try {
    const lead = await readRequestBody(req);

    if (!isEmail(lead.email)) {
      return json(res, 400, { success: false, error: "A valid email is required." });
    }

    const normalizedLead = {
      ...lead,
      email: String(lead.email).trim().toLowerCase(),
      leadType: lead.leadType || "general",
      source: lead.source || "website",
      metadata: lead.metadata || {},
    };

    const storage = await storeLead(normalizedLead).catch((error) => ({
      stored: false,
      reason: error.message,
    }));

    const ownerEmail = (process.env.LEAD_NOTIFICATION_EMAIL || "hello@zumetrix.com")
      .split(",")
      .map((email) => email.trim())
      .filter(Boolean);
    const ownerCopy = await sendResendEmail({
      to: ownerEmail,
      subject: `New ${normalizedLead.leadType} lead: ${normalizedLead.email}`,
      html: leadNotificationHtml(normalizedLead),
    }).catch((error) => ({ sent: false, reason: error.message }));

    let userCopy = { sent: false, reason: "No user email configured for this lead type" };

    if (normalizedLead.leadType === "lead_magnet") {
      const attachments = await getBlueprintAttachment();
      userCopy = await sendResendEmail({
        to: normalizedLead.email,
        subject: "Your 30-day SaaS MVP blueprint",
        html: blueprintEmailHtml(normalizedLead),
        attachments,
      }).catch((error) => ({ sent: false, reason: error.message }));
    }

    if (normalizedLead.leadType === "roi_calculator") {
      userCopy = await sendResendEmail({
        to: normalizedLead.email,
        subject: "Your AI automation ROI estimate",
        html: roiEmailHtml(normalizedLead),
      }).catch((error) => ({ sent: false, reason: error.message }));
    }

    const handled = Boolean(storage.stored || ownerCopy.sent || userCopy.sent);

    return json(res, handled ? 200 : 503, {
      success: handled,
      stored: storage.stored,
      notificationSent: ownerCopy.sent,
      userEmailSent: userCopy.sent,
      warnings: [storage.reason, ownerCopy.reason, userCopy.reason].filter(Boolean),
      error: handled ? undefined : "Lead delivery is not configured yet.",
    });
  } catch (error) {
    console.error("Lead API error:", error);
    return json(res, 500, {
      success: false,
      error: "We could not process this request. Please contact hello@zumetrix.com.",
    });
  }
}
