import FormularioUsuario from './FormularioUsuario';
import ListaUsuarios from './ListaUsuarios';
import './usuarios.css';

function Usuarios() {
  return (
    <section className="usuarios-container">
      <h1>Gestión de Usuarios</h1>
      <FormularioUsuario />
      <ListaUsuarios />
    </section>
  );
}

export default Usuarios;