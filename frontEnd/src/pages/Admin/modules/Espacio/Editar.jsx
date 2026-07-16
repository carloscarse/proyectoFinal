// proyecto/frontEnd/src/pages/Admin/modules/Espacio/Editar.jsx 👁️ ✏️ 🗑️

import React, { useState, useEffect } from "react";
import "./Editar.css";
import { useUserStore } from "../../../../stores/userStore";
import { registrarMovimiento } from "../../../../api/logMovimiento";
import { getEspacioLabel } from "../../../../utils/labels/espacio";
import { getInquilinoLabel } from "../../../../utils/labels/inquilino";
import { getRubroLabel } from "../../../../utils/labels/rubro";
import { obtenerInquilinoPorId } from "../../../../api/inquilino";
import { obtenerRubroPorId } from "../../../../api/rubro";
import { obtenerPersonaPorId } from "../../../../api/persona"; // AGREGAR ESTE IMPORT
import { commitEditar } from "./commitEditar";
import InquilinoAgregarObjeto from "../Inquilino/AgregarObjeto";
import RubroAgregarObjeto from "../Rubro/AgregarObjeto";
import VerObjetoInquilino from "../Inquilino/VerObjeto";
import VerObjetoRubro from "../Rubro/VerObjeto";
import EditarObjetoInquilino from "../Inquilino/EditarObjeto";
import EditarObjetoRubro from "../Rubro/EditarObjeto";
import EliminarObjetoInquilino from "../Inquilino/EliminarObjeto";
import EliminarObjetoRubro from "../Rubro/EliminarObjeto";

function Editar({ espacioInicial, onClose }) {
  const [formData, setFormData] = useState({
    nombre: espacioInicial?.nombre || "",
    tipo: espacioInicial?.tipo || "",
    estado: espacioInicial?.estado || "libre",
    ancho: espacioInicial?.ancho || "",
    largo: espacioInicial?.largo || "",
    precio: espacioInicial?.precio || "",
    recargoUbicacion: espacioInicial?.recargoUbicacion || "",
    descripcion: espacioInicial?.descripcion || ""
  });

  const [inquilino, setInquilino] = useState(null);
  const [rubro, setRubro] = useState(null);

  // Modales
  const [showInquilinoModal, setShowInquilinoModal] = useState(false);
  const [showRubroModal, setShowRubroModal] = useState(false);
  const [inquilinoSeleccionado, setInquilinoSeleccionado] = useState(null);
  const [rubroSeleccionado, setRubroSeleccionado] = useState(null);
  const [inquilinoEditando, setInquilinoEditando] = useState(null);
  const [rubroEditando, setRubroEditando] = useState(null);
  const [inquilinoEliminando, setInquilinoEliminando] = useState(null);
  const [rubroEliminando, setRubroEliminando] = useState(null);

  const [loading, setLoading] = useState(false);
  const usuario = useUserStore((state) => state.user);

  useEffect(() => {
    async function registrarInicioEdicion() {
      if (!espacioInicial?.id ||!usuario?.id) return;
      try {
        await registrarMovimiento({
          usuario: usuario.id,
          accion: "inicio-edicion",
          entidad: "espacio",
          campo: "Todos",
          previo: null,
          nuevo: null,
          detalle: `inició el proceso de edición del espacio ${getEspacioLabel(espacioInicial)} con id ${espacioInicial.id}`
        });
      } catch (err) {
        console.error("❌ Error al registrar inicio de edición:", err.message);
      }
    }

    async function cargarDatos() {
      try {
        // Cargar inquilino actual si existe - FIX: cargar persona
        if (espacioInicial?.inquilino) {
          const inqActual = await obtenerInquilinoPorId(espacioInicial.inquilino);
          
          // Si persona viene como ID, la cargamos
          let personaCompleta = inqActual.persona;
          if (inqActual.persona && typeof inqActual.persona === 'number') {
            const resPersona = await obtenerPersonaPorId(inqActual.persona);
            personaCompleta = resPersona.data || resPersona;
          }
          
          setInquilino({
           ...inqActual, 
            persona: personaCompleta,
            nuevo: false, 
            editado: false, 
            eliminado: false 
          });
        }

        // Cargar rubro actual si existe
        if (espacioInicial?.rubro) {
          const rubActual = await obtenerRubroPorId(espacioInicial.rubro);
          setRubro({...rubActual, nuevo: false, editado: false, eliminado: false });
        }
      } catch (err) {
        console.error("❌ Error cargando datos:", err.message);
      }
    }

    if (espacioInicial?.id) {
      registrarInicioEdicion();
      cargarDatos();
    }
  }, [espacioInicial, usuario]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({...formData, [name]: value });
  };

  const handleAgregarInquilino = (nuevoInquilino) => {
    const inquilinoTemporal = {
   ...nuevoInquilino, 
      nuevo: true, 
      editado: false, 
      eliminado: false,
      persona: nuevoInquilino.persona || {
        nombre: nuevoInquilino.nombre || "",
        segundoNombre: nuevoInquilino.segundoNombre || "",
        apellido: nuevoInquilino.apellido || "",
        segundoApellido: nuevoInquilino.segundoApellido || "",
        documento: nuevoInquilino.documento || ""
      }
    };
    setInquilino(inquilinoTemporal);
    setShowInquilinoModal(false);
  };

  const handleAgregarRubro = (nuevoRubro) => {
    const rubroTemporal = {
   ...nuevoRubro,
      nuevo: true,
      editado: false,
      eliminado: false,
      rubro: nuevoRubro.rubro || nuevoRubro.nombre || ""
    };
    setRubro(rubroTemporal);
    setShowRubroModal(false);
  };

  const handleGuardar = async () => {
    if (loading) return;
    setLoading(true);
    try {
      await commitEditar(formData, espacioInicial.id, inquilino, rubro, (p) => {
        console.log("✅ Espacio editado:", p);
      });
      onClose();
    } catch (error) {
      console.error("❌ Error al editar espacio:", error);
      onClose();
    } finally {
      setLoading(false);
    }
  };

  if (!espacioInicial) return null;

  return (
    <div className="espacio-editar-overlay">
      <div className="espacio-editar-container">
        <h3 className="espacio-editar-title">Editar Espacio</h3>

        <div className="espacio-editar-scroll">
          <div className="espacio-editar-body">
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

            {/* Inquilino */}
            <div className="espacio-editar-relacion">
              <div className="espacio-editar-relacion-header">
                <label>Inquilino</label>
                {(!inquilino || inquilino.eliminado) && (
                  <button 
                    className="espacio-editar-btn-nueva" 
                    onClick={() => setShowInquilinoModal(true)}
                  >
                    + Agregar
                  </button>
                )}
              </div>
              {inquilino &&!inquilino.eliminado && (
                <div className="espacio-editar-objeto-fila">
                  <span>
                    {getInquilinoLabel(inquilino)}
                    {inquilino.nuevo && " (nuevo)"}
                    {inquilino.editado && " (editado)"}
                  </span>
                  <div className="espacio-editar-acciones">
                    <button className="espacio-editar-btn-ver" onClick={() => setInquilinoSeleccionado(inquilino)}>👁️</button>
                    <button className="espacio-editar-btn-editar" onClick={() => setInquilinoEditando(inquilino)}>✏️</button>
                    <button className="espacio-editar-btn-eliminar" onClick={() => setInquilinoEliminando(inquilino)}>🗑️</button>
                  </div>
                </div>
              )}
            </div>

            {/* Rubro */}
            <div className="espacio-editar-relacion">
              <div className="espacio-editar-relacion-header">
                <label>Rubro</label>
                {(!rubro || rubro.eliminado) && (
                  <button 
                    className="espacio-editar-btn-nueva" 
                    onClick={() => setShowRubroModal(true)}
                  >
                    + Agregar
                  </button>
                )}
              </div>
              {rubro &&!rubro.eliminado && (
                <div className="espacio-editar-objeto-fila">
                  <span>
                    {getRubroLabel(rubro)}
                    {rubro.nuevo && " (nuevo)"}
                    {rubro.editado && " (editado)"}
                  </span>
                  <div className="espacio-editar-acciones">
                    <button className="espacio-editar-btn-ver" onClick={() => setRubroSeleccionado(rubro)}>👁</button>
                    <button className="espacio-editar-btn-editar" onClick={() => setRubroEditando(rubro)}>✏</button>
                    <button className="espacio-editar-btn-eliminar" onClick={() => setRubroEliminando(rubro)}>🗑</button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="espacio-editar-form-buttons">
          <button
            className="espacio-editar-btn-cancelar"
            onClick={onClose}
          >
            Cancelar
          </button>
          <button
            className="espacio-editar-btn-guardar"
            onClick={handleGuardar}
            disabled={loading}
          >
            {loading? "Guardando..." : "Guardar"}
          </button>
        </div>
      </div>

      {/* Modales de agregar */}
      {showInquilinoModal && (
        <InquilinoAgregarObjeto
          onClose={() => setShowInquilinoModal(false)}
          onGuardar={handleAgregarInquilino}
        />
      )}
      {showRubroModal && (
        <RubroAgregarObjeto
          onClose={() => setShowRubroModal(false)}
          onGuardar={handleAgregarRubro}
        />
      )}

      {/* Modales de ver */}
      {inquilinoSeleccionado && (
        <VerObjetoInquilino
          inquilino={inquilinoSeleccionado}
          onClose={() => setInquilinoSeleccionado(null)}
        />
      )}
      {rubroSeleccionado && (
        <VerObjetoRubro
          rubro={rubroSeleccionado}
          onClose={() => setRubroSeleccionado(null)}
        />
      )}

      {/* Modales de editar */}
      {inquilinoEditando && (
        <EditarObjetoInquilino
          inquilino={inquilinoEditando}
          onGuardar={(d) => {
            setInquilino({...inquilinoEditando,...d, editado: true });
            setInquilinoEditando(null);
          }}
          onClose={() => setInquilinoEditando(null)}
        />
      )}
      {rubroEditando && (
        <EditarObjetoRubro
          rubro={rubroEditando}
          onGuardar={(d) => {
            setRubro({...rubroEditando,...d, editado: true });
            setRubroEditando(null);
          }}
          onClose={() => setRubroEditando(null)}
        />
      )}

      {/* Modales de eliminar */}
      {inquilinoEliminando && (
        <EliminarObjetoInquilino
          inquilino={inquilinoEliminando}
          onEliminar={() => {
            setInquilino({...inquilinoEliminando, eliminado: true });
            setInquilinoEliminando(null);
          }}
          onClose={() => setInquilinoEliminando(null)}
        />
      )}
      {rubroEliminando && (
        <EliminarObjetoRubro
          rubro={rubroEliminando}
          onEliminar={() => {
            setRubro({...rubroEliminando, eliminado: true });
            setRubroEliminando(null);
          }}
          onClose={() => setRubroEliminando(null)}
        />
      )}
    </div>
  );
}

export default Editar;