# AI Governance Rules - Rizqak2

## Purpose

This document provides specific rules and guidelines for AI models working on the Rizqak2 project. These rules ensure consistency, quality, and maintainability when multiple AI models contribute to the codebase.

---

## MANDATE: Prerequisites

**Before writing ANY code, every AI model MUST:**

1. Read `docs/DEVELOPMENT-RULES.md` - All development rules
2. Read `docs/DESIGN-SYSTEM.md` - Design tokens and components
3. Read `app/assets/css/main.css` - Complete theme configuration
4. Read `app/shared/components/base/` - Existing base components
5. Understand the file organization from the architecture guide

---

## MANDATE: Component Discovery

**Every AI model MUST check existing base components before creating any UI element.**

- If a base component exists for the needed UI element (Button, Input, Card, etc.), it MUST be used
- If it does NOT exist, the AI model MUST first create it as a proper base component
- Base components are located in `app/shared/components/base/`

---

## MANDATE: Design Token Usage

**Every AI model MUST use exact design tokens from the theme:**

- Use `--color-primary-700` NOT `#1B6B4A`
- Use `--spacing-4` NOT `1rem`
- Use `--font-size-sm` NOT `0.875rem`
- Use `--radius-md` NOT `0`

**NEVER approximate or use hardcoded values.**

---

## MANDATE: File Organization

**Every AI model MUST follow the exact file organization:**

```
app/
├── core/           # API client, auth, config
├── shared/
│   ├── components/ # Base components
│   ├── composables/# Shared composables
│   ├── types/      # Shared types
│   └── utils/      # Utility functions
├── features/       # Feature modules
│   ├── jobs/
│   ├── auth/
│   ├── companies/
│   └── ...
├── pages/          # Nuxt file-based routing
├── layouts/        # Page layouts
├── stores/         # Pinia stores
└── middleware/     # Route middleware
```

---

## MANDATE: TypeScript Strict Mode

**Every AI model MUST write proper TypeScript:**

- NO `any` types
- All props MUST be typed with interfaces
- All functions MUST have typed parameters and return types
- All API responses MUST be validated with Zod

---

## MANDATE: Completion Verification

**Before presenting work as done, every AI model MUST verify:**

1. **Design Compliance**: All visual values come from design tokens
2. **TypeScript**: No type errors, no `any` types
3. **SEO**: Page has proper meta tags and structured data
4. **Accessibility**: Keyboard navigation works, ARIA is correct
5. **Responsive**: Works on mobile, tablet, desktop
6. **RTL**: All directional properties are correct for Arabic

---

## MANDATE: Work Preservation

**Every AI model MUST preserve and respect work done by previous AI models or developers:**

- Do NOT rewrite existing components unless explicitly instructed
- Do NOT remove existing functionality without good reason
- If existing code doesn't follow rules, fix it in a separate commit with explanation

---

## MANDATE: New Decision Documentation

**When an AI model encounters a situation not covered by existing rules:**

1. Follow the spirit of the rules: consistency, centralization, reusability, quality
2. Document the new decision in the codebase with comments
3. Propose documentation update for future reference

---

## Reference Files

**In order of priority, read these files before starting any work:**

1. `docs/DEVELOPMENT-RULES.md` - Mandatory rules
2. `docs/DESIGN-SYSTEM.md` - Design tokens and components
3. `app/assets/css/main.css` - Theme configuration
4. `app/shared/components/base/` - Base component library
5. `docs/ARCHITECTURE.md` - Project architecture
6. `docs/SEO-GUIDE.md` - SEO requirements

---

## Code Quality Standards

**AI models MUST ensure:**

- No duplicated code (extract to composables)
- No console.log statements in production
- Functions are small and focused
- Components follow single responsibility
- Proper error handling with Arabic messages

---

## Git Workflow

**When making changes:**

1. Create a feature branch for significant changes
2. Make small, focused commits
3. Write clear commit messages in Arabic or English
4. Test thoroughly before creating PR

---

## Communication

**When presenting work to humans:**

1. Summarize what was done
2. Explain any new components or patterns created
3. Note any breaking changes
4. Provide test instructions

---

## Conclusion

These rules exist to ensure the Rizqak2 project maintains high quality and consistency. AI models are expected to follow these rules without deviation. If a rule seems wrong, discuss with the team before violating it.
