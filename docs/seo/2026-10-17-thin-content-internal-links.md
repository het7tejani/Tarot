# Thin-content enrichment and internal linking - 17 October 2026 (afternoon pass)

Scope: the 79 "Discovered - currently not indexed" pages from the 12 Oct Pages report. Content and internal-link fixes only; no URL, brand or design changes. All new copy is belief-framed, no predictions, no guaranteed outcomes.

## Content enrichment (src/data/seoPass17.ts)
Added original sections via the existing SEO_PASS_SECTIONS injection point:
- 6 zodiac sign pages: cancer, gemini, leo, libra, pisces, scorpio (4 sections each: date-boundary answer + care/love/work reflection prompts, following the existing Taurus pattern).
- /zodiac-compatibility hub: how to use a pairing; limits of sun-sign matching.
- 4 compatibility pairs: leo-and-libra, leo-and-pisces, libra-and-scorpio, taurus-and-gemini (strengths + friction conversation prompts).
- /numerology: what numerology is (belief framing), a grounded way to try it, where numbers appear on the site.
- /angel-numbers hub: how to use the guide; belief-and-evidence note.
- 5 angel-number pages: 111, 222, 333, 555, 999 (3 sections each: practical prompt, love question, journal/work example, following the existing 1010/611 pattern).

## Internal linking
- SEO_CONTEXT_LINKS added for all enriched zodiac, compatibility and angel pages (sign page -> daily horoscope, birth chart, compatibility; pairs -> both sign profiles + love horoscope; angel pages -> sibling numbers + numerology). Hub rows extended: /angel-numbers now links 111, 222, 333, 555, 999 and blog 747/757; /numerology links birth chart and 111.
- HomePage "Explore by sign" link row extended with 6 discovered standalone pages: /birth-chart, /numerology, /rising-sign, /spirit-animal, /love-tarot-reading, /mercury-retrograde.

## Sitemap
- scripts/sitemap.mjs now emits <lastmod> from blog post frontmatter dates (48 blog URLs). Static pages unchanged.

## Verification
- npm run build: green, 192 prerendered routes; SEO structure gate and crawl-readiness gate pass.
- tsc --noEmit: clean.
- Sitemap: 192 URLs, 48 with lastmod.
- Word counts from prerendered HTML (rough, scripts stripped): /zodiac/cancer 255->499, /numerology 263->421, /angel-numbers/555 295->585, /zodiac-compatibility 194->297.
- Mobile screenshots (390px) inspected for /zodiac/cancer, /angel-numbers/555, /numerology: sections and Related guides rows render, layout intact.

## Not in this pass
- The 10 "Duplicate, Google chose different canonical" tarot pages: live checks show consistent bare-domain signals (www 308s to bare, bare canonical tags, sitemap all-bare, no internal www links). No code change needed; fix is recrawl/consolidation + indexing requests via Search Console.
- No index-request resubmission for URLs already requested on 17 Oct early morning (Chariot, angel-numbers hub, birth-chart).
