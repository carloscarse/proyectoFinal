// proyecto/frontEnd/src/pages/Admin/modules/Espacio/Agregar.jsx

import React, { useState, useEffect } from "react";
import "./Agregar.css";
import { useUserStore } from "../../../../stores/userStore";
import { commitEspacio } from "./commit";
import { registrarMovimiento } from "../../../../api/logMovimiento";
import { getEspacioLabel } from "../../../../utils/labels/espacio";
import { getInquilinoLabel } from "../../../../utils/labels/inquilino";
import { getRubroLabel } from "../../../../utils/labels/rubro";
import { obtenerInquilinos } from "../../../../api/inquilino";
import { obtenerRubros } from "../../../../api/rubro";
import InquilinoAgregarObjeto from "../Inquilino/AgregarObjeto";
import RubroAgregarObjeto from "../Rubro/AgregarObjeto";

function AgregarEspacio({ onClose, onGuardado }) {
  const [formData, setFormData] = useState({
    nombre: "",
    tipo: "",
    estado: "libre",
    ancho: "",
    largo: "",
    precio: "",
    recargoUbicacion: "",
    descripcion: "",
    inquilino: "",
    rubro: "",
    nuevoInquilino: null,
    nuevoRubro: null
  });

  const [inquilinos, setInquilinos] = useState([]);
  const [rubros, setRubros] = useState([]);
  const [showInquilinoModal, setShowInquilinoModal] = useState(false);
  const [showRubroModal, setShowRubroModal] = useState(false);

  const [loading, setLoading] = useState(false);
  const usuario = useUserStore((state) => state.user);

  useEffect(() => {
    async function fetchData() {
      try {
        const inq = await obtenerInquilinos();
        setInquilinos(inq);

        const rub = await obtenerRubros();
        setRubros(rub.map(r => ({ id: r.id, label: getRubroLabel(r) })));
      } catch (err) {
        console.error("❌ Error cargando inquilinos/rubros:", err.message);
      }
    }
    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleGuardar = async () => {
    if (loading) return;
    setLoading(true);
    try {
      console.log("📦 Payload enviado a commitEspacio:", formData);
      const nuevoEspacio = await commitEspacio(formData, null, (e) => e);

      await registrarMovimiento({
        usuario: usuario.id,
        accion: "alta",
        entidad: "espacio",
        campo: Object.keys(formData).join(", "),
        previo: null,
        nuevo: Object.values(formData).join(", "),
        detalle: `agregó un nuevo espacio ${getEspacioLabel(nuevoEspacio)} con id ${nuevoEspacio.id}`
      });

      if (onGuardado) onGuardado(nuevoEspacio);
      onClose();
    } catch (error) {
      console.error("❌ Error al guardar espacio:", error);
      onClose();
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="espacio-agregar-overlay">
      <div className="espacio-agregar-container">
        <h3 className="espacio-agregar-title">Nuevo Espacio</h3>

        <div className="espacio-agregar-body">
          {/* Campos del formulario */}
          <label>Nombre:
            <input type="text" name="nombre" value={formData.nombre} onChange={handleChange} />
          </label>

          <label>Tipo:
            <input type="text" name="tipo" value={formData.tipo} onChange={handleChange} />
          </label>

          <label>Estado:
            <select name="estado" value={formData.estado} onChange={handleChange}>
              <option value="libre">Libre</option>
              <option value="ocupado">Ocupado</option>
              <option value="reservado">Reservado</option>
              <option value="mantenimiento">Mantenimiento</option>
            </select>
          </label>

          <label>Ancho:
            <input type="number" name="ancho" value={formData.ancho} onChange={handleChange} />
          </label>

          <label>Largo:
            <input type="number" name="largo" value={formData.largo} onChange={handleChange} />
          </label>

          <label>Precio:
            <input type="number" step="0.01" name="precio" value={formData.precio} onChange={handleChange} />
          </label>

          <label>Recargo Ubicación:
            <input type="number" step="0.01" name="recargoUbicacion" value={formData.recargoUbicacion} onChange={handleChange} />
          </label>

          <label>Descripción:
            <textarea name="descripcion" value={formData.descripcion} onChange={handleChange} />
          </label>

          {/* Select de Inquilino en 3 bloques */}
          <label>Inquilino:
            <select
              name="inquilino"
              value={formData.inquilino}
              onChange={(e) => {
                if (e.target.value === "nuevo") {
                  setShowInquilinoModal(true);
                } else {
                  setFormData({ ...formData, inquilino: e.target.value? Number(e.target.value) : "" });
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
                  {`${formData.nuevoInquilino.persona?.nombre || ""} ${formData.nuevoInquilino.persona?.apellido || ""}`}
                </option>
              )}
            </select>
          </label>

          {/* Select de Rubro en 3 bloques */}
          <label>Rubro:
            <select
              name="rubro"
              value={formData.rubro}
              onChange={(e) => {
                if (e.target.value === "nuevo") {
                  setShowRubroModal(true);
                } else {
                  setFormData({ ...formData, rubro: e.target.value && e.target.value !== "nuevo_temp_rubro"
                    ? Number(e.target.value)
                    : e.target.value
                  });
                }
              }}
            >
              <option value="">Seleccione...</option>
              <option value="nuevo">➕ Nuevo</option>

              {/* Bloque 2: Rubros de la API */}
              {rubros.map(r => (
                <option key={r.id} value={r.id}>{r.label}</option>
              ))}

              {/* Bloque 3: Rubro nuevo temporal */}
              {formData.nuevoRubro && (
                <option value={"nuevo_temp_rubro"}>
                  {formData.nuevoRubro.nombre} (nuevo)
                </option>
              )}
            </select>
          </label>
        </div>

        <div className="espacio-agregar-form-buttons">
          <button className="espacio-agregar-btn-cancelar" onClick={onClose}>Cancelar</button>
          <button className="espacio-agregar-btn-guardar" onClick={handleGuardar} disabled={loading}>
            {loading ? "Guardando..." : "Guardar"}
          </button>
        </div>
      </div>

      {/* Modal de Inquilino */}
      {showInquilinoModal && (
        <InquilinoAgregarObjeto
          onClose={() => setShowInquilinoModal(false)}
          onGuardar={(nuevoInquilino) => {
            const inquilinoTemporal = { ...nuevoInquilino, nuevo: true };
            setFormData(prev => ({
              ...prev,
              inquilino: "nuevo_temp",
              nuevoInquilino: inquilinoTemporal
            }));
            setShowInquilinoModal(false);
          }}
        />
      )}

      {/* Modal de Rubro */}
      {showRubroModal && (
        <RubroAgregarObjeto
          onClose={() => setShowRubroModal(false)}
          onGuardar={(nuevoRubro) => {
            const rubroTemporal = { ...nuevoRubro, nuevo: true };
            setFormData(prev => ({
              ...prev,
              rubro: "nuevo_temp_rubro",
              nuevoRubro: rubroTemporal
            }));
            setShowRubroModal(false);
          }}
        />
      )}
    </div>
  );
}

export default AgregarEspacio;