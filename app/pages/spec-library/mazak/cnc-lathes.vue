<template>
  <main class="library-page">
    <section class="hero"><div class="wrap"><NuxtLink to="/spec-library/cnc-lathes" class="back-link">← CNC Lathe Spec Library</NuxtLink><div class="kicker">UMS MACHINERY SPECIFICATION LIBRARY</div><h1>Mazak CNC Lathes & Turning Centers</h1><p>Research Mazak CNC lathe and turning-center families, model designations and historical specifications from machinery records accumulated over many years by Used Machinery Source.</p></div></section>
    <section class="wrap section current">
      <div class="section-heading-row"><div><div class="kicker sale">FOR SALE NOW</div><h2>Mazak CNC Lathes Currently Available</h2></div><NuxtLink to="/equipment" class="text-link">View all current equipment →</NuxtLink></div>
      <div v-if="currentMazak.length" class="machine-grid">
        <article v-for="machine in currentMazak" :key="machine.InvID" class="machine-card">
          <div class="machine-image-wrap"><img v-if="machineCardImages[machine.InvID]" :src="`/Images/${machineCardImages[machine.InvID]}`" :alt="`${machine.Year || ''} ${machine.Manufacturer || ''} ${machine.Model || ''}`.trim()" loading="lazy" /><div v-else class="machine-image-placeholder">Current UMS Inventory</div></div>
          <div class="machine-card-copy"><h3>{{ machine.Year }} {{ machine.Manufacturer }} {{ machine.Model }}</h3><p class="machine-type">{{ webDescription(machine) }}</p><p class="stock-number">Stock #{{ machine.InvID }}</p><p v-if="advertisingSpec(machine)" class="adv-spec">{{ advertisingSpec(machine) }}</p><NuxtLink :to="machineUrl(machine)" class="view-machine-button">View Machine</NuxtLink></div>
        </article>
      </div>
      <div v-else class="notice"><strong>No matching Mazak CNC lathe is listed in current inventory right now.</strong> The Spec Library below remains available for research. <NuxtLink to="/equipment#tell-us-what-you-need">Tell us what you need →</NuxtLink></div>
    </section>
    <section class="wrap section"><div class="kicker">MAZAK CNC LATHE SPECIFICATIONS</div><h2>Browse Exact Mazak CNC Lathe Models</h2><p class="intro">Search or browse every Mazak CNC lathe and turning-center model in the UMS historical data that has usable recorded specifications.</p><input v-model="query" class="search" type="search" placeholder="Search Mazak model — e.g. Quick-Turn, QTN, SQT, Integrex"><div class="additional-grid"><NuxtLink v-for="item in filteredModels" :key="item.slug" :to="`/spec-library/mazak/${item.slug}`" class="additional-link"><strong>{{ item.model }}</strong><small>{{ item.count }} historical configuration{{ item.count===1?'':'s' }}</small></NuxtLink></div></section><section class="wrap section history"><div class="history-label">SPECIFICATION LIBRARY — HISTORICAL INFORMATION</div><h2>How to Use the Mazak Spec Library</h2><p>These pages are intended for machinery buyers, dealers and manufacturing professionals researching older Mazak machines. Historical records are not current inventory and do not mean a machine is available for sale.</p><p><strong>Specifications can vary by year, generation, control, configuration and optional equipment.</strong> For that reason, UMS will keep materially different historical model designations separate unless the underlying data supports treating them together.</p></section>
  </main>
</template>
<script setup>
import machinesData from '~/assets/data/machines.json'
import { historicalModelSummaries } from '~/utils/historicalSpecLibrary'
const machines=ref(machinesData),query=ref(''),machineCardImages=ref({})
const webDescription=m=>m.WebDesc||m.Web_Desc||''
const advertisingSpec=m=>m.AdvSpec||m.Adv_Spec||''
const offMarket=m=>m.OffMarket??m.Off_Market??0
const currentMazak=computed(()=>(machines.value||[]).filter(m=>Number(m.Sold)===0&&Number(offMarket(m))===0&&Number(m.dont_advertise)===0&&m.Groups==='CNC Lathes & Turning Centers'&&String(m.Manufacturer||'').trim().toLowerCase()==='mazak').sort((a,b)=>Number(b.Year||0)-Number(a.Year||0)))
const machineUrl=m=>'/equipment/'+m.InvID+'/'+(String(m.Manufacturer||'')+'-'+String(m.Model||'')).toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'')
async function loadMachineCardImages(){for(const m of currentMazak.value){try{const files=await $fetch('/api/images',{query:{invID:m.InvID}});if(files?.length)machineCardImages.value[m.InvID]=files[0]}catch(error){console.error('Could not load image for '+m.InvID,error)}}}
onMounted(loadMachineCardImages)
const isLathe=m=>String(m.Groups||'').toLowerCase().includes('cnc lathe')||String(m.WebDesc||m.Web_Desc||'').toLowerCase().includes('turning center')
const allModels=historicalModelSummaries({manufacturer:'Mazak',machineFilter:isLathe})
const filteredModels=computed(()=>{const q=query.value.trim().toLowerCase();return q?allModels.filter(m=>m.model.toLowerCase().includes(q)):allModels})
useSeoMeta({title:'Mazak CNC Lathes & Turning Centers | Specifications | UMS',description:'Research Mazak CNC lathe and turning center models, families and historical specifications, and see current Mazak CNC lathes available from Used Machinery Source.',ogTitle:'Mazak CNC Lathes & Turning Centers | UMS Spec Library',ogDescription:'Mazak CNC lathe model families, historical specifications and current machines for sale.',ogType:'website',ogUrl:'https://www.usedmachinerysource.com/spec-library/mazak/cnc-lathes'})
const mazakLibrarySchema={
  '@context':'https://schema.org',
  '@graph':[
    {
      '@type':'CollectionPage',
      name:'Mazak CNC Lathes & Turning Centers',
      url:'https://www.usedmachinerysource.com/spec-library/mazak/cnc-lathes',
      description:'Historical Mazak CNC lathe and turning center specifications by model and year, plus current Mazak machines for sale.',
      isPartOf:{'@id':'https://www.usedmachinerysource.com/#website'}
    },
    {
      '@type':'BreadcrumbList',
      itemListElement:[
        {'@type':'ListItem',position:1,name:'Home',item:'https://www.usedmachinerysource.com/'},
        {'@type':'ListItem',position:2,name:'CNC Lathe Spec Library',item:'https://www.usedmachinerysource.com/spec-library/cnc-lathes'},
        {'@type':'ListItem',position:3,name:'Mazak CNC Lathes',item:'https://www.usedmachinerysource.com/spec-library/mazak/cnc-lathes'}
      ]
    }
  ]
}
useHead({
  htmlAttrs:{lang:'en'},
  link:[{rel:'canonical',href:'https://www.usedmachinerysource.com/spec-library/mazak/cnc-lathes'}],
  script:[{type:'application/ld+json',children:JSON.stringify(mazakLibrarySchema)}]
})
</script>
<style scoped>.library-page{color:#17273a;background:#fff;padding-bottom:56px}.wrap{max-width:1260px;margin:0 auto;padding-left:28px;padding-right:28px}.hero{background:linear-gradient(105deg,#071b33,#0d2c52);color:#fff;padding:50px 0}.back-link{color:#c8d9eb;text-decoration:none}.kicker{font-size:.78rem;font-weight:800;letter-spacing:.12em;color:#1c5a94;margin:18px 0 8px}.hero .kicker{color:#f47b20}.hero h1{font-size:clamp(2rem,4vw,3.25rem);margin:0 0 14px}.hero p{max-width:850px;font-size:1.08rem;line-height:1.7}.section{padding-top:46px;padding-bottom:46px}.section h2{font-size:2rem;margin:0 0 14px}.sale{color:#b44c10}.section-heading-row{display:flex;justify-content:space-between;align-items:end;gap:20px;margin-bottom:22px}.machine-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:16px}.machine-card{overflow:hidden;background:#fff;border:1px solid #d8e0e9;border-radius:7px;box-shadow:0 3px 12px rgba(11,37,69,.06)}.machine-image-wrap{aspect-ratio:4/3;background:#eef2f6;display:flex;align-items:center;justify-content:center;overflow:hidden}.machine-image-wrap img{width:100%;height:100%;object-fit:cover}.machine-image-placeholder{color:#617386;font-weight:700;font-size:13px}.machine-card-copy{padding:14px}.machine-card h3{margin:0 0 6px;color:#0b2545;font-size:17px;line-height:1.25}.machine-type{margin:0 0 7px;color:#43566b;font-size:13px}.stock-number{margin:0 0 7px;font-size:12px;font-weight:800;color:#17273a}.adv-spec{margin:0 0 12px;color:#43566b;font-size:12px;line-height:1.4}.view-machine-button{display:inline-flex;align-items:center;justify-content:center;background:#1c4587;color:#fff;text-decoration:none;padding:8px 12px;border-radius:5px;font-size:12px;font-weight:800}.notice{border:1px solid #d8e0e8;border-radius:12px;padding:22px;background:#fff}.notice a,.text-link{color:#1c4587;font-weight:800;text-decoration:none}.text-link:hover{text-decoration:underline}.family-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:18px;margin-top:24px}.family-card{border:1px solid #d8e0e8;border-radius:12px;padding:22px;background:#fff}.stock{color:#667789}.button{display:inline-block;background:#1c4587;color:#fff;text-decoration:none;padding:10px 16px;border-radius:6px;font-weight:700}.model-links{display:flex;flex-direction:column;gap:8px}.muted{background:#f4f7fa}.intro{max-width:980px;line-height:1.7}.family-card.featured{border-top:4px solid #1c4587}.family-card h3{margin-top:0}.additional-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:10px 18px;margin-top:24px}.additional-link{display:block;border:1px solid #d7e0e8;border-radius:8px;padding:12px 14px;text-decoration:none;color:#1c4587;font-weight:800;background:#fff}.additional-link:hover{text-decoration:underline}.history{margin-top:42px;border:2px solid #9fb4c8;border-radius:14px;padding-top:30px;padding-bottom:30px}.history-label{font-weight:900;color:#8c3f10;letter-spacing:.08em;font-size:.8rem}.history p{line-height:1.7}@media(max-width:1050px){.machine-grid{grid-template-columns:repeat(3,minmax(0,1fr))}}@media(max-width:850px){.machine-grid{grid-template-columns:repeat(2,minmax(0,1fr))}.family-grid,.additional-grid{grid-template-columns:1fr}.wrap{padding-left:18px;padding-right:18px}.hero{padding:36px 0}.section{padding-top:34px;padding-bottom:34px}}@media(max-width:600px){.section-heading-row{align-items:flex-start;flex-direction:column}.machine-grid{grid-template-columns:1fr}}</style>