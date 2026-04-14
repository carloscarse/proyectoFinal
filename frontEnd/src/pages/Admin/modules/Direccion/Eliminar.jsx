// frontEnd/src/pages/Admin/modules/Persona/Direccion/Eliminar.jsx
import React from "react";
import "./Eliminar.css";

function EliminarDireccion({ direccion, onClose, onEliminar }) {
  if (!direccion) return null;

  const handleConfirmar = () => {
    onEliminar(direccion.id);
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="direccion-eliminar-container">
        <h3 className="direccion-eliminar-title">Eliminar Dirección</h3>

        <div className="direccion-eliminar-card">
          <p><strong>ID:</strong> {direccion.id}</p>
          <p><strong>Calle:</strong> {direccion.calle}</p>
          <p><strong>Número:</strong> {direccion.numero}</p>
          <p><strong>Ciudad:</strong> {direccion.ciudad}</p>
          <p><strong>Provincia:</strong> {direccion.provincia}</p>
          <p><strong>País:</strong> {direccion.pais}</p>
          <p><strong>Código Postal:</strong> {direccion.codigoPostal}</p>
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

export default EliminarDireccion;