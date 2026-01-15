/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Agregamos los colores corporativos de MAJ aquí para usarlos fácil
        maj: {
          blue: '#1e3a8a', // Azul corporativo (ajustable)
          dark: '#0f172a', // Gris oscuro para textos
          light: '#f8fafc', // Fondo claro
        }
      }
    },
  },
  plugins: [],
}