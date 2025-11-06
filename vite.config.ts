import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom'],
          router: ['react-router-dom'],
          state: ['zustand'],
          forms: ['react-hook-form', '@hookform/resolvers', 'yup'],
          ui: [
            '@radix-ui/react-dialog',
            '@radix-ui/react-select',
            '@radix-ui/react-slot',
            'lucide-react',
            'class-variance-authority',
            'clsx',
            'tailwind-merge',
            'tailwindcss-animate',
          ],
          utils: ['uuid'],
          table: ['@tanstack/react-table'],
          animations: ['framer-motion'],
          datepicker: ['react-datepicker', 'date-fns'],
        },
      },
    },
  },
})
