import { gunzipSync } from 'node:zlib'
import machinesData from '../../app/assets/data/machines.json'
import mazak1 from '../../app/assets/data/mazak-historical-single-1.js'
import mazak2 from '../../app/assets/data/mazak-historical-single-2.js'
import mazak3 from '../../app/assets/data/mazak-historical-single-3.js'
import mazak4 from '../../app/assets/data/mazak-historical-single-4.js'
import mazakCollisions1 from '../../app/assets/data/mazak-historical-collision-1.js'
import mazakCollisions2 from '../../app/assets/data/mazak-historical-collision-2.js'
import haas from '../../app/assets/data/haas-historical-detailed.js'
import okumaP1 from '../../app/assets/data/okuma-packed/p1.js'
import okumaP2 from '../../app/assets/data/okuma-packed/p2.js'
import okumaP3 from '../../app/assets/data/okuma-packed/p3.js'
import okumaP4 from '../../app/assets/data/okuma-packed/p4.js'
import moriP1 from '../../app/assets/data/moriseiki-packed/p1.js'
import moriP2 from '../../app/assets/data/moriseiki-packed/p2.js'
import moriP3 from '../../app/assets/data/moriseiki-packed/p3.js'
import moriP4 from '../../app/assets/data/moriseiki-packed/p4.js'

const BASE = 'https://www.usedmachinerysource.com'
const unpack = parts => JSON.parse(gunzipSync(Buffer.from(parts.join(''), 'base64')).toString('utf8'))
const okuma = unpack([okumaP1, okumaP2, okumaP3, okumaP4])
const moriSeiki = unpack([moriP1, moriP2, moriP3, moriP4])

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
    '/equipment/type/cnc-lathes-turning-centers',
    '/equipment/type/vertical-machining-centers',
    '/equipment/type/horizontal-machining-centers',
    '/equipment/type/vertical-boring-mills-vtls',
    '/equipment/type/grinders-lappers-hones',
    '/equipment/type/fabrication-machinery',
    '/equipment/type/edm-machines',
    '/equipment/type/engine-lathes-milling-drilling',
    '/wanted',
    '/about',
    '/services',
    '/sell-your-machine',
    '/contact',
    '/spec-library/cnc-lathes',
    '/spec-library/mazak/cnc-lathes',
    '/spec-library/haas/cnc-lathes',
    '/spec-library/okuma/cnc-lathes',
    '/spec-library/mori-seiki/cnc-lathes'
  ])

  for (const machine of machinesData) {
    const offMarket = machine.OffMarket ?? machine.Off_Market ?? 0
    if (Number(machine.Sold) !== 0 || Number(offMarket) !== 0 || Number(machine.dont_advertise) !== 0) continue
    const slug = `${machine.Manufacturer || ''}-${machine.Model || ''}`
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '')
    if (machine.InvID && slug) urls.add(`/equipment/${machine.InvID}/${slug}`)
  }

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
