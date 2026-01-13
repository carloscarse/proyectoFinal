import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { api } from '../../../../endpoints/endpoints';
import FormularioPago from '../Pagos/FormularioPago';
import './FormularioFactura.css';

function FormularioFactura({ onClose, mode = 'create', initialFactura = null, onSaved }) {
  const isEdit = mode === 'edit';

  const [formData, setFormData] = useState({
    fecha: '',
    numero: '',
    estado: 'emitida',
    pago: '',
    nota: ''
  });

  const [pagos, setPagos] = useState([]);
  const [mensaje, setMensaje] = useState('');
  const [error, setError] = useState('');
  const [showNuevoPago, setShowNuevoPago] = useState(false);

  useEffect(() => {
    if (isEdit && initialFactura) {
      setFormData({
        fecha: initialFactura.fecha?.replace(' ', 'T').slice(0, 16) || '',
        numero: initialFactura.numero ?? '',
        estado: initialFactura.estado ?? 'emitida',
        pago: String(initialFactura.pago?.id ?? ''),
        nota: initialFactura.nota ?? ''
      });
    }
  }, [isEdit, initialFactura]);

  const fetchPagos = async () => {
    try {
      const res = await api.get('/pago/pagos');
      const lista = Array.isArray(res.data) ? res.data : [];
      const pagosConLabel = lista.map((p) => ({
        id: String(p.id),
        label: `Pago #${p.id} - ${p.fecha} (${p.nota || 'sin nota'})`
      }));
      setPagos(pagosConLabel);
    } catch (err) {
      console.error('❌ Error al obtener pagos:', err?.message || err);
      setPagos([]);
    }
  };

  useEffect(() => {
    fetchPagos();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'pago' && value === 'nuevo') {
      setShowNuevoPago(true);
      return;
    }
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        fecha: formData.fecha,
        numero: Number(formData.numero),
        estado: formData.estado,
        pago_id: Number(formData.pago),
        nota: formData.nota || null,
        registro: new Date().toISOString().slice(0, 19).replace('T', ' ')
      };

      if (isEdit && initialFactura?.id) {
        await api.put(`/factura/${initialFactura.id}`, payload);
        setMensaje('✅ Factura actualizada correctamente');
        setTimeout(() => onClose(initialFactura.id), 800);
      } else {
        const res = await api.post('/factura', payload);
        const nuevoId = res.data?.id ?? res.data?.insertId;
        setMensaje('✅ Factura registrada correctamente');
        setTimeout(() => onClose(nuevoId), 800);
      }

      setError('');
      window.dispatchEvent(new CustomEvent('factura:refresh'));
      if (onSaved) onSaved();

      setTimeout(() => {
        setMensaje('');
        onClose();
      }, 1200);
    } catch (err) {
      console.error('❌ Error al guardar factura:', err?.response?.data || err.message);
      setError('❌ Error al guardar factura');
      setMensaje('');
    }
  };

  // 🔑 Aquí empieza el return con portal y overlay
  return createPortal(
    <div className="modal-overlay modal-overlay-level-1">
      <div className="usuarios-form">
        <h4 className="mb-3">{isEdit ? 'Editar Factura' : 'Registrar Factura'}</h4>

        <form onSubmit={handleSubmit}>
          <label>Fecha</label>
          <input
            type="datetime-local"
            name="fecha"
            value={formData.fecha}
            onChange={handleChange}
            required
          />

          <label>Número</label>
          <input
            type="number"
            name="numero"
            value={formData.numero}
            onChange={handleChange}
            required
          />

          <label>Estado</label>
          <select
            name="estado"
            value={formData.estado}
            onChange={handleChange}
            required
          >
            <option value="emitida">Emitida</option>
            <option value="pagada">Pagada</option>
          </select>
                    <label>Pago</label>
          <select
            name="pago"
            value={formData.pago}
            onChange={handleChange}
            required
          >
            <option value="">-- Seleccione --</option>
            <option value="nuevo">➕ Nuevo</option>
            {pagos.map(p => (
              <option key={p.id} value={p.id}>{p.label}</option>
            ))}
          </select>

          <label>Nota</label>
          <textarea
            name="nota"
            value={formData.nota}
            onChange={handleChange}
          />

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

        {/* Modal hijo: Pago */}
        {showNuevoPago && createPortal(
          <div className="modal-overlay modal-overlay-level-2">
            <FormularioPago
              onClose={async (nuevoId) => {
                setShowNuevoPago(false);
                if (nuevoId) {
                  await fetchPagos();
                  setFormData(prev => ({ ...prev, pago: String(nuevoId) }));
                }
              }}
            />
          </div>,
          document.getElementById('modals-root')
        )}
      </div>
    </div>,
    document.getElementById('modals-root')
  );
}

export default FormularioFactura;