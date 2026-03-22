# GitHub Pages Deployment Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Deploy the Billby landing page to GitHub Pages at `billby.com.au` with automatic deploys on every push to `main`.

**Architecture:** Two files are added — a `CNAME` in `public/` (Vite copies this verbatim into `dist/`) and a GitHub Actions workflow that runs `npm ci && npm run build`, then uploads the `dist/` artifact and deploys it using the official first-party GitHub Pages actions.

**Tech Stack:** GitHub Actions, Vite 8, Node 20, official GitHub Pages actions (`configure-pages@v5`, `upload-pages-artifact@v3`, `deploy-pages@v4`)

---

## File Map

| Action | Path | Purpose |
|--------|------|---------|
| Create | `public/CNAME` | Tells GitHub Pages to use `billby.com.au` as the custom domain |
| Create | `.github/workflows/deploy.yml` | CI/CD workflow: build → upload artifact → deploy to Pages |

No existing files are modified.

---

### Task 1: Add CNAME file

**Files:**
- Create: `public/CNAME`

- [ ] **Step 1: Create the CNAME file**

  Create `public/CNAME` with exactly this content (no trailing newline issues — a single line is fine):

  ```
  billby.com.au
  ```

- [ ] **Step 2: Verify Vite will include it in the build**

  Run the build and confirm the file appears in `dist/`:

  ```bash
  npm run build && ls dist/CNAME
  ```

  Expected output: `dist/CNAME`

- [ ] **Step 3: Commit**

  ```bash
  git add public/CNAME
  git commit -m "feat: add CNAME for billby.com.au GitHub Pages"
  ```

---

### Task 2: Add GitHub Actions deploy workflow

**Files:**
- Create: `.github/workflows/deploy.yml`

- [ ] **Step 1: Create the workflow directory and file**

  Create `.github/workflows/deploy.yml` with the following content:

  ```yaml
  name: Deploy to GitHub Pages

  on:
    push:
      branches:
        - main

  permissions:
    contents: read

  jobs:
    build:
      runs-on: ubuntu-latest
      steps:
        - name: Checkout
          uses: actions/checkout@v4

        - name: Setup Node
          uses: actions/setup-node@v4
          with:
            node-version: '20'
            cache: 'npm'

        - name: Install dependencies
          run: npm ci

        - name: Build
          run: npm run build

        - name: Upload Pages artifact
          uses: actions/upload-pages-artifact@v3
          with:
            path: dist/

    deploy:
      needs: build
      runs-on: ubuntu-latest
      environment:
        name: github-pages
        url: ${{ steps.deployment.outputs.page_url }}
      permissions:
        pages: write
        id-token: write
      steps:
        - name: Configure Pages
          uses: actions/configure-pages@v5

        - name: Deploy to GitHub Pages
          id: deployment
          uses: actions/deploy-pages@v4
  ```

  Note on permissions: `contents: read` is set at the workflow level (applies to all jobs by default). `pages: write` and `id-token: write` are scoped to the `deploy` job only — this is intentional to follow least-privilege.

- [ ] **Step 2: Verify the workflow file is valid YAML**

  ```bash
  python3 -c "import yaml; yaml.safe_load(open('.github/workflows/deploy.yml'))" && echo "YAML valid"
  ```

  Expected: `YAML valid`

- [ ] **Step 3: Commit**

  ```bash
  git add .github/workflows/deploy.yml
  git commit -m "feat: add GitHub Actions workflow for GitHub Pages deployment"
  ```

---

### Task 3: Manual repo configuration (human steps)

These cannot be automated via code. Complete them in order before pushing to `main`.

- [ ] **Step 1: Confirm repo is public**

  Go to the GitHub repo → Settings → General → Danger Zone. Confirm visibility is "Public". GitHub Pages on the free tier requires a public repo.

- [ ] **Step 2: Enable GitHub Pages with GitHub Actions source**

  Go to Settings → Pages → Build and deployment → Source. Select **"GitHub Actions"** (not "Deploy from a branch").

- [ ] **Step 3: Set DNS A records at your registrar**

  In your domain registrar's DNS settings for `billby.com.au`, add these four A records (@ or apex):

  ```
  185.199.108.153
  185.199.109.153
  185.199.110.153
  185.199.111.153
  ```

  Optionally also add four AAAA records for IPv6:

  ```
  2606:50c0:8000::153
  2606:50c0:8001::153
  2606:50c0:8002::153
  2606:50c0:8003::153
  ```

  Note: `billby.com.au` is an apex domain. Do NOT use a CNAME record — CNAME at the zone apex is invalid per DNS spec and is forbidden by most registrars.

- [ ] **Step 4: Set custom domain in GitHub Pages settings**

  Go to Settings → Pages → Custom domain. Enter `billby.com.au` and click Save. GitHub will verify the DNS records (this may take a few minutes once DNS propagates).

- [ ] **Step 5: Enable Enforce HTTPS**

  Once the custom domain is verified, the "Enforce HTTPS" checkbox will become available. Enable it.

---

### Task 4: Verify deployment

- [ ] **Step 1: Push to main and watch the workflow**

  ```bash
  git push origin main
  ```

  Then go to the GitHub repo → Actions tab. Confirm the "Deploy to GitHub Pages" workflow appears and both the `build` and `deploy` jobs complete with green checkmarks.

- [ ] **Step 2: Confirm the site is live**

  Once the workflow completes, open `https://billby.com.au` in a browser. Confirm:
  - The Billby landing page loads
  - The browser shows a padlock (HTTPS)
  - No console errors related to missing assets

- [ ] **Step 3: Verify CNAME is in the deployed artifact**

  Open browser DevTools → Network tab, reload the page. The CNAME file itself isn't served by GitHub Pages, but you can confirm Pages is using the custom domain by checking the URL bar shows `billby.com.au` rather than `<username>.github.io`.
