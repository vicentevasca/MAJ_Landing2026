<script setup>
import { ref, computed } from 'vue'
import { 
  Building2, Sparkles, Sprout, ShieldCheck, ArrowRight, X, 
  Factory, Stethoscope, GraduationCap, Warehouse, Trees, CheckCircle2, ChevronRight 
} from 'lucide-vue-next'
import BaseButton from '../ui/BaseButton.vue'

// --- ESTADO ---
const activeCategory = ref('Todos')
const selectedService = ref(null)

// --- DATOS: CATEGORÍAS (Simplificadas para Mobile) ---
const categories = [
  { id: 'Todos', label: 'Todo' }, // Etiqueta más corta
  { id: 'Corporativo', label: 'Oficinas' },
  { id: 'Industrial', label: 'Industria' },
  { id: 'Salud', label: 'Salud' },
  { id: 'Educacion', label: 'Colegios' }
]

// --- DATOS: SERVICIOS (Mismo contenido) ---
const services = [
  {
    id: 1,
    title: 'Limpieza Corporativa', // Títulos ligeramente acortados para mobile si es necesario
    fullTitle: 'Limpieza Corporativa Integral',
    shortDesc: 'Mantenimiento diario de oficinas con protocolos de bajo impacto.',
    fullDesc: 'Nuestro servicio insignia para edificios corporativos. Diseñado para operar sin interrumpir su flujo de trabajo. Incluye limpieza de mobiliario, aspirado profundo, sanitización de baños y mantenimiento de áreas comunes.',
    icon: Building2,
    categories: ['Corporativo', 'Educacion'],
    features: ['Personal uniformado', 'Supervisión diaria', 'Horarios flexibles']
  },
  {
    id: 2,
    title: 'Aseo Industrial',
    fullTitle: 'Aseo Industrial Tecnificado',
    shortDesc: 'Limpieza técnica para plantas y centros de distribución.',
    fullDesc: 'Uso de barredoras y restregadoras industriales para grandes superficies. Eliminación de grasas, aceites y residuos de producción en plantas de alimentos, metalmecánicas y centros logísticos.',
    icon: Factory,
    categories: ['Industrial'],
    features: ['Maquinaria a bordo', 'Desengrasado industrial', 'Limpieza de altura']
  },
  {
    id: 3,
    title: 'Sanitización Clínica',
    fullTitle: 'Sanitización Clínica (MINSAL)',
    shortDesc: 'Desinfección de ambientes críticos bajo normativa.',
    fullDesc: 'Protocolos de desinfección de alto nivel para box médicos, pabellones, salas de espera y laboratorios. Utilizamos amonio cuaternario de 5ta generación y nebulización certificada.',
    icon: Stethoscope,
    categories: ['Salud', 'Educacion', 'Corporativo'],
    features: ['Certificado desinfección', 'Registro ISP', 'Personal capacitado']
  },
  {
    id: 4,
    title: 'Gestión de Residuos',
    fullTitle: 'Gestión de Residuos',
    shortDesc: 'Manejo sustentable y certificación de disposición final.',
    fullDesc: 'Nos encargamos de la segregación, retiro y transporte de residuos no peligrosos. Implementamos puntos limpios en su empresa y entregamos certificados de trazabilidad ambiental.',
    icon: Sprout,
    categories: ['Corporativo', 'Industrial', 'Educacion'],
    features: ['Certificados finales', 'Puntos Limpios', 'Huella de carbono']
  },
  {
    id: 5,
    title: 'Vidrios en Altura',
    fullTitle: 'Limpieza de Vidrios en Altura',
    shortDesc: 'Técnicas de acceso por cuerda para fachadas.',
    fullDesc: 'Recuperamos la transparencia de su edificio. Contamos con personal certificado en trabajos de altura (IRATA) y equipos de ósmosis inversa para un acabado sin vetas.',
    icon: Sparkles,
    categories: ['Corporativo', 'Salud', 'Industrial'],
    features: ['Seguro civil', 'Personal certificado', 'Limpieza fachadas']
  },
  {
    id: 6,
    title: 'Tratamiento de Pisos',
    fullTitle: 'Decapado y Sellado de Pisos',
    shortDesc: 'Restauración de brillo y protección antideslizante.',
    fullDesc: 'Tratamiento profundo para pisos de vinilo, piedra pizarra, mármol y concreto pulido. Removemos ceras antiguas y aplicamos polímeros de alta resistencia antideslizante.',
    icon: Warehouse,
    categories: ['Industrial', 'Salud', 'Retail'],
    features: ['Brillo espejo', 'Polímeros antideslizantes', 'Mayor durabilidad']
  },
  {
    id: 7,
    title: 'Aseo Educacional',
    fullTitle: 'Aseo Educacional',
    shortDesc: 'Limpieza profunda en vacaciones y mantención diaria.',
    fullDesc: 'Entornos seguros para el aprendizaje. Programas intensivos de limpieza en verano/invierno y mantención higiénica diaria de baños y casinos escolares.',
    icon: GraduationCap,
    categories: ['Educacion'],
    features: ['Hipoalergénicos', 'Personal revisado', 'Respuesta rápida']
  },
  {
    id: 8,
    title: 'Áreas Verdes',
    fullTitle: 'Mantención Áreas Verdes',
    shortDesc: 'Cuidado de jardines y paisajismo corporativo.',
    fullDesc: 'Servicio complementario para mantener el exterior de su empresa impecable. Poda, riego tecnificado, corte de césped y control de plagas en jardines.',
    icon: Trees,
    categories: ['Corporativo', 'Industrial', 'Educacion'],
    features: ['Paisajismo', 'Control plagas', 'Riego eficiente']
  }
]

// --- LÓGICA ---
const filteredServices = computed(() => {
  if (activeCategory.value === 'Todos') return services
  return services.filter(service => service.categories.includes(activeCategory.value))
})

const openModal = (service) => {
  selectedService.value = service
  document.body.style.overflow = 'hidden'
}

const closeModal = () => {
  selectedService.value = null
  document.body.style.overflow = 'auto'
}
</script>

<template>
  <section id="servicios" class="py-16 md:py-24 bg-slate-50 relative min-h-screen">
    
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
       <div class="absolute top-0 right-0 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-blue-100/40 rounded-full blur-[60px] md:blur-[100px] translate-x-1/3 -translate-y-1/4"></div>
       <div class="absolute bottom-0 left-0 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-indigo-100/40 rounded-full blur-[60px] md:blur-[100px] -translate-x-1/3 translate-y-1/4"></div>
    </div>

    <div class="container mx-auto px-4 md:px-6 relative z-10">
      
      <div class="flex flex-col items-center text-center mb-10 md:mb-16">
        <span class="text-blue-600 font-bold tracking-wider uppercase text-xs md:text-sm mb-2">Soluciones 360°</span>
        <h2 class="text-3xl md:text-5xl font-bold text-slate-900 mb-6 leading-tight">
          Servicios <span class="md:hidden">MAJ</span>
          <span class="hidden md:inline">diseñados para <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-cyan-500">cada necesidad</span></span>
        </h2>
        
        <div class="w-full max-w-4xl overflow-x-auto pb-2 hide-scrollbar flex md:justify-center snap-x snap-mandatory">
          <div class="flex space-x-2 p-1 bg-white/80 backdrop-blur-md rounded-2xl md:rounded-full border border-slate-200 shadow-sm min-w-min mx-auto">
            <button
              v-for="cat in categories"
              :key="cat.id"
              @click="activeCategory = cat.id"
              class="snap-center px-4 py-2 md:px-5 md:py-2.5 rounded-xl md:rounded-full text-xs md:text-sm font-bold transition-all duration-300 whitespace-nowrap flex-shrink-0"
              :class="activeCategory === cat.id 
                ? 'bg-blue-600 text-white shadow-md shadow-blue-500/30' 
                : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'"
            >
              {{ cat.label }}
            </button>
          </div>
        </div>
      </div>

      <TransitionGroup 
        name="list" 
        tag="div" 
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6"
      >
        <div 
          v-for="service in filteredServices" 
          :key="service.id" 
          class="group bg-white p-4 md:p-8 rounded-xl md:rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 md:hover:-translate-y-2 transition-all duration-300 relative overflow-hidden cursor-pointer flex items-center md:items-start md:flex-col h-auto md:h-full"
          @click="openModal(service)"
        >
          <div class="absolute inset-0 bg-gradient-to-br from-blue-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden md:block"></div>
          
          <div class="relative z-10 shrink-0 mr-4 md:mr-0 md:mb-6">
            <div class="w-12 h-12 md:w-14 md:h-14 bg-blue-50 rounded-lg md:rounded-xl flex items-center justify-center group-hover:bg-blue-600 group-hover:scale-110 transition-all duration-300 shadow-sm">
              <component 
                :is="service.icon" 
                class="w-6 h-6 md:w-7 md:h-7 text-blue-900 group-hover:text-white transition-colors duration-300" 
              />
            </div>
          </div>
          
          <div class="relative z-10 flex-grow md:flex md:flex-col md:h-full overflow-hidden">
            <h3 class="text-base md:text-xl font-bold text-slate-900 mb-0 md:mb-3 group-hover:text-blue-800 transition-colors truncate pr-2">
              {{ service.title }}
            </h3>
            
            <p class="hidden md:block text-slate-600 text-sm leading-relaxed mb-6 flex-grow">
              {{ service.shortDesc }}
            </p>

            <div class="hidden md:flex items-center text-blue-700 font-bold text-sm mt-auto group-hover:gap-2 transition-all">
              Ver detalles <ArrowRight class="w-4 h-4 ml-1" />
            </div>
          </div>

          <div class="md:hidden text-slate-300">
            <ChevronRight class="w-5 h-5" />
          </div>

        </div>
      </TransitionGroup>

      <div v-if="filteredServices.length === 0" class="text-center py-12">
        <p class="text-slate-400">No hay servicios en esta categoría.</p>
      </div>

    </div>

    <Transition name="modal">
      <div v-if="selectedService" class="fixed inset-0 z-50 flex items-end md:items-center justify-center p-0 md:p-4">
        
        <div class="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" @click="closeModal"></div>

        <div class="relative bg-white w-full md:max-w-2xl rounded-t-3xl md:rounded-3xl shadow-2xl flex flex-col max-h-[90vh] md:max-h-[85vh] animate-slide-up md:animate-none">
          
          <button @click="closeModal" class="absolute top-4 right-4 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 transition z-10">
            <X class="w-5 h-5" />
          </button>

          <div class="bg-slate-50 p-6 md:p-8 border-b border-slate-100 flex items-center gap-4 md:gap-6 sticky top-0 z-0 rounded-t-3xl">
            <div class="w-14 h-14 md:w-20 md:h-20 bg-white rounded-xl md:rounded-2xl flex items-center justify-center shadow-md text-blue-600 shrink-0">
              <component :is="selectedService.icon" class="w-7 h-7 md:w-10 md:h-10" />
            </div>
            <div>
              <div class="flex flex-wrap gap-1 mb-1 md:mb-2">
                 <span v-for="cat in selectedService.categories" :key="cat" class="text-[10px] font-bold uppercase tracking-wider bg-blue-100 text-blue-700 px-2 py-0.5 rounded-md">
                   {{ cat }}
                 </span>
              </div>
              <h3 class="text-xl md:text-3xl font-bold text-slate-900 leading-tight">{{ selectedService.fullTitle }}</h3>
            </div>
          </div>

          <div class="p-6 md:p-8 overflow-y-auto overscroll-contain">
            <p class="text-slate-600 text-base md:text-lg leading-relaxed mb-6 md:mb-8">
              {{ selectedService.fullDesc }}
            </p>

            <h4 class="font-bold text-slate-900 mb-3 md:mb-4">Características:</h4>
            <ul class="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 mb-4">
              <li v-for="(feature, idx) in selectedService.features" :key="idx" class="flex items-start gap-3 p-3 bg-slate-50 rounded-lg border border-slate-100">
                <CheckCircle2 class="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                <span class="text-slate-700 text-sm font-medium">{{ feature }}</span>
              </li>
            </ul>
          </div>

          <div class="p-4 md:p-6 bg-slate-50 border-t border-slate-100 flex gap-3 md:gap-4 pb-8 md:pb-6">
            <button @click="closeModal" class="flex-1 md:flex-none px-6 py-3 rounded-xl text-slate-600 font-bold bg-white border border-slate-200 hover:bg-slate-50 transition text-sm md:text-base">
              Volver
            </button>
            <BaseButton href="#contacto" variant="primary" @click="closeModal" class="flex-1 justify-center text-sm md:text-base shadow-lg shadow-blue-500/20">
              Cotizar
            </BaseButton>
          </div>
        </div>
      </div>
    </Transition>

  </section>
</template>

<style scoped>
/* Ajustes para scroll oculto pero funcional */
.hide-scrollbar::-webkit-scrollbar {
  display: none;
}
.hide-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

/* Animación Mobile Bottom Sheet */
@keyframes slide-up {
  from { transform: translateY(100%); }
  to { transform: translateY(0); }
}
.animate-slide-up {
  animation: slide-up 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

/* Vue Transitions */
.list-move,
.list-enter-active,
.list-leave-active {
  transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: scale(0.95);
}
.list-leave-active {
  position: absolute;
}

.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}
.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
</style>