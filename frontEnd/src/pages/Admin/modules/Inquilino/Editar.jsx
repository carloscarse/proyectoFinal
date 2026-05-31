// proyecto/frontEnd/src/pages/Admin/modules/Inquilino/Editar.jsx

import React, { useState, useEffect } from "react";
import "./Editar.css";
import { registrarMovimiento } from "../../../../api/logMovimiento.js";
import { obtenerPersonaPorId } from "../../../../api/persona.js";
import { obtenerDireccionPorPersona } from "../../../../api/direccion.js";
import { obtenerTelefonoPorPersona } from "../../../../api/telefono.js";
import { useUserStore } from "../../../../stores/userStore.js";
import { getInquilinoLabel } from "../../../../utils/labels/inquilino";
import PersonaVerObjeto from "../Persona/Ver"; // 👈 usamos VerObjeto
import EditarObjetoPersona from "../Persona/EditarObjeto";
import PersonaEliminarObjeto from "../Persona/EliminarObjeto";
import { commitEditar } from "./commitEditar";

function Editar({ inquilinoInicial, onClose, onSave }) {
  const usuario = useUserStore((state) => state.user);
  const [inquilino, setInquilino] = useState(inquilinoInicial || {});
  const [loading, setLoading] = useState(false);

  const [showPersonaVer, setShowPersonaVer] = useState(false);
  const [showPersonaEditar, setShowPersonaEditar] = useState(false);
  const [showPersonaEliminar, setShowPersonaEliminar] = useState(false);

  const [personaCompleta, setPersonaCompleta] = useState(null);

  useEffect(() => {
    setInquilino(inquilinoInicial || {});
  }, [inquilinoInicial]);

  const handleGuardar = async () => {
    if (!inquilino?.id) return;
    setLoading(true);
    try {
      console.log("🔎 personaCompleta antes de commitEditar:", personaCompleta);

      await commitEditar(
        {
          ...inquilino,
          persona: inquilino.persona,
          personaEditada: personaCompleta
        },
        inquilino.id,
        onSave
      );

      registrarMovimiento({
        usuario: usuario?.id || "sistema",
        accion: "actualizacion",
        entidad: "inquilino",
        campo: "Todos",
        previo: null,
        nuevo: `inquilino actualizado con id ${inquilino.id}`,
        detalle: `actualizó datos del inquilino ${getInquilinoLabel(inquilino)}`
      });

      onClose();
    } catch (err) {
      console.error("❌ Error al actualizar inquilino:", err.message);
      onClose();
    } finally {
      setLoading(false);
    }
  };

  const handleEditarPersona = async () => {
    if (!inquilino.persona) return;
    try {
      const personaId = inquilino.persona?.id || inquilino.persona;
      const persona = await obtenerPersonaPorId(personaId);
      const direcciones = await obtenerDireccionPorPersona(personaId);
      const telefonos = await obtenerTelefonoPorPersona(personaId);

      setPersonaCompleta({
        ...persona,
        direcciones: direcciones || [],
        telefonos: telefonos || []
      });

      setShowPersonaEditar(true);
    } catch (err) {
      console.error("❌ Error al obtener persona completa:", err.message);
    }
  };

  if (!inquilino) return null;

  return (
    <div className="inquilino-editar-overlay">
      <div className="inquilino-editar-container">
        <h3 className="inquilino-editar-title">Editar Inquilino</h3>

        <div className="inquilino-editar-body">
          <div className="inquilino-editar-card">
            <p><strong>ID:</strong> {inquilino.id}</p>
            <p>
              <strong>Fecha de Alta:</strong>{" "}
              <input
                type="date"
                value={
                  inquilino.alta
                    ? new Date(inquilino.alta).toISOString().split("T")[0]
                    : ""
                }
                onChange={(e) => setInquilino({ ...inquilino, alta: e.target.value })}
              />
            </p>
          </div>

          <div className="inquilino-editar-relacion-section">
            <h4 className="inquilino-editar-relacion-title">Datos Personales</h4>
            <table className="inquilino-editar-persona-tabla">
              <thead>
                <tr>
                  <th>Persona</th>
                  <th className="inquilino-editar-col-acciones">Acciones</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{getInquilinoLabel(inquilino)}</td>
                  <td className="inquilino-editar-acciones">
                    <button
                      className="inquilino-editar-btn-ver"
                      title="Ver Persona"
                      onClick={() => setShowPersonaVer(true)}
                    >
                      👁️
                    </button>
                    <button
                      className="inquilino-editar-btn-editar"
                      title="Editar Persona"
                      onClick={handleEditarPersona}
                    >
                      ✏️
                    </button>
                    <button
                      className="inquilino-editar-btn-eliminar"
                      title="Eliminar Persona"
                      onClick={() => setShowPersonaEliminar(true)}
                    >
                      🗑️
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="inquilino-editar-buttons">
          <button
            className="inquilino-editar-btn-cancelar"
            onClick={onClose}
          >
            Cancelar
          </button>
          <button
            className="inquilino-editar-btn-guardar"
            onClick={handleGuardar}
            disabled={loading}
          >
            {loading ? "Guardando..." : "Guardar"}
          </button>
        </div>
      </div>

      {showPersonaVer && personaCompleta && (
        <PersonaVerObjeto
          persona={personaCompleta}
          onClose={() => setShowPersonaVer(false)}
        />
      )}
      {showPersonaEditar && personaCompleta && (
        <EditarObjetoPersona
          persona={personaCompleta}
          onClose={() => setShowPersonaEditar(false)}
          onGuardar={(personaEditada) => {
            setInquilino({
              ...inquilino,
              persona: personaEditada.id,
              nombre: personaEditada.nombre,
              apellido: personaEditada.apellido,
              documento: personaEditada.documento
            });
            setPersonaCompleta(personaEditada);
          }}
        />
      )}
      {showPersonaEliminar && (
        <PersonaEliminarObjeto
          persona={{
            id: inquilino.persona?.id || inquilino.persona,
            nombre: inquilino.nombre,
            apellido: inquilino.apellido
          }}
          onClose={() => setShowPersonaEliminar(false)}
        />
      )}
    </div>
  );
}

export default Editar;