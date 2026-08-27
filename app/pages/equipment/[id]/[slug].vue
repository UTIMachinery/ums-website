<template>
  <main class="machine-detail">
  <div class="machine-top">
   <div class="machine-info">
   <button
  type="button"
  class="back-to-equipment"
  @click="backToEquipment"
>
  ‹ Back to Equipment Results
</button>

    <h1 v-if="machine">
  {{ machine.Year }} {{ machine.Manufacturer }} {{ machine.Model }}
</h1>
<p v-if="machine" class="machine-subtitle">
  {{ machine.WebDesc }} &nbsp; • &nbsp; Stock #{{ machine.InvID }}
</p>





<h3 class="machine-highlights-title">Machine Highlights</h3>
<p v-if="machine" class="adv-spec">
  {{ machine.AdvSpec }}
</p>
<div v-if="machine" class="machine-details">
  <div><strong>Year</strong><span>{{ machine.Year }}</span></div>
  <div><strong>Manufacturer</strong><span>{{ machine.Manufacturer }}</span></div>
  <div><strong>Model</strong><span>{{ machine.Model }}</span></div>
  <div><strong>Control</strong><span>{{ machine.Control }}</span></div>
  <div><strong>Stock #</strong><span>{{ machine.InvID }}</span></div>
</div>
<div class="contact-buttons">
  <button
    type="button"
    class="request-info-button"
    @click="showRequestForm = true"
  >
    Request Information
  </button>

<a
  href="tel:+12569801200"
  class="call-button"
  title="Call Used Machinery Source"
>
  Call (256) 980-1200
</a>
</div>
<div
  v-if="requestSent"
  class="request-success"
>
  Thank you. Your request has been sent.
</div>
</div>

<div class="gallery-column">
  <button type="button" class="simple-back" @click="goBack">
    ‹ Back
  </button>

  <div v-if="machine && machineImages?.length" class="machine-gallery">
  <div class="main-image">

  <iframe
    v-if="showVideo && machineVideos.length"
    :src="machineVideos[0].Link.replace('youtu.be/', 'www.youtube.com/embed/')"
    title="Machine Video"
    frameborder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowfullscreen
  ></iframe>

  <img
    v-else
    :src="`/Images/${machineImages[selectedImage]}`"
    :alt="`${machine.Year} ${machine.Manufacturer} ${machine.Model}`"
  />

</div>

  <div class="thumbnail-grid">

  <button
    v-if="thumbnailStart > 0"
    type="button"
    class="thumbnail-arrow"
    @click="previousThumbnails"
  >
    ‹
  </button>

  <template
    v-for="item in visibleGalleryItems"
    :key="item.type === 'image' ? item.file : item.video.LinkID"
  >
    <img
      v-if="item.type === 'image'"
      :src="`/Images/${item.file}`"
      :alt="`${machine.Year} ${machine.Manufacturer} ${machine.Model}`"
      class="thumbnail"
      @click="showVideo = false; selectedImage = machineImages.indexOf(item.file)"
    />

    <div
      v-else
      class="video-thumbnail"
      @click="showVideo = true"
    >
      <img
        :src="`/Images/${machineImages[selectedImage]}`"
        :alt="`Video - ${machine.Year} ${machine.Manufacturer} ${machine.Model}`"
        class="thumbnail"
      />
      <span class="video-thumbnail-label">▶ VIDEO</span>
    </div>
  </template>

  <button
    v-if="thumbnailStart + 5 < galleryItems.length"
    type="button"
    class="thumbnail-arrow"
    @click="nextThumbnails"
  >
    ›
  </button>

</div>
</div>
</div>
</div>

<div class="lower-grid">

<section class="specifications-section">
  <h2>Specifications</h2>

  <template
    v-for="spec in machineSpecifications"
    :key="spec.id"
  >
    <div
      v-if="spec.groupnames"
      class="spec-group"
    >
      {{ spec.groupnames }}
    </div>

    <div
      v-if="spec.description && spec.specvalues"
      class="spec-row"
    >
      <span>{{ spec.description }}</span>
      <strong>{{ spec.specvalues }}</strong>
    </div>
  </template>

</section>
<section class="equipment-section">
  <h2>Equipment & Options</h2>
  <div
  v-for="item in machineEquipment"
  :key="item.id"
  class="equipment-row"
>
  <strong v-if="item.groupnameew">{{ item.groupnameew }}</strong>
  <span>{{ item.equippedwith }}</span>
</div>
</section>
</div>

<section
  v-if="machineDescription"
  class="machine-overview"
>
  <h2>Machine Overview</h2>

  <p v-if="machineDescription.Paragraph1">
    {{ machineDescription.Paragraph1 }}
  </p>

  <p v-if="machineDescription.Paragraph2">
    {{ machineDescription.Paragraph2 }}
  </p>
</section>

<section v-if="similarMachines.length" class="similar-machines">
  <h2>Similar Machines</h2>

  <div class="similar-machines-grid">
    <NuxtLink
      v-for="item in similarMachines"
      :key="item.InvID"
      :to="`/equipment/${item.InvID}/${machineSlug(item)}`"
      class="similar-machine-card"
    >
      <img
        :src="getSimilarMachineImage(item)"
        :alt="`${item.Year} ${item.Manufacturer} ${item.Model}`"
      />

      <div class="similar-machine-info">
        <h3>{{ item.Year }} {{ item.Manufacturer }} {{ item.Model }}</h3>
        <p>{{ item.WebDesc }}</p>
        <p>Stock #{{ item.InvID }}</p>
        <span>View Machine</span>
      </div>
    </NuxtLink>
  </div>
</section>


<div
  v-if="showRequestForm"
  class="request-modal-overlay"
>
  <div class="request-modal">
    <button
      type="button"
      class="request-modal-close"
      @click="showRequestForm = false"
    >
      ×
    </button>

    <h2>Request Information</h2>

    <p v-if="machine" class="request-machine">
      {{ machine.Year }} {{ machine.Manufacturer }} {{ machine.Model }}
      • Stock #{{ machine.InvID }}
    </p>
    <form
  class="request-form"
  @submit.prevent="submitRequestForm"
>
    <label>
  Email *
 <input
  v-model="requestForm.email"
  type="email"
  autocomplete="email"
  required
/>
</label>

<label>
  Contact Name *
  <input
  v-model="requestForm.contactName"
  type="text"
  autocomplete="name"
  required
/>
</label>

<label>
  Phone *
  <input
  v-model="requestForm.phone"
  type="tel"
  autocomplete="tel"
  required
/>
</label>
<label>
  Company Name
  <input
  v-model="requestForm.companyName"
  type="text"
  autocomplete="organization"
/>
</label>

<label>
  Address
  <input
  v-model="requestForm.address"
  type="text"
  autocomplete="street-address"
/>
</label>

<label>
  City
  <input
  v-model="requestForm.city"
  type="text"
  autocomplete="address-level2"
/>
</label>

<label>
  State
  <input
  v-model="requestForm.state"
  type="text"
  autocomplete="address-level1"
/>
</label>
<label>
  Postal Code
  <input
  v-model="requestForm.postalCode"
  type="text"
  autocomplete="postal-code"
/>
</label>

<label>
  Country
  <input
  v-model="requestForm.country"
  type="text"
  autocomplete="country-name"
/>
</label>
<div class="form-question">
  <span>Have machines to sell or trade?</span>

  <label>
    <input
      v-model="requestForm.machinesToSell"
      type="radio"
      name="machinesToSell"
      value="yes"
    />
    Yes
  </label>

  <label>
    <input
      v-model="requestForm.machinesToSell"
      type="radio"
      name="machinesToSell"
      value="no"
    />
    No
  </label>
</div>

<div class="form-question">
  <span>Sign up for email list?</span>

  <label>
    <input
      v-model="requestForm.emailList"
      type="radio"
      name="emailList"
      value="yes"
    />
    Yes
  </label>

  <label>
    <input
      v-model="requestForm.emailList"
      type="radio"
      name="emailList"
      value="no"
    />
    No
  </label>
</div>
<label>
  Message
  <textarea
    v-model="requestForm.message"
    rows="5"
  ></textarea>
</label>
<button
  type="button"
  class="request-clear-button"
  @click="clearRequestForm"
>
  Clear Form
</button>
<div class="request-form-actions">
  <button
    type="button"
    class="request-cancel-button"
    @click="showRequestForm = false"
  >
    Cancel
  </button>

  <button
  type="submit"
  class="request-submit-button"
  :disabled="requestSending"
>
  {{ requestSending ? 'Sending...' : 'Submit' }}
</button>
</div>
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
const galleryItems = computed(() => {
  const items = []

  if (machineImages.value?.length) {
    items.push({
      type: 'image',
      file: machineImages.value[0]
    })
  }

  if (machineVideos.value?.length) {
    items.push({
      type: 'video',
      video: machineVideos.value[0]
    })
  }

  for (let i = 1; i < (machineImages.value?.length || 0); i++) {
    items.push({
      type: 'image',
      file: machineImages.value[i]
    })
  }

  return items
})

const visibleGalleryItems = computed(() => {
  return galleryItems.value.slice(
    thumbnailStart.value,
    thumbnailStart.value + 5
  )
})
function previousThumbnails() {
  thumbnailStart.value = Math.max(0, thumbnailStart.value - 5)
}

function nextThumbnails() {
  const maxStart = Math.max(0, galleryItems.value.length - 5)
  thumbnailStart.value = Math.min(maxStart, thumbnailStart.value + 5)
}
  
const requestForm = reactive({
  email: '',
  contactName: '',
  phone: '',
  companyName: '',
  address: '',
  city: '',
  state: '',
  postalCode: '',
  country: '',
  machinesToSell: 'no',
  emailList: 'yes',
  message: ''
})
function clearRequestForm() {
  requestForm.email = ''
  requestForm.contactName = ''
  requestForm.phone = ''
  requestForm.companyName = ''
  requestForm.address = ''
  requestForm.city = ''
  requestForm.state = ''
  requestForm.postalCode = ''
  requestForm.country = ''
  requestForm.machinesToSell = 'no'
  requestForm.emailList = 'yes'
  requestForm.message = ''

  localStorage.removeItem('ums-request-info')
}
async function submitRequestForm() {
  requestSending.value = true
  const payload = {
    machine: {
      invID: machine.value?.InvID,
      year: machine.value?.Year,
      manufacturer: machine.value?.Manufacturer,
      model: machine.value?.Model
    },
    contact: {
      email: requestForm.email,
      contactName: requestForm.contactName,
      phone: requestForm.phone,
      companyName: requestForm.companyName,
      address: requestForm.address,
      city: requestForm.city,
      state: requestForm.state,
      postalCode: requestForm.postalCode,
      country: requestForm.country
    },
    machinesToSell: requestForm.machinesToSell,
    emailList: requestForm.emailList,
    message: requestForm.message
  }

  try {
  const response = await $fetch('/api/request-info', {
    method: 'POST',
    body: payload,
  })

  console.log('Request submitted:', response)

  showRequestForm.value = false
  requestSent.value = true

  requestForm.message = ''
  requestForm.machinesToSell = 'no'

  setTimeout(() => {
    requestSent.value = false
  }, 7000)

} catch (error) {
  console.error('Request failed:', error)
  alert('Your request could not be sent. Please try again.')

} finally {
  requestSending.value = false
}

requestForm.message = ''
requestForm.machinesToSell = 'no'

setTimeout(() => {
  requestSent.value = false
}, 7000)
}
onMounted(() => {
  const saved = localStorage.getItem('ums-request-info')

  if (saved) {
    const data = JSON.parse(saved)

    requestForm.email = data.email || ''
    requestForm.contactName = data.contactName || ''
    requestForm.phone = data.phone || ''
    requestForm.companyName = data.companyName || ''
    requestForm.address = data.address || ''
    requestForm.city = data.city || ''
    requestForm.state = data.state || ''
    requestForm.postalCode = data.postalCode || ''
    requestForm.country = data.country || ''
    requestForm.emailList = data.emailList || 'yes'
  }
})
watch(
  () => ({
    email: requestForm.email,
    contactName: requestForm.contactName,
    phone: requestForm.phone,
    companyName: requestForm.companyName,
    address: requestForm.address,
    city: requestForm.city,
    state: requestForm.state,
    postalCode: requestForm.postalCode,
    country: requestForm.country,
    emailList: requestForm.emailList
  }),
  (data) => {
    localStorage.setItem(
      'ums-request-info',
      JSON.stringify(data)
    )
  },
  { deep: true }
)
const route = useRoute()
const router = useRouter()
console.log('Route ID:', route.params.id)

function backToEquipment() {
  router.push('/equipment')
}

const machine = computed(() => {
  return machinesData.find(
    item => String(item.InvID) === String(route.params.id)
  )
})

const similarMachines = computed(() => {
  if (!machine.value) return []

  const current = machine.value

  return machinesData
    .filter(item =>
      String(item.InvID) !== String(current.InvID) &&
      Number(item.Sold || 0) === 0 &&
      Number(item.OffMarket || 0) === 0 &&
      Number(item.dont_advertise || 0) === 0 &&
      (
        item.WebDesc === current.WebDesc ||
        item.Groups === current.Groups
      )
    )
    .slice(0, 3)
})

function machineSlug(item) {
  return `${item.Manufacturer}-${item.Model}`
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

function getSimilarMachineImage(item) {
  const prefix = `${item.InvID}_`

  const image = imagesData.find(file =>
    file.toLowerCase().startsWith(prefix.toLowerCase())
  )

  return image ? `/Images/${image}` : ''
}

function goBack() {
  if (window.history.length > 1) {
    window.history.back()
  } else {
    navigateTo('/equipment')
  }
}

const machineDescription = computed(() => {
  return machineDescriptionsData.find(
    item => String(item.InvID) === String(route.params.id)
  )
})

const { data: machineImages } = await useFetch('/api/images', {
  query: { invID: route.params.id }
})

useSeoMeta({
  title: () => machine.value
    ? `${machine.value.Year} ${machine.value.Manufacturer} ${machine.value.Model} | Used Machinery Source`
    : 'Used Machinery Source',

  description: () => machine.value
    ? `${machine.value.Year} ${machine.value.Manufacturer} ${machine.value.Model}. ${machine.value.AdvSpec || ''} Stock #${machine.value.InvID}.`
    : 'Used CNC machinery and industrial equipment from Used Machinery Source.',

  ogTitle: () => machine.value
    ? `${machine.value.Year} ${machine.value.Manufacturer} ${machine.value.Model}`
    : 'Used Machinery Source',

  ogDescription: () => machine.value
    ? `${machine.value.AdvSpec || ''} Stock #${machine.value.InvID}.`
    : 'Used CNC machinery and industrial equipment from Used Machinery Source.',

  ogImage: () => machineImages.value?.length
  ? `https://www.usedmachinerysource.com/Images/${machineImages.value[0]}`
  : '',

ogUrl: `https://www.usedmachinerysource.com${route.path}`,

  ogType: 'website',

  twitterCard: 'summary_large_image',

  twitterTitle: () => machine.value
    ? `${machine.value.Year} ${machine.value.Manufacturer} ${machine.value.Model}`
    : 'Used Machinery Source',

  twitterDescription: () => machine.value
    ? `${machine.value.AdvSpec || ''} Stock #${machine.value.InvID}.`
    : 'Used CNC machinery and industrial equipment from Used Machinery Source.',

  twitterImage: () => machineImages.value?.length
  ? `https://www.usedmachinerysource.com/Images/${machineImages.value[0]}`
  : '',
})

useHead({
  link: [
    {
      rel: 'canonical',
      href: `https://www.usedmachinerysource.com${route.path}`
    }
  ]
})

const machineVideos = computed(() => {
  return videosData.filter(
    item => String(item.InvID) === String(route.params.id)
  )
})

const specifications = ref(specificationsData)

const machineSpecifications = computed(() => {
  return (specifications.value || []).filter(
    item =>
      String(item.invid) === String(route.params.id) &&
      item.description &&
      item.specvalues
  )
})

const machineEquipment = computed(() => {
  return (specifications.value || []).filter(
    item =>
      String(item.invid) === String(route.params.id) &&
      item.equippedwith
  )
})



console.log('machineImages:', machineImages.value)
</script>
<style scoped>
.machine-detail {
  max-width: 1320px;
  margin: 0 auto;
  padding: 40px 32px;
}

.machine-gallery {
  margin-top: 24px;
}

.main-image {
  background: #f5f7fa;
  border: 1px solid #d7dde5;
  border-radius: 10px;
  overflow: hidden;
  height: 600px;
}
.main-image img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  display: block;
}

.thumbnail-grid {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 16px;
  flex-wrap: nowrap;
}

.thumbnail {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border: 1px solid #d7dde5;
  border-radius: 5px;
}
.machine-top {
  display: grid;
  grid-template-columns: minmax(0, 0.85fr) minmax(0, 1.15fr);
  gap: 40px;
  align-items: start;
  direction: rtl;
}
.machine-info,
.machine-gallery {
  direction: ltr;
}

.machine-info {
  padding: 22px;
  margin-top: 26px;
}
.machine-details {
  margin-top: 18px;
  background: #f5f7fa;
  border: 1px solid #d7dde5;
  border-radius: 10px;
  padding: 18px 20px;
}

.machine-details > div {
  display: grid;
  grid-template-columns: 130px 1fr;
  gap: 16px;
  padding: 9px 0;
  border-bottom: 1px solid #d7dde5;
}

.machine-details span {
  text-align: left;
}
.availability-badge {
  display: inline-block;
  background: #e8f0fe;
  color: #1c4587;
  font-weight: 700;
  font-size: 12px;
  padding: 6px 12px;
  border-radius: 16px;
  margin-bottom: 12px;
}
  
.spec-row {
    display: grid;
    grid-template-columns: 1fr 180px;
    gap: 24px;
    padding: 11px 18px 11px 28px;
    border-left: 1px solid #d7dde5;
    border-right: 1px solid #d7dde5;
}

.spec-row:nth-of-type(odd) {
  background: #e9eef5;
}

.spec-row:nth-of-type(even) {
  background: #ffffff;
}

.spec-row:first-of-type {
  border-top: 1px solid #d7dde5;
  border-radius: 8px 8px 0 0;
}

.spec-row:last-of-type {
  border-bottom: 1px solid #d7dde5;
  border-radius: 0 0 8px 8px;
}

.spec-row strong {
    text-align: right;
    font-size: 17px;
}

.spec-row span {
    font-size: 17px;
    font-weight: 500;
}
.lower-grid {
  display: grid;
  grid-template-columns: 55% 1fr;
  gap: 32px;
  align-items: start;
  margin-top: 40px;
}

.lower-grid .specifications-section {
    width: 100%;
    border: 1px solid #d6dee8;
    border-radius: 12px;
    overflow: hidden;
    background: #fff;
}

.equipment-section {
    border: 1px solid #d6dee8;
    border-radius: 12px;
    overflow: hidden;
    background: #fff;
}
.equipment-row {
  display: block;
  margin-bottom: 6px;
  line-height: 1.45;
  font-size: 17px;
}

.equipment-row strong {
  display: block;
  color: #1c4587;
  margin-top: 12px;
  margin-bottom: 6px;
}

.equipment-row span {
  display: block;
  padding-left: 18px;
}

.equipment-row span::before {
  content: "•";
  margin-left: -14px;
  margin-right: 8px;
}
.spec-group {
    font-weight: 700;
    color: #1c4587;
    background: #dce6f1;
    padding: 5px 18px;
    border-top: 1px solid #c5d0dc;
    border-bottom: 1px solid #c5d0dc;
}
.specifications-section h2 {
    margin: 0;
    padding: 10px 18px;
    background: #f3f6fa;
    border-bottom: 1px solid #d7dde5;
}
.equipment-section h2 {
    margin: 0;
    padding: 10px 18px;
    background: #f3f6fa;
    border-bottom: 1px solid #d7dde5;
}

.equipment-section > div {
    padding-left: 18px;
    padding-right: 18px;
}
.request-info-button {
  margin-top: 0;
    background: #1c4587;
    color: #ffffff;
    border: none;
    border-radius: 8px;
    padding: 12px 22px;
    margin-left: 8px;
    font-size: 16px;
    font-weight: 700;
    width: 200px;
box-sizing: border-box;
    cursor: pointer;
}

.request-info-button:hover {
    background: #16386e;
}
.contact-buttons {
  display: flex;
  gap: 12px;
  align-items: center;
  margin-top: 20px;
}

.call-button {
  display: inline-block;
  background: #ffffff;
  color: #1c4587;
  border: 2px solid #1c4587;
  border-radius: 8px;
  padding: 11px 22px;
  font-size: 16px;
  font-weight: 700;
  width: 200px;
box-sizing: border-box;
text-align: center;
  text-decoration: none;
  cursor: pointer;
}

.request-modal-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.55);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
}

.request-modal {
    position: relative;
    width: 90%;
    max-width: 1000px;
    background: #ffffff;
    border-radius: 12px;
    padding: 28px;
    box-sizing: border-box;
}

.request-modal-close {
    position: absolute;
    top: 10px;
    right: 14px;
    border: none;
    background: transparent;
    font-size: 28px;
    cursor: pointer;
}

.request-form {
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    gap: 14px 18px;
    margin-top: 20px;
}
.form-question {
    grid-column: span 6;
}

.request-form textarea {
    grid-column: 1 / -1;
}

.request-form > label {
    display: flex;
    flex-direction: column;
    gap: 5px;
    font-weight: 600;
    font-size: 15px;
}
.request-form > label:last-of-type {
    grid-column: 1 / -1;
}

.request-form textarea {
    min-height: 120px;
}

.request-form input[type="text"],
.request-form input[type="email"],
.request-form input[type="tel"],
.request-form textarea {
    width: 100%;
    box-sizing: border-box;
    padding: 10px 12px;
    font-size: 16px;
    font-weight: 400;
    border: 1px solid #d6dee8;
    border-radius: 6px;
    background: #ffffff;
}

.request-form textarea {
    resize: vertical;
}

.form-question {
    display: flex;
    align-items: center;
    gap: 14px;
    font-size: 15px;
}

.form-question > span {
    font-weight: 600;
    margin-right: 4px;
}

.form-question label {
    display: flex;
    align-items: center;
    gap: 5px;
    font-weight: 400;
}

.request-form > label:nth-of-type(1),
.request-form > label:nth-of-type(2),
.request-form > label:nth-of-type(3) {
    grid-column: span 4;
}

.request-form > label:nth-of-type(4) {
    grid-column: span 4;
}

.request-form > label:nth-of-type(5) {
    grid-column: span 8;
}

.request-form > label:nth-of-type(6) {
    grid-column: span 5;
}

.request-form > label:nth-of-type(7) {
    grid-column: span 2;
}

.request-form > label:nth-of-type(8) {
    grid-column: span 2;
}

.request-form > label:nth-of-type(9) {
    grid-column: span 3;
}

.request-machine {
    font-size: 22px;
    font-weight: 700;
    color: #1c4587;
    margin-top: 6px;
    margin-bottom: 14px;
}

.request-form-actions {
    grid-column: 1 / -1;
    display: flex;
    justify-content: flex-end;
    margin-top: 4px;
}

.request-submit-button {
    background: #1c4587;
    color: #ffffff;
    border: none;
    border-radius: 8px;
    padding: 11px 24px;
    font-size: 16px;
    font-weight: 700;
    cursor: pointer;
}

.request-submit-button:hover {
    background: #16386e;
}

.request-form-actions {
    grid-column: 1 / -1;
    display: flex;
    justify-content: flex-end;
    gap: 10px;
    margin-top: 4px;
}

.request-cancel-button {
    background: #ffffff;
    color: #1c4587;
    border: 2px solid #1c4587;
    border-radius: 8px;
    padding: 9px 24px;
    font-size: 16px;
    font-weight: 700;
    cursor: pointer;
}

.request-clear-button {
    grid-column: 1 / 3;
    justify-self: start;
    background: transparent;
    color: #1c4587;
    border: none;
    padding: 6px 0;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    text-decoration: underline;
}
.request-success {
  margin-top: 14px;
  padding: 14px 18px;
  background: #eaf4ea;
  border: 2px solid #5b9b5b;
  border-radius: 8px;
  color: #245c24;
  font-size: 18px;
  font-weight: 700;
  text-align: center;
}
.video-thumbnail {
  position: relative;
  cursor: pointer;
}

.video-thumbnail-label {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.45);
  color: #ffffff;
  font-size: 15px;
  font-weight: 700;
  border-radius: 5px;
  pointer-events: none;
}
.main-image iframe {
  width: 100%;
  height: 100%;
  border: 0;
  display: block;
}
.thumbnail-arrow {
  width: 42px;
  height: 100px;
  border: 1px solid #9aa7b5;
  border-radius: 5px;
  background: #f3f5f7;
  color: #1c4587;
  font-size: 36px;
  font-weight: 700;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
}
.machine-highlights-title {
  margin-top: 16px;
  margin-bottom: 0;
  padding: 8px 12px;
  font-size: 18px;
  font-weight: 700;
  background: #e8eef5;
  border: 1px solid #d7dde5;
  border-bottom: none;
  border-radius: 8px 8px 0 0;
}
.machine-subtitle {
  margin-top: 6px;
  margin-bottom: 10px;
}
.adv-spec {
  margin-top: 0;
  margin-bottom: 16px;
  padding: 10px 12px;
  font-size: 16px;
  line-height: 1.4;
  border: 1px solid #d7dde5;
  border-top: none;
  border-radius: 0 0 8px 8px;
  background: #ffffff;
}
.machine-info h1 {
  font-size: 34px;
  line-height: 1.15;
  margin-top: 0;
  margin-bottom: 12px;
}

.back-to-equipment {
  display: inline-block;
  margin-bottom: 16px;
  padding: 8px 14px;
  background: transparent;
  color: #1c4587;
  border: 1px solid #1c4587;
  border-radius: 6px;
  font-weight: 700;
  font-size: 14px;
  cursor: pointer;
}

.back-to-equipment:hover {
  background: #1c4587;
  color: #ffffff;
}

@media (max-width: 900px) {
.machine-top {
  grid-template-columns: 1fr;
  gap: 24px;
}

.machine-gallery {
  order: 1;
  width: 100%;
}

.machine-info {
  order: 2;
  width: 100%;
  padding: 0;
  margin-top: 0;
}

.main-image {
  height: 420px;
}
.lower-grid {
  grid-template-columns: 1fr;
  gap: 24px;
}

.spec-row {
  grid-template-columns: 1fr;
  gap: 4px;
  padding: 10px 12px;
}

.spec-row strong {
  text-align: left;
}

.spec-row span {
  text-align: left;
}

.specifications-section,
.equipment-section {
  width: 100%;
}
.contact-buttons {
  flex-direction: column;
  align-items: stretch;
}

.request-info-button,
.call-button {
  width: 100%;
}
}

.machine-overview {
  margin-top: 28px;
  margin-bottom: 32px;
}

.machine-overview h2 {
  margin-bottom: 14px;
  font-size: 24px;
  color: #0b2545;
}

.machine-overview p {
  font-size: 16px;
  line-height: 1.6;
  margin-bottom: 14px;
}

.similar-machines {
  margin-top: 36px;
  margin-bottom: 36px;
}

.similar-machines h2 {
  margin-bottom: 18px;
  color: #0b2545;
  font-size: 24px;
}

.similar-machines-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 20px;
}

.similar-machine-card {
  border: 1px solid #d7dde5;
  border-radius: 8px;
  overflow: hidden;
  background: #ffffff;
  box-shadow: 0 2px 8px rgba(11, 37, 69, 0.08);
  display: flex;
  flex-direction: column;
  text-decoration: none;
  color: inherit;
}

.similar-machine-card img {
  width: 100%;
  height: 300px;
  object-fit: contain;
  background: #f7f7f7;
}

.similar-machine-info {
  padding: 18px;
  display: flex;
  flex-direction: column;
  flex: 1;
}

.similar-machine-info h3 {
  margin: 0 0 8px;
  color: #0b2545;
  font-size: 22px;
  font-weight: 700;
}

.similar-machine-info p {
  margin: 0 0 8px;
}

.similar-machine-info span {
  margin-top: auto;
  display: block;
  background: #1c4587;
  color: #ffffff;
  text-align: center;
  padding: 11px 16px;
  border-radius: 5px;
  font-weight: 700;
}

@media (max-width: 900px) {
  .similar-machines-grid {
    grid-template-columns: 1fr;
  }
}

.simple-back {
  display: block;
  align-self: flex-start;
  background: transparent;
  border: 0;
  padding: 4px 0;
  margin: 0 0 12px 0;
  color: #1c4587;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  text-align: left;
  direction: ltr;
}

.gallery-column {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  direction: ltr;
}

</style>