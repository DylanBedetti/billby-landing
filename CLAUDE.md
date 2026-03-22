# Billby Landing Page — Agent Guide

## Commands

```bash
npm run dev        # Start dev server (Vite)
npm run build      # Production build
npm run preview    # Preview production build
npm run test       # Run Vitest (watch mode)
npm run test:run   # Run Vitest once (CI mode)
npm run lint       # ESLint
```

## Project context

See README.md for full product context, design system, and page structure.

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
| Background | `#FAFAFA` — `bg-background` |
| Primary accent | `#7C3AED` — `bg-primary` / `text-primary` |
| Secondary accent | `#10B981` — `bg-secondary` / `text-secondary` |
| Text primary | `#111827` — `text-foreground` |
| Text muted | `#6B7280` — `text-muted-foreground` |
| Card surface | `#FFFFFF` — `bg-card` |

## Tech stack versions (installed)

- Vite 8 + React 19 + TypeScript 5.9
- Tailwind CSS v4 (CSS-based config via `@theme` directive in `src/index.css` — no `tailwind.config.js`)
- shadcn/ui with nova preset (Radix-based, CSS variables enabled)
- Framer Motion 12
- Vitest 4 + React Testing Library 16

## shadcn/ui notes

- `components.json` is the shadcn config at project root
- Add components with: `npx shadcn@latest add <component>`
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

## Key decisions

- Single-page app, no router — anchor-based navigation only
- "Book a Call" CTA links to `#book` as placeholder throughout
- No pricing section — pricing discussed on call
- Screen capture must NOT be described as surveillance/recording/spying — use "contextual awareness" / "looks when it needs more context"
- Privacy copy: screen captures are private to the individual lawyer, wiped after timesheet submission
- Data sovereignty: all AU firm data stored in Australia — surface this in FAQ and Features
