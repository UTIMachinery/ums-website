import specs001 from '../../app/assets/data/grinder-master-specs-001.js'
import specs002 from '../../app/assets/data/grinder-master-specs-002.js'
import specs003 from '../../app/assets/data/grinder-master-specs-003.js'
import specs004 from '../../app/assets/data/grinder-master-specs-004.js'
import specs005 from '../../app/assets/data/grinder-master-specs-005.js'
import specs006 from '../../app/assets/data/grinder-master-specs-006.js'
import specs007 from '../../app/assets/data/grinder-master-specs-007.js'
import specs008 from '../../app/assets/data/grinder-master-specs-008.js'
import specs009 from '../../app/assets/data/grinder-master-specs-009.js'
import specs010 from '../../app/assets/data/grinder-master-specs-010.js'
import specs011 from '../../app/assets/data/grinder-master-specs-011.js'
import specs012 from '../../app/assets/data/grinder-master-specs-012.js'
import specs013 from '../../app/assets/data/grinder-master-specs-013.js'

const seen = new Set()
const rows = [specs001, specs002, specs003, specs004, specs005, specs006, specs007, specs008, specs009, specs010, specs011, specs012, specs013].flat().filter(row => {
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
