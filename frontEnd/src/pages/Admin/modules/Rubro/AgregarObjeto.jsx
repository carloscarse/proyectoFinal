// proyecto/frontEnd/src/pages/Admin/modules/Rubro/AgregarObjeto.jsx

import React, { useState } from "react";
import "./Agregar.css";

function RubroAgregarObjeto({ onClose, onGuardar }) {
  const [formData, setFormData] = useState({
    nombre: "",
    descripcion: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleGuardar = () => {
    // 👇 devolvemos un objeto temporal de rubro
    const nuevoRubro = {
      nombre: formData.nombre,
      descripcion: formData.descripcion,
      nuevo: true,
      editado: false,
      eliminado: false
    };

    if (onGuardar) onGuardar(nuevoRubro);
    onClose();
  };

  return (
    <div className="rubro-agregar-overlay">
      <div className="rubro-agregar-container">
        <h3 className="rubro-agregar-title">Nuevo Rubro</h3>

        <div className="rubro-agregar-body">
          <label>Nombre:
            <input
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
            />
          </label>

          <label>Descripción:
            <textarea
              name="descripcion"
              value={formData.descripcion}
              onChange={handleChange}
            />
          </label>
        </div>

        <div className="rubro-agregar-form-buttons">
          <button
            className="rubro-agregar-btn-cancelar"
            onClick={onClose}
          >
            Cancelar
          </button>
          <button
            className="rubro-agregar-btn-guardar"
            onClick={handleGuardar}
          >
            Guardar
          </button>
        </div>
      </div>
    </div>
  );
}

export default RubroAgregarObjeto;