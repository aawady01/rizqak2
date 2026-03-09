# Rizqak Web - Comprehensive Design System

> **Technology Stack**: Nuxt `4.3.1` · Vue `3.5.29` · Tailwind CSS `4.2.1` · Vite `7.3.1` · TypeScript `5.9.3`
> All base values are engineered for full RTL (Arabic) compliance. Configured via Tailwind 4 `@theme` in `main.css`.

---

## 1. Typography System

**Font Environment:**

- **Primary Typeface:** `Cairo`, `sans-serif` (Configured as `font-display`)
- **Root Settings:** RTL direction context globally (`dir="rtl"` in HTML element)

### 1.2 BaseTypography Component (المكون الذري للخطوط)

The `BaseTypography.vue` component is the **sole** engine for rendering text in the application. It maps the semantic variants defined in the table above to CSS tokens.

- **Polymorphism**: Supports `tag` override (`h1`, `p`, `span`, etc.).
- **Tokens**: Uses `variant` prop (`display-l`, `h3`, `body-s`, etc.) to apply correct `font-size`, `line-height`, and responsive scaling.
- **Weights**: Enforces system weights via `weight` prop (`medium`, `semibold`, `bold`).
- **Standardization**: Prevents ad-hoc font sizes and ensures 100% tokens compliance.

---

| Semantic Role           | Desktop (≥1024px)    | Tablet (768px - 1023px) | Mobile (≤767px)      | Weight | Line Height     | Case / Transform  | Usage Scope                                                       |
| :---------------------- | :------------------- | :---------------------- | :------------------- | :----- | :-------------- | :---------------- | :---------------------------------------------------------------- |
| **Display XX-Large**    | `64px` / `4rem`      | `56px` / `3.5rem`       | `48px` / `3rem`      | `900`  | `1.05` (tight)  | None              | Extra large hero headlines for massive visual impact.             |
| **Display Extra Large** | `48px` / `3rem`      | `40px` / `2.5rem`       | `36px` / `2.25rem`   | `900`  | `1.1` (tight)   | None              | Reserved for heavy marketing heroes, large data overlays.         |
| **Display Large**       | `36px` / `2.25rem`   | `30px` / `1.875rem`     | `24px` / `1.5rem`    | `800`  | `1.2` (tight)   | None              | `.design-heading-hero` / Primary structural page entries.         |
| **Heading One (H1)**    | `30px` / `1.875rem`  | `24px` / `1.5rem`       | `20px` / `1.25rem`   | `700`  | `1.3`           | None              | Strict page title (one per page for SEO).                         |
| **Heading Two (H2)**    | `24px` / `1.5rem`    | `20px` / `1.25rem`      | `18px` / `1.125rem`  | `700`  | `1.3`           | None              | Major section titles, modular content segment headers.            |
| **Heading Three (H3)**  | `20px` / `1.25rem`   | `18px` / `1.125rem`     | `16px` / `1rem`      | `700`  | `1.4`           | None              | `.design-title` / Card titles, subsections, filter group headers. |
| **Heading Four (H4)**   | `18px` / `1.125rem`  | `16px` / `1rem`         | `16px` / `1rem`      | `700`  | `1.4`           | None              | Sub-components, minor grouping titles.                            |
| **Heading Five (H5)**   | `16px` / `1rem`      | `16px` / `1rem`         | `14px` / `0.875rem`  | `600`  | `1.4`           | None              | Deep nested sections.                                             |
| **Heading Six (H6)**    | `14px` / `0.875rem`  | `14px` / `0.875rem`     | `12px` / `0.75rem`   | `600`  | `1.5`           | Uppercase         | Eyebrows, overlines, meta labels.                                 |
| **Subtitle Large**      | `18px` / `1.125rem`  | `16px` / `1rem`         | `16px` / `1rem`      | `600`  | `1.5`           | None              | Lead paragraphs, emphasis text strings.                           |
| **Subtitle Regular**    | `16px` / `1rem`      | `14px` / `0.875rem`     | `14px` / `0.875rem`  | `600`  | `1.5`           | None              | `.design-subtitle` / Labels, important secondary titles.          |
| **Body Text Large**     | `18px` / `1.125rem`  | `16px` / `1rem`         | `16px` / `1rem`      | `400`  | `1.6` (relaxed) | None              | Long-form reading or article text.                                |
| **Body Text Regular**   | `14px` / `0.875rem`  | `14px` / `0.875rem`     | `14px` / `0.875rem`  | `400`  | `1.6` (relaxed) | None              | Default body text format. Used broadly.                           |
| **Body Text Small**     | `13px` / `0.8125rem` | `13px` / `0.8125rem`    | `13px` / `0.8125rem` | `400`  | `1.6` (relaxed) | None              | Secondary information, compact descriptions.                      |
| **Caption Large**       | `12px` / `0.75rem`   | `12px` / `0.75rem`      | `12px` / `0.75rem`   | `500`  | `1.4`           | None              | Data tables, meta strings, tags.                                  |
| **Caption Regular**     | `11px` / `0.6875rem` | `11px` / `0.6875rem`    | `11px` / `0.6875rem` | `400`  | `1.4`           | None              | Timestamps (`JobCard` time), secondary meta blocks.               |
| **Caption Small**       | `10px` / `0.625rem`  | `10px` / `0.625rem`     | `10px` / `0.625rem`  | `400`  | `1.4`           | None              | Micro-interactions, trailing details.                             |
| **Button Text Large**   | `16px` / `1rem`      | `16px` / `1rem`         | `16px` / `1rem`      | `700`  | `1`             | None              | Primary Hero/CTA Buttons.                                         |
| **Button Text Regular** | `14px` / `0.875rem`  | `14px` / `0.875rem`     | `14px` / `0.875rem`  | `600`  | `1`             | None              | Standard `.btn`.                                                  |
| **Button Text Small**   | `12px` / `0.75rem`   | `12px` / `0.75rem`      | `12px` / `0.75rem`   | `600`  | `1`             | None              | Micro-buttons, pagination elements.                               |
| **Label Large**         | `14px` / `0.875rem`  | `14px` / `0.875rem`     | `14px` / `0.875rem`  | `600`  | `1.4`           | None              | Form labels (`.input-label`).                                     |
| **Label Regular**       | `13px` / `0.8125rem` | `13px` / `0.8125rem`    | `13px` / `0.8125rem` | `500`  | `1.4`           | None              | Input helper text.                                                |
| **Label Small**         | `11px` / `0.6875rem` | `11px` / `0.6875rem`    | `11px` / `0.6875rem` | `500`  | `1.4`           | None              | Validation/Error messages (`.input-error`).                       |
| **Link Text**           | Inherit              | Inherit                 | Inherit              | `500`  | Inherit         | Underline (Hover) | Standard inline context links.                                    |
| **Code Text**           | `13px` / `0.8125rem` | `13px` / `0.8125rem`    | `13px` / `0.8125rem` | `400`  | `1.5`           | None              | Code snippets/monospaced blocks.                                  |

---

## 2. Color System

### 2.1 Core Brand Palette & Scales

**Primary (Green Palette)**

> Extrapolated around the core brand color `#1B6B4A` (`600`).

- **`50`**: `#F0FAF4` (Usage: Background primary/faint tag backgrounds, icon containers)
- **`100`**: `#C8E6D5` (Usage: Faint borders for primary surfaces)
- **`200`**: `#A5D6B8`
- **`300`**: `#70C19A`
- **`400`**: `#45B080`
- **`500`**: `#239464`
- **`600`**: `#1B6B4A` (Usage: Base Primary color, active links, primary buttons)
- **`700`**: `#145239` (Usage: Primary-Dark, button hover states)
- **`800`**: `#124431`
- **`900`**: `#103829` (Usage: Backgrounds for high-contrast inverted cards)
- **`950`**: `#092017`

**Accent / Secondary (Gold Palette)**

> Extrapolated from the core Accent brand color `#E8B931` (`400`/`500` range).

- **`50`**: `#FDFCF5`
- **`100`**: `#FBF7EB`
- **`200`**: `#F5EAC8`
- **`300`**: `#EEDC9A`
- **`400`**: `#E8B931` (Usage: Base Gold, rating stars `gold-star`)
- **`500`**: `#CF9E1C`
- **`600`**: `#A77A14`
- **`700`**: `#805A0E`
- **`800`**: `#60430B`
- **`900`**: `#4A3409`
- **`950`**: `#2C1E04`

**Neutral / Grays**

> The foundational gray palette mapping cleanly to Tailwind’s default gray.

- **`50`**: `#F9FAFB` (Usage: `bg-gray-50`, faint hovers)
- **`100`**: `#F3F4F6` (Usage: Outline cards hover backing)
- **`200`**: `#E5E7EB` (Usage: Default light borders, `.border-gray-200`)
- **`300`**: `#D1D5DB` (Usage: Checkbox boundaries, empty states)
- **`400`**: `#9CA3AF` (Usage: `text-dark-muted`, placeholder text, chevron dropdowns)
- **`500`**: `#6B7280` (Usage: `text-[muted]`, sub-meta dates)
- **`600`**: `#4B5563`
- **`700`**: `#374151` (Usage: Dark mode component borders)
- **`800`**: `#1F2937` (Usage: `text-[main]`, `bg-gray-800` dark mode backgrounds)
- **`900`**: `#111827` (Usage: Hard contrast titles)
- **`950`**: `#030712`

### 2.2 Semantic States

- **Success Light / Default / Dark:** `#E8F5E9` (bg/pill) / `#22C55E` / `#166534` (text/border)
- **Warning Light / Default / Dark:** `#FEF3C7` / `#F59E0B` / `#92400E`
- **Error / Danger Light / Default / Dark:** `#FEE2E2` / `#DC2626` / `#991B1B` (`#C53030` for hover buttons)
- **Info Light / Default / Dark:** `#E0F2FE` / `#3B82F6` / `#1E40AF`

### 2.3 Semantic Usage Colors

| Role                     | Light Theme Value (CSS / Hex)  | Dark Theme Value (CSS / Hex)  | Scope / Context                                              |
| :----------------------- | :----------------------------- | :---------------------------- | :----------------------------------------------------------- |
| **Background Primary**   | `#F0F0F0` (`background-light`) | `#121212` (`background-dark`) | Document body, layout foundations.                           |
| **Background Secondary** | `#F9FAFB` (`gray-50`)          | `#111827` (`gray-900`)        | Input fields inside dark cards, off-white panels.            |
| **Background Tertiary**  | `#E5E7EB` (`gray-200`)         | `#000000`                     | Skeletons, empty containers.                                 |
| **Surface Default**      | `#FFFFFF` (`surface-light`)    | `#1E1E1E` (`surface-dark`)    | Standard Cards, panels, sidebars.                            |
| **Surface Elevated**     | `#FFFFFF` (w/ `shadow-md`)     | `#2C2C2C` (`accent-dark`)     | Modals, Dropdowns, Float menus.                              |
| **Surface Overlay**      | `rgba(0,0,0,0.5)`              | `rgba(0,0,0,0.7)`             | Modal backdrop.                                              |
| **Text Primary**         | `#111827` (`text-color-title`) | `#FFFFFF`                     | Core titles and emphasis tags.                               |
| **Text Secondary**       | `#1F2937` (`text-[main]`)      | `#E5E7EB` (`text-dark-main`)  | Regular body text.                                           |
| **Text Tertiary**        | `#6B7280` (`text-muted`)       | `#9CA3AF` (`text-dark-muted`) | Descriptive text, hints.                                     |
| **Text Muted**           | `#9CA3AF` (`gray-400`)         | `#6B7280` (`gray-500`)        | Timestamps, extremely subtle meta arrays.                    |
| **Text Inverse**         | `#FFFFFF`                      | `#121212`                     | Text inside solid primary buttons or dark badges.            |
| **Text On Primary**      | `#FFFFFF`                      | `#FFFFFF`                     | Ensures high contrast inside Primary color containers.       |
| **Text On Secondary**    | `#1B6B4A`                      | `#1B6B4A` (usually)           | Used on secondary outline buttons or white/primary surfaces. |
| **Border Default**       | `#E2E8F0`                      | `#374151` (`gray-700`)        | `.card` borders, separators.                                 |
| **Border Light**         | `#F3F4F6`                      | `#4B5563` (`gray-600`)        | Divider traces, faint table borders.                         |
| **Border Strong**        | `#D1D5DB` (`gray-300`)         | `#1F2937`                     | Input field resting borders.                                 |
| **Border Focus**         | `#1B6B4A`                      | `#1B6B4A`                     | Focus Rings for Inputs & A11y.                               |
| **Link Default**         | `#1B6B4A`                      | `#45B080` (Primary 400)       | Anchor tags resting state.                                   |
| **Link Hover**           | `#145239` (Primary Dark)       | `#70C19A` (Primary 300)       | Anchor tags active mouse-over.                               |
| **Link Visited**         | `#145239`                      | `#45B080`                     | Post-click anchor.                                           |
| **Link Active**          | `#092017`                      | `#45B080`                     | Mouse-down state.                                            |

---

## 3. Spacing System

**Base Scaling Logic:** Multiples of `4px` mapping linearly (equivalent to Tailwind's native scaling).

| Scale Level | Pixel Value | Rem Value  | Semantic Usage Roles                                                                                   |
| :---------- | :---------- | :--------- | :----------------------------------------------------------------------------------------------------- |
| **`0`**     | `0px`       | `0`        | No spacing. Standardized border radius for interactive structures (`--radius-card`, `--radius-btn`).   |
| **`px`**    | `1px`       | `1px`      | 1-pixel borders (`border`), minimal rating stars gap.                                                  |
| **`1`**     | `4px`       | `0.25rem`  | Micro margins. Checkbox layout, internal button icons (`gap-1`). `spacing-micro-gap`.                  |
| **`1.5`**   | `6px`       | `0.375rem` | Internal element relations (spacing rating and count `gap-1.5`).                                       |
| **`2`**     | `8px`       | `0.5rem`   | `spacing-element-gap`. Flex row standard gaps (`gap-2`), tiny button padding `p-2`.                    |
| **`2.5`**   | `10px`      | `0.625rem` | Core button vertical padding (`padding: 10px 24px`), Input top/bottom padding.                         |
| **`3`**     | `12px`      | `0.75rem`  | Tight list gaps (`gap-3`).                                                                             |
| **`4`**     | `16px`      | `1rem`     | `spacing-card-gap`, `spacing-section-gap`. Base component internal alignment.                          |
| **`5`**     | `20px`      | `1.25rem`  | `spacing-card-padding`. The universal interior padding for most Cards (`p-5`, `--space-card-padding`). |
| **`6`**     | `24px`      | `1.5rem`   | Base button horizontal padding (`padding: 10px 24px`), large section gaps (`gap-6`).                   |
| **`8`**     | `32px`      | `2rem`     | `spacing-section-vertical`. Margins separating distinct sections (`py-8`, `gap-8`).                    |
| **`10`**    | `40px`      | `2.5rem`   | Loose spacing layout. Footer top margin components, Hero internal paddings.                            |
| **`12`**    | `48px`      | `3rem`     | `spacing-layout-vertical`. Heavy structural gaps.                                                      |
| **`14`**    | `56px`      | `3.5rem`   | Used to deeply separate major contextual zones (`mt-14` on Featured Companies).                        |
| **`16`**    | `64px`      | `4rem`     | Edge page spacers.                                                                                     |
| **`20`**    | `80px`      | `5rem`     | Massive visual blocks.                                                                                 |
| **`24`**    | `96px`      | `6rem`     | Massive Hero spacer logic.                                                                             |

---

---

## 4. Components System (نظام العناصر)

### 4.1 Buttons (الأزرار)

جميع الأزرار تستخدم خاصية `transition: all 150ms ease` وتعتمد على مسافات قياسية ومقاسات خطوط ثابتة لتناسق الحجم.

- **Small (`.btn--sm`)**: Padding `6px 16px`, Text Size `12px` (`text-xs`), Font Weight `600`.
- **Default (`.btn`)**: Padding `10px 24px`, Text Size `14px` (`text-sm`), Font Weight `600`, Gap `4px` between icon and text.
- **Large (`.btn--lg`)**: Padding `14px 32px`, Text Size `16px` (`text-base`), Font Weight `700`.

**Variants (الأشكال):**

- **Primary**: Background `Primary (600)`, Text `#FFFFFF`. Hover: Background `Primary Dark (700)`.
- **Secondary**: Background `transparent`, Border `2px solid Primary`, Text `Primary`. Hover: Background `Primary`, Text `#FFFFFF`.
- **Ghost**: Background `transparent`, Text `Text-Main`. Hover: Background `Surface-Hover`.
- **Danger**: Background `Error`, Text `#FFFFFF`. Hover: Background `#C53030`.

### 4.2 Cards (الكروت)

جميع الكروت تم إجبار قيمة الـ Border Radius لها لتكون `0px` عبر متغيرات الـ CSS الصارمة.

- **Default Card (`.card`)**: Background `Surface`, Border `1px solid Border-Default`, Padding `20px`. Transition: `box-shadow 150ms ease`.
- **Elevated Card (`.card--elevated`)**: Box Shadow `shadow-md`, Border `transparent`.
- **Interactive Card (`.card--interactive`)**: Default properties + RTL-specific right border (`border-right: 2px solid transparent`). On Hover: `border-right-color: Primary`, Transition `300ms ease`.
- **Job Card (`.job-card`)**: Layout `flex` with `16px` gap, `16px` padding. Hover state activates primary border and `shadow-sm`. Includes `56px x 56px` square icon container.

### 4.3 Inputs & Forms (الحقول الإدخالية)

- **Text Input (`.input-field`)**: Padding `10px 14px`, Text Size `14px`, Background `Surface`, Border `1px solid Border-Strong`.
- **Select (`.select-field`)**: Similar to text inputs, but includes exactly `32px` left padding (RTL) to make room for the custom trailing Chevron icon.
- **Focus State (التركيز)**: `outline: none`, `border-color: Primary`, Focus Ring `0 0 0 3px rgba(27, 107, 74, 0.08)`.
- **Error State**: `border-color: Error`.
- **Force Square Checkbox (`input[type="checkbox"].force-square`)**:
  - Completely strips native browser styles (`appearance: none`).
  - Dimensions: Strictly `16px x 16px`, `border-radius: 0`.
  - Checked State: Custom `clip-path: polygon(...)` checkmark animation (`120ms transform ease-in-out`), Background `Primary`.

### 4.4 Badges & Tags (الشارات والوسوم)

- **Standard Badge (`.badge`)**: Padding `3px 10px`, Text Size `11px`, Font Weight `600`.
  - _Status / Verified_: Background `#e8f5e9` (Success Light), Text `Primary`.
  - _Count_: Background `Primary`, Text `#FFFFFF`, Min-width `20px`, Text Center.
- **Benefit Tag (`.benefit-tag`)**: Padding `4px 12px`, Text Size `12px`, Font Weight `500`.
  - _Green Variant_: Background `#f0faf4` (Primary 50), Border `#c8e6d5` (Primary 100), Text `Primary`.
  - _Neutral Variant_: Background `Surface-Hover`, Border `Border-Default`, Text `Text-Secondary`.

### 4.5 Avatars (الصور الرمزية)

تستخدم لعرض صور الشركات أو المستخدمين. الـ Default هو دائري لكن يتم تطبيق القاعدة الشرطية `0px` للشركات إن لزم الأمر.

- **Small (`sm`)**: `32px` × `32px`, Text `12px`
- **Medium (`md`)**: `44px` × `44px`, Text `14px`
- **Large (`lg`)**: `64px` × `64px`, Text `20px`
- **Extra Large (`xl`)**: `80px` × `80px`, Text `28px`
- _Default Setting_: Background `#e8f5e9` (Success Light), Text `Primary`.

### 4.6 Links & Navigation (الروابط)

- **Inline Links**: Text `Primary`, Font Weight `500`. Hover: `text-decoration: underline`, Color `Primary-Dark`.
- **Navigation Tabs (`.tab`)**: Padding `12px 24px`, Text Size `14px`, Font Weight `500`.
  - _Resting_: Color `Text-Secondary`, Bottom Border `2px solid transparent`.
  - _Hover_: Color `Text-Primary`.
  - _Active (`.tab--active`)_: Color `Primary`, Bottom Border `2px solid Primary`, Font Weight `600`.

### 4.7 Filter Components (مكونات التصفية)

جميع مكونات التصفية تعتمد الآن على نظام `Base` موحد عالي الأداء يدعم الخصائص المنطقية للاتجاهات (RTL Logical Properties) مثل `pe-` و `ms-`.

- **`BaseSearchInput`**: حقل بحث موحد يدعم الـ Debounce داخلياً لحماية الأداء، مع دعم `defineModel` المدمج.
- **`BaseFilterHeader`**: رأس موحد لقوائم التصفية يتضمن العنوان الرئيسي مع دمج `BaseSearchInput`.
- **`BaseFilterShowMore`**: زر إظهار المزيد/أقل مع دعم كامل للهوامش المنطقية.
- **`BaseTreeConnector`**: الموصلات الشجرية (الخطوط الخضراء التي ترسم البنية الهرمية) وتطابق الـ `inset-inline-start` و `border-inline-start` لتعمل يميناً ويساراً تلقائياً.
- **`BaseFilterItemRow`**: المكون الذري الأوحد لتمثيل أي عنصر تصفية (Checkbox/Radio). يعتمد على `<label>` مع `<input type="checkbox/radio" class="sr-only">` لضمان أعلى معايير إمكانية الوصول (WAI-ARIA).
- **`BaseHierarchicalFilter`**: المحرك الأساسي للقوائم الشجرية الضخمة. يعتمد على مفهوم "تسطيح الشجرة" (1D Array Flattening) واستخدام `shallowRef` لتمكين الـ Virtual Scroll (عند الحاجة) وعرض أكثر من 10,000+ عنصر بسرعة 60 إطار في الثانية، وبدون تشوه تصويري (CLS) بفضل الـ Skeleton Loaders ذات المقاس الدقيق للحواف. مرتبط بـ `useTreeSelection` للمزامنة الفورية مع الـ URL Query (لأغراض الـ SEO والمشاركة).

**Filter Tree Layout Tokens (رموز تخطيط الشجرة):**

| Token Name                         | Value   | Usage                                                  |
| :--------------------------------- | :------ | :----------------------------------------------------- |
| `--filter-tree-line-width`         | `1.5px` | Thickness of connection lines.                         |
| `--filter-tree-stem-offset`        | `10px`  | Distance from container edge to vertical rail.         |
| `--filter-tree-root-branch-length` | `16px`  | Aligns Level 1 right edge with Level 0 left edge.      |
| `--filter-tree-branch-length`      | `16px`  | Length of horizontal bridges between levels.           |
| `--filter-tree-child-indent`       | `8px`   | Base indent for child rows (Total indent = 16px).      |
| `--filter-tree-child-stem-offset`  | `-16px` | Negative offset for child rails to connect to parents. |
| `--filter-tree-line-opacity-muted` | `0.6`   | Visibility of inactive lines.                          |

---

## 5. Effects, Transitions & Motion System (المؤثرات الحركية)

الأنيميشن والتفاعلات مصممة لتبدو احترافية (Premium) ولا تعتمد على الحركات المبالغ فيها. بل تعتمد على التغيرات السلسة والمحسوبة.

### 5.1 Transitions (فترات الانتقال)

| Transition Variable         | Timing / Curve | Usage Content                                                                                                              |
| :-------------------------- | :------------- | :------------------------------------------------------------------------------------------------------------------------- |
| **Fast Transition**         | `150ms ease`   | Button hover states, input border color changes, tab underlines, subtle color swaps.                                       |
| **Normal Transition**       | `200ms ease`   | Dropdown chevron rotations, modal fadings, tooltips.                                                                       |
| **Slow/Complex Transition** | `300ms ease`   | Card border expansion (e.g. `card--interactive`), Grid structural shifts, Accordion (Hierarchical Tree) height expansions. |

### 5.2 Micro-Interactions (التفاعلات الدقيقة)

- **Tactile Click (`active:scale-[0.98]`)**: Applied to dropdown triggers (`BaseSelect`) to give a physical push sensation when clicked.
- **Icon Scaling (`hover:scale-[1.2]`)**: Used precisely on interactive rating stars (`rating-star--interactive`) to emphasize targetability.

### 5.3 Shadows & Depth (الظلال والعمق)

| Shadow Level             | CSS Definition                                                            | Usage Content                                                                               |
| :----------------------- | :------------------------------------------------------------------------ | :------------------------------------------------------------------------------------------ |
| **Shadow SM**            | Tailwind Default                                                          | Hovered job cards for extremely subtle lift.                                                |
| **Shadow MD**            | Tailwind Default                                                          | Floating Search bars (`.search-bar`), Hovered Featured Companies.                           |
| **Shadow Card Hover**    | `0 2px 8px rgba(0,0,0,0.08)` (Light) / `0 2px 8px rgba(0,0,0,0.3)` (Dark) | The unified shadow token for interactive cards over non-solid backgrounds.                  |
| **Shadow XL / Dropdown** | Tailwind `shadow-xl`                                                      | Floating absolute dropdowns (`BaseSelect`), Modals, Tooltips.                               |
| **Focus Rings**          | `0 0 0 3px rgba(27, 107, 74, 0.08)`                                       | Universal focus halo for accessibility on inputs and selects (8% opacity of Primary Green). |

### 5.4 Loading States (حالات التحميل)

- **Skeleton Pulse (`.skeleton`)**: A custom CSS animation (`skeleton-pulse 1.5s ease-in-out infinite`) shifting a background linear gradient (`200% 100%`) from `#f0f0f0` to `#e8e8e8`. Creates a smooth shimmering effect across loading blocks perfectly mapped to card paddings.

### 5.5 View/Enter Animations

- **Toast In**: Opacity `0` → `1` + Transform `translateY(-10px)` → `0` using `var(--transition-base)` (approx 200ms).
- **Modal Dialog**: Scale `0.95` → `1` + Fade In, centering using `translate(-50%, -50%)`.
- **Drawer In (Mobile)**: `transform: translateY(100%)` → `0`, sliding up from the bottom edge seamlessly.
- **Hierarchical Tree Accordion**: Complex dual-property transition coordinating both `height` (calculated via JS) and `opacity` in exactly `300ms ease-out` to maintain perfect layout repainting without stuttering.

---

## 6. Layout & Z-Index Architecture (الهيكلة ومستويات التراكب)

ينظم هذا القسم مستويات العمق لمنع التداخل بين القوائم، النوافذ المنبثقة، والروابط المثبتة. كما يحدد الأبعاد الهيكلية.

### 6.1 Z-Index Scale (مقياس التراكب)

| CSS Token            | Z-Index Value | Usage Context (مجال الاستخدام)                                                                                 |
| :------------------- | :------------ | :------------------------------------------------------------------------------------------------------------- |
| `z-0`                | `0`           | Base grounding layers, structural dividers.                                                                    |
| `z-10`               | `10`          | Floating visual indicators (e.g. active tab dots, pseudo-element boundaries).                                  |
| `z-20`               | `20`          | Hovered interactive elements (like Featured Company arrows) ensuring they sit above sibling elements in grids. |
| `--z-dropdown`       | `100`         | Absolute positioned dropdown menus (e.g. `BaseSelect`), tooltips, and contextual menus.                        |
| `--z-sticky`         | `200`         | Sitewide sticky headers (`AppHeader`), floating action bars.                                                   |
| `--z-modal-backdrop` | `300`         | The darkened overlay behind dialogs masking the entire application `body`.                                     |
| `--z-modal`          | `400`         | Main overlay Dialog modals, Alert confirm boxes.                                                               |
| `--z-toast`          | `500`         | Global notifications and snackbars. Must override absolutely everything else.                                  |

### 6.2 Structural Dimensions (أبعاد الهيكل)

- **Maximum Container Width**: `1280px` (`max-w-7xl` in Tailwind). Forms the maximum boundary for page content.
- **Container Padding (`--container-padding`)**: `16px` (`var(--space-md)`) applied at the mobile level (`px-4`), expanding gracefully on larger screens.
- **Sidebar Navigation / Fixed Layouts**: Standardized at `325px` layout tracks for rigid sidebars (`lg:grid-cols-[325px_1fr]`).
- **Screen Breakpoints**: Adheres strictly to standard Tailwind definitions:
  - `sm:` (≥640px)
  - `md:` (≥768px)
  - `lg:` (≥1024px)
  - `xl:` (≥1280px)

_Generated by the System Analysis based on Vue 3.5, Nuxt 4 implementations and strict UI tokens defined inside the core Rizqak styling architecture._
