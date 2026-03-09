export default defineNitroPlugin((nitroApp) => {
  nitroApp.hooks.hook('request', (event) => {
    setHeader(event, 'X-Content-Type-Options', 'nosniff')
    setHeader(event, 'X-Frame-Options', 'SAMEORIGIN')
    setHeader(event, 'X-XSS-Protection', '1; mode=block')
    setHeader(event, 'Referrer-Policy', 'strict-origin-when-cross-origin')
    setHeader(event, 'Permissions-Policy', 'geolocation=(), microphone=(), camera=()')
    setHeader(event, 'Strict-Transport-Security', 'max-age=31536000; includeSubDomains')
  })
})
