<template>
  <main class="spec-library-page">
    <section class="library-hero">
      <div class="library-hero-inner">
        <div class="hero-kicker">UMS MACHINERY SPECIFICATION LIBRARY</div>
        <h1>Used CNC Lathes &amp; Turning Centers</h1>
        <p>
          Browse CNC lathes and turning centers currently for sale, or use the UMS Machinery Specification Library
          to research machine types, manufacturers, model families and the specifications buyers use to compare older machines.
        </p>
        <div class="hero-actions">
          <a href="#current-machines" class="primary-button">View CNC Lathes for Sale</a>
          <a href="#spec-library" class="secondary-button">Browse CNC Lathe Spec Library</a>
        </div>
      </div>
    </section>

    <section id="current-machines" class="section current-section">
      <div class="section-heading-row">
        <div>
          <div class="section-kicker for-sale-kicker">FOR SALE NOW</div>
          <h2>CNC Lathes &amp; Turning Centers Currently Available</h2>
        </div>
        <NuxtLink to="/equipment" class="text-link">View all current equipment →</NuxtLink>
      </div>

      <div v-if="currentCncLathes.length" class="machine-grid">
        <article v-for="machine in currentCncLathes" :key="machine.InvID" class="machine-card">
          <div class="machine-image-wrap">
            <img
              v-if="machineCardImages[machine.InvID]"
              :src="`/Images/${machineCardImages[machine.InvID]}`"
              :alt="`${machine.Year || ''} ${machine.Manufacturer || ''} ${machine.Model || ''}`.trim()"
              loading="lazy"
            />
            <div v-else class="machine-image-placeholder">Current UMS Inventory</div>
          </div>
          <div class="machine-card-copy">
            <h3>{{ machine.Year }} {{ machine.Manufacturer }} {{ machine.Model }}</h3>
            <p class="machine-type">{{ webDescription(machine) }}</p>
            <p class="stock-number">Stock #{{ machine.InvID }}</p>
            <p v-if="advertisingSpec(machine)" class="adv-spec">{{ advertisingSpec(machine) }}</p>
            <NuxtLink :to="machineUrl(machine)" class="view-machine-button">View Machine</NuxtLink>
          </div>
        </article>
      </div>

      <div v-else class="no-current-machines">
        <div>
          <h3>Looking for a CNC lathe?</h3>
          <p>
            We do not have a matching CNC lathe listed in current inventory right now. Inventory changes frequently,
            so send us your requirements and UMS can help locate a machine that fits your needs.
          </p>
        </div>
        <NuxtLink to="/equipment#tell-us-what-you-need" class="orange-button">Tell Us What You Need</NuxtLink>
      </div>
    </section>

    <section class="section muted-section">
      <div class="section-intro">
        <div class="section-kicker">BUYER'S GUIDE</div>
        <h2>Types of CNC Lathes &amp; Turning Centers</h2>
        <p>
          Buyers often know the type of turning machine they need before they know the exact manufacturer or model.
          These common configurations overlap—a single machine may combine live tooling, Y-axis capability and a sub-spindle.
        </p>
      </div>

      <div class="type-grid">
        <article v-for="type in machineTypes" :key="type.title" class="info-card">
          <h3>{{ type.title }}</h3>
          <p>{{ type.description }}</p>
        </article>
      </div>
    </section>

    <section class="section">
      <div class="section-intro">
        <div class="section-kicker">MANUFACTURERS</div>
        <h2>CNC Lathe Manufacturers in the UMS Spec Library</h2>
        <p>
          The historical database has especially strong depth in Mazak, Haas, Okuma and Mori-Seiki turning equipment,
          with additional records from Doosan, Daewoo, Hyundai, Hitachi-Seiki, Cincinnati, Hardinge and other builders.
        </p>
      </div>

      <div class="manufacturer-grid">
        <article v-for="maker in featuredManufacturers" :key="maker.name" class="manufacturer-card">
          <h3>{{ maker.name }}</h3>
          <p>{{ maker.families }}</p>
          <NuxtLink v-if="maker.to" :to="maker.to" class="manufacturer-link">{{ maker.linkLabel }}</NuxtLink>
          <span v-else class="coming-link">Manufacturer library page planned</span>
        </article>
      </div>

      <p class="other-manufacturers">
        <strong>Other manufacturers represented:</strong>
        Daewoo, Doosan, Hyundai, Hitachi-Seiki, Okuma &amp; Howa, Cincinnati, Hardinge, Nakamura, Miyano and others.
      </p>
    </section>

    <section class="section muted-section">
      <div class="section-intro">
        <div class="section-kicker">SPECIFICATIONS</div>
        <h2>Understanding CNC Lathe Specifications</h2>
        <p>
          Older CNC lathes can vary substantially by year, control, optional equipment and configuration. The UMS library
          uses machine-specific historical records so buyers can compare the specifications that matter most.
        </p>
      </div>

      <div class="spec-grid">
        <article v-for="spec in specificationGuide" :key="spec.name" class="spec-card">
          <h3>{{ spec.name }}</h3>
          <p>{{ spec.description }}</p>
        </article>
      </div>
    </section>

    <section id="spec-library" class="section library-section">
      <div class="library-label">SPECIFICATION LIBRARY — HISTORICAL INFORMATION</div>
      <div class="library-copy">
        <h2>CNC Lathe Model &amp; Specification Library</h2>
        <p>
          Used Machinery Source maintains a historical machinery database compiled from records accumulated over many years.
          The information is provided to help machinery buyers, dealers and manufacturing professionals research older CNC lathe
          models, configurations and specifications.
        </p>
        <p class="library-warning">
          <strong>Historical library information does not indicate that a machine is currently available for sale.</strong>
          Specifications can vary by year, configuration, control and optional equipment. Current machines for sale are shown only
          in the “For Sale Now” section above and on the UMS Equipment pages.
        </p>
      </div>

      <div class="family-grid">
        <article v-for="maker in libraryFamilies" :key="maker.name" class="family-card">
          <h3>{{ maker.name }}</h3>
          <div class="family-tags">
            <span v-for="family in maker.families" :key="family">{{ family }}</span>
          </div>
          <NuxtLink v-if="maker.to" :to="maker.to" class="family-browse-link">{{ maker.linkLabel }}</NuxtLink>
        </article>
      </div>

      <div class="naming-note">
        <h3>Model-name variations are preserved</h3>
        <p>
          Historical machinery is often entered and searched under more than one common model designation. The UMS Spec Library
          preserves those original terms—for example, <strong>Mazak Quick-Turn 20</strong>, <strong>Quick Turn 20</strong> and
          <strong>QT-20</strong>—rather than automatically replacing one with another. Where appropriate, related naming variations
          can be connected on future model pages while the original historical records remain intact.
        </p>
      </div>
    </section>

    <section class="section conversion-section">
      <div class="conversion-card">
        <div>
          <h2>Looking for a CNC Lathe?</h2>
          <p>If the machine you need is not currently listed, send UMS your requirements and let us help locate it.</p>
        </div>
        <NuxtLink to="/equipment#tell-us-what-you-need" class="orange-button">Tell Us What You Need</NuxtLink>
      </div>

      <div class="conversion-card sell-card">
        <div>
          <h2>Have a CNC Lathe to Sell?</h2>
          <p>Tell us about a CNC lathe or turning center available for sale, trade or surplus.</p>
        </div>
        <NuxtLink to="/sell-your-machine" class="dark-button">Sell Your Machine</NuxtLink>
      </div>
    </section>
  </main>
</template>

<script setup>
import machinesData from '~/assets/data/machines.json'

const machines = ref(machinesData)
const machineCardImages = ref({})

const webDescription = (machine) => machine.WebDesc || machine.Web_Desc || ''
const advertisingSpec = (machine) => machine.AdvSpec || machine.Adv_Spec || ''
const offMarketValue = (machine) => machine.OffMarket ?? machine.Off_Market ?? 0

const currentCncLathes = computed(() => (machines.value || [])
  .filter(machine =>
    Number(machine.Sold) === 0 &&
    Number(offMarketValue(machine)) === 0 &&
    Number(machine.dont_advertise) === 0 &&
    machine.Groups === 'CNC Lathes & Turning Centers'
  )
  .sort((a, b) => Number(b.Year || 0) - Number(a.Year || 0)))

const machineUrl = (machine) => {
  const slug = `${machine.Manufacturer || ''}-${machine.Model || ''}`
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
  return `/equipment/${machine.InvID}/${slug}`
}

const machineTypes = [
  { title: '2-Axis CNC Lathes & Turning Centers', description: 'Traditional CNC turning machines used for facing, OD/ID turning, boring, threading and related operations.' },
  { title: 'CNC Chuckers', description: 'Turning centers configured primarily for chuck work rather than longer work supported between centers.' },
  { title: 'Live-Tool CNC Lathes', description: 'Turning centers equipped with powered tools for drilling, milling and secondary operations without moving the part to another machine.' },
  { title: 'C-Axis Turning Centers', description: 'Machines with programmable spindle positioning that supports indexed or contouring operations with live tooling.' },
  { title: 'Sub-Spindle Turning Centers', description: 'Machines capable of transferring a part from the main spindle to a secondary spindle for back-working and additional operations.' },
  { title: 'Y-Axis CNC Turning Centers', description: 'Turning centers with Y-axis motion for more flexible off-center milling, drilling and complex mill-turn work.' },
  { title: 'Twin / Opposing-Spindle Machines', description: 'Turning equipment using two spindles or opposing workholding arrangements for production-oriented multi-operation machining.' },
  { title: 'Multi-Axis & Mill-Turn Machines', description: 'More advanced turning platforms combining multiple axes, live tooling, milling capability, multiple turrets or other integrated machining functions.' }
]

const featuredManufacturers = [
  { name: 'Mazak CNC Lathes & Turning Centers', families: 'Quick-Turn, QT, SQT, Slant-Turn, Integrex, Multiplex, M-Series, Powermaster and other Mazak turning platforms.', to: '/spec-library/mazak/cnc-lathes', linkLabel: 'Browse Mazak specifications →' },
  { name: 'Haas CNC Lathes & Turning Centers', families: 'SL, ST, TL and HL series CNC turning machines.', to: '/spec-library/haas/cnc-lathes', linkLabel: 'Browse Haas specifications →' },
  { name: 'Okuma CNC Lathes & Turning Centers', families: 'LB, LC, LU, LR, Cadet and other Okuma turning machines.', to: '/spec-library/okuma/cnc-lathes', linkLabel: 'Browse Okuma specifications →' },
  { name: 'Mori-Seiki / DMG MORI CNC Lathes & Turning Centers', families: 'SL, ZL, LL, TL, DL and other Mori-Seiki turning machines, with current DMG MORI inventory included where applicable.', to: '/spec-library/mori-seiki/cnc-lathes', linkLabel: 'Browse Mori-Seiki / DMG MORI specifications →' }
]

const specificationGuide = [
  { name: 'Swing', description: 'The maximum workpiece diameter that can physically swing within the machine envelope.' },
  { name: 'Maximum Turning Diameter', description: 'The practical maximum diameter the machine is designed to turn under its tooling and travel limits.' },
  { name: 'Distance Between Centers', description: 'A key capacity measurement for machines intended to support longer shaft-style work.' },
  { name: 'Spindle Bore / Bar Capacity', description: 'Indicates the diameter that can pass through the spindle and helps determine bar-work capability.' },
  { name: 'Spindle Speed', description: 'The available spindle RPM range, which affects material, diameter and tooling choices.' },
  { name: 'Spindle Horsepower', description: 'Main spindle power available for turning and material removal.' },
  { name: 'Chuck Size', description: 'A practical indicator of typical workholding capacity and machine size.' },
  { name: 'X- and Z-Axis Travel', description: 'The primary axis travels that define tool movement across diameter and along part length.' },
  { name: 'Turret Capacity', description: 'The number of tool stations available on the turret or turrets.' },
  { name: 'Live Tooling / C-Axis / Y-Axis', description: 'Capabilities that expand a turning center beyond conventional 2-axis turning into drilling, milling and more complex part processing.' },
  { name: 'Main & Sub-Spindle', description: 'A secondary spindle can receive the part for back-working and reduce additional setups.' },
  { name: 'Control', description: 'The CNC control can be especially important when comparing older machines, operator familiarity, programming features and serviceability.' }
]

const libraryFamilies = [
  { name: 'Mazak', families: ['Quick-Turn', 'Quick Turn', 'QT', 'SQT', 'Slant-Turn', 'Integrex', 'Multiplex', 'M-Series', 'Powermaster'], to: '/spec-library/mazak/cnc-lathes', linkLabel: 'Browse Mazak Spec Library →' },
  { name: 'Haas', families: ['SL Series', 'ST Series', 'TL Series', 'HL Series'], to: '/spec-library/haas/cnc-lathes', linkLabel: 'Browse Haas Spec Library →' },
  { name: 'Okuma', families: ['LB Series', 'LC Series', 'LU Series', 'LR Series', 'Cadet'], to: '/spec-library/okuma/cnc-lathes', linkLabel: 'Browse Okuma Spec Library →' },
  { name: 'Mori-Seiki / DMG MORI', families: ['SL Series', 'ZL Series', 'LL Series', 'TL Series', 'DL Series'], to: '/spec-library/mori-seiki/cnc-lathes', linkLabel: 'Browse Mori-Seiki / DMG MORI Spec Library →' }
]

async function loadMachineCardImages() {
  for (const machine of currentCncLathes.value) {
    try {
      const files = await $fetch('/api/images', { query: { invID: machine.InvID } })
      if (files?.length) machineCardImages.value[machine.InvID] = files[0]
    } catch (error) {
      console.error(`Could not load image for ${machine.InvID}`, error)
    }
  }
}

onMounted(loadMachineCardImages)

useSeoMeta({
  title: 'Used CNC Lathes & Turning Centers | Specifications & Machines for Sale | UMS',
  description: 'Browse used CNC lathes and turning centers currently for sale and research CNC lathe types, manufacturers, model families and older-machine specifications in the UMS Machinery Specification Library.',
  ogTitle: 'Used CNC Lathes & Turning Centers | UMS Spec Library',
  ogDescription: 'Current CNC lathes for sale plus a permanent machinery specification library for researching CNC lathe types, manufacturers, models and older-machine specifications.',
  ogType: 'website',
  ogUrl: 'https://www.usedmachinerysource.com/spec-library/cnc-lathes',
  twitterCard: 'summary_large_image'
})

useHead({
  htmlAttrs: { lang: 'en' },
  link: [
    { rel: 'canonical', href: 'https://www.usedmachinerysource.com/spec-library/cnc-lathes' }
  ],
  script: [
    {
      type: 'application/ld+json',
      children: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: 'Used CNC Lathes & Turning Centers',
        url: 'https://www.usedmachinerysource.com/spec-library/cnc-lathes',
        description: 'Current used CNC lathes for sale and a machinery specification library for CNC lathe types, manufacturers, model families and historical specifications.',
        isPartOf: {
          '@type': 'WebSite',
          name: 'Used Machinery Source',
          url: 'https://www.usedmachinerysource.com/'
        }
      })
    }
  ]
})
</script>

<style scoped>
.spec-library-page { padding: 0 0 54px; color: #17273a; background: #fff; }
.library-hero { background: linear-gradient(105deg, #071b33 0%, #0b2545 62%, #0d2c52 100%); color: #fff; }
.library-hero-inner, .section { max-width: 1320px; margin: 0 auto; padding-left: 32px; padding-right: 32px; }
.library-hero-inner { padding-top: 52px; padding-bottom: 48px; }
.hero-kicker, .section-kicker { color: #f47b20; font-size: 13px; font-weight: 800; letter-spacing: .08em; margin-bottom: 10px; }
.library-hero h1 { margin: 0 0 14px; font-size: clamp(36px, 4.3vw, 56px); line-height: 1.04; font-family: Georgia, 'Times New Roman', serif; }
.library-hero p { max-width: 920px; margin: 0; color: #e8eef5; font-size: 18px; line-height: 1.6; }
.hero-actions { display: flex; flex-wrap: wrap; gap: 12px; margin-top: 24px; }
.primary-button, .secondary-button, .orange-button, .dark-button, .view-machine-button { display: inline-flex; align-items: center; justify-content: center; text-decoration: none; border-radius: 5px; font-weight: 800; }
.primary-button { background: #f47b20; color: #fff; padding: 12px 18px; }
.primary-button:hover, .orange-button:hover { background: #d96512; }
.secondary-button { color: #fff; border: 1px solid rgba(255,255,255,.6); padding: 11px 18px; }
.secondary-button:hover { background: rgba(255,255,255,.1); }
.section { padding-top: 48px; padding-bottom: 48px; }
.muted-section { max-width: none; background: #f5f7fa; }
.muted-section > * { max-width: 1256px; margin-left: auto; margin-right: auto; }
.section-heading-row { display: flex; justify-content: space-between; align-items: end; gap: 20px; margin-bottom: 22px; }
.section h2 { margin: 0; color: #0b2545; font-family: Georgia, 'Times New Roman', serif; font-size: clamp(28px, 3vw, 38px); line-height: 1.15; }
.section-intro { margin-bottom: 24px; }
.section-intro > p { max-width: 920px; margin: 12px 0 0; font-size: 16px; line-height: 1.65; color: #43566b; }
.for-sale-kicker { color: #22733a; }
.text-link { color: #1c4587; font-weight: 800; text-decoration: none; white-space: nowrap; }
.text-link:hover { text-decoration: underline; }
.machine-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 20px; }
.machine-card { overflow: hidden; background: #fff; border: 1px solid #d8e0e9; border-radius: 7px; box-shadow: 0 4px 18px rgba(11,37,69,.07); }
.machine-image-wrap { aspect-ratio: 4 / 3; background: #eef2f6; display: flex; align-items: center; justify-content: center; overflow: hidden; }
.machine-image-wrap img { width: 100%; height: 100%; object-fit: cover; }
.machine-image-placeholder { color: #617386; font-weight: 700; font-size: 14px; }
.machine-card-copy { padding: 18px; }
.machine-card h3 { margin: 0 0 7px; color: #0b2545; font-size: 20px; line-height: 1.25; }
.machine-type { margin: 0 0 9px; color: #43566b; font-size: 14px; }
.stock-number { margin: 0 0 9px; font-size: 13px; font-weight: 800; color: #17273a; }
.adv-spec { margin: 0 0 16px; color: #43566b; font-size: 14px; line-height: 1.5; }
.view-machine-button { background: #1c4587; color: #fff; padding: 10px 15px; font-size: 14px; }
.view-machine-button:hover { background: #0b2545; }
.no-current-machines { display: flex; align-items: center; justify-content: space-between; gap: 28px; padding: 24px 26px; border: 1px solid #cfd8e3; border-left: 5px solid #f47b20; border-radius: 6px; background: #f8fafc; }
.no-current-machines h3 { margin: 0 0 6px; color: #0b2545; font-size: 21px; }
.no-current-machines p { max-width: 820px; margin: 0; line-height: 1.55; color: #43566b; }
.orange-button { flex: 0 0 auto; background: #f47b20; color: #fff; padding: 11px 17px; }
.type-grid, .spec-grid { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 16px; }
.info-card, .spec-card { background: #fff; border: 1px solid #d8e0e9; border-top: 3px solid #1c4587; border-radius: 6px; padding: 20px; }
.info-card h3, .spec-card h3 { margin: 0 0 8px; color: #0b2545; font-size: 17px; line-height: 1.3; }
.info-card p, .spec-card p { margin: 0; color: #526579; font-size: 14px; line-height: 1.55; }
.manufacturer-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 18px; }
.manufacturer-card { padding: 22px; border: 1px solid #d6dee8; border-radius: 6px; background: #fff; }
.manufacturer-card h3 { margin: 0 0 8px; color: #0b2545; font-size: 20px; }
.manufacturer-card p { margin: 0 0 12px; color: #526579; line-height: 1.55; }
.manufacturer-link,.family-browse-link { color:#1c4587; font-weight:800; text-decoration:none; }
.manufacturer-link:hover,.family-browse-link:hover { text-decoration:underline; }
.coming-link { color: #7a8795; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: .04em; }
.other-manufacturers { margin: 22px 0 0; line-height: 1.6; color: #43566b; }
.library-section { margin-top: 18px; border: 1px solid #d7e0ea; border-top: 6px solid #0b2545; border-radius: 7px; box-shadow: 0 5px 20px rgba(11,37,69,.06); }
.library-label { display: inline-block; margin-bottom: 14px; padding: 7px 10px; background: #e9eef4; color: #0b2545; border-radius: 4px; font-size: 12px; font-weight: 900; letter-spacing: .06em; }
.library-copy > p { max-width: 960px; color: #43566b; line-height: 1.65; }
.library-warning { padding: 15px 17px; background: #fff8ed; border-left: 4px solid #f47b20; color: #4f4332 !important; }
.family-grid { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 16px; margin-top: 28px; }
.family-card { background: #f7f9fb; border: 1px solid #d8e0e9; border-radius: 6px; padding: 18px; }
.family-card h3 { margin: 0 0 12px; color: #0b2545; font-size: 20px; }
.family-tags { display: flex; flex-wrap: wrap; gap: 7px; }
.family-tags span { padding: 6px 8px; background: #fff; border: 1px solid #ccd6e1; border-radius: 4px; color: #334b63; font-size: 12px; font-weight: 700; }
.family-browse-link { display:inline-block; margin-top:14px; }
.naming-note { margin-top: 24px; padding: 20px 22px; background: #f5f7fa; border-radius: 6px; }
.naming-note h3 { margin: 0 0 7px; color: #0b2545; font-size: 19px; }
.naming-note p { margin: 0; color: #43566b; line-height: 1.6; }
.conversion-section { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 18px; }
.conversion-card { display: flex; align-items: center; justify-content: space-between; gap: 22px; padding: 24px; color: #fff; background: linear-gradient(105deg, #071b33 0%, #0b2545 100%); border-radius: 7px; }
.conversion-card h2 { color: #fff; font-size: 25px; }
.conversion-card p { margin: 7px 0 0; color: #e7edf4; line-height: 1.5; }
.sell-card { background: #f4f6f8; color: #17273a; border: 1px solid #d6dee8; }
.sell-card h2 { color: #0b2545; }
.sell-card p { color: #526579; }
.dark-button { flex: 0 0 auto; background: #0b2545; color: #fff; padding: 11px 17px; }
.dark-button:hover { background: #1c4587; }

@media (max-width: 1050px) {
  .machine-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .type-grid, .spec-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .family-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .conversion-section { grid-template-columns: 1fr; }
}

@media (max-width: 700px) {
  .library-hero-inner, .section { padding-left: 20px; padding-right: 20px; }
  .library-hero-inner { padding-top: 38px; padding-bottom: 38px; }
  .library-hero p { font-size: 16px; }
  .hero-actions { flex-direction: column; align-items: stretch; }
  .primary-button, .secondary-button { width: 100%; box-sizing: border-box; }
  .section { padding-top: 36px; padding-bottom: 36px; }
  .section-heading-row { align-items: flex-start; flex-direction: column; }
  .machine-grid, .type-grid, .spec-grid, .manufacturer-grid, .family-grid { grid-template-columns: 1fr; }
  .no-current-machines, .conversion-card { flex-direction: column; align-items: flex-start; }
  .orange-button, .dark-button { width: 100%; box-sizing: border-box; }
}
</style>