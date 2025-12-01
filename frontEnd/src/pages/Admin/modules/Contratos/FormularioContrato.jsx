import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { api } from '../../../../endpoints/endpoints';
import FormularioInquilino from '../Inquilinos/FormularioInquilino';
import FormularioEspacio from '../Espacios/FormularioEspacio';
import './FormularioContrato.css';

function FormularioContrato({ onClose, mode = 'create', initialContrato = null, onSaved }) {
  const isEdit = mode === 'edit';

  const [formData, setFormData] = useState({
    fecha: '',
    condiciones: '',
    inquilino: '',
    espacio: '',
    inicio: '',
    fin: '',
    nota: ''
  });

  const [inquilinos, setInquilinos] = useState([]);
  const [espacios, setEspacios] = useState([]);
  const [mensaje, setMensaje] = useState('');
  const [error, setError] = useState('');
  const [showNuevoInquilino, setShowNuevoInquilino] = useState(false);
  const [showNuevoEspacio, setShowNuevoEspacio] = useState(false);

  useEffect(() => {
    if (isEdit && initialContrato) {
      setFormData({
        fecha: initialContrato.fecha
          ? initialContrato.fecha.replace(' ', 'T').slice(0, 16)
          : '',
        condiciones: initialContrato.condiciones ?? '',
        inquilino: String(initialContrato.inquilino ?? ''),
        espacio: String(initialContrato.espacio ?? ''),
        inicio: initialContrato.inicio
          ? initialContrato.inicio.replace(' ', 'T').slice(0, 16)
          : '',
        fin: initialContrato.fin
          ? initialContrato.fin.replace(' ', 'T').slice(0, 16)
          : '',
        nota: initialContrato.nota ?? ''
      });
    }
  }, [isEdit, initialContrato]);

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

  const fetchEspacios = async () => {
    try {
      const res = await api.get('/espacio/espacios');
      const lista = res.data || [];
      setEspacios(lista.map(e => ({ id: String(e.id), label: e.nombre || `Espacio #${e.id}` })));
    } catch (err) {
      console.error('❌ Error al obtener espacios:', err?.message || err);
    }
  };

  useEffect(() => {
    fetchInquilinos();
    fetchEspacios();

    // 👇 escuchamos el evento espacio:refresh
    const handler = () => fetchEspacios();
    window.addEventListener('espacio:refresh', handler);

    return () => window.removeEventListener('espacio:refresh', handler);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'inquilino' && value === 'nuevo') {
      setShowNuevoInquilino(true);
      return;
    }

    if (name === 'espacio' && value === 'nuevo') {
      setShowNuevoEspacio(true);
      return;
    }

    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        fecha: formData.fecha,
        condiciones: formData.condiciones || null,
        inquilino: formData.inquilino ? Number(formData.inquilino) : null,
        espacio: formData.espacio ? Number(formData.espacio) : null,
        inicio: formData.inicio,
        fin: formData.fin,
        nota: formData.nota || null
      };

      if (isEdit && initialContrato?.id) {
        await api.put(`/contrato/contrato/${initialContrato.id}`, payload);
        setMensaje('✅ Contrato actualizado correctamente');
      } else {
        await api.post('/contrato/contrato', payload);
        setMensaje('✅ Contrato registrado correctamente');
      }

      setError('');
      window.dispatchEvent(new CustomEvent('contrato:refresh'));
      if (onSaved) onSaved();

      setTimeout(() => {
        setMensaje('');
        onClose();
      }, 1200);
    } catch (err) {
      console.error('❌ Error al guardar contrato:', err?.response?.data || err.message);
      setError('❌ Error al guardar contrato');
      setMensaje('');
    }
  };

  return (
    <div className="usuarios-form">
      <h4 className="mb-3">{isEdit ? 'Editar Contrato' : 'Registrar Contrato'}</h4>

      <form onSubmit={handleSubmit}>
        <label>Fecha</label>
        <input type="datetime-local" name="fecha" value={formData.fecha} onChange={handleChange} required />

        <label>Condiciones</label>
        <textarea name="condiciones" value={formData.condiciones} onChange={handleChange} />

        <label>Inquilino</label>
        <select name="inquilino" value={formData.inquilino} onChange={handleChange} required>
          <option value="">-- Seleccione --</option>
          <option value="nuevo">➕ Nuevo</option>
          {inquilinos.map(i => (
            <option key={i.id} value={i.id}>{i.label}</option>
          ))}
        </select>

        <label>Espacio</label>
        <select name="espacio" value={formData.espacio} onChange={handleChange} required>
          <option value="">-- Seleccione --</option>
          <option value="nuevo">➕ Nuevo</option>
          {espacios.map(e => (
            <option key={e.id} value={e.id}>{e.label}</option>
          ))}
        </select>

        <label>Inicio</label>
        <input type="datetime-local" name="inicio" value={formData.inicio} onChange={handleChange} required />

        <label>Fin</label>
        <input type="datetime-local" name="fin" value={formData.fin} onChange={handleChange} required />

        <label>Nota</label>
        <textarea name="nota" value={formData.nota} onChange={handleChange} />

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
              setShowNuevoInquilino(false);
              if (nuevoId) {
                await fetchInquilinos();
                setFormData(prev => ({ ...prev, inquilino: String(nuevoId) }));
              }
            }}
          />
        </div>,
        document.getElementById('modals-root')
      )}

      {showNuevoEspacio && createPortal(
        <div className="modal-overlay">
          <FormularioEspacio
            onClose={async (nuevoId) => {
              setShowNuevoEspacio(false);
              if (nuevoId) {
                await fetchEspacios();
                // 👇 seleccionar automáticamente el último creado
                setFormData(prev => ({ ...prev, espacio: String(nuevoId) }));
              }
            }}
          />
        </div>,
        document.getElementById('modals-root')
      )}
    </div>
  );
}

export default FormularioContrato;