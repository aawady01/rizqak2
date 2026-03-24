# تقرير تشخيص مشكلة ظهور صفحة فارغة عند التشغيل (2026-03-17)

## الملخص السريع
- تم تشغيل `pnpm run dev` بنجاح، لكن Nuxt لم يستخدم المنفذ 3000؛ تم التحويل تلقائيًا إلى 3001. فتح الرابط الخاطئ (3000) يفسّر ظهور صفحة فارغة.
- توجد تحذيرات تشغيلية مهمة (SSR مع ogImage، وعدم وجود @vee-validate/zod) لكنها ليست أخطاء قاتلة.
- يوجد مؤشر قوي محتمل لخطأ Runtime: استخدام `$t()` داخل `<script setup>` في `HomeJobList.vue` بدون `useI18n()`.

## سجل التشغيل الموثّق (من الطرفية)
```
> pnpm run dev
Nuxt 4.4.2 (Nitro 2.13.1, Vite 7.3.1, Vue 3.5.30)
[get-port] Unable to find an available port (tried 3000). Using alternative port 3001.
Local: http://localhost:3001/
WARN: Nuxt OG Image enabled but SSR is disabled.
WARN: You use zod without @vee-validate/zod.
```

## اكتشافات أساسية مع الأدلة
1) المنفذ الفعلي للتطبيق هو 3001 وليس 3000.
- الدليل: سجل التشغيل أعلاه يوضح التحويل التلقائي إلى 3001.

2) تفعيل ogImage مع تعطيل SSR يُنتج تحذير تشغيل.
- الدليل: `C:\Users\USER\Desktop\rizqak2\nuxt.config.ts` سطر 134 يحتوي `ogImage: {}`.
- كذلك `C:\Users\USER\Desktop\rizqak2\nuxt.config.ts` سطر 273 يحتوي `ssr: false`.

3) نقص حزمة @vee-validate/zod مع استخدام zod.
- الدليل: تحذير الطرفية أثناء التشغيل.

4) استخدام `$t()` داخل `<script setup>` بدون `useI18n()` في HomeJobList.
- الدليل: `C:\Users\USER\Desktop\rizqak2\app\components\home\HomeJobList.vue` الأسطر 13-16 تحتوي `$t()` داخل السكربت.

5) ملفات Home ما زالت تحتوي على tokens قديمة ونصوص عربية ثابتة (قد تسبب تشويش بصري لكنها ليست سبب صفحة فارغة).
- `C:\Users\USER\Desktop\rizqak2\app\components\home\HomeFeaturedCompanies.vue` الأسطر 13-15 و37-49 تستخدم `text-ds-foreground`, `border-ds-border`, `text-neutral-400` ونصوص عربية ثابتة.
- `C:\Users\USER\Desktop\rizqak2\app\components\home\HomeHero.vue` الأسطر 65-82 و90 تستخدم `text-neutral-400` و`text-ds-foreground`.

6) ملف i18n.config.ts يحتوي على رسائل محدودة جدًا فقط (قد يؤدي لعرض مفاتيح الترجمة بدل النصوص لو لم تُحمّل ملفات locales).
- الدليل: `C:\Users\USER\Desktop\rizqak2\i18n\i18n.config.ts` الأسطر 5-15.

## الأسباب المحتملة مرتبة بالأولوية
1) **مرجّح جدًا**: تم فتح `http://localhost:3000` بدل `http://localhost:3001`.
2) **مرجّح**: خطأ Runtime بسبب `$t is not defined` في `HomeJobList.vue` إذا لم يكن auto-injection مفعّل.
3) **أقل احتمالًا**: تحذيرات ogImage + SSR أو نقص @vee-validate/zod تؤدي لتعطّل لاحق في جزء من التطبيق.
4) **أقل احتمالًا**: مشاكل تصميم/توكنز قديمة (تؤثر على الشكل، لا تمنع العرض بالكامل).

## توصيات مباشرة للنموذج التالي
1) افتح `http://localhost:3001` وتأكد من ظهور الواجهة.
2) لو ما زالت الصفحة فارغة، افحص Console وابحث عن `ReferenceError: $t is not defined`.
3) أصلح `HomeJobList.vue` بإضافة `const { t } = useI18n()` واستبدال `$t()` بـ `t()` داخل السكربت.
4) قرر: إمّا تفعيل SSR أو تعطيل ogImage لتجنب التحذير.
5) ثبّت `@vee-validate/zod` أو أزل استخدام zod من نماذج VeeValidate.
6) حدّث ملفات Home لإزالة tokens القديمة والنصوص الثابتة وفق `docs/STANDARDS.md`.
7) أعد تشغيل `pnpm typecheck` و `pnpm lint` بمهلة زمنية أطول.

## ملفات مرجعية (للتنقل السريع)
- `C:\Users\USER\Desktop\rizqak2\nuxt.config.ts` (الأسطر 61-81, 134, 273)
- `C:\Users\USER\Desktop\rizqak2\app\components\home\HomeJobList.vue` (الأسطر 13-16)
- `C:\Users\USER\Desktop\rizqak2\app\components\home\HomeFeaturedCompanies.vue` (الأسطر 13-15, 37-49)
- `C:\Users\USER\Desktop\rizqak2\app\components\home\HomeHero.vue` (الأسطر 65-82, 90)
- `C:\Users\USER\Desktop\rizqak2\i18n\i18n.config.ts` (الأسطر 5-15)

## ملاحظات تنفيذية
- تم رصد تشغيل Nuxt على المنفذ 3001 بسبب انشغال 3000.
- التحذيرات الحالية لا تمنع الإقلاع، لكنها تحتاج معالجة لاحقًا ضمن خطة الإصلاح.
