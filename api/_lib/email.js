// The one Zumetrix transactional-email system. Originally built inside
// api/leads.js; pulled out unchanged (same colors, same markup, same
// function bodies) so api/offer-application.js and anything after it reuse
// the exact same premium shell instead of a second, drifting copy of it.
import { escapeHtml, money } from "./text.js";

export const BRAND = {
  background: "#080808",
  surface: "#0D0D0D",
  surfaceRaised: "#121212",
  border: "#242424",
  accent: "#C88D63",
  text: "#F5F4F2",
  muted: "#B1AEAA",
  subtle: "#74716E",
};

export const emailShell = ({ preheader, eyebrow, title, intro, content, cta }) => `
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

export const detailRows = (rows) => `
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="width:100%;border-collapse:collapse;border-top:1px solid ${BRAND.border};">
    ${rows.map(({ label, value }) => `
      <tr>
        <td style="width:34%;padding:15px 0;color:${BRAND.subtle};font-size:12px;line-height:1.5;border-bottom:1px solid ${BRAND.border};">${escapeHtml(label)}</td>
        <td style="padding:15px 0 15px 18px;color:${BRAND.text};font-size:13px;font-weight:620;line-height:1.55;word-break:break-word;border-bottom:1px solid ${BRAND.border};">${escapeHtml(value || "Not provided")}</td>
      </tr>
    `).join("")}
  </table>
`;

export const statLine = (metrics) => `
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

// Same three-line numbered list block used by the blueprint/contact emails —
// pulled out because the new offer emails (Section 26) need the identical
// "what happens next" pattern without copy-pasting the <table> markup again.
export const numberedSteps = (steps) => `
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
    ${steps.map(([number, text], i) => `
      <tr>
        <td valign="middle" style="width:38px;padding:${i === 0 ? 6 : 9}px 0;">
          <span style="display:inline-block;width:25px;height:25px;border:1px solid #49301F;border-radius:50%;color:${BRAND.accent};font-size:11px;line-height:25px;font-weight:700;text-align:center;">${number}</span>
        </td>
        <td valign="middle" style="padding:${i === 0 ? 6 : 9}px 0;color:${BRAND.muted};font-size:14px;line-height:1.7;">${text}</td>
      </tr>
    `).join("")}
  </table>
`;

export const sendResendEmail = async ({ to, subject, html, attachments, replyTo }) => {
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
    await new Promise((resolve) => setTimeout(resolve, Number.isFinite(retryAfter) ? retryAfter * 1000 : 750 * (attempt + 1)));
  }

  return { sent: false, reason: "Email retry limit reached" };
};

// Reads the configured internal recipient list once, in one place — Section
// 7's "recipients configurable via environment/config rather than buried
// personal emails" requirement. Falls back to the same address api/leads.js
// has always used if nothing new is configured, so this is additive, not a
// change to existing notification behavior.
export const getOpsRecipients = () =>
  (process.env.OFFER_NOTIFICATION_EMAIL || process.env.LEAD_NOTIFICATION_EMAIL || "hello@zumetrix.com")
    .split(",")
    .map((email) => email.trim())
    .filter(Boolean);

export { escapeHtml, money };
