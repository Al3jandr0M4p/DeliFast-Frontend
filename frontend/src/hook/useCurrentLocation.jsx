import { useEffect, useState } from "react";

function UseCurrentLocation() {
    const [location, setLocation] = useState(null)
    const [error, setError] = useState(null)

    useEffect(() => {
        if (!navigator.geolocation) {
            setError("La geolocalizacion no esta soportada")
            return
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                setLocation({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                })
            },
            (err) => {
                setError("No se pudo obtener la ubicacion")
                console.error(err)
            }
        )
    }, [])

    return {
        location,
        error
    }
}

export default UseCurrentLocation
