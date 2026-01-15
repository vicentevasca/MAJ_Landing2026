<script setup>
import { ShieldCheck, ArrowRight, CheckCircle2 } from 'lucide-vue-next'
import BaseButton from '../ui/BaseButton.vue'

const heroContent = {
  badge: 'Calidad Certificada ISO 9001',
  titleHighlight: 'Mantenimiento',
  subtitle: 'Más que limpieza, garantizamos continuidad operativa. Soluciones integrales para empresas que valoran su imagen, seguridad y eficiencia.',
  ctaPrimary: 'Solicitar Cotización',
  ctaSecondary: 'Nuestros Servicios'
}

const stats = [
  { value: '100%', label: 'Personal Certificado' },
  { value: '24/7', label: 'Cobertura Operativa' },
  { value: '+50', label: 'Empresas Confían' },
]
</script>

<template>
  <section class="relative min-h-[95vh] flex items-stretch overflow-hidden bg-slate-900">
    
    <div class="absolute inset-0 z-0">
      <img 
        src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop" 
        alt="Fondo oficinas" 
        class="w-full h-full object-cover opacity-40"
      />
      <div class="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900/95 to-blue-900/30 z-10"></div>
      <div class="absolute inset-0 bg-grid-pattern opacity-20 z-10 mix-blend-overlay"></div>
    </div>

    <div class="relative z-20 container mx-auto px-6 h-full flex items-center pt-24 md:pt-0">
      <div class="grid md:grid-cols-12 gap-8 w-full items-center">
        
        <div class="md:col-span-7 flex flex-col justify-center animate-fade-in-up">
          
          <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-400/20 text-blue-300 text-sm font-semibold mb-8 backdrop-blur-md w-fit shadow-[0_0_15px_rgba(59,130,246,0.2)]">
            <ShieldCheck class="w-4 h-4 text-blue-400" />
            <span>{{ heroContent.badge }}</span>
          </div>

          <h1 class="text-5xl md:text-7xl font-extrabold text-white leading-[1.1] mb-6 tracking-tight">
            Excelencia en <br>
            <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-white drop-shadow-lg">
              {{ heroContent.titleHighlight }}
            </span>
          </h1>

          <p class="text-lg md:text-xl text-slate-300 mb-10 leading-relaxed max-w-2xl font-light delay-100 animate-fade-in-up opacity-0" style="animation-fill-mode: forwards;">
            {{ heroContent.subtitle }}
          </p>

          <div class="flex flex-col sm:flex-row gap-5 mb-16 delay-200 animate-fade-in-up opacity-0" style="animation-fill-mode: forwards;">
            <BaseButton href="#contacto" variant="primary" class="shadow-blue-500/20 shadow-2xl text-lg px-8 py-4 hover:shadow-blue-400/40 transition-shadow">
              {{ heroContent.ctaPrimary }}
              <ArrowRight class="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </BaseButton>
            <BaseButton href="#servicios" variant="outline" class="backdrop-blur-sm text-lg px-8 py-4 hover:bg-white/10 border-white/20">
              {{ heroContent.ctaSecondary }}
            </BaseButton>
          </div>

          <div class="grid grid-cols-3 gap-6 border-t border-white/10 pt-8 max-w-lg delay-300 animate-fade-in-up opacity-0" style="animation-fill-mode: forwards;">
            <div v-for="(stat, index) in stats" :key="index">
              <p class="text-3xl lg:text-4xl font-bold text-white tracking-tight">{{ stat.value }}</p>
              <p class="text-xs text-blue-200 uppercase tracking-wider font-semibold mt-1">{{ stat.label }}</p>
            </div>
          </div>
        </div>
        
        <div class="md:col-span-5 hidden md:flex items-end justify-end relative z-10 pointer-events-none mt-10">
          <div class="absolute inset-0 bg-blue-500/20 blur-[100px] rounded-full translate-y-20"></div>
          
          <img 
            src="/src/assets/img/trabajador-maj.png" 
            alt="Profesional de limpieza MAJ" 
            class="w-auto max-h-[75vh] object-contain drop-shadow-2xl animate-float"
            style="mask-image: linear-gradient(to bottom, black 90%, transparent 100%);"
          />
          </div>
      </div>
    </div>
  </section>
</template>