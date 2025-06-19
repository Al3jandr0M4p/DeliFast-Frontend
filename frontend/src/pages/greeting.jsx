import { useEffect, useState } from "react"

export function Greeting() {
    const [name, setName] = useState("")

    useEffect(() => {
        const username = localStorage.getItem("welcome_username_google")
        if (username) setName(username)
    }, [])

    return (
        <h2 className="text-xl font-medium mb-4">
            Bienvenido {name} ❤️!
        </h2>
    )
}
