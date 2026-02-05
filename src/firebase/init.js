// src/firebase/init.js
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyBDRGeuXhw4g6KuzRSEXjrn9AxRc6JS2eI",
    authDomain: "mantenimientosaj-f4c74.firebaseapp.com",
    projectId: "mantenimientosaj-f4c74",
    storageBucket: "mantenimientosaj-f4c74.firebasestorage.app",
    messagingSenderId: "878068633907",
    appId: "1:878068633907:web:b0819ef2ee064801d96e46",
    measurementId: "G-6PJMCS3XL6"
  };

// Inicializar Firebase
const app = initializeApp(firebaseConfig)

// Exportar servicios
export const db = getFirestore(app)
export const auth = getAuth(app)