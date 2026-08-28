<template>
  <main class="equipment-page">
    <section class="equipment-hero">
      <div class="equipment-hero-inner">
        <div class="hero-kicker">USED CNC MACHINERY &amp; EQUIPMENT</div>
        <h1>Find the Right Machine.</h1>
        <p>Search our current inventory of quality used machinery.</p>
      </div>
    </section>

    <section class="search-panel">
      <h2>Search Our Inventory</h2>

      <div class="equipment-search">
        <label class="search-label" for="equipment-keyword">Search by Keyword</label>
        <input
          id="equipment-keyword"
          :value="searchTerm"
          @input="searchTerm = $event.target.value"
          type="search"
          placeholder="Search by manufacturer, model, or keyword"
        />
      </div>

      <div class="search-or">OR</div>

      <section class="equipment-categories">
        <div class="browse-heading">
          <h2>Browse by Machine Type</h2>
        </div>

        <div class="category-grid">
          <button
            v-for="category in visibleMachineGroups"
            :key="category"
            type="button"
            :class="{ active: selectedCategory === category }"
            @click="selectCategory(category)"
          >
            {{ category }}
          </button>
        </div>
      </section>

      <div class="listing-heading">
        <button type="button" class="view-all-equipment-button" @click="resetSearch">Reset Search / View All Equipment</button>
      </div>
    </section>

    <section class="equipment-listing">
      <div id="tell-us-what-you-need" class="machine-needed-callout">
        <div class="machine-needed-copy">
          <h3>Don't See What You're Looking For?</h3>
          <p>Our inventory is constantly changing. If you don't see what you need—or would rather send us your requirements—tell us what you're looking for. We'll let you know what's available that fits your needs.</p>
        </div>
        <button type="button" class="machine-needed-button" @click="showMachineNeededForm = true">Tell Us What You Need</button>
        <div v-if="machineNeededSent" class="machine-needed-sent">Your message has been sent successfully.</div>
      </div>

      <h2 class="current-inventory-heading">Current Inventory</h2>

      <article v-for="machine in filteredMachines" :key="machine.InvID" class="machine-card">
        <div class="machine-card-image">
          <img :src="machineCardImages[machine.InvID] ? `/Images/${machineCardImages[machine.InvID]}` : ''" :alt="`${machine.Year} ${machine.Manufacturer} ${machine.Model}`" />
        </div>
        <div class="machine-card-info">
          <h3>{{ machine.Year }} {{ machine.Manufacturer }} {{ machine.Model }}</h3>
          <p>{{ webDescription(machine) }}</p>
          <p class="stock-number"><strong>Stock #{{ machine.InvID }}</strong></p>
          <p class="adv-spec">{{ advertisingSpec(machine) }}</p>
          <NuxtLink :to="`/equipment/${machine.InvID}/${`${machine.Manufacturer}-${machine.Model}`.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')}`" class="view-machine-button">View Machine</NuxtLink>
        </div>
      </article>

      <p v-if="filteredMachines.length === 0" class="no-results">No equipment found matching your search.</p>
    </section>

    <div v-if="showMachineNeededForm" class="request-modal-overlay">
      <div class="request-modal">
        <button type="button" class="request-modal-close" @click="showMachineNeededForm = false">×</button>
        <h2>Machine Needed</h2>
        <p class="request-machine">Tell us what you're looking for.</p>

        <form class="request-form" @submit.prevent="submitMachineNeededForm">
          <label>Email *<input v-model="machineNeededForm.email" type="email" autocomplete="email" required /></label>
          <label>Contact Name *<input v-model="machineNeededForm.contactName" type="text" required /></label>
          <label>Phone *<input v-model="machineNeededForm.phone" type="tel" required /></label>
          <label>Company Name<input v-model="machineNeededForm.companyName" type="text" /></label>
          <label>Address<input v-model="machineNeededForm.address" type="text" /></label>
          <label>City<input v-model="machineNeededForm.city" type="text" /></label>
          <label>State<input v-model="machineNeededForm.state" type="text" /></label>
          <label>Postal Code<input v-model="machineNeededForm.postalCode" type="text" /></label>
          <label>Country<input v-model="machineNeededForm.country" type="text" /></label>

          <fieldset class="request-radio-group">
            <legend>Have machines to sell or trade?</legend>
            <label><input v-model="machineNeededForm.machinesToSell" type="radio" value="yes" /> Yes</label>
            <label><input v-model="machineNeededForm.machinesToSell" type="radio" value="no" /> No</label>
          </fieldset>

          <fieldset class="request-radio-group">
            <legend>Sign up for email list?</legend>
            <label><input v-model="machineNeededForm.emailList" type="radio" value="yes" /> Yes</label>
            <label><input v-model="machineNeededForm.emailList" type="radio" value="no" /> No</label>
          </fieldset>

          <label class="request-message">Tell us what you're looking for *<textarea v-model="machineNeededForm.message" rows="5" required></textarea></label>

          <div class="request-form-actions">
            <button type="button" class="request-cancel-button" @click="showMachineNeededForm = false">Cancel</button>
            <button type="submit" class="request-submit-button" :disabled="machineNeededSending">{{ machineNeededSending ? 'Sending...' : 'Submit' }}</button>
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
  email: '', contactName: '', phone: '', companyName: '', address: '', city: '', state: '', postalCode: '', country: '', machinesToSell: 'no', emailList: 'yes', message: ''
})

const machines = ref(machinesData)
const machineCardImages = ref({})
const webDescription = (machine) => machine.WebDesc || machine.Web_Desc || ''
const advertisingSpec = (machine) => machine.AdvSpec || machine.Adv_Spec || ''
const groupName = (machine) => machine.Groups || ''
const offMarketValue = (machine) => machine.OffMarket ?? machine.Off_Market ?? 0

function selectCategory(category) {
  selectedCategory.value = category
  searchTerm.value = ''
}

function resetSearch() {
  selectedCategory.value = 'all'
  searchTerm.value = ''
}

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
    await $fetch('/api/request-info', { method: 'POST', body: payload })
    showMachineNeededForm.value = false
    machineNeededSent.value = true
    machineNeededForm.message = ''
    machineNeededForm.machinesToSell = 'no'
    setTimeout(() => { machineNeededSent.value = false }, 7000)
  } catch (error) {
    console.error('Machine needed request failed:', error)
    alert('Your request could not be sent. Please try again.')
  } finally {
    machineNeededSending.value = false
  }
}

onMounted(async () => {
  const savedCategory = localStorage.getItem('ums-equipment-category')
  const savedSearch = localStorage.getItem('ums-equipment-search')

  if (savedCategory === 'all' || visibleMachineGroups.value.includes(savedCategory)) {
    selectedCategory.value = savedCategory
  } else {
    selectedCategory.value = 'all'
  }

  if (savedSearch) searchTerm.value = savedSearch
  await loadMachineCardImages()
})

watch(selectedCategory, (value) => localStorage.setItem('ums-equipment-category', value))
watch(searchTerm, (value) => {
  localStorage.setItem('ums-equipment-search', value)
  if (value.trim() !== '') selectedCategory.value = 'all'
})

async function loadMachineCardImages() {
  for (const machine of machines.value) {
    try {
      const files = await $fetch('/api/images', { query: { invID: machine.InvID } })
      if (files?.length) machineCardImages.value[machine.InvID] = files[0]
    } catch (error) {
      console.error(`Could not load image for ${machine.InvID}`, error)
    }
  }
}

const activeMachines = computed(() => (machines.value || []).filter(machine =>
  Number(machine.Sold) === 0 && Number(offMarketValue(machine)) === 0 && Number(machine.dont_advertise) === 0
))

const visibleMachineGroups = computed(() => [
  ...new Set(activeMachines.value.map(machine => machine.Groups).filter(group => group !== null && group !== undefined && group !== ''))
].sort((a, b) => a.localeCompare(b)))

const filteredMachines = computed(() => {
  const term = searchTerm.value.trim().toLowerCase().replace(/[^a-z0-9]/g, '')

  return activeMachines.value.filter(machine => {
    const desc = webDescription(machine)
    const group = groupName(machine)
    const categoryMatch = selectedCategory.value === 'all' || group === selectedCategory.value

    const searchText = [
      machine.Year,
      machine.Manufacturer,
      machine.Model,
      desc,
      group,
      advertisingSpec(machine),
      machine.Description,
      machine.Code,
      machine.InvID
    ]
      .filter(Boolean)
      .join(' ')
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '')

    return categoryMatch && (term === '' || searchText.includes(term))
  })
})
</script>

<style scoped>
.equipment-page { padding: 0 0 48px; }
.equipment-hero { background: linear-gradient(105deg, #071b33 0%, #0b2545 62%, #0d2c52 100%); color: #fff; }
.equipment-hero-inner { max-width: 1320px; margin: 0 auto; padding: 52px 32px 48px; }
.hero-kicker { color: #f47b20; font-size: 13px; font-weight: 800; letter-spacing: .08em; margin-bottom: 12px; }
.equipment-hero h1 { margin: 0 0 10px; font-size: clamp(36px, 4vw, 52px); line-height: 1.05; font-family: Georgia, 'Times New Roman', serif; font-weight: 700; }
.equipment-hero p { margin: 0; font-size: 17px; line-height: 1.5; color: #e8eef5; }
.search-panel, .equipment-listing { max-width: 1320px; margin-left: auto; margin-right: auto; padding-left: 32px; padding-right: 32px; }
.search-panel { padding-top: 38px; padding-bottom: 28px; }
.search-panel > h2, .browse-heading h2, .current-inventory-heading { margin: 0; color: #0b2545; font-family: Georgia, 'Times New Roman', serif; font-weight: 700; }
.search-panel > h2 { font-size: 26px; margin-bottom: 22px; }
.equipment-search { display: flex; flex-direction: column; gap: 8px; }
.search-label { color: #0b2545; font-size: 14px; font-weight: 700; }
.equipment-search input { width: min(760px, 100%); height: 44px; box-sizing: border-box; padding: 0 14px; border: 1px solid #cfd8e3; border-radius: 4px; background: #fff; color: #17273a; font-size: 15px; }
.equipment-search input:focus { outline: 2px solid rgba(28,69,135,.16); border-color: #1c4587; }
.search-or { display: flex; align-items: center; width: 100%; gap: 14px; margin: 20px 0; color: #24364a; font-size: 12px; font-weight: 800; }
.search-or::before, .search-or::after { content: ''; flex: 1; border-top: 1px solid #d6dde6; }
.browse-heading { margin-bottom: 14px; }
.browse-heading h2 { font-size: 20px; font-family: inherit; font-weight: 700; }
.category-grid { display: grid; grid-template-columns: repeat(4,minmax(0,1fr)); gap: 10px; }
.category-grid button { min-height: 48px; padding: 10px 12px; background: #fff; border: 1px solid #b9c7d8; border-radius: 5px; color: #0b2545; font-size: 14px; font-weight: 700; cursor: pointer; transition: background .15s ease,color .15s ease,border-color .15s ease; }
.category-grid button:hover, .category-grid button.active { background: #1c4587; color: #fff; border-color: #1c4587; }
.listing-heading { display: flex; justify-content: center; margin-top: 18px; }
.view-all-equipment-button { padding: 10px 17px; background: #0b2545; color: #fff; border: 1px solid #0b2545; border-radius: 5px; font-size: 13px; font-weight: 700; cursor: pointer; }
.view-all-equipment-button:hover { background: #1c4587; border-color: #1c4587; }
.equipment-listing { display: grid; grid-template-columns: repeat(3,minmax(0,1fr)); gap: 20px; }
.machine-needed-callout { grid-column: 1/-1; display: flex; align-items: center; gap: 24px; margin: 4px 0 10px; padding: 24px 26px; background: linear-gradient(105deg,#071b33 0%,#0b2545 100%); border-left: 5px solid #f47b20; border-radius: 6px; color: #fff; }
.machine-needed-copy { flex: 1; }
.machine-needed-callout h3 { margin: 0 0 7px; color: #fff; font-size: 21px; font-weight: 800; }
.machine-needed-callout p { margin: 0; color: #e8eef5; font-size: 14px; line-height: 1.55; }
.machine-needed-button { flex: 0 0 auto; background: #f47b20; color: #fff; border: 1px solid #f47b20; border-radius: 5px; padding: 11px 18px; font-size: 14px; font-weight: 800; cursor: pointer; white-space: nowrap; }
.machine-needed-button:hover { background: #d96512; border-color: #d96512; }
.machine-needed-sent { flex: 0 0 auto; background: #e8f5e9; color: #1b5e20; border: 1px solid #a5d6a7; border-radius: 5px; padding: 9px 12px; font-size: 13px; font-weight: 700; }
.current-inventory-heading { grid-column: 1/-1; font-size: 24px; margin: 8px 0 0; }
.machine-card { border: 1px solid #d7dde5; border-radius: 7px; overflow: hidden; background: #fff; box-shadow: 0 2px 8px rgba(11,37,69,.07); display: flex; flex-direction: column; }
.machine-card-image { width: 100%; height: 300px; display: flex; align-items: center; justify-content: center; background: #f7f8fa; }
.machine-card-image img { width: 100%; height: 100%; object-fit: contain; }
.machine-card-info { padding: 18px; display: flex; flex-direction: column; flex: 1; }
.machine-card-info h3 { margin: 0 0 8px; color: #0b2545; font-size: 21px; font-weight: 700; }
.machine-card-info p { margin: 0 0 8px; }
.stock-number { color: #5d6773; font-size: 14px; }
.adv-spec { color: #3f4852; font-size: 14px; line-height: 1.45; }
.view-machine-button { display: inline-block; align-self: flex-start; margin-top: auto; padding: 10px 18px; background: #1c4587; color: #fff; text-decoration: none; font-weight: 700; border-radius: 5px; border: 1px solid #1c4587; transition: background .2s ease; }
.view-machine-button:hover { background: #16386f; }
.no-results { grid-column: 1/-1; padding: 24px 0; color: #5d6773; text-align: center; }
.request-modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,.55); display: flex; align-items: center; justify-content: center; z-index: 1000; padding: 20px; }
.request-modal { position: relative; width: 100%; max-width: 1000px; max-height: 90vh; overflow-y: auto; background: #fff; border-radius: 12px; padding: 28px; box-sizing: border-box; }
.request-modal-close { position: absolute; top: 10px; right: 14px; border: none; background: transparent; font-size: 28px; cursor: pointer; }
.request-machine { font-size: 22px; font-weight: 700; color: #1c4587; margin-top: 6px; margin-bottom: 14px; }
.request-form { display: grid; grid-template-columns: repeat(12,1fr); gap: 14px 18px; margin-top: 20px; }
.request-form > label { display: flex; flex-direction: column; gap: 5px; font-weight: 600; font-size: 15px; }
.request-form > label:nth-of-type(1), .request-form > label:nth-of-type(2), .request-form > label:nth-of-type(3) { grid-column: span 4; }
.request-form > label:nth-of-type(4) { grid-column: span 4; }
.request-form > label:nth-of-type(5) { grid-column: span 8; }
.request-form > label:nth-of-type(6) { grid-column: span 5; }
.request-form > label:nth-of-type(7), .request-form > label:nth-of-type(8) { grid-column: span 2; }
.request-form > label:nth-of-type(9) { grid-column: span 3; }
.request-form > label:last-of-type { grid-column: 1/-1; }
.request-form input[type='text'], .request-form input[type='email'], .request-form input[type='tel'], .request-form textarea { width: 100%; box-sizing: border-box; padding: 10px 12px; font-size: 16px; font-weight: 400; border: 1px solid #d6dee8; border-radius: 6px; background: #fff; }
.request-form textarea { min-height: 120px; resize: vertical; }
.request-radio-group { grid-column: span 6; min-width: 0; }
.request-radio-group label { margin-right: 14px; }
.request-form-actions { grid-column: 1/-1; display: flex; justify-content: flex-end; gap: 10px; margin-top: 4px; }
.request-submit-button, .request-cancel-button { border-radius: 8px; padding: 10px 24px; font-size: 16px; font-weight: 700; cursor: pointer; }
.request-submit-button { background: #1c4587; color: #fff; border: 2px solid #1c4587; }
.request-cancel-button { background: #fff; color: #1c4587; border: 2px solid #1c4587; }
@media (max-width:900px) { .category-grid { grid-template-columns: repeat(2,minmax(0,1fr)); } .equipment-listing { grid-template-columns: repeat(2,minmax(0,1fr)); } .machine-needed-callout { flex-wrap: wrap; } }
@media (max-width:600px) { .equipment-hero-inner, .search-panel, .equipment-listing { padding-left: 16px; padding-right: 16px; } .equipment-hero-inner { padding-top: 38px; padding-bottom: 36px; } .category-grid, .equipment-listing { grid-template-columns: 1fr; } .machine-needed-callout { flex-direction: column; align-items: flex-start; } .machine-needed-button { width: 100%; } .request-form { grid-template-columns: 1fr; } .request-form > label, .request-form > label:nth-of-type(n), .request-radio-group, .request-form-actions { grid-column: 1/-1; } }
</style>