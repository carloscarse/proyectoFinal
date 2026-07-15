// proyecto/frontEnd/src/pages/Admin/modules/Inquilino/AgregarObjeto.jsx

import React, { useState } from "react";
import "./Agregar.css";
import PersonaAgregarObjeto from "../Persona/AgregarObjeto";
import VerObjetoPersona from "../Persona/VerObjeto";
import EditarObjetoPersona from "../Persona/EditarObjeto";
import EliminarObjetoPersona from "../Persona/EliminarObjeto";

function InquilinoAgregarObjeto({ onClose, onGuardar }) {
  const today = new Date().toISOString().split("T")[0];

  const [formData, setFormData] = useState({
    alta: today,
    estado: "activo"
  });

  const [personaTemp, setPersonaTemp] = useState(null);
  const [showPersonaModal, setShowPersonaModal] = useState(false);
  const [personaVer, setPersonaVer] = useState(null);
  const [personaEditar, setPersonaEditar] = useState(null);
  const [personaEliminar, setPersonaEliminar] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleGuardar = () => {
    // 👇 devolvemos un objeto temporal de inquilino normalizado
    const inquilinoTemp = {
      alta: formData.alta,
      estado: formData.estado,
      persona: {
        nombre: personaTemp?.nombre || "",
        segundoNombre: personaTemp?.segundoNombre || "",
        apellido: personaTemp?.apellido || "",
        segundoApellido: personaTemp?.segundoApellido || "",
        documento: personaTemp?.documento || "",
        nacimiento: personaTemp?.nacimiento || "",
        sexo: personaTemp?.sexo || "",
        direcciones: personaTemp?.direcciones || [],
        telefonos: personaTemp?.telefonos || [],
        nuevo: personaTemp?.nuevo || true,
        editado: personaTemp?.editado || false,
        eliminado: personaTemp?.eliminado || false
      },
      nuevo: true,
      editado: false,
      eliminado: false
    };

    console.log("🔎 Inquilino normalizado desde modal:", inquilinoTemp);

    if (onGuardar) onGuardar(inquilinoTemp);
    onClose();
  };

  return (
    <div className="inquilino-agregar-overlay">
      <div className="inquilino-agregar-container">
        <h3 className="inquilino-agregar-title">Nuevo Inquilino</h3>

        <div className="inquilino-agregar-body">
          {/* Botón para agregar persona */}
          {!personaTemp && (
            <button
              className="inquilino-agregar-btn-nueva"
              onClick={() => setShowPersonaModal(true)}
            >
              ➕ Datos Personales
            </button>
          )}

          {/* Mostrar persona temporal */}
          {personaTemp && (
            <div className="inquilino-agregar-relacion-section">
              <div className="inquilino-agregar-relacion-header">
                <h4 className="inquilino-agregar-relacion-title">Datos Personales</h4>
              </div>
              <table className="inquilino-agregar-direccion-tabla">
                <thead>
                  <tr>
                    <th>Persona</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{personaTemp.nombre} {personaTemp.apellido}</td>
                    <td className="inquilino-agregar-direccion-acciones">
                      <button onClick={() => setPersonaVer(personaTemp)} title="Ver">👁️</button>
                      <button onClick={() => setPersonaEditar(personaTemp)} title="Editar">✏️</button>
                      <button onClick={() => setPersonaEliminar(personaTemp)} title="Eliminar">🗑️</button>
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

          <label>Estado:
            <select
              name="estado"
              value={formData.estado}
              onChange={handleChange}
            >
              <option value="activo">Activo</option>
              <option value="inactivo">Inactivo</option>
            </select>
          </label>
        </div>

        <div className="inquilino-agregar-form-buttons">
          <button className="inquilino-agregar-btn-cancelar" onClick={onClose}>
            Cancelar
          </button>
          <button
            className="inquilino-agregar-btn-guardar"
            onClick={handleGuardar}
            disabled={!personaTemp}
          >
            Guardar
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
        <VerObjetoPersona persona={personaVer} onClose={() => setPersonaVer(null)} />
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

export default InquilinoAgregarObjeto;