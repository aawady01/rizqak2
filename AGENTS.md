# 🚨 MANDATORY WORKFLOW — ENFORCED ON ALL AI AGENTS

> **READ THIS FILE BEFORE STARTING ANY WORK. NO EXCEPTIONS.**
> **This file defines the ONLY acceptable way to work on this project.**
> **Any deviation from this workflow = INCOMPLETE WORK.**

---

## 🔴 CRITICAL: MANDATORY FILE READING BEFORE ANY WORK

> **You MUST read ALL of these files COMPLETELY before touching ANY code.**
> **No shortcuts. No assumptions. Read every file listed below.**

### Planning Files (Read First — These Define What to Do)
| File | Purpose | MUST Read |
|------|---------|-----------|
| `task.md` | Single source of truth for progress — current phase, all checkboxes | ✅ ALWAYS |
| `implementation_plan.md` | Detailed execution plan — 626 lines, every phase detailed | ✅ ALWAYS |
| `docs/STANDARDS.md` | Unified standards registry — what to use, what to delete | ✅ ALWAYS |
| `docs/CHECKPOINT.md` | Quick reminder checklist before each phase | ✅ ALWAYS |
| `docs/PHASE_COMPLETION_LOG.md` | What was done in each phase — recovery document | ✅ ALWAYS |
| `MASTER_UI_CONSTITUTION.txt` | 2562-line design system constitution | ✅ When UI-related |

### Project Configuration Files (Read to Understand Project State)
| File | Purpose | MUST Read |
|------|---------|-----------|
| `nuxt.config.ts` | ALL Nuxt configuration — modules, plugins, head, runtime | ✅ ALWAYS |
| `package.json` | ALL dependencies and their exact versions | ✅ ALWAYS |
| `tsconfig.json` | TypeScript configuration | ✅ When types involved |
| `app/assets/css/main.css` | ALL design tokens — `@theme` block, colors, spacing, typography | ✅ When styling involved |
| `app/app.vue` | Root app component — lang, dir, global providers | ✅ ALWAYS |

### Source Files to Read BEFORE Modifying
- [ ] Read EVERY file that will be modified — FULL content, not snippets
- [ ] Read EVERY file that is referenced or imported by files being modified
- [ ] Read sibling files in the same directory to understand patterns
- [ ] Read parent components that consume the component being modified
- [ ] Read child components used by the component being modified

---

## 🔒 PRE-TASK GATE (Mandatory Before ANY Task)

### Step 1: Deep Reading & Understanding
**You MUST complete ALL of these before touching any code:**

- [ ] Read the instruction/task/requirement **at least TWICE** — understand every word
- [ ] Read `task.md` — the ENTIRE current phase section, every checkbox
- [ ] Read `implementation_plan.md` — the ENTIRE current phase section, every instruction
- [ ] Read `docs/STANDARDS.md` — ALL standards that apply to this task
- [ ] Identify ALL files mentioned or implied in the task
- [ ] Identify ALL files that COULD be affected (dependencies, imports, related components)
- [ ] List every specific requirement, constraint, and standard mentioned
- [ ] If ANYTHING is unclear → STOP and ask the user for clarification

**Verification**: Write a summary of what you understand the task to be, including:
- What needs to change
- What files are involved
- What standards must be followed
- What the expected outcome is

### Step 2: Project Reality Check
**You MUST examine the ACTUAL state of the project:**

- [ ] Read EVERY file that will be modified — FULL content, not snippets
- [ ] Read EVERY file that is referenced or related
- [ ] Read the current `task.md` for the phase you're working on
- [ ] Read `implementation_plan.md` for the detailed requirements
- [ ] Read `docs/STANDARDS.md` for applicable standards
- [ ] Check `nuxt.config.ts`, `package.json`, `tsconfig.json` if relevant
- [ ] Run existing tests/lint/typecheck to know the current state
- [ ] Verify which technology versions are installed (check `package.json`)

**Verification**: Write a summary of the ACTUAL current state:
- What exists now in each file
- What's working vs broken
- What standards are already in place vs missing
- What the current typecheck/lint status is
- What versions of each technology are installed

### Step 3: Research & Best Practices
**You MUST research the latest standards for the task at hand:**

- [ ] Search the web for the latest best practices related to the technology/pattern
- [ ] Check official documentation for the latest API/pattern (Nuxt 4, Vue 3.5, TailwindCSS v4, etc.)
- [ ] Verify version compatibility (are we using the right API for the version installed?)
- [ ] Look for common pitfalls and anti-patterns to avoid
- [ ] Find the most modern, production-grade approach
- [ ] Check for breaking changes between the version we use and the latest version

**Verification**: Write a summary of research findings:
- What's the latest recommended approach
- What versions/APIs we're using
- What pitfalls to avoid
- What the best practice pattern is

### Step 4: Deep Analysis & Logic Check
**You MUST think through the task architecturally using ALL skills below:**

- [ ] What's the ripple effect? What else could break?
- [ ] Is there a simpler/cleaner approach?
- [ ] Are there edge cases to handle?
- [ ] Does this conflict with any existing pattern?
- [ ] Is this the right abstraction level?
- [ ] Will this work in SSR? CSR? Both?
- [ ] Will this work in RTL? LTR? Both?
- [ ] Will this work in dark mode? Light mode? Both?
- [ ] Are there performance implications? (Core Web Vitals)
- [ ] Are there security implications? (OWASP Top 10)
- [ ] Are there accessibility implications? (WCAG 2.1 AA)
- [ ] Are there SEO implications? (structured data, meta, crawlability)
- [ ] Is this responsive? (320px, 768px, 1024px, 1280px)
- [ ] Does this follow the design system tokens?

**Verification**: Write an analysis of:
- Potential risks and how to mitigate them
- Edge cases and how they're handled
- Compatibility concerns (SSR, RTL, dark mode, responsive)
- The chosen approach and WHY it was chosen
- Which skill domains are most relevant to this task

---

## 🔒 EXECUTION GATE (Mandatory During Execution)

### Step 5: Detailed Execution Plan
**Before writing ANY code, you MUST create a step-by-step plan:**

- [ ] Break the task into smallest possible atomic steps
- [ ] For EACH step, specify:
  - Which file to modify
  - What exactly to change (line numbers, old text, new text)
  - What to verify after the change
  - Which skill domains apply (UI/UX, Vue, Nuxt, TailwindCSS, TypeScript, etc.)
- [ ] Order steps to minimize risk (least risky changes first)
- [ ] Identify rollback points (where can we stop if something goes wrong?)

**Verification**: Write the execution plan in TodoList format

### Step 6: Execute With Verification at EACH Step
**For EACH atomic step:**

- [ ] Make the change
- [ ] Read the file back to verify the change applied correctly
- [ ] Check for syntax errors
- [ ] If relevant, run typecheck/lint for this file
- [ ] Verify the change follows ALL applicable skill standards (below)
- [ ] Mark as done ONLY after verification

**CRITICAL RULES:**
- ❌ NEVER make multiple changes without verifying each one
- ❌ NEVER assume a change applied — always read the file
- ❌ NEVER skip to the next step without verifying the current one
- ❌ NEVER mark as done without proof
- ❌ NEVER use an API without checking the version table below

---

## 🔒 POST-TASK GATE (Mandatory After ANY Task)

### Step 7: Comprehensive Verification
**You MUST verify the ENTIRE task, not just individual steps:**

- [ ] Run `pnpm typecheck` — show the FULL output
- [ ] Run `pnpm lint` if applicable — show the FULL output
- [ ] Run ALL conflict greps mentioned in the plan — show results
- [ ] Read EVERY modified file one final time — verify correctness
- [ ] Compare final state vs original requirements — line by line
- [ ] Check for unintended side effects in other files
- [ ] Verify ALL skill standards were followed (checklist below)

**Verification**: Write the verification results:
- Typecheck: PASS/FAIL (with details)
- Lint: PASS/FAIL (with details)
- All greps: results shown
- Files verified: list
- Skills compliance: list each skill and PASS/FAIL

### Step 8: Documentation Update
**You MUST update project documentation:**

- [ ] Update `task.md` with accurate status (based on verification, not assumptions)
- [ ] Update `docs/STANDARDS.md` if new standards were established
- [ ] Update `docs/PHASE_COMPLETION_LOG.md` with checkpoint
- [ ] Write completion summary with:
  - Files modified (with line numbers)
  - Files deleted
  - Files created
  - Commands run and results
  - Verification proof

### Step 9: Final Report to User
**You MUST provide a complete report:**

- What was requested
- What was done (with file-level detail)
- What was verified (with command output)
- What standards were applied
- What skills were applied
- What the next step is

---

## 🛑 STOP RULES (Enforceable by User)

**If ANY of these happen, the user MUST say "اقرأ AGENTS.md وطبق من الأول":**

1. **Skipping**: AI skips reading files before modifying them
2. **Assuming**: AI says "already done" without showing file contents or grep results
3. **Rushing**: AI makes multiple changes without verifying each one
4. **Ignoring**: AI doesn't run verification commands mentioned in the plan
5. **Guessing**: AI makes changes based on assumptions rather than reading actual files
6. **Forgetting**: AI doesn't update task.md/STANDARDS.md/PHASE_COMPLETION_LOG.md
7. **Incomplete**: AI marks a phase as done without completing ALL checklist items
8. **Surface-level**: AI only makes surface changes without deep analysis
9. **Wrong version**: AI uses API from wrong version without checking the version table
10. **Missing skills**: AI doesn't apply the required skill standards below

---

## 📋 PER-LINE EXECUTION PROTOCOL

**For tasks that involve modifying specific lines in files:**

1. Read the file — identify the EXACT line numbers
2. Show the current content of those lines
3. Write the planned change (old → new)
4. Make the change
5. Read the file again — verify the change
6. Run typecheck if it's a code change
7. Only then proceed to the next line

---

## 📋 PER-FILE EXECUTION PROTOCOL

**For tasks that involve modifying entire files:**

1. Read the file FULLY
2. Understand every section
3. List all changes needed
4. Make changes ONE section at a time
5. After each section: read back, verify
6. After all sections: read the FULL file, verify
7. Run typecheck/lint
8. Only then mark as done

---

## 📋 PER-PHASE EXECUTION PROTOCOL

**For project phases:**

1. Read `task.md` phase section — every checkbox
2. Read `implementation_plan.md` phase section — every instruction
3. Read `docs/CHECKPOINT.md`
4. Read ALL files that will be modified
5. Create TodoList with EVERY sub-task
6. Execute using Per-File or Per-Line protocol
7. Run ALL verification commands
8. Compare results vs requirements
9. Update all documentation
10. Report to user

---

## 🔑 VERSION AWARENESS TABLE (17 مارس 2026)

> **قبل استخدام أي API: تحقق من الجدول أدناه للتأكد من استخدام الإصدار الصحيح**

| التقنية (Technology) | الاسم بالعربي | الإصدار المستخدم | أهم النقاط |
|---------------------|---------------|-----------------|------------|
| **Nuxt** | ناكست | **4.4.2** | هيكل `app/`، استيراد تلقائي، `useNuxtApp()`، `useFetch()`، `$fetch()` |
| **Vue.js** | فيو جي اس | **3.5.30** | Composition API، `<script setup>`، `useId()`، `useTemplateRef()`، `v-memo` |
| **TailwindCSS** | تايلويند سي اس اس | **4.2.1** | تكوين CSS-first، كتلة `@theme`، بدون `tailwind.config.js` |
| **Vite** | فيت | **8.0.0** | Rolldown bundler، 10-30x faster builds |
| **ESLint** | إيس لينت | **10.0.3** | تكوين جديد، خوارزمية بحث محدثة |
| **TypeScript** | تايب سكريبت | **5.9.3** | الوضع الصارم، الأنواع العامة، `satisfies` |
| **Pinia** | بينيا | **3.0.4** | `defineStore()`، متاجر Composition API |
| **Zod** | زود | **4.3.6** | Schema validation، `safeParseAsync()` |
| **vee-validate** | في فاليدات | **4.15.1** | التحقق من النماذج، custom `toTypedSchema` adapter |
| **@vueuse/core** | فيو يوز | **14.2.1** | أحدث composables API |
| **@nuxt/fonts** | ناكست فونتس | الأحدث | تحميل الخطوط التلقائي |
| **@nuxtjs/color-mode** | ناكست كولور مود | الأحدث | الوضع المظلم/الفاتح |
| **@nuxtjs/i18n** | ناكست i18n | **10.2.3** | التدويل والتعدد اللغوي |
| **reka-ui** | ريكة يو آي | **2.9.2** | مكونات بدائية بدون واجهة |
| **nuxt-og-image** | ناكست أو جي إيمج | **6.0.2** | Takumi renderer، 2-10x faster |
| **class-variance-authority** | سي في ايه | الأحدث | أنماط متغيرات المكونات |
| **clsx + tailwind-merge** | كلاسكس + تايلويندميرج | الأحدث | دمج الفئات |
| **lucide-vue-next** | لوسيد فيو | **0.577.0** | الأيقونات |
| **@tanstack/vue-query** | فيو كويري | **5.92.9** | جلب البيانات |
| **@tanstack/vue-table** | فيو تيبل | **8.21.3** | الجداول |
| **@tanstack/vue-virtual** | فيو فيرتشوال | **3.13.23** | القوائم الطويلة |
| **vue-sonner** | فيو سونر | **2.0.9** | الإشعارات |
| **@nuxt/image** | ناكست إيمج | **2.0.0** | تحسين الصور |
| **@nuxt/scripts** | ناكست سكريبتز | الأحدث | إدارة النصوص الخارجية |
| **@vite-pwa/nuxt** | بي دبليو أي | الأحدث | التطبيق التدريجي |
| **nuxt-security** | ناكست سيكيوريتي | **2.5.1** | أمان HTTP |
| **@sentry/nuxt** | سينتري | **10.43.0** | مراقبة الأخطاء |
| **@formkit/auto-animate** | أوتو أنيميت | الأحدث | رسوم متحركة تلقائية |
| **Vitest** | فيتست | **4.1.0** | اختبار |
| **Playwright** | بلاي رايت | **1.58.2** | اختبارات E2E |

---

## 🧠 MANDATORY SKILL LOADING — مهارات إجبارية (Non-Negotiable)

> **قبل بدء أي مهمة، يجب عليك تحميل وتطبيق معايير مستوى الخبير لكل التقنيات أدناه.**
> **يجب أن تعمل كمهندس أول/خبير في كل مجال أدناه. لا أنماط مبتدئة. لا أساليب قديمة.**

---

### 🎨 المهارة 1: خبير تصميم واجهات المستخدم (UI/UX Design Expert)
**مستوى أول — يجب تطبيق هذه المبادئ على كل تغيير بصري:**

- **نظام التصميم (Design System)**: كل خاصية بصرية يجب أن ترتبط بـ token مُسمى. لا قيم عشوائية.
- **التسلسل الهرمي البصري (Visual Hierarchy)**: استخدام مقياس الخط، مقياس التباعد، ووزن اللون لإنشاء تسلسل واضح
- **الاتساق (Consistency)**: نفس الأنماط للأغراض نفسها عبر التطبيق بالكامل
- **RTL أولاً (RTL-First)**: كل تخطيط يجب أن يعمل بشكل متطابق في RTL وLTR. استخدم الخصائص المنطقية
- **الوضع الم嘡ضم (Dark Mode Native)**: كل اختيار لون يجب أن يعمل في الفاتح والم嘡ضم. استخدم tokens دلالية
- **التصميم المتجاوب (Responsive Design)**: نهج mobile-first. كل مكون يجب أن يعمل عند 320px و768px و1024px و1280px
- **الميكرو-تفاعلات (Micro-interactions)**: حالات hover وfocus وactive وdisabled لكل العناصر التفاعلية
- **نظام التباعد (Spacing System)**: استخدام tokens تباعد متسقة
- **تركيب المكونات (Component Composition)**: تفضيل التركيب على التكوين
- **الحالات الفارغة (Empty States)**: كل مكون مدعوم بالبيانات يجب أن يتعامل مع حالات فارغة/تحميل/خطأ
- **التسلسل الهرمي المعلوماتي**: المعلومات الأهم أكبر وأقرب للעין
- **إمكانية الوصول البصرية**: تباين الألوان ≥ 4.5:1 للنص العادي، ≥ 3:1 للنص الكبير
- **تصميم المحتوى العربي**: مراعاة خصائص الخط العربي، التباعد، الاتجاه

**مرجع**: Google Material Design 3، Apple HIG، Shadcn/ui patterns

---

### 💚 المهارة 2: خبير فيو جي اس (Vue.js Expert)
**مستوى أول — Vue 3.5+ — يجب استخدام هذه الأنماط وعدم استخدام الأساليب القديمة:**

#### ✅ يجب استخدام:
- `<script setup lang="ts">` لجميع المكونات — Composition API فقط
- `defineProps<>()` و `defineEmits<>()` مع TypeScript generics
- `computed()` لجميع الحالة المشتقة — NEVER compute in template
- `watch()` مع خيارات `deep`/`immediate` عند الحاجة
- `toRef()` / `toRefs()` عند تمرير props إلى composables
- `provide()` / `inject()` للاتصال عبر شجرة المكونات
- `useId()` (Vue 3.5+) لتوليد معرفات فريدة
- `useTemplateRef()` (Vue 3.5+) لمرجع القالب
- Teleport للنوافذ المنبثقة/التولتيب
- Transition + TransitionGroup لجميع الرسوم المتحركة
- Suspense لتحميل المكونات غير المتزامنة
- `v-memo` لتحسين عرض القوائم المكلفة
- `shallowRef()` للكائنات الكبيرة غير التفاعلية
- `v-once` للمحتوى الثابت

#### ❌ NEVER USE (أنماط قديمة/أساليب سيئة):
- Options API (`data()`, `methods:`, `mounted()`)
- `this.$refs`, `this.$emit`, `this.$nextTick`
- التلاعب اليدوي بـ DOM
- `v-html` بدون تنظيف
- تغيير props مباشرة
- `$forceUpdate()` — يدل على تصميم سيئ للتفاعلية
- Mixins — استخدم composables بدلاً منها

**مرجع**: https://vuejs.org/guide/introduction.html (latest)

---

### 🟩 المهارة 3: خبير ناكست (Nuxt Expert)
**مستوى أول — Nuxt 4.x — يجب استخدام هذه الأنماط لكل ميزة خاصة بـ Nuxt:**

#### ✅ يجب استخدام:
- هيكل مجلد `app/` (مُعَايَف Nuxt 4)
- استيراد تلقائي لجميع Vue APIs — NEVER `import { ref } from 'vue'`
- استيراد تلقائي لجميع المكونات
- `useNuxtApp()` للوصول إلى نسخة Nuxt
- `useRuntimeConfig()` لجميع الإعدادات — NEVER `process.env`
- `useFetch()` / `useAsyncData()` لجلب البيانات — NEVER raw `fetch()`
- `$fetch()` لاستدعاءات API أمرية
- `navigateTo()` للتنقل البرمجي — NEVER `window.location`
- `definePageMeta()` لإعدادات مستوى الصفحة
- `useHead()` / `useSeoMeta()` لإدارة العناوين والوصف
- مسارات الخادم في `server/api/` مع `defineEventHandler()`
- Middleware في مجلد `middleware/`
- Plugins في `plugins/`
- `useCookie()` لإدارة الكوكيز — NEVER `document.cookie`
- `import.meta.client` للتحقق من SSR/CSR
- `defineRouteRules()` لقواعد المسار

#### ❌ NEVER USE:
- `process.env` في كود العميل
- `require()` — استخدم ESM imports فقط
- الوصول المباشر لنظام الملفات في المكونات
- `window` / `document` بدون حماية SSR
- عناوين URL ثابتة — استخدم `runtimeConfig` أو مسارات نسبية

**مرجع**: https://nuxt.com/docs (latest)

---

### 🎨 المهارة 4: خبير تايلويند سي اس اس (TailwindCSS Expert)
**مستوى أول — v4.x CSS-First — يجب اتباع مُعَايَفات v4 وليس v3:**

#### ✅ يجب استخدام:
- تكوين CSS-first في `main.css` باستخدام كتلة `@theme` — NO `tailwind.config.js`
- رموز ألوان دلالية: `bg-surface`، `text-foreground`، `border-border`
- tokens تصميم للتباعد: `gap-compact`، `p-content`، `h-component`
- `cn()` (clsx + tailwind-merge) لجميع دمج الفئات — NEVER string concatenation
- CVA (class-variance-authority) لجميع مُتغَيِّرات المكونات
- قيم عشوائية بـ `[]` syntax عندما لا توجد tokens
- Group modifiers: `group-hover:`، `group-focus:`
- Data attributes: `data-[state=open]:`
- الخصائص المنطقية: `inset-inline-start` (ليس `left`)، `margin-inline` (ليس `margin-left`)
- `inset-inline-end` (ليس `right`)، `padding-inline` (ليس `padding-left/right`)

#### ❌ NEVER USE (أنماط v3 أو ممارسات سيئة):
- `tailwind.config.js` أو `tailwind.config.ts` — v4 يستخدم CSS-first
- ألوان ثابتة: `bg-white`، `text-black`، `text-gray-500`، `bg-blue-600`
- قيم عشوائية عندما يوجد token مناسب
- `@apply` للتراكيب المعقدة — استخرج إلى مكونات
- دمج سلاسل نصية للفئات
- `!important` modifier — يدل على فجوة في نظام التصميم
- `left:` و `right:` — استخدم الخصائص المنطقية

**مرجع**: https://tailwindcss.com/docs (v4)

---

### 📘 المهارة 5: خبير تايب سكريبت (TypeScript Expert)
**مستوى أول — يجب كتابة كود آمن الأنواع:**

#### ✅ يجب استخدام:
- الوضع الصارم (Strict mode)
- Interface لأشكال الكائنات، type لل unions/intersections
- أنواع عامة (Generics) للمكونات/الcomposables القابلة لإعادة الاستخدام
- `as const` لاستدلال النوع الحرفي
- `satisfies` للتحقق من النوع بدون توسيع
- `NonNullable<T>`, `Required<T>`, `Partial<T>`, `Pick<T>`, `Omit<T>`
- تصنيف الأحداث بشكل صحيح: `MouseEvent`, `KeyboardEvent`, `PointerEvent`
- `defineProps<Props>()` مع TypeScript

#### ❌ NEVER USE:
- نوع `any` — استخدم `unknown` أو تصنيف مناسب
- تأكيدات النوع (`as X`) بدون مبرر
- `@ts-ignore` — أصلح مشكلة النوع بدلاً من ذلك
- `@ts-expect-error` فقط مع تعليق واضح يشرح السبب

**مرجع**: https://www.typescriptlang.org/docs (latest)

---

### 🍍 المهارة 6: خبير بينيا (Pinia Expert)
**مستوى أول — v3.x — يجب اتباع مُعَايَفات Pinia v3:**

#### ✅ يجب استخدام:
- `defineStore()` مع Composition API (دالة setup) — NOT Options API
- متاجر أحادية الغرض — نطاق واحد لكل متجر
- `storeToRefs()` عند إلغاء تجزئة حالة المتجر في المكونات
- خصائص مُحتسبة للحالة المشتقة
- Actions لجميع التغييرات — لا تغير الحالة مباشرة من المكونات
- `$reset()` لإعادة تعيين المتجر
- `$subscribe()` للاستمرارية/المراقبة

#### ❌ NEVER USE:
- متاجر Options API (`state:`، `getters:`، `actions:`) — استخدم setup stores
- تغيير الحالة مباشرة من المكونات
- المتاجر تستورد حالة متاجر أخرى مباشرة

**مرجع**: https://pinia.vuejs.org/ (latest)

---

### ♿ المهارة 7: خبير إمكانية الوصول (Accessibility Expert)
**مستوى WCAG 2.1 AA — يجب تطبيق هذه على كل مكون:**

#### ✅ يجب القيام به:
- HTML دلالي: `<header>`, `<main>`, `<nav>`, `<aside>`, `<footer>`, `<section>`
- جميع العناصر التفاعلية يمكن الوصول إليها بلوحة المفاتيح: Tab, Enter, Space, Escape
- مؤشرات التركيز المرئية باستخدام token `--shadow-focus`
- `aria-label` أو `aria-labelledby` على جميع العناصر التفاعلية
- `aria-expanded` على مشغلات الإفصاح
- `aria-selected` على العناصر القابلة للتحديد
- `aria-hidden="true"` على الأيقونات/الصور الزخرفية
- `role` attributes حيث HTML الدلالي غير كافٍ
- تباين الألوان ≥ 4.5:1 (نص عادي)، ≥ 3:1 (نص كبير)
- أهداف اللمس ≥ 44×44px
- رابط تخطي التنقل في أعلى الصفحة
- فخ التركيز في النوافذ المنبثقة/الحوارات
- الإعلان عن تغييرات المحتوى الديناميكية بـ `aria-live`
- التسميات والتوضيحات للعناصر التفاعلية
- ترتيب Tab منطقي ومتوقع

**مرجع**: https://www.w3.org/WAI/WCAG21/quickref/ (Level AA)

---

### 🏗️ المهارة 8: خبير هندسة البرمجيات (Software Architecture Expert)
**مستوى أول — يجب تطبيق هذه المبادئ على كل قرار معماري:**

#### ✅ يجب القيام به:
- **فصل الاهتمامات (Separation of Concerns)**: كل وحدة لها مسؤولية واحدة
- **DRY (Don't Repeat Yourself)**: لا تكرر الكود — استخرج إلى composables/utilities
- **KISS (Keep It Simple, Stupid)**: الحل الأبسط هو الأفضل
- **YAGNI (You Aren't Gonna Need It)**: لا تبني ما لا تحتاجه الآن
- **Composition over Inheritance**: تفضيل التركيب على الوراثة
- **Dependency Injection**: استخدام `provide/inject` للخدمات المشتركة
- **Single Responsibility**: كل component/composable/store له مسؤولية واحدة
- **Interface Segregation**: واجهات صغيرة ومحددة
- **Loose Coupling**: مكونات مترابطة بشكل longe عبر interfaces
- **File Organization**: هيكل مجلدات واضح ومتسق:
  - `components/` — PascalCase
  - `composables/` — camelCase مع prefix `use`
  - `stores/` — camelCase
  - `utils/` — camelCase
  - `types/` — camelCase
- **Naming Conventions**: أسماء وصفية ومتسقة
- **Code Splitting**: تقسيم الكود حسب المسار تلقائياً
- **Dependency Management**: الحد الأدنى من التبعيات، تحديث منتظم

---

### 🔍 المهارة 9: خبير تحسين محركات البحث (SEO Expert)
**مستوى أول — يجب تطبيق هذه على كل صفحة:**

#### ✅ يجب القيام به:
- **Meta Tags فريدة**: كل صفحة لها `<title>`, meta description, canonical URL فريد
- **Open Graph**: `og:title`, `og:description`, `og:image`, `og:url` لكل صفحة
- **Twitter Cards**: `twitter:card`, `twitter:title`, `twitter:description`
- **Structured Data (Schema.org)**: `WebSite`, `Organization`, `JobPosting`, `BreadcrumbList`
- **الروابط الكنسية (Canonical URLs)**: كل صفحة لها canonical URL
- ** robots.txt**: تكوين صحيح للسماح/الحظر
- **sitemap.xml**: يحتوي على جميع المسارات العامة
- **العناوين الهرمية**: `h1` واحد لكل صفحة، تسلسل منطقي `h1` → `h2` → `h3`
- **سرعة الصفحة**: Core Web Vitals في النطاق الأخضر
- **البيانات الوصفية للصور**: `alt` نص بديل لجميع الصور
- **الروابط الداخلية**: روابط وصفية بين الصفحات ذات الصلة
- **Hreflang**: لدعم اللغات المتعددة
- **OG Images**: توليد تلقائي 1200×630

**مرجع**: https://developers.google.com/search/docs (latest)

---

### ⚡ المهارة 10: خبير الأداء والسرعة (Performance Expert)
**مستوى أول — Core Web Vitals — يجب تحسين هذه المقاييس:**

#### المقاييس الأساسية (Core Web Vitals):
- **LCP (Largest Contentful Paint)**: ≤ 2.5 ثانية — أكبر عنصر مرئي يُحمّل بسرعة
- **FID (First Input Delay)**: ≤ 100ms — الاستجابة الأولى للتفاعل
- **CLS (Cumulative Layout Shift)**: ≤ 0.1 — عدم ارتداد التخطيط
- **INP (Interaction to Next Paint)**: ≤ 200ms — استجابة التفاعل

#### ✅ يجب القيام به:
- تحميل بطيء للمكونات الثقيلة بـ `defineAsyncComponent()`
- تقسيم الكود حسب المسار — Nuxt يفعل هذا تلقائياً
- استخدام `v-memo` لعروض القوائم المكلفة
- تحسين الصور: `@nuxt/image`، أحجام مناسبة، تحميل بطيء
- تصغير حجم الحزمة — استيرادات قابلة للاهتزاز
- استخدام `computed()` بدل `watch()` عند الإمكان (أكثر كفاءة)
- تأخير العمليات المكلفة بـ `useDebounceFn()`
- `shallowRef()` للكائنات الكبيرة غير التفاعلية
- تجنب إعادة العرض غير الضرورية — `v-once` للمحتوى الثابت
- تحميل مسبق للموارد الحرجة، تحميل مسبق للمسار التالي
- تقسيم الحزم (Chunk Splitting) في Vite
- CSS Purging فعال
- PWA manifest كامل
- Lazy loading للصور والخطوط

**مرجع**: https://web.dev/vitals/ (Core Web Vitals)

---

### 📱 المهارة 11: خبير التصميم المتجاوب (Responsive Design Expert)
**مستوى أول — Mobile-First — يجب اختبار كل مكون على جميع الأحجام:**

#### نقاط التوقف (Breakpoints):
- **320px**: أصغر هاتف — يجب أن يعمل بدون overflow
- **375px**: هاتف iPhone القياسي
- **768px**: لوحي — تكيف التنقل
- **1024px**: لوحي أفقي / لابتوب صغير
- **1280px**: سطح مكتب كامل

#### ✅ يجب القيام به:
- نهج Mobile-First: أنماط CSS الأساسية للموبايل، ثم `@media` للكبير
- أهداف لمس ≥ 44×44px لكل العناصر التفاعلية
- عدم overflow أفقي عند أي حجم
- خطوط قابلة للقراءة عند جميع الأحجام (≥ 16px للنص الأساسي)
- تباعد مناسب بين العناصر القابلة للنقر
- صور متجاوبة مع `srcset` و `sizes`
- تخطيطات مرنة باستخدام CSS Grid و Flexbox
- RTL يعمل بشكل متطابق في جميع الأحجام
- الوضع الم嘡ضم يعمل في جميع الأحجام
- تصفح لوحة المفاتيح يعمل في جميع الأحجم

---

### 🔒 المهارة 12: خبير الأمان (Security Expert)
**مستوى أول — OWASP Top 10 — يجب تطبيق هذه على جميع الكود:**

#### ✅ يجب القيام به:
- لا أسرار في حزمة العميل — استخدم `runtimeConfig` server-only keys
- لا `process.env` في كود العميل
- HTTP-only cookies لرموز المصادقة (NOT localStorage)
- CSP headers بدون `'unsafe-eval'`/`'unsafe-inline'`
- التحقق من صحة المدخلات في مسارات الخادم
- منع XSS: لا `v-html` غير نظيف
- حماية CSRF للعمليات المُغَيِّرة للحالة
- تحديد معدل الطلبات (Rate Limiting) على نقاط نهاية API
- Content Security Policy headers
- تكوين CORS مناسب
- التحقق من صحة Zod لجميع النماذج
- إخفاء أخطاء الخادم عن العميل
- استخدام HTTPS فقط

#### ❌ NEVER DO:
- تخزين بيانات حساسة في localStorage
- الاعتماد على التحقق من جانب العميل فقط
- كشف عناوين URL الداخلية في حزمة العميل
- استخدام `eval()` أو `new Function()`
- تخزين كلمات المرور كنص عادي

**مرجع**: https://nuxt.com/docs/guide/concepts/security + OWASP Top 10

---

### 🎨 المهارة 13: خبير نظام التصميم (Design System Expert)
**مستوى أول — يجب الالتزام بجميع tokens التصميم:**

#### ✅ يجب استخدام:
- **Tokens الألوان الدلالية**: `bg-surface`, `text-foreground`, `border-border`, `bg-primary`, `text-muted-foreground`
- **Tokens التباعد**: `gap-compact`, `p-content`, `h-component`, `px-element`
- **Tokens الخط**: `text-ds-display-*`, `text-ds-h*`, `text-ds-subtitle-*`, `text-ds-body-*`, `text-ds-caption-*`, `text-ds-label-*`
- **Tokens الحدود**: `rounded-none`, `border-ds-border`
- **Tokens الظلال**: `shadow-sm`, `shadow-md`, `shadow-lg`
- **Tokens الانتقال**: `duration-fast` (150ms), `duration-normal` (200ms), `duration-base` (250ms), `duration-slow` (350ms)
- **CVA للأنماط**: جميع المكونات متعددة الأنماط تستخدم `cva()`
- **cn() للدمج**: جميع عمليات دمج الفئات تستخدم `cn()`
- **ألوان الـ Shell**: `bg-shell-bg`, `text-white`, `bg-white/10` (في header/footer/hero فقط)

#### ❌ NEVER USE:
- ألوان ثابتة: `bg-white`, `text-gray-*`, `bg-blue-*`, `#hex`
- قيم عشوائية للتباعد عندما يوجد token
- أحجام خط ثابتة عندما يوجد token
- ظلال عشوائية عندما يوجد token
- `!important`

---

### 🧪 المهارة 14: خبير الاختبار (Testing Expert)
**مستوى أول — يجب تطبيق هذه المبادئ:**

#### ✅ يجب القيام به:
- **اختبارات الوحدة (Unit Tests)**: Vitest للـ composables/utilities/logic
- **اختبارات المكونات**: اختبار كل مكون في العزل والتكامل
- **اختبارات E2E**: Playwright للتدفقات الحرجة
- **اختبارات Accessibility**: `eslint-plugin-vuejs-accessibility`
- **اختبارات التكامل**: API mocking للعمليات غير المتزامنة
- **تغطية الكود**: استهداف ≥ 80% للتغطية
- **اختبار الحواف**: حالات فارغة، أخطاء، بيانات غير متوقعة
- **اختبار RTL**: التخطيط يعمل في RTL
- **اختبار الوضع الم嘡ضم**: جميع المكونات تعمل في الوضعين
- **اختبار المتجاوب**: جميع نقاط التوقف

**مرجع**: https://vitest.dev/ + https://playwright.dev/ (latest)

---

## 🧠 ADDITIONAL MANDATORY SKILLS — مهارات إضافية إجبارية

> **هذه المهارات الإضافية ضرورية لضمان عمل دقيق ومنطقي وسليم في كل مرة**

---

### 🔧 المهارة 15: خبير معالجة البيانات (Data Handling Expert)
**مستوى أول — يجب تطبيق هذه على كل عملية جلب/حفظ بيانات:**

#### ✅ يجب القيام به:
- **Cache Strategy**: تحديد `staleTime` و `gcTime` لكل نوع بيانات (Vue Query)
- **Optimistic Updates**: تحديث الواجهة فوراً، ثم التراجع عند الفشل
- **Error Boundaries**: كل عملية async يجب أن يكون لها معالج خطأ
- **Loading States**: كل عملية async يجب أن تعرض حالة تحميل
- **Empty States**: كل قائمة/بيانات يجب أن تعرض حالة "لا توجد بيانات"
- **Retry Logic**: معالجة فشل الشبكة بإعادة المحاولة
- **Data Normalization**: توحيد أشكال البيانات من مصادر مختلفة
- **Type Safety**: كل API response يجب أن يكون مُصنّف TypeScript

#### 🧠 تفكير نقدي:
- ما هي `staleTime` المناسبة لهذا النوع من البيانات؟
- هل البيانات حساسة للتوقيت؟
- ماذا يحدث عند فشل الشبكة؟
- هل المستخدم يرى حالة التحميل؟

---

### 🔧 المهارة 16: خبير نمط التنفيذ היחיד (Single Implementation Pattern Expert)
**مستوى أول — لا يجوز وجود طريقتين لعمل نفس الشيء:**

#### القواعد الإلزامية:
- **طريقة واحدة فقط** لكل task type
- **عند اكتشاف نمطين متعارضين**: اختر الأفضل، احذف الآخر، وحد المعايير
- **لا يجوز الاحتفاظ بـ "للتوافق مع الكود القديم"** — إذا كان نمط قديم، احذفه
- **كل تغيير يجب أن يوحد الاتجاه** — لا تزيد من التشتت

#### 🧠 تفكير نقدي:
- هل هذا النمط موجود في مكان آخر بطريقة مختلفة؟
- هل يمكن توحيد هذه الطريقة مع النمط الموجود؟
- ما هو النمط الأفضل للمشروع؟

---

### 🔧 المهارة 17: خبير حل التعارضات (Conflict Resolution Expert)
**مستوى أول — عند تعارض معيارين أو نمطين:**

#### بروتوكول الحل:
1. **تحديد التعارض**: ما هما النمطان المتعارضان؟
2. **تحديد الأفضل**: أيهما أكثر حداثة/أمان/أداء؟
3. **تحديد التأثير**: ما الذي سيتغير إذا اخترت أحدهما؟
4. **التنفيذ**: حذف الأسوأ، تطبيق الأفضل، تحديث كل المواقع
5. **التوثيق**: تحديث `docs/STANDARDS.md`

#### أولويات الحل (من الأعلى للأدنى):
1. الأمان (Security) → 2. الوظيفة (Functionality) → 3. الأداء (Performance) → 4. إمكانية الوصول (Accessibility) → 5. قابلية الصيانة (Maintainability) → 6. الاتساق (Consistency)

---

### 🔧 المهارة 18: خبير تنظيف الذاكرة (Cleanup Expert)
**مستوى أول — يجب منع تسريبات الذاكرة:**

#### ✅ يجب القيام به:
- **Event Listeners**: كل `addEventListener` يجب أن يكون له `removeEventListener` في cleanup
- **Timers**: كل `setTimeout`/`setInterval` يجب أن يكون له `clearTimeout`/`clearInterval`
- **Observers**: كل `IntersectionObserver`/`MutationObserver`/`ResizeObserver` يجب أن يكون له `disconnect()`
- **Watchers**: `watch()` قد تحتاج `stop()` في cleanup
- **Composables**: كل composable يجب أن ينظف موارده في `onUnmounted`
- **WebSockets**: إغلاق الاتصال عند إلغاء المكون

#### ❌ NEVER:
- ترك event listeners بدون cleanup
- استخدام `setInterval` بدون `clearInterval`
- ترك observers متصلة بعد إلغاء المكون

---

### 🔧 المهارة 19: خبير UX Patterns (UX Pattern Expert)
**مستوى أول — يجب تطبيق أنماط UX متسقة:**

#### ✅ يجب استخدام:
- **Loading Skeletons**: `BaseSkeleton` للتحميل الأولي
- **Error Messages**: رسائل خطأ واضحة ومفهومة
- **Success Feedback**: تأكيد مرئي للعمليات الناجحة
- **Form Validation**: تحقق فوري + عند الإرسال
- **Confirmation Dialogs**: تأكيد قبل العمليات المدمرة (حذف، إلغاء)
- **Empty States**: رسائل واضحة عند عدم وجود بيانات
- **Retry Buttons**: زر إعادة المحاولة عند الفشل
- **Progressive Disclosure**: إظهار المعلومات تدريجياً

#### نمط Loading State:
```typescript
const { data, isLoading, error } = useQuery({...})
// في القالب:
// isLoading → BaseSkeleton
// error → رسالة خطأ + زر إعادة المحاولة
// data === [] → Empty State
// data → المحتوى
```

---

### 🔧 المهارة 20: خبير أنماط الخطأ (Error Handling Expert)
**مستوى أول — كل عملية قد تفشل يجب أن تعالج الخطأ:**

#### ✅ يجب استخدام:
- **try/catch**: لكل عملية async
- **Error Types**: تصنيف الأخطاء (NetworkError, ValidationError, AuthError)
- **Fallback UI**: واجهة بديلة عند حدوث خطأ
- **Error Logging**: تسجيل الأخطاء في Sentry
- **User-friendly Messages**: رسائل خطأ مفهومة للمستخدم (بالعربي)
- **Recovery Actions**: ماذا يفعل المستخدم عند الخطأ؟

#### ❌ NEVER:
- تجاهل أخطاء Promise (unhandled promise rejection)
- عرض stack trace للمستخدم
- `console.error` بدون تسجيل في Sentry

---

### 🔧 المهارة 21: خبير تكامل المكونات (Integration Expert)
**مستوى أول — يجب التأكد أن كل تغيير يعمل مع بقية النظام:**

#### ✅ يجب التحقق:
- **Cross-component communication**: هل التغيير يؤثر على المكونات الأخرى؟
- **Store consistency**: هل المتاجر لا تزال متسقة بعد التغيير؟
- **Route integrity**: هل التنقل لا يزال يعمل؟
- **SSR/CSR boundary**: هل التغيير يعمل في كلا الجانبين؟
- **RTL/LTR parity**: هل التغيير يعمل في كلا الاتجاهين؟
- **Dark/Light parity**: هل التغيير يعمل في كلا الوضعين؟

#### بروتوكول التحقق التكاملي:
```
1. أقرأ الملف المعدل بالكامل
2. أقرأ كل ملف يستورد الملف المعدل
3. أقرأ كل ملف يستورده الملف المعدل
4. أتحقق من كل interface/type متشارك
5. أعمل pnpm typecheck
6. أعمل conflict greps
```

---

### 🔧 المهارة 22: خبير الاتساق (Consistency Expert)
**مستوى أول — يجب أن يكون لكل شيء طريقة واحدة:**

#### قواعد الاتساق:
- **طريقة واحدة للبيانات التفاعلية**: `const x = ref<T>()`
- **طريقة واحدة لاستعلام البيانات**: `useQuery()` من Vue Query
- **طريقة واحدة لتنسيق التواريخ**: `date-fns`
- **طريقة واحدة للإشعارات**: `toast()` من vue-sonner
- **طريقة واحدة لدمج الفئات**: `cn()` من tailwind-merge
- **طريقة واحدة لمتغيرات المكونات**: CVA
- **طريقة واحدة للتنقل**: `navigateTo()`
- **طريقة واحدة للـ SEO**: `useHead()` + `useSeoMeta()`
- **طريقة واحدة للتحقق من النماذج**: vee-validate + Zod
- **طريقة واحدة للـ i18n**: `$t()` / `useI18n()`

#### عند اكتشاف نمط مختلف:
1. سجل الاختلاف
2. اختر النمط الأفضل
3. وحّد كل الأمثلة للنمط المختار
4. احذف الأنماط الأخرى
5. وثّق في `docs/STANDARDS.md`

---

## 📐 ARCHITECTURAL STANDARDS

**This project follows these non-negotiable standards:**

1. **Components**: PascalCase, CVA variants, `cn()` for class merging, reka-ui primitives
2. **Composables**: camelCase, `use` prefix, auto-imported by Nuxt
3. **Stores**: camelCase, Pinia, `defineStore()`, single-purpose
4. **Imports**: Nuxt auto-imports (no explicit `from 'vue'`), `~/` alias
5. **Styling**: Semantic tokens only, no hardcoded colors, RTL-first
6. **i18n**: All user-facing text via `$t()` / `useI18n()`
7. **Accessibility**: WCAG 2.1 AA minimum
8. **Security**: No `process.env` in client, no `localStorage` for sensitive data
9. **Performance**: Core Web Vitals in green zone
10. **SEO**: All pages have unique title, description, structured data
11. **Responsive**: Works at 320px, 768px, 1024px, 1280px
12. **Design System**: All visual values use tokens, no arbitrary values

---

## 🎯 SUCCESS CRITERIA

**A task is ONLY considered complete when:**

1. ✅ All requirements from the plan are met
2. ✅ All files are verified (read back after changes)
3. ✅ `pnpm typecheck` passes
4. ✅ All conflict greps return expected results
5. ✅ Documentation is updated (task.md, STANDARDS.md, PHASE_COMPLETION_LOG.md)
6. ✅ User receives a complete report with proof
7. ✅ ALL skill standards above were followed and verified
8. ✅ RTL and Dark Mode both work correctly
9. ✅ Responsive at all breakpoints
10. ✅ Accessibility (WCAG 2.1 AA) maintained

---

**Last Updated**: 2026-03-12
**Enforcement**: MANDATORY for ALL AI agents working on this project
**File Count**: 14 skills, 22 technologies, 9 gates, 10 success criteria

---

## 🧠 MANDATORY TOOL SKILLS — مهارات إجبارية لكل أداة

> **قبل استخدام أي أداة/مكتبة: يجب عليك فهم الإصدار المثبت لدينا، وفهم أحدث وأفضل ممارسات هذه الأداة، وتطبيق مستوى خبير.**

---

### 🔧 الأداة 1: VueUse (@vueuse/core)
**الاسم**: فيو يوز | **الإصدار**: `14.2.1` | **المرجع**: https://vueuse.org/

**هذه أداة أساسية في مشروعنا — نستخدمها لجميع تفاعلات المتصفح بدلاً من APIs اليدوية**

#### ✅ يجب استخدام (بدلاً من اليدوي):
- `onClickOutside(ref, cb)` ← `document.addEventListener('click')`
- `onKeyStroke(key, cb)` ← `document.addEventListener('keydown')`
- `useToggle(false)` ← `ref(false)` + دالة toggle
- `useScrollLock(el)` ← `document.body.style.overflow`
- `useLocalStorage(key, def)` ← `localStorage.getItem/setItem`
- `useWindowSize()` ← `window.addEventListener('resize')`
- `useMediaQuery(q)` ← `window.matchMedia()`
- `useDebounceFn(fn, ms)` ← `setTimeout` يدوي
- `useScroll(el)` ← `window.addEventListener('scroll')`
- `useElementVisibility(ref)` ← `IntersectionObserver` يدوي
- `useClipboard()` ← `navigator.clipboard` يدوي
- `useNetwork()` ← `navigator.onLine`
- `useFullscreen()` ← `element.requestFullscreen()` يدوي

#### 🧠 تفكير نقدي: هل يدعم SSR؟ هل يحتاج cleanup تلقائي؟

---

### 🔧 الأداة 2: Reka UI (reka-ui)
**الاسم**: ريكة يو آي | **الإصدار**: `2.9.0` | **المرجع**: https://reka-ui.com/

**مكتبة مكونات بدائية (headless) — للحوارات، القوائم، التبويبات، vv**

#### 🧠 تفكير نقدي: هل يدعم RTL؟ هل يحتاج Teleport؟

---

### 🔧 الأداة 3: TanStack Vue Query
**الاسم**: فيو كويري | **الإصدار**: `5.92.9` | **المرجع**: https://tanstack.com/query/latest

**إدارة جلب البيانات وحالتها**

#### 🧠 تفكير نقدي: ما هي staleTime المناسبة؟ متى أستخدم queryKey مع params؟

---

### 🔧 الأداة 4: TanStack Vue Table
**الاسم**: فيو تيبل | **الإصدار**: `8.21.3`

---

### 🔧 الأداة 5: TanStack Vue Virtual
**الاسم**: فيو فيرتشوال | **الإصدار**: `3.13.21` — للقوائم الطويلة

---

### 🔧 الأداة 6: Tiptap Editor
**الاسم**: تيبتاب | **الإصدار**: `3.20.1` | **المرجع**: https://tiptap.dev/

**محرر نصوص rich text**

#### 🧠 تفكير نقدي: كيف أتعامل مع SSR؟ (Tiptap يحتاج عميل فقط)

---

### 🔧 الأداة 7: VeeValidate + Zod
**الاسم**: في فاليدات + زود | **الإصدار**: `4.15.1` + `3.25.76`

**التحقق من صحة النماذج**

#### 🧠 تفكير نقدي: هل رسائل الخطأ تستخدم i18n؟

---

### 🔧 الأداة 8: Vue Sonner
**الاسم**: فيو سونر | **الإصدار**: `2.0.9`

**نظام الإشعارات (Toasts)**

---

### 🔧 الأداة 9: @nuxtjs/color-mode
**الاسم**: ناكست كولور مود | **الإصدار**: `4.0.0` — الوضع المظلم/الفاتح

#### ❌ NEVER: `localStorage.setItem('theme')` يدوياً

---

### 🔧 الأداة 10: @nuxtjs/i18n
**الاسم**: ناكست i18n | **الإصدار**: `10.2.3` — التدويل

---

### 🔧 الأداة 11: nuxt-auth-utils
**الاسم**: ناكست أوث يوتيلز | **الإصدار**: `0.5.29` — المصادقة

---

### 🔧 الأداة 12: @nuxt/image
**الاسم**: ناكست إيمج | **الإصدار**: `2.0.0` — تحسين الصور

---

### 🔧 الأداة 13: @nuxt/scripts
**الاسم**: ناكست سكريبتز | **الإصدار**: `0.13.2` — نصوص خارجية

---

### 🔧 الأداة 14: nuxt-security
**الاسم**: ناكست سيكيوريتي | **الإصدار**: `2.5.1` — أمان HTTP

#### 🧠 تفكير نقدي: هل CSP مفعل؟ هل هناك unsafe-eval؟

---

### 🔧 الأداة 15: @sentry/nuxt
**الاسم**: سينتري | **الإصدار**: `10.43.0` — مراقبة الأخطاء

#### 🧠 تفكير نقدي: هل يستخدم process.env؟ (يجب runtimeConfig)

---

### 🔧 الأداة 16: @vite-pwa/nuxt
**الاسم**: بي دبليو ايه | **الإصدار**: `1.1.1` — تطبيق تدريجي

---

### 🔧 الأداة 17: ESLint
**الاسم**: إيس لينت | **الإصدار**: `9.39.2` | **الأمر**: `pnpm lint`

---

### 🔧 الأداة 18: Vitest
**الاسم**: فيتست | **الإصدار**: `4.0.18` | **الأمر**: `pnpm test`

---

### 🔧 الأداة 19: Playwright
**الاسم**: بلاي رايت | **الإصدار**: `1.58.2` | **الأمر**: `pnpm test:e2e`

---

### 🔧 الأداة 20: Chart.js + vue-chartjs
**الاسم**: تشارت جي اس | **الإصدار**: `4.5.1` + `5.3.3`

#### 🧠 تفكير نقدي: هل يدعم SSR؟ (لا — استخدم `<ClientOnly>`)

---

### 🔧 الأداة 21: Leaflet + vue-leaflet
**الاسم**: ليفليت | **الإصدار**: `1.9.4` + `0.10.1` — خرائط

#### 🧠 تفكير نقدي: هل يدعم SSR؟ (لا — استخدم `<ClientOnly>`)

---

### 🔧 الأداة 22: Swiper
**الاسم**: سوايبر | **الإصدار**: `12.1.2` — شرائح

---

### 🔧 الأداة 23: date-fns
**الاسم**: ديت اف ان اس | **الإصدار**: `4.1.0` — تواريخ

---

### 🔧 الأداة 24: Zod
**الاسم**: زود | **الإصدار**: `3.25.76` — تحقق من البيانات

---

### 🔧 الأداة 25: @formkit/auto-animate
**الاسم**: أوتو أنيميت | **الإصدار**: `0.9.0` — رسوم متحركة تلقائية

---

### 🔧 الأداة 26: nuxt-schema-org
**الاسم**: سكيما اورج | **الإصدار**: `5.0.10` — بيانات منظمة SEO

---

### 🔧 الأداة 27: nuxt-og-image
**الاسم**: او جي ايمج | **الإصدار**: `5.1.13` — صور Open Graph

---

### 🔧 الأداة 28: nuxt-robots + nuxt-sitemap
**الاسم**: روبوتس + سايت ماب | **الإصدار**: `5.7.1` + `7.6.0`

---

### 🔧 الأداة 29: TailwindCSS Vite Plugin
**الاسم**: تايلويند فيت | **الإصدار**: `4.2.1`

---

### 🔧 الأداة 30: clsx + tailwind-merge
**الاسم**: كلاسكس + تايلويند ميرج | **الإصدار**: `2.1.1` + `3.5.0`

**تستخدم مع `cn()` لدمج الفئات — NEVER string concatenation**

---

### 🔧 الأداة 31: class-variance-authority (CVA)
**الاسم**: سي في ايه | **الإصدار**: `0.7.1`

**تستخدم لتعريف أنماط المكونات المتعددة — NEVER inline conditional classes**

---

## 🧠 THINKING PROTOCOLS — بروتوكولات التفكير الإجبارية

### 🔍 التفكير النقدي المستمر (Critical Thinking)
**في كل قرار تقني يجب أن تسأل:**
- لماذا هذا الخيار وليس غيره؟
- ما هي البدائل المتاحة؟
- هل هذا يتوافق مع النسخة المثبتة؟
- هل هذا سيعمل في SSR؟ RTL؟ الوضع الم⇜ضم؟

### 🔍 التفكير المعماري (Architectural Thinking)
**في كل تغيير يجب أن تسأل:**
- ما هي التبعيات المتأثرة؟
- هل هذا يكسر شيئاً آخر؟
- هل هذا يتوافق مع أنماط المشروع؟
- هل هذا يحسن أم يعقد الكود؟

### 🔍 البحث المستمر (Continuous Research)
**قبل استخدام أي API:**
- ابحث في الوثائق الرسمية للنسخة المثبتة
- تحقق من breaking changes
- ابحث عن أفضل الممارسات الحديثة

### 🔍 سؤال المستخدم (Ask the User)
**اسأل عندما:**
- هناك أكثر من طريقة صحيحة
- القرار يؤثر على تجربة المستخدم بشكل كبير
- هناك تناقض بين المتطلبات
