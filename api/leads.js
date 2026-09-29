import { readFile } from "node:fs/promises";
import path from "node:path";
import { escapeHtml, humanize, isEmail, money } from "./_lib/text.js";
import { BRAND, detailRows, emailShell, sendResendEmail, statLine } from "./_lib/email.js";

const json = (res, status, body) => {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(body));
};

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
      Prefer: "return=representation",
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

  const records = await response.json();
  return { stored: true, id: records?.[0]?.id };
};

// Durable, serverless-safe throttle: reads recent rows straight from Supabase
// instead of in-memory state, which would reset on every cold start and
// wouldn't be shared across concurrent function instances anyway.
const RATE_LIMIT_WINDOW_MINUTES = 10;
const RATE_LIMIT_MAX_SUBMISSIONS = 5;

const checkRateLimit = async (email) => {
  const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
  const supabaseKey =
    process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey || supabaseUrl.includes("your_supabase")) {
    return { limited: false, reason: "Supabase env not configured" };
  }

  const since = new Date(Date.now() - RATE_LIMIT_WINDOW_MINUTES * 60 * 1000).toISOString();
  const response = await fetch(
    `${supabaseUrl.replace(/\/$/, "")}/rest/v1/leads?email=eq.${encodeURIComponent(email)}&created_at=gte.${encodeURIComponent(since)}&select=id`,
    {
      headers: {
        apikey: supabaseKey,
        Authorization: `Bearer ${supabaseKey}`,
      },
    },
  );

  if (!response.ok) {
    // Fail open: a broken rate-limit check should never block a real lead.
    return { limited: false, reason: `Rate limit check failed: ${response.status}` };
  }

  const rows = await response.json();
  return { limited: rows.length >= RATE_LIMIT_MAX_SUBMISSIONS, count: rows.length };
};

const syncLeadToAirtable = async (lead, supabaseLeadId) => {
  const apiKey = process.env.AIRTABLE_API_KEY;
  const baseId = process.env.AIRTABLE_BASE_ID;
  const tableName = process.env.AIRTABLE_LEADS_TABLE || "Website Leads";

  if (!apiKey || !baseId) {
    return { synced: false, reason: "Airtable env not configured" };
  }

  const metadata = lead.metadata || {};
  const now = new Date().toISOString();
  const fields = {
    Name: lead.name || lead.email,
    Email: lead.email,
    Company: lead.company || "",
    Phone: lead.phone || "",
    "Lead Type": humanize(lead.leadType || "general"),
    Status: "New",
    Source: humanize(lead.source || "website"),
    "Project Type": metadata.projectType || "",
    Budget: metadata.budget || "",
    Timeline: metadata.timeline || "",
    Message: lead.message || "",
    "Magnet Name": lead.magnetName || "",
    "Page URL": lead.pageUrl || "",
    Referrer: lead.referrer || "",
    "UTM Source": metadata.utmSource || "",
    "UTM Medium": metadata.utmMedium || "",
    "UTM Campaign": metadata.utmCampaign || "",
    "Marketing Consent": Boolean(metadata.marketingConsent),
    "Supabase Lead ID": supabaseLeadId || "",
    "Created At": now,
    "Last Activity": now,
    Metadata: JSON.stringify(metadata, null, 2),
  };

  const response = await fetch(
    `https://api.airtable.com/v0/${baseId}/${encodeURIComponent(tableName)}`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ fields, typecast: true }),
    },
  );

  if (!response.ok) {
    const detail = await response.text();
    throw new Error(`Airtable sync failed: ${response.status} ${detail}`);
  }

  const record = await response.json();
  return { synced: true, id: record.id };
};

const syncMarketingSubscription = async (lead) => {
  const hasConsent =
    lead.leadType === "newsletter" || Boolean(lead.metadata?.marketingConsent);
  if (!hasConsent) return { subscribed: false, reason: "Marketing consent not provided" };

  const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
  const supabaseKey =
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.SUPABASE_ANON_KEY ||
    process.env.VITE_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    return { subscribed: false, reason: "Supabase env not configured" };
  }

  const now = new Date().toISOString();
  const response = await fetch(
    `${supabaseUrl.replace(/\/$/, "")}/rest/v1/marketing_subscribers?on_conflict=email`,
    {
      method: "POST",
      headers: {
        apikey: supabaseKey,
        Authorization: `Bearer ${supabaseKey}`,
        "Content-Type": "application/json",
        Prefer: "resolution=merge-duplicates,return=representation",
      },
      body: JSON.stringify({
        email: lead.email.toLowerCase(),
        name: lead.name || null,
        company: lead.company || null,
        status: "subscribed",
        consent_source: lead.source || lead.leadType || "website",
        consent_page_url: lead.pageUrl || null,
        consent_at: now,
        unsubscribed_at: null,
        metadata: lead.metadata || {},
        updated_at: now,
      }),
    },
  );

  if (!response.ok) {
    const detail = await response.text();
    throw new Error(`Marketing subscription failed: ${response.status} ${detail}`);
  }

  const records = await response.json();
  return { subscribed: true, id: records?.[0]?.id };
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
  const metadata = Object.entries(lead.metadata || {}).map(([key, value]) => ({
    label: humanize(key),
    value: typeof value === "object" ? JSON.stringify(value) : String(value ?? ""),
  }));
  const type = humanize(lead.leadType || "general");
  const rows = [
    { label: "Name", value: lead.name || "Not provided" },
    { label: "Email", value: lead.email },
    { label: "Company", value: lead.company || "Not provided" },
    { label: "Lead type", value: type },
    { label: "Source", value: humanize(lead.source || "website") },
    { label: "Page", value: lead.pageUrl || "Unknown" },
    ...metadata,
  ];
  const actionLabel = lead.leadType === "contact"
    ? "Reply personally"
    : lead.leadType === "roi_calculator"
      ? "Review workflow"
      : lead.leadType === "lead_magnet"
        ? "Warm follow-up"
        : "Review lead";

  return emailShell({
    preheader: `New ${type.toLowerCase()} lead from ${lead.email}`,
    eyebrow: "New website opportunity",
    title: `${type} lead from ${lead.name || lead.email}.`,
    intro: `The useful context is organized by priority below. Start with the opportunity signal, then use the detailed fields only when you need them.`,
    content: `
      ${statLine([
        { label: "Lead type", value: type, tone: "copper" },
        { label: "Source", value: humanize(lead.source || "website"), tone: "blue" },
        { label: "Next action", value: actionLabel, tone: "green" },
      ])}
      <div style="margin-top:34px;">
        <div style="margin-bottom:14px;color:${BRAND.text};font-size:17px;font-weight:680;">Lead context</div>
        ${detailRows(rows)}
      </div>
      ${lead.message ? `
        <div style="margin-top:30px;padding:0 0 0 20px;border-left:2px solid ${BRAND.accent};">
          <div style="margin-bottom:9px;color:${BRAND.accent};font-size:11px;font-weight:650;letter-spacing:1.3px;text-transform:uppercase;">Their message</div>
          <div style="color:${BRAND.text};font-size:15px;line-height:1.8;">${escapeHtml(lead.message)}</div>
        </div>
      ` : ""}
      <p style="margin:30px 0 0;color:${BRAND.muted};font-size:13px;line-height:1.75;">Reply directly to this email to continue the conversation with ${escapeHtml(lead.name || lead.email)}.</p>
    `,
    cta: { href: `mailto:${lead.email}`, label: "Reply to lead" },
  });
};

const blueprintEmailHtml = (lead) => emailShell({
  preheader: "Your 30-day SaaS MVP blueprint is attached.",
  eyebrow: "Your requested guide",
  title: "Build the smallest version that proves something.",
  intro: `Hey ${escapeHtml(lead.name || "there")}, your <strong style="color:${BRAND.text};">30-day SaaS MVP blueprint</strong> is attached to this email. It gives you a practical structure for moving from an idea to a focused first release without building every possible feature.`,
  content: `
    <div style="padding:2px 0 2px 24px;border-left:2px solid ${BRAND.accent};">
      <div style="color:${BRAND.accent};font-size:11px;font-weight:650;letter-spacing:1.4px;text-transform:uppercase;">The principle to remember</div>
      <p style="margin:13px 0 0;color:${BRAND.text};font-size:22px;line-height:1.5;font-weight:620;">A useful MVP is not the smallest product. It is the smallest version that can prove one real business decision.</p>
    </div>
    ${statLine([
      { label: "Release window", value: "30 days", tone: "blue" },
      { label: "Primary goal", value: "Clarity", tone: "copper" },
      { label: "Guide", value: "Attached PDF", tone: "green" },
    ])}
    <div style="margin-top:34px;">
      <div style="color:${BRAND.text};font-size:17px;font-weight:680;">Use the guide in this order</div>
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin-top:15px;">
        <tr>
          <td valign="middle" style="width:38px;padding:6px 0;">
            <span style="display:inline-block;width:25px;height:25px;border:1px solid #49301F;border-radius:50%;color:${BRAND.accent};font-size:11px;line-height:25px;font-weight:700;text-align:center;">01</span>
          </td>
          <td valign="middle" style="padding:6px 0;color:${BRAND.muted};font-size:14px;line-height:1.7;">Define the first user and the painful job they need to finish.</td>
        </tr>
        <tr>
          <td valign="middle" style="width:38px;padding:9px 0;">
            <span style="display:inline-block;width:25px;height:25px;border:1px solid #49301F;border-radius:50%;color:${BRAND.accent};font-size:11px;line-height:25px;font-weight:700;text-align:center;">02</span>
          </td>
          <td valign="middle" style="padding:9px 0;color:${BRAND.muted};font-size:14px;line-height:1.7;">Choose one outcome the first release must prove.</td>
        </tr>
        <tr>
          <td valign="middle" style="width:38px;padding:9px 0;">
            <span style="display:inline-block;width:25px;height:25px;border:1px solid #49301F;border-radius:50%;color:${BRAND.accent};font-size:11px;line-height:25px;font-weight:700;text-align:center;">03</span>
          </td>
          <td valign="middle" style="padding:9px 0;color:${BRAND.muted};font-size:14px;line-height:1.7;">Move every non-essential idea into a deliberate later-release list.</td>
        </tr>
      </table>
    </div>
    <p style="margin:25px 0 0;color:${BRAND.muted};font-size:14px;line-height:1.75;">If you want a second opinion on your feature list, timeline, or technical direction, reply to this email. We will tell you clearly what belongs in version one and what should wait.</p>
    <p style="margin:25px 0 0;color:${BRAND.text};font-size:14px;line-height:1.6;font-weight:650;">Zia &amp; Omer<br><span style="color:${BRAND.subtle};font-weight:400;">Zumetrix Labs</span></p>
  `,
  cta: { href: "https://www.zumetrix.com/contact", label: "Review your MVP idea" },
});

const contactEmailHtml = (lead) => {
  const metadata = lead.metadata || {};

  return emailShell({
    preheader: "We received your project brief and the next step is clear.",
    eyebrow: "Project brief received",
    title: "Your project is now on our desk.",
    intro: `Hey ${escapeHtml(lead.name || "there")}, thank you for trusting Zumetrix Labs with the first look at your project. We received your brief and will review the business goal, scope, timeline, and the decisions that matter before replying.`,
    content: `
      ${statLine([
        { label: "Status", value: "Received", tone: "green" },
        { label: "Project", value: metadata.projectType || "Software project", tone: "copper" },
        { label: "Response", value: "Within 24 hours", tone: "blue" },
      ])}
      <div style="margin-top:34px;">
        <div style="margin-bottom:14px;color:${BRAND.text};font-size:17px;font-weight:680;">What happens next</div>
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
          ${[
            ["01", "We read the complete brief and identify the actual business decision behind the build."],
            ["02", "We review scope, timeline, technical risk, and anything that should not enter version one."],
            ["03", "We reply with useful questions and the clearest next step, even if that means recommending a smaller starting point."],
          ].map(([number, text]) => `
            <tr>
              <td valign="middle" style="width:38px;padding:8px 0;">
                <span style="display:inline-block;width:25px;height:25px;border:1px solid #49301F;border-radius:50%;color:${BRAND.accent};font-size:11px;line-height:25px;font-weight:700;text-align:center;">${number}</span>
              </td>
              <td valign="middle" style="padding:8px 0;color:${BRAND.muted};font-size:14px;line-height:1.7;">${text}</td>
            </tr>
          `).join("")}
        </table>
      </div>
      <div style="margin-top:30px;padding:0 0 0 20px;border-left:2px solid ${BRAND.accent};">
        <div style="margin-bottom:9px;color:${BRAND.accent};font-size:11px;font-weight:650;letter-spacing:1.3px;text-transform:uppercase;">Your brief</div>
        <div style="color:${BRAND.text};font-size:15px;line-height:1.8;">${escapeHtml(lead.message || "Project details received.")}</div>
      </div>
      <p style="margin:28px 0 0;color:${BRAND.muted};font-size:14px;line-height:1.75;">Need to add context, a document, or a reference link? Reply directly to this email and it will stay connected to your inquiry.</p>
      <p style="margin:25px 0 0;color:${BRAND.text};font-size:14px;line-height:1.6;font-weight:650;">Zia &amp; Omer<br><span style="color:${BRAND.subtle};font-weight:400;">Zumetrix Labs</span></p>
    `,
    cta: { href: "https://calendly.com/zumetrix-labs/consultation", label: "Schedule a conversation" },
  });
};

const roiEmailHtml = (lead) => {
  const m = lead.metadata || {};

  return emailShell({
    preheader: `Your ${m.processName || "AI automation"} ROI estimate is ready.`,
    eyebrow: "Your planning estimate",
    title: "The opportunity looks promising. Now validate the workflow.",
    intro: `Hey ${escapeHtml(lead.name || "there")}, here is the estimate generated for <strong style="color:${BRAND.text};">${escapeHtml(m.processName || "your workflow")}</strong>. Use it as a planning signal rather than a final quote: the real outcome depends on exceptions, data quality, connected tools, and where human judgment still matters.`,
    content: `
      ${statLine([
        { label: "Weekly time saved", value: `${escapeHtml(m.hoursSavedWeekly || "0")} hrs`, tone: "blue" },
        { label: "Monthly estimate", value: money(m.monthlySavings), tone: "copper" },
        { label: "Yearly estimate", value: money(m.yearlySavings), tone: "green" },
      ])}
      <div style="margin-top:32px;">
        <div style="margin-bottom:14px;color:${BRAND.text};font-size:17px;font-weight:680;">Estimate assumptions</div>
        ${detailRows([
          { label: "Workflow", value: m.processName || "Not provided" },
          { label: "Estimated payback", value: `${m.paybackMonths || "Not available"} months` },
          { label: "Assumed reduction", value: m.assumedReductionPercent ? `Up to ${m.assumedReductionPercent}%` : "Planning assumption" },
          { label: "Setup-cost assumption", value: money(m.automationCostAssumption) },
        ])}
      </div>
      <div style="margin-top:32px;padding:2px 0 2px 22px;border-left:2px solid ${BRAND.accent};">
        <div style="color:${BRAND.accent};font-size:11px;font-weight:650;letter-spacing:1.4px;text-transform:uppercase;">Before automating</div>
        <p style="margin:11px 0 0;color:${BRAND.text};font-size:16px;line-height:1.75;">Document the exact task, who touches it, what can go wrong, and what should happen when the automation is uncertain. That boundary is where profitable automation begins.</p>
      </div>
      <p style="margin:25px 0 0;color:${BRAND.muted};font-size:14px;line-height:1.75;">Reply with the workflow you are considering. We will help you identify the first automation worth building and the complexity that should stay out of phase one.</p>
      <p style="margin:25px 0 0;color:${BRAND.text};font-size:14px;line-height:1.6;font-weight:650;">Zia &amp; Omer<br><span style="color:${BRAND.subtle};font-weight:400;">Zumetrix Labs</span></p>
    `,
    cta: { href: "https://www.zumetrix.com/contact", label: "Review this workflow" },
  });
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return json(res, 405, { success: false, error: "Method not allowed" });
  }

  try {
    const lead = await readRequestBody(req);

    // Honeypot: a hidden field real visitors never see or fill. Bots that
    // fill every field trip it. Respond as if it succeeded so the bot gets
    // no signal that it was caught, but do nothing with the submission.
    if (lead.hpToken) {
      return json(res, 200, { success: true, stored: false, honeypot: true });
    }

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

    const rateLimit = await checkRateLimit(normalizedLead.email).catch(() => ({ limited: false }));
    if (rateLimit.limited) {
      return json(res, 429, {
        success: false,
        error: "Too many submissions from this email recently. Please try again shortly, or email hello@zumetrix.com directly.",
      });
    }

    const storage = await storeLead(normalizedLead).catch((error) => ({
      stored: false,
      reason: error.message,
    }));
    const airtable = await syncLeadToAirtable(normalizedLead, storage.id).catch((error) => ({
      synced: false,
      reason: error.message,
    }));
    const marketing = await syncMarketingSubscription(normalizedLead).catch((error) => ({
      subscribed: false,
      reason: error.message,
    }));

    let userCopy = { sent: false };

    if (normalizedLead.leadType === "lead_magnet") {
      const attachments = await getBlueprintAttachment();
      userCopy = await sendResendEmail({
        to: normalizedLead.email,
        subject: "Your 30-day SaaS MVP blueprint",
        html: blueprintEmailHtml(normalizedLead),
        attachments,
        replyTo: "hello@zumetrix.com",
      }).catch((error) => ({ sent: false, reason: error.message }));
    }

    if (normalizedLead.leadType === "roi_calculator") {
      userCopy = await sendResendEmail({
        to: normalizedLead.email,
        subject: "Your AI automation ROI estimate",
        html: roiEmailHtml(normalizedLead),
        replyTo: "hello@zumetrix.com",
      }).catch((error) => ({ sent: false, reason: error.message }));
    }

    if (normalizedLead.leadType === "contact") {
      userCopy = await sendResendEmail({
        to: normalizedLead.email,
        subject: "We received your project brief",
        html: contactEmailHtml(normalizedLead),
        replyTo: "hello@zumetrix.com",
      }).catch((error) => ({ sent: false, reason: error.message }));
    }

    const ownerEmail = (process.env.LEAD_NOTIFICATION_EMAIL || "hello@zumetrix.com")
      .split(",")
      .map((email) => email.trim())
      .filter(Boolean);
    const ownerCopy = await sendResendEmail({
      to: ownerEmail,
      subject: `New ${normalizedLead.leadType} lead: ${normalizedLead.email}`,
      html: leadNotificationHtml(normalizedLead),
      replyTo: normalizedLead.email,
    }).catch((error) => ({ sent: false, reason: error.message }));

    const handled = Boolean(storage.stored || airtable.synced || ownerCopy.sent || userCopy.sent);

    return json(res, handled ? 200 : 503, {
      success: handled,
      stored: storage.stored,
      airtableSynced: airtable.synced,
      marketingSubscribed: marketing.subscribed,
      notificationSent: ownerCopy.sent,
      userEmailSent: userCopy.sent,
      warnings: [
        storage.reason,
        airtable.reason,
        marketing.reason === "Marketing consent not provided" ? null : marketing.reason,
        ownerCopy.reason,
        userCopy.reason,
      ].filter(Boolean),
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
