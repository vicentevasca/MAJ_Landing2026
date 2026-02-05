<script setup>
import Navbar from './components/layout/Navbar.vue' // Ajusta la ruta si es necesario
// Ya no importas Hero, Services, etc. aquí.
</script>

<template>
  <Navbar />
  
  <router-view />
</template>