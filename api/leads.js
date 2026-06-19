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
  background: "#080808",
  surface: "#0D0D0D",
  surfaceRaised: "#121212",
  border: "#242424",
  accent: "#C88D63",
  text: "#F5F4F2",
  muted: "#B1AEAA",
  subtle: "#74716E",
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
  <body style="margin:0;padding:0;background:${BRAND.background};color:${BRAND.text};font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;-webkit-font-smoothing:antialiased;">
    <div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;">${escapeHtml(preheader)}</div>
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="width:100%;background:${BRAND.background};">
      <tr>
        <td align="center" style="padding:48px 16px;">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="width:100%;max-width:640px;">
            <tr>
              <td style="padding:0 4px 30px;">
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                  <tr>
                    <td valign="middle">
                      <a href="https://www.zumetrix.com" style="text-decoration:none;">
                        <img
                          src="https://www.zumetrix.com/logo/zumetrix-email.png"
                          width="174"
                          height="42"
                          alt="Zumetrix Labs"
                          style="display:block;width:174px;height:42px;max-width:100%;border:0;outline:none;text-decoration:none;object-fit:contain;"
                        >
                      </a>
                    </td>
                    <td align="right" valign="middle" style="font-size:11px;color:${BRAND.subtle};line-height:1.55;">
                      Forge Clear Ideas<br>Into Shipped Software
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td style="background:${BRAND.surface};border:1px solid ${BRAND.border};border-radius:6px;overflow:hidden;">
                <div style="padding:54px 52px 24px;">
                  <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin-bottom:22px;">
                    <tr>
                      <td valign="middle" style="width:22px;padding:0;">
                        <div style="width:18px;height:1px;background:${BRAND.accent};font-size:0;line-height:1px;">&nbsp;</div>
                      </td>
                      <td valign="middle" style="padding:0 0 0 11px;color:${BRAND.accent};font-size:11px;line-height:1;font-weight:650;letter-spacing:1.7px;text-transform:uppercase;">${escapeHtml(eyebrow)}</td>
                    </tr>
                  </table>
                  <h1 style="margin:0;color:${BRAND.text};font-size:40px;line-height:1.12;font-weight:720;letter-spacing:0;">${escapeHtml(title)}</h1>
                  ${intro ? `<p style="margin:23px 0 0;color:${BRAND.muted};font-size:16px;line-height:1.8;">${intro}</p>` : ""}
                </div>
                <div style="padding:18px 52px 54px;">
                  ${content}
                  ${cta ? `
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin-top:34px;">
                      <tr>
                        <td style="background:${BRAND.accent};border-radius:4px;">
                          <a href="${escapeHtml(cta.href)}" style="display:inline-block;padding:15px 22px;color:#090909;text-decoration:none;font-size:14px;font-weight:700;">${escapeHtml(cta.label)} &nbsp;&#8594;</a>
                        </td>
                      </tr>
                    </table>
                  ` : ""}
                </div>
              </td>
            </tr>
            <tr>
              <td style="padding:25px 8px 0;text-align:center;color:${BRAND.subtle};font-size:11px;line-height:1.8;">
                Zumetrix Labs &nbsp;&middot;&nbsp; SaaS, software products and intelligent automation<br>
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
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="width:100%;border-collapse:collapse;border-top:1px solid ${BRAND.border};">
    ${rows.map(({ label, value }, index) => `
      <tr>
        <td style="width:34%;padding:15px 0;color:${BRAND.subtle};font-size:12px;line-height:1.5;border-bottom:1px solid ${BRAND.border};">${escapeHtml(label)}</td>
        <td style="padding:15px 0 15px 18px;color:${BRAND.text};font-size:13px;font-weight:620;line-height:1.55;word-break:break-word;border-bottom:1px solid ${BRAND.border};">${escapeHtml(value || "Not provided")}</td>
      </tr>
    `).join("")}
  </table>
`;

const statLine = (metrics) => `
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="width:100%;border-collapse:collapse;margin-top:30px;border-top:1px solid ${BRAND.border};border-bottom:1px solid ${BRAND.border};">
    ${metrics.map(({ label, value, tone = "neutral" }, index) => {
      const tones = {
        neutral: { background: "#171717", border: "#303030", color: BRAND.text },
        copper: { background: "#211711", border: "#49301F", color: "#E0A47A" },
        green: { background: "#102019", border: "#214D38", color: "#80D5A7" },
        blue: { background: "#111C24", border: "#25475B", color: "#8CC9E8" },
      };
      const style = tones[tone] || tones.neutral;

      return `
      <tr>
        <td valign="middle" style="padding:${index === 0 ? "18px" : "16px"} 0;color:${BRAND.subtle};font-size:11px;line-height:1.4;letter-spacing:.8px;text-transform:uppercase;${index ? `border-top:1px solid ${BRAND.border};` : ""}">${escapeHtml(label)}</td>
        <td align="right" valign="middle" style="padding:${index === 0 ? "18px" : "16px"} 0;${index ? `border-top:1px solid ${BRAND.border};` : ""}">
          <span style="display:inline-block;padding:7px 11px;background:${style.background};border:1px solid ${style.border};border-radius:4px;color:${style.color};font-size:14px;line-height:1;font-weight:680;">${escapeHtml(value)}</span>
        </td>
      </tr>
      `;
    }).join("")}
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
