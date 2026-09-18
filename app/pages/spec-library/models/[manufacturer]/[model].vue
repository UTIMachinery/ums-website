<template><main class="page"><section class="hero"><div class="wrap"><NuxtLink :to="'/spec-library/manufacturers/'+slug(manufacturer)" class="back">← {{manufacturer}} Specifications</NuxtLink><div class="kicker">UMS MACHINERY SPECIFICATION LIBRARY</div><h1>{{manufacturer}} {{model}} Specifications</h1><p>Historical {{displayType(typeName)}} specifications from exact UMS machinery records.</p></div></section><section class="wrap section"><div class="warning"><strong>Historical specification information — not a machine-for-sale listing.</strong> Specifications can vary by year, control, configuration and optional equipment.</div><h2>Historical {{model}} Specifications by Year</h2><HistoricalSpecConfigurations :configurations="configurations"/><SpecInventoryMatches :manufacturer="manufacturer" :model="model" :machine-type="inventoryType"/></section></main></template>
<script setup>
import historicalMachines from '~/assets/data/historical-machines.json'
import { historicalConfigurations } from '~/utils/historicalSpecLibrary'
import { clean,slug,rawType,displayType,typeKind } from '~/utils/specLibraryBrowse'
const route=useRoute()
const rows=historicalMachines.filter(m=>clean(m.Manufacturer)&&clean(m.Model)&&rawType(m))
const manufacturer=[...new Set(rows.map(m=>clean(m.Manufacturer)))].find(v=>slug(v)===String(route.params.manufacturer||''))
if(!manufacturer)throw createError({statusCode:404,statusMessage:'Manufacturer not found'})
const manufacturerRows=rows.filter(m=>clean(m.Manufacturer)===manufacturer)
const model=[...new Set(manufacturerRows.map(m=>clean(m.Model)))].find(v=>slug(v)===String(route.params.model||''))
if(!model)throw createError({statusCode:404,statusMessage:'Model not found'})
const modelRows=manufacturerRows.filter(m=>clean(m.Model)===model)
const requested=clean(route.query.type)
const typeName=(requested&&modelRows.some(m=>rawType(m)===requested))?requested:rawType(modelRows[0])
const configurations=computed(()=>historicalConfigurations({manufacturer,model,machineFilter:m=>rawType(m)===typeName}))
if(!configurations.value.length)throw createError({statusCode:404,statusMessage:'No usable historical specifications found'})
const inventoryType=computed(()=>({lathe:'lathe',vmc:'vmc',hmc:'hmc'}[typeKind(typeName)]||''))
useSeoMeta({title:manufacturer+' '+model+' Specifications | UMS Spec Library',description:'Historical '+manufacturer+' '+model+' '+displayType(typeName)+' specifications by year from exact UMS machinery records.'})
useHead({link:[{rel:'canonical',href:'https://www.usedmachinerysource.com/spec-library/models/'+slug(manufacturer)+'/'+slug(model)+'?type='+encodeURIComponent(typeName)}]})
</script>
<style scoped>.page{color:#17273a;background:#fff;padding-bottom:60px}.wrap{max-width:1120px;margin:0 auto;padding:0 28px}.hero{background:linear-gradient(105deg,#071b33,#0d2c52);color:#fff;padding:48px 0;border-bottom:4px solid #f47b20}.back{color:#c8d9eb;text-decoration:none}.kicker{color:#f47b20;font-size:.78rem;font-weight:900;letter-spacing:.12em;margin:18px 0 8px}.hero h1{font-size:clamp(2rem,4vw,3.2rem);margin:0 0 12px}.section{padding-top:44px}.warning{background:#fff7ea;border-left:5px solid #f47b20;padding:16px 18px;border-radius:6px;margin-bottom:34px}.section>h2{color:#0b2545}@media(max-width:760px){.wrap{padding:0 18px}}</style>