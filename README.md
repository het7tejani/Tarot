# The Psychic Studio website

React + TypeScript + Vite site for thepsychicstudio.com. Static-prerendered
public pages plus a small client-side admin. Deploys to Vercel from `main`.

## Commands

- `npm ci` - install dependencies
- `npm run dev` - local dev server on port 3000
- `npm run build` - full production build: client bundle, SSR bundle,
  prerender of all public routes, then SEO, crawl-readiness and markdown
  checks. A green build is required before any push to `main`.
- `npm run preview` - serve the production build locally

## Layout

- `src/main.tsx` - browser entry; hydrates prerendered HTML or mounts fresh,
  wraps the app in `ErrorBoundary`
- `src/entry-server.tsx` - SSR entry used by the prerender step
- `src/App.tsx` - route table; most pages lazy-load
- `src/studio/` - main site pages (Home, Shop, Layout, legal pages)
- `src/pages/` - feature pages (free tarot, blog, SEO landing pages)
- `src/admin/` - CMS admin UI
- `src/components/` - shared components
- `src/contexts/` - React context providers
- `src/data/` - content and SEO data modules (cards, readings, blog data,
  seoPages, seoRoutePaths)
- `src/services/` - browser-side services (CMS storage)
- `scripts/` - build-time tooling: prerender, sitemap, SEO and crawl checks
- `content/blog/` - blog posts as Markdown with frontmatter
- `public/blog-images/pack-N.json` - base64 webp image packs for blog posts
- `content-ledger/` - dated JSON work logs (daily SEO work, audits, GSC
  baselines). History of what was done and why lives here.

## Content pipeline

Blog posts are Markdown files in `content/blog/` with frontmatter. Images
come from `public/blog-images/pack-N.json`. `npm run build` prerenders every
public route and runs structure, crawl-readiness and markdown checks; a
failed check fails the build.

## Deploy

Push to `main` on GitHub; Vercel builds and deploys automatically in about
two minutes. One push per fix batch. Non-SEO code changes are previewed and
approved before they go live.

## Conventions

- Commits are authored as `Het Tejani <hettj149@gmail.com>`.
- Copy rules: no em dashes, no AI-tell words, no hedging, small disclaimers
  only.
- Credentials live in the vault, never in the repo.
