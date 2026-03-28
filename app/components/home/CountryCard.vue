<script setup lang="ts">
import { LayoutGrid } from "lucide-vue-next";
import type { Country } from "~/shared/utils/mockData";
import { cn } from "~/shared/utils/tailwind";

const { locale } = useI18n();

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
    :class="
      cn(
        'flex flex-col items-center justify-center p-content border text-white transition-all h-country-card w-full rounded-none',
        isSelected
          ? 'bg-white/20 border-white/40 ring-1 ring-white/20'
          : 'bg-white/5 hover:bg-white/15 border-white/10 hover:border-white/30',
        props.class,
      )
    "
    @click="emit('click', country)"
  >
    <LayoutGrid
      v-if="country.isAllCountries"
      class="size-6 mb-element"
      :stroke-width="2"
    />
    <BaseFlag
      v-else
      :country-code="country.countryCode"
      size="md"
      :alt="$t(country.name)"
      class="mb-element"
    />

    <BaseTypography variant="caption-l" class="font-bold text-white/90 mb-1">{{ $t(country.name) }}</BaseTypography>

    <div class="flex items-baseline gap-1">
      <BaseTypography variant="subtitle-l" class="font-bold text-white">
        {{ country.jobCount.toLocaleString(locale === 'ar' ? 'ar-EG' : 'en-US') }}
      </BaseTypography>
      <BaseTypography variant="caption-s" class="text-white/60">
        {{ $t('countryCard.jobCount') }}
      </BaseTypography>
    </div>
  </button>
</template>


