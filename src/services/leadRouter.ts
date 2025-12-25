/**
 * LEAD ROUTING SERVICE
 *
 * This service routes leads to external systems (HubSpot, Airtable, Zapier, Make.com)
 * with automatic fallback to local database storage.
 *
 * CONFIGURATION:
 * Set these environment variables in your .env file:
 *
 * # Primary lead routing (choose ONE):
 * VITE_LEAD_WEBHOOK_URL=https://hooks.zapier.com/hooks/catch/YOUR_WEBHOOK_ID/  # Zapier
 * VITE_LEAD_WEBHOOK_URL=https://hook.us1.make.com/YOUR_WEBHOOK_ID              # Make.com
 * VITE_LEAD_WEBHOOK_URL=https://api.airtable.com/v0/YOUR_BASE/YOUR_TABLE       # Airtable
 *
 * # Optional authentication (for Airtable, HubSpot, etc.):
 * VITE_LEAD_WEBHOOK_AUTH=Bearer YOUR_API_TOKEN
 *
 * # Fallback to Supabase (always available if webhook fails):
 * Automatically uses Supabase configuration from .env
 */

import { supabase } from '../lib/supabase';
import { trackFormSubmit } from '../utils/analytics';

export interface LeadData {
  name?: string;
  email: string;
  company?: string;
  message?: string;
  source: string;
  [key: string]: any; // Allow additional fields
}

export interface LeadResponse {
  success: boolean;
  error?: string;
  destination: 'webhook' | 'supabase' | 'both' | 'failed';
}

/**
 * Route a lead to the configured destination
 *
 * Order of operations:
 * 1. Try external webhook (Zapier/Make/Airtable/HubSpot) if configured
 * 2. Always store in Supabase as backup
 * 3. Return success if either succeeds
 */
export async function routeLead(leadData: LeadData): Promise<LeadResponse> {
  const webhookUrl = import.meta.env.VITE_LEAD_WEBHOOK_URL;
  const webhookAuth = import.meta.env.VITE_LEAD_WEBHOOK_AUTH;

  let webhookSuccess = false;
  let supabaseSuccess = false;
  let errors: string[] = [];

  // Enrich lead data with timestamp
  const enrichedData = {
    ...leadData,
    timestamp: new Date().toISOString(),
    userAgent: navigator.userAgent,
    referrer: document.referrer || 'direct',
  };

  // 1. Try external webhook first (if configured)
  if (webhookUrl) {
    try {
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
      };

      // Add authentication if provided
      if (webhookAuth) {
        headers['Authorization'] = webhookAuth;
      }

      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers,
        body: JSON.stringify(enrichedData),
      });

      if (response.ok) {
        webhookSuccess = true;
        console.log('✅ Lead routed to external webhook successfully');
      } else {
        throw new Error(`Webhook returned ${response.status}: ${response.statusText}`);
      }
    } catch (error) {
      console.warn('⚠️ External webhook failed:', error);
      errors.push(`Webhook error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  // 2. Always try Supabase as backup/primary storage
  try {
    const { error } = await supabase
      .from('newsletter_subscribers')
      .insert({
        email: enrichedData.email,
        name: enrichedData.name || null,
        source: enrichedData.source,
        is_active: true,
        tags: [enrichedData.source],
        metadata: {
          company: enrichedData.company,
          message: enrichedData.message,
          timestamp: enrichedData.timestamp,
          referrer: enrichedData.referrer,
        }
      });

    if (error) {
      // Ignore duplicate key errors (23505)
      if (error.code !== '23505') {
        throw error;
      } else {
        console.log('ℹ️ Lead already exists in database');
        supabaseSuccess = true; // Consider this a success
      }
    } else {
      supabaseSuccess = true;
      console.log('✅ Lead stored in Supabase successfully');
    }
  } catch (error) {
    console.error('❌ Supabase storage failed:', error);
    errors.push(`Database error: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }

  // 3. Track submission in analytics
  try {
    trackFormSubmit(`lead_${enrichedData.source}`);
  } catch (error) {
    console.warn('Analytics tracking failed:', error);
  }

  // 4. Determine response
  if (webhookSuccess && supabaseSuccess) {
    return { success: true, destination: 'both' };
  } else if (webhookSuccess) {
    return { success: true, destination: 'webhook' };
  } else if (supabaseSuccess) {
    return { success: true, destination: 'supabase' };
  } else {
    return {
      success: false,
      destination: 'failed',
      error: errors.join('; '),
    };
  }
}

/**
 * INTEGRATION GUIDES
 *
 * ## Zapier Setup:
 * 1. Create a new Zap with "Webhooks by Zapier" trigger
 * 2. Choose "Catch Hook"
 * 3. Copy the webhook URL
 * 4. Add to .env: VITE_LEAD_WEBHOOK_URL=<your-zapier-webhook-url>
 * 5. Connect to your CRM (HubSpot, Salesforce, Google Sheets, etc.)
 *
 * ## Make.com Setup:
 * 1. Create a new scenario with "Webhooks" module
 * 2. Choose "Custom webhook"
 * 3. Copy the webhook URL
 * 4. Add to .env: VITE_LEAD_WEBHOOK_URL=<your-make-webhook-url>
 * 5. Add modules to route to your CRM
 *
 * ## Airtable Setup:
 * 1. Get your Airtable API token from https://airtable.com/create/tokens
 * 2. Get your Base ID and Table name
 * 3. Add to .env:
 *    VITE_LEAD_WEBHOOK_URL=https://api.airtable.com/v0/<BASE_ID>/<TABLE_NAME>
 *    VITE_LEAD_WEBHOOK_AUTH=Bearer <YOUR_TOKEN>
 *
 * ## HubSpot Direct (Advanced):
 * 1. Get your HubSpot API key from settings
 * 2. Add to .env:
 *    VITE_LEAD_WEBHOOK_URL=https://api.hubapi.com/crm/v3/objects/contacts
 *    VITE_LEAD_WEBHOOK_AUTH=Bearer <YOUR_API_KEY>
 * 3. Note: HubSpot requires specific field mapping
 *
 * ## Local Development:
 * Leave VITE_LEAD_WEBHOOK_URL empty - leads will only go to Supabase
 */
