// proyecto/frontEnd/src/pages/Admin/modules/Persona/Editar.jsx

import React, { useState, useEffect } from "react";
import "./Editar.css";
import { useUserStore } from "../../../../stores/userStore";
import EditarListaDireccion from "./EditarListaDireccion";
import EditarListaTelefono from "./EditarListaTelefono";
import DireccionAgregarObjeto from "../Direccion/AgregarObjeto";
import TelefonoAgregarObjeto from "../Telefono/AgregarObjeto";
import VerObjetoDireccion from "../Direccion/VerObjeto";
import VerObjetoTelefono from "../Telefono/VerObjeto";
import EditarObjetoDireccion from "../Direccion/EditarObjeto";
import EditarObjetoTelefono from "../Telefono/EditarObjeto";
import EliminarObjetoDireccion from "../Direccion/EliminarObjeto";
import EliminarObjetoTelefono from "../Telefono/EliminarObjeto";
import { obtenerDireccionPorPersona } from "../../../../api/direccion";
import { obtenerTelefonoPorPersona } from "../../../../api/telefono";
import { registrarMovimiento } from "../../../../api/logMovimiento";
import { commitEditar } from "./commitEditar";

function Editar({ personaInicial, onClose }) {
  const [formData, setFormData] = useState({
    nombre: personaInicial?.nombre || "",
    segundoNombre: personaInicial?.segundoNombre || "",
    apellido: personaInicial?.apellido || "",
    segundoApellido: personaInicial?.segundoApellido || "",
    documento: personaInicial?.documento || "",
    nacimiento: personaInicial?.nacimiento || "",
    sexo: personaInicial?.sexo || "",
    email: personaInicial?.email || ""
  });

  const [direcciones, setDirecciones] = useState([]);
  const [telefonos, setTelefonos] = useState([]);

  // Modales
  const [showDireccionModal, setShowDireccionModal] = useState(false);
  const [showTelefonoModal, setShowTelefonoModal] = useState(false);
  const [direccionSeleccionada, setDireccionSeleccionada] = useState(null);
  const [telefonoSeleccionado, setTelefonoSeleccionado] = useState(null);
  const [direccionEditando, setDireccionEditando] = useState(null);
  const [telefonoEditando, setTelefonoEditando] = useState(null);
  const [direccionEliminando, setDireccionEliminando] = useState(null);
  const [telefonoEliminando, setTelefonoEliminando] = useState(null);

  const [loading, setLoading] = useState(false);
  const usuario = useUserStore((state) => state.user);

  useEffect(() => {
    async function registrarInicioEdicion() {
      if (!personaInicial?.id || !usuario?.id) return;
      try {
        await registrarMovimiento({
          usuario: usuario.id,
          accion: "inicio-edicion",
          entidad: "persona",
          campo: "Todos",
          previo: null,
          nuevo: null,
          detalle: `inició el proceso de edición de la persona ${getPersonaLabel(personaInicial)} con id ${personaInicial.id}`
        });
      } catch (err) {
        console.error("❌ Error al registrar inicio de edición:", err.message);
      }
    }

    if (personaInicial?.id) {
      registrarInicioEdicion();

      obtenerDireccionPorPersona(personaInicial.id)
        .then(dirs => setDirecciones(dirs.map(d => ({ ...d, nuevo: false, editado: false, eliminado: false }))))
        .catch(() => setDirecciones([]));

      obtenerTelefonoPorPersona(personaInicial.id)
        .then(tels => setTelefonos(tels.map(t => ({ ...t, nuevo: false, editado: false, eliminado: false }))))
        .catch(() => setTelefonos([]));
    }
  }, [personaInicial, usuario]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAgregarDireccion = (direccion) => {
    setDirecciones([...direcciones, { ...direccion, nuevo: true }]);
  };
  const handleAgregarTelefono = (telefono) => {
    setTelefonos([...telefonos, { ...telefono, nuevo: true }]);
  };

  const handleGuardar = async () => {
    if (loading) return;
    setLoading(true);
    try {
      await commitEditar(formData, personaInicial.id, direcciones, telefonos, (p) => {
        console.log("✅ Persona editada:", p);
      });
      onClose();
    } catch (error) {
      console.error("❌ Error al editar persona:", error);
      onClose();
    } finally {
      setLoading(false);
    }
  };

  if (!personaInicial) return null;
  return (
    <div className="persona-editar-overlay">
      <div className="persona-editar-container">
        <h3 className="persona-editar-title">Editar Persona</h3>

        {/* Contenedor con scroll que agrupa todo */}
        <div className="persona-editar-scroll">
          <div className="persona-editar-body">
            <label>Nombre:
              <input type="text" name="nombre" value={formData.nombre} onChange={handleChange} />
            </label>
            <label>Segundo Nombre:
              <input type="text" name="segundoNombre" value={formData.segundoNombre} onChange={handleChange} />
            </label>
            <label>Apellido:
              <input type="text" name="apellido" value={formData.apellido} onChange={handleChange} />
            </label>
            <label>Segundo Apellido:
              <input type="text" name="segundoApellido" value={formData.segundoApellido} onChange={handleChange} />
            </label>
            <label>Documento:
              <input type="text" name="documento" value={formData.documento} onChange={handleChange} />
            </label>
            <label>Email:
              <input type="text" name="email" value={formData.email} onChange={handleChange} />
            </label>
          </div>

          <div className="persona-editar-relaciones">
            <div className="persona-editar-relacion-section">
              <div className="persona-editar-relacion-header">
                <h4 className="persona-editar-relacion-title">Direcciones</h4>
                <button 
                  className="persona-editar-btn-nueva" 
                  onClick={() => setShowDireccionModal(true)}
                >
                  + Nueva Dirección
                </button>
              </div>
              <EditarListaDireccion
                direcciones={direcciones.filter(d => !d.eliminado)}
                onVer={(dir) => setDireccionSeleccionada(dir)}
                onEditar={(dir) => setDireccionEditando(dir)}
                onEliminar={(dir) => setDireccionEliminando(dir)}
              />
            </div>

            <div className="persona-editar-relacion-section">
              <div className="persona-editar-relacion-header">
                <h4 className="persona-editar-relacion-title">Teléfonos</h4>
                <button 
                  className="persona-editar-btn-nueva" 
                  onClick={() => setShowTelefonoModal(true)}
                >
                  + Nuevo Teléfono
                </button>
              </div>
              <EditarListaTelefono
                telefonos={telefonos.filter(t => !t.eliminado)}
                onVer={(tel) => setTelefonoSeleccionado(tel)}
                onEditar={(tel) => setTelefonoEditando(tel)}
                onEliminar={(tel) => setTelefonoEliminando(tel)}
              />
            </div>
          </div>
        </div>

        {/* Botones fuera del scroll */}
        <div className="persona-editar-form-buttons">
          <button 
            className="persona-editar-btn-cancelar" 
            onClick={onClose}
          >
            Cancelar
          </button>
          <button 
            className="persona-editar-btn-guardar" 
            onClick={handleGuardar} 
            disabled={loading}
          >
            {loading ? "Guardando..." : "Guardar"}
          </button>
        </div>
      </div>

      {/* Modales de agregar */}
      {showDireccionModal && (
        <DireccionAgregarObjeto
          onClose={() => setShowDireccionModal(false)}
          onGuardar={handleAgregarDireccion}
        />
      )}
      {showTelefonoModal && (
        <TelefonoAgregarObjeto
          onClose={() => setShowTelefonoModal(false)}
          onGuardar={handleAgregarTelefono}
        />
      )}

      {/* Modales de ver */}
      {direccionSeleccionada && (
        <VerObjetoDireccion
          direccion={direccionSeleccionada}
          onClose={() => setDireccionSeleccionada(null)}
        />
      )}
      {telefonoSeleccionado && (
        <VerObjetoTelefono
          telefono={telefonoSeleccionado}
          onClose={() => setTelefonoSeleccionado(null)}
        />
      )}

      {/* Modales de editar */}
      {direccionEditando && (
        <EditarObjetoDireccion
          direccion={direccionEditando}
          onGuardar={(d) => {
            setDirecciones(direcciones.map(x =>
              x.id === d.id ? { ...x, ...d, editado: true } : x
            ));
            setDireccionEditando(null);
          }}
          onClose={() => setDireccionEditando(null)}
        />
      )}
      {telefonoEditando && (
        <EditarObjetoTelefono
          telefono={telefonoEditando}
          onGuardar={(t) => {
            setTelefonos(telefonos.map(x =>
              x.id === t.id ? { ...x, ...t, editado: true } : x
            ));
            setTelefonoEditando(null);
          }}
          onClose={() => setTelefonoEditando(null)}
        />
      )}

      {/* Modales de eliminar */}
      {direccionEliminando && (
        <EliminarObjetoDireccion
          direccion={direccionEliminando}
          onEliminar={(direccion) => {
            setDirecciones(direcciones.map(d => 
              d.id === direccion.id ? { ...d, eliminado: true } : d
            ));
            setDireccionEliminando(null);
          }}
          onClose={() => setDireccionEliminando(null)}
        />
      )}
      {telefonoEliminando && (
        <EliminarObjetoTelefono
          telefono={telefonoEliminando}
          onEliminar={(telefono) => {
            setTelefonos(telefonos.map(t => 
              t.id === telefono.id ? { ...t, eliminado: true } : t
            ));
            setTelefonoEliminando(null);
          }}
          onClose={() => setTelefonoEliminando(null)}
        />
      )}
    </div>
  );
}

export default Editar;