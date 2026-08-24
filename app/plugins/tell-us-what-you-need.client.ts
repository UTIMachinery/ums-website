export default defineNuxtPlugin((nuxtApp) => {
  const router = useRouter()

  const openMachineNeededForm = async () => {
    if (window.location.hash !== '#tell-us-what-you-need') return

    await nextTick()

    setTimeout(() => {
      const section = document.getElementById('tell-us-what-you-need')
      if (!section) return

      section.scrollIntoView({ behavior: 'smooth', block: 'center' })

      const button = section.querySelector('.machine-needed-button') as HTMLButtonElement | null
      if (button) {
        setTimeout(() => button.click(), 350)
      }
    }, 250)
  }

  nuxtApp.hook('app:mounted', openMachineNeededForm)

  router.afterEach(() => {
    openMachineNeededForm()
  })
})
