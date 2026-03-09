import {
  ROBOTS_DISALLOW_PATHS,
  escapeXml,
  resolveSiteUrl,
} from '~/server/utils/seo'

export default defineEventHandler((event) => {
  const siteUrl = resolveSiteUrl(event)

  const body = [
    'User-agent: *',
    'Allow: /',
    '',
    '# Disallow private routes',
    ...ROBOTS_DISALLOW_PATHS.map((path) => `Disallow: ${path}`),
    '',
    '# Sitemap',
    `Sitemap: ${escapeXml(`${siteUrl}/sitemap.xml`)}`,
  ].join('\n')

  setHeader(event, 'Content-Type', 'text/plain; charset=utf-8')
  return `${body}\n`
})
