<template>
  <main v-if="manufacturer" class="page">
    <section class="hero"><div class="wrap"><NuxtLink to="/spec-library/vmcs" class="back">← VMC Spec Library</NuxtLink><div class="kicker">UMS MACHINERY SPECIFICATION LIBRARY</div><h1>{{manufacturer.name}} Vertical Machining Centers</h1><p>{{manufacturer.models.length}} historical model pages built from {{manufacturer.records}} UMS VMC records.</p></div></section>
    <section class="wrap section"><h2>{{manufacturer.name}} VMC Model Pages</h2><p class="intro">Historical reference pages only. Models remain separate unless the historical database shows an obvious spelling or punctuation duplicate.</p>
      <input v-model="q" class="search" type="search" :placeholder="`Search ${manufacturer.name} VMC model`">
      <div class="grid"><NuxtLink v-for="m in filtered" :key="m.slug" :to="`/spec-library/${manufacturer.slug}/vmcs/${m.slug}`" class="card"><strong>{{m.name}}</strong><span>{{m.records}} historical record{{m.records===1?'':'s'}} · {{yearLabel(m)}}</span></NuxtLink></div>
    </section>
    <section class="wrap section note"><div class="label">HISTORICAL DATA METHOD</div><h2>Year and configuration differences are preserved</h2><p>Where UMS historical records show different controls, travels, tables, spindle packages or tooling by year, those configurations are displayed separately rather than averaged into one specification.</p></section>
  </main>
  <main v-else class="missing"><h1>VMC manufacturer not found</h1><NuxtLink to="/spec-library/vmcs">Browse the VMC Spec Library</NuxtLink></main>
</template>
<script setup>
import library from '~/assets/data/vmc-remaining-library.js'
const route=useRoute()
const q=ref('')
const manufacturer=computed(()=>library.find(m=>m.slug===route.params.manufacturer)||null)
if(!manufacturer.value)setResponseStatus(404)
const filtered=computed(()=>{
  const x=q.value.trim().toLowerCase()
  const models=manufacturer.value?.models||[]
  return x?models.filter(m=>m.name.toLowerCase().includes(x)):models
})
const yearLabel=m=>{
  const years=[...(m.years||[])].map(y=>String(y[0])).filter(y=>y&&y!=='Year not recorded')
  if(!years.length)return 'year varies/not recorded'
  if(years.length===1)return years[0]
  return `${years[0]}–${years[years.length-1]}`
}
useSeoMeta({
  title:()=>manufacturer.value?`${manufacturer.value.name} VMC Specifications | UMS Spec Library`:'VMC Specifications | UMS',
  description:()=>manufacturer.value?`Research historical ${manufacturer.value.name} vertical machining center specifications by model and year from Used Machinery Source records.`:'Historical vertical machining center specifications.'
})
const canonical=computed(()=>`https://www.usedmachinerysource.com/spec-library/${route.params.manufacturer}/vmcs`)
useHead(()=>({link:[{rel:'canonical',href:canonical.value}]}))
</script>
<style scoped>
.page{color:#17273a;background:#fff;padding-bottom:60px}.wrap{max-width:1200px;margin:0 auto;padding:0 28px}.hero{background:linear-gradient(105deg,#071b33,#0d2c52);color:#fff;padding:50px 0;border-bottom:4px solid #f47b20}.back{color:#c8d9eb;text-decoration:none}.kicker,.label{font-size:.78rem;font-weight:900;letter-spacing:.12em;color:#f47b20;margin:18px 0 8px}.hero h1{font-size:clamp(2.2rem,4vw,3.3rem);margin:0 0 14px}.hero p,.intro,.note p{max-width:940px;line-height:1.7}.section{padding-top:46px}.section h2{color:#0b2545;margin:0 0 12px}.search{width:100%;max-width:620px;padding:13px 15px;border:1px solid #aeb8c4;border-radius:6px;font-size:17px;margin:10px 0 22px}.grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px}.card{display:flex;flex-direction:column;gap:5px;border:1px solid #d7e0e8;border-radius:8px;padding:14px;text-decoration:none;color:#17273a}.card:hover{border-color:#f47b20;background:#fff9f4}.card strong{color:#0b2545}.card span{font-size:.85rem;color:#6a7888}.note{margin-top:34px;border-left:5px solid #f47b20;background:#f5f7fa;padding-top:28px;padding-bottom:28px}.missing{max-width:900px;margin:0 auto;padding:60px 24px}.missing a{color:#1c4587;font-weight:700}@media(max-width:850px){.grid{grid-template-columns:1fr}.wrap{padding:0 18px}}
</style>