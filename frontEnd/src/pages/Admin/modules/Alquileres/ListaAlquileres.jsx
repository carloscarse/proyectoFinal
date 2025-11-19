import { useEffect, useState } from 'react';
import { api } from '../../../../endpoints/endpoints';

function ListaAlquileres() {
  const [alquileres, setAlquileres] = useState([]);

  useEffect(() => {
    const cargarAlquileres = async () => {
      try {
        const res = await api.get('/alquileres');
        const data = Array.isArray(res.data) ? res.data : [];
        setAlquileres(data);
      } catch (err) {
        console.error('Error al obtener alquileres:', err);
      }
    };
    cargarAlquileres();
  }, []);

  return (
    <div>
      <h2>Alquileres registrados</h2>
      <ul>
        {alquileres.map((a) => (
          <li key={a.id}>
            Contrato: {a.contrato} - Espacio: {a.espacio} - {a.inicio} → {a.fin} ({a.estado})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ListaAlquileres;