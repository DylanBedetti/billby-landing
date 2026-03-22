# billby-landing

Landing page for **Billby** — AI-powered timekeeping automation for Australian law firms.

## What is Billby?

Billby installs on a lawyer's laptop and tracks their work using OS-level signals (active application, window titles) and contextual screen capture. An agentic AI stitches these signals together to produce detailed, accurate time narratives and a complete timesheet at end of day — ready to review and submit in seconds.

**Tagline:** "Every minute. Captured. Automatically."

**Target URL:** billby.com.au (hosting TBD)

---

## Product Context

### Target Audience
- **Primary buyers:** Managing Partners, Technical Directors at Australian law firms
- **End users:** Individual lawyers (the people whose pain we solve)

### Key Differentiators
- Works at the OS level — no integrations to configure upfront
- Contextual screen capture (not constant; only when additional context is needed)
- Screen capture is private to the individual lawyer — never shared
- After timesheet submission, all recordings are wiped
- Cloud-hosted with AU data sovereignty (data stored in Australia only)
- Integrates with billing software: Clio, LEAP, Practice Evolve, etc.

### Problem Stats (Clio Legal Trends Report — citable)
- Lawyers bill only **2.9 hours/day** on average despite working much longer
- Only **31%** of work time converts to collected revenue
- **25–50%** of billable time is lost when entries are reconstructed from memory

### Competitive Context
- New wave of AI-enabled timekeeping tools (PointOne is closest competitor)
- Differentiator: screen capture + minimal integrations = fast to deploy, highly accurate
- Do NOT lead with "screen capture" prominently — frame as contextual intelligence, not surveillance

---

## Design System

### Brand
- **Wordmark:** `billby` lowercase, geometric sans-serif, violet accent
- **No logo yet** — typographic treatment only

### Color Palette
- Background: `#FAFAFA`
- Primary accent: `#7C3AED` (violet)
- Secondary accent: `#10B981` (emerald)
- Text primary: `#111827`
- Text muted: `#6B7280`
- Surface/cards: `#FFFFFF` with subtle box-shadow

### Personality
Intelligence-first, grounded in precision. Sophisticated but not cold. Calm and reassuring around privacy.

---

## Page Structure

1. **Nav** — Logo + section links + "Book a Call" CTA button
2. **Hero** — Headline · subtext · CTA · animated AI time-entry card (Framer Motion)
3. **Problem** — Stats-driven "The cost of reconstructive billing"
4. **How It Works** — 3 steps: silent tracking → AI stitching → review & submit
5. **Features** — OS tracking, contextual screen capture (privacy-first framing), AI narratives, end-of-day compilation, billing integrations
6. **IT & Security FAQ** — Cloud, AU data sovereignty, MDM, compliance, lawyer-controlled tracking, wiped after submission
7. **CTA Band** — "Book a Call" with supporting copy
8. **Footer** — Product links, legal, "Built in Australia"

### CTA
"Book a Call" — links to a scheduling tool (URL TBD). No pricing page; pricing discussed on call.

---

## Tech Stack

| Tool | Purpose |
|------|---------|
| Vite | Build tool |
| React + TypeScript | Framework |
| Tailwind CSS | Styling |
| Framer Motion | Animations |
| shadcn/ui | Component primitives |

### Hero Visual
Animated React component simulating an AI time-entry card being written in real time (no video/screenshots yet — placeholder for future video demo).

---

## Status

Pre-launch. No customers yet, no logo, no pricing published. Primary goal of landing page: capture "Book a Call" leads.
