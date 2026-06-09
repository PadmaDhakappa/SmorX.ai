import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true,
      },
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom', 'react-router-dom', 'react-helmet-async'],
          'vendor-animation': ['framer-motion'],
          'vendor-icons': ['lucide-react'],
        },
      },
    },
    cssCodeSplit: true,
    chunkSizeWarningLimit: 1000,
    minify: 'esbuild',
  },
})
