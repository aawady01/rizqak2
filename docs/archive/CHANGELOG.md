# Changelog — Rizqak2

## [2026-03-08]

### Design System & Architecture Foundation

#### Added
- **Design System Documentation** (`docs/DESIGN_SYSTEM.md`):
  - Complete color palette documentation (Primary Green, Accent Gold, Neutral grays)
  - Typography scale (ds-display through ds-xs)
  - Spacing tokens (section: 32px, content: 16px, element: 12px, compact: 8px)
  - Border radius (0 throughout - sharp corners)
  - Shadow and z-index scales
  - RTL implementation guidelines

- **AI Instructions** (`docs/AI_INSTRUCTIONS.md`):
  - Mandatory rules for future AI development
  - Design system compliance requirements
  - Technology version specifications
  - Component patterns and usage guidelines

- **SEO Infrastructure** (`app/core/api/seo.ts`):
  - `useJobPostingSchema()` for JobPosting structured data
  - `useWebsiteSchema()` for WebSite schema with sitelinks searchbox
  - `useEmployerSchema()` for Employer schema
  - `useJobListSchema()` for ItemList schema
  - `public/sitemap.xml` with proper structure
  - `public/robots.txt` with crawl rules

- **Security**:
  - Security headers plugin (`app/server/plugins/security-headers.ts`)
  - CSP meta tag in nuxt.config.ts
  - Headers: X-Content-Type-Options, X-Frame-Options, X-XSS-Protection, Referrer-Policy, Permissions-Policy, Strict-Transport-Security

- **Dark Mode**:
  - Theme composable (`app/shared/composables/useTheme.ts`)
  - Comprehensive dark mode CSS variables in `main.css`
  - Connected useTheme to LayoutHeader for proper dark mode toggle

#### Changed
- Enhanced SEO types and composables with proper TypeScript interfaces
- Updated project status in `docs/CURRENT-STATUS.md`

## [2026-03-07]

- **UI & Layout Refinement**:
  - **SVG Flag Integration**: Replaced emoji flags with high-quality SVG assets across the platform for a professional look.
  - **Featured Companies Nav Arrows**: Enhanced navigation arrows to turn primary green with white icons on hover.
  - **Sharp Bookmark Icon**: Implemented the exact bookmark shape (w-6, thin stroke) requested by the user for the save action.
  - **Text Contrast & Typography**: Increased job title font size to 22px and improved visibility of secondary text tokens.
  - **Typography Refinement**: Increased job title font size to `22px` via the `ds-title` token for optimal readability and prominence.
  - **Job Card Internal Spacing**: Reduced vertical gap between metadata (Country/Company/Salary) and benefits tags in `JobCard.vue` from `12px` (`mt-element`) to `8px` (`mt-compact`).
  - **Color Matching**: Aligned job title hover color with App Bar hex code (`#1B6B4A`) for perfect visual consistency.
  - **Job Title Interaction**: Focused click and cursor pointer on the job title instead of the entire card in `JobCard.vue`.
  - **Job Card Hover Effects**: Added a thin vertical green line on the right and title color change to primary green when hovering over the card.
  - **Job Metadata Spacing**: Reduced horizontal gap between country, company, and salary elements in `JobCard.vue` from `12px` to `8px`.
  - **Sorting Dropdown**: Replaced the native select in `HomeJobList.vue` with a custom component. Added fixed 140px width to prevent layout shifts and implemented primary green background with white text on hover and for active selection.
  - **Job List Layout**: Reduced vertical spacing between job cards from `12px` (element) to `8px` (compact) in `HomeJobList.vue`.
- **Bug Fixes**:
  - **Tree Filter**: Fixed an issue in `TreeBranch.vue` where expansion buttons (Plus/Minus) triggered selection instead of toggling.
  - **Icon Cleanup**: Removed unused `ChevronDown` import in `HomeJobList.vue` to resolve build warnings.
- **Dependencies & Standards**:
  - Verified Nuxt 4.3.1, Vue 3.5.29, and Tailwind CSS 4.2.1.
  - Updated Base components to use Tailwind v4 `size-*` utility classes.

## [2026-02-27]

### Unified Filter Hierarchy & Premium Header Design

#### Changed

- **Filter Components**:
  - Standardized filter hierarchy lines to `1.1px` thickness.
  - Unified connecting line color to solid `#1B6B4A` (primary-700).
  - Fixed visual gaps between vertical stems and horizontal branches by adding 4-8px overlaps.
  - Removed sub-pixel blur by using fixed pixel offsets (`top-[14px]`) instead of percentage positioning.
- **LayoutHeader.vue**:
  - Added `shadow-md` for better visual elevation.
  - Implemented a vertical `2px` white indicator strip on the right side of active/hovered tabs.
  - Refined active state with `font-bold` and subtle background highlights (`bg-white/10`).
- **HomeHero.vue**:
  - Adjusted main title font size to `34px` for optimal balance.
  - Added a **Clear (X) Button** to the search bar with circular hover effect.
  - Enhanced typing caret visibility with brand color and medium weight.
  - Refined search focus state with a vertical white right-side indicator.
- **Data**:
  - Updated `mockData.ts` to map the Home link to `/` for correct Nuxt routing.

```

```
