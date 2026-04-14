// frontEnd/src/pages/Admin/modules/Rubros/VerRubro.jsx
import React from 'react';
import { getRubroLabel } from '../../../../utils/labels/rubro';
import './Rubro.css';

function VerRubro({ rubro, onClose }) {
  if (!rubro) return null;

  return (
    <div className="modal-overlay">
      <div className="usuarios-form-wrapper">
        <div className="usuarios-form">
          <h3 className="text-center mb-3">Detalle de Rubro</h3>

          <div className="form-scroll">
            <p><strong>ID:</strong> {rubro.id}</p>
            <p><strong>Rubro:</strong> {getRubroLabel(rubro)}</p>
            <p><strong>Descripción:</strong> {rubro.descripcion}</p>
          </div>

          <div className="form-buttons">
            <button
              type="button"
              className="btn btn-primary w-100"
              onClick={onClose}
            >
              Aceptar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VerRubro;