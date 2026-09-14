<template>
  <main class="page">
    <section class="hero"><div class="wrap"><div class="kicker">UMS MACHINERY SPECIFICATION LIBRARY</div><h1>Horizontal Boring Mill Specifications</h1><p>Research historical horizontal boring mill specifications by manufacturer, model, year and machine style, including Table Type, Floor Type and Planer Type where recorded.</p><div class="actions"><NuxtLink to="/spec-library" class="secondary">← Spec Library</NuxtLink><NuxtLink to="/equipment" class="primary">Current Equipment</NuxtLink></div></div></section>
    <section id="current-machines" class="wrap section current-section">
      <div class="section-heading-row"><div><div class="label sale-label">FOR SALE NOW</div><h2>Horizontal Boring Mills Currently Available</h2></div><NuxtLink to="/equipment" class="text-link">View all current equipment →</NuxtLink></div>
      <div v-if="currentMachines.length" class="machine-grid">
        <article v-for="machine in currentMachines" :key="machine.InvID" class="machine-card">
          <div class="machine-image-wrap"><img v-if="machineCardImages[machine.InvID]" :src="`/Images/${machineCardImages[machine.InvID]}`" :alt="`Used ${machine.Year||''} ${machine.Manufacturer||''} ${machine.Model||''} horizontal boring mill for sale`.replace(/\s+/g,' ').trim()" loading="lazy"><div v-else class="machine-image-placeholder">Current UMS Inventory</div></div>
          <div class="machine-card-copy"><h3><NuxtLink :to="machineUrl(machine)" class="machine-title-link">{{machine.Manufacturer}} {{machine.Model}}<span v-if="machine.Year"> – {{machine.Year}}</span></NuxtLink></h3><p class="machine-type">{{webDescription(machine)}}</p><p class="stock-number">Stock #{{machine.InvID}}</p><p v-if="advertisingSpec(machine)" class="adv-spec">{{advertisingSpec(machine)}}</p><NuxtLink :to="machineUrl(machine)" class="view-machine-button">View Machine</NuxtLink></div>
        </article>
      </div>
      <div v-else class="no-current-machines"><div><h3>Looking for a horizontal boring mill?</h3><p>We do not have a matching HBM listed in current inventory right now. Send us your requirements and UMS can help locate one.</p></div><NuxtLink to="/equipment#tell-us-what-you-need" class="orange-button">Tell Us What You Need</NuxtLink></div>
    </section>
    <section class="wrap section"><div class="label">BROWSE BY MANUFACTURER</div><h2>HBM Manufacturers</h2><p class="intro">This library contains {{ totalRecords }} true horizontal boring mill records across {{ library.length }} manufacturers. Jig mills that shared the old database group are excluded.</p>
      <input v-model="q" class="search" type="search" placeholder="Search HBM manufacturer">
      <div class="grid"><NuxtLink v-for="m in filtered" :key="m.slug" :to="`/spec-library/${m.slug}/hbms`" class="card"><strong>{{m.name}}</strong><span>{{m.models.length}} models · {{m.records}} historical records</span></NuxtLink></div>
    </section>
    <section class="wrap section guide"><h2>Key HBM Specifications</h2><div class="specs"><div>Machine style: Table / Floor / Planer</div><div>Spindle / bar diameter</div><div>X / Y / Z / W travels</div><div>Table size &amp; rotary indexing</div><div>Spindle taper</div><div>Spindle speed &amp; horsepower</div><div>Automatic tool changer</div><div>CNC control &amp; retrofit year</div></div></section>
    <section class="wrap section note"><div class="label">MACHINE STYLE</div><h2>Table, Floor and Planer Types remain identified</h2><p>Where the historical record identifies the boring mill style, that type is displayed with the individual year/configuration so materially different machine layouts are not blended together.</p></section>
  </main>
</template>
<script setup>
import hbmAD from '~/assets/data/hbm-library-a-d.js'
import hbmEF from '~/assets/data/hbm-library-e-f.js'
import hbmG from '~/assets/data/hbm-library-g.js'
import hbmH from '~/assets/data/hbm-library-h.js'
import hbmIM from '~/assets/data/hbm-library-i-m.js'
import hbmNS from '~/assets/data/hbm-library-n-s.js'
import hbmTZ from '~/assets/data/hbm-library-t-z.js'
import { mergeSpecLibrary } from '~/utils/mergeSpecLibrary'
const library=mergeSpecLibrary([hbmAD,hbmEF,hbmG,hbmH,hbmIM,hbmNS,hbmTZ])
import machinesData from '~/assets/data/machines.json'
const q=ref('')
const machines=ref(machinesData)
const machineCardImages=ref({})
const webDescription=m=>m.WebDesc||m.Web_Desc||''
const advertisingSpec=m=>m.AdvSpec||m.Adv_Spec||''
const offMarketValue=m=>m.OffMarket??m.Off_Market??0
const currentMachines=computed(()=>(machines.value||[]).filter(m=>{if(Number(m.Sold)!==0||Number(offMarketValue(m))!==0||Number(m.dont_advertise)!==0)return false;const hay=[m.Groups,m.WebDesc,m.Web_Desc,m.AdvSpec,m.Adv_Spec].filter(Boolean).join(' ').toLowerCase();return hay.includes('horizontal boring')||hay.includes('hbm')}).sort((a,b)=>Number(b.Year||0)-Number(a.Year||0)))
const machineUrl=m=>{const slug=`${m.Manufacturer||''}-${m.Model||''}`.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');return `/equipment/${m.InvID}/${slug}`}
async function loadMachineCardImages(){for(const m of currentMachines.value){try{const files=await $fetch('/api/images',{query:{invID:m.InvID}});if(files?.length)machineCardImages.value[m.InvID]=files[0]}catch(error){console.error(`Could not load image for ${m.InvID}`,error)}}}
onMounted(loadMachineCardImages)
const totalRecords=computed(()=>library.reduce((n,m)=>n+Number(m.records||0),0))
const filtered=computed(()=>{const x=q.value.trim().toLowerCase();return x?library.filter(m=>m.name.toLowerCase().includes(x)):library})
useSeoMeta({title:'Horizontal Boring Mill Specifications | UMS Spec Library',description:'Research historical horizontal boring mill specifications by manufacturer, model, year and Table, Floor or Planer Type from Used Machinery Source records.'})
useHead({link:[{rel:'canonical',href:'https://www.usedmachinerysource.com/spec-library/hbms'}]})
</script>
<style scoped>
.page{color:#17273a;background:#fff;padding-bottom:60px}.wrap{max-width:1200px;margin:0 auto;padding:0 28px}.hero{background:linear-gradient(105deg,#071b33,#0d2c52);color:#fff;padding:54px 0;border-bottom:4px solid #f47b20}.kicker,.label{font-size:.78rem;font-weight:900;letter-spacing:.12em;color:#f47b20}.hero h1{font-size:clamp(2.3rem,4vw,3.5rem);margin:8px 0 12px}.hero p,.intro,.note p{max-width:920px;line-height:1.7;color:#d9e4ef}.intro,.note p{color:#526579}.actions{display:flex;gap:12px;margin-top:22px}.actions a{padding:11px 16px;border-radius:5px;text-decoration:none;font-weight:800}.primary{background:#f47b20;color:#fff}.secondary{border:1px solid #d4dfeb;color:#fff}.section{padding-top:46px}.section h2{color:#0b2545;margin:0 0 12px}.search{width:100%;max-width:620px;padding:13px 15px;border:1px solid #aeb8c4;border-radius:6px;font-size:17px;margin:10px 0 22px}.grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px}.card{display:flex;flex-direction:column;gap:5px;border:1px solid #d7e0e8;border-radius:8px;padding:14px;text-decoration:none;color:#17273a}.card:hover{border-color:#f47b20;background:#fff9f4}.card strong{color:#0b2545}.card span{font-size:.85rem;color:#6a7888}.note{margin-top:34px;border-left:5px solid #f47b20;background:#f5f7fa;padding-top:28px;padding-bottom:28px}@media(max-width:850px){.grid{grid-template-columns:1fr}.wrap{padding:0 18px}}
.section-heading-row{display:flex;justify-content:space-between;align-items:end;gap:20px;margin-bottom:22px}.sale-label{color:#22733a}.text-link{color:#1c4587;font-weight:800;text-decoration:none}.machine-grid{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:16px}.machine-card{overflow:hidden;background:#fff;border:1px solid #d8e0e9;border-radius:7px}.machine-image-wrap{aspect-ratio:4/3;background:#eef2f6;display:flex;align-items:center;justify-content:center;overflow:hidden}.machine-image-wrap img{width:100%;height:100%;object-fit:cover}.machine-image-placeholder{color:#617386;font-weight:700;font-size:14px}.machine-card-copy{padding:14px}.machine-card h3{font-size:17px;margin:0 0 7px}.machine-title-link{color:#0b2545;text-decoration:none}.machine-type,.adv-spec{font-size:13px;color:#43566b}.stock-number{font-size:12px;font-weight:800}.view-machine-button{display:inline-flex;background:#1c4587;color:#fff!important;padding:9px 13px;border-radius:5px;font-size:13px;font-weight:800;text-decoration:none}.no-current-machines{display:flex;justify-content:space-between;gap:28px;padding:24px 26px;border:1px solid #cfd8e3;border-left:5px solid #f47b20;background:#f8fafc}.orange-button{background:#f47b20;color:#fff;text-decoration:none;font-weight:800;padding:11px 17px;border-radius:5px;height:max-content}.specs{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:10px;margin-top:18px}.specs div{background:#f5f7fa;border:1px solid #d8e0e8;border-radius:7px;padding:14px;font-weight:700;color:#0b2545}@media(max-width:900px){.machine-grid,.specs{grid-template-columns:1fr}.section-heading-row{align-items:flex-start;flex-direction:column}.no-current-machines{flex-direction:column}}
</style>