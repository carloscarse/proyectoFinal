import React from 'react';

const UnoHomeBody = ({ usuario }) => {
  if (!usuario) {
    return <p>No hay usuario para mostrar.</p>;
  }

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
        <tr>
          <td>{usuario.id}</td>
          <td>{usuario.nombre}</td>
          <td>{usuario.email}</td>
        </tr>
      </tbody>
    </table>
  );
};

export default UnoHomeBody;