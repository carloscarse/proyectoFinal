// proyecto/frontEnd/src/pages/Admin/modules/Documentacion/EditarObjeto.jsx

import React, { useState } from "react";
import "./Editar.css";

function EditarObjetoDocumentacion({ documentacion, onClose, onGuardar }) {
  const [formData, setFormData] = useState({
    id: documentacion?.id || null,
    documento: documentacion?.documento || "",
    descripcion: documentacion?.descripcion || "",
    inquilino: documentacion?.inquilino || "",
    emision: documentacion?.emision? documentacion.emision.split('T')[0] : "",
    vencimiento: documentacion?.vencimiento? documentacion.vencimiento.split('T')[0] : "",
    fechaPresentacion: documentacion?.fechaPresentacion? documentacion.fechaPresentacion.split('T')[0] : ""
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({...formData, [name]: value });
  };

  const handleGuardar = () => {
    if (loading) return;
    setLoading(true);
    try {
      const documentacionEditada = {
      ...formData,
        editado: true
      };
      console.log("✅ Documentación editada desde EditarObjetoDocumentacion:", documentacionEditada);
      onGuardar?.(documentacionEditada);
      onClose();
    } catch (error) {
      console.error("❌ Error al editar documentación temporal:", error);
      onClose();
    } finally {
      setLoading(false);
    }
  };

  if (!documentacion) return null;
  
  return (
    <div className="documentacion-editar-overlay">
      <div className="documentacion-editar-container">
        <h3 className="documentacion-editar-title">Editar Documentación</h3>

        <div className="documentacion-editar-scroll">
          <div className="documentacion-editar-body">
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
              />
            </label>
            <label>Inquilino ID:
              <input 
                type="number" 
                name="inquilino" 
                value={formData.inquilino} 
                onChange={handleChange}
                min="1"
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
        </div>

        <div className="documentacion-editar-form-buttons">
          <button 
            className="documentacion-editar-btn-cancelar" 
            onClick={onClose}
          >
            Cancelar
          </button>
          <button 
            className="documentacion-editar-btn-guardar" 
            onClick={handleGuardar} 
            disabled={loading}
          >
            {loading? "Guardando..." : "Guardar"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditarObjetoDocumentacion;