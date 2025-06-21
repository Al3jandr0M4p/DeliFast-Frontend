import UseCurrentLocation from "../hook/useCurrentLocation";

function ShowUbication() {
    const { location, error } = UseCurrentLocation()

    if (error) return <p className="text-red-500">{error}</p>
    if (!location) return <p className="text-gray-500">📍 Obteniendo ubicación...</p>

    return (
        <div className="p-4">
            <p>{location.latitude}</p>
            <p>{location.longitude}</p>
        </div>
    )
}

export default ShowUbication