// proyecto/frontEnd/src/pages/Admin/modules/Rubro/EliminarObjeto.jsx

import React from "react";
import "./Eliminar.css"; // Reutiliza el mismo CSS de Eliminar

function EliminarObjeto({ rubro, onClose, onEliminar }) {
  const handleEliminar = () => {
    try {
      // Marca el objeto como eliminado y se lo devuelve al padre
      if (onEliminar) {
        onEliminar({...rubro, eliminado: true });
      }
      if (onClose) onClose();
    } catch (err) {
      console.error("❌ Error al marcar rubro como eliminado:", err.message);
      if (onClose) onClose();
    }
  };

  if (!rubro) return null;

  return (
    <div className="rubro-eliminar-overlay">
      <div className="rubro-eliminar-container">
        <h3 className="rubro-eliminar-title">
          Eliminar Rubro {rubro.nuevo && "(Nuevo)"}
        </h3>
        
        <div className="rubro-eliminar-body">
          <div className="rubro-eliminar-card">
            {/* En objetos temporales no siempre hay ID persistente */}
            {rubro.id && <p><strong>ID:</strong> {rubro.id}</p>}
            <p><strong>Rubro:</strong> {rubro.rubro || rubro.nombre}</p>
            <p><strong>Descripción:</strong> {rubro.descripcion || "Sin descripción"}</p>
          </div>
        </div>

        <div className="rubro-eliminar-buttons">
          <button 
            className="rubro-eliminar-btn-cancelar" 
            onClick={onClose}
          >
            Cancelar
          </button>
          <button 
            className="rubro-eliminar-btn-eliminar" 
            onClick={handleEliminar}
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
}

export default EliminarObjeto;