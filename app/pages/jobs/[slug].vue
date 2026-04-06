<script setup lang="ts">
import { Bookmark, BookmarkCheck, Briefcase, BriefcaseBusiness, Building2, CalendarDays, Clock, Info, ListChecks, Mail, MapPin, MessageCircle, Phone, Reply, Send, ShieldCheck, Star, ThumbsDown, ThumbsUp, UserCircle, UserPlus, Users, Verified, Wallet } from 'lucide-vue-next'
import { toast } from 'vue-sonner'
import { useJobSEO } from '~/shared/composables/useSEO'
import {
  useBreadcrumbStructuredData,
  useJobPostingStructuredData,
} from '~/shared/composables/useStructuredData'
import { getJobDetailView } from '~/shared/utils/jobDetails'

const route = useRoute()
const { t, tm, rt } = useI18n()
const { copy } = useClipboard()

const slug = computed(() => String(route.params.slug || ''))
const detail = computed(() => getJobDetailView(slug.value, t, tm, rt))

const isSaved = ref(false)
const isFollowing = ref(false)
const commentDraft = ref('')

const companyLogo = 'https://lh3.googleusercontent.com/aida-public/AB6AXuCODDMM1ijnzH9l4KLcWKHggPPVSCBlUQFMFuFjLbEL4I_BOY56OHYFtZVKv357Yzaes3hHS4W0-Qd6WBV52DJXCaRY5Ck0RruFSE_2qt1-XKD0tNy0zUNjl0Pa7XFAWnLv12kUGDEPgRUEKyqBkSMdtrl5eF93WFrpkOJJxXUxaM-xvarJDGIryuyWl5l_8CQrERf7zw8gNMF3UTSbn_0fPefGGC_IxU4IUHO0Ir6T8aqfeBBLvj_tN7yvMdV6Z7Zvl2wCZqfTaA'
const pageTitle = 'محاسب تكاليف خبرة أكثر من 3 سنوات للعمل في شركة مقاولات بالكويت'
const seoSummary = 'مطلوب محاسب تكاليف خبرة أكثر من 3 سنوات للعمل في شركة مقاولات بالكويت مع مزايا شاملة ومقابلات مباشرة مع صاحب الشركة.'

const publisherBenefits = [
  'سكن مؤمن',
  'مواصلات مؤمنة',
  'تأمين طبي',
  'تكاليف تذاكر طيران ذهاب وعودة',
  'تكاليف التأشيرة',
  'يومين أجازة أسبوعيا',
  '7 ساعات عمل باليوم',
  'وقت العمل صباحى',
  '2 وجبة طعام مجانا',
  'يونيفورم مجانا',
  'تدريب وتطوير مهنى',
  'بدل هاتف',
  'إستقدام العائلة بعد سنة',
  'إجازات سنوية 21 يوم',
  'إمكانيه عمل عمرة',
  'إمكانية عمل حج',
  'بدلات وكافئات مختلفة',
  'بيئة عمل مستقرة',
  'مسموح بنقل الكافلة بعد فترة',
  'سلم وظيفى واضح',
  'ترقيات دورية حسب الأداء',
  'الأجازات والعطلات الرسمية',
  'تأمينات إجتماعية',
  'تأمين صحى خاص',
]

const personalSpecs = [
  'السن: أقل من 35',
  'الجنس: ذكور فقط',
  'الحالة: متزوج',
  'الجنسية: مصري',
  'الديانة: لا يهم',
  'رخصة: خاصة',
  'التدخين: لا',
  'جواز سفر: ساري',
  'الخدمة العسكرية: معافى',
  'الإقامة الحالية: مصر',
  'اللياقة: ممتاز',
  'الطول: متناسق',
]

const leftRequirementItems = [
  { label: 'المستوى التعليمي', value: 'بكالوريوس / ليسانس' },
  { label: 'التخصص الدراسي', value: 'تجارة / محاسبة' },
  { label: 'نوع مؤسسة التخرج', value: 'مؤسسى تعليمية حكومية فقط / مؤسسة تعليمية خاصة معترف بها' },
  { label: 'مستوى الخبرة', value: 'أكثر من 3 سنوات' },
  { label: 'مجال الخبرة', value: 'خبرة فى نفس الوظيفة بالتحديد' },
  { label: 'مكان الخبرة', value: 'خبرة عمل داخل مصر / خبرة عمل فى دول الخليج' },
]

const rightRequirementItems = [
  { label: 'جواز السفر', value: 'سارى المفعول' },
  { label: 'المهنة فى جواز السفر', value: 'نفس مهنة الوظيفة المعلنة' },
  { label: 'اللغة الإنجليزية', value: 'فوق المتوسط' },
  { label: 'رخصة القيادة', value: 'رخصه مهنية درجة ثانية' },
  { label: 'خبرة القيادة', value: 'قيادة سيارات ملاكى' },
  { label: 'مكان السكن داخل مصر', value: 'محافظات وجة قبلى / محافظات الدلتا' },
]

const jobDescriptionRows = [
  { label: 'المسمى الوظيفي', value: 'محاسب تكاليف', icon: Briefcase },
  { label: 'التصنيف الوظيفي', value: 'محاسبة وإدارة', icon: ListChecks },
  { label: 'مقر العمل', value: 'الكويت', icon: MapPin },
  { label: 'الشركة المعلنة', value: 'شركة آل سعيد للمقاولات', icon: Building2 },
  { label: 'الراتب الأساسي', value: '450 دينار', icon: Wallet },
  { label: 'مدة العقد', value: 'سنتين', icon: CalendarDays },
  { label: 'العدد المطلوب', value: '4', icon: Users },
  { label: 'تاريخ النشر', value: 'منذ 4 ساعات', icon: Clock },
]

const comments = [
  {
    author: 'أحمد علي',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBmjESeVTD9dAgKFjreXH0iElLK1HBwgSz-V9WYwhOvwEHX-oin5Rdpj5NpJl45A_F7xQMAYzgtHMNyzglx58EqGDYWwspnucDWD8z7i_MYKvyZlqeDxgikJpzgYetVxdsiHbnJ7mlTPlhm2abeTZfnHa7H4wcSechhMovcxf1t2a7Unv3n6mYDjxM8K7sGhvw7MNnPg',
    time: '• منذ ساعة واحدة',
    body: 'هل التقديم متاح لحديثي التخرج أم يشترط الخبرة المذكورة بالتحديد؟ شكراً مقدماً.',
    likes: 'إعجاب (2)',
    dislikes: 'عدم إعجاب',
    replyText: 'رد',
    replies: [
      {
        author: 'المعالي لإلحاق العمالة',
        time: '• منذ 45 دقيقة',
        body: 'أهلاً بك يا أحمد. نعم، يفضل وجود الخبرة لضمان التوافق مع متطلبات العمل، ولكن يمكنك إرسال السيرة الذاتية وسنقوم بمراجعتها للنظر في إمكانية قبول حديثي التخرج المتميزين.',
        likes: 'إعجاب (1)',
      },
    ],
  },
  {
    author: 'محمد حسن',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAqmeIrg1BE8tn1tYZGoWw73jg2ma37x-zzBvFezIC80HeDhUsJ7fTwGzxU5z6bI_6JSBM2PJ7XWKrzRc2LUagniHnxAstP4c0-h3ZB57ngP5Jhe2qHbguWk9EhyXB_Y5C060VdjaUBNh4wXw9eB5BlyhJjTXF-0q941V7_ru89bxXLN0_8X7Em0DCjH4il3r6WSw8yvj-_oeiFhu1V4AeJi8LGAqHo4uB_ddiH8G_zhnrg-llEEYPjbifkc5VtcR45WdRRJ6NsfQ',
    time: '• منذ ساعتين',
    body: 'تم إرسال السيرة الذاتية عبر البريد الإلكتروني. بالتوفيق للجميع.',
    likes: 'إعجاب (5)',
    dislikes: 'عدم إعجاب',
    replyText: 'رد',
  },
  {
    author: 'سارة محمود',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAT8-OT5YVMW1L08QGIaP5d4xtOAaaj0D6y23oW0BEwuq4vPrjuc0GC1XSpi-IXGzfaKqfcS2dfrY3Lhv0kOl-l9YFyClg9l7otXp9Cqg92jujm5B4rgabGSDhawZm8ZpoD4kBlc-YqwzynrWY0bBuQRY3tIfqRqdpdZ0uGPMv1uQBFrrI6lvSIeEW6pIKdoXLKfVi_OugrO1BIV1xpnVlPxqr8m8bpqR6KP2fWQaEvFlsh4HVdlUEDN-JQswjoVj7jrf5z_C736Q',
    time: '• منذ 3 ساعات',
    body: 'هل تتوفر وظائف إدارية أخرى في نفس الشركة للسيدات؟',
    likes: 'إعجاب (1)',
    dislikes: 'عدم إعجاب',
    replyText: 'رد',
  },
]

watch(
  () => detail.value,
  (value) => {
    isSaved.value = value?.isSaved ?? false
    isFollowing.value = false
    commentDraft.value = ''
  },
  { immediate: true },
)

if (detail.value) {
  useJobSEO({
    id: detail.value.id,
    slug: detail.value.slug,
    title: pageTitle,
    companyName: 'شركة آل سعيد للمقاولات',
    location: 'الكويت',
    salary: '450 دينار',
    summary: seoSummary,
  })

  useBreadcrumbStructuredData([
    { name: t('nav.home'), path: '/' },
    { name: t('nav.jobs'), path: '/jobs' },
    { name: pageTitle, path: `/jobs/${detail.value.slug}` },
  ])

  useJobPostingStructuredData({
    title: pageTitle,
    description: seoSummary,
    datePosted: '2026-03-30T10:00:00.000Z',
    employmentType: 'FULL_TIME',
    hiringOrganization: {
      name: 'شركة آل سعيد للمقاولات',
      logo: companyLogo,
    },
    jobLocation: {
      addressLocality: 'الكويت',
      addressCountry: 'الكويت',
    },
    qualifications: leftRequirementItems.map(item => item.value),
    responsibilities: [
      'العمل بقسم الحسابات ومتابعة التكلفة داخل شركة مقاولات بالكويت.',
      'إعداد التقارير المالية وتحليل التكاليف بدقة عالية.',
    ],
    jobBenefits: publisherBenefits,
    path: `/jobs/${detail.value.slug}`,
  })
}

const handleSave = () => {
  isSaved.value = !isSaved.value
  toast.success(isSaved.value ? t('jobDetail.shared.toasts.saved') : t('jobDetail.shared.toasts.unsaved'))
}

const _handleShare = async () => {
  if (!import.meta.client) return
  await copy(window.location.href)
  toast.success(t('jobDetail.shared.toasts.linkCopied'))
}

const handleFollow = () => {
  isFollowing.value = !isFollowing.value
  toast.success(
    isFollowing.value
      ? t('jobDetail.shared.toasts.followed')
      : t('jobDetail.shared.toasts.unfollowed'),
  )
}

const handleActionToast = (key: string) => {
  const actionToastMap: Record<string, string> = {
    call: 'jobDetail.shared.toasts.callSoon',
    whatsapp: 'jobDetail.shared.toasts.whatsappSoon',
    message: 'jobDetail.shared.toasts.messageSoon',
    original: 'jobDetail.shared.toasts.originalPostSoon',
  }

  toast.success(t(actionToastMap[key] || 'jobDetail.shared.toasts.actionQueued'))
}

const submitComment = () => {
  if (!commentDraft.value.trim()) return
  commentDraft.value = ''
  toast.success(t('jobDetail.shared.toasts.commentSubmitted'))
}

const _toggleDark = () => {
  if (!import.meta.client) return
  document.documentElement.classList.toggle('dark')
}

const _goBack = async () => {
  if (import.meta.client && window.history.length > 1) {
    window.history.back()
    return
  }

  await navigateTo('/')
}
</script>

<template>
  <div v-if="!detail" class="page-shell py-8">
    <div class="surface-panel border border-border p-content">
      <BaseEmptyState
        :title="$t('jobDetail.shared.notFound.title')"
        :description="$t('jobDetail.shared.notFound.description')"
      >
        <template #action>
          <NuxtLink
            to="/"
            class="inline-flex items-center gap-2 border border-primary px-content py-element text-sm font-semibold text-primary transition-colors hover:bg-primary hover:text-white"
          >
            {{ $t('jobDetail.shared.notFound.backHome') }}
          </NuxtLink>
        </template>
      </BaseEmptyState>
    </div>
  </div>

  <div
    v-else
    class="min-h-screen bg-background font-display text-foreground transition-colors duration-normal"
  >
    <main class="page-shell">
      <div class="grid grid-cols-1 gap-section lg:grid-cols-job-detail xl:grid-cols-sidebar">
        <aside class="order-1 space-y-section">
          <div class="rounded-none border border-border bg-surface p-content dark:border-border dark:bg-surface">
            <div class="mb-element flex items-start gap-content">
              <div class="h-14 w-14 flex-shrink-0 rounded-none border border-border bg-surface p-compact dark:border-border dark:bg-surface-alt">
                <img alt="شعار الشركة" class="h-full w-full rounded-none object-contain" :src="companyLogo">
              </div>

              <div class="min-w-0 flex-1">
                <h3 class="mb-1 truncate text-lg font-bold leading-tight text-foreground">
                  المعالي لإلحاق العمالة
                </h3>

                <div class="flex flex-wrap items-center gap-2">
                  <div class="flex items-center gap-1 rounded border border-yellow-100 bg-yellow-50 px-2 py-0.5 dark:border-yellow-800/50 dark:bg-yellow-900/20">
                    <span class="pt-0.5 text-xs font-bold text-foreground">4.8</span>
                    <div class="flex text-gold-star">
                      <Star class="size-3.5 fill-current" :stroke-width="2" />
                      <Star class="size-3.5 fill-current" :stroke-width="2" />
                      <Star class="size-3.5 fill-current" :stroke-width="2" />
                      <Star class="size-3.5 fill-current" :stroke-width="2" />
                      <Star class="size-3.5 text-foreground-subtle" :stroke-width="2" />
                    </div>
                  </div>

                  <span class="cursor-pointer text-xs font-medium text-foreground-muted hover:underline dark:text-foreground-muted">
                    (120 تقييم)
                  </span>

                  <div class="ms-auto flex items-center gap-1.5 rounded-full border border-green-100 bg-green-50 px-2 py-0.5 dark:border-green-800/50 dark:bg-green-900/20 sm:ms-0">
                    <span class="relative flex h-2 w-2">
                      <span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                      <span class="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
                    </span>
                    <span class="text-ds-caption-s font-bold text-green-700 dark:text-green-400">موثق</span>
                  </div>
                </div>
              </div>
            </div>

            <div class="mb-section flex w-full items-center justify-between gap-content">
              <button
                type="button"
                class="flex flex-1 items-center justify-center gap-2 rounded-none bg-primary py-element text-sm font-bold text-white transition-all hover:bg-primary-dark"
                @click="handleFollow"
              >
                <UserPlus class="size-5" :stroke-width="2" />
                <span>متابعة</span>
              </button>

              <div class="flex items-center gap-1.5 rounded-none border border-border bg-surface-alt px-content py-element dark:border-border dark:bg-surface-alt">
                <Users class="size-5" :stroke-width="2" />
                <span class="text-sm font-bold text-foreground dark:text-foreground">12.5k</span>
                <span class="text-xs font-normal text-foreground-muted dark:text-foreground-muted">متابع</span>
              </div>
            </div>

              <div class="mb-section space-y-element border-t border-border pt-content dark:border-border">
                <div class="flex items-start gap-3">
                  <div class="mt-0.5 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-none bg-surface-alt text-foreground-subtle dark:bg-surface-alt">
                    <MapPin class="size-4" :stroke-width="2" />
                  </div>
                  <div>
                    <p class="text-ds-body-r font-bold leading-tight text-foreground dark:text-foreground">القاهرة، مدينة نصر، الحي السابع</p>
                  </div>
                </div>

                <div class="flex items-start gap-3">
                  <div class="mt-0.5 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-none bg-surface-alt text-foreground-subtle dark:bg-surface-alt">
                    <ShieldCheck class="size-4" :stroke-width="2" />
                  </div>
                  <div>
                    <p class="text-ds-body-r font-bold leading-tight text-foreground dark:text-foreground">ترخيص رقم 454 شركات</p>
                  </div>
                </div>
              </div>

            <div class="grid grid-cols-2 gap-compact">
              <div class="cursor-default rounded-none border border-border bg-surface-alt p-compact text-center transition-colors hover:border-primary/30 dark:border-border dark:bg-surface-alt">
                <span class="mb-0.5 block text-ds-body-m font-bold text-foreground">22</span>
                <span class="text-ds-caption-l font-normal text-foreground-muted dark:text-foreground-muted">مهتم بالوظيفة</span>
              </div>
              <div class="cursor-default rounded-none border border-border bg-surface-alt p-compact text-center transition-colors hover:border-primary/30 dark:border-border dark:bg-surface-alt">
                <span class="mb-0.5 block text-ds-body-m font-bold text-foreground">14</span>
                <span class="text-ds-caption-l font-normal text-foreground-muted dark:text-foreground-muted">وظيفة متاحة</span>
              </div>
            </div>
          </div>

          <section>
            <div class="section-heading">
              <div class="section-heading__title">
                <Wallet class="size-5 text-primary" :stroke-width="2" aria-hidden="true" />
                <BaseTypography variant="h3" tag="h3" weight="bold" color="text-foreground">
                  المميزات والراتب
                </BaseTypography>
              </div>
            </div>

            <div class="rounded-none border border-border bg-surface p-content dark:border-border dark:bg-surface">
              <div class="space-y-3">
                <div class="flex items-center justify-between border-b border-border pb-element dark:border-border">
                  <span class="text-ds-body-s font-normal text-foreground-muted dark:text-foreground-muted">الراتب الأساسي</span>
                  <span class="text-ds-body-m font-bold text-primary">450 دينار</span>
                </div>
                <div class="flex items-center justify-between border-b border-border pb-element dark:border-border">
                  <span class="text-ds-body-s font-normal text-foreground-muted dark:text-foreground-muted">مدة العقد</span>
                  <span class="text-ds-body-m font-bold text-foreground dark:text-foreground">سنتين</span>
                </div>
                <div class="flex items-center justify-between border-b border-border pb-element dark:border-border">
                  <span class="text-ds-body-s font-normal text-foreground-muted dark:text-foreground-muted">العدد المطلوب</span>
                  <span class="text-ds-body-m font-bold text-foreground dark:text-foreground">4 موظفين</span>
                </div>

                <div class="pt-2">
                  <div class="flex flex-wrap gap-compact">
                    <BaseChip
                      v-for="benefit in publisherBenefits"
                      :key="benefit"
                      variant="default"
                      size="sm"
                    >
                      {{ benefit }}
                    </BaseChip>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <div class="sticky top-32">
            <div class="rounded-t-none rounded-b-none border border-border border-b-0 bg-surface p-content dark:border-border dark:bg-surface">
              <div class="space-y-3">
                <BaseButton
                  variant="outline"
                  size="sm"
                  class="w-full font-bold"
                  @click="handleActionToast('call')"
                >
                  <Phone class="size-4" :stroke-width="2" />
                  اتصل بالناشر
                </BaseButton>

                <BaseButton
                  variant="destructive"
                  size="sm"
                  class="w-full bg-brand-whatsapp hover:bg-brand-whatsapp-dark border-transparent font-bold"
                  @click="handleActionToast('whatsapp')"
                >
                  <MessageCircle class="size-4" :stroke-width="2" />
                  تواصل عبر واتساب
                </BaseButton>

                <BaseButton
                  variant="secondary"
                  size="sm"
                  class="w-full font-bold"
                  @click="handleActionToast('message')"
                >
                  <Mail class="size-4" :stroke-width="2" />
                  إرسال رسالة
                </BaseButton>

                <BaseButton
                  variant="link"
                  size="sm"
                  class="w-full text-xs font-medium"
                  @click="handleActionToast('original')"
                >
                  رابط الإعلان الأصلي
                </BaseButton>
              </div>
            </div>

            <div class="rounded-b-none border border-t-0 border-border bg-surface-alt/50 p-compact dark:border-border dark:bg-surface-alt/20">
              <div class="flex items-start gap-2">
                <Info class="size-5 shrink-0 text-foreground-subtle" :stroke-width="2" />
                <p class="text-ds-caption-l leading-relaxed text-foreground-subtle dark:text-foreground-subtle">
                  لا تقم بدفع أي مبالغ مالية مقابل التوظيف. تأكد من هوية المعلن قبل إرسال أي بيانات شخصية.
                </p>
              </div>
            </div>
          </div>
        </aside>

        <div class="order-2 space-y-section">
          <section class="overflow-hidden rounded-none border border-border bg-surface dark:border-border dark:bg-surface">
            <div class="flex items-center justify-between gap-4 px-section pt-element pb-compact">
              <div class="flex items-center gap-4">
                <div class="flex items-center gap-compact">
                  <span class="relative flex h-2.5 w-2.5">
                    <span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-75" />
                    <span class="relative inline-flex h-2.5 w-2.5 rounded-full bg-success" />
                  </span>
                  <span class="text-sm font-bold text-success">متاحة الآن</span>
                </div>

                <div class="flex items-center gap-compact min-w-0">
                  <BaseFlag
                    country-code="kw"
                    size="md"
                    alt="الكويت"
                  />
                  <span class="text-base font-bold text-foreground">الكويت</span>
                </div>
              </div>

              <button
                type="button"
                class="shrink-0 p-compact transition-all active:scale-90 outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-1 cursor-pointer"
                :class="[
                  isSaved
                    ? 'text-primary drop-shadow-sm'
                    : 'text-foreground-subtle hover:text-primary',
                ]"
                :title="isSaved ? $t('jobCard.save.saved') : $t('jobCard.save.unsaved')"
                @click="handleSave"
              >
                <BookmarkCheck
                  v-if="isSaved"
                  class="size-7"
                  :stroke-width="1.5"
                />
                <Bookmark
                  v-else
                  class="size-7"
                  :stroke-width="1.5"
                />
              </button>
            </div>

            <div class="px-section pb-4">
              <h2 class="mb-0 text-2xl font-bold leading-tight text-foreground">
                {{ pageTitle }}
              </h2>
            </div>

            <div class="flex flex-wrap items-center gap-x-5 gap-y-3 border-t border-border bg-surface-alt/50 px-section py-element">
              <div class="flex flex-wrap items-center gap-5 text-sm font-medium text-foreground-muted">
                <div class="cursor-default transition-colors hover:text-primary" title="تاريخ النشر">
                  <div class="flex items-center gap-1.5">
                    <Clock class="size-[18px] text-foreground-subtle" :stroke-width="2" />
                    <span>نشرت منذ 4 ساعات</span>
                  </div>
                </div>
                <div class="hidden h-4 w-px bg-border sm:block" />
                <div class="cursor-default transition-colors hover:text-primary" title="التصنيف">
                  <div class="flex items-center gap-1.5">
                    <Briefcase class="size-[18px] text-foreground-subtle" :stroke-width="2" />
                    <span>محاسبة وإدارية</span>
                  </div>
                </div>
                <div class="hidden h-4 w-px bg-border sm:block" />
                <div class="cursor-default transition-colors hover:text-primary" title="الشركة">
                  <div class="flex items-center gap-1.5">
                    <Building2 class="size-[18px] text-foreground-subtle" :stroke-width="2" />
                    <span>شركة آل سعيد للمقاولات</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section>
            <div class="section-heading">
              <div class="section-heading__title">
                <ListChecks class="size-5 text-primary" :stroke-width="2" aria-hidden="true" />
                <BaseTypography variant="h3" tag="h3" weight="bold" color="text-foreground">
                  شروط الوظيفة
                </BaseTypography>
              </div>
            </div>

            <div class="rounded-none border border-border bg-surface p-content dark:border-border dark:bg-surface">

            <div class="flex flex-col">
              <div class="relative mb-section mr-element border-r-2 border-primary/20">
                <div class="relative pb-element pe-section">
                  <span class="absolute -right-[11px] top-1.5 z-10 h-4 w-4 rounded-full bg-primary ring-4 ring-surface dark:ring-surface" />
                  <span class="mb-element block text-ds-body-s font-normal text-foreground-muted dark:text-foreground-muted">المواصفات الشخصية</span>

                  <div class="flex flex-wrap gap-compact">
                    <BaseChip
                      v-for="spec in personalSpecs"
                      :key="spec"
                      variant="default"
                      size="sm"
                    >
                      {{ spec }}
                    </BaseChip>
                  </div>
                </div>
              </div>

              <div class="grid grid-cols-1 gap-x-12 md:grid-cols-2">
                <div class="relative mr-element border-r-2 border-primary/20">
                  <div
                    v-for="(item, index) in leftRequirementItems"
                    :key="`${item.label}-${index}`"
                    class="relative pe-section"
                    :class="index < leftRequirementItems.length - 1 ? 'pb-section' : ''"
                  >
                    <span class="absolute -right-[11px] top-1.5 z-10 h-4 w-4 rounded-full bg-primary ring-4 ring-surface dark:ring-surface" />
                    <span class="mb-element block text-ds-body-s font-normal text-foreground-muted dark:text-foreground-muted">{{ item.label }}</span>
                    <p class="text-ds-body-m font-bold leading-relaxed text-foreground dark:text-foreground">{{ item.value }}</p>
                  </div>
                </div>

                <div class="relative mr-element border-r-2 border-primary/20 md:mr-0 md:border-r-0 md:pe-0">
                  <div class="absolute bottom-0 right-0 top-0 hidden h-full border-r-2 border-primary/20 md:block md:mr-element" />
                  <div
                    v-for="(item, index) in rightRequirementItems"
                    :key="`${item.label}-${index}`"
                    class="relative pe-section md:pe-section"
                    :class="index < rightRequirementItems.length - 1 ? 'pb-section' : ''"
                  >
                    <span class="mb-element block text-ds-body-s font-normal text-foreground-muted dark:text-foreground-muted">{{ item.label }}</span>
                    <p class="text-ds-body-m font-bold leading-relaxed text-foreground dark:text-foreground">{{ item.value }}</p>
                  </div>
                </div>
              </div>
            </div>
            </div>
          </section>

          <section>
            <BaseSectionHeader>
              <template #icon>
                <BriefcaseBusiness class="size-5 text-primary" :stroke-width="2" aria-hidden="true" />
              </template>
              <BaseTypography variant="h3" tag="h3" class="font-bold text-foreground">
                  وصف الوظيفة
                </BaseTypography>
            </BaseSectionHeader>

            <div class="rounded-none border border-border bg-surface p-content dark:border-border dark:bg-surface">
              <div class="overflow-hidden rounded-none border border-border bg-surface dark:border-border dark:bg-surface">
              <div
                v-for="(row, index) in jobDescriptionRows"
                :key="`${row.label}-${index}`"
                class="flex border-b border-border last:border-b-0 dark:border-border"
              >
                <div class="flex-1 border-l border-border bg-surface-alt p-content dark:border-border dark:bg-surface-alt">
                  <div class="mb-element flex items-center gap-element text-foreground-muted dark:text-foreground-muted">
                    <span class="text-ds-body-s font-medium">{{ row.label }}</span>
                    <component :is="row.icon" class="size-4 text-foreground-subtle" :stroke-width="2" />
                  </div>
                </div>
                <div class="flex-1 bg-surface p-content dark:bg-surface">
                  <span class="text-ds-body-m font-bold text-foreground dark:text-foreground">{{ row.value }}</span>
                </div>
              </div>
            </div>
            </div>
          </section>

          <section>
            <BaseSectionHeader>
              <template #icon>
                <Info class="size-5 text-primary" :stroke-width="2" aria-hidden="true" />
              </template>
              <BaseTypography variant="h3" tag="h3" class="font-bold text-foreground">
                  تفاصيل إضافية
                </BaseTypography>
            </BaseSectionHeader>

            <div class="rounded-none border border-border bg-surface p-content dark:border-border dark:bg-surface">
              <BaseDescription tag="div">
              <p class="mb-element">
                مطلوب لشركة مقاولات كبيرة بالكويت (شركة تبارك للمقاولات العامة والبناء) للعمل بقسم الحسابات، محاسبين تكاليف ذوي خبرة مهنية لا تقل عن 3 سنوات في مجال المقاولات وإدارة التكاليف، مع إلمام كامل بالدورة المستندية والبرامج المحاسبية المتخصصة، والقدرة على إعداد التقارير المالية وتحليل التكاليف بدقة عالية، ويشترط أن يكون المتقدم حاصلاً على بكالوريوس تجارة (شعبة محاسبة) بتقدير جيد على الأقل.
              </p>
              <p class="mb-element">
                تتميز الوظيفة بتوفير بيئة عمل مستقرة مع حزمة مزايا شاملة تشمل السكن المؤثث، المواصلات من وإلى موقع العمل، تأمين طبي شامل يغطي الحالات الطارئة والعلاج الدوري، بالإضافة إلى تذاكر طيران سنوية مدفوعة بالكامل، كما توفر الشركة إمكانية استقدام الأسرة (الزوجة والأولاد) بعد مرور عام واحد من بداية التعاقد، مما يضمن الاستقرار العائلي والمهني للموظف.
              </p>

              <div class="mt-element border-t border-border pt-element dark:border-border">
                <p class="mb-element text-lg font-bold text-foreground dark:text-foreground">معلومات المقابلة:</p>
                <p class="text-base leading-relaxed">
                  المقابلات يوم الأربعاء الموافق 12-2-2025 بمقر شركة المعالي بمدينة نصر. يرجى قبل الحضور التواصل من خلال الواتس اب وإرسال الـ CV الخاص بك إن كان العمل مناسب لك.
                  <br>
                  <strong class="mt-element inline-block text-primary">المقابلات مع صاحب الشركة مباشرة.</strong>
                </p>
              </div>
              </BaseDescription>
            </div>
          </section>

          <section>
            <BaseSectionHeader>
              <template #icon>
                <MessageCircle class="size-5 text-primary" :stroke-width="2" aria-hidden="true" />
              </template>
              <BaseTypography variant="h3" tag="h3" class="font-bold text-foreground">
                  التعليقات
                </BaseTypography>
            </BaseSectionHeader>

            <div class="rounded-none border border-border bg-surface p-content dark:border-border dark:bg-surface">
              <div class="mb-section">
              <div class="flex gap-content">
                <div class="flex h-10 w-10 flex-shrink-0 items-center justify-center overflow-hidden rounded-full bg-primary/10 text-sm font-bold text-primary">
                  <UserCircle class="size-10 text-primary" :stroke-width="2" />
                </div>

                <div class="flex-1">
                  <textarea
                    v-model="commentDraft"
                    class="w-full resize-none rounded-none border border-border bg-surface-alt p-content text-foreground outline-none transition-all placeholder:text-foreground-subtle focus:border-primary focus:ring-1 focus:ring-primary dark:border-border dark:bg-surface-alt dark:text-foreground dark:placeholder:text-foreground-subtle"
                    aria-label="أضف تعليقاً على الوظيفة..."
                    placeholder="أضف تعليقاً على الوظيفة..."
                    rows="3"
                  />

                  <div class="mt-element flex justify-end">
                    <button
                      type="button"
                      class="flex items-center gap-2 rounded-none bg-primary px-content py-element text-sm font-bold text-white transition-colors hover:bg-primary-dark"
                      @click="submitComment"
                    >
                    <Send class="size-4" :stroke-width="2" />
                    إرسال
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div class="space-y-section">
              <div
                v-for="comment in comments"
                :key="comment.author"
                class="flex flex-col gap-content"
              >
                <div class="flex gap-content">
                  <div class="h-10 w-10 flex-shrink-0 overflow-hidden rounded-full bg-surface-alt dark:bg-surface-alt">
                    <img alt="User Avatar" class="h-full w-full object-cover" :src="comment.avatar">
                  </div>

                  <div class="flex-1">
                    <div class="mb-element flex items-center gap-element">
                      <h4 class="text-sm font-bold text-foreground dark:text-foreground">{{ comment.author }}</h4>
                      <span class="text-xs text-foreground-muted dark:text-foreground-muted">{{ comment.time }}</span>
                    </div>

                    <p class="mb-element text-sm leading-relaxed text-foreground dark:text-foreground">
                      {{ comment.body }}
                    </p>

                    <div class="flex items-center gap-content">
                      <button type="button" class="flex items-center gap-1 text-xs font-medium text-foreground-muted transition-colors hover:text-primary dark:text-foreground-muted dark:hover:text-primary">
                        <ThumbsUp class="size-4" :stroke-width="2" />
                        {{ comment.likes }}
                      </button>
                      <button type="button" class="flex items-center gap-1 text-xs font-medium text-foreground-muted transition-colors hover:text-error dark:text-foreground-muted dark:hover:text-error">
                        <ThumbsDown class="size-4" :stroke-width="2" />
                        {{ comment.dislikes }}
                      </button>
                      <button type="button" class="flex items-center gap-1 text-xs font-medium text-foreground-muted transition-colors hover:text-primary dark:text-foreground-muted dark:hover:text-primary">
                        <Reply class="size-4" :stroke-width="2" />
                        {{ comment.replyText }}
                      </button>
                    </div>
                  </div>
                </div>

                <div
                  v-for="reply in comment.replies || []"
                  :key="reply.author"
                  class="relative mt-1 flex gap-4 pr-12"
                >
                  <div class="absolute bottom-6 right-5 top-[-20px] w-[2px] rounded-b bg-border dark:bg-border">
                    <div class="absolute bottom-0 right-0 h-[2px] w-3 bg-border dark:bg-border" />
                  </div>

                  <div class="z-10 h-9 w-9 flex-shrink-0 rounded-none border border-border bg-surface p-0.5 dark:border-border dark:bg-surface-alt">
                    <img alt="شعار الشركة" class="h-full w-full rounded-none object-contain" :src="companyLogo">
                  </div>

                  <div class="flex-1">
                    <div class="mb-1 flex items-center gap-2">
                      <h4 class="flex items-center gap-1 text-sm font-bold text-primary">
                        المعالي لإلحاق العمالة
                        <Verified class="size-4 text-primary" :stroke-width="2" />
                      </h4>
                      <span class="text-xs text-foreground-muted dark:text-foreground-muted">{{ reply.time }}</span>
                    </div>

                    <p class="mb-2 text-sm font-medium leading-relaxed text-foreground dark:text-foreground">
                      {{ reply.body }}
                    </p>

                    <div class="flex items-center gap-4">
                      <button type="button" class="flex items-center gap-1 text-xs font-medium text-foreground-muted transition-colors hover:text-primary dark:text-foreground-muted dark:hover:text-primary">
                        <ThumbsUp class="size-4" :stroke-width="2" />
                        {{ reply.likes }}
                      </button>
                      <button type="button" class="flex items-center gap-1 text-xs font-medium text-foreground-muted transition-colors hover:text-primary dark:text-foreground-muted dark:hover:text-primary">
                        <Reply class="size-4" :stroke-width="2" />
                        رد
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  </div>
</template>
