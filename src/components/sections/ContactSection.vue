<script setup>
import { Mail, Phone, Clock, Send, CheckCircle2 } from 'lucide-vue-next'
import BaseButton from '../ui/BaseButton.vue'

// Función dummy para el formulario
const handleSubmit = (e) => {
  e.preventDefault()
  // Aquí iría la lógica de envío real
  alert('¡Gracias! Su solicitud ha sido enviada. El equipo MAJ le responderá brevemente.')
}

const contactInfo = [
  {
    icon: Phone,
    title: 'Llámenos directo',
    subtitle: 'Asesoría inmediata',
    value: '+56 9 4888 4917',
    href: 'tel:+56948884917',
    color: 'bg-blue-100 text-blue-700'
  },
  {
    icon: Mail,
    title: 'Correo electrónico',
    subtitle: 'Envíe sus requerimientos',
    value: 'contacto@majmantenimientos.cl',
    href: 'mailto:contacto@majmantenimientos.cl',
    color: 'bg-indigo-100 text-indigo-700'
  }
]
</script>

<template>
  <section id="contacto" class="relative py-24 bg-slate-50 overflow-hidden">
    
    <div class="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
      <div class="absolute top-20 left-0 w-96 h-96 bg-blue-200/40 rounded-full blur-[100px] -translate-x-1/2"></div>
      <div class="absolute bottom-0 right-0 w-[500px] h-[500px] bg-indigo-200/40 rounded-full blur-[120px] translate-x-1/3 translate-y-1/3"></div>
    </div>

    <div class="container mx-auto px-6 relative z-10">
      <div class="grid lg:grid-cols-2 gap-12 lg:gap-24 items-start">
        
        <div class="animate-fade-in-up">
          <span class="text-blue-600 font-bold tracking-wider uppercase text-sm mb-2 block">Contacto</span>
          <h2 class="text-4xl md:text-5xl font-bold text-slate-900 mb-6 leading-tight">
            Hablemos de su próximo <span class="text-blue-700">proyecto</span>
          </h2>
          <p class="text-slate-600 text-lg mb-10 leading-relaxed">
            Solicite una visita técnica gratuita. Evaluaremos sus instalaciones y le entregaremos una propuesta a medida que optimice sus costos operativos.
          </p>

          <div class="space-y-6">
            <a 
              v-for="(item, index) in contactInfo" 
              :key="index"
              :href="item.href"
              class="group flex items-start gap-5 p-5 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-md hover:border-blue-100 transition-all duration-300"
            >
              <div :class="`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110 ${item.color}`">
                <component :is="item.icon" class="w-6 h-6" />
              </div>
              <div>
                <h3 class="text-base font-bold text-slate-900 group-hover:text-blue-700 transition-colors">{{ item.title }}</h3>
                <p class="text-sm text-slate-500 mb-1">{{ item.subtitle }}</p>
                <p class="text-lg font-bold text-slate-800">{{ item.value }}</p>
              </div>
            </a>
          </div>

          <div class="mt-10 flex items-center gap-4 p-4 bg-slate-100/50 rounded-xl border border-slate-200/60 backdrop-blur-sm">
             <div class="flex -space-x-3">
               <img class="w-10 h-10 rounded-full border-2 border-white" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100&h=100" alt="Soporte 1" />
               <img class="w-10 h-10 rounded-full border-2 border-white" src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=100&h=100" alt="Soporte 2" />
               <div class="w-10 h-10 rounded-full border-2 border-white bg-blue-900 text-white flex items-center justify-center text-xs font-bold">+3</div>
             </div>
             <div>
               <p class="text-sm font-bold text-slate-900">Equipo Comercial MAJ</p>
               <div class="flex items-center gap-1 text-xs text-green-600 font-medium">
                 <span class="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                 Disponible ahora
               </div>
             </div>
          </div>
        </div>

        <div class="relative animate-fade-in-up delay-100">
          <div class="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 transform rotate-1 rounded-[2.5rem] opacity-20 blur-lg -z-10"></div>
          
          <div class="bg-white p-8 md:p-10 rounded-[2rem] shadow-2xl shadow-slate-200/50 border border-white relative overflow-hidden">
            
            <div class="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-600"></div>

            <h3 class="text-2xl font-bold text-slate-900 mb-2">Envíenos un mensaje</h3>
            <p class="text-slate-500 text-sm mb-8">Complete el formulario y le responderemos en menos de 24h.</p>
            
            <form @submit="handleSubmit" class="space-y-5">
              
              <div class="grid md:grid-cols-2 gap-5">
                <div class="space-y-1.5">
                  <label class="text-xs font-bold text-slate-700 uppercase tracking-wide ml-1">Nombre</label>
                  <input 
                    type="text" 
                    placeholder="Ej: Juan Pérez" 
                    class="w-full px-5 py-3.5 rounded-xl bg-slate-50 border border-transparent focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all duration-300 font-medium text-slate-800 placeholder:text-slate-400" 
                    required 
                  />
                </div>
                <div class="space-y-1.5">
                  <label class="text-xs font-bold text-slate-700 uppercase tracking-wide ml-1">Empresa</label>
                  <input 
                    type="text" 
                    placeholder="Ej: Constructora SpA" 
                    class="w-full px-5 py-3.5 rounded-xl bg-slate-50 border border-transparent focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all duration-300 font-medium text-slate-800 placeholder:text-slate-400" 
                  />
                </div>
              </div>

              <div class="space-y-1.5">
                <label class="text-xs font-bold text-slate-700 uppercase tracking-wide ml-1">Teléfono / WhatsApp</label>
                <div class="relative">
                  <Phone class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input 
                    type="tel" 
                    placeholder="+56 9 ..." 
                    class="w-full pl-12 pr-5 py-3.5 rounded-xl bg-slate-50 border border-transparent focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all duration-300 font-medium text-slate-800 placeholder:text-slate-400" 
                    required 
                  />
                </div>
              </div>

              <div class="space-y-1.5">
                <label class="text-xs font-bold text-slate-700 uppercase tracking-wide ml-1">Requerimiento</label>
                <textarea 
                  rows="4" 
                  placeholder="Describa brevemente lo que necesita..." 
                  class="w-full px-5 py-3.5 rounded-xl bg-slate-50 border border-transparent focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all duration-300 font-medium text-slate-800 placeholder:text-slate-400 resize-none" 
                  required
                ></textarea>
              </div>

              <BaseButton variant="primary" class="w-full justify-center py-4 text-base shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transform hover:-translate-y-0.5 transition-all">
                Enviar Solicitud
                <Send class="w-4 h-4 ml-2" />
              </BaseButton>
              
              <div class="flex items-center justify-center gap-2 text-xs text-slate-400 mt-2">
                <CheckCircle2 class="w-3 h-3 text-green-500" />
                <span>Datos seguros y encriptados.</span>
              </div>
            </form>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>