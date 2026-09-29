# Product Rescue / Offer System — setup checklist

What this is: the commercial system behind `/product-rescue` (Product Rescue
Assessment, $750). Built to be provider-neutral on payment and to reuse
Airtable + Notion exactly the way the rest of this repo already talks to
Airtable — no new database, no new framework.

Everything below is server-side configuration. None of it lives in client
code; nothing here is ever sent to the browser.

## 1. Airtable

Nothing to install — this reuses the same `AIRTABLE_API_KEY` /
`AIRTABLE_BASE_ID` already configured for `Website Leads` and `Client
Reviews`.

1. The **Offer Applications** table (35 fields — matching exactly what
   `api/offer-application.js`, `api/rescue-status.js`,
   `api/internal/set-fit.js`, and `api/internal/payment-verified.js` read
   and write) has already been created in the production base via
   Airtable's schema API, table id `tbljRam4bW97njjMP`. `Status`, `Fit`,
   `Payment Status`, `Intake Status`, `Notion Sync Status`, and
   `Situation Type` were created as Single Select with the exact option
   values the code writes, pre-populated — not left for `typecast` to
   invent on first write.
2. **Correction:** `typecast: true` does **not** create a missing table,
   and does not create a field that doesn't already exist on the table —
   confirmed against Airtable's actual base schema, not assumed. It only
   does two things: lenient value coercion for a field that already
   exists (e.g. a string into a Number field), and adding a new option to
   an existing Single/Multi Select field if the value doesn't match one
   already there. If you ever add a new field to the code's write payload,
   create that field in Airtable first — `typecast` will not do it for
   you.

## 2. Notion

1. In the Notion workspace that owns **ZUMETRIX — OFFER COMMAND CENTER**,
   go to Settings → Connections → Develop or manage integrations → **New
   integration**. Internal integration, any name (e.g. "Zumetrix Website").
   Copy its **Internal Integration Token** into `NOTION_API_KEY`.
2. Open the **Offer Pipeline** database. `•••` menu → Connections → add the
   integration you just created. (Notion access is opt-in per database —
   the token alone can't see anything until you do this.)
3. Copy the Offer Pipeline database's id into `NOTION_OFFER_PIPELINE_DB_ID`
   (the 32-character id in its URL).
4. Open the Offer Pipeline's property list and compare it against the
   defaults in `.env.example` (`Opportunity`, `Stage`, `Fit`, `Source`,
   `Client`, `Company`, `Value`, `Decision Needed`, `Next Action`, `Next
   Action Date`, `Owner`, `Application Ref`). For any that are named
   differently, set the matching `NOTION_PROP_*` variable — no code change
   needed either way.
5. `Stage` and `Fit` are written as Notion **status/select** values ("New
   Reply" and "Unknown" on creation). If your Stage property doesn't already
   have a "New Reply" option (or Fit doesn't have "Unknown" / "Standard" /
   "Custom" / "Decline"), add them once — Notion's API does not
   auto-create select options the way Airtable's `typecast` does.
6. Optional: to have every new opportunity pre-linked to the "Product Rescue
   Assessment" row in the Offer Library, open that row, copy its page id
   into `NOTION_PRODUCT_RESCUE_OFFER_PAGE_ID`, and confirm the Offer
   Pipeline's relation property is actually named `Offer` (or set
   `NOTION_OFFER_RELATION_PROPERTY`).

**If any of this is skipped or wrong:** applications are still captured in
Airtable — see `api/_lib/notion.js`'s header comment. A failed sync is
recorded on the Airtable row (`Notion Sync Status: Failed`,
`Notion Sync Error`) so it's visible and can be created by hand.

## 3. Internal operational secret

Generate one value and put it in Vercel as `INTERNAL_OPS_TOKEN` (not
`VITE_`-prefixed — server-only):

```
openssl rand -hex 32
```

This gates two endpoints that are not reachable from any public page:

- `POST /api/internal/set-fit` — marks an application Standard Fit / Custom
  Scope / Decline once you've reviewed it, and sends the matching email.
- `POST /api/internal/payment-verified` — marks payment received (manually,
  until a real payment provider is wired in) and sends the Day-0 email.

Usage (both take the applicant's `Reference Token` from Airtable):

```bash
curl -X POST https://zumetrix.com/api/internal/set-fit \
  -H "X-Internal-Token: $INTERNAL_OPS_TOKEN" -H "Content-Type: application/json" \
  -d '{"ref":"<Reference Token>","fit":"standard"}'

curl -X POST https://zumetrix.com/api/internal/payment-verified \
  -H "X-Internal-Token: $INTERNAL_OPS_TOKEN" -H "Content-Type: application/json" \
  -d '{"ref":"<Reference Token>"}'
```

## 4. Payment (deliberately unconfigured today)

`api/_lib/payment.js` is the entire boundary. Until you choose a provider:

- Acceptance emails show "we'll follow up personally with a secure way to
  pay" instead of a button — never a link that goes nowhere.
- Payment is confirmed manually via `/api/internal/payment-verified` above.

**To connect a real provider later:**

1. Set `PAYMENT_PROVIDER` (a name, for your own records) and
   `PAYMENT_LINK_STANDARD` to that provider's hosted payment-link URL for
   the $750 price. Acceptance emails immediately start showing a real
   "Start My Assessment" button — no other code changes.
2. For reliable confirmation (recommended over relying on a browser
   redirect alone), add a new `api/payment-webhook.js` that verifies the
   provider's signature and then calls the same transition
   `/api/internal/payment-verified` already performs — don't re-implement
   the Airtable/Notion/email side effects a second time.

## 5. Notification recipient

`OFFER_NOTIFICATION_EMAIL` (defaults to `LEAD_NOTIFICATION_EMAIL`, then
`hello@zumetrix.com`). Comma-separate to add Omer later — no code change.

## 6. Share image

`/product-rescue`'s Open Graph image (`public/og/page-product-rescue.png`)
follows the same generation pattern as the other `public/og/page-*.png`
branded fallback cards already in this repo (see the "final freeze" work in
this codebase's history) — generate it the same way if it isn't already
present.
