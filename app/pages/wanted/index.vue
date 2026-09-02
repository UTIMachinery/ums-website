<script setup lang="ts">
import { computed, ref } from 'vue'
import wantedsData from '~/assets/data/wanteds.json'

const searchTerm = ref('')
const selectedGroup = ref('All')
const selectedWebDesc = ref('All')

const wanteds = wantedsData as Array<{
  WtdID: number
  Code: string
  Groups: string
  WebDesc: string
  Description: string
  Featured: boolean
  FeatureOrder: number | null
}>

const groups = computed(() => [
  'All',
  ...Array.from(new Set(wanteds.map(w => w.Groups).filter(Boolean))).sort()
])

const webDescs = computed(() => {
  const source = selectedGroup.value === 'All'
    ? wanteds
    : wanteds.filter(w => w.Groups === selectedGroup.value)

  return [
    'All',
    ...Array.from(new Set(source.map(w => w.WebDesc).filter(Boolean))).sort()
  ]
})

const featuredWanteds = computed(() =>
  wanteds
    .filter(w => w.Featured)
    .sort((a, b) => (a.FeatureOrder ?? 9999) - (b.FeatureOrder ?? 9999))
)

const filteredWanteds = computed(() => {
  const term = searchTerm.value.trim().toLowerCase()

  return wanteds.filter(w => {
    const matchesGroup = selectedGroup.value === 'All' || w.Groups === selectedGroup.value
    const matchesWebDesc = selectedWebDesc.value === 'All' || w.WebDesc === selectedWebDesc.value
    const searchable = `${w.WebDesc} ${w.Description} ${w.Groups}`.toLowerCase()
    const matchesSearch = !term || searchable.includes(term)

    return matchesGroup && matchesWebDesc && matchesSearch
  })
})

function chooseGroup(group: string) {
  selectedGroup.value = group
  selectedWebDesc.value = 'All'
}

function resetFilters() {
  searchTerm.value = ''
  selectedGroup.value = 'All'
  selectedWebDesc.value = 'All'
}

function sellerLink(wtdId: number) {
  return `/sell-your-machine?wtd=${wtdId}`
}

useSeoMeta({
  title: 'Wanted Used Machinery | Used Machinery Source',
  description: 'See machinery our customers are actively looking to buy. Search current wanted CNC machines and other industrial equipment, or add your machinery requirement.'
})
</script>

<template>
  <main class="wanted-page">
    <section class="wanted-hero">
      <div class="hero-inner">
        <p class="eyebrow">WANTED MACHINERY</p>
        <h1>Machines Our Customers Are Looking For</h1>
        <p class="hero-copy">
          Browse current machinery requirements from customers actively looking to buy. If you have a machine that matches one of these requests, let us know.
        </p>
        <NuxtLink to="/equipment/request" class="primary-cta">Add My Wanted Machine</NuxtLink>
        <p class="no-cost">Looking for a machine? We can add your requirement to our Wanted Machines list at no cost.</p>
      </div>
    </section>

    <section v-if="featuredWanteds.length" class="section featured-section">
      <div class="section-heading">
        <div>
          <p class="eyebrow dark">FEATURED WANTEDS</p>
          <h2>Machines Buyers Are Looking For Now</h2>
        </div>
      </div>

      <div class="featured-scroll">
        <article v-for="wanted in featuredWanteds" :key="wanted.WtdID" class="wanted-card featured-card">
          <div class="wanted-label">WANTED</div>
          <div class="wanted-type">{{ wanted.WebDesc }}</div>
          <p class="wanted-description">{{ wanted.Description }}</p>
          <NuxtLink :to="sellerLink(wanted.WtdID)" class="card-button">I Have One of These to Sell</NuxtLink>
        </article>
      </div>
    </section>

    <section class="section browse-section">
      <div class="section-heading browse-heading">
        <div>
          <p class="eyebrow dark">SEARCH CURRENT WANTEDS</p>
          <h2>Find a Matching Requirement</h2>
        </div>
        <button type="button" class="reset-button" @click="resetFilters">Reset Search / View All Wanteds</button>
      </div>

      <div class="search-box">
        <label for="wanted-search">Search by manufacturer, model or keyword</label>
        <input
          id="wanted-search"
          v-model="searchTerm"
          type="search"
          placeholder="Example: Haas VF-3, Mazak, press brake, grinder..."
        >
      </div>

      <div class="filter-block">
        <h3>Browse by Machine Type</h3>
        <div class="filter-buttons">
          <button
            v-for="group in groups"
            :key="group"
            type="button"
            :class="['filter-button', { active: selectedGroup === group }]"
            @click="chooseGroup(group)"
          >
            {{ group }}
          </button>
        </div>
      </div>

      <div v-if="webDescs.length > 2 || selectedGroup !== 'All'" class="filter-block refine-block">
        <label for="wanted-type">Narrow by specific machine type</label>
        <select id="wanted-type" v-model="selectedWebDesc">
          <option v-for="desc in webDescs" :key="desc" :value="desc">
            {{ desc === 'All' ? 'All machine types' : desc }}
          </option>
        </select>
      </div>

      <div class="results-bar">
        <strong>{{ filteredWanteds.length }}</strong> wanted {{ filteredWanteds.length === 1 ? 'machine' : 'machines' }}
      </div>

      <div v-if="filteredWanteds.length" class="wanted-grid">
        <article v-for="wanted in filteredWanteds" :key="wanted.WtdID" class="wanted-card">
          <div class="card-topline">
            <span class="wanted-label">WANTED</span>
            <span class="wanted-number">#{{ wanted.WtdID }}</span>
          </div>
          <div class="wanted-type">{{ wanted.WebDesc }}</div>
          <p class="wanted-description">{{ wanted.Description }}</p>
          <NuxtLink :to="sellerLink(wanted.WtdID)" class="card-button">I Have One of These to Sell</NuxtLink>
        </article>
      </div>

      <div v-else class="no-results">
        <h3>No matching Wanteds found</h3>
        <p>Try another keyword or reset the filters to view all current machinery requirements.</p>
        <button type="button" class="reset-button" @click="resetFilters">View All Wanteds</button>
      </div>
    </section>

    <section class="bottom-cta">
      <div>
        <p class="eyebrow">LOOKING FOR A MACHINE?</p>
        <h2>Tell Us What You Need</h2>
        <p>Send us your machinery requirement and we'll add it to our Wanted Machines list at no cost.</p>
      </div>
      <NuxtLink to="/equipment/request" class="primary-cta">Add My Wanted Machine</NuxtLink>
    </section>
  </main>
</template>

<style scoped>
.wanted-page {
  background: #f5f7fa;
  color: #172033;
}

.wanted-hero {
  background: #071a2c;
  color: #fff;
  padding: 72px 32px;
}

.hero-inner,
.section,
.bottom-cta {
  max-width: 1320px;
  margin: 0 auto;
}

.hero-inner {
  max-width: 920px;
  margin-left: auto;
  margin-right: auto;
  text-align: center;
}

.eyebrow {
  margin: 0 0 12px;
  color: #f47b20;
  font-size: 0.82rem;
  font-weight: 800;
  letter-spacing: 0.14em;
}

.eyebrow.dark {
  color: #c95c12;
}

h1 {
  margin: 0;
  font-size: clamp(2.2rem, 5vw, 4rem);
  line-height: 1.05;
}

h2 {
  margin: 4px 0 0;
  font-size: clamp(1.7rem, 3vw, 2.45rem);
}

.hero-copy {
  max-width: 760px;
  margin: 22px auto 28px;
  color: #d9e1ea;
  font-size: 1.08rem;
  line-height: 1.7;
}

.no-cost {
  margin: 14px 0 0;
  color: #c7d1dc;
  font-size: 0.92rem;
}

.primary-cta,
.card-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  background: #e66d18;
  color: #fff;
  font-weight: 800;
  text-decoration: none;
  transition: transform 0.15s ease, background 0.15s ease;
}

.primary-cta {
  min-height: 48px;
  padding: 0 24px;
}

.primary-cta:hover,
.card-button:hover {
  background: #cc5c0e;
  transform: translateY(-1px);
}

.section {
  padding: 56px 32px;
}

.featured-section {
  padding-bottom: 20px;
}

.section-heading {
  display: flex;
  align-items: end;
  justify-content: space-between;
  gap: 24px;
  margin-bottom: 24px;
}

.featured-scroll {
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: minmax(300px, 390px);
  gap: 18px;
  overflow-x: auto;
  padding: 2px 2px 18px;
  scroll-snap-type: x mandatory;
  scrollbar-width: thin;
}

.featured-card {
  scroll-snap-align: start;
  border-top: 4px solid #e66d18;
}

.search-box,
.filter-block,
.refine-block {
  margin-bottom: 28px;
}

.search-box label,
.refine-block label,
.filter-block h3 {
  display: block;
  margin: 0 0 10px;
  font-weight: 800;
}

.search-box input,
.refine-block select {
  width: 100%;
  border: 1px solid #cbd3dc;
  border-radius: 5px;
  background: #fff;
  padding: 14px 16px;
  font: inherit;
}

.filter-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 9px;
}

.filter-button,
.reset-button {
  border: 1px solid #b9c3ce;
  border-radius: 5px;
  background: #fff;
  color: #172033;
  padding: 10px 14px;
  font: inherit;
  font-weight: 700;
  cursor: pointer;
}

.filter-button.active {
  border-color: #123b6d;
  background: #123b6d;
  color: #fff;
}

.reset-button:hover,
.filter-button:hover {
  border-color: #123b6d;
}

.results-bar {
  margin: 12px 0 18px;
  color: #596574;
}

.wanted-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 20px;
}

.wanted-card {
  display: flex;
  min-height: 260px;
  flex-direction: column;
  border: 1px solid #d7dde5;
  border-radius: 8px;
  background: #fff;
  padding: 22px;
  box-shadow: 0 3px 12px rgba(17, 32, 51, 0.05);
}

.card-topline {
  display: flex;
  justify-content: space-between;
  gap: 16px;
}

.wanted-label {
  color: #d35f10;
  font-size: 0.76rem;
  font-weight: 900;
  letter-spacing: 0.12em;
}

.wanted-number {
  color: #7a8490;
  font-size: 0.82rem;
}

.wanted-type {
  margin-top: 12px;
  color: #123b6d;
  font-size: 1.05rem;
  font-weight: 800;
}

.wanted-description {
  margin: 14px 0 22px;
  color: #343e4b;
  line-height: 1.55;
}

.card-button {
  width: 100%;
  min-height: 44px;
  margin-top: auto;
  padding: 0 14px;
  text-align: center;
}

.no-results {
  border: 1px solid #d7dde5;
  border-radius: 8px;
  background: #fff;
  padding: 40px;
  text-align: center;
}

.bottom-cta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 32px;
  margin-bottom: 64px;
  border-radius: 10px;
  background: #071a2c;
  color: #fff;
  padding: 38px 42px;
}

.bottom-cta h2 {
  margin: 0 0 8px;
}

.bottom-cta p:last-child {
  margin: 0;
  color: #d9e1ea;
}

@media (max-width: 960px) {
  .wanted-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .bottom-cta {
    margin-left: 24px;
    margin-right: 24px;
  }
}

@media (max-width: 680px) {
  .wanted-hero,
  .section {
    padding-left: 20px;
    padding-right: 20px;
  }

  .wanted-grid {
    grid-template-columns: 1fr;
  }

  .section-heading,
  .bottom-cta {
    align-items: stretch;
    flex-direction: column;
  }

  .featured-scroll {
    grid-auto-columns: 88%;
  }

  .bottom-cta {
    margin-left: 16px;
    margin-right: 16px;
    padding: 30px 24px;
  }
}
</style>
