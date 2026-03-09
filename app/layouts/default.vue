<template>
  <div dir="rtl" class="min-h-screen flex flex-col bg-background text-foreground font-[Cairo]">
    <LayoutHeader />
    
    <main class="flex-1">
      <slot />
    </main>
    
    <LayoutFooter />
  </div>
</template>

<script setup lang="ts">
useSeoMeta({
  titleTemplate: (title) => title ? `${title} - رزقك` : 'Rizqak - رزقك',
})
</script>
