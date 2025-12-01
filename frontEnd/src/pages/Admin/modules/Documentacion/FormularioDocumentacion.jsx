import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { api } from '../../../../endpoints/endpoints';
import FormularioInquilino from '../Inquilinos/FormularioInquilino';
import './FormularioDocumentacion.css';

function FormularioDocumentacion({ onClose, mode = 'create', initialDoc = null, onSaved }) {
  const isEdit = mode === 'edit';

  const [formData, setFormData] = useState({
    inquilino: '',
    descripcion: '',
    emision: '',
    vencimiento: '',
    fechaPresentacion: ''
  });

  const [archivo, setArchivo] = useState(null);
  const [inquilinos, setInquilinos] = useState([]);
  const [mensaje, setMensaje] = useState('');
  const [error, setError] = useState('');
  const [showNuevoInquilino, setShowNuevoInquilino] = useState(false);

  // ✅ Precargar datos si es edición
  useEffect(() => {
    if (isEdit && initialDoc) {
      setFormData({
        inquilino: String(initialDoc.inquilino ?? ''),
        descripcion: initialDoc.descripcion ?? '',
        emision: initialDoc.emision ? initialDoc.emision.substring(0, 10) : '',
        vencimiento: initialDoc.vencimiento ? initialDoc.vencimiento.substring(0, 10) : '',
        fechaPresentacion: initialDoc.fechaPresentacion ? initialDoc.fechaPresentacion.substring(0, 10) : ''
      });
    }
  }, [isEdit, initialDoc]);

  const fetchInquilinos = async () => {
    try {
      const resInq = await api.get('/inquilino/inquilinos');
      const lista = resInq.data || [];

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

  useEffect(() => {
    fetchInquilinos();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'inquilino') {
      if (value === 'nuevo') {
        setShowNuevoInquilino(true);
        return;
      }
      setFormData(prev => ({ ...prev, inquilino: value }));
      return;
    }

    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setArchivo(e.target.files[0]);
    console.log('📎 Archivo seleccionado:', e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let rutaArchivo = initialDoc?.documento || '';

      // ✅ Si se selecciona archivo nuevo, subirlo
      if (archivo) {
        const formDataArchivo = new FormData();
        formDataArchivo.append('archivo', archivo);

        const resArchivo = await api.post('/documentacion/upload', formDataArchivo, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });

        rutaArchivo = resArchivo.data.ruta;
      }

      const payload = {
        documento: rutaArchivo,
        inquilino: formData.inquilino,
        descripcion: formData.descripcion,
        emision: formData.emision,
        vencimiento: formData.vencimiento,
        fechaPresentacion: formData.fechaPresentacion
      };

      console.log('📦 Payload enviado:', payload);

      if (isEdit && initialDoc?.id) {
        await api.put(`/documentacion/${initialDoc.id}`, payload);
        setMensaje('✅ Documentación actualizada correctamente');
      } else {
        await api.post('/documentacion', payload);
        setMensaje('✅ Documentación registrada correctamente');
      }

      setError('');
      window.dispatchEvent(new CustomEvent('documentacion:refresh'));
      if (onSaved) onSaved();

      setTimeout(() => {
        setMensaje('');
        onClose();
      }, 1500);
    } catch (err) {
      console.error('❌ Error al guardar documentación:', err?.message || err);
      setError('❌ Error al guardar documentación');
      setMensaje('');
    }
  };

  return (
    <div className="modal-overlay">
      <div className="usuarios-form">
        <h3 className="text-center mb-3">
          {isEdit ? 'Editar Documentación' : 'Registrar Documentación'}
        </h3>

        <form onSubmit={handleSubmit}>
          <div className="form-scroll">
            <label>Archivo (PDF o imagen)</label>
            <input type="file" accept=".pdf,image/*" onChange={handleFileChange} />
            {isEdit && initialDoc?.documento && (
              <p className="small text-muted">Archivo actual: {initialDoc.documento}</p>
            )}

            <label>Inquilino</label>
            <select
              name="inquilino"
              value={formData.inquilino}
              onChange={handleChange}
            >
              <option value="">-- Seleccione --</option>
              <option value="nuevo">➕ Nuevo</option>
              {inquilinos.map(i => (
                <option key={i.id} value={i.id}>{i.label}</option>
              ))}
            </select>

            <label>Descripción</label>
            <input
              name="descripcion"
              value={formData.descripcion}
              onChange={handleChange}
              placeholder="Breve descripción del documento"
            />

            <label>Fecha de emisión</label>
            <input type="date" name="emision" value={formData.emision} onChange={handleChange} />

            <label>Fecha de vencimiento</label>
            <input type="date" name="vencimiento" value={formData.vencimiento} onChange={handleChange} />

            <label>Fecha de presentación</label>
            <input type="date" name="fechaPresentacion" value={formData.fechaPresentacion} onChange={handleChange} />
          </div>

          {mensaje && <p className="text-success mt-2">{mensaje}</p>}
          {error && <p className="text-danger mt-2">{error}</p>}

          <div className="form-buttons">
            <button type="submit" className="btn btn-success btn-sm me-2">
              {isEdit ? 'Guardar cambios' : 'Registrar'}
            </button>
            <button type="button" className="btn btn-secondary btn-sm" onClick={onClose}>Cancelar</button>
          </div>
        </form>
      </div>

      {showNuevoInquilino && createPortal(
        <div className="modal-overlay">
          <FormularioInquilino
            onClose={async (nuevoId) => {
              setShowNuevoInquilino(false);
              await fetchInquilinos();
              if (nuevoId) {
                setFormData(prev => ({ ...prev, inquilino: String(nuevoId) }));
              } else if (inquilinos.length > 0) {
                const ultimo = inquilinos[inquilinos.length - 1];
                setFormData(prev => ({ ...prev, inquilino: String(ultimo.id) }));
              }
            }}
          />
        </div>,
        document.getElementById('modals-root')
      )}
    </div>
  );
}

export default FormularioDocumentacion;