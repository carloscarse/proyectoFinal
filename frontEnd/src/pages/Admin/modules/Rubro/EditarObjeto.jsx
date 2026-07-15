// proyecto/frontEnd/src/pages/Admin/modules/Rubro/EditarObjeto.jsx

import React, { useState } from "react";
import "./Editar.css"; // Reutiliza el mismo CSS de Editar

function EditarObjeto({ rubro, onGuardar, onClose }) {
  const [formData, setFormData] = useState({
    rubro: rubro?.rubro || rubro?.nombre || "",
    descripcion: rubro?.descripcion || ""
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({...formData, [name]: value });
  };

  const handleGuardar = async () => {
    if (loading) return;
    setLoading(true);
    
    try {
      // No hace API, solo devuelve el objeto actualizado al padre
      const rubroActualizado = {
      ...rubro, // mantiene id, flags nuevo/editado/eliminado
      ...formData, // pisa los campos editados
        editado: true // marca que fue editado
      };
      
      onGuardar(rubroActualizado);
      onClose();
    } catch (error) {
      console.error("❌ Error al editar rubro temporal:", error);
    } finally {
      setLoading(false);
    }
  };

  if (!rubro) return null;

  return (
    <div className="rubro-editar-overlay">
      <div className="rubro-editar-container">
        <h3 className="rubro-editar-title">
          Editar Rubro {rubro.nuevo && "(Nuevo)"}
        </h3>

        <div className="rubro-editar-scroll">
          <div className="rubro-editar-body">
            <label>Rubro:
              <input
                type="text"
                name="rubro"
                value={formData.rubro}
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
        </div>

        <div className="rubro-editar-form-buttons">
          <button
            className="rubro-editar-btn-cancelar"
            onClick={onClose}
          >
            Cancelar
          </button>
          <button
            className="rubro-editar-btn-guardar"
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

export default EditarObjeto;