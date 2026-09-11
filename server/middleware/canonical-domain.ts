export default defineEventHandler((event) => {
  const url = getRequestURL(event)
  const forwardedHost = getRequestHeader(event, 'x-forwarded-host')
  const hostHeader = forwardedHost || getRequestHeader(event, 'host') || url.host
  const hostname = hostHeader.split(',')[0].trim().split(':')[0].toLowerCase()

  if (
    hostname === 'equipment.usedmachinerysource.com' ||
    hostname === 'usedmachinerysource.com'
  ) {
    return sendRedirect(
      event,
      `https://www.usedmachinerysource.com${url.pathname}${url.search}`,
      301
    )
  }
})
