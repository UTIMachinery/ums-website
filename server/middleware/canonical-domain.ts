export default defineEventHandler((event) => {
  const url = getRequestURL(event)

  if (url.hostname === 'equipment.usedmachinerysource.com') {
    return sendRedirect(
      event,
      `https://www.usedmachinerysource.com${url.pathname}${url.search}`,
      301
    )
  }
})
