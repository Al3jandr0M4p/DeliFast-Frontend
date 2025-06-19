import { useState } from "react"
import { Toaster, toast } from "sonner"

import { CustomSelect } from "../../components/Select"

const BASE_URL = import.meta.env.VITE_BASE_URL

function Register() {
    const [formData, setFormData] = useState({
        email: '',
        username: '',
        password: '',
        tipoCuenta: ''
    })

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handlerOnSubmit = async (e) => {
        e.preventDefault()

        try {
            const response = await fetch(`${BASE_URL}/api/register`, {
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

            // guardamos el nombre del usuario en el localStorage
            if (data.username) {
                localStorage.setItem("welcome_username", data.username)
            }

            toast.success(data.message || "Registro exitoso")
            setTimeout(() => {
                window.location.href = data.redirect || "/"
            }, 1500)
        } catch (error) {
            console.log("ERROR al enviar formulario ", error)
            toast.error("ERROR de red o del servidor")
        }
    }

    return (
        <section className="min-h-screen flex items-center justify-center px-4 py-8">
            <Toaster position="top-right" richColors closeButton />
            <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6 sm:p-8 space-y-6">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Registrate ❤️</h1>
                <p className="text-md text-gray-700">
                    <span className="font-medium text-gray-800">Encuentra los mejores productos</span> en nuestra app. <br />
                    <span className="text-sm text-gray-600">Ya tienes una cuenta?</span>{' '}
                    <a
                        href="/"
                        className="text-indigo-600 text-sm font-bold underline hover:text-indigo-800 transition-all duration-200"
                    >
                        Inicia sesion aqui
                    </a>
                </p>

                <form
                    onSubmit={handlerOnSubmit}
                    className="space-y-4"
                    method="post"
                >
                    <div>
                        <label
                            htmlFor="email"
                            className="block mb-2 text-sm font-medium text-gray-900"
                        >
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="ejemplo@gmail.com"
                            autoComplete="off"
                            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-indigo-600 focus:border-indigo-600 block w-full p-2.5"
                        />
                    </div>

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

                    <div>
                        <label
                            htmlFor="password"
                            className="block mb-2 text-sm font-medium text-gray-900"
                        >
                            Tipo cuenta
                        </label>
                        <CustomSelect setFormData={setFormData} />
                    </div>

                    <button
                        type="submit"
                        className="w-full text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center cursor-pointer"
                    >
                        Registrarse
                    </button>
                </form>
            </div>
        </section>
    )
}

export default Register
