import { useState } from 'react';
import FormularioInquilino from '../Inquilinos/FormularioInquilino';

function TestModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div style={{ padding: '2rem' }}>
      <h2>🧪 Test de Modal Inquilino</h2>
      <button className="btn btn-warning" onClick={() => setShowModal(true)}>
        Abrir FormularioInquilino
      </button>

      {showModal && (
        <div className="modal-overlay">
          <FormularioInquilino
            onClose={(nuevoId) => {
              console.log('🆕 ID recibido:', nuevoId);
              setShowModal(false);
            }}
          />
        </div>
      )}
    </div>
  );
}

export default TestModal;