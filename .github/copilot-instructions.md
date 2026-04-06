# Copilot Instructions for Rizqak

## Project Overview
Rizqak (رزقك / المعالي للتوظيف) is a job search platform connecting Egyptian and African job seekers with verified opportunities in Gulf countries and the Arab world. Arabic-first (RTL), with English support.

## Tech Stack
- Nuxt 4 (Vue 3, SPA mode), Tailwind CSS 4, TypeScript
- Reka UI (headless), CVA + tailwind-merge for component variants
- Pinia + TanStack Vue Query for state/data
- VeeValidate + Zod for forms
- lucide-vue-next icons
- @nuxtjs/i18n (Arabic default RTL + English LTR)

## Code Conventions
- Use logical CSS properties: `inset-inline-start`, `margin-inline`, `padding-block`
- Component variants via class-variance-authority; compose with `twMerge`
- Base components live in `app/shared/components/base/` (BaseTypography, BaseButton)
- Semantic design tokens: `--color-*`, `--spacing-*`, `--font-size-ds-*`
- Shell layout classes: `shell-*` for header, nav, buttons
- Zero border-radius is the brand standard (all `--radius-*` tokens are `0`)
- Font: Cairo (Google Fonts), weights 300–800

## Design Context

### Users
Job seekers in Egypt and Africa looking for verified employment opportunities in Gulf countries and the Arab world. Primarily mobile users browsing in moments of hope and urgency. They need to quickly assess job legitimacy, compare opportunities, and apply with confidence.

### Brand Personality
**Professional & Trustworthy** · **Warm & Approachable** · **Calm & Reliable**
Voice is supportive and authoritative — like a knowledgeable mentor. Tone is clear, respectful, never hype-driven. Emotional goals: confidence in applying, hope for career growth, clarity in the process, urgency to act.

### Aesthetic Direction
Clean and structured. Green-and-gold palette conveying growth and value. Zero border-radius (sharp, rectangular corners) for a distinctive modern edge. Cairo typeface. Dark mode fully supported. Generous whitespace, clear hierarchy, subtle shadows, purposeful animations. Not playful, not cold.

### Design Principles
1. **Trust First** — Verified badges, clear company info, transparent details. Users must never question legitimacy.
2. **Clarity Over Decoration** — Immediate information hierarchy. Scannable layouts, clear labels, progressive disclosure.
3. **RTL-Native** — Arabic is the primary design, not a mirrored English version. Logical properties everywhere.
4. **Accessible by Default** — WCAG 2.1 AAA target. Respect `prefers-reduced-motion`. Full keyboard navigation. Color is never the sole information channel.
5. **Performance Is UX** — Aggressive lazy loading, lean bundles, skeleton states for every async boundary.

### Key Design Tokens
- Primary green: `#047857` (base), `#1B6B4A` (theme)
- Gold accent: `#cf9e1c`
- Border radius: all `0`
- Container max: `1200px` (shell: `80rem`)
- Spacing: compact=8px, element=12px, content=16px, section=32px
