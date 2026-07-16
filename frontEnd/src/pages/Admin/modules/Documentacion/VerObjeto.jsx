// proyecto/frontEnd/src/pages/Admin/modules/Documentacion/VerObjeto.jsx

import React from "react";
import "./Ver.css";

function VerObjetoDocumentacion({ documentacion, onClose }) {
  if (!documentacion) return null;

  const formatearFecha = (fecha) => {
    if (!fecha) return "-";
    return new Date(fecha).toLocaleDateString("es-AR");
  };

  return (
    <div className="documentacion-ver-objeto-overlay">
      <div className="documentacion-ver-objeto-container">
        <h3 className="documentacion-ver-objeto-title">Ver Documentación</h3>

        {/* Contenedor interno con scroll */}
        <div className="documentacion-ver-objeto-body">
          <div className="documentacion-ver-objeto-card">
            {/* Como es temporal, no mostramos ID persistente */}
            <p>
              <strong>Documento:</strong>
              {documentacion.documento ? (
                <a
                  href={`/uploads/${documentacion.documento}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="documentacion-file-link"
                >
                  Ver archivo
                </a>
              ) : (
                " -"
              )}
            </p>
            <p>
              <strong>Descripción:</strong> {documentacion.descripcion || "-"}
            </p>
            <p>
              <strong>Inquilino ID:</strong> {documentacion.inquilino || "-"}
            </p>
            <p>
              <strong>Fecha de Emisión:</strong>{" "}
              {formatearFecha(documentacion.emision)}
            </p>
            <p>
              <strong>Fecha de Vencimiento:</strong>{" "}
              {formatearFecha(documentacion.vencimiento)}
            </p>
            <p>
              <strong>Fecha de Presentación:</strong>{" "}
              {formatearFecha(documentacion.fechaPresentacion)}
            </p>
          </div>
        </div>

        <div className="documentacion-ver-objeto-form-buttons">
          <button
            className="documentacion-ver-objeto-btn-aceptar"
            onClick={onClose}
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}

export default VerObjetoDocumentacion;
