<script setup lang="ts">
import { MapPin, ShieldCheck, Star, UserPlus, Users } from 'lucide-vue-next'

interface Publisher {
  logo?: string
  name: string
  rating: number
  reviewCount: string | number
  isVerified: boolean
  headquarters: string
  license: string
  followerCount: string | number
}

interface QuickStat {
  id: string
  value: string | number
  label: string
}

const props = defineProps<{
  publisher: Publisher
  quickStats: QuickStat[]
  isFollowing: boolean
}>()

const emit = defineEmits<{
  follow: []
}>()
</script>

<template>
  <div class="rounded-none border border-border bg-surface p-content">
    <div class="mb-element flex items-start gap-content">
      <div class="h-14 w-14 shrink-0 rounded-none border border-border bg-surface p-compact">
        <img v-if="publisher.logo" alt="" class="h-full w-full rounded-none object-contain" :src="publisher.logo">
        <div v-else class="flex h-full w-full items-center justify-center text-ds-h4 font-bold text-primary">
          {{ publisher.name.charAt(0) }}
        </div>
      </div>

      <div class="min-w-0 flex-1">
        <h3 class="mb-1 truncate text-ds-h4 font-bold leading-tight text-foreground">
          {{ publisher.name }}
        </h3>

        <div class="flex flex-wrap items-center gap-compact">
          <div class="flex items-center gap-1 rounded border border-rating-border bg-rating-bg px-compact py-0.5">
            <span class="pt-0.5 text-ds-caption-l font-bold text-foreground">{{ publisher.rating }}</span>
            <div class="flex text-gold-star">
              <Star class="size-3.5 fill-current" :stroke-width="2" />
              <Star class="size-3.5 fill-current" :stroke-width="2" />
              <Star class="size-3.5 fill-current" :stroke-width="2" />
              <Star class="size-3.5 fill-current" :stroke-width="2" />
              <Star class="size-3.5 text-foreground-subtle" :stroke-width="2" />
            </div>
          </div>

          <span class="cursor-pointer text-ds-caption-l font-medium text-foreground-muted hover:underline">
            ({{ publisher.reviewCount }})
          </span>

          <div v-if="publisher.isVerified" class="ms-auto flex items-center gap-1.5 rounded-full border border-verified-border bg-verified-bg px-compact py-0.5 sm:ms-0">
            <span class="relative flex h-2 w-2">
              <span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-verified-dot-ping opacity-75" />
              <span class="relative inline-flex h-2 w-2 rounded-full bg-verified-dot" />
            </span>
            <span class="text-ds-caption-s font-bold text-verified-text">{{ $t('jobDetail.shared.publisher.verified') }}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="mb-section flex w-full items-center justify-between gap-content">
      <BaseButton
        class="flex-1"
        @click="emit('follow')"
      >
        <UserPlus class="size-5" :stroke-width="2" />
        <span>{{ isFollowing ? $t('jobDetail.shared.actions.following') : $t('jobDetail.shared.actions.followPublisher') }}</span>
      </BaseButton>

      <div class="flex items-center gap-1.5 rounded-none border border-border bg-surface-alt px-content py-element">
        <Users class="size-5" :stroke-width="2" />
        <span class="text-ds-body-r font-bold text-foreground">{{ publisher.followerCount }}</span>
        <span class="text-ds-caption-l font-normal text-foreground-muted">{{ $t('jobDetail.shared.publisher.followers') }}</span>
      </div>
    </div>

    <div class="mb-section space-y-element border-t border-border pt-content">
      <div class="flex items-start gap-element">
        <div class="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-none bg-surface-alt text-foreground-subtle">
          <MapPin class="size-4" :stroke-width="2" />
        </div>
        <p class="text-ds-body-r font-bold leading-tight text-foreground">{{ publisher.headquarters }}</p>
      </div>

      <div class="flex items-start gap-element">
        <div class="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-none bg-surface-alt text-foreground-subtle">
          <ShieldCheck class="size-4" :stroke-width="2" />
        </div>
        <p class="text-ds-body-r font-bold leading-tight text-foreground">{{ publisher.license }}</p>
      </div>
    </div>

    <div class="grid grid-cols-2 gap-compact">
      <div
        v-for="stat in quickStats"
        :key="stat.id"
        class="cursor-default rounded-none border border-border bg-surface-alt p-compact text-center transition-colors hover:border-primary/30"
      >
        <span class="mb-0.5 block text-ds-body-m font-bold text-foreground">{{ stat.value }}</span>
        <span class="text-ds-caption-l font-normal text-foreground-muted">{{ stat.label }}</span>
      </div>
    </div>
  </div>
</template>
