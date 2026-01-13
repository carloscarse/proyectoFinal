import React, { useState, useEffect } from 'react';
import './Telefono.css';

function EditarTelefono({ telefono, onClose, onSave }) {
  // Estado local seguro y sincronizado con props
  const [formData, setFormData] = useState({
    pais: telefono?.pais || '',
    cArea: telefono?.cArea || '',
    numero: telefono?.numero || ''
  });

  // Sincroniza cuando cambia el teléfono que se edita (abre otro registro)
  useEffect(() => {
    setFormData({
      pais: telefono?.pais || '',
      cArea: telefono?.cArea || '',
      numero: telefono?.numero || ''
    });
  }, [telefono]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validación ligera opcional: no bloquea, solo informa
    console.log("EditarTelefono -> onSave payload:", {
      id: telefono?.id,
      ...formData
    });

    // Aseguramos que el padre reciba el id para poder actualizar ese elemento
    if (onSave && telefono?.id != null) {
      await Promise.resolve(onSave(telefono.id, {
        pais: formData.pais ?? null,
        cArea: formData.cArea ?? null,
        numero: formData.numero ?? null
      }));
    } else {
      console.warn("EditarTelefono -> onSave faltante o telefono.id inválido");
    }

    onClose();
  };

  return (
    <div className="modal-overlay modal-overlay-hijo">
      <div className="telefono-form-wrapper">
        <form className="telefono-form" onSubmit={handleSubmit}>
          <h3 className="text-center mb-3">Editar Teléfono</h3>

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
              Guardar cambios
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

export default EditarTelefono;