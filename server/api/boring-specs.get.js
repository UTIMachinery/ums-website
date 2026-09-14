import { gunzipSync } from 'node:zlib'

import specs01 from '../../app/assets/data/boring-master-specs-01.b64.js'
import specs02 from '../../app/assets/data/boring-master-specs-02.b64.js'
import specs03 from '../../app/assets/data/boring-master-specs-03.b64.js'
import specs04 from '../../app/assets/data/boring-master-specs-04.b64.js'
import specs05 from '../../app/assets/data/boring-master-specs-05.b64.js'
import specs06 from '../../app/assets/data/boring-master-specs-06.b64.js'
import specs07 from '../../app/assets/data/boring-master-specs-07.b64.js'
import specs08 from '../../app/assets/data/boring-master-specs-08.b64.js'
import specs09 from '../../app/assets/data/boring-master-specs-09.b64.js'
import specs10 from '../../app/assets/data/boring-master-specs-10.b64.js'
import specs11 from '../../app/assets/data/boring-master-specs-11.b64.js'
import specs12 from '../../app/assets/data/boring-master-specs-12.b64.js'

function decode(name, payload) {
  try {
    return JSON.parse(gunzipSync(Buffer.from(payload, 'base64')).toString('utf8'))
  } catch (error) {
    console.error('[boring-specs] failed to decode '+name, error?.message || error)
    return []
  }
}

const payloads = [
  ['01',specs01],['02',specs02],['03',specs03],['04',specs04],
  ['05',specs05],['06',specs06],['07',specs07],['08',specs08],
  ['09',specs09],['10',specs10],['11',specs11],['12',specs12]
]

const seen = new Set()
const rows = payloads.flatMap(([name,payload])=>decode(name,payload)).filter(row => {
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
