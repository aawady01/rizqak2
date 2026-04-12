<script setup lang="ts">
import { Bookmark, BookmarkCheck, Briefcase, Building2, Clock } from 'lucide-vue-next'

interface Props {
  statusLabel: string
  countryCode: string
  location: string
  title: string
  postedAtLabel: string
  hashtag: string
  companyName: string
  isSaved: boolean
}

defineProps<Props>()

const emit = defineEmits<{
  save: []
}>()
</script>

<template>
  <section class="overflow-hidden rounded-none border border-border bg-surface">
    <div class="flex items-center justify-between gap-content px-section pt-element pb-compact">
      <div class="flex items-center gap-content">
        <div class="flex items-center gap-compact">
          <span class="relative flex h-2.5 w-2.5">
            <span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-75" />
            <span class="relative inline-flex h-2.5 w-2.5 rounded-full bg-success" />
          </span>
          <span class="text-ds-body-r font-bold text-success">{{ statusLabel }}</span>
        </div>

        <div class="flex items-center gap-compact min-w-0">
          <BaseFlag
            :country-code="countryCode"
            size="md"
            :alt="location"
          />
          <span class="text-ds-subtitle-r font-bold text-foreground">{{ location }}</span>
        </div>
      </div>

      <button
        type="button"
        class="shrink-0 p-compact transition-all active:scale-90 outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-1 cursor-pointer min-w-touch-target-compact min-h-touch-target-compact flex items-center justify-center"
        :class="[
          isSaved
            ? 'text-primary drop-shadow-sm'
            : 'text-foreground-subtle hover:text-primary',
        ]"
        :title="isSaved ? $t('jobCard.save.saved') : $t('jobCard.save.unsaved')"
        :aria-label="isSaved ? $t('jobCard.save.saved') : $t('jobCard.save.unsaved')"
        @click="emit('save')"
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

    <div class="px-section pb-content">
      <h2 class="mb-0 text-ds-h2 font-bold leading-tight text-foreground">
        {{ title }}
      </h2>
    </div>

    <div class="flex flex-wrap items-center gap-x-content gap-y-element border-t border-border bg-surface-alt/50 px-section py-element">
      <div class="flex flex-wrap items-center gap-content text-ds-body-r font-medium text-foreground-muted">
        <div class="cursor-default transition-colors hover:text-primary" :title="$t('jobDetail.shared.facts.postedAt')">
          <div class="flex items-center gap-1.5">
            <Clock class="size-flag-height-sm text-foreground-subtle" :stroke-width="2" />
            <span>{{ postedAtLabel }}</span>
          </div>
        </div>
        <div class="hidden h-4 w-px bg-border sm:block" />
        <div class="cursor-default transition-colors hover:text-primary" :title="$t('jobDetail.shared.facts.category')">
          <div class="flex items-center gap-1.5">
            <Briefcase class="size-flag-height-sm text-foreground-subtle" :stroke-width="2" />
            <span>{{ hashtag }}</span>
          </div>
        </div>
        <div class="hidden h-4 w-px bg-border sm:block" />
        <div class="cursor-default transition-colors hover:text-primary" :title="$t('jobDetail.shared.facts.company')">
          <div class="flex items-center gap-1.5">
            <Building2 class="size-flag-height-sm text-foreground-subtle" :stroke-width="2" />
            <span>{{ companyName }}</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
