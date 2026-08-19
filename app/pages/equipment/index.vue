<template>
  <main class="equipment-page">
 
  <div class="search-panel">
    <section class="equipment-intro">
      <h1>Equipment Search</h1>
      
      <div class="equipment-search">
      <div class="search-label">Search by Keyword</div>
        <input
        :value="searchTerm"
  @input="searchTerm = $event.target.value"
  type="search"
  placeholder="Search by manufacturer, model, or keyword"
/>
        
      </div> 
    </section>
    <div class="search-or">OR</div>

    <section class="equipment-categories">
  <div class="browse-heading">
  <h2>Search by Machine Type</h2>

  
</div>

  <div class="category-grid">
    <button
  v-if="categoryCounts.vmc > 0"
  type="button"
  @click="selectedCategory = 'vmc'; searchTerm = ''"
>
  CNC Vertical Machining Centers
</button>
    <button
  v-if="categoryCounts.hmc > 0"
  type="button"
  @click="selectedCategory = 'hmc'; searchTerm = ''"
>
  CNC Horizontal Machining Centers
</button>
    <button
  v-if="categoryCounts.lathe > 0"
  type="button"
  @click="selectedCategory = 'lathe'; searchTerm = ''"
>
  CNC Lathes & Turning Centers
</button>
    <button
  v-if="categoryCounts.boring > 0"
  type="button"
  @click="selectedCategory = 'boring'; searchTerm = ''"
>
  Boring Mills & VTLs
</button>
    <button
  v-if="categoryCounts.grinder > 0"
  type="button"
  @click="selectedCategory = 'grinder'; searchTerm = ''"
>
  Grinders
</button>
    <button
  v-if="categoryCounts.fabrication > 0"
  type="button"
  @click="selectedCategory = 'fabrication'; searchTerm = ''"
>
  Fabrication Equipment
</button>
    <button
  v-if="categoryCounts.inspection > 0"
  type="button"
  @click="selectedCategory = 'inspection'; searchTerm = ''"
>
  Inspection Equipment
</button>
    <button
  v-if="categoryCounts.other > 0"
  type="button"
  @click="selectedCategory = 'other'; searchTerm = ''"
>
  Other Machinery
</button>
  </div>
</section>

<div class="listing-heading">
    <button
  type="button"
  class="view-all-equipment-button"
  @click="selectedCategory = 'all'; searchTerm = ''"
>
    Reset Search / View All Equipment
  </button>
</div>

</div>
<section class="equipment-listing">
  

<div id="tell-us-what-you-need" class="machine-needed-callout">
  <div>
    <h3>Don't See What You're Looking For?</h3>
<p>
  Our inventory is constantly changing. If you don't see what you need—or would rather send us your requirements—tell us what you're looking for. We'll let you know what's available that fits your needs.
</p>
  </div>

  <button
    type="button"
    class="machine-needed-button"
    @click="showMachineNeededForm = true"
  >
    Tell Us What You Need
  </button>
  <div
  v-if="machineNeededSent"
  class="machine-needed-sent"
>
  Your message has been sent successfully.
</div>
</div>

  <article
  v-for="machine in filteredMachines"
  :key="machine.InvID"
  class="machine-card"
>
  <div class="machine-card-image">
    <img
      :src="machineCardImages[machine.InvID] ? `/Images/${machineCardImages[machine.InvID]}` : ''"
      :alt="`${machine.Year} ${machine.Manufacturer} ${machine.Model}`"
    />
  </div>

  <div class="machine-card-info">
    <h3>{{ machine.Year }} {{ machine.Manufacturer }} {{ machine.Model }}</h3>
    <p>{{ machine.WebDesc }}</p>
    <p class="stock-number"><strong>Stock #{{ machine.InvID }}</strong></p>
    <p class="adv-spec">{{ machine.AdvSpec }}</p>
    <NuxtLink
  :to="`/equipment/${machine.InvID}/${`${machine.Manufacturer}-${machine.Model}`.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')}`"
  class="view-machine-button"
>
  View Machine
</NuxtLink>
  </div>
</article>
<p v-if="filteredMachines.length === 0" class="no-results">
  No equipment found matching your search.
</p>
</section>
<div
  v-if="showMachineNeededForm"
  class="request-modal-overlay"
>
  <div class="request-modal">
    <button
      type="button"
      class="request-modal-close"
      @click="showMachineNeededForm = false"
    >
      ×
    </button>

    <h2>Machine Needed</h2>
    <p class="request-machine">
      Tell us what you're looking for.
    </p>

    <form
      class="request-form"
      @submit.prevent="submitMachineNeededForm"
    >
      <label>
        Email *
        <input
          v-model="machineNeededForm.email"
          type="email"
          autocomplete="email"
          required
        />
      </label>

      <label>
        Contact Name *
        <input
          v-model="machineNeededForm.contactName"
          type="text"
          required
        />
      </label>

      <label>
        Phone *
        <input
          v-model="machineNeededForm.phone"
          type="tel"
          required
        />
      </label>

      <label>
        Company Name
        <input
          v-model="machineNeededForm.companyName"
          type="text"
        />
      </label>

      <label>
        Address
        <input
          v-model="machineNeededForm.address"
          type="text"
        />
      </label>

      <label>
        City
        <input
          v-model="machineNeededForm.city"
          type="text"
        />
      </label>

      <label>
        State
        <input
          v-model="machineNeededForm.state"
          type="text"
        />
      </label>

      <label>
        Postal Code
        <input
          v-model="machineNeededForm.postalCode"
          type="text"
        />
      </label>

      <label>
        Country
        <input
          v-model="machineNeededForm.country"
          type="text"
        />
      </label>

      <fieldset class="request-radio-group">
        <legend>Have machines to sell or trade?</legend>

        <label>
          <input
            v-model="machineNeededForm.machinesToSell"
            type="radio"
            value="yes"
          />
          Yes
        </label>

        <label>
          <input
            v-model="machineNeededForm.machinesToSell"
            type="radio"
            value="no"
          />
          No
        </label>
      </fieldset>

      <fieldset class="request-radio-group">
        <legend>Sign up for email list?</legend>

        <label>
          <input
            v-model="machineNeededForm.emailList"
            type="radio"
            value="yes"
          />
          Yes
        </label>

        <label>
          <input
            v-model="machineNeededForm.emailList"
            type="radio"
            value="no"
          />
          No
        </label>
      </fieldset>

      <label class="request-message">
        Tell us what you're looking for *
        <textarea
          v-model="machineNeededForm.message"
          rows="5"
          required
        ></textarea>
      </label>

      <div class="request-form-actions">
  <button
    type="button"
    class="request-cancel-button"
    @click="showMachineNeededForm = false"
  >
    Cancel
  </button>

  <button
    type="submit"
    class="request-submit-button"
    :disabled="machineNeededSending"
  >
    {{ machineNeededSending ? 'Sending...' : 'Submit' }}
  </button>
</div>
    </form>
  </div>
</div>
  </main>
</template>
<script setup>
import machinesData from '~/assets/data/machines.json'
const selectedCategory = ref('all')
const searchTerm = ref('')
const showMachineNeededForm = ref(false)
const machineNeededSending = ref(false)
const machineNeededSent = ref(false)

const machineNeededForm = reactive({
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

async function submitMachineNeededForm() {
  machineNeededSending.value = true

  const payload = {
    inquiryType: 'machine-needed',
    contact: {
      email: machineNeededForm.email,
      contactName: machineNeededForm.contactName,
      phone: machineNeededForm.phone,
      companyName: machineNeededForm.companyName,
      address: machineNeededForm.address,
      city: machineNeededForm.city,
      state: machineNeededForm.state,
      postalCode: machineNeededForm.postalCode,
      country: machineNeededForm.country
    },
    machinesToSell: machineNeededForm.machinesToSell,
    emailList: machineNeededForm.emailList,
    message: machineNeededForm.message
  }

  try {
    await $fetch('/api/request-info', {
      method: 'POST',
      body: payload
    })

    showMachineNeededForm.value = false
    machineNeededSent.value = true

    machineNeededForm.message = ''
    machineNeededForm.machinesToSell = 'no'

    setTimeout(() => {
      machineNeededSent.value = false
    }, 7000)
  } catch (error) {
    console.error('Machine needed request failed:', error)
    alert('Your request could not be sent. Please try again.')
  } finally {
    machineNeededSending.value = false
  }
}

const machines = ref(machinesData)
const machineCardImages = ref({})
onMounted(async () => {
  const savedCategory = localStorage.getItem('ums-equipment-category')
  const savedSearch = localStorage.getItem('ums-equipment-search')

  if (savedCategory) {
    selectedCategory.value = savedCategory
  }

  if (savedSearch) {
    searchTerm.value = savedSearch
  }
 await loadMachineCardImages()
})
watch(selectedCategory, (value) => {
  localStorage.setItem('ums-equipment-category', value)
})

watch(searchTerm, (value) => {
  localStorage.setItem('ums-equipment-search', value)

  if (value.trim() !== '') {
    selectedCategory.value = 'all'
  }
})
async function loadMachineCardImages() {
  for (const machine of machines.value) {
    try {
      const files = await $fetch('/api/images', {
        query: { invID: machine.InvID }
      })

      if (files?.length) {
        machineCardImages.value[machine.InvID] = files[0]
      }
    } catch (error) {
      console.error(`Could not load image for ${machine.InvID}`, error)
    }
  }
}



const activeMachines = computed(() => {
  return (machines.value || []).filter(machine =>
    Number(machine.Sold) === 0 &&
    Number(machine.OffMarket) === 0 &&
    Number(machine.dont_advertise) === 0
  )
})

const filteredMachines = computed(() => {
  const term = searchTerm.value
  .trim()
  .toLowerCase()
  .replace(/[^a-z0-9]/g, '')

  return activeMachines.value.filter(machine => {
    const categoryMatch =
      selectedCategory.value === 'all' ||
      (selectedCategory.value === 'vmc' &&
        machine.WebDesc === 'CNC Machining Centers, Vertical') ||
      (selectedCategory.value === 'lathe' &&
        machine.WebDesc?.startsWith('CNC Lathes')) ||
      (selectedCategory.value === 'hmc' &&
        machine.WebDesc === 'CNC Machining Centers, Horizontal') ||
      (selectedCategory.value === 'boring' &&
        machine.Groups?.includes('Boring Mills')) ||
      (selectedCategory.value === 'grinder' &&
        machine.Groups?.includes('Grinders')) ||
      (selectedCategory.value === 'fabrication' &&
        machine.Groups?.includes('Fabrication')) ||
      (selectedCategory.value === 'inspection' &&
        machine.Groups?.includes('Inspection')) ||
      (selectedCategory.value === 'other' &&
        ![
          'CNC Machining Centers, Vertical',
          'CNC Machining Centers, Horizontal'
        ].includes(machine.WebDesc) &&
        !machine.WebDesc?.startsWith('CNC Lathes') &&
        !machine.Groups?.includes('Boring Mills') &&
        !machine.Groups?.includes('Grinders') &&
        !machine.Groups?.includes('Fabrication') &&
        !machine.Groups?.includes('Inspection'))

    const searchText = [
      machine.Year,
      machine.Manufacturer,
      machine.Model,
      machine.WebDesc,
      machine.AdvSpec,
      machine.InvID
    ]
      .filter(Boolean)
.join(' ')
.toLowerCase()
.replace(/[^a-z0-9]/g, '')

    const searchMatch = term === '' || searchText.includes(term)

    return categoryMatch && searchMatch
  })
})
const categoryCounts = computed(() => ({
  vmc: activeMachines.value.filter(
    machine => machine.WebDesc === 'CNC Machining Centers, Vertical'
  ).length,

  lathe: activeMachines.value.filter(
    machine => machine.WebDesc?.startsWith('CNC Lathes')
  ).length,

  hmc: activeMachines.value.filter(
    machine => machine.WebDesc === 'CNC Machining Centers, Horizontal'
  ).length,

  boring: activeMachines.value.filter(
    machine => machine.Groups?.includes('Boring Mills')
  ).length,

  grinder: activeMachines.value.filter(
    machine => machine.Groups?.includes('Grinders')
  ).length,

  fabrication: activeMachines.value.filter(
    machine => machine.Groups?.includes('Fabrication')
  ).length,

  inspection: activeMachines.value.filter(
  machine => machine.Groups?.includes('Inspection')
).length,

other: activeMachines.value.filter(machine =>
  machine.WebDesc !== 'CNC Machining Centers, Vertical' &&
  machine.WebDesc !== 'CNC Machining Centers, Horizontal' &&
  !machine.WebDesc?.startsWith('CNC Lathes') &&
  !machine.Groups?.includes('Boring Mills') &&
  !machine.Groups?.includes('Grinders') &&
  !machine.Groups?.includes('Fabrication') &&
  !machine.Groups?.includes('Inspection')
).length
}))
</script>
<style scoped>
.search-panel {
  background: #fafbfc;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  padding: 24px;
  margin-bottom: 24px;
}
.search-label {
  margin: 0;
  font-weight: 600;
  font-size: 20px;
  white-space: nowrap;
}

.search-or {
  display: flex;
  align-items: center;
  width: 100%;
  gap: 12px;
  margin: 14px 0 18px 0;
  font-size: 14px;
  font-weight: 700;
}
.search-or::before,
.search-or::after {
  content: "";
  flex: 1;
  border-top: 1px solid #c6ccd2;
}

.browse-heading {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-top: 14px;
  margin-bottom: 12px;
}

.browse-heading h2 {
  margin: 0;
  font-size: 20px;
  font-weight: 600;
}

.reset-search-button {
  padding: 8px 14px;
  border: 1px solid #1c4587;
  border-radius: 5px;
  background: white;
  color: #1c4587;
  font-weight: 600;
  cursor: pointer;
  margin-top: 12px;
}

.reset-search-button:hover {
  background: #1c4587;
  color: white;
}
.equipment-page {
  max-width: 1400px;
  margin: 0 auto;
  padding: 40px 32px;
}

.equipment-intro h1 {
  margin: 0;
  margin-bottom: 20px;
  color: #0d2545;
  font-size: 30px;
  font-weight: 700;
  text-align: center;
  background: #f4f7fb;
  border-bottom: 1px solid #d9e1ea;
  padding: 16px 14px;
}



.equipment-search {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  margin-bottom: 12px;
  
}

.equipment-search input {
  flex: none;
  width: 700px;
max-width: 100%;
  height: 46px;
}

.equipment-search button {
  padding: 0 26px;
  border: 0;
  border-radius: 0 5px 5px 0;
  background: #0b2545;
  color: white;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
}

.equipment-search button:hover {
  background: #1c4587;
  color: #ffffff;
}

.category-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
  margin-top: 12px;
}

.category-grid button {
  padding: 16px 12px;
  background: #ffffff;
  border: 1px solid #b8c2cf;
  border-radius: 6px;
  color: #0b2545;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
}

.category-grid button:hover {
  background: #1c4587;
  color: #ffffff;
  border-color: #1c4587;
}
.equipment-listing {
  margin-top: 28px;
}

.equipment-listing {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

.equipment-listing h2 {
  grid-column: 1 / -1;
}
.machine-card-image {
  width: 100%;
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f7f7f7;
}

.machine-card-image img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}
.machine-card {
  border: 1px solid #d7dde5;
  border-radius: 8px;
  overflow: hidden;
  background: #ffffff;
  box-shadow: 0 2px 8px rgba(11, 37, 69, 0.08);
  display: flex;
  flex-direction: column;
}

.machine-card-info {
  padding: 18px;
  display: flex;
flex-direction: column;
flex: 1;
}

.machine-card-info h3 {
  margin: 0 0 8px;
  color: #0b2545;
  font-size: 22px;
  font-weight: 700;
}

.machine-card-info p {
  margin: 0 0 8px;
}

.stock-number {
  color: #5d6773;
  font-size: 14px;
}

.adv-spec {
  color: #3f4852;
  font-size: 14px;
  line-height: 1.45;
}

.machine-card-info button {
  margin-top: auto;
  padding: 10px 16px;
  border: 0;
  border-radius: 5px;
  background: #0b2545;
  color: white;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
}
.listing-heading {
  grid-column: 1 / -1;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 16px;
  text-align: center;
}

.listing-heading h2 {
  margin: 0;
}

.listing-heading button {
  padding: 8px 14px;
  border: 1px solid #0b2545;
  border-radius: 5px;
  background: #ffffff;
  color: #0b2545;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
}
@media (max-width: 900px) {
  .category-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .equipment-listing {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media (max-width: 600px) {
  .equipment-page {
    padding: 24px 16px;
  }

  .category-grid {
    grid-template-columns: 1fr;
  }

  .equipment-listing {
    grid-template-columns: 1fr;
  }

  .equipment-search {
    flex-direction: column;
  }

  .equipment-search input {
    border-radius: 5px;
  }

  .equipment-search button {
    margin-top: 8px;
    padding: 12px 16px;
    border-radius: 5px;
  }
}

.view-machine-button {
  display: inline-block;
  margin-top: 10px;
  padding: 10px 18px;
  background: #1c4587;
  color: #ffffff;
  text-decoration: none;
  font-weight: 700;
  border-radius: 6px;
  border: 1px solid #1c4587;
  transition: background 0.2s ease;
}

.view-machine-button:hover {
  background: #16386f;
}

.view-all-equipment-button {
  background: transparent;
  color: #1c4587;
  border: 1px solid #1c4587;
  border-radius: 6px;
  font-weight: 700;
  margin-top: 24px;
padding: 9px 16px;
  cursor: pointer;
}

.view-all-equipment-button:hover {
  background: #1c4587;
  color: #ffffff;
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
.request-radio-group {
  grid-column: span 6;
  min-width: 0;
}
.machine-needed-callout {
  grid-column: 1 / -1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  margin: 14px 0 28px;
  padding: 28px 26px;
  background: #f4f7fb;
  border: 1px solid #cfd8e6;
  border-left: 6px solid #1c4587;
  border-radius: 6px;
}

.machine-needed-callout h3 {
  margin: 0 0 8px;
  font-size: 25px;
  font-weight: 800;
  color: #1c4587;
}

.machine-needed-callout p {
  margin: 0;
  font-size: 16px;
  line-height: 1.5;
}

.machine-needed-button {
  flex: 0 0 auto;
  background: #1c4587;
  color: #ffffff;
  border: none;
  border-radius: 5px;
  padding: 12px 18px;
  font-size: 15px;
  font-weight: 700;
  cursor: pointer;
  white-space: nowrap;
}

.machine-needed-button:hover {
  background: #16386e;
}
.machine-needed-sent {
  background: #e8f5e9;
  color: #1b5e20;
  border: 1px solid #a5d6a7;
  border-radius: 6px;
  padding: 10px 14px;
  font-size: 15px;
  font-weight: 600;
  line-height: 1.3;
  margin-left: 14px;
}
</style>