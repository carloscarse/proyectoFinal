//proyecto/frontEnd/src/pages/Admin/modules/Direccion/Editar.jsx
import React, { useState, useEffect } from "react";
import "./Editar.css";

function EditarDireccion({ direccion, onClose, onGuardar }) {
  const [formData, setFormData] = useState(direccion || {});

  // 👉 sincroniza formData si cambia la prop direccion
  useEffect(() => {
    setFormData(direccion || {});
  }, [direccion]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value, editado: true }); // marcamos como editado
  };

  const handleGuardar = () => {
    onGuardar(formData); // devuelve al padre
    onClose();           // cierra modal
  };

  return (
    <div className="modal-overlay">
      <div className="editar-container">
        <div className="editar-header">
          <h2 className="editar-title">Editar Dirección</h2>
        </div>

        <div className="editar-body">
          <label>Calle:<input type="text" name="calle" value={formData.calle || ""} onChange={handleChange} /></label>
          <label>Número:<input type="text" name="numero" value={formData.numero || ""} onChange={handleChange} /></label>
          <label>Manzana:<input type="text" name="manzana" value={formData.manzana || ""} onChange={handleChange} /></label>
          <label>Lote:<input type="text" name="lote" value={formData.lote || ""} onChange={handleChange} /></label>
          <label>Edificio:<input type="text" name="edificio" value={formData.edificio || ""} onChange={handleChange} /></label>
          <label>Piso:<input type="text" name="piso" value={formData.piso || ""} onChange={handleChange} /></label>
          <label>Departamento:<input type="text" name="departamento" value={formData.departamento || ""} onChange={handleChange} /></label>
          <label>Barrio:<input type="text" name="barrio" value={formData.barrio || ""} onChange={handleChange} /></label>
          <label>Localidad:<input type="text" name="localidad" value={formData.localidad || ""} onChange={handleChange} /></label>
          <label>Ciudad:<input type="text" name="ciudad" value={formData.ciudad || ""} onChange={handleChange} /></label>
          <label>Provincia:<input type="text" name="provincia" value={formData.provincia || ""} onChange={handleChange} /></label>
          <label>País:<input type="text" name="pais" value={formData.pais || ""} onChange={handleChange} /></label>
          <label>Código Postal:<input type="text" name="codigoPostal" value={formData.codigoPostal || ""} onChange={handleChange} /></label>
        </div>

        <div className="editar-footer">
          <button onClick={onClose}>Cancelar</button>
          <button onClick={handleGuardar}>Guardar</button>
        </div>
      </div>
    </div>
  );
}

export default EditarDireccion;