<script setup lang="ts">
import { useForm } from 'vee-validate'
import { toTypedSchema } from '~/shared/utils/toTypedSchema'
import { ArrowRight, Mail, CheckCircle } from 'lucide-vue-next'
import { forgotPasswordSchema } from '~/features/auth/schemas/forgotPasswordSchema'
import { useSEO } from '~/shared/composables/useSEO'

const { t } = useI18n()

useSEO({
  title: t('auth.forgotPassword.title'),
  description: t('auth.forgotPassword.subtitle'),
  robots: 'noindex,nofollow',
})

const serverError = ref('')
const isSubmitted = ref(false)

const { handleSubmit, errors, defineField, isSubmitting } = useForm({
  validationSchema: toTypedSchema(forgotPasswordSchema),
})

const [email, emailAttrs] = defineField('email')

const onSubmit = handleSubmit(async (values) => {
  serverError.value = ''
  try {
    await apiClient.post('/auth/forgot-password', { email: values.email })
    isSubmitted.value = true
  } catch {
    serverError.value = t('auth.forgotPassword.error')
  }
})
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-background px-content py-section">
    <div class="w-full max-w-md">
      <div class="bg-surface border border-border rounded-none p-8 shadow-sm">
        <!-- Success State -->
        <template v-if="isSubmitted">
          <div class="text-center py-8">
            <div class="w-16 h-16 bg-success-bg rounded-none flex items-center justify-center mx-auto mb-4">
              <CheckCircle class="size-8 text-success" aria-hidden="true" />
            </div>
            <h1 class="text-ds-h3 font-bold text-foreground">
              {{ $t('auth.forgotPassword.successTitle') }}
            </h1>
            <p class="text-ds-body-r text-muted-foreground mt-3">
              {{ $t('auth.forgotPassword.successMessage') }}
            </p>
            <NuxtLink
              to="/auth/login"
              class="inline-flex items-center gap-2 mt-6 text-primary font-semibold hover:underline transition-colors duration-fast"
            >
              <ArrowRight class="size-4 rotate-180" aria-hidden="true" />
              {{ $t('auth.forgotPassword.backToLogin') }}
            </NuxtLink>
          </div>
        </template>

        <!-- Form State -->
        <template v-else>
          <!-- Header -->
          <div class="text-center mb-8">
            <div class="w-16 h-16 bg-primary rounded-none flex items-center justify-center mx-auto mb-4">
              <Mail class="size-8 text-white" aria-hidden="true" />
            </div>
            <h2 class="text-ds-h2 font-bold text-foreground">
              {{ $t('auth.forgotPassword.title') }}
            </h2>
            <p class="text-ds-body-r text-muted-foreground mt-2">
              {{ $t('auth.forgotPassword.subtitle') }}
            </p>
          </div>

          <!-- Server Error -->
          <div
            v-if="serverError"
            class="bg-error-bg border border-error text-error text-ds-body-s p-3 mb-6"
            role="alert"
          >
            {{ serverError }}
          </div>

          <!-- Form -->
          <form novalidate @submit="onSubmit">
            <BaseFormField
              :label="$t('auth.forgotPassword.emailLabel')"
              :error="errors.email ? $t(errors.email) : undefined"
              for="forgot-email"
              :required="true"
            >
              <div class="relative">
                <Mail
                  class="absolute end-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none"
                  aria-hidden="true"
                />
                <BaseInput
                  id="forgot-email"
                  v-model="email"
                  v-bind="emailAttrs"
                  type="email"
                  :placeholder="$t('auth.forgotPassword.emailPlaceholder')"
                  :aria-invalid="!!errors.email"
                  autocomplete="email"
                  class="ps-10"
                />
              </div>
            </BaseFormField>

            <BaseButton
              type="submit"
              class="w-full mt-6"
              :disabled="isSubmitting"
            >
              <template v-if="isSubmitting">
                <span class="inline-block size-4 border-2 border-white/30 border-t-white rounded-full animate-spin" aria-hidden="true" />
                {{ $t('auth.forgotPassword.submitting') }}
              </template>
              <template v-else>
                {{ $t('auth.forgotPassword.submitButton') }}
              </template>
            </BaseButton>
          </form>

          <!-- Footer -->
          <div class="text-center mt-6 pt-6 border-t border-border">
            <NuxtLink
              to="/auth/login"
              class="inline-flex items-center gap-2 text-primary font-semibold hover:underline transition-colors duration-fast"
            >
              <ArrowRight class="size-4 rotate-180" aria-hidden="true" />
              {{ $t('auth.forgotPassword.backToLogin') }}
            </NuxtLink>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>
