<template>
  <div>
    <article v-for="(c,index) in configurations" :key="c.title" class="configuration">
      <div class="config-head">
        <div>
          <div class="year">{{ c.year }} <span class="year-model">{{ model }}</span></div>
          <h3>{{ c.title }}</h3>
          <p><strong>Control:</strong> {{ c.control || 'Not recorded' }}</p>
        </div>
        <button type="button" class="copy-button" @click="copySpecs(c,index)">
          {{ copiedIndex===index ? 'Copied!' : 'Copy Specifications' }}
        </button>
      </div>
      <div class="spec-grid">
        <div v-for="s in c.specs" :key="s.label" class="spec">
          <span>{{ s.label }}</span>
          <strong>{{ s.value }}</strong>
        </div>
      </div>
      <p v-if="c.note" class="note">{{ c.note }}</p>
    </article>
  </div>
</template>

<script setup>
const props=defineProps({
  model:{type:String,required:true},
  configurations:{type:Array,required:true}
})

const copiedIndex=ref(null)
let copiedTimer

const cleanText=value=>String(value??'').replace(/\uFFFD/g,'').replace(/[\u200B-\u200D\uFEFF]/g,'').replace(/\s+/g,' ').trim()

async function copySpecs(c,index){
  const lines=[
    cleanText(`${c.year} ${props.model}`),
    `Control: ${cleanText(c.control||'Not recorded')}`,
    ...((c.specs||[]).map(s=>`${cleanText(s.label)}: ${cleanText(s.value)}`)),
  ]
  if(c.note) lines.push(cleanText(c.note))
  const text=lines.filter(Boolean).join('\n')
  try{
    await navigator.clipboard.writeText(text)
    copiedIndex.value=index
    clearTimeout(copiedTimer)
    copiedTimer=setTimeout(()=>{copiedIndex.value=null},1800)
  }catch(error){
    console.error('Could not copy specifications',error)
  }
}
</script>

<style scoped>
.configuration{border:1px solid #cfd9e3;border-radius:10px;padding:24px;margin:24px 0;background:#fff}
.config-head{display:flex;justify-content:space-between;align-items:flex-start;gap:18px}
.config-head h3{font-size:1.35rem;color:#0b2545;margin:4px 0 6px}
.config-head p{margin:0}
.year{font-size:.82rem;font-weight:900;letter-spacing:.06em;color:#1c4587}
.year-model{margin-left:8px;color:#0b2545;letter-spacing:0}
.copy-button{flex:0 0 auto;background:#1c4587;color:#fff;border:1px solid #1c4587;border-radius:5px;padding:9px 13px;font-size:.78rem;font-weight:800;cursor:pointer}
.copy-button:hover{background:#153765}
.spec-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px;margin-top:20px}
.spec{border:1px solid #d7e0e8;border-radius:8px;padding:15px;background:#f8fafc}
.spec span{display:block;color:#657688;font-size:.76rem;text-transform:uppercase;font-weight:800;margin-bottom:6px}
.spec strong{color:#0b2545}
.note{color:#53677a;line-height:1.55;margin-bottom:0}
@media(max-width:760px){.config-head{flex-direction:column}.copy-button{width:100%}.spec-grid{grid-template-columns:1fr}}
</style>