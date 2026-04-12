<script setup lang="ts">
import {
  Building2,
  Wallet,
  Hammer,
  Wrench,
  ClipboardPlus,
  Package,
  Bookmark,
  BookmarkCheck,
} from "lucide-vue-next";
import BaseTypography from "~/shared/components/base/BaseTypography.vue";
import BaseChip from "~/shared/components/base/BaseChip.vue";
import type { Job } from "~/shared/utils/mockData";
import { getJobPath } from "~/shared/utils/jobDetails";

interface Props {
  job: Job;
}

const props = defineProps<Props>();
const { t } = useI18n();

const isSaved = ref(props.job.isSaved ?? false);

const jobPath = computed(() => getJobPath(props.job))

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
  e.preventDefault();
  isSaved.value = !isSaved.value;
};
</script>

<template>
  <NuxtLink
    :to="jobPath"
    class="surface-panel relative hover:border-primary/40 transition-all duration-300 cursor-pointer group overflow-hidden rounded-none block"
    :aria-label="job.title"
  >
    <!-- Vertical Hover Indicator — always on the inline-start (right in RTL, left in LTR) -->
    <div
      class="absolute inset-inline-start-0 top-0 bottom-0 w-divider-thin bg-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-hover"
    />

    <div class="p-content">
      <div class="flex flex-col sm:flex-row items-start gap-content">
        <!-- Company Logo -->
        <div
          class="size-12 sm:size-14 border border-border bg-surface-alt p-compact shrink-0 flex items-center justify-center rounded-none shadow-sm transition-all group-hover:bg-surface-alt"
        >
          <NuxtImg
            v-if="job.companyLogo"
            :src="job.companyLogo"
            :alt="$t(job.companyName)"
            class="size-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300"
            loading="lazy"
            decoding="async"
            width="56"
            height="56"
          />
          <component
            :is="iconComponent"
            v-else
            class="size-7 text-foreground-muted"
            :stroke-width="1.5"
          />
        </div>

        <!-- Content -->
        <div class="grow min-w-0">
          <div class="flex justify-between items-start gap-content">
            <div class="flex flex-col items-start w-full min-w-0">
              <!-- Meta Row -->
              <div class="flex items-center gap-compact mb-compact">
                <span
                  class="font-bold text-primary hover:text-primary-dark transition-colors text-ds-caption-l"
                  @click.prevent.stop
                >
                  {{ $t(job.hashtag) }}
                </span>
                <div class="size-1 bg-border rounded-full" />
                <BaseTypography
                  variant="caption-r"
                  class="text-foreground-muted font-medium"
                >
                  {{ $t(job.timeAgo) }}
                </BaseTypography>
              </div>

              <!-- Title -->
              <BaseTypography
                variant="h3"
                tag="h3"
                class="mb-compact text-foreground font-bold group-hover:text-primary transition-colors cursor-pointer w-fit relative z-10 leading-tight"
              >
                {{ $t(job.title) }}
              </BaseTypography>

              <!-- Location & Company -->
              <div
                class="flex flex-wrap items-center gap-x-4 gap-y-compact w-full mb-element"
              >
                <div class="flex items-center gap-compact min-w-0">
                  <BaseFlag
                    :country-code="job.countryCode"
                    size="sm"
                    :alt="$t(job.country)"
                  />
                  <BaseTypography
                    variant="body-s"
                    class="text-foreground-muted font-medium hover:text-primary transition-colors"
                  >
                    {{ $t(job.country) }}
                  </BaseTypography>
                </div>
                <div class="size-1 bg-border rounded-full" />
                <div class="flex items-center gap-compact">
                  <Building2
                    class="size-4 text-foreground-muted"
                    :stroke-width="2"
                    aria-hidden="true"
                  />
                  <BaseTypography
                    variant="body-s"
                    class="text-foreground-muted font-medium hover:text-primary transition-colors"
                  >
                    {{ $t(job.companyName) }}
                  </BaseTypography>
                </div>
              </div>

              <!-- Salary & Benefits -->
              <div class="flex flex-wrap items-center gap-element w-full">
                <BaseChip variant="primary" size="md" class="gap-1.5">
                  <Wallet class="size-4" :stroke-width="2" />
                  <BaseTypography variant="body-s" class="font-bold">
                    {{ $t(job.salary) }}
                  </BaseTypography>
                </BaseChip>

                <div class="flex flex-wrap gap-compact">
                  <BaseChip
                    v-for="benefit in job.benefits"
                    :key="benefit.label"
                    variant="default"
                    size="sm"
                  >
                    {{ $t(benefit.label) }}
                  </BaseChip>
                </div>
              </div>
            </div>

            <!-- Save Action -->
            <button
              class="shrink-0 self-start p-compact transition-all active:scale-90 outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-1 cursor-pointer"
              :class="[
                isSaved
                  ? 'text-primary drop-shadow-sm'
                  : 'text-foreground-subtle hover:text-primary',
              ]"
              :title="isSaved ? $t('jobCard.save.saved') : $t('jobCard.save.unsaved')"
              @click="toggleSaved"
            >
              <BookmarkCheck
                v-if="isSaved"
                class="size-7"
                :stroke-width="1.5"
              />
              <Bookmark
                v-else
                class="size-7"
                :stroke-width="1.5"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  </NuxtLink>
</template>
