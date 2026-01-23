<script setup>
import { ref, onMounted, onUnmounted, computed, watch } from 'vue'
import { Menu, X, Phone, ChevronRight, Mail, MapPin } from 'lucide-vue-next'
import BaseButton from '../ui/BaseButton.vue'

// --- IMÁGENES ---
// Importamos las dos versiones del logo
import LogoWhite from '../../assets/logo/LOGO MAJ.png'   
import LogoBlue from '../../assets/logo/LOGO MAJ 2.png' 

// --- ESTADO ---
const isMenuOpen = ref(false)
const isScrolled = ref(false)

// --- DATOS DE NAVEGACIÓN ---
const navigation = [
  { name: 'Servicios', href: '#servicios', desc: 'Soluciones integrales' },
  { name: 'Industrias', href: '#industrias', desc: 'Sectores atendidos' },
  { name: 'Por qué MAJ', href: '#nosotros', desc: 'Nuestra diferencia' },
  { name: 'Contacto', href: '#contacto', desc: 'Solicitar visita' },
]

// --- LÓGICA DE SCROLL ---
const handleScroll = () => {
  isScrolled.value = window.scrollY > 20
}

// Bloquear scroll del body al abrir menú móvil
watch(isMenuOpen, (val) => {
  document.body.style.overflow = val ? 'hidden' : ''
})

const closeMenu = () => {
  isMenuOpen.value = false
}

// Lifecycle Hooks
onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})
onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

// --- COMPUTED: LOGO DINÁMICO ---
const currentLogo = computed(() => {
  // Si menú abierto (fondo blanco) O scroll bajado (fondo blanco) -> Logo Azul
  if (isMenuOpen.value || isScrolled.value) {
    return LogoBlue
  }
  // Si estamos arriba y menú cerrado (fondo transparente/oscuro) -> Logo Blanco
  return LogoWhite
})

// --- COMPUTED: ESTILOS ---
const navClasses = computed(() => {
  return isScrolled.value
    ? 'bg-white/90 backdrop-blur-md shadow-sm py-3 border-b border-slate-200/50' 
    : 'bg-transparent py-5 border-b border-white/10'
})

// Color de enlaces Desktop
const textClasses = computed(() => {
  return isScrolled.value ? 'text-slate-600 hover:text-blue-900' : 'text-slate-200 hover:text-white'
})

// Color del texto "Mantenimientos AJ SpA"
const brandTextClasses = computed(() => {
  return (isMenuOpen.value || isScrolled.value) ? 'text-slate-500' : 'text-slate-300'
})

// Color del botón hamburguesa
const hamburgerClasses = computed(() => {
  return (isMenuOpen.value || isScrolled.value) ? 'text-slate-900' : 'text-white'
})
</script>

<template>
  <header 
    class="fixed w-full z-50 top-0 start-0 transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]"
    :class="navClasses"
  >
    <div class="container mx-auto px-6">
      <div class="flex items-center justify-between">
        
        <a href="#" class="flex items-center gap-3 group relative z-50" @click="closeMenu">
          <div class="relative h-11 w-auto flex-shrink-0">
             <img 
              :src="currentLogo" 
              alt="Logo MAJ" 
              class="h-full w-auto object-contain transition-opacity duration-300" 
            />
          </div>
          <div class="flex flex-col">
            <span 
              class="text-[10px] font-bold uppercase tracking-widest leading-none mt-1 transition-colors duration-300"
              :class="brandTextClasses"
            >
              Mantenimientos AJ SpA
            </span>
          </div>
        </a>

        <nav class="hidden lg:flex items-center gap-8">
          <a v-for="item in navigation" 
             :key="item.name" 
             :href="item.href" 
             class="text-sm font-semibold transition-all duration-200 relative group py-2"
             :class="textClasses">
            {{ item.name }}
            <span class="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-500 transition-all duration-300 group-hover:w-full"></span>
          </a>
        </nav>

        <div class="hidden lg:flex items-center gap-4">
          <a href="tel:+56948884917" class="flex items-center gap-2 text-sm font-bold transition-colors" :class="textClasses">
            <Phone class="w-4 h-4" />
            <span>+56 9 4888 4917</span>
          </a>
          <a href="#contacto" 
             class="group relative inline-flex items-center gap-2 px-6 py-2.5 rounded-full font-bold text-sm transition-all duration-300 shadow-lg overflow-hidden active:scale-95"
             :class="isScrolled 
                ? 'bg-blue-900 text-white hover:bg-blue-800' 
                : 'bg-white text-blue-900 hover:bg-blue-50'"
          >
            <span>Cotizar</span>
            <ChevronRight class="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </a>
        </div>

        <button 
          @click="isMenuOpen = !isMenuOpen" 
          class="lg:hidden p-2 relative z-50 focus:outline-none transition-colors duration-300"
          :class="hamburgerClasses"
          aria-label="Toggle menu"
        >
          <div class="relative w-6 h-6">
            <Transition
              enter-active-class="transition duration-200 ease-out"
              enter-from-class="opacity-0 rotate-45 scale-50"
              enter-to-class="opacity-100 rotate-0 scale-100"
              leave-active-class="transition duration-200 ease-in"
              leave-from-class="opacity-100 rotate-0 scale-100"
              leave-to-class="opacity-0 -rotate-45 scale-50"
            >
              <Menu v-if="!isMenuOpen" class="w-7 h-7 absolute inset-0" />
              <X v-else class="w-7 h-7 absolute inset-0" />
            </Transition>
          </div>
        </button>
      </div>
    </div>

    <Transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="opacity-0 translate-y-4"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 translate-y-4"
    >
      <div v-if="isMenuOpen" class="fixed inset-0 z-40 bg-white/95 backdrop-blur-xl lg:hidden flex flex-col pt-24 pb-10 px-6 h-screen overflow-y-auto">
        
        <nav class="flex flex-col space-y-2 mb-8">
          <a v-for="(item, idx) in navigation" 
             :key="item.name" 
             :href="item.href" 
             @click="closeMenu"
             class="group flex items-center justify-between p-4 rounded-2xl hover:bg-slate-50 border border-transparent hover:border-slate-100 transition-all duration-300"
             :style="{ animationDelay: `${idx * 50}ms` }"
          >
            <div>
              <span class="block text-2xl font-bold text-slate-900 group-hover:text-blue-900 transition-colors">{{ item.name }}</span>
              <span class="text-sm text-slate-400 font-medium">{{ item.desc }}</span>
            </div>
            <div class="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center group-hover:bg-blue-100 group-hover:text-blue-700 transition-colors">
              <ChevronRight class="w-5 h-5" />
            </div>
          </a>
        </nav>

        <div class="w-full h-px bg-slate-100 mb-8"></div>

        <div class="mt-auto space-y-6">
          <p class="text-xs font-bold text-slate-400 uppercase tracking-widest">Contacto Directo</p>
          
          <div class="grid grid-cols-2 gap-4">
            <a href="tel:+56948884917" class="flex flex-col items-center justify-center p-4 bg-blue-50 rounded-2xl text-blue-900 hover:bg-blue-100 transition border border-blue-100">
              <Phone class="w-6 h-6 mb-2" />
              <span class="text-sm font-bold">Llamar</span>
            </a>
            <a href="mailto:contacto@maj.cl" class="flex flex-col items-center justify-center p-4 bg-slate-50 rounded-2xl text-slate-700 hover:bg-slate-100 transition border border-slate-200">
              <Mail class="w-6 h-6 mb-2" />
              <span class="text-sm font-bold">Email</span>
            </a>
          </div>

          <div class="flex items-center gap-3 text-slate-500 px-2 justify-center text-center">
            <MapPin class="w-5 h-5 shrink-0 text-blue-500" />
            <span class="text-sm">Santiago, Región Metropolitana, Chile.</span>
          </div>

          <BaseButton href="#contacto" variant="primary" class="w-full justify-center py-4 text-lg shadow-xl shadow-blue-900/10" @click="closeMenu">
            Solicitar Cotización Formal
          </BaseButton>
        </div>
      </div>
    </Transition>
  </header>
</template>