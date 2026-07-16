// proyecto/frontEnd/src/pages/Admin/modules/Documentacion/EliminarObjeto.jsx

import React from "react";
import "./Eliminar.css";

function EliminarObjetoDocumentacion({ documentacion, onClose, onEliminar }) {
  const handleEliminar = () => {
    try {
      if (onEliminar) {
        onEliminar({...documentacion, eliminado: true });
      }
      if (onClose) onClose();
    } catch (err) {
      console.error("❌ Error al marcar documentación como eliminada:", err.message);
      if (onClose) onClose();
    }
  };

  if (!documentacion) return null;

  const formatearFecha = (fecha) => {
    if (!fecha) return '-';
    return new Date(fecha).toLocaleDateString('es-AR');
  };

  return (
    <div className="documentacion-eliminar-overlay">
      <div className="documentacion-eliminar-container">
        <h3 className="documentacion-eliminar-title">Eliminar Documentación</h3>
        <div className="documentacion-eliminar-body">
          <div className="documentacion-eliminar-card">
            {/* En objetos temporales no siempre hay ID persistente */}
            {documentacion.id && <p><strong>ID:</strong> {documentacion.id}</p>}
            <p><strong>Documento:</strong> {documentacion.documento}</p>
            <p><strong>Descripción:</strong> {documentacion.descripcion || '-'}</p>
            <p><strong>Inquilino ID:</strong> {documentacion.inquilino || '-'}</p>
            {documentacion.emision && (
              <p><strong>Fecha de Emisión:</strong> {formatearFecha(documentacion.emision)}</p>
            )}
            {documentacion.vencimiento && (
              <p><strong>Fecha de Vencimiento:</strong> {formatearFecha(documentacion.vencimiento)}</p>
            )}
            {documentacion.fechaPresentacion && (
              <p><strong>Fecha de Presentación:</strong> {formatearFecha(documentacion.fechaPresentacion)}</p>
            )}
          </div>
        </div>

        <div className="documentacion-eliminar-buttons">
          <button 
            className="documentacion-eliminar-btn-cancelar" 
            onClick={onClose}
          >
            Cancelar
          </button>
          <button 
            className="documentacion-eliminar-btn-eliminar" 
            onClick={handleEliminar}
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
}

export default EliminarObjetoDocumentacion;