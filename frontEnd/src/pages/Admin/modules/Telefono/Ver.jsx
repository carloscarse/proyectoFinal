import React from "react";
import "./Ver.css"; // reutilizamos los mismos estilos que Dirección

function Ver({ telefono, onClose }) {
  if (!telefono) return null;

  return (
    <div className="modal-overlay">
      <div className="direccion-container">
        <h3 className="direccion-title">Ver Teléfono</h3>
        <div className="direccion-card">
          <p><strong>Código de País:</strong> {telefono.pais}</p>
          <p><strong>Código de Área:</strong> {telefono.cArea}</p>
          <p><strong>Número:</strong> {telefono.numero}</p>
        </div>
        <div className="form-buttons">
          <button onClick={onClose}>Cerrar</button>
        </div>
      </div>
    </div>
  );
}

export default Ver;