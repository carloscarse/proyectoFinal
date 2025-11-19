import { useEffect, useState } from 'react';
import { api } from '../../../../endpoints/endpoints';

function ListaServicios() {
  const [servicios, setServicios] = useState([]);

  useEffect(() => {
    const cargarServicios = async () => {
      try {
        const res = await api.get('/servicios');
        const data = Array.isArray(res.data) ? res.data : [];
        setServicios(data);
      } catch (err) {
        console.error('Error al obtener servicios:', err);
      }
    };
    cargarServicios();
  }, []);

  return (
    <div>
      <h2>Servicios registrados</h2>
      <ul>
        {servicios.map((s) => (
          <li key={s.id}>
            {s.servicio} - Cant: {s.cantidad} - ${s.precio} - Factura: {s.factura}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ListaServicios;