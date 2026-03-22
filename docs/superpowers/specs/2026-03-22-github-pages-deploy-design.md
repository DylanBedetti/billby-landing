# GitHub Pages Deployment — Design Spec

**Date:** 2026-03-22
**Domain:** billby.com.au
**Trigger:** Push to `main`

## Overview

Add GitHub Pages deployment via official first-party GitHub Actions. The site is a Vite + React SPA that builds to `dist/`. No routing changes or Vite config changes are required because a custom domain means the base path is `/` (already the default).

## Files

### `public/CNAME`

Contains a single line: `billby.com.au`

Vite copies `public/` verbatim into `dist/` during build, so the CNAME file is preserved in the deployed artifact. This is how GitHub Pages identifies the custom domain for the deployment.

### `.github/workflows/deploy.yml`

Workflow triggered on `push` to `main`. Steps:

1. Checkout code (`actions/checkout@v4`)
2. Setup Node.js (`actions/setup-node@v4`, node version `20`, with `npm` cache)
3. Install dependencies (`npm ci`)
4. Build (`npm run build` → outputs to `dist/`)
5. Configure Pages (`actions/configure-pages@v5`)
6. Upload artifact (`actions/upload-pages-artifact@v3`, path `dist/`)
7. Deploy to Pages (`actions/deploy-pages@v4`)

Permissions required at the job level:
- `pages: write`
- `id-token: write`
- `contents: read`

Environment: `github-pages` (required for the deploy action to target the Pages environment).

## Manual steps (not automated)

These must be done once in the GitHub repo UI:

1. **Repo visibility:** GitHub Pages on the free tier requires the repository to be public. Verify this before enabling Pages.
2. **Settings → Pages → Source:** Set to "GitHub Actions"
3. **Settings → Pages → Custom domain:** Enter `billby.com.au`, enable "Enforce HTTPS"
4. **DNS (apex domain):** `billby.com.au` is an apex domain. CNAME records are invalid at the zone apex per the DNS spec. Use GitHub's A records instead, added at the registrar:
   ```
   185.199.108.153
   185.199.109.153
   185.199.110.153
   185.199.111.153
   ```
   Optionally also add the IPv6 AAAA records:
   ```
   2606:50c0:8000::153
   2606:50c0:8001::153
   2606:50c0:8002::153
   2606:50c0:8003::153
   ```

## What is NOT changing

- `vite.config.ts` — no `base` change needed
- `package.json` — no script changes
- Routing — no 404/SPA fallback needed. The app uses hash/anchor navigation exclusively (`#section-id`) and does not use React Router or any path-based routing, so no user-reachable deep URL can produce a 404 from GitHub Pages.

## Success criteria

- Push to `main` triggers the workflow
- Workflow completes and site is accessible at `https://billby.com.au`
- HTTPS is enforced
