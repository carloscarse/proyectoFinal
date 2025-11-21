import { useState } from 'react';
import FormularioUsuario from './FormularioUsuario';
import ListaUsuarios from './ListaUsuarios';
import './usuarios.css';

function Usuarios() {
  const [showModal, setShowModal] = useState(false);

  return (
    <section className="usuarios-container">
      <h1>Gestión de Usuarios</h1>

      <div className="d-flex justify-content-end mb-3">
        <button className="btn btn-primary" onClick={() => setShowModal(true)}>
          Nuevo Usuario
        </button>
      </div>

      {showModal && (
        <FormularioUsuario onClose={() => setShowModal(false)} />
      )}

      <ListaUsuarios />
    </section>
  );
}

export default Usuarios;