<template>
  <main class="page">
    <section class="hero"><div class="wrap"><NuxtLink to="/spec-library/vmcs" class="back">← VMC Spec Library</NuxtLink><div class="kicker">UMS MACHINERY SPECIFICATION LIBRARY</div><h1>Dah Lih Vertical Machining Centers</h1><p>The Dah Lih VMC section currently includes 4 model pages covering 10 historical Dah Lih VMC records, including MCV-610, MCV-1020, MCV-1350 and MCV-2100 families.</p></div></section>
    <section class="wrap section"><h2>Core Dah Lih VMC Model Pages</h2><p class="intro">Dah Lih model designations are kept separate where the historical database shows meaningful model or control-generation differences.</p><input v-model="q" class="search" type="search" placeholder="Search Dah Lih VMC model"><div class="grid"><NuxtLink v-for="m in filtered" :key="m[1]" :to="`/spec-library/dah-lih/vmcs/${m[1]}`" class="card"><strong>{{m[0]}}</strong><span>{{m[2]}} historical records · {{m[3]}}–{{m[4]}}</span></NuxtLink></div></section>
    <section class="wrap section note"><div class="label">HISTORICAL DATA METHOD</div><h2>Exact model variants remain separate</h2><p>UMS normalizes only obvious formatting or spelling duplicates while preserving true model differences.</p></section>
  </main>
</template>
<script setup>
import raw from '~/assets/data/dah-lih-vmc-core.js'
const q=ref('')
const models=[...raw].sort((a,b)=>a[0].localeCompare(b[0],undefined,{numeric:true}))
const filtered=computed(()=>{const x=q.value.trim().toLowerCase();return x?models.filter(m=>m[0].toLowerCase().includes(x)):models})
useSeoMeta({title:'Dah Lih VMC Specifications | MCV Series | UMS Spec Library',description:'Research historical Dah Lih vertical machining center specifications including MCV-610, MCV-1020, MCV-1350 and MCV-2100 models.'})
useHead({link:[{rel:'canonical',href:'https://www.usedmachinerysource.com/spec-library/dah-lih/vmcs'}]})
</script>
<style scoped>
.page{color:#17273a;background:#fff;padding-bottom:60px}.wrap{max-width:1200px;margin:0 auto;padding:0 28px}.hero{background:linear-gradient(105deg,#071b33,#0d2c52);color:#fff;padding:50px 0;border-bottom:4px solid #f47b20}.back{color:#c8d9eb;text-decoration:none}.kicker,.label{font-size:.78rem;font-weight:900;letter-spacing:.12em;color:#f47b20;margin:18px 0 8px}.hero h1{font-size:clamp(2.2rem,4vw,3.3rem);margin:0 0 14px}.hero p,.intro,.note p{max-width:940px;line-height:1.7}.section{padding-top:46px}.section h2{color:#0b2545;margin:0 0 12px}.search{width:100%;max-width:620px;padding:13px 15px;border:1px solid #aeb8c4;border-radius:6px;font-size:17px;margin:10px 0 22px}.grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px}.card{display:flex;flex-direction:column;gap:5px;border:1px solid #d7e0e8;border-radius:8px;padding:14px;text-decoration:none;color:#17273a}.card:hover{border-color:#f47b20;background:#fff9f4}.card strong{color:#0b2545}.card span{font-size:.85rem;color:#6a7888}.note{margin-top:34px;border-left:5px solid #f47b20;background:#f5f7fa;padding-top:28px;padding-bottom:28px}@media(max-width:850px){.grid{grid-template-columns:1fr}.wrap{padding:0 18px}}
</style>