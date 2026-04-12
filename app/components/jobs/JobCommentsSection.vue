<script setup lang="ts">
import { MessageCircle, Reply, Send, ThumbsDown, ThumbsUp, UserCircle, Verified } from 'lucide-vue-next'

interface Comment {
  id: string
  author: string
  avatarSrc?: string
  avatarFallback: string
  role?: string
  timeAgo: string
  body: string
  likes?: number
  dislikes?: number
  replies?: Reply[]
}

interface Reply {
  id: string
  author: string
  avatarSrc?: string
  avatarFallback: string
  verified?: boolean
  timeAgo: string
  body: string
  likes?: number
}

defineProps<{
  comments: Comment[]
  commentDraft: string
}>()

const emit = defineEmits<{
  'update:commentDraft': [value: string]
  submit: []
}>()
</script>

<template>
  <section>
    <BaseSectionHeader>
      <template #icon>
        <MessageCircle class="size-5 text-primary" :stroke-width="2" aria-hidden="true" />
      </template>
      <BaseTypography variant="h3" tag="h3" class="font-bold text-foreground">
        {{ $t('jobDetail.shared.sections.comments') }}
      </BaseTypography>
    </BaseSectionHeader>

    <div class="rounded-none border border-border bg-surface p-content">
      <!-- Comment Form -->
      <div class="mb-section">
        <div class="flex gap-content">
          <div class="flex size-comment-avatar shrink-0 items-center justify-center overflow-hidden rounded-full bg-primary/10 text-ds-body-r font-bold text-primary">
            <UserCircle class="size-10 text-primary" :stroke-width="2" />
          </div>

          <div class="flex-1">
            <textarea
              :value="commentDraft"
              class="w-full resize-none rounded-none border border-border bg-surface-alt p-content text-foreground outline-none transition-all placeholder:text-foreground-subtle focus:border-primary focus:ring-1 focus:ring-primary"
              :placeholder="$t('jobDetail.shared.comments.placeholder')"
              rows="3"
              @input="emit('update:commentDraft', ($event.target as HTMLTextAreaElement).value)"
            />

            <div class="mt-element flex justify-end">
              <BaseButton
                @click="emit('submit')"
              >
                <Send class="size-4" :stroke-width="2" />
                {{ $t('jobDetail.shared.comments.submit') }}
              </BaseButton>
            </div>
          </div>
        </div>
      </div>

      <!-- Comments List -->
      <div class="space-y-section">
        <div
          v-for="comment in comments"
          :key="comment.id"
          class="flex flex-col gap-content"
        >
          <div class="flex gap-content">
            <div class="size-comment-avatar shrink-0 overflow-hidden rounded-full bg-surface-alt">
              <img v-if="comment.avatarSrc" alt="" class="h-full w-full object-cover" :src="comment.avatarSrc">
              <div v-else class="flex h-full w-full items-center justify-center text-ds-caption-l font-bold text-primary">
                {{ comment.avatarFallback }}
              </div>
            </div>

            <div class="flex-1">
              <div class="mb-element flex items-center gap-element">
                <h4 class="text-ds-body-r font-bold text-foreground">{{ comment.author }}</h4>
                <span v-if="comment.role" class="text-ds-caption-l text-primary">• {{ comment.role }}</span>
                <span class="text-ds-caption-l text-foreground-muted">{{ comment.timeAgo }}</span>
              </div>

              <p class="mb-element text-ds-body-r leading-relaxed text-foreground">
                {{ comment.body }}
              </p>

              <div class="flex items-center gap-content">
                <button type="button" class="flex items-center gap-1 text-ds-caption-l font-medium text-foreground-muted transition-colors hover:text-primary min-h-touch-target-compact" :aria-label="$t('jobDetail.shared.comments.like')">
                  <ThumbsUp class="size-4" :stroke-width="2" />
                  {{ comment.likes || 0 }}
                </button>
                <button type="button" class="flex items-center gap-1 text-ds-caption-l font-medium text-foreground-muted transition-colors hover:text-error min-h-touch-target-compact" :aria-label="$t('jobDetail.shared.comments.dislike')">
                  <ThumbsDown class="size-4" :stroke-width="2" />
                  {{ comment.dislikes || 0 }}
                </button>
                <button type="button" class="flex items-center gap-1 text-ds-caption-l font-medium text-foreground-muted transition-colors hover:text-primary min-h-touch-target-compact" :aria-label="$t('jobDetail.shared.comments.replyAction')">
                  <Reply class="size-4" :stroke-width="2" />
                  {{ $t('jobDetail.shared.comments.reply') }}
                </button>
              </div>
            </div>
          </div>

          <!-- Replies -->
          <div
            v-for="reply in comment.replies || []"
            :key="reply.id"
            class="relative mt-1 flex gap-content ps-comment-thread-indent"
          >
            <div class="absolute bottom-6 end-5 top-[-20px] w-comment-thread-line rounded-b bg-border">
              <div class="absolute bottom-0 end-0 h-comment-thread-line w-3 bg-border" />
            </div>

            <div class="z-10 size-comment-avatar-reply shrink-0 rounded-none border border-border bg-surface p-0.5">
              <img v-if="reply.avatarSrc" alt="" class="h-full w-full rounded-none object-contain" :src="reply.avatarSrc">
              <div v-else class="flex h-full w-full items-center justify-center text-ds-caption-l font-bold text-primary">
                {{ reply.avatarFallback }}
              </div>
            </div>

            <div class="flex-1">
              <div class="mb-1 flex items-center gap-compact">
                <h4 class="flex items-center gap-1 text-ds-body-r font-bold text-primary">
                  {{ reply.author }}
                  <Verified v-if="reply.verified" class="size-4 text-primary" :stroke-width="2" />
                </h4>
                <span class="text-ds-caption-l text-foreground-muted">{{ reply.timeAgo }}</span>
              </div>

              <p class="mb-compact text-ds-body-r font-medium leading-relaxed text-foreground">
                {{ reply.body }}
              </p>

              <div class="flex items-center gap-content">
                <button type="button" class="flex items-center gap-1 text-ds-caption-l font-medium text-foreground-muted transition-colors hover:text-primary min-h-touch-target-compact" :aria-label="$t('jobDetail.shared.comments.like')">
                  <ThumbsUp class="size-4" :stroke-width="2" />
                  {{ reply.likes || 0 }}
                </button>
                <button type="button" class="flex items-center gap-1 text-ds-caption-l font-medium text-foreground-muted transition-colors hover:text-primary min-h-touch-target-compact" :aria-label="$t('jobDetail.shared.comments.replyAction')">
                  <Reply class="size-4" :stroke-width="2" />
                  {{ $t('jobDetail.shared.comments.reply') }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
