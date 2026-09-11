import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Institutional Fix: Force a single React instance to prevent duplicate hook errors
  resolve: {
    dedupe: ['react', 'react-dom']
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'lucide-react']
  },
  server: {
    host: '0.0.0.0',
    port: 5176,
    strictPort: true
  }
})
