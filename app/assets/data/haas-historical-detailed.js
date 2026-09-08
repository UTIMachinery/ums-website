import labels from './haas-spec-labels.js'
import p1 from './haas-detailed-1.js'
import p2 from './haas-detailed-2.js'
import p3 from './haas-detailed-3.js'
import p4 from './haas-detailed-4.js'

const raw = [...p1, ...p2, ...p3, ...p4]

export default raw.map(([model, slug, records]) => ({
  model,
  slug,
  records: (records || []).map(([year, control, invid, specPairs, fallback]) => ({
    year,
    control,
    invid,
    specs: (specPairs || []).map(([index, value]) => ({ label: labels[index] || `Specification ${index}`, value })),
    recordedSpecs: fallback || '',
    fallback: !(specPairs || []).length && Boolean(fallback)
  }))
}))
