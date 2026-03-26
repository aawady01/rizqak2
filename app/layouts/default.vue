<script setup lang="ts">
const { locale, t } = useI18n()
const dir = computed(() => locale.value === 'ar' ? 'rtl' : 'ltr')

useHead({
  htmlAttrs: { lang: locale.value, dir: dir.value },
  titleTemplate: (title: string | undefined) => title ? `${title} | ${t('app.name')}` : t('app.name'),
})
</script>

<template>
  <div class="font-app-sans min-h-screen flex flex-col bg-background text-foreground">
    <a
      href="#main-content"
      class="sr-only focus:not-sr-only focus:absolute focus:top-0 focus:inset-inline-start-0 focus:z-toast focus:bg-primary focus:text-white focus:px-content focus:py-compact focus:outline-none focus:ring-2 focus:ring-primary-500"
    >
      {{ $t('layout.skipToContent') }}
    </a>

    <LayoutHeader />

    <main id="main-content" class="flex-1">
      <slot />
    </main>

    <LayoutFooter />
  </div>
</template>
