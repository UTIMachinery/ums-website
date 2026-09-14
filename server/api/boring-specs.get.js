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

function decode(payload) {
  return JSON.parse(gunzipSync(Buffer.from(payload, 'base64')).toString('utf8'))
}

const rows = [
  specs01, specs02, specs03, specs04, specs05, specs06,
  specs07, specs08, specs09, specs10, specs11, specs12
].flatMap(decode)

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
