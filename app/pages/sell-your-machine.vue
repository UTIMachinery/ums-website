<template>
  <main class="page">
    <section class="page-hero"><div class="wrap"><p class="eyebrow">SELL YOUR MACHINE</p><h1>Have Machinery You No Longer Need?</h1><p>Tell us what you have. We work with manufacturers looking to sell single machines, surplus equipment, trade-ins and larger machinery packages.</p></div></section>

    <section class="section"><div class="wrap layout">
      <div class="copy"><p class="eyebrow dark">WHAT DO YOU HAVE FOR SALE?</p><h2>Send Us the Details.</h2><p>The more information you can provide, the better we can evaluate the opportunity. Start with the basic machine information below. We can follow up for additional specifications, photos or documentation as needed.</p><div class="selling-points"><div><strong>Single Machines</strong><span>Equipment that is no longer needed.</span></div><div><strong>Surplus Equipment</strong><span>Multiple machines from capacity or process changes.</span></div><div><strong>Trade-Ins</strong><span>Machinery being replaced with newer equipment.</span></div><div><strong>Facilities &amp; Packages</strong><span>Larger groups of machinery or complete operations.</span></div></div></div>

      <div class="form-card">
        <h2>Machine for Sale</h2><p class="form-intro">Fields marked * are required.</p>
        <form @submit.prevent="submitForm">
          <div class="form-grid"><label>Contact Name *<input v-model="form.contactName" required></label><label>Company Name<input v-model="form.companyName"></label><label>Email *<input v-model="form.email" type="email" required></label><label>Phone *<input v-model="form.phone" type="tel" required></label></div>
          <hr>
          <div class="form-grid"><label>Year<input v-model="form.year"></label><label>Manufacturer *<input v-model="form.manufacturer" required></label><label>Model *<input v-model="form.model" required></label><label>Machine Type<input v-model="form.machineType" placeholder="Lathe, VMC, HMC, grinder..."></label></div>
          <label>Location<input v-model="form.location" placeholder="City, State"></label>
          <label>Machine Details<textarea v-model="form.details" rows="6" placeholder="Condition, control, hours, options, asking price or anything else we should know."></textarea></label>
          <button type="submit" :disabled="sending">{{ sending ? 'Sending…' : 'Submit Machine for Sale' }}</button>
          <p v-if="sent" class="success">Thank you. Your machine information has been sent successfully.</p><p v-if="error" class="error">We couldn't send the form. Please call (256) 980-1200 or try again.</p>
        </form>
      </div>
    </div></section>
  </main>
</template>

<script setup>
import { reactive, ref } from 'vue'
useSeoMeta({title:'Sell Your Used CNC Machine | Used Machinery Source',description:'Have used CNC machinery for sale? Send Used Machinery Source the details on single machines, surplus equipment, trade-ins or larger machinery packages.'})
const form=reactive({contactName:'',companyName:'',email:'',phone:'',year:'',manufacturer:'',model:'',machineType:'',location:'',details:''})
const sending=ref(false),sent=ref(false),error=ref(false)
async function submitForm(){sending.value=true;sent.value=false;error.value=false;try{await $fetch('/api/site-inquiry',{method:'POST',body:{inquiryType:'machine-for-sale',contact:{contactName:form.contactName,companyName:form.companyName,email:form.email,phone:form.phone},machine:{year:form.year,manufacturer:form.manufacturer,model:form.model,machineType:form.machineType,location:form.location},message:form.details}});sent.value=true;Object.keys(form).forEach(k=>form[k]='')}catch(e){error.value=true}finally{sending.value=false}}
</script>

<style scoped>
.page{color:#1b2632;background:#fff}.wrap{max-width:1280px;margin:0 auto;padding-left:40px;padding-right:40px}.page-hero{background:#061526;color:#fff;padding:75px 0}.eyebrow{margin:0 0 14px;color:#f36c21;font-size:14px;font-weight:800;letter-spacing:1.5px}.eyebrow.dark{color:#d75b16}.page-hero h1{max-width:900px;font-size:clamp(42px,5vw,62px);line-height:1.05;margin:0 0 20px}.page-hero p:last-child{max-width:800px;font-size:20px;line-height:1.6;color:#dce4ed}.section{padding:70px 0;background:#f4f6f8}.layout{display:grid;grid-template-columns:.8fr 1.2fr;gap:65px;align-items:start}.copy h2{font-size:36px;color:#082b5c;margin:0 0 20px}.copy>p{font-size:17px;line-height:1.7;color:#505a66}.selling-points{margin-top:35px;display:grid;gap:12px}.selling-points div{background:#fff;border-left:4px solid #f36c21;padding:18px 20px}.selling-points strong,.selling-points span{display:block}.selling-points strong{color:#082b5c;margin-bottom:4px}.selling-points span{color:#5a6470;font-size:14px}.form-card{background:#fff;padding:38px;border:1px solid #dde3e8;box-shadow:0 12px 30px rgba(20,40,60,.07)}.form-card h2{color:#082b5c;margin:0 0 6px;font-size:30px}.form-intro{color:#68727e;margin-top:0}.form-grid{display:grid;grid-template-columns:1fr 1fr;gap:18px}label{display:block;color:#253344;font-size:14px;font-weight:700;margin-bottom:18px}input,textarea{box-sizing:border-box;width:100%;margin-top:7px;border:1px solid #cbd3dc;border-radius:3px;padding:12px 13px;font:inherit;font-weight:400;background:#fff}input:focus,textarea:focus{outline:2px solid #9ab2ce;border-color:#123c75}hr{border:0;border-top:1px solid #e1e5e9;margin:8px 0 24px}button{border:0;background:#f36c21;color:#fff;font-size:16px;font-weight:800;padding:15px 22px;border-radius:3px;cursor:pointer}button:disabled{opacity:.6}.success{color:#176d3b;font-weight:700}.error{color:#a72d2d;font-weight:700}
@media(max-width:900px){.wrap{padding-left:22px;padding-right:22px}.layout{grid-template-columns:1fr;gap:35px}.page-hero{padding:55px 0}.form-card{padding:26px}}@media(max-width:560px){.form-grid{grid-template-columns:1fr}.form-card{padding:22px}}
</style>
