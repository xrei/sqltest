import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import {resolve} from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 9000,
  },
  plugins: [react()],
  resolve: {
    alias: {
      src: resolve(__dirname, './src'),
    },
  },
})
