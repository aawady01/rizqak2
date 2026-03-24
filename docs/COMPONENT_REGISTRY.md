# COMPONENT REGISTRY — Rizqak2

> **هذا الملف يوثق كل base component موجود في المشروع.**
> **أي AI model لازم يقرأ ده قبل ما يعمل component جديد.**

**Last Updated**: 2026-03-17
**Location**: `app/shared/components/base/`
**Total**: 36 components

---

## BUTTONS & ACTIONS

### BaseButton
**File**: `BaseButton.vue`
**Purpose**: الزر الأساسي لكل الإجراءات
**Variants**: `default`, `destructive`, `outline`, `secondary`, `ghost`, `link`
**Sizes**: `default`, `sm`, `lg`, `icon`
**When to use**: أي زر تفاعلي في التطبيق
**When NOT to use**: أزرار shell مخصصة (header/nav)

---

## CARDS & SURFACES

### BaseCard
**File**: `BaseCard.vue`
**Purpose**: السطح الأساسي لعرض المحتوى
**Slots**: `header`, default, `footer`
**When to use**: أي بطاقة عرض محتوى
**When NOT to use**: الكروت المتخصصة (JobCard, CompanyCard) — ليها components خاصة

---

## FORM CONTROLS

### BaseInput
**File**: `BaseInput.vue`
**Purpose**: حقل إدخال نص
**Features**: `v-model`, placeholder, disabled state
**When to use**: أي حقل إدخال نص عادي

### BaseTextarea
**File**: `BaseTextarea.vue`
**Purpose**: حقل إدخال نص متعدد الأسطر
**When to use**: النصوص الطويلة (وصف، تعليقات)

### BaseSelect
**File**: `BaseSelect.vue`
**Purpose**: قائمة منسدلة للاختيار
**When to use**: اختيار من قائمة محدودة

### BaseCheckbox
**File**: `BaseCheckbox.vue`
**Purpose**: مربع اختيار (checkbox)
**When to use**: اختيارات متعددة

### BaseLabel
**File**: `BaseLabel.vue`
**Purpose**: تسمية حقول الإدخال
**When to use**: مع أي حقل إدخال

### BaseFormField
**File**: `BaseFormField.vue`
**Purpose**: wrapper للحقل + label + error message
**When to use**: كل حقل في نموذج

### BaseSearchInput
**File**: `BaseSearchInput.vue`
**Purpose**: حقل بحث مع أيقونة و X للمسح
**When to use**: أي وظيفة بحث

---

## TYPOGRAPHY

### BaseTypography
**File**: `BaseTypography.vue`
**Purpose**: النصوص بأنماط موحدة
**Variants**: `display-l`, `h1`-`h6`, `subtitle-l`, `subtitle-r`, `body-l`-`body-s`, `caption-l`-`caption-s`, `label-l`-`label-s`
**Props**: `variant`, `weight`, `color`, `tag`
**When to use**: كل النصوص في التطبيق
**When NOT to use**: النصوص البسيطة جداً (ممكن `<p>` مباشر)

---

## NAVIGATION

### BaseBreadcrumb
**File**: `BaseBreadcrumb.vue`
**Purpose**: مسار التنقل (breadcrumb)
**Props**: `items: {label, to?}[]`
**When to use**: كل صفحة فرعية (jobs, companies, details)

### BasePagination
**File**: `BasePagination.vue`
**Purpose**: التنقل بين صفحات النتائج
**Props**: `currentPage`, `totalPages`
**When to use**: أي قائمة فيها pagination

---

## FEEDBACK & STATES

### BaseAlert
**File**: `BaseAlert.vue`
**Purpose**: رسائل تنبيه (نجاح، خطأ، تحذير، معلومات)
**Variants**: `info`, `success`, `warning`, `error`
**Props**: `variant`, `title`, `dismissible`
**When to use**: رسائل على مستوى الصفحة

### BaseEmptyState
**File**: `BaseEmptyState.vue`
**Purpose**: عرض "لا توجد نتائج"
**Props**: `title`, `description`, `icon`
**Slot**: `action` للزر الاختياري
**When to use**: أي قائمة فاضية

### BaseErrorState
**File**: `BaseErrorState.vue`
**Purpose**: عرض "حدث خطأ" مع زر إعادة المحاولة
**Props**: `title`, `description`
**Event**: `retry`
**When to use**: أي خطأ في تحميل البيانات

### BaseSpinner
**File**: `BaseSpinner.vue`
**Purpose**: مؤشر تحميل دائري
**Sizes**: `sm`, `md`, `lg`
**When to use**: تحميل مضمّن (inline loading)

### BaseSkeleton
**File**: `BaseSkeleton.vue`
**Purpose**: هيكل تحميل (placeholder)
**When to use**: حالة تحميل أولية للصفحة/القائمة

---

## DATA DISPLAY

### BaseBadge
**File**: `BaseBadge.vue`
**Purpose**: شارة/علامة صغيرة
**Variants**: `default`, `secondary`, `destructive`, `outline`, `info`, `success`, `warning`, `error`
**When to use**: تصنيفات، حالات، عدادات

### BaseTable (7 components)
**Files**: `BaseTable.vue`, `BaseTableHeader.vue`, `BaseTableHead.vue`, `BaseTableRow.vue`, `BaseTableCell.vue`, `BaseTableBody.vue`, `BaseTableCaption.vue`, `BaseTableFooter.vue`
**Purpose**: عرض بيانات في جدول
**When to use**: البيانات الم_Tabularية

### BaseAvatar
**File**: `BaseAvatar.vue`
**Purpose**: صورة المستخدم/الشركة
**When to use**: عرض صورة شخص أو شركة

### BaseFlag
**File**: `BaseFlag.vue`
**Purpose**: علم الدولة
**Sizes**: `sm`, `md`, `lg`
**Props**: `countryCode`, `size`, `alt`
**When to use**: عرض علم الدولة (JobCard, CountryCard)

### BaseImageWithFallback
**File**: `BaseImageWithFallback.vue`
**Purpose**: صورة مع fallback عند الفشل
**When to use**: أي صورة ممكن تفشل في التحميل

---

## FILTERS

### BaseFilterHeader
**File**: `BaseFilterHeader.vue`
**Purpose**: عنوان قسم الفلتر مع بحث ومسح
**When to use**: داخل أقسام الفلاتر

### BaseFilterItemRow
**File**: `BaseFilterItemRow.vue`
**Purpose**: صف عنصر في الفلتر (checkbox + label + count)
**When to use**: عناصر الفلاتر القابلة للتحديد

### BaseFilterShowMore
**File**: `BaseFilterShowMore.vue`
**Purpose**: زر "عرض المزيد" في الفلاتر
**When to use**: عند وجود عناصر فلتر كثيرة

---

## DIALOGS & OVERLAYS

### BaseDialog
**File**: `BaseDialog.vue`
**Purpose**: نافذة منبثقة (modal/dialog)
**Built on**: `reka-ui` DialogRoot
**When to use**: أي مودال/نافذة منبثقة
**When NOT to use**: ~~BaseModal~~ (تم حذفه — استخدم BaseDialog)

### BaseDisclosureButton
**File**: `BaseDisclosureButton.vue`
**Purpose**: زر فتح/غلق قسم (accordion)
**When to use**: أقسام قابلة للطي

---

## DECORATIVE

### BaseTreeConnector
**File**: `BaseTreeConnector.vue`
**Purpose**: خطوط الاتصال في شجرة الفلاتر
**When to use**: داخل مكونات الفلاتر الشجرية

### BaseTabs
**File**: `BaseTabs.vue`
**Purpose**: تبويبات (tabs)
**When to use**: تبديل بين أقسام مرتبطة

---

## USAGE RULES

1. **استخدم Base component أولاً** — قبل ما تعمل component جديد، شوف لو في base component يعمل نفس الحاجة
2. **لا تكرر الأنماط** — لو لقيت نفس النمط في مكانين، استخرج لـ base component
3. **استخدم cn()** — لدمج الفئات
4. **استخدم CVA** — للـ variants
5. **استخدم semantic tokens** — للألوان والتباعد
6. **لا تضع hardcoded values**
7. **أضف aria attributes** — للـ accessibility
8. **استخدم rounded-none** — للـ brand rule

---

## DEPRECATED

| Component | Status | Replacement |
|-----------|--------|-------------|
| BaseModal | **DELETED** | BaseDialog |
| BaseChip | **DELETED** | BaseBadge |

---

*هذا الملف يجب أن يبقى محدث. أي component جديد يجب توثيقه هنا.*

*لا تنشئ component جديد بدون مراجعة هذا الملف أولاً.*
