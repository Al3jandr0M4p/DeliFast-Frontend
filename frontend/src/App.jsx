import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useState, useEffect } from 'react'

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

function ModalInstall({ onInstall, onCancel }) {
  return (
    <>
      {/* Fondo oscuro */}
      <div style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0,0,0,0.6)',
        zIndex: 999,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }} />

      {/* Modal centrado */}
      <div style={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: 'white',
        padding: 30,
        borderRadius: 10,
        boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
        zIndex: 1000,
        maxWidth: 320,
        width: '90%',
        textAlign: 'center'
      }}>
        <h2>Instalar DeliFast</h2>
        <p>¿Quieres instalar la app para acceder rápido desde tu dispositivo?</p>

        <button
          onClick={onInstall}
          style={{
            marginTop: 20,
            backgroundColor: '#22c55e',
            color: 'white',
            border: 'none',
            padding: '10px 25px',
            borderRadius: 5,
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          Instalar
        </button>

        <button
          onClick={onCancel}
          style={{
            marginTop: 10,
            backgroundColor: 'transparent',
            border: 'none',
            color: '#555',
            cursor: 'pointer',
            textDecoration: 'underline',
          }}
        >
          Cancelar
        </button>
      </div>
    </>
  )
}

function App() {
  return (
    <>
      <BrowserRouter>
        <InstallPrompt/>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/forgot-password' element={<ForgotPassword />} />

          {/* rutas de los usuarios/clientes de la app */}
          <Route path="/user" element={<User />}>
            {/* rutas hijas */}
            <Route index element={<Shop />} />
            <Route path='perfil' element/>
          </Route>

          <Route path='/signOut' element={<SignOut />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
