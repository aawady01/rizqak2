export function useScrollHeader(threshold = 5) {
  const isHidden = ref(false)
  const lastScrollY = ref(0)
  let ticking = false
  let rafId: number | null = null

  const onScroll = () => {
    if (!ticking) {
      rafId = requestAnimationFrame(() => {
        const currentScrollY = window.scrollY

        if (Math.abs(currentScrollY - lastScrollY.value) < threshold) {
          ticking = false
          return
        }

        isHidden.value = currentScrollY > lastScrollY.value && currentScrollY > 0
        lastScrollY.value = currentScrollY
        ticking = false
      })
      ticking = true
    }
  }

  const cleanup = () => {
    if (rafId !== null) {
      cancelAnimationFrame(rafId)
    }
  }

  if (import.meta.client) {
    window.addEventListener('scroll', onScroll, { passive: true })
    onScopeDispose(() => {
      window.removeEventListener('scroll', onScroll)
      cleanup()
    })
  }

  return { isHidden }
}
