import React, { useState, useEffect } from 'react';
import './ListaPersona.css';

import VerDireccion from '../Direccion/VerDireccion';
import NuevaDireccion from '../Direccion/NuevaDireccion';
import EditarDireccion from '../Direccion/EditarDireccion';

import VerTelefono from '../telefono/VerTelefono';
import AgregarTelefono from '../telefono/AgregarTelefono';
import EditarTelefono from '../telefono/EditarTelefono';

import { getDireccionLabel } from '../../../../utils/labels/direccion';
import {
  getDireccionesByPersona,
  deleteDireccion,
  createDireccion,
  updateDireccion
} from '../../../../api/direccion';
import {
  getTelefonosByPersona,
  deleteTelefono,
  createTelefono,
  updateTelefono
} from '../../../../api/telefono';
import { useUserStore } from '../../../../Store/userStore';

function EditarPersona({ persona, onClose, onSave }) {
  const [formData, setFormData] = useState({
    nombre: persona.nombre || '',
    segundoNombre: persona.segundoNombre || '',
    apellido: persona.apellido || '',
    segundoApellido: persona.segundoApellido || '',
    documento: persona.documento || '',
    nacimiento: persona.nacimiento ? persona.nacimiento.split('T')[0] : '',
    sexo: persona.sexo || '',
    email: persona.email || ''
  });

  const [direcciones, setDirecciones] = useState([]);
  const [telefonos, setTelefonos] = useState([]);
  const [direccionVer, setDireccionVer] = useState(null);
  const [direccionEditar, setDireccionEditar] = useState(null);
  const [telefonoVer, setTelefonoVer] = useState(null);
  const [telefonoEditar, setTelefonoEditar] = useState(null);
  const [showNuevaDireccion, setShowNuevaDireccion] = useState(false);
  const [showNuevoTelefono, setShowNuevoTelefono] = useState(false);

  const token = useUserStore((s) => s.user?.token);

  useEffect(() => {
    const cargar = async () => {
      if (!token || !persona?.id) return;
      try {
        const dirs = await getDireccionesByPersona(persona.id);
        setDirecciones(dirs || []);
        const tels = await getTelefonosByPersona(persona.id);
        setTelefonos(tels || []);
      } catch (error) {
        console.error('Error al cargar relaciones:', error);
      }
    };
    cargar();
  }, [persona, token]);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const markDelete = (list, setList, id) =>
    setList(list.map(i => i.id === id ? { ...i, eliminado: true } : i));

  const handleEditarDireccionSave = (id, datosActualizados) => {
    setDirecciones(prev => prev.map(d => (d.id === id ? { ...d, ...datosActualizados } : d)));
    setDireccionEditar(null);
  };

  const handleEditarTelefonoSave = (id, datosActualizados) => {
    setTelefonos(prev => prev.map(t => (t.id === id ? { ...t, ...datosActualizados } : t)));
    setTelefonoEditar(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Guardando persona:", formData);
    await onSave(persona.id, { ...formData });

    // Direcciones
    for (const dir of direcciones.filter(x => x.eliminado)) {
      console.log("Eliminando dirección:", dir);
      await deleteDireccion(dir.id);
    }
    for (const dir of direcciones.filter(x => !x.id && !x.eliminado)) {
      console.log("Creando dirección:", dir);
      await createDireccion(persona.id, dir);
    }
    for (const dir of direcciones.filter(x => x.id && !x.eliminado)) {
      console.log("Actualizando dirección:", dir);
      await updateDireccion(dir.id, {
        calle: dir.calle || null,
        numero: dir.numero || null,
        ciudad: dir.ciudad || null,
        provincia: dir.provincia || null,
        pais: dir.pais || null
      });
    }

    // Teléfonos
    for (const tel of telefonos.filter(x => x.eliminado)) {
      console.log("Eliminando teléfono:", tel);
      await deleteTelefono(tel.id);
    }
    for (const tel of telefonos.filter(x => !x.id && !x.eliminado)) {
      console.log("Creando teléfono:", tel);
      await createTelefono(persona.id, tel);
    }
    for (const tel of telefonos.filter(x => x.id && !x.eliminado)) {
      console.log("Actualizando teléfono:", tel);
      await updateTelefono(tel.id, {
        pais: tel.pais || null,
        cArea: tel.cArea || null,
        numero: tel.numero || null
      });
    }

    onClose();
  };
    return (
    <div className="modal-overlay">
      <div className="usuarios-form-wrapper">
        <form className="usuarios-form" onSubmit={handleSubmit}>
          <h3 className="text-center mb-3">Editar Persona</h3>

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

            {/* Direcciones */}
            <h4 className="mt-3">Direcciones</h4>
            <button type="button" className="btn btn-nueva-persona mb-2" onClick={() => setShowNuevaDireccion(true)}>Nueva Dirección</button>
            <table className="tabla-personas">
              <thead><tr><th>Dirección</th><th>Acciones</th></tr></thead>
              <tbody>
                {direcciones.filter(d => !d.eliminado).map((d) => (
                  <tr key={d.id || `${d.calle}-${d.numero}`}>
                    <td>{getDireccionLabel(d)}</td>
                    <td className="acciones">
                      <button type="button" onClick={() => setDireccionVer(d)}>👁️</button>
                      <button type="button" onClick={() => setDireccionEditar(d)}>✏️</button>
                      <button type="button" className="btn-eliminar" onClick={() => markDelete(direcciones, setDirecciones, d.id)}>🗑️</button>
                    </td>
                  </tr>
                ))}
                {direcciones.filter(d => !d.eliminado).length === 0 && (
                  <tr><td colSpan="3">No hay direcciones registradas</td></tr>
                )}
              </tbody>
            </table>

            {/* Teléfonos */}
            <h4 className="mt-3">Teléfonos</h4>
            <button type="button" className="btn btn-nueva-persona mb-2" onClick={() => setShowNuevoTelefono(true)}>Nuevo Teléfono</button>
            <table className="tabla-personas">
              <thead><tr><th>Teléfono</th><th>Acciones</th></tr></thead>
              <tbody>
                {telefonos.filter(t => !t.eliminado).map((t) => (
                  <tr key={t.id || `${t.pais}-${t.cArea}-${t.numero}`}>
                    <td>{`${t.pais || ''} ${t.cArea || ''} ${t.numero || ''}`}</td>
                    <td className="acciones">
                      <button type="button" onClick={() => setTelefonoVer(t)}>👁️</button>
                      <button type="button" onClick={() => setTelefonoEditar(t)}>✏️</button>
                      <button type="button" className="btn-eliminar" onClick={() => markDelete(telefonos, setTelefonos, t.id)}>🗑️</button>
                    </td>
                  </tr>
                ))}
                {telefonos.filter(t => !t.eliminado).length === 0 && (
                  <tr><td colSpan="3">No hay teléfonos registrados</td></tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="form-buttons">
            <button type="submit" className="btn btn-success w-100">Guardar cambios</button>
            <button type="button" className="btn btn-secondary w-100 mt-2" onClick={onClose}>Cancelar</button>
          </div>
        </form>
      </div>

      {/* Modales */}
      {showNuevaDireccion && (
        <NuevaDireccion personaId={persona.id} onClose={() => setShowNuevaDireccion(false)} onSave={d => setDirecciones([...direcciones, d])} />
      )}
      {direccionVer && <VerDireccion direccion={direccionVer} onClose={() => setDireccionVer(null)} />}
      {direccionEditar && <EditarDireccion direccion={direccionEditar} onClose={() => setDireccionEditar(null)} onSave={handleEditarDireccionSave} />}

      {showNuevoTelefono && (
        <AgregarTelefono personaId={persona.id} onClose={() => setShowNuevoTelefono(false)} onSave={t => setTelefonos([...telefonos, t])} />
      )}
      {telefonoVer && <VerTelefono telefono={telefonoVer} onClose={() => setTelefonoVer(null)} />}
      {telefonoEditar && <EditarTelefono telefono={telefonoEditar} onClose={() => setTelefonoEditar(null)} onSave={handleEditarTelefonoSave} />}
    </div>
  );
}

export default EditarPersona;