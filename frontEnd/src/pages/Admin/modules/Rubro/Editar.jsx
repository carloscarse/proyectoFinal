// proyecto/frontEnd/src/pages/Admin/modules/Rubro/Editar.jsx

import React, { useState } from "react";
import "./Editar.css";
import { registrarMovimiento } from "../../../../api/logMovimiento.js";
import { actualizarRubro } from "../../../../api/rubro.js";

function Editar({ rubroInicial, onClose }) {
  const [formData, setFormData] = useState({
    rubro: rubroInicial?.rubro || "",
    descripcion: rubroInicial?.descripcion || ""
  });

  const [loading, setLoading] = useState(false);
  const [registrado, setRegistrado] = useState(false); // 👈 bandera para evitar duplicados

  // 👇 Función para registrar la apertura del formulario
  const registrarConsulta = async () => {
    try {
      await registrarMovimiento({
        accion: "consulta",
        entidad: "rubro",
        campo: "Todos",
        previo: null,
        nuevo: null,
        detalle: `comenzó el proceso de edición del rubro ${rubroInicial.rubro} con id ${rubroInicial.id}`
      });
    } catch (err) {
      console.error("❌ Error al registrar inicio de edición:", err.message);
    }
  };

  // 👇 Ejecutar solo una vez al abrir el modal
  if (rubroInicial?.id && !registrado) {
    registrarConsulta();
    setRegistrado(true);
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleGuardar = async () => {
    if (loading) return;
    setLoading(true);
    try {
      await actualizarRubro(rubroInicial.id, formData);

      // 👇 detectar qué campos cambiaron
      const cambios = [];
      if (rubroInicial.rubro !== formData.rubro) {
        cambios.push(`campo: rubro, previo: ${rubroInicial.rubro}, nuevo: ${formData.rubro}`);
      }
      if (rubroInicial.descripcion !== formData.descripcion) {
        cambios.push(`campo: descripcion, previo: ${rubroInicial.descripcion}, nuevo: ${formData.descripcion}`);
      }

      if (cambios.length > 0) {
        try {
          await registrarMovimiento({
            accion: "actualizacion",
            entidad: "rubro",
            campo: cambios.map(c => c.split(",")[0].replace("campo: ", "")).join(", "),
            previo: null,
            nuevo: null,
            detalle: `editó el rubro ${formData.rubro} con id ${rubroInicial.id}, ${cambios.join("; ")}`
          });
        } catch (logError) {
          console.error("❌ Error al registrar logMovimiento de edición:", logError);
        }
      }

      console.log("✅ Rubro editado:", formData);
      onClose();
    } catch (error) {
      console.error("❌ Error al editar rubro:", error);
      onClose();
    } finally {
      setLoading(false);
    }
  };

  if (!rubroInicial) return null;

  return (
    <div className="rubro-editar-overlay">
      <div className="rubro-editar-container">
        <h3 className="rubro-editar-title">Editar Rubro</h3>

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
            {loading ? "Guardando..." : "Guardar"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Editar;