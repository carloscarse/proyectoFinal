// proyecto/frontEnd/src/pages/Admin/modules/Telefono/AgregarObjeto.jsx
import React, { useState, useEffect } from "react";
import "./Agregar.css"; // ahora importa su propio CSS
import { obtenerPersonaPorId } from "../../../../api/persona";

let nextTelefonoId = 0; // contador incremental temporal

function TelefonoAgregarObjeto({ onClose, onGuardar }) {
  const [personaEstado, setPersonaEstado] = useState(null); // null | 'valida' | 'invalida'
  const [personaNombre, setPersonaNombre] = useState("");

  const [formData, setFormData] = useState({
    persona: "",
    pais: "",
    cArea: "",
    numero: ""
  });

  useEffect(() => {
    const id = formData.persona;
    if (!id) {
      setPersonaEstado(null);
      setPersonaNombre("");
      return;
    }
    const timer = setTimeout(async () => {
      try {
        const persona = await obtenerPersonaPorId(id);
        if (persona) {
          setPersonaEstado("valida");
          setPersonaNombre(persona.label || `${persona.nombre} ${persona.apellido}`);
        } else {
          setPersonaEstado("invalida");
          setPersonaNombre("");
        }
      } catch {
        setPersonaEstado("invalida");
        setPersonaNombre("");
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [formData.persona]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleGuardar = () => {
    const nuevoTelefono = {
      ...formData,
      id: nextTelefonoId++, // id temporal incremental
      nuevo: true,
      editado: false,
      eliminado: false
    };
    onGuardar(nuevoTelefono);
    onClose();
  };

  return (
    <div className="telefono-agregar-objeto-overlay">
      <div className="telefono-agregar-objeto-container">
        <h3 className="telefono-agregar-objeto-title">Nuevo Teléfono</h3>
        <div className="telefono-agregar-objeto-body">
          <label>Persona:
            <input type="number" name="persona" value={formData.persona} onChange={handleChange} placeholder="ID de persona" />
            {personaEstado === "valida" && (
              <span style={{ color: "green", fontSize: "0.85em" }}>✔ {personaNombre}</span>
            )}
            {personaEstado === "invalida" && (
              <span style={{ color: "red", fontSize: "0.85em" }}>✘ Esa persona no existe</span>
            )}
          </label>
          <label>País:
            <input type="number" name="pais" value={formData.pais} onChange={handleChange} placeholder="Ej: 54 (Argentina)" />
          </label>
          <label>Código Área:
            <input type="number" name="cArea" value={formData.cArea} onChange={handleChange} placeholder="Ej: 381" />
          </label>
          <label>Número:
            <input type="number" name="numero" value={formData.numero} onChange={handleChange} placeholder="Ej: 1234567" />
          </label>
        </div>
        <div className="telefono-agregar-objeto-form-buttons">
          <button 
            className="telefono-agregar-objeto-btn-guardar" 
            onClick={handleGuardar}
            disabled={personaEstado !== "valida"}
          >
            Guardar
          </button>
          <button 
            className="telefono-agregar-objeto-btn-cancelar" 
            onClick={onClose}
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}

export default TelefonoAgregarObjeto;