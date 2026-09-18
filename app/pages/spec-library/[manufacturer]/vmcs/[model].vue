<template>
  <main v-if="manufacturer&&machine" class="page">
    <section class="hero"><div class="wrap"><NuxtLink :to="`/spec-library/${manufacturer.slug}/vmcs`" class="back">← {{manufacturer.name}} VMC Spec Library</NuxtLink><div class="kicker">UMS MACHINERY SPECIFICATION LIBRARY</div><h1>{{manufacturer.name}} {{machine.name}} Specifications</h1><p>Historical vertical machining center specifications based on {{historicalConfigs.length}} usable UMS machine record{{historicalConfigs.length===1?'':'s'}}.</p></div></section>
    <section class="wrap section"><div class="warning"><strong>Historical reference information — not a machine-for-sale listing.</strong> Values can vary by year, CNC control, spindle package and optional equipment.</div>
      <h2>Historical {{machine.name}} Specifications by Year</h2><p class="intro">Each block below represents one historical UMS machine record. Specifications and equipment are joined only by that record's InvID, so configurations are never mixed together.</p>
      <HistoricalSpecConfigurations :configurations="historicalConfigs" /><SpecInventoryMatches :manufacturer="manufacturer.name" :model="machine.name" machine-type="vmc" />
      <section class="cta"><div><div class="cta-kicker">NEED A MACHINE?</div><h2>Looking for a {{manufacturer.name}} {{machine.name}}?</h2><p>Tell Used Machinery Source what you need and we can help locate a machine that fits your requirements.</p></div><NuxtLink to="/equipment#tell-us-what-you-need">Tell Us What You Need</NuxtLink></section>
    </section>
  </main>
  <main v-else class="missing"><h1>VMC model not found</h1><NuxtLink to="/spec-library/vmcs">Browse VMC specifications</NuxtLink></main>
</template>
<script setup>
import library from '~/assets/data/vmc-remaining-library.js'
import { historicalConfigurations } from '~/utils/historicalSpecLibrary'
const route=useRoute()
const manufacturer=computed(()=>library.find(m=>m.slug===route.params.manufacturer)||null)
const machine=computed(()=>manufacturer.value?.models?.find(m=>m.slug===route.params.model)||null)
if(!manufacturer.value||!machine.value)setResponseStatus(404)
const historicalConfigs=computed(()=>manufacturer.value&&machine.value?historicalConfigurations({manufacturer:manufacturer.value.name,model:machine.value.name}):[])
useSeoMeta({
  title:()=>manufacturer.value&&machine.value?`${manufacturer.value.name} ${machine.value.name} VMC Specifications | UMS Spec Library`:'VMC Specifications | UMS',
  description:()=>manufacturer.value&&machine.value?`Historical ${manufacturer.value.name} ${machine.value.name} VMC specifications by year including travels, table, spindle and tooling data.`:'Historical VMC specifications.'
})
const canonical=computed(()=>`https://www.usedmachinerysource.com/spec-library/${route.params.manufacturer}/vmcs/${route.params.model}`)
useHead(()=>({link:[{rel:'canonical',href:canonical.value}]}))
</script>
<style scoped>
.page{color:#17273a;background:#fff;padding-bottom:60px}.wrap{max-width:1120px;margin:0 auto;padding:0 28px}.hero{background:linear-gradient(105deg,#071b33,#0d2c52);color:#fff;padding:48px 0;border-bottom:4px solid #f47b20}.back{color:#c8d9eb;text-decoration:none}.kicker{color:#f47b20;font-size:.78rem;font-weight:900;letter-spacing:.12em;margin:18px 0 8px}.hero h1{font-size:clamp(2rem,4vw,3.2rem);margin:0 0 12px}.hero p{max-width:820px;line-height:1.7}.section{padding-top:44px}.warning{background:#fff7ea;border-left:5px solid #f47b20;padding:16px 18px;border-radius:6px;margin-bottom:34px}.section>h2{color:#0b2545;margin:0 0 12px}.intro{line-height:1.7;max-width:900px;color:#526579}.cta{margin-top:46px;padding:28px 30px;background:linear-gradient(105deg,#071b33,#0d2c52);color:#fff;border-radius:10px;border-top:5px solid #f47b20;display:flex;align-items:center;justify-content:space-between;gap:20px}.cta-kicker{color:#f47b20;font-size:.76rem;font-weight:900;letter-spacing:.12em}.cta h2{margin:6px 0;color:#fff}.cta p{margin:0;max-width:700px}.cta a{background:#f47b20;color:#fff;text-decoration:none;font-weight:800;padding:11px 16px;border-radius:5px;white-space:nowrap}.missing{max-width:900px;margin:0 auto;padding:60px 24px}.missing a{color:#1c4587;font-weight:700}@media(max-width:760px){.wrap{padding:0 18px}.cta{align-items:flex-start;flex-direction:column}}
</style>