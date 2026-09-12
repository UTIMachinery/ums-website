import p1 from './hmc-packed/p1.js'
import p2 from './hmc-packed/p2.js'
import p3 from './hmc-packed/p3.js'
import p4a from './hmc-packed/p4a.js'
import p4b from './hmc-packed/p4b.js'
import p4c from './hmc-packed/p4c.js'
import p4d from './hmc-packed/p4d.js'
import p5 from './hmc-packed/p5.js'

const payload = p1 + p2 + p3 + p4a + p4b + p4c + p4d + p5
const bytes = Uint8Array.from(atob(payload), c => c.charCodeAt(0))
const stream = new Blob([bytes]).stream().pipeThrough(new DecompressionStream('gzip'))
const text = await new Response(stream).text()

export default JSON.parse(text)
