//frontEnd/src/pages/Admin/modules/Direccion/Agregar.jsx
import React, { useState } from "react";
import { agregarDireccion } from "../../../../api/direccion";
import "./Agregar.css";

function DireccionAgregar({ tipo, personaId, onClose, onGuardar }) {
  const [formData, setFormData] = useState({
    calle: "",
    numero: "",
    manzana: "",
    lote: "",
    edificio: "",
    piso: "",
    departamento: "",
    barrio: "",
    localidad: "",
    ciudad: "",
    provincia: "",
    pais: "",
    codigoPostal: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleGuardar = async () => {
    if (tipo === "p") {
      // 👉 Caso vinculado a persona: devolver al padre
      onGuardar(formData);
    } else {
      // 👉 Caso independiente: persistir directamente en la BD
      try {
        const nuevaDireccion = await agregarDireccion(personaId, formData);
        console.log("✅ Dirección creada:", nuevaDireccion);
      } catch (error) {
        console.error("❌ Error al crear dirección:", error);
      }
    }
    onClose(); // cerrar modal
  };

  return (
    <div className="modal-overlay">
      <div className="agregar-container">
        <h3>{tipo === "p" ? "Nueva Dirección (Persona)" : "Nueva Dirección"}</h3>
        <div className="agregar-body">
          <label>Calle:<input type="text" name="calle" value={formData.calle} onChange={handleChange} /></label>
          <label>Número:<input type="text" name="numero" value={formData.numero} onChange={handleChange} /></label>
          <label>Manzana:<input type="text" name="manzana" value={formData.manzana} onChange={handleChange} /></label>
          <label>Lote:<input type="text" name="lote" value={formData.lote} onChange={handleChange} /></label>
          <label>Edificio:<input type="text" name="edificio" value={formData.edificio} onChange={handleChange} /></label>
          <label>Piso:<input type="text" name="piso" value={formData.piso} onChange={handleChange} /></label>
          <label>Departamento:<input type="text" name="departamento" value={formData.departamento} onChange={handleChange} /></label>
          <label>Barrio:<input type="text" name="barrio" value={formData.barrio} onChange={handleChange} /></label>
          <label>Localidad:<input type="text" name="localidad" value={formData.localidad} onChange={handleChange} /></label>
          <label>Ciudad:<input type="text" name="ciudad" value={formData.ciudad} onChange={handleChange} /></label>
          <label>Provincia:<input type="text" name="provincia" value={formData.provincia} onChange={handleChange} /></label>
          <label>País:<input type="text" name="pais" value={formData.pais} onChange={handleChange} /></label>
          <label>Código Postal:<input type="text" name="codigoPostal" value={formData.codigoPostal} onChange={handleChange} /></label>
        </div>
        <div className="form-buttons">
          <button onClick={handleGuardar}>Guardar</button>
          <button onClick={onClose}>Cancelar</button>
        </div>
      </div>
    </div>
  );
}

export default DireccionAgregar;