<script setup lang="ts">
import { computed } from '#imports'
import { useRoute } from '#imports'

const route = useRoute()

// Navigation items
const navItems = computed(() => [
  { name: 'لوحة القيادة', icon: 'dashboard', href: '/admin', active: route.path === '/admin', filled: route.path === '/admin' },
  { name: 'إدارة الوظائف', icon: 'work', href: '/admin/jobs', active: route.path.startsWith('/admin/jobs'), filled: route.path.startsWith('/admin/jobs') },
  { name: 'الشركات', icon: 'business', href: '/admin/companies', active: route.path.startsWith('/admin/companies'), filled: route.path.startsWith('/admin/companies') },
  { name: 'الدول', icon: 'public', href: '/admin/countries', active: route.path.startsWith('/admin/countries'), filled: route.path.startsWith('/admin/countries') },
  { name: 'مجالات العمل', icon: 'category', href: '/admin/fields', active: route.path.startsWith('/admin/fields'), filled: route.path.startsWith('/admin/fields') },
  { name: 'المسميات الوظيفية', icon: 'badge', href: '/admin/job-titles', active: route.path.startsWith('/admin/job-titles'), filled: route.path.startsWith('/admin/job-titles') },
])
</script>

<template>
  <div dir="rtl" class="bg-background text-foreground antialiased h-screen flex overflow-hidden font-app-sans">
    <!-- ===== SideNavBar ===== -->
    <nav class="group flex flex-col h-full w-[72px] hover:w-64 fixed right-0 z-50 bg-white border-l border-primary/20 text-foreground font-bold text-right transition-all duration-300 ease-in-out overflow-hidden">
      <!-- Logo -->
      <div class="h-[72px] border-b border-primary/20 flex items-center shrink-0">
        <div class="w-[72px] shrink-0 flex justify-center items-center">
          <div class="w-10 h-10 bg-primary text-white flex items-center justify-center font-bold text-xl">ر</div>
        </div>
        <div class="whitespace-nowrap transition-opacity duration-300 opacity-0 group-hover:opacity-100">
          <h1 class="text-2xl font-bold text-primary tracking-tight">رزقك</h1>
          <p class="text-xs mt-0 text-foreground-muted">لوحة التحكم</p>
        </div>
      </div>

      <!-- Navigation Links -->
      <div class="flex-1 py-4 overflow-y-auto overflow-x-hidden">
        <NuxtLink
          v-for="item in navItems"
          :key="item.name"
          :to="item.href"
          :class="[
            'flex items-center transition-colors relative border-b border-primary/10',
            item.active
              ? 'text-primary font-bold bg-primary/5'
              : 'text-foreground-muted hover:bg-surface-alt',
          ]"
        >
          <!-- Active Indicator -->
          <div v-if="item.active" class="absolute right-0 top-0 bottom-0 w-1 bg-primary"></div>
          
          <div class="w-[72px] h-[56px] shrink-0 flex justify-center items-center">
            <span
              class="material-symbols-outlined text-2xl"
              :style="item.filled ? 'font-variation-settings: \'FILL\' 1;' : ''"
            >{{ item.icon }}</span>
          </div>
          <span class="whitespace-nowrap transition-opacity duration-300 opacity-0 group-hover:opacity-100">
            {{ item.name }}
          </span>
        </NuxtLink>
      </div>

      <!-- Admin Profile -->
      <div class="h-[72px] border-t border-primary/20 flex items-center shrink-0">
        <div class="w-[72px] shrink-0 flex justify-center items-center">
          <div class="w-10 h-10 bg-primary/20 flex items-center justify-center text-primary font-bold text-lg">
            م
          </div>
        </div>
        <div class="whitespace-nowrap transition-opacity duration-300 opacity-0 group-hover:opacity-100">
          <p class="text-sm font-bold text-foreground m-0 leading-tight">المدير العام</p>
          <p class="text-xs text-foreground-muted m-0 leading-tight">admin@rezqak.com</p>
        </div>
      </div>
    </nav>

    <!-- ===== Main Content Area ===== -->
    <div class="flex-1 mr-[72px] flex flex-col h-screen transition-all duration-300 min-w-0">
      <slot />
    </div>
  </div>
</template>
