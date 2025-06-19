import { useState } from 'react'

function ForgotPassword() {
    const [emailSent, setEmailSent] = useState(false)
    const [email, setEmail] = useState("")
    const [code, setCode] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault()

        if (!emailSent) {
            console.log("Enviando email a:", email)

            setEmailSent(true)
        } else {
            console.log("Codigo ingresado:", code)
        }
    }

    return (
        <section className="min-h-screen flex items-center justify-center px-4 py-8">
            {/* <Toaster position="top-right" richColors closeButton /> */}
            <div className="w-full max-w-md bg-white rounded-lg p-6 sm:p-8 space-y-6">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                    Bienvenido Recupera tu Contraseña 👌
                </h1>
                <form 
                    className="space-y-4"
                    onSubmit={handleSubmit}
                >
                    {!emailSent && (
                        <div>
                            <label htmlFor="email" className="bblock mb-2 text-sm font-medium text-gray-900">
                                Email
                            </label>

                            <input 
                                type="email" 
                                id="email" 
                                aria-describedby="helper-text-explanation" 
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5" 
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="example@gmail.com" 
                                required
                            />
                        </div>
                    )}

                    {emailSent && (
                        <div className="hidden">
                            <label htmlFor="email" className="bblock mb-2 text-sm font-medium text-gray-900">
                                Codigo
                            </label>

                            <input 
                                type="text" 
                                id="code" 
                                aria-describedby="helper-text-explanation" 
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5" 
                                value={code}
                                onChange={(e) => setCode(e.target.value)}
                                placeholder="Ingresa el codigo"
                                required 
                            />
                        </div>
                    )}

                    <button 
                        type="submit"
                        className="w-full text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center cursor-pointer"
                    >
                        {emailSent ? "Verificar codigo" : "Recuperar"}
                    </button>
                </form>
            </div>
        </section>
    )
}

export default ForgotPassword
