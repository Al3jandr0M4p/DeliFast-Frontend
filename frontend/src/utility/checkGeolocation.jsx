import { useState, useEffect, useRef } from "react";

function LocationWarning() {
    const [showWarning, setShowWarning] = useState(false)
    const intervalRef = useRef(null)

    useEffect(() => {

        async function checkAndUpdate() {
            const enabled = await checkLocationPermission()
            if (enabled && intervalRef.current) {
                clearInterval(intervalRef.current)
                intervalRef.current = null
            }
            setShowWarning(!enabled)
        }

        checkAndUpdate()

        intervalRef.current = setInterval(checkAndUpdate, 5000)

        return () => clearInterval(intervalRef.current)

    }, [])

    if (!showWarning) return null

    return (
        <div className="fixed bottom-4 left-4 right-4 bg-yellow-100 text-yellow-900 p-4 rounded-xl shadow-lg z-50 animate-bounce">
            <p className="text-center font-semibold">
                📍 Activa la ubicacion para una mejor experiencia.
            </p>
        </div>
    )
}

async function checkLocationPermission() {
    if (!navigator.geolocation) return false;

    try {
        const permission = await navigator.permissions?.query({ name: 'geolocation' });
        return permission?.state === 'granted';
    } catch {
        return new Promise((resolve) => {
            navigator.geolocation.getCurrentPosition(
                () => resolve(true),
                () => resolve(false)
            );
        });
    }
}

export default LocationWarning
