<template>
  <section class="library-footer">
    <div class="cta-grid">
      <div class="cta-card">
        <div class="eyebrow">SELL OR TRADE</div>
        <h2>Have one of these or a similar machine for sale?</h2>
        <p>Tell Used Machinery Source about the machine you want to sell or trade in. We’ll be happy to work directly with you or with your OEM distributor on a trade-in.</p>
        <NuxtLink :to="sellUrl" class="button primary">Tell Us About Your Machine</NuxtLink>
      </div>
      <div class="cta-card">
        <div class="eyebrow">LOOKING FOR A MACHINE?</div>
        <h2>Looking for one of these or a similar machine?</h2>
        <p>Tell us what you need and we can keep your request in mind as machinery becomes available.</p>
        <NuxtLink :to="needUrl" class="button secondary">Tell Us What You Need</NuxtLink>
      </div>
    </div>
    <div class="equipment-row">
      <div><strong>Looking for machinery available now?</strong><span> Browse current UMS inventory throughout North America.</span></div>
      <NuxtLink to="/equipment" class="equipment-link">See All Available Machinery →</NuxtLink>
    </div>
    <div class="disclaimer"><strong>Specification Disclaimer:</strong> All specifications and information in the UMS Historical Specification Library are believed to be accurate but are not guaranteed. Specifications may vary by year, model, options, and configuration.</div>
  </section>
</template>

<script setup>
const props=defineProps({manufacturer:{type:String,default:''},model:{type:String,default:''},machineType:{type:String,default:''}})
const query=computed(()=>{const q={};if(props.manufacturer)q.manufacturer=props.manufacturer;if(props.model)q.model=props.model;if(props.machineType)q.machineType=props.machineType;return q})
const sellUrl=computed(()=>({path:'/sell-your-machine',query:query.value}))
const needUrl=computed(()=>({path:'/machine-needed',query:query.value}))
</script>

<style scoped>
.library-footer{margin-top:52px;padding-top:34px;border-top:1px solid #d8e0e8}.cta-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:16px}.cta-card{border:1px solid #cfd9e3;border-radius:10px;background:#f8fafc;padding:25px;display:flex;flex-direction:column;align-items:flex-start}.eyebrow{color:#f47b20;font-size:.74rem;font-weight:900;letter-spacing:.11em;margin-bottom:7px}.cta-card h2{margin:0 0 8px;color:#0b2545;font-size:1.35rem;line-height:1.25}.cta-card p{margin:0 0 18px;color:#526579;line-height:1.55}.button{display:inline-block;margin-top:auto;text-decoration:none;font-weight:800;padding:11px 15px;border-radius:6px}.primary{background:#1c4587;color:#fff}.secondary{background:#fff;color:#1c4587;border:1px solid #1c4587}.equipment-row{margin-top:16px;padding:18px 20px;background:#0b2545;color:#fff;border-radius:8px;display:flex;justify-content:space-between;align-items:center;gap:20px}.equipment-row span{color:#d9e4ef}.equipment-link{color:#fff;font-weight:800;text-decoration:none;white-space:nowrap}.disclaimer{margin-top:18px;padding:15px 18px;background:#f5f7fa;border-left:4px solid #9aa8b7;color:#5b6877;font-size:.85rem;line-height:1.55}.disclaimer strong{color:#35485d}@media(max-width:760px){.cta-grid{grid-template-columns:1fr}.equipment-row{align-items:flex-start;flex-direction:column}.equipment-link{white-space:normal}}
</style>