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
  lib/           # Utilities
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

## Key decisions

- Single-page app, no router — anchor-based navigation only
- "Book a Call" CTA links to `#book` as placeholder throughout
- No pricing section — pricing discussed on call
- Screen capture must NOT be described as surveillance/recording/spying — use "contextual awareness" / "looks when it needs more context"
- Privacy copy: screen captures are private to the individual lawyer, wiped after timesheet submission
- Data sovereignty: all AU firm data stored in Australia — surface this in FAQ and Features
