<template><main v-if="item" class="page"><section class="hero"><div class="wrap"><NuxtLink :to="`/spec-library/${manufacturerSlug}/cnc-lathes`" class="back">← {{manufacturer}} CNC Lathe Library</NuxtLink><div class="kicker">UMS MACHINERY SPECIFICATION LIBRARY</div><h1>{{manufacturer}} {{item.model}} Specifications</h1><p>Historical {{manufacturer}} {{item.model}} specifications from individual UMS machinery records.</p></div></section><section class="wrap section"><div class="warning"><strong>Historical specification information — not a machine-for-sale listing.</strong> Specifications can vary by year, control, configuration and optional equipment.</div><h2>Historical {{item.model}} Specifications by Year</h2><p class="intro">Choose a recorded year below. Each configuration is joined to specifications only by its exact historical InvID.</p><HistoricalSpecConfigurations :configurations="configurations"/><SpecInventoryMatches :manufacturer="manufacturer" :model="item.model" machine-type="lathe"/></section></main></template>
<script setup>
import { historicalConfigurations, historicalManufacturers, historicalModelBySlug } from '~/utils/historicalSpecLibrary'
const route=useRoute(),manufacturerSlug=String(route.params.manufacturer||''),modelSlug=String(route.params.model||'')
const slug=v=>String(v||'').toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'')
const isLathe=m=>String(m.WebDesc||m.Web_Desc||'').trim().toLowerCase().startsWith('cnc lathes')
const manufacturer=historicalManufacturers({machineFilter:isLathe}).find(name=>slug(name)===manufacturerSlug)
if(!manufacturer)throw createError({statusCode:404,statusMessage:'CNC lathe manufacturer not found'})
const model=historicalModelBySlug({manufacturer,slug:modelSlug,machineFilter:isLathe})
if(!model)throw createError({statusCode:404,statusMessage:'CNC lathe model not found'})
const item={model,slug:modelSlug}
const configurations=computed(()=>historicalConfigurations({manufacturer,model,machineFilter:isLathe}))
if(!configurations.value.length)throw createError({statusCode:404,statusMessage:'No usable historical specifications found'})
useSeoMeta({title:`${manufacturer} ${item.model} Specifications | UMS Spec Library`,description:`Historical ${manufacturer} ${item.model} specifications by year from exact UMS machinery records.`})
useHead({link:[{rel:'canonical',href:`https://www.usedmachinerysource.com/spec-library/${manufacturerSlug}/${item.slug}`}]})
</script>
<style scoped>.page{color:#17273a;background:#fff;padding-bottom:60px}.wrap{max-width:1120px;margin:0 auto;padding:0 28px}.hero{background:linear-gradient(105deg,#071b33,#0d2c52);color:#fff;padding:48px 0;border-bottom:4px solid #f47b20}.back{color:#c8d9eb;text-decoration:none}.kicker{color:#f47b20;font-size:.78rem;font-weight:900;letter-spacing:.12em;margin:18px 0 8px}.hero h1{font-size:clamp(2rem,4vw,3.2rem);margin:0 0 12px}.section{padding-top:44px}.warning{background:#fff7ea;border-left:5px solid #f47b20;padding:16px 18px;border-radius:6px;margin-bottom:34px}.section>h2{color:#0b2545}.intro{line-height:1.7;color:#526579}@media(max-width:760px){.wrap{padding:0 18px}}</style>