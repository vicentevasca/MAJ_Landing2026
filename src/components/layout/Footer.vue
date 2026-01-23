<script setup>
import { Instagram, Linkedin, Facebook, MapPin, Phone, Mail, ArrowUp } from 'lucide-vue-next'


import LogoWhite from '../../assets/logo/LOGO MAJ.png'  

const currentYear = new Date().getFullYear()

// Función para volver arriba suavemente
const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const socialLinks = [
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
  { icon: Instagram, href: '#', label: 'Instagram' },
  { icon: Facebook, href: '#', label: 'Facebook' }
]

const links = [
  { name: 'Nuestros Servicios', href: '#servicios' },
  { name: 'Sectores Industriales', href: '#industrias' },
  { name: 'Sobre MAJ', href: '#nosotros' },
  { name: 'Contacto y Cotización', href: '#contacto' }
]
</script>

<template>
  <footer class="bg-slate-950 text-slate-400 py-16 border-t border-slate-900 relative overflow-hidden font-light">
    
    <div class="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-blue-900/10 rounded-full blur-[100px] pointer-events-none"></div>

    <div class="container mx-auto px-6 relative z-10">
      <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
        
        <div class="col-span-1 lg:col-span-1 space-y-6">
          <a href="#" class="inline-flex items-center gap-3 group">
            <div class="relative h-11 w-auto flex-shrink-0">
             <img 
              :src="LogoWhite" 
              alt="Logo MAJ" 
              class="h-full w-auto object-contain transition-opacity duration-300" 
            />
          </div>
            <span class="text-xl font-bold text-white tracking-tight">Mantenimientos AJ SpA</span>
          </a>
          
          <p class="text-sm leading-relaxed text-slate-500">
            Elevando el estándar de limpieza corporativa en Chile. Soluciones técnicas, personal certificado y supervisión constante.
          </p>

          <div class="flex gap-4">
            <a 
              v-for="(social, index) in socialLinks" 
              :key="index" 
              :href="social.href"
              :aria-label="social.label"
              class="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center text-slate-400 hover:bg-blue-600 hover:text-white transition-all duration-300 hover:-translate-y-1"
            >
              <component :is="social.icon" class="w-5 h-5" />
            </a>
          </div>
        </div>

        <div>
          <h4 class="text-white font-bold mb-6 uppercase text-xs tracking-widest flex items-center gap-2">
            <span class="w-8 h-[2px] bg-blue-600"></span> Explorar
          </h4>
          <ul class="space-y-3">
            <li v-for="link in links" :key="link.name">
              <a 
                :href="link.href" 
                class="flex items-center gap-2 text-sm hover:text-white hover:translate-x-2 transition-all duration-300 group"
              >
                <span class="w-1.5 h-1.5 rounded-full bg-slate-700 group-hover:bg-blue-500 transition-colors"></span>
                {{ link.name }}
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h4 class="text-white font-bold mb-6 uppercase text-xs tracking-widest flex items-center gap-2">
            <span class="w-8 h-[2px] bg-blue-600"></span> Ubicación
          </h4>
          <ul class="space-y-4 text-sm">
            <li class="flex items-start gap-3">
              <MapPin class="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
              <span>Av. Providencia 1234, Of. 605<br>Providencia, Santiago, Chile.</span>
            </li>
            <li class="flex items-center gap-3">
              <Phone class="w-5 h-5 text-blue-500 shrink-0" />
              <a href="tel:+56948884917" class="hover:text-white transition">+56 9 4888 4917</a>
            </li>
            <li class="flex items-center gap-3">
              <Mail class="w-5 h-5 text-blue-500 shrink-0" />
              <a href="mailto:contacto@majmantenimientos.cl" class="hover:text-white transition">contacto@maj.cl</a>
            </li>
          </ul>
        </div>

        <div>
          <h4 class="text-white font-bold mb-6 uppercase text-xs tracking-widest flex items-center gap-2">
            <span class="w-8 h-[2px] bg-blue-600"></span> Legal
          </h4>
          <ul class="space-y-3 text-sm">
            <li><a href="#" class="hover:text-white transition">Políticas de Privacidad</a></li>
            <li><a href="#" class="hover:text-white transition">Términos y Condiciones</a></li>
            <li><a href="#" class="hover:text-white transition">Reglamento Interno</a></li>
          </ul>
          
          <div class="mt-8 p-4 bg-slate-900 rounded-lg border border-slate-800">
            <p class="text-xs font-bold text-slate-300 mb-1">Empresa Certificada</p>
            <p class="text-[10px] text-slate-500">Cumplimiento normativa laboral y seguridad.</p>
          </div>
        </div>

      </div>
      
      <div class="border-t border-slate-800/50 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
        <p>&copy; {{ currentYear }} MAJ Mantenimientos SpA. Todos los derechos reservados.</p>
        
        <div class="flex items-center gap-6">
          <span class="opacity-50">Santiago, Chile</span>
          <button 
            @click="scrollToTop" 
            class="w-8 h-8 rounded bg-slate-800 hover:bg-blue-600 flex items-center justify-center text-white transition-colors duration-300"
            aria-label="Volver arriba"
          >
            <ArrowUp class="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  </footer>
</template>