<script setup lang="ts">
import { useForm } from 'vee-validate'
import { toTypedSchema } from '~/shared/utils/toTypedSchema'
import { ArrowRight, Lock, Eye, EyeOff, CheckCircle } from 'lucide-vue-next'
import { resetPasswordSchema } from '~/features/auth/schemas/resetPasswordSchema'
import { useSEO } from '~/shared/composables/useSEO'

const { t } = useI18n()
const route = useRoute()

useSEO({
  title: t('auth.resetPassword.title'),
  description: t('auth.resetPassword.subtitle'),
  robots: 'noindex,nofollow',
})

const token = computed(() => (route.query.token as string) ?? '')

const showPassword = ref(false)
const showConfirmPassword = ref(false)
const serverError = ref('')
const isSubmitted = ref(false)

const { handleSubmit, errors, defineField, isSubmitting } = useForm({
  validationSchema: toTypedSchema(resetPasswordSchema),
})

const [password, passwordAttrs] = defineField('password')
const [confirmPassword, confirmPasswordAttrs] = defineField('confirmPassword')

const onSubmit = handleSubmit(async (values) => {
  serverError.value = ''
  try {
    await apiClient.post('/auth/reset-password', {
      token: token.value,
      password: values.password,
    })
    isSubmitted.value = true
  } catch {
    serverError.value = t('auth.resetPassword.error')
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
              {{ $t('auth.resetPassword.successTitle') }}
            </h1>
            <p class="text-ds-body-r text-muted-foreground mt-3">
              {{ $t('auth.resetPassword.successMessage') }}
            </p>
            <NuxtLink
              to="/auth/login"
              class="inline-flex items-center gap-2 mt-6 text-primary font-semibold hover:underline transition-colors duration-fast"
            >
              <ArrowRight class="size-4 rotate-180" aria-hidden="true" />
              {{ $t('auth.resetPassword.backToLogin') }}
            </NuxtLink>
          </div>
        </template>

        <!-- Form State -->
        <template v-else>
          <!-- Header -->
          <div class="text-center mb-8">
            <div class="w-16 h-16 bg-primary rounded-none flex items-center justify-center mx-auto mb-4">
              <Lock class="size-8 text-white" aria-hidden="true" />
            </div>
            <h2 class="text-ds-h2 font-bold text-foreground">
              {{ $t('auth.resetPassword.title') }}
            </h2>
            <p class="text-ds-body-r text-muted-foreground mt-2">
              {{ $t('auth.resetPassword.subtitle') }}
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
            <div class="space-y-5">
              <!-- New Password -->
              <BaseFormField
                :label="$t('auth.resetPassword.passwordLabel')"
                :error="errors.password ? $t(errors.password) : undefined"
                for="reset-password"
                :required="true"
              >
                <div class="relative">
                  <Lock
                    class="absolute end-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none"
                    aria-hidden="true"
                  />
                  <BaseInput
                    id="reset-password"
                    v-model="password"
                    v-bind="passwordAttrs"
                    :type="showPassword ? 'text' : 'password'"
                    :placeholder="$t('auth.resetPassword.passwordPlaceholder')"
                    :aria-invalid="!!errors.password"
                    autocomplete="new-password"
                    class="ps-10 pe-10"
                  />
                  <button
                    type="button"
                    class="absolute end-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors duration-fast"
                    :aria-label="$t('auth.resetPassword.passwordPlaceholder')"
                    @click="showPassword = !showPassword"
                  >
                    <EyeOff v-if="showPassword" class="size-4" aria-hidden="true" />
                    <Eye v-else class="size-4" aria-hidden="true" />
                  </button>
                </div>
              </BaseFormField>

              <!-- Confirm Password -->
              <BaseFormField
                :label="$t('auth.resetPassword.confirmPasswordLabel')"
                :error="errors.confirmPassword ? $t(errors.confirmPassword) : undefined"
                for="reset-confirm-password"
                :required="true"
              >
                <div class="relative">
                  <Lock
                    class="absolute end-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none"
                    aria-hidden="true"
                  />
                  <BaseInput
                    id="reset-confirm-password"
                    v-model="confirmPassword"
                    v-bind="confirmPasswordAttrs"
                    :type="showConfirmPassword ? 'text' : 'password'"
                    :placeholder="$t('auth.resetPassword.confirmPasswordPlaceholder')"
                    :aria-invalid="!!errors.confirmPassword"
                    autocomplete="new-password"
                    class="ps-10 pe-10"
                  />
                  <button
                    type="button"
                    class="absolute end-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors duration-fast"
                    :aria-label="$t('auth.resetPassword.confirmPasswordPlaceholder')"
                    @click="showConfirmPassword = !showConfirmPassword"
                  >
                    <EyeOff v-if="showConfirmPassword" class="size-4" aria-hidden="true" />
                    <Eye v-else class="size-4" aria-hidden="true" />
                  </button>
                </div>
              </BaseFormField>
            </div>

            <BaseButton
              type="submit"
              class="w-full mt-6"
              :disabled="isSubmitting"
            >
              <template v-if="isSubmitting">
                <span class="inline-block size-4 border-2 border-white/30 border-t-white rounded-full animate-spin" aria-hidden="true" />
                {{ $t('auth.resetPassword.submitting') }}
              </template>
              <template v-else>
                {{ $t('auth.resetPassword.submitButton') }}
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
              {{ $t('auth.resetPassword.backToLogin') }}
            </NuxtLink>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>
