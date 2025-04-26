import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/NexoVate-Solution/', // your GitHub repo name
  build: {
    rollupOptions: {
      external: ['emailjs-com'],  // Tell Vite to externalize emailjs-com if it's an external module
    }
  }
})
