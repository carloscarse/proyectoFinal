import { useEffect, useState } from 'react';
import { api } from '../../../../endpoints/endpoints';

function ListaEspacios() {
  const [espacios, setEspacios] = useState([]);

  useEffect(() => {
    const cargarEspacios = async () => {
      try {
        const res = await api.get('/espacios');
        const data = Array.isArray(res.data) ? res.data : [];
        setEspacios(data);
      } catch (err) {
        console.error('Error al obtener espacios:', err);
      }
    };
    cargarEspacios();
  }, []);

  return (
    <div>
      <h2>Espacios registrados</h2>
      <ul>
        {espacios.map((e) => (
          <li key={e.id}>
            {e.nombre} - {e.estado} - {e.tipo} - ${e.precio}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ListaEspacios;