// proyecto/frontEnd/src/pages/Admin/modules/Persona/AgregarObjeto.jsx

import React, { useState } from "react";
import "./Agregar.css";
import AgregarListaDireccion from "./AgregarListaDireccion";
import AgregarListaTelefono from "./AgregarListaTelefono";
import DireccionAgregarObjeto from "../Direccion/AgregarObjeto";
import TelefonoAgregarObjeto from "../Telefono/AgregarObjeto";
import VerObjetoDireccion from "../Direccion/VerObjeto";
import VerObjetoTelefono from "../Telefono/VerObjeto";
import EditarObjetoDireccion from "../Direccion/EditarObjeto";
import EditarObjetoTelefono from "../Telefono/EditarObjeto";
import EliminarObjetoDireccion from "../Direccion/EliminarObjeto";
import EliminarObjetoTelefono from "../Telefono/EliminarObjeto";

let nextDireccionId = 0;
let nextTelefonoId = 0;

function PersonaAgregarObjeto({ onClose, onGuardar }) {
  const [formData, setFormData] = useState({
    nombre: "",
    segundoNombre: "",
    apellido: "",
    segundoApellido: "",
    documento: "",
    nacimiento: "",
    sexo: "",
    email: ""
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Direcciones
  const handleAgregarDireccion = (direccion) => {
    setDirecciones([...direcciones, { ...direccion, id: nextDireccionId++ }]);
  };
  const handleEditarDireccion = (direccion) => setDireccionEditando(direccion);
  const handleEliminarDireccion = (direccion) => setDireccionEliminando(direccion);

  // Teléfonos
  const handleAgregarTelefono = (telefono) => {
    setTelefonos([...telefonos, { ...telefono, id: nextTelefonoId++ }]);
  };
  const handleEditarTelefono = (telefono) => setTelefonoEditando(telefono);
  const handleEliminarTelefono = (telefono) => setTelefonoEliminando(telefono);
  const handleGuardar = () => {
    // 👇 en vez de persistir, devolvemos un objeto temporal
    const personaTemp = {
      ...formData,
      direcciones,
      telefonos,
      nuevo: true,
      editado: false,
      eliminado: false
    };
    if (onGuardar) onGuardar(personaTemp);
    onClose();
  };

  return (
    <div className="persona-agregar-overlay">
      <div className="persona-agregar-container">
        <h3 className="persona-agregar-title">Nueva Persona</h3>

        <div className="persona-agregar-body">
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
          <label>Nacimiento:
            <input type="date" name="nacimiento" value={formData.nacimiento} onChange={handleChange} />
          </label>
          <label>Sexo:
            <input type="text" name="sexo" value={formData.sexo} onChange={handleChange} />
          </label>
          <label>Email:
            <input type="email" name="email" value={formData.email} onChange={handleChange} />
          </label>

          <div className="persona-agregar-relaciones">
            <div className="persona-agregar-relacion-section">
              <div className="persona-agregar-relacion-header">
                <h4 className="persona-agregar-relacion-title">Direcciones</h4>
                <button 
                  className="persona-agregar-btn-nueva" 
                  onClick={() => setShowDireccionModal(true)}
                >
                  + Nueva Dirección
                </button>
              </div>
              <AgregarListaDireccion
                direcciones={direcciones}
                onVer={(dir) => setDireccionSeleccionada(dir)}
                onEditar={handleEditarDireccion}
                onEliminar={handleEliminarDireccion}
              />
            </div>

            <div className="persona-agregar-relacion-section">
              <div className="persona-agregar-relacion-header">
                <h4 className="persona-agregar-relacion-title">Teléfonos</h4>
                <button 
                  className="persona-agregar-btn-nueva" 
                  onClick={() => setShowTelefonoModal(true)}
                >
                  + Nuevo Teléfono
                </button>
              </div>
              <AgregarListaTelefono
                telefonos={telefonos}
                onVer={(tel) => setTelefonoSeleccionado(tel)}
                onEditar={handleEditarTelefono}
                onEliminar={handleEliminarTelefono}
              />
            </div>
          </div>
        </div>

        <div className="persona-agregar-form-buttons">
          <button 
            className="persona-agregar-btn-cancelar" 
            onClick={onClose}
          >
            Cancelar
          </button>
          <button 
            className="persona-agregar-btn-guardar" 
            onClick={handleGuardar}
          >
            Guardar
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
            setDirecciones(direcciones.map(x => x.id === d.id ? d : x));
            setDireccionEditando(null);
          }}
          onClose={() => setDireccionEditando(null)}
        />
      )}
      {telefonoEditando && (
        <EditarObjetoTelefono
          telefono={telefonoEditando}
          onGuardar={(t) => {
            setTelefonos(telefonos.map(x => x.id === t.id ? t : x));
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
            setDirecciones(direcciones.filter(d => d.id !== direccion.id));
            setDireccionEliminando(null);
          }}
          onClose={() => setDireccionEliminando(null)}
        />
      )}
      {telefonoEliminando && (
        <EliminarObjetoTelefono
          telefono={telefonoEliminando}
          onEliminar={(telefono) => {
            setTelefonos(telefonos.filter(t => t.id !== telefono.id));
            setTelefonoEliminando(null);
          }}
          onClose={() => setTelefonoEliminando(null)}
        />
      )}
    </div>
  );
}

export default PersonaAgregarObjeto;