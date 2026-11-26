# OfficePC domestic setup checklist

Prepared November26,2026. Use only the authorized OfficeMe PC and PsychicStudio Chrome profile. No new orders enabled and no real charge. Preserve both Test environments and unrelated Pages settings.

## Cloudflare

1. Confirm signed-in account contact.thepsychicstudio@gmail.com and account ID1b0cb22e2ba92af885ac96ea4cea80ad. Check D1list again for a matching existing production DB before creating, to avoid duplicates.
2. Existing free plan observed4/10DB,2.38MB/5GB,0daily reads/writes. If plan or limits changed, stop before any cost. Create dedicated psychic-domestic-production database, not either Test DB. No paid plan or new account.
3. Apply checkout/production/schema-inr.sql only to that new empty database. Verify expected tables, customer_dob and INR-only CHECK. Verify zero orders, access tokens, webhook events and audit rows. Record real DB ID from UI.
4. Existing Pages production project psychic-studio has no D1binding and seven unrelated CMS/Gemini/OAuth environment variables. Preserve all. Add ORDER_DB binding to new DB, nodejs_compat retained,2026-11-13 compatibility retained. Preview remains isolated and must not inherit production Live secrets/DB.
5. Provision explicit production plain-text values: CHECKOUT_MODE=live; CHECKOUT_ACCEPTING_ORDERS=no; ORDER_ENVIRONMENT=psychic-domestic-production; ORDER_CURRENCY=INR; ORDER_FULFILMENT=manual_email_24h; ORDER_TERMS_VERSION=domestic-manual-2026-11-26; ORDER_OWNER_SESSION_EPOCH=live-v1; DOMESTIC_INR_TIERS={"5":46234,"9":83221,"15":138702}. Do not add CHECKOUT_ENABLED=test.
6. Separate Live secrets: existing saved RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET; new saved RAZORPAY_WEBHOOK_SECRET; salted scrypt ORDER_OWNER_PASSWORD_HASH from new owner login; distinct random ORDER_OWNER_SESSION_SECRET and ORDER_RATE_LIMIT_SECRET. Never print values, hashes or raw project configuration. Delete transient files after use.
7. Deploy complete candidate including current artwork, compiled Functions and private shells with accepting-orders=no. Do not merge an outdated artwork build. Record returned deployment URL, verify actual content before passing link onward.
8. Hosted checks before webhook: create-domestic503 and no order mutation; INRcatalog200 correct tiers; anonymous owner401; cross-origin403; owner login204 and empty queue; Test audience/old epoch rejection; private headers; no trackers direct/private or SPA crossing; Test/PDF/recovery disabled404; invalid webhook400 with no stored event. Do not insert fake paid orders into production.

## Razorpay

1. Correct existing merchant Dashboard on same authorized PC/profile. Confirm Live mode explicitly before changing webhook. Do not regenerate keys or change international/settlement settings.
2. Correct endpoint is production site's /api/checkout/webhook. Validate paused endpoint is deployed first, no guessed temporary preview endpoint. Use saved new Live webhook secret identical to staged server value through secure fill. Do not disclose or type secret from chat.
3. Subscribe only handlers implemented: payment.captured, refund.created, refund.processed, payment.dispute.created. No automatic refund execution. Verify exact URL, mode, selected events, enabled state after saving. Preserve existing Test webhook.
4. Follow official safe Dashboard webhook validation controls if available. Signed invalid/no-capture tests never equal real captured-payment proof. No real charge, order or capture permitted for testing.

## Before asking to enable new orders

- Same candidate Test-only hosted modal/CSP and capture/replay/retry/reconciliation chain verified against isolated TestDB, never Live funds.
- Production owner login/auth and empty real queue verified; copy link delivered only once active.
- Domestic storefront entry prepared without removing USD prices or inferring visitor location. International remains deferred.
- Customer terms: normally24h, maximum72h, full refund if still undelivered72h. Owner manually creates and emails PDF. Completion is owner attestation, not automated delivery proof.
- Parent currently prohibits enabling new orders. Report actual safety status and obtain any remaining direction rather than flip the switch.
- When PC work is finished, ask main to tell user and seek session closure. Never deliberately disconnect without user approval. If it drops mid-work, same-PC resume allowed, report actual inability if any.
