import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import {resolve} from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 9000,
    host: '0.0.0.0',
    proxy: {
      '/api': {
        target: 'http://10.10.1.10:9999/sqltest/',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
  plugins: [react()],
  resolve: {
    alias: {
      src: resolve(__dirname, './src'),
    },
  },
})
