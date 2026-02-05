<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '../../composables/useAuth'
import { Lock, Mail, Loader2 } from 'lucide-vue-next'
import BaseButton from '../ui/BaseButton.vue' // Ajusta la ruta a tu componente

const email = ref('')
const password = ref('')
const errorMsg = ref('')
const isLoading = ref(false)

const router = useRouter()
const { login } = useAuth()

const handleLogin = async () => {
  isLoading.value = true
  errorMsg.value = ''
  
  const res = await login(email.value, password.value)
  
  if (res.success) {
    router.push('/dashboard')
  } else {
    errorMsg.value = res.error
    isLoading.value = false
  }
}
</script>

<template>
  <div class="min-h-screen bg-slate-50 flex items-center justify-center px-4">
    <div class="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 border border-slate-100">
      
      <div class="text-center mb-8">
        <div class="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <Lock class="w-8 h-8" />
        </div>
        <h1 class="text-2xl font-bold text-slate-900">Acceso Gerencia</h1>
        <p class="text-slate-500 text-sm">Ingrese sus credenciales para continuar</p>
      </div>

      <form @submit.prevent="handleLogin" class="space-y-6">
        
        <div class="space-y-2">
          <label class="text-sm font-bold text-slate-700">Email Corporativo</label>
          <div class="relative">
            <Mail class="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              v-model="email"
              type="email" 
              class="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              placeholder="admin@maj.cl"
              required
            />
          </div>
        </div>

        <div class="space-y-2">
          <label class="text-sm font-bold text-slate-700">Contraseña</label>
          <div class="relative">
            <Lock class="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              v-model="password"
              type="password" 
              class="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              placeholder="••••••••"
              required
            />
          </div>
        </div>

        <div v-if="errorMsg" class="p-3 bg-red-50 text-red-600 text-sm rounded-lg text-center font-medium">
          {{ errorMsg }}
        </div>

        <button 
          type="submit"
          class="w-full py-3 px-4 bg-blue-900 hover:bg-blue-800 text-white font-bold rounded-lg transition-colors flex items-center justify-center gap-2"
          :disabled="isLoading"
        >
          <Loader2 v-if="isLoading" class="w-5 h-5 animate-spin" />
          <span v-else>Iniciar Sesión</span>
        </button>

      </form>
    </div>
  </div>
</template>