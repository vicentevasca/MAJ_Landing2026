// src/composables/useAuth.js
import { ref } from 'vue'
import { auth } from '../firebase/init'
import { signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth'

// Estado global del usuario (para que sea accesible en toda la app)
const user = ref(null)
const isAuthReady = ref(false) // Para evitar parpadeos al cargar la app

// Escuchar cambios de sesión en Firebase
onAuthStateChanged(auth, (u) => {
  user.value = u
  isAuthReady.value = true
})

export function useAuth() {
  
  const login = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password)
      return { success: true }
    } catch (error) {
      console.error(error)
      return { success: false, error: 'Credenciales incorrectas' }
    }
  }

  const logout = async () => {
    await signOut(auth)
  }

  return { user, isAuthReady, login, logout }
}