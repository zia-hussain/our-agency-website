// First-touch attribution, captured once per browser session and reused by
// every lead/application submit and every website Calendly link.
//
// Why this exists (Phase 1 — Truth & Measurement): leadRouter.ts and
// offerApplication.ts only read utm_* from the URL of the page the form is
// ON. A visitor who lands on an article from LinkedIn and later submits
// /contact arrived with utm_source=linkedin, but the submit happened on a
// clean URL, so Airtable recorded nothing. Same for the `?from=` entry
// parameter on offer pages, which reached GA4 but never reached Airtable.
//
// Privacy: only campaign parameters, the entry path and the referrer host are
// stored — never names, emails, phone numbers or free-text answers. Values
// are length-capped and limited to a safe character set.

const KEY = "zumetrix:attribution:v1";
const SAFE = /[^A-Za-z0-9_\-.:/ ]/g;

export interface FirstTouch {
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmContent?: string;
  utmTerm?: string;
  /** `?from=` value on the first page of the session (offer routing / CTA source). */
  entrySource?: string;
  /** Pathname of the first page of the session, no query string. */
  entryPage?: string;
  /** Referrer host of the first page of the session (no path, no query). */
  referrerHost?: string;
  capturedAt?: string;
}

const clean = (value: string | null | undefined, max = 120): string | undefined => {
  if (!value) return undefined;
  const v = value.replace(SAFE, "").trim().slice(0, max);
  return v || undefined;
};

const read = (): FirstTouch | null => {
  try {
    const raw = window.sessionStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as FirstTouch) : null;
  } catch {
    return null;
  }
};

/** Capture first touch. Safe to call on every route change; only the first
 * call in a session writes, EXCEPT that later UTM/from parameters are merged
 * in when the stored record has none (a returning tab that first opened a
 * clean URL, then followed a tagged link). */
export const captureFirstTouch = (): FirstTouch | null => {
  if (typeof window === "undefined") return null;
  try {
    const params = new URLSearchParams(window.location.search);
    const incoming: FirstTouch = {
      utmSource: clean(params.get("utm_source")),
      utmMedium: clean(params.get("utm_medium")),
      utmCampaign: clean(params.get("utm_campaign")),
      utmContent: clean(params.get("utm_content")),
      utmTerm: clean(params.get("utm_term")),
      entrySource: clean(params.get("from"), 80),
    };
    const existing = read();
    if (!existing) {
      let referrerHost: string | undefined;
      try {
        referrerHost = document.referrer ? clean(new URL(document.referrer).hostname, 120) : undefined;
      } catch {
        referrerHost = undefined;
      }
      const record: FirstTouch = {
        ...incoming,
        entryPage: clean(window.location.pathname, 200),
        referrerHost,
        capturedAt: new Date().toISOString(),
      };
      window.sessionStorage.setItem(KEY, JSON.stringify(record));
      return record;
    }
    const merged: FirstTouch = { ...existing };
    let changed = false;
    (Object.keys(incoming) as (keyof FirstTouch)[]).forEach((k) => {
      if (!merged[k] && incoming[k]) {
        merged[k] = incoming[k];
        changed = true;
      }
    });
    if (changed) window.sessionStorage.setItem(KEY, JSON.stringify(merged));
    return merged;
  } catch {
    return null;
  }
};

export const getFirstTouch = (): FirstTouch => {
  if (typeof window === "undefined") return {};
  return read() || captureFirstTouch() || {};
};

/** One website booking destination. Founder-specific Calendly links used
 * outside the website are deliberately NOT routed through here. `content`
 * identifies the page/section the click came from (e.g. "home-cta",
 * "contact-quick-actions", "sticky-bar") so a booking can be traced back. */
export const WEBSITE_CALENDLY_URL =
  import.meta.env.VITE_CALENDLY_URL || "https://calendly.com/zumetrix-labs/consultation";

export const buildCalendlyUrl = (content: string): string => {
  const url = new URL(WEBSITE_CALENDLY_URL);
  url.searchParams.set("utm_source", "site");
  url.searchParams.set("utm_medium", "website");
  url.searchParams.set("utm_content", clean(content, 60) || "website");
  const ft = typeof window !== "undefined" ? getFirstTouch() : {};
  if (ft.utmCampaign) url.searchParams.set("utm_campaign", ft.utmCampaign);
  if (ft.entrySource) url.searchParams.set("utm_term", ft.entrySource);
  return url.toString();
};
