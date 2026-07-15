// proyecto/frontEnd/src/pages/Admin/modules/Inquilino/EliminarObjeto.jsx

import React, { useState } from "react";
import "./Eliminar.css";
import { getInquilinoLabel } from "../../../../utils/labels/inquilino";
import { getPersonaLabel } from "../../../../utils/labels/persona";
import { formatDate } from "../../../../utils/dateFormat";
import PersonaVerObjeto from "../Persona/VerObjeto";

function EliminarObjeto({ inquilino, onClose, onEliminar }) {
  const [showPersonaVer, setShowPersonaVer] = useState(false);

  const handleEliminar = () => {
    try {
      // Marca el objeto como eliminado y se lo devuelve al padre
      if (onEliminar) {
        onEliminar({ ...inquilino, eliminado: true });
      }
      if (onClose) onClose();
    } catch (err) {
      console.error("❌ Error al marcar inquilino como eliminado:", err.message);
      if (onClose) onClose();
    }
  };

  if (!inquilino) return null;

  return (
    <div className="inquilino-eliminar-overlay">
      <div className="inquilino-eliminar-container">
        <h3 className="inquilino-eliminar-title">
          Eliminar Inquilino {inquilino.nuevo && "(Nuevo)"}
        </h3>
        
        <div className="inquilino-eliminar-body">
          <div className="inquilino-eliminar-card">
            {/* En objetos temporales no siempre hay ID persistente */}
            {inquilino.id && <p><strong>ID:</strong> {inquilino.id}</p>}
            <p><strong>Fecha de Alta:</strong> {formatDate(inquilino.alta) || "Sin fecha"}</p>
          </div>

          <div className="inquilino-eliminar-relacion-section">
            <h4 className="inquilino-eliminar-relacion-title">Datos Personales</h4>
            <table className="inquilino-eliminar-persona-tabla">
              <thead>
                <tr>
                  <th>Persona</th>
                  <th className="inquilino-eliminar-col-acciones">Acciones</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    {inquilino.persona 
                      ? getPersonaLabel(inquilino.persona)
                      : getInquilinoLabel(inquilino)
                    }
                    {inquilino.persona?.editado && " (editado)"}
                    {inquilino.persona?.nuevo && " (nuevo)"}
                  </td>
                  <td className="inquilino-eliminar-acciones">
                    <button
                      className="inquilino-eliminar-btn-ver"
                      title="Ver Persona"
                      onClick={() => setShowPersonaVer(true)}
                      disabled={!inquilino.persona}
                    >
                      👁
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="inquilino-eliminar-buttons">
          <button 
            className="inquilino-eliminar-btn-cancelar" 
            onClick={onClose}
          >
            Cancelar
          </button>
          <button 
            className="inquilino-eliminar-btn-eliminar" 
            onClick={handleEliminar}
          >
            Eliminar
          </button>
        </div>
      </div>

      {/* Modal de ver persona */}
      {showPersonaVer && inquilino.persona && (
        <PersonaVerObjeto
          persona={inquilino.persona}
          onClose={() => setShowPersonaVer(false)}
        />
      )}
    </div>
  );
}

export default EliminarObjeto;