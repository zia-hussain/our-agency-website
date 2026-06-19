import { trackFormSubmit } from '../utils/analytics';

export interface LeadData {
  name?: string;
  email: string;
  company?: string;
  phone?: string;
  message?: string;
  source: string;
  leadType?: 'general' | 'contact' | 'lead_magnet' | 'roi_calculator' | 'newsletter';
  magnetName?: string;
  pageUrl?: string;
  userAgent?: string;
  referrer?: string;
  metadata?: Record<string, unknown>;
  [key: string]: unknown;
}

export interface LeadResponse {
  success: boolean;
  error?: string;
  destination: 'server' | 'failed';
  stored?: boolean;
  airtableSynced?: boolean;
  marketingSubscribed?: boolean;
  notificationSent?: boolean;
  userEmailSent?: boolean;
}

const getAttribution = () => {
  if (typeof window === 'undefined') return {};

  const params = new URLSearchParams(window.location.search);
  return {
    utmSource: params.get('utm_source') || undefined,
    utmMedium: params.get('utm_medium') || undefined,
    utmCampaign: params.get('utm_campaign') || undefined,
    utmContent: params.get('utm_content') || undefined,
    utmTerm: params.get('utm_term') || undefined,
  };
};

export async function routeLead(leadData: LeadData): Promise<LeadResponse> {
  const enrichedData = {
    ...leadData,
    timestamp: new Date().toISOString(),
    pageUrl: leadData.pageUrl || (typeof window !== 'undefined' ? window.location.href : ''),
    userAgent: leadData.userAgent || (typeof navigator !== 'undefined' ? navigator.userAgent : ''),
    referrer: leadData.referrer || (typeof document !== 'undefined' ? document.referrer : '') || 'direct',
    metadata: {
      ...getAttribution(),
      ...leadData.metadata,
    },
  };

  try {
    const response = await fetch('/api/leads', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(enrichedData),
    });
    const payload = await response.json().catch(() => ({}));

    if (!response.ok || !payload.success) {
      return {
        success: false,
        destination: 'failed',
        error: payload.error || `Lead API returned ${response.status}`,
      };
    }

    trackFormSubmit(`lead_${enrichedData.source}`);
    return {
      success: true,
      destination: 'server',
      error: payload.warnings?.join('; '),
      stored: payload.stored,
      airtableSynced: payload.airtableSynced,
      marketingSubscribed: payload.marketingSubscribed,
      notificationSent: payload.notificationSent,
      userEmailSent: payload.userEmailSent,
    };
  } catch (error) {
    return {
      success: false,
      destination: 'failed',
      error: error instanceof Error ? error.message : 'Lead delivery failed',
    };
  }
}
