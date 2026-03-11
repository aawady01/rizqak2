<script setup lang="ts">
import { LayoutGrid } from "lucide-vue-next";
import type { Country } from "~/shared/utils/mockData";
import { cn } from "~/shared/utils/tailwind";

interface Props {
  country: Country;
  isSelected?: boolean;
  class?: string;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  click: [country: Country];
}>();
</script>

<template>
  <button
    @click="emit('click', country)"
    :class="
      cn(
        'flex flex-col items-center justify-center p-4 border text-white transition-all h-country-card w-full rounded-none',
        isSelected
          ? 'bg-white/20 border-white/40 ring-1 ring-white/20'
          : 'bg-white/5 hover:bg-white/15 border-white/10 hover:border-white/30',
        props.class,
      )
    "
  >
    <LayoutGrid
      v-if="country.isAllCountries"
      class="size-6 mb-3"
      :stroke-width="2"
    />
    <BaseFlag
      v-else
      :country-code="country.countryCode"
      size="md"
      :alt="country.name"
      class="mb-3"
    />

    <BaseTypography variant="caption-l" class="font-bold text-white/90 mb-1">{{
      country.name
    }}</BaseTypography>

    <div class="flex items-baseline gap-1">
      <BaseTypography variant="subtitle-l" class="font-bold text-white">
        {{ country.jobCount.toLocaleString("ar-EG") }}
      </BaseTypography>
      <BaseTypography variant="caption-s" class="text-white/60">
        وظيفة
      </BaseTypography>
    </div>
  </button>
</template>
