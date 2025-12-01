// src/components/Admin/Espacios/FormularioEspacio.jsx
import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { api } from '../../../../endpoints/endpoints';
import FormularioInquilino from '../Inquilinos/FormularioInquilino';
import FormularioRubro from '../Rubros/FormularioRubro';
import './FormularioEspacio.css';

function FormularioEspacio({ onClose, mode = 'create', initialEspacio = null, onSaved }) {
  const isEdit = mode === 'edit';

  const [formData, setFormData] = useState({
    nombre: '',
    estado: '',
    ancho: '',
    largo: '',
    tipo: '',
    precio: '',
    inquilino: '',
    rubro: '',
    recargoUbicacion: '',
    descripcion: ''
  });

  const [inquilinos, setInquilinos] = useState([]);
  const [rubros, setRubros] = useState([]);
  const [mensaje, setMensaje] = useState('');
  const [error, setError] = useState('');
  const [showNuevoInquilino, setShowNuevoInquilino] = useState(false);
  const [showNuevoRubro, setShowNuevoRubro] = useState(false);

  useEffect(() => {
    if (isEdit && initialEspacio) {
      setFormData({
        nombre: initialEspacio.nombre ?? '',
        estado: initialEspacio.estado ?? '',
        ancho: initialEspacio.ancho ?? '',
        largo: initialEspacio.largo ?? '',
        tipo: initialEspacio.tipo ?? '',
        precio: initialEspacio.precio ?? '',
        inquilino: String(initialEspacio.inquilino ?? ''),
        rubro: String(initialEspacio.rubro ?? ''),
        recargoUbicacion: initialEspacio.recargoUbicacion ?? '',
        descripcion: initialEspacio.descripcion ?? ''
      });
    }
  }, [isEdit, initialEspacio]);

  const fetchInquilinos = async () => {
    try {
      const res = await api.get('/inquilino/inquilinos');
      const lista = res.data || [];

      const inquilinosConLabel = await Promise.all(
        lista.map(async (i) => {
          let label = `Inquilino #${i.id}`;
          try {
            if (i.persona) {
              const resPersona = await api.get(`/persona/${i.persona}`);
              const p = resPersona.data || {};
              const partes = [p.nombre, p.segundoNombre, p.apellido, p.segundoApellido];
              label = partes.filter(v => v && v !== 'null').join(' ').trim() || label;
            }
          } catch (err) {
            console.error(`❌ Error al obtener persona ${i.persona}:`, err?.message || err);
          }
          return { id: String(i.id), label };
        })
      );

      setInquilinos(inquilinosConLabel);
    } catch (err) {
      console.error('❌ Error al obtener inquilinos:', err?.message || err);
    }
  };

  const fetchRubros = async () => {
    try {
      const res = await api.get('/rubro/rubros');
      const lista = res.data || [];
      setRubros(lista);
    } catch (err) {
      console.error('❌ Error al obtener rubros:', err?.message || err);
    }
  };

  useEffect(() => {
    fetchInquilinos();
    fetchRubros();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'inquilino' && value === 'nuevo') {
      setShowNuevoInquilino(true);
      return;
    }

    if (name === 'rubro' && value === 'nuevo') {
      setShowNuevoRubro(true);
      return;
    }

    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        nombre: formData.nombre,
        estado: formData.estado,
        ancho: Number(formData.ancho),
        largo: Number(formData.largo),
        tipo: formData.tipo,
        precio: Number(formData.precio),
        rubro: formData.rubro ? Number(formData.rubro) : null,
        inquilino: formData.inquilino ? Number(formData.inquilino) : null,
        recargoUbicacion: formData.recargoUbicacion !== '' ? Number(formData.recargoUbicacion) : null,
        descripcion: formData.descripcion || ''
      };

      if (isEdit && initialEspacio?.id) {
        await api.put(`/espacio/espacio/${initialEspacio.id}`, payload);
setMensaje('✅ Espacio actualizado correctamente');

setTimeout(() => {
  onClose(initialEspacio.id);
}, 800);
      } else {
  const res = await api.post('/espacio/espacio', payload);
  const nuevoId = res.data?.id ?? res.data?.insertId; // capturamos el id
  setMensaje('✅ Espacio registrado correctamente');

  // devolvemos el id al padre
  setTimeout(() => {
    onClose(nuevoId);
  }, 800);
}


      setError('');
      window.dispatchEvent(new CustomEvent('espacio:refresh'));
      if (onSaved) onSaved();

      setTimeout(() => {
        setMensaje('');
        onClose();
      }, 1200);
    } catch (err) {
      console.error('❌ Error al guardar espacio:', err?.response?.data || err.message);
      setError('❌ Error al guardar espacio');
      setMensaje('');
    }
  };

  return (
    <div className="usuarios-form">
      <h4 className="mb-3">{isEdit ? 'Editar Espacio' : 'Registrar Espacio'}</h4>

      <form onSubmit={handleSubmit}>
        <label>Nombre del espacio</label>
        <input name="nombre" value={formData.nombre} onChange={handleChange} required />

        <label>Estado</label>
        <select name="estado" value={formData.estado} onChange={handleChange} required>
          <option value="">-- Seleccione --</option>
          <option value="libre">Libre</option>
          <option value="ocupado">Ocupado</option>
          <option value="reservado">Reservado</option>
          <option value="mantenimiento">Mantenimiento</option>
        </select>

        <label>Ancho (m)</label>
        <input type="number" name="ancho" value={formData.ancho} onChange={handleChange} required />

        <label>Largo (m)</label>
        <input type="number" name="largo" value={formData.largo} onChange={handleChange} required />

        <label>Tipo de espacio</label>
        <input name="tipo" value={formData.tipo} onChange={handleChange} required />

        <label>Precio base</label>
        <input type="number" name="precio" value={formData.precio} onChange={handleChange} required />

        <label>Rubro</label>
        <select name="rubro" value={formData.rubro} onChange={handleChange} required>
          <option value="">-- Seleccione --</option>
          <option value="nuevo">➕ Nuevo</option>
          {rubros.map(r => (
            <option key={r.id} value={r.id}>{r.rubro}</option>
          ))}
        </select>

        <label>Inquilino</label>
        <select name="inquilino" value={formData.inquilino} onChange={handleChange}>
          <option value="">-- Seleccione --</option>
          <option value="nuevo">➕ Nuevo</option>
          {inquilinos.map(i => (
            <option key={i.id} value={i.id}>{i.label}</option>
          ))}
        </select>

        <label>Recargo ubicación (dinero)</label>
        <input
          type="number"
          step="0.01"
          name="recargoUbicacion"
          value={formData.recargoUbicacion}
          onChange={handleChange}
        />

        <label>Descripción</label>
        <textarea name="descripcion" value={formData.descripcion} onChange={handleChange} />

        {mensaje && <p className="text-success mt-2">{mensaje}</p>}
        {error && <p className="text-danger mt-2">{error}</p>}

        <div className="d-flex justify-content-end gap-2 mt-3">
          <button type="submit" className="btn btn-success btn-sm">
            {isEdit ? 'Guardar cambios' : 'Registrar'}
          </button>
          <button type="button" className="btn btn-secondary btn-sm" onClick={onClose}>
            Cancelar
          </button>
        </div>
      </form>

      {showNuevoInquilino && createPortal(
        <div className="modal-overlay">
          <FormularioInquilino
            onClose={async (nuevoId) => {
              // cerrar modal hijo
              setShowNuevoInquilino(false);
              // si se creó, refrescar y seleccionar automáticamente
              if (nuevoId) {
                await fetchInquilinos();
                setFormData(prev => ({ ...prev, inquilino: String(nuevoId) }));
              }
            }}
          />
        </div>,
        document.getElementById('modals-root')
      )}

      {showNuevoRubro && createPortal(
        <div className="modal-overlay">
          <FormularioRubro
            onClose={async (nuevoId) => {
              // cerrar modal hijo
              setShowNuevoRubro(false);
              // si se creó, refrescar y seleccionar automáticamente
              if (nuevoId) {
                await fetchRubros();
                setFormData(prev => ({ ...prev, rubro: String(nuevoId) }));
              }
            }}
          />
        </div>,
        document.getElementById('modals-root')
      )}
    </div>
  );
}

export default FormularioEspacio;