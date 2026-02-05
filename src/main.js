import { createApp } from 'vue'
import './style.css' // O tu archivo de estilos principal
import App from './App.vue'
import router from './router' // 1. Importamos el router que creamos

const app = createApp(App)

app.use(router) // 2. Le decimos a Vue que use el Router
app.mount('#app')