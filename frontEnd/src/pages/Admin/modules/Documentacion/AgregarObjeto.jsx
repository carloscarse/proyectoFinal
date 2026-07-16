// proyecto/frontEnd/src/pages/Admin/modules/Documentacion/AgregarObjeto.jsx

import React, { useState } from "react";
import "./Agregar.css";

function DocumentacionAgregarObjeto({ onClose, onGuardar }) {
  const [formData, setFormData] = useState({
    documento: "",
    descripcion: "",
    inquilino: "",
    emision: "",
    vencimiento: "",
    fechaPresentacion: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({...formData, [name]: value });
  };

  const handleGuardar = () => {
    // Devuelve objeto temporal sin persistir
    const documentacionTemp = {
     ...formData,
      nuevo: true,
      editado: false,
      eliminado: false
    };
    if (onGuardar) onGuardar(documentacionTemp);
    onClose();
  };

  return (
    <div className="documentacion-agregar-overlay">
      <div className="documentacion-agregar-container">
        <h3 className="documentacion-agregar-title">Nueva Documentación</h3>

        <div className="documentacion-agregar-body">
          <label>Documento:
            <input 
              type="text" 
              name="documento" 
              value={formData.documento} 
              onChange={handleChange}
              required 
            />
          </label>
          <label>Descripción:
            <textarea 
              name="descripcion" 
              value={formData.descripcion} 
              onChange={handleChange}
              rows="3"
              placeholder="Detalle de la documentación..."
            />
          </label>
          <label>Inquilino ID:
            <input 
              type="number" 
              name="inquilino" 
              value={formData.inquilino} 
              onChange={handleChange}
              min="1"
              placeholder="ID del inquilino"
            />
          </label>
          <label>Fecha de Emisión:
            <input 
              type="date" 
              name="emision" 
              value={formData.emision} 
              onChange={handleChange} 
            />
          </label>
          <label>Fecha de Vencimiento:
            <input 
              type="date" 
              name="vencimiento" 
              value={formData.vencimiento} 
              onChange={handleChange} 
            />
          </label>
          <label>Fecha de Presentación:
            <input 
              type="date" 
              name="fechaPresentacion" 
              value={formData.fechaPresentacion} 
              onChange={handleChange} 
            />
          </label>
        </div>

        <div className="documentacion-agregar-form-buttons">
          <button 
            className="documentacion-agregar-btn-cancelar" 
            onClick={onClose}
          >
            Cancelar
          </button>
          <button 
            className="documentacion-agregar-btn-guardar" 
            onClick={handleGuardar}
          >
            Guardar
          </button>
        </div>
      </div>
    </div>
  );
}

export default DocumentacionAgregarObjeto;