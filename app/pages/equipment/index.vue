<template>
  <main class="equipment-page">
    <section class="equipment-intro">
      <h1>Equipment</h1>

      <div class="equipment-search">
        <input
        :value="searchTerm"
  @input="searchTerm = $event.target.value"
  type="search"
  placeholder="Search by manufacturer, model, or keyword"
/>
        
      </div> 
    </section><section class="equipment-categories">
  <h2>Browse by Machine Type</h2>

  <div class="category-grid">
    <button
  v-if="categoryCounts.vmc > 0"
  type="button"
  @click="selectedCategory = 'vmc'"
>
  CNC Vertical Machining Centers
</button>
    <button
  v-if="categoryCounts.hmc > 0"
  type="button"
  @click="selectedCategory = 'hmc'"
>
  CNC Horizontal Machining Centers
</button>
    <button
  v-if="categoryCounts.lathe > 0"
  type="button"
  @click="selectedCategory = 'lathe'"
>
  CNC Lathes & Turning Centers
</button>
    <button
  v-if="categoryCounts.boring > 0"
  type="button"
  @click="selectedCategory = 'boring'"
>
  Boring Mills & VTLs
</button>
    <button
  v-if="categoryCounts.grinder > 0"
  type="button"
  @click="selectedCategory = 'grinder'"
>
  Grinders
</button>
    <button
  v-if="categoryCounts.fabrication > 0"
  type="button"
  @click="selectedCategory = 'fabrication'"
>
  Fabrication Equipment
</button>
    <button
  v-if="categoryCounts.inspection > 0"
  type="button"
  @click="selectedCategory = 'inspection'"
>
  Inspection Equipment
</button>
    <button
  v-if="categoryCounts.other > 0"
  type="button"
  @click="selectedCategory = 'other'"
>
  Other Machinery
</button>
  </div>
</section>

<section class="equipment-listing">
  <div class="listing-heading">
  <h2>Available Equipment</h2>
  <button
  type="button"
  class="view-all-equipment-button"
  @click="selectedCategory = 'all'; searchTerm = ''"
>
    View All Equipment
  </button>
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
  </main>
</template>
<script setup>
import machinesData from '~/assets/data/machines.json'
const selectedCategory = ref('all')
const searchTerm = ref('')
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
  const term = searchTerm.value.trim().toLowerCase()

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
.equipment-page {
  max-width: 1400px;
  margin: 0 auto;
  padding: 40px 32px;
}

.equipment-intro h1 {
  margin: 0 0 22px;
  color: #0b2545;
  font-size: 34px;
  font-weight: 700;
}



.equipment-search {
  display: flex;
  max-width: 720px;
}

.equipment-search input {
  flex: 1;
  padding: 14px 16px;
  border: 1px solid #c9cdd2;
  border-radius: 5px 0 0 5px;
  font-size: 16px;
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
  justify-content: space-between;
  margin-bottom: 16px;
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
  cursor: pointer;
}

.view-all-equipment-button:hover {
  background: #1c4587;
  color: #ffffff;
}
</style>