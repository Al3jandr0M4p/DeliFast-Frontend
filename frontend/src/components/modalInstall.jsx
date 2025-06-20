export default function ModalInstall({ onInstall, onCancel }) {
  return (
    <>
      {/* Fondo oscuro */}
      <div style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0,0,0,0.6)',
        zIndex: 999,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }} />

      {/* Modal centrado */}
      <div style={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: 'white',
        padding: 30,
        borderRadius: 10,
        boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
        zIndex: 1000,
        maxWidth: 320,
        width: '90%',
        textAlign: 'center'
      }}>
        <h2>Instalar DeliFast</h2>
        <p>¿Quieres instalar la app para acceder rápido desde tu dispositivo?</p>

        <button
          onClick={onInstall}
          style={{
            marginTop: 20,
            backgroundColor: '#22c55e',
            color: 'white',
            border: 'none',
            padding: '10px 25px',
            borderRadius: 5,
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          Instalar
        </button>

        <button
          onClick={onCancel}
          style={{
            marginTop: 10,
            backgroundColor: 'transparent',
            border: 'none',
            color: '#555',
            cursor: 'pointer',
            textDecoration: 'underline',
          }}
        >
          Cancelar
        </button>
      </div>
    </>
  )
}