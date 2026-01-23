<script setup>
import { Stethoscope, ShoppingBag, GraduationCap, Building2, ArrowRight } from 'lucide-vue-next'  
import  Imagen1  from '../../assets/img/IMAGEN 9.png';
import  Imagen2  from '../../assets/img/IMAGEN 1.png';
import  Imagen3  from '../../assets/img/IMAGEN 8.png';
import  Imagen4  from '../../assets/img/IMAGEN 10.png';

const industries = [
  {
    id: 1,
    name: 'Salud y Clínicas',
    desc: 'Esterilización de áreas críticas y protocolos sanitarios de alta complejidad.',
    icon: Stethoscope,
    image: Imagen1,
    color: 'bg-teal-500'
  },
  {
    id: 2,
    name: 'Retail y Mall',
    desc: 'Mantenimiento continuo para zonas de alto tráfico y patios de comida.',
    icon: ShoppingBag,
    image: Imagen2,
    color: 'bg-pink-500'
  },
  {
    id: 3,
    name: 'Educación',
    desc: 'Limpieza profunda en vacaciones y mantención diaria para espacios seguros.',
    icon: GraduationCap,
    image: Imagen3,
    color: 'bg-orange-500'
  },
  {
    id: 4,
    name: 'Oficinas Corp.',
    desc: 'Detalles que cuidan la imagen de su marca y el bienestar de sus equipos.',
    icon: Building2,
    image: Imagen4,
    color: 'bg-blue-500'
  }
]
</script>

<template>
  <section id="industrias" class="py-24 bg-white overflow-hidden">
    <div class="container mx-auto px-6">
      
      <div class="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
        <div class="max-w-2xl animate-fade-in-up">
          <span class="text-blue-600 font-bold tracking-wider uppercase text-sm mb-2 block">Sectores</span>
          <h2 class="text-4xl md:text-5xl font-bold text-slate-900 mb-6 leading-tight">
            Especialistas en su <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-cyan-500">Ecosistema</span>
          </h2>
          <p class="text-slate-600 text-lg leading-relaxed">
            No existe una "limpieza general". Cada industria tiene puntos críticos, normativas y horarios únicos. Nosotros nos adaptamos a su realidad operativa, no al revés.
          </p>
        </div>
        
        <a href="#contacto" class="group hidden md:inline-flex items-center gap-2 px-6 py-3 rounded-full bg-slate-50 text-blue-900 font-bold hover:bg-blue-50 transition-colors">
          Cotizar mi sector
          <ArrowRight class="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </a>
      </div>

      <div class="flex flex-col lg:flex-row gap-4 h-auto lg:h-[500px] min-h-[500px]">
        
        <div 
          v-for="ind in industries" 
          :key="ind.id"
          class="group relative flex-1 hover:flex-[3.5] transition-[flex] duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] overflow-hidden rounded-3xl cursor-pointer shadow-lg hover:shadow-2xl"
        >
          <img 
            :src="ind.image" 
            :alt="ind.name"
            class="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 filter grayscale-[20%] group-hover:grayscale-0" 
          />
          
          <div class="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent opacity-80 group-hover:opacity-70 transition-opacity"></div>

          <div class="absolute inset-0 p-8 flex flex-col justify-end">
            
            <div class="mb-auto opacity-0 lg:opacity-100 transition-opacity duration-300 transform -translate-y-4 group-hover:translate-y-0 group-hover:opacity-100">
               <div :class="`w-12 h-12 rounded-xl flex items-center justify-center backdrop-blur-md bg-white/10 border border-white/20 text-white shadow-lg`">
                 <component :is="ind.icon" class="w-6 h-6" />
               </div>
            </div>

            <div class="relative z-10 translate-y-4 lg:translate-y-8 group-hover:translate-y-0 transition-transform duration-500 delay-75">
              <h3 class="text-2xl lg:text-3xl font-bold text-white mb-3 flex items-center gap-3">
                {{ ind.name }}
                <span :class="`h-1 w-0 group-hover:w-12 transition-all duration-500 rounded-full ${ind.color}`"></span>
              </h3>
              
              <div class="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-[grid-template-rows] duration-500">
                <p class="overflow-hidden text-slate-300 text-sm lg:text-base leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                  {{ ind.desc }}
                </p>
              </div>

              <div class="mt-6 opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-200 lg:block hidden">
                <span class="text-xs font-bold text-white uppercase tracking-widest border-b border-white/30 pb-1">Ver Solución</span>
              </div>
            </div>
          </div>

          <div class="absolute inset-0 border-2 border-white/0 group-hover:border-white/20 rounded-3xl transition-colors duration-500 pointer-events-none"></div>
        </div>

      </div>

      <div class="mt-8 text-center md:hidden">
         <a href="#contacto" class="inline-block text-blue-900 font-bold border-b-2 border-blue-900 hover:text-blue-700">
           Ver todos los sectores
         </a>
      </div>

    </div>
  </section>
</template>