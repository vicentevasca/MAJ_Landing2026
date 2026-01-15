<script setup>
// Duplicamos la lista para que el scroll infinito sea fluido visualmente
const clients = [
  'Clínica Alemana', 'Cencosud', 'Banco de Chile', 'Sodimac', 'Universidad Católica',
  'Falabella', 'Copec', 'Latam', 'Clínica Alemana', 'Cencosud', 'Banco de Chile' 
]
</script>

<template>
  <section class="py-10 bg-white border-b border-slate-100 overflow-hidden relative">
    
    <div class="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white to-transparent z-10"></div>
    <div class="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-white to-transparent z-10"></div>

    <div class="container mx-auto px-6 mb-6">
      <p class="text-center text-xs font-bold text-slate-400 uppercase tracking-[0.2em]">
        Confianza depositada por líderes
      </p>
    </div>

    <div class="flex w-full overflow-hidden">
      <div class="flex items-center gap-16 animate-scroll whitespace-nowrap pl-16">
        <div 
          v-for="(client, index) in clients" 
          :key="index" 
          class="text-xl md:text-2xl font-bold text-slate-300 flex items-center gap-3 grayscale hover:grayscale-0 hover:text-blue-900 transition-all duration-300 cursor-default"
        >
          <div class="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-xs text-slate-400">Logo</div>
          <span>{{ client }}</span>
        </div>
      </div>
    </div>
  </section>
</template>