<script setup>
import { ref, onMounted, onUnmounted, computed, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router' // useRoute para saber donde estamos
import { 
  Menu, X, Phone, ChevronRight, Mail, MapPin, 
  LogOut, Bell, Home, LayoutDashboard 
} from 'lucide-vue-next'
import BaseButton from '../ui/BaseButton.vue'

// --- FIREBASE & AUTH ---
import { useAuth } from '../../composables/useAuth'
import { db } from '../../firebase/init'
import { collection, query, where, onSnapshot } from 'firebase/firestore'

// --- IMÁGENES ---
import LogoWhite from '../../assets/logo/LOGO MAJ.png'   
import LogoBlue from '../../assets/logo/LOGO MAJ 2.png' 

// --- ESTADO Y AUTH ---
const { user, logout } = useAuth()
const router = useRouter()
const route = useRoute() // Para resaltar enlace activo
const isMenuOpen = ref(false)
const isScrolled = ref(false)
const unreadCount = ref(0) 

// --- LÓGICA DE MENSAJES SIN LEER (Tiempo Real) ---
let unsubscribe = null

watch(user, (currentUser) => {
  if (currentUser) {
    const q = query(collection(db, 'contacts'), where('status', '==', 'new'))
    unsubscribe = onSnapshot(q, (snapshot) => {
      unreadCount.value = snapshot.size
    })
  } else {
    if (unsubscribe) unsubscribe()
    unreadCount.value = 0
  }
}, { immediate: true })

// --- NAVEGACIÓN ---
const publicNavigation = [
  { name: 'Servicios', href: '#servicios', desc: 'Soluciones integrales' },
  { name: 'Industrias', href: '#industrias', desc: 'Sectores atendidos' },
  { name: 'Porque Elegirnos', href: '#nosotros', desc: 'Nuestra diferencia' },
  { name: 'Contacto', href: '#contacto', desc: 'Solicitar visita' },
]

// Enlaces exclusivos para Admin
const adminLinks = [
  { name: 'Ver Sitio', path: '/', icon: Home },
  { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
]

// --- LÓGICA DE INTERFAZ ---
const handleScroll = () => {
  isScrolled.value = window.scrollY > 20
}

watch(isMenuOpen, (val) => {
  document.body.style.overflow = val ? 'hidden' : ''
})

const closeMenu = () => {
  isMenuOpen.value = false
}

const handleLogout = async () => {
  closeMenu()
  await logout()
  router.push('/') 
}

// Acción al clickear la campana
const goToDashboard = () => {
  router.push('/dashboard')
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})
onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  if (unsubscribe) unsubscribe()
})

// --- COMPUTED ---
const currentLogo = computed(() => {
  if (isMenuOpen.value || isScrolled.value || user.value) return LogoBlue
  return LogoWhite
})

const navClasses = computed(() => {
  if (user.value) return 'bg-white shadow-sm py-3 border-b border-slate-200'
  return isScrolled.value
    ? 'bg-white/90 backdrop-blur-md shadow-sm py-3 border-b border-slate-200/50' 
    : 'bg-transparent py-5 border-b border-white/10'
})

const textClasses = computed(() => {
  if (user.value) return 'text-slate-600 hover:text-blue-900'
  return isScrolled.value ? 'text-slate-600 hover:text-blue-900' : 'text-slate-200 hover:text-white'
})

const brandTextClasses = computed(() => {
  if (user.value) return 'text-slate-800'
  return (isMenuOpen.value || isScrolled.value) ? 'text-slate-500' : 'text-slate-300'
})

const hamburgerClasses = computed(() => {
  if (user.value) return 'text-slate-900'
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
            <template v-if="user">
              <span class="text-lg font-bold text-slate-900 leading-none mt-1">
                Panel Gerencia
              </span>
              <span class="text-[10px] font-bold uppercase tracking-widest text-slate-500">
                Vista Administrativa
              </span>
            </template>
            <template v-else>
              <span 
                class="text-[10px] font-bold uppercase tracking-widest leading-none mt-1 transition-colors duration-300"
                :class="brandTextClasses"
              >
                Mantenimientos AJ SpA
              </span>
            </template>
          </div>
        </a>

        <nav v-if="!user" class="hidden lg:flex items-center gap-8">
          <a v-for="item in publicNavigation" 
             :key="item.name" 
             :href="item.href" 
             class="text-sm font-semibold transition-all duration-200 relative group py-2"
             :class="textClasses">
            {{ item.name }}
            <span class="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-500 transition-all duration-300 group-hover:w-full"></span>
          </a>
        </nav>

        <nav v-else class="hidden lg:flex items-center gap-2 mr-4 ml-auto">
          <router-link 
            v-for="link in adminLinks"
            :key="link.name"
            :to="link.path"
            class="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all"
            :class="route.path === link.path 
              ? 'bg-blue-50 text-blue-700' 
              : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'"
          >
            <component :is="link.icon" class="w-4 h-4" />
            {{ link.name }}
          </router-link>
        </nav>

        <div class="hidden lg:flex items-center gap-4">
          
          <template v-if="user">
            <div 
              @click="goToDashboard"
              class="relative group cursor-pointer mr-2 transition-transform active:scale-95"
              title="Ir a mensajes"
            >
              <div class="p-2 rounded-full hover:bg-slate-100 transition-colors text-slate-600">
                <Bell class="w-6 h-6" />
              </div>
              <div v-if="unreadCount > 0" class="absolute top-1 right-1 w-5 h-5 bg-red-500 text-white text-[10px] font-bold flex items-center justify-center rounded-full border-2 border-white animate-pulse">
                {{ unreadCount }}
              </div>
            </div>

            <div class="h-8 w-px bg-slate-200 mx-1"></div>
            
            <button 
              @click="handleLogout"
              class="flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors border border-red-100"
            >
              <LogOut class="w-4 h-4" />
              <span>Salir</span>
            </button>
          </template>

          <template v-else>
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
          </template>
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
        
        <template v-if="user">
          <div class="flex items-center gap-4 p-4 bg-blue-50 rounded-2xl mb-8 border border-blue-100">
            <div class="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
              {{ user.email?.charAt(0).toUpperCase() }}
            </div>
            <div>
              <p class="text-sm text-slate-500">Sesión iniciada</p>
              <p class="font-bold text-slate-900 text-sm truncate max-w-[200px]">{{ user.email }}</p>
            </div>
          </div>

          <div class="grid grid-cols-2 gap-3 mb-6">
             <router-link 
              v-for="link in adminLinks"
              :key="link.name"
              :to="link.path"
              @click="closeMenu"
              class="flex flex-col items-center justify-center p-4 rounded-xl border transition-all"
              :class="route.path === link.path 
                ? 'bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-500/30' 
                : 'bg-white text-slate-600 border-slate-100 hover:bg-slate-50'"
             >
               <component :is="link.icon" class="w-6 h-6 mb-2" />
               <span class="text-xs font-bold uppercase">{{ link.name }}</span>
             </router-link>
          </div>

          <div 
            @click="() => { goToDashboard(); closeMenu(); }"
            class="flex items-center justify-between p-4 bg-white border border-slate-100 rounded-2xl shadow-sm mb-6 active:scale-95 transition-transform"
          >
            <div class="flex items-center gap-3">
              <div class="p-2 bg-slate-100 rounded-full text-slate-600 relative">
                 <Bell class="w-5 h-5" />
                 <span v-if="unreadCount > 0" class="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 rounded-full border border-white animate-pulse"></span>
              </div>
              <span class="font-bold text-slate-700">Ver Notificaciones</span>
            </div>
            <span v-if="unreadCount > 0" class="bg-red-100 text-red-600 px-3 py-1 rounded-full text-xs font-bold">
              {{ unreadCount }} nuevas
            </span>
            <span v-else class="text-xs text-slate-400">Sin novedades</span>
          </div>

          <button 
            @click="handleLogout"
            class="w-full py-4 flex items-center justify-center gap-2 bg-red-50 text-red-600 font-bold rounded-2xl mt-auto border border-red-100 hover:bg-red-100 transition"
          >
            <LogOut class="w-5 h-5" /> Cerrar Sesión
          </button>
        </template>

        <template v-else>
          <nav class="flex flex-col space-y-2 mb-8">
            <a v-for="(item, idx) in publicNavigation" 
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
        </template>

      </div>
    </Transition>
  </header>
</template>