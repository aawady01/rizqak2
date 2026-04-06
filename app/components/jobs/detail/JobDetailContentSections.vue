<script setup lang="ts">
import type { JobDetailView } from '~/shared/types/domain'
import { getDetailIcon } from './detailIcons'

defineProps<{
  detail: JobDetailView
}>()
</script>

<template>
  <BaseCard class="rounded-none overflow-hidden" :content-class="'space-y-content p-content'">
    <div
      v-for="(section, index) in detail.contentSections"
      :key="section.id"
      class="space-y-element"
      :class="{ 'border-t border-border pt-content': index > 0 }"
    >
      <div class="job-detail-panel-header">
        <span class="job-detail-panel-header-icon">
          <component
            :is="getDetailIcon(section.iconName)"
            class="size-5"
            :stroke-width="1.8"
            aria-hidden="true"
          />
        </span>
        <BaseTypography variant="h4" tag="h2" weight="bold" class="text-foreground">
          {{ section.title }}
        </BaseTypography>
      </div>

      <template v-if="section.paragraphs?.length">
        <BaseDescription
          v-for="paragraph in section.paragraphs"
          :key="paragraph"
          variant="muted"
        >
          {{ paragraph }}
        </BaseDescription>
      </template>

      <ul
        v-if="section.items?.length"
        class="job-detail-soft-card divide-y divide-border"
      >
        <li
          v-for="item in section.items"
          :key="item"
          class="job-detail-list-item px-content py-element"
        >
          <span class="mt-2 inline-flex size-2 shrink-0 rounded-full bg-primary" aria-hidden="true" />
          <BaseTypography variant="body-r" class="text-foreground-muted">
            {{ item }}
          </BaseTypography>
        </li>
      </ul>

      <div
        v-if="section.accentNote"
        class="job-detail-accent-note px-content py-element"
      >
        <BaseTypography variant="body-r" weight="semibold" class="text-primary-dark">
          {{ section.accentNote }}
        </BaseTypography>
      </div>
    </div>

    <div
      v-if="detail.interviewSection"
      class="space-y-element border-t border-border pt-content"
    >
      <div class="job-detail-panel-header">
        <span class="job-detail-panel-header-icon">
          <component
            :is="getDetailIcon(detail.interviewSection.iconName)"
            class="size-5"
            :stroke-width="1.8"
            aria-hidden="true"
          />
        </span>
        <BaseTypography variant="h4" tag="h2" weight="bold" class="text-foreground">
          {{ detail.interviewSection.title }}
        </BaseTypography>
      </div>

      <BaseDescription
        v-for="paragraph in detail.interviewSection.paragraphs"
        :key="paragraph"
        variant="muted"
      >
        {{ paragraph }}
      </BaseDescription>

      <div
        v-if="detail.interviewSection.accentNote"
        class="job-detail-accent-note px-content py-element"
      >
        <BaseTypography variant="body-r" weight="semibold" class="text-primary-dark">
          {{ detail.interviewSection.accentNote }}
        </BaseTypography>
      </div>
    </div>
  </BaseCard>
</template>
