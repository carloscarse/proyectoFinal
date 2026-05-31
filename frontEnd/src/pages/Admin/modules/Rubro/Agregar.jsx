// proyecto/frontEnd/src/pages/Admin/modules/Rubro/Agregar.jsx

import React, { useState } from "react";
import "./Agregar.css";
import { useUserStore } from "../../../../stores/userStore.js";
import { agregarRubro } from "../../../../api/rubro.js";
import { registrarMovimiento } from "../../../../api/logMovimiento.js"; // 👈 importamos el log

function AgregarRubro({ onClose, onGuardado }) {
  const [formData, setFormData] = useState({
    rubro: "",
    descripcion: ""
  });

  const [loading, setLoading] = useState(false);
  const usuario = useUserStore((state) => state.user);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleGuardar = async () => {
    if (loading) return;
    setLoading(true);
    try {
      // 👇 primero guardamos el rubro en el backend
      const nuevoRubro = await agregarRubro(formData);

      // 👇 luego registramos el movimiento de alta
      if (usuario) {
        try {
          await registrarMovimiento({
            accion: "alta",
            entidad: "rubro",
            campo: "Todos",
            previo: null,
            nuevo: nuevoRubro.rubro,
            detalle: `agregó el registro ${nuevoRubro.rubro} en rubro con id ${nuevoRubro.id}`
          });
        } catch (logError) {
          console.error("❌ Error al registrar logMovimiento:", logError);
        }
      }

      if (onGuardado) onGuardado(nuevoRubro);
      onClose();
    } catch (error) {
      console.error("❌ Error al guardar rubro:", error);
      onClose();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rubro-agregar-overlay">
      <div className="rubro-agregar-container">
        <h3 className="rubro-agregar-title">Nuevo Rubro</h3>

        <div className="rubro-agregar-body">
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

        <div className="rubro-agregar-form-buttons">
          <button
            className="rubro-agregar-btn-cancelar"
            onClick={onClose}
          >
            Cancelar
          </button>
          <button
            className="rubro-agregar-btn-guardar"
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

export default AgregarRubro;