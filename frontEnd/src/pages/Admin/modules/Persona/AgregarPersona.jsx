import React, { useState } from 'react';
import './ListaPersona.css';

import NuevaDireccion from '../Direccion/NuevaDireccion';
import VerDireccion from '../Direccion/VerDireccion';

import AgregarTelefono from '../telefono/AgregarTelefono';
import VerTelefono from '../telefono/VerTelefono';
import EditarTelefono from '../telefono/EditarTelefono';

import { getDireccionLabel } from '../../../../utils/labels/direccion';

// 👉 importar API de teléfono
import { createTelefono } from '../../../../api/telefono';

function AgregarPersona({ onClose, onSave, token }) {
  const [formData, setFormData] = useState({
    nombre: '',
    segundoNombre: '',
    apellido: '',
    segundoApellido: '',
    documento: '',
    nacimiento: '',
    sexo: '',
    email: ''
  });

  // Direcciones
  const [direcciones, setDirecciones] = useState([]);
  const [showNuevaDireccion, setShowNuevaDireccion] = useState(false);
  const [direccionVer, setDireccionVer] = useState(null);

  // Teléfonos
  const [telefonos, setTelefonos] = useState([]);
  const [showNuevoTelefono, setShowNuevoTelefono] = useState(false);
  const [telefonoVer, setTelefonoVer] = useState(null);
  const [telefonoEditar, setTelefonoEditar] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (onSave) {
      // 👉 Guardar persona en BD
      const nuevaPersona = await onSave({ ...formData, direcciones, telefonos });

      // 👉 Refrescar teléfonos desde BD si se guardaron
      if (nuevaPersona?.id) {
        try {
          const telGuardados = await Promise.all(
            telefonos.map(t => createTelefono(nuevaPersona.id, t, token))
          );
          setTelefonos(telGuardados);
        } catch (err) {
          console.error('❌ Error al refrescar teléfonos:', err.message);
        }
      }
    }
    onClose();
  };

  // Direcciones
  const handleAgregarDireccion = (personaId, nuevaDireccion) => {
    setDirecciones(prev => [...prev, nuevaDireccion]);
    setShowNuevaDireccion(false);
  };
  const handleEliminarDireccion = (id) => {
    setDirecciones(prev => prev.filter(d => d.id !== id));
  };

  // Teléfonos
  const handleAgregarTelefono = async (personaId, nuevoTelefono) => {
    try {
      // 👉 Guardar teléfono en BD si ya existe persona
      if (personaId) {
        const telGuardado = await createTelefono(personaId, nuevoTelefono, token);
        setTelefonos(prev => [...prev, telGuardado]);
      } else {
        // 👉 Si aún no existe persona, solo agregar en memoria
        const tempId = `tmp-${Date.now()}`;
        setTelefonos(prev => [...prev, { ...nuevoTelefono, id: tempId }]);
      }
      setShowNuevoTelefono(false);
    } catch (err) {
      console.error('❌ Error al guardar teléfono:', err.message);
    }
  };

  const handleEliminarTelefono = (id) => {
    setTelefonos(prev => prev.filter(t => t.id !== id));
  };

  const handleEditarTelefono = (id, datosActualizados) => {
    setTelefonos(prev =>
      prev.map(t => (t.id === id ? { ...t, ...datosActualizados } : t))
    );
    setTelefonoEditar(null);
  };

  return (
    <div className="modal-overlay">
      <div className="usuarios-form-wrapper">
        <form className="usuarios-form" onSubmit={handleSubmit}>
          <h3 className="text-center mb-3">Nueva Persona</h3>

          <div className="form-scroll">
            {/* Campos de persona */}
            <input type="text" name="nombre" placeholder="Nombre" value={formData.nombre} onChange={handleChange} />
            <input type="text" name="segundoNombre" placeholder="Segundo Nombre" value={formData.segundoNombre} onChange={handleChange} />
            <input type="text" name="apellido" placeholder="Apellido" value={formData.apellido} onChange={handleChange} />
            <input type="text" name="segundoApellido" placeholder="Segundo Apellido" value={formData.segundoApellido} onChange={handleChange} />
            <input type="text" name="documento" placeholder="Documento" value={formData.documento} onChange={handleChange} />
            <input type="date" name="nacimiento" placeholder="Nacimiento" value={formData.nacimiento} onChange={handleChange} />
            <select name="sexo" value={formData.sexo} onChange={handleChange}>
              <option value="">Seleccione sexo...</option>
              <option value="Femenino">Femenino</option>
              <option value="Masculino">Masculino</option>
            </select>
            <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} />

            {/* Sección de Direcciones */}
            <h4 className="mt-3">Direcciones</h4>
            <button type="button" className="btn btn-nueva-persona mb-2" onClick={() => setShowNuevaDireccion(true)}>Nueva Dirección</button>
            <table className="tabla-personas">
              <thead><tr><th>Dirección</th><th>Acciones</th></tr></thead>
              <tbody>
                {direcciones.map((d) => (
                  <tr key={d.id || `${d.calle}-${d.numero}`}>
                    <td>{getDireccionLabel(d)}</td>
                    <td className="acciones">
                      <button type="button" onClick={() => setDireccionVer(d)}>👁️</button>
                      <button type="button" className="btn-eliminar" onClick={() => handleEliminarDireccion(d.id)}>🗑️</button>
                    </td>
                  </tr>
                ))}
                {direcciones.length === 0 && (
                  <tr><td colSpan="2">No hay direcciones registradas</td></tr>
                )}
              </tbody>
            </table>

            {/* Sección de Teléfonos */}
            <h4 className="mt-3">Teléfonos</h4>
            <button type="button" className="btn btn-nueva-persona mb-2" onClick={() => setShowNuevoTelefono(true)}>Nuevo Teléfono</button>
            <table className="tabla-personas">
              <thead><tr><th>Teléfono</th><th>Acciones</th></tr></thead>
              <tbody>
                {telefonos.map((t) => (
                  <tr key={t.id || `${t.pais}-${t.cArea}-${t.numero}`}>
                    <td>{`${t.pais || ''} ${t.cArea || ''} ${t.numero || ''}`}</td>
                    <td className="acciones">
                      <button type="button" onClick={() => setTelefonoVer(t)}>👁️</button>
                      <button type="button" onClick={() => setTelefonoEditar(t)}>✏️</button>
                      <button type="button" className="btn-eliminar" onClick={() => handleEliminarTelefono(t.id)}>🗑️</button>
                    </td>
                  </tr>
                ))}
                {telefonos.length === 0 && (
                  <tr><td colSpan="3">No hay teléfonos registrados</td></tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="form-buttons">
            <button type="submit" className="btn btn-success w-100">Guardar</button>
            <button type="button" className="btn btn-secondary w-100 mt-2" onClick={onClose}>Cancelar</button>
          </div>
        </form>
      </div>

      {/* Modales hijos */}
      {showNuevaDireccion && (
        <NuevaDireccion onClose={() => setShowNuevaDireccion(false)} onSave={handleAgregarDireccion} />
      )}
      {direccionVer && (
        <VerDireccion direccion={direccionVer} onClose={() => setDireccionVer(null)} />
      )}
      {showNuevoTelefono && (
        <AgregarTelefono onClose={() => setShowNuevoTelefono(false)} onSave={handleAgregarTelefono} />
      )}
      {telefonoVer && (
        <VerTelefono telefono={telefonoVer} onClose={() => setTelefonoVer(null)} />
      )}
      {telefonoEditar && (
        <EditarTelefono telefono={telefonoEditar} onClose={() => setTelefonoEditar(null)} onSave={handleEditarTelefono} />
      )}
    </div>
  );
}

export default AgregarPersona;