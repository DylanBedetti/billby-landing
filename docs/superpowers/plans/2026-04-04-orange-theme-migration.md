# Orange Theme Migration — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Migrate the Billby landing page from the current purple/green theme (radix-nova shadcn style) to the orange theme (new-york shadcn style) used in the desktop client, ensuring visual brand consistency across both products.

**Architecture:** Replace the entire CSS variable system (oklch-based, purple primary) with the desktop client's HSL-based orange theme. Update `components.json` to `new-york` style. Then sweep every component for hardcoded purple/green/violet color references and replace them with orange-warm equivalents.

**Tech Stack:** Tailwind CSS v4, shadcn/ui (new-york style), CSS custom properties (HSL format), Vite, React 19

---

## File Map

| File | Action | Responsibility |
|------|--------|----------------|
| `src/index.css` | **Rewrite** | Replace entire theme with desktop-client orange HSL variables |
| `components.json` | **Modify** | Change style from `radix-nova` to `new-york` |
| `public/favicon.svg` | **Modify** | Change fill from `#7C3AED` to `#F97316` (orange-500, closest to HSL 24.6 95% 53.1%) |
| `public/og-image.html` | **Modify** | Replace all purple hex values with orange equivalents |
| `src/components/ui/AnimatedTimeEntryCard.tsx` | **Modify** | Replace hardcoded hex colors with semantic Tailwind classes |
| `src/components/sections/HeroSection.tsx` | **Modify** | Replace hardcoded purple gradient |
| `src/components/sections/FeaturesSection.tsx` | **Modify** | Replace `violet-*` / `emerald-*` icon colors with orange-warm palette |
| `src/components/sections/HowItWorksSection.tsx` | **Modify** | Replace `violet-*` / `emerald-*` / `indigo-*` icon colors |
| `src/components/sections/Footer.tsx` | **Modify** | Replace `text-violet-400` with orange accent |
| `src/components/sections/NavBar.tsx` | **Verify** | Uses semantic `text-primary` already — just verify it renders orange |

Files that need **no changes** (already use semantic classes only):
- `src/components/ui/Button.tsx` — uses `bg-primary`, `text-primary` etc.
- `src/components/ui/SectionHeader.tsx` — uses `text-primary`, `text-foreground`
- `src/components/ui/FeatureCard.tsx` — uses `bg-card`, `text-foreground`, passes through `iconClassName`
- `src/components/ui/Accordion.tsx` — uses `text-primary`, `text-foreground`, `border-border`
- `src/components/ui/StatCounter.tsx` — uses `text-primary`, `text-muted-foreground`
- `src/components/sections/ProblemSection.tsx` — uses `bg-background`, `border-primary`
- `src/components/sections/CTABand.tsx` — uses `bg-primary`
- `src/components/sections/FAQSection.tsx` — uses semantic classes only

---

## Task 1: Replace CSS theme variables in `src/index.css`

**Files:**
- Modify: `src/index.css`

This is the core of the migration. We replace the oklch-based purple theme with the desktop client's HSL-based orange theme, keeping the landing-page-specific extras (Inter font, smooth scroll, tw-animate-css import).

- [ ] **Step 1: Rewrite `src/index.css`**

Replace the entire file with:

```css
@import "tailwindcss";
@import "tw-animate-css";
@import "shadcn/tailwind.css";
@custom-variant dark (&:is(.dark *));

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 20 14.3% 4.1%;
    --card: 0 0% 100%;
    --card-foreground: 20 14.3% 4.1%;
    --popover: 0 0% 100%;
    --popover-foreground: 20 14.3% 4.1%;
    --primary: 24.6 95% 53.1%;
    --primary-foreground: 60 9.1% 97.8%;
    --secondary: 60 4.8% 95.9%;
    --secondary-foreground: 24 9.8% 10%;
    --muted: 60 4.8% 95.9%;
    --muted-foreground: 25 5.3% 44.7%;
    --accent: 60 4.8% 95.9%;
    --accent-foreground: 24 9.8% 10%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 60 9.1% 97.8%;
    --border: 20 5.9% 90%;
    --input: 20 5.9% 90%;
    --ring: 24.6 95% 53.1%;
    --radius: 0.5rem;
    --chart-1: 12 76% 61%;
    --chart-2: 173 58% 39%;
    --chart-3: 197 37% 24%;
    --chart-4: 43 74% 66%;
    --chart-5: 27 87% 67%;
    --sidebar: 0 0% 98%;
    --sidebar-foreground: 240 5.3% 26.1%;
    --sidebar-primary: 24.6 95% 53.1%;
    --sidebar-primary-foreground: 60 9.1% 97.8%;
    --sidebar-accent: 60 4.8% 95.9%;
    --sidebar-accent-foreground: 24 9.8% 10%;
    --sidebar-border: 20 5.9% 90%;
    --sidebar-ring: 24.6 95% 53.1%;
  }
}

@layer base {
  * {
    @apply border-border outline-ring/50;
  }
  body {
    @apply bg-background text-foreground;
  }
  html {
    @apply font-sans;
    scroll-behavior: smooth;
  }
}

@theme inline {
  --font-heading: 'Inter', system-ui, sans-serif;
  --font-sans: 'Inter', system-ui, sans-serif;
  --color-background: hsl(var(--background));
  --color-foreground: hsl(var(--foreground));
  --color-card: hsl(var(--card));
  --color-card-foreground: hsl(var(--card-foreground));
  --color-popover: hsl(var(--popover));
  --color-popover-foreground: hsl(var(--popover-foreground));
  --color-primary: hsl(var(--primary));
  --color-primary-foreground: hsl(var(--primary-foreground));
  --color-secondary: hsl(var(--secondary));
  --color-secondary-foreground: hsl(var(--secondary-foreground));
  --color-muted: hsl(var(--muted));
  --color-muted-foreground: hsl(var(--muted-foreground));
  --color-accent: hsl(var(--accent));
  --color-accent-foreground: hsl(var(--accent-foreground));
  --color-destructive: hsl(var(--destructive));
  --color-destructive-foreground: hsl(var(--destructive-foreground));
  --color-border: hsl(var(--border));
  --color-input: hsl(var(--input));
  --color-ring: hsl(var(--ring));
  --color-chart-1: hsl(var(--chart-1));
  --color-chart-2: hsl(var(--chart-2));
  --color-chart-3: hsl(var(--chart-3));
  --color-chart-4: hsl(var(--chart-4));
  --color-chart-5: hsl(var(--chart-5));
  --radius-sm: calc(var(--radius) - 4px);
  --radius-md: calc(var(--radius) - 2px);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) + 4px);
  --color-sidebar: hsl(var(--sidebar));
  --color-sidebar-foreground: hsl(var(--sidebar-foreground));
  --color-sidebar-primary: hsl(var(--sidebar-primary));
  --color-sidebar-primary-foreground: hsl(var(--sidebar-primary-foreground));
  --color-sidebar-accent: hsl(var(--sidebar-accent));
  --color-sidebar-accent-foreground: hsl(var(--sidebar-accent-foreground));
  --color-sidebar-border: hsl(var(--sidebar-border));
  --color-sidebar-ring: hsl(var(--sidebar-ring));
}
```

Key changes from current:
- All `:root` variables now use HSL format (matching desktop client) instead of oklch
- Primary is now `24.6 95% 53.1%` (vibrant orange) instead of `#7C3AED` (purple)
- Background is pure white `0 0% 100%` instead of `#FAFAFA`
- Foreground is warm dark brown `20 14.3% 4.1%` instead of `#111827`
- Removed the duplicate `@theme` block with direct hex values — everything routes through HSL vars
- Removed `.dark` block (landing page is light-only)
- Kept Inter font, smooth scroll, tw-animate-css and shadcn/tailwind.css imports
- Radius goes back to `0.5rem` (desktop client value) from `0.625rem`

- [ ] **Step 2: Verify build compiles**

Run: `cd /Users/dylanbedetti/Documents/personal/billby-landing && npm run build`
Expected: Build succeeds with no errors.

- [ ] **Step 3: Commit**

```bash
git add src/index.css
git commit -m "theme: replace purple oklch variables with orange HSL theme from desktop client"
```

---

## Task 2: Update `components.json` shadcn config

**Files:**
- Modify: `components.json`

- [ ] **Step 1: Update style and remove extra keys**

Change `components.json` to:

```json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "new-york",
  "rsc": false,
  "tsx": true,
  "tailwind": {
    "config": "",
    "css": "src/index.css",
    "baseColor": "neutral",
    "cssVariables": true,
    "prefix": ""
  },
  "iconLibrary": "lucide",
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils",
    "ui": "@/components/ui",
    "lib": "@/lib",
    "hooks": "@/hooks"
  }
}
```

Changes: `style` from `radix-nova` to `new-york`. Removed `rtl`, `menuColor`, `menuAccent`, `registries` (not used in new-york style).

- [ ] **Step 2: Commit**

```bash
git add components.json
git commit -m "config: switch shadcn style from radix-nova to new-york"
```

---

## Task 3: Replace hardcoded hex colors in `AnimatedTimeEntryCard.tsx`

**Files:**
- Modify: `src/components/ui/AnimatedTimeEntryCard.tsx`

This file has 14 instances of hardcoded hex colors that must become semantic Tailwind classes.

- [ ] **Step 1: Replace all hardcoded colors**

Make these replacements throughout the file:

| Old | New | Reason |
|-----|-----|--------|
| `text-[#6B7280]` | `text-muted-foreground` | Semantic muted text |
| `text-[#111827]` | `text-foreground` | Semantic foreground |
| `text-[#7C3AED]` | `text-primary` | Semantic primary |
| `bg-[#7C3AED]` | `bg-primary` | Semantic primary |
| `border-[#7C3AED]` | `border-primary` | Semantic primary |
| `bg-[#10B981]` | `bg-emerald-500` | Status indicator green (not brand-semantic — this is a "ready" dot) |

Specifically, the card body at line 96 onwards becomes:

```tsx
    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 w-full max-w-lg overflow-hidden">
      {/* Card header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
        <div>
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Matter</p>
          <p className="text-sm font-semibold text-foreground">Smith v Jones</p>
        </div>
        <div className="text-center">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Client</p>
          <p className="text-sm font-semibold text-foreground">Clayton &amp; Associates</p>
        </div>
        <div className="text-right">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Duration</p>
          <p className="text-sm font-semibold text-primary">1h 22m</p>
        </div>
      </div>

      {/* Card body */}
      <div className="px-5 py-4 min-h-[160px]">
        {(phase === 'signals') && (
          <ul className="space-y-1.5" aria-label="activity signals">
            {SIGNALS.slice(0, visibleSignals).map((signal, i) => (
              <li
                key={i}
                className="font-mono text-xs text-muted-foreground animate-in fade-in duration-300"
              >
                {signal}
              </li>
            ))}
          </ul>
        )}

        {phase === 'processing' && (
          <div className="flex items-center gap-2 text-sm text-primary font-medium">
            <span
              className="inline-block w-3 h-3 rounded-full border-2 border-primary border-t-transparent animate-spin"
              aria-hidden="true"
            />
            <span>Analysing activity{'.'.repeat(dotCount)}</span>
          </div>
        )}

        {(phase === 'narrative' || phase === 'done') && (
          <pre
            className="text-sm text-foreground whitespace-pre-wrap font-sans leading-relaxed"
            aria-label="AI narrative"
          >
            {narrative}
            {phase === 'narrative' && (
              <span className="inline-block w-0.5 h-4 bg-primary ml-px align-middle animate-pulse" aria-hidden="true" />
            )}
          </pre>
        )}
      </div>

      {/* Footer badge */}
      <div className="px-5 py-3 bg-gray-50 border-t border-gray-100 flex items-center gap-2">
        <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500" />
        <span className="text-xs text-muted-foreground">Generated · ready for review</span>
      </div>
    </div>
```

Note: `bg-emerald-500` is kept for the status dot — it's a semantic "success/ready" indicator, not brand color.

- [ ] **Step 2: Run tests**

Run: `cd /Users/dylanbedetti/Documents/personal/billby-landing && npm run test:run`
Expected: All tests pass.

- [ ] **Step 3: Commit**

```bash
git add src/components/ui/AnimatedTimeEntryCard.tsx
git commit -m "refactor: replace hardcoded hex colors with semantic Tailwind classes in AnimatedTimeEntryCard"
```

---

## Task 4: Replace hardcoded purple gradient in `HeroSection.tsx`

**Files:**
- Modify: `src/components/sections/HeroSection.tsx`

- [ ] **Step 1: Replace the inline gradient color**

Change line 53 from:
```tsx
              'radial-gradient(ellipse at center, #7C3AED 0%, transparent 70%)',
```
to:
```tsx
              'radial-gradient(ellipse at center, hsl(24.6, 95%, 53.1%) 0%, transparent 70%)',
```

This uses the exact orange HSL value from the theme. An inline style is acceptable here since CSS `radial-gradient` can't reference Tailwind classes directly.

- [ ] **Step 2: Verify build**

Run: `cd /Users/dylanbedetti/Documents/personal/billby-landing && npm run build`
Expected: Build succeeds.

- [ ] **Step 3: Commit**

```bash
git add src/components/sections/HeroSection.tsx
git commit -m "theme: replace purple gradient with orange in HeroSection"
```

---

## Task 5: Replace violet/emerald icon colors in `FeaturesSection.tsx`

**Files:**
- Modify: `src/components/sections/FeaturesSection.tsx`

The current icon colors use purple-family Tailwind classes. Switch to an orange-warm palette:

| Feature | Old | New |
|---------|-----|-----|
| OS-level intelligence | `bg-violet-100 text-violet-600` | `bg-orange-100 text-orange-600` |
| Contextual awareness | `bg-emerald-100 text-emerald-600` | `bg-amber-100 text-amber-600` |
| Generated narratives | `bg-indigo-100 text-indigo-600` | `bg-yellow-100 text-yellow-700` |
| End-of-day compilation | `bg-amber-100 text-amber-600` | `bg-rose-100 text-rose-600` |
| Billing software integration | `bg-sky-100 text-sky-600` | `bg-teal-100 text-teal-600` |
| Enterprise-ready security | `bg-slate-100 text-slate-600` | `bg-stone-100 text-stone-600` |

Also change the section background from `bg-violet-50/30` to `bg-orange-50/30`.

- [ ] **Step 1: Update icon class names and section background**

On line 8, change:
```tsx
    iconClassName: 'bg-violet-100 text-violet-600',
```
to:
```tsx
    iconClassName: 'bg-orange-100 text-orange-600',
```

On line 32, change:
```tsx
    iconClassName: 'bg-emerald-100 text-emerald-600',
```
to:
```tsx
    iconClassName: 'bg-amber-100 text-amber-600',
```

On line 55, change:
```tsx
    iconClassName: 'bg-indigo-100 text-indigo-600',
```
to:
```tsx
    iconClassName: 'bg-yellow-100 text-yellow-700',
```

On line 78 (amber stays as rose to differentiate):
```tsx
    iconClassName: 'bg-amber-100 text-amber-600',
```
to:
```tsx
    iconClassName: 'bg-rose-100 text-rose-600',
```

On line 103, change:
```tsx
    iconClassName: 'bg-sky-100 text-sky-600',
```
to:
```tsx
    iconClassName: 'bg-teal-100 text-teal-600',
```

On line 127, change:
```tsx
    iconClassName: 'bg-slate-100 text-slate-600',
```
to:
```tsx
    iconClassName: 'bg-stone-100 text-stone-600',
```

On line 152, change:
```tsx
    <section id="features" className="bg-violet-50/30 py-20 sm:py-28">
```
to:
```tsx
    <section id="features" className="bg-orange-50/30 py-20 sm:py-28">
```

- [ ] **Step 2: Verify build**

Run: `cd /Users/dylanbedetti/Documents/personal/billby-landing && npm run build`
Expected: Build succeeds.

- [ ] **Step 3: Commit**

```bash
git add src/components/sections/FeaturesSection.tsx
git commit -m "theme: replace violet/emerald icon colors with orange-warm palette in FeaturesSection"
```

---

## Task 6: Replace violet/emerald/indigo icon colors in `HowItWorksSection.tsx`

**Files:**
- Modify: `src/components/sections/HowItWorksSection.tsx`

- [ ] **Step 1: Update icon class names**

On line 7, change:
```tsx
    iconClassName: 'bg-violet-100 text-violet-600',
```
to:
```tsx
    iconClassName: 'bg-orange-100 text-orange-600',
```

On line 32, change:
```tsx
    iconClassName: 'bg-emerald-100 text-emerald-600',
```
to:
```tsx
    iconClassName: 'bg-amber-100 text-amber-600',
```

On line 57, change:
```tsx
    iconClassName: 'bg-indigo-100 text-indigo-600',
```
to:
```tsx
    iconClassName: 'bg-yellow-100 text-yellow-700',
```

- [ ] **Step 2: Commit**

```bash
git add src/components/sections/HowItWorksSection.tsx
git commit -m "theme: replace violet/emerald/indigo icon colors with orange-warm palette in HowItWorksSection"
```

---

## Task 7: Replace violet accent in `Footer.tsx`

**Files:**
- Modify: `src/components/sections/Footer.tsx`

- [ ] **Step 1: Update wordmark accent color**

On line 13, change:
```tsx
              <span className="text-violet-400">by</span>
```
to:
```tsx
              <span className="text-orange-400">by</span>
```

- [ ] **Step 2: Commit**

```bash
git add src/components/sections/Footer.tsx
git commit -m "theme: replace violet wordmark accent with orange in Footer"
```

---

## Task 8: Update `NavBar.tsx` wordmark

**Files:**
- Modify: `src/components/sections/NavBar.tsx`

The NavBar wordmark on line 47 uses `text-primary` for the "by" span, which will automatically become orange. However, verify it looks correct.

- [ ] **Step 1: Verify NavBar uses semantic class**

Read `src/components/sections/NavBar.tsx` line 47. Confirm it says:
```tsx
              bill<span className="text-primary">by</span>
```

This requires no changes — `text-primary` will resolve to orange after Task 1.

- [ ] **Step 2: Mark as verified (no changes needed)**

---

## Task 9: Update favicon

**Files:**
- Modify: `public/favicon.svg`

- [ ] **Step 1: Replace purple fill with orange**

Change line 3 from:
```svg
  <rect width="32" height="32" rx="7" fill="#7C3AED"/>
```
to:
```svg
  <rect width="32" height="32" rx="7" fill="#F97316"/>
```

`#F97316` is Tailwind's `orange-500`, the closest hex to HSL(24.6, 95%, 53.1%).

- [ ] **Step 2: Commit**

```bash
git add public/favicon.svg
git commit -m "assets: update favicon from purple to orange"
```

---

## Task 10: Update OG image template

**Files:**
- Modify: `public/og-image.html`

This file is used to generate `og-image.png`. All purple references must become orange.

- [ ] **Step 1: Replace all purple hex values**

Make these replacements throughout `public/og-image.html`:

| Old | New | Context |
|-----|-----|---------|
| `rgba(124,58,237,0.25)` | `rgba(249,115,22,0.25)` | Glow gradient |
| `rgba(124,58,237,0.15)` | `rgba(249,115,22,0.15)` | Badge background |
| `rgba(124,58,237,0.35)` | `rgba(249,115,22,0.35)` | Badge border |
| `#a78bfa` | `#fb923c` | Badge text (was violet-400, now orange-400) |
| `#7C3AED` (badge-dot) | `#F97316` | Badge dot |
| `#7C3AED` (wordmark span) | `#F97316` | Wordmark "by" accent |

- [ ] **Step 2: Re-generate `og-image.png`**

Open `public/og-image.html` in a browser, screenshot at 1200x630, save as `public/og-image.png`. (This is a manual step — use a browser screenshot tool or Playwright.)

- [ ] **Step 3: Commit**

```bash
git add public/og-image.html public/og-image.png
git commit -m "assets: update OG image template and PNG from purple to orange"
```

---

## Task 11: Run full test suite and visual verification

**Files:** None (verification only)

- [ ] **Step 1: Run all tests**

Run: `cd /Users/dylanbedetti/Documents/personal/billby-landing && npm run test:run`
Expected: All tests pass.

- [ ] **Step 2: Run production build**

Run: `cd /Users/dylanbedetti/Documents/personal/billby-landing && npm run build`
Expected: Build succeeds with no errors or warnings.

- [ ] **Step 3: Run lint**

Run: `cd /Users/dylanbedetti/Documents/personal/billby-landing && npm run lint`
Expected: No errors.

- [ ] **Step 4: Visual verification**

Run: `cd /Users/dylanbedetti/Documents/personal/billby-landing && npm run preview`

Verify in browser:
- NavBar wordmark "by" is orange
- Hero "Captured." text is orange
- Hero background glow is orange
- Animated time entry card spinner and cursor are orange
- Problem section stat numbers and top borders are orange
- HowItWorks step badges are orange, icon backgrounds are warm palette
- Features section background is light orange, icons use warm palette
- FAQ accordion toggle is orange
- CTA band background is orange
- Footer wordmark "by" is orange
- Favicon in browser tab is orange

---

## Task 12: Update CLAUDE.md design tokens table

**Files:**
- Modify: `CLAUDE.md`

- [ ] **Step 1: Update design tokens table**

Replace the existing design tokens table with:

```markdown
## Design tokens (Tailwind)

| Token | Value |
|-------|-------|
| Background | `hsl(0 0% 100%)` — `bg-background` |
| Primary accent | `hsl(24.6 95% 53.1%)` — `bg-primary` / `text-primary` (orange) |
| Secondary | `hsl(60 4.8% 95.9%)` — `bg-secondary` / `text-secondary` |
| Text primary | `hsl(20 14.3% 4.1%)` — `text-foreground` |
| Text muted | `hsl(25 5.3% 44.7%)` — `text-muted-foreground` |
| Card surface | `hsl(0 0% 100%)` — `bg-card` |
```

- [ ] **Step 2: Update shadcn/ui notes**

In the shadcn/ui notes section, update the style reference. Change:

```markdown
- `components.json` is the shadcn config at project root
- Add components with: `npx shadcn@latest add <component>`
```

to note the new-york style:

```markdown
- `components.json` is the shadcn config at project root (new-york style, neutral base)
- Add components with: `npx shadcn@latest add <component>`
```

- [ ] **Step 3: Commit**

```bash
git add CLAUDE.md
git commit -m "docs: update design tokens and shadcn style reference for orange theme"
```
