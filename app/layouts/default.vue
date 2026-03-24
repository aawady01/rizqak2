<template>
  <div dir="rtl" class="font-app-sans min-h-screen flex flex-col bg-background text-foreground">
    <a
      href="#main-content"
      class="sr-only focus:not-sr-only focus:absolute focus:top-0 focus:inset-inline-start-0 focus:z-toast focus:bg-primary focus:text-white focus:px-content focus:py-compact focus:outline-none focus:ring-2 focus:ring-primary-500"
    >
      {{ $t('layout.skipToContent', 'تخطي إلى المحتوى الرئيسي') }}
    </a>

    <LayoutHeader />

    <main id="main-content" class="flex-1">
      <slot />
    </main>

    <LayoutFooter />
  </div>
</template>

<script setup lang="ts">
useHead({
  titleTemplate: (title) => title ? `${title} | Rizqak` : 'Rizqak',
})
</script>
