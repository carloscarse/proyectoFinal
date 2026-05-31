// proyecto/frontEnd/src/pages/Admin/modules/Inquilino/Eliminar.jsx

import React, { useEffect, useState } from "react";
import "./Eliminar.css";
import { eliminarInquilino } from "../../../../api/inquilino.js";
import { registrarMovimiento } from "../../../../api/logMovimiento.js";
import { useUserStore } from "../../../../stores/userStore.js";
import { getInquilinoLabel } from "../../../../utils/labels/inquilino";
import { formatDate } from "../../../../utils/dateFormat";
import PersonaVerObjeto from "../Persona/Ver"; // 👈 usamos VerObjeto
import { obtenerPersonaPorId } from "../../../../api/persona.js";

function Eliminar({ inquilino, onClose, onEliminar }) {
  const usuario = useUserStore((state) => state.user);
  const [loading, setLoading] = useState(false);
  const [registrado, setRegistrado] = useState(false);
  const [showPersonaVer, setShowPersonaVer] = useState(false);
  const [personaCompleta, setPersonaCompleta] = useState(null);

  useEffect(() => {
    async function registrarInicio() {
      if (!inquilino?.id || !usuario?.id) return;
      try {
        await registrarMovimiento({
          usuario: usuario.id,
          accion: "inicio-eliminacion",
          entidad: "inquilino",
          campo: "Todos",
          previo: null,
          nuevo: null,
          detalle: `inició el proceso de eliminación del inquilino ${getInquilinoLabel(inquilino)} con id ${inquilino.id}`
        });
      } catch (err) {
        console.error("❌ Error al registrar inicio de eliminación:", err.message);
      }
    }

    if (inquilino?.id && !registrado) {
      registrarInicio();
      setRegistrado(true);
    }
  }, [inquilino, usuario, registrado]);

  const handleEliminar = async () => {
    if (loading || !inquilino?.id) return;
    setLoading(true);
    try {
      await eliminarInquilino(inquilino.id);

      await registrarMovimiento({
        usuario: usuario?.id || "sistema",
        accion: "baja",
        entidad: "inquilino",
        campo: "Todos",
        previo: `persona: ${getInquilinoLabel(inquilino)}, alta: ${inquilino.alta}`,
        nuevo: null,
        detalle: `eliminó el inquilino ${getInquilinoLabel(inquilino)} con id ${inquilino.id}`
      });

      if (onEliminar) onEliminar();
      if (onClose) onClose();
    } catch (err) {
      console.error("❌ Error al eliminar inquilino:", err.message);
      onClose();
    } finally {
      setLoading(false);
    }
  };

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
    <div className="inquilino-eliminar-overlay">
      <div className="inquilino-eliminar-container">
        <h3 className="inquilino-eliminar-title">Eliminar Inquilino</h3>
        <div className="inquilino-eliminar-body">
          <div className="inquilino-eliminar-card">
            <p><strong>ID:</strong> {inquilino.id}</p>
            <p><strong>Fecha de Alta:</strong> {formatDate(inquilino.alta)}</p>
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
                  <td>{getInquilinoLabel(inquilino)}</td>
                  <td className="inquilino-eliminar-acciones">
                    <button
                      className="inquilino-eliminar-btn-ver"
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
            disabled={loading}
          >
            {loading ? "Eliminando..." : "Eliminar"}
          </button>
        </div>
      </div>

      {showPersonaVer && personaCompleta && (
        <PersonaVerObjeto
          persona={personaCompleta}
          onClose={() => setShowPersonaVer(false)}
        />
      )}
    </div>
  );
}

export default Eliminar;