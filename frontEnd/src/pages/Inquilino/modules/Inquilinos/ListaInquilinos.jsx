import { useEffect, useState } from 'react';
import { api } from '../../../../endpoints/endpoints';

function ListaInquilinos() {
  const [inquilinos, setInquilinos] = useState([]);

  useEffect(() => {
    const cargarInquilinos = async () => {
      try {
        const res = await api.get('/inquilinos');
        const data = Array.isArray(res.data) ? res.data : [];
        setInquilinos(data);
      } catch (err) {
        console.error('Error al obtener inquilinos:', err);
      }
    };
    cargarInquilinos();
  }, []);

  return (
    <div>
      <h2>Inquilinos registrados</h2>
      <ul>
        {inquilinos.map((i) => (
          <li key={i.id}>
            ID: {i.id} - Persona: {i.persona} - Alta: {i.alta}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ListaInquilinos;