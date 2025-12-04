import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { api } from '../../../../endpoints/endpoints';
import FormularioUsuario from '../Usuarios/FormularioUsuario';
import FormularioInquilino from '../Inquilinos/FormularioInquilino';
import FormularioItemPago from '../ItemPago/FormularioItemPago';
import './FormularioPago.css';

function FormularioPago({ onClose, mode = 'create', initialPago = null, onSaved }) {
  const isEdit = mode === 'edit';
  const isView = mode === 'view';

  const [formData, setFormData] = useState({
    fecha: '',
    usuario: '',
    inquilino: '',
    nota: ''
  });

  const [usuarios, setUsuarios] = useState([]);
  const [inquilinos, setInquilinos] = useState([]);
  const [itemsPago, setItemsPago] = useState([]);

  const [mensaje, setMensaje] = useState('');
  const [error, setError] = useState('');

  const [showNuevoUsuario, setShowNuevoUsuario] = useState(false);
  const [showNuevoInquilino, setShowNuevoInquilino] = useState(false);
  const [showNuevoItemPago, setShowNuevoItemPago] = useState(false);

  useEffect(() => {
    if ((isEdit || isView) && initialPago) {
      setFormData({
        fecha: initialPago.fecha ? initialPago.fecha.replace(' ', 'T').slice(0, 16) : '',
        usuario: String(initialPago.usuario?.id ?? ''),
        inquilino: String(initialPago.inquilino?.id ?? ''),
        nota: initialPago.nota ?? ''
      });

      // 🔄 cargar ítems desde backend si estamos editando
      const fetchItems = async () => {
        try {
          const res = await api.get(`/itempago/pago/${initialPago.id}`);
          setItemsPago(Array.isArray(res.data) ? res.data : []);
        } catch (err) {
          console.error('❌ Error al obtener ítems de pago:', err?.message || err);
          setItemsPago([]);
        }
      };
      if (isEdit && initialPago.id) fetchItems();
      else setItemsPago(Array.isArray(initialPago.itemsPago) ? initialPago.itemsPago : []);
    }
  }, [isEdit, isView, initialPago]);

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
    fetchInquilinos();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'usuario' && value === 'nuevo') { setShowNuevoUsuario(true); return; }
    if (name === 'inquilino' && value === 'nuevo') { setShowNuevoInquilino(true); return; }

    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleGuardarItemsPago = async (pagoId) => {
    try {
      for (const item of itemsPago) {
        await api.post('/itempago', { ...item, pago: pagoId });
      }
    } catch (err) {
      console.error('❌ Error al guardar ítems de pago:', err?.response?.data || err.message);
      setError('❌ Error al guardar ítems de pago');
    }
  };

  const handleEliminarItem = async (id) => {
    try {
      await api.delete(`/itempago/${id}`);
      setItemsPago(prev => prev.filter(item => item.id !== id));
    } catch (err) {
      console.error('❌ Error al eliminar ítem de pago:', err?.message || err);
      alert('Error al eliminar ítem de pago');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        fecha: formData.fecha,
        usuario: formData.usuario ? Number(formData.usuario) : null,
        inquilino: formData.inquilino ? Number(formData.inquilino) : null,
        nota: formData.nota || null,
        registro: new Date().toISOString().slice(0, 19).replace('T', ' ')
      };
      let pagoId;
      if (isEdit && initialPago?.id) {
        await api.put(`/pago/pago/${initialPago.id}`, payload);
        pagoId = initialPago.id;
        setMensaje('✅ Pago actualizado correctamente');
      } else {
        const res = await api.post('/pago/pago', payload);
        pagoId = res.data.id;
        setMensaje('✅ Pago registrado correctamente');
      }

      await handleGuardarItemsPago(pagoId);
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

  const total = itemsPago.reduce((acc, item) => acc + Number(item.monto || 0), 0);

  return (
    <div className="usuarios-form">
      <h4 className="mb-3">
        {isView ? 'Ver Pago' : isEdit ? 'Editar Pago' : 'Registrar Pago'}
      </h4>

      <form onSubmit={handleSubmit}>
        <label>Fecha</label>
        <input
          type="datetime-local"
          name="fecha"
          value={formData.fecha}
          onChange={handleChange}
          required
          disabled={isView}
        />

        <label>Usuario</label>
        <select
          name="usuario"
          value={formData.usuario}
          onChange={handleChange}
          required
          disabled={isView}
        >
          <option value="">-- Seleccione --</option>
          {!isView && <option value="nuevo">➕ Nuevo</option>}
          {usuarios.map((u) => (
            <option key={u.id} value={u.id}>{u.label}</option>
          ))}
        </select>

        <label>Inquilino</label>
        <select
          name="inquilino"
          value={formData.inquilino}
          onChange={handleChange}
          required
          disabled={isView}
        >
          <option value="">-- Seleccione --</option>
          {!isView && <option value="nuevo">➕ Nuevo</option>}
          {inquilinos.map((i) => (
            <option key={i.id} value={i.id}>{i.label}</option>
          ))}
        </select>

        {/* Ítems de Pago */}
        <div className="mt-3">
          {!isView && (
            <button
              type="button"
              className="btn btn-outline-info btn-sm mb-2"
              onClick={() => setShowNuevoItemPago(true)}
            >
              ➕ Agregar Ítem de Pago
            </button>
          )}

          {itemsPago.length > 0 ? (
            <ul className="list-group mb-2">
              {itemsPago.map((item) => (
                <li
                  key={item.id}
                  className="list-group-item d-flex justify-content-between align-items-center"
                >
                  <span>
                    {item.cantidad} × {item.item} | Precio: ${item.precio} | Monto: ${item.monto}
                  </span>
                  {!isView && (
                    <button
                      type="button"
                      className="btn btn-sm btn-danger"
                      onClick={() => handleEliminarItem(item.id)}
                    >
                      🗑️
                    </button>
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-muted">Este pago no tiene ítems registrados.</p>
          )}

          <div className="d-flex justify-content-end mb-3">
            <label className="me-2 fw-bold">Total:</label>
            <label>${total}</label>
          </div>
        </div>

        <label>Nota</label>
        <textarea
          name="nota"
          value={formData.nota}
          onChange={handleChange}
          disabled={isView}
        />

        {mensaje && <p className="text-success mt-2">{mensaje}</p>}
        {error && <p className="text-danger mt-2">{error}</p>}

        {!isView && (
          <div className="d-flex justify-content-end gap-2 mt-3">
            <button type="submit" className="btn btn-success btn-sm">
              {isEdit ? 'Guardar cambios' : 'Registrar'}
            </button>
            <button type="button" className="btn btn-secondary btn-sm" onClick={onClose}>
              Cancelar
            </button>
          </div>
        )}

        {isView && (
          <div className="d-flex justify-content-end mt-3">
            <button type="button" className="btn btn-secondary btn-sm" onClick={onClose}>
              Cerrar
            </button>
          </div>
        )}
      </form>

      {/* Modales secundarios */}
      {!isView && showNuevoItemPago && createPortal(
        <div className="modal-overlay">
          <FormularioItemPago
            onClose={(nuevoItem, otro) => {
              setShowNuevoItemPago(false);
              if (nuevoItem) {
                setItemsPago(prev => [...prev, nuevoItem]);
                if (otro) setTimeout(() => setShowNuevoItemPago(true), 50);
              }
            }}
          />
        </div>,
        document.getElementById('modals-root')
      )}

      {!isView && showNuevoUsuario && createPortal(
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

      {!isView && showNuevoInquilino && createPortal(
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