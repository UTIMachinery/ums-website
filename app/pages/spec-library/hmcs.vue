<template>
  <main class="page">
    <section class="hero"><div class="wrap"><div class="kicker">UMS MACHINERY SPECIFICATION LIBRARY</div><h1>Horizontal Machining Centers (HMC)</h1><p>Research historical HMC manufacturers, model families and specifications, or browse horizontal machining centers currently for sale.</p><div class="actions"><a href="#library" class="primary">Browse HMC Spec Library</a><NuxtLink to="/equipment" class="secondary">View Current Equipment</NuxtLink></div></div></section>

    <section id="current-machines" class="wrap section current-section">
      <div class="section-heading-row"><div><div class="label sale-label">FOR SALE NOW</div><h2>Horizontal Machining Centers Currently Available</h2></div><NuxtLink to="/equipment" class="text-link">View all current equipment →</NuxtLink></div>
      <div v-if="currentHmcs.length" class="machine-grid">
        <article v-for="machine in currentHmcs" :key="machine.InvID" class="machine-card">
          <div class="machine-image-wrap"><img v-if="machineCardImages[machine.InvID]" :src="`/Images/${machineCardImages[machine.InvID]}`" :alt="`Used ${machine.Year || ''} ${machine.Manufacturer || ''} ${machine.Model || ''} horizontal machining center for sale`.replace(/\s+/g,' ').trim()" loading="lazy"/><div v-else class="machine-image-placeholder">Current UMS Inventory</div></div>
          <div class="machine-card-copy"><h3><NuxtLink :to="machineUrl(machine)" class="machine-title-link">{{ machine.Manufacturer }} {{ machine.Model }}<span v-if="machine.Year"> – {{ machine.Year }}</span></NuxtLink></h3><p class="machine-type">{{ webDescription(machine) }}</p><p class="stock-number">Stock #{{ machine.InvID }}</p><p v-if="advertisingSpec(machine)" class="adv-spec">{{ advertisingSpec(machine) }}</p><NuxtLink :to="machineUrl(machine)" class="view-machine-button">View Machine</NuxtLink></div>
        </article>
      </div>
      <div v-else class="no-current-machines"><div><h3>Looking for a horizontal machining center?</h3><p>We do not have a matching HMC listed in current inventory right now. Inventory changes frequently, so send us your requirements and UMS can help locate one.</p></div><NuxtLink to="/equipment#tell-us-what-you-need" class="orange-button">Tell Us What You Need</NuxtLink></div>
    </section>

    <section id="library" class="wrap section"><div class="label">SPECIFICATION LIBRARY — HISTORICAL INFORMATION</div><h2>HMC Manufacturer & Model Library</h2><p class="intro">The UMS historical database contains about 681 horizontal machining center records. Historical records do not indicate current availability.</p>
      <div class="grid">
        <article class="card featured"><h3>Mazak</h3><p>H-Series, FH-Series, HTC and related Mazak horizontal machining centers.</p><NuxtLink to="/spec-library/mazak/hmcs">Browse Mazak HMC specifications →</NuxtLink></article>
        <article class="card featured"><h3>Mori-Seiki</h3><p>MH, SH and related Mori-Seiki horizontal machining centers.</p><NuxtLink to="/spec-library/mori-seiki/hmcs">Browse Mori-Seiki HMC specifications →</NuxtLink></article>
        <article class="card featured"><h3>Makino</h3><p>A-Series, MC, MCB and related Makino horizontal machining centers.</p><NuxtLink to="/spec-library/makino/hmcs">Browse Makino HMC specifications →</NuxtLink></article>
        <article v-for="m in completed" :key="m.slug" class="card featured"><h3>{{m.name}}</h3><p>{{m.text}}</p><NuxtLink :to="`/spec-library/${m.slug}/hmcs`">Browse {{m.name}} HMC specifications →</NuxtLink></article>
      </div>
    </section>

    <section class="wrap section guide"><h2>Key HMC Specifications</h2><div class="specs"><div>Pallet dimensions & capacity</div><div>Pallet count & indexing</div><div>X / Y / Z axis travels</div><div>Spindle taper & RPM</div><div>Spindle horsepower</div><div>Automatic tool changer capacity</div><div>CNC control</div><div>Year/configuration differences</div></div></section>
  </main>
</template>

<script setup>
import machinesData from '~/assets/data/machines.json'
const machines=ref(machinesData)
const machineCardImages=ref({})
const webDescription=machine=>machine.WebDesc||machine.Web_Desc||''
const advertisingSpec=machine=>machine.AdvSpec||machine.Adv_Spec||''
const offMarketValue=machine=>machine.OffMarket??machine.Off_Market??0
const currentHmcs=computed(()=>(machines.value||[]).filter(machine=>Number(machine.Sold)===0&&Number(offMarketValue(machine))===0&&Number(machine.dont_advertise)===0&&String(machine.Groups||'').toLowerCase().includes('horizontal machining')).sort((a,b)=>Number(b.Year||0)-Number(a.Year||0)))
const machineUrl=machine=>{const slug=`${machine.Manufacturer||''}-${machine.Model||''}`.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');return `/equipment/${machine.InvID}/${slug}`}
async function loadMachineCardImages(){for(const machine of currentHmcs.value){try{const files=await $fetch('/api/images',{query:{invID:machine.InvID}});if(files?.length)machineCardImages.value[machine.InvID]=files[0]}catch(error){console.error(`Could not load image for ${machine.InvID}`,error)}}}
onMounted(loadMachineCardImages)
const completed=[
{name:'Haas',slug:'haas',text:'EC and HS series Haas horizontal machining centers.'},
{name:'Cincinnati',slug:'cincinnati',text:'Maxim, T-Series and HC Cincinnati horizontal machining centers.'},
{name:'Okuma',slug:'okuma',text:'MC, MX and MB series Okuma horizontal machining centers.'},
{name:'Toshiba',slug:'toshiba',text:'BMC series Toshiba horizontal machining centers.'},
{name:'Toyoda',slug:'toyoda',text:'FA, FH, FHN and HSP Toyoda horizontal machining centers.'},
{name:'OKK',slug:'okk',text:'HM, HP, MCH and PCH series OKK horizontal machining centers.'}
]
useSeoMeta({title:'Horizontal Machining Center Specifications | UMS Spec Library',description:'Research historical horizontal machining center specifications by manufacturer, model and year, including pallet, travel, spindle and ATC data.'})
useHead({link:[{rel:'canonical',href:'https://www.usedmachinerysource.com/spec-library/hmcs'}]})
</script>

<style scoped>
.page{color:#17273a;background:#fff;padding-bottom:60px}.wrap{max-width:1200px;margin:0 auto;padding:0 28px}.hero{background:linear-gradient(105deg,#071b33,#0d2c52);color:#fff;padding:54px 0;border-bottom:4px solid #f47b20}.kicker,.label{font-size:.78rem;font-weight:900;letter-spacing:.12em;color:#f47b20}.hero h1{font-size:clamp(2.3rem,4vw,3.5rem);margin:8px 0 12px}.hero p{max-width:900px;line-height:1.7;color:#d9e4ef}.actions{display:flex;gap:12px;margin-top:22px}.actions a{padding:11px 16px;border-radius:5px;text-decoration:none;font-weight:800}.primary{background:#f47b20;color:#fff}.secondary{border:1px solid #d4dfeb;color:#fff}.section{padding-top:46px}.section h2{color:#0b2545;margin:0 0 12px}.intro{max-width:920px;line-height:1.7;color:#526579}.grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:14px;margin-top:24px}.card{border:1px solid #d8e0e8;border-radius:8px;padding:18px}.card h3{margin:0 0 8px;color:#0b2545}.card p{color:#526579;line-height:1.55}.card a{color:#1c4587;font-weight:800;text-decoration:none}.card span{font-size:.85rem;color:#7b8794}.featured{border-top:5px solid #f47b20}.section-heading-row{display:flex;justify-content:space-between;align-items:end;gap:20px;margin-bottom:22px}.sale-label{color:#22733a}.text-link{color:#1c4587;font-weight:800;text-decoration:none}.machine-grid{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:16px}.machine-card{overflow:hidden;background:#fff;border:1px solid #d8e0e9;border-radius:7px}.machine-image-wrap{aspect-ratio:4/3;background:#eef2f6;display:flex;align-items:center;justify-content:center;overflow:hidden}.machine-image-wrap img{width:100%;height:100%;object-fit:cover}.machine-image-placeholder{color:#617386;font-weight:700;font-size:14px}.machine-card-copy{padding:14px}.machine-card h3{font-size:17px;margin:0 0 7px}.machine-title-link{color:#0b2545;text-decoration:none}.machine-type,.adv-spec{font-size:13px;color:#43566b}.stock-number{font-size:12px;font-weight:800}.view-machine-button{display:inline-flex;background:#1c4587;color:#fff!important;padding:9px 13px;border-radius:5px;font-size:13px;font-weight:800;text-decoration:none}.no-current-machines{display:flex;justify-content:space-between;gap:28px;padding:24px 26px;border:1px solid #cfd8e3;border-left:5px solid #f47b20;background:#f8fafc}.orange-button{background:#f47b20;color:#fff;text-decoration:none;font-weight:800;padding:11px 17px;border-radius:5px;height:max-content}.specs{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:10px}.specs div{background:#f5f7fa;border:1px solid #d8e0e8;border-radius:7px;padding:14px;font-weight:700;color:#0b2545}@media(max-width:900px){.grid,.specs{grid-template-columns:1fr}.machine-grid{grid-template-columns:1fr}.wrap{padding:0 18px}.section-heading-row{align-items:flex-start;flex-direction:column}.no-current-machines{flex-direction:column}}
</style>