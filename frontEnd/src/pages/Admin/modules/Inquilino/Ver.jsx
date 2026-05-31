// proyecto/frontEnd/src/pages/Admin/modules/Inquilino/Ver.jsx

import React, { useState, useEffect } from "react";
import "./Ver.css";
import { useUserStore } from "../../../../stores/userStore";
import { registrarMovimiento } from "../../../../api/logMovimiento";
import { getInquilinoLabel } from "../../../../utils/labels/inquilino";
import { formatDate } from "../../../../utils/dateFormat"; 
import PersonaVer from "../Persona/Ver";
import { obtenerPersonaPorId } from "../../../../api/persona";

function Ver({ inquilino, onClose }) {
  const [showPersonaVer, setShowPersonaVer] = useState(false);
  const [personaCompleta, setPersonaCompleta] = useState(null);
  const usuario = useUserStore((state) => state.user);

  useEffect(() => {
    async function registrarConsulta() {
      if (!inquilino?.id || !usuario?.id) return;

      try {
        await registrarMovimiento({
          usuario: usuario.id,
          accion: "consulta",
          entidad: "inquilino",
          campo: "Todos",
          previo: null,
          nuevo: null,
          detalle: `consultó los datos del inquilino ${getInquilinoLabel(inquilino)} con id ${inquilino.id}`
        });
      } catch (err) {
        console.error("❌ Error al registrar consulta:", err.message);
      }
    }

    if (inquilino?.id) {
      registrarConsulta();
    }
  }, [inquilino, usuario]);

  const handleVerPersona = async () => {
    try {
      const personaId = inquilino.persona?.id || inquilino.persona;
      const persona = await obtenerPersonaPorId(personaId);
      setPersonaCompleta(persona);
      setShowPersonaVer(true);
    } catch (err) {
      console.error("❌ Error al obtener persona completa:", err.message);
    }
  };

  if (!inquilino) return null;

  return (
    <div className="inquilino-ver-overlay">
      <div className="inquilino-ver-container">
        <h3 className="inquilino-ver-title">Ver Inquilino</h3>

        <div className="inquilino-ver-body">
          <div className="inquilino-ver-card">
            <p><strong>ID:</strong> {inquilino.id}</p>
            <p><strong>Fecha de Alta:</strong> {formatDate(inquilino.alta)}</p>
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
                  <td>{getInquilinoLabel(inquilino)}</td>
                  <td className="inquilino-ver-acciones">
                    <button
                      className="inquilino-ver-btn-ver"
                      title="Ver Persona"
                      onClick={handleVerPersona}
                    >
                      👁️
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="inquilino-ver-buttons">
          <button
            className="inquilino-ver-btn-cerrar"
            onClick={onClose}
          >
            Cerrar
          </button>
        </div>
      </div>

      {showPersonaVer && personaCompleta && (
        <PersonaVer
          persona={personaCompleta} // 👈 objeto completo desde la API
          onClose={() => setShowPersonaVer(false)}
        />
      )}
    </div>
  );
}

export default Ver;