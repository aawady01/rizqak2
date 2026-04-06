<script setup lang="ts">
import { getDetailIcon } from './detailIcons'
import type { JobDetailSidebarAction, JobDetailView } from '~/shared/types/domain'

interface Props {
  detail: JobDetailView
  following: boolean
}

defineProps<Props>()

const emit = defineEmits<{
  follow: []
  action: [action: JobDetailSidebarAction]
}>()

const ratingStars = [1, 2, 3, 4, 5]
</script>

<template>
  <div class="space-y-content lg:job-detail-sticky">
    <BaseCard class="rounded-none overflow-hidden" :content-class="'space-y-content p-content'">
      <div class="flex items-center justify-between gap-content">
        <BaseTypography variant="caption-l" class="font-bold uppercase tracking-[0.08em] text-foreground-muted">
          {{ $t('jobDetail.shared.publisher.title') }}
        </BaseTypography>

        <BaseBadge
          v-if="detail.publisher.isVerified"
          variant="success"
          class="gap-1.5 px-2.5 py-1"
        >
          <component
            :is="getDetailIcon('badge-check')"
            class="size-3.5"
            :stroke-width="1.8"
            aria-hidden="true"
          />
          {{ $t('jobDetail.shared.publisher.verified') }}
        </BaseBadge>
      </div>

      <div class="job-detail-soft-card p-content">
        <div class="flex items-start gap-content">
          <div class="surface-panel flex size-16 shrink-0 items-center justify-center bg-surface p-compact">
            <BaseImageWithFallback
              v-if="detail.publisher.logo"
              :src="detail.publisher.logo"
              :alt="detail.publisher.name"
              loading="lazy"
              class="size-full object-contain"
            />
            <span
              v-else
              class="text-ds-subtitle-r font-bold text-primary"
            >
              {{ detail.publisher.name.slice(0, 2) }}
            </span>
          </div>

          <div class="min-w-0 flex-1">
            <BaseTypography variant="h4" weight="bold" class="text-foreground">
              {{ detail.publisher.name }}
            </BaseTypography>
            <BaseTypography variant="body-s" class="mt-1 text-foreground-muted">
              {{ detail.publisher.tagline }}
            </BaseTypography>

            <div class="mt-element flex flex-wrap items-center gap-compact">
              <div class="job-detail-chip px-2.5 py-1">
                <BaseTypography variant="caption-l" weight="bold" class="text-foreground">
                  {{ detail.publisher.rating }}
                </BaseTypography>
                <div class="flex items-center gap-0.5 text-accent-500">
                  <component
                    :is="getDetailIcon('star')"
                    v-for="star in ratingStars"
                    :key="star"
                    class="size-3.5"
                    :stroke-width="1.8"
                    aria-hidden="true"
                  />
                </div>
              </div>

              <BaseTypography variant="caption-l" class="font-semibold text-foreground-muted">
                {{ detail.publisher.reviewCount }}
              </BaseTypography>
            </div>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-[1fr_auto] gap-compact">
        <BaseButton
          class="w-full justify-center"
          @click="emit('follow')"
        >
          {{ following ? $t('jobDetail.shared.actions.following') : $t('jobDetail.shared.actions.followPublisher') }}
        </BaseButton>

        <div class="job-detail-soft-card flex items-center gap-compact px-content py-element">
          <component
            :is="getDetailIcon('users-round')"
            class="size-4 text-foreground-subtle"
            :stroke-width="1.8"
            aria-hidden="true"
          />
          <div class="text-right">
            <BaseTypography variant="body-s" weight="bold" class="text-foreground">
              {{ detail.publisher.followerCount }}
            </BaseTypography>
            <BaseTypography variant="caption-r" class="text-foreground-muted">
              {{ $t('jobDetail.shared.publisher.followers') }}
            </BaseTypography>
          </div>
        </div>
      </div>

      <div class="space-y-element border-t border-border pt-content">
        <div class="job-detail-publisher-info-row">
          <span class="job-detail-panel-header-icon mt-0.5 size-8">
            <component
              :is="getDetailIcon('map-pinned')"
              class="size-4"
              :stroke-width="1.8"
              aria-hidden="true"
            />
          </span>
          <div>
            <BaseTypography variant="caption-r" class="text-foreground-muted">
              {{ $t('jobDetail.shared.publisher.headquarters') }}
            </BaseTypography>
            <BaseTypography variant="body-s" weight="bold" class="text-foreground">
              {{ detail.publisher.headquarters }}
            </BaseTypography>
          </div>
        </div>

        <div class="job-detail-publisher-info-row">
          <span class="job-detail-panel-header-icon mt-0.5 size-8">
            <component
              :is="getDetailIcon('shield-check')"
              class="size-4"
              :stroke-width="1.8"
              aria-hidden="true"
            />
          </span>
          <div>
            <BaseTypography variant="caption-r" class="text-foreground-muted">
              {{ $t('jobDetail.shared.publisher.license') }}
            </BaseTypography>
            <BaseTypography variant="body-s" weight="bold" class="text-foreground">
              {{ detail.publisher.license }}
            </BaseTypography>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-2 gap-compact border-t border-border pt-content">
        <div
          v-for="stat in detail.publisher.stats"
          :key="stat.id"
          class="job-detail-stat-tile px-content py-element text-center"
        >
          <BaseTypography variant="subtitle-r" weight="bold" class="text-foreground">
            {{ stat.value }}
          </BaseTypography>
          <BaseTypography variant="caption-r" class="mt-1 text-foreground-muted">
            {{ stat.label }}
          </BaseTypography>
        </div>
      </div>
    </BaseCard>

    <BaseCard
      class="rounded-none overflow-hidden"
      :header-class="'bg-transparent p-content'"
      :content-class="'space-y-content p-content'"
    >
      <template #header>
        <div class="job-detail-panel-header">
          <span class="job-detail-panel-header-icon">
            <component
              :is="getDetailIcon('wallet')"
              class="size-5"
              :stroke-width="1.8"
              aria-hidden="true"
            />
          </span>
          <BaseTypography variant="h4" tag="h2" weight="bold" class="text-foreground">
            {{ $t('jobDetail.shared.sections.compensation') }}
          </BaseTypography>
        </div>
      </template>

      <div class="divide-y divide-border">
        <div
          v-for="item in detail.compensationItems"
          :key="item.id"
          class="job-detail-fact-row px-0"
        >
          <BaseTypography variant="caption-l" class="text-foreground-muted">
            {{ item.label }}
          </BaseTypography>
          <BaseTypography variant="body-r" weight="bold" class="text-right text-foreground">
            {{ item.value }}
          </BaseTypography>
        </div>
      </div>

      <div class="flex flex-wrap gap-compact border-t border-border pt-content">
        <span
          v-for="benefit in detail.benefitTags"
          :key="benefit"
          class="job-detail-chip text-ds-caption-l font-semibold"
        >
          {{ benefit }}
        </span>
      </div>
    </BaseCard>

    <BaseCard class="rounded-none overflow-hidden" :content-class="'space-y-element p-content'">
      <BaseButton
        v-for="action in detail.sidebarActions"
        :key="action.id"
        :variant="action.variant"
        class="w-full justify-center"
        :class="action.tone === 'success' ? 'job-detail-whatsapp-button' : ''"
        @click="emit('action', action)"
      >
        <component
          :is="getDetailIcon(action.iconName)"
          class="size-4"
          :stroke-width="1.8"
          aria-hidden="true"
        />
        {{ action.label }}
      </BaseButton>

      <button
        type="button"
        class="text-center text-ds-caption-l font-semibold text-primary transition-colors duration-fast hover:text-primary-dark"
        @click="emit('action', { id: 'original-post', label: $t('jobDetail.shared.actions.originalPost'), iconName: 'send', variant: 'secondary' })"
      >
        {{ $t('jobDetail.shared.actions.originalPost') }}
      </button>
    </BaseCard>

    <BaseCard class="rounded-none overflow-hidden bg-surface-alt/50" :content-class="'p-content'">
      <div class="flex items-start gap-compact">
        <component
          :is="getDetailIcon('shield-check')"
          class="mt-0.5 size-5 shrink-0 text-primary"
          :stroke-width="1.8"
          aria-hidden="true"
        />
        <div>
          <BaseTypography variant="body-r" weight="bold" class="text-foreground">
            {{ detail.safetyTitle }}
          </BaseTypography>
          <BaseTypography variant="caption-l" class="mt-compact text-foreground-muted">
            {{ detail.safetyBody }}
          </BaseTypography>
        </div>
      </div>
    </BaseCard>
  </div>
</template>
