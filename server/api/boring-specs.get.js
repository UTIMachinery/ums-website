import { gunzipSync } from 'node:zlib'

import legacyPayload from '../../app/assets/data/boring-historical-specs.gz.b64.js'

import hbmAD from '../../app/assets/data/boring-specs-hbm-a-d.b64.js'
import hbmEH from '../../app/assets/data/boring-specs-hbm-e-h.b64.js'
import hbmIM from '../../app/assets/data/boring-specs-hbm-i-m.b64.js'
import hbmNS from '../../app/assets/data/boring-specs-hbm-n-s.b64.js'
import hbmTZ from '../../app/assets/data/boring-specs-hbm-t-z.b64.js'

import vtlAD from '../../app/assets/data/boring-specs-vtl-a-d.b64.js'
import vtlEH from '../../app/assets/data/boring-specs-vtl-e-h.b64.js'
import vtlIM from '../../app/assets/data/boring-specs-vtl-i-m.b64.js'

function decode(payload) {
  return JSON.parse(gunzipSync(Buffer.from(payload, 'base64')).toString('utf8'))
}

function dedupe(rows) {
  const seen = new Set()
  return rows.filter(row => {
    const key = JSON.stringify(row)
    if (seen.has(key)) return false
    seen.add(key)
    return true
  })
}

const legacyRows = dedupe(decode(legacyPayload))
const hbmRows = dedupe([hbmAD,hbmEH,hbmIM,hbmNS,hbmTZ].flatMap(decode))
const vtlRows = dedupe([vtlAD,vtlEH,vtlIM].flatMap(decode))

export default defineEventHandler((event) => {
  const query = getQuery(event)
  const requested = String(query.ids || query.invID || '')
    .split(',')
    .map(v => v.trim())
    .filter(Boolean)

  if (!requested.length) return []

  const wanted = new Set(requested)
  const type = String(query.type || '').toLowerCase()
  const primary = type === 'hbm' ? hbmRows : type === 'vtl' ? vtlRows : []
  const primaryMatches = primary.filter(row => wanted.has(String(row[0])))

  const matchedIds = new Set(primaryMatches.map(row => String(row[0])))
  const missingIds = new Set(requested.filter(id => !matchedIds.has(String(id))))
  const fallbackMatches = legacyRows.filter(row => missingIds.has(String(row[0])))

  return dedupe([...primaryMatches, ...fallbackMatches])
})
