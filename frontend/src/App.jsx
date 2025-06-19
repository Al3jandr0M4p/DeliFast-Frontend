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
  const [showBtn, setShowBtn] = useState(false)

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault()
      setDeferredPrompt(e)
      setShowBtn(true)
    }

    window.addEventListener('beforeinstallprompt', handler)

    return () => window.removeEventListener('beforeinstallprompt', handler)
  }, [])

  const handleInstallClick = () => {
    if (!deferredPrompt) return
    deferredPrompt.prompt()
    deferredPrompt.userChoice.then(() => {
      setDeferredPrompt(null)
      setShowBtn(false)
    })
  }

  if (!showBtn) return null

  return (
    <button onClick={handleInstallClick} style={{
      position: 'fixed',
      bottom: 20,
      right: 20,
      zIndex: 1000,
      padding: '10px 20px',
      backgroundColor: '#22c55e',
      color: 'white',
      border: 'none',
      borderRadius: 5,
      cursor: 'pointer'
    }}>
      Instalar app
    </button>
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
