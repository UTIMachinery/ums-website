<template>
  <main v-if="item" class="page">
    <section class="hero"><div class="wrap"><NuxtLink to="/spec-library/mazak/cnc-lathes" class="back">← Mazak CNC Lathe Library</NuxtLink><div class="kicker">UMS MACHINERY SPECIFICATION LIBRARY</div><h1>Mazak {{ item.model }} Specifications</h1><p>Historical Mazak {{ item.model }} specifications from individual UMS machinery records.</p></div></section>
    <section class="wrap section"><div class="warning"><strong>Historical specification information — not a machine-for-sale listing.</strong> Specifications can vary by year, control, configuration and optional equipment.</div><h2>Historical {{ item.model }} Specifications by Year</h2><p class="intro">Choose a recorded year below. Each configuration is joined to specifications only by its exact historical InvID.</p><HistoricalSpecConfigurations :configurations="configurations"/><SpecInventoryMatches manufacturer="Mazak" :model="item.model" machine-type="lathe"/></section>
  </main>
</template>
<script setup>
import p1 from '~/assets/data/mazak-full-specs-1.js'
import p2 from '~/assets/data/mazak-full-specs-2.js'
import p3 from '~/assets/data/mazak-full-specs-3.js'
import p4 from '~/assets/data/mazak-full-specs-4.js'
import p5 from '~/assets/data/mazak-full-specs-5.js'
import p6 from '~/assets/data/mazak-full-specs-6.js'
import p7 from '~/assets/data/mazak-full-specs-7.js'
import { historicalConfigurations } from '~/utils/historicalSpecLibrary'
const route=useRoute()
const raw=[...p1,...p2,...p3,...p4,...p5,...p6,...p7]
const hit=raw.find(x=>x[1]===route.params.slug)
if(!hit)throw createError({statusCode:404,statusMessage:'Mazak model not found'})
const item={model:hit[0],slug:hit[1]}
const configurations=computed(()=>historicalConfigurations({manufacturer:'Mazak',model:item.model}))
if(!configurations.value.length)throw createError({statusCode:404,statusMessage:'No usable historical specifications found'})
useSeoMeta({title:`Mazak ${item.model} Specifications | UMS Spec Library`,description:`Historical Mazak ${item.model} specifications by year from exact UMS machinery records.`})
const canonical=`https://www.usedmachinerysource.com/spec-library/mazak/${item.slug}`
useHead({link:[{rel:'canonical',href:canonical}]})
</script>
<style scoped>
.page{color:#17273a;background:#fff;padding-bottom:60px}.wrap{max-width:1120px;margin:0 auto;padding:0 28px}.hero{background:linear-gradient(105deg,#071b33,#0d2c52);color:#fff;padding:48px 0;border-bottom:4px solid #f47b20}.back{color:#c8d9eb;text-decoration:none}.kicker{color:#f47b20;font-size:.78rem;font-weight:900;letter-spacing:.12em;margin:18px 0 8px}.hero h1{font-size:clamp(2rem,4vw,3.2rem);margin:0 0 12px}.hero p{max-width:820px;line-height:1.7}.section{padding-top:44px}.warning{background:#fff7ea;border-left:5px solid #f47b20;padding:16px 18px;border-radius:6px;margin-bottom:34px}.section>h2{color:#0b2545;margin:0 0 12px}.intro{line-height:1.7;max-width:900px;color:#526579}@media(max-width:760px){.wrap{padding:0 18px}}
</style>