import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ENDPOINTS, urlMostrarUsuarios } from '../endpoints/endpoints';

const TablaHomeBody = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [error, setError] = useState(null); // opcional para mostrar errores

  useEffect(() => {
    axios.get(`${ENDPOINTS}${urlMostrarUsuarios}`)
      .then(response => setUsuarios(response.data))
      .catch(error => {
        console.error('Error al obtener usuarios:', error);
        setError('No se pudieron cargar los usuarios');
      });
  }, []);

  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>Email</th>
        </tr>
      </thead>
      <tbody>
        {error && (
          <tr>
            <td colSpan="3">{error}</td>
          </tr>
        )}
        {usuarios.map(usuario => (
          <tr key={usuario.id}>
            <td>{usuario.id}</td>
            <td>{usuario.nombre}</td>
            <td>{usuario.email}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TablaHomeBody;