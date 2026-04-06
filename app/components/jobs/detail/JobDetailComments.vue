<script setup lang="ts">
import type { JobDetailComment, JobDetailView } from '~/shared/types/domain'
import { getDetailIcon } from './detailIcons'

interface Props {
  detail: JobDetailView
}

defineProps<Props>()

const modelValue = defineModel<string>({ default: '' })

const emit = defineEmits<{
  submit: []
}>()

const hasDraft = computed(() => modelValue.value.trim().length > 0)

const commentActions = (comment: JobDetailComment) => {
  return [
    {
      id: `${comment.id}-like`,
      count: comment.likes ?? 0,
      text: 'jobDetail.shared.comments.like',
      iconName: 'thumbs-up',
    },
    {
      id: `${comment.id}-dislike`,
      count: comment.dislikes ?? 0,
      text: 'jobDetail.shared.comments.dislike',
      iconName: 'thumbs-down',
    },
    {
      id: `${comment.id}-reply`,
      count: null,
      text: 'jobDetail.shared.comments.reply',
      iconName: 'reply',
    },
  ]
}
</script>

<template>
  <BaseCard class="rounded-none overflow-hidden" :content-class="'space-y-content p-content'">
    <template #header>
      <div class="job-detail-panel-header">
        <span class="job-detail-panel-header-icon">
          <component
            :is="getDetailIcon('message-circle')"
            class="size-5"
            :stroke-width="1.8"
            aria-hidden="true"
          />
        </span>
        <BaseTypography variant="h4" tag="h2" weight="bold" class="text-foreground">
          {{ $t('jobDetail.shared.sections.comments') }}
        </BaseTypography>
      </div>
    </template>

    <div class="space-y-content">
      <div class="job-detail-soft-card p-content">
        <div class="flex gap-content">
          <BaseAvatar
            :fallback="$t('jobDetail.shared.comments.youFallback')"
            class="size-10 border-border"
          />

          <div class="min-w-0 flex-1">
            <BaseTextarea
              v-model="modelValue"
              :placeholder="$t('jobDetail.shared.comments.placeholder')"
              :aria-label="$t('jobDetail.shared.comments.placeholder')"
              class="min-h-28 rounded-none border-border bg-surface text-foreground placeholder:text-foreground-subtle focus-visible:border-primary"
            />

            <div class="mt-element flex justify-end">
              <BaseButton
                :disabled="!hasDraft"
                @click="emit('submit')"
              >
                <component
                  :is="getDetailIcon('send')"
                  class="size-4"
                  :stroke-width="1.8"
                  aria-hidden="true"
                />
                {{ $t('jobDetail.shared.comments.submit') }}
              </BaseButton>
            </div>
          </div>
        </div>
      </div>

      <div class="space-y-content border-t border-border pt-content">
        <div
          v-for="comment in detail.comments"
          :key="comment.id"
          class="space-y-element"
        >
          <div class="flex gap-content">
            <BaseAvatar
              :src="comment.avatarSrc"
              :fallback="comment.avatarFallback"
              class="size-10 border-border"
            />

            <div class="min-w-0 flex-1">
              <div class="flex flex-wrap items-center gap-compact">
                <BaseTypography variant="body-r" weight="bold" class="text-foreground">
                  {{ comment.author }}
                </BaseTypography>

                <BaseBadge
                  v-if="comment.isPublisher"
                  variant="success"
                  class="gap-1 px-2.5 py-1"
                >
                  <component
                    :is="getDetailIcon('badge-check')"
                    v-if="comment.verified"
                    class="size-3"
                    :stroke-width="1.8"
                    aria-hidden="true"
                  />
                  {{ comment.role || $t('jobDetail.shared.comments.publisherRole') }}
                </BaseBadge>

                <BaseTypography variant="caption-r" class="text-foreground-muted">
                  {{ comment.timeAgo }}
                </BaseTypography>
              </div>

              <BaseTypography variant="body-r" class="mt-compact leading-loose text-foreground-muted">
                {{ comment.body }}
              </BaseTypography>

              <div class="mt-element flex flex-wrap items-center gap-content">
                <button
                  v-for="action in commentActions(comment)"
                  :key="action.id"
                  type="button"
                  class="inline-flex items-center gap-1 text-ds-caption-l font-medium text-foreground-muted transition-colors duration-fast hover:text-primary"
                >
                  <component
                    :is="getDetailIcon(action.iconName)"
                    class="size-4"
                    :stroke-width="1.8"
                    aria-hidden="true"
                  />
                  {{ $t(action.text) }}
                  <span v-if="action.count !== null">{{ action.count }}</span>
                </button>
              </div>
            </div>
          </div>

          <div
            v-if="comment.replies?.length"
            class="job-detail-thread space-y-element"
          >
            <div
              v-for="reply in comment.replies"
              :key="reply.id"
              class="flex gap-content"
            >
              <BaseAvatar
                :src="reply.avatarSrc"
                :fallback="reply.avatarFallback"
                class="size-9 border-border"
              />

              <div class="min-w-0 flex-1">
                <div class="flex flex-wrap items-center gap-compact">
                  <BaseTypography variant="body-s" weight="bold" class="text-primary">
                    {{ reply.author }}
                  </BaseTypography>

                  <BaseBadge
                    v-if="reply.isPublisher"
                    variant="success"
                    class="gap-1 px-2.5 py-1"
                  >
                    <component
                      :is="getDetailIcon('badge-check')"
                      v-if="reply.verified"
                      class="size-3"
                      :stroke-width="1.8"
                      aria-hidden="true"
                    />
                    {{ reply.role || $t('jobDetail.shared.comments.publisherRole') }}
                  </BaseBadge>

                  <BaseTypography variant="caption-r" class="text-foreground-muted">
                    {{ reply.timeAgo }}
                  </BaseTypography>
                </div>

                <BaseTypography variant="body-s" class="mt-compact leading-loose text-foreground-muted">
                  {{ reply.body }}
                </BaseTypography>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </BaseCard>
</template>
