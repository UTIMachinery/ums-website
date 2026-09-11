<template>
  <main v-if="manufacturer" class="page">
    <section class="hero"><div class="wrap"><NuxtLink to="/spec-library/hmcs" class="back">← HMC Spec Library</NuxtLink><div class="kicker">UMS MACHINERY SPECIFICATION LIBRARY</div><h1>{{manufacturer.name}} Horizontal Machining Centers</h1><p>{{manufacturer.models.length}} historical model pages built from {{manufacturer.records}} UMS HMC records.</p></div></section>
    <section class="wrap section"><h2>{{manufacturer.name}} HMC Model Pages</h2><p class="intro">Historical reference pages organized by model and recorded year/control configuration.</p><input v-model="q" class="search" type="search" :placeholder="`Search ${manufacturer.name} HMC model`"><div class="grid"><NuxtLink v-for="m in filtered" :key="m.slug" :to="`/spec-library/${manufacturer.slug}/hmcs/${m.slug}`" class="card"><strong>{{m.name}}</strong><span>{{m.records}} historical record{{m.records===1?'':'s'}} · {{yearLabel(m)}}</span></NuxtLink></div></section>
  </main>
  <main v-else class="missing"><h1>HMC manufacturer not found</h1><NuxtLink to="/spec-library/hmcs">Browse the HMC Spec Library</NuxtLink></main>
</template>
<script setup>
import library from '~/assets/data/hmc-additional-library.js'
const route=useRoute(),q=ref('')
const manufacturer=computed(()=>library.find(m=>m.slug===route.params.manufacturer)||null)
if(!manufacturer.value)setResponseStatus(404)
const filtered=computed(()=>{const x=q.value.trim().toLowerCase();const models=manufacturer.value?.models||[];return x?models.filter(m=>m.name.toLowerCase().includes(x)):models})
const yearLabel=m=>{const y=(m.years||[]).map(r=>String(r[0])).filter(Boolean);return y.length<=1?(y[0]||'year varies'):`${y[0]}–${y[y.length-1]}`}
useSeoMeta({title:()=>manufacturer.value?`${manufacturer.value.name} HMC Specifications | UMS Spec Library`:'HMC Specifications | UMS',description:()=>manufacturer.value?`Historical ${manufacturer.value.name} horizontal machining center specifications by model and year/configuration.`:'Historical HMC specifications.'})
const canonical=computed(()=>`https://www.usedmachinerysource.com/spec-library/${route.params.manufacturer}/hmcs`)
useHead(()=>({link:[{rel:'canonical',href:canonical.value}]}))
</script>
<style scoped>
.page{color:#17273a;background:#fff;padding-bottom:60px}.wrap{max-width:1200px;margin:0 auto;padding:0 28px}.hero{background:linear-gradient(105deg,#071b33,#0d2c52);color:#fff;padding:50px 0;border-bottom:4px solid #f47b20}.back{color:#c8d9eb;text-decoration:none}.kicker{font-size:.78rem;font-weight:900;letter-spacing:.12em;color:#f47b20;margin:18px 0 8px}.hero h1{font-size:clamp(2.2rem,4vw,3.3rem);margin:0 0 14px}.hero p,.intro{max-width:940px;line-height:1.7}.section{padding-top:46px}.section h2{color:#0b2545}.search{width:100%;max-width:620px;padding:13px 15px;border:1px solid #aeb8c4;border-radius:6px;font-size:17px;margin:10px 0 22px}.grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px}.card{display:flex;flex-direction:column;gap:5px;border:1px solid #d7e0e8;border-radius:8px;padding:14px;text-decoration:none;color:#17273a}.card:hover{border-color:#f47b20;background:#fff9f4}.card strong{color:#0b2545}.card span{font-size:.85rem;color:#6a7888}.missing{max-width:900px;margin:0 auto;padding:60px 24px}@media(max-width:850px){.grid{grid-template-columns:1fr}.wrap{padding:0 18px}}
</style>