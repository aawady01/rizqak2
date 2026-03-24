import { defineStore } from 'pinia'

export const useUIStore = defineStore('ui', () => {
  const sidebarOpen = ref(true)
  const mobileMenuOpen = ref(false)

  const isSidebarOpen = computed(() => sidebarOpen.value)
  const isMobileMenuOpen = computed(() => mobileMenuOpen.value)

  function toggleSidebar() {
    sidebarOpen.value = !sidebarOpen.value
  }

  function setSidebarOpen(open: boolean) {
    sidebarOpen.value = open
  }

  function toggleMobileMenu() {
    mobileMenuOpen.value = !mobileMenuOpen.value
  }

  function setMobileMenuOpen(open: boolean) {
    mobileMenuOpen.value = open
  }

  return {
    sidebarOpen,
    mobileMenuOpen,
    isSidebarOpen,
    isMobileMenuOpen,
    toggleSidebar,
    setSidebarOpen,
    toggleMobileMenu,
    setMobileMenuOpen,
  }
})
