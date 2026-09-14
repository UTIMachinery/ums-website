export function mergeSpecLibrary(parts=[]){
  const manufacturers=new Map()

  for(const item of parts.flat()){
    if(!item?.slug) continue

    if(!manufacturers.has(item.slug)){
      manufacturers.set(item.slug,{
        ...item,
        records:0,
        models:[]
      })
    }

    const target=manufacturers.get(item.slug)
    target.records+=Number(item.records||0)

    for(const model of item.models||[]){
      let existing=target.models.find(m=>m.slug===model.slug)
      if(!existing){
        existing={...model,records:0,years:[]}
        target.models.push(existing)
      }
      existing.records+=Number(model.records||0)
      existing.years.push(...(model.years||[]))
    }
  }

  for(const manufacturer of manufacturers.values()){
    manufacturer.models.sort((a,b)=>a.name.localeCompare(b.name,undefined,{numeric:true,sensitivity:'base'}))
    for(const model of manufacturer.models){
      const seen=new Set()
      model.years=model.years.filter(year=>{
        const key=JSON.stringify(year)
        if(seen.has(key)) return false
        seen.add(key)
        return true
      })
    }
  }

  return [...manufacturers.values()].sort((a,b)=>a.name.localeCompare(b.name,undefined,{sensitivity:'base'}))
}
