<template>
  <main v-if="machine" class="page">
    <section class="hero"><div class="wrap"><NuxtLink to="../" class="back">← Toshiba HMC Spec Library</NuxtLink><div class="kicker">UMS MACHINERY SPECIFICATION LIBRARY</div><h1>Toshiba {{machine.name}} HMC Specifications</h1><p>Historical horizontal machining center specifications based on {{machine.records}} UMS machine record{{machine.records===1?'':'s'}}.</p></div></section>
    <section class="wrap section"><div class="warning"><strong>Historical reference information — not a machine-for-sale listing.</strong> Pallet, spindle, control and tooling configurations can vary by year and option package.</div><h2>Historical {{machine.name}} Specifications by Year</h2><p class="intro">Each block below represents a recorded historical year/control configuration.</p><HmcYearConfigurations :model="` Toshiba ${machine.name}`.trim()" :configurations="yearConfigurations" /></section>
  </main>
  <main v-else class="missing"><h1>Toshiba HMC model not found</h1><NuxtLink to="../">Browse Toshiba HMC specifications</NuxtLink></main>
</template>
<script setup>
import manufacturer from '~/assets/data/toshiba-hmc.js'
const route=useRoute()
const machine=computed(()=>manufacturer.models.find(m=>m.slug===route.params.model)||null)
if(!machine.value)setResponseStatus(404)
const yearConfigurations=computed(()=>(machine.value?.years||[]).map(r=>({year:r[0],title:`${r[0]} Toshiba ${machine.value.name} historical configuration`,control:r[1]||'Control not recorded',specs:(r[2]||[]).filter(s=>s?.[0]&&s?.[1]&&String(s[1]).trim()).map(s=>({label:s[0],value:s[1]})),note:r[3]||''})))
useSeoMeta({title:()=>machine.value?`Toshiba ${machine.value.name} HMC Specifications | UMS Spec Library`:'Toshiba HMC Specifications | UMS',description:()=>machine.value?`Historical Toshiba ${machine.value.name} HMC specifications including pallets, travels, spindle, ATC and control data.`:'Historical Toshiba HMC specifications.'})
</script>
<style scoped>
.page{color:#17273a;background:#fff;padding-bottom:60px}.wrap{max-width:1120px;margin:0 auto;padding:0 28px}.hero{background:linear-gradient(105deg,#071b33,#0d2c52);color:#fff;padding:48px 0;border-bottom:4px solid #f47b20}.back{color:#c8d9eb;text-decoration:none}.kicker{color:#f47b20;font-size:.78rem;font-weight:900;letter-spacing:.12em;margin:18px 0 8px}.hero h1{font-size:clamp(2rem,4vw,3.2rem);margin:0 0 12px}.hero p{max-width:820px;line-height:1.7}.section{padding-top:44px}.warning{background:#fff7ea;border-left:5px solid #f47b20;padding:16px 18px;border-radius:6px;margin-bottom:34px}.section>h2{color:#0b2545}.intro{line-height:1.7;max-width:900px;color:#526579}.missing{max-width:900px;margin:0 auto;padding:60px 24px}@media(max-width:760px){.wrap{padding:0 18px}}
</style>