# Private checkout development

Isolated feature branch only. Nothing deployed. Live activation is deliberately refused by the payment core.

## Implemented locally

- D1 schema for orders, gateway-event inbox, exceptions, private file versions, notification outbox, hashed guest tokens and audit trail.
- Test-only server create/status/callback/webhook endpoints. Captured payment must match currency, server catalog amount and gateway order. Duplicate events cannot send duplicate order notifications.
- Same-origin JSON checks, streaming body limit, Test key-prefix enforcement, mandatory rate-limiter binding, server-side catalog price snapshot.
- Guest cookie uses HttpOnly/Secure/SameSite, only token hash in DB. Current guest access supports one order cookie, not multi-order access.
- Desktop/mobile checkout and owner queue design previews, clearly nonfunctional and using sample data. No saves, charges, real customer data or working PDF actions.
- 26 passing local tests including SQLite-backed duplicate/stale captures, refund-resurrection prevention, mismatch rejection, outbox uniqueness and HTTP controls. TypeScript passes.

Run: `node --test checkout/tests/*.test.mjs` and `npm run lint`.

## Still needed before a functional Test preview

- Secure Test credentials and webhook-secret provisioning. No secrets in source/screenshots/chat. No keys generated yet.
- Isolated D1/private R2 and authenticated owner API. Never reuse the blog admin cookie or store customer records in the public GitHub repo.
- UI-to-API wiring, Razorpay hosted test checkout, D1 integration/concurrency tests and fake gateway-payment E2E.
- Recovery after uncertain gateway-create response. Current code refuses a duplicate request rather than issuing a second remote order; operator reconciliation is needed.
- Refund/dispute webhook state, reconciliation job, private PDF validation/versioning/download, email outbox worker and delivery retry. No real email sender selected.
- Owner authentication/session/authorization, guest recovery and multi-order access.

## Live gates

User deferred international-card application while IEC is in process, 25 Nov18:01 IST. No application was submitted by this work. Domestic-first does not authorize changing USD storefront prices or conversion amounts. Currency eligibility, business-category acceptance, account-specific financial terms, policy/privacy/tax decisions, successful isolated Test flow, reviewed preview and explicit live approval remain unresolved. No real charge or paid resource is authorized. Production storefront and old email-order patch are unchanged.
