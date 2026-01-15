<script setup>
import { ref, onMounted } from 'vue'
import { ShieldCheck, ArrowRight, MousePointer2 } from 'lucide-vue-next'
import BaseButton from '../ui/BaseButton.vue'

// --- DATOS EDITABLES ---
const heroContent = {
  badge: 'Certificación ISO 9001 en proceso',
  title: 'Excelencia en',
  highlight: 'Mantenimiento', // Palabra destacada
  subtitle: 'Más que limpieza, garantizamos continuidad operativa. Soluciones integrales para empresas que valoran su imagen, seguridad y eficiencia.',
  ctaPrimary: 'Solicitar Cotización',
  ctaSecondary: 'Nuestros Servicios'
}

// --- LÓGICA DE CONTADORES ---
const stats = ref([
  { label: 'Personal Certificado', value: 100, suffix: '%', current: 0 },
  { label: 'Cobertura Operativa', value: 24, suffix: '/7', current: 0 },
  { label: 'Empresas Confían', value: 15, suffix: '+', current: 0 }
])

// Función para animar los números (Count Up)
const animateStats = () => {
  stats.value.forEach(stat => {
    const duration = 2000 // 2 segundos
    const stepTime = 20
    const steps = duration / stepTime
    const increment = stat.value / steps
    
    let currentStep = 0
    const timer = setInterval(() => {
      currentStep++
      stat.current = Math.min(Math.ceil(stat.current + increment), stat.value)
      
      if (currentStep >= steps) {
        stat.current = stat.value // Asegurar valor final exacto
        clearInterval(timer)
      }
    }, stepTime)
  })
}

onMounted(() => {
  // Iniciar animaciones al montar
  setTimeout(() => {
    animateStats()
  }, 500) // Pequeño delay para sincronizar con la entrada visual
})
</script>

<template>
  <section class="relative min-h-screen flex items-center pt-20 overflow-hidden group">
    
    <div class="absolute inset-0 z-0 overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900/90 to-blue-900/30 z-10"></div>
      
      <img 
        src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop" 
        alt="Mantenimiento de oficinas MAJ" 
        class="w-full h-full object-cover animate-ken-burns origin-center opacity-90"
      />
    </div>

    <div class="relative z-20 container mx-auto px-6 mt-10 md:mt-0">
      <div class="max-w-4xl"> <div class="opacity-0 animate-fade-up" style="animation-delay: 100ms;">
          <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-400/20 text-blue-300 text-sm font-semibold mb-8 backdrop-blur-md hover:bg-blue-500/20 transition-colors cursor-default shadow-lg shadow-blue-900/20">
            <ShieldCheck class="w-4 h-4 text-blue-400" />
            <span>{{ heroContent.badge }}</span>
          </div>
        </div>

        <h1 class="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.1] mb-6 tracking-tight opacity-0 animate-fade-up" style="animation-delay: 300ms;">
          {{ heroContent.title }} <br>
          <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-teal-200 animate-gradient-x background-animate">
            {{ heroContent.highlight }}
          </span>
        </h1>

        <p class="text-lg md:text-xl text-slate-300 mb-10 leading-relaxed max-w-2xl font-light opacity-0 animate-fade-up" style="animation-delay: 500ms;">
          {{ heroContent.subtitle }}
        </p>

        <div class="flex flex-col sm:flex-row gap-4 opacity-0 animate-fade-up" style="animation-delay: 700ms;">
          <BaseButton href="#contacto" variant="primary" class="shadow-xl shadow-blue-500/20 hover:shadow-blue-500/40">
            {{ heroContent.ctaPrimary }}
            <ArrowRight class="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </BaseButton>
          
          <BaseButton href="#servicios" variant="outline" class="backdrop-blur-sm bg-white/5 border-white/20 text-white hover:bg-white/10">
            {{ heroContent.ctaSecondary }}
          </BaseButton>
        </div>

        <div class="mt-20 pt-8 border-t border-white/10 grid grid-cols-2 md:grid-cols-3 gap-8 opacity-0 animate-fade-up" style="animation-delay: 900ms;">
          <div v-for="(stat, index) in stats" :key="index" class="group/stat">
            <div class="flex items-baseline gap-1">
               <p class="text-4xl md:text-5xl font-bold text-white tabular-nums tracking-tight">
                 {{ stat.current }}{{ stat.suffix }}
               </p>
            </div>
            <p class="text-sm font-medium text-blue-200/80 mt-1 uppercase tracking-wider group-hover/stat:text-blue-300 transition-colors">
              {{ stat.label }}
            </p>
          </div>
        </div>

      </div>
    </div>

    <div class="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20 flex flex-col items-center gap-2 opacity-60 animate-bounce-slow hidden md:flex">
      <span class="text-[10px] text-white uppercase tracking-[0.2em] font-bold">Descubre más</span>
      <div class="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center p-1">
        <div class="w-1 h-2 bg-white rounded-full animate-scroll-dot"></div>
      </div>
    </div>

  </section>
</template>

<style scoped>
/* 1. Animación Ken Burns (Zoom Lento) */
@keyframes ken-burns {
  0% { transform: scale(1); }
  100% { transform: scale(1.1); }
}
.animate-ken-burns {
  animation: ken-burns 20s ease-out forwards;
}

/* 2. Animación de Entrada (Fade Up) */
@keyframes fade-up {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.animate-fade-up {
  animation: fade-up 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
}

/* 3. Gradiente de Texto en movimiento sutil */
.background-animate {
  background-size: 200%;
  animation: gradient-shine 5s ease infinite;
}
@keyframes gradient-shine {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

/* 4. Scroll Dot Animation */
@keyframes scroll-dot {
  0% { transform: translateY(0); opacity: 1; }
  100% { transform: translateY(12px); opacity: 0; }
}
.animate-scroll-dot {
  animation: scroll-dot 1.5s infinite;
}

@keyframes bounce-slow {
  0%, 100% { transform: translate(-50%, 0); }
  50% { transform: translate(-50%, 10px); }
}
.animate-bounce-slow {
  animation: bounce-slow 2s infinite ease-in-out;
}
</style>