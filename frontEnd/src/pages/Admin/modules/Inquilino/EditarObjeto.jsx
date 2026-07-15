// proyecto/frontEnd/src/pages/Admin/modules/Inquilino/EditarObjeto.jsx 👁️ ✏️ 🗑️

import React, { useState, useEffect } from "react";
import "./Editar.css";
import { getInquilinoLabel } from "../../../../utils/labels/inquilino";
import { getPersonaLabel } from "../../../../utils/labels/persona";
import { obtenerPersonaPorId } from "../../../../api/persona";
import PersonaVerObjeto from "../Persona/VerObjeto";
import EditarObjetoPersona from "../Persona/EditarObjeto";
import PersonaEliminarObjeto from "../Persona/EliminarObjeto";

function EditarObjetoInquilino({ inquilino, onClose, onGuardar }) {
  const [formData, setFormData] = useState({
    id: inquilino?.id || null,
    alta: inquilino?.alta || "",
    persona: inquilino?.persona?.id || inquilino?.persona || null,
    nombre: inquilino?.nombre || inquilino?.persona?.nombre || "",
    apellido: inquilino?.apellido || inquilino?.persona?.apellido || "",
    documento: inquilino?.documento || inquilino?.persona?.documento || "",
    editado: inquilino?.editado || false,
    nuevo: inquilino?.nuevo || false,
    eliminado: inquilino?.eliminado || false
  });

  const [personaCompleta, setPersonaCompleta] = useState(null);
  const [loadingPersona, setLoadingPersona] = useState(false);

  // Modales
  const [showPersonaVer, setShowPersonaVer] = useState(false);
  const [showPersonaEditar, setShowPersonaEditar] = useState(false);
  const [showPersonaEliminar, setShowPersonaEliminar] = useState(false);

  const [loading, setLoading] = useState(false);

  // Cargar persona completa si solo tenemos ID
  useEffect(() => {
    async function cargarPersona() {
      // Si ya tenemos el objeto completo, usarlo
      if (inquilino?.persona && typeof inquilino.persona === 'object' && inquilino.persona.nombre) {
        setPersonaCompleta(inquilino.persona);
        return;
      }
      
      // Si solo tenemos ID, fetchearlo
      const personaId = inquilino?.persona?.id || inquilino?.persona;
      if (personaId && typeof personaId === 'number') {
        setLoadingPersona(true);
        try {
          const persona = await obtenerPersonaPorId(personaId);
          setPersonaCompleta(persona);
          // Actualizar formData con los datos de persona
          setFormData(prev => ({
           ...prev,
            nombre: persona.nombre || "",
            apellido: persona.apellido || "",
            documento: persona.documento || ""
          }));
        } catch (err) {
          console.error("❌ Error cargando persona:", err.message);
        } finally {
          setLoadingPersona(false);
        }
      }
    }

    if (inquilino) {
      cargarPersona();
    }
  }, [inquilino]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({...formData, [name]: value });
  };

  const handleEditarPersona = () => {
    if (!personaCompleta) return;
    setShowPersonaEditar(true);
  };

  const handleGuardar = () => {
    if (loading) return;
    setLoading(true);
    try {
      const inquilinoEditado = {
      ...formData,
        persona: personaCompleta, // objeto persona completo temporal
        editado: true
      };
      console.log("✅ Inquilino editado desde EditarObjetoInquilino:", inquilinoEditado);
      onGuardar?.(inquilinoEditado);
      onClose();
    } catch (error) {
      console.error("❌ Error al editar inquilino temporal:", error);
      onClose();
    } finally {
      setLoading(false);
    }
  };

  if (!inquilino) return null;

  return (
    <div className="inquilino-editar-overlay">
      <div className="inquilino-editar-container">
        <h3 className="inquilino-editar-title">
          Editar Inquilino {formData.nuevo && "(Nuevo)"}
        </h3>

        <div className="inquilino-editar-scroll">
          <div className="inquilino-editar-body">
            <div className="inquilino-editar-card">
              <p><strong>ID:</strong> {formData.id || "Pendiente de guardar"}</p>
              <label>
                <strong>Fecha de Alta:</strong>
                <input
                  type="date"
                  name="alta"
                  value={
                    formData.alta
                    ? new Date(formData.alta).toISOString().split("T")[0]
                      : ""
                  }
                  onChange={handleChange}
                />
              </label>
            </div>

            <div className="inquilino-editar-relacion-section">
              <div className="inquilino-editar-relacion-header">
                <h4 className="inquilino-editar-relacion-title">Datos Personales</h4>
              </div>
              <table className="inquilino-editar-persona-tabla">
                <thead>
                  <tr>
                    <th>Persona</th>
                    <th className="inquilino-editar-col-acciones">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      {loadingPersona 
                       ? "Cargando..." 
                        : personaCompleta 
                         ? getPersonaLabel(personaCompleta)
                          : getInquilinoLabel(formData)
                      }
                      {personaCompleta?.editado && " (editado)"}
                    </td>
                    <td className="inquilino-editar-acciones">
                      <button
                        className="inquilino-editar-btn-ver"
                        title="Ver Persona"
                        onClick={() => setShowPersonaVer(true)}
                        disabled={!personaCompleta || loadingPersona}
                      >
                        👁️
                      </button>
                      <button
                        className="inquilino-editar-btn-editar"
                        title="Editar Persona"
                        onClick={handleEditarPersona}
                        disabled={!personaCompleta || loadingPersona}
                      >
                        ✏️
                      </button>
                      <button
                        className="inquilino-editar-btn-eliminar"
                        title="Eliminar Persona"
                        onClick={() => setShowPersonaEliminar(true)}
                        disabled={!personaCompleta || loadingPersona}
                      >
                        🗑️
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="inquilino-editar-form-buttons">
          <button 
            className="inquilino-editar-btn-cancelar" 
            onClick={onClose}
          >
            Cancelar
          </button>
          <button 
            className="inquilino-editar-btn-guardar" 
            onClick={handleGuardar} 
            disabled={loading || loadingPersona}
          >
            {loading? "Guardando..." : "Guardar"}
          </button>
        </div>
      </div>

      {/* Modales de ver */}
      {showPersonaVer && personaCompleta && (
        <PersonaVerObjeto
          persona={personaCompleta}
          onClose={() => setShowPersonaVer(false)}
        />
      )}

      {/* Modales de editar */}
      {showPersonaEditar && personaCompleta && (
        <EditarObjetoPersona
          persona={personaCompleta}
          onClose={() => setShowPersonaEditar(false)}
          onGuardar={(personaEditada) => {
            setPersonaCompleta({...personaEditada, editado: true });
            setFormData({
            ...formData,
              persona: personaEditada.id,
              nombre: personaEditada.nombre,
              apellido: personaEditada.apellido,
              documento: personaEditada.documento
            });
            setShowPersonaEditar(false);
          }}
        />
      )}

      {/* Modales de eliminar */}
      {showPersonaEliminar && personaCompleta && (
        <PersonaEliminarObjeto
          persona={personaCompleta}
          onClose={() => setShowPersonaEliminar(false)}
          onEliminar={() => {
            setPersonaCompleta({...personaCompleta, eliminado: true });
            setFormData({
            ...formData,
              persona: null,
              nombre: "",
              apellido: "",
              documento: ""
            });
            setShowPersonaEliminar(false);
          }}
        />
      )}
    </div>
  );
}

export default EditarObjetoInquilino;