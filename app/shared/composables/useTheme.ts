import { ref, watch, onMounted } from 'vue'

type Theme = 'light' | 'dark'

const THEME_KEY = 'rizqak-theme'

export const useTheme = () => {
  const isDark = ref(false)
  const isInitialized = ref(false)

  const applyTheme = (dark: boolean) => {
    if (import.meta.client) {
      if (dark) {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
    }
  }

  const getStoredTheme = (): Theme | null => {
    if (import.meta.client) {
      return localStorage.getItem(THEME_KEY) as Theme | null
    }
    return null
  }

  const getSystemTheme = (): Theme => {
    if (import.meta.client) {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    }
    return 'light'
  }

  const initTheme = () => {
    const stored = getStoredTheme()
    if (stored) {
      isDark.value = stored === 'dark'
    } else {
      isDark.value = getSystemTheme() === 'dark'
    }
    applyTheme(isDark.value)
    isInitialized.value = true
  }

  const toggleTheme = () => {
    isDark.value = !isDark.value
    applyTheme(isDark.value)
    if (import.meta.client) {
      localStorage.setItem(THEME_KEY, isDark.value ? 'dark' : 'light')
    }
  }

  const setTheme = (theme: Theme) => {
    isDark.value = theme === 'dark'
    applyTheme(isDark.value)
    if (import.meta.client) {
      localStorage.setItem(THEME_KEY, theme)
    }
  }

  onMounted(() => {
    if (!isInitialized.value) {
      initTheme()
    }
  })

  watch(isDark, (newValue) => {
    applyTheme(newValue)
  })

  return {
    isDark,
    isInitialized,
    toggleTheme,
    setTheme,
    initTheme,
  }
}
