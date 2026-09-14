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

const payloads = [
  legacyPayload,
  hbmAD,
  hbmEH,
  hbmIM,
  hbmNS,
  hbmTZ,
  vtlAD,
  vtlEH,
  vtlIM
]

const seen = new Set()
const rows = payloads.flatMap(decode).filter(row => {
  const key = JSON.stringify(row)
  if (seen.has(key)) return false
  seen.add(key)
  return true
})

export default defineEventHandler((event) => {
  const query = getQuery(event)
  const requested = String(query.ids || query.invID || '')
    .split(',')
    .map(v => v.trim())
    .filter(Boolean)

  if (!requested.length) return []

  const wanted = new Set(requested)
  return rows.filter(row => wanted.has(String(row[0])))
})
