// proyecto/frontEnd/src/pages/Admin/modules/Inquilino/VerObjeto.jsx

import React, { useState } from "react";
import "./Ver.css";
import { getInquilinoLabel } from "../../../../utils/labels/inquilino";
import { formatDate } from "../../../../utils/dateFormat";
import PersonaVerObjeto from "../Persona/VerObjeto";

function VerObjetoInquilino({ inquilino, onClose }) {
  const [showPersonaVer, setShowPersonaVer] = useState(false);

  if (!inquilino) return null;

  return (
    <div className="inquilino-ver-objeto-overlay">
      <div className="inquilino-ver-objeto-container">
        <h3 className="inquilino-ver-objeto-title">
          Ver Inquilino {inquilino.nuevo && "(Nuevo)"}
        </h3>

        {/* Contenedor interno con scroll */}
        <div className="inquilino-ver-objeto-body">
          <div className="inquilino-ver-objeto-card">
            {/* En objetos temporales no siempre hay ID persistente */}
            {inquilino.id && <p><strong>ID:</strong> {inquilino.id}</p>}
            <p><strong>Fecha de Alta:</strong> {formatDate(inquilino.alta) || "Sin fecha"}</p>
          </div>

          <div className="inquilino-ver-relacion-section">
            <h4 className="inquilino-ver-relacion-title">Datos Personales</h4>
            <table className="inquilino-ver-persona-tabla">
              <thead>
                <tr>
                  <th>Persona</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    {getInquilinoLabel(inquilino)}
                    {inquilino.persona?.nuevo && " (nuevo)"}
                    {inquilino.persona?.editado && " (editado)"}
                  </td>
                  <td className="inquilino-ver-acciones">
                    <button
                      className="inquilino-ver-btn-ver"
                      title="Ver Persona"
                      onClick={() => setShowPersonaVer(true)}
                      disabled={!inquilino.persona}
                    >
                      👁️
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="inquilino-ver-objeto-form-buttons">
          <button 
            className="inquilino-ver-objeto-btn-aceptar" 
            onClick={onClose}
          >
            Cerrar
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

export default VerObjetoInquilino;