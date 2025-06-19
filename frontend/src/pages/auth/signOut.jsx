import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

function SignOut() {
    const navigate = useNavigate()

    useEffect(() => {
        sessionStorage.clear(),
        localStorage.clear(),
        navigate("/")
    }, [navigate])

    return null
}

export default SignOut