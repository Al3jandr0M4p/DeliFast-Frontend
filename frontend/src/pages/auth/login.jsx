import { useState, useEffect } from 'react'
import { Toaster, toast } from "sonner"
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google'

function Login() {
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    })
    const [welcomeUser, setWelcomeUser] = useState("")

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleOnSubmit = async (e) => {
        e.preventDefault()

        try {
            const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            })

            const data = await response.json()

            if (!response.ok) {

                if (response.status === 400 && data.message === "Todos los campos son requeridos") {
                    toast.warning(data.message)
                } else {
                    toast.error(data.message || "Algo salio mal, vuelve a intentarlo")
                }

                return
            }

            toast.success(data.message || "Logueo exitoso")
            setTimeout(() => {
                window.location.href = data.redirect
            }, 2000)

        } catch (err) {
            console.log(`ERROR ${err}`)
        }
    }

    useEffect(() => {
        const savedUsername = localStorage.getItem("welcome_username")
        if (savedUsername) {
            setWelcomeUser(savedUsername)
        }
    }, [])

    return (
        <section className="min-h-screen flex items-center justify-center px-4 py-8">
            <Toaster position="top-right" richColors closeButton />
            <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6 sm:p-8 space-y-6">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                    {welcomeUser ? `Bienvenido de vuelta ${welcomeUser} 👋` : 'Bienvenido 👋'}
                </h1>
                <p className="text-md text-gray-700">
                    <span className="font-medium text-gray-800">Inicia en nuestra app</span> en segundos y disfruta. <br />
                    <span className="text-sm text-gray-600">No tienes una cuenta?</span>{' '}
                    <a
                        href="/register"
                        className="text-indigo-600 text-sm font-bold underline hover:text-indigo-800 transition-all duration-200"
                    >
                        Registrate aqui
                    </a>
                </p>

                <form
                    onSubmit={handleOnSubmit}
                    className="space-y-4"
                    method='post'
                >
                    <div>
                        <label
                            htmlFor="username"
                            className="block mb-2 text-sm font-medium text-gray-900"
                        >
                            Username
                        </label>
                        <input
                            id="username"
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            autoComplete="off"
                            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-indigo-600 focus:border-indigo-600 block w-full p-2.5"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="password"
                            className="block mb-2 text-sm font-medium text-gray-900"
                        >
                            Contraseña
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            autoComplete="new-password"
                            placeholder="••••••••"
                            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-indigo-600 focus:border-indigo-600 block w-full p-2.5"
                        />
                    </div>


                    <div className="flex justify-center items-center">
                        <span className="flex-1 border-t border-gray-300"></span>
                        <span className="px-3 text-sm text-gray-500">O</span>
                        <span className="flex-1 border-t border-gray-300"></span>
                    </div>

                    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_APP_ID}>
                        <GoogleLogin
                            onSuccess={async credentialResponse => {
                                const res = await fetch(`${import.meta.env.VITE_BASE_URL}/api/google-login`, {
                                    method: "POST",
                                    headers: {
                                        "Content-Type": "application/json"
                                    },
                                    body: JSON.stringify({
                                        token: credentialResponse.credential
                                    })
                                })

                                const data = await res.json()

                                if (data.newUser) {
                                    const rol = prompt("Selecciona tu tipo de cuenta: client, vendedor o delivery")

                                    if (!rol || !["client", "vendedor", "delivery"].includes(rol)) {
                                        toast.warning("rol invalido o cancelado")
                                        return
                                    }

                                    const registerRes = await fetch(`${import.meta.env.VITE_BASE_URL}/api/google-register`, {
                                        method: "POST",
                                        headers: {
                                            "Content-Type": "application/json"
                                        },
                                        body: JSON.stringify({
                                            token: credentialResponse.credential,
                                            rol
                                        })
                                    })

                                    const registerData = await registerRes.json()

                                    if (registerRes.ok) {
                                        localStorage.setItem("welcome_username_google", registerData.user.username)
                                        toast.success(registerData.message)
                                        window.location.href = registerData.redirect
                                    } else {
                                        toast.error(registerData.message)
                                    }
                                } else {
                                    localStorage.setItem("welcome_username_google", data.user.username)
                                    window.location.href = data.redirect
                                }
                            }}
                            onError={() => {
                                console.log("ERROR al iniciar session con Google")
                                toast.error("Error al iniciar session con Google")
                            }}
                        />
                    </GoogleOAuthProvider>

                    <div className='flex items-center justify-between'>
                        <a href="/forgot-password" className="text-sm font-medium text-indigo-600 hover:underline">Olvidaste tu Contraseña?</a>
                    </div>

                    <button
                        type="submit"
                        className="w-full text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center cursor-pointer"
                    >
                        Entrar
                    </button>
                </form>
            </div>
        </section>
    )
}

export default Login
