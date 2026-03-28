export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.config.errorHandler = (err, _vm, _info) => {
    const errorDiv = document.createElement('div')
    const bgColor = 'var(--color-error-bg, #fff5f5)'
    const textColor = 'var(--color-error, #e53e3e)'
    errorDiv.style.cssText = `position:fixed;top:0;left:0;right:0;z-index:99999;padding:20px;background:${bgColor};color:${textColor};font-family:monospace;font-size:14px;white-space:pre-wrap;max-height:80vh;overflow:auto`

    const strong = document.createElement('strong')
    strong.textContent = 'Vue Error:'
    errorDiv.appendChild(strong)

    const messageNode = document.createTextNode(
      `\n${(err as Error).message}\n\n${(err as Error).stack ?? ''}`
    )
    errorDiv.appendChild(messageNode)

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
