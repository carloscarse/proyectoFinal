// proyecto/frontEnd/src/pages/Admin/modules/Documentacion/Agregar.jsx

import React, { useState, useEffect } from "react";
import "./Agregar.css";
import { useUserStore } from "../../../../stores/userStore";
import { commitDocumentacion } from "./commit";
import { registrarMovimiento } from "../../../../api/logMovimiento";
import { obtenerInquilinos } from "../../../../api/inquilino";
import { getInquilinoLabel } from "../../../../utils/labels/inquilino";
import InquilinoAgregarObjeto from "../Inquilino/AgregarObjeto";

function AgregarDocumentacion({ onClose, onGuardado }) {
  const [formData, setFormData] = useState({
    descripcion: "",
    inquilino: "",
    emision: "",
    vencimiento: "",
    fechaPresentacion: "",
    documento: null,
    nuevoInquilino: null
  });

  const [inquilinos, setInquilinos] = useState([]);
  const [showInquilinoModal, setShowInquilinoModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const usuario = useUserStore((state) => state.user);

  useEffect(() => {
    async function fetchData() {
      try {
        const inq = await obtenerInquilinos();
        setInquilinos(inq);
      } catch (err) {
        console.error("❌ Error cargando inquilinos:", err.message);
      }
    }
    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({...formData, documento: e.target.files[0] });
  };

  const handleGuardar = async () => {
    if (loading) return;
    setLoading(true);
    try {
      console.log("📦 Payload enviado a commitDocumentacion:", formData);
      const nuevaDoc = await commitDocumentacion(formData, null, (e) => e);

      const camposDB = ["descripcion", "inquilino", "emision", "vencimiento", "fechaPresentacion"];
      
      await registrarMovimiento({
        usuario: usuario.id,
        accion: "alta",
        entidad: "documentacion",
        campo: "Todos",
        previo: null,
        nuevo: camposDB.map(k => `${k}: ${formData[k] || 'null'}`).join(", "),
        detalle: `creó la documentación ${nuevaDoc.descripcion} con id ${nuevaDoc.id}`
      });

      if (onGuardado) onGuardado(nuevaDoc);
      onClose();
    } catch (error) {
      console.error("❌ Error al guardar documentación:", error);
      onClose();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="documentacion-agregar-overlay">
      <div className="documentacion-agregar-container">
        <h3 className="documentacion-agregar-title">Nueva Documentación</h3>

        <div className="documentacion-agregar-body">
          <label>Detalle de la documentación:
            <textarea 
              name="descripcion" 
              value={formData.descripcion} 
              onChange={handleChange}
              placeholder="Detalle de la documentación..."
            />
          </label>

          <label>Inquilino:
            <select
              name="inquilino"
              value={formData.inquilino}
              onChange={(e) => {
                if (e.target.value === "nuevo") {
                  setShowInquilinoModal(true);
                } else {
                  setFormData({
                  ...formData, 
                    inquilino: e.target.value? Number(e.target.value) : "",
                    nuevoInquilino: null // ← Limpiar si elige uno existente
                  });
                }
              }}
            >
              <option value="">Seleccione...</option>
              <option value="nuevo">➕ Nuevo</option>

              {/* Bloque 2: Inquilinos de la API */}
              {inquilinos.map(i => (
                <option key={i.id} value={i.id}>
                  {getInquilinoLabel(i)}
                </option>
              ))}

              {/* Bloque 3: Inquilino nuevo temporal */}
              {formData.nuevoInquilino && (
                <option value="nuevo_temp">
                  {`${formData.nuevoInquilino.persona?.nombre || ""} ${formData.nuevoInquilino.persona?.apellido || ""} (Nuevo)`}
                </option>
              )}
            </select>
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

          <label>Archivo:
            <input 
              type="file" 
              name="documento" 
              onChange={handleFileChange}
              accept="image/*,.pdf"
            />
          </label>
        </div>

        <div className="documentacion-agregar-form-buttons">
          <button className="documentacion-agregar-btn-cancelar" onClick={onClose}>
            Cancelar
          </button>
          <button 
            className="documentacion-agregar-btn-guardar" 
            onClick={handleGuardar} 
            disabled={loading}
          >
            {loading? "Guardando..." : "Guardar"}
          </button>
        </div>
      </div>

      {showInquilinoModal && (
        <InquilinoAgregarObjeto
          onClose={() => setShowInquilinoModal(false)}
          onGuardar={(nuevoInquilino) => {
            console.log("🔍 Inquilino normalizado desde modal:", nuevoInquilino);
            setFormData(prev => ({
          ...prev,
              inquilino: "nuevo_temp", // ← Selecciona el option temporal
              nuevoInquilino: nuevoInquilino
            }));
            setShowInquilinoModal(false);
          }}
        />
      )}
    </div>
  );
}

export default AgregarDocumentacion;