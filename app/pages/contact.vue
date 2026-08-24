<template>
  <main class="page">
    <section class="page-hero"><div class="wrap"><p class="eyebrow">CONTACT USED MACHINERY SOURCE</p><h1>Let’s Talk Machinery.</h1><p>Buying, selling or searching for a specific machine? Send us a message or contact us directly.</p></div></section>

    <section class="section"><div class="wrap contact-layout">
      <div class="contact-info"><p class="eyebrow dark">GET IN TOUCH</p><h2>We’re Here to Help.</h2><p>Tell us what you are working on. You’ll receive direct, responsive communication from someone who understands used CNC machinery.</p>
        <div class="info-block"><span>PHONE</span><a href="tel:+12569801200">(256) 980-1200</a></div>
        <div class="info-block"><span>EMAIL</span><a href="mailto:jon@usedmachinerysource.com">jon@usedmachinerysource.com</a></div>
        <div class="info-block"><span>LOCATION</span><strong>Florence, Alabama</strong><small>Serving customers throughout the United States.</small></div>
        <div class="quick-links"><NuxtLink to="/equipment">Search Equipment →</NuxtLink><NuxtLink to="/sell-your-machine">Sell Your Machine →</NuxtLink></div>
      </div>

      <div class="form-card"><h2>Send Us a Message</h2><form @submit.prevent="submitForm">
        <div class="form-grid"><label>Name *<input v-model="form.contactName" required></label><label>Company<input v-model="form.companyName"></label><label>Email *<input v-model="form.email" type="email" required></label><label>Phone<input v-model="form.phone" type="tel"></label></div>
        <label>How can we help?<select v-model="form.subject"><option>General Question</option><option>Buying a Machine</option><option>Selling a Machine</option><option>Looking for a Specific Machine</option></select></label>
        <label>Message *<textarea v-model="form.message" rows="7" required></textarea></label>
        <button type="submit" :disabled="sending">{{ sending ? 'Sending…' : 'Send Message' }}</button>
        <p v-if="sent" class="success">Thank you. Your message has been sent successfully.</p><p v-if="error" class="error">We couldn't send your message. Please call (256) 980-1200 or try again.</p>
      </form></div>
    </div></section>
  </main>
</template>

<script setup>
import { reactive, ref } from 'vue'
useSeoMeta({title:'Contact Used Machinery Source | Used CNC Machinery',description:'Contact Used Machinery Source in Florence, Alabama for help buying, selling or locating used CNC machinery.'})
const form=reactive({contactName:'',companyName:'',email:'',phone:'',subject:'General Question',message:''})
const sending=ref(false),sent=ref(false),error=ref(false)
async function submitForm(){sending.value=true;sent.value=false;error.value=false;try{await $fetch('/api/site-inquiry',{method:'POST',body:{inquiryType:'contact',contact:{contactName:form.contactName,companyName:form.companyName,email:form.email,phone:form.phone},subject:form.subject,message:form.message}});sent.value=true;form.contactName='';form.companyName='';form.email='';form.phone='';form.subject='General Question';form.message=''}catch(e){error.value=true}finally{sending.value=false}}
</script>

<style scoped>
.page{color:#1b2632}.wrap{max-width:1200px;margin:0 auto;padding-left:40px;padding-right:40px}.page-hero{background:#061526;color:#fff;padding:75px 0}.eyebrow{margin:0 0 14px;color:#f36c21;font-size:14px;font-weight:800;letter-spacing:1.5px}.eyebrow.dark{color:#d75b16}.page-hero h1{font-size:clamp(44px,5vw,64px);margin:0 0 18px}.page-hero p:last-child{font-size:20px;line-height:1.6;color:#dce4ed}.section{padding:70px 0;background:#f4f6f8}.contact-layout{display:grid;grid-template-columns:.72fr 1.28fr;gap:70px}.contact-info h2{font-size:36px;color:#082b5c;margin:0 0 18px}.contact-info>p{font-size:17px;line-height:1.7;color:#505a66}.info-block{border-top:1px solid #d5dbe1;padding:20px 0}.info-block span{display:block;color:#d75b16;font-size:12px;font-weight:900;letter-spacing:1px;margin-bottom:6px}.info-block a,.info-block strong{display:block;color:#082b5c;font-size:20px;font-weight:800;text-decoration:none}.info-block small{display:block;color:#65707b;margin-top:5px}.quick-links{display:flex;flex-direction:column;gap:8px;margin-top:20px}.quick-links a{color:#082b5c;font-weight:800;text-decoration:none}.quick-links a:hover{color:#f36c21}.form-card{background:#fff;padding:40px;border:1px solid #dde3e8;box-shadow:0 12px 30px rgba(20,40,60,.07)}.form-card h2{color:#082b5c;font-size:30px;margin:0 0 25px}.form-grid{display:grid;grid-template-columns:1fr 1fr;gap:18px}label{display:block;color:#253344;font-size:14px;font-weight:700;margin-bottom:18px}input,textarea,select{box-sizing:border-box;width:100%;margin-top:7px;border:1px solid #cbd3dc;border-radius:3px;padding:12px 13px;font:inherit;font-weight:400;background:#fff}input:focus,textarea:focus,select:focus{outline:2px solid #9ab2ce;border-color:#123c75}button{border:0;background:#f36c21;color:#fff;font-size:16px;font-weight:800;padding:15px 24px;border-radius:3px;cursor:pointer}button:disabled{opacity:.6}.success{color:#176d3b;font-weight:700}.error{color:#a72d2d;font-weight:700}
@media(max-width:850px){.wrap{padding-left:22px;padding-right:22px}.contact-layout{grid-template-columns:1fr;gap:35px}.page-hero{padding:55px 0}}@media(max-width:560px){.form-grid{grid-template-columns:1fr}.form-card{padding:24px}}
</style>
