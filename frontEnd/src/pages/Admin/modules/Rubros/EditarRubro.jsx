// frontEnd/src/pages/Admin/modules/Rubros/EditarRubro.jsx
import React, { useState } from 'react';
import './Rubro.css';

function EditarRubro({ rubro, onClose, onSave }) {
  const [formData, setFormData] = useState({
    rubro: rubro.rubro || '',
    descripcion: rubro.descripcion || ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Guardando rubro:", formData);
    await onSave(rubro.id, { ...formData });
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="usuarios-form-wrapper">
        <form className="usuarios-form" onSubmit={handleSubmit}>
          <h3 className="text-center mb-3">Editar Rubro</h3>

          <div className="form-scroll">
            {/* Campos de rubro */}
            <input
              type="text"
              name="rubro"
              placeholder="Rubro"
              value={formData.rubro}
              onChange={handleChange}
            />
            <input
              type="text"
              name="descripcion"
              placeholder="Descripción"
              value={formData.descripcion}
              onChange={handleChange}
            />
          </div>

          <div className="form-buttons">
            <button type="submit" className="btn btn-success w-100">Guardar cambios</button>
            <button type="button" className="btn btn-secondary w-100 mt-2" onClick={onClose}>Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditarRubro;