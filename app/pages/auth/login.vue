<script setup lang="ts">
import { useForm } from 'vee-validate'
import { toTypedSchema } from '~/shared/utils/toTypedSchema'
import { LogIn, Eye, EyeOff, Mail, Lock } from 'lucide-vue-next'
import { loginSchema } from '~/features/auth/schemas/loginSchema'
import { useSEO } from '~/shared/composables/useSEO'

const { t } = useI18n()
const authStore = useAuthStore()

useSEO({
  title: t('auth.login.title'),
  description: t('auth.login.subtitle'),
  robots: 'noindex,nofollow',
})

const showPassword = ref(false)
const serverError = ref('')

const { handleSubmit, errors, defineField, isSubmitting } = useForm({
  validationSchema: toTypedSchema(loginSchema),
})

const [email, emailAttrs] = defineField('email')
const [password, passwordAttrs] = defineField('password')

const onSubmit = handleSubmit(async (values) => {
  serverError.value = ''
  try {
    await authStore.login(values.email, values.password)
    navigateTo('/')
  } catch {
    serverError.value = t('auth.login.error')
  }
})
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-background px-content py-section">
    <div class="w-full max-w-md">
      <div class="bg-surface border border-border rounded-none p-8 shadow-sm">
        <!-- Header -->
        <div class="text-center mb-8">
          <div class="w-16 h-16 bg-primary rounded-none flex items-center justify-center mx-auto mb-4">
            <LogIn class="size-8 text-white" aria-hidden="true" />
          </div>
          <h1 class="text-ds-h2 font-bold text-foreground">
            {{ $t('auth.login.title') }}
          </h1>
          <p class="text-ds-body-r text-muted-foreground mt-2">
            {{ $t('auth.login.subtitle') }}
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
            <!-- Email -->
            <BaseFormField
              :label="$t('auth.login.emailLabel')"
              :error="errors.email ? $t(errors.email) : undefined"
              for="login-email"
              :required="true"
            >
              <div class="relative">
                <Mail
                  class="absolute end-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none"
                  aria-hidden="true"
                />
                <BaseInput
                  id="login-email"
                  v-model="email"
                  v-bind="emailAttrs"
                  type="email"
                  :placeholder="$t('auth.login.emailPlaceholder')"
                  :aria-invalid="!!errors.email"
                  autocomplete="email"
                  class="ps-10"
                />
              </div>
            </BaseFormField>

            <!-- Password -->
            <BaseFormField
              :label="$t('auth.login.passwordLabel')"
              :error="errors.password ? $t(errors.password) : undefined"
              for="login-password"
              :required="true"
            >
              <div class="relative">
                <Lock
                  class="absolute end-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none"
                  aria-hidden="true"
                />
                <BaseInput
                  id="login-password"
                  v-model="password"
                  v-bind="passwordAttrs"
                  :type="showPassword ? 'text' : 'password'"
                  :placeholder="$t('auth.login.passwordPlaceholder')"
                  :aria-invalid="!!errors.password"
                  autocomplete="current-password"
                  class="ps-10 pe-10"
                />
                <button
                  type="button"
                  class="absolute end-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors duration-fast"
                  :aria-label="showPassword ? $t('auth.login.passwordPlaceholder') : $t('auth.login.passwordPlaceholder')"
                  @click="showPassword = !showPassword"
                >
                  <EyeOff v-if="showPassword" class="size-4" aria-hidden="true" />
                  <Eye v-else class="size-4" aria-hidden="true" />
                </button>
              </div>
            </BaseFormField>
          </div>

          <!-- Links Row -->
          <div class="flex items-center justify-between mt-4">
            <NuxtLink
              to="/auth/forgot-password"
              class="text-ds-caption-r text-primary hover:underline transition-colors duration-fast"
            >
              {{ $t('auth.login.forgotPassword') }}
            </NuxtLink>
          </div>

          <!-- Submit -->
          <BaseButton
            type="submit"
            class="w-full mt-6"
            :disabled="isSubmitting"
          >
            <template v-if="isSubmitting">
              <span class="inline-block size-4 border-2 border-white/30 border-t-white rounded-full animate-spin" aria-hidden="true" />
              {{ $t('auth.login.submitting') }}
            </template>
            <template v-else>
              {{ $t('auth.login.submitButton') }}
            </template>
          </BaseButton>
        </form>

        <!-- Footer -->
        <div class="text-center mt-6 pt-6 border-t border-border">
          <p class="text-ds-body-s text-muted-foreground">
            {{ $t('auth.login.noAccount') }}
            <NuxtLink
              to="/auth/register"
              class="text-primary font-semibold hover:underline ms-1 transition-colors duration-fast"
            >
              {{ $t('auth.login.createAccount') }}
            </NuxtLink>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
