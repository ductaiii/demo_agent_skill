import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api/crypto': {
        target: 'https://api.coingecko.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/crypto/, ''),
      },
      '/api/forex': {
        target: 'https://open.er-api.com',
        changeOrigin: true,
        rewrite: () => '/v6/latest/USD',
      },
      '/api/user': {
        target: 'https://randomuser.me',
        changeOrigin: true,
        rewrite: () => '/api/',
      },
    },
  },
})
