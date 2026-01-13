import React, { useState } from 'react';
import './Telefono.css';

function AgregarTelefono({ personaId, onClose, onSave }) {
  const [formData, setFormData] = useState({
    pais: '',
    cArea: '',
    numero: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Se puede permitir guardar aunque esté vacío, pero se pasa el objeto completo
    const nuevoTelefono = {
      pais: formData.pais?.trim() || null,
      cArea: formData.cArea?.trim() || null,
      numero: formData.numero?.trim() || null
    };

    console.log("Nuevo teléfono creado:", nuevoTelefono);
    onSave(nuevoTelefono);
    onClose();
  };

  return (
    <div className="modal-overlay modal-overlay-hijo">
      <div className="telefono-form-wrapper">
        <form className="telefono-form" onSubmit={handleSubmit}>
          <h3 className="text-center mb-3">Nuevo Teléfono</h3>

          <div className="form-scroll">
            <input
              type="text"
              name="pais"
              placeholder="País"
              value={formData.pais}
              onChange={handleChange}
            />
            <input
              type="text"
              name="cArea"
              placeholder="Código de Área"
              value={formData.cArea}
              onChange={handleChange}
            />
            <input
              type="text"
              name="numero"
              placeholder="Número"
              value={formData.numero}
              onChange={handleChange}
            />
          </div>

          <div className="form-buttons">
            <button type="submit" className="btn btn-success w-100">
              Guardar
            </button>
            <button
              type="button"
              className="btn btn-secondary w-100 mt-2"
              onClick={onClose}
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AgregarTelefono;