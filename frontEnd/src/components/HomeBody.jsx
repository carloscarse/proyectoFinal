import React, { useState } from 'react';
import TablaHomeBody from './TablaHomeBody';
import OpcionesHomeBody from './OpcionesHomeBody';
import UnoHomeBody from './UnoHomeBody';
import CrearUsuarioHomeBody from './CrearUsuarioHomeBody';
import EditarUsuarioHomeBody from './EditarUsuarioHomeBody';
import EliminarUsuarioHomeBody from './EliminarUsuarioHomeBody';

const HomeBody = () => {
  const [vistaActiva, setVistaActiva] = useState(null);
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);

  const renderVista = () => {
    switch (vistaActiva) {
      case 'todos':
        return <TablaHomeBody />;
      case 'uno':
        return <UnoHomeBody usuario={usuarioSeleccionado} />;
      case 'crear':
        return <CrearUsuarioHomeBody onUsuarioCreado={() => setVistaActiva('todos')} />;
      case 'editar':
        return <EditarUsuarioHomeBody usuario={usuarioSeleccionado} />;
      case 'eliminar':
        return <EliminarUsuarioHomeBody usuario={usuarioSeleccionado} />;
      default:
        return null;
    }
  };

  return (
    <>
      <h1>Proyecto Final</h1>
      <h2></h2>
      <h2>Opciones</h2>
      <OpcionesHomeBody
        onSeleccionarVista={setVistaActiva}
        onUsuarioCargado={(usuario) => {
          setUsuarioSeleccionado(usuario);
        }}
      />
      {renderVista()}
    </>
  );
};

export default HomeBody;