<template>
  <main class="manufacturer-page">
    <section class="hero">
      <div class="wrap">
        <NuxtLink to="/equipment" class="back">← All Equipment</NuxtLink>
        <div class="kicker">USED MACHINERY BY MANUFACTURER</div>
        <h1>Used {{ manufacturer.name }} Machines for Sale</h1>
        <p>Browse current used {{ manufacturer.name }} machinery available through Used Machinery Source.</p>
      </div>
    </section>

    <section class="wrap section">
      <div class="section-head">
        <div>
          <div class="kicker sale">CURRENT INVENTORY</div>
          <h2>{{ machines.length }} {{ manufacturer.name }} Machine{{ machines.length === 1 ? '' : 's' }} Available</h2>
        </div>
        <NuxtLink to="/equipment" class="text-link">View all equipment →</NuxtLink>
      </div>

      <div v-if="machines.length" class="grid">
        <article v-for="machine in machines" :key="machine.InvID" class="card">
          <NuxtLink :to="machineUrl(machine)" class="image-link">
            <img
              v-if="machineImage(machine)"
              :src="`/Images/${machineImage(machine)}`"
              :alt="`Used ${machine.Year || ''} ${machine.Manufacturer || ''} ${machine.Model || ''} ${machine.WebDesc || 'machine'} for sale`.replace(/\s+/g,' ').trim()"
              loading="lazy"
            />
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
        <h2>No {{ manufacturer.name }} machines are listed right now.</h2>
        <p>Inventory changes regularly. Tell us what you need and we can help locate a machine.</p>
        <NuxtLink to="/equipment#tell-us-what-you-need" class="button">Tell Us What You Need</NuxtLink>
      </div>
    </section>

    <section class="info">
      <div class="wrap">
        <h2>About Used {{ manufacturer.name }} Machines</h2>
        <p>{{ manufacturer.body }}</p>
        <div class="links">
          <NuxtLink to="/equipment">Browse All Used Machinery</NuxtLink>
          <NuxtLink v-if="manufacturer.specLink" :to="manufacturer.specLink">Research {{ manufacturer.name }} CNC Lathe Specifications</NuxtLink>
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

const manufacturers = {
  haas: {
    name: 'Haas',
    aliases: ['Haas'],
    body: 'Used Haas machinery commonly includes vertical machining centers, CNC lathes and turning centers. Buyers typically compare model, year, axis travels, spindle speed, tool capacity, control features and installed options.',
    specLink: '/spec-library/haas/cnc-lathes'
  },
  doosan: {
    name: 'Doosan',
    aliases: ['Doosan', 'DN Solutions'],
    body: 'Used Doosan and DN Solutions machinery includes CNC lathes, turning centers and machining centers across a wide range of sizes and configurations.'
  },
  hurco: {
    name: 'Hurco',
    aliases: ['Hurco'],
    body: 'Used Hurco machinery commonly includes vertical machining centers and CNC mills known for conversational CNC controls and flexible job-shop capability.'
  },
  mazak: {
    name: 'Mazak',
    aliases: ['Mazak'],
    body: 'Used Mazak machinery includes Quick Turn CNC lathes, Integrex multi-tasking machines, machining centers and other production equipment spanning many generations and control platforms.',
    specLink: '/spec-library/mazak/cnc-lathes'
  },
  'mori-seiki': {
    name: 'Mori-Seiki',
    aliases: ['Mori-Seiki', 'Mori Seiki', 'DMG Mori', 'DMG MORI', 'DMG-Mori'],
    body: 'Used Mori-Seiki and DMG MORI machinery includes CNC turning centers, multi-axis lathes and machining centers known for rigid construction and production capability.',
    specLink: '/spec-library/mori-seiki/cnc-lathes'
  },
  okuma: {
    name: 'Okuma',
    aliases: ['Okuma'],
    body: 'Used Okuma machinery includes CNC lathes, turning centers and machining centers across multiple control generations and machine families.',
    specLink: '/spec-library/okuma/cnc-lathes'
  },
  kingston: {
    name: 'Kingston',
    aliases: ['Kingston'],
    body: 'Used Kingston machinery includes manual and CNC lathes and related machine tools for maintenance, toolroom and production applications.'
  },
  amada: {
    name: 'Amada',
    aliases: ['Amada'],
    body: 'Used Amada machinery commonly includes press brakes, shears and automated fabrication systems for sheet-metal and structural fabrication.'
  }
}

const manufacturer = computed(() => manufacturers[String(route.params.slug)] || null)
if (!manufacturer.value) throw createError({ statusCode: 404, statusMessage: 'Manufacturer not found' })

const names = computed(() => manufacturer.value.aliases.map(x => x.toLowerCase()))
const machines = computed(() => (machinesData || [])
  .filter(machine =>
    names.value.includes(String(machine.Manufacturer || '').trim().toLowerCase()) &&
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

const canonical = computed(() => `https://www.usedmachinerysource.com/equipment/manufacturer/${route.params.slug}`)
const metaDescription = computed(() =>
  `Browse current used ${manufacturer.value.name} machines for sale from Used Machinery Source, including available CNC and industrial machinery.`
)

useSeoMeta({
  title: () => `Used ${manufacturer.value.name} Machines for Sale | UMS`,
  description: () => metaDescription.value,
  ogTitle: () => `Used ${manufacturer.value.name} Machines for Sale`,
  ogDescription: () => metaDescription.value,
  ogType: 'website',
  ogUrl: () => canonical.value
})

const structuredData = computed(() => ({
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'CollectionPage',
      name: `Used ${manufacturer.value.name} Machines for Sale`,
      url: canonical.value,
      description: metaDescription.value,
      isPartOf: { '@id': 'https://www.usedmachinerysource.com/#website' }
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.usedmachinerysource.com/' },
        { '@type': 'ListItem', position: 2, name: 'Equipment', item: 'https://www.usedmachinerysource.com/equipment' },
        { '@type': 'ListItem', position: 3, name: manufacturer.value.name, item: canonical.value }
      ]
    },
    {
      '@type': 'ItemList',
      name: `Current Used ${manufacturer.value.name} Inventory`,
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
.manufacturer-page{color:#17273a;background:#fff}.wrap{max-width:1260px;margin:0 auto;padding-left:28px;padding-right:28px}.hero{background:linear-gradient(105deg,#071b33,#0d2c52);color:#fff;padding:46px 0;border-bottom:4px solid #f47b20}.back{color:#d7e5f2;text-decoration:none;font-weight:700}.kicker{margin:17px 0 8px;color:#f47b20;font-size:.78rem;font-weight:900;letter-spacing:.12em}.hero h1{margin:0 0 12px;font-size:clamp(2rem,4vw,3.2rem)}.hero p{max-width:850px;margin:0;line-height:1.65;color:#e8eef5}.section{padding-top:44px;padding-bottom:52px}.section-head{display:flex;justify-content:space-between;align-items:end;gap:20px;margin-bottom:22px}.section-head h2{margin:0;color:#0b2545}.sale{color:#22733a}.text-link,.links a{color:#1c4587;font-weight:800;text-decoration:none}.grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:18px}.card{border:1px solid #d7dde5;border-radius:8px;overflow:hidden;background:#fff;display:flex;flex-direction:column}.image-link{height:210px;background:#f7f8fa;display:flex;align-items:center;justify-content:center}.image-link img{width:100%;height:100%;object-fit:contain}.placeholder{color:#667789;font-weight:700}.copy{padding:15px;display:flex;flex-direction:column;flex:1}.copy h3{margin:0 0 7px;font-size:18px;line-height:1.25}.copy h3 a{color:#0b2545;text-decoration:none}.type,.stock,.spec{margin:0 0 8px}.type{font-weight:700;color:#43566b}.stock{font-size:13px;color:#667789}.spec{font-size:13px;line-height:1.45;color:#43566b}.button{display:inline-block;align-self:flex-start;margin-top:auto;background:#1c4587;color:#fff;text-decoration:none;font-weight:800;padding:9px 13px;border-radius:5px}.empty{padding:28px;border:1px solid #d8e0e9;border-left:5px solid #f47b20;border-radius:8px}.info{background:#f4f7fa;padding:48px 0}.info h2{margin-top:0;color:#0b2545}.info p{max-width:980px;line-height:1.7;color:#43566b}.links{display:flex;flex-wrap:wrap;gap:18px;margin-top:18px}@media(max-width:1050px){.grid{grid-template-columns:repeat(3,minmax(0,1fr))}}@media(max-width:800px){.grid{grid-template-columns:repeat(2,minmax(0,1fr))}.section-head{align-items:flex-start;flex-direction:column}}@media(max-width:560px){.grid{grid-template-columns:1fr}.wrap{padding-left:18px;padding-right:18px}}
</style>
