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
// Privacy: only campaign parameters, the ad click identifier, the entry path
// and the referrer host are stored — never names, emails, phone numbers or
// free-text answers. Values are length-capped and limited to a safe
// character set. The record is kept in sessionStorage (the key every
// existing reader uses) and mirrored to localStorage for 30 days so a
// visitor who comes back from a bookmark a week after clicking an ad is
// still attributed to the ad. This is disclosed in the privacy policy.

const KEY = "zumetrix:attribution:v1";
const PERSIST_KEY = "zumetrix:attribution:first-touch:v1";
const PERSIST_DAYS = 30;
const SAFE = /[^A-Za-z0-9_\-.:/ ]/g;
const CLICK_ID_PARAMS: Array<[string, string]> = [
  ["gclid", "google"],
  ["gbraid", "google"],
  ["wbraid", "google"],
  ["fbclid", "meta"],
  ["msclkid", "microsoft"],
  ["ttclid", "tiktok"],
  ["li_fat_id", "linkedin"],
];

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
  /** Ad platform click identifier (gclid, fbclid, …) from the first tagged page. */
  clickId?: string;
  /** Which platform the click identifier belongs to ("google" | "meta" | …). */
  clickIdType?: string;
  capturedAt?: string;
}

const clean = (value: string | null | undefined, max = 120): string | undefined => {
  if (!value) return undefined;
  const v = value.replace(SAFE, "").trim().slice(0, max);
  return v || undefined;
};

const readPersisted = (): FirstTouch | null => {
  try {
    const raw = window.localStorage.getItem(PERSIST_KEY);
    if (!raw) return null;
    const record = JSON.parse(raw) as FirstTouch;
    const age = Date.now() - Date.parse(record.capturedAt || "");
    if (!Number.isFinite(age) || age > PERSIST_DAYS * 86400000) {
      window.localStorage.removeItem(PERSIST_KEY);
      return null;
    }
    return record;
  } catch {
    return null;
  }
};

const write = (record: FirstTouch) => {
  try {
    window.sessionStorage.setItem(KEY, JSON.stringify(record));
  } catch {
    /* storage unavailable */
  }
  try {
    window.localStorage.setItem(PERSIST_KEY, JSON.stringify(record));
  } catch {
    /* storage unavailable */
  }
};

const read = (): FirstTouch | null => {
  try {
    const raw = window.sessionStorage.getItem(KEY);
    if (raw) return JSON.parse(raw) as FirstTouch;
  } catch {
    /* fall through to the persisted copy */
  }
  // New tab or new session: re-seat the persisted first touch (if any and
  // not expired) so every reader of the session key keeps working unchanged.
  const persisted = readPersisted();
  if (persisted) {
    try {
      window.sessionStorage.setItem(KEY, JSON.stringify(persisted));
    } catch {
      /* ignore */
    }
  }
  return persisted;
};

const readClickId = (params: URLSearchParams): Pick<FirstTouch, "clickId" | "clickIdType"> => {
  for (const [param, type] of CLICK_ID_PARAMS) {
    const value = clean(params.get(param), 200);
    if (value) return { clickId: value, clickIdType: type };
  }
  return {};
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
      ...readClickId(params),
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
      write(record);
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
    if (changed) write(merged);
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
  const ft = typeof window !== "undefined" ? getFirstTouch() : {};
  // The visitor's real acquisition source travels with the booking. Before
  // 2026-11-06 these were hard-coded to "site"/"website", so a booking from a
  // paid click reported in Calendly as if it were organic. "site"/"website"
  // remain the fallback for untagged visits, so existing Calendly reports
  // keep their meaning.
  url.searchParams.set("utm_source", ft.utmSource || "site");
  url.searchParams.set("utm_medium", ft.utmMedium || "website");
  url.searchParams.set("utm_content", clean(content, 60) || "website");
  if (ft.utmCampaign) url.searchParams.set("utm_campaign", ft.utmCampaign);
  if (ft.entrySource) url.searchParams.set("utm_term", ft.entrySource);
  return url.toString();
};
