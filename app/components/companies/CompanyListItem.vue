<script setup lang="ts">
import { Star, MapPin, Users, Building2, Building, Landmark } from 'lucide-vue-next'
import BaseTypography from '~/shared/components/base/BaseTypography.vue'
import BaseChip from '~/shared/components/base/BaseChip.vue'
import type { Company } from '~/shared/types/domain'
import BaseImageWithFallback from '~/shared/components/base/BaseImageWithFallback.vue'
import { cn } from '~/shared/utils/tailwind'

interface Props {
  company: Company
  class?: string
}

const props = defineProps<Props>()

const { t } = useI18n()

const iconComponent = computed(() => {
  switch (props.company.iconName) {
    case 'building':
      return Building
    case 'landmark':
      return Landmark
    case 'building-2':
    default:
      return Building2
  }
})

const handleNameClick = () => {
  navigateTo(`/companies/${props.company.slug}`)
}
</script>

<template>
  <div
    :class="
      cn(
        'surface-panel hover:border-primary/40 transition-all duration-300 w-full group relative overflow-hidden cursor-default rounded-none',
        props.class,
      )
    "
  >
    <!-- Vertical Hover Indicator -->
    <div
      class="absolute inset-inline-end-0 top-0 bottom-0 w-divider-thin bg-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-hover"
    />

    <div class="p-content flex gap-content items-start">
      <!-- Logo / Icon -->
      <div
        class="size-14 shrink-0 bg-surface-alt flex items-center justify-center overflow-hidden border border-border cursor-pointer rounded-none group-hover:bg-surface transition-colors"
        role="button"
        tabindex="0"
        :aria-label="$t('companiesPage.goToCompany', { name: $t(company.name) })"
        @click="handleNameClick"
        @keydown.enter="handleNameClick"
        @keydown.space.prevent="handleNameClick"
      >
        <BaseImageWithFallback
          v-if="company.logo"
          :src="company.logo"
          :alt="$t(company.name)"
          class="size-10 object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300"
          loading="lazy"
        />
        <component
          :is="iconComponent"
          v-else
          class="size-8 text-foreground-muted"
          :stroke-width="1.5"
        />
      </div>

      <!-- Content -->
      <div class="flex-1 min-w-0">
        <!-- Name -->
        <BaseTypography
          variant="body-r"
          tag="h3"
          class="font-bold text-foreground group-hover:text-primary transition-colors cursor-pointer inline-block relative z-10"
          role="link"
          tabindex="0"
          @click="handleNameClick"
          @keydown.enter="handleNameClick"
          @keydown.space.prevent="handleNameClick"
        >
          {{ $t(company.name) }}
        </BaseTypography>

        <!-- Description -->
        <BaseTypography
          v-if="company.description"
          variant="caption-l"
          class="text-foreground-muted mt-0.5 line-clamp-1"
        >
          {{ $t(company.description) }}
        </BaseTypography>

        <!-- Location -->
        <div
          v-if="company.location"
          class="flex items-center gap-1 mt-compact"
        >
          <MapPin class="size-3.5 text-foreground-subtle shrink-0" :stroke-width="1.5" aria-hidden="true" />
          <BaseTypography variant="caption-r" class="text-foreground-subtle">
            {{ $t(company.location) }}
          </BaseTypography>
        </div>

        <!-- Stats Row -->
        <div class="flex items-center gap-content mt-element flex-wrap">
          <!-- Rating -->
          <div class="flex items-center gap-1">
            <Star class="size-3.5 text-accent-500 fill-accent-500" :stroke-width="2" aria-hidden="true" />
            <BaseTypography variant="caption-r" class="font-bold text-foreground">
              {{ company.rating }}
            </BaseTypography>
            <BaseTypography variant="caption-s" class="text-foreground-subtle">
              ({{ company.reviewCount }})
            </BaseTypography>
          </div>

          <!-- Available Jobs -->
          <BaseChip variant="primary" size="xs" class="gap-1">
            <span class="font-bold">{{ company.availableJobs }}</span>
            {{ $t('companyCard.availableJobs') }}
          </BaseChip>

          <!-- Placed Count -->
          <div v-if="company.placedCount" class="flex items-center gap-1">
            <Users class="size-3.5 text-foreground-subtle" :stroke-width="1.5" aria-hidden="true" />
            <BaseTypography variant="caption-s" class="text-foreground-subtle">
              {{ company.placedCount }} {{ $t('companiesPage.placed') }}
            </BaseTypography>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>