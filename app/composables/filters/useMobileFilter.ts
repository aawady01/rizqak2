import { ref, watch, onUnmounted } from 'vue'

const isMobileFilterOpen = ref(false)

let lockCount = 0

function lockBodyScroll() {
  if (typeof document === 'undefined') return

  if (lockCount === 0) {
    document.body.style.overflow = 'hidden'
    // Account for RTL support
    const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth
    if (scrollBarWidth > 0) {
      document.body.style.paddingInlineEnd = `${scrollBarWidth}px`
    }
  }
  lockCount++
}

function unlockBodyScroll() {
  if (typeof document === 'undefined') return

  lockCount--
  if (lockCount <= 0) {
    lockCount = 0
    document.body.style.overflow = ''
    document.body.style.paddingInlineEnd = ''
  }
}

export function useMobileFilter() {
  watch(isMobileFilterOpen, (isOpen) => {
    if (isOpen) {
      lockBodyScroll()
    } else {
      unlockBodyScroll()
    }
  })

  onUnmounted(() => {
    unlockBodyScroll()
  })

  function openFilter() {
    isMobileFilterOpen.value = true
  }

  function closeFilter() {
    isMobileFilterOpen.value = false
  }

  function toggleFilter() {
    isMobileFilterOpen.value = !isMobileFilterOpen.value
  }

  return {
    isMobileFilterOpen,
    openFilter,
    closeFilter,
    toggleFilter,
  }
}
