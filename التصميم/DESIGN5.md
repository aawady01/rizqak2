```markdown
# Design System Specification: Editorial Architecturalism

## 1. Overview & Creative North Star
**Creative North Star: The Architectural Monolith**
This design system rejects the "bubbly" and rounded trends of modern SaaS in favor of **Architectural Monolithism**. Inspired by high-end editorial layouts and brutalist precision, the system focuses on structural integrity, sharp 90-degree geometry, and a rhythmic use of negative space. 

By utilizing a Right-to-Left (RTL) first approach, we treat the interface as a physical broadsheet. The "Modern Arabic" aesthetic is achieved not through ornamentation, but through the sophisticated weight of the Cairo typeface and the authoritative use of deep forest greens and gold accents. Every element is intentional, immovable, and premium.

---

## 2. Colors & Tonal Logic
The palette is rooted in heritage and prestige. We move beyond simple flat colors by utilizing a "Tonal Layering" system that creates depth without relying on shadows.

### Primary Palette
- **Primary (`#1B6B4A`)**: The "Deep Forest." Used for the Sticky App Bar and primary actions to anchor the user’s eye.
- **Secondary/Rating (`#E8B931`)**: "The Golden Standard." Reserved strictly for success states, verification badges, and the single-star rating system.
- **Surface (`#F5F5F0`)**: "Warm Parchment." This is our primary canvas, providing a sophisticated alternative to clinical white.

### The "No-Shadow" Depth Rule
While the user request specifies no shadows, we achieve hierarchy through **Surface Nesting**:
- **Background (`#FFFFFF`)**: The lowest layer (the table).
- **Surface-Container-Low (`#F4F4EF`)**: The secondary layer (the paper).
- **Surface-Container-Highest (`#E3E3DE`)**: Interactive elements or hovered states.

**The "Sharp-Line" Mandate:** 
Boundaries are defined by a strict **1px solid border (`#E0E0E0`)**. However, to maintain an editorial feel, avoid boxing every element. Use the "Ghost Border" logic—where borders only exist to separate distinct functional zones (e.g., the sidebar from the main feed), while internal card content is separated by generous whitespace.

---

## 3. Typography: The Cairo Scale
Typography is the primary driver of the "Shoghlak Barra" identity. We use the **Cairo** font family exclusively for its exceptional legibility in Arabic scripts and its geometric, architectural presence.

| Level | Token | Weight | Size | Usage |
| :--- | :--- | :--- | :--- | :--- |
| **Display** | `display-lg` | Bold (700) | 3.5rem | Hero headlines/Country names |
| **Headline** | `headline-md` | Bold (700) | 1.75rem | Section titles (e.g., "Top Companies") |
| **Title** | `title-md` | SemiBold (600) | 1.125rem | Job Titles / Card Headings |
| **Body** | `body-md` | Regular (400) | 0.875rem | Descriptions / Long-form text |
| **Label** | `label-sm` | Bold (700) | 0.6875rem | Micro-data / Verification labels |

**Editorial Note:** For "Values," such as salary ranges or job counts, use the `title-lg` token with a higher tracking value to give the numbers an "authoritative" data-heavy look.

---

## 4. Elevation & Structural Grid
In this system, elevation is **horizontal**, not vertical. We do not "lift" objects; we "carve" them.

- **The 8px Rhythm:** All spacing must be multiples of 8. Padding inside cards is a standard 24px (3x8) to ensure the content breathes.
- **Square Corners:** A strict `0px` border-radius applies to every single component. This conveys stability and institutional trust.
- **RTL Integrity:** The grid flips the traditional western flow. Primary navigation and breadcrumbs originate from the right, with the eye traveling left toward supplemental data.

---

## 5. Components

### Sticky App Bar
- **Color:** `primary_container` (#1B6B4A).
- **Height:** 72px.
- **Detail:** No shadow. A 1px border at the bottom in a darker shade of green or a 10% black overlay is permitted to separate it from the scrollable content.

### Square Country Tiles
- **Structure:** 1:1 Aspect Ratio. 
- **Style:** `surface_container_lowest` (#FFFFFF) background with a 1px `outline_variant` border.
- **Content:** Centered flag icon (top), Country Name (bold `title-md`), and job count in the bottom-left corner in `secondary` gold.

### Company Directory Cards
- **Structure:** Horizontal layout. 
- **Rating:** A single `secondary` gold star followed by a numerical value (e.g., ★ 4.8). 
- **Verification Badge:** A square, 1px bordered tag with the text "Verified" in `on_primary_fixed_variant` (#005235) over a light green tint.
- **Interaction:** On hover, the background shifts from `background` to `surface_variant` (#E3E3DE).

### Buttons (The Monolith Variant)
- **Primary:** Solid `#1B6B4A`, text `#FFFFFF`, 0px radius, 16px vertical padding.
- **Secondary:** Transparent background, 1px `#1B6B4A` border, 0px radius.
- **States:** Active/Pressed states involve a fill color shift to `on_primary_fixed_variant`, never a shadow.

### Breadcrumbs
- **Visual:** Separated by a simple `LEFT-POINTING ANGLE QUOTATION MARK` (‹) in RTL. 
- **Color:** `on_surface_variant` (#3F4943) for inactive, `primary` (#1B6B4A) for the current page.

---

## 6. Do’s and Don’ts

### Do
- **Do** use whitespace as a structural element. If two sections feel cluttered, increase the margin rather than adding a line.
- **Do** align all text to the right. 
- **Do** ensure the Cairo font weight is "Bold" for all headers to maintain the platform's "Premium Professional" tone.
- **Do** use the `#E8B931` Gold sparingly; it is an accent for quality, not a primary UI color.

### Don’t
- **Don't** use any border-radius. Even a 2px radius breaks the architectural integrity of the system.
- **Don't** use drop shadows. If you need to separate a "floating" modal, use a heavy 1px border or a high-contrast background shift.
- **Don't** use standard icons for "Verification." Use text-based badges within square borders to maintain the editorial look.
- **Don't** use gradients. Every color must be flat and "honest."