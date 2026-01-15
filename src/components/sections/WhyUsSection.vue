<script setup>
import { UserCheck, Zap, FileCheck2, TrendingUp, Shield } from 'lucide-vue-next'

const features = [
  {
    title: 'Supervisión Activa 24/7',
    desc: 'No abandonamos el servicio. Asignamos supervisores técnicos dedicados que auditan la calidad mediante una app de gestión en tiempo real.',
    icon: UserCheck
  },
  {
    title: 'Tecnología de Vanguardia',
    desc: 'Uso de maquinaria industrial silenciosa y químicos certificados biodegradable para reducir el impacto ambiental y operativo.',
    icon: Zap
  },
  {
    title: 'Blindaje Legal Total',
    desc: 'Cero riesgos para su empresa. Personal 100% contratado bajo normativa laboral vigente (Ley de Subcontratación).',
    icon: FileCheck2
  }
]
</script>

<template>
  <section id="nosotros" class="py-32 bg-slate-950 text-white relative overflow-hidden">
    
    <div class="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
    <div class="absolute inset-0 bg-grid-pattern opacity-[0.03]"></div>
    
    <div class="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none translate-x-1/2 -translate-y-1/2"></div>
    <div class="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-600/10 blur-[100px] rounded-full pointer-events-none -translate-x-1/3 translate-y-1/3"></div>

    <div class="container mx-auto px-6 relative z-10">
      <div class="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
        
        <div class="order-2 lg:order-1">
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-900/30 border border-blue-800 text-blue-300 text-xs font-bold uppercase tracking-wider mb-6 backdrop-blur-sm">
            <Shield class="w-3 h-3" />
            Garantía MAJ
          </div>

          <h2 class="text-4xl md:text-5xl font-bold mb-6 leading-[1.15]">
            Más que limpieza, <br>
            <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">Inteligencia Operativa.</span>
          </h2>
          
          <p class="text-slate-400 text-lg mb-10 leading-relaxed font-light">
            Entendemos que el mantenimiento impacta directamente en su productividad. Hemos eliminado la improvisación mediante procesos estandarizados ISO y supervisión digitalizada.
          </p>
          
          <div class="space-y-4">
            <div 
              v-for="(feature, index) in features" 
              :key="index" 
              class="group flex gap-5 p-5 rounded-2xl transition-all duration-300 hover:bg-white/[0.03] border border-transparent hover:border-white/[0.05]"
            >
              <div class="flex-shrink-0 relative">
                <div class="absolute inset-0 bg-blue-500 blur-lg opacity-0 group-hover:opacity-40 transition-opacity duration-300"></div>
                <div class="w-14 h-14 bg-slate-900 rounded-xl border border-slate-800 flex items-center justify-center relative z-10 group-hover:border-blue-500/50 group-hover:bg-blue-950 transition-colors">
                  <component :is="feature.icon" class="w-6 h-6 text-blue-400 group-hover:text-white transition-colors" />
                </div>
              </div>

              <div>
                <h4 class="text-lg font-bold text-white mb-2 group-hover:text-blue-200 transition-colors">{{ feature.title }}</h4>
                <p class="text-slate-400 text-sm leading-relaxed group-hover:text-slate-300 transition-colors">{{ feature.desc }}</p>
              </div>
            </div>
          </div>
        </div>

        <div class="order-1 lg:order-2 relative h-[500px] lg:h-[600px] flex items-center justify-center">
          
          <div class="absolute inset-0 border border-dashed border-slate-800 rounded-full animate-[spin_60s_linear_infinite] opacity-50 scale-90"></div>

          <div class="relative w-full max-w-md h-[450px] rounded-2xl overflow-hidden shadow-2xl border border-slate-800 group">
            <img 
              src="https://brillasol.net/wp-content/uploads/2020/05/personal-limpieza-trabajando-brillasol1920x1280.jpg" 
              alt="Supervisión Técnica MAJ" 
              class="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-90"></div>
            
            <div class="absolute bottom-6 left-6 right-6">
              <p class="text-white font-bold text-lg">Estándar Corporativo</p>
              <p class="text-slate-300 text-xs mt-1">Protocolos de higiene certificados.</p>
            </div>
          </div>

          <div class="absolute bottom-0 -left-4 md:-left-10 bg-slate-900/80 backdrop-blur-md p-5 rounded-xl border border-slate-700 shadow-2xl shadow-black/50 animate-float">
            <div class="flex items-center gap-4">
              <div class="w-10 h-10 bg-green-500/20 rounded-full flex items-center justify-center text-green-400">
                <TrendingUp class="w-5 h-5" />
              </div>
              <div>
                <p class="text-xs text-slate-400 uppercase font-bold tracking-wider">Optimización</p>
                <p class="text-xl font-bold text-white">+30% Eficiencia</p>
              </div>
            </div>
          </div>

          <div class="absolute top-20 -right-4 md:right-0 bg-white/5 backdrop-blur-md px-4 py-2 rounded-lg border border-white/10 shadow-lg animate-float delay-200">
            <div class="flex items-center gap-2">
              <div class="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
              <p class="text-xs font-medium text-blue-100">Supervisión en tiempo real</p>
            </div>
          </div>

        </div>

      </div>
    </div>
  </section>
</template>