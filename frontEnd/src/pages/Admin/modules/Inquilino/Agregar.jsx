// proyecto/frontEnd/src/pages/Admin/modules/Inquilino/Agregar.jsx

import React, { useState } from "react";
import "./Agregar.css";
import { useUserStore } from "../../../../stores/userStore";
import { commitInquilino } from "./commit";
import { registrarMovimiento } from "../../../../api/logMovimiento";
import { getInquilinoLabel } from "../../../../utils/labels/inquilino";
import PersonaAgregarObjeto from "../Persona/AgregarObjeto";
import VerObjetoPersona from "../Persona/VerObjeto";
import EditarObjetoPersona from "../Persona/EditarObjeto";
import EliminarObjetoPersona from "../Persona/EliminarObjeto";

function AgregarInquilino({ onClose, onGuardado }) {
  const today = new Date().toISOString().split("T")[0];

  const [formData, setFormData] = useState({
    alta: today
  });

  const [personaTemp, setPersonaTemp] = useState(null);
  const [showPersonaModal, setShowPersonaModal] = useState(false);
  const [personaVer, setPersonaVer] = useState(null);
  const [personaEditar, setPersonaEditar] = useState(null);
  const [personaEliminar, setPersonaEliminar] = useState(null);

  const [loading, setLoading] = useState(false);
  const usuario = useUserStore((state) => state.user);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleGuardar = async () => {
    if (loading) return;
    setLoading(true);
    try {
      // 👇 Pasamos las listas reales de direcciones y teléfonos
      const nuevoInquilino = await commitInquilino(
        formData,
        personaTemp,
        personaTemp?.direcciones || [],
        personaTemp?.telefonos || [],
        null,
        (i) => i
      );

      try {
        await registrarMovimiento({
          usuario: usuario.id,
          accion: "alta", // 👈 coincide con el ENUM
          entidad: "inquilino",
          campo: Object.keys(formData).join(", "),
          previo: null,
          nuevo: Object.values(formData).join(", "),
          detalle: `agregó un nuevo inquilino ${getInquilinoLabel(nuevoInquilino)} con id ${nuevoInquilino.id}`
        });
      } catch (err) {
        console.error("❌ Error registrando log de agregar inquilino:", err.message);
      }

      if (onGuardado) onGuardado(nuevoInquilino);
      onClose();
    } catch (error) {
      console.error("❌ Error al guardar inquilino:", error);
      onClose();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="persona-agregar-overlay">
      <div className="persona-agregar-container">
        <h3 className="persona-agregar-title">Nuevo Inquilino</h3>

        <div className="persona-agregar-body">
          {/* Botón para agregar persona si no existe */}
          {!personaTemp && (
            <button
              className="persona-agregar-btn-nueva"
              onClick={() => setShowPersonaModal(true)}
            >
              ➕ Datos Personales
            </button>
          )}

          {/* Mostrar persona temporal como tabla con acciones */}
          {personaTemp && (
            <div className="persona-agregar-relacion-section">
              <div className="persona-agregar-relacion-header">
                <h4 className="persona-agregar-relacion-title">Datos Personales</h4>
              </div>
              <table className="persona-agregar-direccion-tabla">
                <colgroup>
                  <col className="persona-agregar-direccion-col-dato" />
                  <col className="persona-agregar-direccion-col-acciones" />
                </colgroup>
                <thead>
                  <tr>
                    <th>Persona</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="persona-agregar-direccion-col-dato">
                      {personaTemp.nombre} {personaTemp.apellido}
                    </td>
                    <td className="persona-agregar-direccion-acciones">
                      <button
                        className="persona-agregar-direccion-btn-ver"
                        onClick={() => setPersonaVer(personaTemp)}
                        title="Ver"
                      >
                        👁️
                      </button>
                      <button
                        className="persona-agregar-direccion-btn-editar"
                        onClick={() => setPersonaEditar(personaTemp)}
                        title="Editar"
                      >
                        ✏️
                      </button>
                      <button
                        className="persona-agregar-direccion-btn-eliminar"
                        onClick={() => setPersonaEliminar(personaTemp)}
                        title="Eliminar"
                      >
                        🗑️
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}

          <label>Fecha de Alta:
            <input
              type="date"
              name="alta"
              value={formData.alta}
              onChange={handleChange}
            />
          </label>
        </div>

        <div className="persona-agregar-form-buttons">
          <button
            className="persona-agregar-btn-cancelar"
            onClick={onClose}
          >
            Cancelar
          </button>
          <button
            className="persona-agregar-btn-guardar"
            onClick={handleGuardar}
            disabled={loading || !personaTemp}
          >
            {loading ? "Guardando..." : "Guardar"}
          </button>
        </div>
      </div>

      {/* Modal de agregar persona */}
      {showPersonaModal && (
        <PersonaAgregarObjeto
          onClose={() => setShowPersonaModal(false)}
          onGuardar={(p) => setPersonaTemp(p)}
        />
      )}

      {/* Modales de ver/editar/eliminar persona temporal */}
      {personaVer && (
        <VerObjetoPersona
          persona={personaVer}
          onClose={() => setPersonaVer(null)}
        />
      )}
      {personaEditar && (
        <EditarObjetoPersona
          persona={personaEditar}
          onClose={() => setPersonaEditar(null)}
          onGuardar={(p) => setPersonaTemp(p)}
        />
      )}
      {personaEliminar && (
        <EliminarObjetoPersona
          persona={personaEliminar}
          onClose={() => setPersonaEliminar(null)}
          onEliminar={() => setPersonaTemp(null)}
        />
      )}
    </div>
  );
}

export default AgregarInquilino;