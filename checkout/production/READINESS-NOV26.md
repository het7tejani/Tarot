# Domestic checkout preparation, November 26, 2026

Not deployed. This is an execution checkpoint, not a launch sign-off.

## Verified this pass

- Saved Live API pair securely retrieved and validated with documented read-only GET /v1/orders?count=1, HTTP200 collection at11:00IST. No Live order, payment, capture, refund or settings change. Copies deleted immediately after validation.
- Production main e29c3f9 merged into feature branch, preserving current138/140 artwork sets and cookie changes. Production branch untouched.
- All77local tests and TypeScript pass. Full client build, SSR/prerender,380canonical-route SEO and crawl checks,421HTML markdown check pass. Fast reuse-only build yielded a stale sitemap and was NOT accepted; full artwork build regenerated it and checks ran again against380routes.
- Added private response middleware, no-store/noindex/no-referrer, tracker-free checkout/owner shells and full document navigation at public/private boundaries. Accepted-consent browser test: no direct-private tracker requests, public/private pushState forced new document.
- Separate INR-only new-database schema incorporates all five migrations including optionalDOB. Local SQL proves INR accepted/USD rejected. Never apply it over existing Test data.
- Manual Live mode blocks unused PDF upload/publish/download/recovery routes. Manual workflow does not require them. PDF sandbox policy preserved in Test responses.
- Desktop1280/mobile390 checkout and owner UI inspected with synthetic API fixtures. No overflow, uncertain-create retry lock, recipient confirmation and manual-sent record pass. This does not prove deployed Cloudflare headers, bindings or gateway modal CSP.

## Settled user terms

Latest WhatsApp exchange11:02-11:03: usually send within24hours, maximum72hours after payment; full refund if undelivered after72hours. Explicit yes11:03:06. No automatic refund authorization. Local checkout, owner and policy wording updated. The existing due_at remains the24hour owner work target, not a refund trigger; owner display separately calculates maximum72hour deadline. No scheduler or refund action added.

Domestic price snapshot remains approved one-time Nov25 current-rate conversion: INR462.34/832.21/1387.02 for USD5/9/15 catalog tiers. Preserve USD reference catalog separately. Do not refresh FX silently.

## Remaining before inviting payment

1. Confirm current Cloudflare project configuration with permitted API access, preserve unrelated bindings/secrets/functions. Provision dedicated INR production database only within existing free limits; owner/session/rate-limit/webhook secrets separate from Test. New-order switch remains no.
2. Deploy paused candidate with full current source. Verify private route HTTP headers and no analytics, bound schema/environment, owner login/audience/session revocation and valid invalid-origin/auth tests. No customer funds accepted.
3. Use Test-only staging with same candidate for actual hosted gateway-modal/CSP validation and capture/reconciliation/retry flow. Previously verified isolated Test capture remains evidence, not proof of this candidate.
4. Configure Live merchant webhook from authorized Dashboard route after endpoint and secret are staged. Official docs use Dashboard; API pair is not Dashboard login. Current PC restriction remains. Main coordinates one access request when this step is ready. Select expected payment/refund/dispute events and confirm saved URL/mode/secret handling, no regeneration.
5. Review and implement explicit domestic storefront entry without replacing USD prices. Full navigation required. Confirm private handling for unknown route/error cases and policy links. Verify functional cookies and manual email owner task semantics.
6. Production health, signed-webhook/replay/recovery/duplicate controls, owner auth and recipient workflow proof. No real-charge test without separate approval. Never mark a manually inserted paid fixture as a verified capture.
7. Only enable new-order gate under established launch authority after every safety check. Main owns user delivery and remaining decisions.

## Current real access gap

Dashboard access is required for Live webhook settings, not for API-pair validation. No Razorpay cloud-Dashboard exception found in account rules; permitted brand cloud exception names Google SEO/backlinks. No new PC/OTP connection made. Do not request access until paused endpoint and secret are ready, unless main directs otherwise.

## Sources

https://razorpay.com/docs/api/authentication
https://razorpay.com/docs/api/orders/fetch-all
https://razorpay.com/docs/webhooks/setup-edit-payments
https://razorpay.com/docs/webhooks/validate-test

These sources were fetched this pass. No secrets or customer records are in this checkpoint.

## 11:14 access and runtime update

Current Pages API confirmed production compatibility2026-11-13 with nodejs_compat and no D1bindings. Existing deploy token D1list401, so do not widen it. Existing Dashboard read confirmed free4/10DB,2.38MB/5GB,0/5Mreads,0/100kwrites. Cloudflare browser creation not covered by standing account rules, no creation attempted. User11:12 explicitly approves OfficePC for Cloudflare order DB/schema plus Razorpay payment-notification setup; original reply recorded by main. Exact prior OfficeMe host recovered, correct CRD account hettj149, not PsychicStudio account. Current sign-in in progress, not yet PC-connected.

Added runtime-paused-live.mjs: compiled Functions running in local workerd with actual production compatibility2026-11-13 and synthetic Live identity/new INRschema. Passed paused create before gateway/DBwrite, fixed INRquote, owner origin/login/Test-audience/revoked-epoch, DOB, exact-recipient once-only manual-sent, disabled PDF/recovery/Test routes, invalid webhook no event, private HTTPheaders, logout cookie.0external gateway calls,0email,0realorders.77unit tests pass again. Local result is not hosted proof.
