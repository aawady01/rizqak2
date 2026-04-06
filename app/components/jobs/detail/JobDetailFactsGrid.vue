<script setup lang="ts">
import type { JobDetailView } from '~/shared/types/domain'
import { getDetailIcon } from './detailIcons'

defineProps<{
  detail: JobDetailView
}>()
</script>

<template>
  <BaseCard
    class="rounded-none overflow-hidden"
    :header-class="'bg-transparent p-content md:px-section md:pt-section md:pb-content'"
    :content-class="'p-0'"
  >
    <template #header>
      <div class="job-detail-panel-header">
        <span class="job-detail-panel-header-icon">
          <component
            :is="getDetailIcon('list-checks')"
            class="size-5"
            :stroke-width="1.8"
            aria-hidden="true"
          />
        </span>
        <BaseTypography variant="h4" tag="h2" weight="bold" class="text-foreground">
          {{ $t('jobDetail.shared.sections.roleFacts') }}
        </BaseTypography>
      </div>
    </template>

    <div class="grid gap-px bg-border lg:grid-cols-2">
      <div
        v-for="(group, groupIndex) in detail.factGroups"
        :key="group.id"
        class="min-w-0 bg-surface"
      >
        <div
          class="job-detail-group-strip border-b border-border px-content py-element"
          :class="{ 'lg:border-s lg:border-border': groupIndex > 0 }"
        >
          <BaseTypography variant="caption-l" class="font-bold text-primary">
            {{ group.title }}
          </BaseTypography>
        </div>

        <div
          v-for="item in group.items"
          :key="item.id"
          class="job-detail-fact-split-row"
        >
          <div class="job-detail-fact-label-cell">
            <div class="job-detail-fact-icon">
              <component
                :is="getDetailIcon(item.iconName)"
                class="size-4 text-primary"
                :stroke-width="1.8"
                aria-hidden="true"
              />
            </div>

            <BaseTypography variant="caption-l" class="text-foreground-muted">
              {{ item.label }}
            </BaseTypography>
          </div>

          <div class="job-detail-fact-value-cell">
            <BaseTypography
              variant="body-r"
              weight="bold"
              class="text-right text-foreground"
            >
              {{ item.value }}
            </BaseTypography>
          </div>
        </div>
      </div>
    </div>
  </BaseCard>
</template>
