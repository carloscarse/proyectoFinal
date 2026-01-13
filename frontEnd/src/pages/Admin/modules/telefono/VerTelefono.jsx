import React from 'react';
import './Telefono.css';

function VerTelefono({ telefono, onClose }) {
  if (!telefono) return null;

  return (
    <div className="modal-overlay modal-overlay-hijo">
      <div className="telefono-view-wrapper">
        <div className="telefono-form">
          <h3 className="text-center mb-3">Detalle de Teléfono</h3>

          <div className="form-scroll">
            <p><strong>ID:</strong> {telefono.id}</p>
            <p><strong>Persona:</strong> {telefono.persona || '-'}</p>
            <p><strong>País:</strong> {telefono.pais || '-'}</p>
            <p><strong>Código de Área:</strong> {telefono.cArea || '-'}</p>
            <p><strong>Número:</strong> {telefono.numero || '-'}</p>
          </div>

          <div className="form-buttons">
            <button
              type="button"
              className="btn btn-secondary w-100"
              onClick={onClose}
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VerTelefono;