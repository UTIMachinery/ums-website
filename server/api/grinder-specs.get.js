import s001 from '../../app/assets/data/grinder-master-specs-001.js'
import s002 from '../../app/assets/data/grinder-master-specs-002.js'
import s003 from '../../app/assets/data/grinder-master-specs-003.js'
import s004 from '../../app/assets/data/grinder-master-specs-004.js'
import s005 from '../../app/assets/data/grinder-master-specs-005.js'
import s006 from '../../app/assets/data/grinder-master-specs-006.js'
import s007 from '../../app/assets/data/grinder-master-specs-007.js'
import s008 from '../../app/assets/data/grinder-master-specs-008.js'
import s009 from '../../app/assets/data/grinder-master-specs-009.js'
import s010 from '../../app/assets/data/grinder-master-specs-010.js'
import s011 from '../../app/assets/data/grinder-master-specs-011.js'
import s012 from '../../app/assets/data/grinder-master-specs-012.js'
import s013 from '../../app/assets/data/grinder-master-specs-013.js'
const seen=new Set()
const rows=[s001,s002,s003,s004,s005,s006,s007,s008,s009,s010,s011,s012,s013].flat().filter(row=>{const k=JSON.stringify(row);if(seen.has(k))return false;seen.add(k);return true})
export default defineEventHandler(event=>{
 const q=getQuery(event)
 const requested=String(q.ids||q.invID||'').split(',').map(v=>v.trim()).filter(Boolean)
 if(!requested.length)return []
 const wanted=new Set(requested)
 return rows.filter(row=>wanted.has(String(row[0])))
})
