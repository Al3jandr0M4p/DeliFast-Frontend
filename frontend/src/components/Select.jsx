import Select from 'react-select'

export function CustomSelect({ setFormData }) {
    const Options = [
        { value: 'vendedor', label: 'Vendedor' },
        { value: 'client', label: 'Cliente' },
        { value: 'delivery', label: 'Delivery' }
    ]

    const handleChange = (selectOption) => {
        setFormData(prev => ({
            ...prev,
            tipoCuenta: selectOption.value
        }))
    }
    return (
        <Select
            options={Options}
            onChange={handleChange}
            className='text-left'
            placeholder="Ingresa un tipo de cuenta"
        />
    )
}
