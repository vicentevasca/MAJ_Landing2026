import { createRouter, createWebHistory } from 'vue-router'
import { auth } from '../firebase/init' // Asegúrate de que apunte a tu init.js

// --- IMPORTACIÓN DE VISTAS ---

// 1. Home (Landing Page completa)
// Nota: Debes crear este archivo como indiqué en el paso anterior
import HomeView from '../views/HomeView.vue'

// 2. Login (Según tu captura está en components/sections)
import LoginView from '../components/sections/LoginView.vue'

// 3. Dashboard (Panel Privado)
import DashboardView from '../views/DashboardView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView,
    meta: { requiresGuest: true } // Solo accesible si NO estás logueado
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: DashboardView,
    meta: { requiresAuth: true } // Protegido: Solo accesible si estás logueado
  },
  // Captura cualquier ruta inexistente y manda al home (404 handling)
  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  // Comportamiento del scroll suave al navegar a secciones (#contacto, #servicios)
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth',
      }
    }
    return { top: 0 }
  }
})

// --- GUARDIA DE NAVEGACIÓN (SEGURIDAD) ---
// Esto se ejecuta antes de entrar a cada ruta para verificar permisos
router.beforeEach(async (to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  const requiresGuest = to.matched.some(record => record.meta.requiresGuest)
  
  // Esperamos a Firebase para saber si hay usuario real (evita parpadeos al recargar)
  const currentUser = await getCurrentUser()

  if (requiresAuth && !currentUser) {
    // Si quiere ir al Dashboard y no tiene sesión -> Login
    next('/login')
  } else if (requiresGuest && currentUser) {
    // Si quiere ir al Login y YA tiene sesión -> Dashboard
    next('/dashboard')
  } else {
    // Navegación normal
    next()
  }
})

// Función auxiliar para esperar la inicialización de Firebase Auth
function getCurrentUser() {
  return new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      unsubscribe()
      resolve(user)
    }, reject)
  })
}

export default router