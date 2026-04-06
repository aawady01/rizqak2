<script setup lang="ts">
import { Star, Building2, Building, Landmark } from "lucide-vue-next";
import BaseTypography from "~/shared/components/base/BaseTypography.vue";
import type { Company } from "~/shared/utils/mockData";
import BaseImageWithFallback from "~/shared/components/base/BaseImageWithFallback.vue";
import { cn } from "~/shared/utils/tailwind";

interface Props {
  company: Company;
  class?: string;
}

const props = defineProps<Props>();

const _emit = defineEmits<{
  click: [company: Company];
}>();

const iconComponent = computed(() => {
  switch (props.company.iconName) {
    case "building":
      return Building;
    case "landmark":
      return Landmark;
    case "building-2":
    default:
      return Building2;
  }
});

const handleClick = () => {
  navigateTo(`/companies/${props.company.slug}`);
};
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

    <!-- Inner Content Wrapper -->
    <div
      class="p-content text-center w-full h-full flex flex-col items-center justify-between"
    >
      <div class="w-full">
        <div
          class="size-14 mx-auto bg-surface-alt mb-element flex items-center justify-center overflow-hidden border border-border cursor-pointer rounded-none group-hover:bg-surface transition-colors"
          role="button"
          tabindex="0"
          @click="handleClick"
          @keydown.enter="handleClick"
          @keydown.space.prevent="handleClick"
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

        <!-- Name -->
        <BaseTypography
          variant="body-r"
          tag="h4"
          class="mb-1 text-foreground font-bold group-hover:text-primary transition-colors cursor-pointer block relative z-10"
          role="button"
          tabindex="0"
          @click="handleClick"
          @keydown.enter="handleClick"
          @keydown.space.prevent="handleClick"
        >
          {{ $t(company.name) }}
        </BaseTypography>
      </div>

      <!-- Footer Info -->
      <div class="w-full mt-element">
        <!-- Rating -->
        <div class="flex items-center justify-center gap-compact mb-compact">
          <Star
            class="size-4 text-accent-500 fill-accent-500"
            :stroke-width="2"
            aria-hidden="true"
          />
          <BaseTypography
            variant="caption-r"
            class="font-bold text-foreground"
          >
            {{ company.rating }}
          </BaseTypography>
          <BaseTypography variant="caption-s" class="text-foreground-subtle">
            ({{ company.reviewCount }})
          </BaseTypography>
        </div>

        <!-- Job count -->
        <BaseChip variant="primary" size="sm" class="mx-auto gap-1">
          <span class="font-bold">{{ company.availableJobs }}</span>
          {{ $t('companyCard.availableJobs') }}
        </BaseChip>
      </div>
    </div>
  </div>
</template>
