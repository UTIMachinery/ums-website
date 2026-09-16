<template><main class="page"><section class="hero"><div class="wrap"><div class="kicker">UMS MACHINERY SPECIFICATION LIBRARY</div><h1>Engine Lathes, Manual Mills &amp; Drilling Machines</h1><p>Research historical conventional machine specifications by manufacturer, model, year and configuration.</p><div class="actions"><NuxtLink to="/spec-library">← Spec Library</NuxtLink><NuxtLink to="/equipment">Current Equipment</NuxtLink></div></div></section><section class="wrap section"><div class="label">BROWSE BY MANUFACTURER</div><h2>Historical Manufacturers</h2><p>Manual lathes, manual mills, radial arm drills and related conventional machine types remain identified with each historical configuration.</p><input v-model="q" class="search" type="search" placeholder="Search manufacturer"><div class="grid"><NuxtLink v-for="m in filtered" :key="m.slug" :to="'/spec-library/'+m.slug+'/engine-lathes'" class="card"><strong>{{m.name}}</strong><span>{{m.models.length}} models · {{m.records}} historical records</span></NuxtLink></div></section></main></template>
<script setup>
import a from '~/assets/data/engine-library-a-c.js'
import d from '~/assets/data/engine-library-d-h.js'
import i from '~/assets/data/engine-library-i-m.js'
import n from '~/assets/data/engine-library-n-r.js'
import s from '~/assets/data/engine-library-s-t.js'
import u from '~/assets/data/engine-library-u-z.js'
import { mergeSpecLibrary } from '~/utils/mergeSpecLibrary'
import { historicalManufacturers } from '~/utils/historicalSpecLibrary'
const rawLibrary=mergeSpecLibrary([a,d,i,n,s,u])
const hasUsefulSpecs=v=>(v?.[2]||[]).some(x=>x?.[0] && x[0] !== 'Machine Type' && x[0] !== 'Advertising Summary' && x?.[1])
const cleanModel=m=>({...m,years:(m.years||[]).filter(hasUsefulSpecs)})
const library=rawLibrary.map(m=>({...m,models:(m.models||[]).map(cleanModel).filter(x=>x.years.length)})).filter(m=>m.models.length)
const conventionalFilter=m=>{const x=String(m.WebDesc||m.Web_Desc||'').trim().toLowerCase();return x==='lathes, manual'||x==='mills, manual'||x==='mills, cnc'||x==='radial arm drills'||x==='drills, turret'||x==='drills, gun'||x==='jig mills'||x==='jig mills, cnc'||x==='drills, h.d. & sensitive, multi spindle'||x==='drills, heavy duty & sensitive, sgl. vert. spdl.'||x==='drills, structural, multi spdl'||x==='millers, gantry, n/c & cnc'}
const conventionalSlug=v=>String(v||'').toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'')
const historicalConventionalManufacturers=historicalManufacturers({machineFilter:conventionalFilter})
const existingConventionalNames=new Set(library.map(m=>String(m.name||'').toLowerCase()))
const completeLibrary=[...library,...historicalConventionalManufacturers.filter(name=>!existingConventionalNames.has(name.toLowerCase())).map(name=>({name,slug:conventionalSlug(name),models:[]}))]
const q=ref('')
const filtered=computed(()=>{const x=q.value.trim().toLowerCase();return x?completeLibrary.filter(m=>m.name.toLowerCase().includes(x)):completeLibrary})
useSeoMeta({title:'Engine Lathe, Manual Mill & Drill Specifications | UMS Spec Library',description:'Research historical engine lathe, manual mill, radial arm drill and related conventional machine specifications from Used Machinery Source records.'})
useHead({link:[{rel:'canonical',href:'https://www.usedmachinerysource.com/spec-library/engine-lathes'}]})
</script>
<style scoped>.page{color:#17273a;background:#fff;padding-bottom:60px}.wrap{max-width:1200px;margin:0 auto;padding:0 28px}.hero{background:#0b2545;color:#fff;padding:54px 0;border-bottom:4px solid #f47b20}.kicker,.label{font-size:.78rem;font-weight:900;letter-spacing:.12em;color:#f47b20}.hero h1{font-size:clamp(2.3rem,4vw,3.5rem);margin:8px 0 12px}.hero p{color:#d9e4ef}.actions{display:flex;gap:12px;margin-top:22px}.actions a{padding:11px 16px;border:1px solid #d4dfeb;border-radius:5px;color:#fff;text-decoration:none;font-weight:800}.section{padding-top:46px}.search{width:100%;max-width:620px;padding:13px 15px;border:1px solid #aeb8c4;border-radius:6px;font-size:17px;margin:10px 0 22px}.grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px}.card{display:flex;flex-direction:column;gap:5px;border:1px solid #d7e0e8;border-radius:8px;padding:14px;text-decoration:none;color:#17273a}.card:hover{border-color:#f47b20}.card strong{color:#0b2545}.card span{font-size:.85rem;color:#6a7888}@media(max-width:850px){.grid{grid-template-columns:1fr}}</style>