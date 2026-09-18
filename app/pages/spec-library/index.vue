<template>
  <main class="page">
    <section class="hero"><div class="wrap"><div class="kicker">UMS MACHINERY SPECIFICATION LIBRARY</div><h1>Machine Specification Library</h1><p>Search historical machine specifications by manufacturer, model or machine type. These reference pages are built from Used Machinery Source historical machine records and are separate from current equipment-for-sale listings.</p></div></section>

    <section class="wrap section">
      <div class="label">SEARCH THE LIBRARY</div><h2>Find Historical Machine Specifications</h2>
      <div class="search-grid">
        <label><span>Manufacturer</span><select v-model="selectedManufacturer"><option value="">Select Manufacturer</option><option v-for="m in manufacturers" :key="m" :value="m">{{m}}</option></select></label>
        <label><span>Model</span><select v-model="selectedModel" :disabled="!selectedManufacturer"><option value="">All Models</option><option v-for="m in models" :key="m" :value="m">{{m}}</option></select></label>
        <label><span>Machine Type</span><select v-model="selectedType"><option value="">Select Machine Type</option><option v-for="t in machineTypes" :key="t.key" :value="t.key">{{t.label}}</option></select></label>
      </div>
      <button class="search-button" :disabled="!canSearch" @click="runSearch">Search Specifications</button>

      <nav class="directories" aria-label="Spec Library directories">
        <NuxtLink to="/spec-library/manufacturers">Browse All Manufacturers</NuxtLink>
        <NuxtLink to="/spec-library/manufacturers-models">Browse Manufacturers &amp; Models</NuxtLink>
        <NuxtLink to="/spec-library/machine-types">Browse All Machine Types</NuxtLink>
      </nav>

      <div class="major-grid">
        <NuxtLink to="/spec-library/cnc-lathes" class="major">CNC Lathes &amp; Turning Centers</NuxtLink>
        <NuxtLink to="/spec-library/vmcs" class="major">Vertical Machining Centers (VMC)</NuxtLink>
        <NuxtLink to="/spec-library/hmcs" class="major">Horizontal Machining Centers (HMC)</NuxtLink>
      </div>
    </section>

    <section class="wrap section method"><div class="label">ABOUT THE LIBRARY</div><h2>Historical reference data, not current inventory</h2><p>The UMS Spec Library helps buyers, sellers and machinery professionals research machine models that may no longer be represented in current manufacturer literature. Specifications can vary by year, control, spindle package, options and configuration, so year-specific differences are preserved whenever the historical records support them.</p><NuxtLink to="/equipment" class="inventory-link">Looking for machines currently for sale? View Equipment →</NuxtLink></section>
  </main>
</template>

<script setup>
import historicalMachines from '~/assets/data/historical-machines.json'
import {rawType,displayType,typeKind,browseTypeKey,modelUrl} from '~/utils/specLibraryBrowse'
const clean=s=>String(s||'').trim()
const slug=s=>clean(s).toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'')
const selectedManufacturer=ref('')
const selectedModel=ref('')
const selectedType=ref('')
const rows=historicalMachines.filter(m=>clean(m.Manufacturer)&&clean(m.Model)&&clean(m.WebDesc||m.Web_Desc))
const manufacturers=[...new Set(rows.map(m=>clean(m.Manufacturer)))].sort((a,b)=>a.localeCompare(b))
const typeMap=new Map()
for(const r of rows){const raw=rawType(r),key=browseTypeKey(raw);if(!typeMap.has(key))typeMap.set(key,{key,label:displayType(raw),kind:typeKind(raw)})}
const typeOrder={lathe:0,vmc:1,hmc:2}
const machineTypes=[...typeMap.values()].sort((a,b)=>(typeOrder[a.kind]??3)-(typeOrder[b.kind]??3)||a.label.localeCompare(b.label))
const models=computed(()=>selectedManufacturer.value?[...new Set(rows.filter(m=>clean(m.Manufacturer)===selectedManufacturer.value).map(m=>clean(m.Model)))].sort((a,b)=>a.localeCompare(b)):[])
watch(selectedManufacturer,()=>{selectedModel.value=''})
const canSearch=computed(()=>Boolean(selectedManufacturer.value||selectedType.value))
const runSearch=()=>{
  if(selectedManufacturer.value&&selectedModel.value){
    const row=rows.find(m=>clean(m.Manufacturer)===selectedManufacturer.value&&clean(m.Model)===selectedModel.value)
    if(row)return navigateTo(modelUrl(selectedManufacturer.value,selectedModel.value,rawType(row)))
  }
  if(selectedManufacturer.value)return navigateTo('/spec-library/manufacturers/'+slug(selectedManufacturer.value))
  if(selectedType.value)return navigateTo('/spec-library/machine-types/'+selectedType.value)
}
useSeoMeta({title:'Machine Specification Library | Used Machinery Source',description:'Search historical CNC and industrial machine specifications by manufacturer, model and machine type in the Used Machinery Source Spec Library.'})
useHead({link:[{rel:'canonical',href:'https://www.usedmachinerysource.com/spec-library'}]})
</script>

<style scoped>
.page{color:#17273a;background:#fff;padding-bottom:64px}.wrap{max-width:1200px;margin:0 auto;padding:0 28px}.hero{background:linear-gradient(105deg,#071b33,#0d2c52);color:#fff;padding:54px 0;border-bottom:4px solid #f47b20}.kicker,.label{font-size:.78rem;font-weight:900;letter-spacing:.12em;color:#f47b20;margin-bottom:9px}.hero h1{font-size:clamp(2.4rem,4.5vw,3.7rem);line-height:1.08;margin:0 0 16px}.hero p{max-width:900px;font-size:1.08rem;line-height:1.7;color:#d9e4ef}.section{padding-top:46px}.section h2{color:#0b2545;font-size:2rem;margin:0 0 20px}.search-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:16px}.search-grid label span{display:block;font-weight:800;color:#0b2545;margin-bottom:7px}.search-grid select{width:100%;padding:13px 14px;border:1px solid #aeb8c4;border-radius:6px;background:#fff;font-size:16px;color:#17273a}.search-grid select:disabled{background:#f1f3f5;color:#8a96a3}.search-button{margin-top:18px;padding:12px 24px;border:0;border-radius:6px;background:#1c4587;color:#fff;font-size:16px;font-weight:800;cursor:pointer}.search-button:disabled{background:#aeb8c4;cursor:not-allowed}.directories{display:flex;flex-wrap:wrap;gap:12px 24px;margin:30px 0 24px;padding:20px 0;border-top:1px solid #dce3ea;border-bottom:1px solid #dce3ea}.directories a{color:#1c4587;font-weight:800;text-decoration:none}.directories a:hover{text-decoration:underline}.major-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:16px}.major{display:flex;align-items:center;justify-content:center;text-align:center;min-height:88px;padding:18px;border:1px solid #d5dee7;border-top:5px solid #f47b20;border-radius:9px;color:#0b2545;font-size:1.08rem;font-weight:900;text-decoration:none;background:#fff}.major:hover{border-color:#f47b20;box-shadow:0 6px 18px rgba(11,37,69,.08)}.method{margin-top:18px;background:#f5f7fa;border-left:5px solid #f47b20;padding-top:30px;padding-bottom:30px}.method p{max-width:930px;line-height:1.7;color:#526579}.inventory-link{display:inline-block;margin-top:7px;color:#1c4587;font-weight:800;text-decoration:none}.inventory-link:hover{text-decoration:underline}@media(max-width:800px){.wrap{padding-left:18px;padding-right:18px}.search-grid,.major-grid{grid-template-columns:1fr}.hero{padding:44px 0}.directories{flex-direction:column;gap:12px}}
</style>