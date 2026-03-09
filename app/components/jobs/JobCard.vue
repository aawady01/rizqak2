<script setup lang="ts">
import { ref, computed } from "vue";
import {
  Building2,
  Wallet,
  Hammer,
  Wrench,
  ClipboardPlus,
  Package,
} from "lucide-vue-next";
import BaseTypography from "~/components/base/BaseTypography.vue";
import type { Job } from "~/shared/utils/mockData";

interface Props {
  job: Job;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  click: [job: Job];
}>();

const isSaved = ref(props.job.isSaved ?? false);

const iconComponent = computed(() => {
  switch (props.job.iconName) {
    case "hard-hat":
      return Hammer;
    case "wrench":
      return Wrench;
    case "heart-pulse":
      return ClipboardPlus;
    case "truck":
      return Package;
    default:
      return Building2;
  }
});

const toggleSaved = (e: Event) => {
  e.stopPropagation();
  isSaved.value = !isSaved.value;
};

const handleClick = () => {
  emit("click", props.job);
};
</script>

<template>
  <div
    class="relative bg-white border border-ds-border hover:border-primary/40 transition-all duration-300 cursor-default group overflow-hidden rounded-none"
  >
    <!-- Vertical Hover Indicator -->
    <div
      class="absolute inset-inline-end-0 top-0 bottom-0 w-[2px] bg-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
    />

    <div class="p-5">
      <div class="flex items-start gap-5">
        <!-- Company Logo -->
        <div
          class="size-14 border border-ds-border bg-white p-2 flex-shrink-0 flex items-center justify-center rounded-none shadow-sm transition-transform group-hover:bg-neutral-50"
        >
          <img
            v-if="job.companyLogo"
            :src="job.companyLogo"
            :alt="job.companyName"
            class="size-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300"
            loading="lazy"
          />
          <component
            v-else
            :is="iconComponent"
            class="size-7 text-neutral-400"
            :stroke-width="1.5"
          />
        </div>

        <!-- Content -->
        <div class="flex-grow min-w-0">
          <div class="flex justify-between items-start gap-4">
            <div class="flex flex-col items-start w-full min-w-0">
              <!-- Meta Row -->
              <div class="flex items-center gap-2 mb-2">
                <NuxtLink to="#" @click.prevent.stop>
                  <BaseTypography
                    variant="caption-l"
                    class="font-bold text-primary hover:text-primary-dark transition-colors"
                  >
                    {{ job.hashtag }}
                  </BaseTypography>
                </NuxtLink>
                <div class="size-1 bg-neutral-300 rounded-full" />
                <BaseTypography
                  variant="caption-r"
                  class="text-neutral-400 font-medium"
                >
                  {{ job.timeAgo }}
                </BaseTypography>
              </div>

              <!-- Title -->
              <BaseTypography
                variant="h3"
                tag="h3"
                class="mb-2 text-ds-foreground font-bold group-hover:text-primary transition-colors cursor-pointer w-fit relative z-10 leading-tight"
                @click="handleClick"
              >
                {{ job.title }}
              </BaseTypography>

              <!-- Location & Company -->
              <div
                class="flex flex-wrap items-center gap-x-4 gap-y-2 w-full mb-4"
              >
                <div class="flex items-center gap-2 min-w-0">
                  <BaseFlag
                    :country-code="job.countryCode"
                    size="sm"
                    :alt="job.country"
                  />
                  <BaseTypography
                    variant="body-s"
                    class="text-neutral-500 font-medium truncate"
                  >
                    {{ job.country }}
                  </BaseTypography>
                </div>
                <div class="size-1 bg-neutral-300 rounded-full" />
                <div class="flex items-center gap-2">
                  <Building2
                    class="size-4 text-neutral-400"
                    :stroke-width="2"
                  />
                  <BaseTypography
                    variant="body-s"
                    class="text-neutral-500 font-medium truncate"
                  >
                    {{ job.companyName }}
                  </BaseTypography>
                </div>
              </div>

              <!-- Salary & Benefits -->
              <div class="flex flex-wrap items-center gap-3 w-full">
                <!-- Salary -->
                <div
                  class="flex items-center gap-1.5 text-primary bg-primary/5 px-3 py-1 border border-primary/10 rounded-none"
                >
                  <Wallet class="size-4" :stroke-width="2" />
                  <BaseTypography variant="body-s" class="font-bold">
                    {{ job.salary }}
                  </BaseTypography>
                </div>

                <!-- Benefits Tags -->
                <div class="flex flex-wrap gap-2">
                  <span
                    v-for="benefit in job.benefits"
                    :key="benefit.label"
                    class="px-2.5 py-1 bg-neutral-50 text-ds-caption-r text-neutral-500 border border-ds-border rounded-none font-medium hover:bg-neutral-100 transition-colors"
                  >
                    {{ benefit.label }}
                  </span>
                </div>
              </div>
            </div>

            <!-- Save Action -->
            <button
              @click="toggleSaved"
              class="flex-shrink-0 self-start p-2 transition-all active:scale-90"
              :class="[
                isSaved
                  ? 'text-primary drop-shadow-sm'
                  : 'text-neutral-300 hover:text-primary',
              ]"
              :title="isSaved ? 'إلغاء الحفظ' : 'حفظ الوظيفة'"
            >
              <svg
                v-if="isSaved"
                class="size-7"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M5 3h14v18l-7-5.4L5 21V3z" />
              </svg>
              <svg
                v-else
                class="size-7"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.5"
              >
                <path d="M5 3h14v18l-7-5.4L5 21V3z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
