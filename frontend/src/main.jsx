import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { registerSW } from 'virtual:pwa-register'
import App from './App.jsx'

registerSW({
  onRegistered(r) {
    console.log("Service worker registered:", r)
  },
  onRegisterError(err) {
    console.error("SW registration error:", err)
  }
})

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
