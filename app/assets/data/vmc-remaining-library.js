import p1 from './vmc-remaining-1.js'
import p2 from './vmc-remaining-2.js'
import p3 from './vmc-remaining-3.js'
import p4 from './vmc-remaining-4.js'
import p5 from './vmc-remaining-5.js'
import p6 from './vmc-remaining-6.js'
import p7 from './vmc-remaining-7.js'
import p8 from './vmc-remaining-8.js'

const sources=[...p1,...p2,...p3,...p4,...p5,...p6,...p7,...p8]
const manufacturers=new Map()

for(const m of sources){
  if(!m?.slug) continue
  if(!manufacturers.has(m.slug)){
    manufacturers.set(m.slug,{...m,models:[...(m.models||[])]})
    continue
  }
  const target=manufacturers.get(m.slug)
  target.records=(target.records||0)+(m.records||0)
  const models=new Map((target.models||[]).map(x=>[x.slug,{...x,years:[...(x.years||[])]}]))
  for(const model of m.models||[]){
    if(!models.has(model.slug)){
      models.set(model.slug,{...model,years:[...(model.years||[])]})
      continue
    }
    const existing=models.get(model.slug)
    existing.records=(existing.records||0)+(model.records||0)
    const yearKeys=new Set((existing.years||[]).map(y=>`${y[0]}|${y[1]}`))
    for(const year of model.years||[]){
      const key=`${year[0]}|${year[1]}`
      if(!yearKeys.has(key)){existing.years.push(year);yearKeys.add(key)}
    }
  }
  target.models=[...models.values()]
}

export default [...manufacturers.values()]
  .map(m=>({...m,models:[...(m.models||[])].sort((a,b)=>a.name.localeCompare(b.name,undefined,{numeric:true}))}))
  .sort((a,b)=>a.name.localeCompare(b.name,undefined,{numeric:true}))
