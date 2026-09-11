<template>
  <main class="page">
    <section class="hero"><div class="wrap"><div class="kicker">UMS MACHINERY SPECIFICATION LIBRARY</div><h1>Vertical Machining Centers (VMC)</h1><p>Research historical VMC manufacturers, model families and specifications, or browse vertical machining centers currently for sale.</p><div class="actions"><a href="#library" class="primary">Browse VMC Spec Library</a><NuxtLink to="/equipment" class="secondary">View Current Equipment</NuxtLink></div></div></section>
    <section id="library" class="wrap section"><div class="label">SPECIFICATION LIBRARY — HISTORICAL INFORMATION</div><h2>VMC Manufacturer & Model Library</h2><p class="intro">The UMS historical database contains approximately 1,650 vertical machining center records, with detailed specification data on more than 1,600 machines. Historical records do not indicate current availability.</p>
      <div class="grid">
        <article class="card featured"><h3>Haas</h3><p>VF, TM, Mini Mill, VM, UMC, DM, DT, VR and related Haas vertical machining platforms.</p><NuxtLink to="/spec-library/haas/vmcs">Browse Haas VMC specifications →</NuxtLink></article>
        <article v-for="m in planned" :key="m.name" class="card"><h3>{{m.name}}</h3><p>{{m.text}}</p><span>Manufacturer library page being prepared</span></article>
      </div>
    </section>
    <section class="wrap section guide"><h2>Key VMC Specifications</h2><div class="specs"><div v-for="s in specs" :key="s[0]" class="spec"><h3>{{s[0]}}</h3><p>{{s[1]}}</p></div></div></section>
  </main>
</template>
<script setup>
const planned=[
{name:'Mazak',text:'VTC, VQC, AJV, V-Series, Nexus/VCN and related Mazak VMCs.'},
{name:'Fadal',text:'VMC-15, 3016, 4020, 5020, 6030, 8030 and related Fadal models.'},
{name:'Mori-Seiki',text:'MV, GV and other Mori-Seiki vertical machining centers.'},
{name:'Cincinnati',text:'Arrow, Lancer, Sabre, 10VC, 15VC and 20VC families.'},
{name:'Okuma',text:'MC, MX, Cadet, V4020, ES, VR and related Okuma VMCs.'},
{name:'Matsuura',text:'MC-series vertical machining centers.'},
{name:'Hurco',text:'BMC, VM, VMX, SLV and related Hurco VMCs.'},
{name:'Kitamura',text:'Mycenter and Bridgecenter vertical machining centers.'},
{name:'OKK',text:'MCV, PCV, VM and related OKK VMCs.'}
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
.page{color:#17273a;background:#fff;padding-bottom:60px}.wrap{max-width:1260px;margin:0 auto;padding:0 28px}.hero{background:linear-gradient(105deg,#071b33,#0d2c52);color:#fff;padding:52px 0;border-bottom:4px solid #f47b20}.kicker,.label{font-size:.78rem;font-weight:900;letter-spacing:.12em;color:#f47b20;margin-bottom:10px}.hero h1{font-size:clamp(2.2rem,4.5vw,3.6rem);margin:0 0 14px}.hero p{max-width:880px;font-size:1.1rem;line-height:1.7}.actions{display:flex;gap:10px;flex-wrap:wrap;margin-top:22px}.actions a{padding:11px 16px;border-radius:5px;text-decoration:none;font-weight:800}.primary{background:#f47b20;color:#fff}.secondary{border:1px solid #fff;color:#fff}.section{padding-top:46px}.section h2{font-size:2rem;color:#0b2545;margin:0 0 12px}.intro{max-width:980px;line-height:1.7;color:#526579}.grid,.specs{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:18px;margin-top:24px}.card,.spec{border:1px solid #d8e0e8;border-radius:10px;padding:20px;background:#fff}.featured{border-top:4px solid #f47b20}.card h3,.spec h3{margin-top:0;color:#0b2545}.card p,.spec p{color:#526579;line-height:1.55}.card a{color:#1c4587;font-weight:800;text-decoration:none}.card span{color:#6a7888;font-size:.88rem;font-weight:700}.guide{margin-top:20px}.specs{grid-template-columns:repeat(4,minmax(0,1fr))}@media(max-width:900px){.grid,.specs{grid-template-columns:1fr}.wrap{padding:0 18px}}
</style>