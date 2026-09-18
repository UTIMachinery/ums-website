<template><main class="page"><section class="hero"><div class="wrap"><NuxtLink to="/spec-library" class="back">← Spec Library</NuxtLink><div class="kicker">BROWSE HISTORICAL SPECIFICATIONS</div><h1>Machine Types</h1><p>Browse historical specifications by machine type.</p></div></section><section class="wrap section"><div class="grid"><NuxtLink v-for="t in types" :key="t.key" :to="'/spec-library/machine-types/'+t.key" class="card">{{t.label}}</NuxtLink></div></section></main></template>
<script setup>
import historicalMachines from '~/assets/data/historical-machines.json'
import {clean,rawType,displayType,typeKind,browseTypeKey} from '~/utils/specLibraryBrowse'
const rows=historicalMachines.filter(m=>clean(m.Manufacturer)&&clean(m.Model)&&rawType(m))
const map=new Map()
for(const r of rows){const raw=rawType(r),key=browseTypeKey(raw);if(!map.has(key))map.set(key,{key,label:displayType(raw),kind:typeKind(raw)})}
const order={lathe:0,vmc:1,hmc:2}
const types=[...map.values()].sort((a,b)=>(order[a.kind]??3)-(order[b.kind]??3)||a.label.localeCompare(b.label))
useSeoMeta({title:'Machine Types | UMS Spec Library',description:'Browse historical machinery specifications by machine type in the Used Machinery Source Spec Library.'})
</script>
<style scoped>.page{color:#17273a;padding-bottom:60px}.wrap{max-width:1200px;margin:auto;padding:0 28px}.hero{background:#0b2545;color:#fff;padding:46px 0;border-bottom:4px solid #f47b20}.back{color:#c8d9eb}.kicker{color:#f47b20;font-size:.78rem;font-weight:900;letter-spacing:.12em;margin:16px 0 8px}.hero h1{font-size:3rem;margin:0}.section{padding-top:34px}.grid{display:grid;grid-template-columns:repeat(3,1fr);gap:10px}.card{padding:14px;border:1px solid #d7e0e8;border-radius:7px;color:#0b2545;font-weight:800;text-decoration:none}.card:hover{border-color:#f47b20}@media(max-width:800px){.grid{grid-template-columns:1fr}.wrap{padding:0 18px}}</style>