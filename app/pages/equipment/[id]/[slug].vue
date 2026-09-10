<template>
  <main class="machine-detail">
  <div class="machine-top">
   <div class="machine-info">
   <button type="button" class="back-to-equipment" @click="backToEquipment">‹ Back to Equipment Results</button>
    <h1 v-if="machine">{{ machine.Manufacturer }} {{ machine.Model }} {{ seoMachineType(machine) }}<template v-if="machine.Year"> – {{ machine.Year }}</template></h1>
<p v-if="machine" class="machine-subtitle">{{ machine.WebDesc }} &nbsp; • &nbsp; Stock #{{ machine.InvID }}</p>
<div v-if="machine" class="machine-seo-links">
  <NuxtLink v-if="manufacturerInventoryLink" :to="manufacturerInventoryLink">Browse used {{ manufacturerDisplayName }} machines →</NuxtLink>
  <NuxtLink v-if="machineTypeLink" :to="machineTypeLink">Browse {{ machineTypeLinkLabel }} →</NuxtLink>
  <NuxtLink v-if="manufacturerSpecLink" :to="manufacturerSpecLink">Research {{ machine.Manufacturer }} CNC lathe specifications →</NuxtLink>
</div>
<h3 class="machine-highlights-title">Machine Highlights</h3>
<p v-if="machine" class="adv-spec">{{ machine.AdvSpec }}</p>
<div v-if="machine" class="machine-details">
  <div><strong>Year</strong><span>{{ machine.Year }}</span></div>
  <div><strong>Manufacturer</strong><span>{{ machine.Manufacturer }}</span></div>
  <div><strong>Model</strong><span>{{ machine.Model }}</span></div>
  <div><strong>Control</strong><span>{{ machine.Control }}</span></div>
  <div><strong>Stock #</strong><span>{{ machine.InvID }}</span></div>
</div>
<div class="contact-buttons">
  <button type="button" class="request-info-button" @click="showRequestForm = true">Request Information</button>
<a href="tel:+12569801200" class="call-button" title="Call Used Machinery Source">Call (256) 980-1200</a>
</div>
<div v-if="requestSent" class="request-success">Thank you. Your request has been sent.</div>
</div>
<div class="gallery-column">
  <button type="button" class="simple-back" @click="goBack">‹ Back</button>
  <div v-if="machine && machineImages?.length" class="machine-gallery">
  <div class="main-image">
  <iframe v-if="showVideo && machineVideos.length" :src="machineVideos[0].Link.replace('youtu.be/', 'www.youtube.com/embed/')" title="Machine Video" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
  <template v-else>
    <img :src="`/Images/${machineImages[selectedImage]}`" :alt="`Used ${machine.Year || ''} ${machine.Manufacturer || ''} ${machine.Model || ''} ${seoMachineType(machine)} for sale - photo ${selectedImage + 1}`.replace(/\s+/g,' ').trim()" fetchpriority="high" />
    <button v-if="machineImages.length > 1" type="button" class="main-image-arrow main-image-arrow-left" aria-label="Previous machine photo" @click="previousImage">‹</button>
    <button v-if="machineImages.length > 1" type="button" class="main-image-arrow main-image-arrow-right" aria-label="Next machine photo" @click="nextImage">›</button>
  </template>
</div>
  <div class="thumbnail-grid">
  <button v-if="thumbnailStart > 0" type="button" class="thumbnail-arrow" @click="previousThumbnails">‹</button>
  <template v-for="item in visibleGalleryItems" :key="item.type === 'image' ? item.file : item.video.LinkID">
    <img v-if="item.type === 'image'" :src="`/Images/${item.file}`" :alt="`Used ${machine.Year || ''} ${machine.Manufacturer || ''} ${machine.Model || ''} ${seoMachineType(machine)} - thumbnail ${machineImages.indexOf(item.file) + 1}`.replace(/\s+/g,' ').trim()" class="thumbnail" loading="lazy" @click="showVideo = false; selectedImage = machineImages.indexOf(item.file)" />
    <div v-else class="video-thumbnail" @click="showVideo = true">
      <img :src="`/Images/${machineImages[selectedImage]}`" :alt="`Video - ${machine.Year} ${machine.Manufacturer} ${machine.Model}`" class="thumbnail" />
      <span class="video-thumbnail-label">▶ VIDEO</span>
    </div>
  </template>
  <button v-if="thumbnailStart + 5 < galleryItems.length" type="button" class="thumbnail-arrow" @click="nextThumbnails">›</button>
</div>
</div>
</div>
</div>
<div class="lower-grid">
<section class="specifications-section">
  <h2>Specifications</h2>
  <template v-for="spec in machineSpecifications" :key="spec.id">
    <div v-if="spec.groupnames" class="spec-group">{{ spec.groupnames }}</div>
    <div v-if="spec.description && spec.specvalues" class="spec-row"><span>{{ spec.description }}</span><strong>{{ spec.specvalues }}</strong></div>
  </template>
</section>
<section class="equipment-section">
  <h2>Equipment & Options</h2>
  <div v-for="item in machineEquipment" :key="item.id" class="equipment-row">
  <strong v-if="item.groupnameew">{{ item.groupnameew }}</strong><span>{{ item.equippedwith }}</span>
</div>
</section>
</div>
<section v-if="machineDescription" class="machine-overview">
  <h2>Machine Overview</h2>
  <p v-if="machineDescription.Paragraph1">{{ machineDescription.Paragraph1 }}</p>
  <p v-if="machineDescription.Paragraph2">{{ machineDescription.Paragraph2 }}</p>
</section>
<section v-if="featuredMachines.length" class="similar-machines">
  <h2>Featured Machines</h2>
  <div class="featured-carousel">
    <button v-if="eligibleFeaturedMachines.length > 4" type="button" class="featured-arrow featured-arrow-left" aria-label="Previous featured machines" @click="previousFeatured">‹</button>
    <div class="similar-machines-grid">
      <NuxtLink v-for="item in featuredMachines" :key="item.InvID" :to="`/equipment/${item.InvID}/${machineSlug(item)}`" class="similar-machine-card">
        <img :src="getSimilarMachineImage(item)" :alt="`${item.Year} ${item.Manufacturer} ${item.Model}`" />
        <div class="similar-machine-info">
          <h3>{{ item.Year }} {{ item.Manufacturer }} {{ item.Model }}</h3>
          <p>{{ item.WebDesc }}</p><p>Stock #{{ item.InvID }}</p><span>View Machine</span>
        </div>
      </NuxtLink>
    </div>
    <button v-if="eligibleFeaturedMachines.length > 4" type="button" class="featured-arrow featured-arrow-right" aria-label="Next featured machines" @click="nextFeatured">›</button>
  </div>
</section>
<div v-if="showRequestForm" class="request-modal-overlay">
  <div class="request-modal">
    <button type="button" class="request-modal-close" @click="showRequestForm = false">×</button>
    <h2>Request Information</h2><p class="form-required-note">Fields marked * are required.</p>
    <p v-if="machine" class="request-machine">{{ machine.Year }} {{ machine.Manufacturer }} {{ machine.Model }} • Stock #{{ machine.InvID }}</p>
    <form class="request-form" @submit.prevent="submitRequestForm">
<label class="required-field-label required-field-label">Email *<input v-model="requestForm.email" type="email" autocomplete="email" required /></label>
<label class="required-field-label required-field-label">Contact Name *<input v-model="requestForm.contactName" type="text" autocomplete="name" required /></label>
<label class="required-field-label required-field-label">Phone *<input v-model="requestForm.phone" type="tel" autocomplete="tel" required /></label>
<label>Company Name<input v-model="requestForm.companyName" type="text" autocomplete="organization" /></label>
<label>Address<input v-model="requestForm.address" type="text" autocomplete="street-address" /></label>
<label>City<input v-model="requestForm.city" type="text" autocomplete="address-level2" /></label>
<label>State<input v-model="requestForm.state" type="text" autocomplete="address-level1" /></label>
<label>Postal Code<input v-model="requestForm.postalCode" type="text" autocomplete="postal-code" /></label>
<label>Country<input v-model="requestForm.country" type="text" autocomplete="country-name" /></label>
<div class="form-question"><span>Have machines to sell or trade?</span><label><input v-model="requestForm.machinesToSell" type="radio" name="machinesToSell" value="yes" /> Yes</label><label><input v-model="requestForm.machinesToSell" type="radio" name="machinesToSell" value="no" /> No</label></div>
<div class="form-question"><span>Sign up for email list?</span><label><input v-model="requestForm.emailList" type="radio" name="emailList" value="yes" /> Yes</label><label><input v-model="requestForm.emailList" type="radio" name="emailList" value="no" /> No</label></div>
<label>Message<textarea v-model="requestForm.message" rows="5"></textarea></label>
<button type="button" class="request-clear-button" @click="clearRequestForm">Clear Form</button>
<div class="request-form-actions"><button type="button" class="request-cancel-button" @click="showRequestForm = false">Cancel</button><button type="submit" class="request-submit-button" :disabled="requestSending">{{ requestSending ? 'Sending...' : 'Submit' }}</button></div>
</form>
  </div>
</div>
  </main>
</template>

<script setup>
import machinesData from '~/assets/data/machines.json'
import specificationsData from '~/assets/data/specifications.json'
import videosData from '~/assets/data/Videos.json'
import machineDescriptionsData from '~/assets/data/machineDescriptions.json'
import imagesData from '~/assets/data/images.json'
const showRequestForm = ref(false)
const requestSent = ref(false)
const requestSending = ref(false)
const showVideo = ref(false)
const selectedImage = ref(0)
const thumbnailStart = ref(0)
const featuredOffset = ref(0)
const galleryItems = computed(() => {
  const items = []
  if (machineImages.value?.length) items.push({ type: 'image', file: machineImages.value[0] })
  if (machineVideos.value?.length) items.push({ type: 'video', video: machineVideos.value[0] })
  for (let i = 1; i < (machineImages.value?.length || 0); i++) items.push({ type: 'image', file: machineImages.value[i] })
  return items
})
const visibleGalleryItems = computed(() => galleryItems.value.slice(thumbnailStart.value, thumbnailStart.value + 5))
function previousThumbnails() { thumbnailStart.value = Math.max(0, thumbnailStart.value - 5) }
function nextThumbnails() { const maxStart = Math.max(0, galleryItems.value.length - 5); thumbnailStart.value = Math.min(maxStart, thumbnailStart.value + 5) }
function previousImage() { if (!machineImages.value?.length) return; showVideo.value = false; selectedImage.value = (selectedImage.value - 1 + machineImages.value.length) % machineImages.value.length }
function nextImage() { if (!machineImages.value?.length) return; showVideo.value = false; selectedImage.value = (selectedImage.value + 1) % machineImages.value.length }
const requestForm = reactive({ email:'', contactName:'', phone:'', companyName:'', address:'', city:'', state:'', postalCode:'', country:'', machinesToSell:'no', emailList:'yes', message:'' })
function clearRequestForm() {
  requestForm.email=''; requestForm.contactName=''; requestForm.phone=''; requestForm.companyName=''; requestForm.address=''; requestForm.city=''; requestForm.state=''; requestForm.postalCode=''; requestForm.country=''; requestForm.machinesToSell='no'; requestForm.emailList='yes'; requestForm.message=''; localStorage.removeItem('ums-request-info')
}
async function submitRequestForm() {
  requestSending.value = true
  const payload = { machine:{ invID:machine.value?.InvID, year:machine.value?.Year, manufacturer:machine.value?.Manufacturer, model:machine.value?.Model }, contact:{ email:requestForm.email, contactName:requestForm.contactName, phone:requestForm.phone, companyName:requestForm.companyName, address:requestForm.address, city:requestForm.city, state:requestForm.state, postalCode:requestForm.postalCode, country:requestForm.country }, machinesToSell:requestForm.machinesToSell, emailList:requestForm.emailList, message:requestForm.message }
  try {
    const response = await $fetch('/api/request-info', { method:'POST', body:payload })
    console.log('Request submitted:', response); showRequestForm.value=false; requestSent.value=true; requestForm.message=''; requestForm.machinesToSell='no'; setTimeout(()=>{requestSent.value=false},7000)
  } catch(error) { console.error('Request failed:',error); alert('Your request could not be sent. Please try again.') } finally { requestSending.value=false }
}
onMounted(() => {
  const saved=localStorage.getItem('ums-request-info')
  if(saved){ const data=JSON.parse(saved); requestForm.email=data.email||''; requestForm.contactName=data.contactName||''; requestForm.phone=data.phone||''; requestForm.companyName=data.companyName||''; requestForm.address=data.address||''; requestForm.city=data.city||''; requestForm.state=data.state||''; requestForm.postalCode=data.postalCode||''; requestForm.country=data.country||''; requestForm.emailList=data.emailList||'yes' }
})
watch(() => ({ email:requestForm.email, contactName:requestForm.contactName, phone:requestForm.phone, companyName:requestForm.companyName, address:requestForm.address, city:requestForm.city, state:requestForm.state, postalCode:requestForm.postalCode, country:requestForm.country, emailList:requestForm.emailList }), data => localStorage.setItem('ums-request-info',JSON.stringify(data)), {deep:true})
const route=useRoute()
const router=useRouter()
function backToEquipment(){router.push('/equipment')}
const machine=computed(()=>machinesData.find(item=>String(item.InvID)===String(route.params.id)))
const eligibleFeaturedMachines = computed(() => {
  if (!machine.value) return []
  const current = machine.value
  return machinesData
    .filter(item =>
      String(item.InvID) !== String(current.InvID) &&
      Number(item.Sold || 0) === 0 &&
      Number(item.Off_Market ?? item.OffMarket ?? 0) === 0 &&
      Number(item.dont_advertise || 0) === 0 &&
      Number(item.Featured || 0) === 1
    )
    .sort((a,b) => {
      const aOrder = Number(a.featOrder)
      const bOrder = Number(b.featOrder)
      const aRank = Number.isFinite(aOrder) && aOrder > 0 ? aOrder : Number.MAX_SAFE_INTEGER
      const bRank = Number.isFinite(bOrder) && bOrder > 0 ? bOrder : Number.MAX_SAFE_INTEGER
      return aRank - bRank || Number(a.InvID) - Number(b.InvID)
    })
})
const featuredMachines = computed(() => {
  const eligible = eligibleFeaturedMachines.value
  if (eligible.length <= 4) return eligible
  const seed = (Number(machine.value?.InvID) || 0) % eligible.length
  const start = (seed + featuredOffset.value + eligible.length) % eligible.length
  return [...eligible.slice(start), ...eligible.slice(0,start)].slice(0,4)
})
function nextFeatured(){const count=eligibleFeaturedMachines.value.length;if(count>4)featuredOffset.value=(featuredOffset.value+4)%count}
function previousFeatured(){const count=eligibleFeaturedMachines.value.length;if(count>4)featuredOffset.value=(featuredOffset.value-4+count)%count}
watch(()=>route.params.id,()=>{featuredOffset.value=0})
function machineSlug(item){return `${item.Manufacturer}-${item.Model}`.toLowerCase().trim().replace(/[^a-z0-9]+/g,'-').replace(/^-+|-+$/g,'')}
const canonicalMachinePath=computed(()=>machine.value?`/equipment/${machine.value.InvID}/${machineSlug(machine.value)}`:route.path)
const canonicalMachineUrl=computed(()=>`https://www.usedmachinerysource.com${canonicalMachinePath.value}`)
function getSimilarMachineImage(item){const prefix=`${item.InvID}_`; const image=imagesData.find(file=>file.toLowerCase().startsWith(prefix.toLowerCase())); return image?`/Images/${image}`:''}
function goBack(){if(window.history.length>1)window.history.back();else navigateTo('/equipment')}
const machineDescription=computed(()=>machineDescriptionsData.find(item=>String(item.InvID)===String(route.params.id)))
const {data:machineImages}=await useFetch('/api/images',{query:{invID:route.params.id}})
function buildMetaDescription(item){
  if(!item) return 'Used CNC machinery and industrial equipment from Used Machinery Source.'
  const type = String(item.WebDesc || 'used machine').trim()
  const year = String(item.Year || '').trim()
  const prefix = `${item.Manufacturer} ${item.Model} ${type} for sale.${year ? ` ${year} machine.` : ''}`
  const details = String(item.AdvSpec || '').replace(/\s+/g,' ').trim()
  let text = `${prefix} ${details}`.replace(/\s+/g,' ').trim()
  const suffix = ' Used Machinery Source.'
  if(text.length + suffix.length <= 158) return text + suffix
  const max = 158 - suffix.length
  let cut = text.slice(0,max)
  const lastSpace = cut.lastIndexOf(' ')
  if(lastSpace > 110) cut = cut.slice(0,lastSpace)
  return cut.replace(/[.,;:\s]+$/,'') + '…' + suffix
}
function seoMachineType(item){
  const d=String(item?.WebDesc||'').toLowerCase()
  if(d.includes('vertical') && d.includes('machining')) return 'Vertical Machining Center'
  if(d.includes('horizontal') && d.includes('machining')) return 'Horizontal Machining Center'
  if(d.includes('cnc') && (d.includes('lathe')||d.includes('turn'))) return 'CNC Lathe'
  if(d.includes('lathe')) return 'Lathe'
  if(d.includes('grinder')) return 'Grinder'
  if(d.includes('press brake')) return 'Press Brake'
  if(d.includes('edm')) return 'EDM'
  return String(item?.WebDesc||'Used Machine').replace(/\s+/g,' ').trim()
}
function seoMachineTitle(item){
  if(!item) return 'Used Machinery Source'
  const year=String(item.Year||'').trim()
  const manufacturer=String(item.Manufacturer||'').trim()
  const model=String(item.Model||'').trim()
  const type=seoMachineType(item)
  const base=[manufacturer,model].filter(Boolean).join(' ')
  const typeAlreadyInName=base.toLowerCase().includes(type.toLowerCase())
  const core=[base,typeAlreadyInName?'':type,'for Sale'].filter(Boolean).join(' ')
  const suffix=year?` | ${year}`:''
  const full=`${core}${suffix} | UMS`
  if(full.length<=62) return full
  const shorter=`${base} for Sale${suffix} | UMS`
  return shorter.length<=62?shorter:`${base} for Sale | UMS`
}
const manufacturerInventoryMap={
  'haas':'haas',
  'doosan':'doosan',
  'dn solutions':'doosan',
  'hurco':'hurco',
  'mazak':'mazak',
  'mori-seiki':'mori-seiki',
  'mori seiki':'mori-seiki',
  'dmg mori':'mori-seiki',
  'dmg-mori':'mori-seiki',
  'okuma':'okuma',
  'kingston':'kingston',
  'amada':'amada',
  'smec':'smec',
  'samsung':'smec'
}
const manufacturerDisplayName=computed(()=>{
  const m=String(machine.value?.Manufacturer||'').trim()
  if(['Doosan','DN Solutions'].includes(m)) return 'Doosan / DN Solutions'
  if(m.toLowerCase().includes('mori')) return 'Mori-Seiki / DMG MORI'
  return m
})
const manufacturerInventoryLink=computed(()=>{
  const key=String(machine.value?.Manufacturer||'').trim().toLowerCase()
  const slug=manufacturerInventoryMap[key]
  return slug?`/equipment/manufacturer/${slug}`:''
})
const machineTypeMap={
  'CNC Lathes & Turning Centers':['/equipment/type/cnc-lathes-turning-centers','used CNC lathes & turning centers'],
  'CNC Vertical Machining Centers and CNC Mills':['/equipment/type/vertical-machining-centers','used vertical machining centers'],
  'CNC Horizontal Machining Centers':['/equipment/type/horizontal-machining-centers','used horizontal machining centers'],
  'Vertical Boring Mills & VTL':['/equipment/type/vertical-boring-mills-vtls','used VTLs & vertical boring mills'],
  'Grinders, Lappers & Hones':['/equipment/type/grinders-lappers-hones','used grinders, lappers & hones'],
  'Fabricating':['/equipment/type/fabrication-machinery','used fabrication machinery'],
  'EDM':['/equipment/type/edm-machines','used EDM machines'],
  'Engine Lathes, Drilling & Milling':['/equipment/type/engine-lathes-milling-drilling','used engine lathes, milling & drilling machines']
}
const machineTypeLink=computed(()=>machineTypeMap[String(machine.value?.Groups||'')]?.[0]||'')
const machineTypeLinkLabel=computed(()=>machineTypeMap[String(machine.value?.Groups||'')]?.[1]||'used machinery')
const manufacturerSpecLink=computed(()=>{
  const m=String(machine.value?.Manufacturer||'').trim().toLowerCase()
  const type=String(machine.value?.WebDesc||'').toLowerCase()
  if(!(type.includes('lathe')||type.includes('turn'))) return ''
  if(m.includes('mazak')) return '/spec-library/mazak/cnc-lathes'
  if(m.includes('haas')) return '/spec-library/haas/cnc-lathes'
  if(m.includes('okuma')) return '/spec-library/okuma/cnc-lathes'
  if(m.includes('mori')) return '/spec-library/mori-seiki/cnc-lathes'
  return '/spec-library/cnc-lathes'
})
const machineStructuredData=computed(()=>{
  if(!machine.value) return null
  const url=canonicalMachineUrl.value
  const image=machineImages.value?.length?`https://www.usedmachinerysource.com/Images/${machineImages.value[0]}`:undefined
  const name=[machine.value.Manufacturer,machine.value.Model,machine.value.Year].filter(Boolean).join(' ')
  return {
    '@context':'https://schema.org',
    '@graph':[
      {
        '@type':'Product',
        name,
        description:buildMetaDescription(machine.value),
        sku:String(machine.value.InvID||''),
        model:String(machine.value.Model||''),
        category:String(machine.value.WebDesc||seoMachineType(machine.value)),
        itemCondition:'https://schema.org/UsedCondition',
        url,
        ...(image?{image:[image]}:{}),
        brand:{'@type':'Brand',name:String(machine.value.Manufacturer||'')}
      },
      {
        '@type':'BreadcrumbList',
        itemListElement:[
          {'@type':'ListItem',position:1,name:'Home',item:'https://www.usedmachinerysource.com/'},
          {'@type':'ListItem',position:2,name:'Equipment',item:'https://www.usedmachinerysource.com/equipment'},
          {'@type':'ListItem',position:3,name,item:url}
        ]
      }
    ]
  }
})
useSeoMeta({title:()=>seoMachineTitle(machine.value),description:()=>buildMetaDescription(machine.value),ogTitle:()=>machine.value?`${machine.value.Manufacturer} ${machine.value.Model}${machine.value.Year?` – ${machine.value.Year}`:''}`:'Used Machinery Source',ogDescription:()=>machine.value?`${machine.value.AdvSpec||''} Stock #${machine.value.InvID}.`:'Used CNC machinery and industrial equipment from Used Machinery Source.',ogImage:()=>machineImages.value?.length?`https://www.usedmachinerysource.com/Images/${machineImages.value[0]}`:'',ogUrl:()=>canonicalMachineUrl.value,ogType:'website',twitterCard:'summary_large_image',twitterTitle:()=>machine.value?`${machine.value.Manufacturer} ${machine.value.Model}${machine.value.Year?` – ${machine.value.Year}`:''}`:'Used Machinery Source',twitterDescription:()=>machine.value?`${machine.value.AdvSpec||''} Stock #${machine.value.InvID}.`:'Used CNC machinery and industrial equipment from Used Machinery Source.',twitterImage:()=>machineImages.value?.length?`https://www.usedmachinerysource.com/Images/${machineImages.value[0]}`:'',ogImageAlt:()=>machine.value?`Used ${machine.value.Year||''} ${machine.value.Manufacturer||''} ${machine.value.Model||''} ${seoMachineType(machine.value)} for sale`.replace(/\s+/g,' ').trim():'Used CNC machinery from Used Machinery Source',twitterImageAlt:()=>machine.value?`Used ${machine.value.Year||''} ${machine.value.Manufacturer||''} ${machine.value.Model||''} ${seoMachineType(machine.value)} for sale`.replace(/\s+/g,' ').trim():'Used CNC machinery from Used Machinery Source'})
useHead(()=>({
  htmlAttrs:{lang:'en'},
  link:[{rel:'canonical',href:canonicalMachineUrl.value}],
  script:machineStructuredData.value?[{type:'application/ld+json',children:JSON.stringify(machineStructuredData.value)}]:[]
}))
const machineVideos=computed(()=>videosData.filter(item=>String(item.InvID)===String(route.params.id)))
const specifications=ref(specificationsData)
const machineSpecifications=computed(()=>(specifications.value||[]).filter(item=>String(item.invid)===String(route.params.id)&&item.description&&item.specvalues))
const machineEquipment=computed(()=>(specifications.value||[]).filter(item=>String(item.invid)===String(route.params.id)&&item.equippedwith))
</script>
<style scoped>
.machine-detail{max-width:1320px;margin:0 auto;padding:40px 32px}.machine-gallery{margin-top:24px}.main-image{position:relative;background:#f5f7fa;border:1px solid #d7dde5;border-radius:10px;overflow:hidden;height:600px}.main-image img{width:100%;height:100%;object-fit:contain;display:block}.main-image-arrow{position:absolute;top:50%;transform:translateY(-50%);width:48px;height:76px;border:0;border-radius:8px;background:rgba(0,0,0,.22);color:#fff;font-size:46px;line-height:1;cursor:pointer;display:flex;align-items:center;justify-content:center;z-index:2;transition:background .15s ease}.main-image-arrow:hover,.main-image-arrow:focus-visible{background:rgba(0,0,0,.42)}.main-image-arrow-left{left:12px}.main-image-arrow-right{right:12px}.thumbnail-grid{display:flex;align-items:center;gap:12px;margin-top:16px;flex-wrap:nowrap}.thumbnail{width:100px;height:100px;object-fit:cover;border:1px solid #d7dde5;border-radius:5px}.machine-top{display:grid;grid-template-columns:minmax(0,.85fr) minmax(0,1.15fr);gap:40px;align-items:start;direction:rtl}.machine-info,.machine-gallery{direction:ltr}.machine-info{padding:22px;margin-top:26px}.machine-details{margin-top:18px;background:#f5f7fa;border:1px solid #d7dde5;border-radius:10px;padding:18px 20px}.machine-details>div{display:grid;grid-template-columns:130px 1fr;gap:16px;padding:9px 0;border-bottom:1px solid #d7dde5}.machine-details span{text-align:left}.spec-row{display:grid;grid-template-columns:1fr 180px;gap:24px;padding:11px 18px 11px 28px;border-left:1px solid #d7dde5;border-right:1px solid #d7dde5}.spec-row:nth-of-type(odd){background:#e9eef5}.spec-row:nth-of-type(even){background:#fff}.spec-row strong{text-align:right;font-size:17px}.spec-row span{font-size:17px;font-weight:500}.lower-grid{display:grid;grid-template-columns:55% 1fr;gap:32px;align-items:start;margin-top:40px}.lower-grid .specifications-section,.equipment-section{width:100%;border:1px solid #d6dee8;border-radius:12px;overflow:hidden;background:#fff}.equipment-row{display:block;margin-bottom:6px;line-height:1.45;font-size:17px}.equipment-row strong{display:block;color:#1c4587;margin-top:12px;margin-bottom:6px}.equipment-row span{display:block;padding-left:18px}.equipment-row span::before{content:'•';margin-left:-14px;margin-right:8px}.spec-group{font-weight:700;color:#1c4587;background:#dce6f1;padding:5px 18px;border-top:1px solid #c5d0dc;border-bottom:1px solid #c5d0dc}.specifications-section h2,.equipment-section h2{margin:0;padding:10px 18px;background:#f3f6fa;border-bottom:1px solid #d7dde5}.equipment-section>div{padding-left:18px;padding-right:18px}.request-info-button{margin-top:0;background:#1c4587;color:#fff;border:none;border-radius:8px;padding:12px 22px;margin-left:8px;font-size:16px;font-weight:700;width:200px;box-sizing:border-box;cursor:pointer}.contact-buttons{display:flex;gap:12px;align-items:center;margin-top:20px}.call-button{display:inline-block;background:#fff;color:#1c4587;border:2px solid #1c4587;border-radius:8px;padding:11px 22px;font-size:16px;font-weight:700;width:200px;box-sizing:border-box;text-align:center;text-decoration:none}.request-modal-overlay{position:fixed;inset:0;background:rgba(0,0,0,.55);display:flex;align-items:center;justify-content:center;z-index:1000}.request-modal{position:relative;width:90%;max-width:1000px;background:#fff;border-radius:12px;padding:28px;box-sizing:border-box}.request-modal-close{position:absolute;top:10px;right:14px;border:none;background:transparent;font-size:28px;cursor:pointer}.request-form{display:grid;grid-template-columns:repeat(12,1fr);gap:14px 18px;margin-top:20px}.form-question{grid-column:span 6;display:flex;align-items:center;gap:14px;font-size:15px}.request-form>label{display:flex;flex-direction:column;gap:5px;font-weight:600;font-size:15px}.request-form>label:last-of-type{grid-column:1/-1}.request-form input[type=text],.request-form input[type=email],.request-form input[type=tel],.request-form textarea{width:100%;box-sizing:border-box;padding:10px 12px;font-size:16px;font-weight:400;border:1px solid #d6dee8;border-radius:6px;background:#fff}.request-form textarea{min-height:120px;resize:vertical}.form-question>span{font-weight:600;margin-right:4px}.form-question label{display:flex;align-items:center;gap:5px;font-weight:400}.request-form>label:nth-of-type(1),.request-form>label:nth-of-type(2),.request-form>label:nth-of-type(3){grid-column:span 4}.request-form>label:nth-of-type(4){grid-column:span 4}.request-form>label:nth-of-type(5){grid-column:span 8}.request-form>label:nth-of-type(6){grid-column:span 5}.request-form>label:nth-of-type(7){grid-column:span 2}.request-form>label:nth-of-type(8){grid-column:span 2}.request-form>label:nth-of-type(9){grid-column:span 3}.request-machine{font-size:22px;font-weight:700;color:#1c4587;margin-top:6px;margin-bottom:14px}.request-form-actions{grid-column:1/-1;display:flex;justify-content:flex-end;gap:10px;margin-top:4px}.request-submit-button{background:#1c4587;color:#fff;border:none;border-radius:8px;padding:11px 24px;font-size:16px;font-weight:700;cursor:pointer}.request-cancel-button{background:#fff;color:#1c4587;border:2px solid #1c4587;border-radius:8px;padding:9px 24px;font-size:16px;font-weight:700;cursor:pointer}.request-clear-button{grid-column:1/3;justify-self:start;background:transparent;color:#1c4587;border:none;padding:6px 0;font-size:14px;font-weight:600;cursor:pointer;text-decoration:underline}.request-success{margin-top:14px;padding:14px 18px;background:#eaf4ea;border:2px solid #5b9b5b;border-radius:8px;color:#245c24;font-size:18px;font-weight:700;text-align:center}.video-thumbnail{position:relative;cursor:pointer}.video-thumbnail-label{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;background:rgba(0,0,0,.45);color:#fff;font-size:15px;font-weight:700;border-radius:5px;pointer-events:none}.main-image iframe{width:100%;height:100%;border:0;display:block}.thumbnail-arrow{width:42px;height:100px;border:1px solid #9aa7b5;border-radius:5px;background:#f3f5f7;color:#1c4587;font-size:36px;font-weight:700;cursor:pointer;display:flex;align-items:center;justify-content:center;padding:0}.machine-highlights-title{margin-top:16px;margin-bottom:0;padding:8px 12px;font-size:18px;font-weight:700;background:#e8eef5;border:1px solid #d7dde5;border-bottom:none;border-radius:8px 8px 0 0}.machine-subtitle{margin-top:6px;margin-bottom:4px}.machine-seo-links{display:flex;flex-wrap:wrap;gap:5px 14px;margin:0 0 10px;font-size:14px}.machine-seo-links a{color:#1c4587;font-weight:700;text-decoration:none}.machine-seo-links a:hover{text-decoration:underline}.adv-spec{margin-top:0;margin-bottom:16px;padding:10px 12px;font-size:16px;line-height:1.4;border:1px solid #d7dde5;border-top:none;border-radius:0 0 8px 8px;background:#fff}.machine-info h1{font-size:34px;line-height:1.15;margin-top:0;margin-bottom:12px}.back-to-equipment{display:inline-block;margin-bottom:16px;padding:8px 14px;background:transparent;color:#1c4587;border:1px solid #1c4587;border-radius:6px;font-weight:700;font-size:14px;cursor:pointer}.back-to-equipment:hover{background:#1c4587;color:#fff}.machine-overview{margin-top:28px;margin-bottom:32px}.machine-overview h2{margin-bottom:14px;font-size:24px;color:#0b2545}.machine-overview p{font-size:16px;line-height:1.6;margin-bottom:14px}.similar-machines{margin-top:36px;margin-bottom:36px}.similar-machines h2{margin-bottom:18px;color:#0b2545;font-size:24px}.featured-carousel{display:flex;align-items:center;gap:12px}.similar-machines-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:18px;flex:1;min-width:0}.featured-arrow{flex:0 0 44px;width:44px;height:86px;border:1px solid #9aa7b5;border-radius:7px;background:#f3f5f7;color:#1c4587;font-size:38px;font-weight:700;cursor:pointer;display:flex;align-items:center;justify-content:center;padding:0;transition:background .15s ease,color .15s ease}.featured-arrow:hover,.featured-arrow:focus-visible{background:#1c4587;color:#fff}.similar-machine-card{border:1px solid #d7dde5;border-radius:8px;overflow:hidden;background:#fff;box-shadow:0 2px 8px rgba(11,37,69,.08);display:flex;flex-direction:column;text-decoration:none;color:inherit}.similar-machine-card img{width:100%;height:220px;object-fit:contain;background:#f7f7f7}.similar-machine-info{padding:15px;display:flex;flex-direction:column;flex:1}.similar-machine-info h3{margin:0 0 8px;color:#0b2545;font-size:19px;font-weight:700}.similar-machine-info p{margin:0 0 8px}.similar-machine-info span{margin-top:auto;display:block;background:#1c4587;color:#fff;text-align:center;padding:10px 14px;border-radius:5px;font-weight:700}.simple-back{display:block;align-self:flex-start;background:transparent;border:0;padding:4px 0;margin:0 0 12px;color:#1c4587;font-size:15px;font-weight:600;cursor:pointer;text-align:left;direction:ltr}.gallery-column{width:100%;display:flex;flex-direction:column;align-items:flex-start;direction:ltr}
@media(max-width:1050px){.similar-machines-grid{grid-template-columns:repeat(2,minmax(0,1fr))}}
@media(max-width:900px){.machine-top{grid-template-columns:1fr;gap:24px}.machine-gallery{order:1;width:100%}.machine-info{order:2;width:100%;padding:0;margin-top:0}.main-image{height:420px}.lower-grid{grid-template-columns:1fr;gap:24px}.spec-row{grid-template-columns:1fr;gap:4px;padding:10px 12px}.spec-row strong{text-align:left}.contact-buttons{flex-direction:column;align-items:stretch}.request-info-button,.call-button{width:100%}}
@media(max-width:650px){.featured-carousel{gap:6px}.featured-arrow{flex-basis:34px;width:34px;height:68px;font-size:30px}.similar-machines-grid{grid-template-columns:1fr}}
</style>