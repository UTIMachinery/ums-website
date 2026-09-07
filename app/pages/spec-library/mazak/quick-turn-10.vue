<template>
  <main class="model-page">
    <section class="hero"><div class="wrap"><NuxtLink to="/spec-library/mazak/cnc-lathes" class="back">← Mazak CNC Lathe Library</NuxtLink><div class="kicker">UMS MACHINERY SPECIFICATION LIBRARY</div><h1>Mazak Quick-Turn 10 Specifications</h1><p>Historical specification and configuration information for Mazak Quick-Turn 10 CNC lathes represented in the UMS machinery database.</p></div></section>
    <section class="wrap section">
      <div class="warning"><strong>Historical specification information — not a machine-for-sale listing.</strong> Specifications vary by year, control, configuration and optional equipment.</div>
      <h2>Quick-Turn 10 Historical Specification Profile</h2>
      <p>UMS historical records show Quick-Turn 10 machines from both the 1980s and 1990s. The later 1995 records are smaller, higher-speed machines than some earlier entries, so the values below are presented as a historical profile rather than a universal factory specification.</p>
      <div class="spec-grid"><div v-for="s in specs" :key="s.label" class="spec"><span>{{ s.label }}</span><strong>{{ s.value }}</strong></div></div>
      <h2>Variations Seen in UMS Historical Records</h2>
      <div class="variation-grid"><article><h3>Years represented</h3><p>Reviewed Quick-Turn 10 records include 1984 and 1995 machines.</p></article><article><h3>Controls</h3><p>Historical records include Mazatrol T2 and Mazatrol T-PLUS controls.</p></article><article><h3>Earlier-machine capacity</h3><p>An earlier 1984 record shows a larger 17.7-inch swing, 20-inch centers, 2.75-inch spindle hole, 3,600 RPM and 15 HP.</p></article><article><h3>Later-machine profile</h3><p>1995 records show a compact machine around 11.8-inch swing with approximately 11-inch machining length, 6,000 RPM and 10 HP.</p></article></div>
    </section>
  </main>
</template>
<script setup>
const specs=[
 {label:'Swing',value:'11.81 in'},
 {label:'Maximum cutting diameter',value:'6.29 in'},
 {label:'Machining length',value:'11.22 in'},
 {label:'X-axis travel',value:'3.75 in'},
 {label:'Z-axis travel',value:'about 11.4 in'},
 {label:'Spindle bore',value:'about 1.97–2.0 in'},
 {label:'Maximum spindle speed',value:'6,000 RPM'},
 {label:'Main motor',value:'10 HP'},
 {label:'Turret',value:'8 positions on reviewed records'}
]
useSeoMeta({title:'Mazak Quick-Turn 10 Specifications | UMS Spec Library',description:'Historical Mazak Quick-Turn 10 CNC lathe specifications, capacities, controls and year-to-year variations from the UMS Machinery Specification Library.'})
useHead({link:[{rel:'canonical',href:'https://usedmachinerysource.com/spec-library/mazak/quick-turn-10'}]})
</script>
<style scoped>
.model-page{color:#17273a;background:#fff;padding-bottom:60px}.wrap{max-width:1120px;margin:0 auto;padding:0 28px}.hero{background:linear-gradient(105deg,#071b33,#0d2c52);color:#fff;padding:48px 0}.back{color:#c8d9eb;text-decoration:none}.kicker{color:#9fc4e7;font-size:.78rem;font-weight:900;letter-spacing:.12em;margin:18px 0 8px}.hero h1{font-size:clamp(2rem,4vw,3.2rem);margin:0 0 12px}.hero p{max-width:820px;line-height:1.7}.section{padding-top:44px}.warning{background:#fff7ea;border-left:5px solid #f47b20;padding:16px 18px;border-radius:6px;margin-bottom:34px}.section h2{color:#0b2545;margin:34px 0 12px}.section>p{line-height:1.7;max-width:920px}.spec-grid,.variation-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:14px;margin-top:20px}.spec,.variation-grid article{border:1px solid #d7e0e8;border-radius:8px;padding:17px;background:#f8fafc}.spec span{display:block;color:#657688;font-size:.78rem;text-transform:uppercase;font-weight:800;margin-bottom:6px}.spec strong{color:#0b2545;font-size:1.05rem}.variation-grid h3{margin-top:0;color:#0b2545}.variation-grid p{line-height:1.55}@media(max-width:760px){.spec-grid,.variation-grid{grid-template-columns:1fr}.wrap{padding:0 18px}}
</style>