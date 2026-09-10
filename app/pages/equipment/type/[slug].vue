<template>
  <main class="category-page">
    <section class="hero">
      <div class="wrap">
        <NuxtLink to="/equipment" class="back">← All Equipment</NuxtLink>
        <div class="kicker">USED MACHINERY BY TYPE</div>
        <h1>{{ category.title }}</h1>
        <p>{{ category.intro }}</p>
      </div>
    </section>

    <section class="wrap section">
      <div class="section-head">
        <div>
          <div class="kicker sale">FOR SALE NOW</div>
          <h2>{{ machines.length }} {{ category.shortTitle }} Currently Available</h2>
        </div>
        <NuxtLink to="/equipment" class="text-link">View all equipment →</NuxtLink>
      </div>

      <div v-if="machines.length" class="grid">
        <article v-for="machine in machines" :key="machine.InvID" class="card">
          <NuxtLink :to="machineUrl(machine)" class="image-link">
            <img v-if="machineImage(machine)" :src="`/Images/${machineImage(machine)}`" :alt="`${machine.Year || ''} ${machine.Manufacturer || ''} ${machine.Model || ''} ${category.shortTitle}`.trim()" loading="lazy" />
            <div v-else class="placeholder">Used Machinery Source</div>
          </NuxtLink>
          <div class="copy">
            <h3><NuxtLink :to="machineUrl(machine)">{{ machine.Manufacturer }} {{ machine.Model }}<span v-if="machine.Year"> – {{ machine.Year }}</span></NuxtLink></h3>
            <p class="type">{{ machine.WebDesc }}</p>
            <p class="stock">Stock #{{ machine.InvID }}</p>
            <p v-if="machine.AdvSpec" class="spec">{{ machine.AdvSpec }}</p>
            <NuxtLink :to="machineUrl(machine)" class="button">View Machine</NuxtLink>
          </div>
        </article>
      </div>

      <div v-else class="empty">
        <h2>No {{ category.shortTitle.toLowerCase() }} are listed right now.</h2>
        <p>Inventory changes regularly. Tell us what you need and we can help locate a machine.</p>
        <NuxtLink to="/equipment#tell-us-what-you-need" class="button">Tell Us What You Need</NuxtLink>
      </div>
    </section>

    <section class="info">
      <div class="wrap">
        <h2>About {{ category.title }}</h2>
        <p>{{ category.body }}</p>
        <div class="links">
          <NuxtLink to="/equipment">Browse All Used Machinery</NuxtLink>
          <NuxtLink v-if="category.specLink" :to="category.specLink">{{ category.specLabel }}</NuxtLink>
          <NuxtLink to="/sell-your-machine">Sell Your Machine</NuxtLink>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup>
import machinesData from '~/assets/data/machines.json'
import imagesData from '~/assets/data/images.json'

const route = useRoute()

const categories = {
  'cnc-lathes-turning-centers': {
    group: 'CNC Lathes & Turning Centers',
    title: 'Used CNC Lathes & Turning Centers for Sale',
    shortTitle: 'CNC Lathes & Turning Centers',
    intro: 'Browse current used CNC lathes and turning centers from manufacturers such as Haas, Mazak, Okuma, Doosan, Mori-Seiki and others.',
    body: 'CNC lathes and turning centers are used for OD and ID turning, facing, boring, threading and related operations. Depending on the machine, available configurations may include live tooling, C-axis, Y-axis, sub-spindles, bar feeds, tailstocks and automation.',
    specLink: '/spec-library/cnc-lathes',
    specLabel: 'Research CNC Lathe Specifications'
  },
  'vertical-machining-centers': {
    group: 'CNC Vertical Machining Centers and CNC Mills',
    title: 'Used Vertical Machining Centers for Sale',
    shortTitle: 'Vertical Machining Centers',
    intro: 'Browse current used vertical machining centers and CNC mills for production machining, tooling, mold work and general manufacturing.',
    body: 'Vertical machining centers are commonly selected by X, Y and Z travel, table size and load, spindle speed and taper, horsepower, automatic tool changer capacity and available options such as probing, through-spindle coolant and 4th-axis capability.'
  },
  'horizontal-machining-centers': {
    group: 'CNC Horizontal Machining Centers',
    title: 'Used Horizontal Machining Centers for Sale',
    shortTitle: 'Horizontal Machining Centers',
    intro: 'Browse current used horizontal machining centers for production machining, multi-sided part processing and palletized manufacturing.',
    body: 'Horizontal machining centers are often evaluated by pallet size, axis travels, spindle taper and speed, tool capacity, pallet changer configuration and rotary indexing capability.'
  },
  'vertical-boring-mills-vtls': {
    group: 'Vertical Boring Mills & VTL',
    title: 'Used Vertical Boring Mills & VTLs for Sale',
    shortTitle: 'Vertical Boring Mills & VTLs',
    intro: 'Browse current used vertical boring mills and vertical turret lathes for large-diameter turning applications.',
    body: 'Vertical boring mills and VTLs are commonly used for large round workpieces where swing, turning diameter, height under rail, ram travel, table size and load capacity are important selection criteria.'
  },
  'grinders-lappers-hones': {
    group: 'Grinders, Lappers & Hones',
    title: 'Used Grinders, Lappers & Hones for Sale',
    shortTitle: 'Grinders, Lappers & Hones',
    intro: 'Browse current used grinding, lapping and honing equipment for precision finishing and production work.',
    body: 'Grinding and finishing machinery can include surface, cylindrical, centerless, internal, tool and cutter, lapping and honing equipment. Important specifications vary by machine type and intended application.'
  },
  'fabrication-machinery': {
    group: 'Fabricating',
    title: 'Used Fabrication Machinery for Sale',
    shortTitle: 'Fabrication Machinery',
    intro: 'Browse current used fabrication machinery including press brakes, shears and related metalworking equipment.',
    body: 'Fabrication machinery is selected around material type, thickness, working length, tonnage, control capability and tooling requirements.'
  },
  'edm-machines': {
    group: 'EDM',
    title: 'Used EDM Machines for Sale',
    shortTitle: 'EDM Machines',
    intro: 'Browse current used electrical discharge machines for precision wire and sinker EDM applications.',
    body: 'EDM equipment removes material by controlled electrical discharge and is commonly used for hardened materials, complex profiles, dies, molds and precision components.'
  },
  'engine-lathes-milling-drilling': {
    group: 'Engine Lathes, Drilling & Milling',
    title: 'Used Engine Lathes, Milling & Drilling Machines for Sale',
    shortTitle: 'Engine Lathes, Milling & Drilling Machines',
    intro: 'Browse current conventional lathes, milling machines and drilling equipment.',
    body: 'Manual and conventional machine tools remain useful for repair work, toolrooms, maintenance departments, prototype work and lower-volume machining.'
  }
}

const category = computed(() => categories[String(route.params.slug)] || null)
if (!category.value) throw createError({ statusCode: 404, statusMessage: 'Machine category not found' })

const machines = computed(() => (machinesData || [])
  .filter(machine =>
    machine.Groups === category.value.group &&
    Number(machine.Sold) === 0 &&
    Number(machine.OffMarket ?? machine.Off_Market ?? 0) === 0 &&
    Number(machine.dont_advertise) === 0
  )
  .sort((a, b) => Number(b.Year || 0) - Number(a.Year || 0)))

const machineSlug = machine => `${machine.Manufacturer || ''}-${machine.Model || ''}`
  .toLowerCase()
  .replace(/[^a-z0-9]+/g, '-')
  .replace(/^-|-$/g, '')

const machineUrl = machine => `/equipment/${machine.InvID}/${machineSlug(machine)}`
const machineImage = machine => imagesData.find(file => file.toLowerCase().startsWith(`${machine.InvID}_`.toLowerCase())) || ''

const canonical = computed(() => `https://www.usedmachinerysource.com/equipment/type/${route.params.slug}`)
const description = computed(() => category.value.intro.slice(0, 158))

useSeoMeta({
  title: () => `${category.value.title} | UMS`,
  description: () => description.value,
  ogTitle: () => category.value.title,
  ogDescription: () => description.value,
  ogType: 'website',
  ogUrl: () => canonical.value
})

const structuredData = computed(() => ({
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'CollectionPage',
      name: category.value.title,
      url: canonical.value,
      description: description.value,
      isPartOf: { '@id': 'https://www.usedmachinerysource.com/#website' }
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.usedmachinerysource.com/' },
        { '@type': 'ListItem', position: 2, name: 'Equipment', item: 'https://www.usedmachinerysource.com/equipment' },
        { '@type': 'ListItem', position: 3, name: category.value.shortTitle, item: canonical.value }
      ]
    },
    {
      '@type': 'ItemList',
      name: category.value.title,
      itemListElement: machines.value.map((machine, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: [machine.Year, machine.Manufacturer, machine.Model].filter(Boolean).join(' '),
        url: `https://www.usedmachinerysource.com${machineUrl(machine)}`
      }))
    }
  ]
}))

useHead(() => ({
  htmlAttrs: { lang: 'en' },
  link: [{ rel: 'canonical', href: canonical.value }],
  script: [{ type: 'application/ld+json', children: JSON.stringify(structuredData.value) }]
}))
</script>

<style scoped>
.category-page{color:#17273a;background:#fff}.wrap{max-width:1260px;margin:0 auto;padding-left:28px;padding-right:28px}.hero{background:linear-gradient(105deg,#071b33,#0d2c52);color:#fff;padding:46px 0;border-bottom:4px solid #f47b20}.back{color:#d7e5f2;text-decoration:none;font-weight:700}.kicker{margin:17px 0 8px;color:#f47b20;font-size:.78rem;font-weight:900;letter-spacing:.12em}.hero h1{margin:0 0 12px;font-size:clamp(2rem,4vw,3.2rem)}.hero p{max-width:850px;margin:0;line-height:1.65;color:#e8eef5}.section{padding-top:44px;padding-bottom:52px}.section-head{display:flex;justify-content:space-between;align-items:end;gap:20px;margin-bottom:22px}.section-head h2{margin:0;color:#0b2545}.sale{color:#22733a}.text-link,.links a{color:#1c4587;font-weight:800;text-decoration:none}.grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:18px}.card{border:1px solid #d7dde5;border-radius:8px;overflow:hidden;background:#fff;display:flex;flex-direction:column}.image-link{height:210px;background:#f7f8fa;display:flex;align-items:center;justify-content:center}.image-link img{width:100%;height:100%;object-fit:contain}.placeholder{color:#667789;font-weight:700}.copy{padding:15px;display:flex;flex-direction:column;flex:1}.copy h3{margin:0 0 7px;font-size:18px;line-height:1.25}.copy h3 a{color:#0b2545;text-decoration:none}.type,.stock,.spec{margin:0 0 8px}.type{font-weight:700;color:#43566b}.stock{font-size:13px;color:#667789}.spec{font-size:13px;line-height:1.45;color:#43566b}.button{display:inline-block;align-self:flex-start;margin-top:auto;background:#1c4587;color:#fff;text-decoration:none;font-weight:800;padding:9px 13px;border-radius:5px}.empty{padding:28px;border:1px solid #d8e0e9;border-left:5px solid #f47b20;border-radius:8px}.info{background:#f4f7fa;padding:48px 0}.info h2{margin-top:0;color:#0b2545}.info p{max-width:980px;line-height:1.7;color:#43566b}.links{display:flex;flex-wrap:wrap;gap:18px;margin-top:18px}@media(max-width:1050px){.grid{grid-template-columns:repeat(3,minmax(0,1fr))}}@media(max-width:800px){.grid{grid-template-columns:repeat(2,minmax(0,1fr))}.section-head{align-items:flex-start;flex-direction:column}}@media(max-width:560px){.grid{grid-template-columns:1fr}.wrap{padding-left:18px;padding-right:18px}}
</style>
