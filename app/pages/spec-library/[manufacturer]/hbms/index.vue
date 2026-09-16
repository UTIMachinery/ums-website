<template>
  <main v-if="manufacturer" class="page">
    <section class="hero"><div class="wrap"><NuxtLink to="/spec-library/hbms" class="back">← HBM Spec Library</NuxtLink><div class="kicker">UMS MACHINERY SPECIFICATION LIBRARY</div><h1>{{manufacturer.name}} Horizontal Boring Mills</h1><p>{{manufacturer.models.length}} historical model pages built from {{manufacturer.records}} UMS HBM records.</p></div></section>
    <section class="wrap section"><h2>{{manufacturer.name}} HBM Model Pages</h2><p class="intro">Historical reference pages only. Table Type, Floor Type and Planer Type are retained where the source record identifies the machine style.</p><input v-model="q" class="search" type="search" :placeholder="`Search ${manufacturer.name} HBM model`"><div class="grid"><NuxtLink v-for="m in filtered" :key="m.slug" :to="`/spec-library/${manufacturer.slug}/hbms/${m.slug}`" class="card"><strong>{{m.model}}</strong><span>{{m.count}} historical record{{m.count===1?'':'s'}} · {{typeLabel(m)}} · {{yearLabel(m)}}</span></NuxtLink></div></section>
    <section class="wrap section note"><div class="label">HISTORICAL DATA METHOD</div><h2>HBM style remains visible</h2><p>The library preserves recorded machine style and year/configuration differences so floor-type and table-type boring mills are not blended into a generic specification.</p></section>
  </main><main v-else class="missing"><h1>HBM manufacturer not found</h1><NuxtLink to="/spec-library/hbms">Browse the HBM Spec Library</NuxtLink></main>
</template>
<script setup>
import { historicalModelSummaries } from '~/utils/historicalSpecLibrary'
const route=useRoute(),q=ref('')
const slugify=s=>String(s||'').toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'')
const manufacturerName=String(route.params.manufacturer||'').split('-').map(x=>x?x[0].toUpperCase()+x.slice(1):x).join(' ')
const isHbm=m=>{const x=(String(m.Groups||'')+' '+String(m.WebDesc||m.Web_Desc||'')).toLowerCase();return x.includes('horizontal boring')&&!x.includes('jig mill')}
const models=historicalModelSummaries({manufacturer:manufacturerName,machineFilter:isHbm})
const manufacturer=computed(()=>models.length?{name:manufacturerName,slug:slugify(manufacturerName)}:null)
if(!manufacturer.value)setResponseStatus(404)
const filtered=computed(()=>{const x=q.value.trim().toLowerCase();return x?models.filter(m=>m.model.toLowerCase().includes(x)):models})
const yearLabel=m=>!m.firstYear?'year varies/not recorded':m.firstYear===m.lastYear?String(m.firstYear):`${m.firstYear}–${m.lastYear}`
const typeLabel=()=> 'historical HBM'
useSeoMeta({title:()=>manufacturer.value?`${manufacturer.value.name} HBM Specifications | UMS Spec Library`:'HBM Specifications | UMS',description:()=>manufacturer.value?`Research historical ${manufacturer.value.name} horizontal boring mill specifications by model, year and machine style from Used Machinery Source records.`:'Historical horizontal boring mill specifications.'})
useHead(()=>({link:[{rel:'canonical',href:`https://www.usedmachinerysource.com/spec-library/${route.params.manufacturer}/hbms`}]}))
</script><style scoped>
.page{color:#17273a;background:#fff;padding-bottom:60px}.wrap{max-width:1200px;margin:0 auto;padding:0 28px}.hero{background:linear-gradient(105deg,#071b33,#0d2c52);color:#fff;padding:50px 0;border-bottom:4px solid #f47b20}.back{color:#c8d9eb;text-decoration:none}.kicker,.label{font-size:.78rem;font-weight:900;letter-spacing:.12em;color:#f47b20;margin:18px 0 8px}.hero h1{font-size:clamp(2.2rem,4vw,3.3rem);margin:0 0 14px}.hero p,.intro,.note p{max-width:940px;line-height:1.7}.section{padding-top:46px}.section h2{color:#0b2545;margin:0 0 12px}.search{width:100%;max-width:620px;padding:13px 15px;border:1px solid #aeb8c4;border-radius:6px;font-size:17px;margin:10px 0 22px}.grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px}.card{display:flex;flex-direction:column;gap:5px;border:1px solid #d7e0e8;border-radius:8px;padding:14px;text-decoration:none;color:#17273a}.card:hover{border-color:#f47b20;background:#fff9f4}.card strong{color:#0b2545}.card span{font-size:.85rem;color:#6a7888}.note{margin-top:34px;border-left:5px solid #f47b20;background:#f5f7fa;padding-top:28px;padding-bottom:28px}.missing{max-width:900px;margin:0 auto;padding:60px 24px}.missing a{color:#1c4587;font-weight:700}@media(max-width:850px){.grid{grid-template-columns:1fr}.wrap{padding:0 18px}}
</style>