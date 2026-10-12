# Blog manager

Route: /admin. Server endpoint: /api/blog-admin (POST only).

Production environment secrets:
- CMS_ADMIN_PASSWORD: user-chosen password, server-only secret.
- CMS_SESSION_SECRET: independent random 32-byte session signing key.
- CMS_GITHUB_TOKEN: fine-grained Tarot-only Contents read/write credential.
- CMS_PASSWORD_HASH: optional scrypt salt:hex digest instead of the password.

CMS_ORIGIN defaults to https://thepsychicstudio.com. CMS_BRANCH defaults to main.
Vercel firewall rule: /api/blog-admin equals; 20 requests / 600 seconds / IP; 429 action.
The rule covers all admin requests, including login. It must remain enabled.

Each confirmed save creates one atomic source commit with the article and its photos.
Concurrent writes are protected by expected article SHA and a non-forced branch update.
An unsuccessful network response must be reconciled against repository state before retrying.
Uploads: JPG, PNG or WebP; up to 1 MB each; at most three per save.

Content: content/blog/<lowercase-hyphenated-slug>.md.
Frontmatter: title, category, date (YYYY-MM-DD), excerpt, metaTitle, coverImage, published.
Additional frontmatter is preserved on edits. Photos live in public/uploads or the existing image packs.
Draft Markdown is excluded from public JS by the build plugin. A public repository still exposes source drafts.
The sitemap is generated during the production build from scripts/sitemap-static.xml plus published blog files.
New post, rename, unpublish and delete all change sitemap on the same deployment.

Publishing is not deployment confirmation. After a save, wait for Vercel Ready and verify the live page.
Batch daily posts to conserve deployment quota. There are two Vercel projects linked to this repository.
