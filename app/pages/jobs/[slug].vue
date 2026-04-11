<script setup lang="ts">
import { Bookmark, BookmarkCheck, Briefcase, BriefcaseBusiness, Building2, CalendarDays, Clock, Info, ListChecks, Mail, MapPin, MessageCircle, Phone, Reply, Send, ShieldCheck, Star, ThumbsDown, ThumbsUp, UserCircle, UserPlus, Users, Verified, Wallet, GraduationCap, BadgeCheck, Layers3 } from 'lucide-vue-next'
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
    title: detail.value.title,
    companyName: detail.value.companyName,
    location: detail.value.location,
    salary: detail.value.salary,
    summary: detail.value.seoSummary,
  })

  useBreadcrumbStructuredData([
    { name: t('nav.home'), path: '/' },
    { name: t('nav.jobs'), path: '/jobs' },
    { name: detail.value.title, path: `/jobs/${detail.value.slug}` },
  ])

  useJobPostingStructuredData({
    title: detail.value.title,
    description: detail.value.seoSummary,
    datePosted: detail.value.postedAtIso,
    employmentType: 'FULL_TIME',
    hiringOrganization: {
      name: detail.value.companyName,
      logo: detail.value.companyLogo,
    },
    jobLocation: {
      addressLocality: detail.value.location,
      addressCountry: detail.value.location,
    },
    qualifications: detail.value.contentSections?.find(s => s.id === 'requirements')?.items || [],
    responsibilities: detail.value.contentSections?.find(s => s.id === 'description')?.paragraphs || [],
    jobBenefits: detail.value.benefitTags,
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

  toast.success(t(actionToastMap[key] || 'jobDetail.shared.toasts.actionQueued'), {
    id: `action-${key}`
  })
}

const submitComment = () => {
  if (!commentDraft.value.trim()) return
  commentDraft.value = ''
  toast.success(t('jobDetail.shared.toasts.commentSubmitted'))
}

const getActionIcon = (iconName: string) => {
  const iconMap: Record<string, typeof Phone> = {
    phone: Phone,
    'message-circle': MessageCircle,
    mail: Mail,
  }
  return iconMap[iconName] || Phone
}

const getActionVariant = (action: { variant: string; tone?: string }) => {
  if (action.tone === 'success') return 'destructive'
  return action.variant as 'outline' | 'secondary' | 'default'
}

const getSectionIcon = (iconName?: string) => {
  const iconMap: Record<string, any> = {
    'list-checks': ListChecks,
    'file-text': Info,
    'sparkles': Wallet,
    'briefcase-business': BriefcaseBusiness,
    'calendar-days': CalendarDays,
  }
  return iconMap[iconName || ''] || Info
}

const getFactIcon = (iconName?: string) => {
  const iconMap: Record<string, any> = {
    'briefcase-business': BriefcaseBusiness,
    'graduation-cap': GraduationCap,
    'badge-check': BadgeCheck,
    'layers-3': Layers3,
    'map-pinned': MapPin,
    'building-2': Building2,
    'clock-3': Clock,
    'wallet': Wallet,
    'calendar-range': CalendarDays,
    'users-round': Users,
    'timer-reset': Clock,
    'factory': Building2,
  }
  return iconMap[iconName || ''] || Info
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
          <!-- Publisher Card -->
          <div class="rounded-none border border-border bg-surface p-content dark:border-border dark:bg-surface">
            <div class="mb-element flex items-start gap-content">
              <div class="h-14 w-14 shrink-0 rounded-none border border-border bg-surface p-compact dark:border-border dark:bg-surface-alt">
                <img v-if="detail.publisher.logo" alt="" class="h-full w-full rounded-none object-contain" :src="detail.publisher.logo">
                <div v-else class="flex h-full w-full items-center justify-center text-lg font-bold text-primary">
                  {{ detail.publisher.name.charAt(0) }}
                </div>
              </div>

              <div class="min-w-0 flex-1">
                <h3 class="mb-1 truncate text-lg font-bold leading-tight text-foreground">
                  {{ detail.publisher.name }}
                </h3>

                <div class="flex flex-wrap items-center gap-2">
                  <div class="flex items-center gap-1 rounded border border-yellow-100 bg-yellow-50 px-2 py-0.5 dark:border-yellow-800/50 dark:bg-yellow-900/20">
                    <span class="pt-0.5 text-xs font-bold text-foreground">{{ detail.publisher.rating }}</span>
                    <div class="flex text-gold-star">
                      <Star class="size-3.5 fill-current" :stroke-width="2" />
                      <Star class="size-3.5 fill-current" :stroke-width="2" />
                      <Star class="size-3.5 fill-current" :stroke-width="2" />
                      <Star class="size-3.5 fill-current" :stroke-width="2" />
                      <Star class="size-3.5 text-foreground-subtle" :stroke-width="2" />
                    </div>
                  </div>

                  <span class="cursor-pointer text-xs font-medium text-foreground-muted hover:underline dark:text-foreground-muted">
                    ({{ detail.publisher.reviewCount }})
                  </span>

                  <div v-if="detail.publisher.isVerified" class="ms-auto flex items-center gap-1.5 rounded-full border border-green-100 bg-green-50 px-2 py-0.5 dark:border-green-800/50 dark:bg-green-900/20 sm:ms-0">
                    <span class="relative flex h-2 w-2">
                      <span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                      <span class="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
                    </span>
                    <span class="text-ds-caption-s font-bold text-green-700 dark:text-green-400">{{ $t('jobDetail.shared.publisher.verified') }}</span>
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
                <span>{{ isFollowing ? $t('jobDetail.shared.actions.following') : $t('jobDetail.shared.actions.followPublisher') }}</span>
              </button>

              <div class="flex items-center gap-1.5 rounded-none border border-border bg-surface-alt px-content py-element dark:border-border dark:bg-surface-alt">
                <Users class="size-5" :stroke-width="2" />
                <span class="text-sm font-bold text-foreground dark:text-foreground">{{ detail.publisher.followerCount }}</span>
                <span class="text-xs font-normal text-foreground-muted dark:text-foreground-muted">{{ $t('jobDetail.shared.publisher.followers') }}</span>
              </div>
            </div>

            <div class="mb-section space-y-element border-t border-border pt-content dark:border-border">
              <div class="flex items-start gap-3">
                <div class="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-none bg-surface-alt text-foreground-subtle dark:bg-surface-alt">
                  <MapPin class="size-4" :stroke-width="2" />
                </div>
                <div>
                  <p class="text-ds-body-r font-bold leading-tight text-foreground dark:text-foreground">{{ detail.publisher.headquarters }}</p>
                </div>
              </div>

              <div class="flex items-start gap-3">
                <div class="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-none bg-surface-alt text-foreground-subtle dark:bg-surface-alt">
                  <ShieldCheck class="size-4" :stroke-width="2" />
                </div>
                <div>
                  <p class="text-ds-body-r font-bold leading-tight text-foreground dark:text-foreground">{{ detail.publisher.license }}</p>
                </div>
              </div>
            </div>

            <div class="grid grid-cols-2 gap-compact">
              <div
                v-for="stat in detail.quickStats"
                :key="stat.id"
                class="cursor-default rounded-none border border-border bg-surface-alt p-compact text-center transition-colors hover:border-primary/30 dark:border-border dark:bg-surface-alt"
              >
                <span class="mb-0.5 block text-ds-body-m font-bold text-foreground">{{ stat.value }}</span>
                <span class="text-ds-caption-l font-normal text-foreground-muted dark:text-foreground-muted">{{ stat.label }}</span>
              </div>
            </div>
          </div>

          <!-- Benefits & Salary Section -->
          <section>
            <div class="section-heading">
              <div class="section-heading__title">
                <Wallet class="size-5 text-primary" :stroke-width="2" aria-hidden="true" />
                <BaseTypography variant="h3" tag="h3" weight="bold" color="text-foreground">
                  {{ $t('jobDetail.shared.sections.compensation') }}
                </BaseTypography>
              </div>
            </div>

            <div class="rounded-none border border-border bg-surface p-content dark:border-border dark:bg-surface">
              <div class="space-y-3">
                <div
                  v-for="(item, index) in detail.compensationItems"
                  :key="item.id"
                  class="flex items-center justify-between border-b border-border pb-element last:border-b-0 last:pb-0 dark:border-border"
                >
                  <span class="text-ds-body-s font-normal text-foreground-muted dark:text-foreground-muted">{{ item.label }}</span>
                  <span class="text-ds-body-m font-bold text-primary">{{ item.value }}</span>
                </div>

                <div v-if="detail.benefitTags.length" class="pt-2">
                  <div class="flex flex-wrap gap-compact">
                    <BaseChip
                      v-for="benefit in detail.benefitTags"
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

          <!-- Sidebar Actions -->
          <div class="sticky top-32">
            <div class="rounded-t-none rounded-b-none border border-border border-b-0 bg-surface p-content dark:border-border dark:bg-surface">
              <div class="space-y-3">
                <BaseButton
                  v-for="action in detail.sidebarActions"
                  :key="action.id"
                  :variant="getActionVariant(action)"
                  size="sm"
                  :class="'w-full font-bold' + (action.tone === 'success' ? ' bg-brand-whatsapp hover:bg-brand-whatsapp-dark border-transparent' : '')"
                  @click="handleActionToast(action.id)"
                >
                  <component :is="getActionIcon(action.iconName)" class="size-4" :stroke-width="2" />
                  {{ action.label }}
                </BaseButton>

                <BaseButton
                  variant="link"
                  size="sm"
                  class="w-full text-xs font-medium"
                  @click="handleActionToast('original')"
                >
                  {{ $t('jobDetail.shared.actions.originalPost') }}
                </BaseButton>
              </div>
            </div>

            <div class="rounded-b-none border border-t-0 border-border bg-surface-alt/50 p-compact dark:border-border dark:bg-surface-alt/20">
              <div class="flex items-start gap-2">
                <Info class="size-5 shrink-0 text-foreground-subtle" :stroke-width="2" />
                <p class="text-ds-caption-l leading-relaxed text-foreground-subtle dark:text-foreground-subtle">
                  {{ detail.safetyBody }}
                </p>
              </div>
            </div>
          </div>
        </aside>

        <!-- Main Content -->
        <div class="order-2 space-y-section">
          <!-- Job Header -->
          <section class="overflow-hidden rounded-none border border-border bg-surface dark:border-border dark:bg-surface">
            <div class="flex items-center justify-between gap-4 px-section pt-element pb-compact">
              <div class="flex items-center gap-4">
                <div class="flex items-center gap-compact">
                  <span class="relative flex h-2.5 w-2.5">
                    <span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-75" />
                    <span class="relative inline-flex h-2.5 w-2.5 rounded-full bg-success" />
                  </span>
                  <span class="text-sm font-bold text-success">{{ detail.statusLabel }}</span>
                </div>

                <div class="flex items-center gap-compact min-w-0">
                  <BaseFlag
                    :country-code="detail.countryCode"
                    size="md"
                    :alt="detail.location"
                  />
                  <span class="text-base font-bold text-foreground">{{ detail.location }}</span>
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
                {{ detail.title }}
              </h2>
            </div>

            <div class="flex flex-wrap items-center gap-x-5 gap-y-3 border-t border-border bg-surface-alt/50 px-section py-element">
              <div class="flex flex-wrap items-center gap-5 text-sm font-medium text-foreground-muted">
                <div class="cursor-default transition-colors hover:text-primary" :title="$t('jobDetail.shared.facts.postedAt')">
                  <div class="flex items-center gap-1.5">
                    <Clock class="size-flag-height-sm text-foreground-subtle" :stroke-width="2" />
                    <span>{{ detail.postedAtLabel }}</span>
                  </div>
                </div>
                <div class="hidden h-4 w-px bg-border sm:block" />
                <div class="cursor-default transition-colors hover:text-primary" :title="$t('jobDetail.shared.facts.category')">
                  <div class="flex items-center gap-1.5">
                    <Briefcase class="size-flag-height-sm text-foreground-subtle" :stroke-width="2" />
                    <span>{{ detail.hashtag }}</span>
                  </div>
                </div>
                <div class="hidden h-4 w-px bg-border sm:block" />
                <div class="cursor-default transition-colors hover:text-primary" :title="$t('jobDetail.shared.facts.company')">
                  <div class="flex items-center gap-1.5">
                    <Building2 class="size-flag-height-sm text-foreground-subtle" :stroke-width="2" />
                    <span>{{ detail.companyName }}</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <!-- Fact Groups (Required and Preferred Side by Side) -->
          <section v-if="detail.factGroups?.length">
            <div class="section-heading">
              <div class="section-heading__title">
                <ListChecks class="size-5 text-primary" :stroke-width="2" aria-hidden="true" />
                <BaseTypography variant="h3" tag="h3" weight="bold" color="text-foreground">
                  {{ $t('jobDetail.shared.sections.roleFacts') }}
                </BaseTypography>
              </div>
            </div>

            <div class="grid grid-cols-1 gap-section lg:grid-cols-2">
              <div
                v-for="(factGroup, index) in detail.factGroups"
                :key="factGroup.id"
                class="rounded-none border"
                :class="[
                   index === 0 ? 'border-primary/20 bg-surface dark:bg-surface' : 'border-orange-500/20 bg-surface dark:bg-surface'
                ]"
              >
                <!-- Title & Distinguishing Badge -->
                <div class="flex items-center justify-between border-b px-content py-element" :class="[
                  index === 0 ? 'border-primary/20 bg-primary/5 dark:bg-primary/5' : 'border-orange-500/20 bg-orange-500/5 dark:bg-orange-500/5'
                ]">
                  <h4 class="text-lg font-bold" :class="[index === 0 ? 'text-primary' : 'text-orange-600 dark:text-orange-500']">
                    {{ factGroup.title }}
                  </h4>
                  <div class="flex h-6 items-center rounded-full px-2" :class="[index === 0 ? 'bg-primary/10' : 'bg-orange-500/10']">
                    <div class="h-2 w-2 rounded-full" :class="[index === 0 ? 'animate-pulse bg-primary' : 'bg-orange-500']" />
                  </div>
                </div>

                <ul class="grid grid-cols-1 gap-content p-content">
                  <li
                    v-for="item in factGroup.items"
                    :key="item.id"
                    class="flex items-start gap-4"
                  >
                    <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-none border bg-surface dark:bg-surface-alt" :class="[index === 0 ? 'border-primary/20' : 'border-orange-500/20']">
                      <component :is="getFactIcon(item.iconName)" class="size-5" :class="[index === 0 ? 'text-primary' : 'text-orange-500 dark:text-orange-400']" :stroke-width="2" />
                    </div>
                    <div class="min-w-0 flex-1 pt-0.5">
                      <span class="mb-1 block text-ds-body-s font-normal text-foreground-muted dark:text-foreground-muted">{{ item.label }}</span>
                      <strong class="block text-ds-body-m font-bold leading-tight wrap-break-word text-foreground dark:text-foreground">{{ item.value }}</strong>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </section>


          <!-- Content Sections (Description, Requirements, Highlights) -->
          <section
            v-for="section in detail.contentSections"
            :key="section.id"
          >
            <BaseSectionHeader>
              <template #icon>
                <component :is="getSectionIcon(section.iconName)" class="size-5 text-primary" :stroke-width="2" aria-hidden="true" />
              </template>
              <BaseTypography variant="h3" tag="h3" class="font-bold text-foreground">
                {{ section.title }}
              </BaseTypography>
            </BaseSectionHeader>

            <div class="rounded-none border border-border bg-surface p-content dark:border-border dark:bg-surface">
              <!-- Paragraphs -->
              <div v-if="section.paragraphs?.length" class="space-y-element">
                <p
                  v-for="(para, pIdx) in section.paragraphs"
                  :key="pIdx"
                  class="text-base leading-relaxed text-foreground dark:text-foreground"
                >
                  {{ para }}
                </p>
              </div>

              <!-- Items as chips/tags -->
              <div v-if="section.items?.length" class="mt-element">
                <div class="flex flex-wrap gap-compact">
                  <BaseChip
                    v-for="item in section.items"
                    :key="item"
                    variant="default"
                    size="sm"
                  >
                    {{ item }}
                  </BaseChip>
                </div>
              </div>

              <!-- Accent Note -->
              <div v-if="section.accentNote" class="mt-element border-t border-border pt-element dark:border-border">
                <p class="text-base leading-relaxed">
                  <strong class="text-primary">{{ section.accentNote }}</strong>
                </p>
              </div>

              <!-- Merged Interview Section -->
              <div v-if="section.id === 'description' && detail.interviewSection" class="mt-content border-t border-border pt-content dark:border-border">
                <div class="mb-element flex items-center">
                  <h4 class="border-r-2 border-success pr-3 text-base font-bold text-foreground dark:text-foreground">{{ detail.interviewSection.title }}</h4>
                </div>
                
                <BaseDescription tag="div">
                  <p
                    v-for="(para, pIdx) in detail.interviewSection.paragraphs"
                    :key="'int-' + pIdx"
                    class="mb-element text-foreground dark:text-foreground"
                  >
                    {{ para }}
                  </p>
                </BaseDescription>

                <div v-if="detail.interviewSection.accentNote" class="mt-element rounded-none border-r-2 border-primary bg-primary/5 p-element dark:border-primary/50 dark:bg-primary/10">
                  <p class="text-ds-body-m font-bold text-primary">
                    {{ detail.interviewSection.accentNote }}
                  </p>
                </div>
              </div>
            </div>
          </section>

          <!-- Comments Section -->
          <section>
            <BaseSectionHeader>
              <template #icon>
                <MessageCircle class="size-5 text-primary" :stroke-width="2" aria-hidden="true" />
              </template>
              <BaseTypography variant="h3" tag="h3" class="font-bold text-foreground">
                {{ $t('jobDetail.shared.sections.comments') }}
              </BaseTypography>
            </BaseSectionHeader>

            <div class="rounded-none border border-border bg-surface p-content dark:border-border dark:bg-surface">
              <div class="mb-section">
                <div class="flex gap-content">
                  <div class="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-primary/10 text-sm font-bold text-primary">
                    <UserCircle class="size-10 text-primary" :stroke-width="2" />
                  </div>

                  <div class="flex-1">
                    <textarea
                      v-model="commentDraft"
                      class="w-full resize-none rounded-none border border-border bg-surface-alt p-content text-foreground outline-none transition-all placeholder:text-foreground-subtle focus:border-primary focus:ring-1 focus:ring-primary dark:border-border dark:bg-surface-alt dark:text-foreground dark:placeholder:text-foreground-subtle"
                      :placeholder="$t('jobDetail.shared.comments.placeholder')"
                      rows="3"
                    />

                    <div class="mt-element flex justify-end">
                      <button
                        type="button"
                        class="flex items-center gap-2 rounded-none bg-primary px-content py-element text-sm font-bold text-white transition-colors hover:bg-primary-dark"
                        @click="submitComment"
                      >
                        <Send class="size-4" :stroke-width="2" />
                        {{ $t('jobDetail.shared.comments.submit') }}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div class="space-y-section">
                <div
                  v-for="comment in detail.comments"
                  :key="comment.id"
                  class="flex flex-col gap-content"
                >
                  <div class="flex gap-content">
                    <div class="h-10 w-10 shrink-0 overflow-hidden rounded-full bg-surface-alt dark:bg-surface-alt">
                      <img v-if="comment.avatarSrc" alt="" class="h-full w-full object-cover" :src="comment.avatarSrc">
                      <div v-else class="flex h-full w-full items-center justify-center text-xs font-bold text-primary">
                        {{ comment.avatarFallback }}
                      </div>
                    </div>

                    <div class="flex-1">
                      <div class="mb-element flex items-center gap-element">
                        <h4 class="text-sm font-bold text-foreground dark:text-foreground">{{ comment.author }}</h4>
                        <span v-if="comment.role" class="text-xs text-primary">• {{ comment.role }}</span>
                        <span class="text-xs text-foreground-muted dark:text-foreground-muted">{{ comment.timeAgo }}</span>
                      </div>

                      <p class="mb-element text-sm leading-relaxed text-foreground dark:text-foreground">
                        {{ comment.body }}
                      </p>

                      <div class="flex items-center gap-content">
                        <button type="button" class="flex items-center gap-1 text-xs font-medium text-foreground-muted transition-colors hover:text-primary dark:text-foreground-muted dark:hover:text-primary">
                          <ThumbsUp class="size-4" :stroke-width="2" />
                          {{ comment.likes || 0 }}
                        </button>
                        <button type="button" class="flex items-center gap-1 text-xs font-medium text-foreground-muted transition-colors hover:text-error dark:text-foreground-muted dark:hover:text-error">
                          <ThumbsDown class="size-4" :stroke-width="2" />
                          {{ comment.dislikes || 0 }}
                        </button>
                        <button type="button" class="flex items-center gap-1 text-xs font-medium text-foreground-muted transition-colors hover:text-primary dark:text-foreground-muted dark:hover:text-primary">
                          <Reply class="size-4" :stroke-width="2" />
                          {{ $t('jobDetail.shared.comments.reply') }}
                        </button>
                      </div>
                    </div>
                  </div>

                  <!-- Replies -->
                  <div
                    v-for="reply in comment.replies || []"
                    :key="reply.id"
                    class="relative mt-1 flex gap-4 pr-12"
                  >
                    <div class="absolute bottom-6 right-5 top-[-20px] w-[2px] rounded-b bg-border dark:bg-border">
                      <div class="absolute bottom-0 right-0 h-[2px] w-3 bg-border dark:bg-border" />
                    </div>

                    <div class="z-10 h-9 w-9 shrink-0 rounded-none border border-border bg-surface p-0.5 dark:border-border dark:bg-surface-alt">
                      <img v-if="reply.avatarSrc" alt="" class="h-full w-full rounded-none object-contain" :src="reply.avatarSrc">
                      <div v-else class="flex h-full w-full items-center justify-center text-xs font-bold text-primary">
                        {{ reply.avatarFallback }}
                      </div>
                    </div>

                    <div class="flex-1">
                      <div class="mb-1 flex items-center gap-2">
                        <h4 class="flex items-center gap-1 text-sm font-bold text-primary">
                          {{ reply.author }}
                          <Verified v-if="reply.verified" class="size-4 text-primary" :stroke-width="2" />
                        </h4>
                        <span class="text-xs text-foreground-muted dark:text-foreground-muted">{{ reply.timeAgo }}</span>
                      </div>

                      <p class="mb-2 text-sm font-medium leading-relaxed text-foreground dark:text-foreground">
                        {{ reply.body }}
                      </p>

                      <div class="flex items-center gap-4">
                        <button type="button" class="flex items-center gap-1 text-xs font-medium text-foreground-muted transition-colors hover:text-primary dark:text-foreground-muted dark:hover:text-primary">
                          <ThumbsUp class="size-4" :stroke-width="2" />
                          {{ reply.likes || 0 }}
                        </button>
                        <button type="button" class="flex items-center gap-1 text-xs font-medium text-foreground-muted transition-colors hover:text-primary dark:text-foreground-muted dark:hover:text-primary">
                          <Reply class="size-4" :stroke-width="2" />
                          {{ $t('jobDetail.shared.comments.reply') }}
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