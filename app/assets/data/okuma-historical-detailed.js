import { cleanSpecObject } from '~/utils/specText'
import p1 from './okuma-packed/p1.js'
import p2 from './okuma-packed/p2.js'
import p3 from './okuma-packed/p3.js'
import p4 from './okuma-packed/p4.js'

const payload = p1 + p2 + p3 + p4
const bytes = Uint8Array.from(atob(payload), c => c.charCodeAt(0))
const stream = new Blob([bytes]).stream().pipeThrough(new DecompressionStream('gzip'))
const text = await new Response(stream).text()

export default cleanSpecObject(JSON.parse(text))