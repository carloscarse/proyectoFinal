// proyecto/frontEnd/src/pages/Admin/modules/Direccion/AgregarObjeto.jsx
import React, { useState, useEffect } from "react";
import "./Agregar.css";
import { obtenerPersonaPorId } from "../../../../api/persona";

let nextDireccionId = 0;

function DireccionAgregarObjeto({ onClose, onGuardar }) {
  const [personaEstado, setPersonaEstado] = useState(null); // null | 'valida' | 'invalida'
  const [personaNombre, setPersonaNombre] = useState("");

  const [formData, setFormData] = useState({
    persona: "",
    calle: "",
    numero: "",
    manzana: "",
    lote: "",
    edificio: "",
    piso: "",
    departamento: "",
    barrio: "",
    localidad: "",
    ciudad: "",
    provincia: "",
    pais: "",
    codigoPostal: ""
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
    const nuevaDireccion = {
      ...formData,
      id: nextDireccionId++
    };
    onGuardar(nuevaDireccion);
    onClose();
  };

  return (
    <div className="direccion-agregar-objeto-overlay">
      <div className="direccion-agregar-objeto-container">
        <h3 className="direccion-agregar-objeto-title">Nueva Dirección</h3>
        <div className="direccion-agregar-objeto-body">
          <label>Persona:
            <input type="number" name="persona" value={formData.persona} onChange={handleChange} placeholder="ID de persona" />
            {personaEstado === "valida" && (
              <span style={{ color: "green", fontSize: "0.85em" }}>✔ {personaNombre}</span>
            )}
            {personaEstado === "invalida" && (
              <span style={{ color: "red", fontSize: "0.85em" }}>✘ Esa persona no existe</span>
            )}
          </label>
          <label>Calle:
            <input type="text" name="calle" value={formData.calle} onChange={handleChange} />
          </label>
          <label>Número:
            <input type="text" name="numero" value={formData.numero} onChange={handleChange} />
          </label>
          <label>Manzana:
            <input type="text" name="manzana" value={formData.manzana} onChange={handleChange} />
          </label>
          <label>Lote:
            <input type="text" name="lote" value={formData.lote} onChange={handleChange} />
          </label>
          <label>Edificio:
            <input type="text" name="edificio" value={formData.edificio} onChange={handleChange} />
          </label>
          <label>Piso:
            <input type="text" name="piso" value={formData.piso} onChange={handleChange} />
          </label>
          <label>Departamento:
            <input type="text" name="departamento" value={formData.departamento} onChange={handleChange} />
          </label>
          <label>Barrio:
            <input type="text" name="barrio" value={formData.barrio} onChange={handleChange} />
          </label>
          <label>Localidad:
            <input type="text" name="localidad" value={formData.localidad} onChange={handleChange} />
          </label>
          <label>Ciudad:
            <input type="text" name="ciudad" value={formData.ciudad} onChange={handleChange} />
          </label>
          <label>Provincia:
            <input type="text" name="provincia" value={formData.provincia} onChange={handleChange} />
          </label>
          <label>País:
            <input type="text" name="pais" value={formData.pais} onChange={handleChange} />
          </label>
          <label>Código Postal:
            <input type="text" name="codigoPostal" value={formData.codigoPostal} onChange={handleChange} />
          </label>
        </div>
        <div className="direccion-agregar-objeto-form-buttons">
          <button className="direccion-agregar-objeto-btn-guardar" onClick={handleGuardar} disabled={personaEstado !== "valida"}>Agregar</button>
          <button className="direccion-agregar-objeto-btn-cancelar" onClick={onClose}>Cancelar</button>
        </div>
      </div>
    </div>
  );
}

export default DireccionAgregarObjeto;