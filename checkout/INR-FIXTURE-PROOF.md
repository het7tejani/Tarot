# Isolated domestic gateway proof

Goal: genuine Razorpay Test capture, signed webhook delivery, exact currency/amount reconciliation and one paid transition. This is not proof of USD acceptance.

Keep normal USD schema/catalog and current deployment untouched. Use disposable D1, separate Test-only Pages project and an explicit test fixture, never actual reading/customer records. Reuse signature/gateway/reconciliation modules without weakening matching. Permit INR only in isolated fixture schema. Bind all Test secrets using existing approved scope, no new token permission. Cloudflare authenticated Console can provision free D1 if quota permits; no paid resources.

1. Deploy exact application runtime against isolated D1 with identical migrations except fixture currency CHECK allows INR. Verify environment rejects live keys, anonymous owner access and bad signatures.
2. Create INR1 Test gateway order with an explicit fixture receipt. Insert pending fixture, exact100minor INR and returned gateway order ID, sample details and no notification recipient beyond example.test.
3. Configure existing Razorpay Test webhook to the isolated endpoint through authorized OfficePC. Verify saved mode, endpoint, events, secret and alert email before capture.
4. Pay via documented Test mock bank. Do not call checkout-verification endpoint. Observe pending to paid entirely from gateway delivery. Verify gateway_events processed row, captured ID and one outbox row, no email sent.
5. Replay exact signed event only from captured original evidence. Verify no second order/outbox/paid transition. Invalid signature must fail and alter nothing. Guest/private access checks remain.
6. Restore saved Test webhook endpoint, verify enabled details. Remove disposable fixture project/D1 after preserving non-secret evidence and checking no dependency. Never expose or log signed payload credentials.

If any resource would spend money or require wider access, stop that step. If original signed event cannot be recovered, duplicate proof remains unverified. Do not manufacture one and call it gateway-origin evidence.

## Local preparation completed23:05

`node checkout/fixtures/build-inr-schema.mjs /tmp/psychic-inr-proof/schema.sql` produces an INR-only disposable schema under the guarded temporary directory. It never changes the normal USD migration. Full webhook-handler tests exercise the unmodified handler and gateway read interface with local synthetic signatures and mocked gateway responses: valid capture+duplicate give one paid timestamp/event/outbox; invalid signature causes no gateway request/mutation; USD mismatch against INR fixture rejects409, no paid state. All53local tests and TypeScript pass. These are synthetic local tests, not gateway delivery proof.

Remaining external preparation needs an authorized console route to provision isolated free D1. Current deploy credential's D1 access denied; never widen or repurpose credentials to evade that. Remote PC held with no further changes pending closure decision.
