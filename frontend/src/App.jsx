import { BrowserRouter, Routes, Route } from 'react-router-dom'

// pages

// __Auth__
import Register from './pages/auth/register'
import Login from './pages/auth/login'
import ForgotPassword from './pages/auth/forgot'

// __User__
import User from './pages/user'
import Shop from './pages/shop'

import './styles/OutPut.css'

function App() {

  return (
    <>
      <BrowserRouter>
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
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
