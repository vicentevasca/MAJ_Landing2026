<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '../composables/useAuth'
import { db } from '../firebase/init'
import { 
  collection, query, orderBy, limit, onSnapshot, doc, updateDoc, arrayUnion, where 
} from 'firebase/firestore'
import { 
  LogOut, Clock, Building2, MessageSquare, Loader2, CheckCircle2, 
  AlertTriangle, Lightbulb, Megaphone, X, Send, Phone, StickyNote, 
  ArrowRight, Download, Timer, BarChart3, TrendingUp, Eye
} from 'lucide-vue-next'

// --- CONFIGURACIÓN ---
const { logout, user } = useAuth()
const router = useRouter()
const isLoading = ref(true)

// --- DATOS ---
const contacts = ref([])
const analytics = ref([])
const listeners = []

// --- ESTADO UI ---
const selectedLead = ref(null)
const newNote = ref('')
const isUpdating = ref(false)

// --- 1. LÓGICA DE DATOS ---
const initRealTimeListeners = () => {
  // A. Contactos (Leads)
  const qContacts = query(collection(db, 'contacts'), orderBy('createdAt', 'desc'), limit(300))
  const unsubscribeContacts = onSnapshot(qContacts, (snapshot) => {
    contacts.value = snapshot.docs.map(doc => ({ 
      id: doc.id, 
      ...doc.data(),
      status: doc.data().status || 'new', 
      notes: doc.data().notes || [],
      createdAt: doc.data().createdAt,
      closedAt: doc.data().closedAt || null
    }))
    isLoading.value = false
  })
  listeners.push(unsubscribeContacts)

  // B. Analytics (FILTRO MENSUAL)
  // Calculamos el primer día del mes actual
  const now = new Date()
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)

  // Consulta: Eventos desde el día 1 del mes
  // NOTA: Si la consola da error de indice, haz click en el link que aparece en la consola
  const qAnalytics = query(
    collection(db, 'analytics_events'), 
    where('timestamp', '>=', startOfMonth),
    orderBy('timestamp', 'desc'), 
    limit(1000)
  )

  const unsubscribeAnalytics = onSnapshot(qAnalytics, (snapshot) => {
    analytics.value = snapshot.docs.map(doc => doc.data())
  }, (error) => {
    console.error("Error en analytics (Revisa si falta crear el índice en Firebase):", error)
  })
  listeners.push(unsubscribeAnalytics)
}

// --- 2. CÁLCULOS AVANZADOS (GRÁFICOS) ---

const getDate = (timestamp) => {
  if (!timestamp) return null
  return timestamp.toDate ? timestamp.toDate() : new Date(timestamp)
}

// A. GRÁFICO HORARIO (LEADS + VISTAS)
const hourlyActivity = computed(() => {
  const activity = Array(24).fill(0)
  const leadsCount = Array(24).fill(0)
  
  // Sumar Leads
  contacts.value.forEach(c => {
    const date = getDate(c.createdAt)
    if (date) {
      activity[date.getHours()]++
      leadsCount[date.getHours()]++
    }
  })

  // Sumar Vistas (Analytics)
  analytics.value.forEach(a => {
    const date = getDate(a.timestamp)
    if (date) activity[date.getHours()]++
  })

  const maxVal = Math.max(...activity, 1)

  return activity.map((total, hour) => ({
    hour: `${hour}:00`,
    total,
    leads: leadsCount[hour],
    views: total - leadsCount[hour],
    height: (total / maxVal) * 100,
    isPeak: total === maxVal && total > 0
  }))
})

// B. RANKING DE SERVICIOS (TOP DEL MES)
const topServices = computed(() => {
  const counts = {}
  
  analytics.value.forEach(ev => {
    // Filtramos exactamente por el tipo de evento que pusimos en ServicesSection.vue
    // Y nos aseguramos que tenga nombre
    if (ev.type === 'service_click_details' && ev.serviceName) {
      const name = ev.serviceName
      counts[name] = (counts[name] || 0) + 1
    }
  })

  // Convertir a array, ordenar y tomar Top 5
  const sorted = Object.entries(counts)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5)

  // Calcular porcentaje para la barra de progreso
  const maxCount = sorted.length > 0 ? sorted[0].count : 1

  return sorted.map(s => ({
    ...s,
    percent: (s.count / maxCount) * 100
  }))
})

// C. KPI: Tiempo Promedio Cierre
const avgResponseTime = computed(() => {
  const closedLeads = contacts.value.filter(c => c.status === 'done' && c.closedAt && c.createdAt)
  if (closedLeads.length === 0) return 'N/A'
  let totalMinutes = 0
  closedLeads.forEach(c => {
    const start = getDate(c.createdAt)
    const end = getDate(c.closedAt)
    if(start && end) totalMinutes += Math.floor((end - start) / 60000)
  })
  const avg = Math.floor(totalMinutes / closedLeads.length)
  if (avg < 60) return `${avg} min`
  return `${(avg / 60).toFixed(1)} hrs`
})

// D. ESTADÍSTICAS SIMPLES
const stats = computed(() => {
  return { 
    unread: contacts.value.filter(c => c.status === 'new').length,
    pending: contacts.value.filter(c => c.status === 'seen').length,
    total: contacts.value.length
  }
})

// E. COACH VIRTUAL
const coachInsights = computed(() => {
  const insights = []
  
  // Insight: Hora Pico
  const peakHourObj = hourlyActivity.value.find(h => h.isPeak)
  if (peakHourObj && peakHourObj.total > 0) {
    const peakH = parseInt(peakHourObj.hour)
    const postTime = peakH - 1 < 0 ? 23 : peakH - 1
    insights.push({
      title: 'Mejor Hora para Publicar',
      text: `Tu tráfico máximo es a las ${peakHourObj.hour}. Publica contenido a las ${postTime}:00 para aprovechar la audiencia.`,
      icon: Megaphone,
      color: 'text-purple-600 bg-purple-50 border-purple-100'
    })
  }

  // Insight: Servicio Popular
  if (topServices.value.length > 0) {
    const top = topServices.value[0]
    insights.push({
      title: 'Tendencia del Mes',
      text: `"${top.name}" lidera con ${top.count} interesados este mes. ¡Poténcialo con una oferta!`,
      icon: TrendingUp,
      color: 'text-blue-600 bg-blue-50 border-blue-100'
    })
  } else {
    insights.push({
      title: 'Esperando Datos',
      text: 'Aún no hay clics en servicios este mes. Los datos se mostrarán aquí cuando los clientes interactúen.',
      icon: Loader2,
      color: 'text-slate-500 bg-slate-50 border-slate-100'
    })
  }

  // Insight: Alerta Leads
  if (stats.value.unread > 3) {
    insights.push({
      title: 'Atención Requerida',
      text: `Tienes ${stats.value.unread} mensajes nuevos acumulados.`,
      icon: AlertTriangle,
      color: 'text-red-600 bg-red-50 border-red-100'
    })
  }

  return insights
})

// --- ACCIONES ---
const exportToCSV = () => {
  if (contacts.value.length === 0) return alert("No hay datos")
  const headers = ["Fecha", "Nombre", "Empresa", "Teléfono", "Email", "Mensaje", "Estado"]
  const rows = contacts.value.map(c => [
    formatDate(c.createdAt),
    `"${c.name}"`,
    `"${c.company || ''}"`,
    c.phone,
    c.email,
    `"${c.message?.replace(/\n/g, ' ')}"`,
    c.status
  ])
  const csvContent = [headers.join(","), ...rows.map(e => e.join(","))].join("\n")
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement("a")
  link.setAttribute("href", url)
  link.setAttribute("download", `reporte_maj_${new Date().getMonth()+1}.csv`)
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

const openLeadModal = async (lead) => {
  selectedLead.value = lead
  if (lead.status === 'new') {
    try { await updateDoc(doc(db, 'contacts', lead.id), { status: 'seen' }) } catch (e) {}
  }
}

const markAsDone = async () => {
  if (!selectedLead.value) return
  isUpdating.value = true
  try {
    await updateDoc(doc(db, 'contacts', selectedLead.value.id), { 
      status: 'done', closedAt: new Date() 
    })
    selectedLead.value = null
  } catch (e) {} finally { isUpdating.value = false }
}

const addNote = async () => {
  if (!newNote.value.trim() || !selectedLead.value) return
  isUpdating.value = true
  try {
    const note = { text: newNote.value, date: new Date().toISOString(), author: user.value.email }
    await updateDoc(doc(db, 'contacts', selectedLead.value.id), { notes: arrayUnion(note) })
    newNote.value = ''
  } catch (e) {} finally { isUpdating.value = false }
}

const formatDate = (ts) => {
  const d = getDate(ts)
  return d ? new Intl.DateTimeFormat('es-CL', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' }).format(d) : ''
}
const formatNoteDate = (iso) => {
  const d = new Date(iso)
  return `${d.getDate()}/${d.getMonth()+1} ${d.getHours()}:${d.getMinutes()}`
}
const getWhatsAppLink = (phone) => `https://wa.me/${phone.replace(/\D/g, '')}`

onMounted(() => initRealTimeListeners())
onUnmounted(() => listeners.forEach(u => u()))
</script>

<template>
  <div class="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900">
    
    <main class="flex-1 px-4 md:px-8 max-w-[1600px] mx-auto w-full space-y-6 pt-32 md:pt-28 pb-20">
      
      <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 class="text-2xl font-bold text-slate-900">Dashboard Gerencial</h2>
          <div class="flex items-center gap-2">
            <span class="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            <p class="text-sm text-slate-500">Datos de {{ new Date().toLocaleString('es-CL', { month: 'long' }) }} (Mes actual)</p>
          </div>
        </div>
        <button @click="exportToCSV" class="flex items-center gap-2 bg-white border border-slate-200 text-slate-700 px-4 py-2 rounded-xl text-sm font-bold shadow-sm hover:bg-slate-50 transition">
          <Download class="w-4 h-4" /> Exportar Reporte
        </button>
      </div>

      <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div class="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
          <p class="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Por Atender</p>
          <div class="flex items-baseline gap-2">
            <h3 class="text-3xl font-bold text-red-600">{{ stats.unread }}</h3>
            <span class="text-xs text-red-400 font-medium" v-if="stats.unread > 0">¡Acción!</span>
          </div>
        </div>
        <div class="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
          <p class="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">En Gestión</p>
          <h3 class="text-3xl font-bold text-blue-600">{{ stats.pending }}</h3>
        </div>
        <div class="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
          <p class="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Velocidad Cierre</p>
          <h3 class="text-3xl font-bold text-emerald-600 truncate">{{ avgResponseTime }}</h3>
        </div>
        <div class="bg-slate-800 p-5 rounded-2xl border border-slate-700 shadow-sm text-white">
          <p class="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Total Leads</p>
          <h3 class="text-3xl font-bold">{{ stats.total }}</h3>
        </div>
      </div>

      <div class="grid lg:grid-cols-3 gap-6">
        
        <div class="lg:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-sm p-6 flex flex-col h-[400px]">
          <div class="mb-6">
            <h3 class="font-bold text-slate-800 flex items-center gap-2">
              <Clock class="w-5 h-5 text-indigo-500" />
              Actividad del Mes (24h)
            </h3>
            <p class="text-xs text-slate-500 mt-1">Interacciones totales (Visitas + Contactos) agrupadas por hora.</p>
          </div>
          
          <div class="flex-1 flex items-end gap-1 sm:gap-2 relative pb-6 border-b border-slate-100">
            <div 
              v-for="(h, i) in hourlyActivity" :key="i"
              class="flex-1 flex flex-col justify-end group relative z-10 h-full"
            >
              <div class="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block z-20">
                <div class="bg-slate-800 text-white text-xs py-1.5 px-3 rounded-lg shadow-xl whitespace-nowrap">
                  <div class="font-bold border-b border-white/20 pb-1 mb-1">{{ h.hour }}</div>
                  <div class="flex justify-between gap-3"><span>Visitas:</span> <span>{{ h.views }}</span></div>
                  <div class="flex justify-between gap-3 text-yellow-300"><span>Leads:</span> <span>{{ h.leads }}</span></div>
                  <div class="mt-1 pt-1 border-t border-white/20 text-center font-bold text-indigo-300">Total: {{ h.total }}</div>
                </div>
              </div>
              <div class="w-full bg-slate-100 rounded-t-sm relative overflow-hidden transition-all duration-500 flex flex-col-reverse hover:brightness-95 cursor-pointer"
                   :style="{ height: `${Math.max(h.height, 0)}%` }">
                   <div class="w-full bg-indigo-600 absolute bottom-0 left-0 transition-all duration-1000" :style="{ height: '100%' }"></div>
                   <div v-if="h.isPeak" class="absolute top-0 w-full h-1 bg-yellow-400"></div>
              </div>
              <span v-if="i % 4 === 0" class="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] text-slate-400">{{ i }}h</span>
            </div>
          </div>
        </div>

        <div class="flex flex-col gap-6">
          
          <div class="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 flex-1">
            <h3 class="font-bold text-slate-800 flex items-center gap-2 mb-4">
              <BarChart3 class="w-5 h-5 text-blue-500" />
              Más Vistos (Mes)
            </h3>
            <div class="space-y-4">
              <div v-for="(service, idx) in topServices" :key="service.name" class="group">
                <div class="flex justify-between text-xs mb-1">
                  <span class="font-bold text-slate-700 truncate pr-2">{{ idx + 1 }}. {{ service.name }}</span>
                  <span class="text-slate-500 font-mono">{{ service.count }} clicks</span>
                </div>
                <div class="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div class="h-full bg-blue-500 rounded-full transition-all duration-1000 ease-out group-hover:bg-blue-600"
                       :style="{ width: `${service.percent}%` }"></div>
                </div>
              </div>
              <div v-if="topServices.length === 0" class="text-xs text-slate-400 text-center py-4 flex flex-col items-center">
                <Loader2 class="w-4 h-4 animate-spin mb-2"/>
                Esperando interacción...
              </div>
            </div>
          </div>

          <div class="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl shadow-lg p-5 text-white relative overflow-hidden">
             <div class="flex items-center gap-2 mb-3">
               <Lightbulb class="w-5 h-5 text-yellow-300" />
               <h3 class="font-bold text-sm">MAJ Insights</h3>
             </div>
             <div class="space-y-3 max-h-[150px] overflow-y-auto custom-scrollbar pr-1">
               <div v-for="(insight, idx) in coachInsights" :key="idx" class="bg-white/10 p-3 rounded-lg border border-white/5 backdrop-blur-sm">
                 <p class="text-[10px] uppercase font-bold text-slate-400 mb-1">{{ insight.title }}</p>
                 <p class="text-xs leading-relaxed text-slate-200">{{ insight.text }}</p>
               </div>
             </div>
          </div>

        </div>
      </div>

      <div class="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div class="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
          <h3 class="font-bold text-slate-800 flex items-center gap-2">
            <MessageSquare class="w-5 h-5 text-blue-600" />
            Gestión de Leads
          </h3>
          <span class="text-xs font-bold text-slate-500">{{ contacts.length }} Total</span>
        </div>
        <div class="overflow-x-auto">
          <table class="w-full text-left text-sm">
            <thead class="bg-slate-50 text-slate-500 text-xs uppercase">
              <tr>
                <th class="p-4">Estado</th>
                <th class="p-4">Fecha</th>
                <th class="p-4">Cliente</th>
                <th class="p-4 hidden md:table-cell">Empresa</th>
                <th class="p-4 text-right">Acción</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100">
              <tr v-for="lead in contacts" :key="lead.id" class="hover:bg-slate-50/50 transition">
                <td class="p-4">
                   <span class="px-2 py-1 rounded-full text-xs font-bold border inline-flex items-center gap-1"
                    :class="{
                      'bg-red-50 text-red-700 border-red-100': lead.status === 'new',
                      'bg-blue-50 text-blue-700 border-blue-100': lead.status === 'seen',
                      'bg-emerald-50 text-emerald-700 border-emerald-100': lead.status === 'done'
                    }">
                    <span class="w-1.5 h-1.5 rounded-full" :class="lead.status==='new'?'bg-red-500':(lead.status==='seen'?'bg-blue-500':'bg-emerald-500')"></span>
                    {{ lead.status === 'new' ? 'Nuevo' : (lead.status === 'seen' ? 'En Proceso' : 'Cerrado') }}
                   </span>
                </td>
                <td class="p-4 text-slate-500 whitespace-nowrap">{{ formatDate(lead.createdAt) }}</td>
                <td class="p-4 font-bold text-slate-800">{{ lead.name }}</td>
                <td class="p-4 text-slate-500 hidden md:table-cell">{{ lead.company || '-' }}</td>
                <td class="p-4 text-right">
                  <button @click="openLeadModal(lead)" class="text-blue-600 hover:text-blue-800 font-bold text-xs bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-lg transition">
                    Ver
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

    </main>

    <div v-if="selectedLead" class="fixed inset-0 z-[100] flex items-center justify-center px-4">
      <div class="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" @click="selectedLead = null"></div>
      <div class="bg-white w-full max-w-2xl rounded-2xl shadow-2xl relative z-10 flex flex-col max-h-[90vh] animate-fade-in-up">
        
        <div class="p-6 border-b border-slate-100 flex justify-between items-start bg-slate-50 rounded-t-2xl">
          <div>
            <h2 class="text-xl font-bold text-slate-900">{{ selectedLead.name }}</h2>
            <div class="flex items-center gap-3 mt-1 text-sm text-slate-500">
              <span class="flex items-center gap-1"><Building2 class="w-3 h-3"/> {{ selectedLead.company || 'Particular' }}</span>
              <span>·</span>
              <span>{{ formatDate(selectedLead.createdAt) }}</span>
            </div>
          </div>
          <button @click="selectedLead = null" class="p-2 hover:bg-slate-200 rounded-full transition"><X class="w-5 h-5 text-slate-500"/></button>
        </div>

        <div class="flex-1 overflow-y-auto p-6 space-y-6">
          <div class="grid grid-cols-2 gap-4">
            <a :href="getWhatsAppLink(selectedLead.phone)" target="_blank" class="flex items-center justify-center gap-2 p-3 bg-green-50 text-green-700 font-bold rounded-xl hover:bg-green-100 transition border border-green-100">
              <Phone class="w-4 h-4" /> WhatsApp
            </a>
            <a :href="`mailto:${selectedLead.email}`" class="flex items-center justify-center gap-2 p-3 bg-blue-50 text-blue-700 font-bold rounded-xl hover:bg-blue-100 transition border border-blue-100">
              <Send class="w-4 h-4" /> Correo
            </a>
          </div>

          <div class="bg-slate-50 p-4 rounded-xl border border-slate-100">
            <h4 class="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Mensaje Original</h4>
            <p class="text-sm text-slate-700 italic">"{{ selectedLead.message }}"</p>
          </div>

          <div>
            <h4 class="text-xs font-bold text-slate-800 mb-3 flex items-center gap-2"><StickyNote class="w-4 h-4" /> Bitácora</h4>
            <div class="space-y-3 mb-3 max-h-40 overflow-y-auto custom-scrollbar">
              <div v-for="(n, i) in selectedLead.notes" :key="i" class="bg-yellow-50 p-3 rounded-lg border border-yellow-100 text-sm">
                <p class="text-yellow-900">{{ n.text }}</p>
                <span class="text-[10px] text-yellow-600 block mt-1 text-right">{{ formatNoteDate(n.date) }}</span>
              </div>
            </div>
            <div class="flex gap-2">
              <input v-model="newNote" @keyup.enter="addNote" type="text" placeholder="Agregar nota..." class="flex-1 text-sm px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500">
              <button @click="addNote" :disabled="!newNote.trim()" class="bg-slate-800 text-white px-4 rounded-lg text-sm font-bold hover:bg-slate-700">Guardar</button>
            </div>
          </div>
        </div>

        <div class="p-6 border-t border-slate-100 bg-slate-50 rounded-b-2xl flex justify-between items-center">
          <span class="text-xs font-bold text-slate-400 uppercase">Estado: {{ selectedLead.status }}</span>
          <button v-if="selectedLead.status !== 'done'" @click="markAsDone" class="flex items-center gap-2 px-6 py-2 bg-emerald-600 text-white rounded-lg font-bold hover:bg-emerald-700 transition">
            <CheckCircle2 class="w-4 h-4" /> Finalizar
          </button>
          <div v-else class="text-emerald-600 font-bold text-sm flex items-center gap-2"><CheckCircle2 class="w-5 h-5"/> Completado</div>
        </div>
      </div>
    </div>

  </div>
</template>

<style scoped>
.custom-scrollbar::-webkit-scrollbar { width: 4px; }
.custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }
.animate-fade-in-up { animation: fade-in-up 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
@keyframes fade-in-up { from { opacity: 0; transform: translateY(20px) scale(0.95); } to { opacity: 1; transform: translateY(0) scale(1); } }
</style>