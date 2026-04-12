<script setup lang="ts">
import { BriefcaseBusiness, CalendarDays, Clock, Info, ListChecks, Wallet, GraduationCap, BadgeCheck, Layers3, MapPin, Building2, Phone, MessageCircle, Mail, Users } from 'lucide-vue-next'
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
  <div v-if="!detail" class="page-shell py-section">
    <div class="surface-panel border border-border p-content">
      <BaseEmptyState
        :title="$t('jobDetail.shared.notFound.title')"
        :description="$t('jobDetail.shared.notFound.description')"
      >
        <template #action>
          <NuxtLink
            to="/"
            class="inline-flex items-center gap-compact border border-primary px-content py-element text-ds-body-r font-semibold text-primary transition-colors hover:bg-primary hover:text-white min-h-touch-target-min"
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
          <!-- Publisher Card (extracted) -->
          <JobPublisherCard
            :publisher="detail.publisher"
            :quick-stats="detail.quickStats"
            :is-following="isFollowing"
            @follow="handleFollow"
          />

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

            <div class="rounded-none border border-border bg-surface p-content">
              <div class="space-y-element">
                <div
                  v-for="item in detail.compensationItems"
                  :key="item.id"
                  class="flex items-center justify-between border-b border-border pb-element last:border-b-0 last:pb-0"
                >
                  <span class="text-ds-body-s font-normal text-foreground-muted">{{ item.label }}</span>
                  <span class="text-ds-body-m font-bold text-primary">{{ item.value }}</span>
                </div>

                <div v-if="detail.benefitTags.length" class="pt-compact">
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
            <div class="rounded-t-none rounded-b-none border border-border border-b-0 bg-surface p-content">
              <div class="space-y-element">
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
                  class="w-full text-ds-caption-l font-medium"
                  @click="handleActionToast('original')"
                >
                  {{ $t('jobDetail.shared.actions.originalPost') }}
                </BaseButton>
              </div>
            </div>

            <div class="rounded-b-none border border-t-0 border-border bg-surface-alt/50 p-compact">
              <div class="flex items-start gap-compact">
                <Info class="size-5 shrink-0 text-foreground-subtle" :stroke-width="2" />
                <p class="text-ds-caption-l leading-relaxed text-foreground-subtle">
                  {{ detail.safetyBody }}
                </p>
              </div>
            </div>
          </div>
        </aside>

        <!-- Main Content -->
        <div class="order-2 space-y-section">
          <!-- Job Header (extracted) -->
          <JobHeaderSection
            :status-label="detail.statusLabel"
            :country-code="detail.countryCode"
            :location="detail.location"
            :title="detail.title"
            :posted-at-label="detail.postedAtLabel"
            :hashtag="detail.hashtag"
            :company-name="detail.companyName"
            :is-saved="isSaved"
            @save="handleSave"
          />

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
                class="rounded-none border bg-surface"
                :class="[
                   index === 0 ? 'border-primary/20' : 'border-preferred-border'
                ]"
              >
                <!-- Title & Distinguishing Badge -->
                <div class="flex items-center justify-between border-b px-content py-element" :class="[
                  index === 0 ? 'border-primary/20 bg-primary/5' : 'border-preferred-border bg-preferred-bg'
                ]">
                  <h4 class="text-ds-h4 font-bold" :class="[index === 0 ? 'text-primary' : 'text-preferred-text']">
                    {{ factGroup.title }}
                  </h4>
                  <div class="flex h-6 items-center rounded-full px-compact" :class="[index === 0 ? 'bg-primary/10' : 'bg-preferred/10']">
                    <div class="h-2 w-2 rounded-full" :class="[index === 0 ? 'animate-pulse bg-primary' : 'bg-preferred']" />
                  </div>
                </div>

                <ul class="grid grid-cols-1 gap-content p-content">
                  <li
                    v-for="item in factGroup.items"
                    :key="item.id"
                    class="flex items-start gap-content"
                  >
                    <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-none border bg-surface" :class="[index === 0 ? 'border-primary/20' : 'border-preferred-border']">
                      <component :is="getFactIcon(item.iconName)" class="size-5" :class="[index === 0 ? 'text-primary' : 'text-preferred-text']" :stroke-width="2" />
                    </div>
                    <div class="min-w-0 flex-1 pt-0.5">
                      <span class="mb-1 block text-ds-body-s font-normal text-foreground-muted">{{ item.label }}</span>
                      <strong class="block text-ds-body-m font-bold leading-tight wrap-break-word text-foreground">{{ item.value }}</strong>
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

            <div class="rounded-none border border-border bg-surface p-content">
              <!-- Paragraphs -->
              <div v-if="section.paragraphs?.length" class="space-y-element">
                <p
                  v-for="(para, pIdx) in section.paragraphs"
                  :key="pIdx"
                  class="text-ds-subtitle-r leading-relaxed text-foreground"
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
              <div v-if="section.accentNote" class="mt-element border-t border-border pt-element">
                <p class="text-ds-subtitle-r leading-relaxed">
                  <strong class="text-primary">{{ section.accentNote }}</strong>
                </p>
              </div>

              <!-- Merged Interview Section -->
              <div v-if="section.id === 'description' && detail.interviewSection" class="mt-content border-t border-border pt-content">
                <div class="mb-element flex items-center">
                  <h4 class="border-r-2 border-success pe-element text-ds-subtitle-r font-bold text-foreground">{{ detail.interviewSection.title }}</h4>
                </div>
                
                <BaseDescription tag="div">
                  <p
                    v-for="(para, pIdx) in detail.interviewSection.paragraphs"
                    :key="'int-' + pIdx"
                    class="mb-element text-foreground"
                  >
                    {{ para }}
                  </p>
                </BaseDescription>

                <div v-if="detail.interviewSection.accentNote" class="mt-element rounded-none border-r-2 border-primary bg-primary/5 p-element">
                  <p class="text-ds-body-m font-bold text-primary">
                    {{ detail.interviewSection.accentNote }}
                  </p>
                </div>
              </div>
            </div>
          </section>

          <!-- Comments Section (extracted) -->
          <JobCommentsSection
            :comments="detail.comments"
            :comment-draft="commentDraft"
            @update:comment-draft="commentDraft = $event"
            @submit="submitComment"
          />
        </div>
      </div>
    </main>
  </div>
</template>