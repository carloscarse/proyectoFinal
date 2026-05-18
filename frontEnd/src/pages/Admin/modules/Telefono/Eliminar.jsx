// frontEnd/src/pages/Admin/modules/Persona/Telefono/Eliminar.jsx
import React from "react";
import "./Eliminar.css";

function EliminarTelefono({ telefono, onClose, onEliminar }) {
  if (!telefono) return null;

  const handleConfirmar = () => {
    onEliminar(telefono.id);
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="telefono-eliminar-container">
        <h3 className="telefono-eliminar-title">Eliminar Teléfono</h3>

        <div className="telefono-eliminar-card">
          <p><strong>ID:</strong> {telefono.id}</p>
          <p><strong>País:</strong> {telefono.pais}</p>
          <p><strong>Código Área:</strong> {telefono.cArea}</p>
          <p><strong>Número:</strong> {telefono.numero}</p>
          <p><strong>Tipo:</strong> {telefono.tipo}</p>
        </div>

        <div className="form-buttons">
          <button onClick={onClose}>Cancelar</button>
          <button className="btn-eliminar" onClick={handleConfirmar}>
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
}

export default EliminarTelefono;