// proyecto/frontEnd/src/pages/Admin/modules/Telefono/EditarObjeto.jsx
import React, { useState } from "react";
import "./Editar.css";

function EditarObjetoTelefono({ telefono, onGuardar, onClose }) {
  const [formData, setFormData] = useState(telefono);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleGuardar = () => {
    try {
      onGuardar({ ...formData, editado: true });
    } catch (err) {
      console.error("❌ Error al marcar teléfono como editado:", err);
    } finally {
      onClose();
    }
  };

  return (
    <div className="telefono-editar-objeto-overlay">
      <div className="telefono-editar-objeto-container">
        <h3 className="telefono-editar-objeto-title">Editar Teléfono</h3>
        <div className="telefono-editar-objeto-body">
          <label>Persona:
            <input type="number" name="persona" value={formData.persona || ""} onChange={handleChange} placeholder="ID de persona" />
          </label>
          <label>País:
            <input type="number" name="pais" value={formData.pais || ""} onChange={handleChange} placeholder="Ej: 54 (Argentina)" />
          </label>
          <label>Código de Área:
            <input type="number" name="cArea" value={formData.cArea || ""} onChange={handleChange} placeholder="Ej: 381" />
          </label>
          <label>Número:
            <input type="number" name="numero" value={formData.numero || ""} onChange={handleChange} placeholder="Ej: 1234567" />
          </label>
        </div>
        <div className="telefono-editar-objeto-form-buttons">
          <button 
            className="telefono-editar-objeto-btn-guardar" 
            onClick={handleGuardar}
          >
            Guardar
          </button>
          <button 
            className="telefono-editar-objeto-btn-cancelar" 
            onClick={onClose}
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditarObjetoTelefono;