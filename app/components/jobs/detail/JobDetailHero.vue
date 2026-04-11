<script setup lang="ts">
import type { JobDetailView } from '~/shared/types/domain'
import { getDetailIcon } from './detailIcons'

interface Props {
  detail: JobDetailView
  saved: boolean
}

defineProps<Props>()

const emit = defineEmits<{
  save: []
  share: []
}>()
</script>

<template>
  <section class="surface-panel job-detail-hero-surface overflow-hidden shadow-sm">
    <div class="flex flex-col gap-content p-content">
      <div class="flex flex-col gap-content lg:flex-row lg:items-start lg:justify-between">
        <div class="min-w-0 flex-1 space-y-content">
          <div class="flex flex-wrap items-center gap-compact">
            <BaseBadge
              :variant="detail.statusVariant"
              class="gap-1.5 border-transparent px-2.5 py-1 text-ds-caption-l"
            >
              <span class="relative inline-flex size-2.5" aria-hidden="true">
                <span class="absolute inset-0 animate-ping rounded-full bg-current opacity-35" />
                <span class="relative inline-flex size-2.5 rounded-full bg-current" />
              </span>
              {{ detail.statusLabel }}
            </BaseBadge>

            <span class="job-detail-kicker">
              <component
                :is="getDetailIcon('layers-3')"
                class="size-3.5"
                :stroke-width="1.8"
                aria-hidden="true"
              />
              {{ detail.hashtag }}
            </span>

            <span class="job-detail-chip text-ds-caption-l font-semibold">
              <component
                :is="getDetailIcon('clock-3')"
                class="size-3.5"
                :stroke-width="1.8"
                aria-hidden="true"
              />
              {{ detail.postedAtLabel }}
            </span>
          </div>

          <BaseTypography
            variant="h2"
            tag="h1"
            weight="extrabold"
            class="max-w-4xl text-balance leading-[1.45] text-foreground"
          >
            {{ detail.title }}
          </BaseTypography>

          <div
            v-if="detail.summaryBadges.length"
            class="flex flex-wrap gap-compact"
          >
            <span
              v-for="badge in detail.summaryBadges"
              :key="badge"
              class="job-detail-chip text-ds-caption-l font-semibold"
            >
              {{ badge }}
            </span>
          </div>
        </div>

        <div class="flex shrink-0 items-center gap-compact self-start">
          <BaseButton
            variant="secondary"
            size="icon"
            class="border border-border bg-surface hover:border-primary/30 hover:bg-primary/5"
            :aria-label="saved ? $t('jobDetail.shared.actions.unsave') : $t('jobDetail.shared.actions.save')"
            @click="emit('save')"
          >
            <component
              :is="getDetailIcon(saved ? 'bookmark-check' : 'bookmark')"
              class="size-5"
              :stroke-width="1.8"
              aria-hidden="true"
            />
          </BaseButton>

          <BaseButton
            variant="secondary"
            size="icon"
            class="border border-border bg-surface hover:border-primary/30 hover:bg-primary/5"
            :aria-label="$t('jobDetail.shared.actions.share')"
            @click="emit('share')"
          >
            <component
              :is="getDetailIcon('send')"
              class="size-5"
              :stroke-width="1.8"
              aria-hidden="true"
            />
          </BaseButton>
        </div>
      </div>
    </div>

    <div class="border-t border-border bg-surface-alt/55 p-job-detail-separator">
      <div class="job-detail-meta-grid">
        <div class="job-detail-meta-card">
          <div class="job-detail-meta-icon">
            <BaseFlag
              :country-code="detail.countryCode"
              size="sm"
              :alt="detail.location"
            />
          </div>

          <div class="min-w-0">
            <BaseTypography variant="caption-l" class="font-bold text-foreground-muted">
              {{ $t('jobDetail.shared.meta.location') }}
            </BaseTypography>
            <BaseTypography variant="subtitle-r" weight="bold" class="mt-1 truncate text-foreground">
              {{ detail.location }}
            </BaseTypography>
          </div>
        </div>

        <div class="job-detail-meta-card">
          <div class="job-detail-meta-icon">
            <component
              :is="getDetailIcon('building-2')"
              class="size-[18px]"
              :stroke-width="1.8"
              aria-hidden="true"
            />
          </div>

          <div class="min-w-0">
            <BaseTypography variant="caption-l" class="font-bold text-foreground-muted">
              {{ $t('jobDetail.shared.meta.company') }}
            </BaseTypography>
            <NuxtLink
              :to="`/companies/${detail.companySlug}`"
              class="mt-1 block truncate text-foreground hover:text-primary transition-colors"
            >
              <BaseTypography variant="subtitle-r" weight="bold" class="truncate">
                {{ detail.companyName }}
              </BaseTypography>
            </NuxtLink>
          </div>
        </div>

        <div class="job-detail-meta-card">
          <div class="job-detail-meta-icon">
            <component
              :is="getDetailIcon('wallet')"
              class="size-[18px]"
              :stroke-width="1.8"
              aria-hidden="true"
            />
          </div>

          <div class="min-w-0">
            <BaseTypography variant="caption-l" class="font-bold text-foreground-muted">
              {{ $t('jobDetail.shared.meta.salary') }}
            </BaseTypography>
            <BaseTypography variant="subtitle-r" weight="bold" class="mt-1 truncate text-foreground">
              {{ detail.salary }}
            </BaseTypography>
          </div>
        </div>

        <div class="job-detail-meta-card">
          <div class="job-detail-meta-icon">
            <component
              :is="getDetailIcon('clock-3')"
              class="size-[18px]"
              :stroke-width="1.8"
              aria-hidden="true"
            />
          </div>

          <div class="min-w-0">
            <BaseTypography variant="caption-l" class="font-bold text-foreground-muted">
              {{ $t('jobDetail.shared.meta.postedAt') }}
            </BaseTypography>
            <BaseTypography variant="subtitle-r" weight="bold" class="mt-1 truncate text-foreground">
              {{ detail.postedAtLabel }}
            </BaseTypography>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
