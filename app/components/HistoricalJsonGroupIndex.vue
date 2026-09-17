<template>
  <main class="page">
    <section class="hero"><div class="wrap"><div class="kicker">UMS MACHINERY SPECIFICATION LIBRARY</div><h1>{{title}} Specifications</h1><p>{{groupMachines.length}} historical {{title}} machine records organized directly from the historical machine JSON.</p></div></section>

    <section class="wrap section">
      <div class="label">BROWSE THE HISTORICAL LIBRARY</div>
      <h2>Browse by Machine Type &amp; Manufacturer</h2>
      <p class="intro">Choose a machine type below, then select a manufacturer. Machine types come directly from the WebDesc field in the historical machine data.</p>
      <input v-model="q" class="search" type="search" :placeholder="`Search ${title} machine type or manufacturer`">

      <div v-for="type in filteredTypes" :key="type.name" class="type-section">
        <div class="type-heading">
          <h3>{{type.name}}</h3>
          <span>{{type.count}} historical machine{{type.count===1?'':'s'}}</span>
        </div>
        <div class="grid">
          <NuxtLink v-for="m in type.manufacturers" :key="`${type.name}-${m.slug}`" :to="manufacturerLink(m.slug,type.name)" class="card">
            <strong>{{m.name}}</strong>
            <span>{{m.count}} historical machine{{m.count===1?'':'s'}}</span>
          </NuxtLink>
        </div>
      </div>

      <p v-if="!filteredTypes.length" class="empty">No matching machine types or manufacturers found.</p>
      <HistoricalLibraryFooter />
    </section>
  </main>
</template>

<script setup>
import historicalMachines from '~/assets/data/historical-machines.json'
const props=defineProps({group:{type:String,required:true},title:{type:String,required:true},slug:{type:String,required:true}})
const q=ref('')
const clean=s=>String(s||'').trim()
const slugify=s=>clean(s).toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'')
const machineType=m=>clean(m.WebDesc||m.Web_Desc)

// Historical JSON presence is the library inclusion rule. sold, off_market and dont_advertise are intentionally ignored.
const groupMachines=historicalMachines.filter(m=>clean(m.Groups)===props.group)
const webDescs=[...new Set(groupMachines.map(machineType).filter(Boolean))].sort((a,b)=>a.localeCompare(b))
const typeSections=webDescs.map(name=>{
  const rows=groupMachines.filter(m=>machineType(m)===name)
  const manufacturers=[...new Set(rows.map(m=>clean(m.Manufacturer)).filter(Boolean))].sort((a,b)=>a.localeCompare(b)).map(manufacturer=>({name:manufacturer,slug:slugify(manufacturer),count:rows.filter(m=>clean(m.Manufacturer)===manufacturer).length}))
  return{name,count:rows.length,manufacturers}
})
const filteredTypes=computed(()=>{
  const x=q.value.trim().toLowerCase()
  if(!x)return typeSections
  return typeSections.map(type=>{
    if(type.name.toLowerCase().includes(x))return type
    const manufacturers=type.manufacturers.filter(m=>m.name.toLowerCase().includes(x))
    return manufacturers.length?{...type,manufacturers}:null
  }).filter(Boolean)
})
const manufacturerLink=(manufacturer,type)=>({path:`/spec-library/${props.slug}/${manufacturer}`,query:{type}})

useSeoMeta({title:`${props.title} Specifications | UMS Spec Library`,description:`Research historical ${props.title.toLowerCase()} specifications by machine type, manufacturer, model and year from Used Machinery Source records.`})
useHead({link:[{rel:'canonical',href:`https://www.usedmachinerysource.com/spec-library/${props.slug}`} ]})
</script>

<style scoped>
.page{color:#17273a;background:#fff;padding-bottom:60px}.wrap{max-width:1200px;margin:0 auto;padding:0 28px}.hero{background:linear-gradient(105deg,#071b33,#0d2c52);color:#fff;padding:52px 0;border-bottom:4px solid #f47b20}.kicker,.label{font-size:.78rem;font-weight:900;letter-spacing:.12em;color:#f47b20;margin-bottom:9px}.hero h1{font-size:clamp(2.3rem,4vw,3.5rem);margin:0 0 12px}.section{padding-top:46px}.section h2{color:#0b2545;margin:0 0 10px}.intro{max-width:900px;color:#526579;line-height:1.65}.search{width:100%;max-width:620px;padding:13px 15px;border:1px solid #aeb8c4;border-radius:6px;font-size:17px;margin:14px 0 30px}.type-section{margin:0 0 38px;padding-top:4px}.type-heading{display:flex;align-items:baseline;justify-content:space-between;gap:18px;border-bottom:3px solid #f47b20;padding-bottom:9px;margin-bottom:15px}.type-heading h3{font-size:1.45rem;color:#0b2545;margin:0}.type-heading span{font-size:.86rem;color:#6a7888;white-space:nowrap}.grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px}.card{display:flex;flex-direction:column;gap:5px;border:1px solid #d7e0e8;border-radius:8px;padding:14px;text-decoration:none;background:#fff}.card:hover{border-color:#f47b20;box-shadow:0 5px 16px rgba(11,37,69,.07)}.card strong{color:#0b2545}.card span{font-size:.85rem;color:#6a7888}.empty{padding:22px;background:#f5f7fa;border-radius:8px;color:#526579}@media(max-width:850px){.grid{grid-template-columns:1fr}.type-heading{align-items:flex-start;flex-direction:column;gap:4px}}
</style>