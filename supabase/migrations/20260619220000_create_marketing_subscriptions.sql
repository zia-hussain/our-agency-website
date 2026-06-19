CREATE TABLE IF NOT EXISTS marketing_subscribers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL UNIQUE,
  name text,
  company text,
  status text NOT NULL DEFAULT 'subscribed'
    CHECK (status IN ('subscribed', 'unsubscribed', 'bounced', 'complained')),
  consent_source text NOT NULL,
  consent_page_url text,
  consent_at timestamptz NOT NULL DEFAULT now(),
  unsubscribed_at timestamptz,
  unsubscribe_token uuid NOT NULL DEFAULT gen_random_uuid(),
  metadata jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE UNIQUE INDEX IF NOT EXISTS marketing_subscribers_token_unique
  ON marketing_subscribers (unsubscribe_token);
CREATE INDEX IF NOT EXISTS marketing_subscribers_status_idx
  ON marketing_subscribers (status);

CREATE TABLE IF NOT EXISTS campaign_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  subscriber_id uuid REFERENCES marketing_subscribers(id) ON DELETE SET NULL,
  email text NOT NULL,
  campaign_name text,
  provider_message_id text,
  event_type text NOT NULL,
  metadata jsonb NOT NULL DEFAULT '{}'::jsonb,
  occurred_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS campaign_events_email_idx
  ON campaign_events (email);
CREATE INDEX IF NOT EXISTS campaign_events_type_idx
  ON campaign_events (event_type);
CREATE INDEX IF NOT EXISTS campaign_events_occurred_at_idx
  ON campaign_events (occurred_at DESC);

ALTER TABLE marketing_subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE campaign_events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can view marketing subscribers"
  ON marketing_subscribers FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authenticated users can update marketing subscribers"
  ON marketing_subscribers FOR UPDATE TO authenticated
  USING (true) WITH CHECK (true);
CREATE POLICY "Authenticated users can view campaign events"
  ON campaign_events FOR SELECT TO authenticated USING (true);
