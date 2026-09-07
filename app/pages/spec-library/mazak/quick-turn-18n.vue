<template>
  <main class="model-page">
    <section class="hero"><div class="wrap"><NuxtLink to="/spec-library/mazak/cnc-lathes" class="back">← Mazak CNC Lathe Library</NuxtLink><div class="kicker">UMS MACHINERY SPECIFICATION LIBRARY</div><h1>Mazak Quick-Turn 18N Specifications</h1><p>Historical specification and configuration information for Mazak Quick-Turn 18N CNC lathes represented in the UMS machinery database.</p></div></section>
    <section class="wrap section">
      <div class="warning"><strong>Historical specification information — not a machine-for-sale listing.</strong> Specifications vary by year, control, configuration and optional equipment.</div>
      <h2>Quick-Turn 18N Historical Specification Profile</h2>
      <p>Reviewed UMS records for the Quick-Turn 18N cluster around early-1990s machines with Mazatrol T32-series controls. The recurring capacities below are drawn from those historical entries and should be treated as a practical research profile rather than a universal factory specification.</p>
      <div class="spec-grid"><div v-for="s in specs" :key="s.label" class="spec"><span>{{ s.label }}</span><strong>{{ s.value }}</strong></div></div>
      <h2>Variations Seen in UMS Historical Records</h2>
      <div class="variation-grid"><article><h3>Years represented</h3><p>Reviewed Quick-Turn 18N records include 1993 and 1994 machines.</p></article><article><h3>Controls</h3><p>Mazatrol T32B and T32-2 controls appear in the reviewed records.</p></article><article><h3>Workholding</h3><p>A 10-inch chuck appears on at least one historical record; another entry is configured as a CNC chucker.</p></article><article><h3>Common equipment</h3><p>Chip conveyors appear in multiple records. Equipment should always be verified on the individual machine.</p></article></div>
    </section>
  </main>
</template>
<script setup>
const specs=[
 {label:'Swing',value:'about 17.3 in'},
 {label:'Distance between centers',value:'about 20 in'},
 {label:'Spindle bore / hole',value:'about 3.1–3.15 in'},
 {label:'Maximum spindle speed',value:'3,600 RPM'},
 {label:'Main motor',value:'20 HP'},
 {label:'Turret',value:'8 positions'},
 {label:'Typical chuck',value:'10 in on reviewed record'}
]
useSeoMeta({title:'Mazak Quick-Turn 18N Specifications | UMS Spec Library',description:'Historical Mazak Quick-Turn 18N CNC lathe specifications, capacities, controls and equipment from the UMS Machinery Specification Library.'})
useHead({link:[{rel:'canonical',href:'https://usedmachinerysource.com/spec-library/mazak/quick-turn-18n'}]})
</script>
<style scoped>
.model-page{color:#17273a;background:#fff;padding-bottom:60px}.wrap{max-width:1120px;margin:0 auto;padding:0 28px}.hero{background:linear-gradient(105deg,#071b33,#0d2c52);color:#fff;padding:48px 0}.back{color:#c8d9eb;text-decoration:none}.kicker{color:#9fc4e7;font-size:.78rem;font-weight:900;letter-spacing:.12em;margin:18px 0 8px}.hero h1{font-size:clamp(2rem,4vw,3.2rem);margin:0 0 12px}.hero p{max-width:820px;line-height:1.7}.section{padding-top:44px}.warning{background:#fff7ea;border-left:5px solid #f47b20;padding:16px 18px;border-radius:6px;margin-bottom:34px}.section h2{color:#0b2545;margin:34px 0 12px}.section>p{line-height:1.7;max-width:920px}.spec-grid,.variation-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:14px;margin-top:20px}.spec,.variation-grid article{border:1px solid #d7e0e8;border-radius:8px;padding:17px;background:#f8fafc}.spec span{display:block;color:#657688;font-size:.78rem;text-transform:uppercase;font-weight:800;margin-bottom:6px}.spec strong{color:#0b2545;font-size:1.05rem}.variation-grid h3{margin-top:0;color:#0b2545}.variation-grid p{line-height:1.55}@media(max-width:760px){.spec-grid,.variation-grid{grid-template-columns:1fr}.wrap{padding:0 18px}}
</style>