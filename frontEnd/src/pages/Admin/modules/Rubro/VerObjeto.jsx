// proyecto/frontEnd/src/pages/Admin/modules/Rubro/VerObjeto.jsx

import React from "react";
import "./Ver.css"; // Reutiliza el mismo CSS de Ver

function VerObjeto({ rubro, onClose }) {
  if (!rubro) return null;

  return (
    <div className="rubro-ver-objeto-overlay">
      <div className="rubro-ver-objeto-container">
        <h3 className="rubro-ver-objeto-title">Ver Rubro {rubro.nuevo && "(Nuevo)"}</h3>

        {/* Contenedor interno con scroll */}
        <div className="rubro-ver-objeto-body">
          <div className="rubro-ver-objeto-card">
            <p><strong>ID:</strong> {rubro.id || "Pendiente de guardar"}</p>
            <p><strong>Rubro:</strong> {rubro.rubro || rubro.nombre}</p>
            <p><strong>Descripción:</strong> {rubro.descripcion || "Sin descripción"}</p>
          </div>
        </div>

        <div className="rubro-ver-objeto-form-buttons">
          <button 
            className="rubro-ver-objeto-btn-aceptar" 
            onClick={onClose}
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}

export default VerObjeto;