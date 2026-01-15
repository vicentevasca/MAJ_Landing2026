<script setup>
import { computed } from 'vue'

const props = defineProps({
  variant: {
    type: String,
    default: 'primary', // primary, secondary, outline, ghost
    validator: (value) => ['primary', 'secondary', 'outline', 'ghost'].includes(value)
  },
  href: {
    type: String,
    default: null
  }
})

// Clases base compartidas
const baseClasses = 'inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-bold transition-all duration-300 transform active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2'

// Variantes de estilo
const variantClasses = computed(() => {
  const variants = {
    primary: 'bg-blue-900 text-white hover:bg-blue-800 hover:shadow-lg shadow-blue-900/20 focus:ring-blue-900',
    secondary: 'bg-white text-blue-900 hover:bg-slate-50 shadow-md border border-slate-100 focus:ring-white',
    outline: 'border-2 border-white text-white hover:bg-white/10 focus:ring-white/50',
    ghost: 'text-slate-600 hover:text-blue-900 hover:bg-blue-50'
  }
  return variants[props.variant]
})

// Decidir si es <a> o <button> dinámicamente
const isLink = computed(() => !!props.href)
</script>

<template>
  <component 
    :is="isLink ? 'a' : 'button'" 
    :href="href"
    :class="[baseClasses, variantClasses]"
  >
    <slot /> </component>
</template>