<template>
  <main class="library-page">
    <section class="hero">
      <div class="wrap">
        <NuxtLink to="/spec-library/cnc-lathes" class="back-link">← CNC Lathe Spec Library</NuxtLink>
        <div class="kicker">UMS MACHINERY SPECIFICATION LIBRARY</div>
        <h1>{{ headingManufacturer }} CNC Lathes & Turning Centers</h1>
        <p>Research {{ manufacturer }} CNC lathe and turning-center families, exact model designations and historical specifications from machinery records accumulated over many years by Used Machinery Source.</p>
        <p v-if="historicalNote" class="historical-note">{{ historicalNote }}</p>
      </div>
    </section>

    <section class="wrap section current">
      <div class="section-heading-row">
        <div><div class="kicker sale">FOR SALE NOW</div><h2>{{ currentHeading }}</h2></div>
        <NuxtLink to="/equipment" class="text-link">View all current equipment →</NuxtLink>
      </div>
      <div v-if="currentMachines.length" class="machine-grid">
        <article v-for="machine in currentMachines" :key="machine.InvID" class="machine-card">
          <div class="machine-image-wrap">
            <img v-if="machineCardImages[machine.InvID]" :src="`/Images/${machineCardImages[machine.InvID]}`" :alt="`${machine.Year || ''} ${machine.Manufacturer || ''} ${machine.Model || ''}`.trim()" loading="lazy" />
            <div v-else class="machine-image-placeholder">Current UMS Inventory</div>
          </div>
          <div class="machine-card-copy">
            <h3>{{ machine.Year }} {{ machine.Manufacturer }} {{ machine.Model }}</h3>
            <p class="machine-type">{{ webDescription(machine) }}</p>
            <p class="stock-number">Stock #{{ machine.InvID }}</p>
            <p v-if="advertisingSpec(machine)" class="adv-spec">{{ advertisingSpec(machine) }}</p>
            <NuxtLink :to="machineUrl(machine)" class="view-machine-button">View Machine</NuxtLink>
          </div>
        </article>
      </div>
      <div v-else class="notice"><strong>No matching {{ headingManufacturer }} CNC lathe is listed in current inventory right now.</strong> The Spec Library below remains available for research. <NuxtLink to="/equipment#tell-us-what-you-need">Tell us what you need →</NuxtLink></div>
    </section>

    <section class="section muted">
      <div class="wrap">
        <div class="kicker">{{ manufacturer.toUpperCase() }} MODEL FAMILIES</div>
        <h2>Browse {{ headingManufacturer }} Turning Equipment</h2>
        <p class="intro">UMS preserves exact historical model wording. Similar-looking designations remain separate when the source records use different names, while the family groups below make related machines easier to browse.</p>
        <div class="family-grid">
          <article v-for="family in familyGroups" :key="family.name" class="family-card featured">
            <h3>{{ family.name }}</h3>
            <p>{{ family.description }}</p>
            <div class="model-links">
              <NuxtLink v-for="entry in family.entries.slice(0,18)" :key="entry.slug" :to="`/spec-library/${routeSlug}/${entry.slug}`" class="text-link">{{ entry.model }} specifications →</NuxtLink>
            </div>
          </article>
        </div>
      </div>
    </section>

    <section class="wrap section">
      <div class="kicker">ADDITIONAL HISTORICAL MODEL PAGES</div>
      <h2>More {{ manufacturer }} CNC Lathe Specifications</h2>
      <p class="intro">Search or browse all exact model designations supported by UMS historical records. Exact wording is preserved rather than normalized into a different model name.</p>
      <input v-model="query" class="search" type="search" :placeholder="`Search ${manufacturer} model — e.g. ${searchExample}`" />
      <div class="additional-grid">
        <NuxtLink v-for="entry in filteredEntries" :key="entry.slug" :to="`/spec-library/${routeSlug}/${entry.slug}`" class="additional-link">{{ entry.model }} → <small>{{ entry.records.length }} historical {{ entry.records.length===1?'configuration':'configurations' }}</small></NuxtLink>
      </div>
      <p v-if="!filteredEntries.length" class="empty">No models match that search.</p>
    </section>

    <section class="wrap section history">
      <div class="history-label">SPECIFICATION LIBRARY — HISTORICAL INFORMATION</div>
      <h2>How to Use the {{ manufacturer }} Spec Library</h2>
      <p>These pages are intended for machinery buyers, dealers and manufacturing professionals researching older {{ manufacturer }} machines. Historical records are not current inventory and do not mean a machine is available for sale.</p>
      <p><strong>Specifications can vary by year, generation, control, configuration and optional equipment.</strong> UMS keeps materially different historical model designations separate unless the underlying records support treating them together.</p>
    </section>
  </main>
</template>

<script setup>
import { computed, ref, onMounted } from 'vue'
import machinesData from '~/assets/data/machines.json'

const props=defineProps({
  manufacturer:{type:String,required:true},
  routeSlug:{type:String,required:true},
  entries:{type:Array,required:true},
  aliases:{type:Array,default:()=>[]},
  headingManufacturer:{type:String,default:''},
  historicalNote:{type:String,default:''}
})

const query=ref('')
const machineCardImages=ref({})
const displayName=computed(()=>props.headingManufacturer||props.manufacturer)
const headingManufacturer=computed(()=>displayName.value)
const currentHeading=computed(()=>`${displayName.value} CNC Lathes Currently Available`)
const searchExample=computed(()=>props.routeSlug==='okuma'?'LB-15, LU-15, Cadet':'SL-25, NL-2500, ZL-200')
const validEntries=computed(()=>props.entries.filter(e=>e.records?.some(r=>r.specs?.length||r.recordedSpecs?.trim())))
const filteredEntries=computed(()=>{const q=query.value.trim().toLowerCase();return validEntries.value.filter(e=>!q||e.model.toLowerCase().includes(q))})
const names=computed(()=>[props.manufacturer,...props.aliases].map(x=>String(x).trim().toLowerCase()))
const webDescription=m=>m.WebDesc||m.Web_Desc||''
const advertisingSpec=m=>m.AdvSpec||m.Adv_Spec||''
const offMarket=m=>m.OffMarket??m.Off_Market??0
const currentMachines=computed(()=>(machinesData||[]).filter(m=>names.value.includes(String(m.Manufacturer||'').trim().toLowerCase())&&Number(m.Sold)===0&&Number(offMarket(m))===0&&Number(m.dont_advertise)===0&&m.Groups==='CNC Lathes & Turning Centers').sort((a,b)=>Number(b.Year||0)-Number(a.Year||0)))
const machineUrl=m=>`/equipment/${m.InvID}/${`${m.Manufacturer||''}-${m.Model||''}`.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'')}`

const familyDefinitions=computed(()=>props.routeSlug==='okuma' ? [
  {name:'LB Series',test:/^LB/i,description:'One of Okuma’s best-known CNC turning families, spanning many sizes, bed lengths and control generations.'},
  {name:'LC Series',test:/^LC/i,description:'Okuma LC turning machines include larger and heavier-duty configurations across multiple generations.'},
  {name:'LU Series',test:/^LU/i,description:'Twin-turret and multi-axis LU turning centers used for higher-productivity machining.'},
  {name:'LR Series',test:/^LR/i,description:'Historical LR-series CNC lathes preserved by exact model designation and recorded configuration.'},
  {name:'Cadet Series',test:/^Cadet/i,description:'Compact and mid-size Okuma Cadet turning centers with several distinct historical model names.'},
  {name:'LT / LVT / Other Turning Series',test:/^(LT|LVT|LNC|ES-L|Genos L|Captain)/i,description:'Additional Okuma turning platforms, including multi-axis and later-generation machine families.'}
] : [
  {name:'SL Series',test:/^SL/i,description:'The broad Mori-Seiki SL family includes many two-axis, live-tool, chucker and long-bed configurations.'},
  {name:'ZL Series',test:/^ZL/i,description:'Mori-Seiki ZL machines include twin-turret and multi-axis production turning configurations.'},
  {name:'NL Series',test:/^NL/i,description:'Later-generation Mori-Seiki NL turning centers include live-tool, Y-axis and sub-spindle variants.'},
  {name:'CL Series',test:/^CL/i,description:'Compact Mori-Seiki CL chuckers and production turning machines.'},
  {name:'DL Series',test:/^DL/i,description:'Opposing-spindle and twin-turret Mori-Seiki DL production turning machines.'},
  {name:'Other Mori-Seiki Turning Series',test:/^(AL|TL|LL|NT|NZ|ZT|DuraTurn|Dura Turn|CTX)/i,description:'Additional Mori-Seiki turning families and later-generation multi-axis platforms.'}
])

const familyGroups=computed(()=>familyDefinitions.value.map(f=>({...f,entries:validEntries.value.filter(e=>f.test.test(e.model))})).filter(f=>f.entries.length))

async function loadMachineCardImages(){for(const m of currentMachines.value){try{const files=await $fetch('/api/images',{query:{invID:m.InvID}});if(files?.length)machineCardImages.value[m.InvID]=files[0]}catch(error){console.error(`Could not load image for ${m.InvID}`,error)}}}
onMounted(loadMachineCardImages)

useSeoMeta({title:()=>`${displayName.value} CNC Lathe Specifications & Machines for Sale | UMS`,description:()=>`Browse ${displayName.value} CNC lathes currently for sale and research historical ${props.manufacturer} CNC lathe specifications by exact model and year.`})
const manufacturerLibraryCanonical=computed(()=>`https://www.usedmachinerysource.com/spec-library/${props.routeSlug}/cnc-lathes`)
const manufacturerLibrarySchema=computed(()=>({
  '@context':'https://schema.org',
  '@graph':[
    {
      '@type':'CollectionPage',
      name:`${displayName.value} CNC Lathes & Turning Centers`,
      url:manufacturerLibraryCanonical.value,
      description:`Historical ${props.manufacturer} CNC lathe specifications by model and year, plus current machines for sale.`,
      isPartOf:{'@id':'https://www.usedmachinerysource.com/#website'}
    },
    {
      '@type':'BreadcrumbList',
      itemListElement:[
        {'@type':'ListItem',position:1,name:'Home',item:'https://www.usedmachinerysource.com/'},
        {'@type':'ListItem',position:2,name:'CNC Lathe Spec Library',item:'https://www.usedmachinerysource.com/spec-library/cnc-lathes'},
        {'@type':'ListItem',position:3,name:`${displayName.value} CNC Lathes`,item:manufacturerLibraryCanonical.value}
      ]
    }
  ]
}))
useHead(()=>({
  htmlAttrs:{lang:'en'},
  link:[{rel:'canonical',href:manufacturerLibraryCanonical.value}],
  script:[{type:'application/ld+json',children:JSON.stringify(manufacturerLibrarySchema.value)}]
}))
</script>

<style scoped>
.library-page{padding:0 0 54px;color:#17273a;background:#fff}.wrap{max-width:1320px;margin:0 auto;padding-left:32px;padding-right:32px}.hero{background:linear-gradient(105deg,#071b33 0%,#0b2545 62%,#0d2c52 100%);color:#fff;border-bottom:4px solid #f47b20}.hero .wrap{padding-top:46px;padding-bottom:42px}.back-link{color:#d7e5f2;text-decoration:none;font-weight:700}.kicker{color:#f47b20;font-size:13px;font-weight:800;letter-spacing:.08em;margin:16px 0 8px}.sale{color:#22733a}.hero h1,.section h2{font-family:Georgia,'Times New Roman',serif}.hero h1{margin:0 0 12px;font-size:clamp(36px,4.2vw,54px);line-height:1.05}.hero p{max-width:920px;margin:0;color:#e8eef5;font-size:17px;line-height:1.6}.hero .historical-note{margin-top:13px;color:#fff}.section{padding-top:46px;padding-bottom:46px}.section-heading-row{display:flex;justify-content:space-between;align-items:end;gap:20px;margin-bottom:22px}.section h2{margin:0;color:#0b2545;font-size:clamp(28px,3vw,38px)}.text-link{color:#1c4587;font-weight:800;text-decoration:none}.machine-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:18px}.machine-card{overflow:hidden;background:#fff;border:1px solid #d8e0e9;border-radius:7px;box-shadow:0 4px 18px rgba(11,37,69,.07)}.machine-image-wrap{height:210px;background:#eef2f6;display:flex;align-items:center;justify-content:center;overflow:hidden}.machine-image-wrap img{width:100%;height:100%;object-fit:contain}.machine-image-placeholder{color:#617386;font-weight:700;font-size:14px}.machine-card-copy{padding:15px}.machine-card h3{margin:0 0 6px;color:#0b2545;font-size:18px;line-height:1.25}.machine-type{margin:0 0 7px;color:#43566b;font-size:14px}.stock-number{margin:0 0 8px;font-size:13px;font-weight:800}.adv-spec{margin:0 0 13px;color:#43566b;font-size:13px;line-height:1.45}.view-machine-button{display:inline-flex;text-decoration:none;background:#1c4587;color:#fff;padding:9px 14px;border-radius:5px;font-weight:800;font-size:13px}.notice{padding:22px;border:1px solid #cfd8e3;border-left:5px solid #f47b20;border-radius:6px;background:#f8fafc}.muted{max-width:none;background:#f5f7fa}.intro{max-width:980px;color:#43566b;line-height:1.65}.family-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:18px;margin-top:24px}.family-card{background:#fff;border:1px solid #d8e0e9;border-top:3px solid #1c4587;border-radius:7px;padding:20px}.family-card h3{margin:0 0 8px;color:#0b2545;font-size:19px}.family-card p{margin:0 0 13px;color:#526579;font-size:14px;line-height:1.55}.model-links{display:flex;flex-direction:column;gap:5px}.model-links a{font-size:13px}.search{width:100%;max-width:520px;border:1px solid #b8c4d0;border-radius:5px;padding:11px 13px;font-size:15px;margin:13px 0 18px}.additional-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:9px}.additional-link{border:1px solid #d8e0e9;border-radius:5px;padding:10px 12px;text-decoration:none;color:#1c4587;font-weight:800;font-size:14px;background:#fff}.additional-link small{display:block;color:#738194;font-weight:500;margin-top:3px}.history{border-top:1px solid #d8e0e9}.history-label{display:inline-block;background:#fff3e8;color:#9c4d0e;border:1px solid #f1c79e;padding:6px 9px;font-size:12px;font-weight:900;letter-spacing:.05em;margin-bottom:13px}.history p{max-width:950px;color:#43566b;line-height:1.65}.empty{color:#526579}@media(max-width:1050px){.machine-grid{grid-template-columns:repeat(3,1fr)}.family-grid{grid-template-columns:repeat(2,1fr)}}@media(max-width:760px){.wrap{padding-left:18px;padding-right:18px}.machine-grid,.additional-grid{grid-template-columns:repeat(2,1fr)}.section-heading-row{display:block}.section-heading-row>.text-link{display:inline-block;margin-top:10px}}@media(max-width:520px){.machine-grid,.family-grid,.additional-grid{grid-template-columns:1fr}}
</style>