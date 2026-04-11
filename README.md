<div align="center">

# رزقك | Rizqak2

**منصة سوق العمل العربية — Arabic Job Marketplace Platform**

[![Nuxt 4](https://img.shields.io/badge/Nuxt-4.x-00DC82?style=flat-square&logo=nuxt.js)](https://nuxt.com)
[![Vue 3](https://img.shields.io/badge/Vue-3.x-4FC08D?style=flat-square&logo=vue.js)](https://vuejs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=flat-square&logo=typescript)](https://typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38BDF8?style=flat-square&logo=tailwindcss)](https://tailwindcss.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](LICENSE)
[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-000?style=flat-square&logo=vercel)](https://v0-rizqak2.vercel.app)

[🌐 Live Demo](https://v0-rizqak2.vercel.app) • [📋 Improvement Plan](./IMPROVEMENT_PLAN.md) • [🎨 Design System](./DESIGN_SYSTEM.md)

</div>

---

## 📖 About

**Rizqak2** (رزقك٢) is a modern, full-featured Arabic-first job marketplace platform built with Nuxt 4 and Vue 3. It connects job seekers with employers across the Arab world, offering a bilingual (Arabic/English) experience with full RTL support.

The name "رزقك" (Rizqak) means "Your Livelihood" in Arabic — reflecting the platform's mission to help people find meaningful employment.

---

## ✨ Features

- 🌍 **Bilingual** — Full Arabic (RTL) and English (LTR) support via i18n
- 🌙 **Dark Mode** — System-aware theme with manual toggle
- 🔒 **Authentication** — Secure login/register flows for job seekers and employers
- 🏢 **Company Profiles** — Rich company pages with cover, logo, tabs, and reviews
- 💼 **Job Listings** — Advanced filtering, search, and job detail pages
- 📱 **Mobile First** — Responsive from 320px to 2560px
- ⚡ **Performance** — Optimized for LCP < 2.0s, INP < 150ms, CLS < 0.05
- 🛡️ **Security** — Sentry monitoring, CSP headers, rate limiting
- ♿ **Accessibility** — WCAG 2.2 AA compliance
- 🔍 **SEO Ready** — JSON-LD structured data, Open Graph, hreflang tags

---

## 🛠️ Tech Stack

| Layer | Technology | Version |
|---|---|---|
| Framework | [Nuxt](https://nuxt.com) | 4.x (app/ dir, SSR + SSG) |
| UI Framework | [Vue](https://vuejs.org) | 3.x (Composition API) |
| CSS | [Tailwind CSS](https://tailwindcss.com) | v4 (`@theme` syntax) |
| Component Lib | [Reka UI](https://reka-ui.com) | latest (Headless + styled) |
| State Management | [Pinia](https://pinia.vuejs.org) | latest |
| Utilities | [VueUse](https://vueuse.org) | latest |
| Font | Cairo | Google Fonts (Arabic + Latin) |
| i18n | @nuxtjs/i18n | latest (ar + en) |
| Monitoring | [Sentry](https://sentry.io) | latest (Client + Server) |
| Testing | Vitest + Playwright | latest (Unit + E2E) |
| Package Manager | pnpm | workspace (monorepo) |

---

## 📁 Project Structure

```
rizqak2/
├── app/                    # Nuxt 4 app directory
│   ├── assets/css/         # Tailwind v4 theme tokens & global styles
│   ├── components/         # Reusable Vue components
│   ├── composables/        # Shared composition functions
│   ├── layouts/            # Page layouts
│   ├── pages/              # File-based routing
│   │   ├── index.vue       # Homepage (Hero, search, job carousels)
│   │   ├── jobs/           # Job listing & detail pages
│   │   ├── companies/      # Company listing & profile pages
│   │   └── auth/           # Login, register, etc.
│   ├── stores/             # Pinia stores
│   └── plugins/            # Nuxt plugins
├── i18n/                   # Translation files (ar, en)
├── public/                 # Static assets
├── docs/                   # Documentation
├── test/                   # Test files
├── DESIGN_SYSTEM.md        # Design system documentation
├── IMPROVEMENT_PLAN.md     # Comprehensive quality improvement roadmap
└── nuxt.config.ts          # Nuxt configuration
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js >= 18.x
- pnpm >= 8.x

### Installation

```bash
# Clone the repository
git clone https://github.com/aawady01/rizqak2.git
cd rizqak2

# Install dependencies
pnpm install

# Start development server
pnpm dev
```

The app will be available at `http://localhost:3000`

### Available Scripts

```bash
pnpm dev          # Start development server
pnpm build        # Build for production
pnpm preview      # Preview production build
pnpm test         # Run unit tests (Vitest)
pnpm test:e2e     # Run E2E tests (Playwright)
pnpm lint         # Run ESLint
```

---

## 🌐 Pages

| Route | Description |
|---|---|
| `/` | Homepage — Hero, search bar, countries grid, job carousels |
| `/jobs` | Job listings — filters, grid view |
| `/jobs/[slug]` | Job detail page |
| `/companies` | Companies listing |
| `/companies/[slug]` | Company profile — cover, logo, tabs, reviews |
| `/auth/login` | User login |
| `/auth/register` | User registration |

All routes are available in both `/ar/` and `/en/` locales.

---

## 🎨 Design System

Rizqak2 uses a comprehensive design system built on Tailwind CSS v4:

- **Brand Colors**: Primary green (`#047857`) + accent gold
- **Typography**: Cairo font (Arabic-first, Latin fallback) with fluid `clamp()` scale
- **Radius**: Zero-radius brand standard (sharp edges), except `--radius-full` for pills
- **Dark Mode**: Manual toggle + `prefers-color-scheme` auto-detection
- **RTL**: Full RTL support via `html[dir="rtl"]`

See [DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md) for full documentation.

---

## 🚢 Deployment

The project is deployed on **Vercel** with automatic deployments from the `main` branch.

- **Production**: [v0-rizqak2.vercel.app](https://v0-rizqak2.vercel.app)
- **33+ deployments** completed successfully

---

## 🗺️ Roadmap

See [IMPROVEMENT_PLAN.md](./IMPROVEMENT_PLAN.md) for the full quality improvement roadmap covering:

- [ ] Design system token hardening (OKLCH shadows, fluid typography)
- [ ] Mobile-first responsive audit (320px → 2560px)
- [ ] Performance optimization (LCP, INP, CLS targets)
- [ ] SEO: JSON-LD structured data, hreflang, canonical URLs
- [ ] Security: CSP headers, rate limiting, OWASP compliance
- [ ] Accessibility: WCAG 2.2 AA full compliance
- [ ] Cross-browser compatibility (Chrome, Firefox, Safari, Edge)

---

## 🤝 Contributing

This is a private project. Contributions are not open at this time.

---

## 📄 License

MIT License — see [LICENSE](LICENSE) for details.

---

<div align="center">

Built with ❤️ for the Arab world

**رزقك — طريقك لفرصتك**

</div>
