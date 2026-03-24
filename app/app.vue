<script setup lang="ts">
const { locale } = useI18n()
const dir = computed(() => locale.value === 'ar' ? 'rtl' : 'ltr')
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
    <Toaster rich-colors position="bottom-center" :dir="dir" />
  </NuxtLayout>
</template>
