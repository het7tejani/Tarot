# Test results, 25 November 2026, 18:15 IST

- Test credentials securely provided, Test prefix validated. Read-only orders request HTTP200.
- Simulated USD5 order created through our test-only gateway adapter. Gateway order order_U4PbUD0sH17xP9, internal receipt150f8aef-2c70-4c62-9994-592382f01e38. No payment yet. Test amount accepted does not establish live international eligibility.
- Hosted Razorpay standard checkout loads in local isolated harness and explicitly shows Test Mode, USD5, Cards. Contact-details modal currently blocks progressing: dummy phone rejected or field update not preserved. No payment submit/capture yet. Need vendor-documented contact fixture and exact input validation inspection. Do not bypass validation or use real user card/contact.
- 30 local tests pass, TypeScript previously passed. Tests cover signatures, malformed bodies, mismatched amount/order/currency, duplicate/stale capture, outbox uniqueness, refunded order not resurrected, scoped owner sessions. Not end-to-end certification.
- Isolated D1 psychic-checkout-test 39d110c3-8561-4e36-b342-01482c6280c8 created on free hard-limited plan, migration applied, all seven app tables read back. No customer records or production binding.
- No resource billing enabled, R2 not provisioned due paid overage risk, no live deployment or real charge. Temporary credential files removed after every script.
- OfficePC remote closed at user's explicit18:12 request and verified inactive. Do not reconnect without fresh instruction. User-generated live key exists in Razorpay but not used or stored by this work. Only Test vault entry is used.
- Cookie-copy branch fix/cookie-notice-nov25 at95eb7d3: heading Use of cookies, exact user-shortened body. Preview inspected and sent parent, not live approved yet. Detailed policies and consent logic preserved.

Local harness /tmp/psychic-hosted-test.cjs requires fresh secure vault copies before run and deletes them. No secrets stored in source/harness output. The harness is disposable, not production checkout code. /tmp/psychic-razorpay-test-order.json stores nonsensitive Test order metadata.

## Nov25 18:35 IST checkpoint

39 local tests pass. TypeScript passes. Isolated USD5 Test order created, but international card payment failed for account domestic-only restriction. Separate INR1 mock-netbanking payment captured, callback signature and authenticated payment API verified. No real charge, no storefront currency change. International approval deferred by owner while IEC is in process.

Owner API chain tested with SQLite-backed route handlers: unauthorized access denied, PDF upload stays draft, incorrect recipient confirmation rejected, reviewed publication atomic with audit, duplicate publication rejected, guest access cookie required, exact PDF hash checked, refund disables download. Owner test UI now wired to those routes, not remotely deployed. D1 chunk corruption/truncation fails closed. PDF structure checks do not claim malware scanning.

Remote D1 has migration0001 only. Migration0002 and Cloudflare-native BLOB test remain. No full remote fulfilment/email proof yet. Existing hosted UI preview remains design-only and production checkout unchanged.

## Nov25 18:59 IST

Separate functional project deployed, no production changes. https://psychic-checkout-test.pages.dev/checkout-test/one-question-tarot verified hosted. USD5 Test create returns200; D1 guest status200 pending, no-token404; Razorpay Test modal inspected. No payment submitted. Two sample pending fixtures created:24e7a391-9b8e-4d45-a983-b3de9a162b07/order_U4QNULgLZ07bNw and b6035b36-c73e-4fe4-bab6-214be1c45c7f/order_U4QNsPO8JCaV6G. No customer data or money. Deployment9888fa6c returned, alias used because first immutable deployment TLS failure.

Local48tests now include verified refund/dispute state holds and provider-neutral notification leases/backoff. Email adapter/sends remain disabled; future adapter must use provider idempotency to handle uncertain send outcomes. Compiled Workers runtime smoke previously verified login and300014byte private PDF roundtrip/publication/guest download with exact bytes. Remote owner/PDF proof awaits secure credential provisioning permission. Migration0003 remote applied, all3statements success. No real customer delivery claim.
