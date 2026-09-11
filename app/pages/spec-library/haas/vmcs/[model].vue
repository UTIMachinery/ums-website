<template>
  <main v-if="entry" class="page">
    <section class="hero"><div class="wrap"><NuxtLink to="/spec-library/haas/vmcs" class="back">← Haas VMC Spec Library</NuxtLink><div class="kicker">UMS MACHINERY SPECIFICATION LIBRARY</div><h1>Haas {{entry[0]}} Specifications</h1><p>Historical vertical machining center specifications based on {{entry[2]}} UMS machine records spanning {{entry[3]}}–{{entry[4]}}.</p></div></section>
    <section class="wrap section"><div class="warning"><strong>Historical reference information — not a machine-for-sale listing.</strong> Values can vary by year, spindle package, control and optional equipment.</div><h2>Most Common Recorded Specifications</h2><p class="intro">For each specification below, UMS shows the most frequently recorded value for this model. The support count shows how many historical observations matched it. A variation notice appears when more than one value was recorded.</p>
      <div class="spec-grid"><article v-for="s in entry[5]" :key="s[0]" class="spec-card"><div class="spec-label">{{s[0]}}</div><div class="spec-value">{{s[1]}}</div><div class="support">{{s[2]}} of {{s[3]}} recorded observations matched<span v-if="s[4]>1"> · {{s[4]}} values recorded</span></div><div v-if="s[4]>1" class="varies">Varies by year/configuration</div></article></div>
      <section class="cta"><div><div class="cta-kicker">NEED A MACHINE?</div><h2>Looking for a Haas {{entry[0]}}?</h2><p>Tell Used Machinery Source what you need and we can help locate a machine that fits your requirements.</p></div><NuxtLink to="/equipment#tell-us-what-you-need">Tell Us What You Need</NuxtLink></section>
    </section>
  </main>
  <main v-else class="missing"><h1>Haas VMC model not found</h1><NuxtLink to="/spec-library/haas/vmcs">Browse Haas VMC specifications</NuxtLink></main>
</template>
<script setup>
import core from '~/assets/data/haas-vmc-core.js'
import more from '~/assets/data/haas-vmc-more.js'
const raw=[...core,...more]
const route=useRoute()
const entry=computed(()=>raw.find(m=>m[1]===route.params.model))
if(!entry.value)setResponseStatus(404)
useSeoMeta({title:()=>entry.value?`Haas ${entry.value[0]} VMC Specifications | UMS Spec Library`:'Haas VMC Specifications | UMS',description:()=>entry.value?`Historical Haas ${entry.value[0]} vertical machining center specifications including travels, table size, spindle, horsepower and tool capacity.`:'Historical Haas VMC specifications.'})
const canonical=computed(()=>`https://www.usedmachinerysource.com/spec-library/haas/vmcs/${route.params.model}`)
useHead(()=>({link:[{rel:'canonical',href:canonical.value}]}))
</script>
<style scoped>
.page{color:#17273a;background:#fff;padding-bottom:60px}.wrap{max-width:1120px;margin:0 auto;padding:0 28px}.hero{background:linear-gradient(105deg,#071b33,#0d2c52);color:#fff;padding:48px 0;border-bottom:4px solid #f47b20}.back{color:#c8d9eb;text-decoration:none}.kicker{color:#f47b20;font-size:.78rem;font-weight:900;letter-spacing:.12em;margin:18px 0 8px}.hero h1{font-size:clamp(2rem,4vw,3.2rem);margin:0 0 12px}.hero p{max-width:820px;line-height:1.7}.section{padding-top:44px}.warning{background:#fff7ea;border-left:5px solid #f47b20;padding:16px 18px;border-radius:6px;margin-bottom:34px}.section>h2{color:#0b2545;margin:0 0 12px}.intro{line-height:1.7;max-width:900px;color:#526579}.spec-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:14px;margin-top:24px}.spec-card{border:1px solid #d7e0e8;border-radius:8px;padding:17px;background:#fff}.spec-label{font-weight:800;color:#43566b;font-size:.9rem}.spec-value{font-size:1.45rem;font-weight:900;color:#0b2545;margin:5px 0}.support{font-size:.8rem;color:#6a7888}.varies{margin-top:8px;color:#8c3f10;font-size:.78rem;font-weight:800}.cta{margin-top:46px;padding:28px 30px;background:linear-gradient(105deg,#071b33,#0d2c52);color:#fff;border-radius:10px;border-top:5px solid #f47b20;display:flex;align-items:center;justify-content:space-between;gap:20px}.cta-kicker{color:#f47b20;font-size:.76rem;font-weight:900;letter-spacing:.12em}.cta h2{margin:6px 0;color:#fff}.cta p{margin:0;max-width:700px}.cta a{background:#f47b20;color:#fff;text-decoration:none;font-weight:800;padding:11px 16px;border-radius:5px;white-space:nowrap}.missing{max-width:900px;margin:0 auto;padding:60px 24px}.missing a{color:#1c4587;font-weight:700}@media(max-width:760px){.wrap{padding:0 18px}.spec-grid{grid-template-columns:1fr}.cta{align-items:flex-start;flex-direction:column}}
</style>