import React, { useState } from "react";
import "./Telefono.css";

function EditarTelefono({ telefono, onClose, onGuardar }) {
  const [formData, setFormData] = useState(telefono);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleGuardar = () => {
    onGuardar(formData);
  };

  return (
    <div className="modal-overlay">
      <div className="direccion-container">
        <h3 className="direccion-title">Editar Teléfono</h3>
        <div className="direccion-card">
          <label>
            Código de País:
            <input
              type="text"
              name="pais"
              value={formData.pais || ""}
              onChange={handleChange}
            />
          </label>
          <label>
            Código de Área:
            <input
              type="text"
              name="cArea"
              value={formData.cArea || ""}
              onChange={handleChange}
            />
          </label>
          <label>
            Número:
            <input
              type="text"
              name="numero"
              value={formData.numero || ""}
              onChange={handleChange}
            />
          </label>
        </div>
        <div className="form-buttons">
          <button onClick={handleGuardar}>Guardar</button>
          <button onClick={onClose}>Cancelar</button>
        </div>
      </div>
    </div>
  );
}

export default EditarTelefono;