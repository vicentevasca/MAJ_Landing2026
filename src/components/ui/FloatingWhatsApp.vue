<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { MessageCircle } from 'lucide-vue-next'

const isVisible = ref(true)

// Detectar si hay un modal abierto (body overflow hidden) para ocultar el botón
const checkModalOpen = () => {
  const isOverflowHidden = document.body.style.overflow === 'hidden'
  isVisible.value = !isOverflowHidden
}

// Usamos un MutationObserver para detectar cambios en el estilo del body automáticamente
let observer = null

onMounted(() => {
  observer = new MutationObserver(checkModalOpen)
  observer.observe(document.body, { attributes: true, attributeFilter: ['style'] })
})

onUnmounted(() => {
  if (observer) observer.disconnect()
})
</script>

<template>
  <Transition name="fade">
    <a 
      v-show="isVisible"
      href="https://wa.me/56948884917" 
      target="_blank" 
      class="fixed bottom-6 right-6 z-30 group flex items-center justify-center p-4 bg-[#25D366] text-white rounded-full shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
      aria-label="Contactar por WhatsApp"
    >
      <span class="absolute right-full mr-4 bg-white text-slate-700 text-xs font-bold px-3 py-1.5 rounded-lg shadow-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap hidden md:block">
        ¡Hablemos ahora!
      </span>

      <MessageCircle class="w-7 h-7 fill-current" />
      
      <span class="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-20 animate-ping"></span>
    </a>
  </Transition>
</template>

<style scoped>
/* Transición suave de entrada/salida */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s, transform 0.3s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(20px) scale(0.8);
}
</style>