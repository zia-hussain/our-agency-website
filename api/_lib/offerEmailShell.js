// Dark, restrained, copper-accent transactional email shell — built
// specifically for the Product Rescue / offer-system customer-facing emails
// (2026-09-29 restyle pass). Deliberately its own file, not an edit to
// api/_lib/email.js: that shell is shared with api/leads.js's unrelated
// contact/blueprint/estimate emails, and this pass is scoped to Product
// Rescue only — touching the shared file would have silently restyled emails
// nobody asked to change.
//
// Email-client rules this file follows throughout (not decorative choices):
//   - every colored table/td carries both a `bgcolor` attribute and a
//     `background-color` (never the `background` shorthand) — Outlook's Word
//     rendering engine is unreliable with the shorthand and with CSS applied
//     only via class/style block, so color always ships as a plain inline
//     background-color plus a matching bgcolor attribute.
//   - font-family and font-weight are redeclared on every text-bearing
//     element rather than relied on to inherit, and weights are standard
//     multiples of 100 (400/600/700) — Outlook does not reliably inherit
//     font-family from ancestors, and non-standard weights (e.g. 650) render
//     inconsistently across clients.
//   - structural elements (callouts, badges) are table-based, not bare
//     bordered <div>s, since <div> borders are the least reliable of the
//     three in Outlook desktop.
//   - one accent color (copper) carries all emphasis; no semantic
//     red/green/blue badge system — restrained on purpose.
import { escapeHtml } from "./text.js";

export const BRAND = {
  background: "#060606",
  surface: "#0D0D0D",
  border: "#242424",
  accent: "#C68A5D",
  accentDim: "#4A3320",
  accentWash: "#1C140D",
  text: "#F4F2EF",
  muted: "#A9A6A1",
  subtle: "#6E6B67",
};

export const FONT = "-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif";

export const emailShell = ({ preheader, eyebrow, title, intro, content, cta }) => `
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <meta name="x-apple-disable-message-reformatting">
    <meta name="color-scheme" content="dark">
    <meta name="supported-color-schemes" content="dark">
    <title>${escapeHtml(title)}</title>
  </head>
  <body style="margin:0;padding:0;background-color:${BRAND.background};" bgcolor="${BRAND.background}">
    <div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;mso-hide:all;">${escapeHtml(preheader)}</div>
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" bgcolor="${BRAND.background}" style="width:100%;background-color:${BRAND.background};">
      <tr>
        <td align="center" style="padding:40px 16px;">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="width:100%;max-width:600px;">
            <tr>
              <td style="padding:0 4px 26px;">
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                  <tr>
                    <td valign="middle">
                      <a href="https://www.zumetrix.com" style="text-decoration:none;">
                        <img
                          src="https://www.zumetrix.com/logo/zumetrix-email.png"
                          width="150" height="36"
                          alt="Zumetrix Labs"
                          style="display:block;width:150px;height:36px;max-width:100%;border:0;outline:none;text-decoration:none;"
                        >
                      </a>
                    </td>
                    <td align="right" valign="middle" style="font-family:${FONT};font-size:11px;font-weight:400;line-height:1.5;color:${BRAND.subtle};">
                      Forge Clear Ideas<br>Into Shipped Software
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td bgcolor="${BRAND.surface}" style="background-color:${BRAND.surface};border:1px solid ${BRAND.border};border-radius:8px;">
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                  <tr>
                    <td style="padding:44px 40px 6px;">
                      <div style="margin-bottom:18px;font-family:${FONT};font-size:11px;font-weight:700;letter-spacing:1.4px;text-transform:uppercase;color:${BRAND.accent};">${escapeHtml(eyebrow)}</div>
                      <h1 style="margin:0;font-family:${FONT};font-size:30px;line-height:1.25;font-weight:700;color:${BRAND.text};">${escapeHtml(title)}</h1>
                      ${intro ? `<p style="margin:18px 0 0;font-family:${FONT};font-size:16px;line-height:1.7;font-weight:400;color:${BRAND.muted};">${intro}</p>` : ""}
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:18px 40px 44px;">
                      ${content}
                      ${cta ? ctaButton(cta) : ""}
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding:24px 6px 0;text-align:center;font-family:${FONT};font-size:11px;font-weight:400;line-height:1.8;color:${BRAND.subtle};">
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

const ctaButton = ({ href, label }) => `
  <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin-top:32px;">
    <tr>
      <td bgcolor="${BRAND.accent}" style="background-color:${BRAND.accent};border-radius:4px;">
        <a href="${escapeHtml(href)}" style="display:inline-block;padding:14px 24px;font-family:${FONT};font-size:14px;font-weight:700;color:#0A0A0A;text-decoration:none;">${escapeHtml(label)} &nbsp;&#8594;</a>
      </td>
    </tr>
  </table>
`;

// label/value rows — application detail, "what's included," etc.
export const detailRows = (rows) => `
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="width:100%;border-collapse:collapse;border-top:1px solid ${BRAND.border};">
    ${rows.map(({ label, value }) => `
      <tr>
        <td width="34%" valign="top" style="padding:14px 0;border-bottom:1px solid ${BRAND.border};font-family:${FONT};font-size:12px;font-weight:400;line-height:1.5;color:${BRAND.subtle};">${escapeHtml(label)}</td>
        <td valign="top" style="padding:14px 0 14px 16px;border-bottom:1px solid ${BRAND.border};font-family:${FONT};font-size:13px;font-weight:600;line-height:1.6;color:${BRAND.text};word-break:break-word;">${escapeHtml(value || "Not provided")}</td>
      </tr>
    `).join("")}
  </table>
`;

// Restrained metric line: the first entry (the headline number — price,
// offer name) gets the one copper badge treatment; everything else is plain
// text. Replaces the old 4-color neutral/copper/green/blue badge system,
// which read as generic dashboard status colors rather than one branded
// accent (2026-09-29 restyle pass).
export const metricRow = (metrics) => `
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="width:100%;border-collapse:collapse;margin-top:28px;border-top:1px solid ${BRAND.border};">
    ${metrics.map(({ label, value, emphasis = false }, index) => `
      <tr>
        <td valign="middle" style="padding:${index === 0 ? "16px" : "14px"} 0;border-bottom:1px solid ${BRAND.border};font-family:${FONT};font-size:11px;font-weight:600;letter-spacing:0.6px;text-transform:uppercase;color:${BRAND.subtle};">${escapeHtml(label)}</td>
        <td align="right" valign="middle" style="padding:${index === 0 ? "16px" : "14px"} 0;border-bottom:1px solid ${BRAND.border};">
          ${emphasis
            ? `<span style="display:inline-block;padding:6px 12px;background-color:${BRAND.accentWash};border:1px solid ${BRAND.accentDim};border-radius:4px;font-family:${FONT};font-size:14px;font-weight:700;color:${BRAND.accent};">${escapeHtml(value)}</span>`
            : `<span style="font-family:${FONT};font-size:14px;font-weight:700;color:${BRAND.text};">${escapeHtml(value)}</span>`}
        </td>
      </tr>
    `).join("")}
  </table>
`;

// Table-based left-border callout — replaces the bare bordered <div>s the
// templates used to hand-roll individually (border-left on a plain <div> is
// the least reliable of the three techniques in Outlook desktop; a 1-column
// table cell with a background-color is not).
export const calloutBlock = (bodyHtml, { label } = {}) => `
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="width:100%;margin-top:28px;">
    <tr>
      <td width="3" bgcolor="${BRAND.accent}" style="background-color:${BRAND.accent};font-size:0;line-height:0;">&nbsp;</td>
      <td style="padding:2px 0 2px 20px;">
        ${label ? `<div style="margin-bottom:8px;font-family:${FONT};font-size:11px;font-weight:700;letter-spacing:1.2px;text-transform:uppercase;color:${BRAND.accent};">${escapeHtml(label)}</div>` : ""}
        <div style="font-family:${FONT};font-size:16px;font-weight:400;line-height:1.7;color:${BRAND.text};">${bodyHtml}</div>
      </td>
    </tr>
  </table>
`;

export const numberedSteps = (steps) => `
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
    ${steps.map(([number, text], i) => `
      <tr>
        <td valign="middle" style="width:34px;padding:${i === 0 ? 6 : 10}px 0;">
          <span style="display:inline-block;width:24px;height:24px;border:1px solid ${BRAND.accentDim};border-radius:50%;font-family:${FONT};font-size:11px;font-weight:700;line-height:24px;text-align:center;color:${BRAND.accent};">${number}</span>
        </td>
        <td valign="middle" style="padding:${i === 0 ? 6 : 10}px 0;font-family:${FONT};font-size:14px;font-weight:400;line-height:1.7;color:${BRAND.muted};">${text}</td>
      </tr>
    `).join("")}
  </table>
`;

// The recurring "Zia & Omer / Zumetrix Labs" sign-off — pulled out so every
// template stops hand-rolling the same two-line signature.
export const signOff = () => `
  <p style="margin:26px 0 0;font-family:${FONT};font-size:14px;font-weight:700;line-height:1.6;color:${BRAND.text};">Zia &amp; Omer<br><span style="font-weight:400;color:${BRAND.subtle};">Zumetrix Labs</span></p>
`;

export const bodyText = (html, { marginTop = 26 } = {}) => `
  <p style="margin:${marginTop}px 0 0;font-family:${FONT};font-size:14px;font-weight:400;line-height:1.75;color:${BRAND.muted};">${html}</p>
`;

export const sectionLabel = (text) => `
  <div style="margin-bottom:14px;font-family:${FONT};font-size:16px;font-weight:700;color:${BRAND.text};">${escapeHtml(text)}</div>
`;

export { escapeHtml };
