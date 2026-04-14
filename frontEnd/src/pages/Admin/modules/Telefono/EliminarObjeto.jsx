// proyecto/frontEnd/src/pages/Admin/modules/Telefono/EliminarObjeto.jsx
import React from "react";
import "../Persona/Eliminar.css";

function EliminarObjetoTelefono({ telefono, onEliminar, onClose }) {
  if (!telefono) return null;

  return (
    <div className="modal-overlay">
      <div className="eliminar-container">
        <h3 className="eliminar-title">Eliminar Teléfono</h3>
        <div className="eliminar-body">
          <p><strong>País:</strong> {telefono.pais}</p>
          <p><strong>Código Área:</strong> {telefono.cArea}</p>
          <p><strong>Número:</strong> {telefono.numero}</p>
        </div>
        <div className="eliminar-buttons">
          <button className="btn-cancelar" onClick={onClose}>Cancelar</button>
          <button 
            className="btn-eliminar" 
            onClick={() => {
              try {
                onEliminar({ ...telefono, eliminado: true });
              } catch (err) {
                console.error("❌ Error al marcar teléfono como eliminado:", err);
              } finally {
                onClose();
              }
            }}
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
}

export default EliminarObjetoTelefono;