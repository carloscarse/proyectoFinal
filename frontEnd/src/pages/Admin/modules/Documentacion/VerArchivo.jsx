// proyecto/frontEnd/src/pages/Admin/modules/Documentacion/VerArchivo.jsx

import React from "react";
import "./VerArchivo.css";

function VerArchivo({ archivo, onClose }) {
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";
  const fileUrl = `${API_URL}/uploads/${archivo}`;
  const extension = archivo?.split('.').pop()?.toLowerCase();

  const esImagen = ['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(extension);
  const esPdf = extension === 'pdf';

  return (
    <div className="ver-archivo-overlay">
      <div className="ver-archivo-container">
        <div className="ver-archivo-header">
          <h3>{archivo}</h3>
          <button className="ver-archivo-btn-cerrar" onClick={onClose}>
            ✕ Volver
          </button>
        </div>
        
        <div className="ver-archivo-body">
          {esImagen && (
            <img 
              src={fileUrl} 
              alt={archivo}
              className="ver-archivo-img"
            />
          )}
          
          {esPdf && (
            <iframe 
              src={fileUrl}
              className="ver-archivo-pdf"
              title={archivo}
            />
          )}
          
          {!esImagen && !esPdf && (
            <div className="ver-archivo-unsupported">
              <p>Vista previa no disponible para este tipo de archivo.</p>
              <a 
                href={fileUrl} 
                download={archivo}
                className="ver-archivo-btn-descargar"
              >
                ⬇ Descargar archivo
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default VerArchivo;