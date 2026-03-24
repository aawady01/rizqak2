export default defineNitroPlugin((nitroApp) => {
  nitroApp.hooks.hook('request', (event) => {
    setHeader(event, 'X-Content-Type-Options', 'nosniff')
    setHeader(event, 'X-Frame-Options', 'SAMEORIGIN')
    setHeader(event, 'Referrer-Policy', 'strict-origin-when-cross-origin')
    setHeader(event, 'Permissions-Policy', 'geolocation=(), microphone=(), camera=()')
    setHeader(event, 'Cross-Origin-Opener-Policy', 'same-origin')
    setHeader(event, 'Cross-Origin-Resource-Policy', 'same-origin')
    setHeader(event, 'X-DNS-Prefetch-Control', 'off')
    setHeader(event, 'Origin-Agent-Cluster', '?1')

    const csp = [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' https:",
      "style-src 'self' 'unsafe-inline' https:",
      "img-src 'self' data: blob: https:",
      "font-src 'self' data: https:",
      "connect-src 'self' https: ws: wss:",
      "frame-ancestors 'self'",
      "base-uri 'self'",
      "form-action 'self'",
    ].join('; ')

    setHeader(event, 'Content-Security-Policy', csp)

    const proto = getRequestProtocol(event, { xForwardedProto: true })
    if (proto === 'https') {
      setHeader(event, 'Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload')
    }
  })
})
