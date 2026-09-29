// Small, dependency-free text helpers shared by every serverless function.
// Pulled out of api/leads.js so api/offer-application.js (and anything after
// it) doesn't re-implement the same escaping/formatting logic.

export const escapeHtml = (value) =>
  String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

export const isEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value || ""));

export const humanize = (value) =>
  String(value || "")
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replaceAll("_", " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());

export const money = (value) =>
  typeof value === "number"
    ? `$${Math.round(value).toLocaleString("en-US")}`
    : escapeHtml(value || "Not provided");

// Only ever used on values that are about to become part of a URL we
// ourselves build (never on a redirect target taken from user input) — see
// SECURITY.md note in offer-application.js about not accepting open redirects.
export const isSafeHttpUrl = (value) => {
  if (!value || typeof value !== "string") return false;
  try {
    const u = new URL(value.trim());
    return u.protocol === "https:" || u.protocol === "http:";
  } catch {
    return false;
  }
};

export const wait = (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds));
