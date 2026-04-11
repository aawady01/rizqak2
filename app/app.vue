<script setup lang="ts">
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
    <Toaster rich-colors position="bottom-center" :dir="String($i18n.locale) === 'ar' ? 'rtl' : 'ltr'" />
  </NuxtLayout>
</template>