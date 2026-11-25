# Continuation, Nov25 18:30 IST

UI review deployed separately, no Functions/secrets: https://checkout-ui-review.psychic-studio.pages.dev/checkout-preview/one-question-tarot and /orders-preview, alias and content visually verified. Main has links/screenshots.

Production cookie-only change854f385 is live, mobile/desktop inspected. Feature checkout must rebase production cookie changes before eventual merge. Do not merge/deploy checkout yet.

Connected tests: domestic separate INR1 mock bank payment pay_U4PoPGTEoGrlUV for order_U4Pj9fHL72UD2S captured, callback verified independently. USD5 international-Test-card payment pay_U4PiS4jOvQ1fzm rejected for domestic-only account. International remains held per user while IEC in process, USD pricing unchanged.

Latest work adds isolated owner session/orders APIs and PDF draft upload, not connected to UI/deployed yet. 32 local tests passed before file-store addition. Added alternate private D1-chunk store to avoid new R2 billing dependency. Must test D1 BLOB round-trip, quotas/size and SQL binding semantics before applying0002 or using it. New migration0002 NOT applied to remote D1 yet. D1 free quota hard-limited, no overage. Need validate cost/performance and purge policy, keep PDF max10MB. PDF structure check is not malware scan, review before send. No owner password provisioned, login auth still must be wired and tested, not ready.

Next: file-store tests and migration, owner publish/review/private guest download; email sender selection and scoped approval for service activation/messages; full authenticated preview deployment with deny-by-default endpoints and D1 test-only binding; Test webhook provisioning/verification/retry. Existing UI preview must remain static design-only while functional setup is developed.

User18:21 explicitly requested whole setup ready despite international pending. Preserve no real charge, no paid resource/terms, no production checkout launch without separate approval. User18:12 closed OfficePC; verified disconnected, no reconnect authority. Test keys securely saved with sandbox permission. Temporary copies always deleted, no secret values printed.
