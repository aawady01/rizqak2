# Phase 19: Design Token Compliance & Logical Properties — Execution Plan

## 📊 Full Audit Results (Verified 2026-03-15)

### ✅ Already Fixed (NO ACTION NEEDED):

| Item | File | Status |
|------|------|--------|
| BaseChip scoped CSS | BaseChip.vue:34-83 | ✅ Uses `var(--spacing-1)`, `var(--font-size-ds-caption-l)` |
| `hero__title font-size` | main.css:885 | ✅ `var(--font-size-ds-display-l)` |
| `.badge font-size` | main.css:630 | ✅ `var(--font-size-ds-caption-r)` |
| `.hero__search-container height` | main.css:940 | ✅ `var(--spacing-14)` |
| `.input-field:focus` | main.css:616 | ✅ `color-mix()` |
| `.animate-shake duration` | main.css:1463 | ✅ `var(--transition-duration-normal)` |
| `--color-ds-border` | main.css:954 | ✅ `var(--color-border)` |
| Dead Material artifacts | main.css | ✅ `--size-icon-material-md` removed |
| Filter Tree tokens | main.css:348-351 | ✅ 44px/40px/44px/16px |
| Container padding | LayoutHeader:30, Footer:18 | ✅ `px-content sm:px-6 lg:px-section` |
| `dir="rtl"` | default.vue:2, app.vue:10 | ✅ `:dir="dir"` reactive |
| HomeSidebar section header | HomeSidebar.vue:64 | ✅ `mb-content` |

### 🔴 Issues to Fix (24 Changes in 14 Files):

---

## STEP 1: main.css — Logical Properties (4 changes)

**File**: `app/assets/css/main.css`

| Step | Line | Old | New |
|------|------|-----|-----|
| 1.1 | 529 | `margin-left: auto;` | `margin-inline: auto;` |
| 1.2 | 530 | `margin-right: auto;` | (delete line) |
| 1.3 | 531 | `padding-left: var(--container-padding);` | `padding-inline: var(--container-padding);` |
| 1.4 | 532 | `padding-right: var(--container-padding);` | (delete line) |
| 1.5 | 899 | `margin-left: auto;` | `margin-inline: auto;` |
| 1.6 | 900 | `margin-right: auto;` | (delete line) |
| 1.7 | 906 | `padding-left: var(--spacing-6);` | `padding-inline: var(--spacing-6);` |
| 1.8 | 907 | `padding-right: var(--spacing-6);` | (delete line) |

**Verification**: `grep -E "margin-left|margin-right|padding-left|padding-right" app/assets/css/main.css` → ZERO

---

## STEP 2: BaseCard.vue — Spacing + Gap Tokens (2 changes)

**File**: `app/shared/components/base/BaseCard.vue`

| Step | Line | Old | New |
|------|------|-----|-----|
| 2.1 | 33 | `gap-1 p-5 [.border-b]:pb-5` | `gap-compact p-content [.border-b]:pb-content` |
| 2.2 | 71 | `p-5 [&:last-child]:pb-5` | `p-content [&:last-child]:pb-content` |
| 2.3 | 79 | `p-5 pt-0 [.border-t]:pt-5` | `p-content pt-0 [.border-t]:pt-content` |

---

## STEP 3: BaseSelect.vue — Z-index, Shadow, Spacing (4 changes)

**File**: `app/shared/components/base/BaseSelect.vue`

| Step | Line | Old | New |
|------|------|-----|-----|
| 3.1 | 56 | `z-50 shadow-xl` | `z-popover shadow-lg` |
| 3.2 | 38 | `py-2.5` | `py-element` |
| 3.3 | 73 | `py-2.5 pe-10 ps-3` | `py-element pe-section ps-element` |
| 3.4 | 26 | `p-1` | `p-compact` |

---

## STEP 4: BaseDialog.vue — Z-index Tokens (2 changes)

**File**: `app/shared/components/base/BaseDialog.vue`

| Step | Line | Old | New |
|------|------|-----|-----|
| 4.1 | 28 | `z-50` (overlay) | `z-modal-backdrop` |
| 4.2 | 34 | `z-50` (content) | `z-modal` |

---

## STEP 5: BaseTabs.vue — Spacing Tokens (2 changes)

**File**: `app/shared/components/base/BaseTabs.vue`

| Step | Line | Old | New |
|------|------|-----|-----|
| 5.1 | 26 | `p-1` | `p-compact` |
| 5.2 | 32 | `px-4 py-1.5` | `px-content py-compact` |

---

## STEP 6: BasePagination.vue — Gap Token (1 change)

**File**: `app/shared/components/base/BasePagination.vue`

| Step | Line | Old | New |
|------|------|-----|-----|
| 6.1 | 48 | `gap-1.5` | `gap-compact` |

---

## STEP 7: BaseFormField.vue — Margin Token (1 change)

**File**: `app/shared/components/base/BaseFormField.vue`

| Step | Line | Old | New |
|------|------|-----|-----|
| 7.1 | 21 | `mt-1.5` | `mt-compact` |

---

## STEP 8: BaseInput.vue — Spacing Token (1 change)

**File**: `app/shared/components/base/BaseInput.vue`

| Step | Line | Old | New |
|------|------|-----|-----|
| 8.1 | 14 | `px-3 py-2.5` | `px-element py-element` |

---

## STEP 9: BaseBadge.vue — Spacing Tokens (1 change)

**File**: `app/shared/components/base/BaseBadge.vue`

| Step | Line | Old | New |
|------|------|-----|-----|
| 9.1 | 6 | `px-2.5 py-0.5` | `px-element py-1` |

---

## STEP 10: BaseButton.vue — Spacing Tokens (1 change)

**File**: `app/shared/components/base/BaseButton.vue`

| Step | Line | Old | New |
|------|------|-----|-----|
| 10.1 | 24 | `px-4 py-2` | `px-content py-compact` |

---

## STEP 11: CountryCarousel.vue — Arrow Symmetry + Z-index (2 changes)

**File**: `app/components/home/CountryCarousel.vue`

| Step | Line | Old | New |
|------|------|-----|-----|
| 11.1 | 15 | `hover:bg-white/30` | `hover:bg-white/30 hover:border-white/30` |
| 11.2 | 15, 54 | `z-20` | `z-fixed` |

---

## STEP 12: HomeJobList.vue — Spacing Tokens (2 changes)

**File**: `app/components/home/HomeJobList.vue`

| Step | Line | Old | New |
|------|------|-----|-----|
| 12.1 | 52 | `py-2.5` | `py-element` |
| 12.2 | 70 | `py-2` | `py-compact` |

---

## STEP 13: LayoutHeader.vue — Z-index Token (1 change)

**File**: `app/components/layout/LayoutHeader.vue`

| Step | Line | Old | New |
|------|------|-----|-----|
| 13.1 | 28 | `z-50` | `z-sticky` |

---

## STEP 14: BaseChip.vue — Font-weight Token (1 change)

**File**: `app/shared/components/base/BaseChip.vue`

| Step | Line | Old | New |
|------|------|-----|-----|
| 14.1 | 40 | `font-weight: 500;` | `font-weight: var(--font-weight-medium);` |

---

## 📋 Complete Execution Summary

| Step | File | Changes | Type |
|------|------|---------|------|
| 1 | main.css | 4 | Logical Properties |
| 2 | BaseCard.vue | 3 | Spacing Tokens |
| 3 | BaseSelect.vue | 4 | Z-index + Shadow + Spacing |
| 4 | BaseDialog.vue | 2 | Z-index Tokens |
| 5 | BaseTabs.vue | 2 | Spacing Tokens |
| 6 | BasePagination.vue | 1 | Gap Token |
| 7 | BaseFormField.vue | 1 | Margin Token |
| 8 | BaseInput.vue | 1 | Spacing Token |
| 9 | BaseBadge.vue | 1 | Spacing Token |
| 10 | BaseButton.vue | 1 | Spacing Token |
| 11 | CountryCarousel.vue | 2 | Symmetry + Z-index |
| 12 | HomeJobList.vue | 2 | Spacing Tokens |
| 13 | LayoutHeader.vue | 1 | Z-index Token |
| 14 | BaseChip.vue | 1 | Font-weight Token |
| **Total** | **14 files** | **26 changes** | |

---

## ✅ Post-Execution Verification Commands

```bash
# 1. Logical Properties
grep -E "margin-left|margin-right|padding-left|padding-right" app/assets/css/main.css
# Expected: ZERO

# 2. Z-index tokens
grep -E "\bz-50\b" app/**/*.vue
# Expected: ZERO

# 3. Hardcoded spacing in base components
grep -E "\bp-5\b" app/shared/components/base/*.vue
# Expected: ZERO

# 4. Shadow-xl in BaseSelect
grep "shadow-xl" app/shared/components/base/BaseSelect.vue
# Expected: ZERO

# 5. Arrow asymmetry
grep "hover:bg-white/30" app/components/home/CountryCarousel.vue
# Expected: 2 lines (both should have same classes)

# 6. TypeScript + Lint
pnpm typecheck
pnpm lint
```

---

## 📝 Documentation Updates (After Verification)

1. Update `docs/STANDARDS.md` — Add:
   - Logical Properties standard
   - Z-index Token standard
   - Spacing Token mapping table

2. Update `docs/PHASE_COMPLETION_LOG.md` — Add Phase 19 checkpoint

3. Update `task.md` — Mark Phase 19 as `[x]`
