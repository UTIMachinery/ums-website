<template>
  <main class="page" v-if="entry">
    <NuxtLink to="/spec-library/haas/cnc-lathes" class="back">← Haas CNC Lathe Specification Library</NuxtLink>
    <p class="eyebrow">UMS MACHINERY SPECIFICATION LIBRARY</p>
    <h1>Haas {{ entry.model }} Specifications</h1>
    <p class="lead">Historical specifications and configurations recorded by Used Machinery Source for Haas {{ entry.model }} CNC lathes.</p>
    <div class="notice"><strong>Historical specification library — not a current machine listing.</strong> Specifications below reflect individual machines recorded by UMS and can vary by year, configuration and options.</div>
    <section class="records">
      <article v-for="(r,i) in usableRecords" :key="`${r.invid}-${i}`" class="record">
        <div class="record-head"><div><p class="year">{{ r.year || 'Year not recorded' }}</p><h2>{{ r.control || 'Haas CNC configuration' }}</h2></div><button type="button" @click="copy(r,i)">{{ copied === i ? 'Copied' : 'Copy Specifications' }}</button></div>
        <p class="summary">{{ r.summary }}</p>
        <p class="source">Historical UMS record #{{ r.invid }}</p>
      </article>
    </section>
    <section class="cta"><h2>Looking for a Haas {{ entry.model }}?</h2><p>Check our current equipment or tell UMS what machine you need.</p><div><NuxtLink to="/equipment">View Current Equipment</NuxtLink><NuxtLink to="/wanted" class="secondary">Machine Wanted Listings</NuxtLink></div></section>
  </main>
</template>
<script setup>
import { computed, ref } from 'vue'
const props=defineProps({entry:{type:Object,required:true}})
const copied=ref(-1)
const usableRecords=computed(()=>props.entry.records.filter(r=>r.summary && r.summary.trim()))
async function copy(r,i){try{await navigator.clipboard.writeText(`Haas ${props.entry.model} — ${r.year || 'Year not recorded'}\n${r.control || ''}\n${r.summary}`);copied.value=i;setTimeout(()=>copied.value=-1,1800)}catch{copied.value=-1}}
useSeoMeta({title:()=>`Haas ${props.entry.model} Specifications by Year | UMS Spec Library`,description:()=>`Historical Haas ${props.entry.model} CNC lathe specifications, years, controls and configurations recorded by Used Machinery Source.`})
useHead({link:[{rel:'canonical',href:()=>`https://usedmachinerysource.com/spec-library/haas/${props.entry.slug}`} ]})
</script>
<style scoped>
.page{max-width:1180px;margin:0 auto;padding:42px 28px 72px;color:#172033}.back{color:#1c4587;text-decoration:none;font-weight:700}.eyebrow{margin:30px 0 8px;color:#5f6b7a;font-size:13px;font-weight:800;letter-spacing:.12em}h1{font-size:42px;line-height:1.08;margin:0 0 14px;color:#0b2545}.lead{font-size:20px;line-height:1.55;max-width:850px}.notice{margin:28px 0;padding:18px 20px;border-left:4px solid #1c4587;background:#f2f6fb;line-height:1.55}.records{display:grid;gap:18px}.record{border:1px solid #d9e0e8;border-radius:10px;padding:22px;background:#fff}.record-head{display:flex;justify-content:space-between;gap:20px;align-items:start}.year{font-weight:800;color:#1c4587;margin:0 0 5px}.record h2{font-size:21px;margin:0}.record button{border:1px solid #1c4587;background:#fff;color:#1c4587;border-radius:5px;padding:9px 12px;font-weight:700;cursor:pointer}.summary{font-size:17px;line-height:1.55}.source{font-size:13px;color:#697586;margin-bottom:0}.cta{margin-top:38px;padding:28px;background:#0b2545;color:#fff;border-radius:10px}.cta h2{margin-top:0}.cta a{display:inline-block;background:#fff;color:#0b2545;text-decoration:none;font-weight:800;padding:11px 16px;border-radius:5px;margin:8px 8px 0 0}.cta a.secondary{background:transparent;color:#fff;border:1px solid #fff}@media(max-width:700px){h1{font-size:34px}.record-head{display:block}.record button{margin-top:14px}.page{padding:30px 18px 55px}}
</style>