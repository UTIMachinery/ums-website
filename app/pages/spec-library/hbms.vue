<template>
  <main class="page">
    <section class="hero"><div class="wrap"><div class="kicker">UMS MACHINERY SPECIFICATION LIBRARY</div><h1>Horizontal Boring Mill Specifications</h1><p>Research historical horizontal boring mill specifications by manufacturer, model, year and machine style, including Table Type, Floor Type and Planer Type where recorded.</p><div class="actions"><NuxtLink to="/spec-library" class="secondary">← Spec Library</NuxtLink><NuxtLink to="/equipment" class="primary">Current Equipment</NuxtLink></div></div></section>
    <section class="wrap section"><div class="label">BROWSE BY MANUFACTURER</div><h2>HBM Manufacturers</h2><p class="intro">This library contains {{ totalRecords }} true horizontal boring mill records across {{ library.length }} manufacturers. Jig mills that shared the old database group are excluded.</p>
      <input v-model="q" class="search" type="search" placeholder="Search HBM manufacturer">
      <div class="grid"><NuxtLink v-for="m in filtered" :key="m.slug" :to="`/spec-library/${m.slug}/hbms`" class="card"><strong>{{m.name}}</strong><span>{{m.models.length}} models · {{m.records}} historical records</span></NuxtLink></div>
    </section>
    <section class="wrap section note"><div class="label">MACHINE STYLE</div><h2>Table, Floor and Planer Types remain identified</h2><p>Where the historical record identifies the boring mill style, that type is displayed with the individual year/configuration so materially different machine layouts are not blended together.</p></section>
  </main>
</template>
<script setup>
import library from '~/assets/data/hbm-library.js'
const q=ref('')
const totalRecords=computed(()=>library.reduce((n,m)=>n+Number(m.records||0),0))
const filtered=computed(()=>{const x=q.value.trim().toLowerCase();return x?library.filter(m=>m.name.toLowerCase().includes(x)):library})
useSeoMeta({title:'Horizontal Boring Mill Specifications | UMS Spec Library',description:'Research historical horizontal boring mill specifications by manufacturer, model, year and Table, Floor or Planer Type from Used Machinery Source records.'})
useHead({link:[{rel:'canonical',href:'https://www.usedmachinerysource.com/spec-library/hbms'}]})
</script>
<style scoped>
.page{color:#17273a;background:#fff;padding-bottom:60px}.wrap{max-width:1200px;margin:0 auto;padding:0 28px}.hero{background:linear-gradient(105deg,#071b33,#0d2c52);color:#fff;padding:54px 0;border-bottom:4px solid #f47b20}.kicker,.label{font-size:.78rem;font-weight:900;letter-spacing:.12em;color:#f47b20}.hero h1{font-size:clamp(2.3rem,4vw,3.5rem);margin:8px 0 12px}.hero p,.intro,.note p{max-width:920px;line-height:1.7;color:#d9e4ef}.intro,.note p{color:#526579}.actions{display:flex;gap:12px;margin-top:22px}.actions a{padding:11px 16px;border-radius:5px;text-decoration:none;font-weight:800}.primary{background:#f47b20;color:#fff}.secondary{border:1px solid #d4dfeb;color:#fff}.section{padding-top:46px}.section h2{color:#0b2545;margin:0 0 12px}.search{width:100%;max-width:620px;padding:13px 15px;border:1px solid #aeb8c4;border-radius:6px;font-size:17px;margin:10px 0 22px}.grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px}.card{display:flex;flex-direction:column;gap:5px;border:1px solid #d7e0e8;border-radius:8px;padding:14px;text-decoration:none;color:#17273a}.card:hover{border-color:#f47b20;background:#fff9f4}.card strong{color:#0b2545}.card span{font-size:.85rem;color:#6a7888}.note{margin-top:34px;border-left:5px solid #f47b20;background:#f5f7fa;padding-top:28px;padding-bottom:28px}@media(max-width:850px){.grid{grid-template-columns:1fr}.wrap{padding:0 18px}}
</style>