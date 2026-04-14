// proyecto/frontEnd/src/pages/Admin/modules/Telefono/AgregarObjeto.jsx
import React, { useState } from "react";
import "./Agregar.css"; // ahora importa su propio CSS

let nextTelefonoId = 0; // contador incremental temporal

function TelefonoAgregarObjeto({ onClose, onGuardar }) {
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
          <label>País:
            <input type="text" name="pais" value={formData.pais} onChange={handleChange} />
          </label>
          <label>Código Área:
            <input type="text" name="cArea" value={formData.cArea} onChange={handleChange} />
          </label>
          <label>Número:
            <input type="text" name="numero" value={formData.numero} onChange={handleChange} />
          </label>
        </div>
        <div className="telefono-agregar-objeto-form-buttons">
          <button 
            className="telefono-agregar-objeto-btn-guardar" 
            onClick={handleGuardar}
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