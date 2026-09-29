// Client-side POST helper for the offer application, mirroring
// leadRouter.ts's shape exactly (same attribution capture, same error
// contract) so the two systems stay recognizable as one pattern rather than
// two unrelated ones.
export interface OfferApplicationData {
  offerSlug: string;
  name: string;
  email: string;
  company?: string;
  situationType: string;
  productName?: string;
  productDescription?: string;
  productUrl?: string;
  problemDescription: string;
  decisionNeeded?: string;
  duration?: string;
  priorAttempts?: string;
  accessAvailability?: string;
  evidenceLinks?: string;
  marketingConsent?: boolean;
  hpToken?: string;
}

export interface OfferApplicationResponse {
  success: boolean;
  captured?: boolean;
  honeypot?: boolean;
  error?: string;
  warnings?: string[];
}

const getAttribution = () => {
  if (typeof window === "undefined") return {};
  const params = new URLSearchParams(window.location.search);
  return {
    utmSource: params.get("utm_source") || undefined,
    utmMedium: params.get("utm_medium") || undefined,
    utmCampaign: params.get("utm_campaign") || undefined,
  };
};

export async function submitOfferApplication(data: OfferApplicationData): Promise<OfferApplicationResponse> {
  const enriched = {
    ...data,
    ...getAttribution(),
    source: "Website",
    pageUrl: typeof window !== "undefined" ? window.location.href : "",
    referrer: typeof document !== "undefined" ? document.referrer || "direct" : "direct",
  };

  try {
    const response = await fetch("/api/offer-application", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(enriched),
    });
    const payload = (await response.json().catch(() => ({}))) as OfferApplicationResponse;

    if (!response.ok || !payload.success) {
      if (!payload.error) {
        console.error("Offer application request failed:", response.status);
      }
      return {
        success: false,
        error: payload.error || "We could not send this. Please try again, or email hello@zumetrix.com.",
      };
    }

    return payload;
  } catch (error) {
    console.error("Offer application network error:", error);
    return {
      success: false,
      error: "We could not reach our servers. Check your connection and try again, or email hello@zumetrix.com.",
    };
  }
}

export interface RescueStatus {
  found: boolean;
  status?: string | null;
  paymentVerified?: boolean;
  intakeComplete?: boolean;
  accessReady?: boolean;
  clockStartAt?: string | null;
  deliveryDueAt?: string | null;
  error?: string;
}

export async function fetchRescueStatus(ref: string): Promise<RescueStatus> {
  try {
    const response = await fetch(`/api/rescue-status?ref=${encodeURIComponent(ref)}`);
    return (await response.json()) as RescueStatus;
  } catch {
    return { found: false, error: "Could not reach the status service." };
  }
}

export async function submitRescueIntake(ref: string, accessReady: boolean, accessNote: string): Promise<RescueStatus> {
  try {
    const response = await fetch("/api/rescue-status", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ref, accessReady, accessNote }),
    });
    return (await response.json()) as RescueStatus;
  } catch {
    return { found: false, error: "Could not reach the status service." };
  }
}
