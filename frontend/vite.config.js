import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['logo.png'],
      manifest: {
        name: "DeliFast",
        short_name: "DeliFast",
        description: "Compra rapido y local desde tu barrio",
        theme_color: "#22c55e",
        background_color: "#ffffff",
        display: "standalone",
        start_url: "/",
        scope: '/',
        icons: [
          {
            src: '/logo.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/logo.png',
            sizes: '512x512',
            type: 'image/png',
          }
        ]
      }
    })
  ],
  // server: {
  //   proxy: {
  //     '/api': {
  //       target: 'https://delifast.onrender.com',
  //       changeOrigin: true,
  //       secure: false
  //     }
  //   }
  // }
})
