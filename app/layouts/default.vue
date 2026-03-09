<template>
  <div dir="rtl" class="font-app-sans min-h-screen flex flex-col bg-background text-foreground">
    <LayoutHeader />

    <main class="flex-1">
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
