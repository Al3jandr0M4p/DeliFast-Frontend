import { useState, useEffect } from "react";

import UseCurrentLocation from "../hook/useCurrentLocation";

function ShowUbication() {
    const { location, error } = UseCurrentLocation()
    const [address, setAddress] = useState(null)

    useEffect(() => {
        if (location) {
            const { latitude, longitude } = location

            fetch(
                `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
            )
                .then((res) => res.json())
                .then((data) => {
                    const addr = data.address;
                    const calle = addr.road || addr.pedestrian || addr.street || "Calle desconocida";
                    const barrio = addr.suburb || addr.neighbourhood || addr.village || "Barrio desconocido";
                    setAddress(`${calle}, ${barrio}`);
                })
                .catch((err) => {
                    console.error("Error al obtener la direccion:", err);
                    setAddress("No se pudo obtener la direccion.");
                });
        }
    }, [location])

    if (error) return <p className="text-red-500">{error}</p>
    if (!location) return <p className="text-gray-500">📍 Obteniendo ubicación...</p>

    return (
        <div className="p-4 text-sm text-gray-800">
            <p>{address}</p>
        </div>
    )
}

export default ShowUbication