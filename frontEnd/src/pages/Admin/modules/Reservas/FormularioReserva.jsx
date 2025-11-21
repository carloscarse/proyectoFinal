import { useState } from 'react';
import { api } from '../../../../endpoints/endpoints';

function FormularioReserva() {
  const [formData, setFormData] = useState({
    fecha: '',
    espacio: '',
    inquilino: '',
    tipo: '',
    diaInicio: '',
    diaFin: '',
    inicio: '',
    fin: '',
    actividad: '',
    adelanto: '',
    estado: '',
    nota: ''
  });

  const [mensaje, setMensaje] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/reserva', formData);
      setMensaje('✅ Reserva registrada correctamente');
      setError('');
      console.log('Reserva creada:', res.data);
    } catch (err) {
      setError('❌ Error al registrar reserva');
      setMensaje('');
      console.error(err);
    }
  };

  return (
    <form className="reservas-form" onSubmit={handleSubmit}>
      <input name="fecha" type="date" onChange={handleChange} />
      <input name="espacio" placeholder="ID del espacio" onChange={handleChange} />
      <input name="inquilino" placeholder="ID del inquilino" onChange={handleChange} />
      <input name="tipo" placeholder="Tipo de reserva" onChange={handleChange} />
      <input name="diaInicio" type="date" onChange={handleChange} />
      <input name="diaFin" type="date" onChange={handleChange} />
      <input name="inicio" type="time" onChange={handleChange} />
      <input name="fin" type="time" onChange={handleChange} />
      <input name="actividad" placeholder="Actividad" onChange={handleChange} />
      <input name="adelanto" placeholder="Adelanto ($)" onChange={handleChange} />
      <select name="estado" onChange={handleChange}>
        <option value="">Estado</option>
        <option value="pagado">Pagado</option>
        <option value="adeudado">Adeudado</option>
      </select>
      <textarea name="nota" placeholder="Nota adicional" onChange={handleChange} />
      <button type="submit">Registrar Reserva</button>
      {mensaje && <p style={{ color: 'lime' }}>{mensaje}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
  );
}

export default FormularioReserva;