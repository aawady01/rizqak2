export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.config.errorHandler = (err, _vm, _info) => {
    const errorDiv = document.createElement('div')
    errorDiv.style.cssText = 'position:fixed;top:0;left:0;right:0;z-index:99999;padding:20px;background:#fee;color:#900;font-family:monospace;font-size:14px;white-space:pre-wrap;max-height:80vh;overflow:auto'
    errorDiv.innerHTML = `<strong>Vue Error:</strong>\n${(err as Error).message}\n\n${(err as Error).stack}`
    document.body.prepend(errorDiv)
    console.error('[Vue Error]', err)
  }

  window.addEventListener('error', (event) => {
    console.error('[Window Error]', event.error || event.message)
  })

  window.addEventListener('unhandledrejection', (event) => {
    console.error('[Unhandled Rejection]', event.reason)
  })
})
