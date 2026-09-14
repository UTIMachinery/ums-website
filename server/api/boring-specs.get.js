import { gunzipSync } from 'node:zlib'
import payload from '../../app/assets/data/boring-historical-specs.gz.b64.js'

const rows = JSON.parse(gunzipSync(Buffer.from(payload, 'base64')).toString('utf8'))

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