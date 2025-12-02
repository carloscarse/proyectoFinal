import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { api } from '../../../../endpoints/endpoints';
import FormularioUsuario from '../Usuarios/FormularioUsuario';
import FormularioInquilino from '../Inquilinos/FormularioInquilino';
import FormularioFactura from '../Facturacion/FormularioFactura';
import './FormularioPago.css';

function FormularioPago({ onClose, mode = 'create', initialPago = null, onSaved }) {
  const isEdit = mode === 'edit';

  const [formData, setFormData] = useState({
    fecha: '',
    usuario: '',
    factura: '',
    inquilino: '',
    nota: ''
  });

  const [usuarios, setUsuarios] = useState([]);
  const [facturas, setFacturas] = useState([]);
  const [inquilinos, setInquilinos] = useState([]);
  const [mensaje, setMensaje] = useState('');
  const [error, setError] = useState('');
  const [showNuevoUsuario, setShowNuevoUsuario] = useState(false);
  const [showNuevoInquilino, setShowNuevoInquilino] = useState(false);
  const [showNuevaFactura, setShowNuevaFactura] = useState(false);

  useEffect(() => {
    if (isEdit && initialPago) {
      setFormData({
        fecha: initialPago.fecha ? initialPago.fecha.replace(' ', 'T').slice(0, 16) : '',
        usuario: String(initialPago.usuario?.id ?? ''),
        factura: String(initialPago.factura?.id ?? ''),
        inquilino: String(initialPago.inquilino?.id ?? ''),
        nota: initialPago.nota ?? ''
      });
    }
  }, [isEdit, initialPago]);

  const fetchUsuarios = async () => {
    try {
      const res = await api.get(`/usuarios?ts=${Date.now()}`);
      const lista = Array.isArray(res.data) ? res.data : [];

      const usuariosConLabel = lista.map((u) => {
        const partes = [u.nombre, u.segundoNombre, u.apellido, u.segundoApellido];
        const label = partes.filter(v => v && v !== 'null').join(' ').trim();
        return { id: String(u.id), label: label || u.usuario || `Usuario #${u.id}` };
      });

      setUsuarios(usuariosConLabel);
    } catch (err) {
      console.error('❌ Error al obtener usuarios:', err?.message || err);
      setUsuarios([]);
    }
  };

  const fetchFacturas = async () => {
    try {
      const res = await api.get('/factura/facturas');
      const lista = Array.isArray(res.data) ? res.data : [];
      setFacturas(lista.map(f => ({ id: String(f.id), label: `#${f.numero} - ${f.estado}` })));
    } catch (err) {
      console.error('❌ Error al obtener facturas:', err?.message || err);
    }
  };

  const fetchInquilinos = async () => {
    try {
      const res = await api.get('/inquilino/inquilinos');
      const lista = Array.isArray(res.data) ? res.data : [];
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
    fetchUsuarios();
    fetchFacturas();
    fetchInquilinos();
  }, []);
    const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'usuario' && value === 'nuevo') {
      setShowNuevoUsuario(true);
      return;
    }

    if (name === 'inquilino' && value === 'nuevo') {
      setShowNuevoInquilino(true);
      return;
    }

    if (name === 'factura' && value === 'nuevo') {
      setShowNuevaFactura(true);
      return;
    }

    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        fecha: formData.fecha,
        usuario: formData.usuario ? Number(formData.usuario) : null,
        factura: formData.factura ? Number(formData.factura) : null,
        inquilino: formData.inquilino ? Number(formData.inquilino) : null,
        nota: formData.nota || null,
        registro: new Date().toISOString().slice(0, 19).replace('T', ' ')
      };

      if (isEdit && initialPago?.id) {
        await api.put(`/pago/pago/${initialPago.id}`, payload);
        setMensaje('✅ Pago actualizado correctamente');
      } else {
        await api.post('/pago/pago', payload);
        setMensaje('✅ Pago registrado correctamente');
      }

      setError('');
      window.dispatchEvent(new CustomEvent('pagos:refresh'));
      if (onSaved) onSaved();

      setTimeout(() => {
        setMensaje('');
        onClose();
      }, 1200);
    } catch (err) {
      console.error('❌ Error al guardar pago:', err?.response?.data || err.message);
      setError('❌ Error al guardar pago');
      setMensaje('');
    }
  };

  return (
    <div className="usuarios-form">
      <h4 className="mb-3">{isEdit ? 'Editar Pago' : 'Registrar Pago'}</h4>

      <form onSubmit={handleSubmit}>
        <label>Fecha</label>
        <input
          type="datetime-local"
          name="fecha"
          value={formData.fecha}
          onChange={handleChange}
          required
        />

        <label>Usuario</label>
        <select name="usuario" value={formData.usuario} onChange={handleChange} required>
          <option value="">-- Seleccione --</option>
          <option value="nuevo">➕ Nuevo</option>
          {usuarios.map((u) => (
            <option key={u.id} value={u.id}>{u.label}</option>
          ))}
        </select>

        <label>Factura</label>
        <select name="factura" value={formData.factura} onChange={handleChange} required>
          <option value="">-- Seleccione --</option>
          <option value="nuevo">➕ Nueva factura</option>
          {facturas.map((f) => (
            <option key={f.id} value={f.id}>{f.label}</option>
          ))}
        </select>

        <label>Inquilino</label>
        <select name="inquilino" value={formData.inquilino} onChange={handleChange} required>
          <option value="">-- Seleccione --</option>
          <option value="nuevo">➕ Nuevo</option>
          {inquilinos.map((i) => (
            <option key={i.id} value={i.id}>{i.label}</option>
          ))}
        </select>

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

      {showNuevoUsuario && createPortal(
        <div className="modal-overlay">
          <FormularioUsuario
            onClose={async (nuevoId) => {
              setShowNuevoUsuario(false);
              if (nuevoId) {
                await fetchUsuarios();
                setFormData(prev => ({ ...prev, usuario: String(nuevoId) }));
              }
            }}
          />
        </div>,
        document.getElementById('modals-root')
      )}

      {showNuevaFactura && createPortal(
        <div className="modal-overlay">
          <FormularioFactura
            onFacturaSeleccionada={async (nuevoId) => {
              setShowNuevaFactura(false);
              if (nuevoId) {
                await fetchFacturas();
                setFormData(prev => ({ ...prev, factura: String(nuevoId) }));
              }
            }}
          />
        </div>,
        document.getElementById('modals-root')
      )}

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
    </div>
  );
}

export default FormularioPago;