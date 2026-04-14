// proyecto/frontEnd/src/pages/Admin/modules/Telefono/VerObjeto.jsx
import React from "react";
import "./Ver.css"; // estilo específico de Ver

function VerObjetoTelefono({ telefono, onClose }) {
  if (!telefono) return null;

  return (
    <div className="telefono-ver-objeto-overlay">
      <div className="telefono-ver-objeto-container">
        <h3 className="telefono-ver-objeto-title">Detalle del Teléfono</h3>
        <div className="telefono-ver-objeto-card">
          <p><strong>Teléfono:</strong> +{telefono.pais} {telefono.cArea} {telefono.numero}</p>
          <p><strong>País:</strong> {telefono.pais}</p>
          <p><strong>Código Área:</strong> {telefono.cArea}</p>
          <p><strong>Número:</strong> {telefono.numero}</p>
        </div>
        <div className="telefono-ver-objeto-form-buttons">
          <button 
            className="telefono-ver-objeto-btn-aceptar" 
            onClick={onClose}
          >
            Aceptar
          </button>
        </div>
      </div>
    </div>
  );
}

export default VerObjetoTelefono;