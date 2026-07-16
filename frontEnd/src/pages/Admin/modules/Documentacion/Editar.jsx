// proyecto/frontEnd/src/pages/Admin/modules/Documentacion/Editar.jsx 👁️ ✏️ 🗑️

import React, { useState, useEffect } from "react";
import "./Editar.css";
import { useUserStore } from "../../../../stores/userStore";
import { registrarMovimiento } from "../../../../api/logMovimiento";
import { getDocumentacionLabel } from "../../../../utils/labels/documentacion";
import { getInquilinoLabel } from "../../../../utils/labels/inquilino";
import { obtenerInquilinoPorId } from "../../../../api/inquilino";
import { obtenerPersonaPorId } from "../../../../api/persona";
import { commitEditar } from "./commitEditar";
import VerArchivo from "./VerArchivo";
import InquilinoAgregarObjeto from "../Inquilino/AgregarObjeto";
import VerObjetoInquilino from "../Inquilino/VerObjeto";
import EditarObjetoInquilino from "../Inquilino/EditarObjeto";
import EliminarObjetoInquilino from "../Inquilino/EliminarObjeto";

function Editar({ documentacionInicial, onClose }) {
  const [formData, setFormData] = useState({
    documento: documentacionInicial?.documento || "",
    descripcion: documentacionInicial?.descripcion || "",
    emision: documentacionInicial?.emision?.split('T')[0] || "",
    vencimiento: documentacionInicial?.vencimiento?.split('T')[0] || "",
    fechaPresentacion: documentacionInicial?.fechaPresentacion?.split('T')[0] || ""
  });

  const [archivoFile, setArchivoFile] = useState(null);
  const [inquilino, setInquilino] = useState(null);

  // Modales
  const [mostrarArchivo, setMostrarArchivo] = useState(false);
  const [showInquilinoModal, setShowInquilinoModal] = useState(false);
  const [inquilinoSeleccionado, setInquilinoSeleccionado] = useState(null);
  const [inquilinoEditando, setInquilinoEditando] = useState(null);
  const [inquilinoEliminando, setInquilinoEliminando] = useState(null);

  const [loading, setLoading] = useState(false);
  const usuario = useUserStore((state) => state.user);

  useEffect(() => {
    async function registrarInicioEdicion() {
      if (!documentacionInicial?.id ||!usuario?.id) return;
      try {
        await registrarMovimiento({
          usuario: usuario.id,
          accion: "inicio-edicion",
          entidad: "documentacion",
          campo: "Todos",
          previo: null,
          nuevo: null,
          detalle: `inició el proceso de edición de la documentación ${getDocumentacionLabel(documentacionInicial)} con id ${documentacionInicial.id}`
        });
      } catch (err) {
        console.error("❌ Error al registrar inicio de edición:", err.message);
      }
    }

    async function cargarDatos() {
      try {
        if (documentacionInicial?.inquilino) {
          const inqActual = await obtenerInquilinoPorId(documentacionInicial.inquilino);
          
          // Fix: cargar persona si viene como ID
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
      } catch (err) {
        console.error("❌ Error cargando datos:", err.message);
        setInquilino(null);
      }
    }

    if (documentacionInicial?.id) {
      registrarInicioEdicion();
      cargarDatos();
    }
  }, [documentacionInicial, usuario]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setArchivoFile(file);
      setFormData({...formData, documento: file.name });
    }
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

  const handleGuardar = async () => {
    if (loading) return;
    setLoading(true);
    try {
      await commitEditar(
        formData, 
        documentacionInicial.id, 
        inquilino, 
        archivoFile,
        (p) => {
          console.log("✅ Documentación editada:", p);
        }
      );
      onClose();
    } catch (error) {
      console.error("❌ Error al editar documentación:", error);
      onClose();
    } finally {
      setLoading(false);
    }
  };

  if (!documentacionInicial) return null;

  return (
    <div className="documentacion-editar-overlay">
      <div className="documentacion-editar-container">
        <h3 className="documentacion-editar-title">Editar Documentación</h3>

        <div className="documentacion-editar-scroll">
          <div className="documentacion-editar-body">
            <label>Documento:
              <div className="documentacion-editar-file-row">
                <input 
                  type="file" 
                  onChange={handleFileChange}
                  accept=".pdf,.jpg,.jpeg,.png,.webp"
                />
                {formData.documento &&!archivoFile && (
                  <button 
                    type="button"
                    className="documentacion-editar-btn-ver-archivo"
                    onClick={() => setMostrarArchivo(true)}
                  >
                    Ver actual
                  </button>
                )}
              </div>
              {archivoFile && (
                <span className="documentacion-editar-file-name">
                  Nuevo: {archivoFile.name}
                </span>
              )}
            </label>

            <label>Descripción:
              <textarea 
                name="descripcion" 
                value={formData.descripcion} 
                onChange={handleChange} 
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

            {/* Inquilino */}
            <div className="documentacion-editar-relacion">
              <div className="documentacion-editar-relacion-header">
                <label>Inquilino</label>
                {(!inquilino || inquilino.eliminado) && (
                  <button 
                    className="documentacion-editar-btn-nueva" 
                    onClick={() => setShowInquilinoModal(true)}
                  >
                    + Agregar
                  </button>
                )}
              </div>
              {inquilino &&!inquilino.eliminado && (
                <div className="documentacion-editar-objeto-fila">
                  <span>
                    {getInquilinoLabel(inquilino)}
                    {inquilino.nuevo && " (nuevo)"}
                    {inquilino.editado && " (editado)"}
                  </span>
                  <div className="documentacion-editar-acciones">
                    <button 
                      className="documentacion-editar-btn-ver" 
                      onClick={() => setInquilinoSeleccionado(inquilino)}
                      title="Ver"
                    >
                      👁️
                    </button>
                    <button 
                      className="documentacion-editar-btn-editar" 
                      onClick={() => setInquilinoEditando(inquilino)}
                      title="Editar"
                    >
                      ✏️
                    </button>
                    <button 
                      className="documentacion-editar-btn-eliminar" 
                      onClick={() => setInquilinoEliminando(inquilino)}
                      title="Eliminar"
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              )}
            </div>
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

      {/* Modal de ver archivo */}
      {mostrarArchivo && (
        <VerArchivo
          archivo={formData.documento}
          onClose={() => setMostrarArchivo(false)}
        />
      )}

      {/* Modales de inquilino */}
      {showInquilinoModal && (
        <InquilinoAgregarObjeto
          onClose={() => setShowInquilinoModal(false)}
          onGuardar={handleAgregarInquilino}
        />
      )}

      {inquilinoSeleccionado && (
        <VerObjetoInquilino
          inquilino={inquilinoSeleccionado}
          onClose={() => setInquilinoSeleccionado(null)}
        />
      )}

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
    </div>
  );
}

export default Editar;