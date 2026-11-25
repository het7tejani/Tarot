# Private checkout development

Isolated Test project and static design-review deployment. Production storefront remains unchanged except the separately approved cookie text.

## Current, 25 November 2026 19:12 IST

- User approved corrected checkout scope live at19:02. Do not call live approval missing. Functional safety and international eligibility remain conditions; a design demo must never be published as a working checkout.
- Design review https://checkout-ui-review.psychic-studio.pages.dev/checkout-preview/one-question-tarot has balanced initial price/total/payment panel, actual desktop and mobile pixels inspected.
- Functional Test workspace https://psychic-checkout-test.pages.dev/orders-test uses separate free Pages project, isolated D1 and Test-only credentials. Owner vault permission resolved, hash installed, login204 and queue200 verified.
- Functional CMS uses reviewed search/filter/product/customer/payment/work hierarchy, locked pending and ready actions, private drafts and reviewed publication. Separate one-hour owner cookie, no production CMS cookie reuse.
- Actual deployed owner upload, exact review download, publication and private guest download passed using explicitly labeled manual paid-state fixture. Guest1800-byte PDF exact match,200/private no-store; anonymous404. This is NOT captured-payment proof.
- Actual hosted Test checkout created two USD5 gateway orders and opened Razorpay Test modal. Both remain pending. Earlier separate INR1 mock-bank capture verified; international USD Test payment failed account domestic-only restriction. No real charge or storefront currency change.
- D1 migrations0001-0003 applied. Cloudflare compiled runtime tested300014-byte PDF chunk upload/read/publication/private download. 50local tests and TypeScript pass before final text spacing update.

## Remaining activation work

- International approval deliberately deferred by user while IEC is in process. USD prices unchanged.
- Razorpay Test webhook not configured; connected captured-payment > webhook > order chain and duplicate/recovery proof still needed. No authorized OfficePC session currently open and no reconnect authority.
- Transactional sender/domain and authorized notification templates/test audience unresolved. Zoho regular Mail policy excludes automated/transactional sends; no provider signup/send undertaken.
- Guest recovery/multi-order access, owner session revocation, production retention/security review and final turnaround/refund terms still required.
- No financial terms, paid resources, actual payments or customer emails approved by this work.

See IMPLEMENTATION-NEXT.md and TEST-RESULTS.md for bounded evidence and fixture IDs.
