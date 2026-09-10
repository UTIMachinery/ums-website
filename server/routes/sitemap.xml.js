import mazak1 from '../../app/assets/data/mazak-historical-single-1.js'
import mazak2 from '../../app/assets/data/mazak-historical-single-2.js'
import mazak3 from '../../app/assets/data/mazak-historical-single-3.js'
import mazak4 from '../../app/assets/data/mazak-historical-single-4.js'
import mazakCollisions1 from '../../app/assets/data/mazak-historical-collision-1.js'
import mazakCollisions2 from '../../app/assets/data/mazak-historical-collision-2.js'
import haas from '../../app/assets/data/haas-historical-detailed.js'
import okuma from '../../app/assets/data/okuma-historical-detailed.js'
import moriSeiki from '../../app/assets/data/moriseiki-historical-detailed.js'

const BASE = 'https://usedmachinerysource.com'

const escapeXml = value => String(value)
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;')
  .replaceAll("'", '&apos;')

export default defineEventHandler(event => {
  setHeader(event, 'content-type', 'application/xml; charset=utf-8')
  setHeader(event, 'cache-control', 'public, max-age=3600, s-maxage=3600')

  const urls = new Set([
    '/',
    '/equipment',
    '/wanted',
    '/spec-library/cnc-lathes',
    '/spec-library/mazak/cnc-lathes',
    '/spec-library/haas/cnc-lathes',
    '/spec-library/okuma/cnc-lathes',
    '/spec-library/mori-seiki/cnc-lathes'
  ])

  const mazakEntries = [...mazak1, ...mazak2, ...mazak3, ...mazak4, ...mazakCollisions1, ...mazakCollisions2]
  for (const entry of mazakEntries) {
    if (entry?.slug && entry.slug !== 'kfhgkdfj') urls.add(`/spec-library/mazak/${entry.slug}`)
  }

  for (const entry of haas) {
    if (entry?.slug && entry.records?.some(record => record.specs?.length || record.recordedSpecs?.trim())) {
      urls.add(`/spec-library/haas/${entry.slug}`)
    }
  }

  for (const entry of okuma) {
    if (entry?.slug && entry.records?.some(record => record.specs?.length || record.recordedSpecs?.trim())) {
      urls.add(`/spec-library/okuma/${entry.slug}`)
    }
  }

  for (const entry of moriSeiki) {
    if (entry?.slug && entry.records?.some(record => record.specs?.length || record.recordedSpecs?.trim())) {
      urls.add(`/spec-library/mori-seiki/${entry.slug}`)
    }
  }

  const body = [...urls]
    .map(path => `  <url><loc>${escapeXml(BASE + path)}</loc></url>`)
    .join('\n')

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>`
})
