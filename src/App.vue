<script setup>
// 1. Layout
import Navbar from './components/layout/Navbar.vue'
import Footer from './components/layout/Footer.vue'

// 2. Secciones
import HeroSection from './components/sections/HeroSection.vue'
import TrustSection from './components/sections/TrustSection.vue'
import ServicesSection from './components/sections/ServicesSection.vue'
import IndustriesSection from './components/sections/IndustriesSection.vue'
import WhyUsSection from './components/sections/WhyUsSection.vue'
import ContactSection from './components/sections/ContactSection.vue'

// 3. UI Global
import FloatingWhatsApp from './components/ui/FloatingWhatsApp.vue'
</script>

<template>
  <div class="flex flex-col min-h-screen font-sans text-slate-800">
    <Navbar />
    
    <main class="flex-grow">
      <HeroSection />
      
      <TrustSection />
      
      <ServicesSection />
      <IndustriesSection />
      
      <WhyUsSection />
      
      <ContactSection />
    </main>

    <Footer />
    
    <FloatingWhatsApp />
  </div>
</template>