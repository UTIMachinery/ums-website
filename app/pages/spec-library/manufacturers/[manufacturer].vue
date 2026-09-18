<template><main class="page"><section class="hero"><div class="wrap"><NuxtLink to="/spec-library/manufacturers" class="back">← Manufacturers</NuxtLink><div class="kicker">UMS MACHINERY SPECIFICATION LIBRARY</div><h1>{{manufacturer}} Specifications</h1><p>Historical {{manufacturer}} machines organized by machine type and model.</p></div></section><section class="wrap section"><div v-for="type in types" :key="type.key" class="type"><h2>{{type.label}}</h2><div class="models"><NuxtLink v-for="item in type.models" :key="item.model+'|'+item.type" :to="modelUrl(manufacturer,item.model,item.type)" class="model">{{item.model}}</NuxtLink></div></div></section></main></template>
<script setup>
import historicalMachines from '~/assets/data/historical-machines.json'
import {clean,slug,rawType,displayType,typeKind,modelUrl} from '~/utils/specLibraryBrowse'
const route=useRoute()
const rows=historicalMachines.filter(m=>clean(m.Manufacturer)&&clean(m.Model)&&rawType(m))
const manufacturer=[...new Set(rows.map(m=>clean(m.Manufacturer)))].find(m=>slug(m)===String(route.params.manufacturer||''))
if(!manufacturer)throw createError({statusCode:404,statusMessage:'Manufacturer not found'})
const mine=rows.filter(m=>clean(m.Manufacturer)===manufacturer)
const typeMap=new Map()
for(const row of mine){const raw=rawType(row),kind=typeKind(raw),key=kind==='other'?raw:kind;if(!typeMap.has(key))typeMap.set(key,{key,label:displayType(raw),rows:[]});typeMap.get(key).rows.push(row)}
const order={lathe:0,vmc:1,hmc:2}
const types=[...typeMap.values()].sort((a,b)=>(order[a.key]??3)-(order[b.key]??3)||a.label.localeCompare(b.label)).map(t=>({...t,models:[...new Map(t.rows.map(r=>[clean(r.Model).toLowerCase(),{model:clean(r.Model),type:rawType(r)}])).values()].sort((a,b)=>a.model.localeCompare(b.model,undefined,{numeric:true}))}))
useSeoMeta({title:manufacturer+' Machine Specifications | UMS Spec Library',description:'Historical '+manufacturer+' machine specifications organized by machine type and model.'})
</script>
<style scoped>.page{color:#17273a;padding-bottom:60px}.wrap{max-width:1200px;margin:auto;padding:0 28px}.hero{background:#0b2545;color:#fff;padding:46px 0;border-bottom:4px solid #f47b20}.back{color:#c8d9eb}.kicker{color:#f47b20;font-size:.78rem;font-weight:900;letter-spacing:.12em;margin:16px 0 8px}.hero h1{font-size:3rem;margin:0 0 10px}.section{padding-top:34px}.type{margin-bottom:36px}.type h2{color:#0b2545;border-bottom:2px solid #f47b20;padding-bottom:8px}.models{display:grid;grid-template-columns:repeat(4,1fr);gap:9px}.model{padding:11px;border:1px solid #d7e0e8;border-radius:6px;text-decoration:none;color:#1c4587;font-weight:700}.model:hover{border-color:#f47b20}@media(max-width:800px){.models{grid-template-columns:repeat(2,1fr)}.wrap{padding:0 18px}}</style>