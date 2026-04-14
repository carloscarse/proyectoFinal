// frontEnd/src/pages/Admin/modules/Rubros/EliminarRubro.jsx
import React from 'react';
import './Rubro.css';

function EliminarRubro({ rubro, onCancel, onConfirm, cargando }) {
  if (!rubro) return null;

  return (
    <div className="modal-overlay">
      <div className="usuarios-form-wrapper">
        <div className="usuarios-form">
          <h3 className="text-center mb-3">Confirmar Eliminación</h3>

          <div className="form-scroll">
            <p><strong>ID:</strong> {rubro.id}</p>
            <p><strong>Rubro:</strong> {rubro.rubro}</p>
            <p><strong>Descripción:</strong> {rubro.descripcion}</p>
          </div>

          <div className="form-buttons">
            <button
              type="button"
              className="btn btn-secondary w-50 me-2"
              onClick={onCancel}
              disabled={cargando}
            >
              Cancelar
            </button>
            <button
              type="button"
              className="btn btn-danger w-50"
              onClick={onConfirm}
              disabled={cargando}
            >
              {cargando ? 'Eliminando...' : 'Eliminar'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EliminarRubro;