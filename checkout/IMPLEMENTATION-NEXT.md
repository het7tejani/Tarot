# Continuation, Nov25 18:30 IST

UI review deployed separately, no Functions/secrets: https://checkout-ui-review.psychic-studio.pages.dev/checkout-preview/one-question-tarot and /orders-preview, alias and content visually verified. Main has links/screenshots.

Production cookie-only change854f385 is live, mobile/desktop inspected. Feature checkout must rebase production cookie changes before eventual merge. Do not merge/deploy checkout yet.

Connected tests: domestic separate INR1 mock bank payment pay_U4PoPGTEoGrlUV for order_U4Pj9fHL72UD2S captured, callback verified independently. USD5 international-Test-card payment pay_U4PiS4jOvQ1fzm rejected for domestic-only account. International remains held per user while IEC in process, USD pricing unchanged.

Latest work adds isolated owner session/orders APIs and PDF draft upload, not connected to UI/deployed yet. 32 local tests passed before file-store addition. Added alternate private D1-chunk store to avoid new R2 billing dependency. Must test D1 BLOB round-trip, quotas/size and SQL binding semantics before applying0002 or using it. New migration0002 NOT applied to remote D1 yet. D1 free quota hard-limited, no overage. Need validate cost/performance and purge policy, keep PDF max10MB. PDF structure check is not malware scan, review before send. No owner password provisioned, login auth still must be wired and tested, not ready.

Next: file-store tests and migration, owner publish/review/private guest download; email sender selection and scoped approval for service activation/messages; full authenticated preview deployment with deny-by-default endpoints and D1 test-only binding; Test webhook provisioning/verification/retry. Existing UI preview must remain static design-only while functional setup is developed.

User18:21 explicitly requested whole setup ready despite international pending. Preserve no real charge, no paid resource/terms, no production checkout launch without separate approval. User18:12 closed OfficePC; verified disconnected, no reconnect authority. Test keys securely saved with sandbox permission. Temporary copies always deleted, no secret values printed.

## Superseding checkpoint18:35 IST

Feature89247bb plus pending PDF hash/UI style changes:39 tests. New /orders-test owner login, queue, private draft upload, exact PDF review download, reviewed publication, logout. Not remotely deployed. Publish preconditions and audit now within atomic D1 batch. Private reads verify SHA256. Need transaction-safe order-status and upload audit handling too. Need add at-most-one-published-file index migration, retention/quota tests and session revocation design before launch. No email activation or sends.

Next: finish visual local UI inspection, provision isolated functional environment only after required current environment/secrets/bindings checks. Do not overwrite current design preview. No R2/paid resources, no live checkout, no OfficePC reconnect. Actual authenticated Cloudflare D1 BLOB roundtrip still required. Owner login credential not created. Transactional email sender decision/approval remains.

## Nov25 18:46 IST continuation checkpoint

User18:39 and18:40 rejected weak UI and asked photo/title, larger checkout image/details, explicit payment next steps and proper CMS. Originals recovered by message IDs in task transcript. Prioritized revised design demo, deployed https://109cdfff.psychic-studio.pages.dev alias checkout-ui-review unchanged. Actual hosted full checkout click-through and CMS selection verified, mobile/desktop pixels inspected and attached parent18:45:40. Feature latesta8c16b4. Only static artifact, no functions/secrets/bindings, production unchanged. Need carry new CMS hierarchy into functional OrdersTest later rather than keep older weak functional UI. Preview file selection stays local, no upload. Current mobile stacks catalog before form; no overflow.

Backend now43tests. Migration0002 applied remotely through D1 Console, verified correct account/schema and zero orders/files/chunks. SQL temporary128KB BLOB stored/read exact length/type/first bytes, then checkout_storage_probe table dropped and success verified. This does NOT prove deployed ArrayBuffer bindings/download. D1 API token attempt401, valid existing deploy token lacks D1 permission. Do not expand scope automatically. No lease active, Cloudflare site reported/released.

Pages native rate-limit bindings not supported by current Cloudflare docs. Replaced with D1 bounded fixed-window test limiter keyed by HMAC IP, no raw IP, fails closed without edge IP/signing secret. New0003_test_controls.sql (request_limits and unique published PDF/order) NOT remotely applied. ORDER_RATE_LIMIT_SECRET needed. Two limiter tests pass, catalog create/session now use it. Stale refunded/disputed captures no longer reported paid. Full refund/dispute webhook handling still NOT implemented.

Build slow/resource issue: artwork generation killed first build. Added PREVIEW_REUSE_ARTWORK=1 skip of expensive responsive artwork generation for reuse of already-generated valid artifacts, normal builds unchanged. UI deploy reused existing image assets with fast build. Deployment credential temp file deleted. No owner credential generated. Remaining functional environment/webhook/sender/recovery/security tests as above. Need preserve free500MB/D1 database limit and retention, no paid resources. Prior art wakes mention585fbbc/39tests stale, this note supersedes.
