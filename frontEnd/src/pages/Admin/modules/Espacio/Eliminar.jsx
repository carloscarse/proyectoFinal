// proyecto/frontEnd/src/pages/Admin/modules/Espacio/Eliminar.jsx 👁️

import React, { useEffect, useState } from "react";
import "./Eliminar.css";
import { eliminarEspacio } from "../../../../api/espacio.js";
import { registrarMovimiento } from "../../../../api/logMovimiento.js";
import { useUserStore } from "../../../../stores/userStore.js";
import { getEspacioLabel } from "../../../../utils/labels/espacio";
import { getInquilinoLabel } from "../../../../utils/labels/inquilino";
import { getRubroLabel } from "../../../../utils/labels/rubro";
import { obtenerInquilinoPorId } from "../../../../api/inquilino";
import { obtenerRubroPorId } from "../../../../api/rubro";
import { obtenerPersonaPorId } from "../../../../api/persona";
import VerInquilino from "../Inquilino/Ver";
import VerRubro from "../Rubro/Ver";

function Eliminar({ espacio, onClose, onEliminar }) {
  const usuario = useUserStore((state) => state.user);
  const [loading, setLoading] = useState(false);
  const [registrado, setRegistrado] = useState(false);
  
  const [inquilino, setInquilino] = useState(null);
  const [rubro, setRubro] = useState(null);
  const [inquilinoSeleccionado, setInquilinoSeleccionado] = useState(null);
  const [rubroSeleccionado, setRubroSeleccionado] = useState(null);

  useEffect(() => {
    async function registrarInicio() {
      if (!espacio?.id || !usuario?.id) return;
      try {
        await registrarMovimiento({
          usuario: usuario.id,
          accion: "inicio-eliminacion",
          entidad: "espacio",
          campo: "Todos",
          previo: null,
          nuevo: null,
          detalle: `inició el proceso de eliminación del espacio ${getEspacioLabel(espacio)} con id ${espacio.id}`
        });
      } catch (err) {
        console.error("❌ Error al registrar inicio de eliminación:", err.message);
      }
    }

    async function cargarRelaciones() {
      // Consultar inquilino si existe - FIX: cargar persona
      if (espacio?.inquilino) {
        try {
          const inq = await obtenerInquilinoPorId(espacio.inquilino);
          
          let personaCompleta = inq.persona;
          if (inq.persona && typeof inq.persona === 'number') {
            const resPersona = await obtenerPersonaPorId(inq.persona);
            personaCompleta = resPersona.data || resPersona;
          }
          
          setInquilino({...inq, persona: personaCompleta });
        } catch {
          setInquilino(null);
        }
      }

      // Consultar rubro si existe
      if (espacio?.rubro) {
        try {
          const rub = await obtenerRubroPorId(espacio.rubro);
          setRubro(rub);
        } catch {
          setRubro(null);
        }
      }
    }

    if (espacio?.id && !registrado) {
      registrarInicio();
      setRegistrado(true);
      cargarRelaciones();
    }
  }, [espacio, usuario, registrado]);

  const handleEliminar = async () => {
    if (loading || !espacio?.id) return;
    setLoading(true);
    try {
      await eliminarEspacio(espacio.id);

      await registrarMovimiento({
        usuario: usuario?.id || "sistema",
        accion: "baja",
        entidad: "espacio",
        campo: "Todos",
        previo: `espacio: ${getEspacioLabel(espacio)}, precio: ${espacio.precio}`,
        nuevo: null,
        detalle: `eliminó el espacio ${getEspacioLabel(espacio)} con id ${espacio.id}`
      });

      if (onEliminar) onEliminar();
      if (onClose) onClose();
    } catch (err) {
      console.error("❌ Error al eliminar espacio:", err.message);
      onClose();
    } finally {
      setLoading(false);
    }
  };

  if (!espacio) return null;

  return (
    <div className="espacio-eliminar-overlay">
      <div className="espacio-eliminar-container">
        <h3 className="espacio-eliminar-title">Eliminar Espacio</h3>

        <div className="espacio-eliminar-body">
          <div className="espacio-eliminar-card">
            <p><strong>ID:</strong> {espacio.id}</p>
            <p><strong>Nombre:</strong> {espacio.nombre}</p>
            <p><strong>Tipo:</strong> {espacio.tipo}</p>
            <p><strong>Estado:</strong> {espacio.estado}</p>
            <p><strong>Ancho:</strong> {espacio.ancho} m</p>
            <p><strong>Largo:</strong> {espacio.largo} m</p>
            <p><strong>Superficie:</strong> {(espacio.ancho * espacio.largo).toFixed(2)} m²</p>
            <p><strong>Precio:</strong> ${espacio.precio}</p>
            <p><strong>Recargo Ubicación:</strong> ${espacio.recargoUbicacion}</p>
            <p><strong>Descripción:</strong> {espacio.descripcion}</p>
          </div>

          <div className="espacio-eliminar-relaciones">
            {inquilino && (
              <div className="espacio-eliminar-relacion-section">
                <h4 className="espacio-eliminar-relacion-title">Inquilino</h4>
                <table className="espacio-eliminar-objeto-tabla">
                  <thead>
                    <tr>
                      <th>Inquilino</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{getInquilinoLabel(inquilino)}</td>
                      <td className="espacio-eliminar-objeto-acciones">
                        <button 
                          className="espacio-eliminar-objeto-btn-ver"
                          onClick={() => setInquilinoSeleccionado(inquilino)}
                          title="Ver"
                        >
                          👁️
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}

            {rubro && (
              <div className="espacio-eliminar-relacion-section">
                <h4 className="espacio-eliminar-relacion-title">Rubro</h4>
                <table className="espacio-eliminar-objeto-tabla">
                  <thead>
                    <tr>
                      <th>Rubro</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{getRubroLabel(rubro)}</td>
                      <td className="espacio-eliminar-objeto-acciones">
                        <button 
                          className="espacio-eliminar-objeto-btn-ver"
                          onClick={() => setRubroSeleccionado(rubro)}
                          title="Ver"
                        >
                          👁️
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        <div className="espacio-eliminar-buttons">
          <button
            className="espacio-eliminar-btn-cancelar"
            onClick={onClose}
          >
            Cancelar
          </button>
          <button
            className="espacio-eliminar-btn-eliminar"
            onClick={handleEliminar}
            disabled={loading}
          >
            {loading ? "Eliminando..." : "Eliminar"}
          </button>
        </div>
      </div>

      {inquilinoSeleccionado && (
        <VerInquilino
          inquilino={inquilinoSeleccionado}
          onClose={() => setInquilinoSeleccionado(null)}
        />
      )}
      {rubroSeleccionado && (
        <VerRubro
          rubro={rubroSeleccionado}
          onClose={() => setRubroSeleccionado(null)}
        />
      )}
    </div>
  );
}

export default Eliminar;