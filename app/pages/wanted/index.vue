<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import wantedsData from '~/assets/data/wanteds.json'

const searchTerm = ref('')
const selectedGroup = ref('All')
const selectedWebDesc = ref('All')
const selectedWanted = ref<any>(null)
const featuredScroll = ref<HTMLElement | null>(null)
const sellerSending = ref(false)
const sellerSent = ref(false)
const sellerError = ref(false)

const sellerForm = reactive({
  contactName: '', companyName: '', email: '', phone: '',
  year: '', manufacturer: '', model: '', location: '', details: ''
})

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
  const source = selectedGroup.value === 'All' ? wanteds : wanteds.filter(w => w.Groups === selectedGroup.value)
  return ['All', ...Array.from(new Set(source.map(w => w.WebDesc).filter(Boolean))).sort()]
})

const featuredWanteds = computed(() =>
  wanteds.filter(w => w.Featured).sort((a, b) => (a.FeatureOrder ?? 9999) - (b.FeatureOrder ?? 9999))
)

const filteredWanteds = computed(() => {
  const term = searchTerm.value.trim().toLowerCase()
  return wanteds
    .filter(w => {
      const matchesGroup = selectedGroup.value === 'All' || w.Groups === selectedGroup.value
      const matchesWebDesc = selectedWebDesc.value === 'All' || w.WebDesc === selectedWebDesc.value
      const searchable = `${w.WebDesc} ${w.Description} ${w.Groups}`.toLowerCase()
      return matchesGroup && matchesWebDesc && (!term || searchable.includes(term))
    })
    .sort((a, b) => {
      const typeCompare = (a.WebDesc || 'Other Machinery').localeCompare(b.WebDesc || 'Other Machinery')
      return typeCompare || a.WtdID - b.WtdID
    })
})

const groupedWanteds = computed(() => {
  const grouped = new Map<string, typeof filteredWanteds.value>()
  for (const wanted of filteredWanteds.value) {
    const type = wanted.WebDesc || 'Other Machinery'
    if (!grouped.has(type)) grouped.set(type, [])
    grouped.get(type)!.push(wanted)
  }
  return Array.from(grouped, ([type, items]) => ({ type, items }))
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

function scrollFeatured(direction: number) {
  featuredScroll.value?.scrollBy({ left: direction * 410, behavior: 'smooth' })
}

function openSellerForm(wanted: any) {
  selectedWanted.value = wanted
  sellerSent.value = false
  sellerError.value = false
}

function closeSellerForm() {
  selectedWanted.value = null
  sellerSent.value = false
  sellerError.value = false
}

async function submitSellerForm() {
  if (!selectedWanted.value) return
  sellerSending.value = true
  sellerSent.value = false
  sellerError.value = false

  try {
    await $fetch('/api/site-inquiry', {
      method: 'POST',
      body: {
        inquiryType: 'wanted-response',
        wtdId: selectedWanted.value.WtdID,
        wantedType: selectedWanted.value.WebDesc,
        wantedDescription: selectedWanted.value.Description,
        contact: {
          contactName: sellerForm.contactName,
          companyName: sellerForm.companyName,
          email: sellerForm.email,
          phone: sellerForm.phone
        },
        machine: {
          year: sellerForm.year,
          manufacturer: sellerForm.manufacturer,
          model: sellerForm.model,
          location: sellerForm.location
        },
        message: sellerForm.details
      }
    })
    sellerSent.value = true
    Object.keys(sellerForm).forEach(key => sellerForm[key as keyof typeof sellerForm] = '')
  } catch (e) {
    sellerError.value = true
  } finally {
    sellerSending.value = false
  }
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
        <h1>Machine Wanted Listings!</h1>
        <p class="hero-copy">Let us know if you have a machine that may fit any of these requirements.</p>
        <p class="hero-wanted-copy">Looking for a machine? Add a wanted listing at no cost!</p>
        <NuxtLink to="/equipment/request" class="primary-cta">Add My Wanted Machine</NuxtLink>
      </div>
    </section>

    <section v-if="featuredWanteds.length" class="section featured-section">
      <div class="section-heading"><div><p class="eyebrow dark">FEATURED WANTEDS</p><h2>Machines Needed Now!</h2></div></div>
      <div class="featured-carousel">
        <button type="button" class="carousel-arrow carousel-arrow-left" aria-label="Previous featured Wanteds" @click="scrollFeatured(-1)">‹</button>
        <div ref="featuredScroll" class="featured-scroll">
          <article v-for="wanted in featuredWanteds" :key="wanted.WtdID" class="wanted-card featured-card">
            <div class="featured-topline">
              <span class="hot-label">HOT WANTED</span>
              <span class="featured-id">ID #{{ wanted.WtdID }}</span>
            </div>
            <div class="wanted-type">{{ wanted.WebDesc }}</div>
            <p class="wanted-description">{{ wanted.Description }}</p>
            <button type="button" class="card-button" @click="openSellerForm(wanted)">I Have One to Sell</button>
          </article>
        </div>
        <button type="button" class="carousel-arrow carousel-arrow-right" aria-label="Next featured Wanteds" @click="scrollFeatured(1)">›</button>
      </div>
    </section>

    <section class="section browse-section">
      <div class="section-heading browse-heading">
        <div><p class="eyebrow dark">SEARCH CURRENT WANTEDS</p><h2>Find a Matching Requirement</h2></div>
        <button type="button" class="reset-button" @click="resetFilters">Reset Search / View All Wanteds</button>
      </div>

      <div class="search-box">
        <label for="wanted-search">Search by manufacturer, model or keyword</label>
        <input id="wanted-search" v-model="searchTerm" type="search" placeholder="Example: Haas VF-3, Mazak, press brake, grinder...">
      </div>

      <div class="filter-block">
        <h3>Browse by Machine Type</h3>
        <div class="filter-buttons">
          <button v-for="group in groups" :key="group" type="button" :class="['filter-button', { active: selectedGroup === group }]" @click="chooseGroup(group)">{{ group }}</button>
        </div>
      </div>

      <div v-if="webDescs.length > 2 || selectedGroup !== 'All'" class="filter-block refine-block">
        <label for="wanted-type">Narrow by specific machine type</label>
        <select id="wanted-type" v-model="selectedWebDesc">
          <option v-for="desc in webDescs" :key="desc" :value="desc">{{ desc === 'All' ? 'All machine types' : desc }}</option>
        </select>
      </div>

      <div class="results-separator">
        <div class="results-bar"><strong>{{ filteredWanteds.length }}</strong> {{ filteredWanteds.length === 1 ? 'machine wanted listing' : 'machine wanted listings' }}</div>
      </div>

      <div v-if="filteredWanteds.length" class="wanted-list">
        <section v-for="grouped in groupedWanteds" :key="grouped.type" class="wanted-type-group">
          <div class="type-heading"><h3>{{ grouped.type }}</h3><span>{{ grouped.items.length }} {{ grouped.items.length === 1 ? 'wanted' : 'wanteds' }}</span></div>
          <article v-for="wanted in grouped.items" :key="wanted.WtdID" class="wanted-row">
            <div class="wanted-row-number"><span class="id-label">ID</span><span>#{{ wanted.WtdID }}</span></div>
            <p class="wanted-row-description">{{ wanted.Description }}</p>
            <button type="button" class="row-button" @click="openSellerForm(wanted)">I Have One to Sell</button>
          </article>
        </section>
      </div>

      <div v-else class="no-results">
        <h3>No matching Wanteds found</h3>
        <p>Try another keyword or reset the filters to view all current machinery requirements.</p>
        <button type="button" class="reset-button" @click="resetFilters">View All Wanteds</button>
      </div>
    </section>

    <section class="bottom-cta">
      <div><p class="eyebrow">LOOKING FOR A MACHINE?</p><h2>Tell Us What You Need</h2><p>Send us your machinery requirement and we'll add it to our Wanted Machines list at no cost.</p></div>
      <NuxtLink to="/equipment/request" class="primary-cta">Add My Wanted Machine</NuxtLink>
    </section>

    <div v-if="selectedWanted" class="modal-overlay" @click.self="closeSellerForm">
      <div class="seller-modal">
        <button type="button" class="modal-close" aria-label="Close" @click="closeSellerForm">×</button>
        <p class="eyebrow dark">I HAVE ONE TO SELL</p>
        <h2>Responding to Wanted ID #{{ selectedWanted.WtdID }}</h2>
        <div class="wanted-reference"><strong>{{ selectedWanted.WebDesc }}</strong><span>{{ selectedWanted.Description }}</span></div>

        <div v-if="sellerSent" class="sent-confirmation">
          <h3>Sent Successfully</h3>
          <p>Thank you. Your machine information has been sent for Wanted ID #{{ selectedWanted.WtdID }}.</p>
          <button type="button" class="close-after-send" @click="closeSellerForm">Close</button>
        </div>

        <form v-else class="seller-form" @submit.prevent="submitSellerForm">
          <div class="form-grid">
            <label>Contact Name *<input v-model="sellerForm.contactName" required></label>
            <label>Company Name<input v-model="sellerForm.companyName"></label>
            <label>Email *<input v-model="sellerForm.email" type="email" required></label>
            <label>Phone *<input v-model="sellerForm.phone" type="tel" required></label>
            <label>Year<input v-model="sellerForm.year"></label>
            <label>Manufacturer<input v-model="sellerForm.manufacturer"></label>
            <label>Model<input v-model="sellerForm.model"></label>
            <label>Location<input v-model="sellerForm.location" placeholder="City, State"></label>
          </div>
          <label>Machine Details<textarea v-model="sellerForm.details" rows="5" placeholder="Condition, control, hours, options, asking price or anything else we should know."></textarea></label>
          <p v-if="sellerError" class="form-error">We couldn't send the form. Please try again or call (256) 980-1200.</p>
          <div class="form-actions">
            <button type="button" class="cancel-button" :disabled="sellerSending" @click="closeSellerForm">Cancel</button>
            <button type="submit" class="submit-button" :disabled="sellerSending">{{ sellerSending ? 'Sending...' : 'Send Machine Information' }}</button>
          </div>
        </form>
      </div>
    </div>
  </main>
</template>

<style scoped>
.wanted-page { background: #f5f7fa; color: #172033; }
.wanted-hero { background: #071a2c; color: #fff; padding: 30px 32px 32px; }
.hero-inner, .section, .bottom-cta { max-width: 1320px; margin: 0 auto; }
.hero-inner { max-width: 920px; margin-left: auto; margin-right: auto; text-align: center; }
.eyebrow { margin: 0 0 8px; color: #f47b20; font-size: .78rem; font-weight: 800; letter-spacing: .14em; }
.eyebrow.dark { color: #c95c12; }
h1 { margin: 0; font-size: clamp(2.1rem, 4vw, 3.25rem); line-height: 1.05; }
h2 { margin: 4px 0 0; font-size: clamp(1.7rem, 3vw, 2.45rem); }
.hero-copy, .hero-wanted-copy { max-width: 780px; margin: 10px auto 0; color: #d9e1ea; font-size: 1rem; line-height: 1.45; }
.hero-wanted-copy { margin-top: 4px; margin-bottom: 14px; }
.primary-cta, .card-button, .row-button { display: inline-flex; align-items: center; justify-content: center; box-sizing: border-box; border: 0; border-radius: 5px; background: #e66d18; color: #fff; font: inherit; font-weight: 800; text-decoration: none; cursor: pointer; transition: transform .15s ease, background .15s ease; }
.primary-cta { min-height: 42px; padding: 0 22px; }
.primary-cta:hover, .card-button:hover, .row-button:hover { background: #cc5c0e; transform: translateY(-1px); }
.section { padding: 56px 32px; }
.featured-section { padding-bottom: 20px; }
.section-heading { display: flex; align-items: end; justify-content: space-between; gap: 24px; margin-bottom: 24px; }
.featured-carousel { position: relative; padding: 0 52px; }
.featured-scroll { display: grid; grid-auto-flow: column; grid-auto-columns: minmax(300px, 390px); gap: 18px; overflow-x: auto; padding: 4px 4px 24px; scroll-snap-type: x mandatory; scrollbar-width: auto; scrollbar-color: #70839a #d9e1e9; }
.featured-scroll::-webkit-scrollbar { height: 14px; }
.featured-scroll::-webkit-scrollbar-track { background: #d9e1e9; border-radius: 8px; }
.featured-scroll::-webkit-scrollbar-thumb { background: #70839a; border-radius: 8px; border: 2px solid #d9e1e9; }
.carousel-arrow { position: absolute; top: 50%; z-index: 5; width: 44px; height: 54px; transform: translateY(-62%); border: 1px solid #b5c0cb; border-radius: 6px; background: #fff; color: #0b315d; font-size: 34px; font-weight: 800; line-height: 1; cursor: pointer; box-shadow: 0 4px 12px rgba(17,32,51,.12); }
.carousel-arrow:hover { background: #0b315d; color: #fff; border-color: #0b315d; }
.carousel-arrow-left { left: 0; }
.carousel-arrow-right { right: 0; }
.wanted-card { display: flex; min-height: 260px; flex-direction: column; border: 1px solid #d7dde5; border-radius: 8px; background: #fff; padding: 22px; box-shadow: 0 3px 12px rgba(17, 32, 51, .05); }
.featured-card { scroll-snap-align: start; min-height: 275px; border: 2px solid #e4a06f; border-top: 7px solid #e66d18; background: #fffdf9; box-shadow: 0 7px 20px rgba(17,32,51,.12); }
.featured-topline { display: flex; align-items: center; justify-content: space-between; gap: 12px; }
.hot-label { color: #c95000; font-size: .76rem; font-weight: 900; letter-spacing: .11em; }
.featured-id { color: #647282; font-size: .78rem; font-weight: 800; }
.wanted-label { color: #d35f10; font-size: .76rem; font-weight: 900; letter-spacing: .12em; }
.wanted-type { margin-top: 12px; color: #0b315d; font-size: 1.08rem; font-weight: 900; }
.wanted-description { margin: 14px 0 22px; color: #172033; font-size: 1.02rem; font-weight: 650; line-height: 1.5; }
.card-button { width: 100%; min-height: 42px; margin-top: auto; padding: 9px 8px; text-align: center; font-size: .9rem; white-space: normal; }
.search-box, .filter-block, .refine-block { margin-bottom: 28px; }
.search-box label, .refine-block label, .filter-block h3 { display: block; margin: 0 0 10px; font-weight: 800; }
.search-box input, .refine-block select { width: 100%; border: 1px solid #cbd3dc; border-radius: 5px; background: #fff; padding: 14px 16px; font: inherit; }
.filter-buttons { display: flex; flex-wrap: wrap; gap: 9px; }
.filter-button, .reset-button { border: 1px solid #b9c3ce; border-radius: 5px; background: #fff; color: #172033; padding: 10px 14px; font: inherit; font-weight: 700; cursor: pointer; }
.filter-button.active { border-color: #123b6d; background: #123b6d; color: #fff; }
.reset-button:hover, .filter-button:hover { border-color: #123b6d; }
.results-separator { margin: 34px 0 22px; padding-top: 20px; border-top: 2px solid #c7d2de; }
.results-bar { display: inline-block; color: #0b315d; font-size: 1.16rem; font-weight: 700; }
.results-bar strong { font-size: 1.34rem; }
.wanted-list { display: flex; flex-direction: column; gap: 30px; }
.wanted-type-group { overflow: hidden; border: 1px solid #c9d2dc; border-radius: 8px; background: #fff; box-shadow: 0 3px 12px rgba(17, 32, 51, .04); }
.type-heading { display: flex; align-items: center; justify-content: space-between; gap: 20px; border-bottom: 1px solid #aebdcb; background: #d9e3ed; padding: 13px 18px; }
.type-heading h3 { margin: 0; color: #0b315d; font-size: 1.18rem; font-weight: 900; letter-spacing: .01em; }
.type-heading span { color: #526274; font-size: .86rem; font-weight: 700; }
.wanted-row { display: grid; grid-template-columns: 82px minmax(0, 1fr) 190px; align-items: center; gap: 16px; min-height: 68px; padding: 9px 14px 9px 18px; border-bottom: 1px solid #e1e6eb; }
.wanted-row:last-child { border-bottom: 0; }
.wanted-row-number { display: flex; flex-direction: column; gap: 2px; color: #788390; font-size: .8rem; }
.id-label { color: #9a5a2a; font-size: .69rem; font-weight: 800; letter-spacing: .08em; }
.wanted-row-description { display: -webkit-box; overflow: hidden; margin: 0; color: #172033; font-size: 1rem; font-weight: 600; line-height: 1.45; -webkit-box-orient: vertical; -webkit-line-clamp: 2; }
.row-button { min-height: 40px; padding: 0 14px; text-align: center; }
.no-results { border: 1px solid #d7dde5; border-radius: 8px; background: #fff; padding: 40px; text-align: center; }
.bottom-cta { display: flex; align-items: center; justify-content: space-between; gap: 32px; margin-bottom: 64px; border-radius: 10px; background: #071a2c; color: #fff; padding: 38px 42px; }
.bottom-cta h2 { margin: 0 0 8px; }
.bottom-cta p:last-child { margin: 0; color: #d9e1ea; }
.modal-overlay { position: fixed; inset: 0; z-index: 2000; display: flex; align-items: center; justify-content: center; padding: 24px; background: rgba(3, 14, 27, .72); }
.seller-modal { position: relative; width: min(760px, 100%); max-height: 90vh; overflow-y: auto; box-sizing: border-box; border-radius: 8px; background: #fff; padding: 34px; box-shadow: 0 24px 70px rgba(0,0,0,.28); }
.seller-modal h2 { margin: 0 42px 14px 0; color: #0b315d; font-size: 1.7rem; }
.modal-close { position: absolute; top: 14px; right: 16px; border: 0; background: transparent; color: #44505e; font-size: 30px; line-height: 1; cursor: pointer; }
.wanted-reference { display: flex; flex-direction: column; gap: 5px; margin-bottom: 24px; border-left: 4px solid #e66d18; background: #f3f6f9; padding: 13px 15px; }
.wanted-reference strong { color: #0b315d; }
.wanted-reference span { color: #4c5967; line-height: 1.45; }
.seller-form label { display: block; margin-bottom: 16px; color: #253344; font-size: .88rem; font-weight: 700; }
.form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 0 18px; }
.seller-form input, .seller-form textarea { box-sizing: border-box; width: 100%; margin-top: 6px; border: 1px solid #cbd3dc; border-radius: 4px; background: #fff; padding: 11px 12px; font: inherit; font-weight: 400; }
.seller-form input:focus, .seller-form textarea:focus { outline: 2px solid rgba(28,69,135,.18); border-color: #1c4587; }
.form-actions { display: flex; justify-content: flex-end; gap: 10px; margin-top: 6px; }
.cancel-button, .submit-button, .close-after-send { border: 0; border-radius: 4px; padding: 12px 18px; font: inherit; font-weight: 800; cursor: pointer; }
.cancel-button { background: #e9edf2; color: #24364a; }
.submit-button, .close-after-send { background: #e66d18; color: #fff; }
.submit-button:disabled, .cancel-button:disabled { opacity: .6; cursor: default; }
.form-error { color: #a72d2d; font-weight: 700; }
.sent-confirmation { border: 1px solid #b7d9c1; border-radius: 6px; background: #eef8f1; padding: 24px; color: #205c35; }
.sent-confirmation h3 { margin: 0 0 8px; font-size: 1.3rem; }
.sent-confirmation p { margin: 0 0 18px; line-height: 1.5; }
@media (max-width: 760px) {
  .wanted-hero, .section { padding-left: 20px; padding-right: 20px; }
  .wanted-hero { padding-top: 26px; padding-bottom: 28px; }
  .section-heading, .bottom-cta { align-items: stretch; flex-direction: column; }
  .featured-carousel { padding: 0 38px; }
  .featured-scroll { grid-auto-columns: 92%; }
  .carousel-arrow { width: 34px; height: 48px; font-size: 28px; }
  .wanted-row { grid-template-columns: 1fr; gap: 8px; padding: 15px; }
  .wanted-row-number { flex-direction: row; justify-content: space-between; }
  .row-button { width: 100%; }
  .bottom-cta { margin-left: 16px; margin-right: 16px; padding: 30px 24px; }
  .seller-modal { padding: 26px 20px; }
  .form-grid { grid-template-columns: 1fr; }
  .form-actions { flex-direction: column-reverse; }
  .cancel-button, .submit-button { width: 100%; }
}
</style>
