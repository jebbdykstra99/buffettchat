# buffettchat

Dedicated to Warren Buffett and Charlie Munger: investing wisdom, strategies, becoming financially free, making smart decisions. Wordmark **buffettchat**. Tagline: *The Oracle still talks.*

This is a **static** dress rehearsal of the SubX chrome (three-column X-like shell: left nav, center feed, right rail, hash routes, sign-in modal that closes, mobile hamburger). It is **not** the FastAPI / Next `subx` stack. No React, no Next, no FastAPI, no Firebase, no model calls.

Shareholder-letter calm. Owners, not traders. Not official Berkshire Hathaway. Not X.com. No AskAI.

## GitHub Pages + custom domain

These files are meant to drop into an empty public repo and be served from GitHub Pages at **buffettchat.com**.

1. Push this folder’s contents to branch `main` (site root, not `/docs`).
2. Repo **Settings → Pages**: Deploy from branch `main` / `/` (root).
3. Custom domain: `buffettchat.com`. The `CNAME` file in this repo already contains exactly that.

**DNS at GoDaddy still needs to point at GitHub Pages.** Do not change DNS from this repo. Typical GitHub Pages records:

- Apex `A` records to `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
- or a `CNAME` for `www` to `<your-user>.github.io`

Until DNS is pointed, Pages will serve on the github.io URL only if the repo is project-pages configured; for the custom domain, use a user/org Pages root as above.

## What this is / is not

- Feed-first **dummy** posts about investing wisdom (10-Ks, moats, float, circle of competence, fat pitches, inversion, compounding, Omaha). Fake handles only.
- Ranking chrome (For You / Following / Hot / New) slices the social feed. UI only.
- Right rail is dummy “In this year’s letter” and “Mental models” cards. Links stay on-site (`#explore`). No live quotes, no Yahoo Finance / CNBC / Berkshire URLs, no fetch or API.
- Sign-in modal closes (X, Escape, overlay click); auth is stubbed locally. No Firebase project keys.
- **Dummy feed. Not financial advice. Not a broker.**
- No AskAI. No packages catalog. No booking. No Jebb contact. Flagships stay dark. We are not X.com. Not official Berkshire Hathaway.
