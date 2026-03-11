const clientDsn = process.env.NUXT_PUBLIC_SENTRY_DSN || ''

export default {
  dsn: clientDsn,
  enabled: Boolean(clientDsn),
  environment: process.env.NODE_ENV,
  tracesSampleRate: 0.1,
}
