import machinesData from '~/assets/data/machines.json'

export default defineNuxtPlugin(() => {
  const route = useRoute()

  const machine = computed(() => {
    if (!route.path.startsWith('/equipment/')) return null

    const rawId = Array.isArray(route.params.id) ? route.params.id[0] : route.params.id
    const id = Number(rawId)
    if (!Number.isFinite(id)) return null

    return (machinesData as any[]).find((item) => Number(item.InvID) === id) || null
  })

  const modelFirstTitle = computed(() => {
    const m = machine.value
    if (!m) return undefined

    const manufacturer = String(m.Manufacturer || '').trim()
    const model = String(m.Model || '').trim()
    const year = String(m.Year || '').trim()
    const type = String(m.WebDesc || 'Used Machine').trim()

    return `${manufacturer} ${model} ${type} for Sale | ${year} | Used Machinery Source`
      .replace(/\s+/g, ' ')
      .trim()
  })

  const modelFirstDescription = computed(() => {
    const m = machine.value
    if (!m) return undefined

    const manufacturer = String(m.Manufacturer || '').trim()
    const model = String(m.Model || '').trim()
    const year = String(m.Year || '').trim()
    const type = String(m.WebDesc || 'used machine').trim()
    const highlights = String(m.AdvSpec || '')
      .replace(/[\r\n]+/g, ' ')
      .replace(/\s+/g, ' ')
      .trim()

    const lead = `${manufacturer} ${model} ${type} for sale. Used ${year} machine available from Used Machinery Source.`
    const full = highlights ? `${lead} Key features: ${highlights}` : lead

    return full.slice(0, 165).trim()
  })

  useSeoMeta({
    title: () => modelFirstTitle.value,
    description: () => modelFirstDescription.value,
    ogTitle: () => modelFirstTitle.value,
    ogDescription: () => modelFirstDescription.value,
    twitterTitle: () => modelFirstTitle.value,
    twitterDescription: () => modelFirstDescription.value
  })

  // Keep the visible machine heading model-first as well. The page's existing
  // subtitle still shows machine type and stock number immediately below it.
  if (import.meta.client) {
    const updateHeading = async () => {
      const m = machine.value
      if (!m) return

      await nextTick()
      const heading = document.querySelector('.machine-detail .machine-info h1')
      if (!heading) return

      const manufacturer = String(m.Manufacturer || '').trim()
      const model = String(m.Model || '').trim()
      const year = String(m.Year || '').trim()
      heading.textContent = `${manufacturer} ${model} – ${year}`.replace(/\s+/g, ' ').trim()
    }

    watch(
      () => [route.fullPath, machine.value?.InvID],
      () => updateHeading(),
      { immediate: true }
    )
  }
})
