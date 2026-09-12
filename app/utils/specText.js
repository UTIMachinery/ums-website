export function cleanSpecText(value) {
  if (value === null || value === undefined) return ''
  return String(value)
    .replace(/\u00c2\u00b0/g, '°')
    .replace(/\u00c2(?=["'′″])/g, '')
    .replace(/\u00e2\u20ac\u201c/g, '—')
    .replace(/\u00e2\u20ac\u201d/g, '—')
    .replace(/\u00e2\u20ac\u2013/g, '–')
    .replace(/\u00e2\u20ac\u2122/g, '’')
    .replace(/\u00e2\u20ac\u0153/g, '“')
    .replace(/\u00e2\u20ac\u009d/g, '”')
    .replace(/\u00e2\u20ac\u00b3/g, '″')
    .replace(/\u00e2\u20ac\u00b2/g, '′')
    .replace(/\u00c3\u2014/g, '×')
    .replace(/[░▒▓]/g, '°')
    .replace(/\uFFFD+/g, '')
    .replace(/[\u200B-\u200D\uFEFF]/g, '')
    .replace(/\u00a0/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

export function cleanSpecObject(value) {
  if (Array.isArray(value)) return value.map(cleanSpecObject)
  if (value && typeof value === 'object') {
    return Object.fromEntries(Object.entries(value).map(([k,v]) => [k, cleanSpecObject(v)]))
  }
  return typeof value === 'string' ? cleanSpecText(value) : value
}
