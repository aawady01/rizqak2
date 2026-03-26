<script setup lang="ts">
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
    <Toaster rich-colors position="bottom-center" :dir="$i18n.locale === 'ar' ? 'rtl' : 'ltr'" />
  </NuxtLayout>
</template>
