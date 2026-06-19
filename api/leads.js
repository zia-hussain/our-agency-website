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

const wait = (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds));

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

const sendResendEmail = async ({ to, subject, html, attachments, replyTo }) => {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return { sent: false, reason: "RESEND_API_KEY not configured" };

  const from = process.env.LEAD_FROM_EMAIL || "Zumetrix Labs <onboarding@resend.dev>";

  for (let attempt = 0; attempt < 3; attempt += 1) {
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
        reply_to: replyTo,
      }),
    });

    if (response.ok) return { sent: true };

    const detail = await response.text();
    if (response.status !== 429 || attempt === 2) {
      throw new Error(`Email send failed: ${response.status} ${detail}`);
    }

    const retryAfter = Number(response.headers.get("retry-after"));
    await wait(Number.isFinite(retryAfter) ? retryAfter * 1000 : 750 * (attempt + 1));
  }

  return { sent: false, reason: "Email retry limit reached" };
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

const BRAND = {
  background: "#070707",
  surface: "#101010",
  surfaceRaised: "#151311",
  border: "#292421",
  accent: "#C98F67",
  accentSoft: "#241A15",
  text: "#F4F2F0",
  muted: "#A8A39F",
  subtle: "#77716D",
};

const humanize = (value) =>
  String(value || "")
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replaceAll("_", " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());

const emailShell = ({ preheader, eyebrow, title, intro, content, cta }) => `
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <meta name="color-scheme" content="dark">
    <meta name="supported-color-schemes" content="dark">
    <title>${escapeHtml(title)}</title>
  </head>
  <body style="margin:0;padding:0;background:${BRAND.background};color:${BRAND.text};font-family:Inter,-apple-system,BlinkMacSystemFont,'Segoe UI',Arial,sans-serif;">
    <div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;">${escapeHtml(preheader)}</div>
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="width:100%;background:${BRAND.background};">
      <tr>
        <td align="center" style="padding:36px 16px;">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="width:100%;max-width:680px;">
            <tr>
              <td style="padding:0 8px 22px;">
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                  <tr>
                    <td style="font-size:22px;font-weight:800;color:${BRAND.text};letter-spacing:0;">
                      <span style="color:${BRAND.accent};">Z</span>umetrix
                      <span style="font-size:10px;color:${BRAND.accent};vertical-align:top;margin-left:3px;">LABS</span>
                    </td>
                    <td align="right" style="font-size:11px;color:${BRAND.subtle};letter-spacing:1.4px;text-transform:uppercase;">
                      Forge clear ideas<br>into shipped software
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td style="background:${BRAND.surface};border:1px solid ${BRAND.border};border-radius:8px;overflow:hidden;">
                <div style="height:3px;background:${BRAND.accent};font-size:0;line-height:0;">&nbsp;</div>
                <div style="padding:44px 44px 18px;">
                  <div style="margin:0 0 15px;color:${BRAND.accent};font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;">${escapeHtml(eyebrow)}</div>
                  <h1 style="margin:0;color:${BRAND.text};font-size:34px;line-height:1.15;font-weight:760;letter-spacing:0;">${escapeHtml(title)}</h1>
                  ${intro ? `<p style="margin:18px 0 0;color:${BRAND.muted};font-size:16px;line-height:1.75;">${intro}</p>` : ""}
                </div>
                <div style="padding:12px 44px 44px;">
                  ${content}
                  ${cta ? `
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin-top:30px;">
                      <tr>
                        <td style="background:${BRAND.accent};border-radius:6px;">
                          <a href="${escapeHtml(cta.href)}" style="display:inline-block;padding:14px 20px;color:#090909;text-decoration:none;font-size:14px;font-weight:750;">${escapeHtml(cta.label)} &nbsp;&#8594;</a>
                        </td>
                      </tr>
                    </table>
                  ` : ""}
                </div>
              </td>
            </tr>
            <tr>
              <td style="padding:22px 8px 0;text-align:center;color:${BRAND.subtle};font-size:11px;line-height:1.7;">
                Zumetrix Labs &nbsp;&middot;&nbsp; SaaS MVPs, web and mobile products, AI automation<br>
                <a href="https://www.zumetrix.com" style="color:${BRAND.accent};text-decoration:none;">zumetrix.com</a>
                &nbsp;&middot;&nbsp;
                <a href="mailto:hello@zumetrix.com" style="color:${BRAND.accent};text-decoration:none;">hello@zumetrix.com</a>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
`;

const detailRows = (rows) => `
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="width:100%;border-collapse:separate;border-spacing:0;background:${BRAND.surfaceRaised};border:1px solid ${BRAND.border};border-radius:7px;overflow:hidden;">
    ${rows.map(({ label, value }, index) => `
      <tr>
        <td style="width:36%;padding:13px 16px;color:${BRAND.subtle};font-size:12px;line-height:1.5;${index ? `border-top:1px solid ${BRAND.border};` : ""}">${escapeHtml(label)}</td>
        <td style="padding:13px 16px;color:${BRAND.text};font-size:13px;font-weight:650;line-height:1.5;word-break:break-word;${index ? `border-top:1px solid ${BRAND.border};` : ""}">${escapeHtml(value || "Not provided")}</td>
      </tr>
    `).join("")}
  </table>
`;

const metricCards = (metrics) => `
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="width:100%;border-collapse:separate;border-spacing:8px 0;margin:24px -8px 0;">
    <tr>
      ${metrics.map(({ label, value }) => `
        <td width="${Math.floor(100 / metrics.length)}%" valign="top" style="background:${BRAND.surfaceRaised};border:1px solid ${BRAND.border};border-radius:7px;padding:17px 15px;">
          <div style="color:${BRAND.subtle};font-size:10px;line-height:1.4;letter-spacing:1.2px;text-transform:uppercase;">${escapeHtml(label)}</div>
          <div style="margin-top:8px;color:${BRAND.text};font-size:21px;line-height:1.2;font-weight:760;">${escapeHtml(value)}</div>
        </td>
      `).join("")}
    </tr>
  </table>
`;

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

  return emailShell({
    preheader: `New ${type.toLowerCase()} lead from ${lead.email}`,
    eyebrow: "New website opportunity",
    title: `${lead.name || lead.email} just reached out.`,
    intro: `A new <strong style="color:${BRAND.text};">${escapeHtml(type)}</strong> lead arrived through ${escapeHtml(humanize(lead.source || "website"))}. The complete context is below so you can respond without opening another system.`,
    content: `
      ${detailRows(rows)}
      ${lead.message ? `
        <div style="margin-top:22px;padding:20px;background:${BRAND.accentSoft};border:1px solid #493124;border-radius:7px;">
          <div style="margin-bottom:8px;color:${BRAND.accent};font-size:10px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;">Their message</div>
          <div style="color:${BRAND.text};font-size:14px;line-height:1.75;">${escapeHtml(lead.message)}</div>
        </div>
      ` : ""}
      <p style="margin:22px 0 0;color:${BRAND.muted};font-size:13px;line-height:1.7;">Reply directly to this email to continue the conversation with ${escapeHtml(lead.name || lead.email)}.</p>
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
    <div style="padding:22px;background:${BRAND.accentSoft};border:1px solid #493124;border-radius:7px;">
      <div style="color:${BRAND.accent};font-size:10px;font-weight:700;letter-spacing:1.6px;text-transform:uppercase;">The principle to remember</div>
      <p style="margin:11px 0 0;color:${BRAND.text};font-size:19px;line-height:1.55;font-weight:650;">A useful MVP is not the smallest product. It is the smallest version that can prove one real business decision.</p>
    </div>
    ${metricCards([
      { label: "Release window", value: "30 days" },
      { label: "Primary goal", value: "Clarity" },
      { label: "Format", value: "PDF guide" },
    ])}
    <div style="margin-top:26px;">
      <div style="color:${BRAND.text};font-size:15px;font-weight:700;">A good way to use it</div>
      <ol style="margin:13px 0 0;padding-left:20px;color:${BRAND.muted};font-size:14px;line-height:1.8;">
        <li>Write down the first user and the painful job they need to finish.</li>
        <li>Choose one outcome the first release must prove.</li>
        <li>Move everything else into a later-release list.</li>
      </ol>
    </div>
    <p style="margin:25px 0 0;color:${BRAND.muted};font-size:14px;line-height:1.75;">If you want a second opinion on your feature list, timeline, or technical direction, reply to this email. We will tell you clearly what belongs in version one and what should wait.</p>
    <p style="margin:25px 0 0;color:${BRAND.text};font-size:14px;line-height:1.6;font-weight:650;">Zia &amp; Omer<br><span style="color:${BRAND.subtle};font-weight:400;">Zumetrix Labs</span></p>
  `,
  cta: { href: "https://www.zumetrix.com/contact", label: "Review your MVP idea" },
});

const roiEmailHtml = (lead) => {
  const m = lead.metadata || {};

  return emailShell({
    preheader: `Your ${m.processName || "AI automation"} ROI estimate is ready.`,
    eyebrow: "Your planning estimate",
    title: "The opportunity looks promising. Now validate the workflow.",
    intro: `Hey ${escapeHtml(lead.name || "there")}, here is the estimate generated for <strong style="color:${BRAND.text};">${escapeHtml(m.processName || "your workflow")}</strong>. Use it as a planning signal rather than a final quote: the real outcome depends on exceptions, data quality, connected tools, and where human judgment still matters.`,
    content: `
      ${metricCards([
        { label: "Weekly time saved", value: `${escapeHtml(m.hoursSavedWeekly || "0")} hrs` },
        { label: "Monthly estimate", value: money(m.monthlySavings) },
        { label: "Yearly estimate", value: money(m.yearlySavings) },
      ])}
      <div style="margin-top:22px;">
        ${detailRows([
          { label: "Workflow", value: m.processName || "Not provided" },
          { label: "Estimated payback", value: `${m.paybackMonths || "Not available"} months` },
          { label: "Assumed reduction", value: m.assumedReductionPercent ? `Up to ${m.assumedReductionPercent}%` : "Planning assumption" },
          { label: "Setup-cost assumption", value: money(m.automationCostAssumption) },
        ])}
      </div>
      <div style="margin-top:22px;padding:20px;background:${BRAND.accentSoft};border:1px solid #493124;border-radius:7px;">
        <div style="color:${BRAND.accent};font-size:10px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;">Before automating</div>
        <p style="margin:10px 0 0;color:${BRAND.text};font-size:14px;line-height:1.75;">Document the exact task, who touches it, what can go wrong, and what should happen when the automation is uncertain. That boundary is where profitable automation begins.</p>
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
