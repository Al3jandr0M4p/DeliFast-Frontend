import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { registerSW } from 'virtual:pwa-register'

// pages

// __Auth__
import Register from './pages/auth/register'
import Login from './pages/auth/login'
import ForgotPassword from './pages/auth/forgot'

// __User__
import User from './pages/user'
import Shop from './pages/shop'

// __general__
import SignOut from './pages/auth/signOut'

// __components__
import ModalInstall from './components/modalInstall'

import './styles/OutPut.css'

function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState(null)

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault()
      setDeferredPrompt(e)
    }
    window.addEventListener('beforeinstallprompt', handler)
    return () => window.removeEventListener('beforeinstallprompt', handler)
  }, [])

  const handleInstallClick = () => {
    if (!deferredPrompt) return
    deferredPrompt.prompt()
    deferredPrompt.userChoice.then(() => setDeferredPrompt(null))
  }

  const handleCancel = () => {
    setDeferredPrompt(null)
  }

  if (!deferredPrompt) return null

  return (
    <ModalInstall onInstall={handleInstallClick} onCancel={handleCancel} />
  )
}

function App() {
  const [needRefresh, setNeedRefresh] = useState(false)
  const [UpdateServiceWorker, setUpdateServiceWorker] = useState(() => () => { })

  registerSW({
    onNeedRefresh() {
      console.log("Nueva versión disponible")
      setNeedRefresh(true)
    },
    onOfflineReady() {
      console.log("App lista para funcionar offline")
    },
    onRegisteredSW(swUrl, r) {
      if (r && r.waiting) {
        setNeedRefresh(true)
        setUpdateServiceWorker(() => () => r.waiting.postMessage({
          type: "SKIP_WAITING"
        }))
      }
    }
  })
  return (
    <>
      <BrowserRouter>
        <InstallPrompt />
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/forgot-password' element={<ForgotPassword />} />

          {/* rutas de los usuarios/clientes de la app */}
          <Route path="/user" element={<User />}>
            {/* rutas hijas */}
            <Route index element={<Shop />} />
            <Route path='perfil' element />
          </Route>

          <Route path='/signOut' element={<SignOut />} />
        </Routes>

        {/* modal de nueva version disponible */}
        {needRefresh && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg space-y-4 text-center max-w-sm mx-auto">
              <h2 className="text-xl font-bold">Nueva versión disponible</h2>
              <p className="text-gray-700">Actualiza la app para obtener las últimas mejoras y correcciones.</p>
              <div className="flex justify-center gap-4">
                <button
                  className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
                  onClick={() => setNeedRefresh(false)}
                >
                  Más tarde
                </button>
                <button
                  className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
                  onClick={() => {
                    UpdateServiceWorker()
                    window.location.reload()
                  }}
                >
                  Actualizar
                </button>
              </div>
            </div>
          </div>
        )}
      </BrowserRouter>
    </>
  )
}

export default App
