<script setup lang="ts">
import { useForm } from 'vee-validate'
import { toTypedSchema } from '~/shared/utils/toTypedSchema'
import { UserPlus, Eye, EyeOff, Mail, Lock, User } from 'lucide-vue-next'
import { registerSchema } from '~/features/auth/schemas/registerSchema'
import { useSEO } from '~/shared/composables/useSEO'

const { t } = useI18n()
const authStore = useAuthStore()

useSEO({
  title: t('auth.register.title'),
  description: t('auth.register.subtitle'),
  robots: 'noindex,nofollow',
})

const showPassword = ref(false)
const showConfirmPassword = ref(false)
const serverError = ref('')

const { handleSubmit, errors, defineField, isSubmitting } = useForm({
  validationSchema: toTypedSchema(registerSchema),
})

const [name, nameAttrs] = defineField('name')
const [email, emailAttrs] = defineField('email')
const [password, passwordAttrs] = defineField('password')
const [confirmPassword, confirmPasswordAttrs] = defineField('confirmPassword')
const [role, roleAttrs] = defineField('role')

const onSubmit = handleSubmit(async (values) => {
  serverError.value = ''
  try {
    await authStore.register({
      name: values.name,
      email: values.email,
      password: values.password,
      role: values.role,
    })
    navigateTo('/')
  } catch {
    serverError.value = t('auth.register.error')
  }
})

const roleOptions = [
  { value: 'jobseeker', label: 'auth.register.roleJobseeker' },
  { value: 'employer', label: 'auth.register.roleEmployer' },
] as const
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-background px-content py-section">
    <div class="w-full max-w-md">
      <div class="surface-panel rounded-none p-content shadow-sm">
        <!-- Header -->
        <div class="text-center mb-section">
          <div class="w-16 h-16 bg-primary rounded-none flex items-center justify-center mx-auto mb-element">
            <UserPlus class="size-8 text-white" aria-hidden="true" />
          </div>
          <h1 class="text-ds-h2 font-bold text-foreground">
            {{ $t('auth.register.title') }}
          </h1>
          <p class="text-ds-body-r text-muted-foreground mt-2">
            {{ $t('auth.register.subtitle') }}
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
            <!-- Name -->
            <BaseFormField
              :label="$t('auth.register.nameLabel')"
              :error="errors.name ? $t(errors.name) : undefined"
              for="register-name"
              :required="true"
            >
              <div class="relative">
                <User
                  class="absolute end-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none"
                  aria-hidden="true"
                />
                <BaseInput
                  id="register-name"
                  v-model="name"
                  v-bind="nameAttrs"
                  type="text"
                  :placeholder="$t('auth.register.namePlaceholder')"
                  :aria-invalid="!!errors.name"
                  autocomplete="name"
                  class="ps-10"
                />
              </div>
            </BaseFormField>

            <!-- Email -->
            <BaseFormField
              :label="$t('auth.register.emailLabel')"
              :error="errors.email ? $t(errors.email) : undefined"
              for="register-email"
              :required="true"
            >
              <div class="relative">
                <Mail
                  class="absolute end-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none"
                  aria-hidden="true"
                />
                <BaseInput
                  id="register-email"
                  v-model="email"
                  v-bind="emailAttrs"
                  type="email"
                  :placeholder="$t('auth.register.emailPlaceholder')"
                  :aria-invalid="!!errors.email"
                  autocomplete="email"
                  class="ps-10"
                />
              </div>
            </BaseFormField>

            <!-- Password -->
            <BaseFormField
              :label="$t('auth.register.passwordLabel')"
              :error="errors.password ? $t(errors.password) : undefined"
              for="register-password"
              :required="true"
            >
              <div class="relative">
                <Lock
                  class="absolute end-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none"
                  aria-hidden="true"
                />
                <BaseInput
                  id="register-password"
                  v-model="password"
                  v-bind="passwordAttrs"
                  :type="showPassword ? 'text' : 'password'"
                  :placeholder="$t('auth.register.passwordPlaceholder')"
                  :aria-invalid="!!errors.password"
                  autocomplete="new-password"
                  class="ps-10 pe-10"
                />
                <button
                  type="button"
                  class="absolute end-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors duration-fast"
                  :aria-label="showPassword ? $t('auth.register.hidePassword') : $t('auth.register.showPassword')"
                  @click="showPassword = !showPassword"
                >
                  <EyeOff v-if="showPassword" class="size-4" aria-hidden="true" />
                  <Eye v-else class="size-4" aria-hidden="true" />
                </button>
              </div>
            </BaseFormField>

            <!-- Confirm Password -->
            <BaseFormField
              :label="$t('auth.register.confirmPasswordLabel')"
              :error="errors.confirmPassword ? $t(errors.confirmPassword) : undefined"
              for="register-confirm-password"
              :required="true"
            >
              <div class="relative">
                <Lock
                  class="absolute end-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none"
                  aria-hidden="true"
                />
                <BaseInput
                  id="register-confirm-password"
                  v-model="confirmPassword"
                  v-bind="confirmPasswordAttrs"
                  :type="showConfirmPassword ? 'text' : 'password'"
                  :placeholder="$t('auth.register.confirmPasswordPlaceholder')"
                  :aria-invalid="!!errors.confirmPassword"
                  autocomplete="new-password"
                  class="ps-10 pe-10"
                />
                <button
                  type="button"
                  class="absolute end-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors duration-fast"
                  :aria-label="showConfirmPassword ? $t('auth.register.hidePassword') : $t('auth.register.showPassword')"
                  @click="showConfirmPassword = !showConfirmPassword"
                >
                  <EyeOff v-if="showConfirmPassword" class="size-4" aria-hidden="true" />
                  <Eye v-else class="size-4" aria-hidden="true" />
                </button>
              </div>
            </BaseFormField>

            <!-- Role Selection -->
            <BaseFormField
              :label="$t('auth.register.roleLabel')"
              :error="errors.role ? $t(errors.role) : undefined"
              for="register-role"
              :required="true"
            >
              <div class="flex gap-3" role="radiogroup" :aria-label="$t('auth.register.roleLabel')">
                <!-- eslint-disable-next-line vuejs-accessibility/label-has-for -- input is nested inside label (valid pattern) -->
                <label
                  v-for="option in roleOptions"
                  :key="option.value"
                  class="flex-1 flex items-center justify-center gap-2 h-12 border-2 cursor-pointer transition-all duration-fast"
                  :class="role === option.value
                    ? 'border-primary bg-primary/5 text-primary font-semibold'
                    : 'border-border text-muted-foreground hover:border-border-strong'"
                >
                  <input
                    v-bind="roleAttrs"
                    type="radio"
                    :value="option.value"
                    :checked="role === option.value"
                    class="sr-only"
                    @change="role = option.value"
                  >
                  {{ $t(option.label) }}
                </label>
              </div>
            </BaseFormField>
          </div>

          <!-- Submit -->
          <BaseButton
            type="submit"
            class="w-full mt-6"
            :disabled="isSubmitting"
          >
            <template v-if="isSubmitting">
              <span class="inline-block size-4 border-2 border-white/30 border-t-white rounded-full animate-spin" aria-hidden="true" />
              {{ $t('auth.register.submitting') }}
            </template>
            <template v-else>
              {{ $t('auth.register.submitButton') }}
            </template>
          </BaseButton>
        </form>

        <!-- Footer -->
        <div class="text-center mt-6 pt-6 border-t border-border">
          <p class="text-ds-body-s text-muted-foreground">
            {{ $t('auth.register.hasAccount') }}
            <NuxtLink
              to="/auth/login"
              class="text-primary font-semibold hover:underline ms-1 transition-colors duration-fast"
            >
              {{ $t('auth.register.signIn') }}
            </NuxtLink>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
