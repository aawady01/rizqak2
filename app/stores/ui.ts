import { defineStore } from 'pinia'

interface Toast {
  id: string
  type: 'success' | 'error' | 'warning' | 'info'
  title: string
  message?: string
  duration?: number
}

interface UIState {
  sidebarOpen: boolean
  mobileMenuOpen: boolean
  toasts: Toast[]
  theme: 'light' | 'dark'
}

export const useUIStore = defineStore('ui', {
  state: (): UIState => ({
    sidebarOpen: true,
    mobileMenuOpen: false,
    toasts: [],
    theme: 'light',
  }),

  getters: {
    isSidebarOpen: (state) => state.sidebarOpen,
    isMobileMenuOpen: (state) => state.mobileMenuOpen,
    currentTheme: (state) => state.theme,
    hasToasts: (state) => state.toasts.length > 0,
  },

  actions: {
    toggleSidebar() {
      this.sidebarOpen = !this.sidebarOpen
    },

    setSidebarOpen(open: boolean) {
      this.sidebarOpen = open
    },

    toggleMobileMenu() {
      this.mobileMenuOpen = !this.mobileMenuOpen
    },

    setMobileMenuOpen(open: boolean) {
      this.mobileMenuOpen = open
    },

    showToast(toast: Omit<Toast, 'id'>) {
      const id = `toast-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`
      const newToast: Toast = {
        id,
        duration: 5000,
        ...toast,
      }

      this.toasts.push(newToast)

      if (newToast.duration && newToast.duration > 0) {
        setTimeout(() => {
          this.dismissToast(id)
        }, newToast.duration)
      }
    },

    dismissToast(id: string) {
      const index = this.toasts.findIndex(t => t.id === id)
      if (index !== -1) {
        this.toasts.splice(index, 1)
      }
    },

    clearToasts() {
      this.toasts = []
    },

    setTheme(theme: 'light' | 'dark') {
      this.theme = theme
      if (import.meta.client) {
        localStorage.setItem('theme', theme)
        document.documentElement.classList.toggle('dark', theme === 'dark')
      }
    },

    toggleTheme() {
      this.setTheme(this.theme === 'light' ? 'dark' : 'light')
    },

    initTheme() {
      if (import.meta.client) {
        const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null
        if (savedTheme) {
          this.setTheme(savedTheme)
        } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
          this.setTheme('dark')
        }
      }
    },
  },
})
