import React, { useState } from 'react';
import './Direccion.css';

function NuevaDireccion({ personaId, onClose, onSave }) {
  const [formData, setFormData] = useState({
    calle: '',
    numero: '',
    ciudad: '',
    provincia: '',
    pais: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const nuevaDireccion = {
      calle: formData.calle?.trim() || null,
      numero: formData.numero?.trim() || null,
      ciudad: formData.ciudad?.trim() || null,
      provincia: formData.provincia?.trim() || null,
      pais: formData.pais?.trim() || null
    };

    console.log("Nueva dirección creada:", nuevaDireccion);
    onSave(nuevaDireccion);
    onClose();
  };

  return (
    <div className="modal-overlay modal-overlay-hijo">
      <div className="direccion-form-wrapper">
        <form className="direccion-form" onSubmit={handleSubmit}>
          <h3 className="text-center mb-3">Nueva Dirección</h3>

          <div className="form-scroll">
            <input type="text" name="calle" placeholder="Calle" value={formData.calle} onChange={handleChange} />
            <input type="text" name="numero" placeholder="Número" value={formData.numero} onChange={handleChange} />
            <input type="text" name="ciudad" placeholder="Ciudad" value={formData.ciudad} onChange={handleChange} />
            <input type="text" name="provincia" placeholder="Provincia" value={formData.provincia} onChange={handleChange} />
            <input type="text" name="pais" placeholder="País" value={formData.pais} onChange={handleChange} />
          </div>

          <div className="form-buttons">
            <button type="submit" className="btn btn-success w-100">Guardar</button>
            <button type="button" className="btn btn-secondary w-100 mt-2" onClick={onClose}>Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default NuevaDireccion;