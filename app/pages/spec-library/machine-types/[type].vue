<template><main class="page"><section class="hero"><div class="wrap"><NuxtLink to="/spec-library/machine-types" class="back">← Machine Types</NuxtLink><div class="kicker">UMS MACHINERY SPECIFICATION LIBRARY</div><h1>{{typeLabel}}</h1><p>Historical {{typeLabel}} specifications organized by manufacturer and model.</p></div></section><section class="wrap section"><div v-for="m in manufacturers" :key="m.name" class="manufacturer"><h2>{{m.name}}</h2><div class="models"><NuxtLink v-for="item in m.models" :key="item.model+'|'+item.type" :to="modelUrl(m.name,item.model,item.type)" class="model">{{item.model}}</NuxtLink></div></div></section></main></template>
<script setup>
import historicalMachines from '~/assets/data/historical-machines.json'
import {clean,rawType,displayType,typeKind,browseTypeKey,modelUrl} from '~/utils/specLibraryBrowse'
const route=useRoute(),key=String(route.params.type||'')
const rows=historicalMachines.filter(m=>clean(m.Manufacturer)&&clean(m.Model)&&rawType(m))
const matching=rows.filter(r=>browseTypeKey(rawType(r))===key)
if(!matching.length)throw createError({statusCode:404,statusMessage:'Machine type not found'})
const kind=typeKind(rawType(matching[0]))
const typeLabel=displayType(rawType(matching[0]))
const manufacturers=[...new Set(matching.map(m=>clean(m.Manufacturer)))].sort((a,b)=>a.localeCompare(b)).map(name=>{const mine=matching.filter(m=>clean(m.Manufacturer)===name);return{name,models:[...new Map(mine.map(r=>[clean(r.Model).toLowerCase(),{model:clean(r.Model),type:rawType(r)}])).values()].sort((a,b)=>a.model.localeCompare(b.model,undefined,{numeric:true}))}})
useSeoMeta({title:typeLabel+' Specifications | UMS Spec Library',description:'Historical '+typeLabel+' specifications organized by manufacturer and model.'})
</script>
<style scoped>.page{color:#17273a;padding-bottom:60px}.wrap{max-width:1200px;margin:auto;padding:0 28px}.hero{background:#0b2545;color:#fff;padding:46px 0;border-bottom:4px solid #f47b20}.back{color:#c8d9eb}.kicker{color:#f47b20;font-size:.78rem;font-weight:900;letter-spacing:.12em;margin:16px 0 8px}.hero h1{font-size:clamp(2rem,4vw,3rem);margin:0}.section{padding-top:34px}.manufacturer{margin-bottom:30px}.manufacturer h2{color:#0b2545;border-bottom:1px solid #d7e0e8;padding-bottom:7px}.models{display:grid;grid-template-columns:repeat(4,1fr);gap:9px}.model{padding:11px;border:1px solid #d7e0e8;border-radius:6px;text-decoration:none;color:#1c4587;font-weight:700}.model:hover{border-color:#f47b20}@media(max-width:800px){.models{grid-template-columns:repeat(2,1fr)}.wrap{padding:0 18px}}</style>