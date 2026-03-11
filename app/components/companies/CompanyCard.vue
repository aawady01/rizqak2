<script setup lang="ts">
import { computed } from "vue";
import { Star, Building2, Building, Landmark } from "lucide-vue-next";
import BaseTypography from "~/components/base/BaseTypography.vue";
import type { Company } from "~/shared/utils/mockData";
import BaseImageWithFallback from "~/shared/components/base/BaseImageWithFallback.vue";
import { cn } from "~/shared/utils/tailwind";

interface Props {
  company: Company;
  class?: any;
}

const props = defineProps<Props>();

const emit = defineEmits<{
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
  emit("click", props.company);
};
</script>

<template>
  <div
    :class="
      cn(
        'bg-white border border-ds-border hover:border-primary/40 transition-all duration-300 w-full group relative overflow-hidden cursor-default rounded-none',
        props.class,
      )
    "
  >
    <!-- Vertical Hover Indicator -->
    <div
      class="absolute inset-inline-end-0 top-0 bottom-0 w-divider-thin bg-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
    />

    <!-- Inner Content Wrapper -->
    <div
      class="p-4 text-center w-full h-full flex flex-col items-center justify-between"
    >
      <div class="w-full">
        <div
          @click="handleClick"
          class="size-14 mx-auto bg-neutral-50 mb-3 flex items-center justify-center overflow-hidden border border-ds-border cursor-pointer rounded-none group-hover:bg-white transition-colors"
        >
          <BaseImageWithFallback
            v-if="company.logo"
            :src="company.logo"
            :alt="company.name"
            class="size-10 object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300"
            loading="lazy"
          />
          <component
            v-else
            :is="iconComponent"
            class="size-8 text-neutral-400"
            :stroke-width="1.5"
          />
        </div>

        <!-- Name -->
        <BaseTypography
          variant="body-r"
          tag="h4"
          class="mb-1 text-ds-foreground font-bold group-hover:text-primary transition-colors cursor-pointer block relative z-10"
          @click="handleClick"
        >
          {{ company.name }}
        </BaseTypography>
      </div>

      <!-- Footer Info -->
      <div class="w-full mt-3">
        <!-- Rating -->
        <div class="flex items-center justify-center gap-2 mb-2">
          <Star
            class="size-4 text-accent-500 fill-accent-500"
            :stroke-width="2"
          />
          <BaseTypography
            variant="caption-r"
            class="font-bold text-ds-foreground"
          >
            {{ company.rating }}
          </BaseTypography>
          <BaseTypography variant="caption-s" class="text-neutral-400">
            ({{ company.reviewCount }})
          </BaseTypography>
        </div>

        <!-- Job count -->
        <div
          class="bg-primary/5 py-1 px-3 border border-primary/10 rounded-none inline-block"
        >
          <BaseTypography variant="caption-s" class="text-neutral-400 font-medium">
            {{ company.availableJobs }} وظيفة متاحة
          </BaseTypography>
        </div>
      </div>
    </div>
  </div>
</template>
