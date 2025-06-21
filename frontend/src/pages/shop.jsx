import { useEffect } from 'react'
import { initFlowbite } from 'flowbite'


import LocationWarning from '../utility/checkGeolocation'
import ShowUbication from '../utility/showUbication'

function Shop() {

    useEffect(() => {
        initFlowbite()
    }, [])

    return (
        <>
            <header>
                <LocationWarning />
                <div>
                    <ShowUbication />

                    <select name="DiningOptions" id="diningOptions">
                        <option value="Deliveri" defaultValue>Delivery</option>
                        <option value="Recoger">Recoger</option>
                    </select>

                    {/* icono del carrito */}
                </div>

                <input 
                    type="search" 
                    name='searchShop' 
                    placeholder='Busca en DeliFast' 
                />
            </header>

            {/* contenido de tags */}
            <section>
                {/* iconos de las comidas o categorias */}

                {/* tags de offertas o tipo filter */}
            </section>

            {/* contenido principal */}
            <main>
                {/* las carts de todas las tiendas y que sean en sliders */}
            </main>
        </>
    )
}

export default Shop
