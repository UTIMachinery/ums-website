export const clean=v=>String(v||'').trim()
export const slug=v=>clean(v).toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'')
export const rawType=m=>clean(m.WebDesc||m.Web_Desc)
export const typeKind=v=>{const x=clean(v).toLowerCase();if(x.startsWith('cnc lathes'))return'lathe';if(x.startsWith('cnc machining centers, vertical'))return'vmc';if(x.startsWith('cnc machining centers, horizontal'))return'hmc';return'other'}
export const displayType=v=>{const k=typeKind(v);if(k==='lathe')return'CNC Lathes & Turning Centers';if(k==='vmc')return'Vertical Machining Centers (VMC)';if(k==='hmc')return'Horizontal Machining Centers (HMC)';return clean(v).toLowerCase().replace(/\b\w/g,c=>c.toUpperCase())}
export const browseTypeKey=v=>{const k=typeKind(v);return k==='other'?slug(v):k}
export const modelUrl=(manufacturer,model,type)=>'/spec-library/models/'+slug(manufacturer)+'/'+slug(model)+'?type='+encodeURIComponent(rawType({WebDesc:type}))
