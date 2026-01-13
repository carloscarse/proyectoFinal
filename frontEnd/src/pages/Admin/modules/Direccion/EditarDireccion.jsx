import React, { useState, useEffect } from 'react';
import './Direccion.css';

function EditarDireccion({ direccion, onClose, onSave }) {
  const [formData, setFormData] = useState({
    calle: '',
    numero: '',
    manzana: '',
    lote: '',
    edificio: '',
    piso: '',
    departamento: '',
    barrio: '',
    localidad: '',
    ciudad: '',
    provincia: '',
    pais: '',
    codigoPostal: ''
  });

  useEffect(() => {
    if (direccion) {
      setFormData({
        calle: direccion.calle || '',
        numero: direccion.numero || '',
        manzana: direccion.manzana || '',
        lote: direccion.lote || '',
        edificio: direccion.edificio || '',
        piso: direccion.piso || '',
        departamento: direccion.departamento || '',
        barrio: direccion.barrio || '',
        localidad: direccion.localidad || '',
        ciudad: direccion.ciudad || '',
        provincia: direccion.provincia || '',
        pais: direccion.pais || '',
        codigoPostal: direccion.codigoPostal || ''
      });
    }
  }, [direccion]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("EditarDireccion -> onSave payload:", {
      id: direccion?.id,
      ...formData
    });

    if (onSave && direccion?.id != null) {
      onSave(direccion.id, {
        ...formData
      });
    }

    onClose();
  };

  return (
    <div className="modal-overlay modal-overlay-hijo">
      <div className="direccion-form-wrapper">
        <form className="direccion-form" onSubmit={handleSubmit}>
          <h3 className="text-center mb-3">Editar Dirección</h3>

          <div className="form-scroll">
            <input type="text" name="calle" placeholder="Calle" value={formData.calle} onChange={handleChange} />
            <input type="text" name="numero" placeholder="Número" value={formData.numero} onChange={handleChange} />
            <input type="text" name="manzana" placeholder="Manzana" value={formData.manzana} onChange={handleChange} />
            <input type="text" name="lote" placeholder="Lote" value={formData.lote} onChange={handleChange} />
            <input type="text" name="edificio" placeholder="Edificio" value={formData.edificio} onChange={handleChange} />
            <input type="text" name="piso" placeholder="Piso" value={formData.piso} onChange={handleChange} />
            <input type="text" name="departamento" placeholder="Departamento" value={formData.departamento} onChange={handleChange} />
            <input type="text" name="barrio" placeholder="Barrio" value={formData.barrio} onChange={handleChange} />
            <input type="text" name="localidad" placeholder="Localidad" value={formData.localidad} onChange={handleChange} />
            <input type="text" name="ciudad" placeholder="Ciudad" value={formData.ciudad} onChange={handleChange} />
            <input type="text" name="provincia" placeholder="Provincia" value={formData.provincia} onChange={handleChange} />
            <input type="text" name="pais" placeholder="País" value={formData.pais} onChange={handleChange} />
            <input type="text" name="codigoPostal" placeholder="Código Postal" value={formData.codigoPostal} onChange={handleChange} />
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

export default EditarDireccion;