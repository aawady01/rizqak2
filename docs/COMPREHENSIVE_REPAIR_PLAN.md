# خطة الإصلاح الشامل لمشروع Rizqak2

## نظرة عامة
هذه الخطة تفصيلية ودقيقة لإصلاح جميع المشاكل المكتشفة في المشروع، مرتبة حسب الأولوية مع خطوات تنفيذية واضحة.

---

## المرحلة 1: إصلاح صفحة تفاصيل الوظيفة `jobs/[slug].vue` (الأولوية القصوى)

### 1.1 تحويل النصوص العربية الثابتة إلى مفاتيح i18n

**المشكلة:** ~50+ نص عربي مدمج مباشرة في الصفحة بدلاً من استخدام نظام i18n.

**الخطوات:**

#### أ) إضافة مفاتيح i18n للملف العربي `i18n/locales/ar.json`:

```json
{
  "jobDetail": {
    "sidebar": {
      "follow": "متابعة",
      "followers": "متابع",
      "verified": "موثق",
      "ratings": "تقييم",
      "interestedInJob": "مهتم بالوظيفة",
      "jobsAvailable": "وظيفة متاحة",
      "callPublisher": "اتصل بالناشر",
      "whatsappContact": "تواصل عبر واتساب",
      "sendMessage": "إرسال رسالة",
      "originalAdLink": "رابط الإعلان الأصلي",
      "safetyWarning": "لا تقم بدفع أي مبالغ مالية مقابل التوظيف. تأكد من هوية المعلن قبل إرسال أي بيانات شخصية.",
      "location": "الموقع",
      "license": "ترخيص"
    },
    "benefits": {
      "title": "المميزات والراتب",
      "baseSalary": "الراتب الأساسي",
      "contractDuration": "مدة العقد",
      "requiredCount": "العدد المطلوب"
    },
    "requirements": {
      "title": "شروط الوظيفة",
      "personalSpecs": "المواصفات الشخصية"
    },
    "additionalInfo": {
      "title": "تفاصيل إضافية",
      "interviewInfo": "معلومات المقابلة:",
      "interviewWithOwner": "المقابلات مع صاحب الشركة مباشرة."
    },
    "comments": {
      "title": "التعليقات",
      "placeholder": "أضف تعليقاً على الوظيفة...",
      "submit": "إرسال",
      "like": "إعجاب",
      "dislike": "عدم إعجاب",
      "reply": "رد"
    },
    "status": {
      "available": "متاحة الآن",
      "postedAgo": "نشرت منذ {time}",
      "category": "التصنيف",
      "company": "الشركة",
      "publishDate": "تاريخ النشر"
    }
  }
}
```

#### ب) إضافة مفاتيح i18n للملف الإنجليزي `i18n/locales/en.json`:

```json
{
  "jobDetail": {
    "sidebar": {
      "follow": "Follow",
      "followers": "Followers",
      "verified": "Verified",
      "ratings": "Ratings",
      "interestedInJob": "Interested in job",
      "jobsAvailable": "Jobs available",
      "callPublisher": "Call publisher",
      "whatsappContact": "Contact via WhatsApp",
      "sendMessage": "Send message",
      "originalAdLink": "Original ad link",
      "safetyWarning": "Do not pay any money for employment. Verify the advertiser identity before sending any personal data.",
      "location": "Location",
      "license": "License"
    },
    "benefits": {
      "title": "Benefits and Salary",
      "baseSalary": "Base Salary",
      "contractDuration": "Contract Duration",
      "requiredCount": "Required Count"
    },
    "requirements": {
      "title": "Job Requirements",
      "personalSpecs": "Personal Specifications"
    },
    "additionalInfo": {
      "title": "Additional Details",
      "interviewInfo": "Interview Information:",
      "interviewWithOwner": "Interviews directly with the company owner."
    },
    "comments": {
      "title": "Comments",
      "placeholder": "Add a comment about this job...",
      "submit": "Submit",
      "like": "Like",
      "dislike": "Dislike",
      "reply": "Reply"
    },
    "status": {
      "available": "Available Now",
      "postedAgo": "Posted {time} ago",
      "category": "Category",
      "company": "Company",
      "publishDate": "Publish Date"
    }
  }
}
```

#### ج) استبدال النصوص الثابتة في القالب:
- كل نص عربي ثابت يُستبدل بـ `$t('jobDetail.sidebar.follow')` أو المفتاح المناسب
- الامثلة:
  - `متابعة` → `{{ $t('jobDetail.sidebar.follow') }}`
  - `موثق` → `{{ $t('jobDetail.sidebar.verified') }}`
  - `المميزات والراتب` → `{{ $t('jobDetail.benefits.title') }}`
  - `شروط الوظيفة` → `{{ $t('jobDetail.requirements.title') }}`
  - `تفاصيل إضافية` → `{{ $t('jobDetail.additionalInfo.title') }}`
  - `التعليقات` → `{{ $t('jobDetail.comments.title') }}`
  - `متاحة الآن` → `{{ $t('jobDetail.status.available') }}`
  - `نشرت منذ 4 ساعات` → `{{ $t('jobDetail.status.postedAgo', { time: '4 ساعات' }) }}`

### 1.2 ربط الصفحة ببيانات `detail` المحسوبة

**المشكلة:** الصفحة تحسب `detail` من `getJobDetailView()` لكنها لا تستخدمه في القالب.

**الخطوات:**

#### أ) نقل البيانات الثابتة إلى mockData أو إلى بيانات detail:
- `publisherBenefits` → `detail.value.benefits`
- `personalSpecs` → `detail.value.personalSpecs`
- `leftRequirementItems` → `detail.value.requirements.left`
- `rightRequirementItems` → `detail.value.requirements.right`
- `comments` → `detail.value.comments`
- `companyLogo` → `detail.value.company.logo`
- `pageTitle` → `detail.value.title`

#### ب) تحديث القالب لاستخدام detail:
```vue
<!-- بدلاً من -->
<h2>{{ pageTitle }}</h2>
<!-- يصبح -->
<h2>{{ detail.title }}</h2>
```

### 1.3 حذف الدوال غير المستخدمة

**الخطوات:**
- حذف `_handleShare` (سطر 179)
- حذف `_toggleDark` (سطر 211)
- حذف `_goBack` (سطر 216)
- حذف الاستيرادات غير المستخدمة الناتجة (مثل `useClipboard` إذا لم يعد يُستخدم)

### 1.4 تنظيف أنماط Dark Mode المكررة

**المشكلة:** تكرار `dark:border-border` و `dark:bg-surface` و `dark:text-foreground` بشكل مفرط (~30+ مرة).

**الخطوات:**
- مراجعة كل عنصر في القالب
- إذا كان النظام يتعامل مع dark mode تلقائياً عبر CSS variables، حذف الأنماط المكررة
- امثلة للتنظيف:
  - `class="border border-border dark:border-border"` → `class="border border-border"`
  - `class="bg-surface dark:bg-surface"` → `class="bg-surface"`
  - `class="text-foreground dark:text-foreground"` → `class="text-foreground"`

### 1.5 استبدال `rounded-none` بأنماط التصميم الأصلية

**المشكلة:** استخدام `rounded-none` في كل عنصر تقريباً.

**الخطوات:**
- حذف `rounded-none` من العناصر التي لا تحتاجه
- استخدام أنماط التصميم الأصلية مثل `rounded-md` أو `rounded-lg` حسب نظام التصميم
- أو الاعتماد على القيم الافتراضية بدون إضافة class اضافي

---

## المرحلة 2: إصلاح صفحة قائمة الوظائف `jobs/index.vue`

### 2.1 إصلاح منطق الترتيب

**المشكلة:** فرز `views` يستخدم `b.id` بدلاً من عدد مشاهدات حقيقي.

**الخطوات:**
```typescript
// بدلاً من
if (sortBy.value === 'views') {
  return jobs.sort((a, b) => (b.id > a.id ? 1 : -1))
}

// يصبح (بعد إضافة حقل views للبيانات)
if (sortBy.value === 'views') {
  return jobs.sort((a, b) => (b.views || 0) - (a.views || 0))
}
```

### 2.2 إصلاح فرز الراتب

**المشكلة:** محاولة استخراج ارقام من ترجمة i18n غير موثوقة.

**الخطوات:**
```typescript
// بدلاً من
const numA = parseInt(t(a.salary).replace(/[^0-9]/g, '')) || 0

// يصبح (استخدام حقل رقمي مباشر)
if (sortBy.value === 'salary') {
  return jobs.sort((a, b) => (b.salaryAmount || 0) - (a.salaryAmount || 0))
}
```

---

## المرحلة 3: تحسين بنية البيانات الوهمية

### 3.1 إضافة حقول مفقودة إلى mockData

**الخطوات:**
- إضافة حقل `views` لكل وظيفة
- إضافة حقل `salaryAmount` رقمي لكل وظيفة
- إضافة حقل `benefits` لكل وظيفة
- إضافة حقل `requirements` لكل وظيفة
- إضافة حقل `personalSpecs` لكل وظيفة
- إضافة حقل `comments` لكل وظيفة

### 3.2 تحديث `getJobDetailView` ليشمل كل البيانات

**الخطوات:**
- التأكد من أن الدالة تُرجع كل البيانات المطلوبة لصفحة التفاصيل
- نقل البيانات الثابتة من `[slug].vue` إلى بنية البيانات

---

## المرحلة 4: تنظيف عام

### 4.1 حذف ملف `nul` من جذر المشروع

### 4.2 مراجعة ملفات i18n للتأكد من اكتمال الترجمات

### 4.3 تشغيل typecheck للتأكد من عدم وجود اخطاء TypeScript

---

## ترتيب التنفيذ المقترح

| الخطوة | المهمة | الملفات المتأثرة | الوقت المقدر |
|--------|--------|------------------|--------------|
| 1.1 | إضافة مفاتيح i18n | `i18n/locales/ar.json`, `i18n/locales/en.json` | 30 دقيقة |
| 1.2 | ربط الصفحة ببيانات detail | `app/pages/jobs/[slug].vue`, `app/shared/utils/mockData.ts`, `app/shared/utils/jobDetails.ts` | 45 دقيقة |
| 1.3 | حذف الدوال غير المستخدمة | `app/pages/jobs/[slug].vue` | 10 دقائق |
| 1.4 | تنظيف انماط dark mode | `app/pages/jobs/[slug].vue` | 20 دقيقة |
| 1.5 | استبدال rounded-none | `app/pages/jobs/[slug].vue` | 15 دقيقة |
| 2.1 | إصلاح منطق الترتيب | `app/pages/jobs/index.vue` | 15 دقيقة |
| 2.2 | إصلاح فرز الراتب | `app/pages/jobs/index.vue`, `app/shared/utils/mockData.ts` | 15 دقيقة |
| 3.1 | إضافة حقول مفقودة | `app/shared/utils/mockData.ts` | 20 دقيقة |
| 3.2 | تحديث getJobDetailView | `app/shared/utils/jobDetails.ts` | 20 دقيقة |
| 4.1-4.3 | تنظيف عام | ملفات متعددة | 15 دقيقة |

**الاجمالي المقدر:** ~3 ساعات

---

## المخاطر والاحتياطات

1. **تعارض i18n:** التأكد من عدم وجود مفاتيح مكررة في ملفات الترجمة
2. **كسر الروابط:** عند تغيير بنية mockData، التأكد من تحديث كل الصفحات التي تستخدمها
3. **اختبار بصري:** بعد كل تغيير، فحص الصفحة بصرياً للتأكد من عدم كسر التصميم
4. **اختبار RTL:** التأكد من أن التغييرات تعمل بشكل صحيح مع اتجاه RTL