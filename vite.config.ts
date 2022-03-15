import {defineConfig, loadEnv} from 'vite'
import react from '@vitejs/plugin-react'
import {resolve} from 'path'

// https://vitejs.dev/config/
export default defineConfig(({mode}) => {
  // Load app-level env vars to node-level env vars.
  process.env = {...process.env, ...loadEnv(mode, process.cwd())}

  const apiUrl = process.env.VITE_API_URL as string | undefined

  return {
    server: {
      port: 9000,
      host: '0.0.0.0',
      proxy: {
        '/api': {
          target: apiUrl,
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
  }
})
