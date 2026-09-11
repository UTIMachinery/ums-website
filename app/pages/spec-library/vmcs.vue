<template>
  <main class="page">
    <section class="hero"><div class="wrap"><div class="kicker">UMS MACHINERY SPECIFICATION LIBRARY</div><h1>Vertical Machining Centers (VMC)</h1><p>Research historical VMC manufacturers, model families and specifications, or browse vertical machining centers currently for sale.</p><div class="actions"><a href="#library" class="primary">Browse VMC Spec Library</a><NuxtLink to="/equipment" class="secondary">View Current Equipment</NuxtLink></div></div></section>
    <section id="library" class="wrap section"><div class="label">SPECIFICATION LIBRARY — HISTORICAL INFORMATION</div><h2>VMC Manufacturer & Model Library</h2><p class="intro">The UMS historical database contains approximately 1,650 vertical machining center records, with detailed specification data on more than 1,600 machines. Historical records do not indicate current availability.</p>
      <div class="grid">
        <article class="card featured"><h3>Haas</h3><p>VF, TM, Mini Mill, VM, UMC, DM, DT, VR and related Haas vertical machining platforms.</p><NuxtLink to="/spec-library/haas/vmcs">Browse Haas VMC specifications →</NuxtLink></article>
        <article class="card featured"><h3>Mazak</h3><p>VTC, VQC, AJV, V-Series and related Mazak vertical machining centers.</p><NuxtLink to="/spec-library/mazak/vmcs">Browse Mazak VMC specifications →</NuxtLink></article><article class="card featured"><h3>Fadal</h3><p>VMC-15, 3016, 4020, 5020, 6030, 8030 and related Fadal vertical machining centers.</p><NuxtLink to="/spec-library/fadal/vmcs">Browse Fadal VMC specifications →</NuxtLink></article><article class="card featured"><h3>Mori-Seiki</h3><p>MV, GV and related Mori-Seiki vertical machining centers.</p><NuxtLink to="/spec-library/mori-seiki/vmcs">Browse Mori-Seiki VMC specifications →</NuxtLink></article><article class="card featured"><h3>Cincinnati</h3><p>Arrow, Lancer, Sabre, 10VC and related Cincinnati vertical machining centers.</p><NuxtLink to="/spec-library/cincinnati/vmcs">Browse Cincinnati VMC specifications →</NuxtLink></article><article class="card featured"><h3>Okuma</h3><p>MC, MX, Cadet, ES, VR and related Okuma vertical machining centers.</p><NuxtLink to="/spec-library/okuma/vmcs">Browse Okuma VMC specifications →</NuxtLink></article><article class="card featured"><h3>Matsuura</h3><p>MC and RA vertical machining center families.</p><NuxtLink to="/spec-library/matsuura/vmcs">Browse Matsuura VMC specifications →</NuxtLink></article>
<article class="card featured"><h3>Hurco</h3><p>BMC, VM, VMX and related Hurco vertical machining centers.</p><NuxtLink to="/spec-library/hurco/vmcs">Browse Hurco VMC specifications →</NuxtLink></article>
<article class="card featured"><h3>Kitamura</h3><p>Mycenter and Bridgecenter vertical machining centers.</p><NuxtLink to="/spec-library/kitamura/vmcs">Browse Kitamura VMC specifications →</NuxtLink></article>
<article class="card featured"><h3>OKK</h3><p>MCV, PCV, VM, KVC and related OKK vertical machining centers.</p><NuxtLink to="/spec-library/okk/vmcs">Browse OKK VMC specifications →</NuxtLink></article>
<article class="card featured"><h3>Tree</h3><p>VMC-1050, VMC-1060 and related Tree vertical machining centers.</p><NuxtLink to="/spec-library/tree/vmcs">Browse Tree VMC specifications →</NuxtLink></article>
<article class="card featured"><h3>Milltronics</h3><p>VM, Partner, BR and related Milltronics vertical machining centers.</p><NuxtLink to="/spec-library/milltronics/vmcs">Browse Milltronics VMC specifications →</NuxtLink></article>
<article class="card featured"><h3>Daewoo</h3><p>DMV-series vertical machining centers.</p><NuxtLink to="/spec-library/daewoo/vmcs">Browse Daewoo VMC specifications →</NuxtLink></article>
<article class="card featured"><h3>Monarch</h3><p>VMC-45, VMC-75, VMC-150 and related Monarch vertical machining centers.</p><NuxtLink to="/spec-library/monarch/vmcs">Browse Monarch VMC specifications →</NuxtLink></article>
<article class="card featured"><h3>Enshu</h3><p>650V, 650VX, 400FAV, VMC-430 and related Enshu vertical machining centers.</p><NuxtLink to="/spec-library/enshu/vmcs">Browse Enshu VMC specifications →</NuxtLink></article><article class="card featured"><h3>Leadwell</h3><p>MCV-1000P, MCV-1300 and related Leadwell vertical machining centers.</p><NuxtLink to="/spec-library/leadwell/vmcs">Browse Leadwell VMC specifications →</NuxtLink></article>
<article class="card featured"><h3>Hitachi-Seiki</h3><p>VM, VK and related Hitachi-Seiki vertical machining centers.</p><NuxtLink to="/spec-library/hitachi-seiki/vmcs">Browse Hitachi-Seiki VMC specifications →</NuxtLink></article>
<article class="card featured"><h3>SNK</h3><p>RB, FSP, PC and related SNK vertical machining centers.</p><NuxtLink to="/spec-library/snk/vmcs">Browse SNK VMC specifications →</NuxtLink></article>
<article class="card featured"><h3>Bridgeport</h3><p>Interact, Torque Cut and related Bridgeport vertical machining centers.</p><NuxtLink to="/spec-library/bridgeport/vmcs">Browse Bridgeport VMC specifications →</NuxtLink></article>
<article class="card featured"><h3>Dah Lih</h3><p>MCV-series vertical machining centers.</p><NuxtLink to="/spec-library/dah-lih/vmcs">Browse Dah Lih VMC specifications →</NuxtLink></article><article v-for="m in planned" :key="m.name" class="card"><h3>{{m.name}}</h3><p>{{m.text}}</p><span>Manufacturer library page being prepared</span></article>
      </div>
    </section>
    <section class="wrap section additional">
      <div class="label">EXPANDED HISTORICAL VMC LIBRARY</div>
      <h2>Additional VMC Manufacturers</h2>
      <p class="intro">Browse the rest of the UMS historical VMC database by manufacturer. These pages use the same manufacturer → model → year/configuration structure as the primary libraries above.</p>
      <input v-model="otherQ" class="search" type="search" placeholder="Search additional VMC manufacturers">
      <div class="compact-grid">
        <NuxtLink v-for="m in filteredOther" :key="m.slug" :to="`/spec-library/${m.slug}/vmcs`" class="compact-card">
          <strong>{{m.name}}</strong>
          <span>{{m.models.length}} model{{m.models.length===1?'':'s'}} · {{m.records}} historical record{{m.records===1?'':'s'}}</span>
        </NuxtLink>
      </div>
    </section>
    <section class="wrap section guide"><h2>Key VMC Specifications</h2><div class="specs"><div v-for="s in specs" :key="s[0]" class="spec"><h3>{{s[0]}}</h3><p>{{s[1]}}</p></div></div></section>
  </main>
</template>
<script setup>
import otherLibrary from '~/assets/data/vmc-remaining-library.js'
const otherQ=ref('')
const filteredOther=computed(()=>{
  const x=otherQ.value.trim().toLowerCase()
  const list=[...otherLibrary]
  return x?list.filter(m=>m.name.toLowerCase().includes(x)):list
})
const planned=[
]
const specs=[
['X / Y / Z Axis Travel','Defines the primary machining work envelope.'],
['Table Size & Capacity','Determines practical workholding area and part-weight limits.'],
['Spindle Taper','Common VMC tapers include 40- and 50-taper configurations.'],
['Spindle Speed','Maximum RPM affects tooling and material applications.'],
['Spindle Horsepower','Indicates main spindle power available for cutting.'],
['Automatic Tool Changer','ATC capacity determines how many tools can remain available.'],
['Spindle Nose to Table','Affects usable workpiece and tooling height.'],
['CNC Control','Control generation affects programming, service and operator familiarity.']
]
useSeoMeta({title:'Vertical Machining Center Specifications | VMC Spec Library | UMS',description:'Research historical vertical machining center specifications by manufacturer and model in the UMS Machinery Specification Library.'})
useHead({link:[{rel:'canonical',href:'https://www.usedmachinerysource.com/spec-library/vmcs'}]})
</script>
<style scoped>
.page{color:#17273a;background:#fff;padding-bottom:60px}.wrap{max-width:1260px;margin:0 auto;padding:0 28px}.hero{background:linear-gradient(105deg,#071b33,#0d2c52);color:#fff;padding:52px 0;border-bottom:4px solid #f47b20}.kicker,.label{font-size:.78rem;font-weight:900;letter-spacing:.12em;color:#f47b20;margin-bottom:10px}.hero h1{font-size:clamp(2.2rem,4.5vw,3.6rem);margin:0 0 14px}.hero p{max-width:880px;font-size:1.1rem;line-height:1.7}.actions{display:flex;gap:10px;flex-wrap:wrap;margin-top:22px}.actions a{padding:11px 16px;border-radius:5px;text-decoration:none;font-weight:800}.primary{background:#f47b20;color:#fff}.secondary{border:1px solid #fff;color:#fff}.section{padding-top:46px}.section h2{font-size:2rem;color:#0b2545;margin:0 0 12px}.intro{max-width:980px;line-height:1.7;color:#526579}.grid,.specs{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:18px;margin-top:24px}.card,.spec{border:1px solid #d8e0e8;border-radius:10px;padding:20px;background:#fff}.featured{border-top:4px solid #f47b20}.card h3,.spec h3{margin-top:0;color:#0b2545}.card p,.spec p{color:#526579;line-height:1.55}.card a{color:#1c4587;font-weight:800;text-decoration:none}.card span{color:#6a7888;font-size:.88rem;font-weight:700}.additional{margin-top:10px}.search{width:100%;max-width:620px;padding:13px 15px;border:1px solid #aeb8c4;border-radius:6px;font-size:17px;margin:10px 0 22px}.compact-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:10px}.compact-card{display:flex;flex-direction:column;gap:4px;border:1px solid #d8e0e8;border-radius:8px;padding:13px;text-decoration:none;color:#17273a}.compact-card:hover{border-color:#f47b20;background:#fff9f4}.compact-card strong{color:#0b2545}.compact-card span{font-size:.78rem;color:#6a7888}.guide{margin-top:20px}.specs{grid-template-columns:repeat(4,minmax(0,1fr))}@media(max-width:900px){.grid,.specs,.compact-grid{grid-template-columns:1fr}.wrap{padding:0 18px}}
</style>