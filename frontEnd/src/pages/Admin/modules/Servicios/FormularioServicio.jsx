import { useState, useEffect } from 'react';
import { createServicio, updateServicio } from '../../../../api/servicio';
import { getFacturas } from '../../../../api/factura'; // ✅ función para traer facturas
import FormularioFactura from '../Facturacion/FormularioFactura'; // ✅ modal hijo

function FormularioServicio({ show, onClose, servicio, onSaved }) {
  const [formData, setFormData] = useState({
    servicio: '',
    cantidad: '',
    precio: '',
    factura: '',
    nota: ''
  });

  const [facturas, setFacturas] = useState([]);
  const [showFacturaModal, setShowFacturaModal] = useState(false);

  // Cargar facturas al abrir el modal
  useEffect(() => {
    async function cargarFacturas() {
      try {
        const res = await getFacturas();
        setFacturas(res.data); // [{ id: 14, numero: 'F-00014' }, ...]
      } catch (err) {
        console.error('❌ Error al cargar facturas:', err);
      }
    }
    if (show) cargarFacturas();
  }, [show]);

  // Si recibimos un servicio (modo edición), prellenamos el formulario
  useEffect(() => {
    if (servicio) {
      setFormData({
        servicio: servicio.servicio || '',
        cantidad: servicio.cantidad || '',
        precio: servicio.precio || '',
        factura: servicio.factura || '',
        nota: servicio.nota || ''
      });
    } else {
      setFormData({
        servicio: '',
        cantidad: '',
        precio: '',
        factura: '',
        nota: ''
      });
    }
  }, [servicio]);

  // Manejo de cambios en inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'factura' && value === 'nueva') {
      setShowFacturaModal(true); // abrir modal hijo
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  // Guardar cambios (crear o actualizar)
  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      servicio: formData.servicio,
      cantidad: Number(formData.cantidad),
      precio: Number(formData.precio),
      factura: Number(formData.factura),
      nota: formData.nota
    };

    console.log('📦 Payload enviado al backend:', payload);

    try {
      if (servicio) {
        await updateServicio(servicio.id, payload);
      } else {
        await createServicio(payload);
      }
      onSaved();
      onClose();
    } catch (err) {
      console.error('❌ Error al guardar el servicio:', err);
      alert('Error al guardar el servicio');
    }
  };

  // Callback cuando se crea una nueva factura
  const handleFacturaCreada = (nuevaFactura) => {
    setFacturas(prev => [...prev, nuevaFactura]);
    setFormData(prev => ({ ...prev, factura: nuevaFactura.id }));
    setShowFacturaModal(false);
  };

  if (!show) return null;

  return (
    <div style={modalStyle}>
      <div style={modalContentStyle}>
        <h3>{servicio ? 'Editar Servicio' : 'Nuevo Servicio'}</h3>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Servicio:</label>
            <input
              type="text"
              name="servicio"
              value={formData.servicio}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Cantidad:</label>
            <input
              type="number"
              name="cantidad"
              value={formData.cantidad}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Precio:</label>
            <input
              type="number"
              step="0.01"
              name="precio"
              value={formData.precio}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Factura:</label>
            <select
              name="factura"
              value={formData.factura}
              onChange={handleChange}
              required
            >
              <option value="">Seleccionar factura...</option>
              <option value="nueva">➕ Nueva Factura</option>
              {facturas.map(f => (
                <option key={f.id} value={f.id}>{f.numero}</option>
              ))}
            </select>
          </div>
          <div>
            <label>Nota:</label>
            <textarea
              name="nota"
              value={formData.nota}
              onChange={handleChange}
            />
          </div>

          <div style={{ marginTop: '15px' }}>
            <button type="button" onClick={onClose}>Cancelar</button>
            <button type="submit" style={{ marginLeft: '10px', backgroundColor: '#4CAF50', color: 'white' }}>
              Guardar
            </button>
          </div>
        </form>

        {showFacturaModal && (
          <FormularioFactura
            show={showFacturaModal}
            onClose={() => setShowFacturaModal(false)}
            onSaved={handleFacturaCreada}
          />
        )}
      </div>
    </div>
  );
}

// Estilos simples para modales
const modalStyle = {
  position: 'fixed',
  top: 0, left: 0,
  width: '100%', height: '100%',
  backgroundColor: 'rgba(0,0,0,0.5)',
  display: 'flex', justifyContent: 'center', alignItems: 'center'
};

const modalContentStyle = {
  backgroundColor: 'white',
  padding: '20px',
  borderRadius: '8px',
  minWidth: '300px'
};

export default FormularioServicio;