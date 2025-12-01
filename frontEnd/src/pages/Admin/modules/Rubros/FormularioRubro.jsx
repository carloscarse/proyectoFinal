import { useState } from 'react';
import { api } from '../../../../endpoints/endpoints';
import './FormularioRubro.css';

function FormularioRubro({ onClose }) {
  const [form, setForm] = useState({ rubro: '', descripcion: '' });
  const [mensaje, setMensaje] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/rubro/rubro', form); // ✅ endpoint correcto
      const nuevoId = res.data?.id;

      setMensaje('✅ Rubro registrado correctamente');
      setError('');

      // refrescar lista de rubros
      window.dispatchEvent(new Event('rubro:refresh'));

      // cerrar modal después de un breve delay
      setTimeout(() => {
        setMensaje('');
        onClose(nuevoId);
      }, 1000);
    } catch (err) {
      console.error('❌ Error al registrar rubro:', err?.response?.data || err.message);
      setError('❌ No se pudo registrar el rubro');
      setMensaje('');
    }
  };

  return (
    <div className="usuarios-form">
      <h5 className="mb-3">Registrar nuevo rubro</h5>
      <form onSubmit={handleSubmit}>
        <label>Nombre del rubro</label>
        <input
          name="rubro"
          value={form.rubro}
          onChange={handleChange}
          required
        />

        <label>Descripción</label>
        <textarea
          name="descripcion"
          value={form.descripcion}
          onChange={handleChange}
        />

        {mensaje && <p className="text-success mt-2">{mensaje}</p>}
        {error && <p className="text-danger mt-2">{error}</p>}

        <div className="d-flex justify-content-end gap-2 mt-3">
          <button type="submit" className="btn btn-success btn-sm">Registrar</button>
          <button type="button" className="btn btn-secondary btn-sm" onClick={() => onClose(null)}>Cancelar</button>
        </div>
      </form>
    </div>
  );
}

export default FormularioRubro;