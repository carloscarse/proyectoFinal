//frontEnd/src/pages/Admin/modules/Telefono/Agregar.jsx
import React, { useState } from "react";
import "./Agregar.css";

function AgregarTelefono({ onClose, onGuardar }) {
  const [formData, setFormData] = useState({
    pais: "",
    cArea: "",
    numero: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleGuardar = () => {
    onGuardar(formData); // ✅ devuelve al padre
    onClose();           // ✅ cierra modal
  };

  return (
    <div className="modal-overlay">
      <div className="agregar-container">
        <h3>Nuevo Teléfono</h3>
        <div className="agregar-body">
          <label>País:<input type="text" name="pais" value={formData.pais} onChange={handleChange} /></label>
          <label>Código Área:<input type="text" name="cArea" value={formData.cArea} onChange={handleChange} /></label>
          <label>Número:<input type="text" name="numero" value={formData.numero} onChange={handleChange} /></label>
        </div>
        <div className="form-buttons">
          <button onClick={handleGuardar}>Guardar</button>
          <button onClick={onClose}>Cancelar</button>
        </div>
      </div>
    </div>
  );
}

export default AgregarTelefono;