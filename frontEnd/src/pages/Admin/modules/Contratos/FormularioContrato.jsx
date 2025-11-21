import React, { useState, useEffect } from 'react';
import { api, urlCrearContrato } from '../../../../endpoints/endpoints';

function FormularioContrato() {
  const [formData, setFormData] = useState({
    registro: '',
    fecha: '',
    condiciones: '',
    inquilino: '',
    espacio: '',
    inicio: '',
    fin: '',
    nota: ''
  });

  const [localesDisponibles, setLocalesDisponibles] = useState([]);
  const [mensaje, setMensaje] = useState('');
  const [error, setError] = useState('');

  // 🔹 Cargar locales disponibles
  useEffect(() => {
  const cargarLocales = async () => {
    try {
      const res = await api.get('/locales?estado=disponible');
      const data = Array.isArray(res.data) ? res.data : res.data.locales || [];
      setLocalesDisponibles(data);
    } catch (err) {
      console.error('Error al cargar locales:', err);
      setLocalesDisponibles([]); // fallback seguro
    }
  };
  cargarLocales();
}, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 🔹 Validar superposición de fechas
  const validarFechas = async () => {
    try {
      const res = await api.get(`/contratos?espacio=${formData.espacio}`);
      const contratos = res.data;

      const inicioNuevo = new Date(formData.inicio);
      const finNuevo = new Date(formData.fin);

      const conflicto = contratos.some((c) => {
        const inicioExistente = new Date(c.inicio);
        const finExistente = new Date(c.fin);
        return (
          (inicioNuevo <= finExistente && finNuevo >= inicioExistente)
        );
      });

      return conflicto;
    } catch (err) {
      console.error('Error al validar fechas:', err);
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const camposObligatorios = ['registro', 'fecha', 'condiciones', 'inquilino', 'espacio', 'inicio', 'fin'];
    const faltantes = camposObligatorios.filter((campo) => !formData[campo]);

    if (faltantes.length > 0) {
      setError(`Faltan campos: ${faltantes.join(', ')}`);
      setMensaje('');
      return;
    }

    const hayConflicto = await validarFechas();
    if (hayConflicto) {
      setError('Ya existe un contrato en ese espacio para las fechas seleccionadas');
      setMensaje('');
      return;
    }

    try {
      const res = await api.post(urlCrearContrato, formData);
      setMensaje('✅ Contrato creado correctamente');
      setError('');
      console.log('Contrato creado:', res.data);
    } catch (err) {
      setError('❌ Error al crear contrato');
      setMensaje('');
      console.error(err);
    }
  };

  return (
    <form className="contratos-form" onSubmit={handleSubmit}>
      <input name="registro" placeholder="Registro del contrato" onChange={handleChange} />
      <input name="fecha" type="date" onChange={handleChange} />

      <select name="condiciones" onChange={handleChange}>
        <option value="">Condiciones</option>
        <option value="Estándar">Estándar</option>
        <option value="Especial">Especial</option>
      </select>

      <input name="inquilino" placeholder="Nombre del inquilino" onChange={handleChange} />

      <select name="espacio" onChange={handleChange}>
        <option value="">Seleccionar local</option>
        {localesDisponibles.map((local) => (
          <option key={local.id} value={local.id}>
            {local.nombre} - {local.ubicacion}
          </option>
        ))}
      </select>

      <input name="inicio" type="date" onChange={handleChange} />
      <input name="fin" type="date" onChange={handleChange} />
      <textarea name="nota" placeholder="Nota adicional" onChange={handleChange} />

      <button type="submit">Registrar Contrato</button>

      {mensaje && <p style={{ color: 'lime' }}>{mensaje}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
  );
}

export default FormularioContrato;
