<template>
  <main class="equipment-page">
    <section class="equipment-hero"><div class="equipment-hero-inner"><div class="hero-kicker">USED CNC MACHINERY &amp; EQUIPMENT</div><h1>Used CNC Machines for Sale</h1><p>Browse current used CNC lathes, machining centers, grinders, boring mills and other industrial machinery available through Used Machinery Source.</p></div></section>
    <section class="search-panel">
      <div class="equipment-search"><label class="search-label" for="equipment-keyword">Search by Keyword</label><div class="keyword-search-row"><input id="equipment-keyword" :value="searchTerm" @input="searchTerm = $event.target.value" type="search" placeholder="Search by manufacturer, model, or keyword" /><button type="button" class="clear-search-button" @click="resetSearch">Clear Search</button></div></div>
      <div class="search-or">OR</div>
      <section class="equipment-categories"><div class="browse-heading"><h2>Browse by Machine Type</h2></div><div class="category-grid"><NuxtLink v-for="category in visibleMachineGroups" :key="category" :to="categorySeoUrl(category)" :class="{ active: selectedCategory === category }" @click.prevent="selectCategory(category)">{{ category }}</NuxtLink></div></section>
      <nav class="seo-category-links" aria-label="Popular machine categories">
      <strong>Browse Popular Machine Categories:</strong>
      <NuxtLink to="/equipment/type/cnc-lathes-turning-centers">CNC Lathes</NuxtLink>
      <NuxtLink to="/equipment/type/vertical-machining-centers">Vertical Machining Centers</NuxtLink>
      <NuxtLink to="/equipment/type/horizontal-machining-centers">Horizontal Machining Centers</NuxtLink>
      <NuxtLink to="/equipment/type/vertical-boring-mills-vtls">VTLs & Vertical Boring Mills</NuxtLink>
      <NuxtLink to="/equipment/type/grinders-lappers-hones">Grinders</NuxtLink>
      <NuxtLink to="/equipment/type/fabrication-machinery">Fabrication Machinery</NuxtLink>
      <NuxtLink to="/equipment/type/edm-machines">EDM</NuxtLink>
    </nav>
    <nav class="seo-manufacturer-links" aria-label="Popular machinery manufacturers">
      <strong>Browse Popular Manufacturers:</strong>
      <NuxtLink to="/equipment/manufacturer/haas">Haas</NuxtLink>
      <NuxtLink to="/equipment/manufacturer/doosan">Doosan / DN Solutions</NuxtLink>
      <NuxtLink to="/equipment/manufacturer/hurco">Hurco</NuxtLink>
      <NuxtLink to="/equipment/manufacturer/mazak">Mazak</NuxtLink>
      <NuxtLink to="/equipment/manufacturer/mori-seiki">Mori-Seiki / DMG MORI</NuxtLink>
      <NuxtLink to="/equipment/manufacturer/okuma">Okuma</NuxtLink>
      <NuxtLink to="/equipment/manufacturer/kingston">Kingston</NuxtLink>
      <NuxtLink to="/equipment/manufacturer/amada">Amada</NuxtLink>
      <NuxtLink to="/equipment/manufacturer/smec">SMEC</NuxtLink>
    </nav>
    <div class="listing-heading"><button type="button" class="view-all-equipment-button" @click="resetSearch">Reset Search / View All Equipment</button></div>
    </section>
    <section class="equipment-listing">
      <h2 class="current-inventory-heading">{{ (selectedCategory !== 'all' || searchTerm.trim() !== '') ? `Your Search Returned ${filteredMachines.length} ${filteredMachines.length === 1 ? 'Machine' : 'Machines'}` : 'Current Inventory' }}</h2>
      <article v-for="machine in filteredMachines" :key="machine.InvID" class="machine-card"><NuxtLink :to="machineUrl(machine)" class="machine-card-image"><img v-if="machineCardImages[machine.InvID]" :src="`/Images/${machineCardImages[machine.InvID]}`" :alt="`Used ${machine.Year || ''} ${machine.Manufacturer || ''} ${machine.Model || ''} ${webDescription(machine) || 'machine'} for sale`.replace(/\s+/g,' ').trim()" loading="lazy" /></NuxtLink><div class="machine-card-info"><h3><NuxtLink :to="machineUrl(machine)" class="machine-title-link">{{ machine.Manufacturer }} {{ machine.Model }}<span v-if="machine.Year"> – {{ machine.Year }}</span></NuxtLink></h3><p>{{ webDescription(machine) }}</p><p class="stock-number"><strong>Stock #{{ machine.InvID }}</strong></p><p class="adv-spec">{{ advertisingSpec(machine) }}</p><NuxtLink :to="machineUrl(machine)" class="view-machine-button">View Machine</NuxtLink></div></article>
      <p v-if="filteredMachines.length === 0" class="no-results">No equipment found matching your search.</p>
      <div id="tell-us-what-you-need" class="machine-needed-callout"><div class="machine-needed-copy"><h3>Don't See What You're Looking For?</h3><p>Our inventory is constantly changing. If you don't see what you need—or would rather send us your requirements—tell us what you're looking for. We'll let you know what's available that fits your needs.</p></div><button type="button" class="machine-needed-button" @click="showMachineNeededForm = true">Tell Us What You Need</button><div v-if="machineNeededSent" class="machine-needed-sent">Your message has been sent successfully.</div></div>
    </section>
    <div v-if="showMachineNeededForm" class="request-modal-overlay"><div class="request-modal"><button type="button" class="request-modal-close" @click="showMachineNeededForm = false">×</button><h2>Machine Needed</h2><p class="request-machine">Tell us what you're looking for.</p><p class="form-required-note">Fields marked * are required.</p><form class="request-form" @submit.prevent="submitMachineNeededForm"><label class="required-field-label required-field-label">Email *<input v-model="machineNeededForm.email" type="email" autocomplete="email" required /></label><label class="required-field-label required-field-label">Contact Name *<input v-model="machineNeededForm.contactName" type="text" required /></label><label class="required-field-label required-field-label">Phone *<input v-model="machineNeededForm.phone" type="tel" required /></label><label>Company Name<input v-model="machineNeededForm.companyName" type="text" /></label><label>Address<input v-model="machineNeededForm.address" type="text" /></label><label>City<input v-model="machineNeededForm.city" type="text" /></label><label>State<input v-model="machineNeededForm.state" type="text" /></label><label>Postal Code<input v-model="machineNeededForm.postalCode" type="text" /></label><label>Country<input v-model="machineNeededForm.country" type="text" /></label><fieldset class="request-radio-group"><legend>Have machines to sell or trade?</legend><label><input v-model="machineNeededForm.machinesToSell" type="radio" value="yes" /> Yes</label><label><input v-model="machineNeededForm.machinesToSell" type="radio" value="no" /> No</label></fieldset><fieldset class="request-radio-group"><legend>Sign up for email list?</legend><label><input v-model="machineNeededForm.emailList" type="radio" value="yes" /> Yes</label><label><input v-model="machineNeededForm.emailList" type="radio" value="no" /> No</label></fieldset><label class="request-message required-field-label">Tell us what you're looking for *<textarea v-model="machineNeededForm.message" rows="5" required></textarea></label><div class="request-form-actions"><button type="button" class="request-cancel-button" @click="showMachineNeededForm = false">Cancel</button><button type="submit" class="request-submit-button" :disabled="machineNeededSending">{{ machineNeededSending ? 'Sending...' : 'Submit' }}</button></div></form></div></div>
  </main>
</template>
<script setup>
import machinesData from '~/assets/data/machines.json'
import imagesData from '~/assets/data/images.json'
useSeoMeta({
  title: 'Used CNC Machines for Sale | UMS',
  description: 'Browse used CNC machines for sale including lathes, vertical and horizontal machining centers, boring mills, grinders and other industrial machinery.',
  ogTitle: 'Used CNC Machines for Sale | UMS',
  ogDescription: 'Browse current used CNC machinery and industrial equipment available from Used Machinery Source.',
  ogUrl: 'https://www.usedmachinerysource.com/equipment',
  ogType: 'website',
  twitterCard: 'summary',
  twitterTitle: 'Used CNC Machines for Sale | UMS',
  twitterDescription: 'Browse current used CNC machinery and industrial equipment available from Used Machinery Source.'
})
const equipmentStructuredData = computed(() => ({
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'CollectionPage',
      '@id': 'https://www.usedmachinerysource.com/equipment#collection',
      name: 'Used CNC Machines for Sale',
      url: 'https://www.usedmachinerysource.com/equipment',
      description: 'Current used CNC machinery and industrial equipment available through Used Machinery Source.',
      isPartOf: { '@id': 'https://www.usedmachinerysource.com/#website' }
    },
    {
      '@type': 'ItemList',
      name: 'Current Used Machinery Inventory',
      itemListElement: (machinesData || []).filter(machine => Number(machine.Sold) === 0 && Number(machine.OffMarket ?? machine.Off_Market ?? 0) === 0 && Number(machine.dont_advertise) === 0).map((machine, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: [machine.Manufacturer, machine.Model, machine.Year].filter(Boolean).join(' '),
        url: `https://www.usedmachinerysource.com/equipment/${machine.InvID}/${`${machine.Manufacturer || ''}-${machine.Model || ''}`.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')}`
      }))
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.usedmachinerysource.com/' },
        { '@type': 'ListItem', position: 2, name: 'Used CNC Machines for Sale', item: 'https://www.usedmachinerysource.com/equipment' }
      ]
    }
  ]
}))
useHead(() => ({
  htmlAttrs: { lang: 'en' },
  link: [{ rel: 'canonical', href: 'https://www.usedmachinerysource.com/equipment' }],
  script: [{ type: 'application/ld+json', children: JSON.stringify(equipmentStructuredData.value) }]
}))

const selectedCategory=ref('all');const searchTerm=ref('');const showMachineNeededForm=ref(false);const machineNeededSending=ref(false);const machineNeededSent=ref(false)
const machineNeededForm=reactive({email:'',contactName:'',phone:'',companyName:'',address:'',city:'',state:'',postalCode:'',country:'',machinesToSell:'no',emailList:'yes',message:''})
const machines=ref(machinesData);const machineCardImages=ref(Object.fromEntries((imagesData||[]).filter(file=>/\.(jpg|jpeg|png|webp)$/i.test(file)).sort((a,b)=>a.localeCompare(b,undefined,{numeric:true})).reduce((map,file)=>{const match=String(file).match(/^(\d+)_/);if(match&&!map.has(match[1]))map.set(match[1],file);return map},new Map())));const webDescription=machine=>machine.WebDesc||machine.Web_Desc||'';const advertisingSpec=machine=>machine.AdvSpec||machine.Adv_Spec||'';const groupName=machine=>machine.Groups||'';const offMarketValue=machine=>machine.OffMarket??machine.Off_Market??0
const categorySeoMap={
  'CNC Lathes & Turning Centers':'/equipment/type/cnc-lathes-turning-centers',
  'CNC Vertical Machining Centers and CNC Mills':'/equipment/type/vertical-machining-centers',
  'CNC Horizontal Machining Centers':'/equipment/type/horizontal-machining-centers',
  'Vertical Boring Mills & VTL':'/equipment/type/vertical-boring-mills-vtls',
  'Grinders, Lappers & Hones':'/equipment/type/grinders-lappers-hones',
  'Fabricating':'/equipment/type/fabrication-machinery',
  'EDM':'/equipment/type/edm-machines',
  'Engine Lathes, Drilling & Milling':'/equipment/type/engine-lathes-milling-drilling'
}
const categorySeoUrl=category=>categorySeoMap[category]||'/equipment'
const machineSlug=machine=>`${machine.Manufacturer||''}-${machine.Model||''}`.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'')
const machineUrl=machine=>`/equipment/${machine.InvID}/${machineSlug(machine)}`
function selectCategory(category){selectedCategory.value=category;searchTerm.value=''}function resetSearch(){selectedCategory.value='all';searchTerm.value=''}
async function submitMachineNeededForm(){machineNeededSending.value=true;const payload={inquiryType:'machine-needed',contact:{email:machineNeededForm.email,contactName:machineNeededForm.contactName,phone:machineNeededForm.phone,companyName:machineNeededForm.companyName,address:machineNeededForm.address,city:machineNeededForm.city,state:machineNeededForm.state,postalCode:machineNeededForm.postalCode,country:machineNeededForm.country},machinesToSell:machineNeededForm.machinesToSell,emailList:machineNeededForm.emailList,message:machineNeededForm.message};try{await $fetch('/api/request-info',{method:'POST',body:payload});showMachineNeededForm.value=false;machineNeededSent.value=true;machineNeededForm.message='';machineNeededForm.machinesToSell='no';setTimeout(()=>{machineNeededSent.value=false},7000)}catch(error){console.error('Machine needed request failed:',error);alert('Your request could not be sent. Please try again.')}finally{machineNeededSending.value=false}}
onMounted(()=>{const savedCategory=localStorage.getItem('ums-equipment-category');const savedSearch=localStorage.getItem('ums-equipment-search');if(savedCategory==='all'||visibleMachineGroups.value.includes(savedCategory)){selectedCategory.value=savedCategory}else{selectedCategory.value='all'}if(savedSearch)searchTerm.value=savedSearch})
watch(selectedCategory,value=>localStorage.setItem('ums-equipment-category',value));watch(searchTerm,value=>{localStorage.setItem('ums-equipment-search',value);if(value.trim()!=='')selectedCategory.value='all'})
const activeMachines=computed(()=>(machines.value||[]).filter(machine=>Number(machine.Sold)===0&&Number(offMarketValue(machine))===0&&Number(machine.dont_advertise)===0))
const visibleMachineGroups=computed(()=>[...new Set(activeMachines.value.map(machine=>machine.Groups).filter(group=>group!==null&&group!==undefined&&group!==''))].sort((a,b)=>a.localeCompare(b)))
const filteredMachines=computed(()=>{const term=searchTerm.value.trim().toLowerCase().replace(/[^a-z0-9]/g,'');return activeMachines.value.filter(machine=>{const desc=webDescription(machine);const group=groupName(machine);const categoryMatch=selectedCategory.value==='all'||group===selectedCategory.value;const searchText=[machine.Year,machine.Manufacturer,machine.Model,desc,group,advertisingSpec(machine),machine.Description,machine.Code,machine.InvID].filter(Boolean).join(' ').toLowerCase().replace(/[^a-z0-9]/g,'');return categoryMatch&&(term===''||searchText.includes(term))})})
</script>
<style scoped>
.equipment-page{padding:0 0 48px}.equipment-hero{background:linear-gradient(105deg,#071b33 0%,#0b2545 62%,#0d2c52 100%);color:#fff}.equipment-hero-inner{max-width:1320px;margin:0 auto;padding:44px 32px 40px}.hero-kicker{color:#f47b20;font-size:13px;font-weight:800;letter-spacing:.08em;margin-bottom:10px}.equipment-hero h1{margin:0 0 8px;font-size:clamp(36px,4vw,52px);line-height:1.05;font-family:Georgia,'Times New Roman',serif;font-weight:700}.equipment-hero p{margin:0;font-size:17px;line-height:1.5;color:#e8eef5}.search-panel,.equipment-listing{max-width:1320px;margin-left:auto;margin-right:auto;padding-left:32px;padding-right:32px}.search-panel{padding-top:24px;padding-bottom:20px}.browse-heading h2,.current-inventory-heading{margin:0;color:#0b2545;font-family:Georgia,'Times New Roman',serif;font-weight:700}.equipment-search{display:flex;flex-direction:column;gap:10px}.search-label{color:#0b2545;font-size:20px;font-weight:700}.keyword-search-row{display:flex;align-items:center;gap:10px;width:min(930px,100%)}.equipment-search input{flex:1;min-width:0;height:44px;box-sizing:border-box;padding:0 14px;border:1px solid #cfd8e3;border-radius:4px;background:#fff;color:#17273a;font-size:15px}.clear-search-button{height:44px;flex:0 0 auto;padding:0 18px;background:#fff;color:#1c4587;border:1px solid #1c4587;border-radius:5px;font-size:13px;font-weight:700;cursor:pointer}.clear-search-button:hover{background:#f4f7fb}.equipment-search input:focus{outline:2px solid rgba(28,69,135,.16);border-color:#1c4587}.search-or{display:flex;align-items:center;width:100%;gap:14px;margin:16px 0;color:#24364a;font-size:12px;font-weight:800}.search-or::before,.search-or::after{content:'';flex:1;border-top:1px solid #d6dde6}.browse-heading{margin-bottom:12px}.browse-heading h2{font-size:20px;font-family:inherit;font-weight:700}.category-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:10px}.category-grid a{min-height:48px;padding:10px 12px;box-sizing:border-box;background:#fff;border:1px solid #b9c7d8;border-radius:5px;color:#0b2545;font-size:14px;font-weight:700;cursor:pointer;transition:background .15s ease,color .15s ease,border-color .15s ease;text-decoration:none;display:flex;align-items:center;justify-content:center;text-align:center}.category-grid a:hover,.category-grid a.active{background:#1c4587;color:#fff;border-color:#1c4587}.seo-category-links{display:flex;flex-wrap:wrap;gap:8px 14px;align-items:center;margin:14px 0 2px;font-size:13px}.seo-category-links strong{color:#0b2545}.seo-category-links a{color:#1c4587;font-weight:700;text-decoration:none}.seo-category-links a:hover{text-decoration:underline}.seo-manufacturer-links{display:flex;flex-wrap:wrap;gap:8px 14px;align-items:center;margin:10px 0 2px;font-size:13px}.seo-manufacturer-links strong{color:#0b2545}.seo-manufacturer-links a{color:#1c4587;font-weight:700;text-decoration:none}.seo-manufacturer-links a:hover{text-decoration:underline}.listing-heading{display:flex;justify-content:center;margin-top:14px}.view-all-equipment-button{padding:10px 17px;background:#0b2545;color:#fff;border:1px solid #0b2545;border-radius:5px;font-size:13px;font-weight:700;cursor:pointer}.view-all-equipment-button:hover{background:#1c4587;border-color:#1c4587}.equipment-listing{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:16px}.current-inventory-heading{grid-column:1/-1;font-size:24px;margin:6px 0 0}.machine-card{border:1px solid #d7dde5;border-radius:7px;overflow:hidden;background:#fff;box-shadow:0 2px 8px rgba(11,37,69,.07);display:flex;flex-direction:column}.machine-card-image{width:100%;height:210px;display:flex;align-items:center;justify-content:center;background:#f7f8fa;text-decoration:none}.machine-card-image img{width:100%;height:100%;object-fit:contain}.machine-card-info{padding:14px;display:flex;flex-direction:column;flex:1}.machine-card-info h3{margin:0 0 6px;color:#0b2545;font-size:17px;font-weight:700;line-height:1.25}.machine-title-link{color:#0b2545;text-decoration:none}.machine-title-link:hover{text-decoration:underline}.machine-card-info p{margin:0 0 6px;font-size:13px}.stock-number{color:#5d6773;font-size:12px!important}.adv-spec{color:#3f4852;font-size:12px!important;line-height:1.4}.view-machine-button{display:inline-block;align-self:flex-start;margin-top:auto;padding:8px 13px;background:#1c4587;color:#fff;text-decoration:none;font-size:12px;font-weight:700;border-radius:5px;border:1px solid #1c4587;transition:background .2s ease}.view-machine-button:hover{background:#16386f}.machine-needed-callout{grid-column:1/-1;display:flex;align-items:center;gap:24px;margin:12px 0 0;padding:22px 26px;background:linear-gradient(105deg,#071b33 0%,#0b2545 100%);border-left:5px solid #f47b20;border-radius:6px;color:#fff}.machine-needed-copy{flex:1}.machine-needed-callout h3{margin:0 0 7px;color:#fff;font-size:21px;font-weight:800}.machine-needed-callout p{margin:0;color:#e8eef5;font-size:14px;line-height:1.55}.machine-needed-button{flex:0 0 auto;background:#f47b20;color:#fff;border:1px solid #f47b20;border-radius:5px;padding:11px 18px;font-size:14px;font-weight:800;cursor:pointer;white-space:nowrap}.machine-needed-button:hover{background:#d96512;border-color:#d96512}.machine-needed-sent{flex:0 0 auto;background:#e8f5e9;color:#1b5e20;border:1px solid #a5d6a7;border-radius:5px;padding:9px 12px;font-size:13px;font-weight:700}.no-results{grid-column:1/-1;padding:24px 0;color:#5d6773;text-align:center}.request-modal-overlay{position:fixed;inset:0;background:rgba(0,0,0,.55);display:flex;align-items:center;justify-content:center;z-index:1000;padding:20px}.request-modal{position:relative;width:100%;max-width:1000px;max-height:90vh;overflow-y:auto;background:#fff;border-radius:12px;padding:28px;box-sizing:border-box}.request-modal-close{position:absolute;top:10px;right:14px;border:none;background:transparent;font-size:28px;cursor:pointer}.request-machine{font-size:22px;font-weight:700;color:#1c4587;margin-top:6px;margin-bottom:14px}.request-form{display:grid;grid-template-columns:repeat(12,1fr);gap:14px 18px;margin-top:20px}.request-form>label{display:flex;flex-direction:column;gap:5px;font-weight:600;font-size:15px}.request-form>label:nth-of-type(1),.request-form>label:nth-of-type(2),.request-form>label:nth-of-type(3){grid-column:span 4}.request-form>label:nth-of-type(4){grid-column:span 4}.request-form>label:nth-of-type(5){grid-column:span 8}.request-form>label:nth-of-type(6){grid-column:span 5}.request-form>label:nth-of-type(7),.request-form>label:nth-of-type(8){grid-column:span 2}.request-form>label:nth-of-type(9){grid-column:span 3}.request-form>label:last-of-type{grid-column:1/-1}.request-form input[type='text'],.request-form input[type='email'],.request-form input[type='tel'],.request-form textarea{width:100%;box-sizing:border-box;padding:10px 12px;font-size:16px;font-weight:400;border:1px solid #d6dee8;border-radius:6px;background:#fff}.request-form textarea{min-height:120px;resize:vertical}.request-radio-group{grid-column:span 6;min-width:0}.request-radio-group label{margin-right:14px}.request-form-actions{grid-column:1/-1;display:flex;justify-content:flex-end;gap:10px;margin-top:4px}.request-submit-button,.request-cancel-button{border-radius:8px;padding:10px 24px;font-size:16px;font-weight:700;cursor:pointer}.request-submit-button{background:#1c4587;color:#fff;border:2px solid #1c4587}.request-cancel-button{background:#fff;color:#1c4587;border:2px solid #1c4587}@media(max-width:1100px){.equipment-listing{grid-template-columns:repeat(3,minmax(0,1fr))}}@media(max-width:900px){.category-grid,.equipment-listing{grid-template-columns:repeat(2,minmax(0,1fr))}.machine-needed-callout{flex-wrap:wrap}.machine-card-image{height:230px}}@media(max-width:600px){.equipment-hero-inner,.search-panel,.equipment-listing{padding-left:16px;padding-right:16px}.equipment-hero-inner{padding-top:34px;padding-bottom:32px}.category-grid,.equipment-listing{grid-template-columns:1fr}.machine-card-image{height:260px}.machine-needed-callout{flex-direction:column;align-items:flex-start}.machine-needed-button{width:100%}.request-form{grid-template-columns:1fr}.request-form>label,.request-form>label:nth-of-type(n),.request-radio-group,.request-form-actions{grid-column:1/-1}}

@media(max-width:600px){.keyword-search-row{align-items:stretch;flex-direction:column}.clear-search-button{width:100%}}
</style>