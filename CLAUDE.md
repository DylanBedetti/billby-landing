# Billby Landing Page — Agent Guide

## Commands

```bash
npm run dev        # Start dev server (Vite)
npm run build      # Production build
npm run preview    # Preview production build
npm run test       # Run Vitest (watch mode)
npm run test:run   # Run Vitest once (CI mode)
```

## Project context

Landing page for **Billby** — AI-powered timekeeping for Australian law firms. Live at [billby.com.au](https://billby.com.au).

Billby installs on a lawyer's laptop and tracks work via OS-level signals (active app, window titles) and contextual screen capture. An agentic AI produces detailed time narratives and a complete timesheet at end of day.

**Target audience:** Managing Partners, Technical Directors at AU law firms (buyers); individual lawyers (end users).

Pre-launch — no customers yet, no pricing published. Primary goal: capture "Book a Call" leads.

## Conventions

- All components in TypeScript (.tsx)
- Styling via Tailwind CSS utility classes only — no CSS files unless absolutely necessary
- Animations via Framer Motion
- Component primitives via shadcn/ui where applicable
- Tests via Vitest + React Testing Library

## Folder structure

```
src/
  components/
    ui/          # Shared primitives (Button, SectionHeader, FeatureCard, Accordion)
    sections/    # One file per page section
    shared/      # Cross-cutting shared components
  lib/           # Utilities (cn helper etc.)
  test/          # Test setup and smoke tests
  App.tsx        # Root — assembles all sections
  main.tsx       # Entry point
```

## Design tokens (Tailwind)

| Token | Value |
|-------|-------|
| Background | `hsl(0 0% 100%)` — `bg-background` |
| Primary accent | `hsl(24.6 95% 53.1%)` — `bg-primary` / `text-primary` (orange) |
| Secondary | `hsl(60 4.8% 95.9%)` — `bg-secondary` / `text-secondary` |
| Text primary | `hsl(20 14.3% 4.1%)` — `text-foreground` |
| Text muted | `hsl(25 5.3% 44.7%)` — `text-muted-foreground` |
| Card surface | `hsl(0 0% 100%)` — `bg-card` |

## Tech stack versions (installed)

- Vite 8 + React 19 + TypeScript 5.9
- `src/test/setup.ts` globally mocks `IntersectionObserver` (class, no-op) so jsdom tests work with Framer Motion `whileInView` and `StatCounter`
- Tailwind CSS v4 (CSS-based config via `@theme` directive in `src/index.css` — no `tailwind.config.js`)
- shadcn/ui with new-york style, orange/neutral base (Radix-based, CSS variables in HSL)
- Framer Motion 12
- Vitest 4 + React Testing Library 16

## shadcn/ui notes

- `components.json` is the shadcn config at project root (new-york style, neutral base)
- Add components with: `npx shadcn@latest add <component>`
- Installed shadcn components: `accordion.tsx`, `card.tsx`, `shadcn-button.tsx`
- Import alias `@/` maps to `src/` (configured in both `tsconfig.app.json` and `tsconfig.json`)
- shadcn added `tw-animate-css` and `shadcn/tailwind.css` imports to `src/index.css` — do not remove
- Font is Inter (loaded via Google Fonts in `index.html`), not Geist — the `--font-sans` theme var in `src/index.css` overrides shadcn's default
- shadcn installs `button.tsx` (lowercase); renamed to `shadcn-button.tsx` to avoid macOS case-insensitive collision with `Button.tsx`

## File casing on macOS

macOS filesystem is case-insensitive: `Button.tsx` and `button.tsx` are the same file to the OS and to TypeScript. Never create two `ui/` components that differ only in casing. shadcn components (lowercase) that conflict with project components (PascalCase) must be renamed (e.g. `shadcn-button.tsx`).

## Vite config

- `vite.config.ts` uses `defineConfig` from `vitest/config` (not `vite`) so that the `test` block type-checks correctly

## Sections built

- `NavBar.tsx` — sticky nav with wordmark, desktop anchor links, mobile hamburger drawer (Framer Motion)
- `HeroSection.tsx` — full-viewport hero, two-column (copy left, card right), Framer Motion entrance animations
- `AnimatedTimeEntryCard.tsx` (ui primitive) — loops through signals → processing → typewriter narrative; has Vitest + RTL tests
- `ProblemSection.tsx` — three Clio Legal Trends stats (2.9hrs / 31% / 50%) in cards, Framer Motion fade-up entrance
- `HowItWorksSection.tsx` — three-step process diagram (monitor / network / checkmark SVG icons), desktop horizontal layout with dashed connector, staggered Framer Motion entrance per step
- `StatCounter.tsx` (ui primitive) — count-up animation via IntersectionObserver + rAF ease-out; has Vitest + RTL tests

## Key decisions

- Single-page app, no router — anchor-based navigation only
- "Book a Call" CTA links to `#book` as placeholder throughout
- No pricing section — pricing discussed on call
- Screen capture must NOT be described as surveillance/recording/spying — use "contextual awareness" / "looks when it needs more context"
- Privacy copy: screen captures are private to the individual lawyer, wiped after timesheet submission
- Data sovereignty: all AU firm data stored in Australia — surface this in FAQ and Features

## Page assembly conventions

- `App.tsx` renders `<NavBar />` first, then all sections wrapped in `<div className="pt-16">` to clear the fixed nav
- Section order: NavBar → Hero → Problem → HowItWorks → Features → FAQ → CTABand → Footer
- All sections (except Hero and Footer) use `py-20 md:py-28` vertical padding
- HeroSection uses `pt-24 md:pt-32 pb-20` to clear the fixed NavBar
- Framer Motion `whileInView` animations use `transition={{ duration: 0.5, ease: 'easeOut' }}` for consistency
- H1 in Hero: `text-5xl md:text-6xl lg:text-7xl`; H2 section headings: `text-3xl sm:text-4xl` (via SectionHeader)
- Smooth scroll is set on `html` element in `index.css` via `scroll-behavior: smooth`
- `index.html` title: "Billby — Billing Intelligence for Law Firms"; meta description set
