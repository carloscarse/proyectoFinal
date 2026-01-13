import { NavLink } from "react-router-dom";

function Sidebar() {
  return (
    <aside className="admin-sidebar">
      <h2>Panel Admin</h2>
      <nav>
        <NavLink to="/admin/alquileres">Alquileres</NavLink>
        <NavLink to="/admin/contratos">Contratos</NavLink>
        <NavLink to="/admin/documentacion">Documentacion</NavLink>
        <NavLink to="/admin/espacios">Espacios</NavLink>
        <NavLink to="/admin/facturacion">Facturación</NavLink>
        <NavLink to="/admin/inquilinos">Inquilinos</NavLink>
        <NavLink to="/admin/pagos">Pagos</NavLink>
        <NavLink to="/admin/personas">Personas</NavLink>
        <NavLink to="/admin/reservas">Reservas</NavLink>
        <NavLink to="/admin/rubros">Rubros</NavLink>
        <NavLink to="/admin/servicios">Servicios</NavLink>
        <NavLink to="/admin/usuarios">Usuarios</NavLink>
      </nav>
    </aside>
  );
}

export default Sidebar;